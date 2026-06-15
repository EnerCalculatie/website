# Project Memory - EnerCalculatie Website

## Huidige Status & Context
Dit is de repository voor de marketingwebsite van EnerCalculatie, het slimme platform voor Nederlandse installateurs. Het project bestaat uit een React/Vite frontend en een lichte Express backend voor het veilig afhandelen van formulierverzendingen.

## Laatste Updates (Juni 2026)

### 1. Backend & E-mail Integratie (Resend)
- **Express Backend (`server.ts`):** Opgezet om API requests af te handelen.
- **Resend API (`contact.ts`):** Geïmplementeerd om e-mails veilig te versturen vanaf het contactformulier naar `info@enercalculatie.nl`.
- **Spambeveiliging:** Een visueel verborgen honeypot-veld (`subject`) is toegevoegd om bot-spam te voorkomen zonder gebruikers te hinderen.
- **Gebruikerservaring:** Formulierdata wordt nu tijdelijk in `sessionStorage` opgeslagen zodat bezoekers geen input verliezen bij een onbedoelde page refresh.

### 2. Infrastructuur & Deployment
- **Lokale Ontwikkeling:** `concurrently` is geïnstalleerd. Zowel de Vite frontend als de Express backend starten nu tegelijkertijd op via één commando: `npm run start:dev`. Vite proxy (`/api`) stuurt requests lokaal door naar poort `3001`.
- **Railway Productie Setup:** Build scripts toegevoegd aan `package.json`. 
  - Frontend bouwt naar statische bestanden in `/dist`.
  - Backend compileert via `esbuild` naar een standalone `server.js`.
  - De Express server serveert in de `production` environment direct de statische frontend map.

### Volgende geplande acties
- Toevoegen van de AVG documenten (Privacybeleid en Verwerkersovereenkomst) als statische pagina's (Story 1.3).