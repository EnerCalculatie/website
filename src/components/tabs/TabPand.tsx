import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export function TabPand() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col xl:flex-row gap-6 relative"
    >
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-800 mb-6 uppercase tracking-wide flex items-center gap-2">
          <Home size={18} className="text-[#00a669]" /> PAND & KLANTDOSSIER REGISTRATIE
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
           <div>
             <label className="block text-sm font-medium text-slate-600 mb-2">Straat + Huisnummer</label>
             <input type="text" value="Fictiestraat 42" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-600 mb-2">Postcode + Plaats</label>
             <input type="text" value="1234 AB Zonnestad" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-600 mb-2">Naam Klant</label>
             <input type="text" value="Jan Voorbeeld" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
           </div>
           <div>
             <label className="block text-sm font-medium text-slate-600 mb-2">Klant E-mail</label>
             <input type="text" value="info@voorbeeldklant.nl" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
           </div>
        </div>

        <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wide">Gebouw profiel</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Type Pand</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white disabled">
              <option>Hoekwoning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Bouwjaar</label>
            <input type="text" value="2000" readOnly className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Energielabel</label>
            <select className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white disabled">
              <option>G</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
