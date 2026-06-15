import { motion } from 'motion/react';
import { Printer } from 'lucide-react';
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
          <div className="flex justify-end mb-6 print:hidden">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <Printer size={18} />
              Sla op als PDF / Printen
            </button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8">Verwerkersovereenkomst (AVG Art. 28)</h1>
          <p className="text-slate-600 mb-4">Laatst gewijzigd: 15 juni 2026</p>
          <p className="text-slate-600 mb-8 italic text-sm">Deze overeenkomst maakt integraal onderdeel uit van de Algemene Voorwaarden en de overeenkomst tussen EnerCalculatie (Verwerker) en de Gebruiker (Verwerkingsverantwoordelijke).</p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Doel en aard van de verwerking</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Verwerker verbindt zich onder de voorwaarden van deze Verwerkersovereenkomst in opdracht van Verwerkingsverantwoordelijke persoonsgegevens te verwerken. De verwerking vindt uitsluitend plaats in het kader van het aanbieden van de EnerCalculatie-applicatie, waaronder het genereren van energieberekeningen en adviesrapportages voor eindklanten.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Instructies en geheimhouding</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Verwerker zal de persoonsgegevens uitsluitend verwerken op basis van schriftelijke instructies van Verwerkingsverantwoordelijke. Verwerker garandeert dat de personen die gemachtigd zijn om de persoonsgegevens te verwerken, zich tot geheimhouding hebben verbonden.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Sub-verwerkers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">Verwerkingsverantwoordelijke verleent hierbij een algemene toestemming voor het inschakelen van sub-verwerkers. Verwerker zal Verwerkingsverantwoordelijke informeren over voorgenomen wijzigingen. De huidige sub-verwerkers zijn:</p>
          <ul className="list-disc pl-6 mb-6 text-slate-700">
            <li><strong>Supabase (Frankfurt, EER)</strong> - Database, opslag en authenticatie.</li>
            <li><strong>Railway (EER)</strong> - Hosting van applicatieservers.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Beveiligingsmaatregelen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Verwerker neemt passende technische en organisatorische maatregelen om een op het risico afgestemd beveiligingsniveau te waarborgen. Deze maatregelen omvatten onder meer TLS-versleuteling, strikte logische datascheiding per tenant en periodieke beveiligingsupdates.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Datalekken</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In het geval van een inbreuk in verband met persoonsgegevens (datalek) zal Verwerker de Verwerkingsverantwoordelijke daarover zonder onredelijke vertraging informeren nadat hij kennis heeft genomen van het lek. Verwerker zal alle nodige medewerking verlenen om Verwerkingsverantwoordelijke in staat te stellen aan haar wettelijke verplichtingen te voldoen.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Audit-recht</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Verwerker stelt alle informatie ter beschikking die nodig is om de naleving van de in dit artikel 28 van de AVG neergelegde verplichtingen aan te tonen en audits, waaronder inspecties, door de Verwerkingsverantwoordelijke of een door deze gemachtigde controleur mogelijk te maken.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Medewerking en assistentie</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Verwerker verleent Verwerkingsverantwoordelijke medewerking bij het voldoen aan verplichtingen uit hoofde van de rechten van betrokkenen en bij het waarborgen van de naleving van verplichtingen inzake beveiliging en DPIA's.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">8. Verwijdering van gegevens</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Na beëindiging van de dienstverlening zal Verwerker alle persoonsgegevens die in het kader van de overeenkomst zijn verwerkt, binnen 30 dagen definitief verwijderen of anonimiseren, tenzij een wettelijke bepaling de opslag van de persoonsgegevens voorschrijft.
          </p>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-slate-700 font-bold">EnerCalculatie (Pascal van Eijden)</p>
            <p className="text-slate-600">
              Toenzalstraat 16<br />
              1363 RJ Almere<br />
              E-mail: <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a><br />
              Tel: <a href="tel:+31630366189" className="text-brand-primary font-medium hover:underline">06 - 30 36 61 89</a>
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
}