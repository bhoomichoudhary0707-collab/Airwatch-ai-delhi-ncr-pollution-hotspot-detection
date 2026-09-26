import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EnvironmentalComplaint, LifecycleStatus } from '../../types';
import { PrototypeBadge } from '../common/PrototypeBadge';
import { DossierModal } from '../common/DossierModal';
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  Eye,
  Send,
  Building2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const STATUS_ORDER: LifecycleStatus[] = [
  'Detected',
  'Flagged',
  'Report Generated',
  'Prepared for Submission',
  'Investigating',
  'Action Taken',
  'Resolved'
];

export const ComplaintsView: React.FC = () => {
  const {
    complaints,
    selectedComplaintId,
    setSelectedComplaintId,
    selectedComplaint,
    advanceComplaintStatus
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [customActionNote, setCustomActionNote] = useState('');
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);

  const activeComplaint = selectedComplaint || complaints[0];

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.probableSource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Active'
        ? c.currentStatus !== 'Resolved'
        : c.currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const currentStatusIndex = activeComplaint
    ? STATUS_ORDER.indexOf(activeComplaint.currentStatus)
    : 0;

  const nextStatus =
    currentStatusIndex < STATUS_ORDER.length - 1
      ? STATUS_ORDER[currentStatusIndex + 1]
      : null;

  const handleAdvanceStatus = (statusToSet?: LifecycleStatus) => {
    if (!activeComplaint) return;
    const target = statusToSet || nextStatus;
    if (target) {
      advanceComplaintStatus(
        activeComplaint.id,
        target,
        customActionNote.trim() || undefined
      );
      setCustomActionNote('');
      setIsNoteInputOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Complaints & Environmental Actions
            </h1>
            <PrototypeBadge variant="prototype" label="ACCOUNTABILITY LIFECYCLE" />
          </div>
          <p className="text-xs text-slate-400">
            Lifecycle tracking from automated hotspot detection to dossier compilation, investigation, and verified resolution.
          </p>
        </div>

        {/* Scientific disclaimer badge */}
        <div className="text-right">
          <span className="text-[10px] font-mono text-amber-300 block font-semibold">
            STATUS HONESTY RULE
          </span>
          <span className="text-xs text-slate-400">
            Prepared for authority submission • Prototype dossiers only
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Complaints Feed & Search (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search dossier ID, location, or issue..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pt-1">
              {['All', 'Active', 'Detected', 'Flagged', 'Prepared for Submission', 'Investigating', 'Action Taken', 'Resolved'].map(
                tab => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                      statusFilter === tab
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Complaints List Cards */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredComplaints.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-500 text-xs">
                No complaints match the filter.
              </div>
            ) : (
              filteredComplaints.map(c => {
                const isSelected = c.id === activeComplaint?.id;
                const isResolved = c.currentStatus === 'Resolved';

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedComplaintId(c.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer text-xs space-y-2 ${
                      isSelected
                        ? 'bg-slate-800/80 border-teal-500/80 shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/30'
                        : 'bg-slate-900/80 hover:bg-slate-800/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-teal-300">{c.id}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          isResolved
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : c.currentStatus === 'Action Taken'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : c.currentStatus === 'Investigating'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {c.currentStatus}
                      </span>
                    </div>

                    <div className="font-bold text-white leading-snug line-clamp-1">{c.issue}</div>

                    <div className="text-slate-400 text-[11px] truncate">{c.location}</div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80 text-slate-400 font-mono">
                      <span>AQI: {c.sensorMetrics.aqi}</span>
                      <span>{c.createdDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Complaint Lifecycle & Action Workbench (7 cols) */}
        {activeComplaint && (
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
                      {activeComplaint.id}
                    </span>
                    <PrototypeBadge variant="prototype" label="PROTOTYPE COMPLAINT" />
                  </div>
                  <h2 className="text-lg font-extrabold text-white leading-snug">
                    {activeComplaint.issue}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">{activeComplaint.location}</p>
                </div>

                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition shrink-0"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>View Official Dossier</span>
                </button>
              </div>

              {/* 7-Step Lifecycle Progression Flow (Prompt Requirement) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Accountability Lifecycle Progress</span>
                  <span className="text-[10px] font-mono text-teal-400">
                    Step {currentStatusIndex + 1} of 7: {activeComplaint.currentStatus}
                  </span>
                </div>

                {/* Visual Pipeline Bar */}
                <div className="grid grid-cols-7 gap-1">
                  {STATUS_ORDER.map((step, idx) => {
                    const isPassed = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;

                    return (
                      <div
                        key={step}
                        onClick={() => handleAdvanceStatus(step)}
                        className={`p-2 rounded-lg text-center cursor-pointer transition border text-[10px] ${
                          isCurrent
                            ? 'bg-teal-950/80 border-teal-500 text-teal-300 font-bold ring-1 ring-teal-500/40'
                            : isPassed
                            ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                            : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                        }`}
                        title={`Click to set status to "${step}"`}
                      >
                        <div className="font-mono text-[9px] opacity-75">#{idx + 1}</div>
                        <div className="truncate leading-tight font-medium mt-0.5">{step}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Status Transition Action Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Lifecycle Control Action
                    </span>
                    <div className="text-xs text-slate-200">
                      {nextStatus ? (
                        <>
                          Next Milestone: <strong className="text-teal-400 font-bold">{nextStatus}</strong>
                        </>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> This incident is formally RESOLVED
                        </span>
                      )}
                    </div>
                  </div>

                  {nextStatus && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsNoteInputOpen(!isNoteInputOpen)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
                      >
                        {isNoteInputOpen ? 'Cancel Note' : '+ Add Note'}
                      </button>

                      <button
                        onClick={() => handleAdvanceStatus()}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-950/40 transition"
                      >
                        <span>Advance to &quot;{nextStatus}&quot;</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Optional Custom Note input */}
                {isNoteInputOpen && (
                  <div className="pt-2 border-t border-slate-900 space-y-2 animate-in fade-in duration-150">
                    <textarea
                      value={customActionNote}
                      onChange={e => setCustomActionNote(e.target.value)}
                      placeholder="Enter field inspection notes, notice number, or enforcement action summary..."
                      rows={2}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAdvanceStatus()}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold text-xs"
                      >
                        Submit Note & Advance
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Incident Details Summary */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Probable Source</span>
                  <div className="font-bold text-cyan-300">{activeComplaint.probableSource}</div>
                  <div className="text-[11px] text-slate-400">{activeComplaint.evidenceSummary[0]}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Target Authority</span>
                  <div className="font-bold text-white truncate">{activeComplaint.recommendedAuthority}</div>
                  <div className="text-[11px] text-slate-400">Jurisdictional task force dispatch</div>
                </div>
              </div>

              {/* Complete Chronological Audit Trail */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                  Audit History ({activeComplaint.auditHistory.length} Milestones)
                </h4>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {activeComplaint.auditHistory.map(audit => (
                    <div
                      key={audit.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-300 font-mono text-[11px]">
                          {audit.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {audit.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-400 font-semibold">{audit.actor}:</span>{' '}
                        {audit.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Structured Complaint Dossier Modal */}
      {isDossierOpen && activeComplaint && (
        <DossierModal
          complaint={activeComplaint}
          onClose={() => setIsDossierOpen(false)}
        />
      )}
    </div>
  );
};
