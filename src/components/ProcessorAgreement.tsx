import { motion } from 'motion/react';
import { SEO } from './SEO';

export function ProcessorAgreement() {
  return (
    <>
      <SEO 
        title="Verwerkersovereenkomst - EnerCalculatie"
        description="Bekijk de officiële verwerkersovereenkomst (AVG Art. 28) van EnerCalculatie. Wij borgen de privacy van uw klantgegevens en die van uw eindklanten."
        canonical="https://enercalculatie.nl/verwerkersovereenkomst"
      />
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8">Verwerkersovereenkomst (AVG Art. 28)</h1>
          <p className="text-slate-600 mb-8">Deze overeenkomst is integraal onderdeel van de Algemene Voorwaarden.</p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Doel en scope van verwerking</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De Verwerker zal in opdracht van de Verwerkingsverantwoordelijke persoonsgegevens verwerken voor het aanbieden van de EnerCalculatie-applicatie. Dit omvat adresgegevens en energieprofielen van eindklanten.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Instructies en geheimhouding</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De Verwerker verwerkt de data uitsluitend op basis van schriftelijke instructies van de Verwerkingsverantwoordelijke. Medewerkers van de Verwerker hebben een geheimhoudingsplicht.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Sub-verwerkers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">De Verwerkingsverantwoordelijke geeft toestemming voor het inschakelen van:</p>
          <ul className="list-disc pl-6 mb-6 text-slate-700">
            <li><strong>Supabase (Frankfurt, EU)</strong> - Database en authenticatie.</li>
            <li><strong>Railway (EU)</strong> - Applicatiehosting.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Beveiligingsmaatregelen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De Verwerker neemt passende maatregelen, waaronder end-to-end encryptie (HTTPS/TLS), strikte datascheiding per tenant en opslag binnen de EU.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Datalekken</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Bij het ontdekken van een datalek zal de Verwerker de Verwerkingsverantwoordelijke zonder onredelijke vertraging, uiterlijk binnen 36 uur, informeren.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Verwijdering van gegevens</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Na beëindiging van de overeenkomst zal de Verwerker alle verwerkte persoonsgegevens binnen 30 dagen veilig vernietigen, tenzij wettelijke verplichtingen anders bepalen.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Rechten van betrokkenen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De Verwerker biedt via de applicatie de middelen om klantdossiers direct te verwijderen of te exporteren om aan AVG-verzoeken te voldoen.
          </p>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-slate-700 font-bold">EnerCalculatie</p>
            <p className="text-slate-600">
              Toenzalstraat 16<br />
              1363 RJ Almere<br />
              E-mail: <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}