import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Home,
  MapPin,
  Navigation,
  Bell,
  CheckCircle2,
  Menu,
  Info,
} from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // The 5 specified primary navigation routes (Home, Journey Risk, Risk Map, Disaster News, Verify News)
  const navLinks = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'Journey Risk', path: '/journey-risk', icon: Navigation },
    { name: 'Risk Map', path: '/risk-map', icon: MapPin },
    { name: 'Disaster News', path: '/alerts', icon: Bell },
    { name: 'Verify News', path: '/fake-news', icon: CheckCircle2 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy-900/95 backdrop-blur-md border-b border-navy-800 shadow-md">
        {/* Primary Navigation Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo: CrisisGuard AI */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-navy-900 rounded-xl"
              aria-label="CrisisGuard AI Home"
            >
              <div className="p-2 rounded-xl bg-navy-800 border border-teal-500/40 text-teal-400 group-hover:border-teal-400 transition shadow-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                    Crisis<span className="text-teal-400">Guard</span>
                  </span>
                  <span className="text-[10px] font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-700">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Unified Disaster Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5"
              aria-label="Main Navigation"
            >
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                      isActive
                        ? 'bg-navy-800 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800/60 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'} shrink-0`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-400 rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop Right Side: About Section */}
            <div className="hidden lg:flex items-center gap-3">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 border ${
                    isActive
                      ? 'bg-navy-800 text-teal-300 border-teal-500/40 shadow-sm'
                      : 'bg-navy-800/60 text-slate-300 hover:text-white hover:bg-navy-800 border-navy-700/80'
                  }`
                }
              >
                <Info className="w-4 h-4 text-teal-400" />
                <span>About</span>
              </NavLink>
            </div>

            {/* Mobile Actions: Hamburger Menu */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 transition focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={[...navLinks, { name: 'About', path: '/about', icon: Info }]}
      />
    </>
  );
}
