import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
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
        className="fixed top-6 right-6 z-[60] p-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full shadow-lg text-black"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center p-8"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 bg-black/5 rounded-full text-black"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            {/* NAV LINKS */}
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-3xl font-display font-bold text-black active:text-gray-500"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* FOOTER INFO */}
            <div className="absolute bottom-12 text-center text-gray-400 text-sm">
              <p>© 2026 Homies Studio</p>
              <p className="mt-2 font-mono">Real Systems. Real People.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
