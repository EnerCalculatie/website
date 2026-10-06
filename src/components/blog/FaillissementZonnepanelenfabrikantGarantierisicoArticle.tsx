import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const post = blogPosts.find((p) => p.slug === 'faillissement-zonnepanelenfabrikant-garantierisico')!;

const markdown = `
Wanneer een zonnepanelenfabrikant failliet gaat, vervalt de fabrieksgarantie in veel gevallen direct — maar de wettelijke aansprakelijkheid van de installateur blijft gewoon bestaan. Op grond van het conformiteitsvereiste blijft u als verkoper verantwoordelijk voor het leveren van een deugdelijk product. Voor installatiebedrijven leidt een faillissement in de leveringsketen vaak tot onduidelijkheid over financiële en juridische risico's. Hoe beschermt u uw bedrijf tegen onverwachte herstelkosten, en hoe verankert u deze garantierisico's helder in uw advies en offertes?

## Wettelijke garantie versus fabrieksgarantie bij een faillissement

Bij het wegvallen van een zonnepanelenproducent is het essentieel om onderscheid te maken tussen de wettelijke garantie en de commerciële fabrieksgarantie. Volgens het Burgerlijk Wetboek (conformiteitsvereiste) bent u als verkoper en installateur tegenover de consument aansprakelijk voor het leveren van een deugdelijk product. Deze aansprakelijkheid geldt ongeacht het voortbestaan van de fabrikant.

Een fabrieksgarantie is daarentegen een aanvullende commerciële garantie die door de producent wordt verstrekt. Indien de fabrikant failliet gaat, vervalt deze fabrieksgarantie doorgaans, tenzij deze extern is herverzekerd of in een onafhankelijke entiteit is ondergebracht.

### Is een installateur verplicht de fabrieksgarantie over te nemen?
Als installateur bent u wettelijk niet gehouden om de specifieke fabrieksgarantie over te nemen wanneer de fabrikant insolvent raakt. U blijft echter wel wettelijk aansprakelijk voor de kosten van herstel of vervanging indien het product binnen de verwachte levensduur niet aan de overeenkomst voldoet.

## De rol van herverzekerde garanties en garantiefondsen

Om te voorkomen dat garantieclaims bij een merkfaillissement volledig bij de installateur of de klant neerkomen, maken sommige producenten gebruik van herverzekerde garanties of onafhankelijke garantiefondsen.

Garantiefondsen en herverzekerde structuren waarborgen de nakoming van garantieclaims via een van de fabrikant onafhankelijke borgstellings- of verzekeringsstructuur. Mocht een fabrikant failliet gaan, dan blijft de garantie op de geleverde panelen via deze externe entiteit of verzekeraar gedekt. Dit biedt financiële zekerheid bij eventuele defecten gedurende de garantietermijn.

## Hoe beperkt u als installateur juridische en financiële risico's?

Om uw installatiebedrijf te beschermen tegen onvoorziene herstelkosten bij een faillissement in de keten, kunt u uw bedrijfsvoering en offerteproces preventief inrichten:

- **Selecteer herverzekerde merken:** U kunt het risico op wettelijke aansprakelijkheid beperken door in uw assortiment te werken met fabrikanten die gebruikmaken van herverzekerde garanties of onafhankelijke garantiefondsen.
- **Opnemen van duidelijke voorwaarden in offertes:** Neem in offertes en overeenkomsten transparante voorwaarden op over de exacta reikwijdte van uw service en eventuele vervangingskosten. Zo schept u vooraf helderheid over welk deel valt onder de productgarantie en welke service uw eigen bedrijf garandeert.
- **Transparante communicatie naar de klant:** Consumenten moeten vooraf duidelijk geïnformeerd worden over het verschil tussen de wettelijke garantie (die via de installateur loopt) en de commerciële fabrieksgarantie (die door de producent wordt verleend). Door dit onderscheid helder uit te leggen in het adviesgesprek, voorkomt u onrealistische verwachtingen en borgt u de reputatie van uw advies.


## Garantiezekerheid verankeren vóór de offerte

Het voorkomen van juridische en financiële verrassingen begint al bij het opstellen van het voorstel. Door merkkeuzes en garantievoorwaarden vooraf gestructureerd te onderbouwen in software zoals EnerCalculatie, legt u voor elke klant helder vast welke garanties door de fabrikant zijn afgedekt en welke voorwaarden gelden voor uw installatieservice. Dit geeft het installatiebedrijf en de klant volledige duidelijkheid vóór het ondertekenen van de offerte.

Hoe zijn de garantievoorwaarden en merkkeuzes in uw huidige offertes ingericht om uw bedrijf te beschermen tegen eventuele merkfaillissementen?
`;

export function FaillissementZonnepanelenfabrikantGarantierisicoArticle() {
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
