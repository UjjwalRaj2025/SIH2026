import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, Search, AlertOctagon } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      title: 'Plan Safe Journey',
      description: 'Check road closures, landslide zones & safe corridor route',
      path: '/journey-risk',
      icon: Navigation,
      color: 'teal',
    },
    {
      title: 'Interactive Risk Map',
      description: 'Inspect live GIS multi-hazard overlays across Uttarakhand',
      path: '/risk-map',
      icon: MapPin,
      color: 'navy',
    },
    {
      title: 'Verify Disaster Rumor',
      description: 'Check viral videos & claims with AI NLP credibility engine',
      path: '/fake-news',
      icon: Search,
      color: 'purple',
    },
    {
      title: 'Active Alerts',
      description: 'Browse district-wise warnings and evacuation orders',
      path: '/alerts',
      icon: AlertOctagon,
      color: 'rose',
    },
  ];

  const colorVariants = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200 group-hover:border-teal-400 group-hover:bg-teal-100/60',
    navy: 'bg-navy-50 text-navy-800 border-navy-200 group-hover:border-navy-400 group-hover:bg-navy-100/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200 group-hover:border-purple-400 group-hover:bg-purple-100/60',
    rose: 'bg-red-50 text-red-700 border-red-200 group-hover:border-red-400 group-hover:bg-red-100/60',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.path}
            to={act.path}
            className="group p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-card hover:shadow-hover transition duration-200 flex flex-col justify-between"
          >
            <div className="flex items-start gap-3.5">
              <div className={`p-3 rounded-2xl border transition shadow-subtle ${colorVariants[act.color]}`}>
                <Icon className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-700 transition">
                  {act.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
