import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import SeverityBadge from '../../components/common/SeverityBadge';
import {
  ShieldAlert,
  Mountain,
  CloudRain,
  Waves,
  Users,
  CheckCircle2,
  PhoneCall,
  Palette,
  Database,
  Cpu,
  Activity,
  Bell,
  ShieldCheck,
  Compass,
  Building2,
  Check,
  ArrowRight,
  Navigation,
  FileText,
  Download,
} from 'lucide-react';

export default function About() {
  // 5 Core Engines
  const pillars = [
    {
      title: 'Landslide Susceptibility',
      icon: Mountain,
      description: 'Predicts slope failures and rockfall hazards along NH-07/107 using rainfall thresholds and geotechnical soil moisture saturation.',
    },
    {
      title: 'Cloudburst Nowcasting',
      icon: CloudRain,
      description: 'Hyper-localized atmospheric radar analysis detecting rapid convective spikes (>60mm/hr) to provide flash flood warnings.',
    },
    {
      title: 'GLOF Moraine Surveillance',
      icon: Waves,
      description: 'High-altitude proglacial lake expansion tracking and breach simulation to estimate downstream evacuation lead times.',
    },
    {
      title: 'Char Dham Crowd Risk',
      icon: Users,
      description: 'Pilgrim influx monitoring, trek choke points, and carrying capacity meters to eliminate stampede hazards.',
    },
    {
      title: 'Crisis Rumor Buster',
      icon: CheckCircle2,
      description: 'NLP-powered AI verification against sensationalized or recycled disaster media, preventing panic in high-stress situations.',
    },
  ];

  // Pipeline steps for "How CrisisGuard Works"
  const workflowSteps = [
    {
      step: '01',
      title: 'Data Ingestion',
      category: 'Data',
      icon: Database,
      description: 'Continuous streams from ISRO RISAT satellites, IMD Doppler radars  CD FRO, and CWC river gauges.',
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
    },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 p-2 px-3.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-subtle">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>Smart India Hackathon (SIH) 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About CrisisGuard <span className="text-teal-700">AI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Unified Multi-Hazard Early Warning & Situational Intelligence Platform for the Himalayan
          State of Uttarakhand and the Sacred Char Dham Pilgrim Circuit.
        </p>

        {/* Downloadable Structured Map & Blueprint Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/CrisisGuard_AI_Full_Project_Structured_Map.pdf"
            download="CrisisGuard_AI_Full_Project_Structured_Map.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition shadow-card"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Download Project Structured Map (PDF)</span>
          </a>

          <a
            href="/CrisisGuard_AI_Project_Architecture_and_Structured_Map.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-bold transition"
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Open System Blueprint (Web & Print)</span>
          </a>
        </div>
      </div>

      {/* Problem Statement Context */}
      <Card title="The Challenge & Mission" subtitle="Building Himalayan Disaster Resilience">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-medium">
          <p>
            The fragile topography of Uttarakhand frequently faces acute natural disasters: rapid-onset landslides,
            deadly cloudburst flash floods, and glacial lake outburst floods (GLOFs). Compounding these natural threats
            are dense seasonal pilgrim influxes (such as the Char Dham Yatra) and the dangerous spread of recycled or
            fabricated disaster rumors on social media.
          </p>
          <p>
            <strong>CrisisGuard AI</strong> bridges the critical gap between raw scientific observations and actionable
            civil protection. By synthesizing radar feeds, slope sensors, crowd counters, and NLP fact-checking, it delivers
            unified intelligence to both citizens traveling in the mountains and disaster authorities coordinating rescue missions.
          </p>
        </div>
      </Card>

      {/* =========================================================================
          SECTION 1: HOW CRISISGUARD WORKS (END-TO-END DECISION INTELLIGENCE)
         ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 block">
            End-To-End Decision Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How CrisisGuard Works
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
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
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-subtle transition duration-150"
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
          SECTION 2: FOR EVERYONE (TAILORED USER ROLES)
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
                className="hover:border-slate-300 hover:shadow-hover transition-all duration-200 flex flex-col justify-between"
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

      {/* 5 Core Engines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          The 5 Disaster Intelligence Engines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-start gap-4"
              >
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 shrink-0 shadow-subtle">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Design System Showcase Card */}
      <Card
        title="CrisisGuard Visual Design System"
        subtitle="Professional, trustworthy disaster-management technology"
        icon={Palette}
      >
        <div className="space-y-4 text-xs">
          <div>
            <span className="font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
              4-Tier Multi-Hazard Severity Standard (Accessible Dual-Coding)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <SeverityBadge level="LOW" size="sm" />
                <p className="text-[11px] text-emerald-950 font-medium pt-1">
                  Safe passage, baseline river levels, clear routes.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <SeverityBadge level="MODERATE" size="sm" />
                <p className="text-[11px] text-amber-950 font-medium pt-1">
                  Caution watch, minor rain, slowing traffic.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 space-y-1">
                <SeverityBadge level="HIGH" size="sm" />
                <p className="text-[11px] text-orange-950 font-medium pt-1">
                  Elevated threat, single-lane passage, queue delays.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
                <SeverityBadge level="CRITICAL" size="sm" pulse />
                <p className="text-[11px] text-red-950 font-medium pt-1">
                  Immediate danger, active landslide, cloudburst flash flood.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Color Palette Rationale:</span>
              <p className="text-slate-600 leading-relaxed">
                Crisp white/light backgrounds maximize daylight sunlight visibility for outdoor travelers.
                Deep Himalayan Navy anchors high-priority navigation and authority command headers.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Accessibility Principle:</span>
              <p className="text-slate-600 leading-relaxed">
                Color alone is never used to communicate severity; each status pairs explicit text labels with dedicated icons.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Emergency Helplines Reminder */}
      <div className="p-5 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <PhoneCall className="w-6 h-6 text-red-600 shrink-0" />
          <span className="text-xs sm:text-sm text-red-950 font-semibold">
            For emergencies during travel in Uttarakhand, immediately dial <strong>1070</strong> (State Control Room) or <strong>112</strong>.
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: CRISISGUARD AI MISSION BANNER
         ========================================================================= */}
      <section className="rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 border border-navy-800 shadow-elevated">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-teal-500/40 text-teal-300 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-teal-400" />
            <span>CrisisGuard AI Mission</span>
          </div>
          <h3 className="text-2xl sm:text-2xl font-white tracking-tight">
            People • Preparedness • Technology • Resilience
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal pt-1">
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
  );
}
