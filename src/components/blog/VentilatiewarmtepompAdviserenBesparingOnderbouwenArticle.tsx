import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'ventilatiewarmtepomp-adviseren-besparing-onderbouwen')!;

const markdown = `
Een ventilatiewarmtepomp gebruikt de warmte uit afgevoerde binnenlucht (Type C mechanische ventilatie) voor ruimteverwarming en/of warm tapwater. Bij een gemiddelde eengezinswoning levert dit een jaarlijkse gasbesparing op van circa 200 tot 500 m³ aardgas. Hieronder leest u hoe u de werking, de besparing en de energieprestatie volgens de NTA 8800 onderbouwt.

## Hoe werkt het rendement van een ventilatiewarmtepomp?

Een ventilatiewarmtepomp benut de thermische energie uit de afgezogen binnenlucht. Omdat deze afgevoerde lucht gedurende het gehele jaar een constante temperatuur van circa 20 °C heeft, kan de ventilatiewarmtepomp een constant en hoog rendement (COP) behalen.

In de praktijk werkt de ventilatiewarmtepomp hybride samen met een bestaande of nieuwe cv-ketel. De cv-ketel springt bij tijdens hele koude dagen en bij pieken in de vraag naar warm tapwater.

## Rendement en energieprestatie (NTA 8800) onderbouwen

Het effect van een ventilatiewarmtepomp is te onderbouwen aan de hand van gasbesparing en de officiële energieprestatie-indicatoren:

* **Gasbesparing:** In een gemiddelde eengezinswoning met mechanische ventilatie bespaart een ventilatiewarmtepomp circa 200 tot 500 m³ aardgas per jaar.
* **NTA 8800 rekenmethode:** In de NTA 8800 rekenmethode voor energieprestatie verlaagt de toepassing van een ventilatiewarmtepomp de BENG 2-indicator (fossiel primair energiegebruik). Daarnaast verhoogt de installatie de BENG 3-indicator (het aandeel hernieuwbare energie).

## Belangrijke randvoorwaarden en ISDE-subsidie

Voor een correcte werking en de financiële onderbouwing geldt een aantal specifieke randvoorwaarden:

* **Ventilatiedebiet:** De effectiviteit van een ventilatiewarmtepomp is direct afhankelijk van het minimale en continue ventilatiedebiet in de woning. Er is een continue luchtstroom nodig om voldoende warmte-energie uit de luchtstroom te kunnen onttrekken.
* **ISDE-subsidie:** Voor het claimen van ISDE-subsidie moet het specifieke type ventilatiewarmtepomp vermeld staan op de RVO-meldcodelijst. De installatie dient te worden uitgevoerd door een deskundige installateur.

## Conclusie

De onderbouwing voor een ventilatiewarmtepomp rust op de jaarlijkse gasbesparing van circa 200 tot 500 m³ in een gemiddelde eengezinswoning met mechanische ventilatie en de verbetering van de BENG 2- en BENG 3-indicatoren volgens de NTA 8800. Het rendement blijft op peil door de constante temperatuur van de ventilatielucht, mits het minimale en continue ventilatiedebiet in de woning geborgd is.

## Veelgestelde vragen over ventilatiewarmtepompen

### Hoeveel gas bespaart een ventilatiewarmtepomp gemiddeld?
In een gemiddelde eengezinswoning met mechanische ventilatie bespaart een ventilatiewarmtepomp circa 200 tot 500 m³ aardgas per jaar.

### Wat is het effect van een ventilatiewarmtepomp op BENG en NTA 8800?
Binnen de NTA 8800 rekenmethode verlaagt een ventilatiewarmtepomp de BENG 2-indicator (fossiel primair energiegebruik) en verhoogt deze de BENG 3-indicator (aandeel hernieuwbare energie).

### Wanneer komt een ventilatiewarmtepomp in aanmerking voor ISDE-subsidie?
Voor de ISDE-subsidie moet het specifieke type ventilatiewarmtepomp vermeld staan op de RVO-meldcodelijst en moet de installatie worden uitgevoerd door een deskundige installateur.
`;

export function VentilatiewarmtepompAdviserenBesparingOnderbouwenArticle() {
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
