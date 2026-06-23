import { Router } from 'express';

const router = Router();

router.post('/newsletter', async (req, res) => {
  const { email, company } = req.body || {};

  // Honeypot check: als het verborgen 'company'-veld is ingevuld, is het waarschijnlijk een bot.
  if (company) {
    return res.status(200).json({ message: 'Inschrijving succesvol verwerkt.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Vul een geldig e-mailadres in.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const templateId = process.env.BREVO_TEMPLATE_ID;

  if (!apiKey || !listId || !templateId) {
    return res.status(500).json({ error: 'Nieuwsbrief-inschrijving is momenteel niet beschikbaar.' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(listId)],
        templateId: Number(templateId),
        redirectionUrl: 'https://www.enercalculatie.nl/nieuwsbrief-bevestigd',
      }),
    });

    // Brevo retourneert 204 No Content bij succes, of 400 als het e-mailadres al (dubbel-opt-in) bevestigd is in deze lijst.
    if (!response.ok && response.status !== 400) {
      const errorBody = await response.json().catch(() => null);
      return res.status(502).json({ error: errorBody?.message || 'Inschrijven via Brevo is mislukt.' });
    }

    res.status(200).json({ message: 'Check uw inbox om de inschrijving te bevestigen.' });
  } catch (_exception) {
    res.status(500).json({ error: 'Er is een onverwachte fout opgetreden.' });
  }
});

export default router;
