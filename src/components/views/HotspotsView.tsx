import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotspot, SeverityLevel } from '../../types';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  Flame,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Cpu,
  RefreshCw,
  Info,
  ChevronRight,
  X,
  MapPin,
  Wind
} from 'lucide-react';

export const HotspotsView: React.FC = () => {
  const {
    hotspots,
    selectedHotspotId,
    setSelectedHotspotId,
    setActiveView,
    generateComplaintFromHotspot,
    isDBSCANRunning,
    runDBSCANClustering
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'aqi' | 'pm25' | 'confidence' | 'time'>('aqi');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal detail view state
  const [detailModalHotspot, setDetailModalHotspot] = useState<Hotspot | null>(null);

  // Filtered & Sorted Hotspots
  const filteredHotspots = hotspots
    .filter(h => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.probableSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDistrict = districtFilter === 'All' || h.district.includes(districtFilter);
      const matchesSeverity = severityFilter === 'All' || h.severity === severityFilter;

      return matchesSearch && matchesDistrict && matchesSeverity;
    })
    .sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sortBy === 'aqi') {
        valA = a.aqi;
        valB = b.aqi;
      } else if (sortBy === 'pm25') {
        valA = a.pm25;
        valB = b.pm25;
      } else if (sortBy === 'confidence') {
        valA = a.confidence;
        valB = b.confidence;
      } else if (sortBy === 'time') {
        valA = a.id.localeCompare(b.id);
        valB = 0;
      }

      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

  const districts = ['All', 'Ghaziabad', 'Delhi', 'Northwest Delhi', 'Greater Noida', 'Faridabad'];
  const severities = ['All', 'Hazardous', 'Severe', 'Very Poor', 'Poor', 'Moderate'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with DBSCAN Clustering Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Hotspot Detection & Management
            </h1>
            <PrototypeBadge variant="prediction" label="DBSCAN CLUSTERING" />
          </div>
          <p className="text-xs text-slate-400">
            Spatial micro-cluster anomalies generated from 8 CAAQMS reference monitors and low-cost sensor meshes.
          </p>
        </div>

        {/* Hotspot Detection Action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={runDBSCANClustering}
            disabled={isDBSCANRunning}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
              isDBSCANRunning
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/30'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isDBSCANRunning ? 'animate-spin text-teal-400' : ''}`} />
            <span>{isDBSCANRunning ? 'Clustering Spatial Mesh...' : 'Run Hotspot Detection'}</span>
          </button>
        </div>
      </div>

      {/* DBSCAN Spatial Clustering Methodology Technical Notice (Prompt Requirement) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-teal-300">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Spatial Clustering Architecture Note</span>
          <PrototypeBadge variant="prototype" label="ALGORITHM SPEC" />
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Current implementation utilizes a prototype <strong>Spatial Density-Based Clustering</strong> approach (DBSCAN with parameters &epsilon; = 3.2 km, MinPts = 4) weighted by multi-pollutant anomaly scores. A production deployment integrates raw CPCB CAAQMS sensor telemetry streams with continuous spatio-temporal Kriging interpolation.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search hotspot, district, or source..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* District & Severity Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>District:</span>
              <select
                value={districtFilter}
                onChange={e => setDistrictFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-500"
              >
                {districts.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Severity:</span>
              <select
                value={severityFilter}
                onChange={e => setSeverityFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-500"
              >
                {severities.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-teal-500"
              >
                <option value="aqi">AQI Index</option>
                <option value="pm25">PM2.5 Level</option>
                <option value="confidence">AI Confidence</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-mono text-[10px]"
                title="Toggle sort direction"
              >
                {sortOrder.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotspots Data Table (Prompt Requirement) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Hotspot ID</th>
                <th className="py-3 px-4">Location & District</th>
                <th className="py-3 px-3 text-right">PM2.5</th>
                <th className="py-3 px-3 text-right">PM10</th>
                <th className="py-3 px-3 text-right">NO2</th>
                <th className="py-3 px-3 text-right">SO2</th>
                <th className="py-3 px-3 text-center">Severity</th>
                <th className="py-3 px-4">Detected Time</th>
                <th className="py-3 px-4">Probable Source</th>
                <th className="py-3 px-3 text-center">Confidence</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredHotspots.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-500">
                    No hotspots match your current filters.
                  </td>
                </tr>
              ) : (
                filteredHotspots.map(hs => (
                  <tr
                    key={hs.id}
                    className={`hover:bg-slate-800/50 transition cursor-pointer ${
                      hs.id === selectedHotspotId ? 'bg-slate-800/30' : ''
                    }`}
                    onClick={() => {
                      setSelectedHotspotId(hs.id);
                    }}
                  >
                    {/* Hotspot ID */}
                    <td className="py-3 px-4 font-mono font-bold text-teal-300">
                      {hs.id}
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-xs">{hs.name}</div>
                      <div className="text-[11px] text-slate-400">{hs.district}</div>
                    </td>

                    {/* PM2.5 */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-300">
                      {hs.pm25} <span className="text-[9px] font-normal text-slate-500">µg</span>
                    </td>

                    {/* PM10 */}
                    <td className="py-3 px-3 text-right font-mono font-medium text-amber-300">
                      {hs.pm10}
                    </td>

                    {/* NO2 */}
                    <td className="py-3 px-3 text-right font-mono text-orange-300">
                      {hs.no2}
                    </td>

                    {/* SO2 */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-cyan-300">
                      {hs.so2}
                    </td>

                    {/* Severity */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          hs.severity === 'Hazardous'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : hs.severity === 'Severe'
                            ? 'bg-orange-950 text-orange-300 border border-orange-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {hs.severity}
                      </span>
                    </td>

                    {/* Detected Time */}
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {hs.detectedTime}
                    </td>

                    {/* Probable Source */}
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {hs.probableSource}
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-3 text-center">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/80 text-[11px]">
                        {hs.confidence}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {hs.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setDetailModalHotspot(hs)}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition"
                          title="View Hotspot Detail"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => {
                            setSelectedHotspotId(hs.id);
                            setActiveView('source_attribution');
                          }}
                          className="px-2 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-800 text-[11px] font-medium transition"
                          title="Run AI Attribution"
                        >
                          Attribution
                        </button>
                        <button
                          onClick={() => generateComplaintFromHotspot(hs.id)}
                          className="px-2 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
                          title="Generate Structured Environmental Complaint"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Dossier</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hotspot Detail Modal (Prompt Requirement) */}
      {detailModalHotspot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150 p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                    {detailModalHotspot.id}
                  </span>
                  <PrototypeBadge variant="ai" label="AI-ASSISTED SOURCE" />
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  {detailModalHotspot.name}
                </h2>
                <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{detailModalHotspot.district}</span>
                  <span>•</span>
                  <span>Coordinates: {detailModalHotspot.lat.toFixed(4)}, {detailModalHotspot.lng.toFixed(4)}</span>
                </p>
              </div>
              <button
                onClick={() => setDetailModalHotspot(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">AQI</span>
                <span className="text-xl font-black font-mono text-white">{detailModalHotspot.aqi}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">PM2.5</span>
                <span className="text-xl font-black font-mono text-rose-400">{detailModalHotspot.pm25} µg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">SO2 Spike</span>
                <span className="text-xl font-black font-mono text-cyan-400">{detailModalHotspot.so2} ppb</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">NO2 Traffic</span>
                <span className="text-xl font-black font-mono text-orange-400">{detailModalHotspot.no2} ppb</span>
              </div>
            </div>

            {/* AI Source Attribution Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Probable Source
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {detailModalHotspot.confidence}% Confidence
                </span>
              </div>
              <p className="text-base font-extrabold text-white">
                {detailModalHotspot.probableSource}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div>Wind: <strong className="text-slate-200 font-mono">{detailModalHotspot.windDirection} @ {detailModalHotspot.windSpeedKmh} km/h</strong></div>
                <div>Nearest Source: <strong className="text-slate-200">{detailModalHotspot.nearestKnownSource} ({detailModalHotspot.distanceToSourceKm} km)</strong></div>
              </div>
            </div>

            {/* Evidence items */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider mb-2">
                Supporting Evidence & Anomaly Signatures
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {detailModalHotspot.evidence.map((ev, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <span>{ev.title}</span>
                      <span className="text-[10px] font-mono text-teal-400">{ev.confidenceContribution}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{ev.description}</p>
                    <div className="text-[10px] font-mono text-amber-300 mt-1">{ev.metricValue}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setDetailModalHotspot(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedHotspotId(detailModalHotspot.id);
                  setActiveView('source_attribution');
                  setDetailModalHotspot(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-800 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Open Source Attribution</span>
              </button>
              <button
                onClick={() => {
                  generateComplaintFromHotspot(detailModalHotspot.id);
                  setDetailModalHotspot(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Complaint Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
