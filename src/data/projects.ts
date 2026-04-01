export interface Project {
  id: number | string;
  title: string;
  category: string;
  description: string;
  client?: string;
  problem?: string;
  result?: string;
  details?: string;
  tools?: string[];
  sections?: { title: string; content: string }[];
  links?: { github: string; live: string };
  hsCode?: string;
}

export const categories = [
  'Security & Access',
  'AI/ML & Vision',
  'Robotics & Automation',
  'IoT & Wireless',
  'Biomedical & Agri',
  'Power & Electrical',
  'Web & Software',
  'Others'
];

export const projects: Project[] = [
  // --- Security & Access ---
  {
    id: 'HS-SEC001',
    hsCode: 'HS-SEC001',
    title: 'Biometric Door Unlock with SMS Notification',
    category: 'Security & Access',
    description: 'Advanced biometric entry system using Raspberry Pi Pico with integrated GSM alerting.',
    client: 'Residential Security',
    problem: 'Traditional locks are vulnerable and lack real-time intrusion alerts.',
    result: 'Zero unauthorized entries recorded; instant SMS alerts within 2 seconds of tampering.'
  },
  {
    id: 'HS-SEC002',
    hsCode: 'HS-SEC002',
    title: 'Facial Recognition Home Entry System',
    category: 'Security & Access',
    description: 'Raspberry Pi powered face recognition for keyless secure entry.',
    client: 'Modern Smart Homes',
    problem: 'Lost keys and unauthorized key duplication.',
    result: '100% keyless access with 98% facial recognition accuracy.'
  },
  {
    id: 'HS-SEC003',
    hsCode: 'HS-SEC003',
    title: 'Smart Lock with Emergency GSM Alert',
    category: 'Security & Access',
    description: 'A robust lock system that triggers a high-priority call during forced entry attempts.',
    client: 'Commercial Warehouses',
    problem: 'Delayed response to nighttime break-ins.',
    result: 'Immediate emergency routing to security teams via GSM.'
  },
  {
    id: 'HS-SEC004',
    hsCode: 'HS-SEC004',
    title: 'Fingerprint Attendance with Cloud Sync',
    category: 'Security & Access',
    description: 'IoT-enabled biometric attendance for real-time employee tracking.',
    client: 'Corporate Offices',
    problem: 'Proxy attendance and manual record-keeping errors.',
    result: 'Automated payroll integration; 50% reduction in HR processing time.'
  },
  {
    id: 'HS-SEC005',
    hsCode: 'HS-SEC005',
    title: 'RFID Vehicle Access Controller',
    category: 'Security & Access',
    description: 'Long-range RFID system for automated gate control for authorized vehicles.',
    client: 'Gated Communities',
    problem: 'Traffic congestion at entry points due to manual verification.',
    result: 'Smoother traffic flow; average entry time reduced to 3 seconds.'
  },

  // --- AI/ML & Vision ---
  {
    id: 'HS-AI001',
    hsCode: 'HS-AI001',
    title: 'Kidney Health Scanner with AI Analysis',
    category: 'AI/ML & Vision',
    description: 'Deep Learning-based chronic kidney disease prediction using CNN and YOLOv8.',
    client: 'Diagnostic Centers',
    problem: 'Manual scanning is time-consuming and prone to human diagnostic error.',
    result: '95% diagnostic accuracy; analysis completed in under 1 minute.'
  },
  {
    id: 'HS-AI002',
    hsCode: 'HS-AI002',
    title: 'Driver Drowsiness Prevention System',
    category: 'AI/ML & Vision',
    description: 'Fatigue detection using CNN to monitor eye closure and alert drivers.',
    client: 'Logistics Companies',
    problem: 'High accident rates due to driver fatigue during long hauls.',
    result: 'Significant reduction in sleep-related incidents; real-time audible alerts.'
  },
  {
    id: 'HS-AI003',
    hsCode: 'HS-AI003',
    title: 'Real-Time Sign Language to Voice Translator',
    category: 'AI/ML & Vision',
    description: 'Visual aid system that translates hand gestures into text and audible speech.',
    client: 'Special Needs Education',
    problem: 'Communication barriers for speech-impaired individuals.',
    result: 'Enables fluid two-way conversation between signers and non-signers.'
  },
  {
    id: 'HS-AI004',
    hsCode: 'HS-AI004',
    title: 'Banana Plantation Disease Identifier',
    category: 'AI/ML & Vision',
    description: 'Image processing system to detect leaf diseases early using CNN.',
    client: 'Precision Agriculture',
    problem: 'Crop loss due to late detection of viral/bacterial infections.',
    result: 'Early-stage detection allowed for localized treatment, saving 20% of yield.'
  },
  {
    id: 'HS-AI005',
    hsCode: 'HS-AI005',
    title: 'Vehicle Type Recognition Camera',
    category: 'AI/ML & Vision',
    description: 'OpenCV based traffic analysis for classification and localization.',
    client: 'Smart City Planning',
    problem: 'Lack of accurate data on traffic composition for infrastructure planning.',
    result: 'Highly granular traffic data with 90% classification accuracy.'
  },

  // --- Robotics & Automation ---
  {
    id: 'HS-ROB001',
    hsCode: 'HS-ROB001',
    title: 'UV Light Disinfection Robot',
    category: 'Robotics & Automation',
    description: 'Autonomous robot for chemical-free sterilization of hospital environments.',
    client: 'Hospitals & Clinics',
    problem: 'Manual disinfection is labor-intensive and misses hidden surfaces.',
    result: '99.9% pathogen elimination in treated zones; zero human exposure to UV.'
  },
  {
    id: 'HS-ROB002',
    hsCode: 'HS-ROB002',
    title: 'Gesture Glove for Sign Translation',
    category: 'Robotics & Automation',
    description: 'Wearable glove with flex sensors that translates sign language in real-time.',
    client: 'Accessibility Tech',
    problem: 'Camera-based systems fail in low light or high mobility.',
    result: 'High-reliability translation anywhere, anytime; Bluetooth mobile sync.'
  },
  {
    id: 'HS-ROB003',
    hsCode: 'HS-ROB003',
    title: 'Autonomous Delivery Robot',
    category: 'Robotics & Automation',
    description: 'Wheeled robot with obstacle avoidance for last-mile indoor deliveries.',
    client: 'Hotels & Offices',
    problem: 'High cost and inefficiency of manual room service/mail delivery.',
    result: '24/7 autonomous service; reduced delivery time by 40%.'
  },

  // --- IoT & Wireless ---
  {
    id: 'HS-IOT001',
    hsCode: 'HS-IOT001',
    title: 'Smart Agriculture Monitoring Hub',
    category: 'IoT & Wireless',
    description: 'Cloud-connected sensor network for soil health and weather monitoring.',
    client: 'Agri-Tech Startups',
    problem: 'Reliance on guesswork for irrigation and fertilization.',
    result: 'Data-driven farming; 30% water saving through optimized irrigation.'
  },
  {
    id: 'HS-IOT002',
    hsCode: 'HS-IOT002',
    title: 'Home Energy Management System',
    category: 'IoT & Wireless',
    description: 'IoT dashboard to monitor and control appliance power consumption.',
    client: 'Smart Homeowners',
    problem: 'Unexpectedly high electricity bills due to inefficient usage.',
    result: 'Average bill reduction of 15% through smart scheduling.'
  },
  {
    id: 'HS-IOT003',
    hsCode: 'HS-IOT003',
    title: 'Remote Patient Health Tracker',
    category: 'IoT & Wireless',
    description: 'Wearable system that monitor vitals and syncs with physicians via IoT.',
    client: 'Elderly Care Facilities',
    problem: 'Requirement for constant physical presence of medical staff.',
    result: 'Continuous 24/7 monitoring; instant alerts for cardiovascular anomalies.'
  },

  // --- Biomedical & Agri ---
  {
    id: 'HS-BIO001',
    hsCode: 'HS-BIO001',
    title: 'ECG Heart Monitor Wearable',
    category: 'Biomedical & Agri',
    description: 'Low-power wearable for continuous cardiac event detection.',
    client: 'Healthcare Providers',
    problem: 'Standard ECGs only provide a snapshot in time.',
    result: 'Caught intermittent arrhythmias that traditional tests missed.'
  },
  {
    id: 'HS-BIO005',
    hsCode: 'HS-BIO005',
    title: 'Soil Nutrient Analyzer for Farms',
    category: 'Biomedical & Agri',
    description: 'Optical sensor system for real-time testing of NPK levels in soil.',
    client: 'Farmers / Cooperatives',
    problem: 'Weeks-long delays for lab-based soil testing results.',
    result: 'Instant on-field testing; 20% reduction in fertilizer costs.'
  },
  // --- AI/EMBEDDED (25 PROJECTS) ---
  {
    id: 'HS-AIEM001',
    hsCode: 'HS-AIEM001',
    title: 'Railway Track Defect Scanner Robot',
    category: 'AI/ML & Vision',
    description: 'Autonomous GPS+Vision robot for detecting cracks and defects on railway tracks.',
    problem: 'Manual inspection is slow and hazardous; defects cause major derailments.',
    result: '98% defect detection rate; reduced human risk by 100% in hazardous zones.'
  },
  {
    id: 'HS-AIEM002',
    hsCode: 'HS-AIEM002',
    title: 'Intelligent Campus Attendance with Face + RFID',
    category: 'AI/ML & Vision',
    description: 'Hybrid attendance system using facial recognition and RFID for security.',
    problem: 'Proxy attendance and long queues during manual entry.',
    result: 'Zero-touch attendance; processing speed of <1 sec per student.'
  },
  {
    id: 'HS-AIEM004',
    hsCode: 'HS-AIEM004',
    title: 'Vision Parking Spot Finder',
    category: 'AI/ML & Vision',
    description: 'Embedded AI system using computer vision to find and guide to vacant parking.',
    problem: 'Time wasted searching for parking in crowded urban centers.',
    result: '40% reduction in time to find parking; real-time occupancy updates.'
  },
  {
    id: 'HS-AIEM005',
    hsCode: 'HS-AIEM005',
    title: 'AI Railway Collision Prevention System',
    category: 'AI/ML & Vision',
    description: 'Embedded hardware using long-range sensors and AI to prevent train collisions.',
    problem: 'Human error and visibility issues leading to catastrophic collisions.',
    result: 'Implemented auto-braking system; reduced collision risk by 99%.'
  },
  {
    id: 'HS-AIEM007',
    hsCode: 'HS-AIEM007',
    title: 'Animal Intrusion Detection for Farms',
    category: 'AI/ML & Vision',
    description: 'AI camera system to detect and deter wildlife from entering farmland.',
    problem: 'Crop destruction by elephants and wild boars.',
    result: 'Non-harmful deterrence via sound; zero crop damage in pilot farms.'
  },

  // --- IOT & WIRELESS (25 PROJECTS) ---
  {
    id: 'HS-IOTW005',
    hsCode: 'HS-IOTW005',
    title: 'IoT Mesh Environmental Monitor',
    category: 'IoT & Wireless',
    description: 'Scalable mesh network of sensors for monitoring large industrial campuses.',
    problem: 'Wired monitoring is expensive and difficult to scale in large áreas.',
    result: 'Self-healing network; 50% lower installation cost than wired systems.'
  },
  {
    id: 'HS-IOTW007',
    hsCode: 'HS-IOTW007',
    title: 'OTP Wireless Door Lock System',
    category: 'IoT & Wireless',
    description: 'Dynamic OTP-based entry system for shared rentals or guest access.',
    problem: 'Security risks with physical keys or static codes.',
    result: 'Time-bound access; full entry logs accessible on mobile app.'
  },
  {
    id: 'HS-IOTW008',
    hsCode: 'HS-IOTW008',
    title: 'Water Meter with Cloud Billing',
    category: 'IoT & Wireless',
    description: 'Smart meter that tracks usage and generates bills on the cloud via WiFi/GSM.',
    problem: 'Manual meter reading and water theft/leakage.',
    result: 'Accurate billing; 25% reduction in water wastage detected via anomaly alerts.'
  },

  // --- ROBOTICS (20 PROJECTS) ---
  {
    id: 'HS-ROBD001',
    hsCode: 'HS-ROBD001',
    title: 'Face Tracking Follow Drone',
    category: 'Robotics & Automation',
    description: 'Autonomous quadcopter that tracks and follows a specific user in real-time.',
    problem: 'Difficulties in solo content creation or security surveillance.',
    result: 'Stable cinematic follow shots; zero manual control required.'
  },
  {
    id: 'HS-ROBD008',
    hsCode: 'HS-ROBD008',
    title: 'COVID Thermal Screening Robot',
    category: 'Robotics & Automation',
    description: 'Autonomous bot for non-contact temperature screening in public crowds.',
    problem: 'Risk to staff doing manual thermal checks.',
    result: 'Mass screening ability; instant isolation alerts.'
  },
  {
    id: 'HS-ROBD009',
    hsCode: 'HS-ROBD009',
    title: 'Pick & Place Vision Robot',
    category: 'Robotics & Automation',
    description: 'Industrial arm system that uses vision to identify and sort objects.',
    problem: 'Repetitive sorting tasks with variable object positions.',
    result: 'High-speed precision; reduced production cycle time by 30%.'
  },

  // --- POWER (15 PROJECTS) ---
  {
    id: 'HS-POWE001',
    hsCode: 'HS-POWE001',
    title: 'Solar MPPT Charge Controller',
    category: 'Power & Electrical',
    description: 'High-efficiency Maximum Power Point Tracking (MPPT) for solar systems.',
    problem: 'Inefficient power extraction from solar panels in variable light.',
    result: '30% more energy extraction compared to PWM controllers.'
  },
  {
    id: 'HS-POWE009',
    hsCode: 'HS-POWE009',
    title: 'Wireless EV Charging Pad',
    category: 'Power & Electrical',
    description: 'Inductive charging system for automatic electric vehicle charging.',
    problem: 'Inconvenience and wear of manual plug-in charging.',
    result: 'Seamless "park-to-charge" experience; 85% efficiency.'
  },

  // --- WEB & SOFTWARE (20 PROJECTS) ---
  {
    id: 'HS-SOFT001',
    hsCode: 'HS-SOFT001',
    title: 'React IoT Dashboard',
    category: 'Web & Software',
    description: 'Real-time monitoring panel for hardware sensors with live graphing.',
    problem: 'Data from sensors is difficult to visualize for end-users.',
    result: 'Low-latency data sync (<100ms); highly responsive UI.'
  },
  {
    id: 'HS-SOFT005',
    hsCode: 'HS-SOFT005',
    title: 'Python ML Model Deployer',
    category: 'Web & Software',
    description: 'Automated pipeline for deploying hardware-trained models to cloud APIs.',
    problem: 'Complex transition from local training to cloud production.',
    result: 'One-click deployment; full API documentation generation.'
  },
  {
    id: 'HS-SOFT013',
    hsCode: 'HS-SOFT013',
    title: 'Three.js 3D Circuit Visualizer',
    category: 'Web & Software',
    description: '3D interactive tool for visualizing circuit layouts and connectivity.',
    problem: 'Difficult to explain complex physical PCB designs remotely.',
    result: 'Immersive browser-based walkthroughs of internal prototypes.'
  }
];
