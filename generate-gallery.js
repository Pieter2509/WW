/**
 * generate-gallery.js
 *
 * Scant alle mappen met een jaarnaam (2019, 2020, … 2099) in de root van de repo.
 * Voor elk jaar leest het alle afbeeldingsbestanden (.jpg, .jpeg, .png, .webp, .gif).
 * Vervolgens vervangt het de galerij-sectie én de filterknoppen in index.html.
 *
 * Gebruik:
 *   node generate-gallery.js
 */

const fs   = require('fs');
const path = require('path');

// ─── Configuratie ────────────────────────────────────────────────────────────

const ROOT       = __dirname;
const INDEX_PATH = path.join(ROOT, 'index.html');
const IMG_EXTS   = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

// Achtergrondkleuren per jaar (hetzelfde palet als de originele CSS).
// Voeg hier een nieuwe regel toe voor een nieuw jaar als je een eigen kleur wilt.
const YEAR_COLORS = {
  2019: 'linear-gradient(135deg, #2a3220 0%, #0d100c 100%)',
  2020: 'linear-gradient(135deg, #1d2820 0%, #0d100c 100%)',
  2021: 'linear-gradient(135deg, #3a2418 0%, #0d100c 100%)',
  2022: 'linear-gradient(135deg, #2a3826 0%, #0d100c 100%)',
  2023: 'linear-gradient(135deg, #3a2e1a 0%, #0d100c 100%)',
  2024: 'linear-gradient(135deg, #1f2a2e 0%, #0d100c 100%)',
  2025: 'linear-gradient(135deg, #3a1d12 0%, #0d100c 100%)',
  2026: 'radial-gradient(circle at 70% 30%, rgba(255,94,31,0.4), transparent 60%), linear-gradient(135deg, #2a1a0e 0%, #0d100c 100%)',
};

// Standaard achtergrond voor jaren die nog niet in YEAR_COLORS staan
const DEFAULT_COLOR = 'linear-gradient(135deg, #1a1e18 0%, #0d100c 100%)';

// Layouts die cyclisch herhaald worden per jaar
// 'large' = 6 kolommen × 2 rijen, 'tall' = 4 kolommen × 2 rijen,
// 'wide'  = 6 kolommen × 1 rij,   ''     = normaal (4 kolommen × 1 rij)
const LAYOUT_CYCLE = ['large', '', 'tall', '', 'wide', '', '', 'wide', 'tall', ''];

// ─── Hulpfuncties ────────────────────────────────────────────────────────────

/** Geeft alle afbeeldingsbestanden in een map, gesorteerd op naam. */
function getImages(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => IMG_EXTS.has(path.extname(f).toLowerCase()))
      .sort();
  } catch {
    return [];
  }
}

/** Geeft alle jaarmappen gesorteerd (bijv. ['2019', '2020', …]). */
function getYearDirs() {
  return fs.readdirSync(ROOT)
    .filter(name => /^20\d{2}$/.test(name))
    .filter(name => fs.statSync(path.join(ROOT, name)).isDirectory())
    .sort();
}

/** Bouwt één <div class="photo …"> element. */
function buildPhotoDiv(year, index, filename, layout) {
  const num     = String(index + 1).padStart(2, '0');
  const imgPath = `${year}/${filename}`;
  const cls     = ['photo', `y${year}`, layout].filter(Boolean).join(' ');
  const label   = `${year} / ${num}`;
  // Bestandsnaam zonder extensie als caption-fallback
  const caption = path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/^\d+\s*/, '');

  return `    <div class="${cls}" data-year="${year}" style="--photo-bg: url('${imgPath}')">` +
    `<div class="photo-inner">` +
    `<div class="photo-overlay">` +
    `<div class="photo-year">${label}</div>` +
    `<div class="photo-caption">${caption || 'Weekendje Weg'}</div>` +
    `</div></div></div>`;
}

/** Bouwt de volledige galerij-HTML voor alle jaren. */
function buildGalleryHTML(years) {
  const blocks = [];

  for (const year of years) {
    const dir    = path.join(ROOT, year);
    const images = getImages(dir);

    if (images.length === 0) continue;

    const divs = images.map((file, i) => {
      const layout = LAYOUT_CYCLE[i % LAYOUT_CYCLE.length];
      return buildPhotoDiv(year, i, file, layout);
    });

    blocks.push(`\n    <!-- ${year} -->`);
    blocks.push(...divs);
    blocks.push('');
  }

  return blocks.join('\n');
}

/** Bouwt de filterknoppen HTML. */
function buildFilterHTML(years) {
  const buttons = ['    <button class="filter-btn active" data-filter="all">Alles</button>'];
  for (const year of years) {
    const short = `'${year.slice(2)}`;
    buttons.push(`    <button class="filter-btn" data-filter="${year}">${short}</button>`);
  }
  return buttons.join('\n');
}

/** Bouwt de CSS-blokken voor jaren die nog geen kleur hebben in de HTML. */
function buildColorCSS(years) {
  return years.map(year => {
    const color = YEAR_COLORS[year] || DEFAULT_COLOR;
    return `.y${year} .photo-inner { background: ${color}; }`;
  }).join('\n  ');
}

// ─── Hoofd ───────────────────────────────────────────────────────────────────

const years = getYearDirs();
console.log(`📁 Gevonden jaarmappen: ${years.join(', ') || '(geen)'}`);

if (years.length === 0) {
  console.log('⚠️  Geen jaarmappen gevonden, index.html niet gewijzigd.');
  process.exit(0);
}

let html = fs.readFileSync(INDEX_PATH, 'utf8');

// 1. Vervang filterknoppen
const filterStart = '<!-- GALLERY-FILTERS-START -->';
const filterEnd   = '<!-- GALLERY-FILTERS-END -->';
const newFilters  = `${filterStart}\n${buildFilterHTML(years)}\n  ${filterEnd}`;

if (html.includes(filterStart)) {
  html = html.replace(
    new RegExp(`${filterStart}[\\s\\S]*?${filterEnd}`),
    newFilters
  );
} else {
  // Fallback: vervang de volledige filter-bar inhoud
  html = html.replace(
    /(<div class="filter-bar"[^>]*>)([\s\S]*?)(<\/div>)/,
    (_, open, _inner, close) => `${open}\n  ${newFilters}\n  ${close}`
  );
}

// 2. Vervang galerij-items
const galleryStart = '<!-- GALLERY-ITEMS-START -->';
const galleryEnd   = '<!-- GALLERY-ITEMS-END -->';
const newItems     = `${galleryStart}\n${buildGalleryHTML(years)}\n  ${galleryEnd}`;

if (html.includes(galleryStart)) {
  html = html.replace(
    new RegExp(`${galleryStart}[\\s\\S]*?${galleryEnd}`),
    newItems
  );
} else {
  // Fallback: vervang alles tussen <div class="gallery"…> en </div>
  html = html.replace(
    /(<div class="gallery"[^>]*>)([\s\S]*?)(<\/div>\s*<\/section>)/,
    (_, open, _inner, close) => `${open}\n  ${newItems}\n  ${close}`
  );
}

// 3. Vervang placeholder kleur-CSS als aanwezig
const cssStart = '/* GALLERY-COLORS-START */';
const cssEnd   = '/* GALLERY-COLORS-END */';
if (html.includes(cssStart)) {
  html = html.replace(
    new RegExp(`\\/\\* GALLERY-COLORS-START \\*\\/[\\s\\S]*?\\/\\* GALLERY-COLORS-END \\*\\/`),
    `${cssStart}\n  ${buildColorCSS(years)}\n  ${cssEnd}`
  );
}

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log(`✅ index.html bijgewerkt met ${years.length} jaar/jaren en de bijbehorende foto's.`);

// Log samenvatting
for (const year of years) {
  const count = getImages(path.join(ROOT, year)).length;
  console.log(`   ${year}: ${count} foto('s)`);
}
