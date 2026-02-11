import React, { useContext, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid } from 'lucide-react';
import { CursorContext } from './CursorContext';
import type { CategoryKey } from './projectData';
import { categories } from './projectData';

interface CategoryTabsProps {
  activeCategory: CategoryKey;
  onCategoryChange: (key: CategoryKey) => void;
  onToggleGrid: () => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange, onToggleGrid }: CategoryTabsProps) => {
  const { setCursorVariant } = useContext(CursorContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Scroll active tab into view on category change
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const activeBtn = el.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed top-0 left-0 w-full z-40 pointer-events-none"
    >
      <div className="w-full bg-[#0f0f0f]/70 backdrop-blur-2xl border-b border-[#e5e0d5]/[0.06] pointer-events-auto">
        {/* Top row: Logo + Contact */}
        <div className="flex justify-between items-center px-5 md:px-12 pt-5 md:pt-6 pb-2 md:pb-3">
          <div
            className="cursor-pointer group relative"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            {/* Hover glow backdrop */}
            <div className="absolute -inset-3 bg-[#e5e0d5]/0 group-hover:bg-[#e5e0d5]/[0.03] rounded-lg transition-all duration-700 blur-sm" />
            
            <div className="relative flex items-baseline gap-0">
              {/* KIM YOUNG MIN - letter stagger */}
              <div className="flex overflow-hidden">
                {'KIM YOUNG MIN'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.6 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="font-['Space_Grotesk'] text-[#e5e0d5] tracking-[0.08em] inline-block group-hover:text-[#e5e0d5] transition-colors duration-500"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)',
                      fontWeight: 500,
                      width: char === ' ' ? '0.35em' : 'auto',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>

              {/* ® symbol with pulse */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative ml-1.5"
              >
                <motion.span
                  animate={{
                    opacity: [0.35, 0.6, 0.35],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="font-['Space_Grotesk'] text-[#e5e0d5] align-super"
                  style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', fontWeight: 300 }}
                >
                  ®
                </motion.span>
              </motion.span>
            </div>

            {/* Animated underline on hover */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1px] mt-1 origin-left bg-gradient-to-r from-[#e5e0d5]/30 via-[#e5e0d5]/10 to-transparent group-hover:from-[#e5e0d5]/60 group-hover:via-[#e5e0d5]/20 transition-all duration-700"
            />
          </div>
          
          <div className="flex items-center gap-6 md:gap-8">
            <button
              onClick={onToggleGrid}
              className="text-[#e5e0d5]/40 hover:text-[#e5e0d5] transition-colors"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              aria-label="Grid View"
            >
              <LayoutGrid size={18} />
            </button>

            <div
              className="font-['Noto_Sans_KR'] text-[10px] uppercase tracking-[0.3em] cursor-pointer hover:line-through transition-all text-[#e5e0d5]/40 hover:text-[#e5e0d5]/80"
              style={{ fontWeight: 500 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              문의하기
            </div>
          </div>
        </div>

        {/* Category tabs row — horizontally scrollable on mobile */}
        <div className="relative">
          {/* Left fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0f0f0f]/70 to-transparent z-10 pointer-events-none md:hidden" />
          )}

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-0 px-4 md:px-12 overflow-x-auto no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  data-active={isActive}
                  onClick={() => onCategoryChange(cat.key)}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="relative flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-3 md:py-3.5 cursor-pointer transition-all duration-300 whitespace-nowrap group flex-shrink-0"
                >
                  <span
                    className={`font-['Noto_Sans_KR'] text-[11px] uppercase tracking-[0.12em] md:tracking-[0.15em] transition-all duration-300 ${
                      isActive ? 'text-[#e5e0d5]/90' : 'text-[#e5e0d5]/25 group-hover:text-[#e5e0d5]/50'
                    }`}
                    style={{ fontWeight: isActive ? 500 : 300 }}
                  >
                    {cat.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono transition-all duration-300 ${
                      isActive ? 'text-[#e5e0d5]/50' : 'text-[#e5e0d5]/15'
                    }`}
                  >
                    {String(cat.count).padStart(2, '0')}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#e5e0d5]/70"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right fade hint */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0f0f0f]/70 to-transparent z-10 pointer-events-none md:hidden" />
          )}
        </div>
      </div>
    </motion.div>
  );
};