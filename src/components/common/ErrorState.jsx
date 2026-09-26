import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Failed to load telemetry',
  message = 'Unable to establish link with the hazard intelligence service. Please retry.',
  onRetry,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-red-200 bg-red-50/50 shadow-subtle ${className}`}>
      <div className="p-3.5 rounded-2xl bg-red-100 text-red-700 mb-4 border border-red-300 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-red-950">{title}</h3>
      <p className="text-sm text-red-700 max-w-sm mt-1.5 mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" icon={RotateCcw} onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
}
