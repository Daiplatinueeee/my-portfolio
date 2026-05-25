import { useRef, useState } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, type Project } from '../data/projects';

/* ─── Top Project Card (horizontal, ranked) ─── */
const TopProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const rankLabels = ['01', '02', '03'];
  const rankColors = [
    { from: '#6366f1', to: '#8b5cf6' },
    { from: '#8b5cf6', to: '#ec4899' },
    { from: '#ec4899', to: '#f97316' },
  ];
  const typeIcons: Record<string, string> = {
    'Full Stack': '⬡',
    'AI / ML': '◈',
    Frontend: '◉',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const stairOffsets = ['lg:ml-0', 'lg:ml-12', 'lg:ml-24'];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.76, 0, 0.24, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden flex flex-col lg:flex-row cursor-pointer group ${stairOffsets[index]}`}
      style={{
        background: `linear-gradient(135deg, rgba(13,13,21,0.97), rgba(18,18,30,0.97)), radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.accentColor} 0%, transparent 60%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: isHovered
          ? `0 24px 64px rgba(0,0,0,0.55), 0 0 48px ${project.accentColor}`
          : '0 8px 32px rgba(0,0,0,0.35)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Rank column */}
      <div
        className="flex items-center justify-center px-8 py-6 lg:py-0 lg:w-32 shrink-0 border-b lg:border-b-0 lg:border-r"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <span
          className="text-[4.5rem] lg:text-[5.5rem] font-black leading-none select-none"
          style={{
            background: `linear-gradient(135deg, ${rankColors[index].from}, ${rankColors[index].to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: isHovered ? 0.65 : 0.25,
            transition: 'opacity 0.3s ease',
          }}
        >
          {rankLabels[index]}
        </span>
      </div>

      {/* Project image / gradient visual */}
      <div className="relative lg:w-64 h-48 lg:h-auto shrink-0 overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, transparent 60%, rgba(13,13,21,0.6))` }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${project.gradientFrom}30, ${project.gradientTo}50)` }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 50%, ${project.gradientFrom} 0%, transparent 55%), radial-gradient(circle at 75% 20%, ${project.gradientTo} 0%, transparent 55%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-6xl font-black opacity-20 select-none"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {typeIcons[project.category] ?? '◆'}
              </div>
            </div>
          </>
        )}
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
      <div className="flex-1 flex flex-col justify-between p-6 lg:p-8">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
            <span className="shrink-0 px-2.5 py-1 rounded-lg glass text-[10px] font-mono text-white/30 border border-white/[0.06]">
              {project.year}
            </span>
          </div>
          <p className="text-sm text-white/45 leading-relaxed mb-5 max-w-xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white/50 glass border border-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <motion.a
            href={project.demo}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white relative overflow-hidden group/btn"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}cc, ${project.gradientTo}cc)`,
              boxShadow: `0 4px 16px ${project.accentColor}`,
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-[0.08] transition-opacity duration-200" />
          </motion.a>
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-colors duration-200 glass border border-white/[0.07]"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Code
          </motion.a>
        </div>
      </div>

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.gradientFrom}0d 0%, transparent 55%)`,
        }}
      />
    </motion.div>
  );
};

/* ─── Projects Section ─── */
const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const topProjects = projects.slice(0, 3);

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
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-14"
        >
          <motion.div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full glass border border-indigo-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Top Projects
            </span>
          </motion.div>

          <div className="flex items-center gap-5 mb-10">
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
            <motion.a
              href="https://github.com/Daiplatinueeee"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white glass border border-white/8 transition-colors duration-200 self-end mb-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </motion.a>
          </div>

          <div className="flex flex-col gap-5">
            {topProjects.map((project, i) => (
              <TopProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
