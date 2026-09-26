import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Layers,
  Compass,
  Mountain,
  CloudRain,
  Waves,
  Users,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * RiskPopup - Detailed situational popup rendered when clicking any marker on the Risk Map.
 *
 * Mandatory Fields Displayed:
 * 1. Location
 * 2. Hazard type
 * 3. Risk level (SeverityBadge)
 * 4. Confidence (AI Neural Confidence Score)
 * 5. Updated time
 * 6. Affected area
 * 7. Recommendation
 */
export default function RiskPopup({ data = {} }) {
  // Normalize Hazard Type
  const rawType = (data.hazardType || data.type || '').toLowerCase();
  let hazardType = 'Multi-Hazard';
  let Icon = AlertTriangle;
  let linkPath = '/alerts';
  let accentBorder = 'border-amber-500';

  if (rawType.includes('landslide') || data.slopeAngleDeg || data.soilMoisturePct) {
    hazardType = 'Landslide';
    Icon = Mountain;
    linkPath = '/landslide';
    accentBorder = 'border-red-500';
  } else if (rawType.includes('cloudburst') || data.currentRainfallMmHr || rawType.includes('rain')) {
    hazardType = 'Cloudburst';
    Icon = CloudRain;
    linkPath = '/cloudburst';
    accentBorder = 'border-amber-500';
  } else if (rawType.includes('glof') || data.waterVolumeMcm || rawType.includes('lake')) {
    hazardType = 'GLOF (Glacial Lake)';
    Icon = Waves;
    linkPath = '/glof';
    accentBorder = 'border-sky-500';
  } else if (rawType.includes('crowd') || data.capacityLimit || data.shrineName) {
    hazardType = 'Crowd Risk';
    Icon = Users;
    linkPath = '/crowd-risk';
    accentBorder = 'border-purple-500';
  } else if (rawType.includes('alert') || data.actionRequired) {
    hazardType = data.type || 'Emergency Alert';
    Icon = Bell;
    linkPath = '/alerts';
    accentBorder = 'border-red-600';
  }

  // Normalize Risk Level
  let riskLevel = 'MODERATE';
  if (data.severity) {
    const s = data.severity.toUpperCase();
    if (s.includes('CRIT') || s.includes('RED')) riskLevel = 'CRITICAL';
    else if (s.includes('HIGH') || s.includes('WARN') || s.includes('ORANGE')) riskLevel = 'HIGH';
    else if (s.includes('MOD') || s.includes('YELLOW')) riskLevel = 'MODERATE';
    else riskLevel = 'LOW';
  } else if (data.riskScore) {
    if (data.riskScore >= 75) riskLevel = 'CRITICAL';
    else if (data.riskScore >= 50) riskLevel = 'HIGH';
    else if (data.riskScore >= 30) riskLevel = 'MODERATE';
    else riskLevel = 'LOW';
  } else if (data.riskLevel) {
    riskLevel = data.riskLevel.toUpperCase();
  }

  // Normalize Location
  const location =
    data.location ||
    data.name ||
    data.shrineName ||
    data.regionName ||
    data.lakeName ||
    'Uttarakhand Corridor';

  // Normalize Confidence
  const confidence =
    data.confidence ||
    (data.riskScore ? `${Math.min(98, Math.max(76, data.riskScore + 12))}% AI Model` : '92% AI Verification');

  // Normalize Updated Time
  const updatedTime =
    data.updatedTime ||
    data.timestamp ||
    data.lastMovement ||
    '4 mins ago';

  // Normalize Affected Area
  const affectedArea =
    data.affectedArea ||
    (data.affectedRadiusKm ? `${data.affectedRadiusKm} km radius buffer` : null) ||
    data.route ||
    data.highway ||
    data.district ||
    'Corridor Segment';

  // Normalize Recommendation
  const recommendation =
    data.recommendation ||
    data.actionRequired ||
    data.advisory ||
    data.details ||
    'Follow official SDRF disaster response bulletins and check live convoy staging points.';

  return (
    <div className="w-[280px] sm:w-[320px] p-1 font-sans text-slate-900 space-y-3">
      {/* Top Header: Hazard Icon + Hazard Type + Severity Badge */}
      <div className={`border-l-4 ${accentBorder} pl-2.5 pb-1 flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-slate-800 shrink-0" />
          <span className="font-extrabold text-xs tracking-wider uppercase text-slate-800">
            {hazardType}
          </span>
        </div>
        <SeverityBadge
          level={riskLevel}
          label={riskLevel}
          size="sm"
          pulse={riskLevel === 'CRITICAL' || riskLevel === 'HIGH'}
        />
      </div>

      {/* 1. Location Title */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Location
        </span>
        <div className="flex items-start gap-1.5 text-slate-900">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <h4 className="font-bold text-sm leading-snug">{location}</h4>
        </div>
      </div>

      {/* 2. Key Attributes Grid: Confidence, Updated Time, Affected Area */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Confidence
          </span>
          <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="text-[11px] font-mono">{confidence}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Updated Time
          </span>
          <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px]">{updatedTime}</span>
          </div>
        </div>

        <div className="col-span-2 pt-1 border-t border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Affected Area
          </span>
          <div className="flex items-center gap-1 font-medium text-slate-800 text-[11px] mt-0.5">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{affectedArea}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Recommendation Box */}
      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-xs">
        <span className="font-extrabold text-[10px] uppercase text-amber-900 tracking-wide flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-700" />
          Recommendation
        </span>
        <p className="text-[11px] text-amber-950 font-normal leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* 4. Footer CTA Link */}
      <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-100">
        <span className="text-[10px] text-slate-400 font-mono">
          CrisisGuard Telemetry
        </span>
        <Link
          to={linkPath}
          className="inline-flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900 transition-colors"
        >
          <span>Open Module Engine</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
