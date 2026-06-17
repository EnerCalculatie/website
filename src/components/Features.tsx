import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { FileSearch, Map, Calculator, Battery, CheckSquare, Send, ThermometerSun, ClipboardCheck, Image as ImageIcon, Wind, Car, PiggyBank } from 'lucide-react';

export function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="functies" className="py-16 md:py-24 bg-brand-bg border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
            Belangrijkste functionaliteiten
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900 mb-4">
            Alles wat u nodig heeft voor een onweerlegbaar adviesgesprek
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Gebouwd op praktijkervaring in de installatietechniek. Niet door marketeers, maar door iemand die weet hoe een schouw eruitziet.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {/* Feature 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <FileSearch size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Slimme documentherkenning</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Upload een pdf van de energierekening. Ons systeem leest direct het actuele gasverbruik (m³) en de stroomvraag in piek/daltarief uit. Geen rekenfouten meer door handmatig overtypen.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Snelle woningopname</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Start direct een nieuw dossier door adresgegevens in te voeren. Het actuele energieprofiel en de woningkenmerken worden onmiddellijk voor u in kaart gebracht.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Kadaster-luchtfoto's</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Voer een adres in en wij halen direct de juiste locatie op. U krijgt automatisch de scherpste luchtfoto's via het officiële Nederlandse Kadaster, perfect voor uw legplan.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#1e293b] rounded-[20px] p-8 shadow-lg text-white transition-all group overflow-hidden relative border border-slate-700"
          >
             <div className="absolute right-0 top-0 w-32 h-32 bg-[#00a669]/10 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 bg-[#00a669]/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Rekenmodel Zonnepanelen</h3>
            <p className="text-slate-300 leading-relaxed relative z-10 text-sm">
              Invoer van dakoriëntatie en beschikbare ruimte voedt direct ons rekenmodel. Wij berekenen exact het optimale aantal panelen, het piekvermogen (Wp) en de jaaropbrengst.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Battery size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Rekenmodel Thuisbatterijen</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Optimaliseer en dimensioneer batterijen aan de hand van het berekende opwekoverschot. Direct inzicht in de stijging van het eigen verbruik ter ondervanging van terugleverboetes.
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ThermometerSun size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Warmtepomp Configuratie</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Ondersteun uw adviesgesprek met een hybride of all-electric warmtepompberekening. Ons model neemt de extra stroomvraag direct mee in het totale energieprofiel ter voorkoming van dubbeltellingen.
            </p>
          </motion.div>

          {/* Feature 7 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <CheckSquare size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Exacte rendementsberekening</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Het rekenmodel houdt strikt rekening met complexe wetgeving (zoals de afbouw van de salderingsregeling). Genereer betrouwbare rendementsberekeningen over 10 en 25 jaar.
            </p>
          </motion.div>

          {/* Feature 8 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Digitale schouwrapporten</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Verwerk tijdens of direct na de inspectie alle technische specificaties. Meterkastaansluitingen, kabelroutes en dakoriëntatie worden genoteerd in een strak werkvoorbereidingsrapport.
            </p>
          </motion.div>

          {/* Feature 9 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Professioneel Adviesrapport</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Genereer een prachtig, Nederlandstalig digitaal adviesrapport in luttele seconden. Print direct een PDF voor aan de keukentafel bij uw klant om de deal succesvol te sluiten.
            </p>
          </motion.div>

          {/* Feature 10 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Wind size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Airco Dimensionering</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Bied een compleet klimaatadvies. Bereken eenvoudig het benodigde koelvermogen per ruimte en voeg het extra stroomverbruik naadloos toe aan het verwachte totale energieprofiel.
            </p>
          </motion.div>

          {/* Feature 11 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <Car size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Laadpaal (EV) Configuratie</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Integreer elektrisch rijden in uw advies. Maak het specifieke laadprofiel inzichtelijk voor de klant en controleer direct de impact op de maximale capaciteit van de netaansluiting.
            </p>
          </motion.div>

          {/* Feature 12 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[20px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-pink-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6 relative z-10">
              <PiggyBank size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Subsidie (ISDE) Inzicht</h3>
            <p className="text-slate-600 leading-relaxed relative z-10">
              Neem automatisch de geldende ISDE-subsidies voor warmtepompen mee in uw berekening. Zo ziet de klant direct de lagere netto investering en stijgt uw conversie.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
