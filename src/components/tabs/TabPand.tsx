import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, AlertTriangle } from 'lucide-react';

export function TabPand() {
  const [bouwjaar, setBouwjaar] = useState(2021);
  const [label, setLabel] = useState('G');

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
            <input 
              type="number" 
              value={bouwjaar} 
              onChange={(e) => setBouwjaar(parseInt(e.target.value))}
              className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Energielabel</label>
            <select 
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full border border-slate-200 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-900 bg-white"
            >
              <option value="A++++">A++++</option>
              <option value="A">A</option>
              <option value="C">C</option>
              <option value="E">E</option>
              <option>G</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {bouwjaar > 2010 && label === 'G' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="text-amber-500 shrink-0" size={18} />
              <p className="text-sm text-amber-800">
                <strong>Onwaarschijnlijke combinatie:</strong> Een woning uit {bouwjaar} heeft zelden energielabel G. Controleer of de gegevens correct zijn overgenomen.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
