import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Circle, Popup, Tooltip, Polyline } from 'react-leaflet';
import { Link } from 'react-router-dom';
import {
  Shield,
  Mountain,
  CloudRain,
  Waves,
  Users,
  Home,
  Layers,
  MapPin,
  ExternalLink,
  Maximize2,
  Info,
  Compass,
} from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * DashboardMap - Large interactive geospatial hazard map for the main CrisisGuard AI dashboard.
 * Displays multi-hazard incidents, radar echoes, proglacial basins, crowd bottlenecks, and pilgrimage routes.
 */
export default function DashboardMap({
  landslides = [],
  cloudbursts = [],
  glof = [],
  crowds = [],
  shelters = [],
  height = '540px',
  onSelectIncident,
}) {
  const [activeLayer, setActiveLayer] = useState('all');
  const [mapRegion, setMapRegion] = useState('all');
  const mapRef = useRef(null);

  // Quick corridor zoom coordinates
  const corridorCoords = {
    all: { center: [30.45, 79.15], zoom: 8 },
    kedarnath: { center: [30.5841, 79.0471], zoom: 11 },
    badrinath: { center: [30.6482, 79.5298], zoom: 11 },
    gangotri: { center: [30.9992, 78.6811], zoom: 10 },
  };

  const handleRegionChange = (regionKey) => {
    setMapRegion(regionKey);
    const target = corridorCoords[regionKey];
    if (target && mapRef.current) {
      mapRef.current.setView(target.center, target.zoom, { animate: true, duration: 1 });
    }
  };

  const layerOptions = [
    { id: 'all', label: 'All Hazards', icon: Layers },
    { id: 'landslide', label: 'Landslides', icon: Mountain, color: 'text-red-500' },
    { id: 'cloudburst', label: 'Cloudbursts', icon: CloudRain, color: 'text-amber-500' },
    { id: 'glof', label: 'GLOF Lakes', icon: Waves, color: 'text-sky-500' },
    { id: 'crowd', label: 'Crowd Risks', icon: Users, color: 'text-purple-500' },
    { id: 'shelter', label: 'Safe Shelters', icon: Home, color: 'text-emerald-500' },
  ];

  // Char Dham Pilgrimage Highway Corridors
  const nh07Route = [
    [30.0869, 78.2676], // Rishikesh
    [30.1459, 78.5986], // Devprayag
    [30.2858, 78.9806], // Rudraprayag
    [30.3256, 79.2198], // Karanprayag
    [30.5562, 79.5681], // Joshimath
    [30.6482, 79.5298], // Lambagar Chute
    [30.7447, 79.4930], // Badrinath
  ];

  const nh107Route = [
    [30.2858, 78.9806], // Rudraprayag
    [30.5142, 79.1213], // Kund
    [30.5231, 79.0812], // Guptkashi
    [30.5621, 78.9892], // Sonprayag
    [30.5841, 79.0271], // Gaurikund
    [30.7352, 79.0669], // Kedarnath
  ];

  const shouldShow = (type) => activeLayer === 'all' || activeLayer === type;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-card bg-white flex flex-col">
      {/* Top Map Action Bar */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 z-10">
        {/* Layer Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {layerOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeLayer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveLayer(opt.id)}
                type="button"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-sm ring-1 ring-navy-950'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${opt.color || ''}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Corridor Quick Jump */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium hidden sm:inline flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            Corridor:
          </span>
          <select
            value={mapRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Uttarakhand</option>
            <option value="kedarnath">Kedarnath / NH-107</option>
            <option value="badrinath">Badrinath / NH-07</option>
            <option value="gangotri">Gangotri / Yamunotri</option>
          </select>
        </div>
      </div>

      {/* Map Canvas Area */}
      <div className="relative w-full" style={{ height }}>
        <MapContainer
          center={[30.45, 79.15]}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          ref={mapRef}
        >
          {/* OpenStreetMap Standard Basemap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Char Dham Highway Lines */}
          <Polyline
            positions={nh07Route}
            pathOptions={{
              color: '#d97706',
              weight: 4,
              opacity: 0.85,
              dashArray: '6, 6',
            }}
          >
            <Tooltip sticky>
              <span className="font-bold text-xs">NH-07 (Rishikesh - Badrinath Corridor)</span>
            </Tooltip>
          </Polyline>

          <Polyline
            positions={nh107Route}
            pathOptions={{
              color: '#dc2626',
              weight: 4,
              opacity: 0.85,
              dashArray: '6, 6',
            }}
          >
            <Tooltip sticky>
              <span className="font-bold text-xs">NH-107 (Rudraprayag - Kedarnath Axis)</span>
            </Tooltip>
          </Polyline>

          {/* 1. Landslide Markers */}
          {shouldShow('landslide') &&
            landslides.map((ls) => (
              <CircleMarker
                key={ls.id}
                center={ls.coordinates}
                radius={ls.severity === 'CRITICAL' ? 12 : 9}
                pathOptions={{
                  color: ls.severity === 'CRITICAL' ? '#991b1b' : '#c2410c',
                  fillColor: ls.severity === 'CRITICAL' ? '#ef4444' : '#f97316',
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 space-y-2 text-slate-800 min-w-[220px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <Mountain className="w-3.5 h-3.5 text-red-600" />
                        {ls.name}
                      </span>
                      <SeverityBadge level={ls.severity} label={ls.severity} size="sm" />
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Location:</span> {ls.district} • {ls.highway}
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Displacement:</span>{' '}
                        <span className="font-mono font-bold text-red-700">{ls.displacementRateMmDay} mm/day</span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Status:</span> {ls.status}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
                      {ls.advisory}
                    </p>

                    <Link
                      to="/landslide"
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                    >
                      <span>Landslide Engine</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* 2. Cloudburst / Radar Zones */}
          {shouldShow('cloudburst') &&
            cloudbursts.map((cb) => (
              <React.Fragment key={cb.id}>
                {/* Convective Radar Radar Swath */}
                <Circle
                  center={cb.coordinates}
                  radius={12000}
                  pathOptions={{
                    color: '#ca8a04',
                    fillColor: '#fde047',
                    fillOpacity: 0.2,
                    weight: 1,
                    dashArray: '4, 4',
                  }}
                />
                <CircleMarker
                  center={cb.coordinates}
                  radius={10}
                  pathOptions={{
                    color: '#854d0e',
                    fillColor: '#eab308',
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-2 text-slate-800 min-w-[220px]">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                        <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                          <CloudRain className="w-3.5 h-3.5 text-amber-600" />
                          {cb.regionName}
                        </span>
                        <SeverityBadge level={cb.riskLevel} label={cb.riskLevel} size="sm" />
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="text-slate-600">
                          <span className="font-semibold text-slate-700">Precipitation:</span>{' '}
                          <span className="font-mono font-bold text-amber-800">{cb.currentRainfallMmHr} mm/hr</span>
                        </div>
                        <div className="text-slate-600">
                          <span className="font-semibold text-slate-700">Doppler Reflectivity:</span>{' '}
                          <span className="font-mono">{cb.radarReflectivityDbz} dBZ</span>
                        </div>
                        <div className="text-slate-600">
                          <span className="font-semibold text-slate-700">Lead Time:</span> {cb.projectedBurstLeadTimeMins} mins
                        </div>
                      </div>

                      <Link
                        to="/cloudburst"
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                      >
                        <span>Cloudburst Telemetry</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            ))}

          {/* 3. GLOF Glacial Lake Markers */}
          {shouldShow('glof') &&
            glof.map((gl) => (
              <CircleMarker
                key={gl.id}
                center={gl.coordinates}
                radius={11}
                pathOptions={{
                  color: '#0369a1',
                  fillColor: '#0ea5e9',
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 space-y-2 text-slate-800 min-w-[220px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <Waves className="w-3.5 h-3.5 text-sky-600" />
                        {gl.lakeName}
                      </span>
                      <SeverityBadge level={gl.severity} label={gl.severity} size="sm" />
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Altitude:</span> {gl.altitudeMeters} m
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Water Volume:</span> {gl.waterVolumeMcm} MCM
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Dam Stability:</span> {gl.moraineDamStability}
                      </div>
                    </div>

                    <Link
                      to="/glof"
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                    >
                      <span>GLOF Surveillance</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* 4. Crowd Congestion Markers */}
          {shouldShow('crowd') &&
            crowds.map((cr) => (
              <CircleMarker
                key={cr.id}
                center={cr.coordinates}
                radius={10}
                pathOptions={{
                  color: '#6b21a8',
                  fillColor: '#a855f7',
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 space-y-2 text-slate-800 min-w-[220px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-600" />
                        {cr.shrineName}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Occupancy:</span>{' '}
                        <span className="font-mono font-bold text-purple-900">
                          {cr.currentOccupancy.toLocaleString()} / {cr.capacityLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Queue Time:</span> {cr.averageQueueWaitHours} hrs
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Gate:</span> {cr.gateStatus}
                      </div>
                    </div>

                    <Link
                      to="/crowd-risk"
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                    >
                      <span>Crowd Analytics</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

          {/* 5. Safe Shelters */}
          {shouldShow('shelter') &&
            shelters.map((sh) => (
              <CircleMarker
                key={sh.id}
                center={sh.coordinates}
                radius={8}
                pathOptions={{
                  color: '#065f46',
                  fillColor: '#10b981',
                  fillOpacity: 0.95,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 text-slate-800 min-w-[200px]">
                    <div className="font-bold text-xs text-emerald-900 flex items-center gap-1 border-b border-slate-200 pb-1">
                      <Home className="w-3.5 h-3.5 text-emerald-700" />
                      {sh.name}
                    </div>
                    <div className="text-xs text-slate-600 space-y-0.5">
                      <div>
                        <span className="font-semibold">Capacity:</span> {sh.capacity} persons
                      </div>
                      <div>
                        <span className="font-semibold">Supplies:</span> {sh.suppliesDays} days buffer
                      </div>
                      <div>
                        <span className="font-semibold">Emergency POC:</span> {sh.contactNumber}
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>

        {/* Bottom Floating Map Watermark / Legend */}
        <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-[11px] font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Landslide</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Cloudburst</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span>GLOF Basin</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span>Crowd Choke</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Safe Shelter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
