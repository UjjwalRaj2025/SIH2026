import React, { useState } from 'react';
import {
  Layers,
  Mountain,
  CloudRain,
  Waves,
  Users,
  Bell,
  Check,
  Eye,
  EyeOff,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';

/**
 * RiskLayerControl - Floating or docked layer visibility controller for the Risk Map.
 * Provides granular toggles for individual hazard layers and spatial buffer rings.
 */
export default function RiskLayerControl({
  activeLayers = {
    landslide: true,
    cloudburst: true,
    glof: true,
    crowd: true,
    alert: true,
  },
  onToggleLayer,
  showBufferZones = true,
  onToggleBufferZones,
  showRoutes = true,
  onToggleRoutes,
  counts = {},
}) {
  const [isOpen, setIsOpen] = useState(false);

  const layersList = [
    {
      id: 'landslide',
      label: 'Landslide Hazards',
      icon: Mountain,
      color: 'text-red-600',
      count: counts.landslide || 0,
    },
    {
      id: 'cloudburst',
      label: 'Cloudburst Nowcasts',
      icon: CloudRain,
      color: 'text-amber-600',
      count: counts.cloudburst || 0,
    },
    {
      id: 'glof',
      label: 'GLOF Glacial Basins',
      icon: Waves,
      color: 'text-sky-600',
      count: counts.glof || 0,
    },
    {
      id: 'crowd',
      label: 'Crowd Bottlenecks',
      icon: Users,
      color: 'text-purple-600',
      count: counts.crowd || 0,
    },
    {
      id: 'alert',
      label: 'Emergency Alerts',
      icon: Bell,
      color: 'text-red-700',
      count: counts.alert || 0,
    },
  ];

  return (
    <div className="relative font-sans">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all shadow-card ${
          isOpen
            ? 'bg-navy-900 text-white border-navy-950'
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
        }`}
      >
        <Layers className="w-4 h-4 text-teal-600" />
        <span>Layer Settings</span>
        <span className="w-2 h-2 rounded-full bg-teal-500" />
      </button>

      {/* Flyout Layer Dropdown */}
      {isOpen && (
        <div className="absolute top-12 right-0 z-[500] w-64 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-elevated p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-extrabold text-xs text-slate-900 tracking-tight">
              Active Map Layers
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Toggle
            </span>
          </div>

          {/* Core Hazard Layer Toggles */}
          <div className="space-y-1.5">
            {layersList.map((lyr) => {
              const Icon = lyr.icon;
              const isEnabled = activeLayers[lyr.id];

              return (
                <button
                  key={lyr.id}
                  type="button"
                  onClick={() => onToggleLayer(lyr.id)}
                  className={`flex items-center justify-between w-full p-2 rounded-xl text-xs font-semibold transition ${
                    isEnabled
                      ? 'bg-slate-100/90 text-slate-900 hover:bg-slate-200/70'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className={`w-3.5 h-3.5 ${isEnabled ? lyr.color : 'text-slate-300'}`} />
                    <span className="truncate">{lyr.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {lyr.count > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200">
                        {lyr.count}
                      </span>
                    )}
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                        isEnabled
                          ? 'bg-navy-900 border-navy-900 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Visual Overlays: Buffer Zones & Highway Corridors */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              Spatial Overlays
            </span>

            <button
              type="button"
              onClick={onToggleBufferZones}
              className={`flex items-center justify-between w-full p-2 rounded-xl text-xs font-semibold transition ${
                showBufferZones
                  ? 'bg-teal-50 text-teal-900 hover:bg-teal-100/70'
                  : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">Colored Risk Buffer Zones</span>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                  showBufferZones
                    ? 'bg-teal-700 border-teal-700 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {showBufferZones && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            <button
              type="button"
              onClick={onToggleRoutes}
              className={`flex items-center justify-between w-full p-2 rounded-xl text-xs font-semibold transition ${
                showRoutes
                  ? 'bg-teal-50 text-teal-900 hover:bg-teal-100/70'
                  : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">Char Dham Corridors</span>
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition ${
                  showRoutes
                    ? 'bg-teal-700 border-teal-700 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {showRoutes && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
