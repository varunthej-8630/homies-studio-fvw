import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Projects from './components/sections/Projects';
import Crew from './components/sections/Crew';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Comparison from './components/sections/comparison';


const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-white text-text-primary overflow-x-hidden pr-0 lg:pr-[72px]">
        <CustomCursor />
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Services />
                  <Process />
                  <Projects />
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
    </Router>
  );
};

export default App;
