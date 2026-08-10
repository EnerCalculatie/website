import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'omvormeruitval-253v-kabeltraject-offerte')!;

const markdown = `
Omvormeruitval op zonnige momenten wordt veroorzaakt door een netspanning die de limiet van 253 Volt overschrijdt. Door spanningsopdrijving over de AC-kabel tussen de omvormer en de meterkast te beperken, voorkomt u dat zonnestroominstallaties onnodig uitschakelen. Het correct dimensioneren en onderbouwen van het kabeltraject in de offerte is hierbij essentieel.

## De grens van 253 Volt en de oorzaak van omvormeruitval

Volgens Europese normen (EN 50549-1) en de Nederlandse Netcode Elektriciteit dienen omvormers automatisch uit te schakelen zodra de netspanning de grens van 253 Volt (230V + 10%) overschrijdt. 

Omvormeruitval treedt met name op tijdens piekmomenten. Dit gebeurt wanneer veel zonnestroominstallaties in een buurtschap gelijktijdig stroom terugleveren aan een lokaal belaste laagspanningskabel.

## Verdeling van verantwoordelijkheid: netbeheerder vs. installateur

Rondom de spanningskwaliteit geldt een duidelijke scheiding van verantwoordelijkheid bij de energiemeter:

* **De netbeheerder:** Op grond van de Netcode Elektriciteit dient de netbeheerder de netspanning op het overdrachtspunt (de energiemeter) binnen de bandbreedte van 230 Volt +/- 10% te houden. Dit betreft een spanning tussen 207 Volt en 253 Volt. De verantwoordelijkheid van de netbeheerder voor de spanningskwaliteit stopt bij dit overdrachtspunt.
* **De installateur en pandeigenaar:** Spanningsopdrijving die binnen de klantinstallatie ontstaat, valt onder de verantwoordelijkheid van de installateur en de pandeigenaar.

## Waardoor ontstaat spanningsopdrijving in de AC-kabel?

Spanningsopdrijving in het pand zelf wordt veroorzaakt door de kabelweerstand van de AC-kabel. Wanneer er sprake is van een grotere afstand tussen de omvormer en de meterkast, of wanneer een te dunne kabeldiameter wordt gebruikt, leidt dit bij maximale stroominvoeding tot een hogere spanningstoename over de kabel. Als de netspanning bij het overdrachtspunt al relatief hoog is, kan deze extra spanningsstijging binnenshuis ervoor zorgen dat de omvormer sneller de limiet van 253V bereikt.

## Hoe onderbouwt u het kabeltraject in uw offerte?

Om het risico op omvormeruitval te beperken, kan het kabeltraject in de offerte worden onderbouwd aan de hand van de volgende normen en keuzes:

### 1. Spanningsstijging beperken conform NEN 1010
Volgens de NEN 1010-normen wordt geadviseerd om het spanningsverlies en de spanningsstijging in het kabeltraject tussen de omvormer en de meterkast te beperken tot maximaal 1% (ca. 2,3V).

### 2. Toepassen van een grotere aderdoorsnede
Het kiezen van een grotere aderdoorsnede (zoals 4 mm² of 6 mm² in plaats van 2,5 mm²) verlaagt de kabelweerstand. Dit zorgt ervoor dat de lokale spanningsstijging bij maximale stroominvoeding daalt, waardoor de omvormer minder snel de grens van 253V bereikt.

### 3. Fasering en verdeling over het net
Om fase-onbalans te voorkomen, geldt op grond van de Netcode Elektriciteit dat invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld dient te worden. Dit houdt in dat er bij omvormers groter dan ~3,68 kW (of 4 kW in de praktijk) moet worden overgestapt op een 3-fase omvormer. Om een 3-fase omvormer toe te kunnen passen, dient er een 3-fase aansluiting in de meterkast aanwezig te zijn. Indien er op locatie slechts een 1-fase aansluiting aanwezig is, is een verzwaring van de aansluiting via de netbeheerder noodzakelijk.

## Conclusie

Spanningsopdrijving binnen de klantinstallatie wordt veroorzaakt door de kabelweerstand van de AC-kabel tussen de omvormer en de meterkast. Aangezien de verantwoordelijkheid van de netbeheerder stopt bij het overdrachtspunt (de energiemeter), ligt het beheersen van spanningsstijging binnenshuis bij de installateur en pandeigenaar. Door in de offerte rekening te houden met de NEN 1010-richtlijn van maximaal 1% spanningsstijging en een geschikte aderdoorsnede (zoals 4 mm² of 6 mm²) op te nemen, wordt de kabelweerstand verlaagd en het risico op uitschakeling bij 253V beperkt.

## Veelgestelde vragen (FAQ)

### Waarom valt een omvormer uit bij 253 Volt?
Volgens norm EN 50549-1 en de Netcode Elektriciteit moet een omvormer automatisch uitschakelen bij meer dan 253V (230V + 10%) om het net en apparatuur te beschermen.

### Wie is verantwoordelijk voor spanningsopdrijving binnenshuis?
De netbeheerder garandeert enkel de spanning tot de energiemeter (207V - 253V). Spanningsopdrijving achter de meter door kabelweerstand valt onder de verantwoordelijkheid van de installateur en pandeigenaar.

### Hoeveel spanningsstijging staat NEN 1010 toe?
NEN 1010 adviseert een maximale spanningsstijging en spanningsverlies van 1% (ongeveer 2,3V) in het kabeltraject tussen de omvormer en de meterkast.
`;

export function Omvormeruitval253vKabeltrajectOfferteArticle() {
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
