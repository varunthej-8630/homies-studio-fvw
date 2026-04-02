import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
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
import { ThemeProvider } from './context/ThemeContext';

const AppInner = () => {

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

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden transition-colors duration-500">
      <div id="hs-cursor" className="hidden lg:block" />
      
      <Navbar />
      
      <main className="md:pl-28 pt-6 md:pt-0 pb-24 md:pb-0">
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
