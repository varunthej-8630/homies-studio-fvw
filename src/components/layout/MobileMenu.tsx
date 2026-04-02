import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Return Home', href: 'hero' },
  { name: 'What Homies Do', href: 'services' },
  { name: 'Homies Process', href: 'process' },
  { name: 'Homies Works', href: 'work' },
  { name: 'Homies Crew', href: 'crew' },
  { name: 'About Homies', href: 'about' },
  { name: 'Comparison', href: 'comparison' },
  { name: 'Contact Homies', href: 'contact' },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 80;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  return (
    <div className="md:hidden">
      {/* BURGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-[60] p-4 bg-[var(--surface)] backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl text-[var(--text)] active:scale-90 transition-all"
        aria-label="Open Menu"
      >
        <Menu size={20} />
      </button>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[var(--bg)]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            {/* DECOR */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-4 text-[var(--text)]/40 hover:text-[var(--text)] transition-colors active:scale-90"
              aria-label="Close Menu"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {/* NAV LINKS */}
            <nav className="flex flex-col items-center gap-6 sm:gap-8 w-full">
              <p className="font-mono text-[10px] tracking-[0.5em] text-[var(--text-muted)] uppercase mb-4">// NAVIGATION</p>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-4xl sm:text-5xl font-display font-black text-[var(--text)] uppercase tracking-tighter hover:italic hover:tracking-normal transition-all"
                >
                  {item.name.replace('Homies ', '')}
                </motion.button>
              ))}
            </nav>

            {/* FOOTER INFO */}
            <div className="absolute bottom-12 text-center text-[var(--text-muted)] text-[10px] font-mono tracking-widest uppercase">
              <p>© 2026 HOMIES STUDIO // PROTOCOL V1</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
