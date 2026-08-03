import { describe, it, expect, vi } from 'vitest';
import { writeFile } from 'node:fs/promises';
import { buildAudit, writeAuditFile } from './article-audit.mjs';

vi.mock('node:fs/promises', () => ({ writeFile: vi.fn().mockResolvedValue(undefined) }));

describe('buildAudit', () => {
  it('bouwt een audit-object met claims en bronnen', () => {
    const audit = buildAudit({
      article: { title: 'Test' },
      seoScore: 92,
      geoScore: 86,
      factScore: 100,
      sourceQuality: 100,
      claims: [
        {
          text: 'Saldering stopt in 2027.',
          status: 'SUPPORTED',
          source: { title: 'RVO', url: 'https://rvo.nl', qualityScore: 100 },
        },
        { text: 'x', status: 'NO_SOURCE', source: null },
      ],
    });
    expect(audit.title).toBe('Test');
    expect(audit.factScore).toBe(100);
    expect(audit.claims).toHaveLength(2);
    expect(audit.claims[0].sources).toEqual([{ title: 'RVO', url: 'https://rvo.nl', quality: 100 }]);
    expect(audit.claims[1].sources).toEqual([]);
    expect(audit.generatedAt).toBeDefined();
  });
});

describe('writeAuditFile', () => {
  it('schrijft geformatteerde JSON weg', async () => {
    await writeAuditFile({ title: 'Test' }, '/tmp/audit.json');
    expect(writeFile).toHaveBeenCalledWith('/tmp/audit.json', expect.stringContaining('"title": "Test"'), 'utf8');
  });
});
