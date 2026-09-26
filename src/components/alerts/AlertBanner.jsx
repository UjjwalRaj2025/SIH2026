import React from 'react';
import { AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2, X } from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

export default function AlertBanner({ alert, onDismiss }) {
  if (!alert) return null;

  const severityMapping = {
    critical: 'CRITICAL',
    warning: 'HIGH',
    advisory: 'MODERATE',
    safe: 'LOW',
  };

  const level = severityMapping[alert.severity] || 'HIGH';

  const severityBg = {
    CRITICAL: 'bg-red-50 border-red-300 text-red-950',
    HIGH: 'bg-orange-50 border-orange-300 text-orange-950',
    MODERATE: 'bg-amber-50 border-amber-300 text-amber-950',
    LOW: 'bg-emerald-50 border-emerald-300 text-emerald-950',
  };

  return (
    <div
      className={`w-full p-4 rounded-2xl border flex items-start justify-between gap-3 shadow-card ${
        severityBg[level] || severityBg.HIGH
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white shadow-subtle shrink-0 mt-0.5 border border-current">
          {level === 'CRITICAL' && <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />}
          {level === 'HIGH' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
          {level === 'MODERATE' && <AlertCircle className="w-5 h-5 text-amber-600" />}
          {level === 'LOW' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <SeverityBadge level={level} size="sm" pulse={level === 'CRITICAL'} />
            <span className="text-xs opacity-75 font-mono">{alert.timestamp}</span>
            <span className="text-xs font-bold text-slate-800">• {alert.location}</span>
          </div>
          <h4 className="font-extrabold text-base mt-1 text-slate-950 tracking-tight">{alert.title}</h4>
          <p className="text-xs sm:text-sm mt-1 text-slate-800 leading-relaxed font-medium">
            {alert.description}
          </p>
          {alert.actionRequired && (
            <div className="mt-2.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/90 border border-current/20 shadow-subtle text-slate-900">
              <span className="font-bold text-red-800 mr-1">Action Required:</span>
              <span>{alert.actionRequired}</span>
            </div>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-black/5 transition"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
