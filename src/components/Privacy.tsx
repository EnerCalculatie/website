import { motion } from 'motion/react';
import { SEO } from './SEO';

export function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Statement - EnerCalculatie"
        description="Lees hoe EnerCalculatie omgaat met uw data en de privacy van uw eindklanten. Volledig AVG-compliant advies voor installateurs."
        canonical="https://enercalculatie.nl/privacy"
      />
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8">Privacy Statement</h1>
          <p className="text-slate-600 mb-8">Laatst gewijzigd: 15 juni 2026</p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Rol van EnerCalculatie</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Binnen het platform van EnerCalculatie is de <strong>installateur</strong> de verwerkingsverantwoordelijke. 
            EnerCalculatie (geëxploiteerd door Pascal van Eijden) treedt op als <strong>verwerker</strong>. 
            Dit betekent dat wij de gegevens van uw eindklanten uitsluitend verwerken in uw opdracht en ten behoeve van het genereren van energieberekeningen en rapportages.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Welke data verwerken wij?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">In opdracht van u (de installateur) verwerken wij de volgende eindklantgegevens:</p>
          <ul className="list-disc pl-6 mb-6 text-slate-700">
            <li>Adresgegevens (straat, huisnummer, postcode, woonplaats) t.b.v. PDOK Kadaster integraties.</li>
            <li>Energieverbruiksdata (stroom en gas) op basis van handmatige invoer of geüploade documenten.</li>
            <li>Pand-eigenschappen (zoals dakoriëntatie en bouwkundige staat).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Grondslag van de verwerking</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De verwerking vindt plaats op basis van de <strong>uitvoering van een overeenkomst</strong>. U maakt gebruik van onze software om uw dienstverlening richting uw eindklant uit te voeren.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Bewaartermijnen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Wij bewaren de verwerkte data zolang u een actief account (tenant) heeft bij EnerCalculatie. Na opzegging of beëindiging van uw account wordt de data na 30 dagen permanent en onherstelbaar verwijderd, tenzij er een wettelijke plicht is deze langer te bewaren.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Rechten van betrokkenen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Omdat u de verwerkingsverantwoordelijke bent, dienen verzoeken van eindklanten (recht op inzage, correctie, vergetelheid) via u te verlopen. Wij bieden in de applicatie de middelen om klantdossiers direct en volledig te verwijderen of te exporteren om aan deze verzoeken te voldoen.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">6. Sub-verwerkers & Beveiliging</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Uw data wordt veilig en end-to-end versleuteld opgeslagen in de Europese Unie. Wij maken gebruik van de volgende sub-verwerkers:
          </p>
          <ul className="list-disc pl-6 mb-6 text-slate-700">
            <li><strong>Supabase</strong> (Frankfurt, Duitsland) - Database en authenticatie.</li>
            <li><strong>Railway</strong> (Europa) - Hosting van de applicatieservers.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">7. Contact</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Voor vragen over dit privacy statement of privacy-gerelateerde verzoeken kunt u contact opnemen met:
            <br /><br />
            <strong>EnerCalculatie</strong><br />
            Toenzalstraat 16<br />
            1363 RJ Almere<br />
            E-mail: <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a><br />
            Tel: <a href="tel:+31630366189" className="text-brand-primary font-medium hover:underline">06 - 30 36 61 89</a>
          </p>
        </motion.div>
      </div>
    </>
  );
}