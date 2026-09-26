import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PRESETS } from '../../data/mockData';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  Flame,
  Activity,
  AlertOctagon,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    hotspots,
    stations,
    sourceZones,
    complaints,
    activeDemo,
    triggerDemoIncident,
    resetToBaseline,
    setActiveView,
    setSelectedHotspotId
  } = useApp();

  // Calculate metrics
  const avgAqi = Math.round(
    stations.reduce((acc, s) => acc + s.aqi, 0) / (stations.length || 1)
  );
  const avgPm25 = Math.round(
    stations.reduce((acc, s) => acc + s.pm25, 0) / (stations.length || 1)
  );
  const avgPm10 = Math.round(
    stations.reduce((acc, s) => acc + s.pm10, 0) / (stations.length || 1)
  );

  const activeHotspotsCount = hotspots.length;
  const highRiskZonesCount = sourceZones.length;
  const openComplaintsCount = complaints.filter(c => c.currentStatus !== 'Resolved').length;
  const resolvedCount = complaints.filter(c => c.currentStatus === 'Resolved').length;
  const resolutionRate = complaints.length > 0 ? Math.round((resolvedCount / complaints.length) * 100) : 0;

  // Max AQI station
  const worstStation = [...stations].sort((a, b) => b.aqi - a.aqi)[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Story Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              DELHI-NCR ENVIRONMENTAL INTELLIGENCE
            </span>
            <PrototypeBadge variant="prototype" label="PROTOTYPE DATA" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AirWatch AI Command Center
          </h1>
          <p className="text-sm text-slate-300 font-medium italic">
            &ldquo;Don&apos;t just see pollution. Understand it. Respond to it. Track what happens next.&rdquo;
          </p>
        </div>

        {/* Quick Demo Workflow Guide Banner */}
        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl text-xs space-y-2 max-w-md shrink-0 relative z-10">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <span className="flex items-center gap-1.5 text-teal-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Recommended Hackathon Demo Flow</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">10-Step Workflow</span>
          </div>
          <p className="text-[11px] text-slate-300">
            1. Trigger <strong>Ghaziabad Industrial Spike</strong> below &rarr; 2. Inspect Hotspot &rarr; 3. Run AI Attribution &rarr; 4. Generate Complaint &rarr; 5. Step through Lifecycle to Resolved.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => triggerDemoIncident('ghaziabad_industrial')}
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 shadow-sm transition"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Start Ghaziabad Demo</span>
            </button>
            {activeDemo && (
              <button
                onClick={resetToBaseline}
                className="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium text-[11px] flex items-center gap-1 transition"
                title="Reset environment"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        {/* Metric 1: Avg AQI */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg NCR AQI</span>
            <Activity className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-1">
            <span>{avgAqi}</span>
            <span className="text-[11px] font-sans font-normal text-rose-400">Severe</span>
          </div>
          <div className="mt-2">
            <PrototypeBadge variant="simulated" label="PROTOTYPE" className="text-[9px] px-1.5 py-0" />
          </div>
        </div>

        {/* Metric 2: PM2.5 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg PM2.5</span>
            <span className="text-[10px] text-slate-500">µg/m³</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono">
            {avgPm25}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Peak: <strong className="text-rose-400 font-mono">{worstStation?.pm25 || 284} µg/m³</strong>
          </div>
        </div>

        {/* Metric 3: PM10 */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg PM10</span>
            <span className="text-[10px] text-slate-500">µg/m³</span>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">
            {avgPm10}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Coarse dust load
          </div>
        </div>

        {/* Metric 4: Active Hotspots */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Hotspots</span>
            <Flame className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">
            {activeHotspotsCount}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            DBSCAN clusters
          </div>
        </div>

        {/* Metric 5: High Risk Zones */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Source Zones</span>
            <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-200 font-mono">
            {highRiskZonesCount}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Ind / Trf / Agri
          </div>
        </div>

        {/* Metric 6: Open Complaints */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Open Dossiers</span>
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono">
            {openComplaintsCount}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Active tracking
          </div>
        </div>

        {/* Metric 7: Resolution Rate */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Resolution Rate</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {resolutionRate}%
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            {resolvedCount} resolved
          </div>
        </div>
      </div>

      {/* DEMO INCIDENT SIMULATION DECK (Required Feature) */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Demo Incident Simulation Deck
              </h2>
              <PrototypeBadge variant="simulated" label="INTERACTIVE SIMULATOR" />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate live environmental crises across Delhi-NCR to trigger automated hotspot detection, AI attribution, and complaints.
            </p>
          </div>
          {activeDemo && (
            <button
              onClick={resetToBaseline}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Active Demo</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_PRESETS.map((demo, idx) => {
            const isCurrent = activeDemo === demo.id;
            const letters = ['A', 'B', 'C'];

            return (
              <div
                key={demo.id}
                className={`p-4 rounded-xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-rose-950/50 to-slate-900 border-rose-600/80 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                    : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-teal-400">
                      {letters[idx]}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
                      {demo.district}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{demo.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {demo.description}
                  </p>
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-amber-300 mb-4">
                    {demo.affectedPollutants}
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => triggerDemoIncident(demo.id)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                      isCurrent
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isCurrent ? 'Active — Re-trigger' : `Trigger Demo ${letters[idx]}`}</span>
                  </button>

                  {isCurrent && (
                    <button
                      onClick={() => {
                        setSelectedHotspotId(demo.targetHotspotId);
                        setActiveView('source_attribution');
                      }}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-800 transition flex items-center justify-center gap-1.5"
                    >
                      <span>Inspect AI Source Attribution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Section: Delhi-NCR Map Snapshot & Recent Hotspot Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Overview Map Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <h3 className="text-base font-bold text-white">Delhi-NCR Spatial Overview</h3>
                  <PrototypeBadge variant="prediction" label="SPATIAL GRID" />
                </div>
                <p className="text-xs text-slate-400">
                  Real-time sensor interpolation across National Capital Region monitoring corridors.
                </p>
              </div>
              <button
                onClick={() => setActiveView('pollution_map')}
                className="px-3 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-300 border border-teal-800 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Open Full Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Interactive Location Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              {stations.map(st => (
                <div
                  key={st.id}
                  onClick={() => {
                    const matchedHotspot = hotspots.find(h => h.district.includes(st.district) || st.district.includes(h.district));
                    if (matchedHotspot) setSelectedHotspotId(matchedHotspot.id);
                    setActiveView('pollution_map');
                  }}
                  className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/90 border border-slate-700/60 cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                    <span className="truncate group-hover:text-teal-300 transition">{st.name.replace(' Station', '')}</span>
                    <span
                      className={`font-mono px-1.5 py-0.2 rounded text-[10px] ${
                        st.aqi >= 400
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : st.aqi >= 300
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {st.aqi}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <span>{st.district}</span>
                    <span className="font-mono text-slate-400">PM2.5: {st.pm25}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-slate-300 font-medium">Critical Corridor: Sahibabad & Anand Vihar plume overlap</span>
            </div>
            <button
              onClick={() => {
                setSelectedHotspotId('HS-GHZ-01');
                setActiveView('pollution_map');
              }}
              className="text-teal-400 hover:text-teal-300 font-semibold text-[11px] underline"
            >
              Inspect on Leaflet Map &rarr;
            </button>
          </div>
        </div>

        {/* Right Column: Recent Alerts & Detected Hotspots (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <h3 className="text-base font-bold text-white">Active Hotspot Alerts</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">
                  {hotspots.length} Active
                </span>
              </div>
              <button
                onClick={() => setActiveView('hotspots')}
                className="text-xs text-slate-400 hover:text-teal-400 transition"
              >
                View Table &rarr;
              </button>
            </div>

            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {hotspots.map(hs => (
                <div
                  key={hs.id}
                  className={`p-3 rounded-xl border transition ${
                    hs.id === 'HS-GHZ-01' && activeDemo === 'ghaziabad_industrial'
                      ? 'bg-rose-950/40 border-rose-600/80 ring-1 ring-rose-500/30'
                      : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate max-w-[200px]">
                      {hs.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        hs.severity === 'Hazardous'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      AQI {hs.aqi} • {hs.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Probable Source: <strong className="text-slate-200">{hs.probableSource}</strong>
                    </span>
                    <span className="font-mono text-cyan-300">{hs.confidence}% Conf.</span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-800/70 text-[11px]">
                    <span className="text-[10px] text-slate-400 font-mono">
                      SO2: {hs.so2} | PM2.5: {hs.pm25}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedHotspotId(hs.id);
                          setActiveView('source_attribution');
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Attribution &rarr;
                      </button>
                      <button
                        onClick={() => {
                          setSelectedHotspotId(hs.id);
                          setActiveView('pollution_map');
                        }}
                        className="text-teal-400 hover:text-teal-300 font-semibold"
                      >
                        Map Pin &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>DBSCAN clustering active</span>
            <span className="font-mono text-[10px] text-emerald-400">Auto-refresh: 30s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
