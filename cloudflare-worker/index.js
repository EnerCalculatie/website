// Cloudflare Worker — vervangt de dode Express-routes (contact.ts, leadMagnet.ts,
// newsletter.ts) sinds de site op GitHub Pages (static hosting) draait en geen
// backend meer heeft. Eén Worker, gerouteerd op pathname, één deploy.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sendResend(env, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error('Resend gaf geen geldige JSON terug', res.status, text.slice(0, 500));
    data = { error: 'Onverwacht antwoord van Resend' };
  }
  return { ok: res.ok, status: res.status, data };
}

async function handleContact(request, env) {
  if (!env.RESEND_API_KEY) {
    console.error('CRITICAL: RESEND_API_KEY ontbreekt als Worker secret.');
    return json({ error: 'Server configuratiefout: e-mailverzending is tijdelijk niet beschikbaar.' }, 500);
  }

  const body = await request.json().catch(() => ({}));
  const { firstName, lastName, email, company, message, subject } = body || {};

  // Honeypot: stil succes voorwenden richting bots.
  if (subject) {
    return json({ message: 'Bericht succesvol verzonden.' }, 200);
  }

  const missingFields = [];
  if (!firstName) missingFields.push('firstName');
  if (!lastName) missingFields.push('lastName');
  if (!email) missingFields.push('email');
  if (!message) missingFields.push('message');
  if (missingFields.length > 0) {
    return json({ error: `Niet alle verplichte velden zijn ingevuld: ${missingFields.join(', ')}.` }, 400);
  }

  const result = await sendResend(env, {
    to: ['info@enercalculatie.nl'],
    from: 'EnerCalculatie Website <website@enercalculatie.nl>',
    subject: 'Aanvraag via website',
    reply_to: email,
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
  return json(result.data, result.ok ? 200 : result.status);
}

async function handleLeadMagnet(request, env) {
  if (!env.RESEND_API_KEY) {
    console.error('CRITICAL: RESEND_API_KEY ontbreekt als Worker secret.');
    return json({ error: 'Server configuratiefout: e-mailverzending is tijdelijk niet beschikbaar.' }, 500);
  }

  const body = await request.json().catch(() => ({}));
  const { email, company } = body || {};

  if (company) {
    return json({ message: 'Aanmelding succesvol verwerkt.' }, 200);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return json({ error: 'Vul een geldig e-mailadres in.' }, 400);
  }

  const lead = await sendResend(env, {
    to: [email],
    from: 'EnerCalculatie <info@enercalculatie.nl>',
    subject: 'Uw ROI-gids voor installateurs',
    html: `
      <h1>Bedankt voor uw aanmelding</h1>
      <p>Hierbij de ROI-gids met rekenmethodes en voorbeeldberekeningen voor de terugverdientijd van zonnepanelen, thuisbatterijen en warmtepompen — als bijlage bij deze e-mail.</p>
      <p>Vragen over een specifiek dossier? Antwoord gerust op deze e-mail.</p>
    `,
    attachments: [
      {
        filename: 'EnerCalculatie-ROI-gids.pdf',
        path: 'https://www.enercalculatie.nl/roi-gids.pdf',
      },
    ],
  });
  if (!lead.ok) return json(lead.data, lead.status);

  const notify = await sendResend(env, {
    to: ['info@enercalculatie.nl'],
    from: 'EnerCalculatie Website <website@enercalculatie.nl>',
    subject: 'Nieuwe aanmelding ROI-gids',
    reply_to: email,
    html: `
      <h1>Nieuwe aanmelding ROI-gids voor installateurs</h1>
      <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    `,
  });
  return json(notify.data, notify.ok ? 200 : notify.status);
}

async function handleNewsletter(request, env) {
  const body = await request.json().catch(() => ({}));
  const { email, company } = body || {};

  if (company) {
    return json({ message: 'Inschrijving succesvol verwerkt.' }, 200);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return json({ error: 'Vul een geldig e-mailadres in.' }, 400);
  }

  const apiKey = env.BREVO_API_KEY;
  const listId = env.BREVO_LIST_ID;
  const templateId = env.BREVO_TEMPLATE_ID;

  if (!apiKey || !listId || !templateId) {
    return json({ error: 'Nieuwsbrief-inschrijving is momenteel niet beschikbaar.' }, 500);
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

    // Brevo retourneert 204 No Content bij succes, of 400 als het e-mailadres
    // al (dubbel-opt-in) bevestigd is in deze lijst.
    if (!response.ok && response.status !== 400) {
      const errorBody = await response.json().catch(() => null);
      return json({ error: errorBody?.message || 'Inschrijven via Brevo is mislukt.' }, 502);
    }

    return json({ message: 'Check uw inbox om de inschrijving te bevestigen.' }, 200);
  } catch (_exception) {
    return json({ error: 'Er is een onverwachte fout opgetreden.' }, 500);
  }
}

const routes = {
  '/api/contact': handleContact,
  '/api/lead-magnet': handleLeadMagnet,
  '/api/newsletter': handleNewsletter,
};

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }
    const { pathname } = new URL(request.url);
    const handler = routes[pathname];
    if (!handler) {
      return json({ error: 'Not found' }, 404);
    }
    try {
      return await handler(request, env);
    } catch (_exception) {
      return json({ error: 'Er is een onverwachte fout opgetreden.' }, 500);
    }
  },
};
