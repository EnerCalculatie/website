import { ArrowRight, Calculator } from 'lucide-react';
import { blogCtaUrl } from '../blogCtaUrl';

interface InlineCTAProps {
  slug: string;
}

// Compacte CTA, automatisch halverwege elk artikel geplaatst door
// BlogPostLayout. Inline CTA's op een natuurlijk breekpunt in de tekst
// converteren aanzienlijk beter dan alleen een banner onderaan — de meeste
// lezers scrollen nooit tot de bodem van een lang artikel.
export function InlineCTA({ slug }: InlineCTAProps) {
  return (
    <div className="not-prose my-10 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-primary/15 flex items-center justify-center">
        <Calculator size={20} className="text-brand-primary-text" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-slate-900">Reken dit zelf even door</p>
        <p className="text-sm text-slate-600">Vul postcode en jaarverbruik in en zie direct een echte berekening — gratis, geen account nodig.</p>
      </div>
      <a
        href={blogCtaUrl(slug, 'inline')}
        className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-primary-text hover:bg-slate-900 text-white font-bold rounded-xl transition-colors text-sm group"
      >
        Probeer gratis
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}
