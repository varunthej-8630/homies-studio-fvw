import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const trailX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-cursor-text]')) {
        const text = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
        setHoveredText(text || 'VIEW_PROJECT');
      } else {
        setHoveredText(null);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-[99999]">
      {/* 1. MAIN CURSOR DOT */}
      <motion.div
        animate={{ scale: hoveredText ? 3 : 1 }}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        className="fixed w-4 h-4 bg-white rounded-full mix-blend-difference"
      />

      {/* 2. SOLUTION FLOW TRAIL */}
      <motion.div
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        className="fixed opacity-10"
      >
        <div className="flex flex-col items-center -space-y-1">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">HARDWARE</span>
          <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#FFC107]">SYSTEM_FLOW</span>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">SOFTWARE</span>
        </div>
      </motion.div>

      {/* 3. PROJECT TOOLTIP */}
      <AnimatePresence>
        {hoveredText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 30 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            style={{ x: springX, y: springY, translateY: '-150%' }}
            className="fixed flex items-center gap-2 bg-white px-3 py-1.5 rounded-full mix-blend-normal shadow-2xl"
          >
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-black tracking-widest uppercase">
              {hoveredText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
