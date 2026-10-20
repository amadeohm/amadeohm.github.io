import { defineConfig } from 'astro/config';

// Keep local previews out of search indexes until a deployment origin is set.
const site = process.env.SITE_URL;
if (site) {
  const url = new URL(site);
  if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTP(S) origin, without a path, query or fragment.');
  }
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
