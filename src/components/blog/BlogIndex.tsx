import { useMemo, useState } from 'react';
import { ArrowRight, Clock, Plus, Search, TrendingUp, X } from 'lucide-react';
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
      [...blogPosts].sort((a, b) => {
        const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (diff !== 0) return diff;
        return blogPosts.indexOf(b) - blogPosts.indexOf(a);
      }),
    []
  );

  // Redactioneel gekozen 'meest gelezen' (popular: true in blogPosts.ts).
  const popularPosts = useMemo(
    () => sortedPosts.filter((p) => p.popular).slice(0, MAX_POPULAR),
    [sortedPosts]
  );

  // Nieuwste artikel uitgelicht links, met de eerstvolgende 3 rechts ernaast.
  const newestPost = sortedPosts[0];
  const secondaryPosts = sortedPosts.slice(1, 4);

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

  // Categorieën: alleen posts met een gezette `category` (redactioneel/generator-
  // gevuld veld, ouder handmatig werk heeft dit vaak nog niet). Groeit vanzelf
  // mee naarmate de content-engine meer artikelen genereert.
  const filterCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of blogPosts) {
      if (!post.category) continue;
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c);
  }, []);

  const [activeTag, setActiveTag] = useState<string>(ALL);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState<number>(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const isFiltering = q !== '' || activeTag !== ALL || activeCategory !== ALL;

  const visiblePosts = sortedPosts.filter((p) => {
    const matchTag = activeTag === ALL || p.tags.includes(activeTag);
    const matchCategory = activeCategory === ALL || p.category === activeCategory;
    const matchQuery =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchTag && matchCategory && matchQuery;
  });

  // Nieuwste + eerstvolgende 3 artikelen staan al uitgelicht boven de grid — niet dubbel tonen.
  const featuredSlugs = new Set(newestPost ? [newestPost.slug, ...secondaryPosts.map((p) => p.slug)] : []);
  const gridPosts = isFiltering
    ? visiblePosts
    : visiblePosts.filter((p) => !featuredSlugs.has(p.slug));
  const remaining = Math.max(0, gridPosts.length - shown);

  return (
    <>
      <SEO
        title="Blog | EnerCalculatie"
        description="Praktische uitleg over Nederlandse regelgeving en rekenmethodes voor verduurzamingsinstallateurs: salderingsregeling, BTW-tarieven, ISDE-subsidie en meer."
        canonical="https://enercalculatie.nl/blog"
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
              onChange={(e) => { setQuery(e.target.value); setShown(PAGE_SIZE); }}
              placeholder="Zoek in artikelen…"
              aria-label="Zoek in artikelen"
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setShown(PAGE_SIZE); }}
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
                  onClick={() => { setActiveTag(tag); setShown(PAGE_SIZE); }}
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

          {/* Categorie-filter: aparte, grovere indeling dan tags. Verschijnt pas
              zodra er minimaal 2 categorieën in gebruik zijn. */}
          {filterCategories.length >= 2 && (
            <div className="animate-fade-up flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter artikelen op categorie">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-400 mr-1">Categorie</span>
              {[ALL, ...filterCategories].map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setActiveCategory(cat); setShown(PAGE_SIZE); }}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Nieuwste artikel uitgelicht links, eerstvolgende 3 rechts — alleen
              zonder actief filter/zoekterm (anders is 'nieuwste' misleidend). */}
          {!isFiltering && newestPost && (
            <div className="animate-fade-up grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
              <a
                href={`/blog/${newestPost.slug}`}
                className="lg:col-span-2 flex flex-col bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group"
              >
                <span className="inline-flex w-fit items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary-text text-xs font-bold uppercase tracking-wide">
                  Nieuwste artikel
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug group-hover:text-brand-primary transition-colors">
                  {newestPost.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 line-clamp-3">{newestPost.excerpt}</p>
                <p className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                  {formatDate(newestPost.date)}
                  {newestPost.readingTimeMinutes && (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {newestPost.readingTimeMinutes} min leestijd
                    </span>
                  )}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-brand-primary font-semibold text-sm">
                  Lees verder <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <div className="flex flex-col gap-3">
                {secondaryPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group"
                  >
                    <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-2">
                      {formatDate(post.date)}
                      {post.readingTimeMinutes && (
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          {post.readingTimeMinutes} min
                        </span>
                      )}
                    </p>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          )}

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
          {gridPosts.length === 0 ? (
            <p className="text-slate-500 py-8">
              Geen artikelen gevonden{query ? ` voor "${query.trim()}"` : ''}. Probeer een andere zoekterm of filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {gridPosts.map((post, i) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  // Voorbij PAGE_SIZE: in de HTML (crawler ziet de link) maar visueel verborgen tot 'toon meer'.
                  className={`animate-fade-up flex flex-col bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group ${
                    i >= shown ? 'hidden' : ''
                  }`}
                >
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                    {formatDate(post.date)}
                    {post.readingTimeMinutes && (
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} aria-hidden="true" />
                        {post.readingTimeMinutes} min
                      </span>
                    )}
                  </p>
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
