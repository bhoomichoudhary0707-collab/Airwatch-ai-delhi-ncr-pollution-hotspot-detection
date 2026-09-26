/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandCenter } from './components/views/CommandCenter';
import { PollutionMap } from './components/views/PollutionMap';
import { HotspotsView } from './components/views/HotspotsView';
import { SourceAttributionView } from './components/views/SourceAttributionView';
import { ForecastView } from './components/views/ForecastView';
import { CitizenReportsView } from './components/views/CitizenReportsView';
import { ComplaintsView } from './components/views/ComplaintsView';
import { AccountabilityView } from './components/views/AccountabilityView';
import { MethodologyView } from './components/views/MethodologyView';
import { AiAssistantDrawer } from './components/common/AiAssistantDrawer';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="flex-1 overflow-y-auto bg-[#0b0f17] min-h-[calc(100vh-4rem)]">
      {activeView === 'command_center' && <CommandCenter />}
      {activeView === 'pollution_map' && <PollutionMap />}
      {activeView === 'hotspots' && <HotspotsView />}
      {activeView === 'source_attribution' && <SourceAttributionView />}
      {activeView === 'forecast' && <ForecastView />}
      {activeView === 'citizen_reports' && <CitizenReportsView />}
      {activeView === 'complaints' && <ComplaintsView />}
      {activeView === 'accountability' && <AccountabilityView />}
      {activeView === 'methodology' && <MethodologyView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <AiAssistantDrawer />
      </div>
    </AppProvider>
  );
}
