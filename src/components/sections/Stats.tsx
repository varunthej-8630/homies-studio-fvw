import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { label: 'Systems Engineered', value: 333, suffix: '+' },
  { label: 'Happy Clients', value: 50, suffix: '+' },
  { label: 'Tech Domains', value: 12, suffix: '' },
  { label: 'Years Active', value: 4, suffix: '' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg)] text-[var(--text)] px-6 transition-colors duration-500">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-[clamp(32px,5vw,64px)] font-display font-black mb-2 tracking-tighter">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-[var(--text-faint)] font-mono italic">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
