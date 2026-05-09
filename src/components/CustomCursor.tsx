import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [hoverState, setHoverState] = useState<'default' | 'hover' | 'click'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const springTrail = { damping: 35, stiffness: 200, mass: 0.8 };
  const trailX = useSpring(cursorX, springTrail);
  const trailY = useSpring(cursorY, springTrail);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setHoverState('hover');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseDown = () => setHoverState('click');
    const handleMouseUp = () => setHoverState('default');
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseOver = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            scale: hoverState === 'click' ? 0.4 : hoverState === 'hover' ? 0 : 1,
            opacity: hoverState === 'hover' ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-2.5 h-2.5 rounded-full bg-white mix-blend-difference"
        />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{
            scale: hoverState === 'hover' ? 2.8 : hoverState === 'click' ? 0.7 : 1,
            borderColor:
              hoverState === 'hover'
                ? 'rgba(99,102,241,0.9)'
                : 'rgba(255,255,255,0.25)',
            backgroundColor:
              hoverState === 'hover' ? 'rgba(99,102,241,0.08)' : 'transparent',
            boxShadow:
              hoverState === 'hover'
                ? '0 0 15px rgba(99,102,241,0.4), inset 0 0 15px rgba(99,102,241,0.1)'
                : 'none',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-9 h-9 rounded-full border transition-all"
          style={{ borderColor: 'rgba(255,255,255,0.25)' }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
