import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrambleText from '../ui/ScrambleText';
import MagneticButton from '../ui/MagneticButton';

const Hero = () => {
const textRef = useRef<HTMLHeadingElement | null>(null);
const glowRef = useRef<HTMLDivElement | null>(null);
const particlesRef = useRef<HTMLDivElement | null>(null);
const layerRef = useRef<HTMLDivElement | null>(null);

  const [openModal, setOpenModal] = useState(false);

  // 🧠 INTERACTION
  const handleMove = (e: React.MouseEvent) => {
    if (!textRef.current || !glowRef.current || !particlesRef.current || !layerRef.current) return;

    const { innerWidth, innerHeight } = window;
    const x = e.clientX;
    const y = e.clientY;

    const xNorm = (x / innerWidth - 0.5);
    const yNorm = (y / innerHeight - 0.5);

    gsap.to(textRef.current, {
      rotateX: yNorm * -25,
      rotateY: xNorm * 25,
      scale: 1.08,
      transformPerspective: 1600,
      duration: 0.4
    });

    gsap.to(glowRef.current, {
      x: x - innerWidth / 2,
      y: y - innerHeight / 2,
      duration: 0.5
    });

    gsap.to(particlesRef.current, {
      x: xNorm * 80,
      y: yNorm * 80,
      duration: 0.8
    });

    gsap.to(layerRef.current, {
      x: xNorm * 40,
      y: yNorm * 40,
      duration: 1
    });
  };

  const reset = () => {
    gsap.to(textRef.current, { rotateX: 0, rotateY: 0, scale: 1 });
    gsap.to(glowRef.current, { x: 0, y: 0 });
    gsap.to(particlesRef.current, { x: 0, y: 0 });
    gsap.to(layerRef.current, { x: 0, y: 0 });
  };

  // 🌌 PARTICLES
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current?.children;
if (!particles) return;

gsap.to(particles, {
      x: "random(-50,50)",
      y: "random(-50,50)",
      duration: "random(4,8)",
      repeat: -1,
      yoyo: true
    });
  }, []);

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-6"
    >

      {/* GLOW */}
      <div ref={glowRef} className="absolute w-[800px] h-[800px] bg-black/10 blur-[160px] rounded-full -z-10" />

      {/* LAYER */}
      <div ref={layerRef} className="absolute inset-0 bg-gradient-to-br from-transparent via-black/[0.03] to-black/[0.08] -z-10" />

      {/* PARTICLES */}
      <div ref={particlesRef} className="absolute inset-0 -z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black/20 rounded-full"
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">

  {/* EST */}
  <div className="font-mono text-xs tracking-[0.3em] text-gray-400">
    // EST. 2026
  </div>

  {/* TITLE */}
  <motion.h1
    ref={textRef}
    className="font-display font-extrabold text-[48px] md:text-[96px] leading-[0.9] tracking-tight text-black"
  >
    <ScrambleText text="H-𝕆𝕄-IES STUᗡIO" trigger="auto" />
  </motion.h1>

  {/* PARAGRAPH */}
  <motion.p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
    To make something special, you have to build it from scratch. We are a team
    of engineers who design and build custom hardware and software solutions.
  </motion.p>

  {/* BUTTON */}
  <MagneticButton
    onClick={() => setOpenModal(true)}
    className="mt-4 px-8 py-4 bg-black text-white font-semibold rounded-full hover:scale-105 transition"
  >
    Share requirements →
  </MagneticButton>

  {/* QUOTE */}
  <motion.p className="mt-8 text-sm md:text-base text-gray-400 italic opacity-70 max-w-md">
    To make something special, you just have to believe it special.
  </motion.p>

</div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 80 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 80 }}
              className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl"
            >

              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Start Your Project</h2>
                <button onClick={() => setOpenModal(false)}>✕</button>
              </div>

              {/* WHATSAPP FORM */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                    const form = e.currentTarget;

                    const formData = new FormData(form);

                    const name = formData.get('name');
                    const email = formData.get('email');
                    const project = formData.get('project');
                    const timeline = formData.get('timeline');
                    const budget = formData.get('budget');
                    const location = formData.get('location');

                  const message = `🚀 New Project Inquiry

👤 Name: ${name}
📧 Email: ${email}
🧠 Project: ${project}
⏳ Timeline: ${timeline}
💰 Budget: ${budget}
📍 Location: ${location}`;

                  const url = `https://wa.me/917416636417?text=${encodeURIComponent(message)}`;

                  window.open(url, '_blank');
                  setOpenModal(false);
                }}
                className="flex flex-col gap-4"
              >

                <input name="name" required placeholder="Your Name" className="border p-3 rounded-xl" />

<input name="email" required type="email" placeholder="Email" className="border p-3 rounded-xl" />
<input name="mobile number" required type="mobile number" placeholder="Mobile Number" className="border p-3 rounded-xl" />
<textarea name="project" required placeholder="Project Details" className="border p-3 rounded-xl" />

<input name="timeline" required placeholder="Timeline" className="border p-3 rounded-xl" />

<input name="budget" required placeholder="Budget" className="border p-3 rounded-xl" />

<input name="location" required placeholder="Location" className="border p-3 rounded-xl" />

                <button type="submit" className="bg-black text-white py-3 rounded-xl mt-4 hover:scale-105 transition">
                  Send via WhatsApp →
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