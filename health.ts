import { Router } from 'express';

// Wrapt fetch met een timeout, zodat een trage/hangende externe API de health check niet blokkeert.
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 2000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

interface ServiceStatus {
  ok: boolean;
  error?: string;
}

// Lichte, geauthenticeerde call tegen Resend om connectiviteit/API-key-geldigheid te checken
// (gebruikt voor contact- en lead-magnet-mails). Let op: het is /api-keys, niet /v1/keys of
// /v1/domains — die laatste twee geven een 405 op GET.
async function checkResend(): Promise<ServiceStatus> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }
  try {
    const response = await fetchWithTimeout('https://api.resend.com/api-keys', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'timeout' };
  }
}

// Lichte, geauthenticeerde call tegen Brevo (gebruikt voor de nieuwsbrief double opt-in).
async function checkBrevo(): Promise<ServiceStatus> {
  if (!process.env.BREVO_API_KEY) {
    return { ok: false, error: 'BREVO_API_KEY not set' };
  }
  try {
    const response = await fetchWithTimeout('https://api.brevo.com/v3/account', {
      headers: { 'api-key': process.env.BREVO_API_KEY },
    });
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'timeout' };
  }
}

const router = Router();

router.get('/health', async (_req, res) => {
  const [resend, brevo] = await Promise.all([checkResend(), checkBrevo()]);

  const status = resend.ok && brevo.ok ? 'ok' : 'degraded';

  res.status(200).json({
    status,
    message: 'Backend API is running.',
    email: { resend, brevo },
  });
});

export default router;
