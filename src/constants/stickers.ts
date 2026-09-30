export interface StickerItem {
  id: string;
  name: string;
  type: 'emoji' | 'sticker' | 'badge';
  content: string; // emoji character or SVG markup string
  category: 'expressions' | 'glasses' | 'reactions' | 'badges';
}

export const MEME_STICKERS: StickerItem[] = [
  // Emojis
  { id: 'skull', name: 'Skull (Dead)', type: 'emoji', content: '💀', category: 'expressions' },
  { id: 'cry-laugh', name: 'Tears of Joy', type: 'emoji', content: '😂', category: 'expressions' },
  { id: 'rofl', name: 'Rolling Laugh', type: 'emoji', content: '🤣', category: 'expressions' },
  { id: 'fire', name: 'Fire', type: 'emoji', content: '🔥', category: 'reactions' },
  { id: 'clown', name: 'Clown', type: 'emoji', content: '🤡', category: 'expressions' },
  { id: '100', name: 'Hundred', type: 'emoji', content: '💯', category: 'reactions' },
  { id: 'eyes', name: 'Side Eye', type: 'emoji', content: '👀', category: 'expressions' },
  { id: 'cap', name: 'Billed Cap (Cap/No Cap)', type: 'emoji', content: '🧢', category: 'reactions' },
  { id: 'clown-face', name: 'Melting Face', type: 'emoji', content: '🫠', category: 'expressions' },
  { id: 'sob', name: 'Loudly Crying', type: 'emoji', content: '😭', category: 'expressions' },
  { id: 'nerd', name: 'Nerd', type: 'emoji', content: '🤓', category: 'expressions' },
  { id: 'salute', name: 'Salute', type: 'emoji', content: '🫡', category: 'expressions' },
  { id: 'sunglasses', name: 'Cool Shades', type: 'emoji', content: '😎', category: 'glasses' },
  { id: 'brain', name: 'Brain', type: 'emoji', content: '🧠', category: 'reactions' },
  { id: 'pointing-right', name: 'Point Right', type: 'emoji', content: '👉', category: 'reactions' },
  { id: 'pointing-left', name: 'Point Left', type: 'emoji', content: '👈', category: 'reactions' },
  { id: 'red-flag', name: 'Red Flag', type: 'emoji', content: '🚩', category: 'reactions' },
  { id: 'warning', name: 'Warning Sign', type: 'emoji', content: '⚠️', category: 'reactions' },
  { id: 'ok-hand', name: 'OK Sign', type: 'emoji', content: '👌', category: 'reactions' },
  { id: 'popcorn', name: 'Popcorn', type: 'emoji', content: '🍿', category: 'reactions' },

  // Badges & Special overlays
  { id: 'breaking-news', name: 'Breaking News', type: 'badge', content: '🚨 BREAKING NEWS 🚨', category: 'badges' },
  { id: 'fake-fact', name: 'Fact Check: False', type: 'badge', content: '❌ DISPUTED BY EXPERTS', category: 'badges' },
  { id: 'certified-classic', name: 'Certified Hood Classic', type: 'badge', content: '🏆 CERTIFIED CLASSIC', category: 'badges' },
  { id: 'live-reaction', name: 'Live Reaction', type: 'badge', content: '🔴 LIVE REACTION', category: 'badges' },
  { id: 'cringe-alert', name: 'Cringe Alert', type: 'badge', content: '☣️ CRINGE ALERT', category: 'badges' },
  { id: 'sigma-grindset', name: 'Sigma Rule #42', type: 'badge', content: '🐺 SIGMA RULE', category: 'badges' },
  { id: 'bruh-moment', name: 'Bruh Moment', type: 'badge', content: '🗿 BRUH MOMENT', category: 'badges' },
  { id: 'sponsored', name: 'Not Sponsored', type: 'badge', content: '📢 NOT SPONSORED', category: 'badges' },

  // Glasses / Thug Life / Visual Elements
  { id: 'pixel-shades', name: 'Pixel Thug Shades', type: 'sticker', content: '🕶️', category: 'glasses' },
  { id: 'laser-eyes', name: 'Laser Eyes', type: 'sticker', content: '✨', category: 'glasses' },
  { id: 'speech-bubble', name: 'Speech Bubble', type: 'sticker', content: '💬', category: 'reactions' },
  { id: 'thought-bubble', name: 'Thought Bubble', type: 'sticker', content: '💭', category: 'reactions' }
];
