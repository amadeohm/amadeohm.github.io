import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const origin = 'https://amadeohm.github.io';
assert.equal(process.env.SITE_URL, origin, 'Build with the intended GitHub Pages origin');
const root = resolve('dist');
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(entry => entry.isDirectory()
    ? htmlFiles(join(directory, entry.name))
    : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []));
  return paths.flat();
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(robots.includes('Allow: /'));
assert.ok(!robots.includes('Disallow: /'));
let checked = 0;
for (const file of await htmlFiles(root)) {
  const path = relative(root, file).replaceAll('\\', '/');
  const html = await readFile(file, 'utf8');
  if (path === 'index.html' || path === '404.html') continue;
  const url = `${origin}/${path.replace(/index\.html$/, '')}`;
  assert.ok(html.includes('<meta name="robots" content="index, follow">'), `${path}: unexpected noindex`);
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`), `${path}: wrong canonical URL`);
  assert.ok(!html.includes('http://localhost') && !html.includes('http://127.0.0.1'), `${path}: development URL`);
  assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${path}: missing from sitemap`);
  checked++;
}
assert.ok(checked > 0, 'No production pages found');
console.log(`GitHub Pages build verified: ${checked} pages at ${origin}`);
