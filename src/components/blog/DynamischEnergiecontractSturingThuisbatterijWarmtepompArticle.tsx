import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'dynamisch-energiecontract-sturing-thuisbatterij-warmtepomp')!;

const markdown = `
**Hoe onderbouwt u het advies over de sturing van apparatuur bij dynamische energiecontracten?** Bij dynamische energiecontracten zijn de leveringstarieven voor elektriciteit direct gekoppeld aan de spotmarkt (EPEX Spot). Doordat deze tarieven per uur wijzigen, ontstaat er ruimte voor de slimme aansturing van [thuisbatterijen](/blog/thuisbatterij-capaciteit-kiezen) en [warmtepompen](/blog/warmtepomp-rendement-aannames). Gecombineerd met het kabinetsvoorstel om de salderingsregeling voor zonnepanelen per 1 januari 2027 te beëindigen, wordt direct eigenverbruik en lokale energie-opslag financieel steeds aantrekkelijker.

## Hoe werkt slimme sturing van warmtepompen en thuisbatterijen?

Een slim aangestuurde warmtepomp kan worden ingezet om in te spelen op de schommelende uurtarieven. De installatie kan de woning extra opwarmen of een geiser of boiler verwarmen tijdens uren met lage of negatieve stroomprijzen.

Voor thuisbatterijen geldt een vergelijkbaar principe. Een thuisbatterij kan op goedkope of negatieve uren stroom laden vanaf het net en op duurder geprijsde uren ontladen om netafname te vermijden. Voor het aanschaffen van een thuisbatterij is voor kleinverbruikers in Nederland geen landelijke ISDE- of andere aankoopsubsidie beschikbaar.

## Netcongestie voorkomen met een Home Energy Management System (EMS)

Netbeheerders kampen met netcongestie op het laagspanningsnet en stimuleren flexibiliteit om gelijktijdige piekbelasting — zoals bij het laden van batterijen en het inschakelen van warmtepompen — te voorkomen. 

Een [Home Energy Management System (EMS)](/blog/energiemanagementsysteem-p1-poort) regelt de elektrische belasting in de woning dynamisch via load balancing. Hiermee worden piekstromen opgevangen en kan het afschakelen van de hoofdzekering worden voorkomen.

## Technische NEN 1010 randvoorwaarden en veiligheidseisen

Bij het combineren van warmtepompen, thuisbatterijen en zonnepanelen dient de installatie te voldoen aan technische grenzen en de veiligheidseisen uit de NEN 1010.

### Selectiviteit en vermogensgrenzen (1-fase vs 3-fase)
Om de selectiviteit ten opzichte van de hoofdzekering te waarborgen, geldt in de praktijk bij een hoofdaansluiting van 1x35A of 3x25A (met een veiligheidsmarge) dat een omvormer of laadpaal op maximaal 16A mag worden afgezekerd.
- **Maximaal vermogen per fase:** 16A × 230V = 3,68 kW (3.680 Watt).
- **Maximaal 3-fase vermogen op 3x25A:** 3 × 16A = 48A totaal, wat neerkomt op circa 11 kW.
- Hoewel het continue vermogen van een 3x25A-aansluiting 17,25 kW bedraagt, kan er niet zomaar 17,25 kW op worden aangesloten. Dit vraagt om verzwaring van de aansluiting (bijvoorbeeld naar 3x35A of hoger).
- **Vermogens boven 3,68 kW:** Aangezien een 1-fase groep voor selectiviteit begrensd is op 16A (3,68 kW), dienen installaties of omvormers met een hoger elektrisch vermogen op een 3-fase omvormer of 3-fase aansluiting te worden aangesloten.

### Fase-onbalans en de Netcode Elektriciteit
Vanwege de Netcode Elektriciteit dient invoeding boven de 16A (3,68 kVA) over meerdere fases te worden verdeeld om fase-onbalans op het net te voorkomen. Dit betekent dat bij omvormers van bijvoorbeeld thuisbatterijen of zonnepanelen groter dan circa 3,68 kW (in de praktijk 4 kW) een 3-fase omvormer moet worden toegepast.

### Gevaar van somstromen bij gelijktijdige invoeding
Wanneer het net én een omvormer (van een thuisbatterij of PV-installatie) op dezelfde groep of op dezelfde aardlekschakelaar kunnen invoeden, tellen de stromen van beide bronnen bij elkaar op:
- **Rekenvoorbeeld:** 25A vanaf het net + 16A vanaf de omvormer = 41A. 
- Een standaard 40A-aardlekschakelaar is niet berekend op deze 41A, wat kan leiden tot overbelasting en brandgevaar.
- **Consequentie voor het advies:** Bij gelijktijdige invoeding (zoals een ontladende batterij terwijl het net ook belast wordt) moet de optelsom van alle gelijktijdig actieve stromen getoetst worden aan de nominale stroom van elke gedeelde beveiliging.

## Conclusie

Het adviseren over sturing bij dynamische energiecontracten vereist een zorgvuldige afweging van uurtarieven, de capaciteit van de aansluiting en installatietechnische beveiliging. Door slimme sturing (zoals een EMS) te combineren met correct afgestemde installaties conform NEN 1010 en de Netcode Elektriciteit, kan flexibiliteit worden benut zonder de veiligheid of continuïteit van de installatie in gevaar te brengen.
`;

export function DynamischEnergiecontractSturingThuisbatterijWarmtepompArticle() {
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
