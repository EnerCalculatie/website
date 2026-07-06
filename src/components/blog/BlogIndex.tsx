import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Plus, Search, TrendingUp, X } from 'lucide-react';
import { SEO } from '../SEO';
import { LeadMagnet } from '../LeadMagnet';
import { NewsletterSignup } from '../NewsletterSignup';
import { blogPosts } from '../../content/blogPosts';
import { buildBlogListingSchema } from '../../content/blogSchema';

// Tags die op (bijna) elk artikel staan en dus niets filteren — uit de chips weren.
const EXCLUDED_TAGS = ['Installatiebranche', 'EnergieAdvies'];
const MAX_TAG_CHIPS = 8;
// Aantal zichtbare posts vóór 'toon meer'. Alle overige posts staan wél in de
// HTML (crawler-/AI-vriendelijk) maar zijn met CSS verborgen tot de knop klikt.
const PAGE_SIZE = 12;
const MAX_POPULAR = 4;

const ALL = 'Alle';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function BlogIndex() {
  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    []
  );

  // Redactioneel gekozen 'meest gelezen' (popular: true in blogPosts.ts).
  const popularPosts = useMemo(
    () => sortedPosts.filter((p) => p.popular).slice(0, MAX_POPULAR),
    [sortedPosts]
  );

  // Filtertags: op frequentie, generieke tags eruit, gecapt op MAX_TAG_CHIPS.
  const filterTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of blogPosts) {
      for (const tag of post.tags) {
        if (EXCLUDED_TAGS.includes(tag)) continue;
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_TAG_CHIPS)
      .map(([tag]) => tag);
  }, []);

  const [activeTag, setActiveTag] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState<number>(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const isFiltering = q !== '' || activeTag !== ALL;

  // Reset de 'toon meer'-teller bij het wisselen van filter of zoekterm.
  useEffect(() => setShown(PAGE_SIZE), [activeTag, q]);

  const visiblePosts = sortedPosts.filter((p) => {
    const matchTag = activeTag === ALL || p.tags.includes(activeTag);
    const matchQuery =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchTag && matchQuery;
  });

  const remaining = Math.max(0, visiblePosts.length - shown);

  return (
    <>
      <SEO
        title="Blog | EnerCalculatie"
        description="Praktische uitleg over Nederlandse regelgeving en rekenmethodes voor verduurzamingsinstallateurs: salderingsregeling, BTW-tarieven, ISDE-subsidie en meer."
        canonical="https://www.enercalculatie.nl/blog"
      />
      {/* Blog-listingschema (JSON-LD) centraal uit blogSchema.ts — altijd alle posts. */}
      <script type="application/ld+json">{JSON.stringify(buildBlogListingSchema())}</script>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CSS-animatie i.p.v. Motion: initial opacity 0 wordt mee-geprerenderd
              en houdt de content onzichtbaar tot hydration (LCP-killer). */}
          <div className="animate-fade-up">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Blog</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl">
              Praktische uitleg over Nederlandse regelgeving en rekenmethodes, voor installateurs die hun klanten onderbouwd advies willen geven.
            </p>
          </div>

          {/* Zoekbalk (client-side). Alle posts staan in de HTML; zoeken filtert visueel. */}
          <div className="animate-fade-up relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek in artikelen…"
              aria-label="Zoek in artikelen"
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Zoekopdracht wissen"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Tag-filter: client-side. De prerender toont 'Alle' → alle posts staan
              in de statische HTML (crawler-/AI-vriendelijk). */}
          <div className="animate-fade-up flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter artikelen op onderwerp">
            {[ALL, ...filterTags].map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={active}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-brand-primary text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-primary/40 hover:text-brand-primary'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Meest gelezen — alleen zonder actief filter/zoekterm (anders leidt het af). */}
          {!isFiltering && popularPosts.length > 0 && (
            <div className="animate-fade-up mb-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-brand-primary" aria-hidden="true" />
                <h2 className="text-lg font-black text-slate-900">Meest gelezen</h2>
              </div>
              <ol className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {popularPosts.map((post, i) => (
                  <li key={post.slug}>
                    <a
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-4 p-4 sm:px-6 hover:bg-slate-50 transition-colors group"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-sm">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                        {post.title}
                      </span>
                      <ArrowRight size={16} className="shrink-0 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Resultatenraster */}
          {visiblePosts.length === 0 ? (
            <p className="text-slate-500 py-8">
              Geen artikelen gevonden{query ? ` voor "${query.trim()}"` : ''}. Probeer een andere zoekterm of filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {visiblePosts.map((post, i) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  // Voorbij PAGE_SIZE: in de HTML (crawler ziet de link) maar visueel verborgen tot 'toon meer'.
                  className={`animate-fade-up flex flex-col bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group ${
                    i >= shown ? 'hidden' : ''
                  }`}
                >
                  <p className="text-xs text-slate-500 mb-2">{formatDate(post.date)}</p>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-brand-primary font-semibold text-sm">
                    Lees verder <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              ))}
            </div>
          )}

          {remaining > 0 && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-primary/40 text-slate-700 hover:text-brand-primary font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
              >
                <Plus size={18} />
                Toon meer ({remaining})
              </button>
            </div>
          )}

          <LeadMagnet />
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
