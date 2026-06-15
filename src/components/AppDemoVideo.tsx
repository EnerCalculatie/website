import { motion } from 'motion/react';
import { Play, Clock } from 'lucide-react';

export function AppDemoVideo() {
  return (
    <section id="demo-video" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Achtergrond decoratie */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-sm mb-6"
          >
            <Clock size={16} className="text-brand-primary" />
            In 1,5 minuut uitgelegd
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Kijk binnen in de app
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Geen gladde praatjes, maar gewoon zien hoe het werkt. Bekijk hoe u een adres invoert, de energierekening uploadt en direct een strak rapport uitdraait.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 group cursor-pointer aspect-video bg-slate-800 flex items-center justify-center"
        >
          {/* BELANGRIJK: Vervang dit straks door een echte iframe (YouTube/Vimeo) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800"></div>
          
          <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/30 group-hover:scale-110 transition-transform duration-300">
            <Play size={32} className="ml-2 fill-white" />
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <p className="text-sm font-medium text-slate-300 bg-slate-900/60 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
              Plaats hier straks uw eigen screencast (Vimeo/YouTube/Loom)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}