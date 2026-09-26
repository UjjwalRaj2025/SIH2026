import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function StatCard({
  title,
  value,
  unit,
  change,
  trend = 'neutral', // 'up' | 'down' | 'neutral'
  icon: Icon,
  variant = 'teal',
  subtitle,
}) {
  const variantStyles = {
    teal: 'text-teal-700 bg-teal-50 border-teal-200',
    rose: 'text-red-700 bg-red-50 border-red-200',
    amber: 'text-amber-700 bg-amber-50 border-amber-200',
    cyan: 'text-sky-700 bg-sky-50 border-sky-200',
    purple: 'text-purple-700 bg-purple-50 border-purple-200',
    navy: 'text-navy-900 bg-navy-50 border-navy-200',
  };

  return (
    <Card className="hover:border-slate-300 transition duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{value}</span>
            {unit && <span className="text-xs text-slate-500 font-semibold">{unit}</span>}
          </div>
          {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl border shadow-subtle ${variantStyles[variant] || variantStyles.teal}`}>
            <Icon className="w-5 h-5 shrink-0" />
          </div>
        )}
      </div>

      {change && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Trend (24h)</span>
          <Badge
            variant={trend === 'up' ? 'warning' : trend === 'down' ? 'safe' : 'neutral'}
            size="sm"
          >
            {change}
          </Badge>
        </div>
      )}
    </Card>
  );
}
