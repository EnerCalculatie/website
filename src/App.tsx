import { lazy, Suspense, useEffect, type ComponentType, type LazyExoticComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { routePreloads, type RouteModule } from './routePreloads';
import { SEO } from './components/SEO';
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Workflow } from './components/Workflow';
import { ProblemSolution } from './components/ProblemSolution';
import { OfferModuleSection } from './components/OfferModuleSection';
import { ResultSection } from './components/ResultSection';
import { ComparisonTable } from './components/ComparisonTable';
import { Integrations } from './components/Integrations';
import { Features } from './components/Features';
import { ProductProof } from './components/ProductProof';
import { CaseStudy } from './components/CaseStudy';
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
const ConversieVerhogenOffertesInstallatiebedrijfArticle = lazyRoute('/blog/conversie-verhogen-offertes-installatiebedrijf', () => import('./components/blog/ConversieVerhogenOffertesInstallatiebedrijfArticle').then(m => ({ default: m.ConversieVerhogenOffertesInstallatiebedrijfArticle })));
const MicroOmvormerVsCentraleOmvormerAdviesArticle = lazyRoute('/blog/micro-omvormer-vs-centrale-omvormer-advies', () => import('./components/blog/MicroOmvormerVsCentraleOmvormerAdviesArticle').then(m => ({ default: m.MicroOmvormerVsCentraleOmvormerAdviesArticle })));
const GeautomatiseerdVerduurzamingsrapportSoftwareArticle = lazyRoute('/blog/geautomatiseerd-verduurzamingsrapport-software', () => import('./components/blog/GeautomatiseerdVerduurzamingsrapportSoftwareArticle').then(m => ({ default: m.GeautomatiseerdVerduurzamingsrapportSoftwareArticle })));
const DynamicLoadBalancingLaadpaalAdviserenArticle = lazyRoute('/blog/dynamic-load-balancing-laadpaal-adviseren', () => import('./components/blog/DynamicLoadBalancingLaadpaalAdviserenArticle').then(m => ({ default: m.DynamicLoadBalancingLaadpaalAdviserenArticle })));
const GeluidsnormWarmtepompBuiteneenheidAdviesArticle = lazyRoute('/blog/geluidsnorm-warmtepomp-buiteneenheid-advies', () => import('./components/blog/GeluidsnormWarmtepompBuiteneenheidAdviesArticle').then(m => ({ default: m.GeluidsnormWarmtepompBuiteneenheidAdviesArticle })));
const KoelvermogenAircoBerekenenArticle = lazyRoute('/blog/koelvermogen-airco-berekenen', () => import('./components/blog/KoelvermogenAircoBerekenenArticle').then(m => ({ default: m.KoelvermogenAircoBerekenenArticle })));
const MonoblockVsSplitWarmtepompArticle = lazyRoute('/blog/monoblock-vs-split-warmtepomp', () => import('./components/blog/MonoblockVsSplitWarmtepompArticle').then(m => ({ default: m.MonoblockVsSplitWarmtepompArticle })));
const MidLaadpaalZakelijkVerrekenenAdviesArticle = lazyRoute('/blog/mid-laadpaal-zakelijk-verrekenen-advies', () => import('./components/blog/MidLaadpaalZakelijkVerrekenenAdviesArticle').then(m => ({ default: m.MidLaadpaalZakelijkVerrekenenAdviesArticle })));
const VermogensgarantieZonnepanelenOfferteArticle = lazyRoute('/blog/vermogensgarantie-zonnepanelen-offerte', () => import('./components/blog/VermogensgarantieZonnepanelenOfferteArticle').then(m => ({ default: m.VermogensgarantieZonnepanelenOfferteArticle })));
const WarmtepompboilerAdviserenGasbesparingIsdeArticle = lazyRoute('/blog/warmtepompboiler-adviseren-gasbesparing-isde', () => import('./components/blog/WarmtepompboilerAdviserenGasbesparingIsdeArticle').then(m => ({ default: m.WarmtepompboilerAdviserenGasbesparingIsdeArticle })));
const VerduurzamingsadviesVveCollectiefPlanArticle = lazyRoute('/blog/verduurzamingsadvies-vve-collectief-plan', () => import('./components/blog/VerduurzamingsadviesVveCollectiefPlanArticle').then(m => ({ default: m.VerduurzamingsadviesVveCollectiefPlanArticle })));
const RadiatorenGeschiktWarmtepompLageTemperatuurArticle = lazyRoute('/blog/radiatoren-geschikt-warmtepomp-lage-temperatuur', () => import('./components/blog/RadiatorenGeschiktWarmtepompLageTemperatuurArticle').then(m => ({ default: m.RadiatorenGeschiktWarmtepompLageTemperatuurArticle })));
const GeintegreerdEnergiesysteemWoningenArticle = lazyRoute('/blog/geintegreerd-energiesysteem-woningen', () => import('./components/blog/GeintegreerdEnergiesysteemWoningenArticle').then(m => ({ default: m.GeintegreerdEnergiesysteemWoningenArticle })));
const MiaVamilLaadpaalAdviserenZakelijkArticle = lazyRoute('/blog/mia-vamil-laadpaal-adviseren-zakelijk', () => import('./components/blog/MiaVamilLaadpaalAdviserenZakelijkArticle').then(m => ({ default: m.MiaVamilLaadpaalAdviserenZakelijkArticle })));
const Van1FaseNaar3FaseVerduurzamingAdviesArticle = lazyRoute('/blog/van-1-fase-naar-3-fase-verduurzaming-advies', () => import('./components/blog/Van1FaseNaar3FaseVerduurzamingAdviesArticle').then(m => ({ default: m.Van1FaseNaar3FaseVerduurzamingAdviesArticle })));
const R290KoudemiddelPropaanWarmtepompPlaatsingsadviesArticle = lazyRoute('/blog/r290-koudemiddel-propaan-warmtepomp-plaatsingsadvies', () => import('./components/blog/R290KoudemiddelPropaanWarmtepompPlaatsingsadviesArticle').then(m => ({ default: m.R290KoudemiddelPropaanWarmtepompPlaatsingsadviesArticle })));
const DcAcVerhoudingOmvormerOverdimensioneringArticle = lazyRoute('/blog/dc-ac-verhouding-omvormer-overdimensionering', () => import('./components/blog/DcAcVerhoudingOmvormerOverdimensioneringArticle').then(m => ({ default: m.DcAcVerhoudingOmvormerOverdimensioneringArticle })));
const BrutomargeBerekenenInstallatiebedrijfArticle = lazyRoute('/blog/brutomarge-berekenen-installatiebedrijf', () => import('./components/blog/BrutomargeBerekenenInstallatiebedrijfArticle').then(m => ({ default: m.BrutomargeBerekenenInstallatiebedrijfArticle })));
const ZonnepanelenFlatsAppartementenVveInstallateursArticle = lazyRoute('/blog/zonnepanelen-flats-appartementen-vve-installateurs', () => import('./components/blog/ZonnepanelenFlatsAppartementenVveInstallateursArticle').then(m => ({ default: m.ZonnepanelenFlatsAppartementenVveInstallateursArticle })));
const DynamischeEnergiecontractenAdviserenSturingBatterijWarmtepompArticle = lazyRoute('/blog/dynamische-energiecontracten-adviseren-sturing-batterij-warmtepomp', () => import('./components/blog/DynamischeEnergiecontractenAdviserenSturingBatterijWarmtepompArticle').then(m => ({ default: m.DynamischeEnergiecontractenAdviserenSturingBatterijWarmtepompArticle })));
const BodemgebondenVsLuchtWaterWarmtepompRendementArticle = lazyRoute('/blog/bodemgebonden-vs-lucht-water-warmtepomp-rendement', () => import('./components/blog/BodemgebondenVsLuchtWaterWarmtepompRendementArticle').then(m => ({ default: m.BodemgebondenVsLuchtWaterWarmtepompRendementArticle })));
const PvtPanelenCombinerenMetWarmtepompRendementEisenArticle = lazyRoute('/blog/pvt-panelen-combineren-met-warmtepomp-rendement-eisen', () => import('./components/blog/PvtPanelenCombinerenMetWarmtepompRendementEisenArticle').then(m => ({ default: m.PvtPanelenCombinerenMetWarmtepompRendementEisenArticle })));
const SvohSubsidieVerduurzamingHuurwoningenAdviesArticle = lazyRoute('/blog/svoh-subsidie-verduurzaming-huurwoningen-advies', () => import('./components/blog/SvohSubsidieVerduurzamingHuurwoningenAdviesArticle').then(m => ({ default: m.SvohSubsidieVerduurzamingHuurwoningenAdviesArticle })));
const Omvormeruitval253vKabeltrajectOfferteArticle = lazyRoute('/blog/omvormeruitval-253v-kabeltraject-offerte', () => import('./components/blog/Omvormeruitval253vKabeltrajectOfferteArticle').then(m => ({ default: m.Omvormeruitval253vKabeltrajectOfferteArticle })));
const InfraroodverwarmingCombinerenMetWarmtepompArticle = lazyRoute('/blog/infraroodverwarming-combineren-met-warmtepomp', () => import('./components/blog/InfraroodverwarmingCombinerenMetWarmtepompArticle').then(m => ({ default: m.InfraroodverwarmingCombinerenMetWarmtepompArticle })));
const VentilatiewarmtepompAdviserenBesparingOnderbouwenArticle = lazyRoute('/blog/ventilatiewarmtepomp-adviseren-besparing-onderbouwen', () => import('./components/blog/VentilatiewarmtepompAdviserenBesparingOnderbouwenArticle').then(m => ({ default: m.VentilatiewarmtepompAdviserenBesparingOnderbouwenArticle })));
const PvSurplusLadenRendementSlimmeLaadpaalArticle = lazyRoute('/blog/pv-surplus-laden-rendement-slimme-laadpaal', () => import('./components/blog/PvSurplusLadenRendementSlimmeLaadpaalArticle').then(m => ({ default: m.PvSurplusLadenRendementSlimmeLaadpaalArticle })));
const ZonnepanelenInstallatieUitbreidenOmvormerRegelsArticle = lazyRoute('/blog/zonnepanelen-installatie-uitbreiden-omvormer-regels', () => import('./components/blog/ZonnepanelenInstallatieUitbreidenOmvormerRegelsArticle').then(m => ({ default: m.ZonnepanelenInstallatieUitbreidenOmvormerRegelsArticle })));
const OostWestZonnepanelenOpbrengstZelfconsumptieArticle = lazyRoute('/blog/oost-west-zonnepanelen-opbrengst-zelfconsumptie', () => import('./components/blog/OostWestZonnepanelenOpbrengstZelfconsumptieArticle').then(m => ({ default: m.OostWestZonnepanelenOpbrengstZelfconsumptieArticle })));
const OmvormerAfschakelenNegatieveStroomprijzenPvCurtailmentArticle = lazyRoute('/blog/omvormer-afschakelen-negatieve-stroomprijzen-pv-curtailment', () => import('./components/blog/OmvormerAfschakelenNegatieveStroomprijzenPvCurtailmentArticle').then(m => ({ default: m.OmvormerAfschakelenNegatieveStroomprijzenPvCurtailmentArticle })));
const WaterzijdigInregelenWarmtepompEfficientieArticle = lazyRoute('/blog/waterzijdig-inregelen-warmtepomp-efficientie', () => import('./components/blog/WaterzijdigInregelenWarmtepompEfficientieArticle').then(m => ({ default: m.WaterzijdigInregelenWarmtepompEfficientieArticle })));
const NachtverlagingWarmtepompStroomverbruikComfortArticle = lazyRoute('/blog/nachtverlaging-warmtepomp-stroomverbruik-comfort', () => import('./components/blog/NachtverlagingWarmtepompStroomverbruikComfortArticle').then(m => ({ default: m.NachtverlagingWarmtepompStroomverbruikComfortArticle })));
const IsdeMeldcodeWarmtepompControlerenRvoArticle = lazyRoute('/blog/isde-meldcode-warmtepomp-controleren-rvo', () => import('./components/blog/IsdeMeldcodeWarmtepompControlerenRvoArticle').then(m => ({ default: m.IsdeMeldcodeWarmtepompControlerenRvoArticle })));
const OntdooicyclusWarmtepompStroompiekArticle = lazyRoute('/blog/ontdooicyclus-warmtepomp-stroompiek', () => import('./components/blog/OntdooicyclusWarmtepompStroompiekArticle').then(m => ({ default: m.OntdooicyclusWarmtepompStroompiekArticle })));
const KlantreisInstallateurVanSchouwTotOfferteArticle = lazyRoute('/blog/klantreis-installateur-van-schouw-tot-offerte', () => import('./components/blog/KlantreisInstallateurVanSchouwTotOfferteArticle').then(m => ({ default: m.KlantreisInstallateurVanSchouwTotOfferteArticle })));
const OffertesoftwareVerduurzamingNormenEisenArticle = lazyRoute('/blog/offertesoftware-verduurzaming-normen-eisen', () => import('./components/blog/OffertesoftwareVerduurzamingNormenEisenArticle').then(m => ({ default: m.OffertesoftwareVerduurzamingNormenEisenArticle })));
const BetaFactorHybrideWarmtepompOmschakelpuntArticle = lazyRoute('/blog/beta-factor-hybride-warmtepomp-omschakelpunt', () => import('./components/blog/BetaFactorHybrideWarmtepompOmschakelpuntArticle').then(m => ({ default: m.BetaFactorHybrideWarmtepompOmschakelpuntArticle })));
const SdeSubsidieZakelijkePvProjectenBusinessCaseArticle = lazyRoute('/blog/sde-subsidie-zakelijke-pv-projecten-business-case', () => import('./components/blog/SdeSubsidieZakelijkePvProjectenBusinessCaseArticle').then(m => ({ default: m.SdeSubsidieZakelijkePvProjectenBusinessCaseArticle })));
const LegionellapreventieWarmtepompboilerEnergieprofielArticle = lazyRoute('/blog/legionellapreventie-warmtepompboiler-energieprofiel', () => import('./components/blog/LegionellapreventieWarmtepompboilerEnergieprofielArticle').then(m => ({ default: m.LegionellapreventieWarmtepompboilerEnergieprofielArticle })));
const P1MeterKwartierdataAnalyserenEnergieprofielArticle = lazyRoute('/blog/p1-meter-kwartierdata-analyseren-energieprofiel', () => import('./components/blog/P1MeterKwartierdataAnalyserenEnergieprofielArticle').then(m => ({ default: m.P1MeterKwartierdataAnalyserenEnergieprofielArticle })));
const WarmtepompSlechtGeisoleerdeWoningAdviesOnderbouwenArticle = lazyRoute('/blog/warmtepomp-slecht-geisoleerde-woning-advies-onderbouwen', () => import('./components/blog/WarmtepompSlechtGeisoleerdeWoningAdviesOnderbouwenArticle').then(m => ({ default: m.WarmtepompSlechtGeisoleerdeWoningAdviesOnderbouwenArticle })));
const ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle = lazyRoute('/blog/zonnepanelen-meerdere-dakvlakken-jaaropbrengst-berekenen', () => import('./components/blog/ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle').then(m => ({ default: m.ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle })));
const CapaciteitstariefPiekbelastingZakelijkArticle = lazyRoute('/blog/capaciteitstarief-piekbelasting-zakelijk', () => import('./components/blog/CapaciteitstariefPiekbelastingZakelijkArticle').then(m => ({ default: m.CapaciteitstariefPiekbelastingZakelijkArticle })));
const ZonneboilerOfWarmtepompboilerKeuzeOnderbouwenArticle = lazyRoute('/blog/zonneboiler-of-warmtepompboiler-keuze-onderbouwen', () => import('./components/blog/ZonneboilerOfWarmtepompboilerKeuzeOnderbouwenArticle').then(m => ({ default: m.ZonneboilerOfWarmtepompboilerKeuzeOnderbouwenArticle })));
const AanvoertemperatuurWarmtepompCopVloerverwarmingArticle = lazyRoute('/blog/aanvoertemperatuur-warmtepomp-cop-vloerverwarming', () => import('./components/blog/AanvoertemperatuurWarmtepompCopVloerverwarmingArticle').then(m => ({ default: m.AanvoertemperatuurWarmtepompCopVloerverwarmingArticle })));
const SomstromenNen1010SciosScope12PvInstallatiesArticle = lazyRoute('/blog/somstromen-nen-1010-scios-scope-12-pv-installaties', () => import('./components/blog/SomstromenNen1010SciosScope12PvInstallatiesArticle').then(m => ({ default: m.SomstromenNen1010SciosScope12PvInstallatiesArticle })));
const Netverzwaring3x25aDoorlooptijdEisenArticle = lazyRoute('/blog/netverzwaring-3x25a-doorlooptijd-eisen', () => import('./components/blog/Netverzwaring3x25aDoorlooptijdEisenArticle').then(m => ({ default: m.Netverzwaring3x25aDoorlooptijdEisenArticle })));
const StooklijnWeersafhankelijkeRegelingWarmtepompRendementArticle = lazyRoute('/blog/stooklijn-weersafhankelijke-regeling-warmtepomp-rendement', () => import('./components/blog/StooklijnWeersafhankelijkeRegelingWarmtepompRendementArticle').then(m => ({ default: m.StooklijnWeersafhankelijkeRegelingWarmtepompRendementArticle })));
const DumavaSubsidieMaatschappelijkVastgoedOnderbouwenArticle = lazyRoute('/blog/dumava-subsidie-maatschappelijk-vastgoed-onderbouwen', () => import('./components/blog/DumavaSubsidieMaatschappelijkVastgoedOnderbouwenArticle').then(m => ({ default: m.DumavaSubsidieMaatschappelijkVastgoedOnderbouwenArticle })));
const DoucheWtwWarmtepompRendementNta8800Article = lazyRoute('/blog/douche-wtw-warmtepomp-rendement-nta-8800', () => import('./components/blog/DoucheWtwWarmtepompRendementNta8800Article').then(m => ({ default: m.DoucheWtwWarmtepompRendementNta8800Article })));
const Iso1511820V2xLaadpaalAdviesArticle = lazyRoute('/blog/iso-15118-20-v2x-laadpaal-advies', () => import('./components/blog/Iso1511820V2xLaadpaalAdviesArticle').then(m => ({ default: m.Iso1511820V2xLaadpaalAdviesArticle })));
const Nen7250DakbelastingZonnepanelenOfferteArticle = lazyRoute('/blog/nen-7250-dakbelasting-zonnepanelen-offerte', () => import('./components/blog/Nen7250DakbelastingZonnepanelenOfferteArticle').then(m => ({ default: m.Nen7250DakbelastingZonnepanelenOfferteArticle })));

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
const OfferteSoftwareLandingRoute = lazyRoute('/offerte-software', () =>
  import('./components/OfferteSoftwareLanding').then((m) => ({ default: m.OfferteSoftwareLanding }))
);

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

                {/* 3.1 Hero Section met echte screenshot */}
                <Hero />

                {/* 3.2 Workflow: 7 stappen van klantvraag tot akkoord */}
                <Workflow />

                {/* 3.3 Herkenbaar probleem & vergelijking */}
                <ProblemSolution />

                {/* 3.4 Vier productonderdelen: Analyse, Advies, Calculatie, Offerte */}
                <Features />

                {/* 3.5 Productproof: concrete data en echte schermen */}
                <ProductProof />

                {/* 3.6 Case Study: Van energienota naar advies */}
                <CaseStudy />

                {/* 3.7 Echte klantcase demo video/tour */}
                <AppDemoVideo />

                {/* Offertemodule dieptegang */}
                <OfferModuleSection />

                {/* Resultaat & minder administratie */}
                <ResultSection />

                {/* Vergelijkingstabel Excel / Externe adviseur / EnerCalculatie */}
                <ComparisonTable />

                <section className="py-4 bg-brand-bg">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <LeadMagnet />
                  </div>
                </section>
                <Integrations />
                <PricingCalculator />
                <Technology />

                {/* Prijzen & FAQ */}
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
            <Route path="/blog/conversie-verhogen-offertes-installatiebedrijf" element={<ConversieVerhogenOffertesInstallatiebedrijfArticle />} />
            <Route path="/blog/micro-omvormer-vs-centrale-omvormer-advies" element={<MicroOmvormerVsCentraleOmvormerAdviesArticle />} />
            <Route path="/blog/geautomatiseerd-verduurzamingsrapport-software" element={<GeautomatiseerdVerduurzamingsrapportSoftwareArticle />} />
            <Route path="/blog/dynamic-load-balancing-laadpaal-adviseren" element={<DynamicLoadBalancingLaadpaalAdviserenArticle />} />
            <Route path="/blog/geluidsnorm-warmtepomp-buiteneenheid-advies" element={<GeluidsnormWarmtepompBuiteneenheidAdviesArticle />} />
            <Route path="/blog/koelvermogen-airco-berekenen" element={<KoelvermogenAircoBerekenenArticle />} />
            <Route path="/blog/monoblock-vs-split-warmtepomp" element={<MonoblockVsSplitWarmtepompArticle />} />
            <Route path="/blog/mid-laadpaal-zakelijk-verrekenen-advies" element={<MidLaadpaalZakelijkVerrekenenAdviesArticle />} />
            <Route path="/blog/vermogensgarantie-zonnepanelen-offerte" element={<VermogensgarantieZonnepanelenOfferteArticle />} />
            <Route path="/blog/warmtepompboiler-adviseren-gasbesparing-isde" element={<WarmtepompboilerAdviserenGasbesparingIsdeArticle />} />
            <Route path="/blog/verduurzamingsadvies-vve-collectief-plan" element={<VerduurzamingsadviesVveCollectiefPlanArticle />} />
            <Route path="/blog/radiatoren-geschikt-warmtepomp-lage-temperatuur" element={<RadiatorenGeschiktWarmtepompLageTemperatuurArticle />} />
            <Route path="/blog/geintegreerd-energiesysteem-woningen" element={<GeintegreerdEnergiesysteemWoningenArticle />} />
            <Route path="/blog/mia-vamil-laadpaal-adviseren-zakelijk" element={<MiaVamilLaadpaalAdviserenZakelijkArticle />} />
            <Route path="/blog/van-1-fase-naar-3-fase-verduurzaming-advies" element={<Van1FaseNaar3FaseVerduurzamingAdviesArticle />} />
            <Route path="/blog/r290-koudemiddel-propaan-warmtepomp-plaatsingsadvies" element={<R290KoudemiddelPropaanWarmtepompPlaatsingsadviesArticle />} />
            <Route path="/blog/dc-ac-verhouding-omvormer-overdimensionering" element={<DcAcVerhoudingOmvormerOverdimensioneringArticle />} />
            <Route path="/blog/brutomarge-berekenen-installatiebedrijf" element={<BrutomargeBerekenenInstallatiebedrijfArticle />} />
            <Route path="/blog/zonnepanelen-flats-appartementen-vve-installateurs" element={<ZonnepanelenFlatsAppartementenVveInstallateursArticle />} />
            <Route path="/blog/dynamische-energiecontracten-adviseren-sturing-batterij-warmtepomp" element={<DynamischeEnergiecontractenAdviserenSturingBatterijWarmtepompArticle />} />
            <Route path="/blog/bodemgebonden-vs-lucht-water-warmtepomp-rendement" element={<BodemgebondenVsLuchtWaterWarmtepompRendementArticle />} />
            <Route path="/blog/pvt-panelen-combineren-met-warmtepomp-rendement-eisen" element={<PvtPanelenCombinerenMetWarmtepompRendementEisenArticle />} />
            <Route path="/blog/svoh-subsidie-verduurzaming-huurwoningen-advies" element={<SvohSubsidieVerduurzamingHuurwoningenAdviesArticle />} />
            <Route path="/blog/omvormeruitval-253v-kabeltraject-offerte" element={<Omvormeruitval253vKabeltrajectOfferteArticle />} />
            <Route path="/blog/infraroodverwarming-combineren-met-warmtepomp" element={<InfraroodverwarmingCombinerenMetWarmtepompArticle />} />
            <Route path="/blog/ventilatiewarmtepomp-adviseren-besparing-onderbouwen" element={<VentilatiewarmtepompAdviserenBesparingOnderbouwenArticle />} />
            <Route path="/blog/pv-surplus-laden-rendement-slimme-laadpaal" element={<PvSurplusLadenRendementSlimmeLaadpaalArticle />} />
            <Route path="/blog/zonnepanelen-installatie-uitbreiden-omvormer-regels" element={<ZonnepanelenInstallatieUitbreidenOmvormerRegelsArticle />} />
            <Route path="/blog/oost-west-zonnepanelen-opbrengst-zelfconsumptie" element={<OostWestZonnepanelenOpbrengstZelfconsumptieArticle />} />
            <Route path="/blog/omvormer-afschakelen-negatieve-stroomprijzen-pv-curtailment" element={<OmvormerAfschakelenNegatieveStroomprijzenPvCurtailmentArticle />} />
            <Route path="/blog/waterzijdig-inregelen-warmtepomp-efficientie" element={<WaterzijdigInregelenWarmtepompEfficientieArticle />} />
            <Route path="/blog/nachtverlaging-warmtepomp-stroomverbruik-comfort" element={<NachtverlagingWarmtepompStroomverbruikComfortArticle />} />
            <Route path="/blog/isde-meldcode-warmtepomp-controleren-rvo" element={<IsdeMeldcodeWarmtepompControlerenRvoArticle />} />
            <Route path="/blog/ontdooicyclus-warmtepomp-stroompiek" element={<OntdooicyclusWarmtepompStroompiekArticle />} />
            <Route path="/blog/klantreis-installateur-van-schouw-tot-offerte" element={<KlantreisInstallateurVanSchouwTotOfferteArticle />} />
            <Route path="/blog/offertesoftware-verduurzaming-normen-eisen" element={<OffertesoftwareVerduurzamingNormenEisenArticle />} />
            <Route path="/blog/beta-factor-hybride-warmtepomp-omschakelpunt" element={<BetaFactorHybrideWarmtepompOmschakelpuntArticle />} />
            <Route path="/blog/sde-subsidie-zakelijke-pv-projecten-business-case" element={<SdeSubsidieZakelijkePvProjectenBusinessCaseArticle />} />
            <Route path="/blog/legionellapreventie-warmtepompboiler-energieprofiel" element={<LegionellapreventieWarmtepompboilerEnergieprofielArticle />} />
            <Route path="/blog/p1-meter-kwartierdata-analyseren-energieprofiel" element={<P1MeterKwartierdataAnalyserenEnergieprofielArticle />} />
            <Route path="/blog/warmtepomp-slecht-geisoleerde-woning-advies-onderbouwen" element={<WarmtepompSlechtGeisoleerdeWoningAdviesOnderbouwenArticle />} />
            <Route path="/blog/zonnepanelen-meerdere-dakvlakken-jaaropbrengst-berekenen" element={<ZonnepanelenMeerdereDakvlakkenJaaropbrengstBerekenenArticle />} />
            <Route path="/blog/capaciteitstarief-piekbelasting-zakelijk" element={<CapaciteitstariefPiekbelastingZakelijkArticle />} />
            <Route path="/blog/zonneboiler-of-warmtepompboiler-keuze-onderbouwen" element={<ZonneboilerOfWarmtepompboilerKeuzeOnderbouwenArticle />} />
            <Route path="/blog/aanvoertemperatuur-warmtepomp-cop-vloerverwarming" element={<AanvoertemperatuurWarmtepompCopVloerverwarmingArticle />} />
            <Route path="/blog/somstromen-nen-1010-scios-scope-12-pv-installaties" element={<SomstromenNen1010SciosScope12PvInstallatiesArticle />} />
            <Route path="/blog/netverzwaring-3x25a-doorlooptijd-eisen" element={<Netverzwaring3x25aDoorlooptijdEisenArticle />} />
            <Route path="/blog/stooklijn-weersafhankelijke-regeling-warmtepomp-rendement" element={<StooklijnWeersafhankelijkeRegelingWarmtepompRendementArticle />} />
            <Route path="/blog/dumava-subsidie-maatschappelijk-vastgoed-onderbouwen" element={<DumavaSubsidieMaatschappelijkVastgoedOnderbouwenArticle />} />
            <Route path="/blog/douche-wtw-warmtepomp-rendement-nta-8800" element={<DoucheWtwWarmtepompRendementNta8800Article />} />
            <Route path="/blog/iso-15118-20-v2x-laadpaal-advies" element={<Iso1511820V2xLaadpaalAdviesArticle />} />
            <Route path="/blog/nen-7250-dakbelasting-zonnepanelen-offerte" element={<Nen7250DakbelastingZonnepanelenOfferteArticle />} />
            <Route path="/rekentool-zonnepanelen" element={<ZonnepanelenLanding />} />
            <Route path="/rekentool-thuisbatterij" element={<ThuisbatterijLanding />} />
            <Route path="/rekentool-warmtepomp" element={<WarmtepompLanding />} />
            <Route path="/rekentool-airco" element={<AircoLanding />} />
            <Route path="/rekentool-laadpaal" element={<LaadpaalLanding />} />
            <Route path="/offerte-software" element={<OfferteSoftwareLandingRoute />} />

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
