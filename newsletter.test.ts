// Regressietests voor de /api/newsletter-route. Had 0% dekking. Gebruikt ruwe
// fetch() naar de Brevo double-opt-in-API i.p.v. een SDK, dus die wordt hier
// gemockt i.p.v. de Resend-client zoals bij contact.ts/leadMagnet.ts.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRouteHandler, mockResponse } from './routeTestHelpers';

const fetchMock = vi.fn();

describe('POST /newsletter', () => {
  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    process.env.BREVO_API_KEY = 'test-key';
    process.env.BREVO_LIST_ID = '7';
    process.env.BREVO_TEMPLATE_ID = '3';
  });

  async function callHandler(body: unknown) {
    const { default: router } = await import('./newsletter');
    const handler = getRouteHandler(router, 'post', '/newsletter');
    const res = mockResponse();
    await handler({ body }, res);
    return res;
  }

  it('geeft 500 als een van de Brevo-env-vars ontbreekt', async () => {
    delete process.env.BREVO_LIST_ID;
    const res = await callHandler({ email: 'lezer@voorbeeld.nl' });
    expect(res.statusCode).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('honeypot: gevuld company-veld doet-alsof-succes zonder Brevo-call', async () => {
    const res = await callHandler({ email: 'lezer@voorbeeld.nl', company: 'bot' });
    expect(res.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('wijst een ongeldig e-mailadres af met 400', async () => {
    const res = await callHandler({ email: 'geen-geldig-adres' });
    expect(res.statusCode).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('roept Brevo aan met de juiste listId/templateId als getallen', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 204 });
    await callHandler({ email: 'lezer@voorbeeld.nl' });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
    const sentBody = JSON.parse(options.body);
    expect(sentBody).toMatchObject({ email: 'lezer@voorbeeld.nl', includeListIds: [7], templateId: 3 });
  });

  it('geeft 200 bij een succesvolle (204) Brevo-response', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 204 });
    const res = await callHandler({ email: 'lezer@voorbeeld.nl' });
    expect(res.statusCode).toBe(200);
  });

  it('behandelt Brevo 400 (al dubbel-opt-in bevestigd) ook als succes, niet als fout', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 400 });
    const res = await callHandler({ email: 'lezer@voorbeeld.nl' });
    expect(res.statusCode).toBe(200);
  });

  it('geeft 502 door bij een echte Brevo-fout (bv. 401/500)', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: 'Brevo is down' }),
    });
    const res = await callHandler({ email: 'lezer@voorbeeld.nl' });
    expect(res.statusCode).toBe(502);
  });

  it('vangt een onverwachte exception (bv. netwerkfout) op met een generieke 500', async () => {
    fetchMock.mockRejectedValue(new Error('ECONNRESET'));
    const res = await callHandler({ email: 'lezer@voorbeeld.nl' });
    expect(res.statusCode).toBe(500);
    expect((res.body as { error: string }).error).not.toContain('ECONNRESET');
  });
});
