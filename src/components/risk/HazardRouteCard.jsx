import React from 'react';
import {
  Mountain,
  CloudRain,
  Waves,
  Users,
  Bell,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SeverityBadge from '../common/SeverityBadge';

/**
 * HazardRouteCard - Card for route-specific hazard assessment (Landslide, Cloudburst, GLOF, Crowd, Alerts)
 * Displays: Icon, Status, Risk Level, and Short Explanation.
 */
export default function HazardRouteCard({
  title,
  type = 'landslide', // 'landslide' | 'cloudburst' | 'glof' | 'crowd' | 'alert'
  status,
  riskLevel = 'MODERATE', // 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
  explanation,
  metricLabel,
  metricValue,
  actionPath,
}) {
  const hazardConfigs = {
    landslide: {
      icon: Mountain,
      accentBorder: 'border-l-red-500',
      iconStyle: 'bg-red-50 text-red-700 border-red-200',
      defaultPath: '/landslide',
    },
    cloudburst: {
      icon: CloudRain,
      accentBorder: 'border-l-amber-500',
      iconStyle: 'bg-amber-50 text-amber-700 border-amber-200',
      defaultPath: '/cloudburst',
    },
    glof: {
      icon: Waves,
      accentBorder: 'border-l-sky-500',
      iconStyle: 'bg-sky-50 text-sky-700 border-sky-200',
      defaultPath: '/glof',
    },
    crowd: {
      icon: Users,
      accentBorder: 'border-l-purple-500',
      iconStyle: 'bg-purple-50 text-purple-700 border-purple-200',
      defaultPath: '/crowd-risk',
    },
    alert: {
      icon: Bell,
      accentBorder: 'border-l-red-600',
      iconStyle: 'bg-red-50 text-red-700 border-red-200',
      defaultPath: '/alerts',
    },
  };

  const config = hazardConfigs[type] || hazardConfigs.landslide;
  const Icon = config.icon;
  const path = actionPath || config.defaultPath;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-200 p-5 flex flex-col justify-between border-l-4 ${config.accentBorder}`}
    >
      <div className="space-y-3">
        {/* Top Header: Icon + Title + SeverityBadge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl border ${config.iconStyle} shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                {title}
              </h3>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
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

        {/* Short Explanation Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-normal leading-relaxed">
          {explanation}
        </div>

        {/* Optional Metric Highlight */}
        {metricLabel && (
          <div className="flex items-center justify-between text-xs px-1 pt-1">
            <span className="text-slate-500 font-medium">{metricLabel}:</span>
            <span className="font-mono font-bold text-slate-900">{metricValue}</span>
          </div>
        )}
      </div>

      {/* Footer Link to Dedicated Engine */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-medium">Sensor Corroborated</span>
        <Link
          to={path}
          className="inline-flex items-center gap-1 font-bold text-teal-800 hover:text-teal-950 transition-colors"
        >
          <span>Telemetry & Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
