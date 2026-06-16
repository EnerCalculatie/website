import { motion } from 'motion/react';
import { Printer } from 'lucide-react';
import { SEO } from './SEO';

export function Terms() {
  return (
    <>
      <SEO 
        title="Algemene Voorwaarden - EnerCalculatie"
        description="De algemene voorwaarden voor het gebruik van het EnerCalculatie platform. Transparante afspraken voor professionele installateurs."
        canonical="https://enercalculatie.nl/voorwaarden"
      />
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-slate max-w-none">
          <div className="flex justify-end mb-6 print:hidden">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <Printer size={18} />
              Sla op als PDF / Printen
            </button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8">Algemene Voorwaarden</h1>
          <p className="text-slate-600 mb-8">Laatst gewijzigd: 15 juni 2026</p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Toepasselijkheid</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Deze algemene voorwaarden zijn van toepassing op elk gebruik van het platform EnerCalculatie en op alle diensten die door EnerCalculatie worden aangeboden aan installateurs.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Gebruik van het Platform</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Het platform is bedoeld als ondersteunende rekentool voor professionele installateurs. Hoewel de berekeningen met de grootste zorgvuldigheid tot stand komen, blijft de installateur zelf verantwoordelijk voor het uiteindelijke advies aan de eindklant.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Abonnementen en Betaling</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Abonnementen worden aangegaan voor de overeengekomen termijn (maand of jaar). Maandelijkse abonnementen zijn maandelijks opzegbaar. Betaling geschiedt voorafgaand aan de serviceperiode.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Intellectueel Eigendom</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Alle rechten van intellectueel eigendom met betrekking tot het platform en de gegenereerde rapportmodellen berusten bij EnerCalculatie. De installateur verkrijgt een gebruiksrecht voor de duur van het abonnement.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Aansprakelijkheid</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            EnerCalculatie is niet aansprakelijk voor indirecte schade, waaronder begrepen gederfde winst of gemiste besparingen van eindklanten, voortvloeiend uit het gebruik van de software of de daaruit voortvloeiende rapportages.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Wijzigingen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            EnerCalculatie behoudt zich het recht voor om deze voorwaarden te wijzigen. Gebruikers worden hiervan tijdig op de hoogte gesteld via het platform of per e-mail.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Contact</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Voor vragen over deze voorwaarden kunt u contact opnemen met:
            <br /><br />
            <strong>EnerCalculatie</strong><br />
            Toenzalstraat 16<br />
            1363 RJ Almere<br />
            E-mail: <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a><br />
            Tel: <a href="tel:+31630366189" className="text-brand-primary font-medium hover:underline">06 - 30 36 61 89</a>
          </p>
        </motion.div>
      </div>
      </div>
    </>
  );
}