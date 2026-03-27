import React, { useEffect, useRef } from 'react';
import { useScramble } from '../../hooks/useScramble';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: 'hover' | 'auto';
  duration?: number;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className, 
  trigger = 'hover',
  duration = 600 
}) => {
  const { text: displayedText, scramble, setText } = useScramble();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setText(text);
      if (trigger === 'auto') {
        scramble(text, duration);
      }
      initialized.current = true;
    }
  }, [text, trigger, duration, scramble, setText]);

  return (
    <span 
      className={className}
      onMouseEnter={() => trigger === 'hover' && scramble(text, duration)}
    >
      {displayedText}
    </span>
  );
};

export default ScrambleText;
