import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'pv-surplus-laden-rendement-slimme-laadpaal')!;

const markdown = `
PV-surplus laden verhoogt het rendement van een slimme laadpaal door overtollige zonnestroom direct in het elektrische voertuig te laden. Hiermee stijgt het eigen verbruik van zonnestroom van circa 30% naar 60% tot 70%, wat terugleverkosten voorkomt en het stopzetten van de salderingsregeling helpt opvangen.

## Einde salderingsregeling en het belang van lokaal verbruik

De salderingsregeling voor kleinverbruikers wordt per 1 januari 2027 stopgezet. Hierdoor wordt het direct lokaal verbruiken van opgewekte zonnestroom in veel gevallen noodzakelijk voor het behoud van het rendement van de installatie. 

Wanneer een elektrisch voertuig rechtstreeks wordt opgeladen met overtollige zonne-energie, voorkomt dit dat de energieleverancier terugleverkosten in rekening brengt over deze elektriciteit. Door de inzet van slimme sturing op de laadpaal om het voertuig met eigen zonnestroom te laden, kan de zelfconsumptie van een huishouden stijgen van circa 30% naar 60% tot 70%.

## Technische werking van PV-surplus laden

Het afstemmen van het laadproces op de opwek van zonnepanelen gebeurt via specifieke sturing. Door middel van een P1-poort koppeling kan de laadpaal het laadvermogen in realtime (dynamisch) afstemmen op de actuele overproductie van de zonnepanelen.

Conform de internationale norm IEC 61851-1 geldt voor het laden van een elektrisch voertuig een minimale stroomsterkte van 6 Ampère per fase. Bij een 1-fase aansluiting komt dit overeen met een minimaal benodigd vermogen van ca. 1,4 kW. 

Met een laadpaal die beschikt over automatische faseschakeling geldt dat het laden kan starten bij een PV-surplus van 1,4 kW (1-fase, 6A). Bij toenemende zonneschijn kan het systeem automatisch opschalen naar 3-fase laden (tot 11 kW of 22 kW).

## Netbelasting, Dynamic Load Balancing en installatienormen

Het inzetten van slimme laadpalen met slimme aansturing en Dynamic Load Balancing helpt pieken op het lokaal elektriciteitsnet te verminderen en voorkomt in veel gevallen dat de hoofdaansluiting overbelast raakt. Ook een Home Energy Management System (EMS) regelt de belasting in huis dynamisch om piekstromen en afschakeling van de hoofdzekering te voorkomen. Zie [dynamic load balancing bij een laadpaal](/blog/dynamic-load-balancing-laadpaal-adviseren) voor de technische onderbouwing hiervan.

Bij de aansluiting en beveiliging van installaties dient rekening te worden gehouden met de geldende richtlijnen:
* **Vermogen op 3x25A:** Een 3x25A hoofdaansluiting heeft een continu vermogen van 17,25 kW. Om selectiviteit te waarborgen t.o.v. de hoofdzekering mag een laadpaal of omvormer op een 3x25A aansluiting doorgaans op maximaal 16A worden afgezekerd. Dit komt neer op maximaal 3,68 kW per fase en een totaal 3-fase vermogen van circa 11 kW per lader zonder slimme sturing.
* **Somstromen:** Bij een systeem waar het net én een omvormer (PV of batterij) op dezelfde groep of aardlekschakelaar kunnen invoeden, telt de stroom van beide bronnen bij elkaar op. Bij gelijktijdige invoeding moet de optelsom van de gelijktijdig actieve stromen getoetst worden aan de nominale stroom van elke gedeelde beveiliging om overbelasting te voorkomen.

## Conclusie

Uit de feiten volgt dat het toepassen van PV-surplus laden via een slimme laadpaal met dynamische sturing de zelfconsumptie van zonnestroom kan verhogen tot 60% à 70%. Dit helpt om het verlies van de salderingsregeling op te vangen, voorkomt terugleverkosten en beperkt de piekbelasting op de hoofdaansluiting.
`;

export function PvSurplusLadenRendementSlimmeLaadpaalArticle() {
  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown
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
          blockquote: ({node: _node, ...props}) => <blockquote className="border-l-4 border-brand-primary pl-4 my-4 italic text-slate-600 bg-slate-50 py-2 pr-4 rounded-r" {...props} />
        }}
      >
        {markdown}
      </ReactMarkdown>
    </BlogPostLayout>
  );
}
