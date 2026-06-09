import { motion } from 'motion/react';
import { Home, Zap, ShieldAlert, CheckCircle, Scan } from 'lucide-react';

export function TabSchouw() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle className="text-emerald-500" size={20} />
        <span className="text-emerald-800 font-medium text-sm">Alle verplichte opnamevelden zijn ingevuld.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pand & Logistiek */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Home size={16} className="text-[#00a669]" /> PAND & LOGISTIEK
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Type Pand</div>
              <div className="text-sm font-medium text-slate-900">Hoekwoning</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Goothoogte (m)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Monument / Beschermd</div>
              <div className="text-sm font-medium text-slate-900">Nee</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Vermoeden asbest</div>
              <div className="text-sm font-medium text-slate-900">Ja</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Parkeergelegenheid</div>
              <div className="text-sm font-medium text-slate-900">&lt;50m lopen</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Benodigd klimmaterieel</div>
              <div className="text-sm font-medium text-slate-900">Standaard ladder</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase uppercase tracking-wider">Foto Voorgevel / Situatie</div>
            <div className="w-full h-32 bg-slate-200 rounded-lg overflow-hidden border border-slate-300">
               <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600&h=300" className="w-full h-full object-cover grayscale" alt="Slimme meter preview" />
            </div>
          </div>
        </div>

        {/* Groepenkast */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Zap size={16} className="text-[#00a669]" /> GROEPENKAST
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Type aansluiting</div>
              <div className="text-sm font-medium text-slate-900">1-fase</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Hoofdzekering (A)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Fysieke Ruimte</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[10px] text-slate-400 font-bold mb-2 uppercase uppercase tracking-wider">Foto Groepenkast</div>
            <div className="w-full h-32 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center">
               <span className="text-slate-400 text-sm flex flex-col items-center gap-2">
                 <Scan size={24} /> Geen foto
               </span>
            </div>
          </div>
        </div>

        {/* Dakkenmerken */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Home size={16} className="text-[#00a669]" /> DAKKENMERKEN
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Daktype</div>
              <div className="text-sm font-bold text-slate-900">Plat</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Dakbedekking</div>
              <div className="text-sm font-bold text-slate-900">EPDM</div>
            </div>
          </div>
        </div>

        {/* Wandconstructie & Plaatsing */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <ShieldAlert size={16} className="text-[#00a669]" /> WANDCONSTRUCTIE & PLAATSING
          </h3>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase uppercase tracking-wider">Wandconstructie</div>
              <div className="text-sm font-bold text-slate-900">Massief steen</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">Omgevingstemperatuur (°C)</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
            <div className="col-span-2">
              <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wider">Kabelroute</div>
              <div className="text-sm font-medium text-slate-900">—</div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
