import React from 'react';
import { motion } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => (
  <motion.div
    className="fixed inset-0 z-[10000] bg-[#0f0f0f] flex flex-col items-center justify-center gap-4"
    initial={{ y: 0 }}
    animate={{ y: '-100%' }}
    transition={{ duration: 1, ease: [0.7, 0, 0.3, 1], delay: 1.4 }}
    onAnimationComplete={onComplete}
  >
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[#e5e0d5] font-['Playfair_Display'] italic tracking-tighter"
      style={{ fontSize: '2.25rem' }}
    >
      Visual Curation
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ delay: 0.4 }}
      className="text-[#e5e0d5] font-['Noto_Serif_KR'] tracking-widest"
      style={{ fontSize: '0.75rem', fontWeight: 300 }}
    >
      시각적 큐레이션
    </motion.p>
  </motion.div>
);
