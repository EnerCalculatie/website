// Herbruikbare "quotable block"-componenten voor GEO: korte, zelfstandige
// antwoordblokken en specificatietabellen die AI-engines (Google AIO,
// Perplexity, ChatGPT) als losstaand citeerbaar fragment kunnen overnemen.
// Visuele stijl volgt het bestaande Kernpunten-blok in BlogPostLayout.tsx.

interface OneLinerAnswerProps {
  /** De letterlijke vraag die dit blok beantwoordt, bv. "Hoeveel kWh heeft een gemiddeld huishouden nodig?" */
  question: string;
  /** Eén zelfstandige, citeerbare zin — geen "zie hierboven"/"dit hangt af van" zonder concreet antwoord. */
  answer: string;
}

/**
 * Eén directe vraag-antwoordparagraaf, semantisch gemarkeerd zodat een
 * crawler het blok als eenheid kan overnemen zonder omliggende context.
 */
export function OneLinerAnswer({ question, answer }: OneLinerAnswerProps) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-brand-primary-text mb-2">{question}</p>
      <p className="text-slate-900 font-semibold leading-relaxed">{answer}</p>
    </div>
  );
}

interface SpecTableProps {
  /** Titel boven de tabel, functioneert ook als citeerbare context ("Vuistregels batterijcapaciteit"). */
  title: string;
  /** Kolomkoppen, bv. ["Situatie", "Aanbevolen capaciteit"]. */
  columns: string[];
  /** Eén array per rij, zelfde lengte als columns. */
  rows: string[][];
  /** Optionele bronvermelding/toelichting onder de tabel. */
  caption?: string;
}

/**
 * Semantische HTML-tabel (<table>/<caption>) — géén div-grid — zodat Google
 * AIO tabel-snippets en AI-crawlers zonder JS de structuur kunnen parsen.
 */
export function SpecTable({ title, columns, rows, caption }: SpecTableProps) {
  return (
    <div className="not-prose my-8">
      <h3 className="text-lg font-black text-slate-900 mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-sm text-left">
          <caption className="sr-only">{caption ?? title}</caption>
          <thead className="bg-slate-100">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-4 py-3 font-bold text-slate-900">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className="text-xs text-slate-500 mt-2">{caption}</p>}
    </div>
  );
}
