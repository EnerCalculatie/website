import { motion } from 'motion/react';
import { Server, Shield, Webhook, Cpu, Database, Lock } from 'lucide-react';

export function Technology() {
  const technicalFeatures = [
    {
      icon: <Server size={24} />,
      title: 'Nederlandse Servers & AVG',
      description: 'Alle klantdossiers en offertes worden veilig opgeslagen op streng beveiligde Europese en Nederlandse servers. Volledig AVG-compliant met end-to-end encryptie.',
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      icon: <Webhook size={24} />,
      title: 'REST API & Integraties',
      description: 'Koppel EnerCalculatie naadloos aan uw bestaande werkomgeving. Synchroniseer relaties en projecten automatisch met uw eigen CRM- of ERP-pakket via onze voorspelbare REST API.',
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      icon: <Shield size={24} />,
      title: 'Multi-Tenant Security & RLS',
      description: 'Uw database is strict gescheiden van andere installateurs (Row Level Security). Een Zero-Trust architectuur garandeert dat alleen u bij uw eigen klantgegevens kunt.',
      color: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      icon: <Cpu size={24} />,
      title: 'AI OCR Gateway',
      description: 'Ondersteund door geavanceerde AI (Google Gemini) voor vlekkeloze data-extractie uit complexe pdf\'s en afbeeldingen, zonder handmatige correcties.',
      color: 'bg-orange-500/10 text-orange-400',
    },
    {
      icon: <Database size={24} />,
      title: 'PITR Back-ups & Herstel',
      description: 'Door Point-In-Time-Recovery (PITR) is data tot op de seconde veiliggesteld en te herstellen. Uw organisatie-instellingen worden continu geback-upt.',
      color: 'bg-sky-500/10 text-sky-400',
    },
    {
      icon: <Lock size={24} />,
      title: 'Enterprise Edge Security',
      description: 'Standaard uitgerust met automatische DDoS-bescherming, stricte SSL (HTTPS) transport encryptie en slimme rate-limiting op alle gevoelige eindpunten.',
      color: 'bg-rose-500/10 text-rose-400',
    }
  ];

  return (
    <section id="technologie" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
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
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight"
          >
            Enterprise-grade techniek, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
              gebouwd voor integratie.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Een robuust platform met Nederlandse data-opslag, ijzersterke beveiliging en een open API om naadloos in uw bestaande IT-landschap te passen.
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
