import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Bot, Radio, CircuitBoard, 
  BarChart2, Code2, Brain, Zap 
} from 'lucide-react';

const services = [
  {
    icon: <Cpu className="w-8 h-8" />,
    name: 'Smart Systems That Scale',
    description: 'Hardware that grows with your business needs.',
    tags: ['Arduino', 'RPi', 'ESP32', 'ARM']
  },
  {
    icon: <Bot className="w-8 h-8" />,
    name: 'Autonomous Motion Solutions',
    description: 'Machines that eliminate manual labor and errors.',
    tags: ['ROS', 'UAV', 'Servo', 'Sensors']
  },
  {
    icon: <Radio className="w-8 h-8" />,
    name: 'Seamless Connectivity',
    description: 'Reliable communication for global operations.',
    tags: ['GSM', 'GPS', 'RF', 'Zigbee', 'BT']
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    name: 'Custom Hardware Logic',
    description: 'High-speed processing tailored for specialized tasks.',
    tags: ['Verilog', 'VHDL', 'Synthesis']
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    name: 'Virtual System Modeling',
    description: 'Predict performance and reduce risk before building.',
    tags: ['Simulink', 'Control', 'DSP']
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    name: 'Websites That Convert',
    description: 'Digital experiences that turn visitors into loyal customers.',
    tags: ['React', 'Node', 'Python', 'APIs']
  },
  {
    icon: <Brain className="w-8 h-8" />,
    name: 'Intelligent Automation',
    description: 'AI models that automate decision-making processes.',
    tags: ['TF', 'PyTorch', 'OpenCV', 'YOLO']
  },
  {
    icon: <Zap className="w-8 h-8" />,
    name: 'Energy-Efficient Circuits',
    description: 'Digital systems designed for maximum power efficiency.',
    tags: ['PCB', 'Digital Logic', 'Power']
  }
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)]"
    >
      <div className="mb-6 text-[var(--accent)] group-hover:text-[#f5a623] transition-colors duration-300">
        {service.icon}
      </div>
      <h3 className="font-display font-bold text-lg mb-3 text-[var(--text)] uppercase tracking-tight">
        {service.name}
      </h3>
      <p className="font-body text-[var(--text-muted)] text-sm mb-6 leading-relaxed">
        {service.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map(tag => (
          <span key={tag} className="font-mono text-[9px] px-2.5 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[var(--text-faint)] group-hover:text-[var(--text-muted)] uppercase tracking-tighter transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[var(--bg)] px-6 md:px-12 selection:bg-[var(--text)] selection:text-[var(--bg)] transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <div className="font-mono text-[9px] md:text-xs text-[var(--text-faint)] mb-4 uppercase tracking-[0.4em]">
            01 / What We Homies Do
          </div>
          <h2 className="font-display font-black text-[36px] sm:text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tighter uppercase text-[var(--text)]">
            We Build Things <br /> That Work.
          </h2>
          <p className="font-body text-lg md:text-2xl text-[var(--text-muted)] max-w-3xl font-light">
            From student projects to startup systems. We solve technical problems, not just code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
