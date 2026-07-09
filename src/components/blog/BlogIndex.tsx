import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { SEO } from '../SEO';
import { blogPosts as staticPosts } from '../../content/blogPosts';

// Importeer alle gegenereerde artikelen
const autoBlogModules = import.meta.glob('./BlogInstallatie_*.tsx', { eager: true });

export function BlogIndex() {
  const allPosts = useMemo(() => {
    // 1. Haal 'meta' op uit de dynamische bestanden
    const dynamicPosts = Object.values(autoBlogModules).map((m: any) => m.meta);
    
    // 2. Combineer met statische posts (filter undefined voor de zekerheid)
    return [...staticPosts, ...dynamicPosts.filter(Boolean)]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const [query, setQuery] = useState('');
  
  const visiblePosts = allPosts.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SEO title="Blog | EnerCalculatie" description="Kennisbank voor installateurs" />
      <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-black mb-8">Blog</h1>
          
          <div className="relative mb-8">
            <Search className="absolute left-4 top-4 text-slate-400" />
            <input 
              className="w-full p-4 pl-12 rounded-2xl border"
              placeholder="Zoek in artikelen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visiblePosts.map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} className="bg-white p-6 rounded-2xl border hover:shadow-md transition">
                <p className="text-xs text-slate-500 mb-2">{post.date}</p>
                <h2 className="font-bold text-lg mb-2">{post.title}</h2>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="text-brand-primary font-semibold flex items-center">
                  Lees verder <ArrowRight size={16} className="ml-2" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
