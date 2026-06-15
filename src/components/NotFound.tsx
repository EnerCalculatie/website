import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { SEO } from './SEO';

export function NotFound() {
  return (
    <>
      <SEO 
        title="404 - Pagina niet gevonden - EnerCalculatie"
        description="De opgevraagde pagina kon helaas niet worden gevonden."
      />
      <div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-8">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Pagina niet gevonden</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Oeps! De pagina die u zoekt lijkt niet te bestaan of is verplaatst naar een andere URL.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-[#008f5a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 group"
          >
            <Home size={20} />
            Terug naar de homepagina
          </Link>
        </motion.div>
      </div>
    </>
  );
}