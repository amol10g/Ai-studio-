import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Copy, Check, Sparkles, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { CanvasSettings, TextLayer, StickerLayer } from '../types';
import { renderMemeCanvas } from '../utils/canvasRenderer';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: HTMLImageElement | null;
  settings: CanvasSettings;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  image,
  settings,
  textLayers,
  stickerLayers,
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [exportScale, setExportScale] = useState<1 | 2>(1);
  const [fileName, setFileName] = useState('epic-meme');
  const [isCopied, setIsCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render high-res image into preview whenever modal opens or settings change
  useEffect(() => {
    if (!isOpen) return;

    const canvas = document.createElement('canvas');
    renderMemeCanvas({
      canvas,
      image,
      settings,
      textLayers,
      stickerLayers,
      exportScale,
      isExporting: true,
    });

    const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpeg' ? 0.92 : undefined;
    const url = canvas.toDataURL(mime, quality);
    setPreviewDataUrl(url);
    exportCanvasRef.current = canvas;
  }, [isOpen, image, settings, textLayers, stickerLayers, exportScale, format]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!exportCanvasRef.current) return;
    setIsExporting(true);

    const canvas = exportCanvasRef.current;
    const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = format === 'jpeg' ? 'jpg' : 'png';

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setIsExporting(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName.trim() || 'meme'}.${ext}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
      },
      mime,
      format === 'jpeg' ? 0.92 : undefined
    );
  };

  const handleCopyToClipboard = async () => {
    if (!exportCanvasRef.current) return;
    try {
      const canvas = exportCanvasRef.current;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        } catch (err) {
          console.error('Clipboard copy failed:', err);
        }
      }, 'image/png');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Export & Share Meme
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              High resolution render with crisp typography and clean anti-aliasing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: Live Export Preview Image */}
          <div className="flex flex-col items-center justify-center bg-slate-950/80 rounded-xl p-3 border border-slate-800/80">
            {previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Meme Export Preview"
                className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-xl"
              />
            ) : (
              <div className="py-20 text-xs text-slate-500">Generating render...</div>
            )}
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              Render scale: {exportScale}x ({exportScale === 2 ? '~2000px Ultra HD' : '~1000px Standard'})
            </div>
          </div>

          {/* Right: Export Controllables */}
          <div className="space-y-4">
            {/* File Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                File Name
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-l-lg text-white font-medium focus:outline-hidden focus:border-amber-400"
                />
                <span className="px-3 py-2 text-xs bg-slate-800 border-y border-r border-slate-700 rounded-r-lg text-slate-400 font-mono">
                  .{format === 'jpeg' ? 'jpg' : 'png'}
                </span>
              </div>
            </div>

            {/* Format Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Image Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat('png')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    format === 'png'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">PNG (Lossless)</div>
                  <div className="text-[10px] text-slate-500">Sharpest text & vector clarity</div>
                </button>

                <button
                  onClick={() => setFormat('jpeg')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    format === 'jpeg'
                      ? 'border-amber-400 bg-amber-400/10 text-white'
                      : 'border-slate-950 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">JPG (Compressed)</div>
                  <div className="text-[10px] text-slate-500">Compact size for web posting</div>
                </button>
              </div>
            </div>

            {/* Resolution Multiplier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Resolution & Clarity
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportScale(1)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                    exportScale === 1
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  1x Standard (1000px)
                </button>
                <button
                  onClick={() => setExportScale(2)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                    exportScale === 2
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  2x Ultra HD (2000px)
                </button>
              </div>
            </div>

            {/* Action Buttons: Copy to Clipboard & Download */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleCopyToClipboard}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Image to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Copy to Clipboard (Paste in Discord/Slack)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download {format.toUpperCase()} Image</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
