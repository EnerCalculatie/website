import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'zakelijke-verrekening-laadstroom-cpo-backoffice')!;

const markdown = `
Het vergoeden van een vast fictief kWh-tarief dat hoger ligt dan de werkelijke elektriciteitskosten geldt door de Belastingdienst als belast loon. Om zakelijke klanten optimaal te adviseren over de beste CPO-koppeling en het juiste backoffice-abonnement voor automatische zakelijke verrekening van laadstroom (split-billing), combineert u een MID-gecertificeerde laadpaal, open protocollen (OCPP/OCPI) en een passende abonnementstructuur afgestemd op het wagenpark en de energiecontracten van werknemers. Zo worden de feitelijke laadkosten geautomatiseerd geregistreerd en onbelast vergoed.

## De technische keten voor split-billing: van thuislaadpunt tot CPO-backoffice

Voor automatische verrekening – ook wel split-billing genoemd – vereist het laadpunt een actieve internetverbinding via LAN, Wi-Fi of een 4G-SIM-kaart. Hierdoor worden laadtransacties direct naar de backoffice gestuurd.

De communicatie tussen het thuislaadpunt en het beheerplatform van de Charge Point Operator (CPO) verloopt via een gestandaardiseerd protocol, zoals OCPP 1.6J of OCPP 2.0.1. Dit protocol wisselt laadsessies, autorisaties en verbruiksdata uit.

Voor fiscaal correcte verrekening eisen veel CPO-platforms en werkgevers dat de laadpaal beschikt over een MID-gecertificeerde (Measuring Instruments Directive) kWh-meter. Het Open Charge Point Interface (OCPI) protocol maakt vervolgens geautomatiseerde gegevensuitwisseling, roaming en verrekening mogelijk tussen CPO's en Mobility Service Providers (MSP's).

## Fiscale spelregels en automatische verrekening bij dynamische contracten

De Belastingdienst staat toe dat een werkgever de feitelijke stroomkosten voor het thuisladen van een zakelijke EV onbelast vergoedt aan de werknemer, mits sprake is van een exacte registratie van het verbruik per laadsessie.

Bij automatische verrekening incasseert de CPO of MSP de geladen stroomkosten bij de werkgever of leasemaatschappij. Vervolgens keert de provider dit bedrag rechtstreeks uit op de privébankrekening van de werknemer.

| Scenario / Contracttype | Fiscale & Technische Verrekening |
| :--- | :--- |
| **Vast of variabel contract** | Registratie per laadsessie op basis van het geldende kWh-tarief. |
| **Dynamisch contract** | CPO-platform koppelt laadgegevens op uur- of tijdsgebaseerd niveau aan de geldende EPEX Spot-marktprijzen. |
| **Fictief vast tarief** | Vergoeding boven de werkelijke elektriciteitskosten geldt als belast loon. |

Bij werknemers met een dynamisch energiecontract varieert de stroomprijs per uur. Om in die situatie de werkelijke stroomprijs fiscaal correct te vergoeden, dient een CPO-platform de laadgegevens op uur- of tijdsgebaseerd niveau te koppelen aan de geldende EPEX Spot-marktprijzen. Zo kan het verbruik per uur nauwkeurig geregistreerd en verrekend worden.

## Kostenstructuur van CPO- en backoffice-abonnementen

Om een thuislaadpunt op afstand te beheren en automatische verrekening uit te voeren, is een backoffice-abonnement nodig. Deze abonnementen bestaan doorgaans uit:

* **Vast maandelijks bedrag:** Een vaste vergoeding per laadpunt voor softwaretoegang, beheer en dataconnectiviteit.
* **Variabele toeslag:** Optioneel aangevuld met een transactiefee per kWh of per afzonderlijke laadsessie.

Bij het adviseren van een geschikt abonnement is het raadzaam om de verhouding tussen vaste en variabele kosten af te stemmen op het laadgedrag. Bij veel korte laadsessies kan een vaste fee per sessie relatief zwaar drukken op de totale kosten.

## Belangrijkste keuzecriteria voor de selectie van een CPO-platform

Bij het selecteren van een CPO-platform voor een zakelijk wagenpark letten installateurs en adviseurs op een aantal belangrijke criteria:

* **Hardware-agnostische ondersteuning:** Onafhankelijkheid van merk, waardoor diverse typen laadpunten binnen één wagenpark gekoppeld kunnen worden.
* **Automatische restitutie:** Een beproefde rechtstreekse uitkering van laadkosten aan de werknemer zonder handmatige declaraties.
* **Ondersteuning van laadpassen:** Het eenvoudig koppelen van zakelijke laadpassen aan de thuislaadpaal voor autorisatie.
* **Deskundige helpdesk:** Ondersteuning voor de berijder bij vragen of eventuele storingen.

Welke combinatie van hardware, protocollen en backoffice-abonnementen adviseert u momenteel aan zakelijke klanten die overstappen op geautomatiseerde thuisverrekening?
`;

export function ZakelijkeVerrekeningLaadstroomCpoBackofficeArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
          h2: ({node: _node, ...props}) => <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4" {...props} />,
          h3: ({node: _node, ...props}) => <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3" {...props} />,
          p: ({node: _node, ...props}) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
          ul: ({node: _node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
          ol: ({node: _node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-700" {...props} />,
          li: ({node: _node, ...props}) => <li className="leading-relaxed" {...props} />,
          strong: ({node: _node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
          a: ({node: _node, ...props}) => <a className="text-brand-primary-text hover:underline font-semibold" {...props} />,
          hr: ({node: _node, ...props}) => <hr className="my-8 border-slate-200" {...props} />,
          blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />,
          table: ({node: _node, ...props}) => <div className="overflow-x-auto mb-6"><table className="w-full border-collapse text-sm" {...props} /></div>,
          thead: ({node: _node, ...props}) => <thead className="bg-slate-100" {...props} />,
          th: ({node: _node, ...props}) => <th className="border border-slate-200 px-3 py-2 text-left font-bold text-slate-900" {...props} />,
          td: ({node: _node, ...props}) => <td className="border border-slate-200 px-3 py-2 text-slate-700" {...props} />
        }}>{markdown}</ReactMarkdown>
    </BlogPostLayout>
  );
}
