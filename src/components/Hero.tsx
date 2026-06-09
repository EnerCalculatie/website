import { motion } from 'motion/react';
import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-secondary/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-6 border border-brand-primary/20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Platform voor de Nederlandse installatiebranche
          </span>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-[1.1] mb-6">
            Van klantinname tot verkoopklaar advies.{' '}
            <span className="text-brand-primary">
              In minder dan 5 minuten.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            De AI-gedreven SaaS-applicatie voor Nederlandse installateurs van zonnepanelen en thuisbatterijen. Elimineer handmatig typewerk, verhoog uw conversie met 15% en reduceer calculatiefouten naar 0%.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#008f5a] text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 group">
              Boek een demo
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-medium transition-all shadow-sm hover:shadow active:scale-95 group">
              Neem contact op
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Direct toegang</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> AVG-proof in Nederland</span>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <DashboardMockup />
      </div>
    </section>
  );
}
