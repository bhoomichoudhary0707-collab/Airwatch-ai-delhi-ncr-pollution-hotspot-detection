import React, { useState } from 'react';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  BookOpen,
  Cpu,
  Layers,
  Satellite,
  Database,
  Radio,
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
  Wind,
  FileText,
  ShieldCheck,
  Users
} from 'lucide-react';

export const MethodologyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'prototype' | 'planned'>('all');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Data Architecture & Scientific Methodology
            </h1>
            <PrototypeBadge variant="prototype" label="SYSTEM SPECIFICATION" />
          </div>
          <p className="text-xs text-slate-400">
            Comprehensive transparency on current prototype algorithms and planned production integrations.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'all'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Full Architecture
          </button>
          <button
            onClick={() => setActiveTab('prototype')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'prototype'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Current Prototype
          </button>
          <button
            onClick={() => setActiveTab('planned')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'planned'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Planned Integrations
          </button>
        </div>
      </div>

      {/* SECTION 1: CURRENT PROTOTYPE */}
      {(activeTab === 'all' || activeTab === 'prototype') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-800/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-lg font-extrabold text-cyan-300 font-mono tracking-tight uppercase">
                Part I: Current Prototype Implementation
              </h2>
            </div>
            <PrototypeBadge variant="prototype" label="IN-APP ENGINE" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Prototype Dataset */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono">
                <Database className="w-4 h-4" />
                <span>1. Prototype Delhi-NCR Dataset</span>
              </div>
              <h3 className="text-sm font-bold text-white">Reference Sensor & Spatial Mesh</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calibrated spatial telemetry across 8 critical monitoring coordinates representing Delhi (Anand Vihar, Alipur, RK Puram), Ghaziabad (Sahibabad), Noida (Sec 62), Greater Noida, Faridabad, and Gurugram. Simulates continuous particulate (PM2.5, PM10) and gaseous (SO2, NO2, CO) telemetry.
              </p>
              <div className="text-[10px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                Resolution: 1-hour intervals • 8 reference CAAQMS nodes
              </div>
            </div>

            {/* 2. Hotspot Detection */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono">
                <Flame className="w-4 h-4" />
                <span>2. Pollution Hotspot Detection</span>
              </div>
              <h3 className="text-sm font-bold text-white">DBSCAN Spatial Density Clustering</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies Density-Based Spatial Clustering of Applications with Noise (DBSCAN) using a spatial epsilon neighborhood &epsilon; = 3.2 km and MinPts = 4. Clusters are weighted by pollutant exceedance ratios above statutory ambient standards.
              </p>
              <div className="text-[10px] font-mono text-rose-300 bg-slate-950 p-2 rounded border border-slate-800">
                Formula: D_spatial(p, q) &le; &epsilon; &cup; AnomalyScore(p) &ge; &theta;_critical
              </div>
            </div>

            {/* 3. Forecasting Prototype */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-mono">
                <Layers className="w-4 h-4" />
                <span>3. Forecasting Prototype</span>
              </div>
              <h3 className="text-sm font-bold text-white">Multi-Horizon Dispersion Model</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combines auto-regressive diurnal cycles with boundary layer inversion parameters to project +6h, +12h, +24h, and +48h trajectory curves. Models nocturnal surface temperature traps where boundary height drops below 350 meters.
              </p>
              <div className="text-[10px] font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800">
                Horizons: 6h, 12h, 24h, 48h • Inversion factor modeling
              </div>
            </div>

            {/* 4. Explainable Source Attribution */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <Cpu className="w-4 h-4" />
                <span>4. Explainable Source Attribution</span>
              </div>
              <h3 className="text-sm font-bold text-white">Multi-Factor Bayesian Fingerprinting</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Attributes probable emission sources by correlating: (1) chemical signatures (SO2 indicates coal/furnace oil boilers; NO2 indicates diesel freight), (2) wind back-trajectory vectors, (3) distance to known industrial/traffic zones, and (4) PM2.5/PM10 fractions.
              </p>
              <div className="text-[10px] font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
                Output: Probable source + Confidence % + Contribution %
              </div>
            </div>

            {/* 5. Citizen Reporting */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                <Users className="w-4 h-4" />
                <span>5. Citizen Reporting Engine</span>
              </div>
              <h3 className="text-sm font-bold text-white">Crowdsourced Ground Telemetry</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ingests structured citizen observations (Smoke, Dust, Industrial emissions, Burning, Traffic) paired with GPS coordinates and photographic evidence. Mapped directly onto the Leaflet monitoring canvas to ground-truth automated anomalies.
              </p>
              <div className="text-[10px] font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
                Integration: Geocoded & linked to nearest DBSCAN cluster
              </div>
            </div>

            {/* 6. Complaints & Accountability */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>6. Complaint & Accountability Workflow</span>
              </div>
              <h3 className="text-sm font-bold text-white">7-Stage Administrative Lifecycle</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transforms flagged hotspots into structured environmental complaint dossiers prepared for authority submission. Enforces a 7-stage state machine (Detected &rarr; Flagged &rarr; Report Generated &rarr; Prepared &rarr; Investigating &rarr; Action Taken &rarr; Resolved).
              </p>
              <div className="text-[10px] font-mono text-teal-300 bg-slate-950 p-2 rounded border border-slate-800">
                Closure: Requires sensor verification of normalized AQI
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: PLANNED REAL-DATA INTEGRATIONS */}
      {(activeTab === 'all' || activeTab === 'planned') && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-purple-800/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <h2 className="text-lg font-extrabold text-purple-300 font-mono tracking-tight uppercase">
                Part II: Planned Production Integrations
              </h2>
            </div>
            <PrototypeBadge variant="prediction" label="PRODUCTION ROADMAP" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CPCB */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-mono">
                <Radio className="w-4 h-4" />
                <span>Central Pollution Control Board (CPCB)</span>
              </div>
              <h3 className="text-sm font-bold text-white">Real-Time CAAQMS Telemetry API</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct integration with CPCB's Continuous Ambient Air Quality Monitoring Stations via the National Air Quality Index (NAQI) REST gateway. Replaces simulated sensor readings with live 15-minute averaged reference data across 40+ NCR stations.
              </p>
              <div className="text-[10px] font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800">
                Protocols: REST JSON endpoints & MQTT push feeds
              </div>
            </div>

            {/* OpenAQ */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono">
                <Share2 className="w-4 h-4" />
                <span>OpenAQ Global Data Platform</span>
              </div>
              <h3 className="text-sm font-bold text-white">Cross-Border Harmonized Ingestion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects to the OpenAQ v2 API to aggregate third-party, low-cost sensor meshes (e.g. PurpleAir, Clarity) with government reference monitors. Provides regional normalization and calibration algorithms for sensor drift.
              </p>
              <div className="text-[10px] font-mono text-teal-300 bg-slate-950 p-2 rounded border border-slate-800">
                Endpoint: api.openaq.org/v2/measurements (NCT Bounding Box)
              </div>
            </div>

            {/* Sentinel-5P / Google Earth Engine */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono">
                <Satellite className="w-4 h-4" />
                <span>Sentinel-5P & Google Earth Engine</span>
              </div>
              <h3 className="text-sm font-bold text-white">TROPOMI Satellite Atmospheric Ingress</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ingests European Space Agency Sentinel-5P TROPOMI sensor feeds via Google Earth Engine API:
                <br />• <strong>Tropospheric NO2 Column</strong> (3.5 &times; 5.5 km resolution)
                <br />• <strong>SO2 Planetary Boundary Layer Column</strong>
                <br />• <strong>VIIRS 375m Active Fire Thermal Anomalies</strong> (Crop stubble detection)
              </p>
              <div className="text-[10px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                GEE Collection: COPERNICUS/S5P/NRTI/L3_NO2
              </div>
            </div>

            {/* Meteorological / Wind Data */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <Wind className="w-4 h-4" />
                <span>Meteorological & Atmospheric Dynamics</span>
              </div>
              <h3 className="text-sm font-bold text-white">IMD & ECMWF ERA5 Micro-Met Feeds</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuous ingestion of atmospheric boundary layer height, planetary boundary layer (PBL) ventilation coefficients, ambient temperature, relative humidity, and 3D wind velocity vectors from India Meteorological Department (IMD) radar and ECMWF high-resolution models.
              </p>
              <div className="text-[10px] font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800">
                Variables: u10, v10, blh, t2m (0.1° grid spatial resolution)
              </div>
            </div>

            {/* Government Environmental Systems */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                <FileText className="w-4 h-4" />
                <span>Government Environmental Systems</span>
              </div>
              <h3 className="text-sm font-bold text-white">Statutory Grievance & Enforcement APIs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Where official public APIs become accessible, connect directly with:
                <br />• <strong>SAMEER App (CPCB)</strong>: Statutory citizen grievance tracking
                <br />• <strong>CAQM Portal</strong>: Flying squad inspection dispatch
                <br />• <strong>UPPCB & DPCC Online Systems</strong>: Consent-to-Operate stack compliance logs
              </p>
              <div className="text-[10px] font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
                Current Status: Prototype dossiers prepared for manual submission
              </div>
            </div>

            {/* Machine Learning Pipeline */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold font-mono">
                <Cpu className="w-4 h-4" />
                <span>Production ML Model Inference</span>
              </div>
              <h3 className="text-sm font-bold text-white">GNN Spatio-Temporal Graph Networks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upgrading from heuristic DBSCAN to Spatio-Temporal Graph Neural Networks (ST-GNN) that model road networks and industrial topography as graphs, enabling real-time plume dispersion simulation and physics-informed chemical transport prediction.
              </p>
              <div className="text-[10px] font-mono text-indigo-300 bg-slate-950 p-2 rounded border border-slate-800">
                Model: Physics-Informed Neural Network (PINN) + HYSPLIT
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
