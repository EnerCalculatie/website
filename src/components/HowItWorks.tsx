import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FileText, Calculator, FileCheck, Send } from 'lucide-react';

// Eén samengevatte uitleg van de workflow — vervangt de eerdere losse 7-stappen
// workflow, de 4-stappen "klantreis" en de producttour-inleiding, die inhoudelijk
// hetzelfde verhaal drie keer vertelden. De interactieve schermtour (AppDemoVideo)
// blijft het gedetailleerde, visuele vervolg op deze samenvatting.
const STEPS = [
  {
    icon: FileText,
    title: 'Energienota uploaden',
    description: 'PDF van de energierekening uploaden — verbruik, piek- en daltarief worden automatisch uitgelezen, niet handmatig overtypen.',
  },
  {
    icon: Calculator,
    title: 'Advies berekenen',
    description: 'Zonnepanelen, thuisbatterij, warmtepomp, airco en laadpaal worden doorgerekend als samenhangend advies, inclusief actuele salderingsregels (2027).',
  },
  {
    icon: FileCheck,
    title: 'Rapport genereren',
    description: 'Een onderbouwd adviesrapport met rendement en terugverdientijd, klaar om met de klant te delen.',
  },
  {
    icon: Send,
    title: 'Offerte versturen',
    description: 'Vanuit dezelfde calculatie direct een offerte samenstellen en versturen als beveiligde klantlink — de klant beslist digitaal.',
  },
];

export function HowItWorks() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  };

  return (
    <section id="workflow" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-brand-primary-text font-bold tracking-wider uppercase text-xs mb-3 block">
            Hoe het werkt
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-black text-slate-900 mb-3">
            Van energienota naar offerte in 4 stappen
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Eén dossier, gegevens die automatisch doorstromen — niet opnieuw invoeren tussen advies en offerte.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm relative hover:border-brand-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-mono text-slate-400">Stap 0{idx + 1}</span>
                </div>
                <p className="font-bold text-slate-900 text-base mb-1.5">{step.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
