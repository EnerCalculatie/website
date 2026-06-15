# AI Assistant Guidelines - EnerCalculatie Website

Dit bestand bevat de belangrijkste architectuur- en stijlregels voor de EnerCalculatie marketingwebsite. Raadpleeg deze regels voordat je code wijzigt of toevoegt.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Framer Motion (`motion/react`).
- **Backend:** Node.js, Express, TypeScript (via `tsx` in dev, `esbuild` voor productie).
- **Diensten:** Resend (E-mail API), Railway (Hosting).

## Commando's & Scripts
- `npm run start:dev` - Start beide servers lokaal (Frontend op :3000, Backend op :3001).
- `npm run dev` - Start alléén de frontend (Vite).
- `npm run dev:backend` - Start alléén de backend (Express via tsx).
- `npm run build` - Compileer frontend (`/dist`) en backend (`server.js`) voor de live omgeving.
- `npm run start` - Start de gecombineerde productie server (nodig voor Railway).

## Architectuur & Flow
1. **API Communicatie:** De frontend communiceert altijd via `/api/...` (bijv. `/api/contact`). Lokaal vangt de Vite proxy dit af en stuurt het naar poort 3001. In productie handelt de Express server dit direct af.
2. **Geheimen:** Gebruik áltijd `.env` voor keys (zoals `RESEND_API_KEY`). Plaats geen keys of credentials in de code.
3. **Productie Routing:** In `NODE_ENV=production` serveert de Express server de frontend vanuit de `/dist` map en fallbackt onbekende routes naar `index.html`.

## Design & Code Regels
- **Tablet/Mobile-First:** Raakvlakken (buttons, links) moeten minimaal 48px hoog/breed zijn. Tekst minimaal 16px voor leesbaarheid. Gebruik `aria-label` op icon-knoppen.
- **Animaties:** Houd animaties professioneel en subtiel. Gebruik `staggerChildren` en `spring` overgangen voor lijsten en grids via Framer Motion.
- **Console Logs:** Laat geen `console.log()` achter in productiecode. Vang errors netjes af in `try/catch` blokken en geef betekenisvolle UI feedback aan de gebruiker.
- **TypeScript:** Vermijd het gebruik van `any`. Definieer interfaces voor props en state.
- **Mock-data:** Plaats geen tijdelijke/mock-data of test-credentials in de uiteindelijke code.

## Veiligheid
- Alle formulieren moeten beschermd zijn met een (onzichtbare) 'honeypot' tegen bots.
- Gegevens in contactformulieren tijdelijk veiligstellen in `sessionStorage` voorkomt frustratie bij per ongeluk herladen.