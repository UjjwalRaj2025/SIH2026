import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { ShieldAlert, Heart, PhoneCall, ExternalLink, Mountain } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-teal-600 selection:text-white">
      {/* Primary Global Navigation in Deep Navy */}
      <Navbar />

      {/* Main Page Body with Clean Light Background and subtle topo pattern */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-mountain-pattern">
        <Outlet />
      </main>

      {/* Global Crisis & SIH Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8 mt-12 shadow-subtle">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-navy-900 text-teal-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-navy-950 tracking-tight">
                CrisisGuard <span className="text-teal-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unified multi-hazard early warning & situational intelligence platform engineered for
              disaster resilience across Uttarakhand and the Char Dham pilgrim routes.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-bold">
              <Mountain className="w-3.5 h-3.5" />
              <span>Smart India Hackathon (SIH) 2026</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              5 Hazard Intelligence Engines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/landslide" className="hover:text-teal-700 transition font-medium">
                  Landslide Slope Stability
                </Link>
              </li>
              <li>
                <Link to="/cloudburst" className="hover:text-teal-700 transition font-medium">
                  Cloudburst Nowcasting
                </Link>
              </li>
              <li>
                <Link to="/glof" className="hover:text-teal-700 transition font-medium">
                  GLOF Moraine Surveillance
                </Link>
              </li>
              <li>
                <Link to="/crowd-risk" className="hover:text-teal-700 transition font-medium">
                  Char Dham Pilgrim Flow & Queues
                </Link>
              </li>
              <li>
                <Link to="/fake-news" className="hover:text-teal-700 transition font-medium">
                  Crisis Rumor Buster
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Emergency Corridors
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/journey-risk" className="hover:text-teal-700 transition font-medium">
                  Safe Route Planner
                </Link>
              </li>
              <li>
                <Link to="/risk-map" className="hover:text-teal-700 transition font-medium">
                  GIS Multi-Hazard Map
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="hover:text-teal-700 transition font-medium">
                  Active Evacuation Advisories
                </Link>
              </li>
              <li>
                <Link to="/authority" className="text-red-700 hover:text-red-800 font-bold transition">
                  Authority Command Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">
              Official Crisis Helplines
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span>State Disaster Control (SEOC):</span>
                <a href="tel:1070" className="text-red-600 font-extrabold hover:underline">
                  1070
                </a>
              </li>
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span>District Emergency (DEOC):</span>
                <a href="tel:1077" className="text-amber-700 font-bold hover:underline">
                  1077
                </a>
              </li>
              <li className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <span>Police / All Emergency:</span>
                <a href="tel:112" className="text-red-600 font-extrabold hover:underline">
                  112
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>SDRF Uttarakhand:</span>
                <span className="text-slate-700 font-mono font-bold text-[11px]">+91-9411112999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 CrisisGuard AI • Unified Disaster Intelligence Platform.</p>
          <p className="flex items-center gap-1">
            Dedicated to disaster risk reduction in the Himalayan belt.
          </p>
        </div>
      </footer>
    </div>
  );
}
