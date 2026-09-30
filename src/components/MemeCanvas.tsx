import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CanvasSettings, TextLayer, StickerLayer } from '../types';
import { renderMemeCanvas } from '../utils/canvasRenderer';
import { ZoomIn, ZoomOut, Maximize2, Upload, AlertCircle, Move } from 'lucide-react';

interface MemeCanvasProps {
  image: HTMLImageElement | null;
  settings: CanvasSettings;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  onUpdateStickerLayer: (id: string, updates: Partial<StickerLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onLoadImageFile: (file: File) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const MemeCanvas: React.FC<MemeCanvasProps> = ({
  image,
  settings,
  textLayers,
  stickerLayers,
  selectedLayerId,
  onSelectLayer,
  onUpdateTextLayer,
  onUpdateStickerLayer,
  onDeleteLayer,
  onLoadImageFile,
  canvasRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragInitialLayerPos, setDragInitialLayerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Redraw canvas whenever layers, settings, or selected ID changes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderMemeCanvas({
      canvas,
      image,
      settings,
      textLayers,
      stickerLayers,
      exportScale: 1,
      selectedLayerId,
      isExporting: false,
    });
  }, [canvasRef, image, settings, textLayers, stickerLayers, selectedLayerId]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Window resize listener to keep canvas responsive
  useEffect(() => {
    const handleResize = () => redraw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redraw]);

  // Global paste handler for images from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            onLoadImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onLoadImageFile]);

  // Keyboard navigation / deletion of selected layer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (!selectedLayerId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDeleteLayer(selectedLayerId);
        onSelectLayer(null);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 4 : 1;
        const textLayer = textLayers.find((l) => l.id === selectedLayerId);
        if (textLayer) {
          let newX = textLayer.x;
          let newY = textLayer.y;
          if (e.key === 'ArrowUp') newY = Math.max(0, newY - step);
          if (e.key === 'ArrowDown') newY = Math.min(100, newY + step);
          if (e.key === 'ArrowLeft') newX = Math.max(0, newX - step);
          if (e.key === 'ArrowRight') newX = Math.min(100, newX + step);
          onUpdateTextLayer(selectedLayerId, { x: newX, y: newY });
        } else {
          const sticker = stickerLayers.find((s) => s.id === selectedLayerId);
          if (sticker) {
            let newX = sticker.x;
            let newY = sticker.y;
            if (e.key === 'ArrowUp') newY = Math.max(0, newY - step);
            if (e.key === 'ArrowDown') newY = Math.min(100, newY + step);
            if (e.key === 'ArrowLeft') newX = Math.max(0, newX - step);
            if (e.key === 'ArrowRight') newX = Math.min(100, newX + step);
            onUpdateStickerLayer(selectedLayerId, { x: newX, y: newY });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLayerId, textLayers, stickerLayers, onDeleteLayer, onSelectLayer, onUpdateTextLayer, onUpdateStickerLayer]);

  // Convert mouse/touch event coordinates into canvas percentage (0 - 100)
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 50, y: 50 };
    const rect = canvas.getBoundingClientRect();
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.min(100, Math.max(0, xPct)),
      y: Math.min(100, Math.max(0, yPct)),
    };
  };

  // Find topmost layer under pointer
  const hitTest = (pctX: number, pctY: number): string | null => {
    // Check stickers first (often smaller, on top)
    for (let i = stickerLayers.length - 1; i >= 0; i--) {
      const s = stickerLayers[i];
      const dist = Math.hypot(s.x - pctX, s.y - pctY);
      if (dist < 8) return s.id;
    }

    // Check text layers
    for (let i = textLayers.length - 1; i >= 0; i--) {
      const l = textLayers[i];
      // Approximate vertical and horizontal bounds in percentage
      const verticalSpan = Math.max(4, (l.fontSize / 1000) * 100);
      const horizontalSpan = Math.max(20, (l.maxWidth / 2));
      if (Math.abs(l.y - pctY) <= verticalSpan && Math.abs(l.x - pctX) <= horizontalSpan) {
        return l.id;
      }
    }

    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    const hitId = hitTest(x, y);

    if (hitId) {
      onSelectLayer(hitId);
      setIsDragging(true);
      setDragStartPos({ x, y });

      const textLayer = textLayers.find((l) => l.id === hitId);
      if (textLayer) {
        setDragInitialLayerPos({ x: textLayer.x, y: textLayer.y });
      } else {
        const sticker = stickerLayers.find((s) => s.id === hitId);
        if (sticker) {
          setDragInitialLayerPos({ x: sticker.x, y: sticker.y });
        }
      }
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } else {
      onSelectLayer(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedLayerId) return;

    const { x, y } = getCanvasCoords(e.clientX, e.clientY);
    const deltaX = x - dragStartPos.x;
    const deltaY = y - dragStartPos.y;

    const targetX = Math.round(Math.min(100, Math.max(0, dragInitialLayerPos.x + deltaX)));
    const targetY = Math.round(Math.min(100, Math.max(0, dragInitialLayerPos.y + deltaY)));

    const isText = textLayers.some((l) => l.id === selectedLayerId);
    if (isText) {
      onUpdateTextLayer(selectedLayerId, { x: targetX, y: targetY });
    } else {
      onUpdateStickerLayer(selectedLayerId, { x: targetX, y: targetY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if capture was already released
    }
  };

  // Drag and drop image files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onLoadImageFile(file);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative flex-1 h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950 overflow-hidden select-none"
    >
      {/* Canvas Canvas Container with Checkerboard / Neutral Backdrop */}
      <div className="relative max-h-full max-w-full flex items-center justify-center">
        {/* Subtle drop shadow and border around the meme */}
        <div
          className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-150 ${
            isDragOver ? 'ring-4 ring-amber-400 scale-[1.01]' : 'ring-1 ring-slate-800'
          }`}
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: 'center center',
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="block max-h-[70vh] sm:max-h-[75vh] w-auto h-auto cursor-crosshair touch-none"
          />

          {/* Drag over overlay hint */}
          {isDragOver && (
            <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-xs border-2 border-dashed border-amber-400 flex flex-col items-center justify-center text-amber-200 font-bold gap-2">
              <Upload className="w-10 h-10 animate-bounce" />
              <span>Drop image to use as meme template</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Canvas Controls Overlay */}
      <div className="absolute bottom-4 left-6 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg text-xs text-slate-300">
        <button
          onClick={() => setZoomScale((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
          className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono px-1 tabular-nums font-semibold text-slate-400">
          {Math.round(zoomScale * 100)}%
        </span>
        <button
          onClick={() => setZoomScale((z) => Math.min(1.8, Number((z + 0.1).toFixed(1))))}
          className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="h-3 w-px bg-slate-800 mx-1" />
        <button
          onClick={() => setZoomScale(1)}
          className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
          title="Reset Zoom (100%)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Helpful Subtle Hint Bar */}
      <div className="absolute top-4 left-6 hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-xs">
        <Move className="w-3 h-3 text-amber-400" />
        <span>Click & drag text directly on canvas · Press <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono text-[10px]">Ctrl+V</kbd> to paste any image</span>
      </div>
    </div>
  );
};
