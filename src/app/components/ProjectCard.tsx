import React, { useRef, useState, useCallback, useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CursorContext } from './CursorContext';
import type { Project } from './projectData';
import { getCardWidthClass, getAspectRatioCss, getProjectThumbnail } from './videoUtils';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (id: number) => void;
}

export const ProjectCard = ({ project, index, onSelect }: ProjectCardProps) => {
  const { setCursorVariant, setCursorText } = useContext(CursorContext);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.1 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Glare position
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouseX.set(nx);
      mouseY.set(ny);
      setGlarePos({ x: nx * 100, y: ny * 100 });
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setCursorVariant('project');
    setCursorText('OPEN');
  }, [setCursorVariant, setCursorText]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    setCursorVariant('default');
  }, [mouseX, mouseY, setCursorVariant]);

  const p = project;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onSelect(p.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex-shrink-0 ${getCardWidthClass(p.aspectRatio)} mr-[6vw] last:mr-[15vw] cursor-pointer group`}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full overflow-hidden bg-[#1a1a1a]"
          style={{ aspectRatio: getAspectRatioCss(p.aspectRatio) }}
        >
          <motion.img
            layoutId={`image-${p.id}`}
            src={getProjectThumbnail(p)}
            alt={p.title}
            className="w-full h-full object-cover will-change-transform"
            animate={
              isHovering
                ? {
                    scale: 1.15,
                    x: [0, -10, 0],
                    y: [0, -5, 0],
                    filter: "contrast(1.1) brightness(1.1)"
                  }
                : {
                    scale: 1.0,
                    x: 0,
                    y: 0,
                    filter: "contrast(1) brightness(1)"
                  }
            }
            transition={{
              scale: { duration: 8, ease: "linear" },
              x: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              y: { duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              filter: { duration: 0.4 }
            }}
          />
          
          {/* Cinematic Grain Overlay */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-10 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px'
            }}
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

          {/* 3D Glare / Shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `radial-gradient(ellipse 70% 60% at ${glarePos.x}% ${glarePos.y}%, rgba(229, 224, 213, 0.15), transparent 70%)`,
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Edge highlight (top edge light reflection) */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: `linear-gradient(to bottom, rgba(229, 224, 213, ${isHovering ? 0.06 : 0}) 0%, transparent 30%)`,
              transition: 'all 0.4s ease',
            }}
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full">
            <span
              className="font-['Noto_Sans_KR'] text-[9px] tracking-[0.15em] text-[#e5e0d5]/80"
              style={{ fontWeight: 400 }}
            >
              {p.categoryLabel}
            </span>
          </div>

          {/* Bottom badges */}
          {p.category !== 'character' && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[8px] font-mono text-[#e5e0d5]/50">
                {p.aspectRatio}
              </div>
            </div>
          )}
          {p.category === 'character' && p.characterData && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <div
                className="font-['Noto_Sans_KR'] px-2.5 py-1 bg-black/40 backdrop-blur-md rounded text-[8px] text-[#e5e0d5]/50 tracking-wider"
                style={{ fontWeight: 300 }}
              >
                캐릭터 시트
              </div>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="mt-5 flex justify-between items-baseline border-b border-[#e5e0d5]/[0.08] pb-4">
          <div>
            <h2
              className="font-['Playfair_Display'] italic tracking-tighter"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.75rem)' }}
            >
              {p.title}
            </h2>
            <span
              className="font-['Noto_Sans_KR'] text-[10px] text-[#e5e0d5]/30 tracking-widest mt-1 block"
              style={{ fontWeight: 300 }}
            >
              {p.characterData ? p.characterData.nameKr : p.client}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#e5e0d5]/25 uppercase tracking-widest">
            {p.year}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};