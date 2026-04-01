import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Radio,
  Settings,
  Zap,
  Microchip,
  Eye,
  Monitor,
  Layers,
  Activity
} from 'lucide-react';
import RecruitmentModal from './RecruitmentModal.tsx';

const domains = [
  { icon: <Zap className="w-8 h-8" />, name: '⚡ Embedded Systems', members: 4 },
  { icon: <Settings className="w-8 h-8" />, name: '🤖 Robotics & Motion', members: 3 },
  { icon: <Radio className="w-8 h-8" />, name: '📡 IoT & Connectivity', members: 2 },
  { icon: <Microchip className="w-8 h-8" />, name: '🔲 Hardware & FPGA', members: 2 },
  { icon: <Eye className="w-8 h-8" />, name: '🧠 AI/ML & Vision', members: 2 },
  { icon: <Monitor className="w-8 h-8" />, name: '💻 Full Stack Web', members: 2 },
  { icon: <Layers className="w-8 h-8" />, name: '🔌 PCB & Circuits', members: 2 },
  { icon: <Activity className="w-8 h-8" />, name: '📐 Simulation & Control', members: 2 },
];

const openRoles = [
  {
    role: 'EMBEDDED SYSTEMS ENGINEER',
    description: 'Build smart hardware that scales — from prototype to product.',
    skills: 'Arduino, ESP32, RPi, ARM, RTOS, C/C++',
  },
  {
    role: 'ROBOTICS & MOTION ENGINEER',
    description: 'Design autonomous systems that eliminate manual work entirely.',
    skills: 'ROS, UAV, Servo Control, Sensors, Python',
  },
  {
    role: 'IoT & CONNECTIVITY SPECIALIST',
    description: 'Make devices talk to each other reliably, anywhere in the world.',
    skills: 'GSM, GPS, RF, Zigbee, BT, MQTT, ESP32',
  },
  {
    role: 'HARDWARE & FPGA ENGINEER',
    description: 'Design custom high-speed processing logic for specialized systems.',
    skills: 'Verilog, VHDL, Synthesis, FPGA, PCB Design',
  },
  {
    role: 'AI/ML & VISION ENGINEER',
    description: 'Build intelligent systems that see, decide, and automate.',
    skills: 'TensorFlow, PyTorch, OpenCV, YOLO, Python',
  },
  {
    role: 'FULL STACK WEB DEVELOPER',
    description: 'Create digital experiences that turn visitors into loyal customers.',
    skills: 'React, Node.js, Python, APIs, TypeScript',
  },
  {
    role: 'PCB & CIRCUIT DESIGNER',
    description: 'Design energy-efficient, production-ready circuit systems.',
    skills: 'PCB Layout, Digital Logic, Power Electronics, KiCad, Altium',
  },
  {
    role: 'SIMULATION & CONTROL ENGINEER',
    description: 'Model and validate systems before a single component is soldered.',
    skills: 'MATLAB, Simulink, Control Systems, DSP',
  }
];

const Crew = () => {
  const [modalRole, setModalRole] = useState<string | null>(null);

  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="crew" className="py-32 px-6 md:px-12 bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 overflow-hidden relative">

      {/* FLOATING DECOR */}
      <div className="hidden md:block absolute top-20 right-10 text-[100px] pointer-events-none select-none z-0 opacity-[0.13]" style={{ color: 'var(--floating-icon)' }}>~</div>
      <div className="hidden md:block absolute bottom-40 left-10 text-[140px] pointer-events-none select-none z-0 opacity-[0.13]" style={{ color: 'var(--floating-icon)' }}>•</div>

      <div className="max-w-[1440px] mx-auto">

        {/* THE HOMIES - DOMAINS SECTION */}
        <div className="text-center mb-24 relative z-10">
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.4em] mb-4">// THE TEAM</p>
          <h2 className="text-[clamp(40px,7vw,80px)] font-display font-black leading-tight uppercase mb-6 tracking-tighter transition-all">
            The Homies.
          </h2>
          <p className="text-[clamp(16px,2vw,22px)] font-light text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            A collective of specialists across hardware, AI, and digital ecosystems.
            Engineering the future, one system at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-32 relative z-10">
          {domains.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-[var(--card)] p-8 rounded-[2rem] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all group"
            >
              <div className="mb-6 text-[var(--text)] group-hover:text-amber-400 transition-colors">
                {domain.icon}
              </div>
              <h3 className="text-base font-display font-bold mb-1 uppercase tracking-tight leading-tight">{domain.name}</h3>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-faint)] group-hover:text-[var(--text-muted)] transition-colors uppercase">
                {domain.members} Specialists
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mb-44 relative z-10">
          <button
            onClick={scrollToJoin}
            className="px-12 py-5 bg-[var(--text)] text-[var(--bg)] font-black rounded-full hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-4 group uppercase text-xs tracking-[0.2em]"
          >
            JOIN THE TEAM
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* JOIN THE HOMIES - RECRUITMENT SECTION */}
        <div id="join" className="pt-24 border-t border-[var(--border)] relative z-10">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-[clamp(32px,6vw,72px)] font-display font-black leading-[0.9] uppercase mb-8 tracking-tighter">
              We're Always Looking for <br />Obsessed People.
            </h2>
            <p className="text-[clamp(14px,1.8vw,18px)] font-light text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
              We don't hire employees. We partner with people who are obsessed with their craft.
              Whether you're a student or a veteran, if you build great things, you belong here.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
            {openRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 group"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-black text-base uppercase tracking-wider leading-tight group-hover:text-[#f5a623] transition-colors">{role.role}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
                    {role.description}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-2 block font-mono">WANTED:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.split(',').map((skill, si) => (
                      <span key={si} className="text-[10px] text-[var(--text-muted)] border border-[var(--border)] rounded-full px-2.5 py-0.5 hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-colors cursor-default">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setModalRole(role.role)}
                  className="mt-6 w-full py-3.5 rounded-xl bg-[var(--text)] text-[var(--bg)] text-[10px] font-black tracking-[0.2em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  BECOME A HOMIE
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <RecruitmentModal
        isOpen={!!modalRole}
        onClose={() => setModalRole(null)}
        selectedRole={modalRole || ''}
      />
    </section>
  );
};

export default Crew;