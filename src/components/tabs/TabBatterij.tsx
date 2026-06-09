import { motion } from 'motion/react';
import { Battery, Zap, AlertCircle } from 'lucide-react';

export function TabBatterij() {
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
            <h3 className="text-base font-bold text-slate-900">Thuisbatterij advies inschakelen</h3>
            <p className="text-sm text-slate-500">Integreer energieopslag in de ROI berekening.</p>
          </div>
          <div className="w-12 h-6 bg-[#00a669] rounded-full relative shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2 uppercase">Thuisbatterij (Catalogus)</label>
          <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" disabled>
            <option>— Standaard (handmatig) —</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2 uppercase">Handmatige opslagcapaciteit (kWh)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="border border-[#00a669] bg-emerald-50/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer text-center">
              <div className="text-2xl font-bold text-slate-900"><span className="text-3xl">5</span> kWh</div>
              <div className="text-[10px] text-slate-400 mt-1">Compact huis</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center opacity-60">
              <div className="text-xl font-bold text-slate-900">10 kWh</div>
              <div className="text-[10px] text-slate-500 mt-1">Standaard gezin</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center opacity-60">
              <div className="text-xl font-bold text-slate-900">15 kWh</div>
              <div className="text-[10px] text-slate-500 mt-1">Groot verbruik</div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center opacity-60">
              <div className="text-xl font-bold text-slate-900">20 kWh</div>
              <div className="text-[10px] text-slate-500 mt-1">Warmtepomp ready</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-600 mb-2">Batterijtechnologie / Chemie</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" disabled>
              <option>LFP (Lithium-ijzerfosfaat - Brandveilig)</option>
            </select>
          </div>
          <div className="flex-1 bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex gap-2 w-full">
            <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="text-xs text-amber-800 leading-tight">
              <strong>Meterkast:</strong> Voor een thuisbatterij is een slimme meter (SMR5 of vergelijkbaar) een harde eis om de laadsturing correct in te richten.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-[340px] bg-[#0f172a] rounded-2xl shadow-xl p-8 flex flex-col text-white shrink-0 relative overflow-hidden">
        <div className="z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-bold">
               <Zap size={16} /> Opslag Metrics
            </div>
            <div className="bg-[#00a669] font-bold px-2 py-0.5 rounded text-[10px]">LIVE</div>
          </div>
          
          <div className="mb-2">
            <div className="text-slate-400 text-sm mb-1">Zelfconsumptie stijging:</div>
            <div className="text-4xl font-black text-[#5ceb9d] tracking-tight">+13.8%</div>
          </div>
          
          <div className="mb-8 pb-6 border-b border-slate-800 text-xs text-slate-400">
            E-stroom die lokaal wordt verbruikt in plaats van teruggeleverd.
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center text-sm">
              <div className="text-slate-300">Systeemprijs batterij:</div>
              <div className="font-mono text-white">€2.400</div>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div className="text-slate-300 pt-0.5">BTW<br/>Teruggave:</div>
              <div className="text-right">
                <div className="text-[#5ceb9d] font-mono">Subsidie BTW-reclaim</div>
                <div className="text-[#5ceb9d] font-mono">mogelijk</div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-slate-300">Systeem<br/>verhouding:</div>
              <div className="text-white text-right font-mono">0.3x<br/>dagopwekking</div>
            </div>
          </div>

          <div className="mt-auto pt-4 bg-[#1e293b]/50 rounded-xl p-4 border border-slate-800 flex gap-3 items-start">
             <Battery size={16} className="text-[#5ceb9d] shrink-0 mt-0.5" />
             <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
               <strong className="text-white">Voorkom Terugleverkosten!</strong><br/>
               Door stroom op te slaan in plaats van terug te leveren aan het net, voorkomt u de gemiddeld <strong>€0,08 per kWh terugleverheffing</strong> die Nederlandse energiemaatschappijen tegenwoordig opleggen op zonnepaneelhouders.
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
