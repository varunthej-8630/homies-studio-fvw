import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Users, Mail, 
  Workflow, Scale, Rocket, Sun, Moon 
} from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Logo from './components/layout/Logo';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import Documentation from './components/sections/Documentation';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Projects from './components/sections/Projects';
import Crew from './components/sections/Crew';
import Testimonials from './components/sections/Testimonials';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Comparison from './components/sections/comparison';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppInner = () => {
  const { mode, toggleMode } = useTheme();

  useEffect(() => {
    // Tawk.to script
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/${import.meta.env.VITE_TAWKTO_ID}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    // HS Custom Cursor Logic
    const cursor = document.getElementById('hs-cursor');
    if (!cursor) return;
    
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    
    const addHover = () => cursor.classList.add('hovered');
    const removeHover = () => cursor.classList.remove('hovered');
    
    window.addEventListener('mousemove', move);
    
    const refreshTargets = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer'
      );
      targets.forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    refreshTargets();
    const observer = new MutationObserver(refreshTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden transition-colors duration-500">
      <div id="hs-cursor" className="hidden lg:block" />
      
      {/* 🚀 MOBILE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-[1000] flex md:hidden items-center justify-between px-6 py-5 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-500">
        <Logo />
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMode}
            className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-amber-500 active:scale-90 transition-transform"
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} className="text-indigo-600" />}
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-10 h-10 rounded-full bg-[var(--text)] text-[var(--bg)] flex items-center justify-center active:scale-90 transition-transform"
          >
            <Rocket size={18} />
          </button>
        </div>
      </header>

      {/* 🖥️ DESKTOP NAVBAR */}
      <Navbar />
      
      <main className="md:pl-28 pt-20 md:pt-0 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Stats />
                <Documentation />
                <Services />
                <Process />
                <Projects />
                <Testimonials />
                <Crew />
                <About />
                <Comparison />
                <Contact />
              </>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 📱 PREMIUM MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-[998] flex md:hidden justify-around items-center bg-[var(--bg)]/90 backdrop-blur-2xl border-t border-[var(--border)] py-4 px-6 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
         {[
           { icon: Workflow, target: 'process', label: 'Flow' },
           { icon: Briefcase, target: 'work', label: 'Works' },
           { icon: Users, target: 'crew', label: 'Crew' },
           { icon: Scale, target: 'comparison', label: 'Edge' },
           { icon: Mail, target: 'contact', label: 'Reach' }
         ].map((item, idx) => (
           <button 
             key={idx}
             onClick={() => scrollToSection(item.target)}
             className="flex flex-col items-center gap-1 text-[var(--text-faint)] hover:text-amber-500 active:scale-95 transition-all"
           >
             <item.icon size={20} />
             <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
           </button>
         ))}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
};

export default App;
