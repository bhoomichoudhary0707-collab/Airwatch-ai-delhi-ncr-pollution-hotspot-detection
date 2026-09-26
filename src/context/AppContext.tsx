import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Hotspot,
  MonitoringStation,
  SourceZone,
  EnvironmentalComplaint,
  DemoIncidentPreset,
  LifecycleStatus,
  CitizenReport,
  ChatMessage
} from '../types';
import {
  INITIAL_HOTSPOTS,
  INITIAL_STATIONS,
  INITIAL_SOURCE_ZONES,
  INITIAL_COMPLAINTS,
  INITIAL_CITIZEN_REPORTS,
  DEMO_PRESETS
} from '../data/mockData';

export type ViewType = 
  | 'command_center'
  | 'pollution_map'
  | 'hotspots'
  | 'source_attribution'
  | 'complaints'
  | 'accountability'
  | 'forecast'
  | 'citizen_reports'
  | 'methodology';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  hotspots: Hotspot[];
  stations: MonitoringStation[];
  sourceZones: SourceZone[];
  complaints: EnvironmentalComplaint[];
  citizenReports: CitizenReport[];
  addCitizenReport: (report: Omit<CitizenReport, 'id' | 'isPrototype'>) => void;
  selectedStationId: string;
  setSelectedStationId: (id: string) => void;
  selectedHotspotId: string;
  setSelectedHotspotId: (id: string) => void;
  selectedComplaintId: string;
  setSelectedComplaintId: (id: string) => void;
  activeDemo: string | null;
  triggerDemoIncident: (presetId: DemoIncidentPreset['id']) => void;
  resetToBaseline: () => void;
  isDBSCANRunning: boolean;
  runDBSCANClustering: () => void;
  generateComplaintFromHotspot: (hotspotId: string) => string;
  advanceComplaintStatus: (complaintId: string, nextStatus: LifecycleStatus, customNote?: string) => void;
  notification: { title: string; message: string; type: 'alert' | 'success' | 'info' } | null;
  dismissNotification: () => void;
  selectedHotspot: Hotspot | undefined;
  selectedComplaint: EnvironmentalComplaint | undefined;
  currentTime: string;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('command_center');
  const [hotspots, setHotspots] = useState<Hotspot[]>(INITIAL_HOTSPOTS);
  const [stations, setStations] = useState<MonitoringStation[]>(INITIAL_STATIONS);
  const [sourceZones] = useState<SourceZone[]>(INITIAL_SOURCE_ZONES);
  const [complaints, setComplaints] = useState<EnvironmentalComplaint[]>(INITIAL_COMPLAINTS);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(INITIAL_CITIZEN_REPORTS);
  const [selectedStationId, setSelectedStationId] = useState<string>('UP-GHZ-SB');
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('HS-GHZ-01');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>('NCR-2026-GHZ-0089');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isDBSCANRunning, setIsDBSCANRunning] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: 'Hello, I am the AirWatch AI Environmental Analyst. I answer questions strictly grounded in our live Delhi-NCR sensor mesh, DBSCAN hotspots, Bayesian source attributions, complaints, and citizen reports. How can I help you investigate pollution today?',
      timestamp: 'Just now',
      groundedSources: ['Delhi-NCR Spatial Mesh', 'CPCB CAAQMS Reference Sensors']
    }
  ]);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'alert' | 'success' | 'info' } | null>({
    title: 'Prototype Environmental Intelligence Live',
    message: 'Delhi-NCR spatial telemetry stream initialized. Ready for hotspot detection and incident simulation.',
    type: 'info'
  });
  const [currentTime, setCurrentTime] = useState<string>('09:15:30 IST');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedHotspot = hotspots.find(h => h.id === selectedHotspotId) || hotspots[0];
  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  const dismissNotification = () => setNotification(null);

  // Trigger Demo Incident
  const triggerDemoIncident = (presetId: DemoIncidentPreset['id']) => {
    setActiveDemo(presetId);

    if (presetId === 'ghaziabad_industrial') {
      // 1. Spikes Sahibabad Hotspot (PM2.5 and SO2)
      setHotspots(prev =>
        prev.map(h => {
          if (h.id === 'HS-GHZ-01') {
            return {
              ...h,
              aqi: 468,
              pm25: 372,
              pm10: 485,
              so2: 96, // Major SO2 spike!
              no2: 84,
              severity: 'Hazardous',
              detectedTime: 'Just now (Simulated Incident)',
              confidence: 91,
              status: 'Detected',
              isSimulatedDemoIncident: true,
              evidence: [
                {
                  title: 'Acute SO2 Exceedance Spike',
                  description: 'Sensor array detected emergency SO2 surge to 96 ppb (5.8x regional baseline). Highly correlated with non-compliant furnace fuel combustion.',
                  metricValue: '96 ppb (Emergency)',
                  confidenceContribution: '+38%',
                  indicatorType: 'chemical'
                },
                {
                  title: 'Direct Downwind Plume Trajectory',
                  description: 'Micro-meteorological telemetry indicates wind flowing ESE (115°) at 11 km/h directly carrying stack plume into adjacent residential zone.',
                  metricValue: 'ESE at 11 km/h',
                  confidenceContribution: '+28%',
                  indicatorType: 'meteorological'
                },
                {
                  title: 'Close Proximity to 42 Heavy Industrial Plants',
                  description: 'Located inside the designated Sahibabad Industrial Area Sector 4 boundaries.',
                  metricValue: '0.8 km distance',
                  confidenceContribution: '+15%',
                  indicatorType: 'proximity'
                },
                {
                  title: 'Thermal & Night-shift Boiler Signature',
                  description: 'Coincides with unmonitored nocturnal batch operation cycles of foundry furnaces.',
                  metricValue: 'Historical match 0.94',
                  confidenceContribution: '+10%',
                  indicatorType: 'historical'
                }
              ]
            };
          }
          return h;
        })
      );

      // Update CAAQMS station
      setStations(prev =>
        prev.map(s => {
          if (s.id === 'UP-GHZ-SB') {
            return {
              ...s,
              aqi: 465,
              pm25: 370,
              pm10: 480,
              so2: 95,
              status: 'Anomaly',
              lastUpdated: 'Just now'
            };
          }
          return s;
        })
      );

      // Update or reset the complaint for Ghaziabad to 'Detected' so the user can take it through the workflow
      setComplaints(prev =>
        prev.map(c => {
          if (c.hotspotId === 'HS-GHZ-01') {
            return {
              ...c,
              currentStatus: 'Detected',
              createdDate: 'Just now',
              issue: 'CRITICAL SO2 SPIKE (96 ppb) - Suspected Industrial Boiler & Furnace Release',
              sensorMetrics: {
                aqi: 468,
                pm25: 372,
                pm10: 485,
                no2: 84,
                so2: 96
              },
              auditHistory: [
                {
                  id: `aud-${Date.now()}`,
                  status: 'Detected',
                  timestamp: 'Just now',
                  actor: 'AirWatch Telemetry Anomaly Detector',
                  note: 'Emergency threshold exceeded: PM2.5 reached 372 µg/m³, SO2 reached 96 ppb in Sahibabad.'
                }
              ]
            };
          }
          return c;
        })
      );

      setSelectedHotspotId('HS-GHZ-01');
      setSelectedComplaintId('NCR-2026-GHZ-0089');

      setNotification({
        title: 'Demo Incident Activated: Industrial Emission Spike (Ghaziabad)',
        message: 'PM2.5 jumped to 372 µg/m³ & SO2 surged to 96 ppb in Sahibabad Industrial Area. Hotspot flagged as Hazardous.',
        type: 'alert'
      });
    } else if (presetId === 'northwest_agri') {
      setHotspots(prev =>
        prev.map(h => {
          if (h.id === 'HS-NWD-03') {
            return {
              ...h,
              aqi: 445,
              pm25: 395,
              pm10: 450,
              severity: 'Hazardous',
              detectedTime: 'Just now (Simulated Incident)',
              confidence: 88,
              status: 'Detected',
              isSimulatedDemoIncident: true
            };
          }
          return h;
        })
      );
      setSelectedHotspotId('HS-NWD-03');
      setNotification({
        title: 'Demo Incident Activated: Agricultural Burning Ingress (NW Delhi)',
        message: 'Severe PM2.5 biomass smoke plume ingress detected entering Delhi via 310° NW wind drift.',
        type: 'alert'
      });
    } else if (presetId === 'anand_vihar_traffic') {
      setHotspots(prev =>
        prev.map(h => {
          if (h.id === 'HS-ANV-02') {
            return {
              ...h,
              aqi: 480,
              pm25: 380,
              no2: 135,
              pm10: 490,
              severity: 'Hazardous',
              detectedTime: 'Just now (Simulated Incident)',
              confidence: 93,
              status: 'Detected',
              isSimulatedDemoIncident: true
            };
          }
          return h;
        })
      );
      setSelectedHotspotId('HS-ANV-02');
      setNotification({
        title: 'Demo Incident Activated: Freight Traffic Gridlock (Anand Vihar)',
        message: 'Extreme NO2 spike (135 ppb) recorded along Ghazipur border corridor due to massive diesel truck idling.',
        type: 'alert'
      });
    }
  };

  const resetToBaseline = () => {
    setActiveDemo(null);
    setHotspots(INITIAL_HOTSPOTS);
    setStations(INITIAL_STATIONS);
    setComplaints(INITIAL_COMPLAINTS);
    setSelectedHotspotId('HS-GHZ-01');
    setSelectedComplaintId('NCR-2026-GHZ-0089');
    setNotification({
      title: 'Environment Reset to Baseline',
      message: 'All sensor nodes and hotspot values restored to standard monitoring conditions.',
      type: 'info'
    });
  };

  // Run spatial clustering (DBSCAN simulation)
  const runDBSCANClustering = () => {
    setIsDBSCANRunning(true);
    setNotification({
      title: 'Running Spatial Density Clustering (DBSCAN ε=3.2km, minPts=4)...',
      message: 'Aggregating 8 CAAQMS stations + 42 low-cost optical sensor nodes with spatio-temporal inverse-distance weighting.',
      type: 'info'
    });

    setTimeout(() => {
      setIsDBSCANRunning(false);
      setNotification({
        title: 'Spatial Clustering Complete',
        message: `Identified ${hotspots.length} active pollution clusters with high confidence source signatures across Delhi-NCR.`,
        type: 'success'
      });
    }, 1200);
  };

  // Generate complaint from hotspot
  const generateComplaintFromHotspot = (hotspotId: string): string => {
    const targetHotspot = hotspots.find(h => h.id === hotspotId);
    if (!targetHotspot) return '';

    // Check if complaint already exists
    const existing = complaints.find(c => c.hotspotId === hotspotId);
    if (existing) {
      // Update existing to 'Report Generated' if it was in 'Detected' or 'Flagged'
      if (existing.currentStatus === 'Detected' || existing.currentStatus === 'Flagged') {
        advanceComplaintStatus(existing.id, 'Report Generated', 'Structured environmental complaint dossier compiled from hotspot evidence.');
      }
      setSelectedComplaintId(existing.id);
      setActiveView('complaints');
      setNotification({
        title: 'Structured Complaint Dossier Ready',
        message: `Complaint #${existing.id} updated with latest sensor telemetry for ${existing.location}.`,
        type: 'success'
      });
      return existing.id;
    }

    const newId = `NCR-2026-${targetHotspot.district.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint: EnvironmentalComplaint = {
      id: newId,
      hotspotId: targetHotspot.id,
      location: `${targetHotspot.name}, ${targetHotspot.district}`,
      district: targetHotspot.district,
      issue: `High Atmospheric Pollution Exceedance — Probable ${targetHotspot.probableSource}`,
      narrative: `Automated detection flagged an acute pollution cluster at ${targetHotspot.name}. Telemetry shows PM2.5 at ${targetHotspot.pm25} µg/m³ with wind blowing from ${targetHotspot.windDirection} at ${targetHotspot.windSpeedKmh} km/h. AI-assisted source attribution indicates ${targetHotspot.probableSource} (${targetHotspot.confidence}% confidence).`,
      probableSource: `${targetHotspot.probableSource} (AI-Assisted ${targetHotspot.confidence}% Confidence)`,
      severity: targetHotspot.severity,
      createdDate: 'Just now',
      currentStatus: 'Report Generated',
      recommendedAuthority: targetHotspot.district.includes('Delhi')
        ? 'Delhi Pollution Control Committee (DPCC) / CAQM Flying Squad'
        : targetHotspot.district.includes('Ghaziabad') || targetHotspot.district.includes('Noida')
        ? 'Uttar Pradesh Pollution Control Board (UPPCB) / CAQM Regional Office'
        : 'Haryana State Pollution Control Board (HSPCB)',
      evidenceSummary: targetHotspot.evidence.map(e => `${e.title}: ${e.metricValue}`),
      sensorMetrics: {
        aqi: targetHotspot.aqi,
        pm25: targetHotspot.pm25,
        pm10: targetHotspot.pm10,
        no2: targetHotspot.no2,
        so2: targetHotspot.so2
      },
      windVector: {
        direction: targetHotspot.windDirection,
        speedKmh: targetHotspot.windSpeedKmh
      },
      isPrototype: true,
      auditHistory: [
        {
          id: `aud-${Date.now()}-1`,
          status: 'Detected',
          timestamp: targetHotspot.detectedTime,
          actor: 'AirWatch Spatial Clustering Engine',
          note: `Cluster identified with AQI ${targetHotspot.aqi}.`
        },
        {
          id: `aud-${Date.now()}-2`,
          status: 'Report Generated',
          timestamp: 'Just now',
          actor: 'Citizen / Community Compliance Module (Simulated)',
          note: 'Structured environmental complaint compiled with sensor logs and atmospheric dispersion vectors.'
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setSelectedComplaintId(newId);
    setActiveView('complaints');

    // Also update hotspot status
    setHotspots(prev =>
      prev.map(h => (h.id === hotspotId ? { ...h, status: 'Report Generated' } : h))
    );

    setNotification({
      title: 'Prototype Environmental Complaint Generated',
      message: `Created dossier #${newId} for ${targetHotspot.name}. Ready for review and lifecycle progression.`,
      type: 'success'
    });

    return newId;
  };

  // Advance Complaint Status through lifecycle
  const advanceComplaintStatus = (
    complaintId: string,
    nextStatus: LifecycleStatus,
    customNote?: string
  ) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          const defaultNotes: Record<LifecycleStatus, string> = {
            'Detected': 'Initial hotspot detection recorded.',
            'Flagged': 'Incident verified against multi-sensor telemetry and flagged for priority action.',
            'Report Generated': 'Structured evidence report generated with wind dispersal and chemical signatures.',
            'Prepared for Submission': 'Dossier formatted and staged for statutory compliance authority submission.',
            'Investigating': 'Field inspection task force deployed to inspect the designated source zone.',
            'Action Taken': 'Enforcement notice served / mitigating water misting / boiler shut-down executed.',
            'Resolved': 'Sensor telemetry verified pollutant levels returned below emergency thresholds.'
          };

          const actorForStatus: Record<LifecycleStatus, string> = {
            'Detected': 'Spatial Clustering Sensor Network',
            'Flagged': 'AirWatch Environmental Analyst (Simulated)',
            'Report Generated': 'Automated Dossier Generator',
            'Prepared for Submission': 'Prototype Compliance Desk',
            'Investigating': 'Authorized Inspection Officer (Simulated)',
            'Action Taken': 'Regional Enforcement Task Force (Simulated)',
            'Resolved': 'AirWatch Verification & Sensor Telemetry'
          };

          const newAuditItem = {
            id: `aud-${Date.now()}`,
            status: nextStatus,
            timestamp: 'Just now',
            actor: actorForStatus[nextStatus],
            note: customNote || defaultNotes[nextStatus]
          };

          return {
            ...c,
            currentStatus: nextStatus,
            auditHistory: [...c.auditHistory, newAuditItem],
            resolutionNotes: nextStatus === 'Resolved' 
              ? (customNote || 'Post-intervention telemetry confirms particulate levels returned to ambient baseline. Incident closed in prototype tracker.')
              : c.resolutionNotes
          };
        }
        return c;
      })
    );

    // Also sync the associated hotspot's status if any
    const associatedComplaint = complaints.find(c => c.id === complaintId);
    if (associatedComplaint) {
      setHotspots(prev =>
        prev.map(h => {
          if (h.id === associatedComplaint.hotspotId) {
            return {
              ...h,
              status: nextStatus,
              // If resolved, lower the simulated hotspot AQI
              ...(nextStatus === 'Resolved' ? { aqi: Math.min(h.aqi, 215), severity: 'Moderate' as const } : {})
            };
          }
          return h;
        })
      );
    }

    setNotification({
      title: `Complaint Status Updated: ${nextStatus}`,
      message: `Complaint #${complaintId} advanced to "${nextStatus}". Audit trail updated.`,
      type: 'info'
    });
  };

  // Add Citizen Report
  const addCitizenReport = (reportData: Omit<CitizenReport, 'id' | 'isPrototype'>) => {
    const newId = `CR-NCR-${Math.floor(100 + Math.random() * 900)}`;
    const newReport: CitizenReport = {
      ...reportData,
      id: newId,
      isPrototype: true
    };

    setCitizenReports(prev => [newReport, ...prev]);

    setNotification({
      title: 'Citizen Report Submitted',
      message: `Simulated citizen report #${newId} recorded for ${reportData.location}. Mapped to active telemetry mesh.`,
      type: 'success'
    });
  };

  // Grounded AI Assistant Question Handler
  const sendChatMessage = async (userQuestion: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: userQuestion,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Grounding logic using current structured state
    const qLower = userQuestion.toLowerCase();
    let replyText = '';
    const groundedSources: string[] = [];

    if (qLower.includes('ghaziabad') && (qLower.includes('why') || qLower.includes('flagged') || qLower.includes('spike'))) {
      const ghz = hotspots.find(h => h.id === 'HS-GHZ-01') || hotspots[0];
      const ghzStation = stations.find(s => s.id === 'UP-GHZ-SB');
      groundedSources.push(`Hotspot ${ghz.id} (${ghz.name})`, 'Sahibabad CAAQMS Station (UP-GHZ-SB)');
      replyText = `**Ghaziabad (Sahibabad Industrial Area)** is currently flagged as **${ghz.severity}** (AQI: ${ghz.aqi}) due to an acute anomaly in chemical pollutants:

1. **Severe SO2 Exceedance**: Current SO2 is measured at **${ghz.so2} ppb** (${Math.round((ghz.so2 / 16) * 10) / 10}x above the regional baseline of 16 ppb). This is a definitive chemical fingerprint of non-compliant heavy furnace oil and coal combustion in metallurgical/foundry boilers.
2. **Elevated PM2.5**: Particulate levels have reached **${ghz.pm25} µg/m³** (AQI ${ghz.aqi}).
3. **Plume Dispersion Vector**: Micro-meteorological sensors indicate wind blowing from **${ghz.windDirection} at ${ghz.windSpeedKmh} km/h**, directly channeling industrial stack emissions toward adjacent residential borders (Kaushambi and Vasundhara).
4. **Attribution**: Probable source is attributed to **${ghz.probableSource}** with **${ghz.confidence}% confidence**.`;
    } else if (qLower.includes('noida') && (qLower.includes('source') || qLower.includes('probable') || qLower.includes('why'))) {
      const noidaHs = hotspots.find(h => h.district.includes('Noida') || h.name.includes('Knowledge Park')) || hotspots[3];
      groundedSources.push(`Hotspot ${noidaHs.id} (${noidaHs.name})`, 'Sector 62 / Greater Noida CAAQMS');
      replyText = `Based on the latest sensor telemetry, the **${noidaHs.name}** hotspot in ${noidaHs.district}:

- **Probable Source**: **${noidaHs.probableSource}**
- **Model Confidence**: **${noidaHs.confidence}%**
- **Primary Evidence**: A dominant coarse particulate ratio where PM10 (${noidaHs.pm10} µg/m³) is more than double PM2.5 (${noidaHs.pm25} µg/m³). This mechanical disparity is characteristic of unmitigated earth excavation, road dust resuspension, and cement transit along expressway construction corridors (${noidaHs.nearestKnownSource}).`;
    } else if (qLower.includes('highest pm2.5') || qLower.includes('highest pm25') || qLower.includes('worst air') || qLower.includes('most polluted')) {
      const sortedByPm25 = [...hotspots].sort((a, b) => b.pm25 - a.pm25);
      const worst = sortedByPm25[0];
      groundedSources.push(`Hotspot ${worst.id}`, `${worst.name} Telemetry Node`);
      replyText = `Currently, the highest PM2.5 concentration across Delhi-NCR is recorded at **${worst.name}, ${worst.district}**:

- **PM2.5**: **${worst.pm25} µg/m³**
- **AQI**: **${worst.aqi} (${worst.severity})**
- **Probable Source**: ${worst.probableSource} (${worst.confidence}% confidence)
- **Top Contributing Factors**: ${worst.evidence[0]?.title || 'Multi-source combustion'}.`;
    } else if (qLower.includes('evidence') && qLower.includes('ghaziabad')) {
      const ghz = hotspots.find(h => h.id === 'HS-GHZ-01') || hotspots[0];
      groundedSources.push(`Hotspot ${ghz.id} Attribution Evidence Matrix`);
      replyText = `The **${ghz.confidence}% confidence attribution** for Ghaziabad (${ghz.name}) is supported by 4 explainable pillars:

` + ghz.evidence.map((ev, i) => `${i + 1}. **${ev.title}** (${ev.confidenceContribution}): ${ev.description} [Observed: ${ev.metricValue}]`).join('\n\n') +
      `\n\n*Note: This is an AI-assisted probabilistic correlation for investigative prioritization, not proof of legal causation.*`;
    } else if (qLower.includes('complaint') || qLower.includes('unresolved') || qLower.includes('open')) {
      const unresolved = complaints.filter(c => c.currentStatus !== 'Resolved');
      groundedSources.push('Accountability Ledger', `${unresolved.length} Open Environmental Complaints`);
      replyText = `There are currently **${unresolved.length} unresolved complaints** in the tracking lifecycle:

` + unresolved.map(c => `• **${c.id}** (${c.currentStatus}): ${c.location} — *${c.issue}* [Authority: ${c.recommendedAuthority}]`).join('\n') +
      `\n\n${complaints.length - unresolved.length} complaint has been verified as **Resolved** following post-intervention sensor checks.`;
    } else if (qLower.includes('citizen') || qLower.includes('report')) {
      groundedSources.push('Citizen Science Telemetry Network', `${citizenReports.length} Reports`);
      replyText = `There are currently **${citizenReports.length} simulated citizen reports** on record:

` + citizenReports.map(cr => `• **${cr.id}** [${cr.category}]: ${cr.location} — "${cr.pollutionObservation}" (${cr.status})`).join('\n') +
      `\n\nCitizen reports are geocoded and linked to nearby DBSCAN clusters to assist field task force verification.`;
    } else {
      groundedSources.push('Delhi-NCR Spatial Telemetry Mesh', 'AirWatch Core Knowledge Base');
      const avgAqi = Math.round(stations.reduce((acc, s) => acc + s.aqi, 0) / stations.length);
      replyText = `Here is the current environmental summary for Delhi-NCR:

- **Regional Average AQI**: **${avgAqi}** across 8 CAAQMS monitoring stations.
- **Active Hotspot Clusters**: **${hotspots.length} detected** (including Sahibabad, Anand Vihar, and Northwest Delhi).
- **Active Incident Tracker**: **${complaints.length} environmental dossiers** (${complaints.filter(c => c.currentStatus !== 'Resolved').length} currently active).
- **Citizen Reports**: **${citizenReports.length} verified submissions**.

You can ask me specific questions like:
- *"Why is Ghaziabad currently flagged?"*
- *"What is the probable source of the Noida hotspot?"*
- *"Which area has the highest PM2.5?"*
- *"What evidence supports the Ghaziabad attribution?"*
- *"What complaints are still unresolved?"*`;
    }

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        groundedSources
      };
      setChatMessages(prev => [...prev, assistantMsg]);
    }, 450);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        hotspots,
        stations,
        sourceZones,
        complaints,
        citizenReports,
        addCitizenReport,
        selectedStationId,
        setSelectedStationId,
        selectedHotspotId,
        setSelectedHotspotId,
        selectedComplaintId,
        setSelectedComplaintId,
        activeDemo,
        triggerDemoIncident,
        resetToBaseline,
        isDBSCANRunning,
        runDBSCANClustering,
        generateComplaintFromHotspot,
        advanceComplaintStatus,
        notification,
        dismissNotification,
        selectedHotspot,
        selectedComplaint,
        currentTime,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        chatMessages,
        sendChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
