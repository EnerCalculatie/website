import { motion } from 'motion/react';
import { ArrowLeft, Printer, Linkedin } from 'lucide-react';
import type { ReactNode } from 'react';
import type { BlogPostMeta } from '../../content/blogPosts';
import { LeadMagnet } from '../LeadMagnet';

interface BlogPostLayoutProps {
  post: BlogPostMeta;
  children: ReactNode;
}

export function BlogPostLayout({ post, children }: BlogPostLayoutProps) {
  const articleUrl = `https://www.enercalculatie.nl/blog/${post.slug}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-slate max-w-none">
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
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                <Printer size={18} />
                Sla op als PDF / Printen
              </button>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">{post.title}</h1>
          <p className="text-slate-500 mb-8">
            {new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {children}
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 print:hidden">
        <LeadMagnet />
      </div>
    </div>
  );
}
