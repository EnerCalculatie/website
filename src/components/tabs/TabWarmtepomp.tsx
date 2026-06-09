import { motion } from 'motion/react';
import { Settings, Info, TrendingDown, Zap } from 'lucide-react';

export function TabWarmtepomp() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col xl:flex-row gap-6 relative"
    >
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Warmtepompadvies inschakelen</h3>
            <p className="text-sm text-slate-500">Integreer de warmtepomp in de ROI berekening.</p>
          </div>
          <div className="w-12 h-6 bg-[#00a669] rounded-full relative shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide flex items-center gap-2">
          <Settings size={14} /> TYPE & VERMOGEN
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="border border-[#00a669] bg-emerald-50/20 rounded-xl p-4 cursor-pointer">
            <div className="font-bold text-slate-900 mb-1">Hybride</div>
            <div className="text-xs text-slate-500">WP + bestaande CV-ketel (warmwater + bijstook op gas)</div>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 opacity-60">
            <div className="font-bold text-slate-900 mb-1">All-electric</div>
            <div className="text-xs text-slate-500">WP doet verwarming én warmwater, gas eruit</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Thermisch vermogen (kW)</label>
            <input type="text" value="6" readOnly className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm font-medium text-slate-900" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">SCOP verwarming</label>
            <input type="text" value="4" readOnly className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm font-medium text-slate-900" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">WP-dekking (%)</label>
            <input type="text" value="70" readOnly className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm font-medium text-slate-900" />
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">HUIDIGE VERWARMING</h4>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Huidige bron</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900" disabled>
              <option>CV-ketel (gas)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Afgiftesysteem</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900" disabled>
              <option>LT-radiatoren</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Isolatieniveau</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900" disabled>
              <option>Matig</option>
            </select>
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
          <Settings size={14} /> PLAATSING & TECHNIEK
        </h4>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Locatie buitenunit</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 disabled">
              <option>— Selecteer —</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-2">Boilervat warmwater (liter)</label>
            <input type="text" value="800" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900" />
          </div>
        </div>
        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm text-slate-900 font-medium">
            <input type="checkbox" className="w-4 h-4 accent-[#00a669] border-slate-300 rounded" checked readOnly/> Voldoet aan geluidsnorm
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-500">
            <input type="checkbox" className="w-4 h-4 border-slate-300 rounded" disabled /> Elektra verzwaren nodig
          </label>
        </div>
      </div>

      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-6">
          <h4 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wide">BEREKENDE IMPACT</h4>
          
          <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-slate-600"><TrendingDown size={14} className="text-[#00a669]"/> Vermeden gas</div>
              <div className="font-bold text-[#00a669]">317 m³</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-slate-600"><Zap size={14} className="text-amber-500"/> Extra stroom</div>
              <div className="font-bold text-amber-600">+627 kWh</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-slate-600">Resterend gas</div>
              <div className="font-bold text-slate-900">249 m³</div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center">
               <div className="font-bold text-slate-900">Netto besparing (jaar 1)</div>
               <div className="font-bold text-[#00a669]">€227</div>
             </div>
             <div className="flex justify-between items-center">
               <div className="font-bold text-slate-900">Netto investering</div>
               <div className="font-bold text-[#00a669]">€0</div>
             </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
          <Info size={16} className="shrink-0 mt-0.5 text-blue-500" />
          <p className="text-xs">
            Berekening op basis van NL-aannames: 8,79 kWh/m³ gas, 90% ketelrendement, 20% warmwateraandeel. Hybride: warmwater + bijstook blijven op de gasketel.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
