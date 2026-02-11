import React, { useContext } from 'react';
import { motion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import type { Project } from './projectData';
import { getProjectThumbnail } from './videoUtils';
import { CursorContext } from './CursorContext';

interface ProjectGridProps {
  projects: Project[];
  onSelect: (id: number) => void;
  onClose: () => void;
  activeCategoryLabel: string;
}

export const ProjectGrid = ({ projects, onSelect, onClose, activeCategoryLabel }: ProjectGridProps) => {
  const { setCursorVariant } = useContext(CursorContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[4000] bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#e5e0d5]/10">
        <div className="flex items-center gap-4">
          <span className="font-['Playfair_Display'] italic text-2xl text-[#e5e0d5]">Index</span>
          <div className="h-4 w-[1px] bg-[#e5e0d5]/20" />
          <span className="font-['Noto_Sans_KR'] text-xs text-[#e5e0d5]/40 tracking-widest uppercase">
            {activeCategoryLabel} — {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <button
          onClick={onClose}
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
          className="flex items-center gap-2 text-[#e5e0d5]/40 hover:text-[#e5e0d5] transition-colors"
        >
          <span className="text-[10px] font-['Noto_Sans_KR'] tracking-widest hidden md:block">CLOSE</span>
          <X size={20} />
        </button>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              onClick={() => onSelect(project.id)}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              className="group cursor-pointer flex flex-col gap-4"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden rounded-sm bg-[#1a1a1a]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={getProjectThumbnail(project)}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Overlay details on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-12 h-12 rounded-full bg-[#e5e0d5]/10 backdrop-blur-md flex items-center justify-center text-[#e5e0d5]">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline border-b border-[#e5e0d5]/10 pb-2 group-hover:border-[#e5e0d5]/30 transition-colors">
                  <span className="text-[10px] font-mono text-[#e5e0d5]/30">
                    {String(project.id).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono text-[#e5e0d5]/30">
                    {project.year}
                  </span>
                </div>
                <div className="flex justify-between items-start mt-1">
                  <h4 className="font-['Inter'] text-lg text-[#e5e0d5]/80 group-hover:text-[#e5e0d5] transition-colors leading-tight">
                    {project.title}
                  </h4>
                  <span className="text-[10px] font-['Noto_Sans_KR'] text-[#e5e0d5]/40 mt-1">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
