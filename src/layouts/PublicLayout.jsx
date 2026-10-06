import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import PageContainer from '../components/common/PageContainer';
import { ShieldAlert, Mountain, PhoneCall, Heart } from 'lucide-react';

export default function PublicLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-600 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-slate-50">
        {isHomePage ? (
          <Outlet />
        ) : (
          <PageContainer>
            <Outlet />
          </PageContainer>
        )}
      </main>

      {/* Global Compact Emergency & SIH Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 mt-10 shadow-subtle">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4 border-b border-slate-100">
          {/* Logo & Compact Info */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-navy-900 text-teal-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="font-black text-base text-navy-950 tracking-tight">
                CrisisGuard <span className="text-teal-600">AI</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-bold">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-snug font-medium">
              Unified multi-hazard early warning & situational intelligence for Uttarakhand & the Char Dham pilgrim routes.
            </p>
          </div>

          {/* Quick Nav Links (Horizontal) */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600">
            <Link to="/" className="hover:text-teal-700 transition">Home</Link>
            <Link to="/journey-risk" className="hover:text-teal-700 transition text-teal-700 font-bold">Check Journey Risk</Link>
            <Link to="/alerts" className="hover:text-teal-700 transition">Live Alerts</Link>
            <Link to="/about" className="hover:text-teal-700 transition">About</Link>
            <Link to="/fake-news" className="hover:text-teal-700 transition">Verify Rumors</Link>
          </div>

          {/* Emergency Numbers (Compact horizontal pills) */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-extrabold hover:bg-red-700 transition shadow-xs"
              title="National Emergency Helpline"
            >
              <PhoneCall className="w-3 h-3" />
              <span>SOS 112</span>
            </a>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700">
              <span className="text-slate-400">SEOC:</span>
              <a href="tel:1070" className="font-bold text-red-600 hover:underline">1070</a>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700">
              <span className="text-slate-400">DEOC:</span>
              <a href="tel:1077" className="font-bold text-amber-700 hover:underline">1077</a>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700">
              <span className="text-slate-400">SDRF:</span>
              <span className="font-bold font-mono text-slate-800 text-[10px]">+91-9411112999</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="max-w-7xl mx-auto pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© 2026 CrisisGuard AI • Unified Disaster Intelligence Platform.</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Official Telemetry: <strong>IMD (MoES)</strong> & <strong>GSI BhuSanket</strong></span>
          </p>
        </div>
      </footer>
    </div>
  );
}
