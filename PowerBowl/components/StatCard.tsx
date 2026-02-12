
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, colorClass }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {trend && (
            <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
