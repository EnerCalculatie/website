import { motion } from 'motion/react';
import { Link } from 'lucide-react';

const integrations = [
  {
    name: 'Exact Online',
    description: 'Synchroniseer klanten en projecten automatisch met uw boekhouding.',
  },
  {
    name: 'Teamleader',
    description: 'Koppel dossiers aan uw CRM en agenda voor een naadloze workflow.',
  },
  {
    name: 'Afas',
    description: 'Exporteer naar uw administratie zonder handmatig overtypen.',
  },
  {
    name: 'PDOK Kadaster',
    description: 'Luchtfoto\'s en panddata direct en veilig ingeladen via het officiële Kadaster.',
  },
];

export function Integrations() {
  return (
    <section id="integraties" className="py-24 bg-white">
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Werkt naadloos samen met uw bestaande software
          </h2>
          <p className="text-lg text-slate-600">
            Koppel EnerCalculatie aan de systemen die u al gebruikt en voorkom dubbel invoerwerk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50/50 rounded-2xl p-6 text-center border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="flex justify-center mb-6 h-16 items-center">
                {/* BELANGRIJK: Vervang deze div door de daadwerkelijke <img /> met het SVG-logo */}
                <div className="h-16 w-full flex items-center justify-center bg-slate-200/60 rounded-lg text-slate-500 font-bold p-2 text-center">
                  {integration.name}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{integration.name}</h3>
              <p className="text-sm text-slate-500 h-20">{integration.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-600">
            Staat uw softwarepakket er niet bij? <a href="#contact" className="font-bold text-brand-primary hover:underline">Neem contact op</a> — wij denken graag met u mee.
          </p>
        </div>
      </div>
    </section>
  );
}