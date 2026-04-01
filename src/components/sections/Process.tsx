import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, FileSearch, PenLine, 
  Hammer, FlaskConical, PackageCheck 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'Reach Out',
    timeline: 'Within 24 Hours',
    description: 'Tell us what you need. WhatsApp, email, DM — whatever works for you.'
  },
  {
    number: '02',
    icon: <FileSearch className="w-5 h-5" />,
    title: 'Scope It',
    timeline: '2-3 Days',
    description: 'We break your idea into a clear deliverables list, timeline, and price.'
  },
  {
    number: '03',
    icon: <PenLine className="w-5 h-5" />,
    title: 'Agreement',
    timeline: 'Instant',
    description: 'Simple 1-page agreement. Advance payment. Then we start — no delays.'
  },
  {
    number: '04',
    icon: <Hammer className="w-5 h-5" />,
    title: 'Build',
    timeline: '2-4 Weeks',
    description: 'Your assigned team builds it. You get updates every few days.'
  },
  {
    number: '05',
    icon: <FlaskConical className="w-5 h-5" />,
    title: 'Test',
    timeline: '3-5 Days',
    description: 'Internal QA first. Then we demo it to you. Revisions included.'
  },
  {
    number: '06',
    icon: <PackageCheck className="w-5 h-5" />,
    title: 'Delivered',
    timeline: 'Final Step',
    description: 'All files, code, and docs handed over. Done. Clean.'
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        }
      );

      const stepsElements = gsap.utils.toArray('.process-step') as HTMLElement[];
      stepsElements.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-24 md:py-32 bg-[var(--bg)] px-6 md:px-12 overflow-hidden transition-colors duration-500" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-20">
          <div className="font-mono text-[9px] md:text-xs text-[var(--text-faint)] mb-4 uppercase tracking-[0.4em]">
            02 / THE PROCESS
          </div>
          <h2 className="font-display font-black text-[36px] sm:text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight tracking-tighter uppercase text-[var(--text)]">
            Idea to Delivered.
          </h2>
          <p className="font-body text-lg md:text-2xl text-[var(--text-muted)] max-w-2xl font-light">
            No ghosting. No broken promises. Just a clean, transparent workflow.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--border)] hidden lg:block" />
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--text)] origin-left hidden lg:block"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-16 relative">
            {steps.map((step) => (
              <div key={step.number} className="process-step relative group flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Decorative Number */}
                <span className="absolute -top-12 -left-4 font-display font-black text-8xl text-[var(--text)] opacity-[0.03] select-none transition-all duration-500 group-hover:opacity-[0.06]">
                  {step.number}
                </span>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[var(--card)] rounded-full flex items-center justify-center border border-[var(--border)] mb-6 group-hover:border-[var(--text)] transition-colors duration-300 mx-auto lg:mx-0">
                    <span className="text-[var(--text)] group-hover:text-[#f5a623] transition-colors">{step.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-1 text-[var(--text)] uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#f5a623] font-bold mb-3">
                    {step.timeline}
                  </div>
                  <p className="font-body text-[var(--text-muted)] text-xs leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
