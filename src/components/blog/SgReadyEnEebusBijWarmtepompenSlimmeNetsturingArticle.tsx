import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'sg-ready-en-eebus-bij-warmtepompen-slimme-netsturing')!;

const markdown = `
Met een SG Ready en EEBUS warmtepomp realiseert u slimme netsturing en geavanceerd energiemanagement in de gebouwde omgeving. Een SG Ready warmtepomp is voorzien van een kwaliteitslabel dat aangeeft dat de sturing via twee digitale potentiaalvrije contacten kan reageren op net- of PV-signalen. Door SG Ready en het open IP-protocol EEBUS op te nemen in uw advies, biedt u een concrete oplossing voor slimme netsturing. Hiermee helpt u de eindklant direct in te spelen op netcongestie, overproductie van zonnepanelen en dynamische energietarieven.

## De vier bedrijfstoestanden van het SG Ready-principe

Het SG Ready-label werkt op basis van twee binaire ingangen die samen vier bedrijfstoestanden vormen. Met deze standen stemt de warmtepomp het energieverbruik af op het aanbod van het net of de eigen PV-installatie:

| Bedrijfstoestand | Functie | Omschrijving |
| :--- | :--- | :--- |
| **Toestand 1** | Sperrzeit | Blokkade of pauze van maximaal 2 uur om piekbelasting op het elektriciteitsnet te voorkomen. |
| **Toestand 2** | Standaard | Reguliere bedrijfsmodus op basis van de eigen interne regeling en ruimtethermostaat. |
| **Toestand 3** | Inschakeladvies | Advies om extra warmte of warm tapwater op te slaan bij overproductie van zonnepanelen of goedkope stroom. |
| **Toestand 4** | Definitief inschakelcommando | Geforceerd commando om het buffervat en de boiler op te warmen tot de ingestelde maximumtemperatuur. |

Toestand 3 en 4 maken het mogelijk om thermische opslag (zoals een boiler of buffervat) benutten wanneer er een lokaal overschot aan duurzame energie is.

## Het verschil tussen SG Ready en EEBUS in kaart gebracht

Het belangrijkste technische verschil tussen SG Ready en EEBUS zit in de diepte van de datacommunicatie. Waar SG Ready enkel binaire toestandsschakelingen via twee contacten ondersteunt, is EEBUS een gestandaardiseerd, open communicatieprotocol op basis van IP (ethernet of Wi-Fi).

EEBUS maakt gedetailleerde twee-richtingsdatacommunicatie mogelijk tussen apparaten en een Home Energy Management System (HEMS). De warmtepomp kan via EEBUS niet alleen opdrachten ontvangen, maar ook exacte gegevens uitwisselen over het vermogen, het actuele energieverbruik en de planning. De norm NEN-EN 50631 definieert hiervoor de netwerk- en datacommunicatievoorwaarden binnen een HEMS- en Smart Grid-omgeving.


| Eigenschap | SG Ready | EEBUS |
| :--- | :--- | :--- |
| **Type signaal** | Binaire toestandsschakeling (2 contacten) | Twee-richtingsdatacommunicatie (IP: ethernet/Wi-Fi) |
| **Informatiediepte** | 4 vastgestelde bedrijfstoestanden | Exacte data over vermogen, verbruik en planning |
| **Normering / Standaard** | Kwaliteitslabel | Open protocol (o.a. NEN-EN 50631) |

## Integratie met HEMS, zonnepanelen en dynamische tarieven

Een Home Energy Management System (HEMS) gebruikt SG Ready of EEBUS om een warmtepomp automatisch aan te sturen. Zodra de zonnepanelen meer stroom opwekken dan de woning verbruikt, of wanneer uurtarieven bij een dynamisch energiecontract laag zijn, geeft het HEMS een sturingssignaal aan de warmtepomp.

Daarnaast regelt een HEMS de elektrische belasting in de woning via dynamische load balancing. Dit helpt om piekstromen te voorkomen, waardoor de hoofdzekering niet afschakelt bij gelijktijdig hoog verbruik.

Voor de fysieke installatie geldt daarnaast dat een warmtepomp boven de 5 kW thermisch vermogen in veel gevallen vraagt om een 3-fase aansluiting. Dit zorgt voor een optimale verdeling van de belasting over de fases in de meterkast.

## Waarom adviseren over slimme sturing? De meerwaarde voor de klant

Voor installateurs en adviseurs biedt de toepassing van slimme sturing sterke inhoudelijke argumenten in het offertetraject:

- **Aanpak van netcongestie:** Netbeheerders en HEMS-systemen benutten slimme sturing van warmtepompen om piekbelasting op de lokale netaansluiting en netcongestie te verminderen.
- **Optimaal eigenverbruik:** Door zonne-energieoverschotten direct om te zetten in warm water of ruimteverwarming, stijgt de benutting van de eigen PV-opwek.
- **Kostenbesparing bij dynamische tarieven:** Het HEMS kan de warmtepomp laten draaien tijdens de goedkoopste uren van de dag.
- **Beveiliging van de aansluiting:** Dynamische load balancing borgt de capaciteit van de hoofdaansluiting.

Met deze feitelijke onderbouwing toont u aan dat de warmtepomp een integraal en stuurbaar onderdeel vormt van een toekomstbestendige installatie.

Welke sturingsmethode adviseert u uw klanten bij de voorbereiding op netcongestie en dynamische energietarieven?
`;

export function SgReadyEnEebusBijWarmtepompenSlimmeNetsturingArticle() {
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
