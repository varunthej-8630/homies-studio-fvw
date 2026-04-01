import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const points = [
  { others: "Copy-paste projects", ours: "Custom-built systems" },
  { others: "Just code delivery", ours: "Real working solution" },
  { others: "No real understanding", ours: "Deep technical explanation" },
  { others: "No support after delivery", ours: "Dedicated support & guidance" },
  { others: "Fake demos", ours: "Real-time tested systems" },
  { others: "Only software", ours: "Hardware + Software integration" },
  { others: "No scalability", ours: "Startup-ready architecture" },
];

const Comparison: React.FC = () => {
  const [start, setStart] = useState(false);
  const [clash, setClash] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const onViewportEnter = () => {
    setStart(true);
    setTimeout(() => setClash(true), 800);
    setTimeout(() => setShowTable(true), 1400);
  };

  return (
    <motion.section 
      id="comparison" 
      className="py-24 md:py-40 bg-[var(--bg)] text-[var(--text)] px-6 md:px-12 selection:bg-[var(--text)] selection:text-[var(--bg)] overflow-hidden transition-colors duration-500 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      onViewportEnter={onViewportEnter}
    >
      {/* BACKGROUND DECOR */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[radial-gradient(circle_at_center,var(--floating-icon)_0%,transparent_70%)] opacity-20 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <p className="font-mono text-[9px] md:text-xs text-[var(--text-faint)] mb-4 uppercase tracking-[0.4em]">
            06 / The Homies Edge
          </p>
          <h2 className="font-display font-black text-[clamp(42px,7vw,100px)] mb-8 leading-[0.9] tracking-tighter uppercase whitespace-pre-line">
            Why Homies <br /> Stand Out.
          </h2>
          <p className="font-body text-lg md:text-2xl text-[var(--text-muted)] max-w-3xl font-light leading-relaxed mx-auto md:mx-0">
            We don't just deliver code. We deliver industrial-grade systems designed to survive real-world chaos.
          </p>
        </div>

        {/* CLASH STAGE (Animated VS) */}
        {!showTable && (
          <div className="relative h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden mb-20 bg-[var(--surface)] rounded-[3rem] md:rounded-[4rem] border border-[var(--border)] shadow-inner">
            <motion.div
              initial={{ x: "-200%" }}
              animate={start ? { x: clash ? "-20%" : "-60%" } : {}}
              transition={{ duration: clash ? 0.2 : 0.8, ease: "easeOut" }}
              className="absolute text-[var(--text-faint)] font-black text-xl md:text-4xl uppercase tracking-tighter italic"
            >
              Average Agencies
            </motion.div>

            <motion.div
              initial={{ x: "200%" }}
              animate={start ? { x: clash ? "20%" : "60%" } : {}}
              transition={{ duration: clash ? 0.2 : 0.8, ease: "easeOut" }}
              className="absolute text-[var(--text)] font-black text-xl md:text-4xl uppercase tracking-tighter italic"
            >
              Homies Studio
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{
                scale: clash ? [1, 1.8, 1] : 0,
                rotate: clash ? 0 : -45,
                opacity: clash ? 1 : 0,
              }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-5xl md:text-8xl font-black z-10 text-amber-500 italic drop-shadow-[0_0_30px_rgba(245,166,35,0.4)]"
            >
              VS
            </motion.div>
          </div>
        )}

        {/* TABLE (Premium UI) */}
        {showTable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto border border-[var(--border)] rounded-[3rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden bg-[var(--card)]"
          >
            <div className="grid grid-cols-2 bg-[var(--text)] text-[var(--bg)] p-6 md:p-10 md:px-14">
              <div className="text-[var(--bg)] opacity-40 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase font-mono">
                THE OTHERS
              </div>
              <div className="text-[var(--bg)] text-right text-[10px] md:text-xs font-black tracking-[0.3em] uppercase font-mono flex items-center justify-end gap-4">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,166,35,0.8)]" />
                HOMIES STUDIO
              </div>
            </div>

            <div className="p-8 md:p-16 space-y-0 divide-y divide-[var(--border)]">
              {points.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="grid grid-cols-2 items-center py-8 group transition-all"
                >
                  <div className="flex items-center gap-3 md:gap-5 text-[var(--text-faint)] group-hover:text-[var(--text-muted)] transition-colors pr-6">
                    <X size={18} className="text-red-500/30 shrink-0" />
                    <span className="text-sm md:text-2xl font-light leading-tight tracking-tight">{item.others}</span>
                  </div>

                  <div className="flex items-center justify-end gap-3 md:gap-6 text-[var(--text)]">
                    <span className="text-sm md:text-2xl text-right font-black leading-tight tracking-tight">{item.ours}</span>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-amber-500/20 flex items-center justify-center bg-amber-500/5 transition-all group-hover:bg-amber-500 group-hover:text-black">
                      <Check size={18} className="text-amber-500 group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* HIGHLIGHTED FOOTER FOOTER */}
        <div className="text-center mt-32 md:mt-44 relative group">
          <div className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <motion.p 
            initial={{ opacity: 0.1, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-[clamp(18px,4vw,48px)] font-black uppercase tracking-tighter text-[var(--text)] leading-none italic relative z-10 selection:bg-amber-500 selection:text-black"
          >
            Don't <span className="text-amber-500 drop-shadow-[0_0_35px_rgba(245,166,35,0.3)] transition-all duration-500 hover:drop-shadow-[0_0_50px_rgba(245,166,35,0.6)]">Settle</span> <br className="md:hidden" /> For Less.
          </motion.p>
          <div className="mt-8 flex justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Comparison;