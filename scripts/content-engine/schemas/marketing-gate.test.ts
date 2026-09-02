import { describe, it, expect } from 'vitest';
import { computeMarketingGatePassed, MARKETING_GATE_PRACTICAL_USEFULNESS_MIN, type MarketingGateScores } from './marketing-gate';

function scores(overrides: Partial<MarketingGateScores> = {}): MarketingGateScores {
  return {
    practicalUsefulness: 7,
    b2bRelevance: 7,
    visualImpact: 7,
    scanability: 7,
    conversionPotential: 7,
    socialRepurposability: 7,
    ...overrides,
  };
}

describe('computeMarketingGatePassed', () => {
  it('passed als practicalUsefulness ruim boven de ondergrens zit, ongeacht overige scores', () => {
    expect(computeMarketingGatePassed(scores({ b2bRelevance: 0, visualImpact: 0, scanability: 0, conversionPotential: 0, socialRepurposability: 0 }))).toBe(true);
  });

  it('faalt zodra practicalUsefulness onder de ondergrens zakt', () => {
    expect(computeMarketingGatePassed(scores({ practicalUsefulness: MARKETING_GATE_PRACTICAL_USEFULNESS_MIN - 1 }))).toBe(false);
  });

  it('slaagt precies op de ondergrens (inclusief)', () => {
    expect(computeMarketingGatePassed(scores({ practicalUsefulness: MARKETING_GATE_PRACTICAL_USEFULNESS_MIN }))).toBe(true);
  });
});
