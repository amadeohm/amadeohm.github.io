import type { APIRoute } from 'astro';
import { locales, pathFor } from '../i18n';
import { publishedPosts } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();
  const paths = locales.flatMap(lang => [pathFor(lang, 'home'), pathFor(lang, 'research'), pathFor(lang, 'thesis'), pathFor(lang, 'bachelorThesis'), ...(posts.length > 0 ? [pathFor(lang, 'blog')] : [])]);
  paths.push(...posts.map(post => `/${post.data.lang}/blog/${post.data.slug}/`));
  const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('') : ''}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
