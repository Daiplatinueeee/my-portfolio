import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <LoadingScreen onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Navbar />

            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Journey />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mouse glow follower */}
      <MouseGlow />
    </>
  );
}

/* Subtle mouse-following radial glow — performance-friendly via CSS vars */
function MouseGlow() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{
        background:
          'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.04) 0%, transparent 80%)',
        transition: 'background 0.1s',
      }}
    />
  );
}

export default App;