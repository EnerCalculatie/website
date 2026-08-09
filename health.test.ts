// Regressietests voor /api/health — had 0% dekking. Bewaakt vooral de
// status-aggregatie (ok/degraded) en dat een ontbrekende API-key of een
// trage/timeoutende externe call niet de hele health check laat crashen.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRouteHandler, mockResponse } from './routeTestHelpers';

const fetchMock = vi.fn();

describe('GET /health', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    process.env.RESEND_API_KEY = 'resend-key';
    process.env.BREVO_API_KEY = 'brevo-key';
  });

  async function callHandler() {
    const { default: router } = await import('./health');
    const handler = getRouteHandler(router, 'get', '/health');
    const res = mockResponse();
    await handler({}, res);
    return res;
  }

  it('geeft status ok terug als beide diensten bereikbaar zijn', async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const res = await callHandler();
    expect(res.statusCode).toBe(200);
    expect((res.body as { status: string }).status).toBe('ok');
  });

  it('geeft status degraded terug als één dienst een niet-ok HTTP-status geeft', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true }).mockResolvedValueOnce({ ok: false, status: 401 });
    const res = await callHandler();
    const body = res.body as { status: string; email: { resend: unknown; brevo: unknown } };
    expect(body.status).toBe('degraded');
    expect(body.email.brevo).toEqual({ ok: false, error: 'HTTP 401' });
  });

  it('markeert een dienst als niet-ok zonder te gooien als de env-key ontbreekt', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await callHandler();
    const body = res.body as { status: string; email: { resend: unknown } };
    expect(body.status).toBe('degraded');
    expect(body.email.resend).toEqual({ ok: false, error: 'RESEND_API_KEY not set' });
    // Brevo-key was wel gezet, dus daar mag geen fetch-call voor Resend aan voorafgaan die telt.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('vangt een netwerkfout/timeout op zonder te gooien (200 met degraded status)', async () => {
    fetchMock.mockRejectedValue(new Error('AbortError'));
    const res = await callHandler();
    expect(res.statusCode).toBe(200);
    const body = res.body as { status: string; email: { resend: unknown } };
    expect(body.status).toBe('degraded');
    expect(body.email.resend).toEqual({ ok: false, error: 'timeout' });
  });
});
