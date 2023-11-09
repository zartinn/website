import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from "@astrojs/prefetch";
import node from "@astrojs/node";
import netlify from '@astrojs/netlify/functions';

const isDev = process.argv.includes('--dev');

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), prefetch()],
  redirects: {
    '/de': '/',
    '/de/[...page]': '/[...page]'
  },
  build: {
    inlineStylesheets: 'never'
  },
  adapter: isDev ?
    node({
      mode: 'standalone',
    }) :
    netlify()
});