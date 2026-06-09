import { motion } from 'motion/react';
import { Scan, Upload, FileText, Zap } from 'lucide-react';

export function TabScan() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center sm:p-12">
         <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
           <Scan size={32} />
         </div>
         <h2 className="text-2xl font-bold text-slate-900 mb-2">Intelligente AI Document Scan</h2>
         <p className="text-slate-500 mb-8 max-w-lg mx-auto">
           Upload een energierekening of slimme meter uitdraai. Onze AI extraheert direct het historische verbruik en de huidige tarieven.
         </p>

         <button className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors inline-flex items-center gap-2">
           <Upload size={18} /> Upload Document (PDF/JPG)
         </button>

         <div className="mt-12 border-t border-slate-100 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
           <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
             <FileText size={20} className="text-slate-400 mb-3" />
             <div className="font-bold text-slate-900 text-sm mb-1">Automatische Tarieven</div>
             <div className="text-xs text-slate-500">Leest de kwh- en gas-tarieven direct uit de jaarnota.</div>
           </div>
           <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
             <Scan size={20} className="text-slate-400 mb-3" />
             <div className="font-bold text-slate-900 text-sm mb-1">Meterstanden</div>
             <div className="text-xs text-slate-500">Registreert en structureert de meterstanden foutloos.</div>
           </div>
           <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
             <Zap size={20} className="text-slate-400 mb-3" />
             <div className="font-bold text-slate-900 text-sm mb-1">Directe Import</div>
             <div className="text-xs text-slate-500">Vult het Energieprofiel tabblad automatisch in na scan.</div>
           </div>
         </div>
      </div>
    </motion.div>
  );
}
