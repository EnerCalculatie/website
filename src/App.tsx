import { lazy, Suspense, useEffect, type ComponentType, type LazyExoticComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { routePreloads, type RouteModule } from './routePreloads';
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

  // Na preload geven we lazy() een synchroon-resolvende thenable in plaats van
  // de import()-promise: import() resolvet altijd asynchroon (ook uit cache),
  // en het synchrone renderToString zou dan de Suspense-fallback renderen —
  // lege prerender-pagina's en een content-flash bij hydration.
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
const BidirectioneelLadenArticle = lazyRoute('/blog/bidirectioneel-laden-v2g', () => import('./components/blog/BidirectioneelLadenArticle').then(m => ({ default: m.BidirectioneelLadenArticle })));
const EmsP1PoortArticle = lazyRoute('/blog/energiemanagementsysteem-p1-poort', () => import('./components/blog/EmsP1PoortArticle').then(m => ({ default: m.EmsP1PoortArticle })));
const EnergielabelCPlicht2030Article = lazyRoute('/blog/energielabel-c-plicht-2030', () => import('./components/blog/EnergielabelCPlicht2030Article').then(m => ({ default: m.EnergielabelCPlicht2030Article })));
const NetontwikkelingsbijdrageZonnepanelen2026Article = lazyRoute('/blog/netontwikkelingsbijdrage-zonnepanelen-2026', () => import('./components/blog/NetontwikkelingsbijdrageZonnepanelen2026Article').then(m => ({ default: m.NetontwikkelingsbijdrageZonnepanelen2026Article })));
const RendementsverliesSchaduwVervuilingZonnepanelenArticle = lazyRoute('/blog/rendementsverlies-schaduw-vervuiling-zonnepanelen', () => import('./components/blog/RendementsverliesSchaduwVervuilingZonnepanelenArticle').then(m => ({ default: m.RendementsverliesSchaduwVervuilingZonnepanelenArticle })));
const VerduurzamingspakketSamenstellenBeperktBudgetArticle = lazyRoute('/blog/verduurzamingspakket-samenstellen-beperkt-budget', () => import('./components/blog/VerduurzamingspakketSamenstellenBeperktBudgetArticle').then(m => ({ default: m.VerduurzamingspakketSamenstellenBeperktBudgetArticle })));
const VerduurzamingKostenBatenAnalyseArticle = lazyRoute('/blog/verduurzaming-kosten-baten-analyse', () => import('./components/blog/VerduurzamingKostenBatenAnalyseArticle').then(m => ({ default: m.VerduurzamingKostenBatenAnalyseArticle })));
const ThuisbatterijNetaansluitingCapaciteitArticle = lazyRoute('/blog/thuisbatterij-netaansluiting-capaciteit', () => import('./components/blog/ThuisbatterijNetaansluitingCapaciteitArticle').then(m => ({ default: m.ThuisbatterijNetaansluitingCapaciteitArticle })));

const LaadpalenVoorElektrischeAutosArticle = lazyRoute('/blog/laadpalen-voor-elektrische-autos', () => import('./components/blog/LaadpalenVoorElektrischeAutosArticle').then(m => ({ default: m.LaadpalenVoorElektrischeAutosArticle })));
const HybrideWarmtepompBusinessCaseArticle = lazyRoute('/blog/hybride-warmtepomp-business-case', () => import('./components/blog/HybrideWarmtepompBusinessCaseArticle').then(m => ({ default: m.HybrideWarmtepompBusinessCaseArticle })));
const StroomstoringZonnepanelenThuisbatterijArticle = lazyRoute('/blog/stroomstoring-zonnepanelen-thuisbatterij', () => import('./components/blog/StroomstoringZonnepanelenThuisbatterijArticle').then(m => ({ default: m.StroomstoringZonnepanelenThuisbatterijArticle })));
const EnergieopslagToekomstTrendsInstallateursArticle = lazyRoute('/blog/energieopslag-toekomst-trends-installateurs', () => import('./components/blog/EnergieopslagToekomstTrendsInstallateursArticle').then(m => ({ default: m.EnergieopslagToekomstTrendsInstallateursArticle })));
const HybrideWarmtepompDimensioneringGasketelArticle = lazyRoute('/blog/hybride-warmtepomp-dimensionering-gasketel', () => import('./components/blog/HybrideWarmtepompDimensioneringGasketelArticle').then(m => ({ default: m.HybrideWarmtepompDimensioneringGasketelArticle })));
const SeizoensvariabiliteitZonnepanelenRendementArticle = lazyRoute('/blog/seizoensvariabiliteit-zonnepanelen-rendement', () => import('./components/blog/SeizoensvariabiliteitZonnepanelenRendementArticle').then(m => ({ default: m.SeizoensvariabiliteitZonnepanelenRendementArticle })));
const PdfDocumentherkenningOfferteprocesInstallateursArticle = lazyRoute('/blog/pdf-documentherkenning-offerteproces-installateurs', () => import('./components/blog/PdfDocumentherkenningOfferteprocesInstallateursArticle').then(m => ({ default: m.PdfDocumentherkenningOfferteprocesInstallateursArticle })));
const BtwOpThuisbatterijArticle = lazyRoute('/blog/btw-op-thuisbatterij', () => import('./components/blog/BtwOpThuisbatterijArticle').then(m => ({ default: m.BtwOpThuisbatterijArticle })));
const ScopWarmtepompBerekenenStroomverbruikArticle = lazyRoute('/blog/scop-warmtepomp-berekenen-stroomverbruik', () => import('./components/blog/ScopWarmtepompBerekenenStroomverbruikArticle').then(m => ({ default: m.ScopWarmtepompBerekenenStroomverbruikArticle })));
const LaadpaalNetaansluitingCapaciteit3x25aArticle = lazyRoute('/blog/laadpaal-netaansluiting-capaciteit-3x25a', () => import('./components/blog/LaadpaalNetaansluitingCapaciteit3x25aArticle').then(m => ({ default: m.LaadpaalNetaansluitingCapaciteit3x25aArticle })));
const AircoAlsVerwarmingBerekenenArticle = lazyRoute('/blog/airco-als-verwarming-berekenen', () => import('./components/blog/AircoAlsVerwarmingBerekenenArticle').then(m => ({ default: m.AircoAlsVerwarmingBerekenenArticle })));

// Eén gedeelde module voor de vijf rekentool-landingspagina's; per pad een
// eigen lazy component die de juiste slug doorgeeft.
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

// Helper om de scrollpositie te resetten bij het wisselen van pagina
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Router-onafhankelijke content, herbruikt door zowel de browser-entry (BrowserRouter)
// als de server-entry (StaticRouter) voor prerendering.
export function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <NavBar />

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={
              <main>
                {/* SEO & Meta Tags (default homepage-metadata) */}
                <SEO />

                {/* Hero Section with Dashboard Mockup */}
                <Hero />

                {/* Trust & Process */}
                <HowItWorks />
                <ProblemSolution />
                <ComparisonTable />
                <AppDemoVideo />

                {/* Product Depth */}
                <Features />
                <section className="py-4 bg-brand-bg">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LeadMagnet />
                  </div>
                </section>
                <Integrations />
                <PricingCalculator />
                <Technology />

                {/* Conversion & Proof */}
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
            <Route path="/blog/bidirectioneel-laden-v2g" element={<BidirectioneelLadenArticle />} />
            <Route path="/blog/energiemanagementsysteem-p1-poort" element={<EmsP1PoortArticle />} />
            <Route path="/blog/energielabel-c-plicht-2030" element={<EnergielabelCPlicht2030Article />} />
            <Route path="/blog/netontwikkelingsbijdrage-zonnepanelen-2026" element={<NetontwikkelingsbijdrageZonnepanelen2026Article />} />
            <Route path="/blog/rendementsverlies-schaduw-vervuiling-zonnepanelen" element={<RendementsverliesSchaduwVervuilingZonnepanelenArticle />} />
            <Route path="/blog/verduurzamingspakket-samenstellen-beperkt-budget" element={<VerduurzamingspakketSamenstellenBeperktBudgetArticle />} />
            <Route path="/blog/verduurzaming-kosten-baten-analyse" element={<VerduurzamingKostenBatenAnalyseArticle />} />
            <Route path="/blog/thuisbatterij-netaansluiting-capaciteit" element={<ThuisbatterijNetaansluitingCapaciteitArticle />} />

            <Route path="/blog/laadpalen-voor-elektrische-autos" element={<LaadpalenVoorElektrischeAutosArticle />} />
            <Route path="/blog/hybride-warmtepomp-business-case" element={<HybrideWarmtepompBusinessCaseArticle />} />
            <Route path="/blog/stroomstoring-zonnepanelen-thuisbatterij" element={<StroomstoringZonnepanelenThuisbatterijArticle />} />
            <Route path="/blog/energieopslag-toekomst-trends-installateurs" element={<EnergieopslagToekomstTrendsInstallateursArticle />} />
            <Route path="/blog/hybride-warmtepomp-dimensionering-gasketel" element={<HybrideWarmtepompDimensioneringGasketelArticle />} />
            <Route path="/blog/seizoensvariabiliteit-zonnepanelen-rendement" element={<SeizoensvariabiliteitZonnepanelenRendementArticle />} />
            <Route path="/blog/pdf-documentherkenning-offerteproces-installateurs" element={<PdfDocumentherkenningOfferteprocesInstallateursArticle />} />
            <Route path="/blog/btw-op-thuisbatterij" element={<BtwOpThuisbatterijArticle />} />
            <Route path="/blog/scop-warmtepomp-berekenen-stroomverbruik" element={<ScopWarmtepompBerekenenStroomverbruikArticle />} />
            <Route path="/blog/laadpaal-netaansluiting-capaciteit-3x25a" element={<LaadpaalNetaansluitingCapaciteit3x25aArticle />} />
            <Route path="/blog/airco-als-verwarming-berekenen" element={<AircoAlsVerwarmingBerekenenArticle />} />
            <Route path="/rekentool-zonnepanelen" element={<ZonnepanelenLanding />} />
            <Route path="/rekentool-thuisbatterij" element={<ThuisbatterijLanding />} />
            <Route path="/rekentool-warmtepomp" element={<WarmtepompLanding />} />
            <Route path="/rekentool-airco" element={<AircoLanding />} />
            <Route path="/rekentool-laadpaal" element={<LaadpaalLanding />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
