import {
  Hotspot,
  MonitoringStation,
  SourceZone,
  EnvironmentalComplaint,
  DemoIncidentPreset,
  CitizenReport,
  StationForecast,
  ForecastDataPoint
} from '../types';

export const INITIAL_STATIONS: MonitoringStation[] = [
  {
    id: 'UP-GHZ-SB',
    name: 'Sahibabad CAAQMS',
    district: 'Ghaziabad',
    lat: 28.6732,
    lng: 77.3582,
    aqi: 382,
    pm25: 236,
    pm10: 360,
    no2: 68,
    so2: 54,
    status: 'Active',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'DL-ANV',
    name: 'Anand Vihar Eco-Station',
    district: 'Delhi (East)',
    lat: 28.6502,
    lng: 77.3150,
    aqi: 412,
    pm25: 284,
    pm10: 440,
    no2: 98,
    so2: 28,
    status: 'Active',
    lastUpdated: '2 mins ago'
  },
  {
    id: 'DL-ALIP',
    name: 'Alipur Agro-Corridor Station',
    district: 'Northwest Delhi',
    lat: 28.7983,
    lng: 77.1325,
    aqi: 368,
    pm25: 248,
    pm10: 330,
    no2: 42,
    so2: 18,
    status: 'Active',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'UP-NOI-62',
    name: 'Sector 62 Ambient Station',
    district: 'Noida',
    lat: 28.6258,
    lng: 77.3622,
    aqi: 298,
    pm25: 165,
    pm10: 280,
    no2: 55,
    so2: 22,
    status: 'Active',
    lastUpdated: '7 mins ago'
  },
  {
    id: 'UP-GNOI-KP',
    name: 'Knowledge Park III Station',
    district: 'Greater Noida',
    lat: 28.4682,
    lng: 77.4981,
    aqi: 275,
    pm25: 142,
    pm10: 255,
    no2: 44,
    so2: 16,
    status: 'Active',
    lastUpdated: '12 mins ago'
  },
  {
    id: 'HR-FAR-16',
    name: 'Sector 16 NIT Station',
    district: 'Faridabad',
    lat: 28.4089,
    lng: 77.3178,
    aqi: 334,
    pm25: 198,
    pm10: 310,
    no2: 62,
    so2: 48,
    status: 'Active',
    lastUpdated: '4 mins ago'
  },
  {
    id: 'HR-GGN-VS',
    name: 'Vikas Sadan Station',
    district: 'Gurugram',
    lat: 28.4595,
    lng: 77.0266,
    aqi: 284,
    pm25: 154,
    pm10: 260,
    no2: 74,
    so2: 20,
    status: 'Active',
    lastUpdated: '15 mins ago'
  },
  {
    id: 'DL-RKP',
    name: 'RK Puram Urban Station',
    district: 'Central/South Delhi',
    lat: 28.5660,
    lng: 77.1767,
    aqi: 310,
    pm25: 178,
    pm10: 290,
    no2: 60,
    so2: 24,
    status: 'Active',
    lastUpdated: '8 mins ago'
  }
];

export const INITIAL_SOURCE_ZONES: SourceZone[] = [
  {
    id: 'ZONE-IND-GHZ',
    name: 'Sahibabad & Loni Industrial Cluster',
    category: 'Industrial',
    lat: 28.6810,
    lng: 77.3690,
    radiusMeters: 4500,
    primaryEmissions: ['SO2 (Boilers & Kilns)', 'PM2.5 / PM10 (Combustion)', 'Unregulated Furnaces'],
    description: 'Concentrated metallurgical rolling mills, chemical processors, and furnace oil combustion units.'
  },
  {
    id: 'ZONE-TRF-ANV',
    name: 'Anand Vihar Inter-State Transit Gridlock',
    category: 'Traffic Corridor',
    lat: 28.6480,
    lng: 77.3110,
    radiusMeters: 3000,
    primaryEmissions: ['NO2 (Heavy Commercial Diesels)', 'PM2.5 (Exhaust soot)', 'Idling Buses & Freight Trucks'],
    description: 'Major tri-state intermodal bus depot, freight bypass bottleneck, and high-density idling corridor.'
  },
  {
    id: 'ZONE-AGR-NWD',
    name: 'Northwest Peri-Urban Farm Ingress Zone',
    category: 'Agricultural Belt',
    lat: 28.8250,
    lng: 77.1050,
    radiusMeters: 6000,
    primaryEmissions: ['Fine Organic Carbon (Biomass Smoke)', 'PM2.5 / Carbon Monoxide', 'Ammonia traces'],
    description: 'Post-harvest stubble burning drift corridor entering Delhi via north-westerly atmospheric boundary flows.'
  },
  {
    id: 'ZONE-CST-GNOI',
    name: 'Greater Noida Expressway Infrastructure Hub',
    category: 'Construction Hub',
    lat: 28.4850,
    lng: 77.4720,
    radiusMeters: 3800,
    primaryEmissions: ['Coarse PM10 (Silica Dust)', 'Soil resuspension', 'Cement batching emissions'],
    description: 'High-speed metro expansion, residential high-rise civil works, and unpaved arterial road dust.'
  },
  {
    id: 'ZONE-IND-FAR',
    name: 'Faridabad New Industrial Township (NIT)',
    category: 'Industrial',
    lat: 28.3980,
    lng: 77.3050,
    radiusMeters: 4000,
    primaryEmissions: ['Metal Casting & Forging Smoke', 'SO2 & NOx', 'Diesel generator clusters'],
    description: 'Heavy machinery fabrication, electroplating, and captive diesel generator reliance during peak grid hours.'
  }
];

export const INITIAL_HOTSPOTS: Hotspot[] = [
  {
    id: 'HS-GHZ-01',
    name: 'Sahibabad Industrial Area Sector 4',
    district: 'Ghaziabad',
    lat: 28.6750,
    lng: 77.3620,
    aqi: 395,
    pm25: 248,
    pm10: 380,
    no2: 72,
    so2: 58,
    co: 3.2,
    o3: 42,
    severity: 'Severe',
    detectedTime: '18 minutes ago',
    probableSource: 'Industrial emissions',
    confidence: 82,
    status: 'Detected',
    radiusMeters: 3200,
    windDirection: 'ESE (115°)',
    windAzimuthDeg: 115,
    windSpeedKmh: 9,
    clusterSensorCount: 5,
    nearestKnownSource: 'Sahibabad Industrial Cluster Area',
    distanceToSourceKm: 0.8,
    evidence: [
      {
        title: 'Elevated SO2 Chemical Signature',
        description: 'Sensor network recorded 58 ppb SO2 (3.6x regional baseline), strongly characteristic of heavy fuel oil / non-compliant coal boilers.',
        metricValue: '58 ppb (3.6x baseline)',
        confidenceContribution: '+32%',
        indicatorType: 'chemical'
      },
      {
        title: 'Direct Downwind Plume Trajectory',
        description: 'Micro-meteorological telemetry indicates wind flowing ESE (115°) at 9 km/h directly from unregulated foundry clusters toward the residential boundary.',
        metricValue: 'ESE at 9 km/h (Aligned)',
        confidenceContribution: '+26%',
        indicatorType: 'meteorological'
      },
      {
        title: 'Immediate Industrial Proximity',
        description: 'Located within 800m of 42 registered metal forging and chemical processing plants.',
        metricValue: '0.8 km distance',
        confidenceContribution: '+14%',
        indicatorType: 'proximity'
      },
      {
        title: 'Night-to-Morning Diurnal Persistence',
        description: 'Historical pattern matches covert batch emissions during low-boundary inversion hours (02:00 - 07:30 IST).',
        metricValue: 'Pattern correlation 0.89',
        confidenceContribution: '+10%',
        indicatorType: 'historical'
      }
    ],
    estimatedContributions: [
      { source: 'Industrial emissions', percentage: 68, color: '#f87171' },
      { source: 'Freight traffic (NH-9 bypass)', percentage: 18, color: '#fb923c' },
      { source: 'Road & construction dust', percentage: 14, color: '#facc15' }
    ]
  },
  {
    id: 'HS-ANV-02',
    name: 'Anand Vihar ISBT & Terminal Corridor',
    district: 'Delhi (East)',
    lat: 28.6502,
    lng: 77.3150,
    aqi: 425,
    pm25: 295,
    pm10: 460,
    no2: 104,
    so2: 26,
    co: 4.8,
    o3: 38,
    severity: 'Hazardous',
    detectedTime: '32 minutes ago',
    probableSource: 'Freight traffic gridlock',
    confidence: 86,
    status: 'Report Generated',
    radiusMeters: 2800,
    windDirection: 'NE (45°)',
    windAzimuthDeg: 45,
    windSpeedKmh: 6,
    clusterSensorCount: 6,
    nearestKnownSource: 'Anand Vihar ISBT & Kaushambi Transit Node',
    distanceToSourceKm: 0.3,
    evidence: [
      {
        title: 'Extreme NO2 Exceedance',
        description: 'NO2 peaked at 104 ppb, a definitive marker of continuous heavy diesel exhaust and prolonged engine idling.',
        metricValue: '104 ppb (Extreme)',
        confidenceContribution: '+38%',
        indicatorType: 'chemical'
      },
      {
        title: 'Traffic Camera & Congestion Congruence',
        description: 'Simulated transit telemetry confirms 4.2 km tailback of non-destined freight and inter-state sleeper buses.',
        metricValue: 'Gridlock index 92/100',
        confidenceContribution: '+28%',
        indicatorType: 'proximity'
      },
      {
        title: 'High PM10 Soil Resuspension',
        description: 'Unpaved bus terminal shoulders contributing heavy coarse particulate matter alongside diesel soot.',
        metricValue: 'PM10: 460 µg/m³',
        confidenceContribution: '+20%',
        indicatorType: 'chemical'
      }
    ],
    estimatedContributions: [
      { source: 'Freight & bus diesel traffic', percentage: 62, color: '#fb923c' },
      { source: 'Unpaved road resuspension', percentage: 24, color: '#facc15' },
      { source: 'Regional background haze', percentage: 14, color: '#94a3b8' }
    ]
  },
  {
    id: 'HS-NWD-03',
    name: 'Alipur - Narela Ingress Gateway',
    district: 'Northwest Delhi',
    lat: 28.8050,
    lng: 77.1280,
    aqi: 375,
    pm25: 255,
    pm10: 320,
    no2: 44,
    so2: 16,
    co: 3.8,
    o3: 28,
    severity: 'Severe',
    detectedTime: '1 hour ago',
    probableSource: 'Agricultural burning',
    confidence: 79,
    status: 'Flagged',
    radiusMeters: 4200,
    windDirection: 'NW (310°)',
    windAzimuthDeg: 310,
    windSpeedKmh: 14,
    clusterSensorCount: 4,
    nearestKnownSource: 'Peri-urban crop residue burning belt',
    distanceToSourceKm: 4.5,
    evidence: [
      {
        title: 'Very High PM2.5 to PM10 Ratio',
        description: 'PM2.5 accounts for 80% of total particulate mass, an established indicator of fresh biomass smoke combustion.',
        metricValue: 'Ratio: 0.80 (Biomass fingerprint)',
        confidenceContribution: '+35%',
        indicatorType: 'chemical'
      },
      {
        title: 'North-Westerly Wind Drift Vector',
        description: 'Wind speed of 14 km/h along the 310° azimuth directly transports transboundary agricultural plumes into the NCT boundary.',
        metricValue: 'NW (310°) at 14 km/h',
        confidenceContribution: '+30%',
        indicatorType: 'meteorological'
      },
      {
        title: 'Simulated VIIRS Thermal Anomaly Clusters',
        description: '38 simulated satellite fire pixel hotspots detected upwind in contiguous rural blocks within past 12h.',
        metricValue: '38 thermal anomalies',
        confidenceContribution: '+14%',
        indicatorType: 'satellite'
      }
    ],
    estimatedContributions: [
      { source: 'Agricultural biomass burning', percentage: 71, color: '#fbbf24' },
      { source: 'Local diesel transport', percentage: 17, color: '#fb923c' },
      { source: 'Municipal waste combustion', percentage: 12, color: '#f87171' }
    ]
  },
  {
    id: 'HS-GNOI-04',
    name: 'Knowledge Park & Expressway Civil Corridor',
    district: 'Greater Noida',
    lat: 28.4720,
    lng: 77.4890,
    aqi: 295,
    pm25: 152,
    pm10: 310,
    no2: 46,
    so2: 14,
    co: 2.1,
    o3: 34,
    severity: 'Poor',
    detectedTime: '2 hours ago',
    probableSource: 'Construction & road dust',
    confidence: 76,
    status: 'Investigating',
    radiusMeters: 2500,
    windDirection: 'W (270°)',
    windAzimuthDeg: 270,
    windSpeedKmh: 8,
    clusterSensorCount: 3,
    nearestKnownSource: 'Commercial construction & highway widening sites',
    distanceToSourceKm: 0.6,
    evidence: [
      {
        title: 'Dominant Coarse PM10 Fraction',
        description: 'PM10 is more than double PM2.5, indicating mechanical grinding, unmitigated earth excavation, and dry aggregate handling.',
        metricValue: 'PM10: 310 vs PM2.5: 152',
        confidenceContribution: '+40%',
        indicatorType: 'chemical'
      },
      {
        title: 'Uncovered Transit & Earthmoving Activities',
        description: 'Active major infrastructure footprint within 600m lacking required mist cannon suppression.',
        metricValue: '0.6 km distance',
        confidenceContribution: '+24%',
        indicatorType: 'proximity'
      }
    ],
    estimatedContributions: [
      { source: 'Construction & road dust', percentage: 65, color: '#eab308' },
      { source: 'Expressway vehicular exhaust', percentage: 22, color: '#fb923c' },
      { source: 'Regional background dust', percentage: 13, color: '#94a3b8' }
    ]
  },
  {
    id: 'HS-FAR-05',
    name: 'Faridabad NIT Industrial Sector 24',
    district: 'Faridabad',
    lat: 28.3850,
    lng: 77.3020,
    aqi: 340,
    pm25: 205,
    pm10: 315,
    no2: 66,
    so2: 46,
    co: 2.9,
    o3: 31,
    severity: 'Very Poor',
    detectedTime: '3 hours ago',
    probableSource: 'Industrial emissions',
    confidence: 80,
    status: 'Action Taken',
    radiusMeters: 3000,
    windDirection: 'SW (225°)',
    windAzimuthDeg: 225,
    windSpeedKmh: 7,
    clusterSensorCount: 4,
    nearestKnownSource: 'Foundry & Diesel Generator Cluster',
    distanceToSourceKm: 1.1,
    evidence: [
      {
        title: 'Sustained High SO2 Concentration',
        description: 'Secondary emission peak matching industrial shift change and generator operation.',
        metricValue: '46 ppb SO2',
        confidenceContribution: '+34%',
        indicatorType: 'chemical'
      },
      {
        title: 'Proximity to Unregulated Electroplating Units',
        description: 'Dense concentration of small-scale metal treatment shops within 1.1km radius.',
        metricValue: '1.1 km to units',
        confidenceContribution: '+26%',
        indicatorType: 'proximity'
      }
    ],
    estimatedContributions: [
      { source: 'Industrial emissions & DG sets', percentage: 59, color: '#f87171' },
      { source: 'Traffic on Mathura Road', percentage: 25, color: '#fb923c' },
      { source: 'Road dust resuspension', percentage: 16, color: '#facc15' }
    ]
  }
];

export const INITIAL_COMPLAINTS: EnvironmentalComplaint[] = [
  {
    id: 'NCR-2026-GHZ-0089',
    hotspotId: 'HS-GHZ-01',
    location: 'Sahibabad Industrial Area Sector 4, Ghaziabad',
    district: 'Ghaziabad',
    issue: 'High SO2 & PM2.5 Atmospheric Exceedance - Probable Industrial Boiler Emissions',
    narrative: 'Automated clustering detected a localized severe anomaly in Sahibabad. Spatial-temporal sensor correlation reveals SO2 values at 58 ppb (3.6x regional baseline) accompanied by elevated PM2.5 (248 µg/m³). Wind vectors align downwind from non-compliant industrial furnace zones toward residential Kaushambi/Vasundhara borders.',
    probableSource: 'Industrial emissions (Estimated 68% contribution)',
    severity: 'Severe',
    createdDate: 'Today, 08:35 IST',
    currentStatus: 'Detected',
    recommendedAuthority: 'UPPCB Regional Office, Ghaziabad / CAQM Flying Squad',
    evidenceSummary: [
      'SO2: 58 ppb (3.6x baseline threshold)',
      'PM2.5: 248 µg/m³ (Severe category)',
      'Downwind plume from ESE at 9 km/h',
      'Within 800m of heavy metallurgy & boiler units'
    ],
    sensorMetrics: {
      aqi: 395,
      pm25: 248,
      pm10: 380,
      no2: 72,
      so2: 58
    },
    windVector: {
      direction: 'ESE (115°)',
      speedKmh: 9
    },
    isPrototype: true,
    auditHistory: [
      {
        id: 'aud-001',
        status: 'Detected',
        timestamp: 'Today, 08:35 IST',
        actor: 'AirWatch Spatial Clustering Engine (DBSCAN ε=3.2km)',
        note: 'Prototype anomaly detection flagged severe persistent particulate and chemical exceedance.'
      }
    ]
  },
  {
    id: 'NCR-2026-ANV-0084',
    hotspotId: 'HS-ANV-02',
    location: 'Anand Vihar ISBT & Transit Hub, Delhi (East)',
    district: 'Delhi (East)',
    issue: 'Hazardous Diesel Soot & NO2 Multi-Point Gridlock',
    narrative: 'CAAQMS Anand Vihar and 5 satellite optical nodes triggered acute alerts. Extreme NO2 level of 104 ppb coupled with PM2.5 of 295 µg/m³. Correlates with prolonged freight truck idling, inter-state bus queue spillover, and unpaved depot dust.',
    probableSource: 'Freight traffic gridlock (Estimated 62% contribution)',
    severity: 'Hazardous',
    createdDate: 'Yesterday, 19:40 IST',
    currentStatus: 'Report Generated',
    recommendedAuthority: 'Delhi Pollution Control Committee (DPCC) & Delhi Traffic Police',
    evidenceSummary: [
      'NO2: 104 ppb (Severe diesel combustion marker)',
      'PM2.5: 295 µg/m³ (Hazardous category)',
      'Congestion index at 92% along Ghazipur border arterial'
    ],
    sensorMetrics: {
      aqi: 425,
      pm25: 295,
      pm10: 460,
      no2: 104,
      so2: 26
    },
    windVector: {
      direction: 'NE (45°)',
      speedKmh: 6
    },
    isPrototype: true,
    auditHistory: [
      {
        id: 'aud-010',
        status: 'Detected',
        timestamp: 'Yesterday, 19:40 IST',
        actor: 'AirWatch Sensor Network',
        note: 'Automated alarm triggered for Hazardous AQI.'
      },
      {
        id: 'aud-011',
        status: 'Flagged',
        timestamp: 'Yesterday, 20:05 IST',
        actor: 'Citizen Science Validator (Simulated)',
        note: 'Tri-station agreement verified. High NO2 signature confirmed.'
      },
      {
        id: 'aud-012',
        status: 'Report Generated',
        timestamp: 'Yesterday, 20:30 IST',
        actor: 'AirWatch Evidence Compiler',
        note: 'Prototype complaint dossier compiled with atmospheric dispersal mapping.'
      }
    ]
  },
  {
    id: 'NCR-2026-FAR-0077',
    hotspotId: 'HS-FAR-05',
    location: 'Faridabad Sector 24 Industrial Area',
    district: 'Faridabad',
    issue: 'Unfiltered Foundry Stack Smoke & Captive DG Set Emissions',
    narrative: 'Persistent nocturnal particulate spikes with elevated SO2 (46 ppb). Investigation confirmed unauthorized backup diesel generators and lack of wet scrubber maintenance.',
    probableSource: 'Industrial emissions & DG sets (Estimated 59% contribution)',
    severity: 'Very Poor',
    createdDate: '3 days ago',
    currentStatus: 'Action Taken',
    recommendedAuthority: 'Haryana State Pollution Control Board (HSPCB)',
    evidenceSummary: [
      'Night-time spike of PM2.5 exceeding 200 µg/m³',
      'SO2 baseline elevated 2.8x during power cut windows',
      'Inspection documented 4 non-compliant industrial chimneys'
    ],
    sensorMetrics: {
      aqi: 340,
      pm25: 205,
      pm10: 315,
      no2: 66,
      so2: 46
    },
    windVector: {
      direction: 'SW (225°)',
      speedKmh: 7
    },
    isPrototype: true,
    auditHistory: [
      {
        id: 'aud-020',
        status: 'Detected',
        timestamp: '3 days ago, 11:00 IST',
        actor: 'AirWatch Clustering Engine',
        note: 'Cluster identified at NIT Sector 24.'
      },
      {
        id: 'aud-021',
        status: 'Flagged',
        timestamp: '3 days ago, 12:15 IST',
        actor: 'Accountability Lead',
        note: 'Flagged for environmental audit.'
      },
      {
        id: 'aud-022',
        status: 'Report Generated',
        timestamp: '3 days ago, 14:00 IST',
        actor: 'Automated Dossier Generator',
        note: 'Dossier generated with sensor traces.'
      },
      {
        id: 'aud-023',
        status: 'Prepared for Submission',
        timestamp: '3 days ago, 16:30 IST',
        actor: 'Prototype Compliance Desk',
        note: 'Dossier verified and prepared for HSPCB portal filing.'
      },
      {
        id: 'aud-024',
        status: 'Investigating',
        timestamp: '2 days ago, 10:00 IST',
        actor: 'Simulated Enforcement Team',
        note: 'Field officers dispatched to survey sector 24 units.'
      },
      {
        id: 'aud-025',
        status: 'Action Taken',
        timestamp: 'Yesterday, 15:30 IST',
        actor: 'Simulated Enforcement Team',
        note: 'Show-cause notices issued to 3 foundry units; operation of 500kVA unretrofitted DG set halted.'
      }
    ],
    resolutionNotes: 'Inspection team recorded sealing of 2 non-compliant DG sets. Follow-up sensor checks show 28% drop in localized SO2.'
  },
  {
    id: 'NCR-2026-NWD-0062',
    hotspotId: 'HS-NWD-03',
    location: 'Bawana-Narela Agro-Industrial Boundary',
    district: 'Northwest Delhi',
    issue: 'Crop Stubble Burning & Plastic Scrap Ingress',
    narrative: 'Seasonal farm fire ingress compounded by night-time plastic waste combustion in open storm drains.',
    probableSource: 'Agricultural biomass & waste burning',
    severity: 'Severe',
    createdDate: '5 days ago',
    currentStatus: 'Resolved',
    recommendedAuthority: 'MCD North / Delhi Rural Revenue Administration',
    evidenceSummary: [
      'High optical black carbon reading',
      'Satellite fire anomaly alignment within 6km buffer',
      'Post-mitigation CAAQMS levels dropped back to moderate'
    ],
    sensorMetrics: {
      aqi: 210,
      pm25: 110,
      pm10: 190,
      no2: 38,
      so2: 14
    },
    windVector: {
      direction: 'WNW (295°)',
      speedKmh: 11
    },
    isPrototype: true,
    auditHistory: [
      {
        id: 'aud-030',
        status: 'Detected',
        timestamp: '5 days ago, 07:00 IST',
        actor: 'AirWatch Clustering Engine',
        note: 'Detected severe agricultural ingress.'
      },
      {
        id: 'aud-031',
        status: 'Flagged',
        timestamp: '5 days ago, 08:30 IST',
        actor: 'System Operator',
        note: 'Flagged for swift rural patrol.'
      },
      {
        id: 'aud-032',
        status: 'Report Generated',
        timestamp: '5 days ago, 09:15 IST',
        actor: 'Evidence Compiler',
        note: 'Formal dossier compiled.'
      },
      {
        id: 'aud-033',
        status: 'Prepared for Submission',
        timestamp: '5 days ago, 11:00 IST',
        actor: 'Prototype Compliance Desk',
        note: 'Prepared for District Magistrate agricultural enforcement cell.'
      },
      {
        id: 'aud-034',
        status: 'Investigating',
        timestamp: '4 days ago, 09:30 IST',
        actor: 'Patrol Officer (Simulated)',
        note: 'Field patrol conducted across Alipur & Narela canal banks.'
      },
      {
        id: 'aud-035',
        status: 'Action Taken',
        timestamp: '4 days ago, 16:00 IST',
        actor: 'Rapid Response Team (Simulated)',
        note: 'Extinguished 4 open farm residue fires; mobile water tankers deployed for dust and smoke suppression.'
      },
      {
        id: 'aud-036',
        status: 'Resolved',
        timestamp: '2 days ago, 18:00 IST',
        actor: 'AirWatch Telemetry Verification',
        note: 'Post-action sensor telemetry confirms PM2.5 normalized to 110 µg/m³. Incident formally resolved.'
      }
    ],
    resolutionNotes: 'Field dousing completed. Local CAAQMS station shows sustained 52% reduction in PM2.5 over 48 hours.'
  }
];

export const DEMO_PRESETS: DemoIncidentPreset[] = [
  {
    id: 'ghaziabad_industrial',
    title: 'Industrial Emission Spike',
    location: 'Sahibabad Industrial Area, Ghaziabad',
    district: 'Ghaziabad',
    affectedPollutants: 'PM2.5 ↑ (+125 µg/m³) | SO2 ↑ (+48 ppb)',
    description: 'Simulates a sudden nocturnal release of unfiltered industrial stack emissions and furnace oil combustion in Sahibabad Sector 4.',
    targetHotspotId: 'HS-GHZ-01',
    probableSource: 'Industrial emissions',
    badgeColor: 'red'
  },
  {
    id: 'northwest_agri',
    title: 'Agricultural Burning Ingress',
    location: 'Alipur - Narela Corridor, Northwest Delhi',
    district: 'Northwest Delhi',
    affectedPollutants: 'PM2.5 ↑ (+140 µg/m³) | PM2.5/PM10 Ratio > 0.85',
    description: 'Simulates post-harvest biomass burning smoke ingress transported by sustained 14 km/h North-Westerly boundary layer winds.',
    targetHotspotId: 'HS-NWD-03',
    probableSource: 'Agricultural burning',
    badgeColor: 'amber'
  },
  {
    id: 'anand_vihar_traffic',
    title: 'Freight Traffic Gridlock',
    location: 'Anand Vihar ISBT & Terminal, East Delhi',
    district: 'Delhi (East)',
    affectedPollutants: 'PM2.5 ↑ (+95 µg/m³) | NO2 ↑ (+45 ppb)',
    description: 'Simulates heavy commercial diesel vehicle congestion and idling queue along the Ghazipur border intermodal corridor.',
    targetHotspotId: 'HS-ANV-02',
    probableSource: 'Freight traffic gridlock',
    badgeColor: 'orange'
  }
];

export const INITIAL_CITIZEN_REPORTS: CitizenReport[] = [
  {
    id: 'CR-GHZ-101',
    location: 'Sahibabad Industrial Area Sector 4, near Railway Siding',
    dateTime: 'Today, 08:15 IST',
    pollutionObservation: 'Dense dark acrid smoke plume from metal forging stack',
    description: 'Continuous heavy smoke discharge with strong pungent sulfur smell causing eye burning. Plant operating without scrubber wet-wash cycle.',
    category: 'Industrial emission',
    coordinates: { lat: 28.6770, lng: 77.3645 },
    relatedHotspotId: 'HS-GHZ-01',
    status: 'Verified',
    isPrototype: true
  },
  {
    id: 'CR-ANV-102',
    location: 'Anand Vihar ISBT Departure Flyover Bottleneck',
    dateTime: 'Today, 07:45 IST',
    pollutionObservation: 'Commercial diesel bus idling queue & dense exhaust fog',
    description: 'Over 45 inter-state sleeper buses trapped in gridlock with continuous exhaust. High particulate soot settling on storefronts.',
    category: 'Traffic pollution',
    coordinates: { lat: 28.6510, lng: 77.3160 },
    relatedHotspotId: 'HS-ANV-02',
    status: 'Verified',
    isPrototype: true
  },
  {
    id: 'CR-NWD-103',
    location: 'Alipur GT Karnal Canal Road Perimeter',
    dateTime: 'Yesterday, 18:30 IST',
    pollutionObservation: 'Open agricultural stubble combustion across multiple plots',
    description: 'Pungent straw smoke drifting directly across the outer Delhi bypass. Low visibility down to 250 meters.',
    category: 'Burning',
    coordinates: { lat: 28.8040, lng: 77.1290 },
    relatedHotspotId: 'HS-NWD-03',
    status: 'Verified',
    isPrototype: true
  },
  {
    id: 'CR-GNOI-104',
    location: 'Greater Noida Expressway Sector 132 Junction',
    dateTime: 'Yesterday, 14:10 IST',
    pollutionObservation: 'Uncovered earth excavation & dry aggregate hauling',
    description: 'Construction tippers operating without water misting or tarpaulin covering, generating continuous dust plumes.',
    category: 'Dust',
    coordinates: { lat: 28.4735, lng: 77.4875 },
    relatedHotspotId: 'HS-GNOI-04',
    status: 'Investigating',
    isPrototype: true
  }
];

export const getStationForecast = (station: MonitoringStation): StationForecast => {
  const baseAqi = station.aqi;
  const basePm25 = station.pm25;
  const basePm10 = station.pm10;

  // Historical observed points (past 24h)
  const observed: ForecastDataPoint[] = [
    {
      timestamp: '24h ago',
      hourOffset: -24,
      hourLabel: '-24h',
      aqi: Math.round(baseAqi * 0.88),
      pm25: Math.round(basePm25 * 0.85),
      pm10: Math.round(basePm10 * 0.89),
      type: 'observed'
    },
    {
      timestamp: '18h ago',
      hourOffset: -18,
      hourLabel: '-18h',
      aqi: Math.round(baseAqi * 0.94),
      pm25: Math.round(basePm25 * 0.92),
      pm10: Math.round(basePm10 * 0.95),
      type: 'observed'
    },
    {
      timestamp: '12h ago',
      hourOffset: -12,
      hourLabel: '-12h',
      aqi: Math.round(baseAqi * 1.05),
      pm25: Math.round(basePm25 * 1.08),
      pm10: Math.round(basePm10 * 1.04),
      type: 'observed'
    },
    {
      timestamp: '6h ago',
      hourOffset: -6,
      hourLabel: '-6h',
      aqi: Math.round(baseAqi * 0.98),
      pm25: Math.round(basePm25 * 0.97),
      pm10: Math.round(basePm10 * 0.99),
      type: 'observed'
    },
    {
      timestamp: 'Now (Observed)',
      hourOffset: 0,
      hourLabel: 'Current',
      aqi: baseAqi,
      pm25: basePm25,
      pm10: basePm10,
      type: 'observed'
    }
  ];

  // Predicted future points (+6h, +12h, +24h, +48h)
  const predicted: ForecastDataPoint[] = [
    {
      timestamp: 'In 6 hours',
      hourOffset: 6,
      hourLabel: '+6h',
      aqi: Math.round(baseAqi * 1.12),
      pm25: Math.round(basePm25 * 1.15),
      pm10: Math.round(basePm10 * 1.10),
      type: 'predicted',
      horizonLabel: '6-Hour'
    },
    {
      timestamp: 'In 12 hours',
      hourOffset: 12,
      hourLabel: '+12h',
      aqi: Math.round(baseAqi * 1.22),
      pm25: Math.round(basePm25 * 1.26),
      pm10: Math.round(basePm10 * 1.18),
      type: 'predicted',
      horizonLabel: '12-Hour'
    },
    {
      timestamp: 'In 24 hours',
      hourOffset: 24,
      hourLabel: '+24h',
      aqi: Math.round(baseAqi * 1.08),
      pm25: Math.round(basePm25 * 1.06),
      pm10: Math.round(basePm10 * 1.12),
      type: 'predicted',
      horizonLabel: '24-Hour'
    },
    {
      timestamp: 'In 48 hours',
      hourOffset: 48,
      hourLabel: '+48h',
      aqi: Math.round(baseAqi * 0.92),
      pm25: Math.round(basePm25 * 0.89),
      pm10: Math.round(basePm10 * 0.95),
      type: 'predicted',
      horizonLabel: '48-Hour'
    }
  ];

  return {
    stationId: station.id,
    stationName: station.name,
    district: station.district,
    dataPoints: [...observed, ...predicted],
    inversionRisk: baseAqi > 400 ? 'Severe' : baseAqi > 320 ? 'High' : 'Moderate',
    boundaryLayerHeightMeters: baseAqi > 400 ? 320 : 480,
    windSpeedTrendKmh: 7.5,
    modelConfidence: 84
  };
};

