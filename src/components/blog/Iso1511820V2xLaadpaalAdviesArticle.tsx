import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'iso-15118-20-v2x-laadpaal-advies')!;

const markdown = `
Een laadpaal die geschikt is voor **ISO 15118-20 en V2X-compatibiliteit** vraagt meer dan alleen een software-update: het vereist specifieke hardware, netbeveiliging en een grondige voorbereiding in de meterkast. Met de opkomst van bidirectioneel laden (V2G/V2X) en toenemende netcongestie adviseren netbeheerders deze nieuwe communicatiestandaard om EV-accu's effectief in te zetten als flexibele energie-opslag. Voor u als installateur of adviseur is het cruciaal om te weten welke eisen ISO 15118-20 stelt aan hardware, protocollen zoals OCPP 2.0.1 en de elektrische installatie volgens NEN 1010.

## Wat is ISO 15118-20 en welke functies biedt het?

ISO 15118-20 is de internationale communicatiestandaard die specificaties bevat voor bidirectioneel laden (V2G/V2X) voor zowel AC- als DC-laadsystemen. Met deze standaard kunnen voertuigen niet alleen stroom opnemen van het net, maar ook stroom terugleveren aan het gebouw (V2H) of het elektriciteitsnet (V2G).

Naast bidirectioneel laden ondersteunt ISO 15118 de functionaliteit **Plug & Charge (PnC)**. Hiermee kan het elektrische voertuig (EV) zich automatisch authenticeren en autoriseren zodra de laadkabel wordt aangesloten, zonder dat een fysieke laadpas nodig is.

Om de gegevensuitwisseling tussen het voertuig, het laadstation en het netwerk te beschermen tegen cyberaanvallen, stelt ISO 15118-20 strikte beveiligingseisen:
- **Publieke Sleutel Infrastructuur (PKI):** Inzet van digitale certificaten voor betrouwbare identificatie.
- **TLS-encryptie:** Versleuteling van de communicatielijn tussen voertuig, laadpaal en grid.

## Waarom adviseren netbeheerders ISO 15118-20 en OCPP 2.0.1?

Voor het toepassen van dynamische netsturing en V2G adviseren netbeheerders de combinatie van ISO 15118-20 en OCPP 2.0.1. Deze combinatie helpt om de interoperabiliteit en de netveiligheid tussen verschillende merken en netwerkbeheerders te borgen.

Volgens netbeheerder Liander speelt bidirectioneel laden (V2X) via ISO 15118 een cruciale rol bij het verminderen van lokale netcongestie. EV-accu's kunnen hierbij namelijk worden ingezet als flexibele opslagcapaciteit op momenten van piekbelasting.

Ook de Nationale Agenda Laadinfrastructuur (NAL) geeft aan dat open standaarden zoals ISO 15118 randvoorwaardelijk zijn voor de grootschalige uitrol van slimme en bidirectionele laadinfrastructuur in Nederland.

## Hoe spelen fabrikanten als Alfen en Zaptec in op ISO 15118-20?

Verschillende laadpaalfabrikanten spelen in op deze standaarden om te zorgen dat geplaatste hardware geschikt blijft voor toekomstige functies:

| Fabrikant | Ondersteuning en Voorbereiding |
|---|---|
| **Alfen** | Ondersteunt OCPP 2.0.1 en bereidt hardware- en softwareplatformen voor op de implementatie van ISO 15118 functionaliteiten zoals Plug & Charge en V2G. |
| **Zaptec** | Ondersteunt smart charging protocollen en bereidt communicatiemodules voor op toekomstige ISO 15118 software-updates en V2G-integratie. |

## Elektrotechnische eisen bij een V2X en ISO 15118-20 laadpaal-advies

Een laadpaal die geschikt is voor ISO 15118-20 en V2X beïnvloedt ook de fysieke installatie in de meterkast. Bij het adviseren van laadsystemen zijn de volgende randvoorwaarden van belang:

### 1. Laadvermogen, 3x25A aansluiting en Dynamic Load Balancing
Bij een laadvermogen van 11 kW trekt een 3-fase lader 16A per fase (3 x 16A). Op een standaard 3x25A huisaansluiting blijft er tijdens het laden slechts 9A per fase over voor het overige huishouden. Bij gelijktijdig gebruik van andere apparaten kan dit snel leiden tot het uitschakelen van de hoofdzekering.

Om piekstromen en afschakeling van de hoofdzekering te voorkomen, is Dynamic Load Balancing op een 3x25A aansluiting bij 11 kW laden in de praktijk noodzakelijk. Een Home Energy Management System (EMS) regelt de belasting in huis dynamisch om overbelasting te voorkomen. Hiervoor is een fysieke of digitale koppeling vereist met de stroommeting in de meterkast, zoals een P1-poort uitlezing van de slimme meter of het gebruik van stroomtransformatoren (CT-spoelen).

### 2. Voorkom overbelasting: Somstromen bij bidirectioneel laden (NEN 1010)
Wanneer een voertuig via V2X stroom teruglevert terwijl ook de netvoeding actief is op dezelfde groep of aardlekschakelaar, tellen de stromen van beide bronnen bij elkaar op.

Volgens de veiligheidsregels van de NEN 1010 kan dit tot gevaarlijke situaties leiden:
- **Rekenvoorbeeld:** 25A vanaf het net + 16A vanaf de omvormer/accu = **41A totaal**.
- Een standaard **40A-aardlekschakelaar** is niet berekend op deze gecombineerde stroomsterkte, wat kan leiden tot overbelasting en brandgevaar.
- **Adviesregel:** Bij systemen met gelijktijdige invoeding moet de optelsom van de gecombineerde stromen worden getoetst aan de nominale stroom van elke gedeelde beveiliging (groep, aardlekschakelaar of hoofdzekering).

## Conclusie

Het voorbereiden van uw laadpaal-advies op ISO 15118-20 en V2X stelt uw klanten in staat om gebruik te maken van Plug & Charge en bidirectioneel laden. Door te kiezen voor hardware die OCPP 2.0.1 en ISO 15118 ondersteunt, en in de meterkast rekening te houden met vermogensgrenzen, Dynamic Load Balancing en somstromen, legt u de basis voor een veilige en toekomstbestendige installatie.

## Veelgestelde vragen over ISO 15118-20 en V2X

### Wat is het verschil tussen ISO 15118-20 en oudere laadstandaarden?
ISO 15118-20 ondersteunt expliciet bidirectioneel laden (V2X/V2G) voor zowel AC- als DC-laadsystemen, evenals automatische autorisatie via Plug & Charge (PnC) met beveiliging via PKI-certificaten en TLS-encryptie.

### Waarom is Dynamic Load Balancing nodig bij V2X en 11 kW laden?
Bij 11 kW laden trekt een 3-fase lader 16A per fase. Op een standaard 3x25A huisaansluiting blijft er slechts 9A per fase over voor het huishouden. Dynamic Load Balancing voorkomt dat de hoofdzekering uitschakelt bij gelijktijdig stroomverbruik.

### Waarom moet u letten op somstromen bij V2X-installaties volgens NEN 1010?
Bij bidirectioneel laden tellen de stromen uit het net en de auto bij elkaar op (bijv. 25A net + 16A V2X = 41A). Dit kan een standaard 40A-aardlekschakelaar overbelasten en brandgevaar veroorzaken.
`;

export function Iso1511820V2xLaadpaalAdviesArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
        }}
      >
        {markdown}
      </ReactMarkdown>
    </BlogPostLayout>
  );
}
