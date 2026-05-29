/**
 * Genera ilustraciones SVG de marca (estufas a pellet + escenas de hogar)
 * para no depender de imágenes externas. Ejecutar: node scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/img');
mkdirSync(outDir, { recursive: true });

const CREAM = '#f3ead9';
const WALL = '#ead9c0';

const flame = (cx, cy, s = 1) => `
  <g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M0,34 C-26,18 -20,-6 -6,-20 C-9,-4 6,-6 4,-22 C20,-10 22,16 0,34 Z" fill="#ff7a18"/>
    <path d="M0,30 C-15,18 -12,0 -3,-10 C-5,2 7,0 5,-12 C15,-2 14,18 0,30 Z" fill="#ffb627"/>
    <path d="M0,26 C-7,18 -6,6 0,-2 C-1,8 5,6 3,-3 C8,4 7,18 0,26 Z" fill="#ffe08a"/>
  </g>`;

/** Estufa estilizada. body = color del cuerpo, name archivo */
function stove(name, body, accent, dark = false) {
  const window = '#1c1410';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${CREAM}"/>
      <stop offset="1" stop-color="${WALL}"/>
    </linearGradient>
    <linearGradient id="bodyg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${body}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.62" r="0.5">
      <stop offset="0" stop-color="#ff9b3d" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ff9b3d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <rect x="0" y="640" width="800" height="160" fill="${dark ? '#cdb89c' : '#dcc7a6'}"/>
  <ellipse cx="400" cy="690" rx="220" ry="26" fill="#00000018"/>
  <!-- glow -->
  <circle cx="400" cy="430" r="240" fill="url(#glow)"/>
  <!-- cuerpo -->
  <g>
    <rect x="292" y="150" width="216" height="70" rx="16" fill="url(#bodyg)"/>
    <rect x="270" y="210" width="260" height="360" rx="34" fill="url(#bodyg)"/>
    <rect x="300" y="560" width="200" height="40" rx="10" fill="${accent}"/>
    <!-- patas -->
    <rect x="312" y="598" width="26" height="62" rx="8" fill="#2a2521"/>
    <rect x="462" y="598" width="26" height="62" rx="8" fill="#2a2521"/>
    <!-- ventana -->
    <rect x="312" y="262" width="176" height="226" rx="20" fill="${window}"/>
    <rect x="312" y="262" width="176" height="226" rx="20" fill="none" stroke="#00000022" stroke-width="10"/>
    ${flame(400, 430, 2.0)}
    <!-- detalle superior -->
    <circle cx="400" cy="190" r="10" fill="#00000022"/>
    <!-- manilla -->
    <rect x="498" y="350" width="14" height="58" rx="7" fill="${accent}"/>
  </g>
</svg>`;
  writeFileSync(resolve(outDir, `${name}.svg`), svg.trim());
}

/** Escena de hogar para galería */
function scene(name, hue, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue},32%,86%)"/>
      <stop offset="1" stop-color="hsl(${hue},30%,72%)"/>
    </linearGradient>
    <radialGradient id="g2" cx="0.5" cy="0.7" r="0.6">
      <stop offset="0" stop-color="#ffb05a" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#ffb05a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#w)"/>
  <rect x="0" y="650" width="1200" height="250" fill="hsl(${hue},26%,60%)"/>
  <!-- ventana de la sala -->
  <rect x="120" y="120" width="240" height="320" rx="10" fill="hsl(${hue},40%,90%)" stroke="#ffffff" stroke-width="14"/>
  <line x1="240" y1="120" x2="240" y2="440" stroke="#ffffff" stroke-width="10"/>
  <line x1="120" y1="280" x2="360" y2="280" stroke="#ffffff" stroke-width="10"/>
  <!-- sofá -->
  <rect x="760" y="470" width="360" height="150" rx="30" fill="hsl(${hue},35%,55%)"/>
  <rect x="740" y="430" width="80" height="200" rx="28" fill="hsl(${hue},35%,50%)"/>
  <rect x="1060" y="430" width="80" height="200" rx="28" fill="hsl(${hue},35%,50%)"/>
  <!-- alfombra -->
  <ellipse cx="600" cy="760" rx="430" ry="70" fill="hsl(${hue},40%,66%)"/>
  <!-- estufa -->
  <circle cx="430" cy="600" r="200" fill="url(#g2)"/>
  <rect x="360" y="430" width="150" height="250" rx="26" fill="#2a2521"/>
  <rect x="384" y="470" width="102" height="150" rx="14" fill="#140d0a"/>
  <path d="M435,612 C415,598 418,566 430,548 C427,566 444,562 441,544 C456,560 455,596 435,612 Z" fill="#ffb627"/>
  <rect x="372" y="680" width="18" height="40" rx="6" fill="#1a1614"/>
  <rect x="480" y="680" width="18" height="40" rx="6" fill="#1a1614"/>
  <text x="600" y="860" font-family="Georgia, serif" font-size="34" fill="#ffffffcc" text-anchor="middle">${label}</text>
</svg>`;
  writeFileSync(resolve(outDir, `${name}.svg`), svg.trim());
}

/** Estufa de exterior tipo torre con llama vertical (funciona sin electricidad). */
function tower(name, body, accent) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#14202b"/>
      <stop offset="1" stop-color="#2c2723"/>
    </linearGradient>
    <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${body}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <radialGradient id="tglow" cx="0.5" cy="0.32" r="0.4">
      <stop offset="0" stop-color="#ff9b3d" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ff9b3d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#sky)"/>
  <rect x="0" y="660" width="800" height="140" fill="#3a3531"/>
  <ellipse cx="400" cy="700" rx="190" ry="24" fill="#00000033"/>
  <circle cx="400" cy="250" r="190" fill="url(#tglow)"/>
  <!-- columna de vidrio con llama vertical -->
  <rect x="356" y="170" width="88" height="320" rx="14" fill="#120c08"/>
  <rect x="356" y="170" width="88" height="320" rx="14" fill="none" stroke="#00000033" stroke-width="8"/>
  <g transform="translate(400,470)">
    <path d="M0,0 C-34,-90 -22,-150 -8,-250 C-12,-150 14,-150 8,-250 C26,-150 34,-80 0,0 Z" fill="#ff7a18"/>
    <path d="M0,-10 C-20,-90 -12,-150 -3,-220 C-6,-150 10,-150 6,-215 C18,-140 22,-80 0,-10 Z" fill="#ffb627"/>
    <path d="M0,-20 C-10,-80 -6,-130 0,-180 C-2,-130 6,-130 4,-175 C10,-110 9,-70 0,-20 Z" fill="#ffe08a"/>
  </g>
  <!-- base / cuerpo -->
  <rect x="336" y="486" width="128" height="120" rx="16" fill="url(#tg)"/>
  <rect x="320" y="600" width="160" height="34" rx="10" fill="${accent}"/>
  <!-- tapa superior -->
  <rect x="344" y="150" width="112" height="30" rx="10" fill="url(#tg)"/>
  <circle cx="400" cy="165" r="6" fill="#00000033"/>
  <!-- patas -->
  <rect x="346" y="632" width="22" height="40" rx="7" fill="#1a1614"/>
  <rect x="432" y="632" width="22" height="40" rx="7" fill="#1a1614"/>
</svg>`;
  writeFileSync(resolve(outDir, `${name}.svg`), svg.trim());
}

/** Escena de terraza / patio de noche con la torre. */
function patio(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="ps" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#101b26"/>
      <stop offset="1" stop-color="#243042"/>
    </linearGradient>
    <radialGradient id="pg" cx="0.5" cy="0.55" r="0.5">
      <stop offset="0" stop-color="#ffb05a" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#ffb05a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#ps)"/>
  <!-- deck de madera -->
  <rect x="0" y="640" width="1200" height="260" fill="#6b4a2f"/>
  <g stroke="#5a3e27" stroke-width="3">
    <line x1="0" y1="700" x2="1200" y2="700"/><line x1="0" y1="770" x2="1200" y2="770"/><line x1="0" y1="840" x2="1200" y2="840"/>
  </g>
  <!-- barandilla -->
  <rect x="80" y="430" width="1040" height="10" rx="5" fill="#3a2a1c"/>
  <!-- estrellas -->
  <g fill="#ffffff88"><circle cx="180" cy="120" r="2"/><circle cx="340" cy="80" r="2.5"/><circle cx="900" cy="140" r="2"/><circle cx="1050" cy="90" r="2.5"/><circle cx="640" cy="60" r="2"/></g>
  <!-- glow + torre -->
  <circle cx="600" cy="540" r="240" fill="url(#pg)"/>
  <rect x="566" y="360" width="68" height="240" rx="12" fill="#120c08"/>
  <g transform="translate(600,580)">
    <path d="M0,0 C-26,-70 -16,-120 -6,-190 C-9,-120 11,-120 6,-190 C20,-110 26,-60 0,0 Z" fill="#ff7a18"/>
    <path d="M0,-10 C-14,-70 -9,-120 0,-160 C-4,-110 8,-110 5,-160 C14,-100 16,-60 0,-10 Z" fill="#ffd27a"/>
  </g>
  <rect x="552" y="596" width="96" height="80" rx="12" fill="#2a2521"/>
  <text x="600" y="860" font-family="Georgia, serif" font-size="32" fill="#ffffffcc" text-anchor="middle">Terraza todo el año</text>
</svg>`;
  writeFileSync(resolve(outDir, `${name}.svg`), svg.trim());
}

// Estufas de exterior
tower('forge-tower-black', '#2c2723', '#15110e');
tower('forge-tower-steel', '#7d848a', '#4f565c');
patio('terraza');

// Productos
stove('aurora-black', '#2c2723', '#15110e', true);
stove('aurora-ivory', '#efe7d9', '#d9cbb3');
stove('nordic-steel', '#8b9298', '#5d646b');
stove('ember-red', '#9a2b1d', '#5f1810');
stove('pine-green', '#33473a', '#1f2e26');
stove('insert-slim', '#1f1b18', '#0e0b09', true);
stove('caldera-pro', '#3a3531', '#211d1a', true);
stove('mini-loft', '#c97d3a', '#8a5424');

// Galería / lifestyle
scene('living', 24, 'Living cálido');
scene('cabin', 18, 'Refugio de montaña');
scene('loft', 200, 'Loft urbano');
scene('dining', 36, 'Comedor familiar');
scene('bedroom', 280, 'Dormitorio acogedor');
scene('office', 150, 'Home office');

// Hero
const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
  <defs>
    <radialGradient id="hg" cx="0.62" cy="0.55" r="0.7">
      <stop offset="0" stop-color="#ff8a2a" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="#c84515" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#1a1614" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1100" fill="#15110e"/>
  <circle cx="980" cy="600" r="640" fill="url(#hg)"/>
  ${flame(980, 640, 6.2).replace(/translate\(980,640\)/, 'translate(980,720)')}
</svg>`;
writeFileSync(resolve(outDir, 'hero.svg'), hero.trim());

console.log('Assets SVG generados en public/img/');
