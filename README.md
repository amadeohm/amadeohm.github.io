# Amadeo Huerta Moncho

Personal academic website in English and Spanish. Built with Astro, TypeScript,
Markdown and plain CSS. The production site is static HTML, CSS and images, with
no client-side JavaScript, application server, database or external fonts.

## Editing research entries

Each thesis has one Markdown file per language under `src/content/research/`:

- Master's thesis: `en/master_thesis.md` and `es/master_thesis.md`.
- Bachelor's thesis: `en/dental-bone-loss.md` and `es/dental-bone-loss.md`.

Edit the fields at the top to change the title, summary (`description`), author,
supervisor, institution, programme, year or PDF link. Optional fields include
`subtitle`, `supervisorUrl`, `code` and `pageDescription` (the detail page's metadata
description, when it differs from the listing summary). The Markdown below those
fields is the body of the thesis page. PDFs are stored in `public/documents/`.

Both works use `ResearchEntry.astro` for their listings and
`src/pages/[lang]/[...page].astro` for their detail pages. Labels and translations
of interface text remain in `src/i18n.ts`; research content belongs in Markdown.




