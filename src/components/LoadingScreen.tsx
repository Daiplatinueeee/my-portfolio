import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.random() * 14 + 4;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setPhase('done');
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 900);
        }, 1200);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = 'MANACAPS HUMBLE ABODE'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Animated radial orb */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              transform: 'translate(150px, 100px)',
            }}
          />

          {/* Scan line */}
          <motion.div
            animate={{ y: ['-100%', '100vh'] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0.5,
            }}
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)',
            }}
          />

          {/* Logo letters */}
          <div className="relative z-10 mb-10 overflow-hidden">
            <motion.div
              className="flex gap-0"
              initial="hidden"
              animate="visible"
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05 + 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className={`text-4xl font-black tracking-tight ${
                    letter === ' ' ? 'w-3' : ''
                  }`}
                  style={{
                    color: 'white',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-2 text-xs font-medium tracking-[0.4em] text-white/25 uppercase"
            >
              Portfolio
            </motion.div>
          </div>

          {/* Progress container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-10 w-56"
          >
            {/* Progress bar track */}
            <div className="h-px bg-white/[0.07] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
                  }}
                />
                {/* Glow at tip */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: '#8b5cf6',
                    boxShadow: '0 0 8px 3px rgba(139,92,246,0.6)',
                    transform: 'translate(50%, -50%)',
                  }}
                />
              </motion.div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                {phase === 'done' ? 'Ready' : 'Loading...'}
              </span>
              <span className="text-[10px] font-mono text-white/30">
                {Math.round(progress)}
                <span className="text-white/15">%</span>
              </span>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-indigo-500/30" />
          <div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-indigo-500/30" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-indigo-500/30" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-indigo-500/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
