import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

export default function RiverLevelChart({ gauges = [], height = 240 }) {
  const chartData = gauges.map((g) => ({
    name: g.name.split(' at ')[0],
    station: g.name.split(' at ')[1] || g.name,
    current: g.currentLevelM,
    danger: g.dangerLevelM,
    marginToDanger: +(g.dangerLevelM - g.currentLevelM).toFixed(1),
    status: g.status,
  }));

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-elevated text-xs space-y-1.5">
          <p className="font-bold text-slate-900">{data.name} ({data.station})</p>
          <div className="text-slate-600">
            Current Gauge: <span className="font-mono font-bold text-slate-900">{data.current} m</span>
          </div>
          <div className="text-red-700 font-semibold">
            Danger Mark: <span className="font-mono">{data.danger} m</span>
          </div>
          <div className="text-slate-500 font-medium">
            Safety Margin: <span className="font-bold text-emerald-700">{data.marginToDanger} m</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fill: '#475569' }} />
          <YAxis stroke="#64748b" domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#475569' }} />
          <Tooltip content={customTooltip} />
          <Bar dataKey="current" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => {
              const isWarning = entry.marginToDanger <= 2.0;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isWarning ? '#dc2626' : '#0d9488'}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
