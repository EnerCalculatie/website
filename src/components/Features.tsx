import { motion } from 'motion/react';
import { FileSearch, Map, Calculator, Battery, CheckSquare, Send, ThermometerSun, ClipboardCheck, Image as ImageIcon } from 'lucide-react';

export function Features() {
  return (
    <section id="functies" className="py-24 bg-brand-bg border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Onze Core Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Alles wat je nodig hebt voor een onweerlegbaar adviesgesprek
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Gebouwd op praktijkervaring in de installatietechniek. Niet door marketeers, maar door iemand die weet hoe een schouw eruitziet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <FileSearch size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">AI Schema's & Document Extractie</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Upload een pdf van de energierekening. Onze AI-module extracteert onmiddellijk het actuele gasverbruik (m³) en de stroomvraag in piek/daltarief. 0% foutmarge op handmatige invoer.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Snelle Property Intake</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Start direct met een pand registratie door het opgeven van adresgevens, bouwjaar en gezinssamenstelling waarna het actuele energieprofiel onmiddellijk gevisualiseerd wordt.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">PDOK-Luchtfoto's & Dak</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Voer een adres in en wij geocoderen de locatie direct. Haal automatisch portrait daksatellietbeelden op via het officiële Nederlandse WMS portaal ten behoeve van uw legplan.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-[#1e293b] rounded-[20px] p-8 shadow-lg text-white transition-all group overflow-hidden relative border border-slate-700"
          >
             <div className="absolute right-0 top-0 w-32 h-32 bg-[#00a669]/10 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 bg-[#00a669]/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Zonnepanelen (PV) Engine</h3>
            <p className="text-slate-300 leading-relaxed relative z-10 text-sm">
              Invoer van dakoriëntatie en dakruimte voedt direct onze deterministische reken-engine. We berekenen 100% accuraat het optimale aantal panelen, het piekvermogen (Wp) en de jaaropbrengst.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Battery size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Thuisbatterij Engine</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Optimaliseer en dimensioneer batterijen aan de hand van het berekende opwekoverschot. Direct inzicht in de stijging van het eigen verbruik ter ondervanging van terugleverboetes.
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ThermometerSun size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Warmtepomp Configuratie</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Ondersteun uw adviesgesprek met een hybride of all-electric warmtepompcalculatie. De engine dekt extra stroomvraag accuraat af in het totale energieprofiel ter voorkoming van dubbeltellingen.
            </p>
          </motion.div>

          {/* Feature 7 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <CheckSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Deterministische ROI</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              De engine houdt strikt rekening met complexe wetgeving (zoals BTW-teruggaaf en de salderingsregeling). Genereer rendementsberekeningen over 10 en 25 jaar.
            </p>
          </motion.div>

          {/* Feature 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Digitale Schouwrapporten</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Verwerk tijdens of direct na de inspectie alle technische specificaties. Meterkastaansluitingen, kabelroutes en dakoriëntatie worden genoteerd in een strak werkvoorbereidingsrapport.
            </p>
          </motion.div>

          {/* Feature 9 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Concept Rapport & PDF</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Genereer een prachtig, Nederlandstalig digitaal adviesrapport in luttele seconden. Print direct een PDF voor aan de keukentafel bij uw klant om de deal succesvol te sluiten.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
