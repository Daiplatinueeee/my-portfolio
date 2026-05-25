import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { skillCategories, type Skill } from '../data/skills';

/* ─── Animated Skill Bar ─── */
const SkillBar = ({ skill, delay }: { skill: Skill; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
            style={{
              background: skill.color,
              boxShadow: hovered ? `0 0 8px ${skill.color}` : 'none',
            }}
          />
          <span className="text-sm font-medium text-white/65 group-hover:text-white/90 transition-colors duration-300">
            {skill.name}
          </span>
        </div>
        <motion.span
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: delay + 0.4 }}
          className="text-xs font-bold font-mono"
          style={{ color: skill.color, opacity: 0.8 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: delay + 0.15,
            ease: [0.34, 1.1, 0.64, 1],
          }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
            boxShadow: hovered ? `0 0 8px ${skill.color}80` : 'none',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.5 }}
            className="absolute inset-0 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Tech Icon Pill ─── */
const TechPill = ({ name, color, delay }: { name: string; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: 'backOut' }}
    whileHover={{ scale: 1.08, y: -3 }}
    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/[0.06] cursor-default group transition-all duration-300 hover:border-indigo-500/30"
    style={{
      '--pill-color': color,
    } as React.CSSProperties}
  >
    <div
      className="w-2 h-2 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
    />
    <span className="text-xs font-medium text-white/55 group-hover:text-white/80 transition-colors duration-200">
      {name}
    </span>
  </motion.div>
);

/* ─── Skills Section ─── */
const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('frontend');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  const allTechs = skillCategories.flatMap((c) =>
    c.skills.map((s) => ({ name: s.name, color: s.color }))
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#07070f]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 60% 60% at 10% 50%, rgba(99,102,241,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 90% 20%, rgba(236,72,153,0.06) 0%, transparent 60%)
            `,
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-14">
          <motion.div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full glass border border-violet-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              Technical Skills
            </span>
          </motion.div>

          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white mb-4">
            My{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Expertise
            </span>
          </h2>
          <p className="text-white/40 max-w-lg text-base leading-relaxed">
            A curated toolkit built through years of real-world projects, continuous learning, and a
            relentless drive to ship great software.
          </p>
        </motion.div>

        {/* Main grid: tabs + bars | counters */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          {/* Left: tabs + skill bars */}
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === cat.id
                      ? 'text-white border border-violet-500/50'
                      : 'text-white/40 glass border border-white/[0.06] hover:text-white/70'
                  }`}
                  style={
                    activeTab === cat.id
                      ? {
                          background:
                            'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(99,102,241,0.25))',
                          boxShadow: '0 0 20px rgba(139,92,246,0.2)',
                        }
                      : {}
                  }
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Skill bars panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass rounded-2xl p-6 border border-white/[0.05] space-y-5"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/[0.05]">
                  <span className="text-2xl">{activeCategory.icon}</span>
                  <span className="text-base font-bold text-white/80">
                    {activeCategory.label} Skills
                  </span>
                  <span className="ml-auto text-xs text-white/25 font-mono">
                    {activeCategory.skills.length} skills
                  </span>
                </div>

                <div className="space-y-4">
                  {activeCategory.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} delay={i * 0.07} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: stat cards + tech cloud */}
          <div className="space-y-5">
            {/* Stat cards */}
            {[
              {
                value: '4+',
                label: 'Years of Experience',
                icon: '◈',
                color: '#6366f1',
              },
              {
                value: '20+',
                label: 'Projects Shipped',
                icon: '◉',
                color: '#8b5cf6',
              },
              {
                value: '24',
                label: 'Skills Mastered',
                icon: '◎',
                color: '#ec4899',
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass rounded-xl p-5 border border-white/[0.05] flex items-center gap-4 cursor-default group transition-all duration-300"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${stat.color}18`,
                    color: stat.color,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-2xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}bb)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/35 font-medium mt-0.5">{stat.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Tech cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-xl p-5 border border-white/[0.05]"
            >
              <p className="text-xs font-semibold text-white/30 mb-3 tracking-widest uppercase">
                All Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {allTechs.slice(0, 12).map((tech, i) => (
                  <TechPill
                    key={tech.name}
                    name={tech.name.split(' ')[0]}
                    color={tech.color}
                    delay={i * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
