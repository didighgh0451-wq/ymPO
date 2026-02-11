import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import type { CategoryKey } from './projectData';

const categoryGlowColors: Record<CategoryKey, string> = {
  all: '#b8956a',
  youtube: '#cc3333',
  works: '#c4923e',
  did: '#3a7bdb',
  character: '#2eb88a',
};

interface DynamicBackgroundProps {
  activeCategory: CategoryKey;
}

export const DynamicBackground = ({ activeCategory }: DynamicBackgroundProps) => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 960);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 540);

  const springConfig = { damping: 50, stiffness: 80, mass: 1.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  const glowColor = categoryGlowColors[activeCategory];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Vignette — darkened edges for cinema depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Mouse-following glow — category color tinted */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          backgroundColor: glowColor,
          filter: 'blur(180px)',
          opacity: 0.09,
          transition: 'background-color 1.4s ease',
          willChange: 'transform',
        }}
      />

      {/* Ambient top glow — projector beam feel */}
      <div
        className="absolute -top-[15vh] left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] rounded-full"
        style={{
          backgroundColor: glowColor,
          filter: 'blur(160px)',
          opacity: 0.04,
          transition: 'background-color 1.4s ease',
        }}
      />

      {/* Subtle bottom edge darkness for extra depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20vh]"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
        }}
      />
    </div>
  );
};
