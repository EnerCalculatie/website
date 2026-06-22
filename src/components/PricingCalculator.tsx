import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Clock, Euro, TrendingUp, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const HOURS_SAVED_PER_DOSSIER = 2.5;
const HOURLY_RATE = 75;

const TIERS = {
  solo: { name: 'Business', price: 99 },
  pro: { name: 'Pro', price: 179 },
  complete: { name: 'Complete', price: 299 },
};

export function PricingCalculator() {
  const [dossiers, setDossiers] = useState(20);
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>('pro');

  const subscriptionPrice = TIERS[activeTier].price;
  const timeSaved = dossiers * HOURS_SAVED_PER_DOSSIER;
  const financialValue = timeSaved * HOURLY_RATE;
  const netProfit = financialValue - subscriptionPrice;
  const roi = (financialValue / subscriptionPrice).toFixed(1);
  
  // Berekening: na hoeveel dossiers zijn de abonnementskosten gedekt?
  const dossiersToPayback = Math.ceil(subscriptionPrice / (HOURS_SAVED_PER_DOSSIER * HOURLY_RATE));

  const handleStartBesparenClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'calculator_used',
        dossiers_selected: dossiers,
        tier_selected: activeTier,
        roi_factor: roi
      });
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing-calculator" className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Bereken uw exacte tijdsbesparing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Zie direct hoe snel EnerCalculatie zichzelf terugbetaalt op basis van uw maandelijkse volume.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Invoer panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <label htmlFor="dossiers-per-maand" className="text-lg font-bold text-slate-900">Aantal dossiers per maand</label>
                <span className="bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full font-bold text-xl">
                  {dossiers}
                </span>
              </div>
              <input
                id="dossiers-per-maand"
                type="range"
                min="5"
                max="100"
                step="5"
                value={dossiers}
                onChange={(e) => setDossiers(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between mt-3 text-sm text-slate-400 font-medium">
                <span>5 dossiers</span>
                <span>100 dossiers</span>
              </div>
            </div>

            <div>
              <label className="text-lg font-bold text-slate-900 mb-6 block">Kies uw pakket</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(Object.keys(TIERS) as Array<keyof typeof TIERS>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTier(key)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      activeTier === key 
                        ? 'border-brand-primary bg-brand-primary/5' 
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{TIERS[key].name}</div>
                    <div className="text-brand-primary font-bold text-lg">€{TIERS[key].price}<span className="text-xs text-slate-400 font-normal">/mnd</span></div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resultaten panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl lg:sticky lg:top-24"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Calculator size={24} className="text-brand-primary" />
              Maandelijkse Impact
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Tijdsbesparing</div>
                  <div className="text-2xl font-bold">{timeSaved} uur</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={20} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Rendement</div>
                  <div className="text-2xl font-bold text-brand-primary">{roi}x terugverdiend</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Euro size={20} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Bespaarde uren in euro's</div>
                  <div className="text-2xl font-bold">€{netProfit.toLocaleString('nl-NL')}</div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-sm leading-relaxed text-slate-300 mb-6">
                U verdient het abonnement al terug na <span className="text-white font-bold">{dossiersToPayback} {dossiersToPayback === 1 ? 'dossier' : 'dossiers'}</span> per maand.
              </p>
              <button 
                onClick={handleStartBesparenClick}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Start met besparen <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}