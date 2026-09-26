import React from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  pulse = false,
  className = '',
  icon: Icon,
}) {
  const variants = {
    critical: 'bg-red-50 text-red-800 border-red-300 font-semibold',
    danger: 'bg-red-50 text-red-800 border-red-300 font-semibold',
    high: 'bg-orange-50 text-orange-900 border-orange-300 font-semibold',
    warning: 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
    moderate: 'bg-amber-50 text-amber-900 border-amber-300',
    safe: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    low: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    info: 'bg-teal-50 text-teal-800 border-teal-300',
    neutral: 'bg-slate-100 text-slate-700 border-slate-300',
    purple: 'bg-purple-50 text-purple-800 border-purple-300',
    navy: 'bg-navy-900 text-white border-navy-800 shadow-sm',
  };

  const pulseColors = {
    critical: 'bg-red-500',
    danger: 'bg-red-500',
    high: 'bg-orange-500',
    warning: 'bg-amber-500',
    moderate: 'bg-amber-500',
    safe: 'bg-emerald-500',
    success: 'bg-emerald-500',
    low: 'bg-emerald-500',
    info: 'bg-teal-500',
    neutral: 'bg-slate-500',
    purple: 'bg-purple-500',
    navy: 'bg-teal-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 mr-0.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColors[variant] || 'bg-teal-500'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[variant] || 'bg-teal-500'}`}></span>
        </span>
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
