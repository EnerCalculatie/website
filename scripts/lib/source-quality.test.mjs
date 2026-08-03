import { describe, it, expect } from 'vitest';
import { scoreForUrl, scoreForSource, MIN_SOURCE_QUALITY, REJECTED_QUALITY_THRESHOLD } from './source-quality.mjs';

describe('scoreForUrl', () => {
  it('geeft de juiste score voor een bekend domein', () => {
    expect(scoreForUrl('https://www.rvo.nl/subsidies-financiering/isde')).toBe(100);
  });
  it('negeert www.-prefix', () => {
    expect(scoreForUrl('https://rvo.nl/x')).toBe(scoreForUrl('https://www.rvo.nl/x'));
  });
  it('geeft 0 voor een onbekend domein', () => {
    expect(scoreForUrl('https://willekeurige-blog.nl/artikel')).toBe(0);
  });
  it('geeft 0 bij een ongeldige URL', () => {
    expect(scoreForUrl('niet-een-url')).toBe(0);
  });
});

describe('scoreForSource', () => {
  it('gebruikt qualityScore als die aanwezig is', () => {
    expect(scoreForSource({ qualityScore: 95, url: 'https://rvo.nl' })).toBe(95);
  });
  it('valt terug op domain-lookup', () => {
    expect(scoreForSource({ domain: 'acm.nl' })).toBe(98);
  });
  it('valt terug op url-lookup', () => {
    expect(scoreForSource({ url: 'https://www.nen.nl/x' })).toBe(95);
  });
  it('geeft 0 voor lege input', () => {
    expect(scoreForSource(null)).toBe(0);
    expect(scoreForSource({})).toBe(0);
  });
});

describe('thresholds', () => {
  it('MIN_SOURCE_QUALITY en REJECTED_QUALITY_THRESHOLD kloppen met de opdracht', () => {
    expect(MIN_SOURCE_QUALITY).toBe(90);
    expect(REJECTED_QUALITY_THRESHOLD).toBe(80);
  });
});
