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

      {/* Global Emergency & SIH Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8 mt-12 shadow-subtle">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Platform Info */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-navy-900 text-teal-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-navy-950 tracking-tight">
                CrisisGuard <span className="text-teal-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Unified multi-hazard early warning & situational intelligence platform engineered for
              disaster resilience across Uttarakhand and the Char Dham pilgrim routes.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold">
              <Mountain className="w-3.5 h-3.5" />
              <span>Smart India Hackathon (SIH) 2026</span>
            </div>
          </div>

          {/* Quick Nav: 5 Engines */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              5 Hazard Intelligence Engines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/landslide" className="hover:text-teal-700 transition">
                  Landslide Slope Stability
                </Link>
              </li>
              <li>
                <Link to="/cloudburst" className="hover:text-teal-700 transition">
                  Cloudburst Nowcasting
                </Link>
              </li>
              <li>
                <Link to="/glof" className="hover:text-teal-700 transition">
                  GLOF Moraine Surveillance
                </Link>
              </li>
              <li>
                <Link to="/crowd-risk" className="hover:text-teal-700 transition">
                  Char Dham Pilgrim Flow & Queues
                </Link>
              </li>
              <li>
                <Link to="/fake-news" className="hover:text-teal-700 transition">
                  Crisis Rumor Buster
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Portal Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Portal Corridors
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/" className="hover:text-teal-700 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/risk-map" className="hover:text-teal-700 transition">
                  GIS Multi-Hazard Map
                </Link>
              </li>
              <li>
                <Link to="/journey-risk" className="hover:text-teal-700 transition font-bold text-teal-700">
                  Check Journey Risk
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-teal-700 transition">
                  Active Evacuation Advisories
                </Link>
              </li>
              <li>
                <Link to="/fake-news" className="hover:text-teal-700 transition">
                  Verify Disaster News
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-teal-700 transition">
                  Public Situational Dashboard
                </Link>
              </li>
              <li>
                <Link to="/authority" className="text-red-700 hover:text-red-800 font-extrabold transition">
                  Authority Command HQ &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Helplines */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Emergency Numbers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="font-medium">State Emergency (SEOC):</span>
                <a href="tel:1070" className="text-red-600 font-extrabold hover:underline">
                  1070
                </a>
              </li>
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="font-medium">District Helpline (DEOC):</span>
                <a href="tel:1077" className="text-amber-700 font-bold hover:underline">
                  1077
                </a>
              </li>
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span className="font-medium">Police / Emergency:</span>
                <a href="tel:112" className="text-red-600 font-extrabold hover:underline">
                  112
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium">SDRF Uttarakhand:</span>
                <span className="text-slate-800 font-mono font-bold text-[11px]">+91-9411112999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CrisisGuard AI • Unified Disaster Intelligence Platform.</p>
          <p className="flex items-center gap-1 font-medium">
            Dedicated to disaster risk reduction across the Himalayan belt.
          </p>
        </div>
      </footer>
    </div>
  );
}
