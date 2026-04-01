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
      <nav className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-2 z-[999] bg-[var(--nav-bg)] border border-[var(--border)] rounded-2xl py-4 px-2.5 shadow-xl transition-all duration-300">
        
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
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 relative z-10
                ${isActive 
                  ? 'bg-[var(--text)] text-[var(--bg)]' 
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)]'}`}
              >
                <Icon size={16} />
              </button>

              {/* TOOLTIP */}
              <div
                className={`absolute left-full ml-3 px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-md
                bg-[var(--text)] text-[var(--bg)] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 shadow-xl`}
              >
                {item.name}
              </div>
            </div>
          );
        })}

        <div className="my-2 h-[1px] bg-[var(--border)] w-full" />

        {/* THEME TOGGLE */}
        <button
          onClick={toggleMode}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-all duration-200"
        >
          {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* CALL ACTION */}
        <button
          onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hi%20Homies%2C%20I%20want%20to%20book%20a%20call`, '_blank')}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--text)] text-[var(--bg)] hover:opacity-90 transition-all duration-200"
        >
          <PhoneCall size={16} />
        </button>
      </nav>
    </>
  );
};

export default Navbar;