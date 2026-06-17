import { motion } from 'motion/react';
import { Rocket, Settings, Users, CheckCircle2 } from 'lucide-react';

export function OnboardingGuarantee() {
  const steps = [
    {
      icon: <Settings size={24} />,
      title: "1. Account & Tarieven inregelen",
      description: "Wij zetten uw bedrijfsgegevens, logo en standaard uurtarieven correct in het systeem."
    },
    {
      icon: <Rocket size={24} />,
      title: "2. Eerste dossier samen maken",
      description: "We plannen een korte online sessie waarin we samen met u uw eerste echte klantdossier van A tot Z verwerken."
    },
    {
      icon: <Users size={24} />,
      title: "3. Team training (optioneel)",
      description: "Werkt u met meerdere adviseurs of schouwers? Wij zorgen dat iedereen precies weet hoe de app werkt."
    }
  ];

  return (
    <section id="overstapservice" className="py-16 md:py-24 bg-brand-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-primary/20 shadow-xl overflow-hidden relative">
          {/* Decoratieve achtergrond */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-brand-primary font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider mb-6">
                <CheckCircle2 size={18} /> Zorgeloze overstap
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-6">
                Geen tijd om nieuwe software in te regelen? Wij doen het voor u.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                De overstap naar nieuwe software voelt vaak als een drempel. Daarom bieden wij bij het <strong>Pro</strong> en <strong>Complete</strong> pakket onze gratis overstapservice aan. U levert de gegevens aan, wij bouwen het in.
              </p>
              
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg">
                Bespreek de mogelijkheden
              </a>
            </div>
            
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex gap-4 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-primary shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}