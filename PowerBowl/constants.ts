
import { Player, Game } from './types';

export const COLORS = {
  primary: '#38bdf8',
  secondary: '#818cf8',
  accent: '#fb7185',
  bg: '#0f172a',
  surface: '#1e293b',
};

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'You (Alex)',
    avatar: 'https://picsum.photos/seed/alex/200',
    average: 185,
    highestGame: 244,
    strikeRate: 42,
    spareRate: 68,
  },
  {
    id: 'p2',
    name: 'Jordan',
    avatar: 'https://picsum.photos/seed/jordan/200',
    average: 172,
    highestGame: 215,
    strikeRate: 35,
    spareRate: 72,
  },
  {
    id: 'p3',
    name: 'Chris',
    avatar: 'https://picsum.photos/seed/chris/200',
    average: 198,
    highestGame: 279,
    strikeRate: 51,
    spareRate: 65,
  }
];

export const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    date: '2024-05-15',
    location: 'Plano Super Bowl',
    score: 192,
    playerId: 'p1',
    frames: Array.from({ length: 10 }, (_, i) => ({
      frameNumber: i + 1,
      roll1: i % 2 === 0 ? 'X' : 7,
      roll2: i % 2 === 0 ? null : 3,
      roll3: null,
      isStrike: i % 2 === 0,
      isSpare: i % 2 !== 0,
      cumulativeScore: (i + 1) * 19,
    })),
  },
  {
    id: 'g2',
    date: '2024-05-15',
    location: 'Plano Super Bowl',
    score: 175,
    playerId: 'p1',
    frames: [],
  },
  {
    id: 'g3',
    date: '2024-05-10',
    location: 'Plano Super Bowl',
    score: 210,
    playerId: 'p1',
    frames: [],
  }
];
