import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Home,
  MapPin,
  Navigation,
  Bell,
  CheckCircle2,
  Activity,
  Menu,
  User,
  LogOut,
  PhoneCall,
  Search,
} from 'lucide-react';
import MobileMenu from './MobileMenu';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import SeverityBadge from '../common/SeverityBadge';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Disaster Analyst',
    email: 'analyst@crisisguard.in',
    role: 'SDRF Geospatial Cell',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // The 6 specified primary navigation routes
  const navLinks = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'Risk Map', path: '/risk-map', icon: MapPin },
    { name: 'Journey Risk', path: '/journey-risk', icon: Navigation },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Verify News', path: '/fake-news', icon: CheckCircle2 },
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
  ];

  const handleCheckRisk = () => {
    navigate('/journey-risk');
  };

  const handleToggleAuth = () => {
    if (isLoggedIn) {
      setAuthModalOpen(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy-900/95 backdrop-blur-md border-b border-navy-800 shadow-md">
        {/* Top Emergency Status Bar */}
        <div className="bg-navy-950 border-b border-navy-800/80 px-4 sm:px-6 py-1 text-xs text-slate-300 flex items-center justify-between overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-3">
            <SeverityBadge level="CRITICAL" label="STATE ADVISORY ACTIVE" size="sm" pulse variant="solid" />
            <span className="text-slate-300 font-medium">
              NH-07 Lambagar Single-Lane • High Convective Watch: Upper Mandakini Valley
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 shrink-0 pl-4">
            <a
              href="tel:1070"
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>State Emergency: 1070</span>
            </a>
            <span className="text-navy-700">|</span>
            <span className="text-teal-400 font-semibold">SIH 2026 Edition</span>
          </div>
        </div>

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

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Prominent "Check Risk" Button */}
              <button
                type="button"
                onClick={handleCheckRisk}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white font-extrabold text-xs tracking-wide shadow-md shadow-teal-950/40 border border-teal-400/40 transition-all duration-200 hover:shadow-lg hover:shadow-teal-900/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-200 group-hover:rotate-12 transition-transform duration-200" />
                <span>Check Risk</span>
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </button>

              {/* Sign In / User Button */}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 text-xs font-semibold transition shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="User Account Profile"
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-950 border border-teal-700 flex items-center justify-center text-teal-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="max-w-[110px] truncate">{user.name}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 text-xs font-bold transition shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <User className="w-3.5 h-3.5 text-teal-400" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: Check Risk + Hamburger Menu */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={handleCheckRisk}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-700 text-white font-bold text-xs shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Check Risk</span>
              </button>

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
        navLinks={navLinks}
        onCheckRisk={handleCheckRisk}
        onSignIn={() => setAuthModalOpen(true)}
        user={isLoggedIn ? user : null}
      />

      {/* User Profile / Authentication Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={isLoggedIn ? 'User Profile & Identity' : 'Sign In to CrisisGuard AI'}
        subtitle={
          isLoggedIn
            ? 'Connected to Uttarakhand Disaster Warning Network'
            : 'Access authenticated emergency telemetry & broadcast tools'
        }
        maxWidth="max-w-md"
        footer={
          isLoggedIn ? (
            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                icon={LogOut}
                onClick={() => {
                  setIsLoggedIn(false);
                  setAuthModalOpen(false);
                }}
              >
                Sign Out
              </Button>
              <Button variant="navy" size="sm" onClick={() => setAuthModalOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-2 w-full">
              <Button variant="secondary" size="sm" onClick={() => setAuthModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsLoggedIn(true);
                  setAuthModalOpen(false);
                }}
              >
                Sign In
              </Button>
            </div>
          )
        }
      >
        {isLoggedIn ? (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-900 text-teal-400 flex items-center justify-center font-black text-lg">
                DA
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{user.name}</h4>
                <p className="text-slate-500 font-medium">{user.email}</p>
                <div className="mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-semibold text-[11px]">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Identity Authorization:</span>
                <span className="font-bold text-emerald-700">Verified Personnel</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">CAP Broadcast Privilege:</span>
                <span className="font-bold text-navy-900">Level 2 Field Dispatch</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Duty Sector:</span>
                <span className="font-bold text-slate-800">Kedarnath / Chamoli Axis</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Input label="Official Email / Mobile" placeholder="name@emergency.gov.in" />
            <Input label="Access Key / OTP" type="password" placeholder="••••••••" />
            <p className="text-xs text-slate-500 font-medium pt-1">
              Authorized emergency personnel, district officials, and registered pilgrims can sign in.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
