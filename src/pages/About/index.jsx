import React from 'react';
import Card from '../../components/common/Card';
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
} from 'lucide-react';

export default function About() {
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

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 p-2 px-3.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-subtle">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>Smart India Hackathon (SIH) 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About CrisisGuard <span className="text-teal-700">AI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Unified Multi-Hazard Early Warning & Situational Intelligence Platform for the Himalayan
          State of Uttarakhand and the Sacred Char Dham Pilgrim Circuit.
        </p>
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

      {/* 5 Core Engines */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
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

      {/* Emergency Helplines Reminder */}
      <div className="p-5 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <PhoneCall className="w-6 h-6 text-red-600 shrink-0" />
          <span className="text-xs sm:text-sm text-red-950 font-semibold">
            For emergencies during travel in Uttarakhand, immediately dial <strong>1070</strong> (State Control Room) or <strong>112</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
