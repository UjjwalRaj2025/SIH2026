import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Navigation,
  MapPin,
  Mountain,
  CloudRain,
  Waves,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Radio,
  Layers,
  Activity,
  Cpu,
  Database,
  Bell,
  Check,
  Compass,
  Eye,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  Building2,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import LeafletRiskMap from '../../components/map/LeafletRiskMap';
import AlertItem from '../../components/alerts/AlertItem';
import AlertModal from '../../components/alerts/AlertModal';
import JourneyBriefingModal from '../../components/common/JourneyBriefingModal';
import { mockApiService } from '../../services/mockApi';

// Dynamic region telemetry data keyed by destination so the hero card shows ONLY the selected region
const REGION_TELEMETRY = {
  'Kedarnath Dham': {
    valley: 'Mandakini Valley',
    highway: 'NH-107 Mandakini Corridor',
    score: 74,
    level: 'HIGH',
    badgeLabel: 'HIGH THREAT',
    threats: [
      {
        title: 'NH-107 Sonprayag Choke',
        desc: 'Rockfall scree • Single-lane convoy clearance',
        status: 'BLOCKED',
        severity: 'CRITICAL',
        icon: Mountain,
        color: 'red',
      },
      {
        title: 'Mandakini Valley Radar',
        desc: 'Convective rainfall spike: 72 mm/hr nowcast',
        status: 'NOWCAST',
        severity: 'HIGH',
        icon: CloudRain,
        color: 'amber',
      },
    ],
  },
  'Badrinath Dham': {
    valley: 'Alaknanda Valley',
    highway: 'NH-07 Alaknanda Corridor',
    score: 68,
    level: 'HIGH',
    badgeLabel: 'HIGH THREAT',
    threats: [
      {
        title: 'NH-07 Lambagar Chute',
        desc: 'Active boulder scree • Pilot convoy control',
        status: 'BLOCKED',
        severity: 'CRITICAL',
        icon: Mountain,
        color: 'red',
      },
      {
        title: 'Alaknanda River Catchment',
        desc: 'Glacial run-off surge: 1,840 m³/s',
        status: 'NOWCAST',
        severity: 'HIGH',
        icon: Waves,
        color: 'amber',
      },
    ],
  },
  'Gangotri Dham': {
    valley: 'Bhagirathi Valley',
    highway: 'NH-34 Bhagirathi Corridor',
    score: 42,
    level: 'MODERATE',
    badgeLabel: 'MODERATE WATCH',
    threats: [
      {
        title: 'NH-34 Nalupani Slide Zone',
        desc: 'Controlled vehicle passage • Geotechnical radar active',
        status: 'CAUTION',
        severity: 'MODERATE',
        icon: Mountain,
        color: 'amber',
      },
      {
        title: 'Upper Bhagirathi Weather',
        desc: 'Scattered squalls: 22 mm/hr at Harsil',
        status: 'WATCH',
        severity: 'MODERATE',
        icon: CloudRain,
        color: 'sky',
      },
    ],
  },
  'Yamunotri Dham': {
    valley: 'Rawai Valley',
    highway: 'NH-134 Rawai Corridor',
    score: 48,
    level: 'MODERATE',
    badgeLabel: 'MODERATE WATCH',
    threats: [
      {
        title: 'Silkyara-Barkot Segment',
        desc: 'Wet asphalt & slope scree netting inspected',
        status: 'PASSABLE',
        severity: 'MODERATE',
        icon: Mountain,
        color: 'amber',
      },
      {
        title: 'Janki Chatti Foot-Trek',
        desc: 'Pilgrim congestion 84% carrying capacity',
        status: 'CONGESTED',
        severity: 'HIGH',
        icon: Users,
        color: 'purple',
      },
    ],
  },
  'Hemkund Sahib': {
    valley: 'Bhyundar Valley',
    highway: 'Govindghat & Bhyundar Trek',
    score: 52,
    level: 'MODERATE',
    badgeLabel: 'ALPINE WATCH',
    threats: [
      {
        title: 'Ghangaria Alpine Ascent',
        desc: 'Snowmelt slick path above 3,800m • Ponies restricted',
        status: 'SLICK ICE',
        severity: 'MODERATE',
        icon: Mountain,
        color: 'sky',
      },
      {
        title: 'Bhyundar River Discharge',
        desc: 'Normal glacial melt flow: 420 m³/s',
        status: 'MONITORED',
        severity: 'LOW',
        icon: Waves,
        color: 'emerald',
      },
    ],
  },
  'Valley of Flowers': {
    valley: 'Chamoli Alpine Valley',
    highway: 'Govindghat - Ghangaria Trek',
    score: 46,
    level: 'MODERATE',
    badgeLabel: 'MODERATE WATCH',
    threats: [
      {
        title: 'Pushpawati Gorge Bridge',
        desc: 'Footbridge sensors normal • Guide escort mandatory',
        status: 'OPEN',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'emerald',
      },
      {
        title: 'Valley Cloud Ceiling',
        desc: 'Low cloud cover & alpine mist reducing visibility',
        status: 'MISTY',
        severity: 'MODERATE',
        icon: CloudRain,
        color: 'amber',
      },
    ],
  },
  'Joshimath': {
    valley: 'Chamoli District Base',
    highway: 'NH-07 Chamoli Ridge',
    score: 38,
    level: 'LOW',
    badgeLabel: 'LOW THREAT',
    threats: [
      {
        title: 'Sunil-Marwari Inclinometers',
        desc: '12 IoT slope sensors reporting stable bedrock',
        status: 'STABLE',
        severity: 'LOW',
        icon: Mountain,
        color: 'emerald',
      },
      {
        title: 'Joshimath Bypass Route',
        desc: 'Heavy vehicle diversion operational',
        status: 'CLEAR',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'teal',
      },
    ],
  },
  'Auli': {
    valley: 'High Altitude Ski Ridge',
    highway: 'Joshimath-Auli Road & Ropeway',
    score: 32,
    level: 'LOW',
    badgeLabel: 'ALL CLEAR',
    threats: [
      {
        title: 'Auli Ropeway Telemetry',
        desc: 'Anemometer reading 18 km/h • Fully operational',
        status: 'OPERATIONAL',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'emerald',
      },
      {
        title: 'Upper Meadow Ridge',
        desc: 'Dry tarmac and clear mountain vistas',
        status: 'CLEAR',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'teal',
      },
    ],
  },
  'Tungnath / Chopta': {
    valley: 'Rudraprayag Alpine Range',
    highway: 'Kund-Chopta-Gopeshwar Route',
    score: 28,
    level: 'LOW',
    badgeLabel: 'SAFE CORRIDOR',
    threats: [
      {
        title: 'Makkumath Forest Cut',
        desc: 'Dense fog cleared • Surface dry',
        status: 'CLEAR',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'emerald',
      },
      {
        title: 'Tungnath Summit Trek',
        desc: 'Paved pilgrim trail open with guide posts',
        status: 'OPEN',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'teal',
      },
    ],
  },
  'Uttarkashi': {
    valley: 'Lower Bhagirathi Valley',
    highway: 'NH-34 Valley Base',
    score: 24,
    level: 'LOW',
    badgeLabel: 'SAFE CORRIDOR',
    threats: [
      {
        title: 'Varunavat Geo-Sensors',
        desc: 'Sub-surface shear stress within normal thresholds',
        status: 'NORMAL',
        severity: 'LOW',
        icon: Mountain,
        color: 'emerald',
      },
      {
        title: 'Chinyalisaur Weather Station',
        desc: 'Clear skies • Wind 8 km/h NW',
        status: 'OPTIMAL',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'teal',
      },
    ],
  },
  'Rishikesh': {
    valley: 'Foothills Ganga Plains',
    highway: 'NH-58 Gateway',
    score: 18,
    level: 'LOW',
    badgeLabel: 'SAFE BASE',
    threats: [
      {
        title: 'Tapovan-Badrinath Bypass',
        desc: 'Smooth transit flow • Traffic radar active',
        status: 'CLEAR',
        severity: 'LOW',
        icon: CheckCircle2,
        color: 'emerald',
      },
      {
        title: 'Triveni Ghat Telemetry',
        desc: 'River discharge safe: 820 m³/s',
        status: 'NORMAL',
        severity: 'LOW',
        icon: Waves,
        color: 'teal',
      },
    ],
  },
  'Haridwar': {
    valley: 'Ganga Plains Entry',
    highway: 'NH-334 Gateway',
    score: 15,
    level: 'LOW',
    badgeLabel: 'SAFE BASE',
    threats: [
      {
        title: 'Har Ki Pauri Transit Zone',
        desc: 'Crowd density normal • RFID counts 3,200/hr',
        status: 'NORMAL',
        severity: 'LOW',
        icon: Users,
        color: 'emerald',
      },
      {
        title: 'Bhimghoda Barrage Gauge',
        desc: 'Water level stable below warning gauge',
        status: 'NORMAL',
        severity: 'LOW',
        icon: Waves,
        color: 'teal',
      },
    ],
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState('Haridwar');
  const [selectedDestination, setSelectedDestination] = useState('Kedarnath Dham');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [mapData, setMapData] = useState({
    landslides: [],
    cloudbursts: [],
    glof: [],
    crowds: [],
    shelters: [],
  });

  useEffect(() => {
    async function loadData() {
      const [alertsRes, mapRes] = await Promise.all([
        mockApiService.getAlerts(),
        mockApiService.getRiskMapData(),
      ]);
      setAlerts(alertsRes);
      setMapData(mapRes);
    }
    loadData();
  }, []);

  // 5 Feature Cards for "One Platform. Multiple Risks."
  const platformRisks = [
    {
      title: 'Landslide',
      subtitle: 'AI-based risk prediction',
      description: 'Continuous monitoring of slope displacement, soil moisture saturation thresholds, and active rockfall blockages along NH-07 and NH-107.',
      icon: Mountain,
      path: '/landslide',
      severity: 'HIGH',
      badgeLabel: 'HIGH RISK',
      color: 'red',
      metric: '2 Active Blockages',
    },
    {
      title: 'Cloudburst',
      subtitle: 'Rainfall and weather-based prediction',
      description: 'Doppler radar nowcasting detecting convective storm cells and hyper-localized precipitation spikes (>60mm/hr) to warn valley settlements.',
      icon: CloudRain,
      path: '/cloudburst',
      severity: 'HIGH',
      badgeLabel: 'HIGH CONVECTIVE',
      color: 'amber',
      metric: '72 mm/hr Peak Nowcast',
    },
    {
      title: 'GLOF',
      subtitle: 'AI-driven risk assessment',
      description: 'Satellite surveillance of high-altitude proglacial lake expansion and moraine dam integrity to project downstream evacuation lead times.',
      icon: Waves,
      path: '/glof',
      severity: 'MODERATE',
      badgeLabel: 'MODERATE WATCH',
      color: 'sky',
      metric: 'Chorabari Lake Monitored',
    },
    {
      title: 'Crowd Risk',
      subtitle: 'Real-time crowd density and risk analysis',
      description: 'RFID gate transit counts and drone vision algorithms evaluating pilgrim choke points, carrying limits, and trek queue wait times.',
      icon: Users,
      path: '/crowd-risk',
      severity: 'HIGH',
      badgeLabel: 'HIGH CONGESTION',
      color: 'purple',
      metric: 'Kedarnath 122% Capacity',
    },
    {
      title: 'Fake News',
      subtitle: 'Disaster misinformation detection',
      description: 'NLP neural verification combating fabricated flood footage, recycled crisis clips, and WhatsApp rumor panic in emergency situations.',
      icon: CheckCircle2,
      path: '/fake-news',
      severity: 'LOW',
      badgeLabel: 'VERIFIED SOURCE',
      color: 'emerald',
      metric: '14 Claims Fact-Checked',
    },
  ];

  return (
    <div className="w-full">
      {/* =========================================================================
          1. HERO SECTION WITH HIMALAYAN MOUNTAIN RIDGE & EDITORIAL COLOR GRADING
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#06121e] text-white border-b border-white/10 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
        {/* Cinematic Himalayan Mountain Vista Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/himalaya-hero.jpg"
            alt="Himalayan Mountain Ridge with Ancient Stupa and Prayer Flags"
            className="w-full h-full object-cover object-[78%_35%] lg:object-[82%_38%] select-none transform scale-105"
          />

          {/* Color Grading Layer 1: Left-to-right deep dark slate/navy vignette for high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06121e] via-[#071624]/95 via-35% md:via-48% lg:via-52% to-[#0a1e30]/25 to-90%" />

          {/* Color Grading Layer 2: Bottom fade into page background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121e] via-[#06121e]/90 via-20% to-transparent to-60%" />

          {/* Color Grading Layer 3: Top subtle blend under sticky navbar */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a30]/80 via-transparent to-transparent to-30%" />

          {/* Atmospheric Alpine tint */}
          <div className="absolute inset-0 bg-navy-950/20 mix-blend-multiply" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-6 flex-1 flex flex-col justify-between w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center flex-1 my-auto">
            {/* Left Column: Heading, Badge, Supporting Text, Action Buttons */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Small Badge: "UTTARAKHAND DISASTER INTELLIGENCE" */}
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#062420]/80 border border-emerald-500/35 text-emerald-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>UTTARAKHAND DISASTER INTELLIGENCE</span>
                </span>
              </div>

              {/* Main Heading: "Travel Uttarakhand. Know Your Risk." */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
                  Travel Uttarakhand. <br />
                  <span className="font-serif italic font-normal text-[#cce8d6] drop-shadow-md">
                    Know Your Risk.
                  </span>
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                AI-assisted disaster intelligence for safer journeys across Uttarakhand. Real-time predictive risk, hazard alerts, and claim verification in one unified system.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBriefingModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2bd99f] hover:bg-[#25c48f] text-navy-950 font-bold text-base shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                >
                  <Compass className="w-5 h-5 text-navy-950" />
                  <span>Check Journey Risk</span>
                </button>
                <Link to="/risk-map">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 backdrop-blur-md shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                  >
                    <MapPin className="w-4 h-4 text-teal-300" />
                    <span>Explore Risk Map ↗</span>
                  </button>
                </Link>
              </div>

              {/* Key Assurance Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-300/80 font-medium border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISRO & IMD Synced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>CAP Early Warnings</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Risk-Summary UI over the Mountain Visual */}
            <div className="lg:col-span-5">
              {(() => {
                const currentTelemetry = REGION_TELEMETRY[selectedDestination] || {
                  valley: 'Uttarakhand Corridor',
                  highway: 'State Highway Corridor',
                  score: 45,
                  level: 'MODERATE',
                  badgeLabel: 'MODERATE WATCH',
                  threats: [
                    {
                      title: `${selectedDestination} Mountain Route`,
                      desc: 'Active monitoring of slope and radar telemetry',
                      status: 'MONITORED',
                      severity: 'MODERATE',
                      icon: Mountain,
                      color: 'amber',
                    },
                    {
                      title: 'Valley Convective Radar',
                      desc: 'Precipitation within safe seasonal limits',
                      status: 'NORMAL',
                      severity: 'LOW',
                      icon: CloudRain,
                      color: 'teal',
                    },
                  ],
                };

                return (
                  <div className="relative rounded-2xl bg-navy-950/80 backdrop-blur-xl p-6 border border-white/15 shadow-2xl text-white space-y-3.5 transform lg:translate-x-2 hover:-translate-y-1 transition duration-300">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-white">Live Corridor Telemetry</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs text-teal-300 font-bold truncate">
                              {selectedOrigin} → {selectedDestination}
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsBriefingModalOpen(true)}
                              className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition shrink-0 cursor-pointer"
                              title="Change in Pop-up Modal"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                      <SeverityBadge
                        level={currentTelemetry.level}
                        label={currentTelemetry.badgeLabel}
                        size="sm"
                        pulse={currentTelemetry.level === 'HIGH'}
                      />
                    </div>

                    {/* Manual Quick Region Selector Pills */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Manual Region Switch
                        </span>
                        <span className="text-[10px] text-teal-300 font-mono">
                          {currentTelemetry.highway}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {['Kedarnath Dham', 'Badrinath Dham', 'Gangotri Dham', 'Yamunotri Dham', 'Hemkund Sahib'].map((dest) => {
                          const isSelected = selectedDestination === dest;
                          const shortName = dest.replace(' Dham', '');
                          return (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => setSelectedDestination(dest)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-teal-500/30 text-teal-300 border border-teal-400/50 shadow-sm'
                                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                              }`}
                            >
                              {shortName}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => setIsBriefingModalOpen(true)}
                          className="px-2 py-1 rounded-lg text-xs font-bold text-teal-300 hover:text-white bg-teal-950/60 hover:bg-teal-900 border border-teal-500/40 shrink-0 cursor-pointer"
                        >
                          + More
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Risk Gauge */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">
                          Dynamic Risk Score ({currentTelemetry.valley})
                        </span>
                        <span
                          className={`font-black font-mono text-sm ${
                            currentTelemetry.score >= 65
                              ? 'text-red-400'
                              : currentTelemetry.score >= 40
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {currentTelemetry.score} / 100
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${currentTelemetry.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                        <span className={currentTelemetry.score < 40 ? 'text-emerald-400 font-black' : ''}>Safe</span>
                        <span className={currentTelemetry.score >= 40 && currentTelemetry.score < 65 ? 'text-amber-400 font-black' : ''}>Caution</span>
                        <span className={currentTelemetry.score >= 65 ? 'text-red-400 font-black' : ''}>Active Alert</span>
                      </div>
                    </div>

                    {/* Live Threat Segment Highlights (Showing ONLY selected region incidents) */}
                    <div className="space-y-2 text-xs">
                      {currentTelemetry.threats.map((threat, idx) => {
                        const ThreatIcon = threat.icon;
                        const isRed = threat.color === 'red';
                        const isAmber = threat.color === 'amber';
                        const isPurple = threat.color === 'purple';
                        const isSky = threat.color === 'sky';

                        const bgBorder = isRed
                          ? 'bg-red-950/50 border-red-500/30'
                          : isAmber
                          ? 'bg-amber-950/50 border-amber-500/30'
                          : isPurple
                          ? 'bg-purple-950/50 border-purple-500/30'
                          : isSky
                          ? 'bg-sky-950/50 border-sky-500/30'
                          : 'bg-emerald-950/50 border-emerald-500/30';

                        const iconColor = isRed
                          ? 'text-red-400'
                          : isAmber
                          ? 'text-amber-400'
                          : isPurple
                          ? 'text-purple-400'
                          : isSky
                          ? 'text-sky-400'
                          : 'text-emerald-400';

                        return (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${bgBorder}`}
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <ThreatIcon className={`w-4 h-4 shrink-0 ${iconColor}`} />
                              <div className="min-w-0">
                                <span className="font-bold text-white block truncate">{threat.title}</span>
                                <span className="text-[10px] text-slate-300 block truncate">{threat.desc}</span>
                              </div>
                            </div>
                            <SeverityBadge
                              level={threat.severity}
                              label={threat.status}
                              size="sm"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Link inside Floating Card */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Synced with IMD & SDRF</span>
                      <Link
                        to="/journey-risk"
                        state={{
                          fromLocation: selectedOrigin,
                          toLocation: selectedDestination,
                          travelDate: selectedDate,
                        }}
                        className="font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1 transition"
                      >
                        <span>Detailed Route Matrix</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Bottom Hero Metadata Strip & Watermark */}
          <div className="border-t border-white/10 pt-5 mt-8 sm:mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300/85 font-medium items-center">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-300 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  05
                </span>
                <span>Hazard intelligence modules</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span>Location-based risk insights</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>News claim verification</span>
              </div>
              <div className="col-span-2 md:col-span-1 md:text-right font-mono text-[11px] text-slate-400 tracking-wider">
                30°18'N 79°01'E | HIMALAYAN REGION, INDIA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. VERTICAL GRADIENT TRANSITION (DARK NAVY -> ALL WHITE)
         ========================================================================= */}
      <section
        id="hazard-engines"
        className="relative w-full bg-gradient-to-b from-[#06121e] via-[#091c31] via-55% via-[#122b49] via-28% via-[#224469]/60 via-42% via-[#cbd5e1]/900 via-6% to-slate-5 to-75% pt-12 sm:pt-16 pb-12 overflow-hidden scroll-mt-2"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          {/* Header in the dark/gradient upper zone */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-bold tracking-wider uppercase shadow-sm">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Comprehensive Himalayan Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow">
              One Platform.{' '}
              <span className="text-teal-300 drop-shadow">
                Multiple Risks.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              Multi-hazard mitigation combining satellite radar, slope inclinometers, and crowd analytics into a single dashboard.
            </p>
          </div>

          {/* 5 Feature Cards - clean white cards emerging as background becomes white */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {platformRisks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="hover:border-teal-300 hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 shadow-subtle">
                        <Icon className="w-6 h-6 shrink-0" />
                      </div>
                      {/* Dual-indicator severity badge */}
                      <SeverityBadge level={item.severity} label={item.badgeLabel} size="sm" />
                    </div>

                    <div className="mt-4 space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-400">0{index + 1}</div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                      <p className="text-xs font-bold text-teal-700">{item.subtitle}</p>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed pt-1.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {item.metric}
                    </span>
                    <Link
                      to={item.path}
                      className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ALL WHITE CONTENT SECTIONS (CLEAN LIGHT THEME AFTER VERTICAL GRADIENT)
         ========================================================================= */}
      <div className="w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">

        {/* =========================================================================
            3. LIVE RISK OVERVIEW (MOCK STATISTICS)
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
                Situational Awareness
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Live Risk Overview
              </h2>
            </div>
            <Link
              to="/dashboard"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5"
            >
              <span>Open Situational Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card text-center space-y-1">
              <span className="text-3xl font-black text-slate-900 font-mono block"></span>
              <span className="text-[11px] text-teal-700 font-medium block">Slope tilt & river gauges</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card text-center space-y-1">
              <span className="text-3xl font-black text-slate-900 font-mono block">4</span>
              <span className="text-xs font-bold text-slate-700 block">Glacial Basins</span>
              <span className="text-[11px] text-sky-700 font-medium block">ISRO satellite tracking</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card text-center space-y-1">
              <span className="text-3xl font-black text-red-600 font-mono block">2</span>
              <span className="text-xs font-bold text-slate-700 block">Corridors Blocked</span>
              <span className="text-[11px] text-red-700 font-medium block">NH-07 Lambagar chute</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card text-center space-y-1">
              <span className="text-3xl font-black text-purple-700 font-mono block">45.4k</span>
              <span className="text-xs font-bold text-slate-700 block">Pilgrims in Transit</span>
              <span className="text-[11px] text-purple-700 font-medium block">Char Dham Circuits</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card text-center space-y-1 col-span-2 sm:col-span-1">
              <span className="text-3xl font-black text-emerald-700 font-mono block">98.4%</span>
              <span className="text-xs font-bold text-slate-700 block">Prediction Uptime</span>
              <span className="text-[11px] text-emerald-700 font-medium block">Zero sensor lag</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. LATEST ALERTS (3-5 MOCK ALERT CARDS)
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-700 block">
                Emergency Broadcast Feed
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Latest Alerts
              </h2>
            </div>
            <Link
              to="/alerts"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5"
            >
              <span>View All ({alerts.length}) Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {alerts.slice(0, 3).map((alt) => (
              <AlertItem key={alt.id} alert={alt} onSelect={setSelectedAlert} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. EXPLORE UTTARAKHAND RISK MAP (MAP PREVIEW)
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
                GIS Geospatial Viewer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Explore Uttarakhand Risk Map
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Live multi-layer geospatial preview with safe corridors, shelters, and hazard perimeters.
              </p>
            </div>
            <Link to="/risk-map">
              <Button variant="navy" size="sm" icon={Layers}>
                Open Fullscreen GIS Map
              </Button>
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card">
            <LeafletRiskMap
              landslides={mapData.landslides}
              cloudbursts={mapData.cloudbursts}
              glof={mapData.glof}
              crowds={mapData.crowds}
              shelters={mapData.shelters}
              height="480px"
            />
          </div>
        </section>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AlertModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />

      {/* Initial Pop-up: Personal Journey Briefing Modal ("Where are you going?") */}
      <JourneyBriefingModal
        isOpen={isBriefingModalOpen}
        onClose={() => setIsBriefingModalOpen(false)}
        initialOrigin={selectedOrigin}
        initialDestination={selectedDestination}
        onApplyRoute={(orig, dest, date) => {
          setSelectedOrigin(orig);
          setSelectedDestination(dest);
          if (date) setSelectedDate(date);
          setIsBriefingModalOpen(false);
        }}
      />
    </div>
  );
}
