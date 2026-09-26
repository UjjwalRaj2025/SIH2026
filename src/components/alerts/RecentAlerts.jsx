import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertTriangle,
  Mountain,
  CloudRain,
  Waves,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * RecentAlerts - Live active emergency alerts feed for the CrisisGuard AI dashboard.
 * Positioned to the right of the interactive risk map with filtering, status pulses, and quick detail triggers.
 */
export default function RecentAlerts({
  alerts = [],
  onSelectAlert,
  maxHeight = '540px',
}) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  // Filter alerts by severity
  const filteredAlerts = alerts.filter((item) => {
    if (filterSeverity === 'ALL') return true;
    return item.severity?.toUpperCase() === filterSeverity;
  });

  const getHazardIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('landslide')) return Mountain;
    if (t.includes('cloudburst') || t.includes('rain')) return CloudRain;
    if (t.includes('glof') || t.includes('flood') || t.includes('lake')) return Waves;
    if (t.includes('crowd')) return Users;
    return AlertTriangle;
  };

  const criticalCount = alerts.filter((a) => a.severity?.toUpperCase() === 'CRITICAL').length;
  const highCount = alerts.filter((a) => a.severity?.toUpperCase() === 'HIGH').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card flex flex-col overflow-hidden h-full">
      {/* Alerts Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-200">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-slate-900 text-sm tracking-tight">
                  Active Alerts
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-navy-900 text-white">
                  {filteredAlerts.length}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                USDMA Common Alerting Protocol
              </span>
            </div>
          </div>

          {(criticalCount > 0 || highCount > 0) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>{criticalCount + highCount} Urgent</span>
            </span>
          )}
        </div>

        {/* Severity Filter Chips */}
        <div className="flex items-center gap-1.5 text-xs">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((sev) => {
            const isSelected = filterSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                type="button"
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {sev === 'ALL' ? 'All' : sev}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Alerts List */}
      <div
        className="divide-y divide-slate-100 overflow-y-auto p-2 space-y-2 flex-1 scrollbar-thin"
        style={{ maxHeight }}
      >
        {filteredAlerts.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-2">
            <ShieldAlert className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">
              No active alerts for this severity tier.
            </p>
            <p className="text-[11px] text-slate-400">
              Corridors are currently stable under standard surveillance.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const HazardIcon = getHazardIcon(alert.type || alert.hazard || '');
            const isCritical = alert.severity?.toUpperCase() === 'CRITICAL';
            const isHigh = alert.severity?.toUpperCase() === 'HIGH';

            return (
              <div
                key={alert.id}
                onClick={() => onSelectAlert && onSelectAlert(alert)}
                className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                  isCritical
                    ? 'bg-red-50/40 border-red-200 hover:bg-red-50 hover:border-red-300'
                    : isHigh
                    ? 'bg-amber-50/30 border-amber-200 hover:bg-amber-50 hover:border-amber-300'
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/80'
                }`}
              >
                <div className="space-y-2">
                  {/* Top row: Severity + Hazard Type + Timestamp */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <HazardIcon
                        className={`w-3.5 h-3.5 ${
                          isCritical
                            ? 'text-red-600'
                            : isHigh
                            ? 'text-amber-600'
                            : 'text-slate-600'
                        }`}
                      />
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                        {alert.type || alert.hazard || 'Disaster Alert'}
                      </span>
                    </div>

                    <SeverityBadge
                      level={alert.severity || 'MODERATE'}
                      label={alert.severity || 'MODERATE'}
                      size="sm"
                      pulse={isCritical || isHigh}
                    />
                  </div>

                  {/* Alert Headline */}
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-900 leading-snug">
                    {alert.title}
                  </h4>

                  {/* Affected Location & Time */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <div className="flex items-center gap-1 truncate max-w-[170px]">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-700 truncate">
                        {alert.location || alert.affectedArea}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{alert.timestamp || 'Recent'}</span>
                    </div>
                  </div>

                  {/* Immediate Advisory Directive */}
                  {alert.advisory && (
                    <p className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-200/70 leading-relaxed font-normal">
                      <span className="font-semibold text-slate-800">Action:</span> {alert.advisory}
                    </p>
                  )}

                  {/* Bottom View Details Link */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-teal-700 group-hover:text-teal-900 pt-1">
                    <span>Inspect protocol & dispatch</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer: View All Alerts */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <Link
          to="/alerts"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-navy-950 transition shadow-sm"
        >
          <span>View All Official Advisories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
