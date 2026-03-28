import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= DATA =================

const categories = [
  'IoT',
  'Robotics',
  'AI/ML',
  'Web',
  'FPGA',
  'Communication',
  'Computer Vision'
];

const projects = [

 
  // ─────────────────────────────────────────────
  // 1. SMART HELMET SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 1,
    title: 'Smart Helmet System  - by Varun Thej',
    category: 'IoT',
 
    description:
      'Two-unit safety system that enforces helmet usage, detects alcohol, crashes, and sends emergency alerts.',
 
    details:
      'An Arduino-based dual-unit system: a helmet unit (Nano + MQ-3 + SW-420 + 433 MHz RF TX) and a bike unit (Nano + RF RX + relay + SIM800L GSM + NEO-6M GPS). The helmet must be worn and alcohol level must be below threshold before the relay enables the ignition. A crash triggers an automated SMS and phone call to emergency contacts.',
 
    tools: ['Arduino Nano', 'MQ-3 Alcohol Sensor', 'SW-420 Vibration Sensor',
            '433 MHz RF Module', 'SIM800L GSM', 'NEO-6M GPS', 'Relay Module',
            'VirtualWire Library', 'TinyGPS++ Library'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Helmet Unit: [Strap Sensor] + [MQ-3] + [SW-420] → Arduino Nano → [433 MHz TX]\n' +
          'Bike Unit: [433 MHz RX] → Arduino Nano → [Relay/Ignition] + [SIM800L] + [NEO-6M GPS] + [Buzzer/LEDs]\n' +
          'Communication: 433 MHz RF (VirtualWire, 2000 bps)'
      },
      {
        title: 'Working',
        content:
          'Helmet unit reads sensors every 500 ms and transmits a string (SAFE / HELMET_OFF / ALCOHOL_HIGH / *_CRASH). Bike unit parses the string: SAFE → relay ON (green LED); others → relay OFF (red LED + buzzer). CRASH suffix → sends one SMS + makes one voice call via SIM800L.'
      },
      {
        title: 'Key Features',
        content:
          '1. Helmet-wear enforcement via strap/IR sensor.\n' +
          '2. Alcohol detection with threshold-based ignition lock.\n' +
          '3. Crash detection with debounced vibration logic.\n' +
          '4. Automatic SMS + voice call to emergency contact.\n' +
          '5. Optional GPS coordinates in SMS message.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'Arduino Nano ×2 — ₹600 | MQ-3 — ₹250 | SW-420 ×2 — ₹200 | 433 MHz RF pair — ₹150 | SIM800L — ₹500 | NEO-6M GPS — ₹450 | Relay — ₹120 | Buck converters — ₹250 | Misc — ₹1100 | Total ≈ ₹3,620'
      },
      {
        title: 'Impact',
        content:
          'Reduces two-wheeler fatalities by coupling ignition control to helmet wear and sobriety, and cuts emergency response time by auto-alerting family members on crash detection.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 2. WOMEN SAFETY SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 2,
    title: 'Women Safety System - by Varun Thej',
    category: 'IoT',
 
    description:
      'Wearable panic-button device that sends live GPS location and SOS alerts to emergency contacts.',
 
    details:
      'A compact wearable built on ESP32 (or Arduino Nano + SIM800L) fitted with a tactile panic button, NEO-6M GPS, and a buzzer. Single button press sends an SMS with Google Maps link to three pre-stored contacts. Long press activates a loud buzzer alarm. Night-time fall detection uses an MPU6050 IMU. Battery-powered with a TP4056 charging module.',
 
    tools: ['ESP32', 'NEO-6M GPS', 'SIM800L GSM', 'MPU6050 IMU',
            'TP4056 LiPo Charger', 'Tactile Button', 'Piezo Buzzer',
            'TinyGPS++ Library', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Input Layer: [Panic Button] + [MPU6050 Fall Sensor]\n' +
          'Processing: ESP32 / Arduino Nano\n' +
          'Location: NEO-6M GPS → TinyGPS++ → Lat/Lon string\n' +
          'Alert Output: SIM800L → SMS (Google Maps link) + Voice Call\n' +
          'Local Alert: Piezo Buzzer\n' +
          'Power: LiPo 3.7V + TP4056'
      },
      {
        title: 'Working',
        content:
          'On panic button press, ESP32 reads GPS coordinates, builds a Google Maps URL (https://maps.google.com/?q=LAT,LON), and sends it via SIM800L as SMS to up to 3 contacts. Simultaneously, a voice call is placed to contact #1. MPU6050 monitors acceleration; a sudden drop + impact pattern triggers automatic SOS without button press.'
      },
      {
        title: 'Key Features',
        content:
          '1. One-press SOS with GPS link sent to multiple contacts.\n' +
          '2. Auto-fall detection using MPU6050 threshold algorithm.\n' +
          '3. Local 85 dB piezo alarm to deter attackers.\n' +
          '4. Battery-backed with charging via micro-USB.\n' +
          '5. Compact enough to fit inside a wristband or keychain.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 Dev Board — ₹400 | NEO-6M GPS — ₹450 | SIM800L — ₹500 | MPU6050 — ₹150 | TP4056 module — ₹60 | LiPo 3.7V 1000mAh — ₹250 | Buzzer + button + misc — ₹200 | 3D-printed case — ₹300 | Total ≈ ₹2,310'
      },
      {
        title: 'Impact',
        content:
          'Empowers women with an instant, hands-free alert mechanism that shares real-time location — reducing response time in emergencies significantly.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 3. GAS LEAKAGE DETECTION SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 3,
    title: 'Gas Leakage Detection System  - by Varun Thej',
    category: 'IoT',
 
    description:
      'Real-time LPG/gas leak detector with buzzer alarm, exhaust fan control, and IoT SMS/app alert.',
 
    details:
      'Uses an MQ-2 or MQ-5 gas sensor interfaced with an ESP32 (or NodeMCU). When gas concentration crosses a configurable threshold, the system: sounds a buzzer, activates a relay-controlled exhaust fan, sends an SMS via SIM800L or a push notification via Blynk/MQTT, and displays readings on an OLED. Optional voice alert via DFPlayer Mini module.',
 
    tools: ['ESP32 / NodeMCU', 'MQ-2 Gas Sensor', 'SIM800L GSM', 'Relay Module',
            'OLED SSD1306', 'Buzzer', 'DFPlayer Mini', 'Blynk / MQTT',
            'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Sensing: [MQ-2/MQ-5] → Analog A0 → ESP32\n' +
          'Local Alerts: ESP32 → [Buzzer] + [Relay → Exhaust Fan] + [OLED Display]\n' +
          'Remote Alerts: ESP32 → WiFi → Blynk App / MQTT Broker\n' +
          'GSM Backup: ESP32 → SIM800L → SMS to owner\n' +
          'Power: 5V adapter or USB'
      },
      {
        title: 'Working',
        content:
          'MQ-2 output is read every 500 ms. Raw ADC value is mapped to PPM using calibration formula. If PPM > threshold (e.g., 300 PPM for LPG): buzzer turns ON, relay activates fan, OLED shows "GAS LEAK!", Blynk push notification is sent, and SIM800L sends SMS. All alerts clear automatically once gas level drops below safe threshold.'
      },
      {
        title: 'Key Features',
        content:
          '1. Analog PPM-level reading with calibrated threshold.\n' +
          '2. Relay-controlled exhaust fan for automatic ventilation.\n' +
          '3. OLED real-time display of gas concentration.\n' +
          '4. Dual alert: local buzzer + remote Blynk notification.\n' +
          '5. SMS backup when WiFi is unavailable.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 — ₹400 | MQ-2 sensor — ₹150 | SIM800L — ₹500 | Relay module — ₹120 | OLED 0.96" — ₹200 | Buzzer — ₹30 | Exhaust fan (5V) — ₹150 | Misc wires/PCB — ₹200 | Total ≈ ₹1,750'
      },
      {
        title: 'Impact',
        content:
          'Prevents LPG explosion and fire hazards in homes, restaurants, and industrial kitchens by alerting occupants and triggering ventilation before concentration reaches explosive levels.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 4. SMART HOME USING VOICE CONTROL
  // ─────────────────────────────────────────────
  {
    id: 4,
    title: 'Smart Home Using Voice Control  - by Varun Thej',
    category: 'IoT',
 
    description:
      'Control home appliances via voice commands using Google Assistant, Alexa, or offline speech recognition.',
 
    details:
      'An ESP32-based home automation system that connects to Google Assistant via IFTTT + Adafruit IO (cloud route) or uses an offline LD3320 / eSpeak module for local voice recognition. Multiple relay channels control lights, fans, and AC independently. A companion web dashboard (HTML served from ESP32) allows manual override. Energy monitoring via PZEM-004T sensor per channel.',
 
    tools: ['ESP32', '4-Channel Relay', 'Google Assistant / IFTTT',
            'Adafruit IO / Blynk', 'LD3320 Speech Module (offline)',
            'PZEM-004T Energy Sensor', 'HTML Dashboard', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Voice Input Path A (Cloud): Google Assistant → IFTTT → Adafruit IO → MQTT → ESP32 → Relay\n' +
          'Voice Input Path B (Offline): Mic → LD3320 → UART → ESP32 → Relay\n' +
          'Manual Override: Browser → ESP32 Web Server → Relay\n' +
          'Energy Monitoring: PZEM-004T → ESP32 → Dashboard\n' +
          'Power: 5V USB or 12V SMPS'
      },
      {
        title: 'Working',
        content:
          'User says "Hey Google, turn on bedroom light". Google Assistant triggers IFTTT applet which publishes to Adafruit IO feed. ESP32 subscribed via MQTT receives the command and toggles relay channel 1. Status is reflected on the web dashboard and OLED. Offline mode: LD3320 processes voice locally and sends UART command directly to ESP32 relay control code.'
      },
      {
        title: 'Key Features',
        content:
          '1. Dual voice control: cloud (Google/Alexa) + offline (LD3320).\n' +
          '2. 4-channel independent relay for lights, fan, AC, TV.\n' +
          '3. Built-in ESP32 web server dashboard for manual control.\n' +
          '4. Real-time energy monitoring per appliance.\n' +
          '5. Schedule/timer support via Adafruit IO time triggers.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 — ₹400 | 4-Ch Relay — ₹250 | LD3320 module — ₹600 | PZEM-004T — ₹800 | OLED — ₹200 | 5V SMPS — ₹300 | Enclosure + wiring — ₹500 | Total ≈ ₹3,050'
      },
      {
        title: 'Impact',
        content:
          'Makes homes accessible for elderly and differently-abled users; reduces energy waste by enabling scheduled automation; serves as a practical template for building cost-effective smart home products.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 5. LINE FOLLOWING ROBOT
  // ─────────────────────────────────────────────
  {
    id: 5,
    title: 'Line Following Robot  - by Varun Thej',
    category: 'IoT',
 
    description:
      'Autonomous wheeled robot that follows a black line on white surface using IR sensors and PID control.',
 
    details:
      'A 2-wheel differential-drive robot built on an Arduino Uno with an array of 5 TCRT5000 IR sensors. PID control algorithm calculates the error from the line center and adjusts left/right motor speeds via L298N H-bridge. Optional Bluetooth module for manual override. Obstacle avoidance with HC-SR04 ultrasonic sensor stops the robot before a collision.',
 
    tools: ['Arduino Uno', 'TCRT5000 IR Sensor Array (5x)', 'L298N H-Bridge',
            'DC Gear Motors ×2', 'HC-SR04 Ultrasonic', 'HC-05 Bluetooth',
            'Li-ion Battery Pack', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Sensing: [5x TCRT5000 IR Array] → Digital D2–D6 → Arduino Uno\n' +
          'Obstacle: [HC-SR04] → D7/D8 → Arduino\n' +
          'Processing: Arduino PID Controller\n' +
          'Output: Arduino → [L298N] → [Left Motor] + [Right Motor]\n' +
          'Manual: HC-05 → Serial → Arduino\n' +
          'Power: 7.4V Li-ion → L298N (12V IN) + 5V reg → Arduino'
      },
      {
        title: 'Working',
        content:
          'IR sensors are read each loop cycle. Binary pattern (e.g., 00100 = on line) is compared to center. Error = weighted sum of sensor positions. PID calculates correction: Left speed = Base - correction; Right speed = Base + correction. Motors adjusted via L298N PWM (analogWrite). If HC-SR04 detects obstacle < 15 cm, both motors stop until path is clear.'
      },
      {
        title: 'Key Features',
        content:
          '1. 5-sensor array for smooth curved line detection.\n' +
          '2. PID control for speed and direction accuracy.\n' +
          '3. Obstacle avoidance with ultrasonic stop logic.\n' +
          '4. Bluetooth override for manual mode.\n' +
          '5. Adjustable PID constants via Serial Monitor.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'Arduino Uno — ₹400 | TCRT5000 ×5 — ₹250 | L298N — ₹150 | DC motors ×2 — ₹200 | HC-SR04 — ₹100 | HC-05 — ₹200 | Chassis — ₹350 | Li-ion pack + wheels — ₹500 | Misc — ₹150 | Total ≈ ₹2,300'
      },
      {
        title: 'Impact',
        content:
          'Foundation for warehouse automation, industrial AGVs, and autonomous delivery bots. Teaches PID control, sensor fusion, and real-time embedded programming.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 6. VOICE CONTROLLED WHEELCHAIR
  // ─────────────────────────────────────────────
  {
    id: 6,
    title: 'Voice Controlled Wheelchair  - by Varun Thej',
    category: 'IoT',
 
    description:
      'Motorized wheelchair that responds to voice commands for movement control, improving mobility for differently-abled users.',
 
    details:
      'An Arduino Mega / ESP32 + Bluetooth-based wheelchair controller. A smartphone runs a voice recognition app (Android Speech API) and sends parsed commands via HC-05 Bluetooth to the Arduino. The Arduino drives two 12V DC motors through a BTS7960 or L298N motor driver. Commands: Forward, Back, Left, Right, Stop, Slow, Fast. Obstacle avoidance with 3× HC-SR04 sensors (front, left, right).',
 
    tools: ['Arduino Mega / ESP32', 'HC-05 Bluetooth', 'BTS7960 Motor Driver',
            '12V DC Motors ×2', 'HC-SR04 ×3 Ultrasonic', 'Android App (MIT App Inventor)',
            'Android Speech-to-Text API', 'Li-ion / Lead-Acid Battery', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Voice Input: Smartphone Mic → Android Speech API → Parsed Command String\n' +
          'Wireless: Smartphone → Bluetooth → HC-05 → Arduino Mega\n' +
          'Safety Layer: HC-SR04 ×3 (front/left/right) → Arduino (override stop)\n' +
          'Motion: Arduino → BTS7960 PWM → Left Motor + Right Motor\n' +
          'Power: 12V Lead-acid / Li-ion → BTS7960 + 5V regulator → Arduino'
      },
      {
        title: 'Working',
        content:
          'User speaks "Forward" → Android app converts speech to text → sends "F" over Bluetooth. Arduino receives character, checks front HC-SR04 (if > 30 cm, proceed), then drives both motors forward at set PWM. "Left" → left motor reverses, right motor forward (spin turn). "Stop" → both motors off. Obstacle detected < 20 cm front → auto-stop regardless of command.'
      },
      {
        title: 'Key Features',
        content:
          '1. Hands-free voice navigation via Bluetooth + Android app.\n' +
          '2. Three-direction obstacle avoidance (front, left, right).\n' +
          '3. Variable speed (Slow/Fast) commands.\n' +
          '4. MIT App Inventor open-source companion app.\n' +
          '5. Emergency stop button (physical override).'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'Arduino Mega — ₹700 | HC-05 — ₹200 | BTS7960 ×2 — ₹600 | 12V DC motors ×2 — ₹1,200 | HC-SR04 ×3 — ₹300 | 12V 7Ah battery — ₹800 | Chassis/frame — ₹1,500 | Misc — ₹400 | Total ≈ ₹5,700'
      },
      {
        title: 'Impact',
        content:
          'Provides independence to paralyzed, elderly, or differently-abled individuals, replacing manual push effort with intuitive voice commands. Estimated 70% reduction in caretaker physical effort.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 7. IoT HEALTH MONITORING SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 7,
    title: 'IoT Health Monitoring System - by Varun Thej',
    category: 'IoT',
 
    description:
      'Wearable that monitors heart rate, SpO2, body temperature, and sends data to a live cloud dashboard.',
 
    details:
      'ESP32-based health monitor integrating MAX30102 (heart rate + SpO2), DS18B20 (body temperature), and optional AD8232 (ECG). Data is published via MQTT or HTTP POST to ThingSpeak / Firebase every 10 seconds. An OLED displays live readings. Threshold-based alerts: SMS (SIM800L) or push notification (Blynk) when heart rate > 120 BPM or SpO2 < 90%.',
 
    tools: ['ESP32', 'MAX30102 Pulse Oximeter', 'DS18B20 Temperature Sensor',
            'AD8232 ECG Module', 'OLED SSD1306', 'ThingSpeak / Firebase',
            'SIM800L GSM', 'Blynk App', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Sensors: [MAX30102 I2C] + [DS18B20 OneWire] + [AD8232 Analog] → ESP32\n' +
          'Local Display: ESP32 → OLED SSD1306 (I2C)\n' +
          'Cloud: ESP32 → WiFi → ThingSpeak / Firebase (HTTP or MQTT)\n' +
          'Alert Path: ESP32 → Blynk notification / SIM800L SMS\n' +
          'Power: 3.7V LiPo + TP4056 charger → 3.3V LDO → ESP32'
      },
      {
        title: 'Working',
        content:
          'MAX30102 reads IR + red light absorption using I2C; SpO2 and BPM calculated using SparkFun MAX3010x library. DS18B20 returns temperature in °C via OneWire. AD8232 outputs analog ECG signal sampled at ~250 Hz. Every 10 s, all values are serialized to JSON and POST-ed to ThingSpeak. Blynk virtual pins mirror live values on mobile. Threshold exceeded → Blynk alert + SMS.'
      },
      {
        title: 'Key Features',
        content:
          '1. Heart rate + SpO2 (MAX30102) with calibrated accuracy.\n' +
          '2. Body temperature (DS18B20) to 0.1°C resolution.\n' +
          '3. ECG waveform visualization on Serial Plotter / cloud.\n' +
          '4. Real-time ThingSpeak dashboard with historical graphs.\n' +
          '5. Anomaly alerts via Blynk push + SMS.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 — ₹400 | MAX30102 — ₹350 | DS18B20 — ₹100 | AD8232 — ₹400 | OLED — ₹200 | SIM800L — ₹500 | LiPo 500mAh + TP4056 — ₹200 | Misc — ₹200 | Total ≈ ₹2,350'
      },
      {
        title: 'Impact',
        content:
          'Enables continuous remote patient monitoring for home-care and rural healthcare settings, reducing hospital visits and enabling early detection of cardiac anomalies.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 8. SMART AGRICULTURE SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 8,
    title: 'Smart Agriculture System - by Varun Thej',
    category: 'IoT',
 
    description:
      'Autonomous IoT irrigation system that monitors soil moisture, temperature, and humidity to water crops intelligently.',
 
    details:
      'ESP32-based system with capacitive soil moisture sensors, DHT22 (temperature + humidity), and LDR (light level). A relay-controlled water pump activates automatically when soil moisture < threshold. Data is pushed to AWS IoT Core (MQTT) and visualized on Grafana or ThingSpeak. Manual override via Blynk app. Solar panel + battery backup for field deployment.',
 
    tools: ['ESP32', 'Capacitive Soil Moisture Sensor', 'DHT22',
            'LDR', 'Relay Module', '5V Submersible Pump',
            'AWS IoT Core / ThingSpeak', 'Blynk App', 'Solar Panel + 18650 Battery'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Sensing: [Soil Moisture (Analog)] + [DHT22 (Digital)] + [LDR (Analog)] → ESP32\n' +
          'Control: ESP32 → Relay → Water Pump\n' +
          'Cloud: ESP32 → WiFi → AWS IoT Core → Grafana Dashboard\n' +
          'Manual: Blynk App → MQTT → ESP32 → Relay\n' +
          'Power: Solar Panel → TP4056 → 18650 LiPo → 3.3V for ESP32'
      },
      {
        title: 'Working',
        content:
          'Sensors are polled every 60 s. Soil moisture ADC value is mapped to percentage (0–100%). If moisture < 40%: relay turns ON the pump; if moisture > 70%: relay turns OFF (with hysteresis to prevent rapid cycling). DHT22 data is used for evapotranspiration estimation. All readings are published to AWS IoT Core topic "farm/sensor". Blynk slider allows manual pump override.'
      },
      {
        title: 'Key Features',
        content:
          '1. Capacitive soil moisture (no corrosion vs resistive type).\n' +
          '2. Hysteresis-based pump control to prevent over/under watering.\n' +
          '3. AWS IoT Core + Grafana for long-term trend analysis.\n' +
          '4. Solar-powered for off-grid farm deployment.\n' +
          '5. Multi-zone support (expandable with more sensor nodes).'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 — ₹400 | Capacitive soil sensor — ₹150 | DHT22 — ₹200 | LDR + resistor — ₹30 | Relay — ₹120 | 5V pump — ₹300 | Solar panel 6V 2W — ₹500 | 18650 + TP4056 — ₹250 | Misc — ₹200 | Total ≈ ₹2,150'
      },
      {
        title: 'Impact',
        content:
          'Reduces water consumption by up to 40% compared to manual irrigation, improves crop yield consistency, and enables remote monitoring for farmers managing large fields.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 9. AI SURVEILLANCE SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 9,
    title: 'AI Smart Surveillance System - by Varun Thej',
    category: 'IoT',
 
    description:
      'AI-powered security camera with face detection, intruder alert, and behavior analysis using ESP32-CAM or Raspberry Pi.',
 
    details:
      'Raspberry Pi 4 (or Jetson Nano) running OpenCV + YOLOv8 Nano model for real-time person detection. Face recognition using face_recognition library flags unknown visitors and sends Telegram photo + alert. Motion detection as a lightweight fallback. Live RTSP stream served via MediaMTX. Events logged to SQLite with snapshots. Optional ESP32-CAM nodes for multi-zone coverage.',
 
    tools: ['Raspberry Pi 4 / Jetson Nano', 'ESP32-CAM', 'OpenCV 4.x',
            'YOLOv8 Nano (Ultralytics)', 'face_recognition Library',
            'Telegram Bot API', 'MediaMTX RTSP Server',
            'SQLite', 'Python 3.10', 'Flask Dashboard'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Camera Input: ESP32-CAM / USB Cam → Raspberry Pi (RTSP or direct)\n' +
          'AI Pipeline: Frame → YOLOv8 Person Detection → Face Recognition → Event Classifier\n' +
          'Alert: Unknown face → Telegram Bot → Photo + Text Alert\n' +
          'Storage: Snapshots → Local SQLite + optional AWS S3\n' +
          'Dashboard: Flask Web App → Live Stream + Event Log\n' +
          'Power: 5V 3A USB-C for RPi; 5V for ESP32-CAM'
      },
      {
        title: 'Working',
        content:
          'Each camera frame is analyzed by YOLOv8 Nano (running at ~10–15 FPS on RPi 4). Detected person bounding boxes are cropped and passed to face_recognition for 128-d embedding comparison against known-faces database. If match found → log as known visitor. If no match → send Telegram alert with annotated snapshot. Motion-only trigger reduces CPU usage during inactive periods.'
      },
      {
        title: 'Key Features',
        content:
          '1. Real-time YOLOv8 person + object detection.\n' +
          '2. Face recognition with known/unknown classification.\n' +
          '3. Telegram bot instant alerts with annotated images.\n' +
          '4. Multi-camera RTSP stream via MediaMTX.\n' +
          '5. Flask web dashboard for live view + event history.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'Raspberry Pi 4 (4GB) — ₹4,500 | ESP32-CAM ×2 — ₹600 | 32GB SD card — ₹500 | USB webcam (fallback) — ₹800 | 5V 3A adapter — ₹300 | Enclosure — ₹500 | Misc cables — ₹200 | Total ≈ ₹7,400'
      },
      {
        title: 'Impact',
        content:
          'Delivers enterprise-grade surveillance capability at 1/10th the cost of commercial systems; enables smart offices, hostels, and gated communities to automate visitor management and intrusion detection.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 10. SMART PARKING SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 10,
    title: 'Smart Parking System - by Varun Thej',
    category: 'IoT',
 
    description:
      'Real-time parking slot availability monitoring with LED indicators, web dashboard, and entry/exit barrier control.',
 
    details:
      'Each parking slot has an HC-SR04 ultrasonic sensor (or IR sensor) connected to an ESP32 node. Slot status (occupied/free) is published via MQTT to a central Node-RED broker. A web dashboard (Node-RED UI) shows a live color-coded parking map. Entry barrier servo opens only when at least one slot is free. Count displayed on an LED matrix at the entrance.',
 
    tools: ['ESP32 (per node)', 'HC-SR04 / IR Sensors', 'Servo Motor (barrier)',
            'MAX7219 LED Matrix', 'Node-RED', 'MQTT Broker (Mosquitto)',
            'Node-RED Dashboard UI', 'MySQL (logging)', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Slot Nodes: [HC-SR04] → ESP32 Node → WiFi → MQTT Broker (Mosquitto)\n' +
          'Central Hub: MQTT → Node-RED → Dashboard UI (web browser)\n' +
          'Entrance: Node-RED slot count → Servo Barrier + LED Matrix display\n' +
          'Logging: Node-RED → MySQL (occupancy timestamps)\n' +
          'Power: 5V USB per node; 12V for barrier servo'
      },
      {
        title: 'Working',
        content:
          'Each ESP32 node polls its HC-SR04 every 2 s. If distance < 20 cm → slot occupied (publishes "1" to "parking/slotN"). If distance > 20 cm → slot free (publishes "0"). Node-RED aggregates all topics, calculates free count, updates dashboard colors (Red = occupied, Green = free). When free count > 0: servo barrier opens for 5 s on entry button press. LED matrix shows "FREE: X".'
      },
      {
        title: 'Key Features',
        content:
          '1. Per-slot ultrasonic detection with MQTT publish.\n' +
          '2. Real-time Node-RED web dashboard (color-coded map).\n' +
          '3. Automated servo barrier entry control.\n' +
          '4. LED matrix slot count display at entrance.\n' +
          '5. Occupancy history logged to MySQL for analytics.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 ×4 (for 4 slots) — ₹1,600 | HC-SR04 ×4 — ₹400 | SG90 Servo — ₹150 | MAX7219 LED matrix — ₹300 | RPi for Node-RED hub — ₹3,500 | Misc wiring + enclosure — ₹500 | Total ≈ ₹6,450'
      },
      {
        title: 'Impact',
        content:
          'Reduces parking search time by up to 60% in congested areas, lowers fuel waste from circling vehicles, and provides data-driven insights for urban planners.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 11. GESTURE CONTROLLED DEVICES
  // ─────────────────────────────────────────────
  {
    id: 11,
    title: 'Gesture Controlled Devices - by Varun Thej',
    category: 'IoT',
 
    description:
      'Control home appliances or a robot car using hand gestures detected via webcam and MediaPipe, no physical contact needed.',
 
    details:
      'Python + OpenCV + MediaPipe Hands pipeline running on a laptop or Raspberry Pi. Hand landmarks (21 key points) are tracked in real-time. Gesture classifier maps landmark patterns to commands: Fist = Stop, Open Palm = Forward, Finger Count = Speed, Left/Right tilt = Turn. Commands sent via serial to Arduino / ESP32 which controls relay or motor driver. Achieves < 50 ms latency end-to-end.',
 
    tools: ['Python 3.10', 'OpenCV 4.x', 'MediaPipe Hands',
            'Arduino Uno / ESP32', 'L298N Motor Driver', 'Relay Module',
            'USB Webcam or Pi Camera', 'PySerial', 'NumPy'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'Input: Webcam → OpenCV frame capture\n' +
          'Processing: MediaPipe Hands → 21 Landmark (x,y,z) per hand\n' +
          'Gesture Engine: Landmark geometry → Rule-based classifier → Command string\n' +
          'Serial Bridge: Python PySerial → USB → Arduino\n' +
          'Output A (Robot): Arduino → L298N → Left/Right Motors\n' +
          'Output B (Home): Arduino → Relay → Appliances'
      },
      {
        title: 'Working',
        content:
          'MediaPipe detects hand in each frame and outputs 21 (x,y,z) landmarks. Classifier checks: if all fingers folded → Fist → STOP command. If all extended → Palm → FORWARD. Finger count (extended fingers sum) maps to speed level 1–5. Hand tilt angle (wrist–middle base vector) determines LEFT/RIGHT. Command string (e.g., "F2") sent via serial at 9600 baud. Arduino parses and drives motors/relays.'
      },
      {
        title: 'Key Features',
        content:
          '1. Real-time 21-landmark tracking at 30+ FPS.\n' +
          '2. Rule-based gesture engine (no ML training required).\n' +
          '3. Serial command bridge to Arduino for hardware control.\n' +
          '4. Dual output: robot control or appliance switching.\n' +
          '5. Extensible: add custom gestures with new geometry rules.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'Laptop / Raspberry Pi (existing) — ₹0 | USB Webcam — ₹800 | Arduino Uno — ₹400 | L298N — ₹150 | Relay module — ₹120 | Robot chassis + motors — ₹700 | Misc — ₹200 | Total ≈ ₹2,370'
      },
      {
        title: 'Impact',
        content:
          'Enables touchless device control for hygiene-sensitive environments (hospitals, labs), assists people with limited mobility, and provides an intuitive HCI interface for presentations and robot demonstrations.'
      }
    ],
 
    links: { github: '', live: '' }
  },
 
  // ─────────────────────────────────────────────
  // 12. SMART ENERGY MONITORING SYSTEM
  // ─────────────────────────────────────────────
  {
    id: 12,
    title: 'Smart Energy Monitoring System',
    category: 'IoT / Smart Home / Sustainability',
 
    description:
      'Real-time electricity usage monitor that tracks voltage, current, power, and kWh per appliance with IoT dashboard.',
 
    details:
      'ESP32-based energy meter using PZEM-004T v3.0 (AC voltage, current, power, energy, frequency, power factor). Data published to ThingSpeak or Home Assistant via MQTT every 5 s. OLED shows live readings. Monthly kWh calculation and bill estimation on dashboard. Threshold alerts (over-current or over-power) trigger relay cutoff and push notification via Telegram or Blynk.',
 
    tools: ['ESP32', 'PZEM-004T v3.0', 'Relay Module (cutoff)',
            'OLED SSD1306', 'ThingSpeak / Home Assistant',
            'MQTT (Mosquitto)', 'Telegram Bot API', 'Blynk App', 'Arduino IDE'],
 
    sections: [
      {
        title: 'Block Diagram',
        content:
          'AC Mains → PZEM-004T (clamp CT + voltage divider) → UART → ESP32\n' +
          'Local Display: ESP32 → OLED SSD1306 (I2C)\n' +
          'Cloud: ESP32 → WiFi → MQTT → ThingSpeak / Home Assistant\n' +
          'Alerts: ESP32 → Telegram Bot API (over-limit notification)\n' +
          'Cutoff: ESP32 → Relay → AC Load (emergency disconnect)\n' +
          'Power: 5V USB adapter → ESP32'
      },
      {
        title: 'Working',
        content:
          'PZEM-004T communicates via UART (SoftwareSerial or Serial2 on ESP32) using Modbus RTU. Library reads voltage (V), current (A), active power (W), energy (kWh), frequency (Hz), power factor. Every 5 s, JSON payload is published to MQTT broker. ThingSpeak stores all fields in 6 channels for graphing. If power > 2000W threshold: relay opens to cut load and Telegram sends "OVER POWER ALERT" message.'
      },
      {
        title: 'Key Features',
        content:
          '1. 6-parameter AC measurement (V, A, W, kWh, Hz, PF).\n' +
          '2. Real-time OLED + ThingSpeak cloud dashboard.\n' +
          '3. Monthly bill estimation from cumulative kWh.\n' +
          '4. Over-current / over-power automatic relay cutoff.\n' +
          '5. Telegram alerts for anomaly events.'
      },
      {
        title: 'Components & Cost (INR)',
        content:
          'ESP32 — ₹400 | PZEM-004T v3.0 — ₹800 | Relay module — ₹120 | OLED — ₹200 | AC socket + enclosure — ₹400 | Misc — ₹200 | Total ≈ ₹2,120'
      },
      {
        title: 'Impact',
        content:
          'Helps households identify energy-hungry appliances, enables automated load shedding, and supports sustainability goals by providing actionable data to reduce electricity bills by 15–25%.'
      }
    ],
 
    links: { github: '', live: '' }
  }
 
];

// ================= COMPONENT =================

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = projects.filter(
    (p) => p.category === activeCategory
  );

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-[#F9FAFB]">
      <div className="max-w-[1200px] mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-10">
            Stuff We've Actually Built.
          </h2>
        </div>

        {/* CATEGORY GRID */}
        {!activeCategory && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveCategory(cat)}
                className="cursor-pointer p-10 bg-white rounded-2xl shadow-md text-center font-semibold text-lg hover:shadow-xl transition"
              >
                {cat}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PROJECTS */}
        {activeCategory && (
          <>
            <button
              onClick={() => setActiveCategory(null)}
              className="mb-10 text-sm text-gray-500 hover:text-black"
            >
              ← Back to Categories
            </button>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-200 to-green-200 relative">
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-white px-4 py-2 rounded-full"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-500">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {selectedProject.category}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 overflow-y-auto space-y-6">

                {/* OVERVIEW */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Overview</h4>
                  <p className="text-gray-700">
                    {selectedProject.details}
                  </p>
                </div>

                {/* TOOLS */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Tools & Technologies
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProject.tools.map((tool: string) => (
                      <span
                        key={tool}
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SECTIONS */}
                {selectedProject.sections.map((section: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-semibold text-lg mb-2">
                      {section.title}
                    </h4>
                    <p className="text-gray-600">
                      {section.content}
                    </p>
                  </div>
                ))}

                {/* LINKS */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Links</h4>
                  <div className="flex gap-4">

                    {selectedProject.links?.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                      >
                        GitHub
                      </a>
                    )}

                    {selectedProject.links?.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;