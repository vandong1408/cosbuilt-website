import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Dev only: read the live public content (products, articles, images) so local
      // previews look like production. Writes still need admin auth and local /api.
      proxy: process.env.DEV_PROXY === 'off' ? undefined : {
        '/uploads': { target: 'https://cosbuilt.vn', changeOrigin: true },
        '/api/sheets/data': { target: 'https://cosbuilt.vn', changeOrigin: true },
        '/api/rates': { target: 'https://cosbuilt.vn', changeOrigin: true },
        '/api/translate': { target: 'https://cosbuilt.vn', changeOrigin: true },
      },
    },
  };
});
