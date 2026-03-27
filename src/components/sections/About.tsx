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
  { value: 45, label: "Projects Delivered" },
  { value: 20, label: "Happy Clients" },
  { value: 12, label: "Tech Domains" },
  { value: 4, label: "Core Team" },
];

// ================= UPDATED STAT CARD =================

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
      duration: 1.5,
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
    <div
      className="group perspective"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 8;
        const rotateY = ((x / rect.width) - 0.5) * -8;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
      }}
    >
      <div className="
        bg-white rounded-2xl p-8 
        border border-gray-200 
        shadow-lg 
        transition-all duration-500 
        transform-gpu
        group-hover:scale-105 
        group-hover:-translate-y-2 
        group-hover:shadow-2xl
      ">

        {/* NUMBER */}
        <div className="text-5xl md:text-6xl font-bold text-black tracking-tight">
          <span ref={numberRef}>0</span>+
        </div>

        {/* LABEL */}
        <div className="text-xs tracking-widest text-gray-400 uppercase mt-3">
          {label}
        </div>

      </div>
    </div>
  );
};

// ================= MAIN =================

const About = () => {
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(floatingCardRef.current, {
      y: "-10%",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const handleMouseMove = (e: any) => {
    const card = floatingCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 8;
    const rotateY = ((x / rect.width) - 0.5) * -8;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    if (floatingCardRef.current) {
      floatingCardRef.current.style.transform = "rotateX(0) rotateY(0)";
    }
  };

  return (
    <section id="about" className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">

        <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">
          05 / About
        </p>

        <div className="max-w-3xl">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8"
          >
            Built For Those Who Refuse To Compromise.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-500 text-lg md:text-xl italic mb-6"
          >
            We focus on what actually works — not just what looks good.
          </motion.p>

          <div className="space-y-2 text-sm md:text-base font-medium text-gray-700 leading-relaxed">
            <p>Homies Studio builds real-world solutions.</p>
            <p>No fake demos. No shortcuts.</p>
            <p>If it doesn’t work in real life, we don’t build it.</p>
          </div>

        </div>

        {/* UPDATED STATS GRID */}
        <div className="mt-14 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>

          {/* FLOATING CARD (UNCHANGED) */}
          <motion.div
            ref={floatingCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            initial={{ opacity: 0, y: 40}}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute -top-50 right-0 w-60 p-10 bg-white border border-gray-500 rounded-xl shadow-md hidden md:block"
          >
            <div className="grid grid-cols-4 gap-2 text-gray-300">
              <Zap size={18} /> <Brain size={18} /> <Cpu size={18} /> <Bot size={18} />
              <Code2 size={18} /> <Radio size={18} /> <CircuitBoard size={18} /> <BarChart2 size={18} />
            </div>

            <p className="mt-3 text-[12px] tracking-widest uppercase text-gray-400 text-center">
              Tech Stack Focused
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;