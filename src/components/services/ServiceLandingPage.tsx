import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../SEO';
import { services } from '../../content/services';

interface ServiceLandingPageProps {
  slug: string;
}

export function ServiceLandingPage({ slug }: ServiceLandingPageProps) {
  const service = services.find((s) => s.slug === slug)!;

  return (
    <>
      <SEO
        title={service.title}
        description={service.metaDescription}
        canonical={`https://www.enercalculatie.nl/rekentool-${service.slug}`}
      />

      <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary-text font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4">
              {service.badge}
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">{service.headline}</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl">{service.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="/#contact"
                className="bg-brand-primary hover:bg-[#008f5a] text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center min-h-[48px]"
              >
                Plan een demo (15 min)
              </a>
              <a
                href="/#pricing-calculator"
                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center min-h-[48px]"
              >
                Bereken uw tijdsbesparing
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-2xl border border-slate-200"
              >
                <CheckCircle2 className="text-brand-primary-text mb-3" size={24} />
                <h2 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 mb-12">
            <p className="text-slate-700">
              <strong className="text-brand-primary-text">Pakket:</strong> {service.pricingTier}{' '}
              <a href="/#prijzen" className="text-brand-primary-text font-semibold hover:underline">
                Bekijk alle pakketten
              </a>
              .
            </p>
          </div>

          {service.relatedBlogSlug && (
            <a
              href={`/blog/${service.relatedBlogSlug}`}
              className="flex items-center justify-between bg-slate-900 text-white p-6 sm:p-8 rounded-2xl group hover:bg-slate-800 transition-colors"
            >
              <div>
                <p className="text-sm text-slate-400 mb-1">Verdieping</p>
                <p className="font-semibold">{service.relatedBlogLabel}</p>
              </div>
              <ArrowRight className="text-brand-primary shrink-0 group-hover:translate-x-1 transition-transform" size={24} />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
