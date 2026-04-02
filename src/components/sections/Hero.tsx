import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';
import ProjectModal from '../modals/ProjectModal';

// INITIALIZE EMAILJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);


const Hero = () => {
  const [stage, setStage] = useState<'intro' | 'main'>('intro');
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openCallModal, setOpenCallModal] = useState(false);
  const [isSubmittingCall, setIsSubmittingCall] = useState(false);
  const [showCallSuccess, setShowCallSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // MOUSE POS FOR INTERACTIVE REVEAL / TRAIL
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleOpenProject = useCallback(() => {
    setOpenProjectModal(true);
  }, []);

  const handleOpenCall = useCallback(() => {
    setOpenCallModal(true);
    setShowCallSuccess(false);
  }, []);

  useEffect(() => {
    const handleTriggerCall = () => handleOpenCall();
    window.addEventListener('open-call-modal', handleTriggerCall);
    return () => window.removeEventListener('open-call-modal', handleTriggerCall);
  }, [handleOpenCall]);

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

              <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.8
                    }
                  }
                }}
                className="block text-white mt-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] tracking-[0.4em] not-italic"
              >
                {"THAT DOMINATE".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 1.2, filter: 'blur(10px)' },
                      visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
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
                  WE H𝕆𝕄IES DEVELOP BOTH HARDWARE & SOFTWARE PROJECTS
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
                onClick={handleOpenProject}
                className="w-full sm:w-auto min-w-[240px] md:min-w-[280px] px-10 py-5 md:py-6 bg-[#E5E5E5] text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase rounded-[2rem] hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                START PROJECT
              </button>

              <button
                onClick={handleOpenCall}
                className="w-full sm:w-auto min-w-[240px] md:min-w-[280px] px-10 py-5 md:py-6 bg-[#E5E5E5] text-black font-black text-xs md:text-sm tracking-[0.2em] uppercase rounded-[2rem] hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                BOOK CALL
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STANDALONE PROJECT MODAL --- */}
      <ProjectModal 
        isOpen={openProjectModal}
        onClose={() => setOpenProjectModal(false)}
      />

      {/* --- REFINED CALL BOOKING MODAL --- */}
      <AnimatePresence>
        {openCallModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCallModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[9000]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[10000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpenCallModal(false)}
                className="absolute top-8 right-8 w-10 h-10 border border-white/10 text-white/40 hover:text-white hover:border-white/40 flex items-center justify-center rounded-full transition-all group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform" />
              </button>

              <div className="text-center w-full">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">SCHEDULE</h2>
                <p className="text-white/40 text-[9px] font-mono tracking-widest uppercase mb-12 underline underline-offset-8">Booking Protocol 1.1</p>
              </div>

              {showCallSuccess ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Booking Sent.</h3>
                  <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed uppercase tracking-wider font-medium">
                    Redirecting to WhatsApp to finalize time.
                  </p>
                  <button onClick={() => setOpenCallModal(false)} className="mt-10 px-8 py-3 bg-white text-black font-black text-[10px] tracking-widest uppercase rounded-full hover:scale-105 transition-all">Close</button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmittingCall(true);
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') as string;
                    const purpose = formData.get('purpose');
                    const details = formData.get('details');

                    const msg = `Hello Homies Studio Team,\nMy name is ${name}.\n\nI would like to book a call.\n\nPurpose: ${purpose}\nDetails: ${details}\n\nPlease let me know a suitable time to connect.\n\nThank you.`;
                    
                    try {
                      // EMAIL JS WITH TIMEOUT
                      const emailPromise = emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        {
                          from_name: name,
                          purpose: purpose,
                          description: details,
                          message: msg,
                          to_email: 'info.homiesstudio@gmail.com'
                        }
                      );

                      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 8000));
                      await Promise.race([emailPromise, timeoutPromise]).catch(e => console.warn("Email delayed/fail", e));
                    } catch (e) {
                      console.error("Email failed", e);
                    }

                    
                    window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                    setIsSubmittingCall(false);
                    setShowCallSuccess(true);
                  }}
                  className="w-full space-y-6"
                >
                  <div className="space-y-4">
                    <input name="name" required placeholder="YOUR NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all" />
                    <input name="purpose" required placeholder="PURPOSE OF CALL" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 focus:border-white/30 transition-all" />
                    <textarea name="details" required placeholder="SHORT DESCRIPTION" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-xs font-bold uppercase tracking-wider text-white placeholder-white/20 resize-none focus:border-white/30 transition-all" />
                  </div>

                  <button 
                    disabled={isSubmittingCall}
                    type="submit" 
                    className={`w-full py-5 bg-white text-black font-black text-[10px] tracking-[0.4em] uppercase rounded-full transition-all flex items-center justify-center gap-2 ${isSubmittingCall ? 'opacity-50 pointer-events-none' : 'hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]'}`}
                  >
                    {isSubmittingCall ? 'PREPARING...' : 'CONFIRM & BOOK ON WHATSAPP →'}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;