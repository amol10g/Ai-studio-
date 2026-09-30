/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { MemeCanvas } from './components/MemeCanvas';
import { ControlPanel } from './components/ControlPanel';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { ExportModal } from './components/ExportModal';
import { CanvasSettings, TextLayer, StickerLayer, MemeTemplate } from './types';
import { MEME_TEMPLATES } from './constants/templates';
import { StickerItem } from './constants/stickers';

const DEFAULT_SETTINGS: CanvasSettings = {
  aspectRatio: '1:1',
  layoutMode: 'overlay',
  canvasBgColor: '#000000',
  canvasBgType: 'solid',
  gradientAngle: 45,
  gradientColors: ['#3b82f6', '#8b5cf6'],
  patternName: 'none',
  cardBgColor: '#ffffff',
  cardTextColor: '#000000',
  cardHeightRatio: 0.22,
  cardFontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  framePadding: 0,
  frameBorderColor: '#ffffff',
  frameBorderWidth: 0,
  frameRadius: 0,
  demotivationalTitle: 'PERSISTENCE',
  demotivationalSubtitle: 'Doing the same mistake over and over expecting different results.',
  filter: 'none',
  brightness: 100,
  contrast: 100,
  saturation: 100,
  flipH: false,
  flipV: false,
  zoom: 1,
  watermarkText: '@memeforge',
  showWatermark: false,
  watermarkOpacity: 0.6,
};

const INITIAL_TEXT_LAYERS: TextLayer[] = [
  {
    id: 'top-text',
    text: 'WRITING 500 LINES OF CODE',
    x: 50,
    y: 10,
    fontSize: 54,
    fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
    textColor: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: 6,
    hasStroke: true,
    hasShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowBlur: 4,
    isUppercase: true,
    isBold: false,
    isItalic: false,
    textAlign: 'center',
    hasBg: false,
    bgPadding: 12,
    bgRadius: 6,
    rotation: 0,
    maxWidth: 92,
    lineHeight: 1.15,
  },
  {
    id: 'bottom-text',
    text: 'USING A 3-LINE NPM PACKAGE',
    x: 50,
    y: 90,
    fontSize: 54,
    fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
    textColor: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: 6,
    hasStroke: true,
    hasShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowBlur: 4,
    isUppercase: true,
    isBold: false,
    isItalic: false,
    textAlign: 'center',
    hasBg: false,
    bgPadding: 12,
    bgRadius: 6,
    rotation: 0,
    maxWidth: 92,
    lineHeight: 1.15,
  },
];

interface HistoryState {
  settings: CanvasSettings;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  templateId: string;
}

export default function App() {
  const [settings, setSettings] = useState<CanvasSettings>(DEFAULT_SETTINGS);
  const [textLayers, setTextLayers] = useState<TextLayer[]>(INITIAL_TEXT_LAYERS);
  const [stickerLayers, setStickerLayers] = useState<StickerLayer[]>([]);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('drake-hotline');
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>('top-text');

  // History stack for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Modals state
  const [isTemplatePickerOpen, setIsTemplatePickerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load initial template image
  useEffect(() => {
    const initialTemplate = MEME_TEMPLATES[0];
    if (initialTemplate) {
      const img = new Image();
      img.src = initialTemplate.svgDataUri;
      img.onload = () => {
        setCurrentImage(img);
      };
    }
  }, []);

  // Push state to history
  const pushHistory = useCallback(
    (newSettings: CanvasSettings, newText: TextLayer[], newStickers: StickerLayer[], templateId: string) => {
      setHistory((prev) => {
        const sliced = prev.slice(0, historyIndex + 1);
        return [
          ...sliced,
          {
            settings: { ...newSettings },
            textLayers: newText.map((t) => ({ ...t })),
            stickerLayers: newStickers.map((s) => ({ ...s })),
            templateId,
          },
        ];
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  // Record initial history state once on mount
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          settings: { ...DEFAULT_SETTINGS },
          textLayers: INITIAL_TEXT_LAYERS.map((t) => ({ ...t })),
          stickerLayers: [],
          templateId: 'drake-hotline',
        },
      ]);
      setHistoryIndex(0);
    }
  }, [history.length]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetState = history[historyIndex - 1];
      setSettings(targetState.settings);
      setTextLayers(targetState.textLayers);
      setStickerLayers(targetState.stickerLayers);
      setActiveTemplateId(targetState.templateId);
      setHistoryIndex(historyIndex - 1);
      setSelectedLayerId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetState = history[historyIndex + 1];
      setSettings(targetState.settings);
      setTextLayers(targetState.textLayers);
      setStickerLayers(targetState.stickerLayers);
      setActiveTemplateId(targetState.templateId);
      setHistoryIndex(historyIndex + 1);
      setSelectedLayerId(null);
    }
  };

  // Keyboard undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleUpdateSettings = (updates: Partial<CanvasSettings>) => {
    const nextSettings = { ...settings, ...updates };
    setSettings(nextSettings);
  };

  const handleAddTextLayer = (customText = 'SAMPLE TEXT', yPos = 50) => {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      text: customText,
      x: 50,
      y: yPos,
      fontSize: 48,
      fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
      textColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 5,
      hasStroke: true,
      hasShadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.8)',
      shadowBlur: 4,
      isUppercase: true,
      isBold: false,
      isItalic: false,
      textAlign: 'center',
      hasBg: false,
      bgPadding: 10,
      bgRadius: 6,
      rotation: 0,
      maxWidth: 90,
      lineHeight: 1.15,
    };
    const nextLayers = [...textLayers, newLayer];
    setTextLayers(nextLayers);
    setSelectedLayerId(newLayer.id);
    pushHistory(settings, nextLayers, stickerLayers, activeTemplateId);
  };

  const handleUpdateTextLayer = (id: string, updates: Partial<TextLayer>) => {
    const nextLayers = textLayers.map((l) => (l.id === id ? { ...l, ...updates } : l));
    setTextLayers(nextLayers);
  };

  const handleUpdateStickerLayer = (id: string, updates: Partial<StickerLayer>) => {
    const nextStickers = stickerLayers.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStickerLayers(nextStickers);
  };

  const handleDeleteLayer = (id: string) => {
    const nextText = textLayers.filter((l) => l.id !== id);
    const nextStickers = stickerLayers.filter((s) => s.id !== id);
    setTextLayers(nextText);
    setStickerLayers(nextStickers);
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
    pushHistory(settings, nextText, nextStickers, activeTemplateId);
  };

  const handleAddSticker = (item: StickerItem) => {
    const newSticker: StickerLayer = {
      id: `sticker-${Date.now()}`,
      type: item.type,
      content: item.content,
      x: 50,
      y: 50,
      size: item.type === 'emoji' ? 64 : 80,
      rotation: 0,
    };
    const nextStickers = [...stickerLayers, newSticker];
    setStickerLayers(nextStickers);
    setSelectedLayerId(newSticker.id);
    pushHistory(settings, textLayers, nextStickers, activeTemplateId);
  };

  const handleSelectTemplate = (template: MemeTemplate) => {
    setActiveTemplateId(template.id);
    const img = new Image();
    img.src = template.svgDataUri;
    img.onload = () => {
      setCurrentImage(img);
    };

    // Update settings and default texts
    const nextSettings: CanvasSettings = {
      ...settings,
      aspectRatio: template.suggestedAspect || '1:1',
      layoutMode: template.defaultLayout || 'overlay',
    };
    setSettings(nextSettings);

    const nextLayers: TextLayer[] = [
      {
        id: 'top-text',
        text: template.defaultTopText || '',
        x: 50,
        y: template.defaultLayout === 'top-card' ? 12 : 10,
        fontSize: 52,
        fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
        textColor: template.defaultLayout === 'top-card' ? '#000000' : '#ffffff',
        strokeColor: '#000000',
        strokeWidth: template.defaultLayout === 'top-card' ? 0 : 6,
        hasStroke: template.defaultLayout !== 'top-card',
        hasShadow: template.defaultLayout !== 'top-card',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowBlur: 4,
        isUppercase: template.defaultLayout !== 'top-card',
        isBold: false,
        isItalic: false,
        textAlign: 'center',
        hasBg: false,
        bgPadding: 10,
        bgRadius: 6,
        rotation: 0,
        maxWidth: 90,
        lineHeight: 1.15,
      },
      {
        id: 'bottom-text',
        text: template.defaultBottomText || '',
        x: 50,
        y: 90,
        fontSize: 52,
        fontFamily: "'Anton', Impact, 'Arial Black', sans-serif",
        textColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 6,
        hasStroke: true,
        hasShadow: true,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowBlur: 4,
        isUppercase: true,
        isBold: false,
        isItalic: false,
        textAlign: 'center',
        hasBg: false,
        bgPadding: 10,
        bgRadius: 6,
        rotation: 0,
        maxWidth: 90,
        lineHeight: 1.15,
      },
    ];

    setTextLayers(nextLayers);
    pushHistory(nextSettings, nextLayers, stickerLayers, template.id);
  };

  const handleLoadImageFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setCurrentImage(img);
        setActiveTemplateId('custom-upload');
      };
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLoadImageFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setTextLayers(INITIAL_TEXT_LAYERS);
    setStickerLayers([]);
    setSelectedLayerId('top-text');
    const template = MEME_TEMPLATES[0];
    if (template) {
      handleSelectTemplate(template);
    }
  };

  // 1-Click Fast Copy to Clipboard
  const handleCopyClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy to clipboard:', err);
          // If direct clipboard write fails, open the export modal
          setIsExportModalOpen(true);
        }
      }, 'image/png');
    } catch {
      setIsExportModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans-clean">
      {/* Top Navigation */}
      <Header
        onCopyClipboard={handleCopyClipboard}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenTemplatePicker={() => setIsTemplatePickerOpen(true)}
        onReset={handleReset}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        isCopied={isCopied}
      />

      {/* Main Workspace: Canvas Stage + Right Control Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <MemeCanvas
          image={currentImage}
          settings={settings}
          textLayers={textLayers}
          stickerLayers={stickerLayers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateTextLayer={handleUpdateTextLayer}
          onUpdateStickerLayer={handleUpdateStickerLayer}
          onDeleteLayer={handleDeleteLayer}
          onLoadImageFile={handleLoadImageFile}
          canvasRef={canvasRef}
        />

        <ControlPanel
          settings={settings}
          textLayers={textLayers}
          stickerLayers={stickerLayers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateSettings={handleUpdateSettings}
          onAddTextLayer={handleAddTextLayer}
          onUpdateTextLayer={handleUpdateTextLayer}
          onDeleteLayer={handleDeleteLayer}
          onAddSticker={handleAddSticker}
          onFileUpload={handleFileUpload}
          onOpenTemplatePicker={() => setIsTemplatePickerOpen(true)}
        />
      </div>

      {/* Template Picker Modal */}
      <TemplatePickerModal
        isOpen={isTemplatePickerOpen}
        onClose={() => setIsTemplatePickerOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        activeTemplateId={activeTemplateId}
      />

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        image={currentImage}
        settings={settings}
        textLayers={textLayers}
        stickerLayers={stickerLayers}
      />
    </div>
  );
}
