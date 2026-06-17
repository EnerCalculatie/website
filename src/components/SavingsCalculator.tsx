import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Clock } from 'lucide-react';

export function SavingsCalculator() {
  const [dossiers, setDossiers] = useState<number>(30);
  
  // Constants based on business rules
  const HOURS_SAVED_PER_DOSSIER = 3;
  const HOURLY_RATE = 75;

  const totalHoursSaved = dossiers * HOURS_SAVED_PER_DOSSIER;
  const totalFinancialValue = totalHoursSaved * HOURLY_RATE;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Hoeveel tijd kost u één dossier vandaag?
          </h2>
          <p className="text-lg text-slate-600">
            Schuif naar uw aantal offertes per maand en zie direct wat EnerCalculatie u oplevert.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-10 border-b border-slate-100 bg-slate-50/50">
            <label className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-slate-900">Aantal dossiers (offertes) per maand:</span>
              <span className="text-2xl font-bold text-brand-primary">{dossiers} plannen</span>
            </label>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={dossiers}
              onChange={(e) => setDossiers(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>5 / mnd</span>
              <span>200 / mnd</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 bg-white">
            <div className="p-8 sm:p-10 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r border-slate-100">
              <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-4">
                <Clock size={28} />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Tijdsbesparing (per maand)</p>
              <p className="text-4xl font-display font-bold text-slate-900">
                {totalHoursSaved} <span className="text-xl text-slate-500 font-medium">uur</span>
              </p>
              <p className="text-sm text-brand-secondary mt-2">
                (~ {Math.round(totalHoursSaved / 8)} werkdagen)
              </p>
            </div>
            
            <div className="p-8 sm:p-10 flex flex-col justify-center items-center text-center bg-gradient-to-br from-white to-green-50/30">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={28} />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">Vrijgekomen Waarde (per maand)</p>
              <p className="text-4xl font-display font-bold text-green-600">
                € {totalFinancialValue.toLocaleString('nl-NL')}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Tegen advies/installatietarief van €{HOURLY_RATE}/u
              </p>
            </div>
          </div>
          
          <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-300 text-sm font-medium text-center sm:text-left">
              * Gebaseerd op gemiddeld 3 uur handwerk per traditioneel dossier.
            </p>
            <button className="whitespace-nowrap bg-brand-primary hover:bg-[#008f5a] text-white px-6 py-3 rounded-xl text-base font-bold transition-colors min-h-[48px]">
              Start besparen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
