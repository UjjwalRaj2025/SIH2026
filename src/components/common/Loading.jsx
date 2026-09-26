import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({
  label = 'Loading disaster intelligence telemetry...',
  size = 'md',
  fullHeight = false,
  className = '',
}) {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${
        fullHeight ? 'min-h-[380px]' : ''
      } ${className}`}
    >
      <Loader2 className={`${iconSizes[size] || iconSizes.md} animate-spin text-teal-700 mb-3`} />
      {label && <p className="text-sm font-semibold text-slate-600 animate-pulse">{label}</p>}
    </div>
  );
}
