import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Film, Image as ImageIcon, ChevronDown, ExternalLink } from 'lucide-react';
import { CursorContext } from './CursorContext';
import type { Project } from './projectData';
import { parseVideoUrl, getAspectRatioCss, getAspectRatioLabel, getProjectThumbnail } from './videoUtils';
import { ProjectNavigation } from './ProjectNavigation';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNavigate: (id: number) => void;
  prevProject: Project | null;
  nextProject: Project | null;
  currentIndex: number;
  totalCount: number;
  isNavigating: boolean;
}

export const ProjectDetail = ({
  project,
  onClose,
  onNavigate,
  prevProject,
  nextProject,
  currentIndex,
  totalCount,
  isNavigating,
}: ProjectDetailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setCursorVariant } = useContext(CursorContext);

  const parsed = useMemo(() => parseVideoUrl(project.videoUrl), [project.videoUrl]);
  const thumbnailUrl = parsed.thumbnailUrl || getProjectThumbnail(project);
  const isVertical = project.aspectRatio === '9:16' || project.aspectRatio === '4:5';
  const isUltrawide = project.aspectRatio === '21:9';

  const s = project.style;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[5000] bg-[#0a0a0a] text-[#e5e0d5] overflow-y-auto overflow-x-hidden no-scrollbar font-['Inter','Noto_Sans_KR',sans-serif]"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        onClick={onClose}
        onMouseEnter={() => setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant('default')}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-[5010] flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[#e5e0d5]/15 bg-black/40 backdrop-blur-md text-[#e5e0d5]/80 hover:bg-[#e5e0d5] hover:text-[#0f0f0f] transition-all duration-300 cursor-pointer group"
      >
        <span className="font-['Noto_Sans_KR'] text-[10px] tracking-widest hidden md:inline" style={{ fontWeight: 400 }}>
          닫기
        </span>
        <X size={16} />
      </motion.button>

      <div className="flex flex-col w-full">
        {/* TOP: Adaptive Video Section */}
        <section className="relative w-full bg-black flex items-center justify-center py-8 md:py-12">
          <div
            className={`relative w-full ${
              isVertical
                ? 'max-w-[420px] md:max-w-[480px]'
                : isUltrawide
                ? 'max-w-[1400px]'
                : 'max-w-[1100px]'
            } mx-auto px-4 md:px-8`}
          >
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                <motion.div
                  key="thumb"
                  className="relative cursor-pointer overflow-hidden bg-[#141414]"
                  style={{ aspectRatio: getAspectRatioCss(project.aspectRatio) }}
                  onClick={() => setIsPlaying(true)}
                >
                  <motion.img
                    {...(!isNavigating ? { layoutId: `image-${project.id}` } : {})}
                    transition={{ type: 'spring', stiffness: 250, damping: 28, mass: 0.5 }}
                    src={thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Play overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-all group"
                      style={{ borderColor: `${s.accentColor}44` }}
                    >
                      <Play fill="#e5e0d5" size={24} className="ml-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6 flex flex-col items-center gap-2 text-[#e5e0d5]/40"
                    >
                      <span className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.4em]" style={{ fontWeight: 300 }}>
                        영상 재생
                      </span>
                      <ChevronDown size={14} className="animate-bounce" />
                    </motion.div>
                  </motion.div>

                  {/* Ratio badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute top-3 left-3 flex items-center gap-2"
                  >
                    <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] font-mono text-[#e5e0d5]/60 uppercase tracking-wider">
                      {project.aspectRatio}
                    </div>
                    <div className="font-['Noto_Sans_KR'] px-2.5 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] text-[#e5e0d5]/60 tracking-wider" style={{ fontWeight: 300 }}>
                      {getAspectRatioLabel(project.aspectRatio)}
                    </div>
                  </motion.div>

                  {/* Platform badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded text-[9px] font-mono text-[#e5e0d5]/60 uppercase tracking-wider"
                  >
                    {parsed.platform === 'youtube' ? 'YouTube' : parsed.platform === 'vimeo' ? 'Vimeo' : 'Video'}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden bg-black"
                  style={{ aspectRatio: getAspectRatioCss(project.aspectRatio) }}
                >
                  {parsed.platform === 'youtube' || parsed.platform === 'vimeo' ? (
                    <iframe
                      src={parsed.embedUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={project.title}
                    />
                  ) : (
                    <video src={parsed.embedUrl} controls autoPlay className="w-full h-full object-contain" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video source link */}
            {parsed.platform !== 'direct' && (
              <div className="mt-4 flex justify-end">
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Noto_Sans_KR'] flex items-center gap-2 text-[10px] text-[#e5e0d5]/30 hover:text-[#e5e0d5]/60 transition-colors tracking-widest"
                  style={{ fontWeight: 300 }}
                >
                  <span>{parsed.platform === 'youtube' ? 'YouTube에서 보기' : 'Vimeo에서 보기'}</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM: Narrative Section */}
        <section className="w-full bg-[#0a0a0a] px-8 lg:px-24 py-24 md:py-32 flex flex-col items-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1400px]"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                {/* Meta line */}
                <div className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/35 mb-6 flex items-center gap-4 flex-wrap" style={{ fontWeight: 300 }}>
                  <span>{project.categoryLabel}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${s.accentColor}66` }} />
                  <span>{project.client}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${s.accentColor}66` }} />
                  <span>{project.year}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${s.accentColor}66` }} />
                  <span className="font-mono">{project.aspectRatio}</span>
                </div>

                {/* Accent line */}
                <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: s.accentColor }} />

                {/* Big Typography Title */}
                <h2
                  className={`mb-8 ${s.titleItalic ? 'italic' : ''}`}
                  style={{
                    fontFamily: s.titleFont,
                    fontWeight: s.titleWeight,
                    letterSpacing: s.titleLetterSpacing,
                    textTransform: s.titleUppercase ? 'uppercase' : 'none',
                    fontSize: 'clamp(2.25rem, 6vw, 6rem)', // Adjusted min-size for mobile safety
                    lineHeight: 0.9,
                    wordBreak: 'keep-all', // Korean typography friendly
                    overflowWrap: 'break-word',
                  }}
                >
                  {project.title}
                </h2>

                <p
                  className="font-['Noto_Sans_KR'] text-[#e5e0d5]/60 max-w-2xl text-lg md:text-xl leading-relaxed"
                  style={{ fontWeight: 300 }}
                >
                  {project.description}
                </p>
              </div>

              {/* CREDITS / SPEC SHEET - Editorial Style */}
              <div className="w-full md:w-[320px] shrink-0 mt-12 md:mt-0">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e5e0d5]/20">
                  <div className="w-2 h-2 rounded-full bg-[#e5e0d5]" />
                  <span className="font-['Space_Grotesk'] text-sm tracking-widest uppercase text-[#e5e0d5]">Project Credits</span>
                </div>

                <div className="flex flex-col font-['Space_Grotesk']">
                  {[
                    { label: 'CLIENT', value: project.client },
                    { label: 'ROLE', value: project.role },
                    { label: 'TOOLS', value: project.tools },
                    { label: 'YEAR', value: project.year },
                    { label: 'TYPE', value: project.categoryLabel },
                  ].map((item, i) => (
                    <div key={i} className="group flex flex-col py-4 border-b border-[#e5e0d5]/10 hover:border-[#e5e0d5]/40 transition-colors">
                      <span className="text-[10px] text-[#e5e0d5]/40 mb-1 tracking-widest uppercase">{item.label}</span>
                      <span className="text-sm md:text-base text-[#e5e0d5]/90 font-medium">{item.value}</span>
                    </div>
                  ))}
                  
                  <div className="group flex flex-col py-4 border-b border-[#e5e0d5]/10 hover:border-[#e5e0d5]/40 transition-colors">
                     <span className="text-[10px] text-[#e5e0d5]/40 mb-1 tracking-widest uppercase">FORMAT</span>
                     <span className="text-sm md:text-base text-[#e5e0d5]/90 font-medium">{project.aspectRatio} · {getAspectRatioLabel(project.aspectRatio)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* VISUAL STORYBOARD */}
            {project.storyboardImages.length > 0 && (
              <div className="mb-32">
                <div className="flex items-center justify-between mb-12 pb-6" style={{ borderBottom: `1px solid ${s.accentColor}18` }}>
                  <div className="flex items-center gap-4">
                    <ImageIcon size={20} style={{ color: `${s.accentColor}88` }} />
                    <div className="flex flex-col">
                      <h3 className="uppercase tracking-[0.3em] text-sm" style={{ fontWeight: 700 }}>
                        Visual Storyboard
                      </h3>
                      <span className="font-['Noto_Serif_KR'] text-[10px] text-[#e5e0d5]/35 tracking-wider mt-0.5" style={{ fontWeight: 300 }}>
                        비주얼 스토리보드
                      </span>
                    </div>
                  </div>
                  <span className="font-['Noto_Sans_KR'] text-[10px] text-[#e5e0d5]/25 tracking-wider" style={{ fontWeight: 300 }}>
                    프리뷰 아카이브 — {project.storyboardImages.length}장면
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {project.storyboardImages.map((img, idx) => (
                    <motion.div
                      key={`scene-${idx}`}
                      className="aspect-video bg-[#141414] overflow-hidden relative group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx % 4) * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <img
                        src={img}
                        alt={`Scene ${idx + 1}`}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 text-[8px] font-mono text-[#e5e0d5]/50 rounded-sm">
                        {String(idx + 1).padStart(2, '0')}장
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="font-['Noto_Sans_KR'] mt-8 text-xs text-[#e5e0d5]/25 tracking-wide max-w-lg" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                  * {project.storyboardDesc}
                </p>
              </div>
            )}

            {/* TECHNICAL PROCESS */}
            <div className="mt-32 pt-12 border-t border-[#e5e0d5]/10">
               <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                  {/* Left: Heading */}
                  <div className="md:w-1/3 shrink-0">
                    <div className="flex items-center gap-3 mb-6">
                      <Film size={20} className="text-[#e5e0d5]" />
                      <h4 className="font-['Space_Grotesk'] uppercase tracking-[0.2em] text-sm text-[#e5e0d5]">
                        Process & Pipeline
                      </h4>
                    </div>
                    <p className="font-['Noto_Serif_KR'] text-[#e5e0d5]/40 text-xs tracking-wide leading-relaxed">
                      작업 과정 및 기술적 접근 방식에 대한 상세 노트
                    </p>
                  </div>

                  {/* Right: Content */}
                  <div className="md:w-2/3">
                    <p 
                      className="font-['Noto_Sans_KR'] text-[#e5e0d5]/80 text-lg md:text-xl leading-relaxed whitespace-pre-line"
                      style={{ fontWeight: 300 }}
                    >
                      {project.process}
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECT NAVIGATION */}
        <ProjectNavigation
          prevProject={prevProject}
          nextProject={nextProject}
          onNavigate={onNavigate}
          onClose={onClose}
          currentIndex={currentIndex}
          totalCount={totalCount}
          accentColor={s.accentColor}
        />
      </div>
    </motion.div>
  );
};
