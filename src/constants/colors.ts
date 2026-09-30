export interface ColorOption {
  name: string;
  value: string;
}

export const COLOR_PALETTE: ColorOption[] = [
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Pitch Black', value: '#000000' },
  { name: 'Dark Slate', value: '#0f172a' },
  { name: 'Vibrant Yellow', value: '#facc15' },
  { name: 'Hot Crimson', value: '#ef4444' },
  { name: 'Neon Green', value: '#22c55e' },
  { name: 'Cyan Blue', value: '#06b6d4' },
  { name: 'Electric Purple', value: '#a855f7' },
  { name: 'Barbie Pink', value: '#ec4899' },
  { name: 'Warm Amber', value: '#f59e0b' },
  { name: 'Reddit Orange', value: '#ff4500' },
  { name: 'Mint Emerald', value: '#10b981' },
];

export const GRADIENT_PRESETS: { name: string; colors: [string, string] }[] = [
  { name: 'Synthwave Sunset', colors: ['#ff007f', '#7928ca'] },
  { name: 'Fiery Rage', colors: ['#f97316', '#dc2626'] },
  { name: 'Neon Cyber', colors: ['#06b6d4', '#3b82f6'] },
  { name: 'Acid Slime', colors: ['#84cc16', '#10b981'] },
  { name: 'Dark Void', colors: ['#0f172a', '#020617'] },
  { name: 'Golden Hour', colors: ['#fbbf24', '#f43f5e'] },
];

export const FONT_OPTIONS = [
  { id: 'Impact', name: 'Impact (Classic Meme)', family: "'Anton', Impact, 'Arial Black', sans-serif" },
  { id: 'Bebas Neue', name: 'Bebas Neue (Headline)', family: "'Bebas Neue', sans-serif" },
  { id: 'Comic Neue', name: 'Comic Neue (Dogecoin / Fun)', family: "'Comic Neue', 'Comic Sans MS', cursive" },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta (Modern Clean)', family: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { id: 'Permanent Marker', name: 'Permanent Marker (Graffiti)', family: "'Permanent Marker', cursive" },
  { id: 'Oswald', name: 'Oswald (Bold Condensed)', family: "'Oswald', sans-serif" },
  { id: 'Bungee', name: 'Bungee (Retro Blocky)', family: "'Bungee', cursive" },
  { id: 'Space Grotesk', name: 'Space Grotesk (Tech / Edgy)', family: "'Space Grotesk', sans-serif" },
];

export const ASPECT_RATIOS: { id: 'free' | '1:1' | '4:5' | '9:16' | '16:9' | '4:3' | '3:2'; label: string; desc: string }[] = [
  { id: 'free', label: 'Original', desc: 'Preserves image size' },
  { id: '1:1', label: '1:1 Square', desc: 'Instagram feed, Discord, WhatsApp' },
  { id: '4:5', label: '4:5 Portrait', desc: 'Instagram vertical' },
  { id: '9:16', label: '9:16 Story', desc: 'Reels, TikTok, Stories' },
  { id: '16:9', label: '16:9 Landscape', desc: 'Twitter/X, YouTube thumbnail' },
  { id: '4:3', label: '4:3 Classic', desc: 'Retro photo standard' },
];

export const LAYOUT_MODES: { id: 'overlay' | 'top-card' | 'bottom-card' | 'demotivational' | 'framed'; label: string; desc: string }[] = [
  { id: 'overlay', label: 'Overlay', desc: 'Classic Impact text on image' },
  { id: 'top-card', label: 'Top Card', desc: 'Twitter / Reddit white caption box' },
  { id: 'bottom-card', label: 'Bottom Card', desc: 'Image above, caption below' },
  { id: 'demotivational', label: 'Demotivational', desc: 'Classic black frame & serif title' },
  { id: 'framed', label: 'Framed Border', desc: 'Color border margin around meme' },
];
