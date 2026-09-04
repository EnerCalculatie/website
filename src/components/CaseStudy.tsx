import { motion } from 'motion/react';
import { FileText, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import imgRapport from '../assets/screenshots/adviesrapport.webp';

const CASE_STAGES = [
  {
    step: 'INPUT',
    title: 'Energienota + Klantgegevens',
    desc: 'Jaarverbruik: 4.820 kWh stroom (2.400 normaal / 2.420 dal) en 1.150 m³ gas. Klant vraagt zonnepanelen + thuisbatterij.',
  },
  {
    step: 'ANALYSE',
    title: 'Energieprofiel',
    desc: 'Uitlezen van pieklast, daltarief en zelfconsumptiepatroon zonder installatie (ca. 30%).',
  },
  {
    step: 'ADVIES',
    title: 'Installatiescenario',
    desc: 'Advies: 12 zonnepanelen (5,28 kWp, 4.750 kWh opbrengst) gecombineerd met 10 kWh thuisbatterij.',
  },
  {
    step: 'CALCULATIE',
    title: 'Investering & Rendement',
    desc: 'Zelfconsumptie stijgt van 30% naar 78%. Jaarlijkse besparing berekend conform saldering 2027.',
  },
  {
    step: 'OUTPUT',
    title: 'Offerte & Akkoord',
    desc: 'Klant ontvangt beveiligde link met heldere prijsopbouw (€ 14.850) en accordeert digitaal.',
  },
];

export function CaseStudy() {
  return (
    <section id="case-study" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-brand-primary-text font-bold tracking-wider uppercase text-xs mb-3 block">
            Klantcase in de praktijk
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Van energienota naar advies.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Bekijk hoe een compleet adviestraject voor zonnepanelen en thuisbatterij van begin tot eind verloopt.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Linker kolom: 5 stappen van de case */}
          <div className="lg:col-span-6 space-y-4">
            {CASE_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-start gap-4"
              >
                <div className="w-16 shrink-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-primary bg-emerald-50 px-2 py-1 rounded">
                    {stage.step}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{stage.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stage.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rechter kolom: Adviesrapport screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl"
          >
            <div className="flex items-center justify-between text-slate-400 text-xs mb-3 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <FileText size={14} className="text-brand-primary" />
                Gegenereerd Adviesrapport
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Gereed voor klant
              </span>
            </div>
            <div className="rounded-lg overflow-hidden bg-white shadow-md">
              <img
                src={imgRapport}
                alt="Voorbeeld adviesrapport gegenereerd door EnerCalculatie"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-slate-500" />
                Voorbeeldcase — fictieve gegevens
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://app.enercalculatie.nl/gratis"
                  className="text-white font-bold bg-brand-primary hover:bg-[#008f5a] px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  Gratis proberen <ArrowRight size={12} />
                </a>
                <a
                  href="?intent=rondleiding#contact"
                  className="text-slate-300 hover:text-white underline transition-colors"
                >
                  Plan 15 min rondleiding
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
