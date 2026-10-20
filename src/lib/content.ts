import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';

export async function publishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const seen = new Set<string>();
  for (const post of posts) {
    for (const key of [`route:${post.data.lang}/${post.data.slug}`, `translation:${post.data.lang}/${post.data.translationKey}`]) {
      if (seen.has(key)) throw new Error(`Duplicate blog ${key}`);
      seen.add(key);
    }
  }
  return posts.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}

export async function pageContent(lang: Locale, kind: 'home' | 'masters' | 'bachelors' | 'thesis') {
  const matches = await getCollection('pages', ({ data }) => data.lang === lang && data.kind === kind);
  if (matches.length !== 1) throw new Error(`Expected one ${lang}/${kind} content file`);
  return matches[0];
}

export async function researchContent(lang: Locale, slug: string) {
  const matches = await getCollection('research', ({ data }) => data.lang === lang && data.slug === slug);
  if (matches.length !== 1) throw new Error(`Expected one research entry for ${lang}/${slug}`);
  return matches[0];
}
