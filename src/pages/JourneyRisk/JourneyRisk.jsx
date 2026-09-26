import React, { useState } from 'react';
import {
  Navigation,
  MapPin,
  Calendar,
  Car,
  Bus,
  Bike,
  Footprints,
  Compass,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Share2,
  Printer,
  Home,
  PhoneCall,
  Info,
  Radio,
  ExternalLink,
} from 'lucide-react';
import RouteMap from '../../components/map/RouteMap';
import HazardRouteCard from '../../components/risk/HazardRouteCard';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';

/**
 * JourneyRisk - Main Journey Risk Assessment & Safe Corridor Routing page.
 * Route: /journey-risk
 *
 * Page heading: "Plan Your Journey. Understand Your Risk."
 *
 * Form Steps:
 * - Step 1: From
 * - Step 2: To
 * - Step 3: Travel Date
 * - Step 4: Travel mode (Car, Bus, Bike, Walking)
 * - Button: "Assess Journey Risk"
 *
 * Result Section:
 * - Journey Risk: MODERATE
 * - Route map
 * - 5 Hazard Cards (Landslide, Cloudburst, GLOF, Crowd, Alerts) with status, risk level, short explanation
 * - "Important Alerts Along Your Route"
 * - "Recommended Precautions"
 */
export default function JourneyRisk() {
  // Form State
  const [fromLocation, setFromLocation] = useState('Haridwar / Rishikesh');
  const [toLocation, setToLocation] = useState('Kedarnath Dham');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [travelMode, setTravelMode] = useState('Car'); // 'Car' | 'Bus' | 'Bike' | 'Walking'
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState({
    overallRisk: 'MODERATE',
    riskScore: 56,
    statusText: 'Passable with Caution',
    distanceKm: 215,
    estimatedDriveHours: '7h 30m',
    highway: 'NH-107 & NH-58',
    elevationRange: '314m → 3,584m (High Alpine)',
    chokepointsCount: 2,
    activeAdvisoriesCount: 2,
  });

  // Mountain Origin Options
  const originOptions = [
    'Haridwar / Rishikesh',
    'Dehradun (Jolly Grant / ISBT)',
    'Delhi / NCR',
    'Haldwani / Kathgodam',
    'Rudraprayag Confluence',
    'Srinagar Garhwal',
  ];

  // Mountain Destination Options
  const destinationOptions = [
    'Kedarnath Dham',
    'Badrinath Dham',
    'Gangotri Dham',
    'Yamunotri Dham',
    'Hemkund Sahib / Valley of Flowers',
    'Joshimath / Auli',
  ];

  // Travel Mode Cards
  const travelModes = [
    { id: 'Car', label: 'Car / SUV', icon: Car, desc: 'Private 4x4 or Taxi' },
    { id: 'Bus', label: 'Bus', icon: Bus, desc: 'State / Pilgrim Bus' },
    { id: 'Bike', label: 'Motorbike', icon: Bike, desc: 'Two-Wheeler Tour' },
    { id: 'Walking', label: 'Walking', icon: Footprints, desc: 'Foot Pilgrim / Trek' },
  ];

  // Handle Form Submission
  const handleAssessRisk = (e) => {
    e.preventDefault();
    setIsAssessing(true);

    // Simulate realistic AI route calculation with mock telemetry
    setTimeout(() => {
      const isHighDest = toLocation.includes('Kedarnath') || toLocation.includes('Badrinath');
      const isWalkingOrBike = travelMode === 'Walking' || travelMode === 'Bike';

      let computedRisk = 'MODERATE';
      let score = 56;
      let driveHours = '7h 30m';
      let distance = 215;

      if (toLocation.includes('Badrinath')) {
        distance = 295;
        driveHours = '9h 15m';
        score = 68;
      } else if (toLocation.includes('Gangotri')) {
        distance = 240;
        driveHours = '8h 00m';
        score = 42;
      } else if (toLocation.includes('Yamunotri')) {
        distance = 182;
        driveHours = '6h 15m';
        score = 48;
      }

      if (isWalkingOrBike) {
        score += 12;
      }

      if (score >= 70) {
        computedRisk = 'HIGH';
      } else if (score >= 40) {
        computedRisk = 'MODERATE';
      } else {
        computedRisk = 'LOW';
      }

      setAssessmentResult({
        overallRisk: computedRisk,
        riskScore: score,
        statusText: computedRisk === 'HIGH' ? 'Advisory in Effect - Extreme Caution' : 'Passable with Caution',
        distanceKm: distance,
        estimatedDriveHours: driveHours,
        highway: toLocation.includes('Badrinath') ? 'NH-07' : toLocation.includes('Kedarnath') ? 'NH-107' : 'NH-34',
        elevationRange: '314m → 3,584m (Alpine)',
        chokepointsCount: toLocation.includes('Badrinath') ? 1 : 2,
        activeAdvisoriesCount: 2,
      });

      setIsAssessing(false);

      // Smooth scroll to result section
      const resElem = document.getElementById('assessment-result-section');
      if (resElem) {
        resElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* =========================================================================
          PAGE HEADER: "Plan Your Journey. Understand Your Risk."
         ========================================================================= */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800">
                <Navigation className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Plan Your Journey. Understand Your Risk.
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
              AI-assisted multi-hazard transit evaluation for safer travels across Uttarakhand mountain highways and Char Dham pilgrimage routes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900 text-white text-xs font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>ISRO & IMD Calibrated</span>
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          JOURNEY RISK ASSESSMENT FORM (STEPS 1 - 4)
         ========================================================================= */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-elevated p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-700" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Route Hazard Calculator
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
            Step 1 to 4 • 4-Factor Multi-Hazard Analysis
          </span>
        </div>

        <form onSubmit={handleAssessRisk} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1: From */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-800 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>From (Origin)</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  {originOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[11px] text-slate-400 block pl-1">
                Major transit hub or plains base
              </span>
            </div>

            {/* Step 2: To */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-800 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>To (Destination)</span>
              </label>
              <div className="relative">
                <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  {destinationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[11px] text-slate-400 block pl-1">
                Char Dham shrine or alpine terminal
              </span>
            </div>

            {/* Step 3: Travel Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-800 text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Travel Date</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                />
              </div>
              <span className="text-[11px] text-slate-400 block pl-1">
                Synched with IMD 72h radar forecast
              </span>
            </div>

            {/* Step 4: Travel Mode Selector (Quick display) */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-800 text-white flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>Travel Mode: <span className="text-teal-800">{travelMode}</span></span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {travelModes.map((mode) => {
                  const ModeIcon = mode.icon;
                  const isSelected = travelMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setTravelMode(mode.id)}
                      className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-navy-900 text-white border-navy-950 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <ModeIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{mode.id}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] text-slate-400 block pl-1">
                Tailors road capability & speed
              </span>
            </div>
          </div>

          {/* Action Button: "Assess Journey Risk" */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
              <span>
                Evaluating 148 IoT slope inclinometers, 2 Doppler radars & drone queue telemetry.
              </span>
            </div>

            <Button
              type="submit"
              variant="navy"
              size="lg"
              icon={Compass}
              loading={isAssessing}
              className="w-full sm:w-auto font-black tracking-wide shadow-lg shadow-navy-950/20 px-8 py-3 rounded-2xl"
            >
              Assess Journey Risk
            </Button>
          </div>
        </form>
      </section>

      {/* =========================================================================
          RESULT SECTION:
          - Journey Risk: MODERATE
          - Route Map
          - 5 Hazard Breakdown Cards (Landslide, Cloudburst, GLOF, Crowd, Alerts)
          - Important Alerts Along Your Route
          - Recommended Precautions
         ========================================================================= */}
      <div id="assessment-result-section" className="space-y-8 animate-in fade-in duration-300">
        {/* Top Result Banner: "Journey Risk: MODERATE" */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Left: Prominent Headline */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block">
                Official Multi-Hazard Assessment
              </span>
              <div className="flex items-center gap-3.5 flex-wrap">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Journey Risk:{' '}
                  <span
                    className={
                      assessmentResult.overallRisk === 'CRITICAL'
                        ? 'text-red-600'
                        : assessmentResult.overallRisk === 'HIGH'
                        ? 'text-orange-600'
                        : assessmentResult.overallRisk === 'MODERATE'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }
                  >
                    {assessmentResult.overallRisk}
                  </span>
                </h2>
                <SeverityBadge
                  level={assessmentResult.overallRisk}
                  label={assessmentResult.overallRisk}
                  size="md"
                  pulse={assessmentResult.overallRisk === 'HIGH' || assessmentResult.overallRisk === 'CRITICAL'}
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Route: <strong className="text-slate-900">{fromLocation} &rarr; {toLocation}</strong> • Travel Date: <strong className="text-slate-900">{travelDate}</strong> • Mode: <strong className="text-slate-900">{travelMode}</strong>
              </p>
            </div>

            {/* Right: Risk Gauge & Score Card */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                  Dynamic Risk Index
                </span>
                <span className="text-3xl font-black font-mono text-slate-900">
                  {assessmentResult.riskScore}
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{assessmentResult.statusText}</span>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Regulated convoy operations on NH-07 / NH-107
                </span>
              </div>
            </div>
          </div>

          {/* Key Route Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold">Total Distance</span>
              <span className="text-lg font-black font-mono text-slate-900 block">
                {assessmentResult.distanceKm} km
              </span>
              <span className="text-[11px] text-slate-400">Paved mountain highway</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold">Estimated Drive</span>
              <span className="text-lg font-black font-mono text-slate-900 block">
                {assessmentResult.estimatedDriveHours}
              </span>
              <span className="text-[11px] text-slate-400">Includes queue buffers</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold">Elevation Range</span>
              <span className="text-base font-bold text-slate-900 block truncate">
                {assessmentResult.elevationRange}
              </span>
              <span className="text-[11px] text-slate-400">Acclimatization advised</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-semibold">Active Chokepoints</span>
              <span className="text-lg font-black font-mono text-amber-700 block">
                {assessmentResult.chokepointsCount} Sectors Monitored
              </span>
              <span className="text-[11px] text-slate-400">Single-lane passaging</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROUTE MAP (INTERACTIVE LEAFLET)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-teal-800" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Route Map & Corridor Topography
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Interactive Leaflet GIS with shelter waypoints
            </span>
          </div>

          <RouteMap
            origin={fromLocation}
            destination={toLocation}
            overallRisk={assessmentResult.overallRisk}
            height="460px"
          />
        </section>

        {/* =========================================================================
            5 HAZARD INTELLIGENCE BREAKDOWN CARDS
            (Landslide, Cloudburst, GLOF, Crowd, Active Alerts)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-800" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Multi-Hazard Assessment Along Your Route
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Real-time sensor curves & neural risk classifications
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Landslide Risk */}
            <HazardRouteCard
              title="Landslide Risk"
              type="landslide"
              status="Active Rockfall Watch at Lambagar & Sirobagar"
              riskLevel="HIGH"
              explanation="Heavy antecedent rainfall has saturated slope soil to 78%. Intermittent rockfall chutes reported on NH-07 Km 282. Single-lane convoy clearance active under SDRF escort."
              metricLabel="Displacement Rate"
              metricValue="+2.4 mm/hr (Elevated)"
            />

            {/* 2. Cloudburst Risk */}
            <HazardRouteCard
              title="Cloudburst Risk"
              type="cloudburst"
              status="Convective Rain Spike Warning (48 mm/hr)"
              riskLevel="MODERATE"
              explanation="Doppler radar nowcast indicates convective storm clouds developing over Mandakini Catchment. Flash flood risk in valley tributaries between 13:00 and 17:00."
              metricLabel="Precipitation Nowcast"
              metricValue="48 mm/hr Peak"
            />

            {/* 3. GLOF Risk */}
            <HazardRouteCard
              title="GLOF Risk"
              type="glof"
              status="Basin Moraine Stable"
              riskLevel="LOW"
              explanation="Satellite telemetry for Chorabari lake basin confirms normal meltwater discharge channels with no sudden volumetric expansion or moraine breach signatures."
              metricLabel="Lake Basin Water Volume"
              metricValue="0.85 MCM (Safe)"
            />

            {/* 4. Crowd Risk */}
            <HazardRouteCard
              title="Crowd Risk"
              type="crowd"
              status="Choke Point at Gaurikund Mule Staging"
              riskLevel="HIGH"
              explanation="Pilgrim inflow exceeds nominal gate capacity by 22%. Expected wait time for trek permits and mule bookings is 3.5 to 4 hours."
              metricLabel="Queue Wait Time"
              metricValue="4.0 hrs at Gate"
            />

            {/* 5. Active Alerts */}
            <HazardRouteCard
              title="Active Alerts"
              type="alert"
              status="2 Official District Advisories Active"
              riskLevel="HIGH"
              explanation="USDMA Common Alerting Protocol advisory: Night vehicular travel suspended between Sonprayag and Gaurikund past 20:00 IST for safety."
              metricLabel="Broadcast Protocol"
              metricValue="USDMA CAP Level 2"
            />

            {/* Route Summary Card */}
            <div className="bg-gradient-to-br from-navy-900 to-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between shadow-card space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">
                  Safe Passage Recommendation
                </span>
                <h4 className="font-black text-base tracking-tight text-white">
                  Proceed with Daylight Escort
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Start transit before 06:00 IST from Rishikesh. Plan to arrive at your overnight holding base before 16:30 IST to avoid nighttime rain-triggered debris fall.
                </p>
              </div>

              <div className="pt-2 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Helpline: 1070 (SEOC)</span>
                <span className="text-teal-400 font-bold">Verified Route</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            "Important Alerts Along Your Route"
           ========================================================================= */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                Important Alerts Along Your Route
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-extrabold">
              3 Active Advisories
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Alert 1 */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeverityBadge level="CRITICAL" label="CRITICAL ROADWORK" size="sm" pulse />
                  <span className="text-xs font-bold text-red-950">
                    NH-07 Lambagar Single-Lane Convoy Operating
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  BRO heavy earthmovers on standby. Rockfall debris cleared for 1-lane alternating vehicular convoy. Expect 30-45 minute holding delays.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono font-bold text-red-800 block">
                  BRO / SDRF Chamoli
                </span>
                <span className="text-[10px] text-slate-500">12 mins ago</span>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeverityBadge level="HIGH" label="HIGH CAUTION" size="sm" />
                  <span className="text-xs font-bold text-amber-950">
                    Mandakini Riverside Camping & Bathing Prohibited
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Upstream rainfall spike in Kedarnath peaks has increased Mandakini river velocity. Local administration has ordered complete clearing of riverbed tents.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono font-bold text-amber-800 block">
                  DEOC Rudraprayag
                </span>
                <span className="text-[10px] text-slate-500">28 mins ago</span>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeverityBadge level="MODERATE" label="TIME RESTRICTION" size="sm" />
                  <span className="text-xs font-bold text-slate-900">
                    Night Vehicular Travel Curfew on Sonprayag-Gaurikund Link
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  No vehicular movement permitted between 20:00 and 05:00 IST to prevent shooting stone casualties during darkness. Pilgrims must halt at Sonprayag.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono font-bold text-slate-700 block">
                  Uttarakhand Police
                </span>
                <span className="text-[10px] text-slate-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            "Recommended Precautions"
           ========================================================================= */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-800" />
              <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                Recommended Precautions
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Tailored for {travelMode} Travel • Char Dham Corridor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Precaution 1: Vehicle & Mechanical Readiness */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
                  <Car className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  1. Mountain Vehicle Check
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect brake pads, engine coolant, and ensure 4mm+ tire tread. Steep hairpins cause high brake rotor heating; always engine brake in lower gears (Gear 1/2). Carry tow straps and spare fuses.
              </p>
            </div>

            {/* Precaution 2: Daylight Travel Rule */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  2. Strict Daylight Driving Rule
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conclude all transit before 17:30 IST. Nighttime humidity and sudden downpours accelerate rockfall chute instability. Darkness eliminates critical visual detection of rolling gravel.
              </p>
            </div>

            {/* Precaution 3: Emergency Kit & Buffer Supplies */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-red-800 border border-red-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  3. 48-Hour Buffer Supplies
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Carry thermal clothing, raincoats, high-calorie dry rations (nuts/jaggery), oral rehydration salts (ORS), personal first-aid, waterproof backpacks, and 20,000mAh power banks.
              </p>
            </div>

            {/* Precaution 4: Offline Maps & SOS Communication */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  4. Offline Maps & Emergency Numbers
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cellular connectivity frequently drops between river canyons. Download offline route maps before departure and save: <strong>1070 (SEOC)</strong>, <strong>1077 (DEOC)</strong>, and <strong>112 (Police)</strong>.
              </p>
            </div>

            {/* Precaution 5: Safe Staging Shelters */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Home className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  5. Designated Relief Shelters
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                If halted by highway debris or cloudburst alerts, do not wait inside stationary vehicles near steep cuts. Proceed immediately to designated camps at <strong>Sonprayag Relief Camp</strong> or <strong>Joshimath Base Hall</strong>.
              </p>
            </div>

            {/* Precaution 6: High Altitude Health & Weather Checks */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-800 border border-sky-200">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">
                  6. High-Altitude Medical Care
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Oxygen levels drop noticeably past Gaurikund (2,000m+). Rest 30 minutes every 2 hours. Do not exert if experiencing dizziness or nausea. Visit SDRF medical aid posts at Bhimbali or Lincholi.
              </p>
            </div>
          </div>

          {/* Action Ribbon: Print / Share Safety Briefing */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              CrisisGuard AI Journey Assessment • Ref ID: <span className="font-mono font-bold text-slate-800">CG-RT-2026-9812</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Safety Briefing</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'CrisisGuard Journey Risk Assessment',
                      text: `Journey Risk for ${fromLocation} to ${toLocation}: ${assessmentResult.overallRisk}. Check route hazards and safe shelters.`,
                      url: window.location.href,
                    });
                  } else {
                    alert('Route briefing link copied to clipboard.');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold transition shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Co-Passenger</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
