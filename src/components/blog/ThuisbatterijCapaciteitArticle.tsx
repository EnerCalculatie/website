import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'thuisbatterij-capaciteit-kiezen')!;

export function ThuisbatterijCapaciteitArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een thuisbatterij is geen standaardproduct waarbij u de goedkoopste of grootste optie kiest. De juiste capaciteit hangt af van het zelfconsumptieprofiel van uw klant, de grootte van de zonnepaneelinstallatie en het financiële doel dat achter de investering zit. Te kleine capaciteit betekent gemiste opbrengst; te grote capaciteit betekent onnodige kosten en een langere terugverdientijd. In dit artikel leest u welke vuistregels en berekeningen u helpen om onderbouwd advies te geven.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Capaciteit (kWh) versus vermogen (kW): het verschil dat telt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een thuisbatterij heeft twee technische hoofdparameters die in offertes vaak door elkaar lopen:
        </p>
        <ul className="list-disc pl-6 mb-4 text-slate-700">
          <li><strong>Capaciteit in kWh</strong> bepaalt hoeveel energie de batterij kan opslaan en later kan afgeven. Een 10 kWh-batterij kan — afhankelijk van de diepte van ontlading (DoD) — tot circa 9 à 9,5 kWh effectief benutten.</li>
          <li><strong>Vermogen in kW</strong> bepaalt hoe snel de batterij laadt of ontlaadt. Een batterij met 5 kWh en een laadvermogen van 3,6 kW is in minder dan anderhalf uur vol als het aanbod toereikend is; een batterij met hetzelfde vermogen maar 10 kWh heeft daarvoor bijna drie uur nodig.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor een woninginstallateur is het vermogen relevant in combinatie met de groepenkast: als de aansluiting 1×25 A is, kunt u maximaal circa 5,75 kW gelijktijdig laden. Bij een systeem met zonnepanelen én een laadpaal én een batterij is het belangrijk te controleren of het laadvermogen van de batterij geen overbelasting veroorzaakt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Het zelfconsumptieprofiel als startpunt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De kernvraag bij dimensionering is: hoeveel zonne-energie levert een huishouden op het moment van productie zelf terug aan het net, en wat zou het verbruiken als die energie beschikbaar was? Een thuisbatterij overbrugt de kloof tussen productie overdag en verbruik 's avonds en 's nachts.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een gemiddeld Nederlands huishouden verbruikt circa 3.000 tot 4.000 kWh per jaar. Op een zomerse dag met 12 zonnuren en een installatie van 6 kWp kan de productie oplopen tot 30–40 kWh; het daadwerkelijke verbruik overdag ligt in een tweepersoonshuis doorgaans op 4–8 kWh. Het surplus dat op een dergelijke dag wordt teruggeleverd, loopt dus op tot 20–35 kWh — meer dan welke thuisbatterij in de woningmarkt ook kan opslaan. Een batterij van 10 kWh voegt voor zo'n dag al het maximum toe dat zinvol is.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In de herfst en winter is de situatie anders: de productie daalt sterk, en het dagelijkse surplus is op veel dagen kleiner dan de batterijcapaciteit. De jaargemiddelde zelfconsumptie — het aandeel van de zonne-energie dat direct of via de batterij door het huishouden zelf wordt verbruikt — stijgt door een thuisbatterij in een typische Nederlandse situatie met 6 kWp van circa 35% naar 60–70%, afhankelijk van het profiel.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Vuistregels voor de juiste capaciteit</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Op basis van gangbare installatieprofielen in de Nederlandse woningmarkt gelden de volgende vuistregels:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li><strong>4–6 kWh</strong> is geschikt voor een kleinere installatie (tot circa 4 kWp) of een huishouden dat overdag al veel verbruikt (thuiswerkers, warmtepomp overdag in bedrijf). De meeropbrengst ten opzichte van een grotere batterij is beperkt, maar de investering is lager.</li>
          <li><strong>8–10 kWh</strong> is de meest gangbare keuze voor een doorsnee woning met 6–10 kWp. In de zomermaanden wordt de batterij dagelijks volledig benut; in de overgangsmaanden veelal gedeeltelijk.</li>
          <li><strong>10+ kWh</strong> is zinvol wanneer er sprake is van een hoog nachtverbruik (elektrische warmtepomp, EV-laden 's nachts vanuit de batterij) of wanneer de klant stroom-onafhankelijkheid als doel heeft. Houd er rekening mee dat boven een bepaalde capaciteit de marginale meeropbrengst per extra kWh snel afneemt.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een eenvoudige rekenregel: een thuisbatterij van circa 1 kWh per geïnstalleerde kWp zonnepanelen dekt in de zomerperiode doorgaans de avond- en nachtbehoefte. Boven de 1,5 kWh per kWp neemt de jaargemiddelde benuttingsgraad af, tenzij er aanvullend elektrisch verbruik aanwezig is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Financieel perspectief: terugleverkosten en het wegvallen van de saldering</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De financiële onderbouwing van een thuisbatterij verschuift naarmate de regelgeving verandert. Op dit moment rekenen energieleveranciers al{' '}
          <a href="/blog/terugleverkosten-thuisbatterij" className="text-brand-primary-text font-semibold hover:underline">
            terugleverkosten
          </a>
          {' '}door aan huishoudens die grote overschotten terugleveren. Een thuisbatterij verlaagt de teruglevering en daarmee direct deze kosten.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Na{' '}
          <a href="/blog/salderingsregeling-2027" className="text-brand-primary-text font-semibold hover:underline">
            de afschaffing van de salderingsregeling per 1 januari 2027
          </a>
          {' '}verandert de financiële logica verder: teruggeleverde stroom wordt dan vergoed tegen het lagere teruglevertarief, terwijl elke kWh die de klant zelf verbruikt het volle leveringstarief bespaart. Dit vergroot het financiële voordeel van zelfconsumptie — en daarmee de terugverdientijd van een thuisbatterij — aanzienlijk ten opzichte van de huidige situatie.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor een adviesgesprek betekent dit dat u in de berekening twee scenario's kunt tonen: de situatie vóór en na 2027. In het post-2027-scenario wordt de extra zelfconsumptie via de batterij structureel meer waard — en dat maakt een 8–10 kWh-batterij in veel gevallen financieel aantrekkelijker dan op dit moment lijkt.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Combinatie met warmtepomp of laadpaal</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Wanneer uw klant ook een warmtepomp of laadpaal heeft — of overweegt — verandert de optimale batterijcapaciteit. Een warmtepomp die 's avonds of 's nachts in bedrijf is, kan gevoed worden uit een grotere batterij, waardoor ook het warmtepompverbruik wordt gedekt met zelf opgewekte energie. Hetzelfde geldt voor een EV die 's nachts laadt: als de batterij groot genoeg is om een deel van de laadsessie te voorzien, neemt de zelfconsumptie verder toe.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dit betekent in de praktijk dat een huishouden met zonnepanelen, een warmtepomp én een laadpaal meer baat heeft bij een 10–15 kWh-systeem dan bij een 5 kWh-batterij. De extra capaciteit betaalt zichzelf terug doordat meer dure netafname wordt vervangen door gratis eigen productie.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie dit vereenvoudigt</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De juiste capaciteitsberekening vraagt om het combineren van productiegegevens, verbruiksprofielen, tarieven en regelgevingsscenario's. EnerCalculatie rekent dit voor u door op basis van de invoer die u voor uw klant invult: installatiegrootte, jaarverbruik, eventuele warmtepomp of laadpaal, en de gewenste batterijcapaciteit. Het resultaat is een onderbouwd adviesrapport dat u direct kunt meenemen naar het klantgesprek — inclusief het verschil in terugverdientijd vóór en na 2027.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Zo geeft u uw klant niet alleen een aanbeveling, maar ook de cijfers die die aanbeveling ondersteunen.
        </p>
      </BlogPostLayout>
    </>
  );
}
