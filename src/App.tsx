import { SEO } from './components/SEO';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProblemSolution } from './components/ProblemSolution';
import { ComparisonTable } from './components/ComparisonTable';
import { Integrations } from './components/Integrations';
import { Features } from './components/Features';
import { PricingCalculator } from './components/PricingCalculator';
import { Technology } from './components/Technology';
import { ReportExample } from './components/ReportExample';
import { Pricing } from './components/Pricing';
import { KnowledgeBase } from './components/KnowledgeBase';
import { FAQ } from './components/FAQ';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO & Meta Tags */}
      <SEO />

      {/* Navigation */}
      <NavBar />

      <main>
        {/* Hero Section with Dashboard Mockup */}
        <Hero />

        {/* Trust & Process (Sprint 1 & 2 Backlog) */}
        <HowItWorks />
        <ProblemSolution />
        <ComparisonTable />

        {/* Product Depth */}
        <Features />
        <Integrations />
        <PricingCalculator />
        <Technology />

        {/* Conversion & Proof */}
        <ReportExample />
        <Pricing />
        <KnowledgeBase />
        <FAQ />
        <AboutUs />
        <Contact />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
export default App;