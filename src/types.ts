export type AspectRatio = 'free' | '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:2';

export type LayoutMode = 'overlay' | 'top-card' | 'bottom-card' | 'demotivational' | 'framed' | 'split-vertical';

export type ImageFilter = 'none' | 'deepfry' | 'grayscale' | 'contrast' | 'sepia' | 'invert' | 'vintage' | 'vibrant' | 'cyberpunk';

export type TextAlign = 'left' | 'center' | 'right';

export interface TextLayer {
  id: string;
  text: string;
  x: number; // percentage (0 - 100) or relative position
  y: number; // percentage (0 - 100)
  fontSize: number; // px at standard 800px base
  fontFamily: string;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  hasStroke: boolean;
  hasShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  isUppercase: boolean;
  isBold: boolean;
  isItalic: boolean;
  textAlign: TextAlign;
  bgColor?: string; // background highlight box
  hasBg: boolean;
  bgPadding: number;
  bgRadius: number;
  rotation: number; // degrees
  maxWidth: number; // percentage of canvas (e.g. 90%)
  lineHeight: number;
}

export interface StickerLayer {
  id: string;
  type: 'emoji' | 'badge' | 'sticker';
  content: string; // emoji char or svg identifier
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  size: number; // px size
  rotation: number;
}

export interface CanvasSettings {
  aspectRatio: AspectRatio;
  layoutMode: LayoutMode;
  canvasBgColor: string;
  canvasBgType: 'solid' | 'gradient' | 'pattern';
  gradientAngle: number;
  gradientColors: [string, string];
  patternName: 'none' | 'dots' | 'grid' | 'stripes' | 'halftone';
  // Card layout settings
  cardBgColor: string;
  cardTextColor: string;
  cardHeightRatio: number; // 0.15 - 0.35
  cardFontFamily: string;
  // Frame settings
  framePadding: number; // px
  frameBorderColor: string;
  frameBorderWidth: number;
  frameRadius: number;
  // Demotivational specific
  demotivationalTitle: string;
  demotivationalSubtitle: string;
  // Image settings
  filter: ImageFilter;
  brightness: number; // 50 - 150
  contrast: number; // 50 - 200
  saturation: number; // 0 - 300
  flipH: boolean;
  flipV: boolean;
  zoom: number; // 1 to 2
  // Watermark
  watermarkText: string;
  showWatermark: boolean;
  watermarkOpacity: number;
}

export interface MemeTemplate {
  id: string;
  name: string;
  category: 'classic' | 'modern' | 'reaction' | 'two-panel' | 'blank';
  description: string;
  svgDataUri: string;
  defaultTopText?: string;
  defaultBottomText?: string;
  defaultLayout?: LayoutMode;
  suggestedAspect?: AspectRatio;
  tags: string[];
}
