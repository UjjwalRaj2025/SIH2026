import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Activity,
  Radio,
  BarChart3,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

export default function Sidebar({ activeSection, onSelectSection }) {
  const authorityNav = [
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity, badge: 'Live Feed' },
    { id: 'alerts', label: 'Emergency Alerts Dispatcher', icon: Radio, badge: 'CAP' },
    { id: 'analytics', label: 'Disaster Analytics & Trends', icon: BarChart3 },
    { id: 'deployments', label: 'SDRF / NDRF Deployments', icon: Users },
  ];

  return (
    <aside className="w-full lg:w-64 bg-navy-900 border-r border-navy-800 p-4 flex flex-col justify-between shrink-0 shadow-lg text-slate-100">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-extrabold text-xs tracking-wider uppercase px-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Authority Control</span>
          </div>
          <p className="text-xs text-slate-400 px-2 leading-relaxed">
            Uttarakhand SEOC & SDRF Incident Command Module
          </p>
        </div>

        <nav className="space-y-1.5">
          {authorityNav.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection?.(item.id)}
                type="button"
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isSelected
                    ? 'bg-navy-800 text-white border border-teal-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-950 text-teal-300 border border-navy-700 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-navy-800 mt-6">
        <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">System Status:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Telemetry Nodes:</span>
            <span className="text-white font-mono font-bold">148 Active</span>
          </div>
        </div>

        <NavLink
          to="/dashboard"
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-bold transition border border-navy-700 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Citizen View</span>
        </NavLink>
      </div>
    </aside>
  );
}
