import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const Hero = () => {
  const [stage, setStage] = useState<'intro' | 'main'>('intro');
  const [openModal, setOpenModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // MOUSE POS FOR INTERACTIVE REVEAL / TRAIL
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleOpenModal = useCallback(() => setOpenModal(true), []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // STAGE TRANSITION
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('main');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // MOUSE TRACKING
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:pl-28 overflow-hidden relative transition-colors duration-500 ${!isMobile ? 'cursor-none' : 'cursor-auto'}`}
    >
      {/* 1. PREMIUM BACKGROUND: RADIAL GRADIENT + VIGNETTE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--surface)_0%,var(--bg)_100%)] transition-colors duration-500" />
      <div className="absolute inset-0 z-0 bg-[var(--bg)]/40 backdrop-blur-[1px] pointer-events-none transition-colors duration-500" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg)_90%)] pointer-events-none transition-colors duration-500" />

      {/* SUBTLE GRAIN / NOISE */}
      <div className="noise-overlay opacity-[0.03]" />

      {/* CURSOR GLOW TRAIL / SPOTLIGHT MASK (Desktop Only) */}
      {!isMobile && (
        <>
          <motion.div
            style={{
              left: springX,
              top: springY,
              translateX: '-50%',
              translateY: '-50%'
            }}
            className="fixed w-[500px] h-[500px] z-5 pointer-events-none bg-[var(--floating-icon)] rounded-full blur-3xl opacity-50"
          />
          <motion.div
            style={{
              left: mouseX,
              top: mouseY,
              translateX: '-50%',
              translateY: '-50%'
            }}
            className="fixed w-4 h-4 z-[9999] pointer-events-none border border-[var(--text)]/40 rounded-full flex items-center justify-center"
          >
            <div className="w-1 h-1 bg-[var(--text)] rounded-full" />
          </motion.div>
        </>
      )}

      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          /* 3. CINEMATIC INTRO ANIMATION */
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center px-10 bg-[var(--bg)] transition-colors duration-500"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[clamp(20px,4.5vw,56px)] font-black tracking-[0.25em] uppercase italic text-center leading-tight"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255,255,255,0.2)",
                    "0 0 25px rgba(255,255,255,0.8)",
                    "0 0 5px rgba(255,255,255,0.2)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="block text-white"
              >
                WE BUILD SYSTEMS
              </motion.span>

              <span className="block text-white/40 blur-[3px] mt-2">
                THAT DOMINATE
              </span>
            </motion.h2>
          </motion.div>
        ) : (
          /* 4. MAIN PREMIUM CONTENT */
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative z-10 w-full max-w-7xl flex flex-col items-center select-none pt-12 md:pt-0"
          >
            {/* 1. TYPOGRAPHY - BLOCKY HOMIES Studio */}
            <div className="flex flex-col items-center w-full relative mb-12 md:mb-16">
              {/* THE HALO GLOW */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-500/20 rounded-full blur-[100px] md:blur-[180px] pointer-events-none z-0" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[200px] md:h-[200px] bg-amber-400/40 rounded-full blur-[40px] md:blur-[80px] pointer-events-none z-0" />

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-[clamp(60px,18vw,240px)] font-black leading-none text-white uppercase font-['Inter'] tracking-[-0.05em] drop-shadow-[5px_5px_0px_#333] md:drop-shadow-[15px_15px_0px_#333]"
              >
                H<span className="text-amber-400 font-extralight drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]">𝕆𝕄</span>IES
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[clamp(40px,10vw,120px)] font-black leading-none text-white mt-[-2vw] font-['Syne'] italic drop-shadow-[4px_4px_0px_#333] md:drop-shadow-[10px_10px_0px_#333]"
              >
                Studio
              </motion.h1>

              {/* TAGLINE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 md:mt-20 overflow-hidden px-4"
              >
                <p className="text-[clamp(10px,1.5vw,16px)] tracking-[0.25em] uppercase text-white font-black leading-relaxed">
                  SOFTWARE - HARDWARE DEVELOPMENT
                </p>
              </motion.div>
            </div>



            {/* 5. BUTTONS (PILL STYLING) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 md:mt-24 w-full px-8"
            >
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto min-w-[240px] md:min-w-[280px] px-10 py-5 md:py-6 bg-[#E5E5E5] text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase rounded-[2rem] hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                START PROJECT
              </button>

              <button
                onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, '_blank')}
                className="w-full sm:w-auto min-w-[240px] md:min-w-[280px] px-10 py-5 md:py-6 bg-[#E5E5E5] text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase rounded-[2rem] hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                BOOK CALL
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREMIUM COMPREHENSIVE QUOTE MODAL --- */}
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="fixed inset-0 bg-[var(--bg)]/95 backdrop-blur-3xl z-[9000] transition-colors duration-500"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[95%] max-w-2xl bg-[var(--surface)] border border-[var(--border)] p-8 sm:p-12 md:p-16 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto scrollbar-hide text-[var(--text)] transition-colors duration-500"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 border border-[var(--border)] text-[var(--text-faint)] hover:text-[var(--text)] hover:border-[var(--text)] flex items-center justify-center transition-all group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>

              <h2 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tighter uppercase mb-2">INITIATE</h2>
              <p className="text-[var(--text-faint)] text-[9px] font-mono tracking-widest uppercase mb-10 md:mb-12 underline underline-offset-8">Mission Protocol 1.0</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const phone = formData.get('phone');
                  const category = formData.get('category');
                  const budget = formData.get('budget');
                  const vision = formData.get('project');

                  const msg = `MISSION_START: 🚀\nID: ${name}\nCOMM: ${email}\nWA: ${phone}\nTYPE: ${category}\nEST: ${budget}\nVISION: ${vision}`;
                  window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                  setOpenModal(false);
                }}
                className="w-full space-y-7 md:space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                    <input name="name" required placeholder="IDENTIFICATION (NAME) *" className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] placeholder-[var(--text)]/10" />
                  </div>
                  <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                    <input name="email" type="email" required placeholder="COMM_CHANNEL (EMAIL) *" className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] placeholder-[var(--text)]/10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                    <input name="phone" required placeholder="CONTACT_UPLINK (WA) *" className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] placeholder-[var(--text)]/10" />
                  </div>
                  <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                    <select name="category" required className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] appearance-none cursor-pointer">
                      <option value="" className="bg-[var(--surface)]">SYSTEM_TYPE (CATEGORY) *</option>
                      <option value="WEB SYSTEM" className="bg-[var(--surface)]">WEB SYSTEM</option>
                      <option value="EMBEDDED/IOT" className="bg-[var(--surface)]">EMBEDDED / IOT</option>
                      <option value="ROBOTICS/AI" className="bg-[var(--surface)]">ROBOTICS / AI</option>
                      <option value="BRANDING/UI" className="bg-[var(--surface)]">UI/UX BRANDING</option>
                    </select>
                  </div>
                </div>

                <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                  <select name="budget" required className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] appearance-none cursor-pointer">
                    <option value="" className="bg-[var(--surface)]">ESTIMATED_RESOURCES (BUDGET) *</option>
                    <option value="UNDER ₹20K" className="bg-[var(--surface)]">UNDER ₹20K</option>
                    <option value="₹20K - ₹50K" className="bg-[var(--surface)]">₹20K - ₹50K</option>
                    <option value="₹50K - ₹1.5L" className="bg-[var(--surface)]">₹50K - ₹1.5L</option>
                    <option value="₹1.5L+" className="bg-[var(--surface)]">₹1.5L+</option>
                  </select>
                </div>

                <div className="relative border-b border-[var(--border)] focus-within:border-[var(--text)] transition-colors pb-2">
                  <textarea name="project" required placeholder="MISSION_VISION (DESCRIBE YOUR VISION...) *" rows={2} className="w-full bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest text-[var(--text)] placeholder-[var(--text)]/10 resize-none" />
                </div>

                <button type="submit" className="w-full py-5 md:py-6 bg-[var(--text)] text-[var(--bg)] font-black text-[10px] md:text-[11px] tracking-[0.4em] uppercase hover:opacity-90 transition-all relative group overflow-hidden">
                  VERIFY & INITIATE MISSION →
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;