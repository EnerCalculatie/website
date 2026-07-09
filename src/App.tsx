import { lazy, Suspense, useEffect, type ComponentType, type LazyExoticComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { routePreloads, type RouteModule } from './routePreloads';
import { blogPosts } from './content/blogPosts';
import { SEO } from './components/SEO';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProblemSolution } from './components/ProblemSolution';
import { ComparisonTable } from './components/ComparisonTable';
import { Integrations } from './components/Integrations';
import { Features } from './components/Features';
import { LeadMagnet } from './components/LeadMagnet';
import { NewsletterSignup } from './components/NewsletterSignup';
import { AppDemoVideo } from './components/AppDemoVideo';
import { PricingCalculator } from './components/PricingCalculator';
import { Technology } from './components/Technology';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

// ---------------------------------------------------------------------------
// Code-splitting: alle routes buiten de homepage worden lazy geladen zodat de
// initiële bundle klein blijft. routePreloads koppelt elk pad aan zijn
// module-loader, zodat:
//  - entry-server.tsx vóór renderToString alle modules kan laden (prerender), en
//  - main.tsx vóór hydrateRoot de module van de huidige route kan laden
//    (voorkomt dat Suspense de geprerenderde HTML wegblankt).
// ---------------------------------------------------------------------------

function lazyRoute(
  paths: string | string[],
  load: () => Promise<RouteModule>
): LazyExoticComponent<ComponentType> {
  let cached: RouteModule | undefined;
  const preload = () => load().then((m) => { cached = m; return m; });

  const loader = () => {
    if (cached) {
      const mod = cached;
      return { then: (resolve: (m: RouteModule) => void) => resolve(mod) } as Promise<RouteModule>;
    }
    return preload();
  };

  for (const p of Array.isArray(paths) ? paths : [paths]) routePreloads[p] = preload;
  return lazy(loader);
}

const Privacy = lazyRoute('/privacy', () => import('./components/Privacy').then(m => ({ default: m.Privacy })));
const AboutUs = lazyRoute('/over-ons', () => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const NewsletterConfirmed = lazyRoute('/nieuwsbrief-bevestigd', () => import('./components/NewsletterConfirmed').then(m => ({ default: m.NewsletterConfirmed })));
const Terms = lazyRoute('/voorwaarden', () => import('./components/Terms').then(m => ({ default: m.Terms })));
const ProcessorAgreement = lazyRoute('/verwerkersovereenkomst', () => import('./components/ProcessorAgreement').then(m => ({ default: m.ProcessorAgreement })));
const BlogIndex = lazyRoute('/blog', () => import('./components/blog/BlogIndex').then(m => ({ default: m.BlogIndex })));

// Statische blog artikelen
const SalderingsregelingArticle = lazyRoute('/blog/salderingsregeling-2027', () => import('./components/blog/SalderingsregelingArticle').then(m => ({ default: m.SalderingsregelingArticle })));
const BtwZonnepanelenArticle = lazyRoute('/blog/btw-zonnepanelen', () => import('./components/blog/BtwZonnepanelenArticle').then(m => ({ default: m.BtwZonnepanelenArticle })));
const TerugleverkostenThuisbatterijArticle = lazyRoute('/blog/terugleverkosten-thuisbatterij', () => import('./components/blog/TerugleverkostenThuisbatterijArticle').then(m => ({ default: m.TerugleverkostenThuisbatterijArticle })));
const IsdeWarmtepompenArticle = lazyRoute('/blog/isde-subsidie-warmtepompen', () => import('./components/blog/IsdeWarmtepompenArticle').then(m => ({ default: m.IsdeWarmtepompenArticle })));
const WarmtepompRendementArticle = lazyRoute('/blog/warmtepomp-rendement-aannames', () => import('./components/blog/WarmtepompRendementArticle').then(m => ({ default: m.WarmtepompRendementArticle })));
const ExcelNaarAdviesArticle = lazyRoute('/blog/van-excel-naar-geautomatiseerd-advies', () => import('./components/blog/ExcelNaarAdviesArticle').then(m => ({ default: m.ExcelNaarAdviesArticle })));
const LaadpaalAdviesArticle = lazyRoute('/blog/laadpaal-advies-thuis', () => import('./components/blog/LaadpaalAdviesArticle').then(m => ({ default: m.LaadpaalAdviesArticle })));
const AircoVsWarmtepompArticle = lazyRoute('/blog/airco-vs-warmtepomp', () => import('./components/blog/AircoVsWarmtepompArticle').then(m => ({ default: m.AircoVsWarmtepompArticle })));
const TrendsVerduurzaming2026Article = lazyRoute('/blog/trends-verduurzaming-2026', () => import('./components/blog/TrendsVerduurzaming2026Article').then(m => ({ default: m.TrendsVerduurzaming2026Article })));
const ThuisbatterijCapaciteitArticle = lazyRoute('/blog/thuisbatterij-capaciteit-kiezen', () => import('./components/blog/ThuisbatterijCapaciteitArticle').then(m => ({ default: m.ThuisbatterijCapaciteitArticle })));
const DakorientatieZonnepanelenArticle = lazyRoute('/blog/dakorientatie-zonnepanelen-opbrengst', () => import('./components/blog/DakorientatieZonnepanelenArticle').then(m => ({ default: m.DakorientatieZonnepanelenArticle })));
const NetcongestieWachtlijstZakelijkArticle = lazyRoute('/blog/netcongestie-wachtlijst-zakelijk-2026', () => import('./components/blog/NetcongestieWachtlijstZakelijkArticle').then(m => ({ default: m.NetcongestieWachtlijstZakelijkArticle })));
const ThuisbatterijVeiligheidVerzekeringArticle = lazyRoute('/blog/thuisbatterij-veiligheid-verzekering', () => import('./components/blog/ThuisbatterijVeiligheidVerzekeringArticle').then(m => ({ default: m.ThuisbatterijVeiligheidVerzekeringArticle })));
const EiaInvesteringsaftrekArticle = lazyRoute('/blog/energie-investeringsaftrek-eia-2026', () => import('./components/blog/EiaInvesteringsaftrekArticle').then(m => ({ default: m.EiaInvesteringsaftrekArticle })));

// ---------------------------------------------------------------------------
// Automatische routing voor dagelijks gegenereerde blogs via Vite glob-import
// ---------------------------------------------------------------------------
const autoBlogModules = import.meta.glob('./components/blog/BlogInstallatie_*.tsx');

const autoBlogRoutes = Object.entries(autoBlogModules).map(([filePath, loadModule]) => {
  const match = filePath.match(/BlogInstallatie_(\d{8})\.tsx$/);
  if (!match) return null;

  const dateStr = match[1];
  const formattedDate = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;

  const post = blogPosts.find(p => p.date === formattedDate);
  if (!post) return null;

  const Component = lazyRoute(`/blog/${post.slug}`, () =>
    loadModule().then(m => ({ default: (m as any).default }))
  );

  return { path: `/blog/${post.slug}`, Component };
}).filter((route): route is { path: string; Component: React.ComponentType } => route !== null);

// Gedeelde module voor de vijf rekentool-landingspagina's
const serviceLanding = (slug: string) =>
  lazyRoute(`/rekentool-${slug}`, () =>
    import('./components/services/ServiceLandingPage').then(m => ({
      default: () => <m.ServiceLandingPage slug={slug} />,
    }))
  );
const ZonnepanelenLanding = serviceLanding('zonnepanelen');
const ThuisbatterijLanding = serviceLanding('thuisbatterij');
const WarmtepompLanding = serviceLanding('warmtepomp');
const AircoLanding = serviceLanding('airco');
const LaadpaalLanding = serviceLanding('laadpaal');

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <NavBar />

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={
              <main>
                <SEO />
                <Hero />
                <HowItWorks />
                <ProblemSolution />
                <ComparisonTable />
                <AppDemoVideo />
                <Features />
                <section className="py-4 bg-brand-bg">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LeadMagnet />
                  </div>
                </section>
                <Integrations />
                <PricingCalculator />
                <Technology />
                <Testimonials />
                <Pricing />
                <FAQ />
                <section className="py-4 bg-white">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <NewsletterSignup />
                  </div>
                </section>
                <Contact />
              </main>
            } />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/over-ons" element={<AboutUs />} />
            <Route path="/nieuwsbrief-bevestigd" element={<NewsletterConfirmed />} />
            <Route path="/voorwaarden" element={<Terms />} />
            <Route path="/verwerkersovereenkomst" element={<ProcessorAgreement />} />
            <Route path="/blog" element={<BlogIndex />} />
            
            {/* Statische blog routes */}
            <Route path="/blog/salderingsregeling-2027" element={<SalderingsregelingArticle />} />
            <Route path="/blog/btw-zonnepanelen" element={<BtwZonnepanelenArticle />} />
            <Route path="/blog/terugleverkosten-thuisbatterij" element={<TerugleverkostenThuisbatterijArticle />} />
            <Route path="/blog/isde-subsidie-warmtepompen" element={<IsdeWarmtepompenArticle />} />
            <Route path="/blog/warmtepomp-rendement-aannames" element={<WarmtepompRendementArticle />} />
            <Route path="/blog/van-excel-naar-geautomatiseerd-advies" element={<ExcelNaarAdviesArticle />} />
            <Route path="/blog/laadpaal-advies-thuis" element={<LaadpaalAdviesArticle />} />
            <Route path="/blog/airco-vs-warmtepomp" element={<AircoVsWarmtepompArticle />} />
            <Route path="/blog/trends-verduurzaming-2026" element={<TrendsVerduurzaming2026Article />} />
            <Route path="/blog/thuisbatterij-capaciteit-kiezen" element={<ThuisbatterijCapaciteitArticle />} />
            <Route path="/blog/dakorientatie-zonnepanelen-opbrengst" element={<DakorientatieZonnepanelenArticle />} />
            <Route path="/blog/netcongestie-wachtlijst-zakelijk-2026" element={<NetcongestieWachtlijstZakelijkArticle />} />
            <Route path="/blog/thuisbatterij-veiligheid-verzekering" element={<ThuisbatterijVeiligheidVerzekeringArticle />} />
            <Route path="/blog/energie-investeringsaftrek-eia-2026" element={<EiaInvesteringsaftrekArticle />} />

            {/* Dynamisch gegenereerde blog routes */}
            {autoBlogRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.Component />} />
            ))}

            <Route path="/rekentool-zonnepanelen" element={<ZonnepanelenLanding />} />
