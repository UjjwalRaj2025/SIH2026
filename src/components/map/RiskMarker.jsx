import React from 'react';
import { CircleMarker, Circle, Popup, Tooltip } from 'react-leaflet';
import RiskPopup from './RiskPopup';

/**
 * RiskMarker - Renders a geospatial hazard marker with colored risk buffer zones and interactive popup.
 */
export default function RiskMarker({
  data,
  hazardType = 'landslide', // 'landslide' | 'cloudburst' | 'glof' | 'crowd' | 'alert'
  showBufferZone = true,
}) {
  if (!data || !data.coordinates) return null;

  const coords = data.coordinates;

  // Determine severity tier
  let severityTier = 'MODERATE';
  if (data.severity) {
    const s = data.severity.toUpperCase();
    if (s.includes('CRIT') || s.includes('RED')) severityTier = 'CRITICAL';
    else if (s.includes('HIGH') || s.includes('WARN') || s.includes('ORANGE')) severityTier = 'HIGH';
    else if (s.includes('MOD') || s.includes('YELLOW')) severityTier = 'MODERATE';
    else severityTier = 'LOW';
  } else if (data.riskScore) {
    if (data.riskScore >= 75) severityTier = 'CRITICAL';
    else if (data.riskScore >= 50) severityTier = 'HIGH';
    else if (data.riskScore >= 30) severityTier = 'MODERATE';
    else severityTier = 'LOW';
  } else if (data.riskLevel) {
    severityTier = data.riskLevel.toUpperCase();
  }

  // Visual styling map by hazard type & severity
  const styleConfig = {
    landslide: {
      markerColor: severityTier === 'CRITICAL' ? '#991b1b' : '#c2410c',
      fillColor: severityTier === 'CRITICAL' ? '#dc2626' : '#ea580c',
      radius: severityTier === 'CRITICAL' ? 12 : 9,
      zoneRadius: 4500,
      zoneStroke: '#b91c1c',
      zoneFill: '#f87171',
      zoneOpacity: 0.18,
      label: 'Landslide Zone',
    },
    cloudburst: {
      markerColor: '#854d0e',
      fillColor: '#ca8a04',
      radius: 11,
      zoneRadius: 12000,
      zoneStroke: '#ca8a04',
      zoneFill: '#fde047',
      zoneOpacity: 0.22,
      label: 'Cloudburst Radar Swath',
    },
    glof: {
      markerColor: '#0369a1',
      fillColor: '#0284c7',
      radius: 11,
      zoneRadius: 7500,
      zoneStroke: '#0284c7',
      zoneFill: '#38bdf8',
      zoneOpacity: 0.2,
      label: 'GLOF Glacial Basin',
    },
    crowd: {
      markerColor: '#581c87',
      fillColor: '#7c3aed',
      radius: 10,
      zoneRadius: 4000,
      zoneStroke: '#7c3aed',
      zoneFill: '#c084fc',
      zoneOpacity: 0.2,
      label: 'Pilgrim Crowd Chokepoint',
    },
    alert: {
      markerColor: '#7f1d1d',
      fillColor: '#ef4444',
      radius: severityTier === 'CRITICAL' ? 13 : 10,
      zoneRadius: (data.affectedRadiusKm || 8) * 1000,
      zoneStroke: '#dc2626',
      zoneFill: '#fca5a5',
      zoneOpacity: 0.25,
      label: 'Emergency Alert Zone',
    },
  };

  const style = styleConfig[hazardType] || styleConfig.landslide;

  return (
    <React.Fragment>
      {/* 1. Colored Risk Buffer Zone (Circle Overlay) */}
      {showBufferZone && (
        <Circle
          center={coords}
          radius={style.zoneRadius}
          pathOptions={{
            color: style.zoneStroke,
            fillColor: style.zoneFill,
            fillOpacity: style.zoneOpacity,
            weight: 1.5,
            dashArray: hazardType === 'cloudburst' ? '5, 5' : undefined,
          }}
        />
      )}

      {/* 2. Epicenter Core Marker */}
      <CircleMarker
        center={coords}
        radius={style.radius}
        pathOptions={{
          color: style.markerColor,
          fillColor: style.fillColor,
          fillOpacity: 0.95,
          weight: 2.5,
        }}
      >
        {/* Hover Tooltip */}
        <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
          <div className="font-sans text-xs">
            <span className="font-extrabold block text-slate-900">
              {data.name || data.title || data.shrineName || data.lakeName || data.regionName}
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
              {style.label} • {severityTier}
            </span>
          </div>
        </Tooltip>

        {/* Click Popup containing all 7 mandatory specifications */}
        <Popup className="crisisguard-map-popup" maxWidth={360}>
          <RiskPopup data={{ ...data, hazardType: data.hazardType || hazardType }} />
        </Popup>
      </CircleMarker>
    </React.Fragment>
  );
}
