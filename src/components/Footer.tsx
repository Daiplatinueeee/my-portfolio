import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const socialLinks = [
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:vinceedward480@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden bg-[#050508]">
      {/* Top separator gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(139,92,246,0.4), transparent)',
        }}
      />

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 60%, rgba(139,92,246,0.07) 0%, transparent 60%)
          `,
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* CTA contact section */}
      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full glass border border-indigo-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Open to Opportunities
            </span>
          </motion.div>

          <h2 className="text-[clamp(2.8rem,8vw,6rem)] font-black leading-[0.88] tracking-[-0.04em] mb-6">
            <span className="block text-white">Let's Build</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Something
            </span>
            <span className="block text-white">Amazing</span>
          </h2>

          <p className="text-white/40 text-base lg:text-lg max-w-lg mx-auto leading-relaxed mb-10">
            Whether you have a project in mind, a role to fill, or just want to say hello — my inbox
            is always open.
          </p>

          {/* Contact button */}
          <motion.a
            href="mailto:vinceedward480@gmail.com"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-9 py-4.5 rounded-2xl text-sm font-bold text-white relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 40px rgba(99,102,241,0.5), 0 8px 24px rgba(0,0,0,0.4)',
              padding: '18px 36px',
            }}
          >
            <span className="relative z-10">Say Hello</span>
            <svg
              className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-white/[0.04]" />
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-5xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Logo */}
        <div>
          <div
            className="text-2xl font-black tracking-tight mb-1"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Vince Edward
          </div>
          <div className="text-xs text-white/20 font-medium">
            Full Stack Developer & Creative Technologist
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
              className="w-10 h-10 rounded-xl glass border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:border-indigo-500/30 transition-all duration-300"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/20 font-medium">
          © {new Date().getFullYear()} Vince Edward. All rights reserved.
        </div>
      </motion.div>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-8 right-6 lg:right-12 w-10 h-10 rounded-xl glass border border-white/[0.07] hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
