import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'hybride-warmtepomp-business-case')!;

export function HybrideWarmtepompBusinessCaseArticle() {

  return (
    <BlogPostLayout post={post}>
<p className="text-slate-700 leading-relaxed mb-4">
  Twee woningen met exact dezelfde hybride warmtepomp kunnen een compleet andere business case hebben — niet door het toestel, maar door waar het <a href="/blog/beta-factor-hybride-warmtepomp-omschakelpunt" className="text-brand-primary-text font-semibold hover:underline">omschakelpunt (de bèta-factor)</a> tussen gas en elektriciteit wordt gelegd. Een hybride warmtepomp dekt de warmtevraag met een combinatie van een gasketel en een warmtepomp: de warmtepomp neemt de baseload voor haar rekening, de gasketel springt bij tijdens de pieklast.
</p>
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Waarom de bèta-factor de business case bepaalt
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Hoe lager het omschakelpunt (bij een hogere buitentemperatuur al overschakelen op gas), hoe minder uren de warmtepomp draait en hoe kleiner de besparing op de gasrekening. Hoe hoger het omschakelpunt, hoe meer de warmtepomp overneemt — maar ook hoe vaker deze op een minder efficiënt deellastpunt draait. De business case is dus geen vast gegeven van het toestel, maar een resultaat van deze afstelling.
</p>
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Wat bepaalt de haalbare besparing verder?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Naast de bèta-factor hangt de haalbare besparing af van de isolatie van de woning en het bestaande afgiftesysteem — reken dit per woning door in plaats van met een vuistregel. Een hybride warmtepomp levert doorgaans een lagere gasrekening en een lagere CO2-uitstoot op dan een traditionele gasketel alleen, maar de omvang daarvan verschilt sterk per situatie.
</p>
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe onderbouwt u de business case richting de klant?
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  Onderbouw de business case met een dossier-specifieke berekening van de energiekosten vóór en na, en de <a href="/blog/isde-subsidie-warmtepompen" className="text-brand-primary-text font-semibold hover:underline">ISDE-subsidie</a> die de instapinvestering verlaagt — niet met een vaste vuistregel of algemene voorbeelden, die het omschakelpunt en de woningspecifieke isolatie negeren.
</p>
<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Hoe EnerCalculatie hiermee omgaat
</h2>
<p className="text-slate-700 leading-relaxed mb-4">
  EnerCalculatie rekent de bèta-factor, de energiekosten en de ISDE-subsidie voor de specifieke woning door, zodat de business case op de daadwerkelijke situatie van de klant is gebaseerd in plaats van op een generieke aanname.
</p>

<h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">
  Bronnen
</h2>
<ol className="list-decimal pl-6 mb-6 text-slate-700 text-sm">
  <li className="mb-2"><a href="https://www.rvo.nl/subsidies-financiering/isde/woningeigenaren/warmtepomp" target="_blank" rel="noopener noreferrer" className="text-brand-primary-text font-semibold hover:underline">ISDE: Warmtepomp woningeigenaren aanvragen — RVO</a> — geraadpleegd 2026-08-03</li>
</ol>
      </BlogPostLayout>
  );
}
