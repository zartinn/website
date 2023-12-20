import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

const isDev = process.argv.includes('--dev');

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: 'viewport'
  },
  output: 'static',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'never'
  }
});