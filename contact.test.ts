// Regressietests voor de /api/contact-route. Had 0% dekking ondanks dat dit
// productie-endpoint echte gebruikersinvoer verwerkt en e-mail verstuurt.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRouteHandler, mockResponse } from './routeTestHelpers';

const sendMock = vi.fn();
class MockResend {
  emails = { send: sendMock };
}
vi.mock('resend', () => ({ Resend: MockResend }));

describe('POST /contact', () => {
  const validBody = {
    firstName: 'Jan',
    lastName: 'Jansen',
    email: 'jan@voorbeeld.nl',
    company: 'Jansen Installaties',
    message: 'Vraag over de software.',
  };

  beforeEach(() => {
    vi.resetModules();
    sendMock.mockReset();
    process.env.RESEND_API_KEY = 'test-key';
  });

  async function callHandler(body: unknown) {
    const { default: router } = await import('./contact');
    const handler = getRouteHandler(router, 'post', '/contact');
    const res = mockResponse();
    await handler({ body }, res);
    return res;
  }

  it('geeft 500 als RESEND_API_KEY ontbreekt (geen stille faal)', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await callHandler(validBody);
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('honeypot: als het verborgen subject-veld gevuld is, doet-alsof-succes zonder mail te sturen', async () => {
    const res = await callHandler({ ...validBody, subject: 'ik ben een bot' });
    expect(res.statusCode).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('geeft 400 met de ontbrekende velden als verplichte velden missen', async () => {
    const res = await callHandler({ email: 'jan@voorbeeld.nl' });
    expect(res.statusCode).toBe(400);
    expect((res.body as { error: string }).error).toContain('firstName');
    expect((res.body as { error: string }).error).toContain('lastName');
    expect((res.body as { error: string }).error).toContain('message');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('escaped HTML-injectiepogingen in naam en bericht vóór ze in de e-mail-HTML terechtkomen', async () => {
    sendMock.mockResolvedValue({ data: { id: 'x' }, error: null });
    await callHandler({
      ...validBody,
      firstName: '<img src=x onerror=alert(1)>',
      message: '<script>alert("xss")</script>',
    });
    const sentHtml = sendMock.mock.calls[0][0].html as string;
    expect(sentHtml).not.toContain('<img src=x onerror=alert(1)>');
    expect(sentHtml).not.toContain('<script>alert("xss")</script>');
    expect(sentHtml).toContain('&lt;script&gt;');
  });

  it('stuurt 200 met de Resend-data bij een geldige aanvraag', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc123' }, error: null });
    const res = await callHandler(validBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 'abc123' });
  });

  it('geeft 400 door als Resend zelf een fout teruggeeft', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'invalid domain' } });
    const res = await callHandler(validBody);
    expect(res.statusCode).toBe(400);
  });

  it('vangt een onverwachte exception op met een generieke 500 (geen stack trace lekken)', async () => {
    sendMock.mockRejectedValue(new Error('netwerkfout'));
    const res = await callHandler(validBody);
    expect(res.statusCode).toBe(500);
    expect((res.body as { error: string }).error).not.toContain('netwerkfout');
  });
});
