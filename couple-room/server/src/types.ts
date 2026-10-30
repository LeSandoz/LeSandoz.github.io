export type Direction = 'up' | 'down' | 'left' | 'right';
export type PlayerAction = 'idle' | 'walk' | 'sit' | 'hug' | 'punch';

export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  direction: Direction;
  action: PlayerAction;
  sittingOn: string | null;
}

export interface ChatMessage {
  from: string;
  fromId: string;
  text: string;
  channel: 'room';
  at: number;
}

export interface Room {
  code: string;
  players: Player[];
  messages: ChatMessage[];
}
