import { useRef, Suspense } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import FloatingScene from './FloatingScene';
import { useMousePosition } from '../hooks/useMousePosition';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smoothX = useSpring(mx, springConfig);
  const smoothY = useSpring(my, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 0.8], ['0%', '-25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const layer1X = useTransform(smoothX, (v) => v * 18);
  const layer1Y = useTransform(smoothY, (v) => -v * 18);
  const layer2X = useTransform(smoothX, (v) => v * 30);
  const layer2Y = useTransform(smoothY, (v) => -v * 30);
  const layer3X = useTransform(smoothX, (v) => v * 45);
  const layer3Y = useTransform(smoothY, (v) => -v * 45);

  const handleMouseMove = (e: React.MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -((e.clientY / window.innerHeight) * 2 - 1);
    mx.set(nx);
    my.set(ny);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center"
    >
      {/* ── Background ── */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 origin-center"
      >
        <div className="absolute inset-0 bg-[#050508]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 15% 15%, rgba(99,102,241,0.14) 0%, transparent 55%),
              radial-gradient(ellipse 60% 60% at 85% 85%, rgba(139,92,246,0.10) 0%, transparent 55%),
              radial-gradient(ellipse 50% 50% at 70% 30%, rgba(236,72,153,0.07) 0%, transparent 55%)
            `,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </motion.div>

      {/* ── 3D Scene ── */}
      <motion.div
        style={{ x: layer3X, y: layer3Y, translateY: sceneY }}
        className="absolute inset-0 pointer-events-none"
      >
        <Suspense fallback={null}>
          <FloatingScene mouseX={normalizedX} mouseY={normalizedY} />
        </Suspense>
      </motion.div>

      {/* ── Floating decorations – layer 1 ── */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Big ambient orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* ── Floating decorations – layer 2 ── */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Code snippet 1 */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute top-[28%] right-[18%] glass rounded-xl px-4 py-3 border border-indigo-500/15 hidden lg:block"
        >
          <div className="text-xs font-mono leading-relaxed">
            <span className="text-pink-400">const </span>
            <span className="text-indigo-300">developer</span>
            <span className="text-white/40"> = {'{'}</span>
            <br />
            <span className="text-white/40 pl-4">  name: </span>
            <span className="text-green-400">"Vince"</span>
            <span className="text-white/40">,</span>
            <br />
            <span className="text-white/40 pl-4">  role: </span>
            <span className="text-yellow-400">"Full Stack"</span>
            <br />
            <span className="text-white/40">{'}'}</span>
          </div>
        </motion.div>

        {/* Code snippet 2 */}
        <motion.div
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[30%] right-[25%] glass rounded-xl px-4 py-2.5 border border-violet-500/15 hidden lg:block"
        >
          <div className="text-xs font-mono text-violet-400">
            {'<'}<span className="text-pink-400">Experience</span>{' years='}
            <span className="text-green-400">"3+"</span>{' />'}
          </div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-[50%] right-[12%] glass rounded-full px-4 py-2 border border-emerald-500/20 hidden xl:flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400/80">Available Now</span>
        </motion.div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[680px]"
        >
          {/* Badge */}
          <motion.div
            variants={containerVariants}
            className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full glass border border-white/[0.07]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={containerVariants}
            className="text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.88] tracking-[-0.04em] mb-7"
          >
            <span className="block text-white">Crafting</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital
            </span>
            <span className="block text-white">Experiences</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={containerVariants}
            className="text-base lg:text-lg text-white/45 max-w-[520px] mb-10 leading-relaxed"
          >
            I design and build immersive web experiences that merge{' '}
            <span className="text-white/70">cutting-edge technology</span> with{' '}
            <span className="text-white/70">thoughtful, human-centered design</span>. Let's build
            something extraordinary together.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-8 py-4 rounded-2xl text-sm font-bold text-white overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 0 30px rgba(99,102,241,0.45), 0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                View Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl text-sm font-bold text-white/65 hover:text-white transition-all duration-300 glass border border-white/[0.09] hover:border-indigo-500/40"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="flex gap-8 mt-10 pt-8 border-t border-white/[0.06]"
          >
            {[
              { value: '3+', label: 'Years Coding' },
              { value: '20+', label: 'Projects Built' },
              { value: '10+', label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div
                  className="text-2xl font-black mb-0.5 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/35 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/20 uppercase">
            Scroll
          </span>
          <div
            className="w-px h-14 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #050508, transparent)',
        }}
      />
    </section>
  );
};

export default Hero;
