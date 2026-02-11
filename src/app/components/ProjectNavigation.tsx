import { useContext, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { CursorContext } from './CursorContext';
import type { Project } from './projectData';
import { getProjectThumbnail } from './videoUtils';

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
  onNavigate: (id: number) => void;
  onClose: () => void;
  currentIndex: number;
  totalCount: number;
  accentColor?: string;
}

export const ProjectNavigation = ({
  prevProject,
  nextProject,
  onNavigate,
  onClose,
  currentIndex,
  totalCount,
  accentColor = '#e5e0d5',
}: ProjectNavigationProps) => {
  const { setCursorVariant } = useContext(CursorContext);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevProject) {
        onNavigate(prevProject.id);
      } else if (e.key === 'ArrowRight' && nextProject) {
        onNavigate(nextProject.id);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProject, nextProject, onNavigate, onClose]);

  return (
    <section className="w-full bg-[#0a0a0a] px-4 md:px-8 lg:px-24 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Divider + Progress */}
        <div className="border-t border-[#e5e0d5]/[0.08] pt-10 md:pt-16 mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#e5e0d5]/[0.06] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ backgroundColor: `${accentColor}66` }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#e5e0d5]/25 tracking-wider whitespace-nowrap">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {/* Previous */}
          {prevProject ? (
            <motion.button
              onClick={() => onNavigate(prevProject.id)}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group cursor-pointer text-left border border-[#e5e0d5]/[0.06] rounded-sm p-3 md:p-8 hover:border-[#e5e0d5]/15 transition-all duration-300 hover:bg-[#e5e0d5]/[0.02]"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-5">
                <ChevronLeft
                  size={12}
                  className="text-[#e5e0d5]/20 group-hover:text-[#e5e0d5]/50 transition-colors"
                />
                <span
                  className="font-['Noto_Sans_KR'] text-[8px] md:text-[9px] text-[#e5e0d5]/20 tracking-[0.15em] md:tracking-[0.25em] uppercase group-hover:text-[#e5e0d5]/40 transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  이전 프로젝트
                </span>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-[72px] md:h-[72px] rounded-sm overflow-hidden flex-shrink-0 opacity-40 group-hover:opacity-75 transition-opacity duration-300">
                  <img
                    src={getProjectThumbnail(prevProject)}
                    alt={prevProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4
                    className="font-['Playfair_Display'] italic tracking-tight text-[#e5e0d5]/50 group-hover:text-[#e5e0d5]/90 transition-colors truncate"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.4rem)' }}
                  >
                    {prevProject.title}
                  </h4>
                  <span
                    className="font-['Noto_Sans_KR'] text-[8px] md:text-[9px] text-[#e5e0d5]/15 tracking-wider block mt-1 group-hover:text-[#e5e0d5]/30 transition-colors"
                    style={{ fontWeight: 300 }}
                  >
                    {prevProject.characterData
                      ? prevProject.characterData.nameKr
                      : prevProject.client}{' '}
                    · {prevProject.year}
                  </span>
                </div>
              </div>
            </motion.button>
          ) : (
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group cursor-pointer text-left border border-[#e5e0d5]/[0.06] rounded-sm p-3 md:p-8 hover:border-[#e5e0d5]/15 transition-all duration-300 flex items-center gap-3 md:gap-4"
            >
              <ArrowLeft
                size={16}
                className="text-[#e5e0d5]/20 group-hover:text-[#e5e0d5]/50 group-hover:-translate-x-1 transition-all flex-shrink-0"
              />
              <span
                className="font-['Noto_Sans_KR'] text-[9px] md:text-[10px] text-[#e5e0d5]/20 tracking-[0.15em] md:tracking-[0.25em] group-hover:text-[#e5e0d5]/50 transition-colors"
                style={{ fontWeight: 400 }}
              >
                갤러리로 돌아가기
              </span>
            </button>
          )}

          {/* Next */}
          {nextProject ? (
            <motion.button
              onClick={() => onNavigate(nextProject.id)}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group cursor-pointer text-right border border-[#e5e0d5]/[0.06] rounded-sm p-3 md:p-8 hover:border-[#e5e0d5]/15 transition-all duration-300 hover:bg-[#e5e0d5]/[0.02]"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-end gap-1.5 md:gap-2 mb-3 md:mb-5">
                <span
                  className="font-['Noto_Sans_KR'] text-[8px] md:text-[9px] text-[#e5e0d5]/20 tracking-[0.15em] md:tracking-[0.25em] uppercase group-hover:text-[#e5e0d5]/40 transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  다음 프로젝트
                </span>
                <ChevronRight
                  size={12}
                  className="text-[#e5e0d5]/20 group-hover:text-[#e5e0d5]/50 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 md:gap-4">
                <div className="min-w-0 text-right">
                  <h4
                    className="font-['Playfair_Display'] italic tracking-tight text-[#e5e0d5]/50 group-hover:text-[#e5e0d5]/90 transition-colors truncate"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.4rem)' }}
                  >
                    {nextProject.title}
                  </h4>
                  <span
                    className="font-['Noto_Sans_KR'] text-[8px] md:text-[9px] text-[#e5e0d5]/15 tracking-wider block mt-1 group-hover:text-[#e5e0d5]/30 transition-colors"
                    style={{ fontWeight: 300 }}
                  >
                    {nextProject.characterData
                      ? nextProject.characterData.nameKr
                      : nextProject.client}{' '}
                    · {nextProject.year}
                  </span>
                </div>
                <div className="w-10 h-10 md:w-[72px] md:h-[72px] rounded-sm overflow-hidden flex-shrink-0 opacity-40 group-hover:opacity-75 transition-opacity duration-300">
                  <img
                    src={getProjectThumbnail(nextProject)}
                    alt={nextProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.button>
          ) : (
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group cursor-pointer text-right border border-[#e5e0d5]/[0.06] rounded-sm p-3 md:p-8 hover:border-[#e5e0d5]/15 transition-all duration-300 flex items-center justify-end gap-3 md:gap-4"
            >
              <span
                className="font-['Noto_Sans_KR'] text-[9px] md:text-[10px] text-[#e5e0d5]/20 tracking-[0.15em] md:tracking-[0.25em] group-hover:text-[#e5e0d5]/50 transition-colors"
                style={{ fontWeight: 400 }}
              >
                갤러리로 돌아가기
              </span>
              <ArrowRight
                size={16}
                className="text-[#e5e0d5]/20 group-hover:text-[#e5e0d5]/50 group-hover:translate-x-1 transition-all flex-shrink-0"
              />
            </button>
          )}
        </div>

        {/* Keyboard hint — desktop only */}
        <div className="mt-8 md:mt-10 hidden md:flex justify-center">
          <div className="flex items-center gap-6 text-[#e5e0d5]/15 font-mono">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 border border-[#e5e0d5]/[0.08] rounded text-[8px] tracking-wider">
                ←
              </kbd>
              <span className="font-['Noto_Sans_KR'] text-[8px] tracking-wider" style={{ fontWeight: 300 }}>
                이전
              </span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 border border-[#e5e0d5]/[0.08] rounded text-[8px] tracking-wider">
                →
              </kbd>
              <span className="font-['Noto_Sans_KR'] text-[8px] tracking-wider" style={{ fontWeight: 300 }}>
                다음
              </span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 border border-[#e5e0d5]/[0.08] rounded text-[8px] tracking-wider">
                ESC
              </kbd>
              <span className="font-['Noto_Sans_KR'] text-[8px] tracking-wider" style={{ fontWeight: 300 }}>
                닫기
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};