import React from 'react';
import SeverityBadge from '../common/SeverityBadge';

export default function RiskScoreGauge({
  score = 0,
  max = 100,
  size = 150,
  label = 'Overall Corridor Risk',
  status,
}) {
  const normalized = Math.min(Math.max(score, 0), max);
  const strokeWidth = 11;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * normalized) / max;

  const getSeverityLevel = (s) => {
    if (s >= 75) return 'CRITICAL';
    if (s >= 55) return 'HIGH';
    if (s >= 35) return 'MODERATE';
    return 'LOW';
  };

  const severityLevel = getSeverityLevel(normalized);

  const colors = {
    CRITICAL: '#dc2626',
    HIGH: '#ea580c',
    MODERATE: '#ca8a04',
    LOW: '#16a34a',
  };

  const activeColor = colors[severityLevel];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-[135deg]"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-slate-900 tracking-tight">{normalized}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Threat Index
          </span>
        </div>
      </div>

      <div className="mt-3 text-center space-y-1.5 flex flex-col items-center">
        {/* Strictly contains both icon and text */}
        <SeverityBadge level={severityLevel} label={status || undefined} size="md" />
        {label && <p className="text-xs text-slate-500 font-medium">{label}</p>}
      </div>
    </div>
  );
}
