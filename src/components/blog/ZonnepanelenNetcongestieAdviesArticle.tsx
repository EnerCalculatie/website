import { SEO } from '../SEO';
import { BlogPostLayout } from './BlogPostLayout';
import { blogPosts } from '../../content/blogPosts';

const post = blogPosts.find((p) => p.slug === 'zonnepanelen-netcongestie-advies')!;

export function ZonnepanelenNetcongestieAdviesArticle() {

  return (
    <>
      <SEO
        title={`${post.title} | EnerCalculatie`}
        description={post.description}
        canonical={`https://www.enercalculatie.nl/blog/${post.slug}`}
      />

      <BlogPostLayout post={post}>

    <p className="text-slate-700 leading-relaxed mb-4">Netcongestie is een situatie waarbij het elektriciteitsnet overbelast raakt door te veel gelijktijdige verbruikers. Dit kan leiden tot capaciteitsbeperkingen en wachtlijsten voor nieuwe aansluitingen. Als installateur van zonnepanelen moet u uw klanten effectief adviseren over deze capaciteitsbeperkingen.</p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Definitie en oorzaken van netcongestie</h2>
    <p className="text-slate-700 leading-relaxed mb-4">Netcongestie ontstaat wanneer het elektriciteitsnet niet voldoende capaciteit heeft om alle gelijktijdige verbruikers te bedienen. Dit kan worden veroorzaakt door een snelle toename van het aantal zonnepanelen en andere duurzame energiebronnen.</p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Capaciteitsbeperkingen en wachtlijsten</h2>
    <p className="text-slate-700 leading-relaxed mb-4">Capaciteitsbeperkingen en wachtlijsten kunnen het gevolg zijn van netcongestie. Dit kan betekenen dat klanten moeten wachten voordat ze hun zonnepanelen kunnen installeren of dat ze moeten kiezen voor een kleiner systeem.</p>
    <div className="overflow-x-auto mb-4">
    <table className="table-auto w-full text-slate-700">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-4 py-2 text-left">Capaciteitsniveau</th>
          <th className="px-4 py-2 text-left">Maximale capaciteit</th>
          <th className="px-4 py-2 text-left">Wachtlijst</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border-b border-slate-100">Laag</td>
          <td className="px-4 py-2 border-b border-slate-100">10 kW</td>
          <td className="px-4 py-2 border-b border-slate-100">Geen wachtlijst</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b border-slate-100">Middel</td>
          <td className="px-4 py-2 border-b border-slate-100">20 kW</td>
          <td className="px-4 py-2 border-b border-slate-100">Korte wachtlijst</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b border-slate-100">Hoog</td>
          <td className="px-4 py-2 border-b border-slate-100">30 kW</td>
          <td className="px-4 py-2 border-b border-slate-100">Lange wachtlijst</td>
        </tr>
      </tbody>
    </table>
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Rekentools voor capaciteitsberekening</h2>
    <p className="text-slate-700 leading-relaxed mb-4">Er zijn verschillende rekentools beschikbaar om de capaciteit van uw netaansluiting te berekenen. U kunt contact opnemen met uw netbeheerder om te zien welke opties er zijn voor uw specifieke situatie.</p>
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-8 mb-4">Hoe EnerCalculatie hiermee omgaat</h2>
    <p className="text-slate-700 leading-relaxed mb-4">EnerCalculatie biedt een rekentool om de capaciteit van uw netaansluiting te berekenen. U kunt deze tool vinden op <a href="/rekentool-zonnepanelen">onze website</a>. Meer informatie over netcongestie vindt u op de <a href="https://www.rvo.nl/">website van de RVO</a> en meer over ISDE-subsidies op <a href="/blog/isde-subsidie-warmtepompen">onze blog</a>.</p>
  
      </BlogPostLayout>
    </>
  );
}
