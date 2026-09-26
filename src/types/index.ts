export type SeverityLevel = 'Moderate' | 'Poor' | 'Very Poor' | 'Severe' | 'Hazardous';

export type LifecycleStatus = 
  | 'Detected'
  | 'Flagged'
  | 'Report Generated'
  | 'Prepared for Submission'
  | 'Investigating'
  | 'Action Taken'
  | 'Resolved';

export interface AttributionEvidence {
  title: string;
  description: string;
  metricValue: string;
  confidenceContribution: string;
  indicatorType: 'chemical' | 'meteorological' | 'proximity' | 'satellite' | 'historical';
}

export interface EstimatedSourceContribution {
  source: string;
  percentage: number;
  color: string;
}

export interface Hotspot {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co?: number;
  o3?: number;
  severity: SeverityLevel;
  detectedTime: string;
  probableSource: string;
  confidence: number; // 0 - 100
  status: LifecycleStatus;
  radiusMeters: number;
  windDirection: string;
  windAzimuthDeg: number;
  windSpeedKmh: number;
  clusterSensorCount: number;
  evidence: AttributionEvidence[];
  estimatedContributions: EstimatedSourceContribution[];
  nearestKnownSource: string;
  distanceToSourceKm: number;
  isSimulatedDemoIncident?: boolean;
}

export interface MonitoringStation {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  status: 'Active' | 'Calibrating' | 'Anomaly';
  lastUpdated: string;
}

export interface SourceZone {
  id: string;
  name: string;
  category: 'Industrial' | 'Traffic Corridor' | 'Agricultural Belt' | 'Construction Hub';
  lat: number;
  lng: number;
  radiusMeters: number;
  primaryEmissions: string[];
  description: string;
}

export interface ComplaintAuditItem {
  id: string;
  status: LifecycleStatus;
  timestamp: string;
  actor: string;
  note: string;
}

export interface EnvironmentalComplaint {
  id: string;
  hotspotId: string;
  location: string;
  district: string;
  issue: string;
  narrative: string;
  probableSource: string;
  severity: SeverityLevel;
  createdDate: string;
  currentStatus: LifecycleStatus;
  recommendedAuthority: string;
  evidenceSummary: string[];
  sensorMetrics: {
    aqi: number;
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
  };
  windVector: {
    direction: string;
    speedKmh: number;
  };
  auditHistory: ComplaintAuditItem[];
  resolutionNotes?: string;
  isPrototype: boolean;
}

export interface DemoIncidentPreset {
  id: 'ghaziabad_industrial' | 'northwest_agri' | 'anand_vihar_traffic';
  title: string;
  location: string;
  district: string;
  affectedPollutants: string;
  description: string;
  targetHotspotId: string;
  probableSource: string;
  badgeColor: string;
}

export type CitizenReportCategory = 
  | 'Smoke'
  | 'Dust'
  | 'Industrial emission'
  | 'Burning'
  | 'Traffic pollution'
  | 'Other';

export interface CitizenReport {
  id: string;
  location: string;
  dateTime: string;
  pollutionObservation: string;
  description: string;
  category: CitizenReportCategory;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  relatedHotspotId?: string;
  status: 'Verified' | 'Pending Review' | 'Investigating';
  isPrototype: boolean;
}

export interface ForecastDataPoint {
  timestamp: string;
  hourOffset: number;
  hourLabel: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2?: number;
  so2?: number;
  type: 'observed' | 'predicted';
  horizonLabel?: '6-Hour' | '12-Hour' | '24-Hour' | '48-Hour';
}

export interface StationForecast {
  stationId: string;
  stationName: string;
  district: string;
  dataPoints: ForecastDataPoint[];
  inversionRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  boundaryLayerHeightMeters: number;
  windSpeedTrendKmh: number;
  modelConfidence: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundedSources?: string[];
}

