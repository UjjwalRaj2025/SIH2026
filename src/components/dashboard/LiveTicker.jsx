import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeverityBadge from '../common/SeverityBadge';

export default function LiveTicker({ alerts = [] }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white border border-red-200 p-3.5 sm:p-4 shadow-card hover:shadow-hover transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600 text-white shrink-0 shadow-sm animate-pulse">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <SeverityBadge level="CRITICAL" label="ACTIVE BULLETIN" size="sm" pulse />
              <span className="text-xs text-slate-500 font-mono">
                {alerts[0].timestamp}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
              {alerts[0].title}
            </p>
          </div>
        </div>

        <Link
          to="/alerts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 self-end sm:self-center shrink-0"
        >
          <span>View All ({alerts.length}) Alerts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
