import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const grow = () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
    };

    const shrink = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    };

    window.addEventListener('mousemove', move);

    // Initial setup for existing elements
    const updateListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    updateListeners();

    // DOM observer for dynamically added elements (like modals)
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease, width 0.2s ease, height 0.2s ease',
        left: '-100px',
        top: '-100px'
      }}
      className="hidden lg:block"
    />
  );
};

export default CustomCursor;
