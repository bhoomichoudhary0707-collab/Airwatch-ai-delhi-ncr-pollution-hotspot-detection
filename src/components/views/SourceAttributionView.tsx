import React from 'react';
import { useApp } from '../../context/AppContext';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  Cpu,
  Wind,
  Compass,
  Building2,
  Clock,
  Radio,
  AlertTriangle,
  FileText,
  MapPin,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';

export const SourceAttributionView: React.FC = () => {
  const {
    hotspots,
    selectedHotspotId,
    setSelectedHotspotId,
    selectedHotspot,
    generateComplaintFromHotspot,
    setActiveView
  } = useApp();

  const currentHotspot = selectedHotspot || hotspots[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              AI-Assisted Source Attribution
            </h1>
            <PrototypeBadge variant="ai" label="EXPLAINABLE ATTRIBUTION" />
          </div>
          <p className="text-xs text-slate-400">
            Multi-factor Bayesian probabilistic model estimating probable pollution emission sources and dispersion trajectories.
          </p>
        </div>

        {/* Hotspot Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Select Hotspot:</span>
          <select
            value={currentHotspot.id}
            onChange={e => setSelectedHotspotId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-teal-500 shadow-sm"
          >
            {hotspots.map(h => (
              <option key={h.id} value={h.id}>
                {h.id} — {h.name} ({h.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prominent Scientific Honesty Disclaimer Banner (Mandatory Prompt Requirement) */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs space-y-1.5 shadow-md">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Scientific & Methodological Transparency Notice</span>
          <PrototypeBadge variant="prototype" label="ACADEMIC HONESTY" />
        </div>
        <p className="leading-relaxed text-[11px] text-amber-200/90">
          This attribution analysis reflects an <strong>AI-assisted probable source estimation</strong> based on mathematical correlation of chemical pollutant ratios, micro-meteorological wind drift, and spatial proximity models. It represents <strong>estimated probability</strong> for investigative screening and prioritization — <strong>NOT definitive legal or forensic proof of causation</strong>.
        </p>
      </div>

      {/* Main Attribution Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Probable Source & Contribution Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Probable Source Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                  Primary Hotspot Target
                </span>
                <h3 className="text-base font-extrabold text-white">
                  {currentHotspot.name}
                </h3>
                <span className="text-xs text-slate-400 font-medium">{currentHotspot.district}</span>
              </div>
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${
                  currentHotspot.severity === 'Hazardous'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                AQI {currentHotspot.aqi} • {currentHotspot.severity}
              </span>
            </div>

            {/* Estimated Probable Source */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                Probable Source
              </span>
              <div className="text-xl font-black text-white mb-2">
                {currentHotspot.probableSource}
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400">Model Confidence:</span>
                <span className="text-emerald-400 font-mono font-extrabold text-sm bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {currentHotspot.confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Estimated Source Contribution Breakdown Bar */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Estimated Contribution Distribution</span>
                <span className="text-[10px] font-mono text-slate-400">Source Fingerprint</span>
              </div>

              {/* Stacked bar */}
              <div className="h-3 w-full rounded-full bg-slate-800 flex overflow-hidden">
                {currentHotspot.estimatedContributions.map((c, i) => (
                  <div
                    key={i}
                    style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                    className="h-full transition-all duration-500"
                    title={`${c.source}: ${c.percentage}%`}
                  />
                ))}
              </div>

              {/* Contribution legend list */}
              <div className="space-y-1.5 pt-1">
                {currentHotspot.estimatedContributions.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-slate-300 font-medium">{c.source}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-200">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button: Generate Structured Environmental Complaint */}
            <div className="pt-2">
              <button
                onClick={() => generateComplaintFromHotspot(currentHotspot.id)}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Structured Complaint Dossier</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Factor Explainable Evidence Deck (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-teal-400" />
                  <span>Explainable Attribution Evidence Pillars</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Bayesian evidence factors weighted by confidence contribution scores.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                {currentHotspot.evidence.length} Evidence Pillars
              </span>
            </div>

            {/* Evidence Cards */}
            <div className="space-y-3">
              {currentHotspot.evidence.map((ev, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center text-teal-400">
                        {index + 1}
                      </span>
                      {ev.title}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                      {ev.confidenceContribution}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {ev.description}
                  </p>

                  <div className="pl-7 pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Observed Value:</span>
                    <span className="font-mono text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {ev.metricValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Spatial & Micro-Met Summary Footer */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 font-mono block">Wind Trajectory & Speed</span>
                <span className="font-bold text-teal-300 font-mono text-sm">
                  {currentHotspot.windDirection} @ {currentHotspot.windSpeedKmh} km/h
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Aligned with plume receptor</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 font-mono block">Nearest Source Zone</span>
                <span className="font-bold text-slate-200 text-sm truncate block">
                  {currentHotspot.nearestKnownSource}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Proximity: {currentHotspot.distanceToSourceKm} km buffer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
