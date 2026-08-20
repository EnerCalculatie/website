import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  MessageSquare,
  FileText,
  Zap,
  CheckSquare,
  Calculator,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import imgEnergieprofiel from '../assets/screenshots/energieprofiel.webp';

const STEPS = [
  { icon: MessageSquare, label: 'Klantvraag', description: 'Wens en projectdetails vastleggen' },
  { icon: FileText, label: 'Energienota', description: 'PDF uploaden, verbruik uitlezen' },
  { icon: Zap, label: 'Energieprofiel', description: 'Verbruik en stroompieken in kaart' },
  { icon: CheckSquare, label: 'Advies', description: 'Zonnepanelen, batterij, warmtepomp' },
  { icon: Calculator, label: 'Calculatie', description: 'Scenario en terugverdientijd' },
  { icon: Send, label: 'Offerte', description: 'Direct vanuit dezelfde berekening' },
  { icon: CheckCircle2, label: 'Akkoord', description: 'Digitale acceptatie door klant' },
];

export function Workflow() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  };

  return (
    <section id="workflow" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-primary-text font-bold tracking-wider uppercase text-xs mb-3 block">
            Centrale workflow
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-3">
            Eén dossier. Van klantvraag tot akkoord.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            Gegevens die u bij de intake invoert, stromen automatisch door naar het advies, de calculatie en de offerte.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-xl p-4 text-center flex flex-col items-center shadow-sm relative group hover:border-brand-primary/50 transition-colors"
              >
                <div className="w-9 h-9 mb-2.5 rounded-lg bg-emerald-50 text-brand-primary flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-1">0{idx + 1}</div>
                <p className="font-bold text-slate-900 text-sm mb-1">{step.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Visueel bewijs: Doorstroom in actie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-primary-text font-bold text-xs uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} /> Geen dubbele invoer
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Van energieprofiel direct naar installatieadvies
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Zodra de energienota is verwerkt, staat het stroom- en gasprofiel klaar. Vanuit dit profiel worden zonnepanelen, batterijopslag en warmtepomp direct berekend.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <ArrowRight size={14} className="text-brand-primary" /> Geen Excel overtypen
                </span>
                <span className="flex items-center gap-1">
                  <ArrowRight size={14} className="text-brand-primary" /> Geen rekenfouten
                </span>
              </div>
            </div>
            <div className="w-full md:w-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
              <img
                src={imgEnergieprofiel}
                alt="Energieprofiel calculatie overzicht in EnerCalculatie"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
