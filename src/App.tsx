import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { Privacy } from './components/Privacy';
import { NewsletterConfirmed } from './components/NewsletterConfirmed';
import { Terms } from './components/Terms';
import { ProcessorAgreement } from './components/ProcessorAgreement';
import { BlogIndex } from './components/blog/BlogIndex';
import { SalderingsregelingArticle } from './components/blog/SalderingsregelingArticle';
import { BtwZonnepanelenArticle } from './components/blog/BtwZonnepanelenArticle';
import { TerugleverkostenThuisbatterijArticle } from './components/blog/TerugleverkostenThuisbatterijArticle';
import { IsdeWarmtepompenArticle } from './components/blog/IsdeWarmtepompenArticle';
import { WarmtepompRendementArticle } from './components/blog/WarmtepompRendementArticle';
import { ServiceLandingPage } from './components/services/ServiceLandingPage';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

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
          <Route path="/nieuwsbrief-bevestigd" element={<NewsletterConfirmed />} />
          <Route path="/voorwaarden" element={<Terms />} />
          <Route path="/verwerkersovereenkomst" element={<ProcessorAgreement />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/salderingsregeling-2027" element={<SalderingsregelingArticle />} />
          <Route path="/blog/btw-zonnepanelen" element={<BtwZonnepanelenArticle />} />
          <Route path="/blog/terugleverkosten-thuisbatterij" element={<TerugleverkostenThuisbatterijArticle />} />
          <Route path="/blog/isde-subsidie-warmtepompen" element={<IsdeWarmtepompenArticle />} />
          <Route path="/blog/warmtepomp-rendement-aannames" element={<WarmtepompRendementArticle />} />
          <Route path="/rekentool-zonnepanelen" element={<ServiceLandingPage slug="zonnepanelen" />} />
          <Route path="/rekentool-thuisbatterij" element={<ServiceLandingPage slug="thuisbatterij" />} />
          <Route path="/rekentool-warmtepomp" element={<ServiceLandingPage slug="warmtepomp" />} />
          <Route path="/rekentool-airco" element={<ServiceLandingPage slug="airco" />} />
          <Route path="/rekentool-laadpaal" element={<ServiceLandingPage slug="laadpaal" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <CookieBanner />
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