import React from 'react';
import { Download, Copy, Check, RotateCcw, Undo2, Redo2, Sparkles, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  onCopyClipboard: () => void;
  onOpenExportModal: () => void;
  onOpenTemplatePicker: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onCopyClipboard,
  onOpenExportModal,
  onOpenTemplatePicker,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isCopied,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 group text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-impact text-slate-950 font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-impact tracking-wide text-xl text-white group-hover:text-amber-400 transition-colors">
            MEME<span className="text-amber-400">FORGE</span>
          </span>
        </a>
      </div>

      {/* Zone 2: Quick Tools & History */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenTemplatePicker}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all hover:border-slate-600"
          title="Browse meme templates"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded-lg border transition-colors ${
              canUndo
                ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded-lg border transition-colors ${
              canRedo
                ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onReset}
          className="p-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-900/50 transition-colors"
          title="Reset Canvas"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onCopyClipboard}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all active:scale-95"
          title="Copy image directly to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-sm transition-all hover:shadow-amber-500/20 active:scale-95"
          title="Download PNG or JPG"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
