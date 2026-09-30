import { MemeTemplate } from '../types';

// Helper to encode SVG string safely to data URL
function svgToUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: 'drake-hotline',
    name: 'Drake Hotline Bling',
    category: 'two-panel',
    description: 'Disapproval on top panel, full approval on bottom panel',
    tags: ['drake', 'reaction', 'choice', 'better', 'preference'],
    suggestedAspect: '1:1',
    defaultLayout: 'overlay',
    defaultTopText: 'WRITING 500 LINES OF CODE',
    defaultBottomText: 'USING A 3-LINE NPM PACKAGE',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <!-- Top Half: Disapproval -->
        <rect x="0" y="0" width="400" height="400" fill="#f87171" opacity="0.85"/>
        <rect x="400" y="0" width="400" height="400" fill="#ffffff"/>
        <!-- Bottom Half: Approval -->
        <rect x="0" y="400" width="400" height="400" fill="#4ade80" opacity="0.85"/>
        <rect x="400" y="400" width="400" height="400" fill="#f8fafc"/>
        <line x1="0" y1="400" x2="800" y2="400" stroke="#334155" stroke-width="6"/>
        <line x1="400" y1="0" x2="400" y2="800" stroke="#334155" stroke-width="6"/>
        
        <!-- Top Panel: Disapproving figure in orange jacket -->
        <g transform="translate(40, 40)">
          <!-- Body / Orange puffer jacket -->
          <path d="M 60 220 C 60 160, 100 130, 160 130 C 220 130, 260 160, 260 220 L 290 320 L 30 320 Z" fill="#ea580c"/>
          <!-- Hand pushed forward in refusal -->
          <circle cx="270" cy="180" r="32" fill="#d97706"/>
          <line x1="255" y1="160" x2="255" y2="200" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
          <line x1="270" y1="155" x2="270" y2="205" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
          <line x1="285" y1="160" x2="285" y2="200" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
          <!-- Head turned away with scrunched face -->
          <circle cx="160" cy="90" r="50" fill="#d97706"/>
          <!-- Beard / Hair -->
          <path d="M 120 80 C 120 40, 200 40, 200 80 C 205 125, 185 140, 160 140 C 135 140, 115 125, 120 80 Z" fill="#451a03"/>
          <circle cx="160" cy="85" r="42" fill="#d97706"/>
          <!-- Beard trim -->
          <path d="M 130 95 Q 160 140 190 95 Q 160 125 130 95" fill="#292524"/>
          <!-- Disgusted expression (eyes closed tight, frown) -->
          <path d="M 140 75 Q 150 70 155 77" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M 165 77 Q 170 70 180 75" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M 148 102 Q 160 92 172 102" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Bottom Panel: Approving figure with pointing finger -->
        <g transform="translate(40, 440)">
          <!-- Body / Orange puffer jacket -->
          <path d="M 60 220 C 60 160, 100 130, 160 130 C 220 130, 260 160, 260 220 L 290 320 L 30 320 Z" fill="#ea580c"/>
          <!-- Head smiling nodding -->
          <circle cx="160" cy="90" r="50" fill="#d97706"/>
          <path d="M 120 80 C 120 40, 200 40, 200 80 C 205 125, 185 140, 160 140 C 135 140, 115 125, 120 80 Z" fill="#451a03"/>
          <circle cx="160" cy="85" r="42" fill="#d97706"/>
          <path d="M 130 95 Q 160 140 190 95 Q 160 125 130 95" fill="#292524"/>
          <!-- Happy wink / smile -->
          <circle cx="145" cy="78" r="4" fill="#451a03"/>
          <circle cx="175" cy="78" r="4" fill="#451a03"/>
          <path d="M 148 98 Q 160 115 172 98" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round"/>
          <!-- Pointing finger upward -->
          <rect x="250" y="140" width="28" height="60" rx="14" fill="#d97706" transform="rotate(-20 250 140)"/>
          <circle cx="265" cy="195" r="22" fill="#d97706"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    category: 'reaction',
    description: 'Sweating guy struggling to choose between two contradictory buttons',
    tags: ['choice', 'dilemma', 'stress', 'sweat', 'buttons'],
    suggestedAspect: '1:1',
    defaultLayout: 'overlay',
    defaultTopText: 'WAKING UP EARLY',
    defaultBottomText: 'ONE MORE EPISODE AT 3AM',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <!-- Background Control Room Panel -->
        <rect width="800" height="800" fill="#0f172a"/>
        <path d="M 0 350 L 800 280 L 800 0 L 0 0 Z" fill="#1e293b"/>
        
        <!-- Console Desk -->
        <polygon points="50,300 750,230 780,480 20,480" fill="#334155" stroke="#475569" stroke-width="4"/>
        
        <!-- Button 1 (Left) -->
        <ellipse cx="280" cy="330" rx="90" ry="45" fill="#991b1b"/>
        <ellipse cx="280" cy="315" rx="75" ry="35" fill="#ef4444"/>
        <ellipse cx="280" cy="310" rx="60" ry="25" fill="#f87171"/>
        
        <!-- Button 2 (Right) -->
        <ellipse cx="530" cy="310" rx="90" ry="45" fill="#991b1b"/>
        <ellipse cx="530" cy="295" rx="75" ry="35" fill="#ef4444"/>
        <ellipse cx="530" cy="290" rx="60" ry="25" fill="#f87171"/>

        <!-- Sweating Superhero / Guy in blue suit -->
        <g transform="translate(180, 420)">
          <!-- Cape & Torso -->
          <path d="M 0 380 L 80 180 L 360 180 L 440 380 Z" fill="#2563eb"/>
          <path d="M 120 180 L 220 380 L 320 180 Z" fill="#1d4ed8"/>
          <!-- Head / Jaw / Sweat -->
          <ellipse cx="220" cy="110" rx="85" ry="95" fill="#fed7aa"/>
          <!-- Red mask / Cowl -->
          <path d="M 140 100 C 140 20, 300 20, 300 100 C 270 70, 170 70, 140 100 Z" fill="#dc2626"/>
          <!-- Stressed Eyes looking at buttons -->
          <ellipse cx="185" cy="95" rx="18" ry="12" fill="#ffffff"/>
          <circle cx="185" cy="92" r="6" fill="#0f172a"/>
          <ellipse cx="255" cy="95" rx="18" ry="12" fill="#ffffff"/>
          <circle cx="255" cy="92" r="6" fill="#0f172a"/>
          <!-- Worried Mouth & Trembling Chin -->
          <path d="M 195 155 Q 220 145 245 155" stroke="#7c2d12" stroke-width="4" fill="none"/>
          <!-- Sweat drops & Hand with towel -->
          <path d="M 155 70 C 150 50, 160 50, 155 70" fill="#38bdf8"/>
          <circle cx="155" cy="80" r="5" fill="#38bdf8"/>
          <circle cx="280" cy="110" r="7" fill="#38bdf8"/>
          <circle cx="295" cy="130" r="5" fill="#38bdf8"/>
          <circle cx="210" cy="60" r="6" fill="#38bdf8"/>
          <!-- Hand mopping forehead with white rag -->
          <ellipse cx="140" cy="50" rx="45" ry="30" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/>
          <ellipse cx="120" cy="70" rx="25" ry="20" fill="#fed7aa"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Guy',
    category: 'classic',
    description: 'Guy checking out another option while his partner watches in shock',
    tags: ['distraction', 'loyalty', 'choice', 'girlfriend', 'temptation'],
    suggestedAspect: '16:9',
    defaultLayout: 'overlay',
    defaultTopText: 'NEW HOBBY WITH $400 UPFRONT GEAR',
    defaultBottomText: 'MY CURRENT UNFINISHED PROJECTS',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
        <!-- City Street Background -->
        <rect width="960" height="540" fill="#f1f5f9"/>
        <rect y="380" width="960" height="160" fill="#64748b"/>
        <line x1="0" y1="380" x2="960" y2="380" stroke="#334155" stroke-width="4"/>
        <rect x="50" y="80" width="160" height="300" fill="#cbd5e1" opacity="0.4"/>
        <rect x="250" y="50" width="220" height="330" fill="#94a3b8" opacity="0.3"/>
        <rect x="520" y="100" width="180" height="280" fill="#cbd5e1" opacity="0.4"/>
        <rect x="740" y="70" width="180" height="310" fill="#94a3b8" opacity="0.3"/>

        <!-- Other Girl walking away in Red Dress (Left side) -->
        <g transform="translate(180, 140)">
          <circle cx="60" cy="50" r="32" fill="#fcd34d"/>
          <!-- Long brown hair flowing -->
          <path d="M 30 40 Q 20 120 70 140 Q 90 90 90 40 Z" fill="#78350f"/>
          <!-- Face profile smiling -->
          <circle cx="60" cy="50" r="28" fill="#ffedd5"/>
          <!-- Red dress -->
          <polygon points="35,110 85,110 115,260 5,260" fill="#dc2626"/>
          <!-- Legs walking -->
          <rect x="20" y="260" width="18" height="130" fill="#ffedd5" rx="8"/>
          <rect x="65" y="260" width="18" height="120" fill="#ffedd5" rx="8" transform="rotate(-15 65 260)"/>
        </g>

        <!-- Boyfriend in Plaid turning head backward (Center) -->
        <g transform="translate(440, 120)">
          <!-- Body in plaid shirt -->
          <rect x="30" y="110" width="100" height="160" fill="#0284c7" rx="10"/>
          <!-- Head twisted 120 degrees toward left girl -->
          <circle cx="50" cy="50" r="36" fill="#ffedd5"/>
          <path d="M 20 40 C 20 10, 80 10, 85 45 C 70 30, 30 30, 20 40 Z" fill="#92400e"/>
          <!-- Eyes wide in fascination looking left -->
          <ellipse cx="38" cy="48" rx="8" ry="10" fill="#ffffff"/>
          <circle cx="34" cy="48" r="4" fill="#0f172a"/>
          <!-- Open jaw / whistle mouth -->
          <ellipse cx="35" cy="68" rx="6" ry="4" fill="#0f172a"/>
          <!-- Jeans & Legs -->
          <rect x="35" y="270" width="40" height="140" fill="#1e3a8a"/>
          <rect x="85" y="270" width="40" height="140" fill="#1e3a8a"/>
        </g>

        <!-- Upset Girlfriend in Blue Top (Right side) -->
        <g transform="translate(680, 130)">
          <!-- Face in pure shock / outrage looking at boyfriend -->
          <circle cx="70" cy="50" r="34" fill="#ffedd5"/>
          <path d="M 35 30 C 40 5, 105 5, 110 35 C 115 100, 100 130, 90 150 C 70 120, 60 70, 35 30 Z" fill="#451a03"/>
          <circle cx="70" cy="50" r="30" fill="#ffedd5"/>
          <!-- Angry raised eyebrows & wide shocked eye -->
          <line x1="45" y1="40" x2="60" y2="48" stroke="#451a03" stroke-width="4" stroke-linecap="round"/>
          <circle cx="52" cy="54" r="6" fill="#0f172a"/>
          <!-- Mouth open in disbelief -->
          <ellipse cx="50" cy="72" rx="10" ry="7" fill="#7f1d1d"/>
          <!-- Blue shirt and arm gesturing 'WTF' -->
          <rect x="30" y="110" width="85" height="150" fill="#3b82f6" rx="10"/>
          <path d="M 30 140 Q -10 120 -20 150" stroke="#ffedd5" stroke-width="16" fill="none" stroke-linecap="round"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'woman-yelling-at-cat',
    name: 'Woman Yelling at Cat',
    category: 'two-panel',
    description: 'Emotional woman screaming and pointing, juxtaposed with confused dining cat',
    tags: ['cat', 'argument', 'screaming', 'confused', 'blame'],
    suggestedAspect: '16:9',
    defaultLayout: 'overlay',
    defaultTopText: 'YOU SAID YOU WOULD BE READY IN 5 MINUTES!',
    defaultBottomText: 'ME STILL LOOKING FOR MY LEFT SHOE:',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
        <!-- Left Panel: Distressed blonde woman -->
        <rect x="0" y="0" width="480" height="540" fill="#1e1b4b"/>
        <!-- Right Panel: Smug white cat at restaurant -->
        <rect x="480" y="0" width="480" height="540" fill="#0f172a"/>
        <line x1="480" y1="0" x2="480" y2="540" stroke="#f8fafc" stroke-width="6"/>

        <!-- Left: Crying blonde woman pointing -->
        <g transform="translate(60, 80)">
          <!-- Friend consoling in brunette hair -->
          <circle cx="120" cy="140" r="50" fill="#fed7aa"/>
          <path d="M 80 120 C 70 60, 160 60, 160 120 C 170 200, 150 240, 130 260 Z" fill="#3f1a07"/>
          <circle cx="125" cy="135" r="45" fill="#fed7aa"/>
          <rect x="90" y="200" width="90" height="220" fill="#111827" rx="12"/>

          <!-- Blonde woman crying and pointing -->
          <circle cx="260" cy="130" r="55" fill="#fed7aa"/>
          <!-- Blonde hair -->
          <path d="M 200 110 C 200 30, 320 30, 320 110 C 330 220, 310 260, 270 280 C 240 250, 220 180, 200 110 Z" fill="#facc15"/>
          <circle cx="260" cy="130" r="48" fill="#fde68a"/>
          <!-- Red eyes, tears streaming, screaming mouth -->
          <path d="M 235 125 Q 248 115 255 125" stroke="#b45309" stroke-width="4" fill="none"/>
          <circle cx="245" cy="132" r="6" fill="#b91c1c"/>
          <ellipse cx="255" cy="160" rx="18" ry="14" fill="#881337"/>
          <!-- Tears -->
          <path d="M 240 142 Q 235 160 238 180" stroke="#38bdf8" stroke-width="4" fill="none"/>
          <!-- Pointing Arm reaching right across to cat -->
          <path d="M 260 210 L 390 190 L 420 180" stroke="#fed7aa" stroke-width="24" stroke-linecap="round" fill="none"/>
          <polygon points="415,170 440,180 415,190" fill="#fed7aa"/>
        </g>

        <!-- Right: Smudge the white cat sitting behind salad -->
        <g transform="translate(540, 100)">
          <!-- Restaurant chair & table -->
          <rect x="60" y="240" width="280" height="180" fill="#475569" rx="8"/>
          <!-- Plate of greens / salad -->
          <ellipse cx="200" cy="250" rx="90" ry="24" fill="#f8fafc"/>
          <ellipse cx="200" cy="248" rx="75" ry="18" fill="#15803d"/>
          <circle cx="180" cy="245" r="8" fill="#22c55e"/>
          <circle cx="220" cy="246" r="10" fill="#16a34a"/>
          
          <!-- White cat head & ears -->
          <!-- Left ear -->
          <polygon points="130,120 150,60 180,110" fill="#f8fafc"/>
          <polygon points="140,115 155,75 170,110" fill="#fda4af"/>
          <!-- Right ear -->
          <polygon points="220,110 250,60 270,120" fill="#f8fafc"/>
          <polygon points="230,110 245,75 260,115" fill="#fda4af"/>
          <!-- Round white face -->
          <circle cx="200" cy="140" r="65" fill="#f8fafc"/>
          <!-- Confused / squinting eyes & flat face -->
          <ellipse cx="175" cy="130" rx="10" ry="5" fill="#ca8a04"/>
          <circle cx="175" cy="130" r="3" fill="#0f172a"/>
          <ellipse cx="225" cy="130" rx="10" ry="5" fill="#ca8a04"/>
          <circle cx="225" cy="130" r="3" fill="#0f172a"/>
          <polygon points="196,145 204,145 200,152" fill="#fda4af"/>
          <path d="M 188 156 Q 200 162 212 156" stroke="#64748b" stroke-width="3" fill="none"/>
          <!-- Whiskers -->
          <line x1="140" y1="148" x2="110" y2="142" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="140" y1="154" x2="110" y2="158" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="260" y1="148" x2="290" y2="142" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="260" y1="154" x2="290" y2="158" stroke="#cbd5e1" stroke-width="2"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'buff-doge-vs-cheems',
    name: 'Buff Doge vs Cheems',
    category: 'two-panel',
    description: 'Overpowered Chad Doge comparing with weeping modern Cheems',
    tags: ['doge', 'cheems', 'then vs now', 'strength', 'weakness'],
    suggestedAspect: '16:9',
    defaultLayout: 'overlay',
    defaultTopText: 'PROGRAMMERS IN 1970 WRITING APOLLO GUIDANCE IN 4KB',
    defaultBottomText: 'ME TODAY WHEN CHATGPT IS DOWN FOR 2 MINUTES',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
        <!-- Clean Split Background -->
        <rect width="480" height="540" fill="#f8fafc"/>
        <rect x="480" width="480" height="540" fill="#f1f5f9"/>
        <line x1="480" y1="0" x2="480" y2="540" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8 8"/>

        <!-- Left: Gigantic Buff Doge with 8-pack abs -->
        <g transform="translate(100, 40)">
          <!-- Buff Shoulders and Chest -->
          <path d="M 60 220 Q 150 150 240 220 L 260 420 L 40 420 Z" fill="#d97706"/>
          <!-- Huge Biceps -->
          <circle cx="40" cy="240" r="50" fill="#f59e0b"/>
          <circle cx="260" cy="240" r="50" fill="#f59e0b"/>
          <!-- Pectorals and 8-pack lines -->
          <rect x="100" y="220" width="48" height="40" rx="8" fill="#b45309" opacity="0.6"/>
          <rect x="152" y="220" width="48" height="40" rx="8" fill="#b45309" opacity="0.6"/>
          <rect x="105" y="270" width="42" height="35" rx="6" fill="#b45309" opacity="0.5"/>
          <rect x="153" y="270" width="42" height="35" rx="6" fill="#b45309" opacity="0.5"/>
          <rect x="110" y="315" width="38" height="32" rx="6" fill="#b45309" opacity="0.4"/>
          <rect x="152" y="315" width="38" height="32" rx="6" fill="#b45309" opacity="0.4"/>
          <!-- Doge Head on Buff Body -->
          <circle cx="150" cy="120" r="60" fill="#f59e0b"/>
          <polygon points="105,80 120,40 145,75" fill="#d97706"/>
          <polygon points="195,80 180,40 155,75" fill="#d97706"/>
          <!-- Doge iconic eyebrows and calm gaze -->
          <ellipse cx="130" cy="115" rx="10" ry="12" fill="#ffffff"/>
          <circle cx="133" cy="115" r="5" fill="#1e293b"/>
          <ellipse cx="170" cy="115" rx="10" ry="12" fill="#ffffff"/>
          <circle cx="167" cy="115" r="5" fill="#1e293b"/>
          <!-- Snout -->
          <ellipse cx="150" cy="140" rx="25" ry="18" fill="#ffedd5"/>
          <circle cx="150" cy="133" r="8" fill="#0f172a"/>
          <!-- Smile -->
          <path d="M 142 145 Q 150 152 158 145" stroke="#0f172a" stroke-width="3" fill="none"/>
        </g>

        <!-- Right: Weeping Cheems slouching and crying -->
        <g transform="translate(600, 200)">
          <!-- Cheems round potato body -->
          <ellipse cx="140" cy="200" rx="90" ry="70" fill="#d97706"/>
          <!-- Slouching head -->
          <circle cx="110" cy="120" r="50" fill="#f59e0b"/>
          <!-- Floppy sad ears -->
          <ellipse cx="75" cy="100" rx="18" ry="24" fill="#b45309" transform="rotate(-30 75 100)"/>
          <ellipse cx="145" cy="100" rx="18" ry="24" fill="#b45309" transform="rotate(30 145 100)"/>
          <!-- Teary crying eyes -->
          <circle cx="95" cy="115" r="7" fill="#0284c7"/>
          <circle cx="125" cy="115" r="7" fill="#0284c7"/>
          <!-- Big anime tear pools -->
          <path d="M 90 120 C 85 140, 100 140, 95 120" fill="#38bdf8"/>
          <path d="M 120 120 C 115 140, 130 140, 125 120" fill="#38bdf8"/>
          <!-- Round sad snout -->
          <ellipse cx="110" cy="140" rx="22" ry="14" fill="#ffedd5"/>
          <circle cx="110" cy="134" r="6" fill="#0f172a"/>
          <path d="M 104 148 Q 110 144 116 148" stroke="#0f172a" stroke-width="3" fill="none"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'change-my-mind',
    name: 'Change My Mind',
    category: 'reaction',
    description: 'Steven Crowder sitting at a table with coffee mug outdoors',
    tags: ['debate', 'opinion', 'unpopular', 'challenge', 'discussion'],
    suggestedAspect: '16:9',
    defaultLayout: 'overlay',
    defaultTopText: 'TABS ARE CLEARLY SUPERIOR TO SPACES',
    defaultBottomText: 'CHANGE MY MIND',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
        <!-- University Campus Grass & Trees -->
        <rect width="960" height="320" fill="#6ee7b7" opacity="0.6"/>
        <rect y="320" width="960" height="220" fill="#15803d"/>
        <!-- Trees in background -->
        <circle cx="120" cy="180" r="100" fill="#047857"/>
        <circle cx="850" cy="160" r="110" fill="#047857"/>
        <circle cx="700" cy="180" r="80" fill="#059669"/>
        
        <!-- Guy sitting in chair behind table -->
        <g transform="translate(380, 140)">
          <!-- Blue jacket -->
          <rect x="40" y="90" width="120" height="120" fill="#2563eb" rx="10"/>
          <!-- Head / Brown hair -->
          <circle cx="100" cy="50" r="35" fill="#fed7aa"/>
          <path d="M 70 45 C 70 15, 130 15, 130 45 C 135 60, 65 60, 70 45 Z" fill="#451a03"/>
          <circle cx="90" cy="50" r="4" fill="#0f172a"/>
          <circle cx="110" cy="50" r="4" fill="#0f172a"/>
          <path d="M 94 66 Q 100 70 106 66" stroke="#0f172a" stroke-width="2" fill="none"/>
        </g>

        <!-- Big White Folding Table with Sign Banner -->
        <polygon points="180,310 780,310 820,500 140,500" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
        <!-- Table edge line -->
        <line x1="140" y1="360" x2="820" y2="360" stroke="#cbd5e1" stroke-width="6"/>
        <!-- Coffee Mug on table -->
        <rect x="250" y="270" width="40" height="46" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>
        <path d="M 290 280 Q 310 293 290 306" stroke="#94a3b8" stroke-width="4" fill="none"/>
        <ellipse cx="270" cy="272" rx="16" ry="6" fill="#78350f"/>
        <!-- Sign text banner area on table front -->
        <rect x="200" y="380" width="560" height="95" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
        <text x="480" y="440" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="28" fill="#475569" text-anchor="middle" letter-spacing="4">CHANGE MY MIND</text>
      </svg>
    `)
  },
  {
    id: 'roll-safe-think',
    name: 'Roll Safe / Think About It',
    category: 'reaction',
    description: 'Smart guy tapping his head with a smug smile giving ridiculous life hacks',
    tags: ['smart', 'logic', 'lifehack', 'head tap', 'genius'],
    suggestedAspect: '1:1',
    defaultLayout: 'overlay',
    defaultTopText: 'YOU CANNOT LOSE MONEY TRADING STOCKS',
    defaultBottomText: 'IF YOU HAVE NO MONEY TO INVEST',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <!-- Dark Moody Background with subtle warm gradient -->
        <rect width="800" height="800" fill="#18181b"/>
        <circle cx="500" cy="350" r="320" fill="#78350f" opacity="0.3"/>
        
        <!-- Roll Safe Character -->
        <g transform="translate(160, 160)">
          <!-- Black leather jacket -->
          <path d="M 20 450 C 40 320, 100 280, 240 280 C 380 280, 440 320, 460 450 Z" fill="#09090b"/>
          <path d="M 180 280 L 240 400 L 300 280 Z" fill="#71717a"/>
          <circle cx="240" cy="360" r="14" fill="#eab308"/> <!-- gold chain -->
          
          <!-- Head -->
          <circle cx="260" cy="180" r="110" fill="#78350f"/>
          <!-- Short textured hair -->
          <path d="M 160 160 C 160 60, 360 60, 360 160 Z" fill="#1c1917"/>
          
          <!-- Smug Knowing Eyes & Raised Eyebrow -->
          <ellipse cx="230" cy="165" rx="16" ry="12" fill="#ffffff"/>
          <circle cx="235" cy="165" r="7" fill="#09090b"/>
          <ellipse cx="300" cy="165" rx="16" ry="12" fill="#ffffff"/>
          <circle cx="305" cy="165" r="7" fill="#09090b"/>
          <path d="M 215 140 Q 235 125 255 140" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M 285 135 Q 310 115 330 135" stroke="#1c1917" stroke-width="7" fill="none" stroke-linecap="round"/>
          
          <!-- Smug Grin with Dimple -->
          <path d="M 230 220 Q 275 250 320 215" stroke="#1c1917" stroke-width="6" fill="none" stroke-linecap="round"/>
          <circle cx="330" cy="210" r="4" fill="#451a03"/>
          
          <!-- Hand with Index Finger Tapping Temple -->
          <g transform="translate(320, 80)">
            <ellipse cx="40" cy="90" rx="35" ry="25" fill="#78350f"/>
            <!-- Pointed finger on forehead -->
            <rect x="0" y="40" width="26" height="60" rx="13" fill="#78350f" transform="rotate(-35 0 40)"/>
            <!-- Tapping vibration rings -->
            <path d="M -15 35 A 25 25 0 0 1 -15 5" stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M -30 45 A 40 40 0 0 1 -30 -10" stroke="#f59e0b" stroke-width="4" stroke-opacity="0.6" fill="none" stroke-linecap="round"/>
          </g>
        </g>
      </svg>
    `)
  },
  {
    id: 'disaster-girl',
    name: 'Disaster Girl',
    category: 'classic',
    description: 'Little girl smirking at the camera while house burns down in background',
    tags: ['chaos', 'fire', 'revenge', 'smirk', 'villain'],
    suggestedAspect: '4:3',
    defaultLayout: 'overlay',
    defaultTopText: 'DEPLOYING DIRECTLY TO PRODUCTION ON FRIDAY 5PM',
    defaultBottomText: 'AND LOGGING OFF FOR THE WEEKEND',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <!-- Fiery Burning House Scene in Background -->
        <rect width="800" height="600" fill="#450a0a"/>
        <!-- House Silhouette engulfed in fire -->
        <polygon points="120,400 240,250 360,400" fill="#18181b"/>
        <rect x="150" y="400" width="180" height="150" fill="#18181b"/>
        <!-- Raging Orange & Yellow Flames -->
        <path d="M 80 420 Q 160 160 220 280 Q 280 120 340 300 Q 400 180 440 420 Z" fill="#ea580c" opacity="0.9"/>
        <path d="M 120 400 Q 180 200 240 320 Q 300 160 360 380 Z" fill="#facc15" opacity="0.85"/>
        <circle cx="250" cy="220" r="70" fill="#ef4444" opacity="0.7"/>

        <!-- Firefighters watching in distance -->
        <rect x="420" y="420" width="20" height="60" fill="#0f172a"/>
        <circle cx="430" cy="410" r="8" fill="#eab308"/>

        <!-- Foreground: Disaster Girl smiling suspiciously at camera -->
        <g transform="translate(480, 220)">
          <!-- Dark hair -->
          <circle cx="160" cy="180" r="130" fill="#451a03"/>
          <!-- Face turned toward viewer -->
          <circle cx="140" cy="190" r="105" fill="#fed7aa"/>
          <path d="M 60 140 C 60 60, 230 60, 240 140 C 220 180, 220 220, 200 250 Z" fill="#292524"/>
          <circle cx="135" cy="185" r="95" fill="#fed7aa"/>
          <!-- Suspicious eyes looking sideways at camera -->
          <ellipse cx="105" cy="170" rx="16" ry="10" fill="#ffffff"/>
          <circle cx="112" cy="170" r="6" fill="#0f172a"/>
          <ellipse cx="165" cy="170" rx="16" ry="10" fill="#ffffff"/>
          <circle cx="172" cy="170" r="6" fill="#0f172a"/>
          <!-- Mischievous knowing smirk -->
          <path d="M 115 220 Q 145 240 180 215" stroke="#78350f" stroke-width="5" fill="none" stroke-linecap="round"/>
          <circle cx="185" cy="212" r="4" fill="#78350f"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    category: 'two-panel',
    description: '4-panel progression from normal small brain to cosmic enlightened deity',
    tags: ['brain', 'galaxy', 'iq', 'levels', 'expansion'],
    suggestedAspect: '1:1',
    defaultLayout: 'overlay',
    defaultTopText: 'NORMAL COFFEE',
    defaultBottomText: 'CHEWING RAW COFFEE BEANS FOR SPEED',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <!-- 4 Grid rows -->
        <rect width="800" height="800" fill="#09090b"/>
        <line x1="0" y1="200" x2="800" y2="200" stroke="#27272a" stroke-width="4"/>
        <line x1="0" y1="400" x2="800" y2="400" stroke="#27272a" stroke-width="4"/>
        <line x1="0" y1="600" x2="800" y2="600" stroke="#27272a" stroke-width="4"/>
        <line x1="450" y1="0" x2="450" y2="800" stroke="#27272a" stroke-width="4"/>

        <!-- Tier 1: Small dark brain -->
        <g transform="translate(560, 40)">
          <ellipse cx="60" cy="60" rx="45" ry="35" fill="#3f3f46"/>
          <path d="M 35 60 Q 60 70 85 60" stroke="#18181b" stroke-width="3" fill="none"/>
        </g>
        
        <!-- Tier 2: Glowing cyan brain -->
        <g transform="translate(560, 240)">
          <ellipse cx="60" cy="60" rx="50" ry="40" fill="#0284c7" filter="drop-shadow(0 0 12px #38bdf8)"/>
          <path d="M 30 60 Q 60 40 90 60" stroke="#bae6fd" stroke-width="4" fill="none"/>
          <circle cx="60" cy="60" r="10" fill="#e0f2fe"/>
        </g>

        <!-- Tier 3: Exploding light rays brain -->
        <g transform="translate(560, 440)">
          <circle cx="60" cy="60" r="55" fill="#7c3aed" filter="drop-shadow(0 0 18px #c084fc)"/>
          <line x1="60" y1="0" x2="60" y2="120" stroke="#f472b6" stroke-width="4"/>
          <line x1="0" y1="60" x2="120" y2="60" stroke="#f472b6" stroke-width="4"/>
          <line x1="15" y1="15" x2="105" y2="105" stroke="#f472b6" stroke-width="4"/>
          <circle cx="60" cy="60" r="25" fill="#ffffff"/>
        </g>

        <!-- Tier 4: Cosmic Transcendent Deity Brain -->
        <g transform="translate(560, 640)">
          <circle cx="60" cy="60" r="70" fill="#db2777" opacity="0.6"/>
          <circle cx="60" cy="60" r="50" fill="#fbbf24" filter="drop-shadow(0 0 25px #fbbf24)"/>
          <circle cx="60" cy="60" r="30" fill="#ffffff"/>
          <!-- Starburst rays -->
          <polygon points="60,-10 68,50 130,60 68,70 60,130 52,70 -10,60 52,50" fill="#ffffff"/>
        </g>
      </svg>
    `)
  },
  {
    id: 'modern-white-card',
    name: 'Clean Card Template',
    category: 'modern',
    description: 'Modern clean caption header card style for Twitter/Reddit',
    tags: ['clean', 'twitter', 'reddit', 'minimal', 'modern'],
    suggestedAspect: '1:1',
    defaultLayout: 'top-card',
    defaultTopText: 'No one:\nLiterally no one:\nMe at 3 AM organizing my desktop folders:',
    defaultBottomText: '',
    svgDataUri: svgToUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
        <rect width="800" height="800" fill="#1e293b"/>
        <circle cx="400" cy="400" r="180" fill="#3b82f6" opacity="0.2"/>
        <rect x="250" y="250" width="300" height="300" rx="20" fill="#334155" stroke="#475569" stroke-width="4"/>
        <circle cx="340" cy="350" r="30" fill="#facc15"/>
        <circle cx="460" cy="350" r="30" fill="#facc15"/>
        <path d="M 350 440 Q 400 480 450 440" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" fill="none"/>
      </svg>
    `)
  }
];
