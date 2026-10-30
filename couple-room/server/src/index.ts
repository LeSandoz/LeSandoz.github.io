import { createServer } from 'node:http';
import { Server, type Socket } from 'socket.io';
import {
  MAX_PLAYERS,
  getOrCreateRoom,
  normalizeCode,
  removePlayerFromRoom,
  seats,
  spawnFor,
} from './rooms.js';
import type { ChatMessage, Player } from './types.js';

const PORT = Number(process.env.PORT ?? 3001);
const httpServer = createServer((_req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('couple-room server is running\n');
});
const io = new Server(httpServer, { cors: { origin: '*' } });

interface SocketState {
  roomCode: string | null;
  playerName: string;
}

const stateBySocket = new Map<string, SocketState>();
// One pending hug per room: room code -> { from, to, timeout }
const pendingHugs = new Map<string, { from: string; to: string; timeout: NodeJS.Timeout }>();
const lastPunchAt = new Map<string, number>();

function publicRoom(code: string) {
  const room = getOrCreateRoom(code);
  return { code: room.code, players: room.players, messages: room.messages };
}

function otherPlayer(code: string, selfId: string): Player | undefined {
  return getOrCreateRoom(code).players.find((p) => p.id !== selfId);
}

function clearPendingHug(code: string, reason: 'accepted' | 'declined' | 'cancelled' | 'left') {
  const pending = pendingHugs.get(code);
  if (!pending) return;
  clearTimeout(pending.timeout);
  pendingHugs.delete(code);
  if (reason !== 'accepted') {
    io.to(code).emit('hug-cancelled', { reason });
  }
}

io.on('connection', (socket: Socket) => {
  stateBySocket.set(socket.id, { roomCode: null, playerName: '' });

  socket.on('join-room', ({ code, name }: { code: string; name: string }) => {
    const cleanCode = normalizeCode(code);
    const cleanName = String(name ?? '').trim().slice(0, 24) || 'Player';
    if (!cleanCode) {
      socket.emit('join-error', { message: 'Please enter a room code.' });
      return;
    }
    const room = getOrCreateRoom(cleanCode);
    if (room.players.length >= MAX_PLAYERS) {
      socket.emit('room-full', { code: cleanCode, maxPlayers: MAX_PLAYERS });
      return;
    }
    const spawn = spawnFor(room.players.length);
    const player: Player = {
      id: socket.id,
      name: cleanName,
      x: spawn.x,
      y: spawn.y,
      direction: 'up',
      action: 'idle',
      sittingOn: null,
    };
    room.players.push(player);
    const st = stateBySocket.get(socket.id)!;
    st.roomCode = cleanCode;
    st.playerName = cleanName;
    socket.join(cleanCode);
    socket.emit('room-state', publicRoom(cleanCode));
    socket.to(cleanCode).emit('player-joined', { player });
  });

  socket.on('move', (data: Partial<Player>) => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const room = getOrCreateRoom(st.roomCode);
    const player = room.players.find((p) => p.id === socket.id);
    if (!player || player.action === 'sit' || player.action === 'hug') return;
    if (typeof data.x === 'number') player.x = Math.max(40, Math.min(760, data.x));
    if (typeof data.y === 'number') player.y = Math.max(120, Math.min(560, data.y));
    if (data.direction) player.direction = data.direction;
    player.action = data.action === 'walk' ? 'walk' : 'idle';
    socket.to(st.roomCode).emit('player-moved', { player });
  });

  socket.on('chat', ({ text }: { text: string }) => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const clean = String(text ?? '').trim().slice(0, 200);
    if (!clean) return;
    const msg: ChatMessage = { from: st.playerName, fromId: socket.id, text: clean, channel: 'room', at: Date.now() };
    const room = getOrCreateRoom(st.roomCode);
    room.messages.push(msg);
    if (room.messages.length > 100) room.messages.splice(0, room.messages.length - 100);
    io.to(st.roomCode).emit('chat', { message: msg });
  });

  socket.on('sit', ({ furnitureId }: { furnitureId: string }) => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const seatMap = seats.get(st.roomCode)!;
    if (seatMap.has(furnitureId)) {
      socket.emit('sit-denied', { furnitureId, message: 'That seat is taken.' });
      return;
    }
    const room = getOrCreateRoom(st.roomCode);
    const player = room.players.find((p) => p.id === socket.id);
    if (!player) return;
    seatMap.set(furnitureId, socket.id);
    player.action = 'sit';
    player.sittingOn = furnitureId;
    io.to(st.roomCode).emit('player-sat', { playerId: socket.id, furnitureId });
  });

  socket.on('stand', () => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const room = getOrCreateRoom(st.roomCode);
    const player = room.players.find((p) => p.id === socket.id);
    if (!player) return;
    player.action = 'idle';
    player.sittingOn = null;
    io.to(st.roomCode).emit('player-stood', { playerId: socket.id });
  });

  socket.on('hug-request', () => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const code = st.roomCode;
    const target = otherPlayer(code, socket.id);
    if (!target) {
      socket.emit('hug-error', { message: 'Nobody else is in the room yet.' });
      return;
    }
    if (pendingHugs.has(code)) return;
    const timeout = setTimeout(() => {
      pendingHugs.delete(code);
      io.to(code).emit('hug-cancelled', { reason: 'timeout' });
    }, 10_000);
    pendingHugs.set(code, { from: socket.id, to: target.id, timeout });
    io.to(target.id).emit('hug-request', { from: socket.id, fromName: st.playerName });
  });

  socket.on('hug-response', ({ accept }: { accept: boolean }) => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const code = st.roomCode;
    const pending = pendingHugs.get(code);
    if (!pending || pending.to !== socket.id) return;
    clearTimeout(pending.timeout);
    pendingHugs.delete(code);
    if (!accept) {
      io.to(code).emit('hug-declined', { from: pending.from });
      return;
    }
    const room = getOrCreateRoom(code);
    for (const p of room.players) p.action = 'hug';
    io.to(code).emit('hug-accepted', { from: pending.from, to: pending.to });
    setTimeout(() => {
      const r = getOrCreateRoom(code);
      for (const p of r.players) if (p.action === 'hug') p.action = 'idle';
      io.to(code).emit('hug-ended', {});
    }, 2000);
  });

  socket.on('punch', () => {
    const st = stateBySocket.get(socket.id);
    if (!st?.roomCode) return;
    const now = Date.now();
    const last = lastPunchAt.get(socket.id) ?? 0;
    if (now - last < 2000) {
      socket.emit('punch-cooldown', { waitMs: 2000 - (now - last) });
      return;
    }
    lastPunchAt.set(socket.id, now);
    const code = st.roomCode;
    const room = getOrCreateRoom(code);
    const player = room.players.find((p) => p.id === socket.id);
    if (!player || player.action === 'sit') return;
    player.action = 'punch';
    io.to(code).emit('player-punched', { playerId: socket.id });
    setTimeout(() => {
      const p = getOrCreateRoom(code).players.find((x) => x.id === socket.id);
      if (p && p.action === 'punch') p.action = 'idle';
    }, 800);
  });

  socket.on('leave-room', () => leave(socket));
  socket.on('disconnect', () => leave(socket));

  function leave(s: Socket) {
    const st = stateBySocket.get(s.id);
    if (!st?.roomCode) {
      stateBySocket.delete(s.id);
      return;
    }
    const code = st.roomCode;
    clearPendingHug(code, 'left');
    removePlayerFromRoom(code, s.id);
    s.leave(code);
    // Use io.to, not the disconnecting socket: a disconnected socket can no
    // longer broadcast to its room, so s.to(code) silently drops this event.
    io.to(code).emit('player-left', { playerId: s.id, name: st.playerName });
    stateBySocket.delete(s.id);
  }
});

httpServer.listen(PORT, () => {
  console.log(`couple-room server listening on http://localhost:${PORT}`);
});
