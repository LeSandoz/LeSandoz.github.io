
import { Game, Player } from '../types';
import { MOCK_GAMES, MOCK_PLAYERS } from '../constants';

const STORAGE_KEYS = {
  GAMES: 'lanesync_games',
  PLAYER: 'lanesync_player',
};

// Simulate API delay for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PersistenceService = {
  // Initialize storage with mock data if empty
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(MOCK_GAMES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLAYER)) {
      localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(MOCK_PLAYERS[0]));
    }
  },

  getGames: async (): Promise<Game[]> => {
    await delay(300); // Simulate network latency
    const data = localStorage.getItem(STORAGE_KEYS.GAMES);
    return data ? JSON.parse(data) : [];
  },

  saveGame: async (game: Game): Promise<Game[]> => {
    await delay(500);
    const currentGames = await PersistenceService.getGames();
    const updatedGames = [game, ...currentGames];
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(updatedGames));
    
    // Auto-update player stats
    await PersistenceService.updatePlayerStats(updatedGames);
    
    return updatedGames;
  },

  getPlayer: async (): Promise<Player> => {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYER);
    return data ? JSON.parse(data) : MOCK_PLAYERS[0];
  },

  updatePlayerStats: async (games: Game[]) => {
    const player = await PersistenceService.getPlayer();
    
    if (games.length === 0) return player;

    const totalScore = games.reduce((acc, g) => acc + g.score, 0);
    const average = Math.floor(totalScore / games.length);
    const highest = Math.max(...games.map(g => g.score));

    // Calculate simulated strike/spare rates based on score (simplified algorithm)
    // In a real backend, we would analyze frame-by-frame data
    const strikeRate = Math.min(60, Math.floor(average / 300 * 100) + 10);
    const spareRate = Math.min(80, Math.floor((300 - average) / 300 * 100));

    const updatedPlayer = {
      ...player,
      average,
      highestGame: highest,
      strikeRate,
      spareRate
    };

    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(updatedPlayer));
    return updatedPlayer;
  },
  
  // This function simulates receiving data from an external "scraped" source
  importScrapedData: async (scrapedData: any[]) => {
      const currentGames = await PersistenceService.getGames();
      
      // Map external LaneTalk fields to our internal Game format
      // We look for common fields from LaneTalk API: score, total, points, created, dateCompleted, uuid
      const newGames: Game[] = scrapedData.map((item, index) => {
          // Attempt to find the score
          let score = 0;
          if (typeof item.score === 'number') score = item.score;
          else if (typeof item.total === 'number') score = item.total;
          else if (typeof item.points === 'number') score = item.points;
          else if (item.playerScores && item.playerScores[0]) score = parseInt(item.playerScores[0].score || '0');
          
          // Attempt to find the date
          let dateStr = new Date().toISOString().split('T')[0];
          if (item.created) dateStr = new Date(item.created).toISOString().split('T')[0];
          else if (item.dateCompleted) dateStr = new Date(item.dateCompleted).toISOString().split('T')[0];
          else if (item.date) dateStr = new Date(item.date).toISOString().split('T')[0];

          // ID
          const id = item.uuid || item.matchId || `imported-${Date.now()}-${index}`;

          return {
              id: id,
              date: dateStr,
              location: 'Plano Super Bowl (Imported)',
              score: score,
              frames: [], // We usually don't get full frame data from summary API
              playerId: 'p1' // Assign all imported games to current user for analysis
          };
      }).filter(g => g.score > 0); // Filter out invalid games

      // Filter out duplicates that already exist in our DB
      const uniqueNewGames = newGames.filter(ng => 
          !currentGames.some(cg => cg.id === ng.id || (cg.date === ng.date && cg.score === ng.score))
      );
      
      const updatedGames = [...uniqueNewGames, ...currentGames];
      // Sort by date desc
      updatedGames.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(updatedGames));
      await PersistenceService.updatePlayerStats(updatedGames);
      return updatedGames;
  }
};
