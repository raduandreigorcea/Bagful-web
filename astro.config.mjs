// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public address of the site. There is no custom domain yet, so this
// defaults to the Vercel one; set SITE_URL in the host's environment when a
// domain arrives and the sitemap, canonical links and share cards follow.
const site = process.env.SITE_URL ?? 'https://bagful-web.vercel.app';

export default defineConfig({
	site,
	integrations: [sitemap()],
});
