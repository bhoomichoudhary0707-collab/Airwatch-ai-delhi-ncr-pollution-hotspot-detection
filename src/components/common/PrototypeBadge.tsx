import React from 'react';

interface PrototypeBadgeProps {
  label?: string;
  variant?: 'prototype' | 'prediction' | 'ai' | 'simulated' | 'accountability';
  className?: string;
}

export const PrototypeBadge: React.FC<PrototypeBadgeProps> = ({
  label,
  variant = 'prototype',
  className = ''
}) => {
  const defaultLabels = {
    prototype: 'PROTOTYPE DATA',
    prediction: 'MODEL PREDICTION',
    ai: 'AI-ASSISTED PROBABLE SOURCE',
    simulated: 'SIMULATED CITIZEN REPORT',
    accountability: 'SIMULATED ACCOUNTABILITY DATA'
  };

  const colorStyles = {
    prototype: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50',
    prediction: 'bg-purple-950/80 text-purple-300 border-purple-700/50',
    ai: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50',
    simulated: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
    accountability: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
  };

  const displayText = label || defaultLabels[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase border ${colorStyles[variant]} ${className}`}
      title="This metric or finding is generated in prototype simulation mode for academic/hackathon demonstration"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-pulse" />
      {displayText}
    </span>
  );
};
