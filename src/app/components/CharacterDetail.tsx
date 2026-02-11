import { useContext } from 'react';
import { motion } from 'motion/react';
import { X, Layers, Palette, Sparkles, Package } from 'lucide-react';
import { CursorContext } from './CursorContext';
import type { Project } from './projectData';
import { ProjectNavigation } from './ProjectNavigation';
import { getProjectThumbnail } from './videoUtils';

interface CharacterDetailProps {
  project: Project;
  onClose: () => void;
  onNavigate: (id: number) => void;
  prevProject: Project | null;
  nextProject: Project | null;
  currentIndex: number;
  totalCount: number;
  isNavigating: boolean;
}

const SectionHeader = ({
  titleEn,
  titleKr,
  icon: Icon,
  number,
  accentColor,
}: {
  titleEn: string;
  titleKr: string;
  icon: React.ElementType;
  number: string;
  accentColor: string;
}) => (
  <div
    className="flex items-end justify-between mb-12 md:mb-16 pb-6"
    style={{ borderBottom: `1px solid ${accentColor}18` }}
  >
    <div className="flex items-center gap-4">
      <Icon size={18} style={{ color: `${accentColor}88` }} />
      <div className="flex flex-col">
        <h3
          className="uppercase tracking-[0.3em] text-sm text-[#e5e0d5]/90"
          style={{ fontWeight: 600 }}
        >
          {titleEn}
        </h3>
        <span
          className="font-['Noto_Serif_KR'] text-[11px] text-[#e5e0d5]/35 tracking-wider mt-1"
          style={{ fontWeight: 300 }}
        >
          {titleKr}
        </span>
      </div>
    </div>
    <span className="text-[10px] font-mono text-[#e5e0d5]/20 tracking-widest">{number}</span>
  </div>
);

export const CharacterDetail = ({
  project,
  onClose,
  onNavigate,
  prevProject,
  nextProject,
  currentIndex,
  totalCount,
  isNavigating,
}: CharacterDetailProps) => {
  const { setCursorVariant } = useContext(CursorContext);
  const cd = project.characterData!;
  const s = project.style;

  // Determine which sections to show and calculate numbering dynamically
  const hasTurnaround = cd.turnaroundImages && cd.turnaroundImages.length > 0;
  const hasBreakdown = (cd.colorPalette && cd.colorPalette.length > 0) || (cd.designFeatures && cd.designFeatures.length > 0);
  const hasPose = cd.poseImages && cd.poseImages.length > 0;
  const hasUsage = cd.usageImages && cd.usageImages.length > 0;

  let secCount = 1;
  const turnSec = hasTurnaround ? `SEC.${String(secCount++).padStart(2, '0')}` : '';
  const breakSec = hasBreakdown ? `SEC.${String(secCount++).padStart(2, '0')}` : '';
  const poseSec = hasPose ? `SEC.${String(secCount++).padStart(2, '0')}` : '';
  const usageSec = hasUsage ? `SEC.${String(secCount++).padStart(2, '0')}` : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[5000] bg-[#0a0a0a] text-[#e5e0d5] overflow-y-auto overflow-x-hidden no-scrollbar font-['Inter','Noto_Sans_KR',sans-serif]"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        onClick={onClose}
        onMouseEnter={() => setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant('default')}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-[5010] flex items-center gap-3 px-4 md:px-6 py-2 rounded-full border border-[#e5e0d5]/15 bg-black/40 backdrop-blur-md text-[#e5e0d5]/80 hover:bg-[#e5e0d5] hover:text-[#0f0f0f] transition-all duration-300 cursor-pointer"
      >
        <span className="font-['Noto_Sans_KR'] text-[10px] tracking-widest hidden md:inline" style={{ fontWeight: 400 }}>
          닫기
        </span>
        <X size={16} />
      </motion.button>

      {/* =============================== */}
      {/* SECTION 1 — HERO COVER          */}
      {/* =============================== */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">
        {/* Subtle accent glow behind hero */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
          style={{ backgroundColor: s.accentColor }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e5e0d5]/[0.02] via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex flex-col items-center text-center px-8"
        >
          {/* Badge */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-mono text-[#e5e0d5]/30 tracking-[0.4em] uppercase">
              Character Overview
            </span>
          </div>

          {/* Character image — hero */}
          <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[530px] mb-10 overflow-hidden">
            <motion.img
              {...(!isNavigating ? { layoutId: `image-${project.id}` } : {})}
              src={getProjectThumbnail(project)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          {/* Accent line */}
          <div className="w-12 h-[2px] mb-6" style={{ backgroundColor: s.accentColor }} />

          {/* Title — per-project typography */}
          <h1
            className={s.titleItalic ? 'italic' : ''}
            style={{
              fontFamily: s.titleFont,
              fontWeight: s.titleWeight,
              letterSpacing: s.titleLetterSpacing,
              textTransform: s.titleUppercase ? 'uppercase' : 'none',
              fontSize: s.titleSize,
              lineHeight: 0.92,
            }}
          >
            {project.title}
          </h1>
          <p
            className="font-['Noto_Serif_KR'] text-[#e5e0d5]/40 mt-4 tracking-wider"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 200 }}
          >
            {cd.nameKr}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-8 text-[10px] text-[#e5e0d5]/25 tracking-[0.3em]">
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${s.accentColor}55` }} />
            <span>{project.client}</span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${s.accentColor}55` }} />
            <span className="font-['Noto_Sans_KR']">Designed by {cd.designer}</span>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="font-['Noto_Sans_KR'] text-[9px] text-[#e5e0d5]/20 tracking-[0.5em]" style={{ fontWeight: 300 }}>
              아래로 스크롤
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-[1px] h-8"
              style={{ background: `linear-gradient(to bottom, ${s.accentColor}44, transparent)` }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* =============================== */}
      {/* SECTION 2 — CHARACTER STORY      */}
      {/* =============================== */}
      <section className="w-full bg-[#0d0d0d] px-8 lg:px-24 py-24 md:py-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-[1200px] mx-auto"
        >
          <p
            className="font-['Noto_Serif_KR'] text-[#e5e0d5]/50 tracking-wider mb-16 text-center"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', lineHeight: 1.7, fontWeight: 300 }}
          >
            "{cd.concept}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-6 uppercase" style={{ fontWeight: 400 }}>
                캐릭터 스토리
              </h4>
              <p
                className="font-['Noto_Sans_KR'] text-[#e5e0d5]/60"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', lineHeight: 2, fontWeight: 300 }}
              >
                {cd.story}
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-3 uppercase" style={{ fontWeight: 400 }}>
                  서체
                </h4>
                <p className="text-sm text-[#e5e0d5]/50" style={{ fontWeight: 300 }}>{project.fonts}</p>
              </div>
              <div>
                <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-3 uppercase" style={{ fontWeight: 400 }}>
                  제작 도구
                </h4>
                <p className="text-sm text-[#e5e0d5]/50" style={{ fontWeight: 300 }}>{cd.tools}</p>
              </div>
              <div>
                <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-3 uppercase" style={{ fontWeight: 400 }}>
                  카테고리
                </h4>
                <p className="font-['Noto_Sans_KR'] text-sm text-[#e5e0d5]/50" style={{ fontWeight: 300 }}>
                  {project.categoryLabel} · {project.client}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =============================== */}
      {/* SECTION 3 — TURNAROUND           */}
      {/* =============================== */}
      {hasTurnaround && (
        <section className="w-full bg-[#0a0a0a] px-8 lg:px-24 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader titleEn="Turnaround & Proportions" titleKr="턴어라운드 & 프로포션" icon={Layers} number={turnSec} accentColor={s.accentColor} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {cd.turnaroundImages.map((img, idx) => (
                <motion.div
                  key={`turn-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className="relative bg-[#141414] overflow-hidden group"
                  style={{ border: `1px solid ${s.accentColor}10` }}
                >
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ backgroundColor: `${s.accentColor}08` }} />
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px]" style={{ backgroundColor: `${s.accentColor}08` }} />
                  </div>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={img}
                      alt={cd.turnaroundLabels[idx]}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="font-['Noto_Sans_KR'] text-[10px] text-[#e5e0d5]/40 tracking-wider" style={{ fontWeight: 300 }}>
                      {cd.turnaroundLabels[idx]}
                    </span>
                    <span className="text-[8px] font-mono text-[#e5e0d5]/15">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =============================== */}
      {/* SECTION 4 — DESIGN BREAKDOWN     */}
      {/* =============================== */}
      {hasBreakdown && (
        <section className="w-full bg-[#111111] px-8 lg:px-24 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader titleEn="Character Breakdown" titleKr="캐릭터 분석" icon={Palette} number={breakSec} accentColor={s.accentColor} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Color Palette */}
              {cd.colorPalette.length > 0 && (
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-8 uppercase" style={{ fontWeight: 400 }}>
                    컬러 팔레트
                  </h4>
                  <div className="flex flex-col gap-4">
                    {cd.colorPalette.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-5 group">
                        <div
                          className="w-14 h-14 rounded-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: color.hex, border: `1px solid ${s.accentColor}18` }}
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3">
                            <span className="text-sm text-[#e5e0d5]/70" style={{ fontWeight: 400 }}>{color.name}</span>
                            <span className="font-['Noto_Sans_KR'] text-[10px] text-[#e5e0d5]/30" style={{ fontWeight: 300 }}>
                              {color.nameKr}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#e5e0d5]/20 mt-0.5 block">{color.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Design Features */}
              {cd.designFeatures.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-8 uppercase" style={{ fontWeight: 400 }}>
                    디자인 특징
                  </h4>
                  <div className="flex flex-col gap-0">
                    {cd.designFeatures.map((feature, idx) => (
                      <div key={idx} className="py-6 first:pt-0 group" style={{ borderBottom: `1px solid ${s.accentColor}10` }}>
                        <div className="flex items-start gap-4">
                          <span className="text-[10px] font-mono mt-1 flex-shrink-0" style={{ color: `${s.accentColor}55` }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <div className="flex items-baseline gap-3 mb-2">
                              <span className="font-['Noto_Sans_KR'] text-[#e5e0d5]/80" style={{ fontWeight: 400 }}>
                                {feature.label}
                              </span>
                              <span className="text-[10px] text-[#e5e0d5]/20 tracking-wide">{feature.labelEn}</span>
                            </div>
                            <p className="font-['Noto_Sans_KR'] text-sm text-[#e5e0d5]/35" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =============================== */}
      {/* SECTION 5 — POSE & EXPRESSION    */}
      {/* =============================== */}
      {hasPose && (
        <section className="w-full bg-[#0a0a0a] px-8 lg:px-24 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader titleEn="Expression & Pose" titleKr="표정 & 포즈" icon={Sparkles} number={poseSec} accentColor={s.accentColor} />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {cd.poseImages.map((img, idx) => (
                <motion.div
                  key={`pose-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-[#141414] overflow-hidden group"
                  style={{ border: `1px solid ${s.accentColor}10` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img}
                      alt={cd.poseLabels[idx]}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-['Noto_Sans_KR'] text-[11px] text-[#e5e0d5]/80 tracking-wider" style={{ fontWeight: 300 }}>
                      {cd.poseLabels[idx]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-[8px] font-mono text-[#e5e0d5]/30">
                    POSE_{String(idx + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =============================== */}
      {/* SECTION 6 — USAGE EXAMPLES       */}
      {/* =============================== */}
      {hasUsage && (
        <section className="w-full bg-[#111111] px-8 lg:px-24 py-24 md:py-32">
          <div className="max-w-[1400px] mx-auto">
            <SectionHeader titleEn="Usage Examples" titleKr="활용 사례" icon={Package} number={usageSec} accentColor={s.accentColor} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {cd.usageImages.map((img, idx) => (
                <motion.div
                  key={`usage-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="relative bg-[#141414] overflow-hidden group"
                  style={{ border: `1px solid ${s.accentColor}10` }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={img}
                      alt={cd.usageLabels[idx]}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center" style={{ borderTop: `1px solid ${s.accentColor}10` }}>
                    <span className="font-['Noto_Sans_KR'] text-[11px] text-[#e5e0d5]/50 tracking-wider" style={{ fontWeight: 300 }}>
                      {cd.usageLabels[idx]}
                    </span>
                    <span className="text-[8px] font-mono text-[#e5e0d5]/15 tracking-widest uppercase">Mockup</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =============================== */}
      {/* SECTION 7 — PROCESS NOTE         */}
      {/* =============================== */}
      <section className="w-full bg-[#0a0a0a] px-8 lg:px-24 py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-20" style={{ borderTop: `1px solid ${s.accentColor}18` }}>
            <div>
              <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-6 uppercase" style={{ fontWeight: 400 }}>
                제작 과정
              </h4>
              <p className="font-['Noto_Sans_KR'] text-[#e5e0d5]/50" style={{ lineHeight: 1.9, fontWeight: 300 }}>
                {project.process}
              </p>
            </div>
            <div className="p-10 rounded-sm" style={{ backgroundColor: `${s.accentColor}06`, border: `1px solid ${s.accentColor}10` }}>
              <h4 className="font-['Noto_Sans_KR'] text-[10px] tracking-[0.3em] text-[#e5e0d5]/30 mb-8 uppercase" style={{ fontWeight: 400 }}>
                프로젝트 요약
              </h4>
              <ul className="font-['Noto_Sans_KR'] space-y-4 text-xs text-[#e5e0d5]/40" style={{ fontWeight: 300 }}>
                <li className="flex justify-between pb-3" style={{ borderBottom: `1px solid ${s.accentColor}10` }}>
                  <span>캐릭터명</span>
                  <span className="text-[#e5e0d5]/60">{project.title} · {cd.nameKr}</span>
                </li>
                <li className="flex justify-between pb-3" style={{ borderBottom: `1px solid ${s.accentColor}10` }}>
                  <span>컬러 수</span>
                  <span className="text-[#e5e0d5]/60">{cd.colorPalette.length}색 팔레트</span>
                </li>
                <li className="flex justify-between pb-3" style={{ borderBottom: `1px solid ${s.accentColor}10` }}>
                  <span>턴어라운드</span>
                  <span className="text-[#e5e0d5]/60">{cd.turnaroundImages.length}뷰</span>
                </li>
                <li className="flex justify-between pb-3" style={{ borderBottom: `1px solid ${s.accentColor}10` }}>
                  <span>포즈 시트</span>
                  <span className="text-[#e5e0d5]/60">{cd.poseImages.length}포즈</span>
                </li>
                <li className="flex justify-between">
                  <span>제작 도구</span>
                  <span className="text-[#e5e0d5]/60">{cd.tools}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
        onNavigate={onNavigate}
        onClose={onClose}
        currentIndex={currentIndex}
        totalCount={totalCount}
        accentColor={s.accentColor}
      />
    </motion.div>
  );
};
