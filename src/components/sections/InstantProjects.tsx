import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AI Study Assistant",
    description: "An intelligent study companion that uses LLMs to summarize notes, generate quizzes, and answer academic queries instantly."
  },
  {
    id: 2,
    title: "Hand Gesture Controller",
    description: "Navigate your computer system or software using high-precision computer vision and real-time hand gesture recognition."
  },
  {
    id: 3,
    title: "Smart Surveillance System",
    description: "AI-powered security system with real-time face detection, object tracking, and instant mobile alerts for anomaly detection."
  },
  {
    id: 4,
    title: "Portfolio Website (Futuristic UI)",
    description: "Next-gen portfolio with smooth WebGL transitions, glassmorphism, and high-end animations designed for elite creators."
  },
  {
    id: 5,
    title: "Instagram Automation Tool",
    description: "Boost your social presence with autonomous engagement, smart scheduling, and AI-driven hashtag analytics."
  },
  {
    id: 6,
    title: "Resume Builder AI",
    description: "Generate ATS-optimized resumes in seconds using AI that analyzes your career path and suggests high-impact keywords."
  }
];

const InstantProjects: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917416636417";

  const handleOrder = (projectName: string) => {
    const msg = `Hi, I am interested in the project: ${projectName}. Please share more details and pricing.`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="instant-projects" className="py-24 md:py-32 bg-[var(--bg)] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-amber-500 font-bold mb-4">// QUICK DELIVERY</p>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--accent)] uppercase tracking-tighter mb-6 leading-none">
            Instant Project <span className="text-amber-500 font-extralight italic font-['Syne']">Deliveries</span>.
          </h2>
          <p className="text-[var(--text-faint)] text-xs md:text-sm tracking-[0.2em] uppercase font-bold max-w-2xl mx-auto">
            Ready-made high-quality projects. Delivered instantly.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-8 md:p-10 transition-all hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(251,191,36,0.1)] flex flex-col justify-between overflow-hidden"
            >
              {/* DECOR GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[50px] transition-opacity opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-8 transition-transform group-hover:scale-110 duration-500">
                  <ShoppingCart size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[var(--accent)] uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--text-faint)] text-[10px] md:text-xs leading-relaxed uppercase tracking-wider font-medium line-clamp-3">
                  {project.description}
                </p>
              </div>

              <button
                onClick={() => handleOrder(project.title)}
                className="mt-12 w-full py-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 text-[var(--text-faint)] font-bold text-[9px] uppercase tracking-[0.3em] group/btn transition-all hover:bg-white hover:text-black hover:border-white shadow-xl"
              >
                Order via WhatsApp
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* FOOTER DECOR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mx-auto mb-8" />
          <p className="text-[8px] tracking-[0.4em] uppercase text-[var(--text-faint)] opacity-30">
            © MISSION SUCCESS // FAST TRACK PROTOCOL
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default InstantProjects;
