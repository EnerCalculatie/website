import { Router } from 'express';
import { Resend } from 'resend';
import { escapeHtml } from './emailUtils';

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();

router.post('/lead-magnet', async (req, res) => {
  const { email, company } = req.body || {};

  // Honeypot check: als het verborgen 'company'-veld is ingevuld, is het waarschijnlijk een bot.
  if (company) {
    return res.status(200).json({ message: 'Aanmelding succesvol verwerkt.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Vul een geldig e-mailadres in.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      to: ['info@enercalculatie.nl'],
      from: 'EnerCalculatie Website <website@enercalculatie.nl>',
      subject: 'Nieuwe aanmelding ROI-gids',
      replyTo: email,
      html: `
        <h1>Nieuwe aanmelding ROI-gids voor installateurs</h1>
        <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      `,
    });

    if (error) return res.status(400).json(error);
    res.status(200).json(data);
  } catch (_exception) {
    res.status(500).json({ error: 'Er is een onverwachte fout opgetreden.' });
  }
});

export default router;
