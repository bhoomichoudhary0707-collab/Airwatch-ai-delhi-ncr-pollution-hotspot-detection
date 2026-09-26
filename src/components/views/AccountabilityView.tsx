import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LifecycleStatus, EnvironmentalComplaint } from '../../types';
import { PrototypeBadge } from '../common/PrototypeBadge';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  TrendingDown,
  Building,
  UserCheck,
  ArrowDown,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

const LIFECYCLE_STAGES: {
  status: LifecycleStatus;
  label: string;
  description: string;
}[] = [
  {
    status: 'Detected',
    label: '1. Detected',
    description: 'Hotspot flagged by spatial sensor anomaly mesh.'
  },
  {
    status: 'Flagged',
    label: '2. Flagged',
    description: 'Cross-validated with meteorological back-trajectories.'
  },
  {
    status: 'Report Generated',
    label: '3. Report Generated',
    description: 'Structured evidence dossier compiled with chemical markers.'
  },
  {
    status: 'Prepared for Submission',
    label: '4. Prepared for Submission',
    description: 'Formatted for statutory jurisdiction delivery.'
  },
  {
    status: 'Investigating',
    label: '5. Investigating',
    description: 'Simulated field inspection squad dispatched.'
  },
  {
    status: 'Action Taken',
    label: '6. Action Taken',
    description: 'Enforcement order, boiler seal, or misting suppression.'
  },
  {
    status: 'Resolved',
    label: '7. Resolved',
    description: 'Post-intervention sensor readings confirm normalization.'
  }
];

export const AccountabilityView: React.FC = () => {
  const { complaints, selectedComplaintId, setSelectedComplaintId } = useApp();

  const [selectedAuditComplaintId, setSelectedAuditComplaintId] = useState<string>(
    selectedComplaintId || complaints[0]?.id
  );

  const inspectedComplaint =
    complaints.find(c => c.id === selectedAuditComplaintId) || complaints[0];

  // Counts for each lifecycle stage
  const stageCounts = LIFECYCLE_STAGES.reduce((acc, stage) => {
    acc[stage.status] = complaints.filter(c => c.currentStatus === stage.status).length;
    return acc;
  }, {} as Record<LifecycleStatus, number>);

  const openCount = complaints.filter(c => c.currentStatus !== 'Resolved').length;
  const investigatingCount = stageCounts['Investigating'] || 0;
  const actionTakenCount = stageCounts['Action Taken'] || 0;
  const resolvedCount = stageCounts['Resolved'] || 0;
  const totalCount = complaints.length;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Accountability & Resolution Tracking
            </h1>
            <PrototypeBadge variant="accountability" label="SIMULATED ACCOUNTABILITY" />
          </div>
          <p className="text-xs text-slate-400">
            End-to-end incident auditability: Monitoring the complete trajectory from initial detection to verified environmental resolution.
          </p>
        </div>

        <div className="text-right">
          <PrototypeBadge variant="prototype" label="PROTOTYPE METRICS" />
          <span className="block text-[11px] text-slate-400 mt-1">
            Simulated civic enforcement & response ledger
          </span>
        </div>
      </div>

      {/* KPI Cards (Prompt Requirement: Clearly labeled prototype/simulated) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Open Incidents</span>
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{openCount}</div>
          <div className="mt-1">
            <PrototypeBadge variant="simulated" label="PROTOTYPE DATA" className="text-[9px] px-1 py-0" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Investigating</span>
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">{investigatingCount}</div>
          <div className="mt-1">
            <PrototypeBadge variant="simulated" label="PROTOTYPE DATA" className="text-[9px] px-1 py-0" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Action Taken</span>
            <FileCheck className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">{actionTakenCount}</div>
          <div className="mt-1">
            <PrototypeBadge variant="simulated" label="PROTOTYPE DATA" className="text-[9px] px-1 py-0" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Resolved Incidents</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{resolvedCount}</div>
          <div className="mt-1">
            <PrototypeBadge variant="simulated" label="PROTOTYPE DATA" className="text-[9px] px-1 py-0" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Avg Resolution Time</span>
            <TrendingDown className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-teal-300 font-mono">
            3.8 <span className="text-xs font-normal text-slate-400">days</span>
          </div>
          <div className="mt-1">
            <PrototypeBadge variant="simulated" label="PROTOTYPE DATA" className="text-[9px] px-1 py-0" />
          </div>
        </div>
      </div>

      {/* 7-Step Lifecycle Funnel / Flowchart (Prompt Requirement) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Full Accountability Lifecycle Flow</span>
            </h3>
            <p className="text-xs text-slate-400">
              Structured accountability state machine across administrative and sensor verification gates.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
            {resolutionRate}% Resolution Rate
          </span>
        </div>

        {/* Visual Pipeline Funnel Flow */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const count = stageCounts[stage.status];
            const isLast = idx === LIFECYCLE_STAGES.length - 1;

            return (
              <div
                key={stage.status}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                      Step {idx + 1}
                    </span>
                    <span
                      className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded ${
                        count > 0
                          ? 'bg-teal-950 text-teal-300 border border-teal-800'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white mb-1">{stage.status}</div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {stage.description}
                  </p>
                </div>

                {!isLast && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Incident Selection & Detailed Audit Timeline (Prompt Requirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Incident Picker List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Select Incident to Audit
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {complaints.length} Tracked
            </span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {complaints.map(c => {
              const isSelected = c.id === inspectedComplaint?.id;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedAuditComplaintId(c.id)}
                  className={`p-3 rounded-xl border transition cursor-pointer text-xs space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800 border-teal-500/80 shadow-md ring-1 ring-teal-500/30'
                      : 'bg-slate-950/60 hover:bg-slate-800/40 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-300">{c.id}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        c.currentStatus === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {c.currentStatus}
                    </span>
                  </div>
                  <div className="font-bold text-white text-[11px] line-clamp-1">{c.location}</div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{c.probableSource.split('(')[0]}</span>
                    <span className="font-mono text-cyan-400">{c.auditHistory.length} events</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Audit Timeline (8 cols) */}
        {inspectedComplaint && (
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {/* Header of selected incident */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                    {inspectedComplaint.id}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      inspectedComplaint.currentStatus === 'Resolved'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    STATUS: {inspectedComplaint.currentStatus}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white">
                  {inspectedComplaint.issue}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {inspectedComplaint.location} • Recommended: {inspectedComplaint.recommendedAuthority}
                </p>
              </div>

              {inspectedComplaint.resolutionNotes && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-[11px] text-emerald-200 max-w-xs shrink-0">
                  <div className="font-bold flex items-center gap-1 text-emerald-300 mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolution Record
                  </div>
                  {inspectedComplaint.resolutionNotes}
                </div>
              )}
            </div>

            {/* Complete Chronological Audit Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider mb-3">
                Chronological Chain-of-Custody Timeline
              </h4>

              <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pb-2">
                {inspectedComplaint.auditHistory.map((item, idx) => {
                  const isLatest = idx === inspectedComplaint.auditHistory.length - 1;

                  return (
                    <div key={item.id} className="relative pl-6">
                      {/* Timeline Node Icon Pin */}
                      <div
                        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          item.status === 'Resolved'
                            ? 'bg-emerald-500 border-emerald-300'
                            : item.status === 'Action Taken'
                            ? 'bg-purple-500 border-purple-300'
                            : 'bg-teal-500 border-teal-300'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      </div>

                      {/* Timeline Card */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-teal-300 text-xs flex items-center gap-2">
                            <span>{item.status}</span>
                            <span className="text-[10px] font-mono font-normal text-slate-500">
                              (Milestone #{idx + 1})
                            </span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {item.timestamp}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400">
                          Actor:{' '}
                          <strong className="text-slate-200">{item.actor}</strong>
                        </div>

                        <p className="text-xs text-slate-300 pt-1 leading-relaxed border-t border-slate-900 mt-1">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
