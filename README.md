# Amadeo Huerta Moncho

Personal academic website in English and Spanish. Built with Astro, TypeScript,
Markdown and plain CSS. The production site is static HTML, CSS and images, with
no client-side JavaScript, application server, database or external fonts.

## Local development

Use Node 24 LTS (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Astro, normally `http://127.0.0.1:4321`.
The root opens English; Spanish is at `/es/`. Language links preserve the page.
Astro 7 can start its development server in the background. Use
`npx astro dev status`, `npx astro dev logs` and `npx astro dev stop` to manage it.

```sh
npm test          # type check, build, generated-page and link checks
npm run build    # static output in dist/
npm run preview  # serve the production output locally
```

GitHub Actions runs `npm ci` and `npm test` for pushes and pull requests.

## Editing the site

- `src/content/pages/{en,es}/home.md`: biography and research interests.
- `src/content/pages/{en,es}/bachelors.md`: UPC background and SDU exchange.
- `src/content/pages/{en,es}/masters.md`: UPF master's curriculum, research training and interdisciplinary experience.
- `src/content/pages/{en,es}/thesis.md`: master's thesis question, approach and findings.
- `src/content/research/{en,es}/dental-bone-loss.md`: bachelor's thesis summary, metadata and full page content. Edit `description` for the Research listing; edit the text below the frontmatter for the detailed page.
- `src/components/BachelorFigures.astro`: bilingual captions and collapsible gallery of thesis figures 19 and 33. The extracted figures are in `src/assets/research/dental-bone-loss/`; selecting one opens a larger image.
- `src/i18n.ts`: translated navigation, summaries and interface text.
- `src/config.ts`: public contact and document links.
- `src/styles/global.css`: typography, spacing, responsive layout and print styles.
- `src/layouts/Base.astro`: shared header, footer and metadata.
- `src/assets/`: three original SDU photographs. Astro builds responsive WebP versions.
- `src/components/DronePhotos.astro`: optimized SDU photograph layout inside the UPC disclosure.
- `public/documents/`: the supplied master's thesis, bachelor's thesis and CV PDFs, copied unchanged.

The CV download uses the supplied PDF. The public name is Amadeo; the thesis retains its bibliographic author name, Amadeu.

The Email control reveals a selectable address and a separate `mailto:` link.
This keeps the address accessible even when a visitor has no configured email
application. The photo and email disclosures work without JavaScript.

Editorial drafts and decisions are in `docs/` and are not published.

## Publishing an essay

Add a Markdown file under `src/content/blog/`. `example.md` is an internal draft
and is excluded from the generated site. A post requires these fields:

```yaml
title: Your title
description: A short description
lang: en
slug: your-title
translationKey: a-shared-identifier
published: 2026-09-20
dateLabel: September 2026 # optional; use when only the month should be shown
draft: true
```

Replace the example date with the actual publication date. Set `draft: false`
when ready. The navigation gains a Writing/Escritos link when that language has
a published post. Empty blog indexes exist locally but have `noindex` and are
excluded from the sitemap. No placeholder essays are published.

Translations use separate files with the same `translationKey` and different
`lang` values. Their slugs can differ. Article language links appear only when
a published translation exists. Duplicate slugs and translation keys in a
language cause the build to fail.

## GitHub Pages

The publication repository is `amadeohm/amadeohm.github.io`, and the intended
website address is `https://amadeohm.github.io/`.
The `.github/workflows/pages.yml` workflow builds and checks the site on pushes
to `main`, or when started manually from Actions. It packages only `dist/`.
The build uses the production origin automatically.

**Publication is disabled by default.** The deploy job requires the repository
Actions variable `PAGES_PUBLISH_ENABLED` to equal `true`. Leaving that variable
unset or setting it to `false` allows preparation without publishing the site.
Deployments also require the exact repository name and the `main` branch.
Changing this variable to `false` stops future deployments; it does not remove
an already published website.

Before the first publication:

1. Review and approve the content and repository visibility. The repository
   currently remains private. GitHub Free requires a public repository for Pages;
   private-repository Pages requires an eligible paid plan.
2. Upload the reviewed version to `main` with publication still disabled.
3. In repository **Settings → Pages**, select **GitHub Actions** as the source.
4. Only after approval, set **Settings → Secrets and variables → Actions →
   Variables → PAGES_PUBLISH_ENABLED** to `true`.
5. Run **Actions → GitHub Pages → Run workflow** on `main`.

After activation, subsequent pushes to `main` deploy automatically if the
checks pass. The workflow uses GitHub's built-in token; no personal token is
needed.

To reproduce the production checks locally:

```sh
SITE_URL=https://amadeohm.github.io npm test
SITE_URL=https://amadeohm.github.io node scripts/check-pages-build.mjs
```

The same `dist/` can be hosted on another static host by building with its
`SITE_URL`. The current routes assume deployment at a domain root; a project
subpath needs an explicit base-path migration first.

Without `SITE_URL`, builds intentionally use `noindex`, omit canonical URLs and
produce a robots file that disallows indexing. With the final URL configured,
canonical URLs, language alternatives and the sitemap use that domain.

Before launch, review both languages at mobile and desktop widths, check the
document contents and run `npm test`. Browser visual review remains necessary;
the automated checks do not replace it.

## Previous version

The previous implementation is preserved in Git at commit `8cae380`.
The original implementation remains in the repository history. GitHub Pages
publishes only the built static site, not the source or editorial notes.
Making the repository public also exposes its tracked files and Git history.
