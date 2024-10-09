import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), auth()],
  output: 'server',
  adapter: vercel()
});