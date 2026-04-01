import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer select-none">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[var(--text)] flex items-center justify-center rounded-lg transition-transform duration-500 group-hover:rotate-[135deg]">
        <span className="text-[var(--bg)] font-black text-xl md:text-2xl tracking-tighter -rotate-45 group-hover:rotate-45 transition-transform duration-500">H</span>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-sm md:text-base font-black tracking-tighter text-[var(--text)] uppercase leading-none">H-𝕆𝕄-IES</span>
      </div>
    </div>
  );
};

export default Logo;
