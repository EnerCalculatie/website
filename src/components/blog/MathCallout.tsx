import type { ReactNode } from 'react';
import { Calculator } from 'lucide-react';

interface MathCalloutProps {
  /** Kop boven het rekenkader. Default: "De berekening". */
  title?: string;
  children: ReactNode;
}

// Gestileerd rekenkader voor de "de wiskunde erachter"-secties van GEO-artikelen.
// Bewust platte tekst i.p.v. KaTeX-glyphs: AI-/RAG-engines lezen een formule als
// tekst (niet als gerenderde LaTeX), en het houdt de KaTeX-CSS/fonts uit de bundle
// — die zouden de LCP-optimalisatie (inline critical CSS, font-preloads) schaden.
// Zet losse termen tussen <code>…</code> voor monospace-nadruk.
export function MathCallout({ title = 'De berekening', children }: MathCalloutProps) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3 text-brand-primary-text">
        <Calculator size={18} aria-hidden="true" />
        <span className="text-sm font-bold uppercase tracking-wide">{title}</span>
      </div>
      <div className="space-y-2 leading-relaxed text-slate-800 [&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm">
        {children}
      </div>
    </div>
  );
}
