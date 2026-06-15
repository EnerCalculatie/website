import { useState } from 'react';
import { FallbackLogo } from './FallbackLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Final CTA Block */}
      <div className="bg-[#00a669] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#008f5a] opacity-50 radial-gradient-circle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Zelf ervaren hoeveel tijd EnerCalculatie u bespaart?
          </h2>
          <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto font-medium">
            Plan een korte demo en zie in 20 minuten precies hoe het werkt — van energierekening tot compleet adviesrapport.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 inline-block text-center">
              Boek een demo
            </a>
            <a href="#pricing-calculator" className="bg-black/10 hover:bg-black/20 border border-white/20 text-white px-8 py-4 rounded-xl font-medium transition-colors inline-block text-center">
              Bereken uw tijdsbesparing
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 bg-white px-2 py-1.5 rounded-xl w-fit">
              {!imageError ? (
                <img 
                  src="/logo.png" 
                  alt="EnerCalculatie Logo" 
                  loading="lazy"
                  className="h-10 w-auto" 
                  onError={() => setImageError(true)} 
                />
              ) : (
                <FallbackLogo className="h-10 w-auto" />
              )}
            </div>
            <p className="text-sm text-slate-400 mb-6">
              De betrouwbare rekenhulp voor Nederlandse installateurs.
            </p>
            <a href="mailto:info@enercalculatie.nl" className="text-brand-primary hover:text-white transition-colors text-sm font-medium">
              info@enercalculatie.nl
            </a>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#functies" className="hover:text-white transition-colors">Functies</a></li>
              <li><a href="#demo-video" className="hover:text-white transition-colors">App Video</a></li>
              <li><a href="#pricing-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#prijzen" className="hover:text-white transition-colors">Prijzen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Releasenotes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Integraties</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Exact Online</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Teamleader</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Afas</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">PDOK Kadaster</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Juridisch</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacybeleid (AVG)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Verwerkersovereenkomst</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear !== 2026 ? '2026' : currentYear} EnerCalculatie. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-300">Gemaakt in Nederland</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
