import React from 'react';
import Modal from '../common/Modal';
import SeverityBadge from '../common/SeverityBadge';
import Button from '../common/Button';
import { MapPin, Clock, PhoneCall, Radio, ShieldAlert } from 'lucide-react';

export default function AlertModal({ alert, isOpen, onClose }) {
  if (!alert) return null;

  const severityMapping = {
    critical: 'CRITICAL',
    warning: 'HIGH',
    advisory: 'MODERATE',
    safe: 'LOW',
  };

  const level = severityMapping[alert.severity] || 'HIGH';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={alert.title}
      subtitle={`Incident ID: ${alert.id} • ${alert.location}`}
      footer={
        <>
          <a
            href="tel:1070"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call State Emergency (1070)</span>
          </a>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-slate-100">
          <SeverityBadge level={level} size="md" pulse={level === 'CRITICAL'} />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {alert.type}
          </span>
          <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Reported: {alert.timestamp}
          </span>
          <span className="text-xs text-teal-800 font-semibold">Source: {alert.source}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Situational Assessment
          </h4>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">{alert.description}</p>
        </div>

        <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
          <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-red-600 animate-pulse" />
            <span>Immediate Public Advisory</span>
          </h4>
          <p className="text-sm text-red-950 font-bold">{alert.actionRequired}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-subtle">
            <span className="text-slate-500 block font-medium">GIS Coordinates</span>
            <span className="font-mono font-bold text-slate-800">
              {alert.coordinates ? `${alert.coordinates[0]}° N, ${alert.coordinates[1]}° E` : 'In Field'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-subtle">
            <span className="text-slate-500 block font-medium">Surveillance Radius</span>
            <span className="font-bold text-slate-800">~{alert.affectedRadiusKm} km radius</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
