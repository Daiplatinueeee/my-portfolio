import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import heroImg from '../assets/nawng-nako.jpg';

// ─── hero.png local asset used as portrait ───

const traits = [
  { label: 'Problem Solver', color: '#6366f1' },
  { label: 'UI/UX Focused', color: '#8b5cf6' },
  { label: 'Clean Code', color: '#ec4899' },
  { label: 'Performance First', color: '#06b6d4' },
  { label: 'Lifelong Learner', color: '#10b981' },
  { label: 'Detail Oriented', color: '#f59e0b' },
];

const stats = [
  { label: 'Projects', value: '20+', color: '#6366f1', icon: '◈' },
  { label: 'Years Exp', value: '4+', color: '#8b5cf6', icon: '◉' },
  { label: 'Technologies', value: '24+', color: '#ec4899', icon: '◎' },
];

const bioLines = [
  "I'm a Full-Stack Developer passionate about",
  'building scalable, high-performance web and software applications alongside innovative AI solutions.',
  'I create immersive digital experiences that are fast,',
  'accessible, and impactful, actively pursuing a Software Engineer role.',
];
/* ─── About section ─── */
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-120px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Layered parallax at different depths */
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['30%', '-30%']);

  const portraitRaw = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const portraitY = useSpring(portraitRaw, { stiffness: 80, damping: 20 });

  const textRaw = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const textY = useSpring(textRaw, { stiffness: 80, damping: 20 });

  /* Zoom-in reveal as section enters viewport */
  const sectionScale = useTransform(scrollYProgress, [0, 0.28], [0.94, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.22], [0, 1]);

  /* Scroll-driven zoom on the hero image — zooms out as section scrolls up */
  const imgScale = useTransform(scrollYProgress, [0.05, 0.65], [1.14, 1.0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[#050508]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 25% 50%, rgba(99,102,241,0.09) 0%, transparent 65%),
              radial-gradient(ellipse 55% 55% at 75% 50%, rgba(139,92,246,0.07) 0%, transparent 65%)
            `,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-[0.08]" />
      </motion.div>

      {/* Parallax orbs */}
      <motion.div
        className="absolute top-24 left-8 w-72 h-72 rounded-full pointer-events-none"
        style={{
          y: orb1Y,
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        className="absolute bottom-16 right-8 w-96 h-96 rounded-full pointer-events-none"
        style={{
          y: orb2Y,
          background: 'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Scroll-zoom-in wrapper */}
      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="relative max-w-6xl mx-auto px-6 lg:px-12"
      >
        {/* Section badge */}
        <div className="flex justify-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/15"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              About Me
            </span>
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">

          {/* ── Left: Portrait ── */}
          <motion.div
            style={{ y: portraitY }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            {/* Floating wrapper — gentle vertical oscillation */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-72 h-72 lg:w-[380px] lg:h-[380px]"
            >

              {/* Far outer slow-spin ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '-40px',
                  border: '1px dashed rgba(99,102,241,0.18)',
                }}
              />

              {/* Mid counter-spin ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: '-22px',
                  border: '1px dashed rgba(139,92,246,0.13)',
                }}
              />

              {/* Pulsing aura */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-5 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)',
                  border: '1px solid rgba(99,102,241,0.18)',
                }}
              />

              {/* Deep glow backdrop — sits behind the circle */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  transform: 'scale(1.18)',
                  boxShadow:
                    '0 0 120px rgba(99,102,241,0.38), 0 0 240px rgba(99,102,241,0.12)',
                }}
              />

              {/* Main portrait circle */}
              <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #0a0a1e 0%, #12123a 50%, #080820 100%)',
                  boxShadow:
                    '0 0 80px rgba(99,102,241,0.3), 0 0 180px rgba(99,102,241,0.1), inset 0 0 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Hero image — scroll-zoom effect */}
                <motion.img
                  src={heroImg}
                  alt="Vince Edward — Full Stack Developer"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ scale: imgScale }}
                  draggable={false}
                />

                {/* Depth gradient overlay — adds colour tint + blends edges */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse 100% 65% at 50% 30%, rgba(99,102,241,0.28) 0%, transparent 65%),
                      radial-gradient(ellipse 70% 90% at 50% 90%, rgba(139,92,246,0.22) 0%, transparent 65%)
                    `,
                  }}
                />

                {/* Edge vignette — softens the circular crop */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,0.55)' }}
                />

                {/* Subtle light flare — top-left highlight */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 35% at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
                  }}
                />

                {/* Monogram bottom */}
                <div className="absolute bottom-5 inset-x-0 flex justify-center">
                  <div
                    className="text-xl font-black tracking-[0.3em]"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    VE
                  </div>
                </div>
              </motion.div>

              {/* Floating stat cards */}
              {stats.map((stat, i) => {
                const positions: React.CSSProperties[] = [
                  { top: '-6%', right: '-18%' },
                  { bottom: '12%', right: '-22%' },
                  { bottom: '-4%', left: '-18%' },
                ];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.7, x: i === 2 ? -16 : 16 }}
                    animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.18 }}
                    whileHover={{ scale: 1.07, y: -5 }}
                    className="absolute z-20 px-4 py-3 rounded-2xl cursor-default"
                    style={{
                      ...positions[i],
                      background: 'rgba(10,10,20,0.88)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: `1px solid ${stat.color}28`,
                      boxShadow: `0 10px 40px rgba(0,0,0,0.45), 0 0 24px ${stat.color}12`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: stat.color }} className="text-sm">{stat.icon}</span>
                      <div>
                        <div className="text-xl font-black text-white leading-none">{stat.value}</div>
                        <div className="text-[10px] text-white/35 font-semibold mt-0.5 whitespace-nowrap">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Orbiting accent dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute pointer-events-none"
                style={{ inset: '-18px' }}
              >
                <div
                  className="absolute top-0 left-1/2 w-2.5 h-2.5 -translate-x-1/2 rounded-full"
                  style={{
                    background: '#ec4899',
                    boxShadow: '0 0 10px #ec4899, 0 0 20px rgba(236,72,153,0.4)',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: Text content ── */}
          <motion.div
            style={{ y: textY }}
            className="relative order-1 lg:order-2"
          >
            {/* Headline mask reveal */}
            <div className="overflow-hidden mb-7">
              <motion.h2
                initial={{ y: 90, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                className="text-[clamp(2.6rem,6vw,4.8rem)] font-black leading-[0.88] tracking-[-0.04em]"
              >
                <span className="block text-white">Code</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Meets
                </span>
                <span className="block text-white">Creativity</span>
              </motion.h2>
            </div>

            {/* Bio lines — staggered reveal */}
            <div className="mb-8 space-y-0.5">
              {bioLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    initial={{ y: 35, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.75,
                      delay: 0.22 + i * 0.1,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="text-white/42 text-base lg:text-[1.05rem] leading-relaxed"
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>

            {/* Separator line draws in */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.55 }}
              className="h-px origin-left mb-8"
              style={{
                background:
                  'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3), transparent)',
              }}
            />

            {/* Trait tags — staggered scale-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {traits.map((trait, i) => (
                <motion.span
                  key={trait.label}
                  initial={{ opacity: 0, scale: 0.75, y: 12 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 + i * 0.075 }}
                  whileHover={{ scale: 1.06, y: -3 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-default"
                  style={{
                    background: `${trait.color}14`,
                    border: `1px solid ${trait.color}28`,
                    color: trait.color,
                  }}
                >
                  {trait.label}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.05 }}
              className="flex items-center gap-6"
            >
              <a
                href="mailto:vinceedward480@gmail.com"
                className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-white transition-colors duration-300"
              >
                <span>Get in touch</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div className="h-4 w-px bg-white/[0.1]" />
              <div className="flex items-center gap-1.5 text-sm text-white/25 font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Philippines</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
