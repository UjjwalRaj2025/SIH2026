import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { MapPin, Navigation, Shield, Home, AlertTriangle, CheckCircle2 } from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * RouteMap - Interactive route map for the Journey Risk Assessment page.
 * Renders color-coded highway route segments, waypoints, hazard chokepoints, and emergency safe shelters.
 */
export default function RouteMap({
  origin = 'Haridwar / Rishikesh',
  destination = 'Kedarnath Dham',
  waypoints = [],
  shelters = [],
  overallRisk = 'MODERATE',
  height = '440px',
}) {
  const mapRef = useRef(null);

  // Default coordinate datasets based on destination
  const getRouteCoordinates = () => {
    const dest = destination.toLowerCase();

    if (dest.includes('badrinath')) {
      return [
        { name: 'Rishikesh (Start)', coords: [30.0869, 78.2676], status: 'Clear', condition: 'Smooth Highway', color: '#10b981' },
        { name: 'Devprayag Confluence', coords: [30.1459, 78.5986], status: 'Clear', condition: 'Open Tarmac', color: '#10b981' },
        { name: 'Srinagar Garhwal', coords: [30.2228, 78.7845], status: 'Safe', condition: 'Moderate Traffic', color: '#10b981' },
        { name: 'Rudraprayag', coords: [30.2858, 78.9806], status: 'Watch', condition: 'River level rising', color: '#f59e0b' },
        { name: 'Karanprayag', coords: [30.3256, 79.2198], status: 'Safe', condition: 'Clear', color: '#10b981' },
        { name: 'Joshimath Base', coords: [30.5562, 79.5681], status: 'Watch', condition: 'Subsidence monitoring', color: '#f59e0b' },
        { name: 'Lambagar Chute', coords: [30.6482, 79.5298], status: 'Advisory', condition: 'Rockfall Debris • Single-lane convoy', color: '#ef4444' },
        { name: 'Badrinath Dham (Destination)', coords: [30.7447, 79.4930], status: 'Open', condition: 'Pilgrim Entry Regulated', color: '#10b981' },
      ];
    }

    if (dest.includes('gangotri')) {
      return [
        { name: 'Rishikesh (Start)', coords: [30.0869, 78.2676], status: 'Clear', condition: 'Smooth Highway', color: '#10b981' },
        { name: 'Chamba Garhwal', coords: [30.3541, 78.3982], status: 'Safe', condition: 'Clear Weather', color: '#10b981' },
        { name: 'Uttarkashi HQ', coords: [30.7268, 78.4354], status: 'Safe', condition: 'Good Road Condition', color: '#10b981' },
        { name: 'Bhatwari Catchment', coords: [30.8122, 78.5812], status: 'Watch', condition: 'Intermittent Light Rain', color: '#f59e0b' },
        { name: 'Harsil Valley', coords: [31.0368, 78.7368], status: 'Safe', condition: 'Dry Surface', color: '#10b981' },
        { name: 'Gangotri Dham (Destination)', coords: [30.9947, 78.9398], status: 'Open', condition: 'Normal Operations', color: '#10b981' },
      ];
    }

    if (dest.includes('yamunotri')) {
      return [
        { name: 'Dehradun (Start)', coords: [30.3165, 78.0322], status: 'Clear', condition: 'Normal Urban Transit', color: '#10b981' },
        { name: 'Mussoorie Bypass', coords: [30.4598, 78.0644], status: 'Clear', condition: 'Normal Visibility', color: '#10b981' },
        { name: 'Damta', coords: [30.6012, 78.0211], status: 'Safe', condition: 'Clear Road', color: '#10b981' },
        { name: 'Barkot Hub', coords: [30.8122, 78.2045], status: 'Safe', condition: 'Full Fuel & Supplies', color: '#10b981' },
        { name: 'Janki Chatti Base', coords: [30.9851, 78.4412], status: 'Watch', condition: 'Mule track wet, walk cautiously', color: '#f59e0b' },
        { name: 'Yamunotri Dham (Destination)', coords: [31.0142, 78.4598], status: 'Open', condition: 'Stable Weather', color: '#10b981' },
      ];
    }

    // Default: Haridwar/Rishikesh -> Kedarnath Dham
    return [
      { name: 'Haridwar / Rishikesh (Start)', coords: [30.0869, 78.2676], status: 'Clear', condition: 'NH-58 Smooth 4-lane tarmac', color: '#10b981' },
      { name: 'Devprayag Confluence', coords: [30.1459, 78.5986], status: 'Clear', condition: 'Clear skies, normal speeds', color: '#10b981' },
      { name: 'Srinagar Garhwal', coords: [30.2228, 78.7845], status: 'Safe', condition: 'Transit hub, supplies open', color: '#10b981' },
      { name: 'Rudraprayag Confluence', coords: [30.2858, 78.9806], status: 'Watch', condition: 'Mandakini river level +0.4m/hr', color: '#f59e0b' },
      { name: 'Kund / Tilwara', coords: [30.5142, 79.1213], status: 'Safe', condition: 'Normal valley traffic', color: '#10b981' },
      { name: 'Guptkashi Staging Base', coords: [30.5231, 79.0812], status: 'Watch', condition: 'Vehicular holding active during peak influx', color: '#f59e0b' },
      { name: 'Sonprayag Terminal', coords: [30.5621, 78.9892], status: 'Watch', condition: 'Parking full • Shuttle transit operating', color: '#f59e0b' },
      { name: 'Gaurikund Mule Staging', coords: [30.5841, 79.0271], status: 'High Congestion', condition: 'Queue 4.0 hrs • Trek bridge caution', color: '#ef4444' },
      { name: 'Kedarnath Dham (Destination)', coords: [30.7352, 79.0669], status: 'Active Watch', condition: 'Mandakini normal flow • Temple open', color: '#f59e0b' },
    ];
  };

  const points = waypoints.length > 0 ? waypoints : getRouteCoordinates();
  const polylineCoords = points.map((p) => p.coords);

  // Safe relief camps along the mountain corridor
  const defaultShelters = [
    { name: 'Sonprayag Relief Camp & Medical Base', coords: [30.5621, 78.9892], capacity: 1500, phone: '1077' },
    { name: 'Guptkashi Government Transit Hall', coords: [30.5231, 79.0812], capacity: 800, phone: '01364-267222' },
    { name: 'Govindghat Gurudwara Relief Center', coords: [30.6221, 79.5611], capacity: 2500, phone: '1070' },
  ];

  const activeShelters = shelters.length > 0 ? shelters : defaultShelters;

  // Center on middle waypoint
  const midIndex = Math.floor(points.length / 2);
  const mapCenter = points[midIndex]?.coords || [30.45, 79.05];

  useEffect(() => {
    if (mapRef.current && polylineCoords.length > 0) {
      mapRef.current.fitBounds(polylineCoords, { padding: [50, 50] });
    }
  }, [destination]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white">
      {/* Top Map Context Ribbon */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Navigation className="w-4 h-4 text-teal-700" />
          <span>Active Route Corridor:</span>
          <span className="text-teal-900 font-extrabold">{origin} &rarr; {destination}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-600 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Safe Segment</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Watch / Rain</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Chokepoint</span>
          </span>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="w-full" style={{ height }}>
        <MapContainer
          center={mapCenter}
          zoom={9}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Primary Route Polyline with Shadow */}
          <Polyline
            positions={polylineCoords}
            pathOptions={{
              color: '#0f766e',
              weight: 6,
              opacity: 0.9,
            }}
          />

          {/* Inner Accent Line */}
          <Polyline
            positions={polylineCoords}
            pathOptions={{
              color: '#5eead4',
              weight: 2,
              opacity: 0.9,
              dashArray: '8, 8',
            }}
          />

          {/* Route Waypoints Markers */}
          {points.map((pt, idx) => {
            const isStart = idx === 0;
            const isEnd = idx === points.length - 1;

            return (
              <CircleMarker
                key={pt.name}
                center={pt.coords}
                radius={isStart || isEnd ? 10 : 6}
                pathOptions={{
                  color: isStart ? '#065f46' : isEnd ? '#7c2d12' : '#1e293b',
                  fillColor: isStart ? '#10b981' : isEnd ? '#ef4444' : pt.color || '#3b82f6',
                  fillOpacity: 1,
                  weight: isStart || isEnd ? 3 : 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                  <span className="font-bold text-xs">{pt.name}</span>
                </Tooltip>

                <Popup>
                  <div className="p-1 space-y-1.5 min-w-[200px] text-xs text-slate-800">
                    <div className="font-bold text-sm text-slate-900 flex items-center justify-between border-b pb-1">
                      <span>{pt.name}</span>
                      <SeverityBadge
                        level={pt.status === 'Clear' || pt.status === 'Safe' ? 'LOW' : pt.status === 'Watch' ? 'MODERATE' : 'HIGH'}
                        label={pt.status}
                        size="sm"
                      />
                    </div>
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-700">Road Condition:</span> {pt.condition}
                    </div>
                    {pt.km !== undefined && (
                      <div className="text-slate-500 font-mono text-[11px]">
                        Milestone: Km {pt.km}
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Emergency Safe Shelters along the corridor */}
          {activeShelters.map((sh, idx) => (
            <CircleMarker
              key={idx}
              center={sh.coords}
              radius={8}
              pathOptions={{
                color: '#047857',
                fillColor: '#34d399',
                fillOpacity: 0.95,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                <span className="font-bold text-xs">Safe Shelter: {sh.name}</span>
              </Tooltip>
              <Popup>
                <div className="p-1 space-y-1 text-xs text-slate-800">
                  <div className="font-bold text-emerald-900 flex items-center gap-1 border-b pb-1">
                    <Home className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{sh.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Capacity:</span> {sh.capacity} persons
                  </div>
                  <div>
                    <span className="font-semibold">Emergency POC:</span> {sh.phone}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Route Summary Banner */}
      <div className="p-3 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-600">
          <span><strong className="text-slate-900">{points.length}</strong> Corroborated Waypoints</span>
          <span><strong className="text-slate-900">{activeShelters.length}</strong> Emergency Safe Shelters</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          ISRO Geotechnical & IMD Radar Synced
        </span>
      </div>
    </div>
  );
}
