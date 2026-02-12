
export interface Player {
  id: string;
  name: string;
  avatar: string;
  average: number;
  highestGame: number;
  strikeRate: number;
  spareRate: number;
}

export interface Game {
  id: string;
  date: string;
  location: string;
  score: number;
  frames: Frame[];
  playerId: string;
  isLive?: boolean;
}

export interface Frame {
  frameNumber: number;
  roll1: string | number | null;
  roll2: string | number | null;
  roll3?: string | number | null; // For the 10th frame
  cumulativeScore: number | null;
}

export interface AIInsight {
  topic: string;
  recommendation: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}
