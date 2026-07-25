import { ArrowRight, CheckCircle2, ShieldCheck, Database, Zap, Play } from 'lucide-react';

// Bewust géén Framer Motion in de Hero: mount-animaties (initial opacity 0)
// worden mee-geprerenderd, waardoor de above-the-fold content onzichtbaar is
// tot de JS-bundle geladen en gehydrateerd is. De CSS-klasse .animate-fade-up
// (index.css) geeft hetzelfde effect zonder op JS te wachten.
export function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Achtergrond decoratie voor visuele diepte */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Praktijk-focus indicator (Story LP.4) */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary-text font-bold text-xs uppercase tracking-wider mb-8">
            <Zap size={14} className="fill-[#00a669]" />
            Ontwikkeld voor de praktijk
          </div>

          {/* Hoofdtitel (Story LP.1) */}
          <h1 className="animate-fade-up anim-delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-8 break-words">
            Van energierekening naar ondertekende offerte <span className="text-brand-primary">in 5 minuten.</span>{' '}
            <br className="hidden md:block" />
            <span className="text-slate-500">U voert het gesprek, wij doen het rekenwerk.</span>
          </h1>

          {/* Doelgroep + resultaat */}
          <p className="animate-fade-up anim-delay-200 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
            Offerte- en calculatiesoftware voor zzp'ers en kleine en middelgrote installatiebedrijven, actief in zonnepanelen, thuisbatterijen, warmtepompen, airco's en laadpalen.
            Upload de energierekening, wij rekenen — met actuele salderingsregels, zonder typfouten.
            U levert een rapport waar uw klant aan de keukentafel ja tegen zegt.
          </p>

          {/* Bewijslast direct onder de belofte */}
          <div className="animate-fade-up anim-delay-300 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-2 text-sm font-semibold text-slate-500">
            <span>&lt; 5 min per dossier</span>
            <span className="text-slate-300">·</span>
            <span>Actuele saldering automatisch verwerkt</span>
            <span className="text-slate-300">·</span>
            <span>AVG-proof, Nederlandse servers</span>
          </div>

          {/* Call to Actions — primair de gratis account-loze rapport-flow
              (Fase 1 GTM, app.enercalculatie.nl/gratis), demo als secundair/
              tertiair alternatief voor wie liever eerst praat.
              2026-07-25: doelgroep expliciet gemaakt — tool is lead-magnet
              gericht op installateurs (upload nota van een eigen klant),
              niet een self-service product voor eindklanten. Zie
              [[gratis-instap-flow-gtm]] open strategisch punt. */}
          <div className="animate-fade-up anim-delay-300 flex flex-col items-center justify-center mb-12">
            <p className="text-sm font-bold text-brand-primary-text uppercase tracking-wide mb-3">
              Gratis proberen als installateur
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-4">
              <a href="https://app.enercalculatie.nl/gratis" className="w-full sm:w-auto px-8 py-4 bg-brand-primary-text text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 group">
                Upload de nota van een klant → gratis rapport <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#demo-video" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center text-center gap-2">
                <Play size={20} className="text-brand-primary fill-brand-primary/20" /> Bekijk hoe het werkt
              </a>
            </div>
            {/* No-risk formulering — vervangt de trial-specifieke tekst: deze
                knop leidt niet naar een 30-dagen-proefaccount maar naar één
                los gratis rapport, zonder account. */}
            <p className="text-sm font-medium text-slate-500 mb-2">
              Geen account nodig · rapport binnen 2 minuten · voor installateurs
            </p>

            {/* Early adopter urgentie-signaal (geen klantenteller — pre-launch fase) */}
            <p className="text-sm font-semibold text-brand-primary-text mb-2">
              Sluit u nu aan als een van de eerste installateurs en denk mee over nieuwe functionaliteiten
            </p>

            {/* Demo blijft bereikbaar voor wie liever eerst praat i.p.v. zelf uploadt. */}
            <p className="text-sm text-slate-400">
              Liever eerst praten? <a href="#contact" className="underline hover:text-brand-primary-text transition-colors">Plan een demo (15 min)</a>
            </p>
          </div>

          {/* Trust Badges (Story LP.1) */}
          <div className="animate-fade-up anim-delay-500 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <ShieldCheck size={18} className="text-[#00a669]" />
              AVG-proof
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <Database size={18} className="text-[#00a669]" />
              Nederlandse servers
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <CheckCircle2 size={18} className="text-[#00a669]" />
              Zelfde invoer, zelfde uitkomst
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
