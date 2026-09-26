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
import { mockApiService } from '../../services/mockApi';

export default function Home() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
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

  // Pipeline steps for "How CrisisGuard Works"
  const workflowSteps = [
    {
      step: '01',
      title: 'Data Ingestion',
      category: 'Data',
      icon: Database,
      description: 'Continuous streams from ISRO RISAT satellites, IMD Doppler radars, IoT slope inclinometers, and CWC river gauges.',
      color: 'text-sky-700 bg-sky-50 border-sky-200',
    },
    {
      step: '02',
      title: 'AI Analysis',
      category: 'AI Analysis',
      icon: Cpu,
      description: 'Neural models process geotechnical thresholds, convective storm physics, moraine breach factors, and NLP claims.',
      color: 'text-teal-700 bg-teal-50 border-teal-200',
    },
    {
      step: '03',
      title: 'Risk Assessment',
      category: 'Risk Assessment',
      icon: Activity,
      description: 'Dynamic corridor safety scoring calculates multi-hazard vulnerability indices for roads, treks, and valleys.',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      step: '04',
      title: 'Early Alerts',
      category: 'Alerts',
      icon: Bell,
      description: 'Automated CAP broadcasts push warnings to traveler smartphones, SMS cell towers, and riverside acoustic sirens.',
      color: 'text-red-700 bg-red-50 border-red-200',
    },
    {
      step: '05',
      title: 'Better Decisions',
      category: 'Better Decisions',
      icon: ShieldCheck,
      description: 'Tourists select safe travel corridors; emergency authorities pre-deploy SDRF rescue battalions before crisis strikes.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
  ];

  // User Segments for "For Everyone"
  const audienceSegments = [
    {
      title: 'Tourists & Pilgrims',
      role: 'Tourists',
      icon: Compass,
      tagline: 'Safe Journey Planning',
      benefits: [
        'Real-time safe corridor route planner avoiding active landslides',
        'Verified shrine carrying capacity & queue wait time estimates',
        'Pre-identified emergency shelter locations with medical post status',
        'Instant rumor verification against viral social media hoaxes',
      ],
      cta: 'Plan Safe Route',
      ctaPath: '/journey-risk',
      accentColor: 'border-teal-300 text-teal-800 bg-teal-50/50',
    },
    {
      title: 'Local Citizens',
      role: 'Local Citizens',
      icon: Users,
      tagline: 'Community Protection',
      benefits: [
        'Hyperlocal cloudburst and flash flood advance warnings',
        'River discharge gauge telemetry across Alaknanda & Mandakini',
        'Official district administrative circulars and evacuation routes',
        'Community incident reporting channels to alert nearby villages',
      ],
      cta: 'View Live Alerts',
      ctaPath: '/alerts',
      accentColor: 'border-amber-300 text-amber-900 bg-amber-50/50',
    },
    {
      title: 'Disaster Authorities',
      role: 'Authorities',
      icon: Building2,
      tagline: 'Incident Command & Control',
      benefits: [
        'Unified State Emergency Operations Centre (SEOC) monitoring',
        'Common Alerting Protocol (CAP) multi-channel broadcast dispatcher',
        'District vulnerability indices across Chamoli, Rudraprayag & Uttarkashi',
        'Comprehensive multi-hazard predictive analytics dashboards',
      ],
      cta: 'Enter Authority HQ',
      ctaPath: '/authority',
      accentColor: 'border-red-300 text-red-900 bg-red-50/50',
    },
    {
      title: 'Emergency Response Teams',
      role: 'Emergency Teams',
      icon: ShieldAlert,
      tagline: 'SDRF & NDRF Rapid Action',
      benefits: [
        'Real-time highway blockage recon and earthmover equipment tracking',
        'Automated moraine dam breach evacuation lead-time buffers',
        'GIS tracking of active rescue teams across mountain incident zones',
        'High-priority dispatch coordination for critical patient evacuations',
      ],
      cta: 'View Deployments',
      ctaPath: '/authority',
      accentColor: 'border-purple-300 text-purple-900 bg-purple-50/50',
    },
  ];

  return (
    <div className="w-full">
      {/* =========================================================================
          1. HERO SECTION WITH HIMALAYAN MOUNTAIN RIDGE & EDITORIAL COLOR GRADING
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#06121e] text-white border-b border-navy-800">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121e] via-[#06121e]/85 via-15% to-transparent to-55%" />

          {/* Color Grading Layer 3: Top subtle blend under sticky navbar */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a30]/80 via-transparent to-transparent to-30%" />

          {/* Atmospheric Alpine tint */}
          <div className="absolute inset-0 bg-navy-950/20 mix-blend-multiply" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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
                <Link to="/journey-risk">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2bd99f] hover:bg-[#25c48f] text-navy-950 font-bold text-base shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
                  >
                    <Compass className="w-5 h-5 text-navy-950" />
                    <span>Check Journey Risk</span>
                  </button>
                </Link>
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
                  <Radio className="w-4 h-4 text-teal-400" />
                  <span>148 Active IoT Sensors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-400" />
                  <span>CAP Early Warnings</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Risk-Summary UI over the Mountain Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-navy-950/80 backdrop-blur-xl p-6 border border-white/15 shadow-2xl text-white space-y-4 transform lg:translate-x-2 hover:-translate-y-1 transition duration-300">
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">Live Corridor Telemetry</h3>
                      <span className="text-[11px] text-slate-300 font-medium">Haridwar → Kedarnath</span>
                    </div>
                  </div>
                  <SeverityBadge level="HIGH" label="HIGH THREAT" size="sm" pulse />
                </div>

                {/* Dynamic Risk Gauge */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">Dynamic Risk Score</span>
                    <span className="font-black text-red-400 font-mono text-sm">74 / 100</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full" style={{ width: '74%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                    <span>Safe</span>
                    <span>Caution</span>
                    <span className="text-red-400 font-black">Active Alert</span>
                  </div>
                </div>

                {/* Live Threat Segment Highlights */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-red-400 shrink-0" />
                      <div>
                        <span className="font-bold text-white block">NH-07 Lambagar Chute</span>
                        <span className="text-[10px] text-slate-300">Rockfall debris • Single-lane convoy</span>
                      </div>
                    </div>
                    <SeverityBadge level="CRITICAL" label="BLOCKED" size="sm" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="font-bold text-white block">Mandakini Valley Radar</span>
                        <span className="text-[10px] text-slate-300">Rainfall spike: 72 mm/hr</span>
                      </div>
                    </div>
                    <SeverityBadge level="HIGH" label="NOWCAST" size="sm" />
                  </div>
                </div>

                {/* Action Link inside Floating Card */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Updated 2 mins ago</span>
                  <Link
                    to="/journey-risk"
                    className="font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1 transition"
                  >
                    <span>Detailed Route Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Metadata Strip & Watermark (Matches reference screenshot) */}
          <div className="border-t border-white/10 pt-5 mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300/85 font-medium items-center">
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
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">

      {/* =========================================================================
          2. ONE PLATFORM. MULTIPLE RISKS. (5 FEATURE CARDS)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
            Comprehensive Himalayan Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            One Platform. Multiple Risks.
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Multi-hazard mitigation combining satellite radar, slope inclinometers, and crowd analytics into a single dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {platformRisks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
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
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-xs font-bold text-teal-800">{item.subtitle}</p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed pt-1.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.metric}
                  </span>
                  <Link
                    to={item.path}
                    className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. HOW CRISISGUARD WORKS (PIPELINE)
         ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
            End-To-End Decision Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How CrisisGuard Works
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            From raw satellite and ground telemetry to coordinated life-safety field action.
          </p>
        </div>

        {/* 5-Step Connected Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition duration-150"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-400 font-mono text-xs">{step.step}</span>
                    <div className={`p-2 rounded-xl border ${step.color}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 tracking-tight">{step.category}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                {idx < workflowSteps.length - 1 && (
                  <div className="hidden md:flex justify-end text-slate-300">
                    <span>&rarr;</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. FOR EVERYONE (STAKEHOLDER MODULES)
         ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
            Tailored User Roles
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            For Everyone
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Custom operational interfaces built for pilgrims, mountain residents, district leaders, and rescue personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {audienceSegments.map((seg) => {
            const Icon = seg.icon;
            return (
              <Card
                key={seg.role}
                className="hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 shadow-subtle">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {seg.role}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="font-black text-base text-slate-900 tracking-tight">{seg.title}</h3>
                    <p className="text-xs font-bold text-teal-800">{seg.tagline}</p>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                    {seg.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link to={seg.ctaPath}>
                    <Button variant="secondary" size="sm" className="w-full font-bold">
                      <span>{seg.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          5. LIVE RISK OVERVIEW (MOCK STATISTICS)
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
            <span className="text-3xl font-black text-slate-900 font-mono block">148</span>
            <span className="text-xs font-bold text-slate-700 block">Active IoT Sensors</span>
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

        <LeafletRiskMap
          landslides={mapData.landslides}
          cloudbursts={mapData.cloudbursts}
          glof={mapData.glof}
          crowds={mapData.crowds}
          shelters={mapData.shelters}
          height="480px"
        />
      </section>

      {/* =========================================================================
          8. MISSION BANNER / HOMEPAGE CLOSING STATEMENT
         ========================================================================= */}
      <section className="rounded-3xl bg-navy-900 p-8 sm:p-12 text-white text-center space-y-4 border border-navy-800 shadow-elevated">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-teal-500/40 text-teal-300 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-teal-400" />
            <span>CrisisGuard AI Mission</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            People • Preparedness • Technology • Resilience
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1">
            Engineered for Smart India Hackathon (SIH 2026) to protect pilgrims, residents, and mountain
            infrastructure with proactive artificial intelligence.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link to="/journey-risk">
            <Button variant="primary" size="md" icon={Navigation}>
              Check Journey Risk
            </Button>
          </Link>
          <Link to="/authority">
            <Button variant="secondary" size="md" icon={Building2}>
              Authority Command Portal
            </Button>
          </Link>
        </div>
      </section>
      </div>

      {/* Alert Detail Modal */}
      <AlertModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}
