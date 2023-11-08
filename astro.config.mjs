import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

const isDev = process.argv.includes('--dev');
console.log(isDev);

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
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
    vercel({
      imageService: true,
      edgeMiddleware: true,
    })
});