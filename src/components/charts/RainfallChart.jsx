import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function RainfallChart({ data = [], height = 260 }) {
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-elevated text-xs space-y-1.5">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1">
            Time: {label}
          </p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span style={{ color: entry.color }} className="capitalize font-semibold">
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-slate-900">{entry.value} mm/h</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRudra" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorChamoli" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0d9488" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorUttar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ea580c" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#ea580c" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#475569' }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#475569' }} />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            formatter={(val) => <span className="text-slate-700 font-semibold capitalize">{val}</span>}
          />
          <Area
            type="monotone"
            dataKey="rudraprayag"
            name="Rudraprayag (Mandakini)"
            stroke="#dc2626"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRudra)"
          />
          <Area
            type="monotone"
            dataKey="chamoli"
            name="Chamoli (Alaknanda)"
            stroke="#0d9488"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorChamoli)"
          />
          <Area
            type="monotone"
            dataKey="uttarkashi"
            name="Uttarkashi (Bhagirathi)"
            stroke="#ea580c"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUttar)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
