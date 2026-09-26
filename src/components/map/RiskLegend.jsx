import React, { useState } from 'react';
import {
  Shield,
  Mountain,
  CloudRain,
  Waves,
  Users,
  Bell,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';

/**
 * RiskLegend - Floating collapsible map legend for the CrisisGuard Risk Map.
 * Displays both 4-tier severity levels and multi-hazard layer iconography.
 */
export default function RiskLegend({ position = 'bottom-right' }) {
  const [collapsed, setCollapsed] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
  };

  const activePos = positionClasses[position] || positionClasses['bottom-right'];

  return (
    <div
      className={`absolute ${activePos} z-[400] max-w-[270px] w-full rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-elevated transition-all duration-200 overflow-hidden font-sans`}
    >
      {/* Legend Header */}
      <div className="px-3.5 py-2.5 bg-slate-50/80 border-b border-slate-200/70 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-teal-700" />
          <span className="font-extrabold text-xs text-slate-900 tracking-tight">
            Map Legend
          </span>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          type="button"
          className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 transition"
          aria-label={collapsed ? 'Expand Legend' : 'Collapse Legend'}
        >
          {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="p-3.5 space-y-3 text-xs">
          {/* 1. Severity Scale */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Severity Levels
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0 shadow-xs" />
                <span className="font-semibold text-slate-800">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0 shadow-xs" />
                <span className="font-semibold text-slate-800">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                <span className="font-semibold text-slate-800">Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-xs" />
                <span className="font-semibold text-slate-800">Low / Clear</span>
              </div>
            </div>
          </div>

          {/* 2. Hazard Layer Types */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Hazard Layers
            </span>
            <div className="space-y-1 text-[11px] text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60">
                  <Mountain className="w-3 h-3" />
                </div>
                <span>Landslide & Rockfall</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                  <CloudRain className="w-3 h-3" />
                </div>
                <span>Cloudburst Radar Swath</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200/60">
                  <Waves className="w-3 h-3" />
                </div>
                <span>GLOF Glacial Lake Basin</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/60">
                  <Users className="w-3 h-3" />
                </div>
                <span>Pilgrim Crowd Chokepoint</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-200/60">
                  <Bell className="w-3 h-3" />
                </div>
                <span>Urgent Emergency Alert</span>
              </div>
            </div>
          </div>

          {/* 3. Highway Routes Info */}
          <div className="pt-1.5 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-500 font-medium">
            <span className="w-4 h-0.5 bg-amber-600 border-dashed border-b border-amber-600 inline-block" />
            <span>NH-07 & NH-107 Pilgrimage Corridors</span>
          </div>
        </div>
      )}
    </div>
  );
}
