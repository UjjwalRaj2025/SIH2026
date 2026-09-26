import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
} from 'lucide-react';

export default function SeverityBadge({
  level = 'LOW', // 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
  label,
  size = 'md',
  variant = 'subtle', // 'subtle' | 'solid'
  pulse = false,
  className = '',
}) {
  const normalizedLevel = String(level).toUpperCase();

  const configs = {
    LOW: {
      defaultLabel: 'LOW RISK',
      icon: CheckCircle2,
      subtle: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      solid: 'bg-emerald-600 text-white border-emerald-700',
      pulseColor: 'bg-emerald-500',
    },
    MODERATE: {
      defaultLabel: 'MODERATE WATCH',
      icon: AlertCircle,
      subtle: 'bg-amber-50 text-amber-800 border-amber-300',
      solid: 'bg-amber-600 text-white border-amber-700',
      pulseColor: 'bg-amber-500',
    },
    HIGH: {
      defaultLabel: 'HIGH WARNING',
      icon: AlertTriangle,
      subtle: 'bg-orange-50 text-orange-900 border-orange-300',
      solid: 'bg-orange-600 text-white border-orange-700',
      pulseColor: 'bg-orange-500',
    },
    CRITICAL: {
      defaultLabel: 'CRITICAL DANGER',
      icon: AlertOctagon,
      subtle: 'bg-red-50 text-red-900 border-red-300 font-semibold',
      solid: 'bg-red-600 text-white border-red-700 font-semibold',
      pulseColor: 'bg-red-500',
    },
  };

  const config = configs[normalizedLevel] || configs.LOW;
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3 shrink-0',
    md: 'w-3.5 h-3.5 shrink-0',
    lg: 'w-4 h-4 shrink-0',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-sm ${
        variant === 'solid' ? config.solid : config.subtle
      } ${sizes[size] || sizes.md} ${className}`}
      role="status"
      aria-label={`Severity level: ${normalizedLevel} - ${displayLabel}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 mr-0.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseColor}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${config.pulseColor}`}></span>
        </span>
      )}
      <Icon className={iconSizes[size] || iconSizes.md} aria-hidden="true" />
      <span className="font-semibold tracking-wide uppercase">{displayLabel}</span>
    </span>
  );
}
