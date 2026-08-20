import { motion } from 'motion/react';
import { ArrowDown, Check, X } from 'lucide-react';

const TRADITIONAL_STEPS = [
  'Klant mailt energierekening',
  'PDF openen',
  'Gegevens overtypen',
  'Excel openen',
  'Berekening maken',
  'Scenario aanpassen',
  'Nieuwe berekening',
  'Offerte maken',
  'Gegevens opnieuw invoeren',
  'PDF versturen',
];

const ENERCALCULATIE_STEPS = [
  { title: 'Energienota', desc: 'PDF uploaden of scannen' },
  { title: 'EnerCalculatie', desc: 'Verbruik & tarieven automatisch verwerkt' },
  { title: 'Advies', desc: 'Geoptimaliseerd installatiescenario' },
  { title: 'Calculatie', desc: 'Rendement en investering berekend' },
  { title: 'Offerte', desc: 'Direct vanuit dezelfde gegevens verzonden' },
];

export function ProblemSolution() {
  return (
    <section id="probleem" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-slate-500 font-bold tracking-wider uppercase text-xs mb-3 block">
            Vergelijking werkwijze
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Herkent u dit?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Handmatig gegevens overtypen tussen spreadsheets en documenten kost tijd en verhoogt de kans op fouten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Tradionele manier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <X size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Traditionele workflow</h3>
                <p className="text-xs text-slate-500">Losse tools, herhaaldelijke invoer</p>
              </div>
            </div>

            <div className="space-y-2.5 flex-1">
              {TRADITIONAL_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-5">{idx + 1}.</span>
                  <div className="flex-1 bg-white border border-slate-200/80 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-700 font-medium flex items-center justify-between">
                    <span>{step}</span>
                    {idx < TRADITIONAL_STEPS.length - 1 && (
                      <ArrowDown size={12} className="text-slate-300 ml-2 shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-red-600 font-medium">
              Resultaat: veel dubbel werk en risico op invoerfouten.
            </div>
          </motion.div>

          {/* Met EnerCalculatie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold">
                  <Check size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Met EnerCalculatie</h3>
                  <p className="text-xs text-slate-400">Eén doorlopende workflow</p>
                </div>
              </div>

              <div className="space-y-4">
                {ENERCALCULATIE_STEPS.map((step, idx) => (
                  <div key={idx} className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-brand-primary flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary text-xs flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        {step.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 pl-7">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 bg-slate-800/40 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">De kern</p>
              <p className="text-sm font-semibold text-white">
                De gegevens blijven binnen hetzelfde dossier beschikbaar.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
