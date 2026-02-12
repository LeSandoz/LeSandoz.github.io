
import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  Trophy, TrendingUp, Users, History, LayoutDashboard, 
  Settings, Target, Zap, ChevronRight, Activity, Camera, Plus, X, Radio, Play, Save, Database, Upload, FileJson
} from 'lucide-react';
import { MOCK_PLAYERS, COLORS } from './constants';
import { Player, Game, AIInsight, Frame } from './types';
import { getBowlingInsights } from './services/geminiService';
import { PersistenceService } from './services/persistence';
import StatCard from './components/StatCard';
import ScoreGrid from './components/ScoreGrid';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'friends' | 'history' | 'insights' | 'live'>('dashboard');
  const [player, setPlayer] = useState<Player>(MOCK_PLAYERS[0]);
  const [games, setGames] = useState<Game[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live Game State
  const [liveGame, setLiveGame] = useState<Game | null>(null);
  const [liveStatus, setLiveStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  const liveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Add Game Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGameScore, setNewGameScore] = useState('');
  const [newGameDate, setNewGameDate] = useState(new Date().toISOString().split('T')[0]);

  // Init Data
  useEffect(() => {
    const initData = async () => {
      PersistenceService.init();
      const loadedGames = await PersistenceService.getGames();
      const loadedPlayer = await PersistenceService.getPlayer();
      setGames(loadedGames);
      setPlayer(loadedPlayer);
      setIsLoadingData(false);
    };
    initData();
    
    return () => stopLiveSimulation();
  }, []);

  // Reload insights when games change significantly
  useEffect(() => {
    if (games.length > 0 && !isLoadingData) {
        loadInsights();
    }
  }, [games.length, isLoadingData]);

  const loadInsights = async () => {
    setIsLoadingInsights(true);
    const result = await getBowlingInsights(player, games);
    setInsights(result);
    setIsLoadingInsights(false);
  };

  // --- File Import Logic ---
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = e.target?.result as string;
        const data = JSON.parse(json);
        
        if (Array.isArray(data)) {
          setIsSyncing(true);
          // Pass raw scraper data to persistence service
          const updatedGames = await PersistenceService.importScrapedData(data);
          setGames(updatedGames);
          const updatedPlayer = await PersistenceService.getPlayer();
          setPlayer(updatedPlayer);
          setIsSyncing(false);
          alert(`Successfully imported ${data.length} games from ${file.name}!`);
        } else {
          alert("Invalid file format. Expected a JSON array of games.");
        }
      } catch (error) {
        console.error("Import error:", error);
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  // --- Live Game Simulation Logic ---
  const startLiveSimulation = () => {
    setLiveStatus('connecting');
    const newLiveGame: Game = {
      id: `live-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      location: 'Plano Super Bowl • Lane 12',
      score: 0,
      playerId: player.id,
      frames: [],
      isLive: true
    };

    setTimeout(() => {
      setLiveStatus('active');
      setLiveGame(newLiveGame);
      
      let currentFrame = 1;
      let rollIndex = 0; 
      let frameScore = 0;
      let cumulative = 0;

      liveIntervalRef.current = setInterval(() => {
        setLiveGame(prevGame => {
          if (!prevGame) return null;
          
          const updatedFrames = [...prevGame.frames];
          let frame = updatedFrames.find(f => f.frameNumber === currentFrame);
          
          if (!frame) {
            frame = { frameNumber: currentFrame, roll1: null, roll2: null, roll3: null, cumulativeScore: null };
            updatedFrames.push(frame);
          }

          const pins = Math.floor(Math.random() * (11 - frameScore)); 
          
          if (rollIndex === 0) {
            if (pins === 10) {
               frame.roll1 = 'X';
               frame.roll2 = null;
               frameScore = 0;
               currentFrame++;
               rollIndex = 0;
               cumulative += 20; 
               frame.cumulativeScore = cumulative;
            } else {
               frame.roll1 = pins;
               frameScore = pins;
               rollIndex = 1;
            }
          } else {
             if (frameScore + pins === 10) {
               frame.roll2 = '/';
               cumulative += 15;
             } else {
               frame.roll2 = pins;
               cumulative += (frameScore + pins);
             }
             frame.cumulativeScore = cumulative;
             frameScore = 0;
             currentFrame++;
             rollIndex = 0;
          }

          if (currentFrame > 10) {
            stopLiveSimulation();
            const finishedGame = { ...prevGame, frames: updatedFrames, score: cumulative, isLive: false };
            handleSaveLiveGame(finishedGame);
            return finishedGame;
          }

          return { ...prevGame, frames: updatedFrames, score: cumulative };
        });
      }, 1000); 
    }, 1500);
  };

  const stopLiveSimulation = () => {
    if (liveIntervalRef.current) {
      clearInterval(liveIntervalRef.current);
      setLiveStatus('idle');
    }
  };

  const handleSaveLiveGame = async (game: Game) => {
    const updatedGames = await PersistenceService.saveGame(game);
    setGames(updatedGames);
    const updatedPlayer = await PersistenceService.getPlayer();
    setPlayer(updatedPlayer);
  };

  const syncPlanoSuperBowl = async () => {
    // This is now just a placeholder for the file import feature
    alert("Please use the 'Import JSON' button to load data fetched by your Node.js scraper.");
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(newGameScore);
    if (isNaN(score) || score < 0 || score > 300) {
      alert("Please enter a valid score (0-300)");
      return;
    }
    const newGame: Game = {
      id: `manual-${Date.now()}`,
      date: newGameDate,
      location: 'Plano Super Bowl',
      score: score,
      playerId: player.id,
      frames: []
    };
    
    const updatedGames = await PersistenceService.saveGame(newGame);
    setGames(updatedGames);
    const updatedPlayer = await PersistenceService.getPlayer();
    setPlayer(updatedPlayer);

    setNewGameScore('');
    setShowAddModal(false);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Average" value={player.average} trend={games.length > 0 ? "Updated" : "-"} colorClass="text-blue-400 bg-blue-400" icon={<Trophy size={24} className="text-blue-400" />} />
        <StatCard label="Highest Game" value={player.highestGame} colorClass="text-amber-400 bg-amber-400" icon={<TrendingUp size={24} className="text-amber-400" />} />
        <StatCard label="Strike Rate" value={`${player.strikeRate}%`} trend="Est." colorClass="text-rose-400 bg-rose-400" icon={<Zap size={24} className="text-rose-400" />} />
        <StatCard label="Spare Rate" value={`${player.spareRate}%`} colorClass="text-emerald-400 bg-emerald-400" icon={<Target size={24} className="text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><Activity size={20} className="text-sky-400" /> Score Progression</h3>
            <div className="text-xs text-slate-500 flex items-center gap-1"><Database size={12}/> {games.length} games recorded</div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...games].reverse()}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={['auto', 'auto']} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="score" stroke={COLORS.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
             <button onClick={() => setShowAddModal(true)} className="w-full py-4 px-4 bg-sky-600 hover:bg-sky-500 transition-colors rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20"><Plus size={20} /> Log Score Manually</button>
             <button onClick={() => setActiveTab('live')} className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-xl font-bold flex items-center justify-center gap-2 text-white"><Radio size={18} /> Connect to Live Lane</button>
             
             {/* Import Button */}
             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
             <button onClick={handleImportClick} disabled={isSyncing} className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 transition-colors rounded-xl font-medium flex items-center justify-center gap-2 text-sky-400 border border-slate-700">
               {isSyncing ? <Activity size={18} className="animate-spin" /> : <Upload size={18} />} 
               {isSyncing ? 'Importing...' : 'Import JSON Data'}
             </button>
          </div>
          <div className="mt-4 text-xs text-slate-500 text-center">
            Run <code>node scrape_lanetalk.js</code> locally, then import the file here.
          </div>
        </div>
      </div>
    </div>
  );

  const renderLive = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${liveStatus === 'active' ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
            <Radio size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Live Lane Monitor</h2>
            <p className="text-slate-400 text-sm">Real-time connection to Plano Super Bowl</p>
          </div>
        </div>
        {liveStatus === 'idle' && (
          <button onClick={startLiveSimulation} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Play size={18} /> Connect to Lane 12
          </button>
        )}
        {liveStatus === 'connecting' && (
          <span className="text-sky-400 font-mono animate-pulse">Establishing handshake...</span>
        )}
        {liveStatus === 'active' && (
          <button onClick={stopLiveSimulation} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl font-medium text-sm">
            Disconnect
          </button>
        )}
      </div>

      {liveStatus === 'active' && liveGame ? (
        <div className="glass-panel p-1 rounded-2xl overflow-hidden animate-in fade-in duration-500">
           <div className="bg-slate-900/80 p-6 flex justify-between items-end border-b border-slate-700">
              <div>
                 <p className="text-xs text-sky-400 font-bold uppercase tracking-widest mb-1">CURRENT GAME</p>
                 <h3 className="text-3xl font-black text-white">{liveGame.location}</h3>
              </div>
              <div className="text-right">
                 <p className="text-sm text-slate-400">Total Score</p>
                 <p className="text-5xl font-black text-white leading-none">{liveGame.score}</p>
              </div>
           </div>
           <div className="p-6 bg-slate-900/40">
              <ScoreGrid frames={liveGame.frames} totalScore={liveGame.score} />
           </div>
           <div className="bg-slate-900/60 p-4 flex justify-between items-center text-xs text-slate-500">
              <span>Data Source: Brunswick Vector (Simulated)</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"/> Live Feed</span>
           </div>
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
           <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Activity size={32} className="text-slate-600" />
           </div>
           <h3 className="text-xl font-bold text-slate-300">No Active Session</h3>
           <p className="text-slate-500 max-w-md">Click "Connect" to simulate hooking into a lane system. When the game finishes, it will be automatically saved to your history.</p>
        </div>
      )}
    </div>
  );

  const renderFriends = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Friends & Rivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PLAYERS.filter(p => p.id !== player.id).map(friend => (
          <div key={friend.id} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full border-2 border-slate-700 bg-slate-800" />
            <div>
              <h3 className="font-bold text-lg">{friend.name}</h3>
              <p className="text-sm text-slate-400">Avg: <span className="text-white font-bold">{friend.average}</span></p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-slate-800 rounded-md text-slate-300">High: {friend.highestGame}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="text-sky-400" /> AI Coach Insights
        </h2>
        <button onClick={loadInsights} disabled={isLoadingInsights} className="text-sm text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
          {isLoadingInsights ? <Activity size={14} className="animate-spin" /> : <History size={14} />} Refresh Analysis
        </button>
      </div>
      
      {isLoadingInsights ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Analyzing your recent performance data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {insights.length > 0 ? insights.map((insight, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-sky-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white">{insight.topic}</h3>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  insight.impactLevel === 'High' ? 'bg-rose-500/20 text-rose-400' : 
                  insight.impactLevel === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {insight.impactLevel} Impact
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{insight.recommendation}</p>
            </div>
          )) : (
            <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-2xl">
              <p>No insights generated yet. Try adding more games.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Game History</h2>
        <button onClick={() => setShowAddModal(true)} className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors shadow-lg shadow-sky-900/20">
          <Plus size={16} /> Log Game
        </button>
      </div>
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium whitespace-nowrap">Date</th>
                <th className="p-4 font-medium whitespace-nowrap">Location</th>
                <th className="p-4 font-medium whitespace-nowrap">Score</th>
                <th className="p-4 font-medium whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {games.length > 0 ? games.map(game => (
                <tr key={game.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300 whitespace-nowrap">{game.date}</td>
                  <td className="p-4 font-medium whitespace-nowrap">{game.location}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`font-black text-xl ${game.score >= 200 ? 'text-amber-400' : 'text-white'}`}>
                      {game.score}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <button className="text-slate-500 hover:text-white"><ChevronRight size={20} /></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">No games logged yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (isLoadingData) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-sky-400">Loading your data...</div>;
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Add Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20} /></button>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={24} className="text-sky-400" /> Log New Game</h3>
            <form onSubmit={handleManualSubmit} className="space-y-5">
              <div><label className="block text-sm font-medium text-slate-400 mb-1">Score</label><input type="number" autoFocus placeholder="0 - 300" value={newGameScore} onChange={(e) => setNewGameScore(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg focus:ring-2 focus:ring-sky-500 focus:outline-none" /></div>
              <div><label className="block text-sm font-medium text-slate-400 mb-1">Location</label><input type="text" value="Plano Super Bowl" disabled className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" /></div>
              <div><label className="block text-sm font-medium text-slate-400 mb-1">Date</label><input type="date" value={newGameDate} onChange={(e) => setNewGameDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none" /></div>
              <div className="pt-2"><button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-900/20">Save Score</button></div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 p-6 space-y-8 bg-slate-900/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black text-2xl">L</div>
          <span className="text-xl font-black tracking-tighter">LANESYNC</span>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard size={20} /><span className="font-semibold">Dashboard</span></button>
          <button onClick={() => setActiveTab('live')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'live' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Radio size={20} /><span className="font-semibold">Live Monitor</span></button>
          <button onClick={() => setActiveTab('friends')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'friends' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Users size={20} /><span className="font-semibold">Friends</span></button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><History size={20} /><span className="font-semibold">History</span></button>
          <button onClick={() => setActiveTab('insights')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'insights' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}><Target size={20} /><span className="font-semibold">AI Coach</span></button>
        </nav>
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-2"><img src={player.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700" /><div className="overflow-hidden"><p className="text-sm font-bold truncate">{player.name}</p><p className="text-xs text-slate-500">Pro Member</p></div></div>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors"><Settings size={18} /><span className="text-sm font-medium">Settings</span></button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-bottom border-slate-800 px-6 py-4 flex justify-between items-center lg:hidden">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-black text-lg">L</div><span className="text-lg font-black tracking-tighter uppercase">LaneSync</span></div>
          <button className="p-2 bg-slate-800 rounded-lg"><Users size={20} /></button>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
          {activeTab === 'dashboard' && <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div><p className="text-sky-400 font-bold text-sm tracking-widest uppercase mb-1">Performance Feed</p><h1 className="text-3xl lg:text-4xl font-black">Welcome back, Alex.</h1></div>
            <div className="flex items-center gap-3 text-sm text-slate-400"><div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 rounded-full border border-slate-800"><div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />{isSyncing ? 'Scraping Data...' : 'Scrape Active'}</div><span className="hidden sm:inline">Last match: {games[0]?.date || 'N/A'}</span></div>
          </div>}

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'live' && renderLive()}
          {activeTab === 'friends' && renderFriends()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'history' && renderHistory()}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-4 z-50">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-sky-400' : 'text-slate-500'}><LayoutDashboard size={24} /></button>
        <button onClick={() => setActiveTab('live')} className={activeTab === 'live' ? 'text-sky-400' : 'text-slate-500'}><Radio size={24} /></button>
        <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'text-sky-400' : 'text-slate-500'}><History size={24} /></button>
        <button onClick={() => setActiveTab('insights')} className={activeTab === 'insights' ? 'text-sky-400' : 'text-slate-500'}><Target size={24} /></button>
      </nav>
    </div>
  );
};

export default App;
