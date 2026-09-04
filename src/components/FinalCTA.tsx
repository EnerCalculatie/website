import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl md:text-4xl font-black text-white mb-4">
          Maak vandaag je eerste adviesrapport gratis.
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mb-8">
          30 dagen gratis proberen, geen setupkosten, maandelijks opzegbaar.
        </p>
        <a
          href="https://app.enercalculatie.nl/gratis"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-[#008f5a] text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-brand-primary/20 group min-h-[48px]"
        >
          Gratis adviesrapport maken
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
