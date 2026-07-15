import { SEO } from './SEO';

export function Terms() {
  return (
    <>
      <SEO 
        title="Algemene Voorwaarden Installatiesoftware | EnerCalculatie"
        description="De algemene voorwaarden van EnerCalculatie: transparante afspraken over het gebruik van onze calculatie- en adviessoftware voor installateurs."
        canonical="https://www.enercalculatie.nl/voorwaarden"
      />
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        <div className="animate-fade-up prose prose-slate max-w-none">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-8">Algemene Voorwaarden - EnerCalculatie</h1>
          <p className="text-slate-600 mb-8">Laatst gewijzigd: 15 juni 2026</p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">1. Toepasselijkheid</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Deze algemene voorwaarden zijn van toepassing op elk gebruik van het softwareplatform EnerCalculatie en op alle diensten (zoals het genereren van adviesrapporten en calculaties voor zonnepanelen, thuisbatterijen en warmtepompen) die door EnerCalculatie worden aangeboden aan verduurzamingsinstallateurs in Nederland.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">2. Gebruik van het Platform en Verantwoordelijkheid</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Het platform is uitsluitend bedoeld als ondersteunende rekentool voor professionele installateurs. Hoewel de berekeningen met de grootste zorgvuldigheid tot stand komen, biedt EnerCalculatie geen bouwkundig, juridisch of installatietechnisch maatwerkadvies. De installateur blijft te allen tijde volledig en zelfstandig verantwoordelijk voor het uiteindelijke advies aan de eindklant, de controle van de technische en financiële haalbaarheid, en de naleving van geldende wet- en regelgeving en branchenormen (waaronder, maar niet beperkt tot, NEN 1010, NEN 3140 en relevante ISSO-publicaties).
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">3. Abonnementen en Betaling</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Abonnementen worden aangegaan voor de overeengekomen termijn (maand of jaar). Maandelijkse abonnementen zijn maandelijks opzegbaar. Betaling geschiedt voorafgaand aan de serviceperiode.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">4. Intellectueel Eigendom</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Alle rechten van intellectueel eigendom met betrekking tot het platform en de gegenereerde rapportmodellen berusten bij EnerCalculatie. De installateur verkrijgt een gebruiksrecht voor de duur van het abonnement.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">5. Aansprakelijkheid, Dataverlies en Vrijwaring</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            De totale aansprakelijkheid van EnerCalculatie voor directe schade, uit welke hoofde dan ook, is strikt beperkt tot maximaal het bedrag dat de installateur in de twaalf (12) maanden voorafgaand aan het schadebrengende feit aan abonnementskosten heeft betaald. 
            <br /><br />
            EnerCalculatie is nimmer aansprakelijk voor indirecte schade. Hieronder wordt uitdrukkelijk begrepen: gederfde winst, gemiste besparingen van eindklanten, bedrijfsstagnatie, reputatieschade, en schade door verlies, corruptie of onbeschikbaarheid van data. Hoewel wij frequente back-ups maken, is de installateur te allen tijde zelf verantwoordelijk voor een eigen administratie of export van cruciale klantdossiers.
            <br /><br />
            De installateur vrijwaart EnerCalculatie tegen alle aanspraken van derden (waaronder eindklanten en toezichthouders) die direct of indirect samenhangen met het gebruik van het platform en de tegenvallende prestaties of besparingen voortvloeiende uit de gegenereerde rapportages.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">6. Wijzigingen</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            EnerCalculatie behoudt zich het recht voor om deze voorwaarden te wijzigen. Gebruikers worden hiervan tijdig op de hoogte gesteld via het platform of per e-mail.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">7. Contact</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Voor vragen over deze voorwaarden kunt u contact opnemen met:
            <br /><br />
            <strong>EnerCalculatie</strong><br />
            Toenzalstraat 16<br />
            1363 RJ Almere<br />
            E-mail: <a href="mailto:info@enercalculatie.nl" className="text-brand-primary font-medium hover:underline">info@enercalculatie.nl</a><br />
            Tel: <a href="tel:+31630366189" className="text-brand-primary font-medium hover:underline">06 - 30 36 61 89</a>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}