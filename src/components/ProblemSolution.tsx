import { motion } from 'motion/react';
import { XCircle, CheckCircle } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    "Verlies van autoriteit: Klanten prikken door een verkooppraatje heen en eisen een keiharde financiële onderbouwing.",
    "Foutgevoelig handwerk: Tarieven overtypen in Excel leidt snel tot rekenfouten, wat het vertrouwen direct schaadt.",
    "Complexe regels: Door wisselende salderingsregels en terugleverkosten verlies je overtuigingskracht als de ROI onduidelijk is.",
    "Geïmproviseerde offertes: Losse Word-documentjes en bijgevoegde screenshots maken een rommelige indruk aan de keukentafel.",
  ];

  const solutions = [
    "Onweerlegbare cijfers: Geef de klant zekerheid met een deterministische berekening die elke kritische vraag feilloos beantwoordt.",
    "Foutloze data-extractie: Energierekeningen worden via AI exact uitgelezen. Geen typefouten, alleen kloppende feiten.",
    "Altijd actueel: De ROI-engine rekent automatisch met de nieuwste regels rondom salderen, terugleverkosten en batterijen.",
    "Onderscheidend rapport: Lever direct een prachtig, overzichtelijk adviesrapport af dat pure professionaliteit uitstraalt.",
  ];

  return (
    <section id="oplossing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Waarom installateurs kiezen voor EnerCalculatie
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Jij verkoopt vertrouwen. <br/> Wij leveren de onderbouwing.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            De installateur die zijn klant een foutloos, actueel adviesrapport kan geven wint de deal. Wij zorgen dat jij die installateur bent.
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
