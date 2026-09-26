import React from 'react';
import Card from '../common/Card';
import SeverityBadge from '../common/SeverityBadge';
import Button from '../common/Button';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function AlertItem({ alert, onSelect }) {
  const severityMapping = {
    critical: 'CRITICAL',
    warning: 'HIGH',
    advisory: 'MODERATE',
    safe: 'LOW',
  };

  const level = severityMapping[alert.severity] || 'HIGH';

  return (
    <Card className="hover:border-slate-300 transition duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Strictly contains text + icon */}
          <SeverityBadge level={level} size="sm" pulse={level === 'CRITICAL'} />
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
            {alert.type}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {alert.timestamp}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">Source: {alert.source}</span>
      </div>

      <div className="mt-3">
        <h4 className="text-base font-bold text-slate-900 tracking-tight">{alert.title}</h4>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 mt-1">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>{alert.location}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {alert.description}
        </p>

        {alert.actionRequired && (
          <div className="mt-3 p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs">
            <span className="font-bold text-red-900 block mb-0.5">Recommended Safety Protocol:</span>
            <span className="text-red-800">{alert.actionRequired}</span>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Affected Perimeter: ~{alert.affectedRadiusKm} km radius
          </span>
          {onSelect && (
            <Button variant="secondary" size="sm" onClick={() => onSelect(alert)}>
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
