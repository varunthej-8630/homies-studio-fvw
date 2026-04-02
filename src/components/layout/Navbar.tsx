import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  PhoneCall,
  Home
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Logo from './Logo';

const navItems = [
  { name: 'Home', href: 'hero', icon: Home },
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
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-[999] bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] py-6 px-3 shadow-2xl transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;

          return (
            <div
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative flex items-center justify-center group"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative z-10
                ${isActive 
                  ? 'text-black' 
                  : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <Icon size={18} />
              </button>

              <div className="absolute left-full ml-4 px-3 py-1.5 text-[9px] uppercase font-black tracking-widest rounded-md bg-white text-black whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-200 shadow-xl">
                {item.name}
              </div>
            </div>
          );
        })}

        <div className="my-2 h-[1px] bg-white/5 w-full" />
        <button onClick={toggleMode} className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200">
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-call-modal'))}
          className="w-10 h-12 rounded-2xl md:rounded-[1.25rem] flex items-center justify-center bg-white text-black hover:scale-105 transition-all duration-200 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <PhoneCall size={20} />
        </button>
      </nav>

      {/* 📱 MOBILE NAV (Floating Premium Dock) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] w-[94%] max-w-[420px] md:hidden">
        <nav className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-1 py-1 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href;
            let label = item.name.replace('Homies ', '');
            if (label === 'Home') label = 'H';
            if (label === 'Services') label = 'S';
            if (label === 'Process') label = 'F'; // Flow
            if (label === 'Work') label = 'W';
            if (label === 'Crew') label = 'C';
            if (label === 'About') label = 'A';
            if (label === 'VS') label = 'E'; // Edge
            if (label === 'Contact') label = 'R'; // Reach

            return (
              <div
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative flex-1 flex flex-col items-center justify-center p-2 group active:scale-90 transition-transform"
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicatorMobile"
                      className="absolute inset-[4px] bg-white rounded-full z-0 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      transition={{ type: "spring", stiffness: 450, damping: 40 }}
                    />
                  )}
                </AnimatePresence>

                <div className={`relative z-10 transition-all duration-300 ${isActive ? 'text-black scale-110' : 'text-white/40'}`}>
                  <Icon size={18} />
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* 📱 MOBILE TOP BAR (Logo + Theme) */}
      <div className="fixed top-0 left-0 right-0 z-[1000] md:hidden px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="pointer-events-auto"><Logo /></div>
        <button 
          onClick={toggleMode}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-amber-500 active:scale-90 transition-transform"
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </>
  );
};

export default Navbar;