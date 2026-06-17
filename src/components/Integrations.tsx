import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Link, Clock } from 'lucide-react';

const liveIntegrations = [
  {
    name: 'PDOK Kadaster',
    description: "Luchtfoto's en panddata direct ingeladen via het officiële Kadaster. Beschikbaar in alle pakketten.",
    logo: (
      <svg viewBox="0 0 120 40" className="h-10 w-auto" aria-label="PDOK Kadaster">
        <rect width="120" height="40" rx="6" fill="#154273" />
        <text x="8" y="27" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#ffffff">PDOK</text>
      </svg>
    ),
  },
];

const comingSoonIntegrations = [
  {
    name: 'Exact Online',
    description: 'Klanten en projecten automatisch synchroniseren met uw boekhouding.',
  },
  {
    name: 'Teamleader',
    description: 'Dossiers koppelen aan uw CRM en agenda voor een naadloze workflow.',
  },
  {
    name: 'AFAS',
    description: 'Exporteren naar uw administratie zonder handmatig overtypen.',
  },
];

export function Integrations() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="integraties" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 mb-6"
          >
            <Link size={16} className="text-brand-primary" />
            <span className="text-sm font-bold text-brand-primary tracking-wide uppercase">Integraties</span>
          </motion.div>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Werkt samen met uw bestaande software
          </h2>
          <p className="text-lg text-slate-600">
            PDOK Kadaster is vandaag beschikbaar. Koppelingen met boekhoud- en CRM-software volgen later dit jaar.
          </p>
        </div>

        {/* Live integratie */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="flex justify-center mb-12"
        >
          {liveIntegrations.map((integration) => (
            <motion.div
              key={integration.name}
              variants={itemVariants}
              className="bg-slate-50/50 rounded-2xl p-8 border border-brand-primary/20 hover:border-brand-primary/40 hover:bg-white hover:shadow-sm transition-all max-w-xs w-full text-center"
            >
              <div className="flex justify-center mb-5 h-12 items-center">
                {integration.logo}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100 mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Beschikbaar
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{integration.name}</h3>
              <p className="text-sm text-slate-500">{integration.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Binnenkort */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {comingSoonIntegrations.map((integration) => (
            <motion.div
              key={integration.name}
              variants={itemVariants}
              className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 opacity-70"
            >
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                  <Clock size={12} />
                  Binnenkort
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-1">{integration.name}</h3>
              <p className="text-xs text-slate-400">{integration.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-slate-600">
            Staat uw softwarepakket er niet bij?{' '}
            <a href="#contact" className="font-bold text-brand-primary hover:underline">
              Neem contact op
            </a>{' '}
            — wij denken graag met u mee.
          </p>
        </div>
      </div>
    </section>
  );
}
