import { defineConfig } from '@playwright/test';

// Draait tegen de lokaal gebouwde site (npm run build && npm run start), niet tegen productie —
// zo verifieert de test exact wat er bij de volgende deploy live gaat, incl. server.ts-redirects.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3001',
    // server.ts forceert https via x-forwarded-proto (Railway zet deze header normaal via de
    // proxy) — zonder deze header redirect elke lokale request in NODE_ENV=production naar
    // https://localhost:3001, wat hier geen TLS heeft.
    extraHTTPHeaders: { 'x-forwarded-proto': 'https' },
  },
  webServer: {
    // node server.js rechtstreeks i.p.v. npm run start: de npm-wrapper op Windows vertraagt/
    // verstoort Playwright's readiness-detectie op de webServer-poort.
    // NODE_ENV=production vereist: zonder deze env-var serveert server.ts de kale
    // dev-welkomstpagina i.p.v. dist/ (zie server.ts, if (process.env.NODE_ENV === 'production')).
    command: 'node server.js',
    // `port` i.p.v. `url`: server.ts forceert https via x-forwarded-proto (301 op elke lokale
    // request zonder die header) — een url-gebaseerde readiness-check op http:// zou daardoor
    // altijd als "niet klaar" gezien worden. Een kale TCP-verbinding op de poort volstaat.
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: { NODE_ENV: 'production' },
  },
});
