import { motion } from 'motion/react';
import { Zap, Flame, Scan } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const energyData = [
  { name: 'Jan', value: 420 },
  { name: 'Feb', value: 360 },
  { name: 'Mar', value: 310 },
  { name: 'Apr', value: 240 },
  { name: 'Mei', value: 200 },
  { name: 'Jun', value: 170 },
  { name: 'Jul', value: 170 },
  { name: 'Aug', value: 200 },
  { name: 'Sep', value: 240 },
  { name: 'Okt', value: 310 },
  { name: 'Nov', value: 380 },
  { name: 'Dec', value: 450 },
];

export function TabEnergie() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col lg:flex-row gap-6"
    >
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-5 relative">AFGEREGELDE PARAMETERS</h3>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2"><Zap size={14} className="text-[#00a669]"/> Elektriciteit</span>
              <span className="text-xs text-slate-400">Jaarlijks</span>
            </div>
            <div className="relative">
               <input type="text" value="3500" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
               <span className="absolute right-3 top-2.5 text-sm text-slate-500">kWh</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2"><Flame size={14} className="text-red-500"/> Gasverbruik</span>
              <span className="text-xs text-slate-400">Jaarlijks</span>
            </div>
            <div className="relative">
               <input type="text" value="566" readOnly className="w-full border border-[#00a669] ring-1 ring-[#00a669] rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
               <span className="absolute right-3 top-2.5 text-sm text-slate-500">m³</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2"><Scan size={14} className="text-slate-500"/> Metering Type</span>
              <span className="text-xs text-slate-400">Meterkast status</span>
            </div>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" disabled>
              <option>SMR5 (Slimme Meter)</option>
            </select>
          </div>
        </div>

        <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-6">
          <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">Salderingsregeling (NL afbouw)</h4>
          <p className="text-xs text-amber-700/80 mb-4">Kies het jaar waarop de installatie actief is. De salderingsfactor bepaalt hoeveel teruggeleverde stroom tegen het volledige tarief verrekend wordt.</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-amber-500 text-white rounded-lg p-2 text-center border border-amber-600">
              <div className="text-xs font-bold font-mono">2024</div>
              <div className="text-[10px]">100%</div>
            </div>
            <div className="flex-1 bg-amber-100 text-amber-800 rounded-lg p-2 text-center border border-amber-200 opacity-50">
              <div className="text-xs font-bold font-mono">2025</div>
              <div className="text-[10px]">69%</div>
            </div>
            <div className="flex-1 bg-amber-100 text-amber-800 rounded-lg p-2 text-center border border-amber-200 opacity-50">
              <div className="text-xs font-bold font-mono">2026</div>
              <div className="text-[10px]">37%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide">GESCHAT MAANDELIJKS VERBRUIK</h3>
          <div className="text-right">
             <div className="text-xs text-slate-500">Jaarlijkse energiekosten:</div>
             <div className="text-2xl font-black text-slate-900">€1.884</div>
          </div>
        </div>
        
        <div className="h-64 mb-8">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
              <Bar dataKey="value" fill="#00a669" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-4 mt-auto">
          <div className="flex-1 bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
            <div className="text-xs font-bold text-[#00a669] mb-1">STROOMKOSTEN</div>
            <div className="text-lg font-bold text-slate-800">€1.120 p.j.</div>
          </div>
          <div className="flex-1 bg-red-50/50 rounded-xl p-4 border border-red-50">
            <div className="text-xs font-bold text-red-500 mb-1">GASKOSTEN</div>
            <div className="text-lg font-bold text-slate-800">€764 p.j.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
