import React from 'react';
import { useApp, ViewType } from '../../context/AppContext';
import {
  LayoutDashboard,
  Map,
  Flame,
  Cpu,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
  BookOpen,
  Bot,
  Info
} from 'lucide-react';
import { PrototypeBadge } from '../common/PrototypeBadge';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    hotspots,
    complaints,
    citizenReports,
    setIsAiAssistantOpen
  } = useApp();

  const openComplaintsCount = complaints.filter(
    c => c.currentStatus !== 'Resolved'
  ).length;

  const severeHotspotsCount = hotspots.filter(
    h => h.severity === 'Severe' || h.severity === 'Hazardous'
  ).length;

  const resolvedCount = complaints.filter(c => c.currentStatus === 'Resolved').length;
  const resolutionRatePct = complaints.length > 0 ? Math.round((resolvedCount / complaints.length) * 100) : 0;

  const navItems: {
    id: ViewType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'command_center',
      label: 'Command Center',
      icon: LayoutDashboard
    },
    {
      id: 'pollution_map',
      label: 'Pollution Map',
      icon: Map,
      badge: 'Live',
      badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50'
    },
    {
      id: 'hotspots',
      label: 'Hotspots',
      icon: Flame,
      badge: severeHotspotsCount > 0 ? `${severeHotspotsCount} Alert` : undefined,
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800'
    },
    {
      id: 'source_attribution',
      label: 'Source Attribution',
      icon: Cpu,
      badge: 'AI Model',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
    },
    {
      id: 'forecast',
      label: 'Forecast',
      icon: TrendingUp,
      badge: '48h',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800'
    },
    {
      id: 'citizen_reports',
      label: 'Citizen Reports',
      icon: Users,
      badge: citizenReports.length,
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
    },
    {
      id: 'complaints',
      label: 'Complaints & Actions',
      icon: FileText,
      badge: openComplaintsCount > 0 ? openComplaintsCount : undefined,
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
    },
    {
      id: 'accountability',
      label: 'Accountability',
      icon: ShieldCheck,
      badge: `${resolutionRatePct}%`,
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800'
    },
    {
      id: 'methodology',
      label: 'Data & Methodology',
      icon: BookOpen
    }
  ];

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Workflow reminder header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-bold flex items-center justify-between">
          <span>Workflow Cycle</span>
          <span className="text-teal-400 font-normal">5 Steps</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300">
          <span className="text-emerald-400 font-semibold">DETECT</span>
          <span className="text-slate-600">→</span>
          <span className="text-cyan-400 font-semibold">PREDICT</span>
          <span className="text-slate-600">→</span>
          <span className="text-amber-400 font-semibold">ATTRIBUTE</span>
          <span className="text-slate-600">→</span>
          <span className="text-rose-400 font-semibold">REPORT</span>
          <span className="text-slate-600">→</span>
          <span className="text-purple-400 font-semibold">RESOLVE</span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-300 border border-teal-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-teal-400 scale-110' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span className="tracking-tight">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                    item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Assistant Quick Trigger in Navigation */}
        <div className="pt-2">
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-800/70 text-cyan-300 hover:bg-cyan-950 shadow-md group transition"
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
              <span>Ask AI Assistant</span>
            </div>
            <span className="text-[9px] font-mono bg-cyan-900/60 text-cyan-200 px-1.5 py-0.5 rounded border border-cyan-700">
              Grounded
            </span>
          </button>
        </div>
      </nav>

      {/* Scientific Honesty Disclaimer Card in Sidebar */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Academic Prototype</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            AI-assisted probable source attribution and simulated complaints. Not affiliated with or connected to official government enforcement systems.
          </p>
          <div className="pt-1 flex items-center justify-between">
            <PrototypeBadge variant="simulated" label="HACKATHON BUILD" />
            <span className="text-[10px] font-mono text-slate-500">v1.1-NCR</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

