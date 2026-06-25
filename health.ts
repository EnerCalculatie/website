import { Router } from 'express';
import process from 'process';

const router = Router();

// This is a simplified placeholder. In the real application, this would use the
// existing Supabase service client.
const db = {
  async ping() {
    const start = process.hrtime.bigint();
    // Simulates a lightweight query like `SELECT 1`
    await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 50));
    const end = process.hrtime.bigint();
    return {
      ok: true,
      latencyMs: Number(end - start) / 1_000_000,
    };
  },
};

// Check de status van de Resend API (voor contactformulieren etc.)
const resend = {
  async ping() {
    if (!process.env.RESEND_API_KEY) {
      return { ok: false, error: 'RESEND_API_KEY not set' };
    }
    // We doen een lichte, geauthenticeerde call om connectiviteit te testen.
    const response = await fetch('https://api.resend.com/v1/domains', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    return { ok: response.ok };
  },
};

// Check de status van de Brevo API (voor de nieuwsbrief)
const brevo = {
  async ping() {
    if (!process.env.BREVO_API_KEY) {
      return { ok: false, error: 'BREVO_API_KEY not set' };
    }
    // De /account endpoint is een lichte, geauthenticeerde call.
    const response = await fetch('https://api.brevo.com/v3/account', {
      headers: { 'api-key': process.env.BREVO_API_KEY },
    });
    return { ok: response.ok };
  },
};

const checkTimeout = <T>(promise: Promise<T>, timeout = 2000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ]);
};

router.get('/health', async (_req, res) => {
  const [dbResult, resendResult, brevoResult] = await Promise.allSettled([
    checkTimeout(db.ping()),
    checkTimeout(resend.ping()),
    checkTimeout(brevo.ping()),
  ]);

  const dbStatus = dbResult.status === 'fulfilled' ? dbResult.value : { ok: false, latencyMs: -1, error: 'timeout' };
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
  if (!dbStatus.ok || !resendStatus.ok || !brevoStatus.ok) {
    overallStatus = 'degraded';
  }

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