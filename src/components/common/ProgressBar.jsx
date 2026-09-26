import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  colorScheme = 'dynamic', // 'dynamic' | 'teal' | 'rose' | 'amber' | 'emerald'
  size = 'md',
  className = '',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const getDynamicColor = (pct) => {
    if (pct >= 75) return 'bg-red-600';
    if (pct >= 45) return 'bg-amber-500';
    return 'bg-emerald-600';
  };

  const schemeColors = {
    teal: 'bg-teal-600',
    rose: 'bg-red-600',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-600',
  };

  const barColor = colorScheme === 'dynamic' ? getDynamicColor(percentage) : schemeColors[colorScheme] || schemeColors.teal;

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs mb-1.5">
          {label && <span className="font-semibold text-slate-700">{label}</span>}
          {showValue && <span className="font-bold text-slate-900 font-mono">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden ${heights[size] || heights.md}`}>
        <div
          className={`${heights[size] || heights.md} rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
