import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Briefcase,
  Users,
  Info,
  Scale,
  Mail,
  Workflow
} from 'lucide-react';
import MobileMenu from './MobileMenu';

const navItems = [
  { name: 'What Homies Do', href: 'services', icon: Wrench },
  { name: 'Homies Process', href: 'process', icon: Workflow },
  { name: 'Homies Works', href: 'work', icon: Briefcase },
  { name: 'Homies Crew', href: 'crew', icon: Users },
  { name: 'About Homies', href: 'about', icon: Info },
  { name: 'Comparison', href: 'comparison', icon: Scale },
  { name: 'Contact Homies', href: 'contact', icon: Mail },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // 🔥 SCROLL DETECTION
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

      // PROGRESS
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollTop / height);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 SMOOTH SCROLL FIX
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 🔥 PROGRESS BAR */}
      <motion.div
        className="fixed right-3 top-0 w-[2px] bg-black/40 z-50 origin-top"
        style={{ scaleY: progress }}
      />

      {/* 🔥 NAV */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 p-3
      bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.href;

          return (
            <div
              key={item.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => scrollToSection(item.href)}
              className="relative flex items-center justify-center cursor-pointer"
            >

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-black rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              {/* ICON */}
              <motion.div
                animate={{
                  scale: hovered === i ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative z-10 p-3 rounded-xl transition-all
                ${isActive ? 'text-white' : 'text-black/60 hover:text-black'}`}
              >
                <Icon size={18} />
              </motion.div>

              {/* TOOLTIP */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  x: hovered === i ? -8 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 px-3 py-1.5 text-xs rounded-md
                bg-black text-white whitespace-nowrap pointer-events-none shadow-lg"
              >
                {item.name}
              </motion.div>

            </div>
          );
        })}
      </nav>

      {/* 🔥 MOBILE NAVIGATION (Burger Menu) */}
      <MobileMenu />
    </>
  );
};

export default Navbar;