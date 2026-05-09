import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { journeyEntries, type JourneyEntry } from '../data/journey';

const typeLabels: Record<JourneyEntry['type'], string> = {
  education: 'Learning',
  work: 'Work',
  freelance: 'Freelance',
  achievement: 'Current',
};

const TimelineCard = ({ entry, index }: { entry: JourneyEntry; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center gap-6 lg:gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="w-full lg:w-[calc(50%-2.5rem)]"
      >
        <div
          className="relative rounded-2xl p-6 lg:p-7 group hover:scale-[1.01] transition-transform duration-300"
          style={{
            background: 'rgba(8,8,18,0.85)',
            border: `1px solid ${entry.accent}22`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 0 ${entry.accent}00`,
          }}
        >
          {/* Top accent glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 100% 40% at 50% 0%, ${entry.accent}0c, transparent 70%)`,
            }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-lg"
                  style={{
                    background: `${entry.accent}18`,
                    color: entry.accent,
                    border: `1px solid ${entry.accent}28`,
                  }}
                >
                  {typeLabels[entry.type]}
                </span>
                <span className="text-xs font-mono text-white/25">{entry.year}</span>
              </div>
              <h3 className="text-lg font-black text-white leading-tight">{entry.title}</h3>
              <p className="text-sm font-semibold mt-0.5" style={{ color: `${entry.accent}bb` }}>
                {entry.company}
              </p>
            </div>

            {/* Year bubble */}
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[10px] font-black font-mono leading-none text-center"
              style={{ background: `${entry.accent}14`, color: entry.accent, border: `1px solid ${entry.accent}20` }}
            >
              {entry.year.slice(2)}
            </div>
          </div>

          <p className="text-sm text-white/42 leading-relaxed mb-4">{entry.description}</p>

          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${entry.accent}22, transparent)` }}
          />

          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-white/35"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center dot — desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden lg:flex shrink-0 w-10 h-10 rounded-full items-center justify-center z-10"
        style={{
          background: `${entry.accent}18`,
          border: `2px solid ${entry.accent}`,
          boxShadow: `0 0 20px ${entry.accent}50`,
        }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: entry.accent }} />
      </motion.div>

      {/* Mobile dot */}
      <div
        className="lg:hidden shrink-0 w-3 h-3 rounded-full"
        style={{ background: entry.accent, boxShadow: `0 0 10px ${entry.accent}80` }}
      />

      {/* Spacer for opposite side (desktop) */}
      <div className="hidden lg:block w-[calc(50%-2.5rem)]" />
    </div>
  );
};

const Journey = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="relative bg-[#050508] py-28 lg:py-36 overflow-x-hidden">
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), rgba(139,92,246,0.3), transparent)',
        }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(236,72,153,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full glass border border-pink-500/15"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
              My Journey
            </span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={headerInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white"
            >
              The{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Story So Far
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/38 max-w-md mx-auto text-base leading-relaxed"
          >
            From my first line of code to building production-grade applications — a timeline
            of growth, learning, and determination.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent 100%)',
            }}
          />

          {/* Vertical line — mobile */}
          <div
            className="lg:hidden absolute left-1.5 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent 100%)',
            }}
          />

          <div className="flex flex-col gap-10 lg:gap-14 pl-8 lg:pl-0">
            {journeyEntries.map((entry, i) => (
              <TimelineCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
