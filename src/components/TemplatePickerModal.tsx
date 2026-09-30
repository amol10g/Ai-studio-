import React, { useState } from 'react';
import { Search, X, Check, Sparkles } from 'lucide-react';
import { MEME_TEMPLATES } from '../constants/templates';
import { MemeTemplate } from '../types';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MemeTemplate) => void;
  activeTemplateId?: string;
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  activeTemplateId,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'classic' | 'two-panel' | 'reaction' | 'modern'>('all');

  if (!isOpen) return null;

  const filtered = MEME_TEMPLATES.filter((t) => {
    const matchesCategory = category === 'all' || t.category === category;
    const matchesSearch =
      search === '' ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Meme Template Library
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an iconic template or reaction format to jumpstart your meme
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates (e.g. drake, doge)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Formats' },
              { id: 'classic', label: 'Classic' },
              { id: 'two-panel', label: 'Two-Panel' },
              { id: 'reaction', label: 'Reaction' },
              { id: 'modern', label: 'Modern' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  category === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((t) => {
            const isSelected = activeTemplateId === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  onSelectTemplate(t);
                  onClose();
                }}
                className={`group relative flex flex-col rounded-xl overflow-hidden border cursor-pointer transition-all duration-150 hover:-translate-y-1 ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 bg-slate-800/80 shadow-lg'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* SVG Thumbnail Container */}
                <div className="aspect-square w-full bg-slate-950/80 overflow-hidden flex items-center justify-center p-2 relative">
                  <img
                    src={t.svgDataUri}
                    alt={t.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {t.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="capitalize">{t.category}</span>
                    <span>{t.suggestedAspect}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 text-sm">
              No meme templates found matching "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
