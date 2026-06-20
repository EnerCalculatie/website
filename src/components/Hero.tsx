import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Database, Zap, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Achtergrond decoratie voor visuele diepte */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Praktijk-focus indicator (Story LP.4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-brand-primary-text font-bold text-xs uppercase tracking-wider mb-8"
          >
            <Zap size={14} className="fill-[#00a669]" />
            Ontwikkeld voor de praktijk
          </motion.div>

          {/* Hoofdtitel (Story LP.1) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-8 break-words"
          >
            De slimste rekenhulp voor de <span className="text-brand-primary">verduurzamingsinstallateur.</span>
            <br className="hidden md:block" />
            <span className="text-slate-500">U voert het gesprek, wij doen het rekenwerk.</span>
          </motion.h1>

          {/* Doelgroep + resultaat */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            Speciaal voor kleine en middelgrote installatiebedrijven, actief in zonnepanelen, thuisbatterijen, warmtepompen, airco's en laadpalen.
            Van energierekening tot onderbouwd verduurzamingsadvies — geen Excel, geen typfouten, geen gemiste wetgeving.
            Alleen een rapport waar uw klant met een gerust hart ja tegen zegt.
          </motion.p>

          {/* Call to Actions (Story LP.3 & LP.5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-4">
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-brand-primary-text text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 group">
                Plan een demo (15 min) <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#demo-video" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center text-center gap-2">
                <Play size={20} className="text-brand-primary fill-brand-primary/20" /> Bekijk hoe het werkt
              </a>
            </div>
            {/* No-risk / garantie formulering (Story LP.13) */}
            <p className="text-sm font-medium text-slate-500 mb-2">
              14 dagen gratis · Opzegbaar per maand
            </p>

            {/* Early adopter urgentie-signaal (geen klantenteller — pre-launch fase) */}
            <p className="text-sm font-semibold text-brand-primary-text">
              Sluit u nu aan als een van de eerste installateurs en denk mee over nieuwe functionaliteiten
            </p>
          </motion.div>

          {/* Trust Badges (Story LP.1) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <ShieldCheck size={18} className="text-[#00a669]" />
              AVG-proof
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <Database size={18} className="text-[#00a669]" />
              Nederlandse servers
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
              <CheckCircle2 size={18} className="text-[#00a669]" />
              Zelfde invoer, zelfde uitkomst
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}