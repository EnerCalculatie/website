import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/website/',
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
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/motion')) return 'vendor-motion';
            if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
            if (id.includes('node_modules/react-router')) return 'vendor-router';
            if (id.includes('node_modules/react')) return 'vendor-react';
          },
        },
      },
    },
    test: {
      // Playwright-E2E's (tests/*.spec.ts, draaien tegen een gebouwde site) en losse
      // agent-skills onder .claude/ zijn geen vitest-unittests — zonder deze exclude pakt
      // vitest's default glob (**/*.{test,spec}.ts) ze toch op en falen ze op een
      // ontbrekende/verkeerde runtime (geen browser, geen @playwright/test-context).
      exclude: ['node_modules/**', 'tests/**', '.claude/**', '.agents/**'],
    },
  };
});
