import { motion } from 'motion/react';
import { XCircle, CheckCircle } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    "Kritische consument: Klanten zijn steeds beter ingelezen en vragen om een harde, kloppende financiële onderbouwing.",
    "Tijdrovend en foutgevoelig: Tarieven overtypen in Excel kost tijd en leidt snel tot rekenfouten. Dat schaadt het vertrouwen.",
    "Complexe regelgeving: Door wisselende salderingsregels en terugleverkosten is het lastig om het exacte rendement uit te rekenen.",
    "Rommelige presentatie: Losse documentjes en bijgevoegde screenshots maken geen professionele indruk aan de keukentafel.",
  ];

  const solutions = [
    "Onweerlegbare cijfers: Geef uw klant zekerheid met een exacte berekening die elke kritische vraag beantwoordt.",
    "Slimme documentherkenning: Energierekeningen worden automatisch uitgelezen. Geen typefouten, alleen kloppende feiten.",
    "Altijd actueel: Onze rekenmodule rekent automatisch met de nieuwste regels rondom salderen, terugleverkosten en thuisbatterijen.",
    "Onderscheidend rapport: Lever direct een duidelijk en overzichtelijk adviesrapport af dat puur vakmanschap uitstraalt.",
  ];

  return (
    <section id="oplossing" className="pt-16 pb-8 md:pt-24 md:pb-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Waarom installateurs kiezen voor EnerCalculatie
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            U levert het vakmanschap. <br/> Wij verzorgen de financiële onderbouwing.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Met adviessoftware voor verduurzaming geeft u uw klant een helder, kloppend advies — en wint u de opdracht. Wij zorgen dat u die installateur bent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Problem Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">De oude manier</h3>
            </div>
            <ul className="space-y-5">
              {problems.map((prob, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700">
                  <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a669]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <CheckCircle size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">De EnerCalculatie manier</h3>
            </div>
            <ul className="space-y-5 relative z-10">
              {solutions.map((sol, idx) => (
                <li key={idx} className="flex gap-3 text-slate-200">
                  <CheckCircle size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
