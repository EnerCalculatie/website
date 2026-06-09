import { motion } from 'motion/react';
import { Home, Upload, FileCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Home size={32} />,
      title: "1. Pand registreren",
      description: "Voer het adres in. PDOK-luchtfoto's en het actuele energieprofiel laden automatisch. Geen handmatig opzoekwerk.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Upload size={32} />,
      title: "2. Rekening uploaden",
      description: "Upload de pdf van de energierekening. Onze AI leest piek- en daltarieven en het gasverbruik exact uit. 0% typfouten.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <FileCheck size={32} />,
      title: "3. Rapport downloaden",
      description: "EnerCalculatie berekent het systeem en genereert een professioneel adviesrapport. Klaar voor de klant — in < 5 minuten.",
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Zo werkt het — in 3 stappen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Van eerste inname tot getekende offerte. Wij automatiseren de complexe stappen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Decorative connector line for desktop */}
          <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-0" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm border border-white`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}