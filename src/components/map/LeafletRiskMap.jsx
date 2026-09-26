import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, Polyline } from 'react-leaflet';
import { Shield, AlertTriangle, Mountain, CloudRain, Waves, Users, Home, Filter } from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

export default function LeafletRiskMap({
  landslides = [],
  cloudbursts = [],
  glof = [],
  crowds = [],
  shelters = [],
  height = '560px',
  initialCenter = [30.45, 79.15],
  initialZoom = 8,
  showControls = true,
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Hazards', icon: Filter },
    { id: 'landslide', label: 'Landslides', icon: Mountain, color: 'text-red-600' },
    { id: 'cloudburst', label: 'Cloudbursts', icon: CloudRain, color: 'text-amber-600' },
    { id: 'glof', label: 'GLOF Lakes', icon: Waves, color: 'text-sky-600' },
    { id: 'crowd', label: 'Crowd Chokepoints', icon: Users, color: 'text-purple-600' },
    { id: 'shelter', label: 'Safe Shelters', icon: Home, color: 'text-emerald-600' },
  ];

  // Char Dham Pilgrimage Route Polyline coordinates for context
  const charDhamRouteSegments = [
    // Rishikesh -> Devprayag -> Rudraprayag -> Joshimath -> Badrinath
    [
      [30.0869, 78.2676], // Rishikesh
      [30.1459, 78.5986], // Devprayag
      [30.2858, 78.9806], // Rudraprayag
      [30.3256, 79.2198], // Karanprayag
      [30.5562, 79.5681], // Joshimath
      [30.6482, 79.5298], // Lambagar
      [30.7447, 79.4930], // Badrinath
    ],
    // Rudraprayag -> Kund -> Guptkashi -> Sonprayag -> Kedarnath
    [
      [30.2858, 78.9806], // Rudraprayag
      [30.5142, 79.1213], // Kund
      [30.5231, 79.0812], // Guptkashi
      [30.5621, 78.9892], // Sonprayag
      [30.5841, 79.0271], // Gaurikund
      [30.7352, 79.0669], // Kedarnath
    ],
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white">
      {/* Top Filter Bar */}
      {showControls && (
        <div className="absolute top-3.5 left-3.5 right-3.5 sm:right-auto z-20 flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${opt.color || ''}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:block p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-elevated text-xs space-y-2 max-w-xs">
        <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center justify-between">
          <span>Hazard Geospatial Legend</span>
          <Shield className="w-3.5 h-3.5 text-teal-600" />
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 font-medium">
          <span className="w-3 h-3 rounded-full bg-red-600 shrink-0 shadow-sm"></span>
          <span>Active Landslide & Rockfall</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 font-medium">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0 shadow-sm"></span>
          <span>Cloudburst / Flash Flood Risk</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 font-medium">
          <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0 shadow-sm"></span>
          <span>GLOF Monitored Glacial Basin</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 font-medium">
          <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0 shadow-sm"></span>
          <span>Pilgrim Crowd Chokepoint</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 font-medium">
          <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0 shadow-sm"></span>
          <span>Safe Evacuation Shelter</span>
        </div>
      </div>

      <div style={{ height }}>
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Char Dham Pilgrim Highways Route Polylines */}
          {charDhamRouteSegments.map((segment, idx) => (
            <Polyline
              key={`route-seg-${idx}`}
              positions={segment}
              pathOptions={{
                color: '#0d9488',
                weight: 4,
                opacity: 0.75,
                dashArray: '6, 8',
              }}
            >
              <Tooltip sticky>Char Dham Primary Corridor (NH-07 / NH-107)</Tooltip>
            </Polyline>
          ))}

          {/* Landslide Hazards */}
          {(activeFilter === 'all' || activeFilter === 'landslide') &&
            landslides.map((ls) => (
              <CircleMarker
                key={ls.id}
                center={ls.coordinates}
                radius={13}
                pathOptions={{
                  color: '#b91c1c',
                  fillColor: '#dc2626',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span className="font-bold text-xs">⛰️ {ls.name} ({ls.status})</span>
                </Tooltip>
                <Popup>
                  <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-sm text-red-700">{ls.name}</span>
                      <SeverityBadge level={ls.riskScore > 75 ? 'CRITICAL' : 'HIGH'} label={ls.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{ls.details}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Threat Score:</span>
                        <span className="font-black text-red-600">{ls.riskScore}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Soil Moisture:</span>
                        <span className="font-bold text-slate-800">{ls.soilMoisturePct}%</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200 font-semibold">
                      Route: {ls.route} • Movement: {ls.lastMovement}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* Cloudburst Nowcast Zones */}
          {(activeFilter === 'all' || activeFilter === 'cloudburst') &&
            cloudbursts.map((cb) => (
              <CircleMarker
                key={cb.id}
                center={cb.coordinates}
                radius={15}
                pathOptions={{
                  color: '#b45309',
                  fillColor: '#d97706',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <span className="font-bold text-xs">⛈️ {cb.zone} ({cb.currentRainfallRateMmHr} mm/h)</span>
                </Tooltip>
                <Popup>
                  <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-sm text-amber-700">{cb.zone}</span>
                      <SeverityBadge level="HIGH" label={cb.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{cb.forecastNext2Hours}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Rainfall Rate:</span>
                        <span className="font-black text-amber-600">{cb.currentRainfallRateMmHr} mm/hr</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Probability:</span>
                        <span className="font-bold text-slate-800">{cb.probabilityPct}%</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Radar Reflectivity: {cb.radarReflectivityDbz} dBZ
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* GLOF Monitored Lakes */}
          {(activeFilter === 'all' || activeFilter === 'glof') &&
            glof.map((gl) => (
              <CircleMarker
                key={gl.id}
                center={gl.coordinates}
                radius={12}
                pathOptions={{
                  color: '#0369a1',
                  fillColor: '#0284c7',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <span className="font-bold text-xs">🏔️ {gl.lakeName} ({gl.riskLevel})</span>
                </Tooltip>
                <Popup>
                  <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-sm text-sky-800">{gl.lakeName}</span>
                      <SeverityBadge level={gl.riskLevel === 'Critical' ? 'CRITICAL' : 'MODERATE'} label={gl.riskLevel} size="sm" />
                    </div>
                    <div className="text-xs text-slate-600">
                      Altitude: <span className="font-bold text-slate-900">{gl.altitudeMeters}m</span> • Basin: {gl.basin}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Expansion:</span>
                        <span className="font-bold text-sky-700">{gl.expansionRatePct}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Lead Time:</span>
                        <span className="font-bold text-amber-700">{gl.evacuationLeadTimeMins} mins</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Downstream: {gl.downstreamSettlements.join(', ')}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* Crowd Congestion Choke Points */}
          {(activeFilter === 'all' || activeFilter === 'crowd') &&
            crowds.map((crw) => (
              <CircleMarker
                key={crw.id}
                center={crw.coordinates}
                radius={13}
                pathOptions={{
                  color: '#6b21a8',
                  fillColor: '#7c3aed',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <span className="font-bold text-xs">👥 {crw.shrineName} ({crw.crowdDensityPerSqm} p/m²)</span>
                </Tooltip>
                <Popup>
                  <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-sm text-purple-800">{crw.shrineName}</span>
                      <SeverityBadge level={crw.currentOccupancy > crw.capacityLimit ? 'HIGH' : 'LOW'} label={crw.status} size="sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Occupancy:</span>
                        <span className="font-bold text-slate-900">{crw.currentOccupancy} / {crw.capacityLimit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Wait Time:</span>
                        <span className="font-bold text-purple-700">{crw.averageQueueWaitHours} hrs</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-purple-950 bg-purple-50 p-2 rounded-lg border border-purple-200 font-medium">
                      {crw.recommendation}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* Safe Shelters */}
          {(activeFilter === 'all' || activeFilter === 'shelter') &&
            shelters.map((sh) => (
              <CircleMarker
                key={sh.id}
                center={sh.coordinates}
                radius={11}
                pathOptions={{
                  color: '#047857',
                  fillColor: '#059669',
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <span className="font-bold text-xs">🏠 {sh.name}</span>
                </Tooltip>
                <Popup>
                  <div className="p-2 space-y-2 text-slate-900 max-w-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                      <span className="font-extrabold text-sm text-emerald-800">{sh.name}</span>
                      <SeverityBadge level="LOW" label="SAFE SHELTER" size="sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Free Beds:</span>
                        <span className="font-bold text-emerald-700">{sh.availableBeds} / {sh.capacity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Medical Post:</span>
                        <span className="font-bold text-slate-800">{sh.medicalPost ? 'Active' : 'Basic'}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Supplies: {sh.foodSupplies}
                    </div>
                    <div className="text-[11px] text-teal-800 font-mono font-bold">
                      Emergency Contact: {sh.contact}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
