import { CanvasSettings, TextLayer, StickerLayer } from '../types';

export interface RenderCanvasOptions {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement | null;
  settings: CanvasSettings;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  exportScale?: number; // 1 for preview, 2 for HD export
  selectedLayerId?: string | null;
  isExporting?: boolean; // hides selection indicators
}

// Wrap text to fit maximum width in pixels
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const rawParagraphs = text.split('\n');

  for (const paragraph of rawParagraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }

    const words = paragraph.split(' ');
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      const word = words[n];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // If single word itself exceeds maxWidth, force break
        if (ctx.measureText(word).width > maxWidth) {
          if (currentLine) lines.push(currentLine);
          let subWord = '';
          for (const char of word) {
            if (ctx.measureText(subWord + char).width > maxWidth) {
              lines.push(subWord);
              subWord = char;
            } else {
              subWord += char;
            }
          }
          currentLine = subWord;
        } else {
          currentLine = testLine;
        }
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

// Calculate canvas dimensions based on aspect ratio and image
export function calculateCanvasDimensions(
  settings: CanvasSettings,
  image: HTMLImageElement | null,
  baseWidth: number = 1000
): { width: number; height: number } {
  let width = baseWidth;
  let height = baseWidth;

  const imgAspect = image && image.naturalWidth > 0 && image.naturalHeight > 0
    ? image.naturalWidth / image.naturalHeight
    : 1;

  switch (settings.aspectRatio) {
    case '1:1':
      height = width;
      break;
    case '4:5':
      height = Math.round(width * 1.25);
      break;
    case '9:16':
      height = Math.round(width * (16 / 9));
      break;
    case '16:9':
      height = Math.round(width * (9 / 16));
      break;
    case '4:3':
      height = Math.round(width * (3 / 4));
      break;
    case '3:2':
      height = Math.round(width * (2 / 3));
      break;
    case 'free':
    default:
      if (imgAspect > 0) {
        height = Math.round(width / imgAspect);
      } else {
        height = width;
      }
      break;
  }

  // Adjust canvas height if in card or demotivational mode
  if (settings.layoutMode === 'top-card' || settings.layoutMode === 'bottom-card') {
    const cardHeight = Math.round(height * (settings.cardHeightRatio || 0.25));
    height += cardHeight;
  } else if (settings.layoutMode === 'demotivational') {
    // Demotivational has bottom caption bar space
    height += Math.round(width * 0.28);
  }

  return { width, height };
}

// Main rendering function
export function renderMemeCanvas({
  canvas,
  image,
  settings,
  textLayers,
  stickerLayers,
  exportScale = 1,
  selectedLayerId = null,
  isExporting = false,
}: RenderCanvasOptions) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const baseWidth = 1000 * exportScale;
  const { width: canvasWidth, height: canvasHeight } = calculateCanvasDimensions(
    settings,
    image,
    baseWidth
  );

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 1. Draw Canvas Background
  drawBackground(ctx, canvasWidth, canvasHeight, settings);

  // 2. Determine Image Placement Area
  const imgBounds = calculateImageBounds(canvasWidth, canvasHeight, settings);

  // 3. Draw Main Image (with filters, transform, frame)
  if (image && image.complete && image.naturalWidth > 0) {
    drawImageWithEffects(ctx, image, imgBounds, settings);
  }

  // 4. Draw Specific Layout Mode Extras (Card box, demotivational frames)
  drawLayoutExtras(ctx, canvasWidth, canvasHeight, imgBounds, settings);

  // 5. Draw Text Layers
  for (const layer of textLayers) {
    drawTextLayer(ctx, layer, canvasWidth, canvasHeight, settings, exportScale);
    if (!isExporting && selectedLayerId === layer.id) {
      drawLayerSelectionOutline(ctx, layer, canvasWidth, canvasHeight);
    }
  }

  // 6. Draw Sticker Layers
  for (const sticker of stickerLayers) {
    drawStickerLayer(ctx, sticker, canvasWidth, canvasHeight, exportScale);
    if (!isExporting && selectedLayerId === sticker.id) {
      drawStickerSelectionOutline(ctx, sticker, canvasWidth, canvasHeight, exportScale);
    }
  }

  // 7. Draw Watermark if enabled
  if (settings.showWatermark && settings.watermarkText.trim()) {
    drawWatermark(ctx, canvasWidth, canvasHeight, settings, exportScale);
  }
}

// Background painter
function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: CanvasSettings
) {
  ctx.save();
  if (settings.canvasBgType === 'gradient') {
    const angleRad = (settings.gradientAngle || 45) * (Math.PI / 180);
    const x2 = Math.cos(angleRad) * width;
    const y2 = Math.sin(angleRad) * height;
    const grad = ctx.createLinearGradient(0, 0, Math.abs(x2), Math.abs(y2));
    grad.addColorStop(0, settings.gradientColors[0] || '#3b82f6');
    grad.addColorStop(1, settings.gradientColors[1] || '#8b5cf6');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.fillStyle = settings.canvasBgColor || '#000000';
    ctx.fillRect(0, 0, width, height);
  }

  // Patterns
  if (settings.patternName === 'dots') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const spacing = 28;
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (settings.patternName === 'grid') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    const spacing = 36;
    ctx.beginPath();
    for (let x = 0; x < width; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

interface ImageBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

function calculateImageBounds(
  canvasW: number,
  canvasH: number,
  settings: CanvasSettings
): ImageBounds {
  const padding = settings.framePadding || 0;

  if (settings.layoutMode === 'top-card') {
    const cardHeight = Math.round(canvasH * (settings.cardHeightRatio || 0.25));
    return {
      x: padding,
      y: cardHeight + padding,
      w: canvasW - padding * 2,
      h: canvasH - cardHeight - padding * 2,
    };
  }

  if (settings.layoutMode === 'bottom-card') {
    const cardHeight = Math.round(canvasH * (settings.cardHeightRatio || 0.25));
    return {
      x: padding,
      y: padding,
      w: canvasW - padding * 2,
      h: canvasH - cardHeight - padding * 2,
    };
  }

  if (settings.layoutMode === 'demotivational') {
    const margin = Math.round(canvasW * 0.08);
    const bottomBar = Math.round(canvasW * 0.24);
    return {
      x: margin,
      y: margin,
      w: canvasW - margin * 2,
      h: canvasH - margin - bottomBar,
    };
  }

  return {
    x: padding,
    y: padding,
    w: canvasW - padding * 2,
    h: canvasH - padding * 2,
  };
}

function drawImageWithEffects(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  bounds: ImageBounds,
  settings: CanvasSettings
) {
  ctx.save();

  // Rounded image corners if specified
  if (settings.frameRadius > 0) {
    ctx.beginPath();
    ctx.roundRect(bounds.x, bounds.y, bounds.w, bounds.h, settings.frameRadius);
    ctx.clip();
  }

  // Build filter string
  const filterList: string[] = [];
  if (settings.filter === 'deepfry') {
    filterList.push('contrast(260%) saturate(380%) brightness(115%)');
  } else if (settings.filter === 'grayscale') {
    filterList.push('grayscale(100%)');
  } else if (settings.filter === 'contrast') {
    filterList.push('contrast(180%)');
  } else if (settings.filter === 'sepia') {
    filterList.push('sepia(100%)');
  } else if (settings.filter === 'invert') {
    filterList.push('invert(100%)');
  } else if (settings.filter === 'vintage') {
    filterList.push('sepia(50%) contrast(120%) brightness(90%)');
  } else if (settings.filter === 'vibrant') {
    filterList.push('saturate(200%) contrast(110%)');
  } else if (settings.filter === 'cyberpunk') {
    filterList.push('hue-rotate(280deg) saturate(220%) contrast(140%)');
  }

  // Sliders
  if (settings.brightness !== 100) {
    filterList.push(`brightness(${settings.brightness}%)`);
  }
  if (settings.contrast !== 100) {
    filterList.push(`contrast(${settings.contrast}%)`);
  }
  if (settings.saturation !== 100) {
    filterList.push(`saturate(${settings.saturation}%)`);
  }

  if (filterList.length > 0) {
    ctx.filter = filterList.join(' ');
  }

  // Draw image with aspect cover inside bounds
  const imgW = image.naturalWidth;
  const imgH = image.naturalHeight;
  const scale = Math.max(bounds.w / imgW, bounds.h / imgH) * (settings.zoom || 1);
  const renderW = imgW * scale;
  const renderH = imgH * scale;
  const renderX = bounds.x + (bounds.w - renderW) / 2;
  const renderY = bounds.y + (bounds.h - renderH) / 2;

  // Flipping
  ctx.save();
  const centerX = bounds.x + bounds.w / 2;
  const centerY = bounds.y + bounds.h / 2;
  ctx.translate(centerX, centerY);
  ctx.scale(settings.flipH ? -1 : 1, settings.flipV ? -1 : 1);
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(image, renderX, renderY, renderW, renderH);
  ctx.restore();

  // If deep fry, draw subtle noise/grain overlay
  if (settings.filter === 'deepfry') {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
  }

  ctx.restore();

  // Border frame line
  if (settings.frameBorderWidth > 0) {
    ctx.save();
    ctx.strokeStyle = settings.frameBorderColor || '#ffffff';
    ctx.lineWidth = settings.frameBorderWidth;
    if (settings.frameRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(bounds.x, bounds.y, bounds.w, bounds.h, settings.frameRadius);
      ctx.stroke();
    } else {
      ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
    }
    ctx.restore();
  }
}

function drawLayoutExtras(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  imgBounds: ImageBounds,
  settings: CanvasSettings
) {
  if (settings.layoutMode === 'top-card' || settings.layoutMode === 'bottom-card') {
    const cardHeight = Math.round(height * (settings.cardHeightRatio || 0.25));
    const cardY = settings.layoutMode === 'top-card' ? 0 : height - cardHeight;

    ctx.save();
    ctx.fillStyle = settings.cardBgColor || '#ffffff';
    ctx.fillRect(0, cardY, width, cardHeight);

    // Subtle divider line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (settings.layoutMode === 'top-card') {
      ctx.moveTo(0, cardHeight);
      ctx.lineTo(width, cardHeight);
    } else {
      ctx.moveTo(0, cardY);
      ctx.lineTo(width, cardY);
    }
    ctx.stroke();
    ctx.restore();
  } else if (settings.layoutMode === 'demotivational') {
    // Thin inner white border line framing the image
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    const borderInset = 4;
    ctx.strokeRect(
      imgBounds.x - borderInset,
      imgBounds.y - borderInset,
      imgBounds.w + borderInset * 2,
      imgBounds.h + borderInset * 2
    );

    // Title & Subtitle in demotivational style
    const title = (settings.demotivationalTitle || 'MOTIVATION').toUpperCase();
    const subtitle = settings.demotivationalSubtitle || 'It only gets worse from here.';

    const titleY = imgBounds.y + imgBounds.h + Math.round(width * 0.1);
    ctx.font = `bold ${Math.round(width * 0.058)}px 'Times New Roman', Georgia, serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '6px';
    ctx.fillText(title, width / 2, titleY);

    if (subtitle) {
      const subY = titleY + Math.round(width * 0.045);
      ctx.font = `400 ${Math.round(width * 0.024)}px 'Plus Jakarta Sans', system-ui, sans-serif`;
      ctx.fillStyle = '#e2e8f0';
      ctx.letterSpacing = '1px';
      ctx.fillText(subtitle, width / 2, subY);
    }
    ctx.restore();
  }
}

function drawTextLayer(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  canvasW: number,
  canvasH: number,
  _settings: CanvasSettings,
  exportScale: number
) {
  if (!layer.text || !layer.text.trim()) return;

  ctx.save();

  const scaledFontSize = Math.round(layer.fontSize * exportScale);
  const textX = (layer.x / 100) * canvasW;
  const textY = (layer.y / 100) * canvasH;

  // Transform rotation
  ctx.translate(textX, textY);
  if (layer.rotation) {
    ctx.rotate((layer.rotation * Math.PI) / 180);
  }

  // Construct font string
  const weight = layer.isBold ? 'bold' : 'normal';
  const style = layer.isItalic ? 'italic' : 'normal';
  ctx.font = `${style} ${weight} ${scaledFontSize}px ${layer.fontFamily}`;
  ctx.textAlign = layer.textAlign;
  ctx.textBaseline = 'middle';

  const textToRender = layer.isUppercase ? layer.text.toUpperCase() : layer.text;
  const maxPixelWidth = (layer.maxWidth / 100) * canvasW;
  const lines = wrapText(ctx, textToRender, maxPixelWidth);

  const lineSpacing = scaledFontSize * (layer.lineHeight || 1.15);
  const totalBlockHeight = lines.length * lineSpacing;
  const startY = -(totalBlockHeight / 2) + lineSpacing / 2;

  // Draw background highlight box if enabled
  if (layer.hasBg && layer.bgColor) {
    let maxLineWidth = 0;
    for (const line of lines) {
      const w = ctx.measureText(line).width;
      if (w > maxLineWidth) maxLineWidth = w;
    }

    const pad = (layer.bgPadding || 12) * exportScale;
    const boxW = maxLineWidth + pad * 2;
    const boxH = totalBlockHeight + pad * 1.5;
    let boxX = -boxW / 2;
    if (layer.textAlign === 'left') boxX = -pad;
    if (layer.textAlign === 'right') boxX = -boxW + pad;

    const boxY = -(totalBlockHeight / 2) - pad;
    const radius = (layer.bgRadius || 6) * exportScale;

    ctx.save();
    ctx.fillStyle = layer.bgColor;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, radius);
    ctx.fill();
    ctx.restore();
  }

  // Draw lines with stroke then fill
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const currentY = startY + i * lineSpacing;

    // Apply shadow configuration
    if (layer.hasShadow && (layer.shadowBlur ?? 8) > 0) {
      ctx.shadowColor = layer.shadowColor || 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = (layer.shadowBlur ?? 8) * exportScale;
      ctx.shadowOffsetX = Math.max(1, Math.round((layer.shadowBlur ?? 8) * 0.25)) * exportScale;
      ctx.shadowOffsetY = Math.max(1, Math.round((layer.shadowBlur ?? 8) * 0.25)) * exportScale;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Stroke Outline
    if (layer.hasStroke && layer.strokeWidth > 0) {
      ctx.save();
      ctx.strokeStyle = layer.strokeColor || '#000000';
      ctx.lineWidth = layer.strokeWidth * exportScale * 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.miterLimit = 2;
      if (layer.hasShadow && (layer.shadowBlur ?? 8) > 0) {
        ctx.shadowColor = layer.shadowColor || 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = (layer.shadowBlur ?? 8) * exportScale;
        ctx.shadowOffsetX = Math.max(1, Math.round((layer.shadowBlur ?? 8) * 0.25)) * exportScale;
        ctx.shadowOffsetY = Math.max(1, Math.round((layer.shadowBlur ?? 8) * 0.25)) * exportScale;
      }
      ctx.strokeText(line, 0, currentY);
      ctx.restore();
    }

    // Fill
    ctx.fillStyle = layer.textColor || '#ffffff';
    ctx.fillText(line, 0, currentY);
  }

  ctx.restore();
}

function drawStickerLayer(
  ctx: CanvasRenderingContext2D,
  sticker: StickerLayer,
  canvasW: number,
  canvasH: number,
  exportScale: number
) {
  ctx.save();

  const stickerX = (sticker.x / 100) * canvasW;
  const stickerY = (sticker.y / 100) * canvasH;
  const size = Math.round(sticker.size * exportScale);

  ctx.translate(stickerX, stickerY);
  if (sticker.rotation) {
    ctx.rotate((sticker.rotation * Math.PI) / 180);
  }

  if (sticker.type === 'emoji') {
    ctx.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sticker.content, 0, 0);
  } else if (sticker.type === 'badge') {
    // Render styled badge banner
    ctx.font = `800 ${Math.round(size * 0.32)}px 'Plus Jakarta Sans', system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textWidth = ctx.measureText(sticker.content).width;
    const padX = 20 * exportScale;
    const padY = 12 * exportScale;
    const badgeW = textWidth + padX * 2;
    const badgeH = size * 0.45;

    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * exportScale;
    ctx.beginPath();
    ctx.roundRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH, 6 * exportScale);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(sticker.content, 0, 0);
  } else {
    // Fallback emoji
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sticker.content, 0, 0);
  }

  ctx.restore();
}

function drawWatermark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: CanvasSettings,
  exportScale: number
) {
  ctx.save();
  const fontSize = Math.round(18 * exportScale);
  ctx.font = `600 ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${settings.watermarkOpacity || 0.6})`;
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4 * exportScale;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';

  const margin = 20 * exportScale;
  ctx.fillText(settings.watermarkText, width - margin, height - margin);
  ctx.restore();
}

function drawLayerSelectionOutline(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  canvasW: number,
  canvasH: number
) {
  ctx.save();
  const textX = (layer.x / 100) * canvasW;
  const textY = (layer.y / 100) * canvasH;
  ctx.translate(textX, textY);
  if (layer.rotation) {
    ctx.rotate((layer.rotation * Math.PI) / 180);
  }

  // Draw dashed bounding box
  const boundW = Math.max(160, (layer.maxWidth / 100) * canvasW * 0.8);
  const boundH = Math.max(50, layer.fontSize * 1.6);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(-boundW / 2, -boundH / 2, boundW, boundH);

  // Corner anchor dots
  ctx.fillStyle = '#38bdf8';
  ctx.setLineDash([]);
  const dotSize = 7;
  ctx.fillRect(-boundW / 2 - dotSize / 2, -boundH / 2 - dotSize / 2, dotSize, dotSize);
  ctx.fillRect(boundW / 2 - dotSize / 2, -boundH / 2 - dotSize / 2, dotSize, dotSize);
  ctx.fillRect(-boundW / 2 - dotSize / 2, boundH / 2 - dotSize / 2, dotSize, dotSize);
  ctx.fillRect(boundW / 2 - dotSize / 2, boundH / 2 - dotSize / 2, dotSize, dotSize);
  ctx.restore();
}

function drawStickerSelectionOutline(
  ctx: CanvasRenderingContext2D,
  sticker: StickerLayer,
  canvasW: number,
  canvasH: number,
  exportScale: number
) {
  ctx.save();
  const stickerX = (sticker.x / 100) * canvasW;
  const stickerY = (sticker.y / 100) * canvasH;
  const size = Math.round(sticker.size * exportScale);

  ctx.translate(stickerX, stickerY);
  if (sticker.rotation) {
    ctx.rotate((sticker.rotation * Math.PI) / 180);
  }

  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 4]);
  const boxW = size * 1.1;
  const boxH = size * 1.1;
  ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);
  ctx.restore();
}
