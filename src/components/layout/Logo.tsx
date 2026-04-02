import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      <div className="w-10 h-10 bg-[var(--text)] flex items-center justify-center rounded-sm transition-all duration-700 group-hover:rotate-[180deg]">
        <span className="text-[var(--bg)] font-black text-2xl tracking-tighter transition-transform duration-700">H</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-black tracking-[-0.05em] text-[var(--text)] uppercase leading-none font-['Inter']">
          H-<span className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">𝕆𝕄</span>-IES
        </span>
        <div className="relative mt-0.5 group-hover:mt-1 transition-all">
          <span className="text-[7px] md:text-[9px] font-bold tracking-[0.6em] text-[var(--text-faint)] uppercase font-['Inter']">
            STUDIO
          </span>
          <div className="absolute left-0 top-[80%] w-full opacity-10 select-none pointer-events-none origin-top scale-y-[-0.8] blur-[0.5px]">
            <span className="text-[7px] md:text-[9px] font-bold tracking-[0.6em] text-white uppercase font-['Inter'] bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
              STUDIO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
