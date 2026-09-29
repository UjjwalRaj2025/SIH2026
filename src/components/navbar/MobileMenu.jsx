import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldAlert,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks = [],
}) {
  // Lock body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy-950/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-navy-900 border-l border-navy-800 shadow-2xl flex flex-col justify-between z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Drawer Header */}
            <div>
              <div className="p-4 sm:p-5 border-b border-navy-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-navy-800 border border-teal-500/40 text-teal-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-black text-white text-base tracking-tight">
                      Crisis<span className="text-teal-400">Guard</span>
                    </span>
                    <span className="text-[10px] ml-1.5 font-bold px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-700">
                      AI
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                          isActive
                            ? 'bg-navy-800 text-teal-300 border border-teal-500/40 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-navy-800/60 border border-transparent'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions: Emergency Hotline */}
            <div className="p-4 sm:p-5 border-t border-navy-800 bg-navy-950/70">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Emergency SEOC Hotline:</span>
                <a
                  href="tel:1070"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 font-extrabold hover:bg-red-900/60 transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>1070</span>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
