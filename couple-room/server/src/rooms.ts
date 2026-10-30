import type { Player, Room } from './types.js';

/** v1 limit: 2 players. To expand to friends-only 8-player rooms later,
 *  change this one constant to 8 (and add target selection on the client).
 *  No other server logic depends on the number being 2. */
export const MAX_PLAYERS = 2;
export const MAX_PLAYERS_FUTURE = 8;

export const rooms = new Map<string, Room>();

/** Seat occupancy: room code -> furniture id -> player id */
export const seats = new Map<string, Map<string, string>>();

export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
}

export function getOrCreateRoom(code: string): Room {
  let room = rooms.get(code);
  if (!room) {
    room = { code, players: [], messages: [] };
    rooms.set(code, room);
    seats.set(code, new Map());
  }
  return room;
}

export function freePlayerSeats(code: string, playerId: string): void {
  const map = seats.get(code);
  if (!map) return;
  for (const [furnitureId, occupant] of [...map.entries()]) {
    if (occupant === playerId) map.delete(furnitureId);
  }
}

export function removePlayerFromRoom(code: string, playerId: string): Room | undefined {
  const room = rooms.get(code);
  if (!room) return undefined;
  room.players = room.players.filter((p) => p.id !== playerId);
  freePlayerSeats(code, playerId);
  if (room.players.length === 0) {
    rooms.delete(code);
    seats.delete(code);
  }
  return room;
}

export function spawnFor(index: number): { x: number; y: number } {
  // Two distinct, original spawn points inside the room.
  return index === 0 ? { x: 900, y: 650 } : { x: 1660, y: 650 };
}
