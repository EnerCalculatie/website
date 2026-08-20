import { Router } from 'express';
import { Resend } from 'resend';
import { escapeHtml } from './emailUtils';

// Initialiseer Resend met je API key (deze moet in je .env bestand staan)
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

const router = Router();

router.post('/contact', async (req, res) => {
  // Fallback naar een leeg object voor het geval req.body niet goed geparsed wordt
  const { firstName, lastName, email, company, message, subject } = req.body || {};

  if (!process.env.RESEND_API_KEY) {
    console.error('CRITICAL: Kan geen contactaanvraag verzenden. RESEND_API_KEY ontbreekt in de environment variables.');
    return res.status(500).json({ error: 'Server configuratiefout: e-mailverzending is tijdelijk niet beschikbaar.' });
  }

  // Honeypot check: if the hidden 'subject' field is filled, it's likely a bot.
  if (subject) {
    // Silently succeed to trick the bot.
    return res.status(200).json({ message: 'Bericht succesvol verzonden.' });
  }

  const missingFields = [];
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!email) missingFields.push('email');
  if (!message) missingFields.push('message');
  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Niet alle verplichte velden zijn ingevuld: ${missingFields.join(', ')}.` });
  }

  try {
    const { data, error } = await resend.emails.send({
      to: ['info@enercalculatie.nl'],
      from: 'EnerCalculatie Website <website@enercalculatie.nl>',

      subject: 'Aanvraag via website',
      replyTo: email,
      html: `
        <h1>Nieuwe contactaanvraag</h1>
        <p><strong>Naam:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Bedrijf:</strong> ${company ? escapeHtml(company) : 'Niet opgegeven'}</p>
        <hr>
        <p><strong>Bericht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (_exception) {
    res.status(500).json({ error: 'Er is een onverwachte fout opgetreden.' });
  }
});

export default router;