import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, categories, type Project } from '../data/projects';

/* ─── Tilt Card ─── */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      x: ((y - cy) / cy) * -12,
      y: ((x - cx) / cx) * 12,
    });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const typeIcons: Record<string, string> = {
    'Full Stack': '⬡',
    'AI / ML': '◈',
    Frontend: '◉',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.05s' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transformStyle: 'preserve-3d',
        flexShrink: 0,
        width: 'clamp(300px, 360px, 380px)',
      }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: `
            linear-gradient(135deg, rgba(13,13,21,0.95), rgba(18,18,30,0.95)),
            radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.accentColor} 0%, transparent 60%)
          `,
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentColor}`
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
      />

      {/* Gradient preview */}
      <div
        className="relative w-full h-44 rounded-xl m-3 overflow-hidden"
        style={{ width: 'calc(100% - 24px)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}30, ${project.gradientTo}50)`,
          }}
        />
        {/* Abstract pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, ${project.gradientFrom} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${project.gradientTo} 0%, transparent 50%)
            `,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-5xl font-black opacity-25 select-none"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'blur(0px)',
            }}
          >
            {typeIcons[project.category] ?? '◆'}
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-[10px] font-mono text-white/50 border border-white/[0.06]">
          {project.year}
        </div>

        {/* Category badge */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom}30, ${project.gradientTo}40)`,
            border: `1px solid ${project.gradientFrom}40`,
            color: project.gradientFrom,
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative px-5 pb-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white/50 glass border border-white/[0.05]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => e.preventDefault()}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center text-white relative overflow-hidden group/btn"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}cc, ${project.gradientTo}cc)`,
              boxShadow: `0 4px 16px ${project.accentColor}`,
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-[0.08] transition-opacity duration-200" />
          </motion.a>

          <motion.a
            href={project.github}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={(e) => e.preventDefault()}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-colors duration-200 glass border border-white/[0.07] flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </motion.a>
        </div>
      </div>

      {/* Depth layer */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.gradientFrom}10 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
};

/* ─── Projects Section ─── */
const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 80% 50%, rgba(139,92,246,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 20% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)
            `,
          }}
        />
        <div className="absolute inset-0 dot-bg opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-14"
        >
          <motion.div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full glass border border-indigo-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Selected Work
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
              Featured{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Projects
              </span>
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'text-white border border-indigo-500/50'
                      : 'text-white/40 glass border border-white/[0.06] hover:text-white/70'
                  }`}
                  style={
                    activeCategory === cat
                      ? {
                          background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))',
                          boxShadow: '0 0 20px rgba(99,102,241,0.2)',
                        }
                      : {}
                  }
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards grid / scroll track */}
        <div ref={trackRef} className="relative">
          {/* Overflow container */}
          <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-0 lg:px-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.div
              layout
              className="flex gap-5 w-max lg:grid lg:grid-cols-3 lg:w-full"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Fade edge on desktop */}
          <div
            className="absolute right-0 top-0 bottom-4 w-20 pointer-events-none hidden lg:block"
            style={{
              background: 'linear-gradient(to right, transparent, #050508)',
            }}
          />
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white glass border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
