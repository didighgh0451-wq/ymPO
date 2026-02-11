import React, { useState, useRef, useEffect, useContext, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { CursorContext } from './components/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { GrainOverlay } from './components/GrainOverlay';
import { DynamicBackground } from './components/DynamicBackground';
import { IntroAnimation } from './components/IntroAnimation';
import { ProjectDetail } from './components/ProjectDetail';
import { CharacterDetail } from './components/CharacterDetail';
import { ProjectGrid } from './components/ProjectGrid';
import { CategoryTabs } from './components/CategoryTabs';
import { ProjectCard } from './components/ProjectCard';
import { SmoothScroll } from './components/SmoothScroll';
import { projects, type CategoryKey } from './components/projectData';

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

const categoryHeroText: Record<CategoryKey, { line1: string; line2: string; subKr: string; desc: string }> = {
  all: {
    line1: 'Cinematic',
    line2: 'Innovation',
    subKr: '시네마틱 혁신',
    desc: '시네마틱 스토리텔링, 디지털 아이덴티티, 캐릭터 디자인의 예술에 헌정된 큐레이션 공간입니다.',
  },
  youtube: {
    line1: 'Moving',
    line2: 'Pictures',
    subKr: '영상 아카이브',
    desc: '기획부터 촬영, 편집까지. 유튜브 채널을 위한 시네마틱 영상 콘텐츠를 아카이빙합니다.',
  },
  works: {
    line1: 'Creative',
    line2: 'Archive',
    subKr: '작업물 모음',
    desc: '커머셜 필름, 뮤직비디오, 단편영화 등 다양한 영역의 크리에이티브 작업물입니다.',
  },
  did: {
    line1: 'Digital',
    line2: 'Identity',
    subKr: '디지털 정체성',
    desc: '분산형 신원증명과 디지털 아이덴티티를 위한 비주얼 시스템 디자인입니다.',
  },
  character: {
    line1: 'Character',
    line2: 'Universe',
    subKr: '캐릭터 세계관',
    desc: '3D 모델링, 일러스트, 포스터까지. 캐릭터의 세계관을 구축하는 디자인 아카이브입니다.',
  },
};

/* ========================================
   Scroll Progress Bar
   ======================================== */
const ScrollProgressBar = ({
  scrollProgress,
  currentProjectIndex,
  totalProjects,
  visible,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
  currentProjectIndex: number;
  totalProjects: number;
  visible: boolean;
}) => {
  const widthPct = useTransform(scrollProgress, (v: number) => `${v}%`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none px-6 md:px-12 pb-6 md:pb-8"
    >
      <div className="flex items-center gap-4 max-w-full">
        {/* Progress info */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[9px] font-mono text-[#e5e0d5]/20 tracking-wider">
            {String(currentProjectIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-[8px] text-[#e5e0d5]/10">/</span>
          <span className="text-[9px] font-mono text-[#e5e0d5]/12 tracking-wider">
            {String(totalProjects).padStart(2, '0')}
          </span>
        </div>

        {/* Track */}
        <div className="flex-1 h-[1px] bg-[#e5e0d5]/[0.06] relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#e5e0d5]/25 rounded-full"
            style={{ width: widthPct }}
          />
        </div>

        {/* Scroll hint */}
        <span className="font-['Noto_Sans_KR'] text-[8px] text-[#e5e0d5]/12 tracking-[0.2em] flex-shrink-0 hidden md:block" style={{ fontWeight: 300 }}>
          SCROLL →
        </span>
      </div>
    </motion.div>
  );
};

/* ========================================
   App Content
   ======================================== */
const AppContent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const { setCursorVariant } = useContext(CursorContext);
  const [introFinished, setIntroFinished] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);

  // Scroll progress
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const lastProjectIndex = useRef(0);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const heroText = categoryHeroText[activeCategory];

  // Navigation props for detail view
  const navProps = useMemo(() => {
    if (!selectedId) return null;
    const navList = filteredProjects;
    const idx = navList.findIndex((p) => p.id === selectedId);
    if (idx < 0) {
      const fullIdx = projects.findIndex((p) => p.id === selectedId);
      return {
        prevProject: fullIdx > 0 ? projects[fullIdx - 1] : null,
        nextProject: fullIdx < projects.length - 1 ? projects[fullIdx + 1] : null,
        currentIndex: fullIdx,
        totalCount: projects.length,
      };
    }
    return {
      prevProject: idx > 0 ? navList[idx - 1] : null,
      nextProject: idx < navList.length - 1 ? navList[idx + 1] : null,
      currentIndex: idx,
      totalCount: navList.length,
    };
  }, [selectedId, filteredProjects]);

  const handleCategoryChange = useCallback((key: CategoryKey) => {
    setActiveCategory(key);
    targetScroll.current = 0;
    currentScroll.current = 0;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const handleSelect = useCallback((id: number) => {
    setIsNavigating(false);
    setSelectedId(id);
  }, []);

  const handleNavigate = useCallback((id: number) => {
    setIsNavigating(true);
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setIsNavigating(false);
    setSelectedId(null);
  }, []);

  const handleToggleGrid = useCallback(() => {
    setIsGridOpen((prev) => !prev);
  }, []);

  const handleGridSelect = useCallback((id: number) => {
    setIsGridOpen(false);
    setSelectedId(id);
    setIsNavigating(false);
  }, []);

  // Smooth horizontal scroll + progress tracking
  useEffect(() => {
    if (!introFinished) return;
    const el = scrollRef.current;
    if (!el) return;

    // Cache hero width to avoid DOM query every frame
    let cachedHeroWidth = el.querySelector('.hero-section')?.clientWidth || 0;
    const resizeObserver = new ResizeObserver(() => {
      cachedHeroWidth = el.querySelector('.hero-section')?.clientWidth || 0;
    });
    resizeObserver.observe(el);

    const onWheel = (e: WheelEvent) => {
      if (selectedId) return;
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (isVertical) {
        e.preventDefault();
        targetScroll.current += e.deltaY * 1.5;
        targetScroll.current = Math.max(
          0,
          Math.min(targetScroll.current, el.scrollWidth - el.clientWidth)
        );
      }
    };

    // Touch tracking — only sync scroll position during actual touch drags
    let isTouching = false;
    const onTouchStart = () => { isTouching = true; };
    const onTouchEnd = () => {
      isTouching = false;
      // Sync final touch position for the lerp to continue from
      targetScroll.current = el.scrollLeft;
      currentScroll.current = el.scrollLeft;
    };

    const onScroll = () => {
      if (selectedId) return;
      // Only sync when user is physically touch-dragging
      // Prevents programmatic scrollLeft changes from resetting the lerp target
      if (isTouching) {
        targetScroll.current = el.scrollLeft;
        currentScroll.current = el.scrollLeft;
      }
    };

    let frame: number;
    const animate = () => {
      if (!selectedId && el) {
        const diff = Math.abs(targetScroll.current - currentScroll.current);
        // Only interpolate when there's meaningful distance to cover
        if (diff > 0.5) {
          currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.1);
          el.scrollLeft = currentScroll.current;
        } else if (diff > 0) {
          // Snap to target when close enough to avoid infinite tiny updates
          currentScroll.current = targetScroll.current;
          el.scrollLeft = currentScroll.current;
        }

        // Update progress
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          const pct = (currentScroll.current / maxScroll) * 100;
          rawProgress.set(Math.min(pct, 100));

          // Estimate which project card is most visible
          const scrollPast = Math.max(0, currentScroll.current - cachedHeroWidth);
          const avgCardWidth = (maxScroll - cachedHeroWidth) / Math.max(filteredProjects.length, 1);
          const idx = Math.min(
            Math.floor(scrollPast / Math.max(avgCardWidth, 1)),
            filteredProjects.length - 1
          );
          const newIdx = Math.max(0, idx);
          if (newIdx !== lastProjectIndex.current) {
            lastProjectIndex.current = newIdx;
            setCurrentProjectIndex(newIdx);
          }
        }
      }
      frame = requestAnimationFrame(animate);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    animate();
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [selectedId, introFinished, filteredProjects.length, rawProgress]);

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <div className="bg-[#0f0f0f] text-[#e5e0d5] min-h-screen font-['Inter','Noto_Sans_KR',sans-serif] selection:bg-[#e5e0d5]/90 selection:text-[#0f0f0f] overflow-hidden">
      <GrainOverlay />
      <CustomCursor />
      <DynamicBackground activeCategory={activeCategory} />
      <IntroAnimation onComplete={handleIntroComplete} />

      <CategoryTabs 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
        onToggleGrid={handleToggleGrid}
      />

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="relative z-[2] h-screen w-full flex items-center px-[6vw] md:px-[10vw] no-scrollbar overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Hero Text */}
        <div className="hero-section flex-shrink-0 mr-[10vw] md:mr-[18vw] w-[70vw] md:w-[35vw] min-w-[280px] md:min-w-[340px] pt-20 md:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={introFinished ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1
                className="font-['Playfair_Display'] tracking-tighter mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6.5vw, 7rem)', lineHeight: 0.88 }}
              >
                {heroText.line1} <br />
                <span className="italic">{heroText.line2}</span>
              </h1>

              <p
                className="font-['Noto_Serif_KR'] text-[#e5e0d5]/30 mb-6 tracking-wider"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)', fontWeight: 300 }}
              >
                {heroText.subKr}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#e5e0d5]/20" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#e5e0d5]/25 font-mono">
                  Selected Works
                </span>
              </div>

              <p
                className="font-['Noto_Sans_KR'] text-[#e5e0d5]/35 text-sm max-w-[300px]"
                style={{ lineHeight: 1.8, fontWeight: 300 }}
              >
                {heroText.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Cards */}
        <AnimatePresence>
          {filteredProjects.map((p, idx) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={idx}
              onSelect={handleSelect}
            />
          ))}
        </AnimatePresence>

        {/* CTA End Section */}
        <div className="flex-shrink-0 mr-[10vw] w-[60vw] md:w-[25vw] min-w-[220px] flex flex-col justify-center">
          <h3
            className="font-['Playfair_Display'] text-[#e5e0d5]/30 italic mb-3"
            style={{ fontSize: 'clamp(1.5rem, 2vw, 1.875rem)', lineHeight: 1.2 }}
          >
            Every frame <br /> tells a story.
          </h3>
          <p
            className="font-['Noto_Serif_KR'] text-[#e5e0d5]/15 mb-10"
            style={{ fontSize: '0.75rem', lineHeight: 1.6, fontWeight: 300 }}
          >
            모든 프레임이<br />이야기를 전합니다.
          </p>
          <div
            className="font-['Noto_Sans_KR'] inline-block border-b border-[#e5e0d5]/30 pb-2 text-[10px] tracking-[0.3em] cursor-pointer hover:text-[#e5e0d5] hover:border-[#e5e0d5] transition-colors w-fit text-[#e5e0d5]/50"
            style={{ fontWeight: 400 }}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            대화 시작하기
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgressBar
        scrollProgress={springProgress}
        currentProjectIndex={currentProjectIndex}
        totalProjects={filteredProjects.length}
        visible={introFinished && !selectedId && !isGridOpen}
      />

      {/* Grid View Overlay */}
      <AnimatePresence>
        {isGridOpen && (
          <ProjectGrid
            projects={filteredProjects}
            activeCategoryLabel={activeCategory === 'all' ? 'All Projects' : heroText.subKr}
            onSelect={handleGridSelect}
            onClose={() => setIsGridOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal — cinematic transition */}
      <AnimatePresence>
        {selectedId &&
          navProps &&
          (() => {
            const selectedProject = projects.find((p) => p.id === selectedId)!;
            const isCharacter =
              selectedProject.category === 'character' && selectedProject.characterData;

            const sharedNavProps = {
              onNavigate: handleNavigate,
              prevProject: navProps.prevProject,
              nextProject: navProps.nextProject,
              currentIndex: navProps.currentIndex,
              totalCount: navProps.totalCount,
              isNavigating,
            };

            return isCharacter ? (
              <CharacterDetail
                key={selectedId}
                project={selectedProject}
                onClose={handleClose}
                {...sharedNavProps}
              />
            ) : (
              <ProjectDetail
                key={selectedId}
                project={selectedProject}
                onClose={handleClose}
                {...sharedNavProps}
              />
            );
          })()}
      </AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default function App() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Identity: Set Title & Meta Description
    document.title = "Cinematic Stack | Portfolio";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'A data-driven cinematic portfolio featuring seamless transitions and immersive editorial layouts.');
  }, []);

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant, cursorText, setCursorText }}>
      <SmoothScroll />
      <AppContent />
    </CursorContext.Provider>
  );
}