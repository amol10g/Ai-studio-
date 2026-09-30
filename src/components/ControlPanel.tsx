import React, { useState } from 'react';
import {
  Type,
  Layout,
  Sliders,
  Smile,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Flame,
  FlipHorizontal,
  FlipVertical,
  Layers,
  ChevronDown,
  Palette,
  Hash,
  Copy
} from 'lucide-react';
import { CanvasSettings, TextLayer, StickerLayer } from '../types';
import {
  COLOR_PALETTE,
  GRADIENT_PRESETS,
  FONT_OPTIONS,
  ASPECT_RATIOS,
  LAYOUT_MODES,
} from '../constants/colors';
import { MEME_STICKERS } from '../constants/stickers';

interface ControlPanelProps {
  settings: CanvasSettings;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateSettings: (updates: Partial<CanvasSettings>) => void;
  onAddTextLayer: (customText?: string, yPos?: number) => void;
  onUpdateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onAddSticker: (item: typeof MEME_STICKERS[0]) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenTemplatePicker: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  textLayers,
  stickerLayers,
  selectedLayerId,
  onSelectLayer,
  onUpdateSettings,
  onAddTextLayer,
  onUpdateTextLayer,
  onDeleteLayer,
  onAddSticker,
  onFileUpload,
  onOpenTemplatePicker,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'layout' | 'image' | 'stickers'>('text');

  const selectedTextLayer = textLayers.find((l) => l.id === selectedLayerId);
  const selectedStickerLayer = stickerLayers.find((s) => s.id === selectedLayerId);

  return (
    <aside className="w-full lg:w-96 border-l border-slate-800 bg-slate-900/95 flex flex-col h-auto lg:h-full shrink-0 z-20 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex items-center border-b border-slate-800 px-3 pt-3 bg-slate-900 shrink-0 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'text'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Captions</span>
        </button>

        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'layout'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Layout & Frame</span>
        </button>

        <button
          onClick={() => setActiveTab('image')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'image'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Image & FX</span>
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'stickers'
              ? 'border-amber-400 text-amber-400 bg-slate-800/80'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>Stickers</span>
        </button>
      </div>

      {/* Main Tab Content with Smooth Scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-200">
        {/* ===================== TAB 1: CAPTIONS & TEXT ===================== */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            {/* Quick Caption Input Rows (Top & Bottom classic meme fast path) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Text Layers ({textLayers.length})
                </span>
                <button
                  onClick={() => onAddTextLayer('NEW CAPTION', 50)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-all"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Text</span>
                </button>
              </div>

              {textLayers.map((layer, idx) => {
                const isSelected = selectedLayerId === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => onSelectLayer(layer.id)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-amber-400/80 bg-slate-800/90 shadow-md ring-1 ring-amber-400/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium text-slate-400">
                        {idx === 0 ? 'Top Caption' : idx === 1 ? 'Bottom Caption' : `Text Layer #${idx + 1}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteLayer(layer.id);
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                          title="Delete text layer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={layer.text}
                      onChange={(e) => onUpdateTextLayer(layer.id, { text: e.target.value })}
                      placeholder="Type your caption..."
                      rows={2}
                      className="w-full px-2.5 py-1.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 resize-none font-medium"
                    />

                    {/* Quick Alignment & Placement Shortcuts */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { y: 12 })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
                        >
                          Top
                        </button>
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { y: 50 })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
                        >
                          Center
                        </button>
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { y: 88 })}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300"
                        >
                          Bottom
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400">
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { textAlign: 'left' })}
                          className={`p-1 rounded ${layer.textAlign === 'left' ? 'text-amber-400 bg-slate-800' : 'hover:text-slate-200'}`}
                          title="Align left"
                        >
                          <AlignLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { textAlign: 'center' })}
                          className={`p-1 rounded ${layer.textAlign === 'center' ? 'text-amber-400 bg-slate-800' : 'hover:text-slate-200'}`}
                          title="Align center"
                        >
                          <AlignCenter className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onUpdateTextLayer(layer.id, { textAlign: 'right' })}
                          className={`p-1 rounded ${layer.textAlign === 'right' ? 'text-amber-400 bg-slate-800' : 'hover:text-slate-200'}`}
                          title="Align right"
                        >
                          <AlignRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Granular Styling Controls for Selected or Active Layer */}
            {selectedTextLayer ? (
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Layer Typography & Stroke
                  </span>
                  <button
                    onClick={() =>
                      onUpdateTextLayer(selectedTextLayer.id, {
                        isUppercase: !selectedTextLayer.isUppercase,
                      })
                    }
                    className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                      selectedTextLayer.isUppercase
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ALL CAPS
                  </button>
                </div>

                {/* Font Selector */}
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Font Family
                  </label>
                  <select
                    value={selectedTextLayer.fontFamily}
                    onChange={(e) =>
                      onUpdateTextLayer(selectedTextLayer.id, { fontFamily: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-hidden focus:border-amber-400"
                  >
                    {FONT_OPTIONS.map((f) => (
                      <option key={f.id} value={f.family}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size & Stroke Width Sliders */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Size</span>
                      <span className="font-mono">{selectedTextLayer.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={120}
                      value={selectedTextLayer.fontSize}
                      onChange={(e) =>
                        onUpdateTextLayer(selectedTextLayer.id, {
                          fontSize: Number(e.target.value),
                        })
                      }
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Outline Stroke</span>
                      <span className="font-mono">{selectedTextLayer.strokeWidth}px</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={14}
                      value={selectedTextLayer.strokeWidth}
                      onChange={(e) =>
                        onUpdateTextLayer(selectedTextLayer.id, {
                          strokeWidth: Number(e.target.value),
                          hasStroke: Number(e.target.value) > 0,
                        })
                      }
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Color Pickers: Text & Stroke */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">Text Color</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedTextLayer.textColor}
                        onChange={(e) =>
                          onUpdateTextLayer(selectedTextLayer.id, { textColor: e.target.value })
                        }
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                      <span className="text-[10px] font-mono text-slate-400">
                        {selectedTextLayer.textColor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {COLOR_PALETTE.slice(0, 8).map((c) => (
                      <button
                        key={c.name}
                        onClick={() =>
                          onUpdateTextLayer(selectedTextLayer.id, { textColor: c.value })
                        }
                        style={{ backgroundColor: c.value }}
                        className={`w-5 h-5 rounded-md border transition-transform ${
                          selectedTextLayer.textColor === c.value
                            ? 'scale-110 border-amber-400 ring-2 ring-amber-400/40'
                            : 'border-slate-700/80 hover:scale-105'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Stroke Outline Color */}
                {selectedTextLayer.hasStroke && (
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-400">Stroke Color</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={selectedTextLayer.strokeColor}
                          onChange={(e) =>
                            onUpdateTextLayer(selectedTextLayer.id, {
                              strokeColor: e.target.value,
                            })
                          }
                          className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <span className="text-[10px] font-mono text-slate-400">
                          {selectedTextLayer.strokeColor}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Shadow & Blur Intensity */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">
                      Text Shadow
                    </span>
                    <button
                      onClick={() =>
                        onUpdateTextLayer(selectedTextLayer.id, {
                          hasShadow: !selectedTextLayer.hasShadow,
                          shadowBlur: selectedTextLayer.shadowBlur ?? 8,
                          shadowColor: selectedTextLayer.shadowColor || 'rgba(0, 0, 0, 0.9)',
                        })
                      }
                      className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                        selectedTextLayer.hasShadow
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {selectedTextLayer.hasShadow ? 'ENABLED' : 'OFF'}
                    </button>
                  </div>

                  {selectedTextLayer.hasShadow && (
                    <div className="space-y-2.5 pt-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Blur Intensity</span>
                          <span className="font-mono text-amber-400 font-semibold">
                            {selectedTextLayer.shadowBlur ?? 8}px
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={30}
                          value={selectedTextLayer.shadowBlur ?? 8}
                          onChange={(e) =>
                            onUpdateTextLayer(selectedTextLayer.id, {
                              shadowBlur: Number(e.target.value),
                            })
                          }
                          className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                        <span className="text-[10px] text-slate-400">Shadow Color</span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={
                              selectedTextLayer.shadowColor?.startsWith('#')
                                ? selectedTextLayer.shadowColor
                                : '#000000'
                            }
                            onChange={(e) =>
                              onUpdateTextLayer(selectedTextLayer.id, {
                                shadowColor: e.target.value,
                              })
                            }
                            className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
                            title="Shadow Color"
                          />
                          <span className="text-[10px] font-mono text-slate-400">
                            {selectedTextLayer.shadowColor?.startsWith('#')
                              ? selectedTextLayer.shadowColor
                              : '#000000'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Box Background Highlight */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">
                      Background Box Highlight
                    </span>
                    <button
                      onClick={() =>
                        onUpdateTextLayer(selectedTextLayer.id, {
                          hasBg: !selectedTextLayer.hasBg,
                          bgColor: selectedTextLayer.bgColor || 'rgba(0, 0, 0, 0.75)',
                        })
                      }
                      className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                        selectedTextLayer.hasBg
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {selectedTextLayer.hasBg ? 'ENABLED' : 'OFF'}
                    </button>
                  </div>

                  {selectedTextLayer.hasBg && (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedTextLayer.bgColor || '#000000'}
                        onChange={(e) =>
                          onUpdateTextLayer(selectedTextLayer.id, { bgColor: e.target.value })
                        }
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                      <span className="text-[10px] text-slate-400">
                        Adds solid backing for high contrast readability
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 text-center border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                Click any caption layer above or on canvas to style font, color, and outline.
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: LAYOUT & FRAMING ===================== */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            {/* Aspect Ratio Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Canvas Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {ASPECT_RATIOS.map((aspect) => (
                  <button
                    key={aspect.id}
                    onClick={() => onUpdateSettings({ aspectRatio: aspect.id })}
                    className={`px-2 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                      settings.aspectRatio === aspect.id
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{aspect.label}</div>
                    <div className="text-[9px] text-slate-500 truncate">{aspect.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Style (Overlay, Top Card, Demotivational, Framed) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Frame & Framing Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LAYOUT_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => onUpdateSettings({ layoutMode: mode.id })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      settings.layoutMode === mode.id
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-200">{mode.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Demotivational specifics if active */}
            {settings.layoutMode === 'demotivational' && (
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
                <label className="text-[11px] font-bold text-slate-300">
                  Demotivational Title
                </label>
                <input
                  type="text"
                  value={settings.demotivationalTitle}
                  onChange={(e) => onUpdateSettings({ demotivationalTitle: e.target.value })}
                  placeholder="MOTIVATION"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
                <label className="text-[11px] font-bold text-slate-300 pt-1 block">
                  Demotivational Subtitle
                </label>
                <input
                  type="text"
                  value={settings.demotivationalSubtitle}
                  onChange={(e) => onUpdateSettings({ demotivationalSubtitle: e.target.value })}
                  placeholder="Because quitting is always an option."
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>
            )}

            {/* Top Card Specifics if active */}
            {(settings.layoutMode === 'top-card' || settings.layoutMode === 'bottom-card') && (
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-300 block">
                  Card Background Color
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateSettings({ cardBgColor: '#ffffff' })}
                    className={`px-3 py-1 text-xs rounded border ${
                      settings.cardBgColor === '#ffffff'
                        ? 'bg-white text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Clean White
                  </button>
                  <button
                    onClick={() => onUpdateSettings({ cardBgColor: '#0f172a' })}
                    className={`px-3 py-1 text-xs rounded border ${
                      settings.cardBgColor === '#0f172a'
                        ? 'bg-slate-900 text-white border-amber-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Dark Slate
                  </button>
                  <input
                    type="color"
                    value={settings.cardBgColor}
                    onChange={(e) => onUpdateSettings({ cardBgColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0 ml-auto"
                  />
                </div>
              </div>
            )}

            {/* Canvas Background & Outer Margin Settings */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Background Canvas Color & Fill
              </label>

              {/* Color Swatches */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.name}
                    onClick={() =>
                      onUpdateSettings({ canvasBgType: 'solid', canvasBgColor: c.value })
                    }
                    style={{ backgroundColor: c.value }}
                    className={`w-6 h-6 rounded-md border transition-transform ${
                      settings.canvasBgType === 'solid' && settings.canvasBgColor === c.value
                        ? 'scale-110 border-amber-400 ring-2 ring-amber-400/40'
                        : 'border-slate-700/80 hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
                <input
                  type="color"
                  value={settings.canvasBgColor}
                  onChange={(e) =>
                    onUpdateSettings({ canvasBgType: 'solid', canvasBgColor: e.target.value })
                  }
                  className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0"
                  title="Custom Color"
                />
              </div>

              {/* Gradients */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-medium">Gradient Presets</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {GRADIENT_PRESETS.map((g) => (
                    <button
                      key={g.name}
                      onClick={() =>
                        onUpdateSettings({
                          canvasBgType: 'gradient',
                          gradientColors: g.colors,
                        })
                      }
                      style={{
                        background: `linear-gradient(45deg, ${g.colors[0]}, ${g.colors[1]})`,
                      }}
                      className="h-7 rounded-md border border-slate-700/80 text-[10px] font-bold text-white shadow-xs hover:opacity-90 flex items-center justify-center text-center px-1"
                    >
                      <span className="drop-shadow-xs truncate">{g.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Outer Margin & Radius Sliders */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Frame Padding</span>
                    <span className="font-mono">{settings.framePadding}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    value={settings.framePadding}
                    onChange={(e) =>
                      onUpdateSettings({ framePadding: Number(e.target.value) })
                    }
                    className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Corner Radius</span>
                    <span className="font-mono">{settings.frameRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={settings.frameRadius}
                    onChange={(e) =>
                      onUpdateSettings({ frameRadius: Number(e.target.value) })
                    }
                    className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: IMAGE & EFFECTS ===================== */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            {/* Upload or Change Template */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-700 hover:border-amber-400/70 bg-slate-900/60 hover:bg-slate-800/60 cursor-pointer transition-all group">
                <Upload className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold text-slate-200">Upload Image</span>
                <span className="text-[10px] text-slate-500">JPG, PNG, WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={onOpenTemplatePicker}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-800/60 transition-all group"
              >
                <Layers className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform mb-1" />
                <span className="text-xs font-semibold text-slate-200">Pick Template</span>
                <span className="text-[10px] text-slate-500">Classic memes</span>
              </button>
            </div>

            {/* Deep Fry Filter Button (Iconic Meme Feature!) */}
            <button
              onClick={() =>
                onUpdateSettings({
                  filter: settings.filter === 'deepfry' ? 'none' : 'deepfry',
                })
              }
              className={`w-full py-2 px-3 rounded-xl font-impact tracking-wide text-sm flex items-center justify-center gap-2 border transition-all ${
                settings.filter === 'deepfry'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-yellow-300 border-yellow-400 shadow-lg shadow-red-900/40'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-orange-400 border-slate-700'
              }`}
            >
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>{settings.filter === 'deepfry' ? 'DEEP FRIED (ON)' : 'DEEP FRY THIS MEME'}</span>
            </button>

            {/* Other Image Filters */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Photo Filter Effects
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'none', label: 'Normal' },
                  { id: 'grayscale', label: 'B & W' },
                  { id: 'contrast', label: 'High Contrast' },
                  { id: 'vintage', label: 'Vintage Warm' },
                  { id: 'sepia', label: 'Sepia' },
                  { id: 'cyberpunk', label: 'Cyberpunk' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onUpdateSettings({ filter: f.id as any })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      settings.filter === f.id
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Brightness, Contrast, Saturation, Zoom */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Brightness</span>
                  <span className="font-mono">{settings.brightness}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={150}
                  value={settings.brightness}
                  onChange={(e) => onUpdateSettings({ brightness: Number(e.target.value) })}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Contrast</span>
                  <span className="font-mono">{settings.contrast}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={200}
                  value={settings.contrast}
                  onChange={(e) => onUpdateSettings({ contrast: Number(e.target.value) })}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Saturation</span>
                  <span className="font-mono">{settings.saturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={settings.saturation}
                  onChange={(e) => onUpdateSettings({ saturation: Number(e.target.value) })}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Image Crop Zoom</span>
                  <span className="font-mono">{Math.round(settings.zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={2}
                  step={0.05}
                  value={settings.zoom}
                  onChange={(e) => onUpdateSettings({ zoom: Number(e.target.value) })}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Transform: Flip Horizontal & Vertical */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ flipH: !settings.flipH })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  settings.flipH
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Flip Horizontal</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ flipV: !settings.flipV })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  settings.flipV
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Flip Vertical</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: STICKERS & WATERMARK ===================== */}
        {activeTab === 'stickers' && (
          <div className="space-y-4">
            {/* Emojis grid */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Click to Add Reaction Emoji
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {MEME_STICKERS.filter((s) => s.type === 'emoji').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onAddSticker(item)}
                    className="h-10 text-xl rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                    title={item.name}
                  >
                    {item.content}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges and Meme Banners */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Meme Badges & Overlays
              </label>
              <div className="space-y-1.5">
                {MEME_STICKERS.filter((s) => s.type === 'badge').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onAddSticker(item)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-left border border-slate-700 text-white flex items-center justify-between group transition-all"
                  >
                    <span>{item.content}</span>
                    <Plus className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Active Sticker Layer Controls (if sticker selected) */}
            {selectedStickerLayer && (
              <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-950/20 space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-purple-900/40">
                  <span className="text-xs font-bold text-purple-300">
                    Selected Sticker
                  </span>
                  <button
                    onClick={() => onDeleteLayer(selectedStickerLayer.id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="Delete sticker"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Sticker Size</span>
                    <span className="font-mono">{selectedStickerLayer.size}px</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={180}
                    value={selectedStickerLayer.size}
                    onChange={(e) => {
                      const size = Number(e.target.value);
                      onSelectLayer(selectedStickerLayer.id);
                      // Update sticker directly
                      const s = stickerLayers.find((st) => st.id === selectedStickerLayer.id);
                      if (s) s.size = size;
                      onUpdateSettings({}); // trigger refresh
                    }}
                    className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Custom Watermark / Handle */}
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Custom Watermark / @Handle</span>
                <button
                  onClick={() => onUpdateSettings({ showWatermark: !settings.showWatermark })}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    settings.showWatermark
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {settings.showWatermark ? 'ENABLED' : 'OFF'}
                </button>
              </div>

              {settings.showWatermark && (
                <>
                  <input
                    type="text"
                    value={settings.watermarkText}
                    onChange={(e) => onUpdateSettings({ watermarkText: e.target.value })}
                    placeholder="@yourhandle"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Watermark Opacity</span>
                      <span className="font-mono">
                        {Math.round((settings.watermarkOpacity || 0.6) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.05}
                      value={settings.watermarkOpacity}
                      onChange={(e) =>
                        onUpdateSettings({ watermarkOpacity: Number(e.target.value) })
                      }
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
