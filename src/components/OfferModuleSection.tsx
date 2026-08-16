import { Calculator, Send, Clock, ArrowRight } from 'lucide-react';
import { trackEvent } from '../analytics';

export function OfferModuleSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-2 block">
              Offertemodule
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
              Van berekening naar offerte, zonder gegevens opnieuw in te voeren.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              De calculatie die u al heeft doorgerekend, vormt direct de basis van de offerte —
              inclusief producten, prijsopbouw en eventueel meerwerk. Verstuur als beveiligde
              klantlink en laat uw klant online beslissen.
            </p>
            <a
              href="/offerte-software"
              onClick={() => trackEvent('CTA Offertemodule Klik', { locatie: 'homepage-offermodule' })}
              className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
            >
              Meer over de offertemodule <ArrowRight size={18} />
            </a>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
              <Calculator className="text-emerald-400 shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold mb-1">Rechtstreeks vanuit de calculatie</p>
                <p className="text-sm text-slate-400">
                  Geen nieuw document, geen gegevens overtypen — de offerte bouwt voort op wat u al heeft doorgerekend.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
              <Send className="text-emerald-400 shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold mb-1">Digitaal versturen en laten beslissen</p>
                <p className="text-sm text-slate-400">
                  Beveiligde klantlink, geen account nodig. Uw klant bekijkt en beslist online, u ziet de status direct terug.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
              <Clock className="text-emerald-400 shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-semibold mb-1">U hoeft de bedenktijd niet zelf op te zoeken</p>
                <p className="text-sm text-slate-400">
                  Het systeem geeft per offerte aan of er bedenktijd van toepassing is, op basis van klanttype en verkoopkanaal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
