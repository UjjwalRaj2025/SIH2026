import React from 'react';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
  size = 'md',
  variant = 'navy', // 'navy' | 'white'
}) {
  return (
    <div className={`flex flex-wrap gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-subtle ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            type="button"
            className={`flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 ${
              size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
            } ${
              isActive
                ? variant === 'navy'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {Icon && <Icon className={`w-4 h-4 ${isActive ? (variant === 'navy' ? 'text-teal-400' : 'text-slate-900') : 'text-slate-400'}`} />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
