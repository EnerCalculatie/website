import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../SEO';
import { LeadMagnet } from '../LeadMagnet';
import { blogPosts } from '../../content/blogPosts';

export function BlogIndex() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <SEO
        title="Blog | EnerCalculatie"
        description="Praktische uitleg over Nederlandse regelgeving en rekenmethodes voor verduurzamingsinstallateurs: salderingsregeling, BTW-tarieven, ISDE-subsidie en meer."
        canonical="https://www.enercalculatie.nl/blog"
      />
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">Blog</h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl">
              Praktische uitleg over Nederlandse regelgeving en rekenmethodes, voor installateurs die hun klanten onderbouwd advies willen geven.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <motion.a
                key={post.slug}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="block bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group"
              >
                <p className="text-sm text-slate-500 mb-2">
                  {new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-brand-primary font-semibold text-sm">
                  Lees verder <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            ))}
          </div>

          <LeadMagnet />
        </div>
      </div>
    </>
  );
}
