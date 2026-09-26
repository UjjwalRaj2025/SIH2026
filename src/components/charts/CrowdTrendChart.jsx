import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function CrowdTrendChart({ data = [], height = 240 }) {
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-elevated text-xs space-y-1.5">
          <p className="font-bold text-slate-900">{label} Shrine Circuit</p>
          {payload.map((entry, index) => (
            <div key={`crowd-${index}`} className="flex items-center justify-between gap-4">
              <span style={{ color: entry.color }} className="capitalize font-semibold">
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-slate-900">{entry.value.toLocaleString()} pilgrims</span>
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
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="shrine" stroke="#64748b" tick={{ fontSize: 11, fill: '#475569' }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#475569' }} />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            formatter={(val) => <span className="text-slate-700 font-semibold">{val}</span>}
          />
          <Bar
            dataKey="current"
            name="Current Influx"
            fill="#7c3aed"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="safeLimit"
            name="Max Carrying Capacity"
            fill="#cbd5e1"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
