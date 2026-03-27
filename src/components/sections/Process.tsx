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
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'You Reach Out',
    description: 'Tell us what you need. WhatsApp, email, DM — whatever works for you.'
  },
  {
    number: '02',
    icon: <FileSearch className="w-6 h-6" />,
    title: 'We Scope It',
    description: 'We break your idea into a clear deliverables list, timeline, and price.'
  },
  {
    number: '03',
    icon: <PenLine className="w-6 h-6" />,
    title: 'Contract Signed',
    description: 'Simple 1-page agreement. Advance payment. Then we start — no delays.'
  },
  {
    number: '04',
    icon: <Hammer className="w-6 h-6" />,
    title: 'We Build',
    description: 'Your assigned team builds it. You get updates every few days.'
  },
  {
    number: '05',
    icon: <FlaskConical className="w-6 h-6" />,
    title: 'Test & Review',
    description: 'Internal QA first. Then we demo it to you. Revisions included.'
  },
  {
    number: '06',
    icon: <PackageCheck className="w-6 h-6" />,
    title: 'Delivered',
    description: 'All files, code, and docs handed over. Done. Clean.'
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
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

      // Staggered reveal of steps
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
    <section id="process" className="py-24 bg-surface px-6 md:px-12 overflow-hidden" ref={containerRef}>
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <div className="font-mono text-xs text-text-secondary mb-4 underline decoration-accent-blue underline-offset-4">
            02 / PROCESS
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6">
            From Idea to Delivered.
          </h2>
          <p className="font-body text-xl text-text-secondary max-w-2xl">
            No ghost clients. No broken promises. Just a clean process.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border hidden md:block" />
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 w-full h-[1px] bg-accent-blue origin-left hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 relative">
            {steps.map((step) => (
              <div key={step.number} className="process-step relative group">
                {/* Decorative Number */}
                <span className="absolute -top-12 -left-4 font-display font-extrabold text-8xl text-text-primary/5 select-none transition-all duration-500 group-hover:text-accent-blue/10">
                  {step.number}
                </span>
                
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-border mb-6 group-hover:border-accent-blue transition-colors duration-300">
                    {step.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-text-secondary text-sm">
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
