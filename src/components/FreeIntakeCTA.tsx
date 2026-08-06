import { motion } from 'motion/react';
import { ArrowRight, FileText, CheckCircle2, Zap } from 'lucide-react';

export function FreeIntakeCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900 rounded-3xl p-8 sm:p-10 mt-12 relative overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white/10 text-brand-primary font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4 border border-white/10 shadow-sm backdrop-blur-sm">
          <Zap size={16} /> Gratis Proberen
        </div>
        <h3 className="text-xl md:text-3xl font-black text-white mb-4">
          Zelf ervaren hoe geautomatiseerd advies werkt?
        </h3>
        <p className="text-slate-300 leading-relaxed mb-8 text-lg">
          Stop met handmatig gegevens overtypen. Gebruik de gratis AI-scan en genereer binnen 2 minuten een compleet, gepersonaliseerd verduurzamingsrapport voor uw klant.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Upload een factuur of PDF</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Direct een whitelabel adviesrapport</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Slimme ROI en terugverdientijd</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Geen account of creditcard nodig</span>
          </li>
        </ul>

        <a
          href="https://app.enercalculatie.nl/gratis"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary-text hover:bg-white hover:text-slate-900 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg group"
        >
          <FileText size={20} />
          Genereer Nu Uw Eerste Rapport
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
