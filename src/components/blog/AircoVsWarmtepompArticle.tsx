import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'airco-vs-warmtepomp')!;

export function AircoVsWarmtepompArticle() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EnerCalculatie',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.enercalculatie.nl/logo.svg',
      },
    },
    mainEntityOfPage: `https://www.enercalculatie.nl/blog/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      <BlogPostLayout post={post}>
        <p className="text-slate-700 leading-relaxed mb-4">
          In het adviesgesprek over warmte-oplossingen lopen twee producten regelmatig door elkaar: de airco (lucht-lucht-warmtepomp) en de lucht-water-warmtepomp, al dan niet in hybride uitvoering. Beide werken op hetzelfde thermodynamische principe, maar bedienen een ander deel van de verwarmingsbehoefte en passen bij een andere woning- en klantsituatie. Wie het verschil helder kan uitleggen — en de juiste norm als onderbouwing gebruikt — geeft zijn klant vertrouwen én een gerichte productaanbeveling.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De SCOP-norm als gemeenschappelijke maatstaf</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          SCOP staat voor Seasonal Coefficient of Performance: de verhouding tussen de geleverde warmte en het verbruikte elektriciteitsverbruik over een volledig stookseizoen, gemeten op basis van de Europese norm EN 14825. Een SCOP van 4,0 betekent dat het apparaat met 1 kWh elektriciteit gemiddeld 4 kWh warmte levert over het seizoen. De norm rekent met een zogenoemd "gemiddeld klimaatprofiel" (aangeduid als H1 of "average") dat goed overeenkomt met de Nederlandse situatie — met de buitentemperatuurverdeling van Straatsburg als referentie.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Zowel airco's als warmtepompen worden op deze norm beoordeeld, wat ze vergelijkbaar maakt. Het praktische verschil zit echter in het verwarmingssysteem waarop ze aansluiten: een airco verwarmt de lucht direct in de ruimte, terwijl een lucht-water-warmtepomp het water in het bestaande cv-systeem verwarmt. Dat verschil heeft grote gevolgen voor de bouwkundige situatie die nodig is.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Wanneer is een airco de juiste keuze?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een lucht-lucht-airco is het meest geschikt wanneer de klant:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>primair koeling wil in de zomer, met verwarming als aanvullende functie;</li>
          <li>geen cv-systeem heeft dat geschikt is voor aansluiting op een warmtepomp (bijvoorbeeld een woning zonder radiatoren of vloerverwarming);</li>
          <li>een beperkt budget heeft voor de initiële investering;</li>
          <li>bereid is om het bestaande verwarmingssysteem te behouden voor de primaire stookbehoefte.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          De installatietijd is korter, de ingreep in de woning kleiner, en de aanschafprijs ligt doorgaans lager dan bij een volledige warmtepomp-installatie. Het nadeel is dat een airco geen warm tapwater levert en de warmteverdeling in de woning afhankelijk is van luchtcirculatie — wat niet in elke ruimte dezelfde ervaring geeft als radiatoren of vloerverwarming.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hybride warmtepomp: de tussenstap voor bestaande bouw</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Een hybride warmtepomp combineert een lucht-water-warmtepomp met de bestaande cv-ketel. De warmtepomp levert het grootste deel van de warmtebehoefte bij milde temperaturen — het deel van het stookseizoen waarbij de SCOP het hoogst is. Bij extreme kou, wanneer het elektrische rendement daalt, schakelt de ketel bij. Dit maakt de hybride warmtepomp bijzonder geschikt voor:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-700">
          <li>woningen met bestaande radiatoren op hogere aanvoertemperaturen (55–70 °C), waarbij een volledig elektrische warmtepomp aanpassingen zou vereisen;</li>
          <li>klanten die stapsgewijs willen verduurzamen zonder direct het volledige cv-systeem te vervangen;</li>
          <li>woningen met een matige schilisolatie, waarbij het rendement van een volledig elektrische warmtepomp op strenge vorst terugvalt.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Vanuit verkoopoogpunt is de hybride warmtepomp een krachtig argument voor klanten die twijfelen over de stap naar volledig elektrisch: de investering is lager, de risico's kleiner, en de besparing op gas is direct merkbaar. De ISDE-subsidieregeling van de RVO is ook op hybride warmtepompen van toepassing, mits de warmtepomp voldoet aan de minimum SCOP-drempel die voor dat subsidiejaar geldt — controleer de actuele eisen op{' '}
          <a href="https://www.rvo.nl/subsidies-financiering/isde" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">
            rvo.nl/subsidies-financiering/isde
          </a>
          , want deze worden jaarlijks herzien.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Volledig elektrische warmtepomp: maximale besparing bij de juiste woning</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          De lucht-water-warmtepomp als volledige vervanging van de cv-ketel levert de hoogste gasbesparing en is het meest geschikt voor woningen met een goed geïsoleerde schil en een lagetemperatuurverwarmingssysteem (vloerverwarming of lagetemperatuurradiatoren). Bij een aanvoertemperatuur van 35 °C in plaats van 55–70 °C is het rendement van de warmtepomp beduidend hoger, wat direct terugkomt in een gunstiger SCOP-waarde en een kortere terugverdientijd.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Dat betekent ook dat u als installateur de bouwkundige situatie en het huidige verwarmingssysteem als eerste vaststelt, vóór u een product kiest. Een volledig elektrische warmtepomp adviseren in een slecht geïsoleerde woning met hoge radiatoren leidt tot hogere energierekeningen dan verwacht — en tot een teleurgestelde klant. De eerlijke verkoopargumentatie vraagt hier om transparantie over de randvoorwaarden.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">De SCOP-waarde als verkoopargument in het gesprek</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Voor klanten die vergelijken op prijs, is de SCOP een effectief instrument om de totale exploitatiekosten inzichtelijk te maken. Een hogere SCOP betekent lagere stroomkosten per kWh warmte over het jaar — het verschil tussen een SCOP van 3,0 en 4,0 is bij een gemiddeld huishouden een substantieel bedrag per stookseizoen. Door deze vergelijking te maken op basis van het berekende jaarverbruik van de klant, maakt u de meerinvestering in een efficiëntere warmtepomp concreet en verifieerbaar.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          EnerCalculatie maakt de vergelijking tussen airco, hybride warmtepomp en volledig elektrische warmtepomp transparant in één adviesrapport: op basis van de bouwkundige situatie, het huidige energieverbruik en het opgegeven verwarmingssysteem berekent de tool de verwachte gasbesparing, de invloed op de stroomrekening en de terugverdientijd per scenario. Zo onderbouwt u uw aanbeveling met concrete, klantspecifieke cijfers in plaats van algemene vuistregels. Meer over de specifieke rekenmogelijkheden vindt u op de{' '}
          <a href="/rekentool-warmtepomp" className="text-brand-primary-text font-semibold hover:underline">
            rekentool warmtepomp
          </a>
          {' '}en de{' '}
          <a href="/rekentool-airco" className="text-brand-primary-text font-semibold hover:underline">
            rekentool airco
          </a>
          .
        </p>
      </BlogPostLayout>
    </>
  );
}
