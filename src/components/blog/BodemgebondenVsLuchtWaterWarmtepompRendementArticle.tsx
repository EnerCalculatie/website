import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'bodemgebonden-vs-lucht-water-warmtepomp-rendement')!;

const markdown = `
**Wat is de beste keuze tussen een bodemgebonden en een lucht-water warmtepomp?** Bij het maken van de juiste keuze spelen het seizoensrendement (SCOP), de initiële investeringskosten en specifieke randvoorwaarden (zoals geluidsnormen en vergunningen) een doorslaggevende rol. Een bodemgebonden warmtepomp kent hogere instap- en boorkosten, maar levert een hoger seizoensrendement (SCOP 4,5–5,5+) en biedt passieve koeling. Een lucht-water warmtepomp vereist een lagere investering, maar vraagt aandacht voor de geluidsnormen van de buitenunit.

---

## SCOP & Rendement: Seizoensprestaties vergeleken

Door de constante, stabiele temperatuur van de bodem behaalt een bodemgebonden warmtepomp doorgaans een hoger seizoensrendement over het gehele jaar vergeleken met een lucht-water systeem. Lees meer over de werking in ons artikel over hoe een warmtepomp werkt.

- **Bodemgebonden warmtepomp:** Behaalt een seizoensrendement (SCOP/SPF) van gemiddeld **4,5 tot 5,5 of hoger**.
- **Lucht-water warmtepomp:** Behaalt een SCOP van gemiddeld **3,5 tot 4,5**.

## Investeringskosten en levensduur van de bron

De initiële investering van een bodemgebonden warmtepomp ligt hoger dan die van een lucht-water warmtepomp. Dit verschil wordt voornamelijk veroorzaakt door de kosten voor het uitvoeren van de bodemboring of het aanleggen van een horizontaal bronnetwerk.

Tegenover deze hogere opstartkosten staat een aanzienlijk lange levensduur van de broninfrastructuur:

- **Bodembron en bronlussen:** Hebben een verwachte levensduur van **30 tot 50 jaar**.
- **Warmtepompunit:** De unit zelf gaat zowel bij bodem- als luchtsystemen circa **15 tot 20 jaar** mee.

## Passieve koeling: Vrije koeling in de zomer

Een specifiek voordeel van een bodemgebonden installatie is de mogelijkheid tot **passieve koeling** (ook wel vrije koeling genoemd). Hierbij wordt met een zeer laag stroomverbruik koud water uit de bodem door het afgiftesysteem gepompt. Bekijk onze [gids over lage temperatuur verwarming en koeling](/blog/radiatoren-geschikt-warmtepomp-lage-temperatuur) voor meer details.

## Wet- en regelgeving: Geluidsnormen (Bbl) en vergunningen

Bij de keuze en plaatsing van een warmtepompsysteem spelen landelijke regels en gemeentelijke verordeningen een belangrijke rol:

- **Geluidsnormen buitenunit:** Volgens het Besluit bouwwerken leefomgeving (Bbl) mag de geluidsdruk van een buitenunit (zoals toegepast bij een lucht-water warmtepomp) op de perceelgrens maximaal **40 dB(A)** bedragen in de nachtperiode en maximaal **45 dB(A)** overdag.
- **Bodemboringen:** Voor het uitvoeren van een bodemboring ten behoeve van een bodemgebonden warmtepomp geldt een meldings- of vergunningsplicht. De uitvoering hiervan is onderworpen aan strikte regelgeving, met name in grondwaterbeschermingsgebieden.

## Subsidie: ISDE-mogelijkheden

Zowel lucht-water warmtepompen als bodemgebonden warmtepompen komen in aanmerking voor de [ISDE-subsidie](/blog/isde-subsidie-warmtepompen). De exacte hoogte van het subsidiebedrag hangt af van het vermogen en de energielabel-prestatie van het gekozen apparaat.

## Conclusie: Welke warmtepomp past bij uw situatie?

De hogere initiële investering van een bodemgebonden warmtepomp wordt veroorzaakt door de bodemboring of het bronnetwerk, maar levert een hoger seizoensrendement op en biedt de mogelijkheid tot energiezuinige passieve koeling. De bronlussen hebben daarnaast een verwachte levensduur van 30 tot 50 jaar. 

Een lucht-water warmtepomp heeft een lagere instapinvestering, waarbij wel rekening moet worden gehouden met geluidsnormen voor de buitenunit op de perceelgrens. Voor beide types warmtepompen is ISDE-subsidie beschikbaar.

---

### Veelgestelde vragen (FAQ)

#### Wat is het verschil in seizoensrendement (SCOP) tussen een bodem- en lucht-water warmtepomp?
Een bodemgebonden warmtepomp behaalt gemiddeld een SCOP van 4,5 tot 5,5 of hoger. Een lucht-water warmtepomp behaalt een gemiddelde SCOP van 3,5 tot 4,5.

#### Hoe lang gaat een bodembron mee?
De bodembron en de bijbehorende bronlussen hebben een verwachte levensduur van 30 tot 50 jaar. De warmtepompunit zelf gaat bij beide systemen circa 15 tot 20 jaar mee.

#### Welke geluidsnormen gelden voor een buitenunit van een lucht-water warmtepomp?
Volgens het Besluit bouwwerken leefomgeving (Bbl) mag de geluidsdruk van een buitenunit op de perceelgrens maximaal 40 dB(A) bedragen tijdens de nachtperiode en maximaal 45 dB(A) overdag.
`;

export function BodemgebondenVsLuchtWaterWarmtepompRendementArticle() {
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
