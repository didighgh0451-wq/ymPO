import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { CursorContext } from './CursorContext';

export const CustomCursor = () => {
  const { cursorVariant, cursorText } = useContext(CursorContext);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 500, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const variants = {
    default: { width: 16, height: 16, x: -8, y: -8, backgroundColor: '#fff' },
    project: { width: 100, height: 100, x: -50, y: -50, backgroundColor: '#fff' },
    button: { width: 40, height: 40, x: -20, y: -20, backgroundColor: '#fff' },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        {cursorVariant === 'project' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-black text-[10px] tracking-widest"
            style={{ fontWeight: 700 }}
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
