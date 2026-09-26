import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Radio, Bell, AlertTriangle } from 'lucide-react';
import SeverityBadge from '../components/common/SeverityBadge';

export default function AuthorityLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Authority Command Header in Deep Navy */}
      <header className="sticky top-0 z-40 border-b border-navy-800 bg-navy-950 text-white px-4 sm:px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700 transition"
              title="Return to Citizen Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-950 border border-red-700 text-red-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-white text-base sm:text-lg tracking-tight">
                    CrisisGuard <span className="text-red-400">Authority HQ</span>
                  </span>
                  <SeverityBadge level="CRITICAL" label="COMMAND SEOC ACTIVE" size="sm" pulse variant="solid" />
                </div>
                <p className="text-[10px] text-slate-400">
                  State Emergency Operations Centre (SEOC) & SDRF Incident Command
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-800 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Satellite & Radar Sync: Active</span>
            </div>
            <Link
              to="/dashboard"
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 transition shadow-sm"
            >
              Exit to Citizen View
            </Link>
          </div>
        </div>
      </header>

      {/* Authority Viewport with Clean Light Background */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-mountain-pattern">
        <Outlet />
      </main>
    </div>
  );
}
