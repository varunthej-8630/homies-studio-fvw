import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const Particles = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = (canvas.width = window.innerWidth);
      h = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      op: Math.random() * 0.35 + 0.08
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.op})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-40" />;
};

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
    }, 6000);
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

  const springParallaxX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springParallaxY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // PARALLAX CALCULATIONS (Smoothed)
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winH = typeof window !== 'undefined' ? window.innerHeight : 1000;

  const rotateX = useTransform(springParallaxY, [0, winH], [4, -4]);
  const rotateY = useTransform(springParallaxX, [0, winW], [-6, 6]);
  
  const lx1 = useTransform(springParallaxX, [0, winW], [-15, 15]);
  const ly1 = useTransform(springParallaxY, [0, winH], [-8, 8]);
  
  const lx2 = useTransform(springParallaxX, [0, winW], [-10, 10]);
  const ly2 = useTransform(springParallaxY, [0, winH], [-5, 5]);
  
  const lx3 = useTransform(springParallaxX, [0, winW], [-5, 5]);
  const ly3 = useTransform(springParallaxY, [0, winH], [-3, 3]);

  const MagneticButton = ({ children, onClick, className }: any) => {
    const mbX = useMotionValue(0);
    const mbY = useMotionValue(0);
    const springMagnX = useSpring(mbX, { stiffness: 200, damping: 20 });
    const springMagnY = useSpring(mbY, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      mbX.set(x * 0.25);
      mbY.set(y * 0.25);
    };

    const handleMouseLeave = () => {
      mbX.set(0);
      mbY.set(0);
    };

    return (
      <motion.button
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ x: springMagnX, y: springMagnY }}
        className={`${className} transition-colors duration-200`}
      >
        {children}
      </motion.button>
    );
  };

  const LetterAnimation = ({ text, delayOffset = 0 }: { text: string, delayOffset?: number }) => {
    const characters = Array.from(text);
    return (
      <div className="flex flex-wrap justify-center">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: (i * 0.08) + delayOffset,
              duration: 0.3,
              ease: "easeOut"
            }}
            style={{ marginRight: char === ' ' ? '1ch' : '0' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden relative transition-colors duration-500 ${!isMobile ? 'cursor-none' : 'cursor-auto'}`}
    >
      {/* 1. PREMIUM BACKGROUND: RADIAL GRADIENT + VIGNETTE */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--surface)_0%,var(--bg)_100%)] transition-colors duration-500" />
      <div className="absolute inset-0 z-0 bg-[var(--bg)]/40 backdrop-blur-[1px] pointer-events-none transition-colors duration-500" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg)_90%)] pointer-events-none duration-500" />

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
            <div
              className="tracking-[0.1em] uppercase text-center leading-[1.2] px-10 text-[var(--text)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              style={{ 
                fontFamily: 'var(--font-mono)',
                fontSize: isMobile ? 'clamp(20px, 8vw, 40px)' : '92.5px'
              }}
            >
              <LetterAnimation text="WE BUILD SYSTEMS" />
              <LetterAnimation text="THAT DOMINATE." delayOffset={1.5} />
            </div>
          </motion.div>
        ) : (
          /* 4. MAIN PREMIUM CONTENT WITH 3D PARALLAX */
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="relative z-10 w-full max-w-7xl flex flex-col items-center select-none pt-12 md:pt-0 transform-gpu"
          >
            <Particles active={stage === 'main'} />

            {/* LAYER 1: MAIN HEADING (Deepest Parallax) */}
            <motion.div 
              style={{ x: lx1, y: ly1 }}
              className="flex flex-col items-center w-full"
            >
              <motion.h1 
                className="text-[clamp(60px,15vw,220px)] leading-[0.8] text-white uppercase mb-2 select-none"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  textShadow: '8px 8px 0px rgba(255,255,255,0.1), 15px 15px 30px rgba(0,0,0,0.5)'
                }}
              >
                H-<span className="text-[#FFC107] drop-shadow-[0_0_35px_rgba(255,193,7,0.7)]" style={{ fontFamily: 'var(--font-accent)' }}>𝕆𝕄</span>-IES
              </motion.h1>

              <div className="relative">
                <motion.h1 
                  style={{ x: lx2, y: ly2, fontFamily: 'var(--font-accent)' }}
                  className="text-[clamp(24px,6vw,90px)] font-black leading-none tracking-[0.6em] uppercase text-[var(--text-muted)] mt-[-1vw]"
                >
                  STUDIO
                </motion.h1>
                {/* Mirror Reflection */}
                <motion.h1 
                  style={{ x: lx2, y: ly2, fontFamily: 'var(--font-accent)' }}
                  className="absolute left-0 right-0 top-[70%] text-[clamp(24px,6vw,90px)] font-black leading-none tracking-[0.6em] uppercase text-white/5 mt-[-1vw] scale-y-[-1] blur-[2px] pointer-events-none"
                >
                  STUDIO
                </motion.h1>
              </div>
            </motion.div>

            {/* LAYER 2: TAGLINE */}
            <motion.div 
              style={{ x: lx3, y: ly3 }}
              className="mt-10 overflow-hidden px-4"
            >
              <p className="font-mono text-[clamp(9px,1.1vw,13px)] tracking-[0.4em] uppercase text-[var(--text-muted)] font-black leading-relaxed">
                HARDWARE & SOFTWARE SOLUTIONS
              </p>
            </motion.div>

            {/* LAYER 3: DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-8 md:mt-10 text-[clamp(13px,1.4vw,16px)] text-[var(--text)] max-w-md md:max-w-2xl mx-auto leading-relaxed font-light px-6"
            >
              To make something special, you have to build it from scratch. <br />
              We are a team of engineers who design and build custom hardware 
              and software solutions. <br className="hidden md:block" />
              To make something special, you just have to believe it special.
            </motion.p>

            {/* LAYER 4: BUTTONS (Magnetic) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mt-10 md:mt-14 w-full px-8 sm:px-12"
            >
              <MagneticButton
                onClick={handleOpenModal}
                data-cursor-text="START_MISSION"
                className="group relative w-full sm:w-auto min-w-[180px] md:min-w-[220px] px-8 py-3.5 md:py-4 bg-[var(--text)] text-[var(--bg)] font-black text-[10px] md:text-[11px] tracking-[0.25em] uppercase rounded-full overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg)]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                START PROJECT
              </MagneticButton>

              <MagneticButton
                onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, '_blank')}
                data-cursor-text="BOOK_CALL"
                className="w-full sm:w-auto min-w-[180px] md:min-w-[220px] px-8 py-3.5 md:py-4 bg-transparent border border-[var(--border)] text-[var(--text)] font-black text-[10px] md:text-[11px] tracking-[0.25em] uppercase rounded-full hover:bg-[var(--text)]/5 hover:border-[var(--text)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                BOOK CALL
              </MagneticButton>
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