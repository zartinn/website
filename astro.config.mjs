import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from "@astrojs/prefetch";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), prefetch({
    throttle: 2
  }), react()]
});