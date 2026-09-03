// Cloudflare Worker — front controller voor enercalculatie.nl sinds de site op
// GitHub Pages (static hosting) draait en de Express-backend (server.ts, t/m
// 2026-09) is verwijderd. Twee taken:
//   1. Formulieren/health (/api/contact, /api/lead-magnet, /api/newsletter,
//      /api/health) — vroeger Express-routes, hier direct afgehandeld.
//   2. Front-controller voor de rest van de site: legacy 301-redirects en de
//      Umami-analytics-proxy (vroeger ook server.ts) + securityheaders
//      (vroeger Helmet) op alles wat naar GitHub Pages wordt doorgezet.
// wrangler.toml routet zowel enercalculatie.nl/* als www.enercalculatie.nl/*
// hierheen — dit is het enige request-pad, er is geen losse originserver meer
// die zelf iets anders zou kunnen doen.

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
        path: 'https://enercalculatie.nl/roi-gids.pdf',
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
        redirectionUrl: 'https://enercalculatie.nl/nieuwsbrief-bevestigd',
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

// ---------------------------------------------------------------------------
// Health check (voorheen health.ts) — checkt Resend/Brevo-connectiviteit.
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url, options = {}, timeout = 2000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function checkResend(env) {
  if (!env.RESEND_API_KEY) return { ok: false, error: 'RESEND_API_KEY not set' };
  try {
    // /api-keys, niet /v1/keys of /v1/domains — die laatste twee geven 405 op GET.
    const response = await fetchWithTimeout('https://api.resend.com/api-keys', {
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
    });
    return response.ok ? { ok: true } : { ok: false, error: `HTTP ${response.status}` };
  } catch {
    return { ok: false, error: 'timeout' };
  }
}

async function checkBrevo(env) {
  if (!env.BREVO_API_KEY) return { ok: false, error: 'BREVO_API_KEY not set' };
  try {
    const response = await fetchWithTimeout('https://api.brevo.com/v3/account', {
      headers: { 'api-key': env.BREVO_API_KEY },
    });
    return response.ok ? { ok: true } : { ok: false, error: `HTTP ${response.status}` };
  } catch {
    return { ok: false, error: 'timeout' };
  }
}

async function handleHealth(env) {
  const [resend, brevo] = await Promise.all([checkResend(env), checkBrevo(env)]);
  const status = resend.ok && brevo.ok ? 'ok' : 'degraded';
  return json({ status, message: 'Worker API is running.', email: { resend, brevo } }, 200);
}

// ---------------------------------------------------------------------------
// Rate limiting op de formulieren, via KV (fixed window per IP per endpoint).
// Vervangt de gedeelde express-rate-limit-quotum (20 req/15min) uit server.ts
// — hier per endpoint i.p.v. gedeeld, en een kleiner venster (KV write-load).
// ---------------------------------------------------------------------------

async function isRateLimited(env, request, pathname, limit = 8, windowSeconds = 60) {
  if (!env.FORM_RATE_LIMIT) return false; // binding ontbreekt (bv. lokale dev) — fail-open
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = `${ip}:${pathname}:${bucket}`;
  const current = parseInt((await env.FORM_RATE_LIMIT.get(key)) || '0', 10);
  if (current >= limit) return true;
  await env.FORM_RATE_LIMIT.put(key, String(current + 1), { expirationTtl: windowSeconds * 2 });
  return false;
}

// ---------------------------------------------------------------------------
// Legacy 301-redirects (voorheen server.ts) — oude /kennisbank-URL's en
// samengevoegde blogartikelen (2026-08-25-dedup). Zonder deze redirects hard
// 404 op GitHub Pages i.p.v. behoud van linkwaarde/bookmarks.
// ---------------------------------------------------------------------------

const LEGACY_REDIRECTS = {
  '/kennisbank': '/blog',
  '/kennisbank/salderingsregeling-2027': '/blog/salderingsregeling-2027',
  '/kennisbank/btw-zonnepanelen': '/blog/btw-zonnepanelen',
  '/kennisbank/terugleverkosten-thuisbatterij': '/blog/terugleverkosten-thuisbatterij',
  '/blog/warmtepompen-kopen-isde-subsidie': '/blog/isde-subsidie-warmtepompen',
  '/blog/isde-subsidie-aanvragen': '/blog/isde-subsidie-warmtepompen',
  '/blog/zonnepanelen-netcongestie-advies': '/blog/netcongestie-wachtlijst-zakelijk-2026',
  '/blog/thuisbatterij-vergelijking-merken-en-typen': '/blog/thuisbatterij-capaciteit-kiezen',
  '/blog/zonnepanelen-warmtepomp-combinatie': '/blog',
  '/blog/dynamisch-energiecontract-sturing-thuisbatterij-warmtepomp': '/blog/dynamische-energiecontracten-adviseren-sturing-batterij-warmtepomp',
  '/blog/afgiftesysteem-warmtepomp-lage-temperatuur-radiatoren': '/blog/radiatoren-geschikt-warmtepomp-lage-temperatuur',
};

// ---------------------------------------------------------------------------
// Securityheaders (voorheen Helmet in server.ts) — toegepast op alles wat
// naar GitHub Pages wordt doorgezet, GH Pages zelf stuurt hier niets van mee.
// ---------------------------------------------------------------------------

const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://cloudflareinsights.com; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Content-Type-Options': 'nosniff',
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ---------------------------------------------------------------------------
// Umami-analytics-proxy (voorheen server.ts, 2026-08-10) — Safari ITP en
// vergelijkbare trackerbescherming blokkeren cloud.umami.is als bekend
// trackerdomein. First-party proxy via eigen domein omzeilt dat.
// ---------------------------------------------------------------------------

async function handleStatsJs() {
  try {
    const upstream = await fetch('https://cloud.umami.is/script.js');
    const body = await upstream.text();
    return new Response(body, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}

async function handleUmamiSend(request) {
  try {
    const upstream = await fetch('https://gateway.umami.is/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'X-Forwarded-For': request.headers.get('cf-connecting-ip') || '',
      },
      body: await request.text(),
    });
    const body = await upstream.text();
    return new Response(body, { status: upstream.status, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(null, { status: 502 });
  }
}

// ---------------------------------------------------------------------------
// Front controller
// ---------------------------------------------------------------------------

const FORM_ROUTES = {
  '/api/contact': handleContact,
  '/api/lead-magnet': handleLeadMagnet,
  '/api/newsletter': handleNewsletter,
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Loop-guard: als deze header al aanwezig is, komt het request van onze
    // eigen origin-proxy hieronder terug — voorkomt een oneindige lus als de
    // aanname dat same-zone subrequests de Worker-route overslaan ooit niet
    // opgaat (Cloudflare-gedrag, niet gegarandeerd voor altijd).
    if (request.headers.get('x-worker-proxied')) {
      return new Response('Loop gedetecteerd', { status: 508 });
    }

    if (FORM_ROUTES[pathname]) {
      if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
      if (await isRateLimited(env, request, pathname)) {
        return json({ error: 'Te veel aanvragen. Probeer het over een paar minuten opnieuw.' }, 429);
      }
      try {
        return await FORM_ROUTES[pathname](request, env);
      } catch (_exception) {
        return json({ error: 'Er is een onverwachte fout opgetreden.' }, 500);
      }
    }

    if (pathname === '/api/health' && request.method === 'GET') {
      return handleHealth(env);
    }

    if (pathname === '/stats.js' && request.method === 'GET') {
      return handleStatsJs();
    }

    if (pathname === '/api/send' && request.method === 'POST') {
      return handleUmamiSend(request);
    }

    if ((request.method === 'GET' || request.method === 'HEAD') && LEGACY_REDIRECTS[pathname]) {
      return Response.redirect(`${url.origin}${LEGACY_REDIRECTS[pathname]}`, 301);
    }

    // Alles anders: doorzetten naar GitHub Pages-origin, securityheaders erbovenop.
    const proxiedRequest = new Request(request, { headers: new Headers(request.headers) });
    proxiedRequest.headers.set('x-worker-proxied', '1');
    const originResponse = await fetch(proxiedRequest);
    return withSecurityHeaders(originResponse);
  },
};
