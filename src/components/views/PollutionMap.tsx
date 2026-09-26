import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotspot, MonitoringStation, SourceZone } from '../../types';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  Layers,
  Wind,
  Compass,
  FileText,
  Cpu,
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Maximize2
} from 'lucide-react';
import L from 'leaflet';

export const PollutionMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const {
    hotspots,
    stations,
    sourceZones,
    selectedHotspotId,
    setSelectedHotspotId,
    selectedHotspot,
    setActiveView,
    generateComplaintFromHotspot,
    citizenReports
  } = useApp();

  // Layer toggles
  const [showHotspots, setShowHotspots] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showSourceZones, setShowSourceZones] = useState(true);
  const [showWindVectors, setShowWindVectors] = useState(true);
  const [showCitizenReports, setShowCitizenReports] = useState(true);

  // Detail panel open state
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  // Keep layer groups in refs
  const layerGroupsRef = useRef<{
    hotspots: L.LayerGroup;
    stations: L.LayerGroup;
    sourceZones: L.LayerGroup;
    windVectors: L.LayerGroup;
    citizenReports: L.LayerGroup;
  }>({
    hotspots: L.layerGroup(),
    stations: L.layerGroup(),
    sourceZones: L.layerGroup(),
    windVectors: L.layerGroup(),
    citizenReports: L.layerGroup()
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Delhi-NCR center coordinates
    const map = L.map(mapContainerRef.current, {
      center: [28.62, 77.30],
      zoom: 11,
      zoomControl: true,
      minZoom: 9,
      maxZoom: 16
    });

    // Dark Matter CartoDB tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add layer groups to map
    layerGroupsRef.current.hotspots.addTo(map);
    layerGroupsRef.current.stations.addTo(map);
    layerGroupsRef.current.sourceZones.addTo(map);
    layerGroupsRef.current.windVectors.addTo(map);
    layerGroupsRef.current.citizenReports.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when data or toggles change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const {
      hotspots: hsGroup,
      stations: stGroup,
      sourceZones: szGroup,
      windVectors: wvGroup
    } = layerGroupsRef.current;

    // Clear previous layers
    hsGroup.clearLayers();
    stGroup.clearLayers();
    szGroup.clearLayers();
    wvGroup.clearLayers();

    // 1. SOURCE ZONES
    if (showSourceZones) {
      sourceZones.forEach(sz => {
        const color =
          sz.category === 'Industrial'
            ? '#ef4444'
            : sz.category === 'Traffic Corridor'
            ? '#f97316'
            : sz.category === 'Agricultural Belt'
            ? '#eab308'
            : '#8b5cf6';

        // Outer shaded zone
        const circle = L.circle([sz.lat, sz.lng], {
          radius: sz.radiusMeters,
          color: color,
          weight: 1.5,
          opacity: 0.6,
          fillColor: color,
          fillOpacity: 0.12,
          dashArray: '4, 6'
        });

        // Zone label icon
        const zoneIcon = L.divIcon({
          className: 'source-zone-label',
          html: `
            <div style="background: rgba(15, 23, 42, 0.85); border: 1px dashed ${color}; color: #e2e8f0; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px; white-space: nowrap; transform: translate(-50%, -50%); display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.4);">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:${color};"></span>
              <span>${sz.name}</span>
            </div>
          `,
          iconSize: [0, 0]
        });

        const labelMarker = L.marker([sz.lat, sz.lng], { icon: zoneIcon });
        szGroup.addLayer(circle);
        szGroup.addLayer(labelMarker);
      });
    }

    // 2. MONITORING STATIONS
    if (showStations) {
      stations.forEach(st => {
        const isWorst = st.aqi >= 400;
        const aqiBg =
          st.aqi >= 400
            ? '#ef4444'
            : st.aqi >= 300
            ? '#f97316'
            : st.aqi >= 200
            ? '#eab308'
            : '#10b981';

        const stationIcon = L.divIcon({
          className: 'station-marker',
          html: `
            <div style="cursor: pointer; transform: translate(-50%, -100%);">
              <div style="background: #0f172a; border: 2px solid ${aqiBg}; border-radius: 8px; padding: 3px 6px; display: flex; align-items: center; gap: 4px; box-shadow: 0 8px 12px rgba(0,0,0,0.6);">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${aqiBg}; ${isWorst ? 'box-shadow: 0 0 8px #ef4444;' : ''}"></div>
                <div style="color: #ffffff; font-family: monospace; font-size: 11px; font-weight: 800;">${st.aqi}</div>
              </div>
              <div style="text-align: center; margin-top: -2px;">
                <div style="display: inline-block; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid ${aqiBg};"></div>
              </div>
            </div>
          `,
          iconSize: [0, 0]
        });

        const marker = L.marker([st.lat, st.lng], { icon: stationIcon });
        marker.bindPopup(`
          <div style="padding: 6px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <div style="font-size: 10px; color: #94a3b8; font-family: monospace; text-transform: uppercase;">CAAQMS Monitoring Station</div>
            <div style="font-size: 13px; font-weight: 800; color: #ffffff; margin-bottom: 4px;">${st.name}</div>
            <div style="display: flex; gap: 8px; margin-bottom: 6px;">
              <span style="background: ${aqiBg}; color: #000; font-weight: 800; font-size: 11px; padding: 1px 6px; border-radius: 4px;">AQI ${st.aqi}</span>
              <span style="color: #94a3b8; font-size: 11px;">${st.district}</span>
            </div>
            <div style="font-size: 11px; color: #cbd5e1; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-top: 1px solid #334155; padding-top: 4px;">
              <div>PM2.5: <strong style="color: #fca5a5;">${st.pm25} µg/m³</strong></div>
              <div>PM10: <strong>${st.pm10} µg/m³</strong></div>
              <div>NO2: <strong>${st.no2} ppb</strong></div>
              <div>SO2: <strong style="color: #fdba74;">${st.so2} ppb</strong></div>
            </div>
          </div>
        `);
        stGroup.addLayer(marker);
      });
    }

    // 3. POLLUTION HOTSPOTS
    if (showHotspots) {
      hotspots.forEach(hs => {
        const isSelected = hs.id === selectedHotspotId;
        const isHazardous = hs.severity === 'Hazardous';
        const color = isHazardous ? '#ef4444' : '#f97316';
        const pulseClass = isHazardous ? 'hotspot-pulse-critical' : 'hotspot-pulse-severe';

        const hotspotIcon = L.divIcon({
          className: 'hotspot-marker',
          html: `
            <div style="cursor: pointer; position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
              <!-- Radar Pulse Ring -->
              <div class="${pulseClass}" style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${color}; border: 1.5px solid ${color};"></div>
              
              <!-- Center Core Pin -->
              <div style="position: relative; z-index: 10; width: 22px; height: 22px; border-radius: 50%; background: #0f172a; border: 2.5px solid ${isSelected ? '#38bdf8' : color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px ${color};">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${isSelected ? '#38bdf8' : color};"></div>
              </div>

              <!-- Floating Tag -->
              <div style="position: absolute; top: -16px; background: rgba(15, 23, 42, 0.95); border: 1px solid ${color}; color: #ffffff; font-size: 9px; font-weight: 800; font-family: monospace; padding: 1px 4px; border-radius: 4px; white-space: nowrap; box-shadow: 0 4px 6px rgba(0,0,0,0.5);">
                ${hs.id} • ${hs.aqi}
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([hs.lat, hs.lng], { icon: hotspotIcon });
        marker.on('click', () => {
          setSelectedHotspotId(hs.id);
          setIsDetailOpen(true);
        });

        hsGroup.addLayer(marker);
      });
    }

    // 4. WIND DIRECTION INDICATORS
    if (showWindVectors) {
      // Create representative wind direction arrows across the NCR canvas
      const windSites = [
        { lat: 28.72, lng: 77.22, dir: 115, label: 'ESE 10 km/h' }, // North Delhi
        { lat: 28.66, lng: 77.38, dir: 115, label: 'ESE 9 km/h' },  // Ghaziabad
        { lat: 28.58, lng: 77.32, dir: 120, label: 'SE 8 km/h' },   // Noida
        { lat: 28.79, lng: 77.10, dir: 310, label: 'NW 14 km/h' }   // Agro Belt NW
      ];

      windSites.forEach(w => {
        const windIcon = L.divIcon({
          className: 'wind-vector-marker',
          html: `
            <div style="pointer-events: none; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
              <div style="transform: rotate(${w.dir}deg); color: #38bdf8; filter: drop-shadow(0 0 4px rgba(56,189,248,0.5));">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
              <div style="font-family: monospace; font-size: 9px; color: #94a3b8; background: rgba(15, 23, 42, 0.85); padding: 1px 4px; border-radius: 3px; border: 1px solid #334155; margin-top: -2px;">
                ${w.label}
              </div>
            </div>
          `,
          iconSize: [0, 0]
        });

        const windMarker = L.marker([w.lat, w.lng], { icon: windIcon, interactive: false });
        wvGroup.addLayer(windMarker);
      });
    }

    // 5. CITIZEN REPORTS
    if (showCitizenReports) {
      citizenReports.forEach(cr => {
        if (!cr.coordinates) return;

        const crIcon = L.divIcon({
          className: 'citizen-report-marker',
          html: `
            <div style="cursor: pointer; transform: translate(-50%, -100%);">
              <div style="background: #78350f; border: 2px solid #f59e0b; border-radius: 8px; padding: 2px 5px; display: flex; align-items: center; gap: 3px; box-shadow: 0 4px 10px rgba(0,0,0,0.7);">
                <div style="width: 6px; height: 6px; border-radius: 50%; background: #f59e0b;"></div>
                <div style="color: #fef3c7; font-family: monospace; font-size: 9px; font-weight: 800;">${cr.id}</div>
              </div>
              <div style="text-align: center; margin-top: -2px;">
                <div style="display: inline-block; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid #f59e0b;"></div>
              </div>
            </div>
          `,
          iconSize: [0, 0]
        });

        const marker = L.marker([cr.coordinates.lat, cr.coordinates.lng], { icon: crIcon });
        marker.bindPopup(`
          <div style="padding: 6px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
              <span style="font-size: 9px; background: #78350f; color: #fde68a; font-family: monospace; padding: 1px 4px; border-radius: 3px; font-weight: bold;">SIMULATED CITIZEN REPORT</span>
              <span style="font-size: 9px; color: #94a3b8; font-family: monospace;">${cr.category}</span>
            </div>
            <div style="font-size: 12px; font-weight: 800; color: #ffffff; margin-bottom: 3px;">${cr.pollutionObservation}</div>
            <div style="font-size: 10px; color: #cbd5e1; margin-bottom: 4px;">${cr.description}</div>
            <div style="font-size: 9px; color: #94a3b8; border-top: 1px solid #334155; padding-top: 4px;">Location: ${cr.location} (${cr.dateTime})</div>
          </div>
        `);
        layerGroupsRef.current.citizenReports.addLayer(marker);
      });
    }
  }, [
    hotspots,
    stations,
    sourceZones,
    selectedHotspotId,
    citizenReports,
    showHotspots,
    showStations,
    showSourceZones,
    showWindVectors,
    showCitizenReports,
    setSelectedHotspotId
  ]);

  // Recenter map when selected hotspot changes
  const recenterOnSelected = () => {
    if (mapInstanceRef.current && selectedHotspot) {
      mapInstanceRef.current.flyTo([selectedHotspot.lat, selectedHotspot.lng], 13, {
        duration: 1.2
      });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Map Canvas */}
      <div className="flex-1 h-full relative">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Map Header / Layer Toggles Overlay (Top-Left) */}
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-2xl max-w-xs space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-white tracking-tight">Interactive Layers</span>
            </div>
            <PrototypeBadge variant="prototype" label="LIVE MAP" />
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            {/* Hotspots toggle */}
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800/60 transition">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Pollution Hotspots</span>
              </span>
              <input
                type="checkbox"
                checked={showHotspots}
                onChange={e => setShowHotspots(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
              />
            </label>

            {/* Monitoring stations toggle */}
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800/60 transition">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <span>CAAQMS Stations</span>
              </span>
              <input
                type="checkbox"
                checked={showStations}
                onChange={e => setShowStations(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
              />
            </label>

            {/* Source Zones toggle */}
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800/60 transition">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-amber-400 bg-amber-400/20" />
                <span>Industrial & Source Zones</span>
              </span>
              <input
                type="checkbox"
                checked={showSourceZones}
                onChange={e => setShowSourceZones(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
              />
            </label>

            {/* Wind direction toggle */}
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800/60 transition">
              <span className="flex items-center gap-2">
                <Wind className="w-3 h-3 text-cyan-400" />
                <span>Wind Dispersion Vectors</span>
              </span>
              <input
                type="checkbox"
                checked={showWindVectors}
                onChange={e => setShowWindVectors(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
              />
            </label>

            {/* Citizen reports toggle */}
            <label className="flex items-center justify-between cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800/60 transition">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Citizen Reports ({citizenReports.length})</span>
              </span>
              <input
                type="checkbox"
                checked={showCitizenReports}
                onChange={e => setShowCitizenReports(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-teal-500 focus:ring-0"
              />
            </label>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Projection: EPSG:3857</span>
            <button
              onClick={recenterOnSelected}
              className="text-teal-400 hover:text-teal-300 font-sans font-semibold underline flex items-center gap-1"
            >
              <Maximize2 className="w-3 h-3" /> Focus Selected
            </button>
          </div>
        </div>

        {/* Floating Quick Drawer Toggle if closed */}
        {!isDetailOpen && selectedHotspot && (
          <button
            onClick={() => setIsDetailOpen(true)}
            className="absolute bottom-6 right-6 z-10 bg-slate-900 border border-teal-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-slate-800 transition"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-bold">Open Details: {selectedHotspot.name}</span>
          </button>
        )}
      </div>

      {/* Slide-Over / Floating Detailed Hotspot Panel (Prompt Requirement) */}
      {isDetailOpen && selectedHotspot && (
        <aside className="w-96 bg-[#0f172a] border-l border-slate-800 flex flex-col h-full z-20 shadow-2xl overflow-y-auto">
          {/* Panel Header */}
          <div className="p-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                  {selectedHotspot.id}
                </span>
                <PrototypeBadge variant="ai" label="AI ATTRIBUTED" />
              </div>
              <h2 className="text-base font-extrabold text-white leading-snug">
                {selectedHotspot.name}
              </h2>
              <p className="text-xs text-slate-400 font-medium">{selectedHotspot.district}</p>
            </div>
            <button
              onClick={() => setIsDetailOpen(false)}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 flex-1">
            {/* Severity & AQI Overview Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                selectedHotspot.severity === 'Hazardous'
                  ? 'bg-rose-950/40 border-rose-700 text-rose-200'
                  : 'bg-amber-950/40 border-amber-700 text-amber-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75">
                  Severity Assessment
                </span>
                <span className="text-lg font-black">{selectedHotspot.severity} Hotspot</span>
                <span className="block text-[11px] opacity-80 mt-0.5">
                  Detected: {selectedHotspot.detectedTime}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black font-mono block">{selectedHotspot.aqi}</span>
                <span className="text-[10px] font-mono uppercase opacity-75">AQI Index</span>
              </div>
            </div>

            {/* Pollutants Breakdown Grid */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Concentration Telemetry</span>
                <span className="text-[10px] font-mono text-slate-400">Micro-cluster Mean</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">PM2.5</span>
                  <span className="text-base font-extrabold text-rose-400 font-mono">
                    {selectedHotspot.pm25} <span className="text-[10px] font-normal text-slate-500">µg/m³</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">PM10</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    {selectedHotspot.pm10} <span className="text-[10px] font-normal text-slate-500">µg/m³</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">NO2</span>
                  <span className="text-base font-extrabold text-orange-400 font-mono">
                    {selectedHotspot.no2} <span className="text-[10px] font-normal text-slate-500">ppb</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">SO2 (Boiler Marker)</span>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">
                    {selectedHotspot.so2} <span className="text-[10px] font-normal text-slate-500">ppb</span>
                  </span>
                </div>
              </div>
            </div>

            {/* AI-Assisted Probable Source Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Probable Source
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {selectedHotspot.confidence}% Confidence
                </span>
              </div>
              <p className="text-sm font-bold text-white">
                {selectedHotspot.probableSource}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Nearest Source Zone:</span>
                <span className="text-slate-200 font-medium truncate max-w-[170px]">
                  {selectedHotspot.nearestKnownSource}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Distance to Source:</span>
                <span className="text-slate-200 font-mono">{selectedHotspot.distanceToSourceKm} km</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Wind Vector:</span>
                <span className="text-teal-300 font-mono font-semibold">
                  {selectedHotspot.windDirection} @ {selectedHotspot.windSpeedKmh} km/h
                </span>
              </div>
            </div>

            {/* Explainable Evidence */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Supporting Evidence ({selectedHotspot.evidence.length})</span>
                <span className="text-[10px] font-mono text-cyan-400">Explainable AI</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedHotspot.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{ev.title}</span>
                      <span className="text-[10px] font-mono text-teal-400">{ev.confidenceContribution}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{ev.description}</p>
                    <div className="text-[10px] font-mono text-amber-300">{ev.metricValue}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Citizen Reports (Simulated) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Citizen Ground Reports</span>
                </span>
                <PrototypeBadge variant="simulated" label="CITIZEN DATA" />
              </div>

              {citizenReports.filter(r => r.relatedHotspotId === selectedHotspot.id).length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>No community reports filed for this cluster yet.</span>
                  <button
                    onClick={() => setActiveView('citizen_reports')}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline text-[11px]"
                  >
                    + Submit Report
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {citizenReports
                    .filter(r => r.relatedHotspotId === selectedHotspot.id)
                    .map(cr => (
                      <div
                        key={cr.id}
                        className="p-2.5 rounded-lg bg-slate-900/90 border border-amber-900/40 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-amber-400 text-[10px]">{cr.id}</span>
                          <span className="text-[9px] font-mono text-slate-400">{cr.dateTime}</span>
                        </div>
                        <div className="font-bold text-slate-200 text-[11px]">{cr.pollutionObservation}</div>
                        <p className="text-[10px] text-slate-400 line-clamp-2">{cr.description}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Complaint Status & Lifecycle Stage */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Complaint Status
                </span>
                <span className="text-xs font-bold text-slate-200">{selectedHotspot.status}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Tracked Incident
              </span>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-2">
            <button
              onClick={() => generateComplaintFromHotspot(selectedHotspot.id)}
              className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Structured Complaint Dossier</span>
            </button>

            <button
              onClick={() => {
                setActiveView('source_attribution');
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full AI Attribution Analysis</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
