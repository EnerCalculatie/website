/**
 * Herbruikbare, data-gedreven SVG-visualcomponent voor blogartikelen.
 *
 * Architectuur (funnel-herinrichting, 2026-08-25, spec-sectie 5): een artikel-auteur (of in de
 * toekomst PublishAgent) schrijft een klein getypeerd databject (`VisualSpec`), nooit handmatige
 * SVG-paden/coördinaten. Deze component genereert daar een consistente, huisstijl-conforme SVG
 * van. Voorbeeld (zoals nu toegepast in het pilot-artikel):
 *
 *   <ArticleVisual visual={{
 *     type: 'bar_chart',
 *     title: 'Jaaropbrengst per dakvlak',
 *     unit: 'kWh',
 *     items: [
 *       { label: 'Zuid (30°)', value: 2850 },
 *       { label: 'Oost', value: 1172 },
 *       { label: 'West', value: 1172 },
 *     ],
 *   }} />
 *
 * Niet elk artikel heeft een zinvolle visual — dit is bewust een expliciete, optionele toevoeging
 * per artikel (import + JSX-aanroep op de gewenste plek in de tekst), geen automatische
 * markdown-metadata-substitutie. Reden: een diagram hoort op een specifieke plek in het
 * betoog (na het rekenvoorbeeld, naast de vergelijking) — een vaste positie (bv. altijd na de
 * intro, zoals het FAQ-blok altijd onderaan staat) zou vaak niet de juiste plek zijn.
 *
 * Geïmplementeerd: `bar_chart`, `comparison`. De overige typen uit de architectuur-schets
 * (`process`, `roof_orientation`, `timeline`, `flow`) hebben nog geen renderer — zie het
 * eindrapport voor de scope-afweging. `roof_orientation`-achtige data (opbrengst per dakvlak)
 * is in de praktijk al goed te tonen als `bar_chart`, zoals het pilot-artikel laat zien.
 */

export type VisualType = 'bar_chart' | 'comparison' | 'process' | 'roof_orientation' | 'timeline' | 'flow';

export interface BarChartVisual {
  type: 'bar_chart';
  title?: string;
  /** Toelichting onder de grafiek (figcaption), bv. de aannames achter de cijfers. */
  caption?: string;
  unit: string;
  items: { label: string; value: number; kleur?: string }[];
}

export interface ComparisonVisual {
  type: 'comparison';
  title?: string;
  /** Twee kolommen om naast elkaar te zetten, bv. "Zonder batterij" vs "Met batterij". */
  columns: [string, string];
  rows: { label: string; left: string; right: string }[];
}

export type VisualSpec = BarChartVisual | ComparisonVisual;

const PALET = ['#f59e0b', '#0ea5e9', '#6366f1', '#10b981', '#ec4899', '#84cc16'];
export const BAR_CHART_LAYOUT = { barHeight: 40, gap: 16, labelWidth: 110, chartWidth: 400 };

/** Puur — geen JSX/DOM, dus los testbaar zonder React-testinfra (die deze repo niet heeft). */
export function computeBarChartLayout(items: BarChartVisual['items']) {
  const max = Math.max(...items.map((d) => d.value));
  const { barHeight, gap, chartWidth } = BAR_CHART_LAYOUT;
  return {
    chartHeight: items.length * (barHeight + gap),
    bars: items.map((d, i) => ({
      ...d,
      y: i * (barHeight + gap),
      width: max > 0 ? (d.value / max) * chartWidth : 0,
      kleur: d.kleur ?? PALET[i % PALET.length],
    })),
  };
}

function BarChart({ title, caption, unit, items }: BarChartVisual) {
  const { chartHeight, bars } = computeBarChartLayout(items);
  const { labelWidth, chartWidth, barHeight } = BAR_CHART_LAYOUT;

  return (
    <figure className="my-8 not-prose">
      {title && <p className="text-sm font-bold text-slate-900 mb-3">{title}</p>}
      <svg
        viewBox={`0 0 ${labelWidth + chartWidth + 80} ${chartHeight}`}
        role="img"
        aria-label={`Staafdiagram${title ? `: ${title}` : ''} — ${items.map((d) => `${d.label} ${d.value.toLocaleString('nl-NL')} ${unit}`).join(', ')}`}
        className="w-full h-auto"
      >
        {bars.map((d) => (
          <g key={d.label}>
            <text x={0} y={d.y + barHeight / 2} dy="0.35em" className="fill-slate-700 text-sm font-semibold">
              {d.label}
            </text>
            <rect x={labelWidth} y={d.y} width={chartWidth} height={barHeight} rx={4} className="fill-slate-100" />
            <rect x={labelWidth} y={d.y} width={d.width} height={barHeight} rx={4} fill={d.kleur} />
            <text x={labelWidth + d.width + 10} y={d.y + barHeight / 2} dy="0.35em" className="fill-slate-900 text-sm font-bold">
              {d.value.toLocaleString('nl-NL')} {unit}
            </text>
          </g>
        ))}
      </svg>
      {caption && <figcaption className="text-sm text-slate-500 mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
}

function Comparison({ title, columns, rows }: ComparisonVisual) {
  return (
    <figure className="my-8 not-prose">
      {title && <p className="text-sm font-bold text-slate-900 mb-3">{title}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900"></th>
              <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900">{columns[0]}</th>
              <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900">{columns[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="border border-slate-200 px-3 py-2 font-semibold text-slate-900">{r.label}</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-700">{r.left}</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-700">{r.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function ArticleVisual({ visual }: { visual: VisualSpec }) {
  switch (visual.type) {
    case 'bar_chart':
      return <BarChart {...visual} />;
    case 'comparison':
      return <Comparison {...visual} />;
    default:
      return null;
  }
}
