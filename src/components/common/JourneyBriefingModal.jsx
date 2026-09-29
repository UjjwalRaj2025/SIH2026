import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  X,
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  ArrowUpRight,
  Info,
  Check,
  MapPin,
  Navigation,
  Activity,
} from 'lucide-react';

const BOARDING_POINTS = [
  // Foothills Gateway Bases (Haridwar & Rishikesh separated)
  { name: 'Haridwar', desc: 'Railway Station & Har Ki Pauri Base', badge: 'Foothills' },
  { name: 'Rishikesh', desc: 'Char Dham Bus Terminal & Tapovan', badge: 'Foothills' },
  { name: 'Dehradun (ISBT)', desc: 'Inter-State Bus Terminus, Capital Hub', badge: 'Capital' },
  { name: 'Dehradun (Jolly Grant Airport)', desc: 'Commercial Flight Arrival Terminal', badge: 'Airport' },
  { name: 'Haldwani / Kathgodam', desc: 'Kumaon Railhead & Foothills Hub', badge: 'Kumaon' },
  { name: 'Kotdwar', desc: 'Southern Garhwal Entry & Rail Station', badge: 'Gateway' },

  // Interstate Departure Gateways
  { name: 'Delhi / NCR (ISBT Kashmere Gate)', desc: 'National Capital Region Departure', badge: 'Delhi NCR' },
  { name: 'Delhi (IGI Airport)', desc: 'Indira Gandhi International Airport', badge: 'Interstate' },
  { name: 'Chandigarh (ISBT 43)', desc: 'North Interstate Highway Hub', badge: 'Interstate' },
  { name: 'Roorkee', desc: 'IIT Roorkee / NH-334 Highway Base', badge: 'Highway' },
  { name: 'Meerut', desc: 'Delhi-Meerut Expressway Corridor', badge: 'UP West' },
  { name: 'Saharanpur', desc: 'Western UP / Yamuna Route Junction', badge: 'Railhead' },

  // Mountain Transit Bases & Confluences
  { name: 'Devprayag', desc: 'Alaknanda & Bhagirathi Sangam Base', badge: 'Mid-Route' },
  { name: 'Srinagar Garhwal', desc: 'Central Highway & Medical Base', badge: 'Garhwal' },
  { name: 'Rudraprayag', desc: 'Mandakini & Alaknanda Confluence', badge: 'Confluence' },
  { name: 'Karnaprayag', desc: 'Pindar & Alaknanda Confluence', badge: 'Confluence' },
];

const DESTINATIONS = [
  { name: 'Kedarnath Dham', valley: 'Mandakini Valley', risk: 'High' },
  { name: 'Badrinath Dham', valley: 'Alaknanda Valley', risk: 'Moderate' },
  { name: 'Gangotri Dham', valley: 'Bhagirathi Valley', risk: 'Low' },
  { name: 'Yamunotri Dham', valley: 'Rawai Valley', risk: 'Moderate' },
  { name: 'Hemkund Sahib', valley: 'Bhyundar Valley', risk: 'Moderate' },
  { name: 'Valley of Flowers', valley: 'Chamoli Alpine Valley', risk: 'Moderate' },
  { name: 'Joshimath', valley: 'Chamoli District Base', risk: 'Moderate' },
  { name: 'Auli', valley: 'High Altitude Ski Ridge', risk: 'Moderate' },
  { name: 'Tungnath / Chopta', valley: 'Rudraprayag Alpine Range', risk: 'Low' },
  { name: 'Uttarkashi', valley: 'Bhagirathi Gorge Base', risk: 'Low' },
  { name: 'Rishikesh', valley: 'Foothills Base', risk: 'Low' },
  { name: 'Haridwar', valley: 'Ganga Plains Entry', risk: 'Low' },
];

export default function JourneyBriefingModal({
  isOpen,
  onClose,
  initialOrigin,
  initialDestination,
  onApplyRoute,
}) {
  const navigate = useNavigate();
  const [boardingPoint, setBoardingPoint] = useState(initialOrigin || 'Haridwar');
  const [boardingSearch, setBoardingSearch] = useState(initialOrigin || 'Haridwar');
  const [boardingDropdownOpen, setBoardingDropdownOpen] = useState(false);

  const [destination, setDestination] = useState(initialDestination || 'Kedarnath Dham');
  const [searchQuery, setSearchQuery] = useState(initialDestination || 'Kedarnath Dham');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [journeyDate, setJourneyDate] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });
  const [rawIsoDate, setRawIsoDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const boardingRef = useRef(null);
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);

  // Synchronize when initial values change
  useEffect(() => {
    if (initialOrigin) {
      setBoardingPoint(initialOrigin);
      setBoardingSearch(initialOrigin);
    }
  }, [initialOrigin]);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
      setSearchQuery(initialDestination);
    }
  }, [initialDestination]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (boardingRef.current && !boardingRef.current.contains(event.target)) {
        setBoardingDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter boarding points
  const filteredBoardingPoints = BOARDING_POINTS.filter((item) => {
    if (!boardingSearch || boardingSearch.trim() === '' || boardingSearch.trim() === boardingPoint) {
      return true;
    }
    const q = boardingSearch.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.desc && item.desc.toLowerCase().includes(q)) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  // Filter destinations
  const filteredDestinations = DESTINATIONS.filter((item) => {
    if (!searchQuery || searchQuery.trim() === '' || searchQuery.trim() === destination) {
      return true;
    }
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      (item.valley && item.valley.toLowerCase().includes(q))
    );
  });

  const handleSelectBoarding = (name) => {
    setBoardingPoint(name);
    setBoardingSearch(name);
    setBoardingDropdownOpen(false);
  };

  const handleSelectDestination = (destName) => {
    setDestination(destName);
    setSearchQuery(destName);
    setDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    const isoVal = e.target.value;
    if (isoVal) {
      setRawIsoDate(isoVal);
      const [yyyy, mm, dd] = isoVal.split('-');
      setJourneyDate(`${dd}-${mm}-${yyyy}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOrigin = boardingPoint || 'Haridwar';
    const finalDest = destination || 'Kedarnath Dham';
    if (onApplyRoute) {
      onApplyRoute(finalOrigin, finalDest, rawIsoDate);
    } else {
      onClose();
      navigate('/journey-risk', {
        state: {
          fromLocation: finalOrigin,
          toLocation: finalDest,
          travelDate: rawIsoDate,
        },
      });
    }
  };

  const handleOpenDetailedMatrix = () => {
    const finalOrigin = boardingPoint || 'Haridwar';
    const finalDest = destination || 'Kedarnath Dham';
    if (onApplyRoute) {
      onApplyRoute(finalOrigin, finalDest, rawIsoDate);
    }
    onClose();
    navigate('/journey-risk', {
      state: {
        fromLocation: finalOrigin,
        toLocation: finalDest,
        travelDate: rawIsoDate,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[460px] rounded-2xl bg-[#0d1d2b] border border-white/10 shadow-2xl p-6 sm:p-7 text-white z-10 transition-all duration-200">
        {/* Top Header Row: Badge & Close Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>PERSONAL JOURNEY BRIEFING</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition focus:outline-none cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Heading & Subtitle */}
        <div className="mt-3.5 space-y-1.5">
          <h2 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug">
            Where are you going?
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-300/90 font-normal leading-relaxed">
            Select your boarding point, destination, and journey date to customize live regional telemetry.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {/* 1. Boarding point */}
          <div ref={boardingRef} className="relative">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Boarding point
            </label>

            <div
              onClick={() => {
                setBoardingDropdownOpen((prev) => !prev);
                setDropdownOpen(false);
              }}
              className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl bg-[#07131e] border border-white/15 hover:border-white/30 text-sm text-white cursor-pointer transition focus-within:ring-2 focus-within:ring-teal-400/50"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={boardingSearch}
                  onChange={(e) => {
                    setBoardingSearch(e.target.value);
                    setBoardingPoint(e.target.value);
                    if (!boardingDropdownOpen) setBoardingDropdownOpen(true);
                  }}
                  onFocus={() => {
                    setBoardingDropdownOpen(true);
                    setDropdownOpen(false);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setBoardingDropdownOpen(true);
                    setDropdownOpen(false);
                  }}
                  placeholder="Select or search boarding point"
                  className="bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
                />
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                  boardingDropdownOpen ? 'rotate-180 text-teal-400' : ''
                }`}
              />
            </div>

            {/* Boarding Dropdown Menu */}
            {boardingDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-xl bg-[#091724] border border-white/15 shadow-2xl z-40 py-1.5 divide-y divide-white/5">
                {filteredBoardingPoints.length > 0 ? (
                  filteredBoardingPoints.map((item) => {
                    const isSelected = boardingPoint === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleSelectBoarding(item.name)}
                        className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer ${
                          isSelected ? 'bg-teal-950/70 text-teal-300 font-bold' : 'text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <Navigation className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold truncate">{item.name}</span>
                              {item.badge && (
                                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-white/10 text-slate-300 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 block truncate">{item.desc}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3.5 py-3 text-xs text-slate-400 text-center">
                    No boarding points match "{boardingSearch}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Select destination */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Select destination
            </label>

            <div
              onClick={() => {
                setDropdownOpen((prev) => !prev);
                setBoardingDropdownOpen(false);
              }}
              className="flex items-center justify-between w-full px-3.5 py-3 rounded-xl bg-[#07131e] border border-white/15 hover:border-white/30 text-sm text-white cursor-pointer transition focus-within:ring-2 focus-within:ring-teal-400/50"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDestination(e.target.value);
                    if (!dropdownOpen) setDropdownOpen(true);
                  }}
                  onFocus={() => {
                    setDropdownOpen(true);
                    setBoardingDropdownOpen(false);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(true);
                    setBoardingDropdownOpen(false);
                  }}
                  placeholder="Search Uttarakhand destinations"
                  className="bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
                />
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-teal-400' : ''
                }`}
              />
            </div>

            {/* Destination Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-xl bg-[#091724] border border-white/15 shadow-2xl z-30 py-1.5 divide-y divide-white/5">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((item) => {
                    const isSelected = destination === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleSelectDestination(item.name)}
                        className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs sm:text-sm hover:bg-white/10 transition cursor-pointer ${
                          isSelected ? 'bg-teal-950/70 text-teal-300 font-bold' : 'text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="block font-semibold truncate">{item.name}</span>
                            <span className="text-[11px] text-slate-400 block truncate">{item.valley}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-teal-400 shrink-0" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3.5 py-3 text-xs text-slate-400 text-center">
                    No destinations match your search
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Journey date */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Journey date
            </label>
            <div
              onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.focus()}
              className="relative flex items-center justify-between w-full px-3.5 py-3 rounded-xl bg-[#07131e] border border-white/15 hover:border-white/30 text-sm text-white cursor-pointer transition focus-within:ring-2 focus-within:ring-teal-400/50"
            >
              <span className="text-xs sm:text-sm font-medium text-slate-100 font-mono tracking-wide">
                {journeyDate}
              </span>
              <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Hidden native date input to trigger native picker */}
              <input
                ref={dateInputRef}
                type="date"
                value={rawIsoDate}
                onChange={handleDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                aria-label="Select journey date"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#b5dec9] hover:bg-[#a2d4b8] text-[#071924] font-bold text-sm tracking-wide shadow-md shadow-emerald-950/20 active:scale-[0.99] transition-all duration-150 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#071924]" />
              <span>Apply to Live Telemetry Dashboard</span>
            </button>

            <button
              type="button"
              onClick={handleOpenDetailedMatrix}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs border border-white/10 transition-all duration-150 cursor-pointer"
            >
              <span>Proceed to Full Route Assessment</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 stroke-[2.5]" />
            </button>
          </div>

          {/* Footer Advisory Disclaimer */}
          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-400/90 text-center">
            <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span>Updates Live Corridor Telemetry on your dashboard in real-time.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
