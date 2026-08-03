import { describe, it, expect } from 'vitest';
import { extractClaims, buildSourceLookup } from './claim-extractor.mjs';

const sources = buildSourceLookup([
  { key: 'rvo-isde', title: 'ISDE', url: 'https://rvo.nl/isde', qualityScore: 100 },
]);

describe('extractClaims', () => {
  it('normaliseert geldige claims met ids', () => {
    const { claims, issues } = extractClaims(
      { claims: [{ text: 'Saldering stopt in 2027.', sourceKey: 'rvo-isde' }] },
      sources
    );
    expect(claims).toHaveLength(1);
    expect(claims[0].id).toBe('claim-001');
    expect(claims[0].source?.key).toBe('rvo-isde');
    expect(issues).toHaveLength(0);
  });

  it('vlagt een claim zonder sourceKey', () => {
    const { claims, issues } = extractClaims({ claims: [{ text: 'Iets zonder bron.' }] }, sources);
    expect(claims[0].sourceKey).toBeNull();
    expect(issues.some((i) => i.includes('geen sourceKey'))).toBe(true);
  });

  it('vlagt een onbekende sourceKey', () => {
    const { claims, issues } = extractClaims(
      { claims: [{ text: 'Iets met foute bron.', sourceKey: 'niet-bestaand' }] },
      sources
    );
    expect(claims[0].source).toBeNull();
    expect(issues.some((i) => i.includes('onbekende sourceKey'))).toBe(true);
  });

  it('dedupliceert identieke claimtekst', () => {
    const { claims } = extractClaims(
      {
        claims: [
          { text: 'Zelfde claim.', sourceKey: 'rvo-isde' },
          { text: 'Zelfde claim.', sourceKey: 'rvo-isde' },
        ],
      },
      sources
    );
    expect(claims).toHaveLength(1);
  });

  it('meldt een probleem als er helemaal geen claims zijn', () => {
    const { claims, issues } = extractClaims({}, sources);
    expect(claims).toHaveLength(0);
    expect(issues.length).toBeGreaterThan(0);
  });
});
