import { motion } from 'motion/react';
import { FileText, Printer, CheckCircle, Sparkles } from 'lucide-react';

export function TabRapport() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col xl:flex-row gap-6 relative"
    >
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10">
        
        <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
          <div>
            <div className="text-xs font-bold text-[#00a669] mb-2 uppercase tracking-widest">CONCEPT ADVIESVOORSTEL</div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Adviesrapport Zonne-energie</h2>
            <div className="font-mono text-xs text-slate-400">Dossier ID: 522d3fe5-df79-408e-a737-fb8633e0ff92</div>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold text-[#00a669]">Jan Voorbeeld</h3>
            <div className="text-xs text-slate-500 mt-1">KvK: 12345678<br/>BTW: NL123456789B01<br/>info@voorbeeldklant.nl</div>
            <div className="text-[10px] text-slate-400 mt-2">Offertevaliditeit: 30 dagen</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10 text-sm">
           <div>
             <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">LOCATIE GEGEVENS</div>
             <div className="font-medium text-slate-900">
               Fictiestraat 42<br/>
               1234 AB Zonnestad
             </div>
           </div>
           <div>
             <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">GEBOUW KENMERKEN</div>
             <div className="font-medium text-slate-900 space-y-1">
               <div>Bouwjaar: <span className="font-bold">2000</span></div>
               <div>Label: <span className="font-bold">G</span></div>
               <div>Bewoners: <span className="font-bold">1 personen</span></div>
             </div>
           </div>
        </div>

        <div className="mb-10">
           <div className="flex justify-between items-end mb-4">
             <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">PERSOONLIJKE TOELICHTING</h4>
             <button className="flex items-center gap-2 text-sm font-bold text-[#00a669] border border-[#00a669] rounded-lg px-4 py-2 hover:bg-emerald-50 transition-colors">
               <Sparkles size={16} /> Schrijf AI Samenvatting
             </button>
           </div>
           <p className="text-sm text-slate-500 italic">
           Klik hierboven op 'Schrijf AI Samenvatting' om door de AI-adviseur een gepersonaliseerde brief te laten formuleren op basis van de verbruiksgegevens en netcongestie risks.
           </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">TECHNISCHE PARAMETERS</h4>
          <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">COMPONENT</th>
                  <th className="px-4 py-3 font-semibold">OMSCHRIJVING</th>
                  <th className="px-4 py-3 font-semibold text-right">SPECIFICATIE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-4 font-semibold text-slate-900">Zonnepanelen</td>
                  <td className="px-4 py-4 text-slate-600">NL High Efficiency N-Type All-Black panels</td>
                  <td className="px-4 py-4 text-right font-mono font-medium">16 panelen<br/>(6880 Wp)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 font-semibold text-slate-900">Verwachte Opbrengst</td>
                  <td className="px-4 py-4 text-slate-600">Deterministische jaaropwekzone (Zuidvlak)</td>
                  <td className="px-4 py-4 text-right font-mono font-bold text-[#00a669]">6.330 kWh / jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">
        <div className="flex gap-3 mb-2">
          <button className="flex-1 bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-bold text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50">
            Deel Rapport
          </button>
          <button className="flex-[1.5] bg-[#00a669] text-white rounded-lg py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#008f5a]">
            <Printer size={16} /> Rapport Afdrukken / PDF
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-5">ADVIES STATUS</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
               <CheckCircle size={18} className="text-[#00a669] shrink-0 mt-0.5" />
               <span className="text-sm text-slate-700">Property Dossier ingesteld</span>
            </div>
            <div className="flex items-start gap-3">
               <CheckCircle size={18} className="text-[#00a669] shrink-0 mt-0.5" />
               <span className="text-sm text-slate-700">Legplan opbrengsten geconsolideerd</span>
            </div>
            <div className="flex items-start gap-3">
               <CheckCircle size={18} className="text-[#00a669] shrink-0 mt-0.5" />
               <span className="text-sm text-slate-700">ROI financiën deterministisch getoetst</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-4 border-t border-slate-200">
            Het platform genereert een officieel advies dat direct gedeeld kan worden als interactieve link of als uitgeprinte PDF overhandigd tijdens het keukentafelgesprek.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
