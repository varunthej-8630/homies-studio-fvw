import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Bot, Radio, CircuitBoard, 
  BarChart2, Code2, Brain, Zap 
} from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';

const services = [
  {
    icon: <Cpu className="w-8 h-8" />,
    name: 'IoT & Embedded',
    description: 'Smart devices that sense, think and act.',
    tags: ['Arduino', 'RPi', 'ESP32', 'ARM']
  },
  {
    icon: <Bot className="w-8 h-8" />,
    name: 'Robotics & Drones',
    description: 'Machines that move and react to the world.',
    tags: ['ROS', 'UAV', 'Servo', 'Sensors']
  },
  {
    icon: <Radio className="w-8 h-8" />,
    name: 'Communication Systems',
    description: 'Connect anything, anywhere.',
    tags: ['GSM', 'GPS', 'RF', 'Zigbee', 'BT']
  },
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    name: 'FPGA & VLSI',
    description: 'Hardware logic, designed from the ground up.',
    tags: ['Verilog', 'VHDL', 'Synthesis']
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    name: 'MATLAB & Simulation',
    description: 'Model it before you build it.',
    tags: ['Simulink', 'Control', 'DSP']
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    name: 'Web & Software Dev',
    description: 'Interfaces and systems that users love.',
    tags: ['React', 'Node', 'Python', 'APIs']
  },
  {
    icon: <Brain className="w-8 h-8" />,
    name: 'AI / ML & Vision',
    description: 'Models that see, predict and automate.',
    tags: ['TF', 'PyTorch', 'OpenCV', 'YOLO']
  },
  {
    icon: <Zap className="w-8 h-8" />,
    name: 'Electrical & Digital',
    description: 'Circuits, PCBs and digital systems.',
    tags: ['PCB', 'Digital Logic', 'Power']
  }
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const { cardRef, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      initial={{ opacity: 1, x: 40 }}
      whileInView={{ opacity: 1, y: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      style={{ perspective: '1400px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative h-full bg-white border border-border rounded-4xl p-8 transition-all duration-300 hover:border-accent-blue hover:shadow-xl"
      >
        <div className="mb-6 text-text-primary group-hover:text-accent-blue transition-colors duration-300">
          {service.icon}
        </div>
        <h3 className="font-display font-bold text-xl mb-3 relative inline-block">
          {service.name}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-blue transition-all duration-300 group-hover:w-full" />
        </h3>
        <p className="font-body text-text-secondary text-sm mb-6">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {service.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] px-2 py-1 bg-surface border border-border rounded-full text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10">
          <div className="font-mono text-xs text-text-secondary mb-4 underline decoration-accent-emerald underline-offset-4">
            01 / What We Homies Do
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6">
            We Build Things That Work.
          </h2>
          <p className="font-body text-xl text-text-secondary max-w-2xl">
            From student projects to startup systems. We solve technical problems, not just code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
