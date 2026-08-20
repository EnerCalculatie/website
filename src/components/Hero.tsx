import { ArrowRight, CheckCircle2, ShieldCheck, Database, Play } from 'lucide-react';
import imgDossier from '../assets/screenshots/dossier-overzicht.webp';

// Bewust géén Framer Motion in de Hero: mount-animaties (initial opacity 0)
// worden mee-geprerenderd, waardoor de above-the-fold content onzichtbaar is
// tot de JS-bundle geladen en gehydrateerd is. De CSS-klasse .animate-fade-up
// (index.css) geeft hetzelfde effect zonder op JS te wachten.
export function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Subtiele technische grid achtergrond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
            Van klantvraag naar onderbouwd akkoord
          </div>

          {/* Hoofdtitel */}
          <h1 className="animate-fade-up anim-delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.15] mb-6">
            Van energierekening naar offerte.
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up anim-delay-200 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
            EnerCalculatie helpt installatiebedrijven om klantgegevens te verwerken, verduurzamingsscenario's te berekenen en vanuit dezelfde calculatie een onderbouwde offerte te maken.
          </p>

          {/* Call to Actions */}
          <div className="animate-fade-up anim-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://app.enercalculatie.nl/gratis"
              className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-[#008f5a] text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group min-h-[48px]"
            >
              Probeer EnerCalculatie
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#case-study"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Play size={18} className="text-slate-500" />
              Bekijk een echte klantcase
            </a>
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-up anim-delay-500 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck size={16} className="text-brand-primary" />
              30 dagen gratis proefperiode
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Database size={16} className="text-brand-primary" />
              Geen setupkosten
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 size={16} className="text-brand-primary" />
              Data veilig opgeslagen binnen de EU
            </div>
          </div>
        </div>

        {/* Echte applicatie screenshot visual met browserframe */}
        <div className="animate-fade-up anim-delay-500 max-w-5xl mx-auto">
          <a
            href="#demo-video"
            className="block group bg-slate-900 rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer relative"
            aria-label="Bekijk de interactieve producttour"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-md">
                  app.enercalculatie.nl / dossier / overzicht
                </span>
              </div>
              <span className="text-[11px] font-semibold text-brand-primary group-hover:underline hidden sm:inline">
                Bekijk tour ↓
              </span>
            </div>
            <div className="rounded-xl overflow-hidden bg-white relative">
              <img
                src={imgDossier}
                alt="EnerCalculatie dossieroverzicht software interface"
                className="w-full h-auto object-cover group-hover:scale-[1.005] transition-transform duration-300"
                loading="eager"
                decoding="async"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
