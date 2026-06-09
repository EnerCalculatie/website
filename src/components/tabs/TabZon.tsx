import { motion } from 'motion/react';
import { Settings, CheckCircle2, ChevronRight, CheckSquare, Sun } from 'lucide-react';

export function TabZon() {
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
            <h3 className="text-base font-bold text-slate-900">Zonnepaneeladvies inschakelen</h3>
            <p className="text-sm text-slate-500">Integreer de zonnepanelen in de ROI berekening.</p>
          </div>
          <div className="w-12 h-6 bg-[#00a669] rounded-full relative shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
          <Settings size={16} /> SYSTEEM CONFIGURATIES
        </h4>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 mb-2">Aantal Zonnepanelen</label>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11">
              <button className="px-3 bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 h-full border-r border-slate-200">-2</button>
              <input type="text" value="16" readOnly className="w-full text-center font-semibold text-slate-900 outline-none" />
              <button className="px-3 bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 h-full border-l border-slate-200">+2</button>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 mb-2">Zonnepaneel (Catalogus)</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white h-11 disabled">
              <option>— Standaard (handmatig) —</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Handmatig paneelvermogen (Wp)</label>
          <input type="text" value="430" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#00a669] flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} /> Dakoriëntatie (Voorzijde/Achterzijde vlak)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-[#00a669] bg-emerald-50/20 rounded-xl p-4 flex justify-between items-center cursor-pointer">
              <div>
                <div className="text-sm font-bold text-slate-900">Zuid (92% opbrengst)</div>
                <div className="text-xs text-slate-500">Maximale jaargeneratie</div>
              </div>
              <ChevronRight size={18} className="text-[#00a669]" />
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center opacity-60">
              <div>
                <div className="text-sm font-bold text-slate-900">Oost (78% opbrengst)</div>
                <div className="text-xs text-slate-500">Goed voor ochtendverbruik</div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center opacity-60">
              <div>
                <div className="text-sm font-bold text-slate-900">West (78% opbrengst)</div>
                <div className="text-xs text-slate-500">Goed voor avondverbruik</div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center opacity-60">
              <div>
                <div className="text-sm font-bold text-slate-900">Noordoost (58% opbrengst)</div>
                <div className="text-xs text-slate-500">Verminderde instraling</div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center opacity-60">
              <div>
                <div className="text-sm font-bold text-slate-900">Noordwest (58% opbrengst)</div>
                <div className="text-xs text-slate-500">Lage rendement zone</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
             <label className="block text-sm font-medium text-slate-600 mb-2">Dakhelling (graden)</label>
             <div className="flex items-center gap-3">
                <input type="range" className="w-full accent-[#00a669]" min="0" max="60" value="35" readOnly />
                <span className="font-bold text-sm">35°</span>
             </div>
          </div>
          <div className="flex-1">
             <label className="block text-sm font-medium text-slate-600 mb-2">Schaduwhinder</label>
             <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" disabled>
                <option>Geen schaduw (optimaal)</option>
             </select>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[340px] bg-[#0d3f27] rounded-2xl shadow-xl p-8 flex flex-col text-white shrink-0 relative overflow-hidden">
        <div className="z-10 relative">
          <div className="flex justify-between items-center mb-8">
            <div className="bg-[#00a669] font-bold px-3 py-1 rounded text-xs">LEGPLAN RESULTAAT</div>
            <Sun size={20} className="text-emerald-400" />
          </div>
          
          <div className="mb-6">
            <div className="text-emerald-100 text-sm mb-1">Systeemcapaciteit:</div>
            <div className="text-3xl font-black tracking-tight">6.880 <span className="text-xl">Wp</span></div>
          </div>
          
          <div className="mb-8 pb-8 border-b border-emerald-700/50">
            <div className="text-emerald-100 text-sm mb-1">Verwachte jaaropbrengst:</div>
            <div className="text-4xl font-black text-[#5ceb9d] tracking-tight">6.330 <span className="text-xl">kWh / jaar</span></div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-sm">
              <div className="text-emerald-100">Systeemprijs panelen:</div>
              <div className="font-mono font-bold">€5.600</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-emerald-100">BTW</div>
              <div className="text-[#5ceb9d] font-bold">0% Tarief</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-emerald-100">Particulier:</div>
              <div className="text-[#5ceb9d] font-bold">(Nettotarief)</div>
            </div>
          </div>

          <div className="mt-8 bg-[#0a2f1d]/50 rounded-xl p-4 border border-emerald-800/50 flex gap-3 items-start">
             <CheckCircle2 size={16} className="text-[#5ceb9d] shrink-0 mt-0.5" />
             <p className="text-[11px] text-emerald-100 font-medium leading-relaxed">
               <strong className="text-white">Deterministisch Rekenmodel:</strong><br/>
               Deze opbrengsten zijn berekend op basis van de stand van de zon, instralingsdata en de NL-salderingswetgeving (vrijgesproken van AI interpretaties).
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
