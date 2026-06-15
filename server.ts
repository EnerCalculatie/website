import 'dotenv/config'; // Dit laadt de .env direct in tijdens de import-fase

import express from 'express';
import contactRouter from './contact';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Gebruik de contact router voor alle /api routes
app.use('/api', contactRouter);
 
// Serveer de frontend in productie
if (process.env.NODE_ENV === 'production') {
  // Serveer de statische bestanden uit de 'dist' map
  app.use(express.static(path.join(__dirname, 'dist')));
 
  // Voor alle andere requests, stuur de index.html terug (voor client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Simpele welkomstpagina voor de backend in development
  app.get('/', (req, res) => {
    res.send('✅ EnerCalculatie Backend API draait succesvol! Open http://localhost:3000 in je browser om de website te bekijken.');
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Backend server luistert op http://localhost:${port}`);
});