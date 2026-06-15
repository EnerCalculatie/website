import { Router } from 'express';
import { Resend } from 'resend';

// Initialiseer Resend met je API key (deze moet in je .env bestand staan)
const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();

router.post('/contact', async (req, res) => {
  // Fallback naar een leeg object voor het geval req.body niet goed geparsed wordt
  const { firstName, lastName, email, company, message, subject } = req.body || {};

  // Log de ontvangen data voor debugging op Railway
  console.log('Received contact form submission:', { firstName, lastName, email, company, message, subject });

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
    console.error('Validation Error: Missing required fields:', missingFields); // Log de fout op de server
    return res.status(400).json({ error: `Niet alle verplichte velden zijn ingevuld: ${missingFields.join(', ')}.` });
  }

  try {
    const { data, error } = await resend.emails.send({
      // BELANGRIJK: Vervang 'info@enercalculatie.nl' door het e-mailadres waar je de aanvragen wilt ontvangen.
      to: ['info@enercalculatie.nl'],

      // BELANGRIJK: Vervang 'website@enercalculatie.nl' door een geverifieerd domein in Resend.
      // Voor testen kun je 'onboarding@resend.dev' gebruiken.
      from: 'EnerCalculatie Website <website@enercalculatie.nl>',

      subject: 'Aanvraag via website',
      reply_to: email,
      html: `
        <h1>Nieuwe contactaanvraag</h1>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Bedrijf:</strong> ${company || 'Niet opgegeven'}</p>
        <hr>
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (exception) {
    res.status(500).json({ error: 'Er is een onverwachte fout opgetreden.' });
  }
});

export default router;