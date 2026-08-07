import { motion } from 'motion/react';
import { ArrowRight, FileText, CheckCircle2, Zap } from 'lucide-react';
import { blogCtaUrl } from './blogCtaUrl';
import { categoryCta } from './blog/categoryCta';

interface FreeIntakeCTAProps {
  /** Blogartikel-slug + categorie, voor UTM-attributie en categorie-
   *  specifieke headline. Optioneel zodat de component ook buiten
   *  blogcontext (bv. andere pagina's) bruikbaar blijft. */
  slug?: string;
  category?: string;
}

export function FreeIntakeCTA({ slug, category }: FreeIntakeCTAProps) {
  const href = slug ? blogCtaUrl(slug, 'bottom') : 'https://app.enercalculatie.nl/gratis';
  const headline = slug ? categoryCta(category).headline : 'Zelf ervaren hoe geautomatiseerd advies werkt?';
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
          {headline}
        </h3>
        <p className="text-slate-300 leading-relaxed mb-8 text-lg">
          Vul postcode en jaarverbruik in en zie binnen enkele seconden een echte, live berekening — geen account, geen upload nodig. Wilt u daarna het volledige whitelabel-rapport voor uw klant? Upload dan de energienota en genereer het in 2 minuten.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Direct resultaat op postcode + kWh</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-brand-primary shrink-0" />
            <span>Optioneel: volledig whitelabel adviesrapport</span>
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
          href={href}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary-text hover:bg-white hover:text-slate-900 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg group"
        >
          <FileText size={20} />
          Probeer Direct Gratis
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}
