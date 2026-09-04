import { useState } from 'react';
import { FallbackLogo } from './FallbackLogo';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [imageError, setImageError] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 print:hidden">
      {/* Final CTA Block */}
      <div className="bg-[#006b45] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#008f5a] opacity-50 radial-gradient-circle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10 text-center">
          <h2 className="font-display text-2xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Van energierekening naar offerte in één workflow.
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto font-medium">
            Ervaar zelf hoe snel u klantgegevens verwerkt en een onderbouwde offerte opstelt.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://app.enercalculatie.nl/gratis"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 inline-block text-center min-h-[48px]"
            >
              Gratis adviesrapport maken
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto bg-black/10 hover:bg-black/20 border border-white/20 text-white px-8 py-4 rounded-xl font-medium transition-colors inline-block text-center min-h-[48px]"
            >
              Plan 15 min rondleiding
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a 
              href={import.meta.env.BASE_URL}
              className="flex items-center gap-2 mb-4 bg-white px-2 py-1.5 rounded-xl w-fit block transition-transform hover:scale-105"
              aria-label="EnerCalculatie - Terug naar boven"
            >
              {!imageError ? (
                <img
                  src={`${import.meta.env.BASE_URL}logo.svg`}
                  alt="EnerCalculatie Logo"
                  loading="lazy"
                  className="h-10 w-auto"
                  onError={() => setImageError(true)}
                />
              ) : (
                <FallbackLogo className="h-10 w-auto" />
              )}
            </a>
            <p className="text-sm text-slate-400 mb-6">
              De betrouwbare rekenhulp voor Nederlandse installateurs.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:info@enercalculatie.nl" className="text-brand-primary hover:text-white transition-colors font-medium">
                info@enercalculatie.nl
              </a>
              <a href="tel:+31644572511" className="text-slate-400 hover:text-white transition-colors">
                06 - 44 57 25 11
              </a>
              <p className="text-slate-400 mt-2">KvK: 42102840</p>
              <p className="text-slate-400">BTW-ID: NL005495668B40</p>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Product</p>
            <ul className="space-y-2 text-base text-slate-400">
              <li><a href="/#functies" className="hover:text-white transition-colors block py-1 break-words">Functies</a></li>
              <li><a href="/#demo-video" className="hover:text-white transition-colors block py-1 break-words">App Video</a></li>
              <li><a href="/#pricing-calculator" className="hover:text-white transition-colors block py-1 break-words">Terugverdientijd berekenen</a></li>
              <li><a href="/#prijzen" className="hover:text-white transition-colors block py-1 break-words">Prijzen</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors block py-1 break-words">Blog</a></li>
              <li><a href="/over-ons" className="hover:text-white transition-colors block py-1 break-words">Over ons</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors block py-1 break-words">Contact</a></li>
              <li><a href="https://app.enercalculatie.nl/" className="hover:text-white transition-colors block py-1 break-words">Inloggen</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Diensten</p>
            <ul className="space-y-2 text-base text-slate-400">
              <li><a href="/rekentool-zonnepanelen" className="hover:text-white transition-colors block py-1 break-words">Zonnepanelen</a></li>
              <li><a href="/rekentool-thuisbatterij" className="hover:text-white transition-colors block py-1 break-words">Thuisbatterij</a></li>
              <li><a href="/rekentool-warmtepomp" className="hover:text-white transition-colors block py-1 break-words">Warmtepomp</a></li>
              <li><a href="/rekentool-airco" className="hover:text-white transition-colors block py-1 break-words">Airco</a></li>
              <li><a href="/rekentool-laadpaal" className="hover:text-white transition-colors block py-1 break-words">Laadpaal</a></li>
              <li><a href="/offerte-software" className="hover:text-white transition-colors block py-1 break-words">Offertesoftware</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Integraties</p>
            <ul className="space-y-2 text-base text-slate-400">
              <li><a href="https://www.pdok.nl/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block py-1 break-words">PDOK Kadaster</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Juridisch</p>
            <ul className="space-y-2 text-base text-slate-400">
              <li><a href="/voorwaarden" className="hover:text-white transition-colors block py-1 break-words">Algemene Voorwaarden</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors block py-1 break-words">Privacybeleid (AVG)</a></li>
              <li><a href="/verwerkersovereenkomst" className="hover:text-white transition-colors block py-1 break-words">Verwerkersovereenkomst</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {currentYear} EnerCalculatie. Alle rechten voorbehouden.</p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/31644572511?text=Hallo%20Pascal%2C%20ik%20heb%20een%20vraag%20over%20EnerCalculatie..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center group print:hidden"
        aria-label="Stuur direct een WhatsApp naar Pascal"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Direct contact met Pascal (ontwikkelaar)
        </span>
      </a>
    </footer>
  );
}
