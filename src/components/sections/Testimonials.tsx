import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonialsRow1 = [
  {
    text: "Homies Labs delivered a custom IoT system for our factory in record time. Their technical depth is unmatched.",
    author: "Rajesh Kumar",
    position: "CEO, TechFlow Industries",
    initial: "R"
  },
  {
    text: "The Smart Helmet system they built was a hit. They didn't just deliver code, they understood the core safety problem.",
    author: "Ananya Rao",
    position: "Founder, GreenRide Safety",
    initial: "A"
  },
  {
    text: "Working with Varun and the crew was seamless. They are the go-to team for anything robotics in India.",
    author: "Vikram Shah",
    position: "R&D Lead, Robotics Core",
    initial: "V"
  },
  {
     text: "Absolute wizards for PCB design. Saved us months of prototyping time by getting the first build right.",
     author: "Siddharth Jain",
     position: "CTO, NextStep Hardware",
     initial: "S"
  }
];

const testimonialsRow2 = [
  {
     text: "Their vision for automation is game-changing. High-speed sorting bot increased our efficiency by 200%.",
     author: "Nisha Reddy",
     position: "Operations, S-Logistic",
     initial: "N"
  },
  {
    text: "Top marks for the IEEE reports and the final presentation guidance. Absolute lifesavers for my project.",
    author: "Sajal Mittal",
    position: "Final Year, ECE",
    initial: "S"
  },
  {
    text: "Cleanest C++ code I've seen in any embedded project. They really know their low-level hardware.",
    author: "Amit Patel",
    position: "Software Architect, GridDynamics",
    initial: "A"
  },
  {
    text: "Fast, reliable, and obsessed with the details. Homies Studio is India's best-kept engineering secret.",
    author: "Preeti Singh",
    position: "Founder, AgriSmart Solutions",
    initial: "P"
  }
];

const TestimonialCard = ({ t, rotation }: { t: any; rotation: string }) => (
  <div 
    className={`flex-shrink-0 w-[320px] md:w-[400px] bg-[var(--card)] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-[var(--border)] relative group transition-all duration-500 hover:border-[var(--border-hover)] hover:-translate-y-2 select-none mx-4 ${rotation}`}
  >
    {/* QUOTE MARK */}
    <span className="absolute top-2 right-8 text-[120px] font-black text-[var(--accent)] opacity-[0.05] leading-none group-hover:opacity-[0.1] transition-opacity">"</span>
    
    {/* RATING */}
    <div className="flex gap-1 mb-6 relative z-10">
       {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#f5a623] text-[#f5a623]" />)}
    </div>

    {/* QUOTE */}
    <p className="text-[var(--text)] opacity-80 text-base md:text-lg font-light leading-relaxed mb-10 italic relative z-10">
      "{t.text}"
    </p>

    {/* AUTHOR */}
    <div className="flex items-center gap-4 mt-auto relative z-10">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--text)] text-[var(--bg)] border border-[var(--border)] flex items-center justify-center font-black text-lg md:text-xl transition-all group-hover:scale-110">
        {t.initial}
      </div>
      <div>
        <h4 className="text-[var(--text)] font-bold leading-none mb-1 text-sm md:text-base">{t.author}</h4>
        <p className="text-[var(--text-faint)] text-[9px] font-mono uppercase tracking-[0.2em]">{t.position}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[var(--bg)] overflow-hidden selection:bg-[var(--text)] selection:text-[var(--bg)] transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto px-6 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[9px] md:text-xs text-[var(--text-faint)] uppercase tracking-[0.4em] mb-4">// SOCIAL PROOF</p>
          <h2 className="text-[40px] md:text-[80px] font-display font-black leading-[0.85] tracking-tight uppercase text-[var(--text)] mb-6">
            Clients <br /> Don't Lie.
          </h2>
          <p className="text-lg md:text-2xl font-light text-[var(--text-muted)]">
            Real feedback from real builders.
          </p>
        </div>
      </div>

      <div className="relative space-y-8 cursor-grab active:cursor-grabbing">
        {/* ROW 1: MARQUEE LEFT */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-left [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} rotation={i % 2 === 0 ? '-rotate-1' : 'rotate-1'} />
            ))}
          </div>
        </div>

        {/* ROW 2: MARQUEE RIGHT */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-right [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} rotation={i % 2 === 0 ? 'rotate-1' : '-rotate-1'} />
            ))}
          </div>
        </div>

        {/* MASK GRADIENTS FOR FADE EFFECT */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      </div>

      {/* CTA FOOTER */}
      <div className="mt-20 flex justify-center px-6">
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full sm:w-auto px-10 py-5 bg-[var(--text)] text-[var(--bg)] text-xs font-black rounded-full hover:opacity-90 transition-all uppercase tracking-widest"
           onClick={() => {
             const sanitizedNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '917416636417').replace(/\D/g, '');
             window.location.href = `https://wa.me/${sanitizedNumber}?text=Hi%20Homies%2C%20I%20want%20to%20know%20more%20about%20your%20services`;
           }}
         >
           HEAR MORE SUCCESS STORIES
         </motion.button>
      </div>
    </section>
  );
};

export default Testimonials;
