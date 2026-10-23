import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';

const root = resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : join(dir, entry.name)));
  return files.flat();
}
const files = await walk(root);
const pages = new Map(await Promise.all(files.filter(path => path.endsWith('.html')).map(async path => [path, await readFile(path, 'utf8')])));
const page = route => pages.get(join(root, route, 'index.html'));

test('both languages render complete readable pages without client JavaScript', () => {
  for (const [lang, research] of [['en', 'research'], ['es', 'investigacion']]) {
    for (const route of [lang, `${lang}/${research}`, `${lang}/${research}/predig`, `${lang}/${research}/dental-bone-loss`]) {
      const html = page(route);
      assert.ok(html, `Missing ${route}`);
      assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`));
      assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${route}: one main heading`);
      assert.match(html, /<main[^>]+id="main"/);
      assert.doesNotMatch(html, /<script\b|<astro-island\b|codex-preview|signin-with-chatgpt/);
    }
    assert.match(page(lang), /MareNostrum/);
    assert.match(page(lang), /SDU/);
    assert.match(page(lang), /class="profile-portrait"/);
    assert.match(page(lang), new RegExp(`alt="${lang === 'en' ? 'Portrait' : 'Retrato'}[^\"]+"`));
    assert.match(page(`${lang}/${research}/predig`), /PredIG|PREDIG/);
  }
});

test('all local links, styles, images and fragment targets resolve', async () => {
  for (const [file, html] of pages) {
    const route = '/' + relative(root, file).replace(/index\.html$/, '');
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (/^(?:https?:|mailto:|tel:|data:)/.test(value)) continue;
      const url = new URL(value, `https://local.test${route}`);
      let target = resolve(root, '.' + decodeURIComponent(url.pathname));
      assert.ok(target.startsWith(root), `Path escapes output: ${value}`);
      let targetStat;
      try { targetStat = await stat(target); } catch { assert.fail(`${route}: missing ${value}`); }
      if (targetStat.isDirectory()) target = join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const content = pages.get(target) ?? await readFile(target, 'utf8');
        assert.ok(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: missing fragment ${value}`);
      }
    }
  }
});

test('language switches preserve the current page', () => {
  for (const [en, es] of [['/en/', '/es/'], ['/en/research/', '/es/investigacion/'], ['/en/research/predig/', '/es/investigacion/predig/'], ['/en/research/dental-bone-loss/', '/es/investigacion/dental-bone-loss/']]) {
    assert.ok(page(en.slice(1)).includes(`href="${es}" lang="es" hreflang="es"`));
    assert.ok(page(es.slice(1)).includes(`href="${en}" lang="en" hreflang="en"`));
  }
});

test('research links to the bachelor thesis with its own metadata and document in both languages', () => {
  for (const [lang, research, label] of [['en', 'research', 'Bachelor’s thesis'], ['es', 'investigacion', 'Trabajo de fin de grado']]) {
    const index = page(`${lang}/${research}`);
    const detail = page(`${lang}/${research}/dental-bone-loss`);
    assert.ok(index.includes(`href="/${lang}/${research}/dental-bone-loss/"`));
    assert.ok(index.includes(label));
    assert.match(detail, /Isiah Zaplana Agut/);
    assert.match(detail, /Universitat Politècnica de Catalunya/);
    assert.match(detail, /href="\/documents\/bachelor-thesis.pdf"/);
    assert.doesNotMatch(detail, /href="\/documents\/master-thesis.pdf"/);
    assert.ok(detail.includes(`href="/${lang}/${research}/" aria-current="page"`));
    const master = page(`${lang}/${research}/predig`);
    assert.match(master, /href="\/documents\/master-thesis.pdf"/);
    assert.doesNotMatch(master, /href="\/documents\/bachelor-thesis.pdf"/);
    assert.match(master, /href="https:\/\/pmorenoz.github.io\/"/);
    assert.match(master, /Amadeu Huerta Moncho/);
    assert.match(master, /Tracing Shannon’s footprints across self-supervised learning/);
    assert.match(master, / · 2026<\/p>/);
    assert.match(index, /Universitat Pompeu Fabra · 2026/);
    assert.match(index, /Universitat Politècnica de Catalunya · 2025/);
  }
});

test('background keeps its introductions visible and places supporting text in disclosures', () => {
  for (const lang of ['en', 'es']) {
    const html = page(lang);
    assert.equal((html.match(/<details class="background-disclosure/g) ?? []).length, 2);
    assert.equal((html.match(/class="more-label"/g) ?? []).length, 2);
    const bachelor = html.match(/<details class="background-disclosure bachelor-disclosure">[\s\S]*?<\/details>/)?.[0];
    assert.ok(bachelor, `${lang}: missing bachelor disclosure`);
    assert.equal((bachelor.match(/<img\b/g) ?? []).length, 3, `${lang}: drone photographs belong to bachelor disclosure`);
  }
});

test('private drafts stay out of routes and navigation', () => {
  for (const html of pages.values()) assert.doesNotMatch(html, /Plantilla de artículo|Borrador interno/);
  assert.ok(!files.some(file => file.includes('/blog/plantilla/')));
});

test('published GenU article appears with its photographs and clean source link', () => {
  const index = page('en/blog');
  const spanishIndex = page('es/blog');
  const article = page('en/blog/genu-2026-copenhagen');
  assert.match(index, /GenU 2026 — Copenhagen/);
  assert.match(index, /class="post-preview"/);
  assert.match(spanishIndex, /GenU 2026 — Copenhagen/);
  assert.match(spanishIndex, /href="\/en\/blog\/genu-2026-copenhagen\/"/);
  assert.match(spanishIndex, /En inglés/);
  assert.match(article, /September 2026/);
  assert.match(article, /Carlsberg Akademi/);
  assert.equal((article.match(/event-photo-grid[\s\S]*?<\/div>/)?.[0].match(/<img\b/g) ?? []).length, 3);
  assert.match(article, /href="https:\/\/genu\.ai\/2026\/"/);
  assert.doesNotMatch(article, /utm_source|chatgpt\.com/);
});

test('download links point to the supplied document formats', async () => {
  const pdf = await readFile(join(root, 'documents/master-thesis.pdf'));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  const cv = await readFile(join(root, 'documents/amadeo-huerta-moncho-cv.pdf'));
  assert.equal(cv.subarray(0, 5).toString(), '%PDF-');
  const bachelor = await readFile(join(root, 'documents/bachelor-thesis.pdf'));
  assert.equal(bachelor.subarray(0, 5).toString(), '%PDF-');
  assert.match(page('en'), /mailto:amadeu\.huerta01@estudiant\.upf\.edu/);
});
