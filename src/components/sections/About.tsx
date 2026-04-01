import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap, Brain, Cpu, Bot,
  Code2, Radio, CircuitBoard, BarChart2
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 333, label: "Systems Engineered" },
  { value: 50, label: "Happy Clients" },
  { value: 12, label: "Core Tech Domains" },
  { value: 4, label: "Years of Obsession" },
];

const StatCounter = ({ value, label }: any) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.ceil(obj.val).toString();
        }
      },
    });
  }, [value]);

  return (
    <div className="group relative">
      <div className="bg-[var(--card)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-500 hover:-translate-y-2">
        <div className="text-4xl md:text-5xl font-black text-[var(--text)] tracking-tighter">
          <span ref={numberRef}>0</span>+
        </div>
        <div className="text-[9px] tracking-[0.2em] text-[var(--text-faint)] uppercase mt-3 font-mono">
          {label}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--bg)] text-[var(--text)] px-6 md:px-12 transition-colors duration-500 relative overflow-hidden">
      <div className="noise-overlay opacity-[0.02]" />

      <div className="max-w-[1440px] mx-auto relative z-10">

        <p className="text-[var(--text-faint)] text-[9px] md:text-xs tracking-[0.4em] uppercase mb-10 font-mono italic">
          05 / About Homies
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-24">
          <div className="max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[clamp(32px,6vw,86px)] font-display font-black leading-[0.9] mb-12 tracking-tighter uppercase"
            >
              Built For People <br /> Who Refuse To <br /> Compromise.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[var(--text-muted)] text-lg md:text-3xl italic mb-12 font-light leading-relaxed pr-6"
            >
              We focus on what actually works — not just what looks good. We are builders, engineers, and obsessed craftsmen.
            </motion.p>

            <div className="space-y-6 text-base md:text-lg font-light text-[var(--text-muted)] leading-relaxed max-w-2xl">
              <p className="border-l-4 border-amber-500 pl-8">Homies Studio builds real-world solutions that survive the production environment.</p>
              <p className="border-l-4 border-amber-500 pl-8 text-[var(--text)] font-bold uppercase tracking-tight">No fake demos. No shortcuts. No fluff.</p>
              <p className="border-l-4 border-amber-500 pl-8">If it doesn’t work in real life, it doesn't leave the Homies Lab.</p>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0 flex flex-col h-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center text-center group"
            >
              {/* DECORATIVE BACKGROUND GLOW */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700" />

              <div className="grid grid-cols-4 gap-6 text-[var(--text)] opacity-60 mb-10 justify-items-center group-hover:opacity-100 transition-opacity">
                <Zap size={24} /> <Brain size={24} /> <Cpu size={24} /> <Bot size={24} />
                <Code2 size={24} /> <Radio size={24} /> <CircuitBoard size={24} /> <BarChart2 size={24} />
              </div>
              <h4 className="text-2xl md:text-4xl font-display font-black uppercase mb-4 tracking-tighter text-[var(--text)]">The Lab.</h4>
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed font-light">
                Serve the INDIA. <br />
                Our engineering lab is where hardware meets intelligence.
              </p>
              <div className="mt-10 font-mono text-[9px] tracking-[0.4em] uppercase text-amber-500 font-bold">
                 // IN LAB EST. 2026
              </div>
            </motion.div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;