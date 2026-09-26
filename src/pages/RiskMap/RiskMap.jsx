import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Polyline,
  Tooltip,
} from 'react-leaflet';
import {
  Layers,
  MapPin,
  Mountain,
  CloudRain,
  Waves,
  Users,
  Bell,
  Filter,
  Shield,
  Compass,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import RiskMarker from '../../components/map/RiskMarker';
import RiskLegend from '../../components/map/RiskLegend';
import RiskLayerControl from '../../components/map/RiskLayerControl';
import Loading from '../../components/common/Loading';
import SeverityBadge from '../../components/common/SeverityBadge';
import { mockApiService } from '../../services/mockApi';

/**
 * RiskMap - Full interactive geospatial risk map page for CrisisGuard AI
 * Route: /risk-map
 *
 * Implements:
 * - Top Filter Bar: All | Landslide | Cloudburst | GLOF | Crowd | Alerts
 * - OpenStreetMap tiles centered on Uttarakhand Himalayas
 * - Markers with colored risk buffer zones
 * - Interactive popups showing Location, Hazard type, Risk level, Confidence, Updated time, Affected area, Recommendation
 * - Floating collapsible legend (RiskLegend)
 * - Layer control (RiskLayerControl)
 * - Corridor quick zoom shortcuts
 */
export default function RiskMap() {
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topFilter, setTopFilter] = useState('all'); // 'all' | 'landslide' | 'cloudburst' | 'glof' | 'crowd' | 'alert'
  const [layerVisibility, setLayerVisibility] = useState({
    landslide: true,
    cloudburst: true,
    glof: true,
    crowd: true,
    alert: true,
  });
  const [showBufferZones, setShowBufferZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [activeCorridor, setActiveCorridor] = useState('all');
  const mapRef = useRef(null);

  // Quick zoom coordinates for key mountain sectors
  const sectorPresets = {
    all: { name: 'Whole State', center: [30.45, 79.15], zoom: 8.5 },
    kedarnath: { name: 'Kedarnath / NH-107', center: [30.5841, 79.0471], zoom: 11 },
    badrinath: { name: 'Badrinath / NH-07', center: [30.6482, 79.5298], zoom: 11 },
    gangotri: { name: 'Gangotri / Yamunotri', center: [30.9992, 78.6811], zoom: 10 },
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await mockApiService.getRiskMapData();
        setMapData(res);
      } catch (err) {
        console.error('Failed to load risk map data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSectorChange = (sectorKey) => {
    setActiveCorridor(sectorKey);
    const target = sectorPresets[sectorKey];
    if (target && mapRef.current) {
      mapRef.current.setView(target.center, target.zoom, { animate: true, duration: 1 });
    }
  };

  const handleToggleLayer = (layerId) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  // Top Filter Options with live counts
  const filterOptions = [
    { id: 'all', label: 'All Hazards', icon: Filter, count: 0 },
    { id: 'landslide', label: 'Landslide', icon: Mountain, color: 'text-red-600', count: mapData?.landslides?.length || 0 },
    { id: 'cloudburst', label: 'Cloudburst', icon: CloudRain, color: 'text-amber-600', count: mapData?.cloudbursts?.length || 0 },
    { id: 'glof', label: 'GLOF', icon: Waves, color: 'text-sky-600', count: mapData?.glof?.length || 0 },
    { id: 'crowd', label: 'Crowd', icon: Users, color: 'text-purple-600', count: mapData?.crowds?.length || 0 },
    { id: 'alert', label: 'Alerts', icon: Bell, color: 'text-red-700', count: mapData?.alerts?.length || 0 },
  ];

  // Recalculate total count for "All"
  filterOptions[0].count =
    (mapData?.landslides?.length || 0) +
    (mapData?.cloudbursts?.length || 0) +
    (mapData?.glof?.length || 0) +
    (mapData?.crowds?.length || 0) +
    (mapData?.alerts?.length || 0);

  // Filter check helper
  const isLayerActive = (layerKey) => {
    if (topFilter !== 'all' && topFilter !== layerKey) return false;
    return layerVisibility[layerKey];
  };

  // Char Dham Pilgrimage Highway Coordinates
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

  if (loading) {
    return <Loading label="Loading OpenStreetMap GIS layers & disaster coordinates..." fullHeight />;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================================
          1. PAGE HEADER & SECTOR CONTROLS
         ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-2 rounded-xl bg-navy-900 text-teal-400 shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Interactive Geospatial Risk Map
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>LIVE GIS SURVEILLANCE</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            High-resolution spatial hazards, buffer impact rings, and Char Dham pilgrimage corridors across Uttarakhand.
          </p>
        </div>

        {/* Sector Quick-Jump Buttons & Layer Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold hidden sm:inline flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              Sector:
            </span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {Object.keys(sectorPresets).map((secKey) => (
                <button
                  key={secKey}
                  type="button"
                  onClick={() => handleSectorChange(secKey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    activeCorridor === secKey
                      ? 'bg-navy-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sectorPresets[secKey].name}
                </button>
              ))}
            </div>
          </div>

          <RiskLayerControl
            activeLayers={layerVisibility}
            onToggleLayer={handleToggleLayer}
            showBufferZones={showBufferZones}
            onToggleBufferZones={() => setShowBufferZones(!showBufferZones)}
            showRoutes={showRoutes}
            onToggleRoutes={() => setShowRoutes(!showRoutes)}
            counts={{
              landslide: mapData?.landslides?.length || 0,
              cloudburst: mapData?.cloudbursts?.length || 0,
              glof: mapData?.glof?.length || 0,
              crowd: mapData?.crowds?.length || 0,
              alert: mapData?.alerts?.length || 0,
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          2. TOP FILTER BAR (All | Landslide | Cloudburst | GLOF | Crowd | Alerts)
         ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-2.5 shadow-card flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {filterOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = topFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setTopFilter(opt.id)}
                type="button"
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-md ring-2 ring-navy-950'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-300' : opt.color || 'text-slate-600'}`} />
                <span>{opt.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-navy-800 text-teal-300' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3 pr-2 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold text-slate-700">Live Incident Telemetry</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN INTERACTIVE MAP CANVAS WITH OPENSTREETMAP & REACT LEAFLET
         ========================================================================= */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-slate-300 shadow-elevated bg-slate-100">
        <div className="relative w-full h-[620px] sm:h-[680px]">
          <MapContainer
            center={[30.45, 79.15]}
            zoom={8.5}
            zoomControl={false}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            ref={mapRef}
          >
            {/* Top Right Zoom Control */}
            <ZoomControl position="topright" />

            {/* Standard OpenStreetMap Tile Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
            />

            {/* Char Dham Highway Lines */}
            {showRoutes && (
              <>
                <Polyline
                  positions={nh07Route}
                  pathOptions={{
                    color: '#d97706',
                    weight: 4.5,
                    opacity: 0.85,
                    dashArray: '6, 6',
                  }}
                >
                  <Tooltip sticky>
                    <span className="font-bold text-xs">NH-07 (Rishikesh - Joshimath - Badrinath Corridor)</span>
                  </Tooltip>
                </Polyline>

                <Polyline
                  positions={nh107Route}
                  pathOptions={{
                    color: '#dc2626',
                    weight: 4.5,
                    opacity: 0.85,
                    dashArray: '6, 6',
                  }}
                >
                  <Tooltip sticky>
                    <span className="font-bold text-xs">NH-107 (Rudraprayag - Sonprayag - Kedarnath Axis)</span>
                  </Tooltip>
                </Polyline>
              </>
            )}

            {/* 1. Landslide Markers & Risk Zones */}
            {isLayerActive('landslide') &&
              mapData?.landslides?.map((ls) => (
                <RiskMarker
                  key={ls.id}
                  data={ls}
                  hazardType="landslide"
                  showBufferZone={showBufferZones}
                />
              ))}

            {/* 2. Cloudburst Markers & Radar Swaths */}
            {isLayerActive('cloudburst') &&
              mapData?.cloudbursts?.map((cb) => (
                <RiskMarker
                  key={cb.id}
                  data={cb}
                  hazardType="cloudburst"
                  showBufferZone={showBufferZones}
                />
              ))}

            {/* 3. GLOF Glacial Lake Markers & Flood Basins */}
            {isLayerActive('glof') &&
              mapData?.glof?.map((gl) => (
                <RiskMarker
                  key={gl.id}
                  data={gl}
                  hazardType="glof"
                  showBufferZone={showBufferZones}
                />
              ))}

            {/* 4. Crowd Congestion Chokepoint Markers */}
            {isLayerActive('crowd') &&
              mapData?.crowds?.map((cr) => (
                <RiskMarker
                  key={cr.id}
                  data={cr}
                  hazardType="crowd"
                  showBufferZone={showBufferZones}
                />
              ))}

            {/* 5. Active Emergency Alerts */}
            {isLayerActive('alert') &&
              mapData?.alerts?.map((alt) => (
                <RiskMarker
                  key={alt.id}
                  data={alt}
                  hazardType="alert"
                  showBufferZone={showBufferZones}
                />
              ))}
          </MapContainer>

          {/* Floating Collapsible Map Legend */}
          <RiskLegend position="bottom-right" />

          {/* Bottom Left GPS Coordinates & Source Ribbon */}
          <div className="absolute bottom-4 left-4 z-[400] hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-[11px] font-mono font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>30°18'N 79°01'E</span>
            <span className="text-slate-300">|</span>
            <span>UTTARAKHAND GIS CORRIDORS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. ACTIVE HIGH-RISK SECTOR HIGHLIGHTS CARDS
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Critical Landslide Spotlight */}
        <div className="p-4 rounded-2xl bg-white border border-red-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-red-600" />
              <span className="font-extrabold text-xs text-red-950 uppercase tracking-wide">
                Critical Landslide Blockage
              </span>
            </div>
            <SeverityBadge level="CRITICAL" label="BLOCKED" size="sm" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            NH-07 Lambagar Chute (Km 282)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Active rockfall debris cascading onto highway. One-way SDRF escorted convoy operating; earthmovers on standby.
          </p>
          <button
            type="button"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([30.6482, 79.5298], 12, { animate: true });
              }
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 pt-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locate on Map &rarr;</span>
          </button>
        </div>

        {/* Convective Cloudburst Spotlight */}
        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-amber-600" />
              <span className="font-extrabold text-xs text-amber-950 uppercase tracking-wide">
                Convective Storm Nowcast
              </span>
            </div>
            <SeverityBadge level="HIGH" label="72 mm/hr" size="sm" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Mandakini Valley Radar Swath
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Doppler reflectivity measured at 52 dBZ over Rudraprayag. Flash flood siren tests verified in downstream riverside camps.
          </p>
          <button
            type="button"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([30.7346, 79.0669], 12, { animate: true });
              }
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 pt-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locate on Map &rarr;</span>
          </button>
        </div>

        {/* Pilgrim Crowd Chokepoint Spotlight */}
        <div className="p-4 rounded-2xl bg-white border border-purple-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="font-extrabold text-xs text-purple-950 uppercase tracking-wide">
                Trek Congestion Overload
              </span>
            </div>
            <SeverityBadge level="HIGH" label="122% CAP" size="sm" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">
            Gaurikund Transit & Mule Staging
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Queue wait times reaching 4.5 hours for ascent. Regulated batch release active from Guptkashi holding camps.
          </p>
          <button
            type="button"
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([30.5841, 79.0271], 12, { animate: true });
              }
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 pt-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locate on Map &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
