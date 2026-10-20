import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    lang: z.enum(['en', 'es']),
    kind: z.enum(['home', 'masters', 'bachelors', 'thesis']),
    description: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'es']),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    translationKey: z.string(),
    published: z.coerce.date(),
    dateLabel: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

const research = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/research',
    // Translations share a URL slug, but each language needs its own content ID.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    lang: z.enum(['en', 'es']),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    titleLang: z.enum(['en', 'es']).default('en'),
    description: z.string(),
    author: z.string(),
    supervisor: z.string(),
    institution: z.string(),
    programme: z.string(),
    year: z.number().int(),
    pdf: z.string().startsWith('/documents/'),
  }),
});

export const collections = { pages, blog, research };
