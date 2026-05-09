import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'Journey', href: 'journey' },
  { label: 'Contact', href: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const sections = ['projects', 'skills', 'journey', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            isScrolled
              ? 'glass border border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative group"
          >
            <span
              className="text-lg font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              VE.
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ y: -1 }}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="mailto:vinceedward480@gmail.com"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))',
                border: '1px solid rgba(99,102,241,0.35)',
                boxShadow: '0 0 20px rgba(99,102,241,0.15)',
              }}
            >
              <span className="relative z-10">Hire Me</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))',
                }}
              />
            </motion.a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 relative"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-0.5 bg-white/70 rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-0.5 bg-white/70 rounded-full"
            />
            <motion.span
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-0.5 bg-white/70 rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden mt-2 glass rounded-2xl overflow-hidden border border-white/[0.05]"
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-1 pt-2 border-t border-white/[0.05]">
                  <a
                    href="mailto:vinceedward480@gmail.com"
                    className="block px-4 py-3 rounded-xl text-center text-sm font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                      border: '1px solid rgba(99,102,241,0.3)',
                    }}
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
