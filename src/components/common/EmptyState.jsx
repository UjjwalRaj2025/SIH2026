import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = ShieldCheck,
  title = 'No incidents recorded',
  description = 'Everything in this sector is currently operating within safe parameters.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-white shadow-subtle ${className}`}>
      <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-700 mb-4 border border-teal-200 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1.5 mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
