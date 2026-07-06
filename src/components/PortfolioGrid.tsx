'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, LayoutGrid, List } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const GOLD_GRAD = 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)';

interface Project {
  id: number;
  title: string;
  type: string;
  area: string;
  duration: string;
  style: string;
  year: string;
  cover: string;
  gallery: string[];
  price?: string;
}

interface PortfolioGridProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  onShowAll: () => void;
}

const ALL_FILTERS = ['Всі', 'Ремонт під ключ', 'Дизайн', 'Будівництво', 'Комерційна'];

function getTypeCategory(type: string): string {
  if (type.includes('Ремонт під ключ') || type.includes('Ремонт')) return 'Ремонт під ключ';
  if (type.includes('Дизайн') || type.includes('Дизайн +')) return 'Дизайн';
  if (type.includes('Будівництво')) return 'Будівництво';
  if (type.includes('Комерційна')) return 'Комерційна';
  return 'Всі';
}

export default function PortfolioGrid({ projects, onSelect, onShowAll }: PortfolioGridProps) {
  const [filter, setFilter] = useState('Всі');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = filter === 'Всі'
    ? projects
    : projects.filter(p => getTypeCategory(p.type) === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {ALL_FILTERS.map(f => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 text-[10px] font-heading font-black uppercase tracking-[0.2em] transition-all duration-300
                ${filter === f
                  ? 'text-[#0e0e0e]'
                  : 'text-white/50 border border-white/[0.1] hover:border-white/30 hover:text-white/80'
                }`}
              style={filter === f ? { background: GOLD_GRAD } : {}}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-[#C9A84C]' : 'text-white/30 hover:text-white/60'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${viewMode === 'list' ? 'text-[#C9A84C]' : 'text-white/30 hover:text-white/60'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] bg-white/[0.04]'
              : 'flex flex-col gap-[3px] bg-white/[0.04]'
          }
        >
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(proj)}
              className={
                viewMode === 'grid'
                  ? 'relative group aspect-[4/3] overflow-hidden bg-[#0e0e0e] cursor-pointer'
                  : 'relative group h-28 overflow-hidden bg-[#0e0e0e] cursor-pointer flex'
              }
            >
              <img
                src={proj.cover}
                alt={proj.title}
                className={
                  viewMode === 'grid'
                    ? 'w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700'
                    : 'w-40 h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 shrink-0'
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent" />
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                <div>
                  <p className="text-[#C9A84C] text-[10px] font-heading font-black uppercase tracking-[0.25em] mb-1">
                    {proj.type}
                  </p>
                  <h3 className="text-white font-heading font-black text-xl uppercase tracking-wide">
                    {proj.title}
                  </h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-white/40 text-xs font-sans">{proj.area}</span>
                    <span className="text-white/40 text-xs font-sans">{proj.year}</span>
                  </div>
                </div>
                {viewMode === 'list' && (
                  <div className="w-10 h-10 bg-[#C9A84C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#0e0e0e]" />
                  </div>
                )}
              </div>
              {/* Hover arrow for grid */}
              {viewMode === 'grid' && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/0 border border-white/0 flex items-center justify-center
                  group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-transparent group-hover:text-[#0e0e0e] transition-colors duration-300" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/30 font-sans text-sm">Немає проєктів у цій категорії</p>
        </div>
      )}

      {/* Show all button */}
      <div className="mt-[3px]">
        <motion.button
          whileHover={{ backgroundColor: 'rgba(201,168,76,0.06)' }}
          onClick={onShowAll}
          className="w-full py-6 border-t border-white/[0.06] text-white/40 hover:text-[#C9A84C] font-heading font-bold uppercase tracking-[0.3em] text-xs transition-colors flex items-center justify-center gap-4"
        >
          <div className="w-12 h-[1px] bg-current" />
          ПОКАЗАТИ ВСІ {filtered.length} ПРОЄКТІВ
          <div className="w-12 h-[1px] bg-current" />
        </motion.button>
      </div>
    </div>
  );
}