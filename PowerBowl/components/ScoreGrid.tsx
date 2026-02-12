
import React from 'react';
import { Frame } from '../types';

interface ScoreGridProps {
  frames: Frame[];
  totalScore: number;
}

const ScoreGrid: React.FC<ScoreGridProps> = ({ frames, totalScore }) => {
  // Ensure we always render 10 frames structure even if empty
  const displayFrames = Array.from({ length: 10 }, (_, i) => {
    return frames.find(f => f.frameNumber === i + 1) || {
      frameNumber: i + 1,
      roll1: null,
      roll2: null,
      roll3: null,
      cumulativeScore: null
    };
  });

  const renderRoll = (val: string | number | null) => {
    if (val === null) return '';
    return val;
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex min-w-[800px] border border-slate-700 rounded-lg bg-slate-900/50 overflow-hidden">
        {displayFrames.map((frame, idx) => (
          <div key={idx} className={`flex-1 flex flex-col border-r border-slate-700 last:border-r-0 ${idx === 9 ? 'min-w-[120px]' : 'min-w-[80px]'}`}>
            {/* Frame Header */}
            <div className="bg-slate-800 text-slate-400 text-xs text-center py-1 border-b border-slate-700">
              {frame.frameNumber}
            </div>
            
            {/* Rolls */}
            <div className="flex h-8 border-b border-slate-700/50">
              <div className="flex-1 flex items-center justify-center border-r border-slate-700/50 text-sm font-bold">
                {renderRoll(frame.roll1)}
              </div>
              <div className="flex-1 flex items-center justify-center text-sm font-bold bg-slate-800/30">
                {renderRoll(frame.roll2)}
              </div>
              {idx === 9 && (
                 <div className="flex-1 flex items-center justify-center border-l border-slate-700/50 text-sm font-bold">
                    {renderRoll(frame.roll3)}
                 </div>
              )}
            </div>

            {/* Score */}
            <div className="flex-1 flex items-center justify-center py-3 text-lg font-black text-sky-400">
              {frame.cumulativeScore !== null ? frame.cumulativeScore : ''}
            </div>
          </div>
        ))}
        
        {/* Total Column */}
        <div className="w-24 bg-slate-800/80 flex flex-col justify-center items-center border-l border-slate-600">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total</div>
          <div className="text-3xl font-black text-white">{totalScore}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGrid;
