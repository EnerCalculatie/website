import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function ComparisonTable() {
  const rows = [
    { label: 'Tijd per dossier', excel: '2–3 uur', ener: '< 5 minuten' },
    { label: 'Foutmarge berekeningen', excel: 'Hoog', ener: '0%' },
    { label: 'Actuele salderingsregels', excel: 'Handmatig bijhouden', ener: 'Automatisch verwerkt' },
    { label: 'PDOK-luchtfoto\'s', excel: 'Zelf opzoeken', ener: 'Direct ingeladen' },
    { label: 'Adviesrapport voor klant', excel: 'Zelf opmaken in Word', ener: 'Automatisch gegenereerd' },
    { label: 'Energierekening verwerken', excel: 'Handmatig overtypen', ener: 'AI-extractie via upload' },
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Nog werken met Excel en losse tools?
          </h2>
          <p className="text-lg text-slate-600">
            Zie het verschil in efficiëntie en professionaliteit.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider">Vergelijking</th>
                  <th className="p-6 text-lg font-bold text-slate-400 bg-slate-50/30">Excel + handmatig</th>
                  <th className="p-6 text-lg font-bold text-brand-primary bg-brand-primary/5">EnerCalculatie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="p-6 text-sm font-semibold text-slate-700">{row.label}</td>
                    <td className="p-6 text-slate-500 bg-slate-50/30">
                      <div className="flex items-center gap-2"><X size={16} className="text-red-400" /> {row.excel}</div>
                    </td>
                    <td className="p-6 text-slate-900 font-bold bg-brand-primary/5">
                      <div className="flex items-center gap-2"><Check size={18} className="text-brand-primary" /> {row.ener}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}