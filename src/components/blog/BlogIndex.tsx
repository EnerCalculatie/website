import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Plus, Search, TrendingUp, X } from 'lucide-react';
import { SEO } from '../SEO';
import { LeadMagnet } from '../LeadMagnet';
import { NewsletterSignup } from '../NewsletterSignup';
import { blogPosts as staticPosts } from '../../content/blogPosts';
import { buildBlogListingSchema } from '../../content/blogSchema';

const autoBlogModules = import.meta.glob('./BlogInstallatie_*.tsx', { eager: true });

const EXCLUDED_TAGS = ['Installatiebranche', 'EnergieAdvies'];
const MAX_TAG_CHIPS = 8;
const PAGE_SIZE = 12;
const MAX_POPULAR = 4;
const ALL = 'Alle';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function BlogIndex() {
  const sortedPosts = useMemo(() => {
    const dynamicPosts = Object.values(autoBlogModules).map((m: any) => m.meta);
    const allPosts = [...staticPosts, ...dynamicPosts];
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const popularPosts = useMemo(() => sortedPosts.filter((p) => p.popular).slice(0, MAX_POPULAR), [sortedPosts]);

  const filterTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of sortedPosts) {
      for (const tag of post.tags) {
        if (EXCLUDED_TAGS.includes(tag)) continue;
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, MAX_TAG_CHIPS).map(([tag]) => tag);
  }, [sortedPosts]);

  const [activeTag, setActiveTag] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState<number>(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const isFiltering = q !== '' || activeTag !== ALL;

  useEffect(() => setShown(PAGE_SIZE), [activeTag, q]);

  const visiblePosts = sortedPosts.filter((p) => {
    const matchTag = activeTag === ALL || p.tags.includes(activeTag);
    const matchQuery = q === '' || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    return matchTag && matchQuery;
  });

  const remaining = Math.max(0, visiblePosts.length - shown);

  return (
    <>
      <SEO
        title="Blog | EnerCalculatie"
        description="Praktische uitleg over Nederlandse regelgeving en rekenmethodes voor verduurzamingsinstallateurs."
        canonical="https://www.enercalculatie.nl/blog"
      />
      <script type="application/ld+json">{JSON.stringify(buildBlogListingSchema())}</script>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Blog</h1>
          <div className="animate-fade-up relative mb-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek in artikelen…"
              className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border border-slate-200"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {[ALL, ...filterTags].map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={`px-4 py-2.5 rounded-full text-sm font-semibold ${tag === activeTag ? 'bg-brand-primary text-white' : 'bg-white border'}`}>
                {tag}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visiblePosts.slice(0, shown).map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="bg-white p-6 rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-2">{formatDate(post.date)}</p>
                <h2 className="font-bold text-slate-900 mb-2">{post.title}</h2>
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
              </a>
            ))}
          </div>
          {remaining > 0 && <button onClick={() => setShown((n) => n + PAGE_SIZE)} className="mt-8 block mx-auto border px-6 py-3 rounded-full">Toon meer ({remaining})</button>}
          <LeadMagnet />
          <NewsletterSignup />
        </div>
      </div>
    </>
  );
}
