import { useState, useCallback, useRef } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const useScramble = () => {
  const [text, setText] = useState('');
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback((targetText: string, duration: number = 600) => {
    const startTime = Date.now();
    
    const update = () => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const scrambled = targetText
        .split('')
        .map((_, index) => {
          if (index < targetText.length * progress) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  }, []);

  return { text, scramble, setText };
};
