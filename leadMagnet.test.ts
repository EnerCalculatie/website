// Regressietests voor de /api/lead-magnet-route. Had 0% dekking. Stuurt bij
// succes twee mails (ROI-gids naar de lead, notificatie naar info@) — de
// tests dekken dat beide calls kloppen en dat de tweede notificatiemail geen
// PDF-bijlage meestuurt (die hoort alleen bij de eerste).
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRouteHandler, mockResponse } from './routeTestHelpers';

const sendMock = vi.fn();
class MockResend {
  emails = { send: sendMock };
}
vi.mock('resend', () => ({ Resend: MockResend }));

describe('POST /lead-magnet', () => {
  beforeEach(() => {
    vi.resetModules();
    sendMock.mockReset();
    process.env.RESEND_API_KEY = 'test-key';
  });

  async function callHandler(body: unknown) {
    const { default: router } = await import('./leadMagnet');
    const handler = getRouteHandler(router, 'post', '/lead-magnet');
    const res = mockResponse();
    await handler({ body }, res);
    return res;
  }

  it('geeft 500 als RESEND_API_KEY ontbreekt', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await callHandler({ email: 'lead@voorbeeld.nl' });
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('honeypot: gevuld company-veld doet-alsof-succes zonder mail', async () => {
    const res = await callHandler({ email: 'lead@voorbeeld.nl', company: 'bot-gevuld-veld' });
    expect(res.statusCode).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it.each(['', 'geen-email', 'zonder-at.nl', 'nog@geen-tld'])(
    'wijst een ongeldig e-mailadres %j af met 400',
    async (email) => {
      const res = await callHandler({ email });
      expect(res.statusCode).toBe(400);
      expect(sendMock).not.toHaveBeenCalled();
    }
  );

  it('stuurt bij een geldig e-mailadres eerst de ROI-gids mét PDF-bijlage naar de lead', async () => {
    sendMock.mockResolvedValue({ data: { id: 'x' }, error: null });
    await callHandler({ email: 'lead@voorbeeld.nl' });
    const firstCall = sendMock.mock.calls[0][0];
    expect(firstCall.to).toEqual(['lead@voorbeeld.nl']);
    expect(firstCall.attachments).toHaveLength(1);
  });

  it('stuurt daarna een notificatiemail naar info@ zonder bijlage', async () => {
    sendMock.mockResolvedValue({ data: { id: 'x' }, error: null });
    await callHandler({ email: 'lead@voorbeeld.nl' });
    expect(sendMock).toHaveBeenCalledTimes(2);
    const secondCall = sendMock.mock.calls[1][0];
    expect(secondCall.to).toEqual(['info@enercalculatie.nl']);
    expect(secondCall.attachments).toBeUndefined();
  });

  it('stopt vóór de notificatiemail als de eerste (gids-)mail al faalt', async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'bounced' } });
    const res = await callHandler({ email: 'lead@voorbeeld.nl' });
    expect(res.statusCode).toBe(400);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('vangt een onverwachte exception op met een generieke 500', async () => {
    sendMock.mockRejectedValue(new Error('netwerkfout'));
    const res = await callHandler({ email: 'lead@voorbeeld.nl' });
    expect(res.statusCode).toBe(500);
    expect((res.body as { error: string }).error).not.toContain('netwerkfout');
  });
});
