import { motion } from 'motion/react';
import { Server, Shield, Webhook, Cpu, Database, Lock } from 'lucide-react';

export function Technology() {
  const technicalFeatures = [
    {
      icon: <Server size={24} />,
      title: 'Nederlandse Servers & AVG',
      description: 'Alle klantdossiers en offertes worden veilig opgeslagen op streng beveiligde servers in Amsterdam en Frankfurt. Volledig AVG-compliant met end-to-end encryptie.',
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      icon: <Webhook size={24} />,
      title: 'Naadloze Integraties',
      description: 'Koppel EnerCalculatie aan uw bestaande werkomgeving. Synchroniseer relaties en projecten automatisch met uw eigen CRM- of ERP-pakket via onze veilige koppelingen.',
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: <Shield size={24} />,
      title: 'Strikte Datascheiding',
      description: 'Uw klantgegevens zijn strikt gescheiden van andere installateurs. Onze architectuur garandeert dat alleen u en uw medewerkers bij uw eigen dossiers kunnen.',
      color: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: <Cpu size={24} />,
      title: 'Slimme Documentherkenning',
      description: 'Facturen en energierekeningen worden automatisch en nauwkeurig uitgelezen. U hoeft geen gegevens meer handmatig over te typen of te corrigeren.',
      color: 'bg-orange-500/10 text-orange-400',
    },
    {
      icon: <Database size={24} />,
      title: 'Altijd een veilige back-up',
      description: 'Uw gegevens worden continu en tot op de seconde veiliggesteld. Zo raakt u nooit belangrijke klantgegevens of gemaakte berekeningen kwijt.',
      color: 'bg-sky-500/10 text-sky-400',
    },
    {
      icon: <Lock size={24} />,
      title: 'Hoogste Veiligheidsstandaarden',
      description: 'Standaard beschermd tegen cyberaanvallen en voorzien van de strengste versleuteling. U kunt met een gerust hart werken, wetende dat uw data veilig is.',
      color: 'bg-rose-500/10 text-rose-400',
    }
  ];

  return (
    <section id="technologie" className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-6"
          >
            <Server size={16} className="text-brand-primary" />
            Veiligheid & Architectuur
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl font-display font-bold text-white mb-6 leading-tight"
          >
            Nederlandse data. Veilige architectuur.<br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
              Klaar voor uw werkomgeving.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Alle klantdossiers staan op streng beveiligde servers in onder andere Amsterdam, volledig AVG-compliant. EnerCalculatie past naadloos in uw bestaande werkwijze via slimme koppelingen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
