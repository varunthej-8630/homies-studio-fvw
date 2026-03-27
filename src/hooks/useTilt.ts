import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export const useTilt = (maxRotate: number = 5) => {  // reduced default
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    // ✅ FIXED (NO *2 — safe rotation)
    const rotateX = (yPercent - 0.5) * -maxRotate;
    const rotateY = (xPercent - 0.5) * maxRotate;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 800,   // ✅ important
      transformOrigin: "center",
      duration: 0.3,
      ease: "power2.out"
    });

  }, [maxRotate]);

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power2.out"
    });

  }, []);

  return { cardRef, onMouseMove, onMouseLeave };
};