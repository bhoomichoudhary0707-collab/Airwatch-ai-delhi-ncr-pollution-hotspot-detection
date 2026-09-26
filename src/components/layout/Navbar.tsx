import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_PRESETS } from '../../data/mockData';
import {
  Wind,
  Zap,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  ChevronDown,
  Bot
} from 'lucide-react';
import { PrototypeBadge } from '../common/PrototypeBadge';

export const Navbar: React.FC = () => {
  const {
    activeDemo,
    triggerDemoIncident,
    resetToBaseline,
    notification,
    dismissNotification,
    currentTime,
    setIsAiAssistantOpen
  } = useApp();

  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);

  return (
    <header className="bg-[#0f172a] border-b border-slate-800 sticky top-0 z-30">
      {/* Top Notification Toast Banner */}
      {notification && (
        <div
          className={`px-4 py-2 text-xs flex items-center justify-between border-b transition-all duration-300 ${
            notification.type === 'alert'
              ? 'bg-rose-950/90 text-rose-200 border-rose-800'
              : notification.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
              : 'bg-indigo-950/90 text-indigo-200 border-indigo-800'
          }`}
        >
          <div className="flex items-center gap-2 max-w-5xl overflow-hidden">
            {notification.type === 'alert' && <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />}
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            {notification.type === 'info' && <Info className="w-4 h-4 shrink-0 text-indigo-400" />}
            <span className="font-semibold">{notification.title}:</span>
            <span className="truncate opacity-90">{notification.message}</span>
          </div>
          <button
            onClick={dismissNotification}
            className="p-1 hover:bg-white/10 rounded transition text-slate-400 hover:text-white shrink-0 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar Bar */}
      <div className="px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold">
            <Wind className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                AirWatch <span className="text-teal-400 font-mono">AI</span>
              </span>
              <PrototypeBadge variant="prototype" label="PROTOTYPE" />
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <span>Delhi-NCR Pollution Hotspot Detection & Accountability</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-400 font-mono">8 CAAQMS Online</span>
            </p>
          </div>
        </div>

        {/* Demo Incident Launcher & Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Trigger Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border shadow-sm ${
                activeDemo
                  ? 'bg-rose-950/70 border-rose-600/80 text-rose-300 ring-2 ring-rose-500/30'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${activeDemo ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
              <span>
                {activeDemo ? (
                  <>
                    Active Scenario: <span className="font-mono text-white underline">{activeDemo.replace('_', ' ')}</span>
                  </>
                ) : (
                  'Simulate Demo Incident'
                )}
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isDemoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                    Hackathon Demo Scenarios
                  </span>
                  <PrototypeBadge variant="simulated" label="DEMO" />
                </div>
                {DEMO_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      triggerDemoIncident(preset.id);
                      setIsDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition mb-1 border ${
                      activeDemo === preset.id
                        ? 'bg-rose-950/50 border-rose-600/60 text-rose-200'
                        : 'bg-slate-800/40 hover:bg-slate-800 border-transparent text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        {preset.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {preset.district}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{preset.description}</p>
                    <div className="text-[10px] font-mono text-amber-300 mt-1">{preset.affectedPollutants}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Baseline button */}
          <button
            onClick={resetToBaseline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
            title="Reset telemetry and incidents to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Baseline</span>
          </button>

          {/* AI Assistant Launcher Button */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 shadow-sm transition"
            title="Open Grounded AI Environmental Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* Telemetry Clock */}
          <div className="hidden md:flex flex-col items-end border-l border-slate-800 pl-3">
            <span className="text-[10px] font-mono uppercase text-slate-400">Telemetry Clock</span>
            <span className="text-xs font-mono font-bold text-teal-400">{currentTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
