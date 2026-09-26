import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * RiskSummaryCard - Unified hazard summary metric card for the CrisisGuard AI dashboard
 * Displays current status, 4-tier severity, probability percentage, location, and quick link.
 */
export default function RiskSummaryCard({
  title,
  icon: Icon,
  status,
  riskLevel = 'MODERATE', // 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
  percentage = 50,
  valueLabel = 'Risk Probability',
  location,
  updatedTime = 'Just now',
  detailsPath = '/landslide',
  accentColor = 'teal', // 'red' | 'amber' | 'sky' | 'purple' | 'emerald' | 'teal'
  trendText,
}) {
  // Color configuration mapping
  const colorMap = {
    red: {
      iconBg: 'bg-red-50 text-red-700 border-red-200',
      barFill: 'bg-red-500',
      highlight: 'text-red-700',
      badgeBorder: 'border-red-200',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      barFill: 'bg-amber-500',
      highlight: 'text-amber-700',
      badgeBorder: 'border-amber-200',
    },
    sky: {
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
      barFill: 'bg-sky-500',
      highlight: 'text-sky-700',
      badgeBorder: 'border-sky-200',
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
      barFill: 'bg-purple-500',
      highlight: 'text-purple-700',
      badgeBorder: 'border-purple-200',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      barFill: 'bg-emerald-500',
      highlight: 'text-emerald-700',
      badgeBorder: 'border-emerald-200',
    },
    teal: {
      iconBg: 'bg-teal-50 text-teal-700 border-teal-200',
      barFill: 'bg-teal-500',
      highlight: 'text-teal-700',
      badgeBorder: 'border-teal-200',
    },
  };

  const activeTheme = colorMap[accentColor] || colorMap.teal;

  // Compute severity bar gradient
  const getBarGradient = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return 'bg-gradient-to-r from-orange-500 to-red-600';
      case 'HIGH':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'MODERATE':
        return 'bg-gradient-to-r from-yellow-400 to-amber-500';
      case 'LOW':
      default:
        return 'bg-gradient-to-r from-teal-400 to-emerald-500';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Subtle Status Border Line */}
      <div
        className={`h-1 w-full ${
          riskLevel === 'CRITICAL'
            ? 'bg-red-500'
            : riskLevel === 'HIGH'
            ? 'bg-orange-500'
            : riskLevel === 'MODERATE'
            ? 'bg-amber-400'
            : 'bg-emerald-500'
        }`}
      />

      <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between">
        {/* Header: Icon + Title + Severity Badge */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              {Icon && (
                <div className={`p-2.5 rounded-xl border ${activeTheme.iconBg} shadow-sm shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight leading-snug">
                  {title}
                </h3>
                <span className="text-[11px] font-medium text-slate-500 block truncate max-w-[130px] sm:max-w-[150px]">
                  {status}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <SeverityBadge
                level={riskLevel}
                label={riskLevel}
                size="sm"
                pulse={riskLevel === 'CRITICAL' || riskLevel === 'HIGH'}
              />
            </div>
          </div>
        </div>

        {/* Probability / Percentage Metric Display */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {valueLabel}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono tracking-tight text-slate-900">
                {typeof percentage === 'number' ? `${percentage}%` : percentage}
              </span>
            </div>
          </div>

          {/* Visual Percentage Progress Bar */}
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarGradient()} transition-all duration-500 rounded-full`}
              style={{ width: `${Math.min(Math.max(percentage, 5), 100)}%` }}
            />
          </div>

          {trendText && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium pt-0.5">
              <TrendingUp className="w-3 h-3 text-slate-400" />
              <span>{trendText}</span>
            </div>
          )}
        </div>

        {/* Location & Timestamp Telemetry */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium truncate" title={location}>
              {location}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{updatedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: View Details CTA */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100">
        <Link
          to={detailsPath}
          className="group/link flex items-center justify-between w-full text-xs font-bold text-teal-800 hover:text-teal-950 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
