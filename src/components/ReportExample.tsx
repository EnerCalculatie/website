import { motion } from 'motion/react';
import { FileText, Download, Eye, CheckCircle2 } from 'lucide-react';

export function ReportExample() {
  return (
    <section id="rapport-voorbeeld" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-secondary font-semibold tracking-wider uppercase text-sm mb-2 block">
              Het Eindresultaat
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Dit is wat jouw klant in handen krijgt
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Een professioneel, gepersonaliseerd adviesrapport — gegenereerd in EnerCalculatie in minder dan 5 minuten. Geen losse mailtjes of vage Excel-screenshots, maar een rapport waar jouw expertise vanaf straalt.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Volledig geautomatiseerde opwek- en ROI-tabellen",
                "Visueel legplan en PDOK-omgevingsbeelden",
                "Gepersonaliseerde toelichting (AI-ondersteund)",
                "Direct herkenbare besparings-KPI's"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 size={20} className="text-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/voorbeeld-rapport.pdf" 
                target="_blank"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all"
              >
                <Eye size={18} /> Bekijk voorbeeld PDF
              </a>
              <a 
                href="/voorbeeld-rapport.pdf" 
                download
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3.5 rounded-xl font-bold transition-all"
              >
                <Download size={18} /> Downloaden
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Rapport Preview Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adviesrapport.pdf</div>
                <FileText size={16} className="text-slate-400" />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1664575196412-ed801e8333a1?auto=format&fit=crop&q=80&w=800" 
                alt="Rapport Voorbeeld" 
                className="w-full h-auto opacity-90"
              />
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-brand-primary/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}