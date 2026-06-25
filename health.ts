import { Router } from 'express';
import process from 'process';

// Helper om een fetch-call te wrappen met een timeout en gedetailleerde foutafhandeling
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 2000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('timeout');
    }
    throw error;
  }
};

const router = Router();

// Check de status van de Resend API (voor contactformulieren etc.)
const resend = {
  async ping() {
    if (!process.env.RESEND_API_KEY) {
      return { ok: false, error: 'RESEND_API_KEY not set' };
    }
    // We doen een lichte, geauthenticeerde call om connectiviteit te testen.
    // Gebruik /v1/keys in plaats van /v1/domains, omdat GET op /v1/domains een 405 kan geven.
    const url = 'https://api.resend.com/v1/keys'; // Een lichtgewicht endpoint om API-sleutels te controleren
    const options = { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } };
    const response = await fetchWithTimeout(url, options);
    if (!response.ok) {
      const errorBody = await response.text();
      try { // Probeer de foutmelding te parsen als JSON voor meer details
        const errorJson = JSON.parse(errorBody);
        return { ok: false, error: `Resend API: HTTP ${response.status} - ${errorJson.message || errorBody.substring(0, 100)}` };
      } catch (e) {
        return { ok: false, error: `Resend API: HTTP ${response.status} - ${errorBody.substring(0, 100)}` };
      }
    }
    return { ok: true };
  },
};

// Check de status van de Brevo API (voor de nieuwsbrief)
const brevo = {
  async ping() {
    if (!process.env.BREVO_API_KEY) {
      return { ok: false, error: 'BREVO_API_KEY not set' };
    }
    const url = 'https://api.brevo.com/v3/account'; // Een lichtgewicht, geauthenticeerd endpoint
    const options = { headers: { 'api-key': process.env.BREVO_API_KEY } };
    const response = await fetchWithTimeout(url, options);
    if (!response.ok) {
      const errorBody = await response.text();
      return { ok: false, error: `Brevo API: HTTP ${response.status} - ${errorBody.substring(0, 100)}` };
    }
    return { ok: true };
  },
};

router.get('/health', async (_req, res) => {
  const [resendResult, brevoResult] = await Promise.allSettled([
    resend.ping().catch((e) => ({ ok: false, error: e.message || 'unknown error' })),
    brevo.ping().catch((e) => ({ ok: false, error: e.message || 'unknown error' })),
  ]);

  // De health check voor de database is verwijderd omdat deze website geen eigen database heeft.
  // De 'db' check was een placeholder en veroorzaakte verwarring.
  const dbStatus = { ok: true, latencyMs: 0, error: undefined }; // Altijd OK, want geen DB

  const resendStatus =
    resendResult.status === 'fulfilled' ? resendResult.value : { ok: false, error: 'timeout' };
  const brevoStatus = brevoResult.status === 'fulfilled' ? brevoResult.value : { ok: false, error: 'timeout' };

  const systemStatus = {
    uptime: Math.floor(process.uptime()),
    memoryMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
    env: process.env.NODE_ENV || 'development',
    commit: process.env.RAILWAY_GIT_COMMIT_SHA || 'local',
  };

  let overallStatus: 'ok' | 'degraded' | 'down' = 'ok';
  if (!resendStatus.ok || !brevoStatus.ok) overallStatus = 'degraded';

  res.status(200).json({
    status: overallStatus,
    db: dbStatus,
    email: {
      resend: resendStatus,
      brevo: brevoStatus,
    },
    system: systemStatus,
  });
});

export default router;