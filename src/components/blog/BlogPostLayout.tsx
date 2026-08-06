import { ArrowLeft, ArrowRight, Linkedin, Check, Clock } from 'lucide-react';
import type { ReactNode } from 'react';
import { blogPosts, type BlogPostMeta } from '../../content/blogPosts';
import { author } from '../../content/author';
import { buildBlogPostingSchema, buildFaqSchema } from '../../content/blogSchema';
import { FreeIntakeCTA } from '../FreeIntakeCTA';
import { SEO } from '../SEO';

// Te generieke tags tellen niet mee voor 'verwantschap' bij Lees ook.
const GENERIC_TAGS = ['Installatiebranche', 'EnergieAdvies'];
const MAX_RELATED = 3;

// Gerelateerde artikelen: meeste gedeelde (niet-generieke) tags eerst, daarna
// nieuwste. Aangevuld met recente artikelen als er te weinig overlap is.
function relatedPosts(post: BlogPostMeta): BlogPostMeta[] {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const scored = others
    .map((p) => ({
      p,
      score: p.tags.filter((t) => !GENERIC_TAGS.includes(t) && post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date));

  const related = scored.filter((x) => x.score > 0).map((x) => x.p);
  if (related.length < MAX_RELATED) {
    const fillers = scored
      .filter((x) => x.score === 0)
      .map((x) => x.p)
      .filter((p) => !related.includes(p));
    related.push(...fillers);
  }
  return related.slice(0, MAX_RELATED);
}

interface BlogPostLayoutProps {
  post: BlogPostMeta;
  children: ReactNode;
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const articleUrl = `https://www.enercalculatie.nl/blog/${post.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const related = relatedPosts(post);
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
      {/* Metadata centraal — elk artikel riep hiervoor zelf <SEO> aan met een
          `${post.title} | EnerCalculatie`-titel, waardoor de merksuffix (17 tekens)
          de titel bijna altijd over de 60-tekengrens duwde. seoTitle is de korte
          variant voor de <title>-tag; post.title blijft de volledige H1. */}
      <SEO
        title={post.seoTitle ?? post.title}
        description={post.description}
        canonical={articleUrl}
        type="article"
        image={post.image}
      />
      {/* BlogPosting-schema (JSON-LD) centraal uit blogSchema.ts — auteur = Person
          voor E-E-A-T. Elk artikel erft dit automatisch; geen inline schema meer. */}
      <script type="application/ld+json">{JSON.stringify(buildBlogPostingSchema(post))}</script>
      {post.faq && post.faq.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(buildFaqSchema(post))}</script>
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        {/* CSS-animatie i.p.v. Motion: initial opacity 0 wordt mee-geprerenderd
            en houdt het hele artikel onzichtbaar tot hydration (LCP-killer). */}
        <div className="animate-fade-up prose prose-slate max-w-none">
          <div className="flex items-center justify-between gap-3 mb-6 print:hidden flex-wrap">
            <a href="/blog" className="flex items-center gap-2 text-slate-500 hover:text-brand-primary text-sm font-semibold transition-colors">
              <ArrowLeft size={16} /> Terug naar blog
            </a>
            <div className="flex items-center gap-3">
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Deel dit artikel op LinkedIn"
                className="flex items-center gap-2 bg-[#0a66c2] hover:bg-[#004182] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                <Linkedin size={18} />
                Deel op LinkedIn
              </a>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">{post.title}</h1>
          <p className="text-slate-500 mb-8">
            Door{' '}
            <a href="/over-ons" className="font-semibold text-slate-600 hover:text-brand-primary transition-colors">
              {author.name}
            </a>
            {' · '}
            {formatDate(post.date)}
            {post.updated && post.updated !== post.date && (
              <> · bijgewerkt {formatDate(post.updated)}</>
            )}
            {post.readingTimeMinutes && (
              <span className="inline-flex items-center gap-1">
                {' · '}
                <Clock size={14} className="inline -mt-0.5" aria-hidden="true" />
                {post.readingTimeMinutes} min leestijd
              </span>
            )}
          </p>

          {/* Kernpunten (TL;DR) — direct, citeerbaar antwoord bovenaan (GEO). */}
          {post.keyPoints && post.keyPoints.length > 0 && (
            <div className="not-prose mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-primary-text mb-3">Kernpunten</p>
              <ul className="space-y-2">
                {post.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-slate-700 leading-relaxed">
                    <Check size={18} className="shrink-0 mt-0.5 text-brand-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {children}

          {/* Zichtbaar FAQ-blok — naast het FAQPage-schema hierboven ook een
              citeerbaar, leesbaar antwoordformaat voor bezoekers én AI-engines (GEO). */}
          {post.faq && post.faq.length > 0 && (
            <div className="not-prose mt-10">
              <h2 className="text-xl font-black text-slate-900 mb-4">Veelgestelde vragen</h2>
              <div className="space-y-4">
                {post.faq.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="font-bold text-slate-900 mb-2">{item.question}</p>
                    <p className="text-slate-700 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lees ook — gerelateerde artikelen (interne linking + engagement). */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 print:hidden">
          <h2 className="text-lg font-black text-slate-900 mb-4">Lees ook</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="flex flex-col bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-primary/40 hover:shadow-md transition-all group"
              >
                <p className="text-xs text-slate-500 mb-2">{formatDate(p.date)}</p>
                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-brand-primary transition-colors line-clamp-3">
                  {p.title}
                </h3>
                <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-brand-primary font-semibold text-sm">
                  Lees verder <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 print:hidden">
        <FreeIntakeCTA />
      </div>
    </div>
  );
}
