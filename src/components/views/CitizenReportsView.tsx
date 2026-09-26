import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CitizenReport, CitizenReportCategory } from '../../types';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  Users,
  Camera,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  X,
  Flame,
  Search,
  Filter,
  Image as ImageIcon
} from 'lucide-react';

const CATEGORIES: CitizenReportCategory[] = [
  'Smoke',
  'Dust',
  'Industrial emission',
  'Burning',
  'Traffic pollution',
  'Other'
];

export const CitizenReportsView: React.FC = () => {
  const { citizenReports, addCitizenReport, hotspots, setActiveView, setSelectedHotspotId } = useApp();

  // Form State
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('Today, 09:20 IST');
  const [pollutionObservation, setPollutionObservation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CitizenReportCategory>('Industrial emission');
  const [lat, setLat] = useState('28.6750');
  const [lng, setLng] = useState('77.3620');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [selectedHotspotIdInput, setSelectedHotspotIdInput] = useState<string>('HS-GHZ-01');

  // Filter State
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !pollutionObservation.trim()) {
      return;
    }

    addCitizenReport({
      location,
      dateTime,
      pollutionObservation,
      description: description || 'Visual observation reported by resident ground observer.',
      category,
      coordinates: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined,
      relatedHotspotId: selectedHotspotIdInput,
      status: 'Verified',
      imageUrl
    });

    // Reset form
    setLocation('');
    setPollutionObservation('');
    setDescription('');
    setImageUrl(undefined);
  };

  const handleImageMock = (type: 'smoke' | 'fire' | 'dust') => {
    if (type === 'smoke') {
      setImageUrl('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80');
      setPollutionObservation('Heavy dark industrial stack plume observed');
      setCategory('Industrial emission');
    } else if (type === 'fire') {
      setImageUrl('https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=600&auto=format&fit=crop&q=80');
      setPollutionObservation('Open stubble residue burning along peripheral canal');
      setCategory('Burning');
    } else {
      setImageUrl('https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80');
      setPollutionObservation('Unmitigated cement & road dust cloud from expressway tippers');
      setCategory('Dust');
    }
  };

  const filteredReports = citizenReports.filter(r => {
    const matchesSearch =
      r.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.pollutionObservation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.description.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Citizen Pollution Reporting & Ground Telemetry
            </h1>
            <PrototypeBadge variant="simulated" label="SIMULATED CITIZEN REPORT" />
          </div>
          <p className="text-xs text-slate-400">
            Crowdsourced community evidence intake: Citizens flag observable plumes, dust clouds, and open burning to ground-truth automated sensor anomalies.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-amber-400 block font-semibold">
            COMMUNITY VALIDATION
          </span>
          <span className="text-xs text-slate-400">
            {citizenReports.length} reports integrated into active spatial clustering
          </span>
        </div>
      </div>

      {/* Main Grid: Form on Left (5 cols) & List on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Citizen Report Submission Form */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" />
                <span>Submit Citizen Report</span>
              </h2>
              <span className="text-[10px] text-slate-400">
                Data is instantly cross-referenced with nearby CAAQMS sensor nodes
              </span>
            </div>
            <PrototypeBadge variant="simulated" label="SIMULATED FORM" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Quick Demo Pre-fill Presets */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Quick Preset Scenarios
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setLocation('Sahibabad Industrial Area Sector 4, Ghaziabad');
                    setPollutionObservation('Severe acrid sulfur stack plume from metallurgy foundry');
                    setDescription('Intense chemical odor causing eye irritation. Boiler stack venting dark exhaust without wet scrubber.');
                    setCategory('Industrial emission');
                    setLat('28.6750');
                    setLng('77.3620');
                    setSelectedHotspotIdInput('HS-GHZ-01');
                    handleImageMock('smoke');
                  }}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold border border-slate-700"
                >
                  ⚡ Sahibabad Boiler Plume
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocation('Anand Vihar ISBT Terminal Flyover');
                    setPollutionObservation('Extreme diesel soot tailback from 50+ idling buses');
                    setDescription('Continuous black exhaust soot settling on walkways. Heavy throat irritation for commuters.');
                    setCategory('Traffic pollution');
                    setLat('28.6502');
                    setLng('77.3150');
                    setSelectedHotspotIdInput('HS-ANV-02');
                  }}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold border border-slate-700"
                >
                  ⚡ Anand Vihar Idling
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocation('Alipur GT Karnal Canal Road, NW Delhi');
                    setPollutionObservation('Farm stubble residue burning along peripheral fields');
                    setDescription('Thick straw smoke drifting east across highway corridor.');
                    setCategory('Burning');
                    setLat('28.8050');
                    setLng('77.1280');
                    setSelectedHotspotIdInput('HS-NWD-03');
                    handleImageMock('fire');
                  }}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold border border-slate-700"
                >
                  ⚡ Alipur Crop Burning
                </button>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Location <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sahibabad Industrial Area Sector 4, Ghaziabad"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Date/Time & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Date & Time</label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={dateTime}
                    onChange={e => setDateTime(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pollution Observation Title */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Pollution Observation Summary <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dense black stack plume from foundry chimney"
                value={pollutionObservation}
                onChange={e => setPollutionObservation(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Narrative Description */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Provide physical details: odor, opacity, health effects, apparent source facility..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Optional Coordinates & Linked Hotspot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Optional GPS Coordinates
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    placeholder="Lat (e.g. 28.67)"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px] focus:outline-none focus:border-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Lng (e.g. 77.36)"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px] focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Linked Spatial Hotspot
                </label>
                <select
                  value={selectedHotspotIdInput}
                  onChange={e => setSelectedHotspotIdInput(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px] focus:outline-none focus:border-teal-500"
                >
                  {hotspots.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.id} — {h.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Image Attachment */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Optional Photographic Evidence
              </label>
              {imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-700 h-28 bg-slate-950">
                  <img src={imageUrl} alt="Attached Evidence" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl(undefined)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-slate-900/90 text-teal-300 text-[9px] font-mono px-2 py-0.5 rounded border border-teal-800">
                    Evidence Image Attached
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleImageMock('smoke')}
                    className="flex-1 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-1.5 text-slate-300 text-[11px]"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Attach Sample Photo</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-900/40 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Simulated Citizen Report</span>
            </button>
          </form>
        </div>

        {/* Right Column: Citizen Reports Feed & Filtering */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search observation, location..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] w-full sm:w-auto">
                {['All', ...CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                      categoryFilter === cat
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredReports.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-500 text-xs">
                No citizen reports found for the selected category.
              </div>
            ) : (
              filteredReports.map(report => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-2.5 text-xs shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{report.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {report.category}
                      </span>
                      <PrototypeBadge variant="simulated" label="CITIZEN REPORT" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {report.dateTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">
                      {report.pollutionObservation}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  {report.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-slate-800 h-36 bg-slate-950">
                      <img src={report.imageUrl} alt="Report evidence" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">{report.location}</span>
                    </div>

                    {report.relatedHotspotId && (
                      <button
                        onClick={() => {
                          setSelectedHotspotId(report.relatedHotspotId!);
                          setActiveView('pollution_map');
                        }}
                        className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                      >
                        <span>Linked to Hotspot {report.relatedHotspotId} &rarr;</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
