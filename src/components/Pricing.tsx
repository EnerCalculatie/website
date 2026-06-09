import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function Pricing() {
  const tiers = [
    {
      name: 'Standaard',
      price: '149',
      implementation: 'Setup: €495 eenmalig',
      description: 'De volledige applicatie, met basis support en standaard SLA.',
      features: [
        'Alle platform functionaliteiten (Inclusief AI, PV & Warmtepomp)',
        'Veilige cloud tenant inclusief hosting & logging',
        'E-mail support (reactietijd binnen 24 uur)',
        'SLA 99.0% uptime tijdens kantooruren',
        'Wekelijkse backups',
      ],
      cta: 'Boek een demo',
      mostPopular: false
    },
    {
      name: 'Business',
      price: '249',
      implementation: 'Setup: €995 eenmalig',
      description: 'De volledige applicatie met prioriteit support en verhoogde uptime.',
      features: [
        'Alle platform functionaliteiten (Inclusief AI, PV & Warmtepomp)',
        'Veilige cloud tenant inclusief hosting & logging',
        'Telefonische support (reactietijd binnen 4 uur)',
        'SLA 99.5% uptime (uitgebreide kantooruren)',
        'Dagelijkse backups & uptime monitoring',
      ],
      cta: 'Boek een demo',
      mostPopular: true
    },
    {
      name: 'Enterprise',
      price: 'Op maat',
      implementation: 'Setup: Prijs op aanvraag',
      description: 'Voor de veeleisende organisatie met strikte garanties en 24/7 support.',
      features: [
        'Alle platform functionaliteiten',
        'Dedicated server tenant (geïsoleerde database)',
        '24/7 direct contact met 1e en 2e lijns support',
        'SLA 99.9% uptime met financiële garantie',
        'Real-time backups & custom onboarding',
      ],
      cta: 'Neem contact op',
      mostPopular: false
    }
  ];

  return (
    <section id="prijzen" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Eerlijke prijzen, direct ROI.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Betaal nooit meer te veel. Verdien de kosten vaak al terug met het eerste afgeronde dossier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 ${
                tier.mostPopular 
                  ? 'border-2 border-brand-secondary shadow-2xl md:-translate-y-4 z-10' 
                  : 'border border-slate-200 shadow-lg'
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                  Meest Gekozen
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <p className="text-slate-500 text-sm h-10">{tier.description}</p>
                <div className="mt-6 flex items-baseline">
                  {tier.price !== 'Op maat' && <span className="text-2xl font-bold text-slate-400 mr-1">€</span>}
                  <span className="text-5xl font-display font-bold text-slate-900 tracking-tight">{tier.price}</span>
                  {tier.price !== 'Op maat' && <span className="ml-2 text-slate-500 font-medium">/ mnd</span>}
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    {tier.implementation}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-700">
                    <Check size={20} className="text-brand-primary shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact"
                className={`w-full py-4 px-4 rounded-xl text-sm font-bold transition-all inline-block text-center ${
                  tier.mostPopular 
                  ? 'bg-brand-primary hover:bg-[#008f5a] text-white shadow-xl shadow-brand-primary/20' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
