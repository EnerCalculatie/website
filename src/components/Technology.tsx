import { motion } from 'motion/react';
import { Server, Shield, Lock, ArrowRight } from 'lucide-react';

// Korte vertrouwensboodschap — de volledige beveiligings- en AVG-toelichting
// (sub-verwerkers, bewaartermijnen, datascheiding) staat uitgeschreven op
// /privacy en /verwerkersovereenkomst, zodat hier geen content verdwijnt.
const TRUST_POINTS = [
  {
    icon: Server,
    title: 'Data binnen de EU',
    description: 'Klantdossiers en offertes staan versleuteld op servers in Nederland en Duitsland, volledig AVG-compliant.',
  },
  {
    icon: Shield,
    title: 'Strikte datascheiding',
    description: 'Uw gegevens zijn logisch gescheiden van andere installateurs. Alleen u en uw medewerkers hebben toegang.',
  },
  {
    icon: Lock,
    title: 'Versleuteld en geback-upt',
    description: 'Dataverkeer en opslag zijn versleuteld, met continue back-ups van uw dossiers en berekeningen.',
  },
];

export function Technology() {
  return (
    <section id="technologie" className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-6"
          >
            <Server size={16} className="text-brand-primary" />
            Veiligheid & privacy
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight"
          >
            Uw klantgegevens zijn veilig.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {TRUST_POINTS.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-brand-primary/10 text-brand-primary">
                <point.icon size={20} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/privacy"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-emerald-300 transition-colors"
          >
            Lees de volledige beveiliging & AVG-toelichting <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
