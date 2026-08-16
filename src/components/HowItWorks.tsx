import { motion } from 'motion/react';
import { Home, Upload, FileCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: <Home size={32} className="text-blue-600" />,
      title: "Pand registreren",
      description: "Voer het adres in. Kadaster-luchtfoto's en het actuele energieprofiel worden direct ingeladen. U hoeft niets meer handmatig op te zoeken.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      number: "2",
      icon: <Upload size={32} className="text-purple-600" />,
      title: "Energierekening uploaden",
      description: "Upload een pdf van de energierekening. Ons systeem leest piek- en daltarieven en het gasverbruik exact uit. Voorkom rekenfouten door handmatig overtypen.",
      color: "bg-purple-50 border-purple-100"
    },
    {
      number: "3",
      icon: <FileCheck size={32} className="text-emerald-600" />,
      title: "Offerte versturen en laten accepteren",
      description: "EnerCalculatie berekent het optimale systeem en stelt de offerte samen. Verstuur een beveiligde klantlink — uw klant bekijkt de offerte online en beslist digitaal.",
      color: "bg-emerald-50 border-emerald-100"
    }
  ];

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Zo werkt het — in 3 stappen
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Van eerste woningopname tot getekende offerte. Wij automatiseren het complexe rekenwerk voor u.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative mt-16">
          {/* Decoratieve verbindingslijn voor desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-100 rounded-full" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative mb-8">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm z-20 shadow-md">
                  {step.number}
                </div>
                <div className={`w-24 h-24 rounded-3xl ${step.color} border-2 flex items-center justify-center shadow-sm bg-white relative z-10`}>
                  {step.icon}
                </div>
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