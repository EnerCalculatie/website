import { motion } from 'motion/react';
import { X, Check, Minus } from 'lucide-react';

export function ComparisonTable() {
  const rows = [
    {
      label: 'Tijd per dossier',
      excel: '2–3 uur',
      advisor: '4–8 uur + wachttijd',
      ener: '< 5 minuten',
    },
    {
      label: 'Kosten per advies',
      excel: 'Eigen uren (onzichtbaar)',
      advisor: '€ 300–800 per rapport',
      ener: 'Inbegrepen in abonnement',
    },
    {
      label: 'Berekeningen',
      excel: 'Handmatig, foutgevoelig',
      advisor: 'Correct, maar niet transparant',
      ener: 'Elke keer dezelfde kloppende uitkomst',
    },
    {
      label: 'Actuele salderingsregels',
      excel: 'Handmatig bijhouden',
      advisor: 'Afhankelijk van adviseur',
      ener: 'Automatisch verwerkt',
    },
    {
      label: "PDOK-luchtfoto's",
      excel: 'Zelf opzoeken',
      advisor: 'Soms inbegrepen',
      ener: 'Direct ingeladen',
    },
    {
      label: 'Adviesrapport voor klant',
      excel: 'Zelf opmaken in Word',
      advisor: 'Geleverd, maar niet uw branding',
      ener: 'Automatisch gegenereerd',
    },
    {
      label: 'Energierekening verwerken',
      excel: 'Handmatig overtypen',
      advisor: 'Zelf aanleveren',
      ener: 'AI-extractie via upload',
    },
    {
      label: 'Offerte laten accepteren',
      excel: 'Los PDF-mailtje, telefonisch nabellen',
      advisor: 'Op papier, fysiek langsgaan',
      ener: 'Digitaal via beveiligde klantlink, met vastlegging',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Nog werken met spreadsheets, losse tools of een externe adviseur?
          </h2>
          <p className="text-lg text-slate-600">
            Zie het verschil in snelheid, kosten en professionaliteit.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-wider w-1/4">
                    Vergelijking
                  </th>
                  <th className="p-6 text-base font-bold text-slate-400 bg-slate-50/30 w-1/4">
                    Spreadsheet + handmatig
                  </th>
                  <th className="p-6 text-base font-bold text-slate-400 bg-amber-50/40 w-1/4">
                    Externe adviseur
                  </th>
                  <th className="p-6 text-base font-bold text-brand-primary bg-brand-primary/5 w-1/4">
                    EnerCalculatie
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((row, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="p-6 text-sm font-semibold text-slate-700">{row.label}</td>
                    <td className="p-6 text-slate-500 bg-slate-50/30">
                      <div className="flex items-start gap-2">
                        <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                        {row.excel}
                      </div>
                    </td>
                    <td className="p-6 text-slate-500 bg-amber-50/20">
                      <div className="flex items-start gap-2">
                        <Minus size={16} className="text-amber-400 mt-0.5 shrink-0" />
                        {row.advisor}
                      </div>
                    </td>
                    <td className="p-6 text-slate-900 font-bold bg-brand-primary/5">
                      <div className="flex items-start gap-2">
                        <Check size={18} className="text-brand-primary mt-0.5 shrink-0" />
                        {row.ener}
                      </div>
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
