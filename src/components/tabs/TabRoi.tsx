import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const roiData = [
  { year: 'Jaar 2', doNothing: 2000, value: 5000 },
  { year: 'Jaar 4', doNothing: 4000, value: 10000 },
  { year: 'Jaar 6', doNothing: 6000, value: 15000 },
  { year: 'Jaar 8', doNothing: 8500, value: 20000 },
  { year: 'Jaar 10', doNothing: 11000, value: 25000 },
  { year: 'Jaar 12', doNothing: 14000, value: 32000 },
  { year: 'Jaar 15', doNothing: 18000, value: 38000 },
  { year: 'Jaar 20', doNothing: 26000, value: 52000 },
  { year: 'Jaar 25', doNothing: 35000, value: 68000 },
];

export function TabRoi() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col lg:flex-row gap-6"
    >
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-800 uppercase tracking-wide mb-8">FINANCIËLE POSITIE OVER 25 JAAR</h3>
        
        <div className="h-72 mb-8">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roiData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `€${val/1000}k`} />
              <Line type="monotone" dataKey="value" stroke="#00a669" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="doNothing" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-6 justify-center items-center pb-4 text-sm font-medium">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> <span className="text-slate-500">Niets Doen (Cumulatief)</span></div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00a669]"></div> <span className="text-slate-800 font-bold">Verduurzaamd Netto Bespaard</span></div>
        </div>
        
        <p className="text-xs text-slate-400 italic mt-4 text-center">
          * De berekening houdt rekening met een jaarlijkse energie-inflatiefactor van 2,5% op stroomtarieven en terugleververgoedingen volgens de NL-salderingswetgeving.
        </p>
      </div>

      <div className="w-full lg:w-[320px] bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col shrink-0">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-6">INVESTERINGSPLAATJE</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-3 text-center">
            <div className="text-[10px] font-bold text-[#00a669] mb-1">TERUGVERDIENTIJD</div>
            <div className="text-xl font-bold text-[#00a669] tracking-tight">7.6 Jaar</div>
          </div>
          <div className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-3 text-center">
            <div className="text-[10px] font-bold text-[#00a669] mb-1">RENDEMENT (IRR)</div>
            <div className="text-xl font-bold text-[#00a669] tracking-tight">14.4%</div>
          </div>
          <div className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-3 text-center">
            <div className="text-[10px] font-bold text-[#00a669] mb-1">NETTO WAARDE (NPV)</div>
            <div className="text-xl font-bold text-[#00a669] tracking-tight">€16.064</div>
          </div>
          <div className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-3 text-center">
            <div className="text-[10px] font-bold text-[#00a669] mb-1">BESPARING (JAAR 1)</div>
            <div className="text-xl font-bold text-[#00a669] tracking-tight">€1.368</div>
          </div>
        </div>

        <div className="space-y-3 pb-6 border-b border-slate-100 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Zonnepanelen (16x €350):</span>
            <span className="font-mono text-slate-900 font-medium">€5.600</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Omvormer:</span>
            <span className="font-mono text-slate-900 font-medium">€1.100</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>BTW Zonnepanelen & Omvormer (0%):</span>
            <span className="font-mono text-[#00a669] font-medium">€0</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Thuisbatterij (5 kWh @ €480):</span>
            <span className="font-mono text-slate-900 font-medium">€2.400</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>BTW Thuisbatterij (21%):</span>
            <span className="font-mono text-slate-900 font-medium">+ €504</span>
          </div>
          <div className="flex justify-between text-slate-600 gap-2">
            <span>Warmtepomp (incl. installatie, na ISDE):</span>
            <span className="font-mono text-slate-900 font-medium">€0</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Montage & Installatiekosten:</span>
            <span className="font-mono text-slate-900 font-medium">€1.500</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-orange-600">Dossierkorting EnerCalculatie:</span>
            <span className="font-mono text-orange-600">- €250</span>
          </div>
        </div>
        
        <div className="pt-4 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-slate-800 mb-1">Subtotaal (Excl. BTW):</div>
            <div className="text-xs text-slate-500">Totaal BTW:</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-slate-900 tracking-tight font-mono">€10.350</div>
            <div className="text-xs text-slate-500 font-mono text-right mt-1">€504</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
