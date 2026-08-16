import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FolderOpen, Search, FileText, Calculator, Send, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: FolderOpen, label: 'Dossier', description: 'Klant- en woninggegevens in één plek' },
  { icon: Search, label: 'Analyse', description: 'Energierekening en energieprofiel' },
  { icon: FileText, label: 'Advies', description: 'Zonnepanelen, batterij, warmtepomp en meer' },
  { icon: Calculator, label: 'Calculatie', description: 'Prijsopbouw en rendement' },
  { icon: Send, label: 'Offerte', description: 'Versturen en klant laten beslissen' },
];

export function Workflow() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Eén dossier. Eén workflow. Geen dubbel werk.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Gegevens die u eenmaal invoert, stromen door naar advies, calculatie en offerte.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-2 md:contents">
                <motion.div
                  variants={itemVariants}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-brand-primary/10 text-brand-primary-text flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{step.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </motion.div>
                {idx < STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden md:block text-slate-300 shrink-0"
                    size={20}
                  />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
