import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, Minus } from 'lucide-react';

type PricingTier = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  setupFee: number;
  description: string;
  includedFeatures: string[];
  excludedFeatures: string[];
  cta: string;
  mostPopular: boolean;
};

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Solo',
    priceMonthly: 99,
    priceYearly: 990,
    setupFee: 0,
    description: 'Voor de installateur met focus op zonnepanelen en thuisbatterijen.',
    includedFeatures: [
      'Zonnepanelen (Solar)',
      'Thuisbatterij (Battery)',
      'AI-documentanalyse',
      'Deelbare rapporten'
    ],
    excludedFeatures: [
      'Warmtepomp',
      'Technische opname',
      'Airco',
      'Laadpaal'
    ],
    cta: 'Start gratis proefperiode',
    mostPopular: false
  },
  {
    name: 'Pro',
    priceMonthly: 179,
    priceYearly: 1790,
    setupFee: 199,
    description: 'Voor de all-round installateur inclusief warmtepompen en technische opname.',
    includedFeatures: [
      'Alles uit Starter',
      'Warmtepomp',
      'Technische opname'
    ],
    excludedFeatures: [
      'Airco',
      'Laadpaal'
    ],
    cta: 'Start gratis proefperiode',
    mostPopular: true
  },
  {
    name: 'Complete',
    priceMonthly: 299,
    priceYearly: 2990,
    setupFee: 299,
    description: 'Het complete pakket voor volledige verduurzaming.',
    includedFeatures: [
      'Alles uit Pro',
      'Airco',
      'Laadpaal',
      'Volledige verduurzaming'
    ],
    excludedFeatures: [
    ],
    cta: 'Boek een demo',
    mostPopular: false
  }
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);

  return (
    <section id="prijzen" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Eerlijke prijzen. Geen verrassingen.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Vaste maandprijs, onbeperkt dossiers. Geen setup fee, geen per-project kosten.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-slate-200/50 p-1.5 rounded-full inline-flex relative shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold z-10 transition-colors ${
                !isYearly ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Maand
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold z-10 transition-colors flex items-center gap-2 ${
                isYearly ? 'bg-brand-primary text-white shadow' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Jaar
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                isYearly ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'
              }`}>
                2 maanden gratis
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 flex flex-col ${
                tier.mostPopular 
                  ? 'border-2 border-brand-primary shadow-lg md:-translate-y-4 z-10' 
                  : 'border border-slate-200 shadow-sm'
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                  Meest Gekozen
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-slate-500 text-sm h-10">{tier.description}</p>
                <div className="mt-6 flex flex-col">
                  {isYearly ? (
                    <>
                      <div className="text-slate-400 line-through text-lg font-medium mb-1">€{tier.priceMonthly} / mnd</div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-slate-400 mr-1">€</span>
                        <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">{tier.priceYearly}</span>
                        <span className="ml-2 text-slate-500 font-medium">/ jr</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-7 mb-1" aria-hidden="true"></div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-slate-400 mr-1">€</span>
                        <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">{tier.priceMonthly}</span>
                        <span className="ml-2 text-slate-500 font-medium">/ mnd</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    {tier.setupFee === 0 ? 'Gratis setup' : `Setup: € ${tier.setupFee} eenmalig`}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.includedFeatures.map((feature, idx) => (
                  <li key={`inc-${idx}`} className="flex items-center gap-3 text-slate-700">
                    <Check size={20} className="text-brand-primary shrink-0" />
                    <span className="text-base font-medium">{feature}</span>
                  </li>
                ))}
                {tier.excludedFeatures.map((feature, idx) => (
                  <li key={`exc-${idx}`} className="flex items-center gap-3 text-slate-400 opacity-75">
                    <Minus size={20} className="text-slate-300 shrink-0" />
                    <span className="text-base font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <a 
                  href="#contact"
                  className={`w-full min-h-[48px] py-3 px-4 rounded-xl text-base font-bold transition-all flex items-center justify-center ${
                    tier.mostPopular 
                    ? 'bg-brand-primary hover:bg-[#008f5a] text-white shadow-xl shadow-brand-primary/20' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {tier.cta}
                </a>
                <div className="mt-4 text-center">
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Opzegbaar per maand
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <button 
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="w-full bg-white border border-slate-200 rounded-t-2xl p-6 md:p-8 flex justify-between items-center hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            style={{ borderBottomLeftRadius: isTableOpen ? '0' : '1rem', borderBottomRightRadius: isTableOpen ? '0' : '1rem' }}
          >
            <span className="text-lg md:text-xl font-bold text-slate-900">Vergelijk alle functionaliteiten per pakket</span>
            <ChevronDown className={`transform transition-transform text-slate-400 shrink-0 ${isTableOpen ? 'rotate-180' : ''}`} size={24} />
          </button>
          
          <AnimatePresence>
            {isTableOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl p-6 md:p-8 pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-4 px-4 font-bold text-slate-900 w-1/4">Module / Functie</th>
                          <th className="py-4 px-4 font-bold text-slate-600 w-1/4">Solo</th>
                          <th className="py-4 px-4 font-bold text-brand-primary w-1/4">Pro</th>
                          <th className="py-4 px-4 font-bold text-slate-600 w-1/4">Complete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Zonnepanelen (Solar)</td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Thuisbatterij (Battery)</td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">AI-documentanalyse</td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Deelbare rapporten</td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Warmtepomp</td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Technische opname</td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Airco</td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-slate-900">Laadpaal</td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Minus size={20} className="text-slate-300" /></td>
                          <td className="py-4 px-4"><Check size={20} className="text-brand-primary" /></td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                          <td className="py-4 px-4 font-bold text-slate-900">Setup kosten</td>
                          <td className="py-4 px-4 font-bold text-slate-700">Gratis</td>
                          <td className="py-4 px-4 font-bold text-slate-700">€ 199</td>
                          <td className="py-4 px-4 font-bold text-slate-700">€ 299</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 text-sm text-slate-500 text-center font-medium">
                    Geen verborgen kosten, geen per-project afrekening. Jij weet elke maand exact wat je betaalt.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
