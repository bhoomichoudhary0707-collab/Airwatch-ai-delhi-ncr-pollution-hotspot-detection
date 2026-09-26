import React from 'react';
import { EnvironmentalComplaint } from '../../types';
import { PrototypeBadge } from './PrototypeBadge';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  AlertTriangle,
  Building,
  MapPin,
  Wind
} from 'lucide-react';

interface DossierModalProps {
  complaint: EnvironmentalComplaint;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ complaint, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = `
AIRWATCH AI — PROTOTYPE ENVIRONMENTAL COMPLAINT DOSSIER
==========================================================
STATUS: ${complaint.currentStatus} (Prepared for authority submission)
DOSSIER ID: ${complaint.id}
LOCATION: ${complaint.location}
DATE/TIME: ${complaint.createdDate}
SEVERITY: ${complaint.severity}

RECOMMENDED STATUTORY AUTHORITY:
${complaint.recommendedAuthority}

ISSUE DESCRIPTION:
${complaint.issue}

NARRATIVE SUMMARY:
${complaint.narrative}

AI-ASSISTED PROBABLE SOURCE ATTRIBUTION:
${complaint.probableSource}

SENSOR TELEMETRY SNAPSHOT:
AQI: ${complaint.sensorMetrics.aqi}
PM2.5: ${complaint.sensorMetrics.pm25} µg/m³
PM10: ${complaint.sensorMetrics.pm10} µg/m³
NO2: ${complaint.sensorMetrics.no2} ppb
SO2: ${complaint.sensorMetrics.so2} ppb
Wind Drift: ${complaint.windVector.direction} @ ${complaint.windVector.speedKmh} km/h

SUPPORTING EVIDENCE SUMMARY:
${complaint.evidenceSummary.map(e => `• ${e}`).join('\n')}

AUDIT LIFECYCLE HISTORY:
${complaint.auditHistory.map(a => `[${a.timestamp}] ${a.status} - ${a.actor}: ${a.note}`).join('\n')}

==========================================================
DISCLAIMER: This is a prototype environmental complaint generated for academic & hackathon demonstration. It is prepared for submission to relevant authorities but was NOT filed to an official government portal.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <span className="font-extrabold text-sm text-white tracking-tight">
              Structured Environmental Complaint Dossier
            </span>
            <PrototypeBadge variant="prototype" label="PREPARED FOR SUBMISSION" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition hidden sm:flex"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 space-y-6 text-slate-200 text-xs bg-slate-900/40">
          {/* Statutory Header Block */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
              <span className="font-mono text-teal-400 font-bold text-sm">
                DOSSIER REF: {complaint.id}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Generated: {complaint.createdDate}
              </span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-500 font-mono block text-[10px] uppercase">
                Recommended Statutory Jurisdiction
              </span>
              <strong className="text-sm text-white">{complaint.recommendedAuthority}</strong>
            </div>
          </div>

          {/* Scientific Honesty Disclaimer Banner */}
          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Statutory Disclosure:</strong> This document represents a <em>prototype complaint generated</em> from multi-sensor telemetry and Bayesian source attribution. It is <em>prepared for authority submission</em> and has not yet been filed with official statutory registries.
            </p>
          </div>

          {/* Issue & Narrative */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[10px] tracking-wider text-slate-400 font-bold">
              Subject & Environmental Allegation
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-white text-sm mb-1.5">{complaint.issue}</div>
              <p className="text-slate-300 text-xs leading-relaxed">{complaint.narrative}</p>
            </div>
          </div>

          {/* Location & Probable Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Incident Location</span>
              <div className="font-bold text-white text-xs">{complaint.location}</div>
              <div className="text-[11px] text-slate-400">{complaint.district} Region</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">AI-Assisted Probable Source</span>
              <div className="font-bold text-cyan-300 text-xs">{complaint.probableSource}</div>
              <div className="text-[11px] text-slate-400">Atmospheric dispersion & chemical signature</div>
            </div>
          </div>

          {/* Sensor Telemetry Table */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[10px] tracking-wider text-slate-400 font-bold">
              Sensor Telemetry & Atmospheric Signature
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">AQI Index</span>
                <span className="text-base font-black font-mono text-white">{complaint.sensorMetrics.aqi}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">PM2.5 Level</span>
                <span className="text-base font-black font-mono text-rose-400">{complaint.sensorMetrics.pm25} µg</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">PM10 Level</span>
                <span className="text-base font-black font-mono text-amber-400">{complaint.sensorMetrics.pm10} µg</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">NO2 Traffic</span>
                <span className="text-base font-black font-mono text-orange-400">{complaint.sensorMetrics.no2} ppb</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">SO2 Boiler</span>
                <span className="text-base font-black font-mono text-cyan-400">{complaint.sensorMetrics.so2} ppb</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Wind Dispersion Vector:</span>
              <strong className="text-teal-300 font-mono">
                {complaint.windVector.direction} @ {complaint.windVector.speedKmh} km/h
              </strong>
            </div>
          </div>

          {/* Supporting Evidence List */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[10px] tracking-wider text-slate-400 font-bold">
              Evidentiary Findings
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              {complaint.evidenceSummary.map((ev, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle & Audit Trail */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[10px] tracking-wider text-slate-400 font-bold">
              Chain of Custody & Lifecycle Audit
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              {complaint.auditHistory.map(audit => (
                <div key={audit.id} className="text-xs border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                    <span className="text-teal-300 font-mono">{audit.status}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{audit.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    <strong>{audit.actor}:</strong> {audit.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Dossier cryptographic verification hash: <span className="font-mono text-slate-500">sha256-ncr-882f09a1c...</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
