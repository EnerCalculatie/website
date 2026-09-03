import { defineConfig } from '@playwright/test';

// Draait tegen de lokaal gebouwde site (npm run build), statisch geserveerd met `serve` — dit
// bootst GitHub Pages' eigen clean-URL-lookup na (/blog/slug -> blog/slug.html), dus dit test
// exact wat de volgende GH Pages-deploy live zet. Redirects/securityheaders/Umami-proxy zitten
// sinds 2026-09-03 niet meer in de build maar in de Cloudflare Worker (cloudflare-worker/) —
// die draait hier niet mee, test die apart tegen de live/staging-URL.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
  },
  webServer: {
    command: 'npx serve -l 3001 dist',
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
