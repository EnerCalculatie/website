import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';
import ReactMarkdown from 'react-markdown';

const post = blogPosts.find((p) => p.slug === 'r290-koudemiddel-propaan-warmtepomp-plaatsingsadvies')!;

const markdown = `
**Wat betekent de overstap naar R290 (propaan) voor het plaatsingsadvies van een warmtepomp?** Door de herziene Europese F-gassenverordening vindt er een geleidelijke uitfasering plaats van koudemiddelen met een hoog Global Warming Potential (GWP). Hierdoor wordt R290 (propaan) in veel gevallen de standaardoplossing voor monobloc warmtepompen. Het gebruik van dit milieuvriendelijke koudemiddel brengt echter specifieke veiligheidseisen en aandachtspunten voor de installateur met zich mee.

---

## Waarom R290? Milieueigenschappen en Prestaties vergeleken

R290 heeft een **GWP van 3**. Dit is aanzienlijk lager dan de waarden van traditionele synthetische koudemiddelen:
* **R32:** GWP van 675
* **R410A:** GWP van 2088

Naast de extreem lage milieu-impact presteren R290-systemen uitstekend bij renovaties. Warmtepompen met R290 kunnen **hoge aanvoertemperaturen bereiken tot 70-75 °C**, zonder dat elektrisch bijverwarmen nodig is. Dit maakt deze systemen uitermate geschikt voor toepassing in bestaande bouw met traditionele radiatoren.

## Systeemopzet van een R290 Monobloc Warmtepomp

Bij monobloc warmtepompen die gebruikmaken van R290 bevindt het volledige koudemiddelcircuit zich hermetisch afgesloten in de buitenunit. Dit houdt in dat er enkel watervoerende leidingen de woning binnengaan, wat de veiligheid binnenshuis verhoogt.

## Veiligheidsclassificatie (NEN-EN 378) en Plaatsingsadvies buitenunit

Volgens de veiligheidsnorm **NEN-EN 378** is R290 geclassificeerd onder de **A3-veiligheidscategorie**. Dit betekent dat het koudemiddel niet-giftig is, maar wel zeer ontvlambaar.

Vanwege deze brandbaarheid dienen installateurs bij het opstellen van het plaatsingsadvies voor de buitenunit rekening te houden met specifieke richtlijnen:

1. **Veiligheidszone (ex-zone):** Rondom de buitenunit moet een gecertificeerde veiligheidszone worden aangehouden.
2. **Vrij van ontstekingsbronnen:** Binnen deze zone mogen zich absoluut geen ontstekingsbronnen bevinden (zoals verlichting, schakelaars of buitenstopcontacten).
3. **Afstand tot openingen en afvoeren:** De ex-zone moet vrij blijven van openingen naar het gebouw (zoals ramen, deuren en ventilatieroosters) en mag geen onafgedekte afvoerputten of kelderkoekoeken bevatten.

Daarnaast eist de **NEN 1010** dat elektrische installaties adequaat beveiligd zijn tegen overstroom, waarbij de gelijktijdigheid exact moet worden berekend. Raadpleeg voor specifieke vragen over de elektrische aansluiting een erkend installateur.

## Veelgestelde vragen over R290 in warmtepompen (FAQ)

### Waarom wordt R290 (propaan) gebruikt in warmtepompen?
Vanwege de herziene F-gassenverordening worden koudemiddelen met een hoog GWP uitgefaseerd. R290 heeft een GWP van slechts 3 en kan hoge aanvoertemperaturen (tot 70-75 °C) leveren.

### Waar moet een buitenunit met R290 koudemiddel geplaatst worden?
De buitenunit moet geplaatst worden op een plek waar een veiligheidszone kan worden aangehouden. Deze zone moet vrij zijn van ontstekingsbronnen, gebouwopeningen (ramen/deuren) en afvoerputten.

### Is R290 koudemiddel gevaarlijk binnenshuis?
Bij monobloc systemen bevindt het R290-koudemiddel zich uitsluitend in de buitenunit. Er lopen enkel watervoerende leidingen naar de binnenruimte.

## Conclusie

De overstap naar R290 zorgt voor een zeer lage GWP-waarde (3) en maakt hogere aanvoertemperaturen tot 70-75 °C mogelijk voor bestaande bouw. Vanwege de A3-classificatie (niet-giftig, zeer ontvlambaar) vraagt het plaatsingsadvies bij monobloc buitenunits om het strikt aanhouden van een veiligheidszone die vrij is van ontstekingsbronnen, gebouwopeningen en afvoerputten.
`;

export function R290KoudemiddelPropaanWarmtepompPlaatsingsadviesArticle() {

  return (
    <BlogPostLayout post={post}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </BlogPostLayout>
  );
}
