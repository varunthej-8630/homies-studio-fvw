import { useState, useEffect } from 'react';
import {
  Wrench,
  Briefcase,
  Users,
  Info,
  Scale,
  Mail,
  Workflow,
  Moon,
  Sun,
  PhoneCall
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { name: 'Services', href: 'services', icon: Wrench },
  { name: 'Process', href: 'process', icon: Workflow },
  { name: 'Works', href: 'work', icon: Briefcase },
  { name: 'Crew', href: 'crew', icon: Users },
  { name: 'About', href: 'about', icon: Info },
  { name: 'VS', href: 'comparison', icon: Scale },
  { name: 'Contact', href: 'contact', icon: Mail },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const { mode, toggleMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      navItems.forEach((item) => {
        const el = document.getElementById(item.href);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          current = item.href;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 🔥 NAV (Desktop Only) */}
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-[999] bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] py-6 px-3 shadow-2xl transition-all duration-300">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;

          return (
            <div
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative flex items-center justify-center group"
            >
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 relative z-10
                ${isActive 
                  ? 'bg-white text-black' 
                  : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Icon size={18} />
              </button>

              {/* TOOLTIP */}
              <div
                className={`absolute left-full ml-4 px-3 py-1.5 text-[9px] uppercase font-black tracking-widest rounded-md
                bg-white text-black whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 shadow-xl`}
              >
                {item.name}
              </div>
            </div>
          );
        })}

        <div className="my-2 h-[1px] bg-white/5 w-full" />

        {/* THEME TOGGLE */}
        <button
          onClick={toggleMode}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* CALL ACTION (White Pill in Image) */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-call-modal'))}
          className="w-10 h-12 rounded-2xl md:rounded-[1.25rem] flex items-center justify-center bg-white text-black hover:scale-105 transition-all duration-200 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <PhoneCall size={20} />
        </button>
      </nav>
    </>
  );
};

export default Navbar;