// Test alleen de pure layoutberekening, geen JSX/DOM-rendering — deze repo heeft geen
// React-testinfra (@testing-library/jsdom) en geen enkel ander blog-component wordt op die manier
// getest (BlogPostLayout/InlineCTA/etc. hebben 0% renderdekking). De echte visuele output wordt al
// gedekt door `npm run build` (prerender) + Playwright (tests/blog-quality.spec.ts).
import { describe, it, expect } from 'vitest';
import { computeBarChartLayout, BAR_CHART_LAYOUT } from './ArticleVisual';

describe('computeBarChartLayout', () => {
  it('schaalt de langste bar op de volledige chartWidth, kortere bars naar verhouding', () => {
    const { bars } = computeBarChartLayout([
      { label: 'A', value: 100 },
      { label: 'B', value: 50 },
    ]);
    expect(bars[0].width).toBe(BAR_CHART_LAYOUT.chartWidth);
    expect(bars[1].width).toBe(BAR_CHART_LAYOUT.chartWidth / 2);
  });

  it('geeft elke bar een oplopende y-positie zonder overlap (barHeight + gap per stap)', () => {
    const { bars } = computeBarChartLayout([
      { label: 'A', value: 10 },
      { label: 'B', value: 10 },
      { label: 'C', value: 10 },
    ]);
    const step = BAR_CHART_LAYOUT.barHeight + BAR_CHART_LAYOUT.gap;
    expect(bars.map((b) => b.y)).toEqual([0, step, step * 2]);
  });

  it('valt terug op een cyclisch kleurenpalet als geen kleur is opgegeven', () => {
    const { bars } = computeBarChartLayout([{ label: 'A', value: 1 }]);
    expect(bars[0].kleur).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('respecteert een expliciet opgegeven kleur', () => {
    const { bars } = computeBarChartLayout([{ label: 'A', value: 1, kleur: '#123456' }]);
    expect(bars[0].kleur).toBe('#123456');
  });

  it('geeft breedte 0 zonder te delen door nul als alle waardes 0 zijn', () => {
    const { bars } = computeBarChartLayout([{ label: 'A', value: 0 }]);
    expect(bars[0].width).toBe(0);
    expect(Number.isNaN(bars[0].width)).toBe(false);
  });
});
