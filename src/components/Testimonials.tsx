import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="klantcases" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-brand-primary/20 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-brand-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider mb-6 relative z-10">
            <Star size={16} className="fill-brand-primary" /> Early Adopter Programma
          </span>
          
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-6 relative z-10">
            Word een van onze eerste succesverhalen
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
            EnerCalculatie is volop in ontwikkeling samen met een selecte groep installateurs. Sluit u aan als early adopter, profiteer van speciale voorwaarden en denk direct mee over nieuwe functionaliteiten die uw werk makkelijker maken.
          </p>
          
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#008f5a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg relative z-10 group"
          >
            Vraag early adopter-voorwaarden op
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}