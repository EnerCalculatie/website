export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601 — publicatiedatum (datePublished)
  excerpt: string;
  tags: string[]; // gebruikt door de RSS-feed (rss.ts) als <category>, bv. voor LinkedIn-hashtags via Zapier
  /** ISO 8601 — laatste inhoudelijke update. Vul in bij een herziening: voedt
   *  dateModified (schema) en lastmod (sitemap). Leeg = valt terug op `date`. */
  updated?: string;
  /** Absolute of root-relatieve afbeeldings-URL voor het BlogPosting-schema
   *  (rich results / social cards). Leeg = valt terug op /og-image.png. */
  image?: string;
  /** Zet op true om het artikel in de 'Meest gelezen'-strip te tonen (redactioneel
   *  gekozen, max 4 worden getoond). Pas dit aan naar wat je wilt uitlichten. */
  popular?: boolean;
  /** 3-4 korte kernpunten (TL;DR). Getoond in een 'Kernpunten'-blok bovenaan het
   *  artikel — direct, citeerbaar antwoord voor lezers én AI-engines (GEO). */
  keyPoints?: string[];
  /** Redactionele hoofdcategorie (bv. 'Zonnepanelen', 'Subsidies') — los van
   *  `tags`, bedoeld voor toekomstige categoriefiltering/indeling. */
  category?: string;
  /** Vraag/antwoord-paren. Gerenderd als zichtbaar FAQ-blok + FAQPage-schema
   *  (JSON-LD) — rich results en citeerbare Q&A voor AI-engines (GEO). */
  faq?: { question: string; answer: string }[];
  /** Geschatte leestijd in minuten (woordental artikel-body / 200 wpm,
   *  afgerond, minimaal 1). Wordt automatisch berekend door
   *  scripts/generate-blog-post.mjs bij nieuwe artikelen; voor bestaande
   *  artikelen eenmalig gevuld door scripts/backfill-reading-time.mjs. */
  readingTimeMinutes?: number;
}

// Metadata van alle blogartikelen. Wordt gebruikt door de BlogIndex
// voor de overzichtskaarten, en door elk artikel zelf voor SEO/schema.
// Nieuw artikel toevoegen = hier een entry toevoegen + een eigen component
// in src/components/blog/, en de route registreren in App.tsx.
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'salderingsregeling-2027',
    readingTimeMinutes: 2,
    title: 'Salderingsregeling 2027: wat verandert er voor uw klanten met zonnepanelen?',
    description:
      'De salderingsregeling wordt per 1 januari 2027 in één keer volledig afgeschaft. Lees wat dit betekent voor terugverdientijd-berekeningen en uw adviesgesprek.',
    date: '2026-06-20',
    updated: '2026-07-06',
    excerpt:
      'De afbouw is van de baan — in plaats daarvan verdwijnt de salderingsregeling per 1 januari 2027 in één keer volledig. Wat betekent dit voor de rendementsberekening die u uw klant voorlegt?',
    tags: ['Salderingsregeling', 'Zonnepanelen', 'EnergieAdvies', 'Installatiebranche'],
    popular: true,
    keyPoints: [
      'De geleidelijke afbouw is van de baan: de salderingsregeling wordt per 1 januari 2027 in één keer volledig afgeschaft.',
      'Tot 2027 blijft teruggeleverde stroom verrekend tegen het leveringstarief; daarna geldt het lagere terugleveringstarief.',
      'Reken in offertes met een terugverdientijd over 10 of 25 jaar altijd het 2027-scenario mee, niet alleen de huidige regeling.',
      'Zelfconsumptie verhogen (warmtepomp, laadpaal, thuisbatterij) wordt na 2027 het belangrijkste rendementsargument.',
    ],
  },
  {
    slug: 'btw-zonnepanelen',
    readingTimeMinutes: 3,
    title: '0% btw op zonnepanelen: wanneer geldt het nultarief, en wat moet er in de offerte staan?',
    description:
      'Sinds 1 januari 2023 geldt een 0%-btw-tarief op zonnepanelen op woningen. Lees wanneer het nultarief van toepassing is, wat erbuiten valt, en hoe u dit correct verwerkt in uw offerte.',
    date: '2026-06-20',
    updated: '2026-07-11',
    excerpt:
      'Het 0%-btw-tarief op zonnepanelen scheelt uw klant direct geld op de offerte — maar alleen als aan de juiste voorwaarden is voldaan. Wanneer geldt het nultarief wel, en wanneer toch 21%?',
    tags: ['Zonnepanelen', 'BTW', 'Installatiebranche'],
    keyPoints: [
      'Sinds 1 januari 2023 geldt 0% btw op levering en installatie van zonnepanelen op of bij woningen (particulier/VvE); bedrijfsmatig vastgoed valt erbuiten.',
      'Onder het nultarief vallen panelen, omvormer, optimizers, montagemateriaal, bekabeling, installatie-uren en meterkastaanpassing.',
      'Buiten het nultarief (21%): dakversterking, thuisbatterij, laadpaal, zonneboiler en PVT-systemen — splits die apart in de offerte.',
      'Vermeld het installatieadres en het btw-tarief per regel; een onjuiste toepassing kan tot een naheffing leiden.',
    ],
  },
  {
    slug: 'terugleverkosten-thuisbatterij',
    readingTimeMinutes: 4,
    title: 'Terugleverkosten: hoe rekent u ze door, en hoe compenseert een thuisbatterij dit voor uw klant?',
    description:
      'Energieleveranciers rekenen terugleverkosten door aan huishoudens met zonnepanelen. Lees hoe deze kosten worden berekend, wat de ACM hierover heeft vastgesteld, en hoe een thuisbatterij de teruglevering — en daarmee de kosten — verlaagt.',
    date: '2026-06-22',
    updated: '2026-07-06',
    excerpt:
      'Terugleverkosten knagen aan het rendement van zonnepanelen, en de manier waarop leveranciers ze berekenen verschilt sterk. Hoe legt u dit uit aan uw klant, en welke rol speelt een thuisbatterij hierin?',
    tags: ['Terugleverkosten', 'Thuisbatterij', 'Zonnepanelen', 'Installatiebranche'],
    keyPoints: [
      'Terugleverkosten zijn een door de ACM goedgekeurde, structurele kostenpost voor teruggeleverde zonnestroom — geen tijdelijke actie van één leverancier.',
      'Vanaf modelcontract 2026 moeten leveranciers terugleverkosten per kWh berekenen, wat contracten beter vergelijkbaar maakt.',
      'Een thuisbatterij verhoogt de zelfconsumptie en verlaagt de teruglevering, en daarmee direct de terugleverkosten.',
      'Neem de terugleverkosten van het huidige contract mee in de terugverdientijd, niet alleen de salderingstarieven.',
    ],
  },
  {
    slug: 'isde-subsidie-warmtepompen',
    readingTimeMinutes: 2,
    title: 'ISDE-subsidie voor warmtepompen: welke onderbouwing heeft de RVO nodig?',
    description:
      'De RVO beoordeelt ISDE-aanvragen voor warmtepompen op specifieke technische onderbouwing en meldcodes. Lees wat uw adviesrapport moet bevatten, en waar de grens ligt tussen advies en aanvraag.',
    date: '2026-06-22',
    updated: '2026-07-06',
    excerpt:
      'Een onvolledig onderbouwd adviesrapport kan uw klant tijd of subsidie kosten. Welke technische specificaties en meldcodes vraagt de RVO precies, en wat is uw rol als installateur daarin?',
    tags: ['ISDE', 'Warmtepomp', 'Subsidie', 'Installatiebranche'],
    popular: true,
    keyPoints: [
      'De RVO beoordeelt ISDE-aanvragen voor warmtepompen op meldcodes (per model) plus technische specificaties en vermogens.',
      'Uw adviesrapport onderbouwt wáárom de warmtepomp past; voor de aanvraag heeft de klant zelf een installatie- en betaalbewijs nodig.',
      'Scheid advies (vooraf) en subsidieaanvraag (achteraf) expliciet, anders denkt de klant dat de subsidie al geregeld is.',
      'Veelgemaakte fout: een generieke meldcode noemen in plaats van de exacte code van het geoffreerde model.',
    ],
  },
  {
    slug: 'warmtepomp-rendement-aannames',
    readingTimeMinutes: 2,
    title: 'Warmtepomp-rendement: de Nederlandse standaardaannames die uw berekening onderbouwen',
    description:
      'Een warmtepomp-besparing wordt berekend op basis van drie vaste aannames over gasverbruik, ketelrendement en warmwaterverbruik. Lees welke dat zijn, hoe een hybride systeem de berekening verandert, en waarom transparantie hierover uw verkoopargument is.',
    date: '2026-06-24',
    excerpt:
      'Een klant die het getal achter de besparing niet begrijpt, vertrouwt het minder. Welke standaardaannames liggen aan een warmtepomp-rendementsberekening ten grondslag, en hoe legt u dit uit?',
    tags: ['Warmtepomp', 'EnergieAdvies', 'Duurzaamheid', 'Installatiebranche'],
    keyPoints: [
      'Een warmtepomp-besparing rust op drie vaste aannames: 8,79 kWh per m³ gas, 90% ketelrendement en 20% warmwateraandeel.',
      'Uit het historische gasverbruik wordt zo de warmtevraag en de verwachte besparing op de energierekening herleid.',
      'Bij een hybride systeem blijven warmwater en bijstook op de gasketel; de besparing geldt alleen over het door de warmtepomp overgenomen deel.',
      'Transparantie over deze aannames is het verkoopargument: een klant die het getal begrijpt, vertrouwt het meer.',
    ],
  },
  {
    slug: 'van-excel-naar-geautomatiseerd-advies',
    readingTimeMinutes: 2,
    title: 'Van Excel naar geautomatiseerd advies: wat verandert er in uw werkdag?',
    description:
      'Een eigen Excel-rekenmodel voor zonnepanelen, thuisbatterijen of warmtepompen werkt — tot een tarief wijzigt of een collega het overneemt. Lees wat er verandert in uw werkdag bij een overstap naar een geautomatiseerd adviestraject.',
    date: '2026-06-26',
    updated: '2026-07-11',
    excerpt:
      'Een Excel-rekenmodel werkt, tot het moment dat een tarief wijzigt of een nieuwe medewerker het moet overnemen. Wat verandert er in uw werkdag bij een overstap naar een gestructureerd, geautomatiseerd adviestraject?',
    tags: ['EnergieAdvies', 'Automatisering', 'Excel', 'Installatiebranche'],
    keyPoints: [
      'Een Excel-rekenmodel loopt vast bij tariefwijzigingen (handmatig overtypen, rekenfouten) en bij overdracht aan een nieuwe medewerker.',
      'Een geautomatiseerd traject verkleint de handmatige stappen: pand registreren (Kadaster), energierekening uploaden (auto-uitlezen), adviesrapport downloaden.',
      'Tarieven pas je centraal op één plek aan in plaats van in elk los bestand; dezelfde invoer geeft altijd dezelfde uitkomst.',
      'Vooral relevant voor MKB-installateurs met meerdere offertes per week en meerdere medewerkers die dossiers overnemen.',
    ],
  },
  {
    slug: 'laadpaal-advies-thuis',
    readingTimeMinutes: 3,
    title: 'Laadpaal-advies: welke factoren bepalen de juiste configuratie voor uw klant?',
    description:
      'Laadvermogen, load balancing en de capaciteit van de groepenkast bepalen samen welke laadpaal-configuratie bij een woning past. Lees hoe u dit technisch onderbouwt én uitlegt aan een klant die elektrisch rijden overweegt.',
    date: '2026-06-29',
    updated: '2026-07-11',
    excerpt:
      'Een laadpaal-advies is meer dan een stekker aan de gevel: laadvermogen, load balancing en de resterende capaciteit van de groepenkast bepalen samen de juiste configuratie. Hoe legt u dit onderbouwd uit aan uw klant?',
    tags: ['Laadpaal', 'ElektrischRijden', 'EnergieAdvies', 'Installatiebranche'],
    keyPoints: [
      'Drie factoren bepalen de juiste laadpaal-configuratie: laadvermogen, load balancing en de resterende capaciteit van groepenkast en netaansluiting.',
      'Het laadvermogen wordt begrensd door de zwakste schakel — vaak de ingebouwde lader van de auto; meer vermogen dan de auto aankan is verspilde investering.',
      '(Dynamische) load balancing voorkomt dat de hoofdzekering afslaat als warmtepomp, airco of batterij gelijktijdig verbruiken.',
      'Bij structureel capaciteitstekort is een verzwaring bij de netbeheerder nodig — een aparte aanvraagstap met doorlooptijd die je vooraf benoemt.',
    ],
  },
  {
    slug: 'airco-vs-warmtepomp',
    readingTimeMinutes: 4,
    title: 'Airco of (hybride) warmtepomp: wanneer is welke keuze de juiste verkoopargumentatie?',
    description:
      'Airco, hybride warmtepomp of volledig elektrische warmtepomp: de keuze hangt af van de bouwkundige situatie, het verwarmingssysteem en de wens van de klant. Lees hoe u de SCOP-norm gebruikt als verkoopargument en wanneer welke oplossing het beste past.',
    date: '2026-07-01',
    updated: '2026-07-11',
    excerpt:
      'Airco of warmtepomp — voor veel klanten lijken het inwisselbare keuzes, maar de argumentatie verschilt sterk. Welke situatie vraagt om een lucht-lucht-airco, en wanneer is een (hybride) warmtepomp de betere keuze? De SCOP-norm maakt het verschil inzichtelijk.',
    tags: ['Airco', 'Warmtepomp', 'SCOP', 'EnergieAdvies', 'Installatiebranche'],
    keyPoints: [
      'Airco (lucht-lucht) en (hybride) lucht-water-warmtepomp worden beide op de SCOP-norm (EN 14825) beoordeeld en zijn daarmee vergelijkbaar.',
      'Een airco past bij primair koelen met bijverwarmen of een woning zonder geschikt cv-systeem; hij levert geen warm tapwater.',
      'Een hybride warmtepomp is de tussenstap voor bestaande bouw met hogere aanvoertemperaturen of matige isolatie; ISDE geldt mits de SCOP-drempel wordt gehaald.',
      'Een volledig elektrische warmtepomp geeft de hoogste besparing, maar alleen bij goede isolatie en lagetemperatuurverwarming (circa 35 °C).',
    ],
  },
  {
    slug: 'trends-verduurzaming-2026',
    readingTimeMinutes: 5,
    title: 'Verduurzamingsmarkt 2026: trends in subsidies, regelgeving en marktvraag voor installateurs',
    description:
      'De Nederlandse verduurzamingsmarkt verandert in 2026: gewijzigde ISDE-bedragen voor warmtepompen, explosieve groei van thuisbatterijen, het nieuwe netcongestie-prioriteringskader en de naderende afschaffing van de salderingsregeling. Lees wat dit betekent voor uw adviesgesprek.',
    date: '2026-07-03',
    updated: '2026-07-06',
    excerpt:
      'Gewijzigde ISDE-subsidies, een thuisbatterijmarkt die in 2025 met 140% groeide, een nieuw prioriteringskader voor netcongestie en de salderingsregeling die in 2027 verdwijnt: de verduurzamingsmarkt vraagt in 2026 om een bijgesteld advies. Wat zijn de belangrijkste ontwikkelingen?',
    tags: ['Verduurzaming', 'Trends', 'ISDE', 'Thuisbatterij', 'Netcongestie', 'Installatiebranche'],
    keyPoints: [
      'ISDE 2026: gewijzigde bedragen (startbedrag €1.025 plus €225 per kW vanaf 1 kW); split-airco\'s en warmtepompen met GWP boven 750 en onder 3 kg vervallen.',
      'De thuisbatterijmarkt groeide in 2025 circa 140%, gedreven door de salderingsafschaffing (2027) en terugleverkosten.',
      'Vanaf 1 juli 2026 geldt een nieuw ACM-prioriteringskader voor netcongestie; load balancing wordt bij zakelijke laadpalen een voorwaarde.',
      'De zonnemarkt verzadigt (29,4 GWp, 3,3 miljoen installaties); de combinatieofferte (zon met batterij of laadpaal) wordt de standaard.',
    ],
  },
  {
    slug: 'thuisbatterij-capaciteit-kiezen',
    readingTimeMinutes: 5,
    title: 'Thuisbatterij dimensioneren: hoe bepaalt u de juiste capaciteit voor uw klant?',
    description:
      'De juiste thuisbatterij-capaciteit hangt af van zelfconsumptieprofiel, zonnepaneelproductie en financieel doel van uw klant. Lees welke vuistregels gelden, wat het verschil is tussen kWh en kW, en hoe u onderbouwd adviseert.',
    date: '2026-07-06',
    excerpt:
      'Een thuisbatterij van 5 kWh of toch 10 kWh? Te kleine capaciteit mist opbrengst, te grote capaciteit betaalt zichzelf niet terug. Welke factoren bepalen de juiste dimensionering, en hoe legt u dat onderbouwd uit aan uw klant?',
    tags: ['Thuisbatterij', 'Zonnepanelen', 'EnergieAdvies', 'Installatiebranche'],
    popular: true,
    keyPoints: [
      'De juiste capaciteit volgt uit het zelfconsumptieprofiel, de installatiegrootte en het financiële doel — niet uit "goedkoopste" of "grootste".',
      'Vuistregel: circa 1 kWh batterij per geïnstalleerde kWp zonnepanelen; boven 1,5 kWh/kWp daalt de jaargemiddelde benuttingsgraad.',
      '8–10 kWh is de gangbare keuze voor een doorsnee woning met 6–10 kWp zonnepanelen.',
      'Na afschaffing van de saldering (2027) wordt zelfconsumptie waardevoller, wat de terugverdientijd verkort.',
    ],
  },
  {
    slug: 'dakorientatie-zonnepanelen-opbrengst',
    readingTimeMinutes: 4,
    title: 'Dakoriëntatie en hellingshoek: hoeveel opbrengst verliest uw klant bij een niet-ideaal dak?',
    description:
      'Een zuidgericht dak met 35° helling levert het meeste op — maar de meeste daken wijken daarvan af. Lees hoeveel opbrengstverlies realistisch is bij oost-, west- of noordoriëntatie, en hoe u dit onderbouwd uitlegt in het adviesgesprek.',
    date: '2026-07-06',
    excerpt:
      'Niet elk dak kijkt naar het zuiden. Hoeveel zonnepaneelrendement verliest een klant bij een oost-westdak, een vlak dak of gedeeltelijke schaduw — en wanneer loont een installatie toch?',
    tags: ['Zonnepanelen', 'Dakoriëntatie', 'EnergieAdvies', 'Installatiebranche'],
    keyPoints: [
      'Zuid met 35–40° helling is optimaal (circa 875–950 kWh/kWp per jaar in NL); alle andere situaties worden als percentage daarvan uitgedrukt (oriëntatiefactor).',
      'Oost/west op 35° levert circa 80–85%, een vlak dak circa 87–90%, noord op 35° circa 60–65% — klanten overschatten het verlies meestal.',
      'Een oost-westdak heeft twee productiepieken, wat de zelfconsumptie beter spreidt en terugleverkosten kan verlagen.',
      'Permanente schaduw neem je als reductiefactor mee; bij meer dan 20% schaduw tijdens productieve uren lonen optimizers of micro-omvormers.',
    ],
  },
  {
    slug: 'netcongestie-wachtlijst-zakelijk-2026',
    readingTimeMinutes: 5,
    title:
      'Netcongestie 2026: wat betekent de wachtlijst voor kleinverbruikers vanaf 1 juli voor uw zakelijke klant?',
    description:
      'Vanaf 1 juli 2026 komen ook kleinverbruikers op de netcongestie-wachtlijst voor een nieuwe of zwaardere aansluiting. Lees wat dit betekent voor het aansluitadvies aan uw zakelijke klant, en welke alternatieven zoals een capaciteitsbeperkend contract en batterijopslag u kunt inzetten.',
    date: '2026-07-06',
    excerpt:
      'Ruim 15.000 grootverbruikers staan al op de wachtlijst voor netcapaciteit, en vanaf 1 juli 2026 komen kleinverbruikers daar in congestiegebieden bij. Wat betekent dit voor het aansluitadvies aan uw zakelijke klant, en welke alternatieven overbruggen de wachttijd?',
    tags: ['Netcongestie', 'Zakelijk', 'Batterijopslag', 'Installatiebranche'],
    keyPoints: [
      'Vanaf 1 juli 2026 komen ook kleinverbruikers (tot en met 3x80A) in congestiegebieden op dezelfde netcongestie-wachtlijst als grootverbruikers.',
      'Eind 2025 stonden ruim 15.000 grootverbruikers op de wachtlijst (circa 9,3 GW); reguliere bedrijfsaansluitingen krijgen geen automatische voorrang.',
      'Het ACM-prioriteringskader geeft alleen voorrang aan congestieverlichters, kritieke voorzieningen en basisbehoeften.',
      'Overbruggen kan met een capaciteitsbeperkend contract (CBC), GOPACS/congestiemanagement of batterijopslag (telt als congestieverlichter).',
    ],
  },
  {
    slug: 'thuisbatterij-veiligheid-verzekering',
    readingTimeMinutes: 5,
    title: 'Thuisbatterij, verzekering en het energielabel: welke eisen gelden er per 29 mei 2026?',
    description:
      'Verzekeraars stellen steeds strengere eisen aan de installatie van thuisbatterijen, en vanaf 29 mei 2026 kan een thuisbatterij meetellen voor het energielabel. Lees welke NEN 1010-eisen, celchemie en documentatie uw klant nodig heeft om verzekerd én in aanmerking te blijven.',
    date: '2026-07-07',
    excerpt:
      'Een verkeerd geplaatste of ondocumenteerde thuisbatterij kan uw klant bij schade zijn verzekeringsdekking kosten. Welke NEN 1010- en documentatie-eisen stellen verzekeraars, en wat verandert er per 29 mei 2026 aan het energielabel?',
    tags: ['Thuisbatterij', 'Brandveiligheid', 'Verzekering', 'Energielabel', 'Installatiebranche'],
    keyPoints: [
      'Verzekeraars eisen bij een vaste thuisbatterij installatie door een erkend installateur conform NEN 1010, met een opleverrapport — anders kan een schadeclaim worden afgewezen.',
      'Een LFP-batterij (lithium-ijzerfosfaat) op een onbrandbare ondergrond of wand geldt als brandveiliger dan plaatsing op een houten vloer.',
      'Meld de thuisbatterij aan bij Energieleveren.nl en bewaar het opleverrapport, garantiebewijs en model-/serienummers — verzekeraars vragen dit dossier steeds vaker op.',
      'Vanaf 29 mei 2026 kan een vast aangesloten thuisbatterij (minimaal 5 kWh, met lokale opwek) meetellen voor het energielabel van de woning.',
    ],
  },
  {
    slug: 'energie-investeringsaftrek-eia-2026',
    readingTimeMinutes: 5,
    title: 'Energie-investeringsaftrek (EIA) 2026: hoe onderbouwt u dit fiscale voordeel bij een zakelijke klant?',
    description:
      'Bij een zakelijke klant is niet de ISDE, maar de energie-investeringsaftrek (EIA) het relevante fiscale voordeel: 40% van het investeringsbedrag in zonnepanelen, een warmtepomp of laadinfrastructuur is in 2026 extra aftrekbaar. Lees aan welke eisen de Energielijst 2026 stelt en hoe u dit onderbouwt in uw offerte.',
    date: '2026-07-08',
    excerpt:
      'Bij een zakelijke klant met een bedrijfsdak of wagenpark draait het fiscale gesprek niet om de ISDE, maar om de energie-investeringsaftrek. Welke eisen stelt de Energielijst 2026 aan zonnepanelen, warmtepompen en laadpalen, en hoe berekent u het daadwerkelijke belastingvoordeel?',
    tags: ['EIA', 'Subsidie', 'Zakelijk', 'Installatiebranche'],
    keyPoints: [
      'De EIA levert in 2026 een extra aftrek van 40% van het investeringsbedrag op de fiscale winst op, bovenop de reguliere afschrijving; het budget bedraagt €460 miljoen.',
      'Per bedrijfsmiddel geldt een minimale investering van €2.500, met een maximum van €155 miljoen aftrekbare investeringen per onderneming per kalenderjaar.',
      'De Energielijst 2026 stelt per categorie eigen eisen: zonnepanelen vanaf 15 kWp gecombineerd piekvermogen, warmtepompen met SCOP ≥ 4,5 en halogeenvrij koudemiddel, laadpalen die publiek toegankelijk zijn (AC ≥ 11 kW, DC ≥ 20 kW).',
      'Meld de investering binnen drie maanden na het aangaan van de verplichting (opdrachtbevestiging) bij de RVO — een te late melding kost de aftrek definitief, ook als de investering verder aan alle eisen voldoet.',
    ],
  },
  {
    slug: 'bidirectioneel-laden-v2g',
    readingTimeMinutes: 5,
    title: 'Bidirectioneel laden: wat betekent V2G/V2H voor uw laadpaal-advies in 2026?',
    description:
      'Sinds 2026 is Renault de eerste fabrikant met een opschaalbare V2G-dienst voor Nederlandse particulieren. Lees het verschil tussen V2H en V2G, welke techniek en standaarden hierbij horen, en welke subsidies en regelingen gelden voor uw klant.',
    date: '2026-07-10',
    excerpt:
      'Een laadpaal die niet alleen laadt, maar ook teruglevert: bidirectioneel laden komt in 2026 voor het eerst beschikbaar voor Nederlandse particulieren. Wat is het verschil tussen V2H en V2G, wat kost het, en welke regelingen gelden voor uw zakelijke klant?',
    tags: ['Laadpaal', 'V2G', 'ElektrischRijden', 'Installatiebranche'],
    keyPoints: [
      'Bidirectioneel laden kent twee toepassingen: V2H (eigen zelfconsumptie verhogen, vergelijkbaar met een thuisbatterij) en V2G (daadwerkelijk terugleveren aan het net via een marktpartij en dynamisch contract).',
      'ISO 15118-20 is de CCS-standaard die auto, laadpaal en netcode op elkaar afstemt; oudere modellen zoals de Nissan Leaf gebruiken nog het CHAdeMO-protocol.',
      'Sinds H1 2026 is Renault de eerste fabrikant met een opschaalbare V2G-dienst voor Nederlandse particulieren; een landelijke subsidie voor particuliere bidirectionele laadpalen ontbreekt vooralsnog.',
      'Voor zakelijk gebruik gelden wel de SPRILA-subsidie en, sinds 1 juli 2026, ERE-certificaten voor bidirectionele laadpalen met een MID-gecertificeerde meter.',
    ],
  },
  {
    slug: 'energiemanagementsysteem-p1-poort',
    readingTimeMinutes: 4,
    title: 'Energiemanagementsysteem en P1-poort: hoe stuurt u batterij, laadpaal en warmtepomp slim aan?',
    description:
      'Een energiemanagementsysteem (EMS) leest via de P1-poort van de slimme meter continu het actuele vermogen en stuurt daarmee thuisbatterij, laadpaal en warmtepomp op elkaar af. Lees hoe de P1-poort werkt, waarom dit in 2026 relevanter wordt, en wat dit betekent voor uw ontwerp en offerte.',
    date: '2026-07-10',
    excerpt:
      'Vier apparaten die onafhankelijk van elkaar stroom vragen of opwekken, passen niet altijd binnen dezelfde netaansluiting. Hoe stuurt een energiemanagementsysteem via de P1-poort batterij, laadpaal en warmtepomp op elkaar af, en wanneer neemt u dit standaard op in uw offerte?',
    tags: ['EMS', 'SlimmeMeter', 'Thuisbatterij', 'Installatiebranche'],
    keyPoints: [
      'De P1-poort geeft via het DSMR-protocol elke seconde het actuele vermogen door en meet, anders dan omvormerdata, op het punt van de netaansluiting zelf.',
      'Activatie van de P1-poort is gratis via het klantportaal van de netbeheerder (o.a. mijnliander.nl, mijnaansluiting.nl, klantportaal Stedin) en zou standaard onderdeel moeten zijn van de oplevering bij meerdere grootverbruikers.',
      'Een EMS combineert P1-, omvormer-, batterij- en laadpaaldata om te bepalen welk apparaat op welk moment stroom krijgt, vaak via een lokaal protocol zoals Modbus zodat sturing ook zonder internetverbinding werkt.',
      'EMS-sturing kan bij zakelijke klanten een kostbare capaciteitsuitbreiding van de aansluiting overbodig maken en wordt relevanter door de salderingsafschaffing (2027), dynamische contracten en netcongestie.',
    ],
  },
  {
    slug: 'energielabel-c-plicht-2030',
    readingTimeMinutes: 5,
    title: 'Energielabel C-plicht 2030: wat betekent dit voor uw verduurzamingsadvies aan particuliere verhuurders?',
    description:
      'Per 2030 moeten huurwoningen minimaal energielabel C hebben. Ontdek welke maatregelen nodig zijn en hoe u verhuurders hierin adviseert.',
    date: '2026-07-10',
    excerpt:
      'Vanaf 1 januari 2030 geldt in Nederland een wettelijke eis dat particuliere verhuurders hun woningen moeten verhuren met minimaal energielabel C. Deze maatregel, vastgelegd in het Besluit kwaliteit energieprestatie woningen (BKE), heeft directe gevolgen voor uw adviesgesprek met verhuurders die nu nog label D, E, F of G hebben. In dit artikel leest u welke maatregelen doorgaans nodig zijn om van label D naar C te komen, welke uitzonderingen er gelden, en hoe u als installateur deze transitie onderbouwt.',
    tags: ['Energielabel', 'Regelgeving', 'Warmtepompen', 'Zonnepanelen', 'Installatiebranche'],
    keyPoints: [
      'Per 1 januari 2030 moeten particuliere huurwoningen minimaal energielabel C hebben bij aanvang van een nieuwe huurovereenkomst',
      'Van label D naar C vraagt doorgaans isolatie plus één of twee verduurzamingsmaatregelen zoals zonnepanelen of een warmtepomp',
      'Uitzonderingen gelden voor monumenten, beschermde stads- en dorpsgezichten, en woningen waar maatregelen niet technisch of financieel haalbaar zijn',
      'Een rendementsberekening voor een verhuurder wijkt af van die voor een eigenaar-bewoner: de verhuurder investeert, maar de huurder profiteert van lagere energielasten',
    ],
  },
  {
    slug: 'netontwikkelingsbijdrage-zonnepanelen-2026',
    readingTimeMinutes: 3,
    title: 'Netontwikkelingsbijdrage zonnepanelen: hoe rekent u deze correct door in uw advies?',
    description:
      'Ontdek hoe u de netontwikkelingsbijdrage verwerkt in zonnepaneeladviezen. Wij laten zien hoe u transparant rekent en de impact op de terugverdientijd bepaalt.',
    date: '2026-07-10',
    excerpt:
      'Regelgeving rondom de netontwikkelingsbijdrage raakt direct de rendementsberekening voor zonnepanelen. Leer hoe u deze correct verwerkt in uw advies, zodat uw klant een realistisch financieel beeld houdt.',
    tags: ['Zonnepanelen', 'Regelgeving', 'Rendementsberekening', 'Installatiebranche'],
    keyPoints: [
      'Netontwikkelingsbijdrage is een gemeentelijke vergoeding voor nul-afnemers zonder stroomafname',
      'Het tarief verschilt per gemeente en wordt jaarlijks geïndexeerd aan officiële prijsindexen',
      'Een berekening zonder deze vaste last geeft een te optimistisch beeld van de terugverdientijd',
      'EnerCalculatie verwerkt de bijdrage automatisch in uw dossier, zodat het rendement altijd kloppend is',
    ],
  },
  {
    slug: 'rendementsverlies-schaduw-vervuiling-zonnepanelen',
    readingTimeMinutes: 5,
    title: 'Rendementsverlies door schaduw en vervuiling: meten, berekenen en compenseren',
    description:
      'Hoe schaduw en vervuiling uw zonnepaneel-berekening beïnvloeden. Lees hoe u dit professioneel meet, in kaart brengt en in uw offerte verwerkt.',
    date: '2026-07-11',
    excerpt:
      'Schaduw en vervuiling kunnen de jaaropbrengst van zonnepanelen met 20–60% verminderen. Ontdek hoe u deze verliezen professioneel analyseert, berekent en transparant communiceert naar uw klant.',
    tags: ['Zonnepanelen', 'Rendement', 'Schaduwanalyse', 'Vervuiling', 'Offertebereking', 'Installatiebranche'],
    keyPoints: [
      'Schaduw en vervuiling kunnen jaaropbrengst met 20–60% verminderen, afhankelijk van type en seizoen',
      'Professionele schaduwanalyse bepaalt via lasermetingen of software welke obstakels daadwerkelijk impact hebben',
      'Vervuilingsverliezen verschillen per type (mos, bladeren, vogelmest) en zijn deels seizoensgebonden',
      'Transparante communicatie over deze factoren verhoogt klantvertrouwen en voorkomt latere teleurstelling',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Hoeveel rendement verliest een zonnepaneel door schaduw?', answer: 'Dit varieert sterk: gedeeltelijke schaduw kan 5–20% verlies geven, terwijl structurele schaduw door gebouwen of bomen 40–60% verlies of meer kan betekenen. Een professionele schaduwanalyse bepaalt dit per uur van de dag en per seizoen.' },
      { question: 'Wat zijn de gevolgen van vervuiling (mos, bladeren, vogelmest)?', answer: 'Vervuiling veroorzaakt meestal 2–8% rendementsverlies in het groeimoment (voorjaar) of na onregelmatig schoonmaken. Mos en bladeren werken groter door dan vogelmest. Regelmatig schoonmaken (1–2x per jaar) herstelt meestal 90%+ van het verlies.' },
      { question: 'Hoe meet ik schaduw professioneel voordat ik een offerte maak?', answer: 'Via lasermeting ter plaatse, drone-fotografie of schaduwsimulatie-software (bv. PVsyst, HelioScope). Deze methoden tonen welke delen van het dak en wanneer schaduw krijgen, zodat u nauwkeurig kunt berekenen hoeveel opbrengstverlies dat betekent.' },
      { question: 'Moet ik rendementsverlies door schaduw en vervuiling in de offerte opnemen?', answer: 'Ja — een onderbouwde berekening met zichtbare verliesfactoren geeft klanten realistischere verwachtingen en verhoogt het vertrouwen in uw advies. Dit voorkomt teleurstelling later en wordt steeds vaker verwacht door klanten die online onderzoek doen.' },
      { question: 'Hoe controleer ik na installatie of vervuiling het rendement inderdaad beïnvloedt?', answer: 'Via monitoring-systemen (monitoring-apps van paneelfabrikanten of de omvormer) kunt u de actuele opbrengst volgen en vergelijken met de berekende opbrengst. Afwijkingen groter dan 5–10% kunnen op vervuiling of technische problemen wijzen.' },
    ],
  },
  {
    slug: 'verduurzamingspakket-samenstellen-beperkt-budget',
    readingTimeMinutes: 1,
    title: 'Verduurzamingspakket samenstellen met beperkt budget',
    description:
      'Een praktische gids voor installateurs om een verduurzamingspakket samen te stellen voor klanten met een beperkt budget',
    date: '2026-07-11',
    excerpt:
      'Met de juiste combinatie van zonnepanelen, thuisbatterijen en warmtepompen kan een klant met een beperkt budget toch een duurzame en betaalbare oplossing krijgen',
    tags: ['Verduurzamingspakket', 'Beperkt budget', 'Zonnepanelen', 'Thuisbatterijen', 'Warmtepompen', 'Installatiebranche'],
    keyPoints: [
      'Combinatie van zonnepanelen en thuisbatterijen voor maximale zelfconsumptie',
      'Warmtepompen als alternatief voor gasgestookte verwarmingsinstallaties',
      'Belang van load balancing en capaciteitscontrole bij laadpalen',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Hoe kan ik als installateur een verduurzamingspakket samenstellen voor een klant met een beperkt budget?', answer: 'Door de combinatie van zonnepanelen, thuisbatterijen en warmtepompen te optimaliseren, rekening houdend met de specifieke situatie en wensen van de klant.' },
      { question: 'Wat is de belangrijkste factor bij het kiezen van een laadpaal?', answer: 'De capaciteit van de aansluiting en de resterende capaciteit van de groepenkast en de netaansluiting, om te voorkomen dat de hoofdzekering afslaat.' },
      { question: 'Kan een warmtepomp een goede optie zijn voor een klant met een beperkt budget?', answer: 'Ja, warmtepompen kunnen een alternatief zijn voor gasgestookte verwarmingsinstallaties en kunnen zelfs subsidies ontvangen via de ISDE-regeling, zoals vermeld op de website van de RVO.' },
      { question: 'Hoe kan ik de zelfconsumptie van een zonnepaneel-installatie maximaliseren?', answer: 'Door de combinatie van zonnepanelen en thuisbatterijen te optimaliseren, zodat de opgewekte stroom direct wordt gebruikt of opgeslagen voor later gebruik.' },
      { question: 'Wat is de rol van load balancing bij laadpalen?', answer: 'Load balancing regelt de laadstroom van de laadpaal automatisch, om te voorkomen dat de hoofdzekering afslaat en om de installatie veiliger en toekomstbestendiger te maken.' },
    ],
  },
  {
    slug: 'verduurzaming-kosten-baten-analyse',
    readingTimeMinutes: 1,
    title: 'Verduurzaming kosten baten analyse: wanneer loont een verduurzamingspakket écht voor uw klant?',
    description:
      'Ontdek wanneer een verduurzamingspakket echt loont voor uw klant. Lees onze expertise over verduurzaming, warmtepompen, zonnepanelen en thuisbatterijen.',
    date: '2026-07-13',
    excerpt:
      'Een verduurzamingspakket kan een grote investering zijn, maar wanneer loont het echt voor uw klant? Lees hier onze expertise.',
    tags: ['Verduurzaming', 'Kosten-batenanalyse', 'Zonnepanelen', 'Thuisbatterijen', 'Warmtepompen', 'Installatiebranche'],
    keyPoints: [
      'Verduurzaming kan een grote investering zijn',
      'Een kosten-batenanalyse is essentieel',
      'Zonnepanelen, thuisbatterijen en warmtepompen zijn populaire opties',
      'Een goede analyse kan helpen bij het maken van een beslissing',
    ],
    category: 'Subsidies',
    faq: [
      { question: 'Wat is een verduurzamingspakket?', answer: 'Een verduurzamingspakket is een combinatie van maatregelen om een woning of bedrijf te verduurzamen, zoals zonnepanelen, thuisbatterijen en warmtepompen.' },
      { question: 'Hoe kan ik bepalen of een verduurzamingspakket loont voor mijn klant?', answer: 'Een kosten-batenanalyse is essentieel om te bepalen of een verduurzamingspakket loont voor uw klant. Hierbij worden de kosten van de investering vergeleken met de verwachte besparingen en voordelen.' },
      { question: 'Wat zijn de meest populaire opties voor verduurzaming?', answer: 'Zonnepanelen, thuisbatterijen en warmtepompen zijn populaire opties voor verduurzaming. Elk van deze opties heeft zijn eigen voordelen en nadelen, en een goede analyse kan helpen bij het maken van een beslissing.' },
      { question: 'Kan EnerCalculatie helpen bij het maken van een kosten-batenanalyse?', answer: 'Ja, EnerCalculatie kan helpen bij het maken van een kosten-batenanalyse. Onze rekentools en expertise kunnen u helpen bij het bepalen of een verduurzamingspakket loont voor uw klant.' },
    ],
  },
  {
    slug: 'warmtepompen-kopen-isde-subsidie',
    readingTimeMinutes: 1,
    title: 'Warmtepompen kopen met ISDE-subsidie: hoe kiest u de juiste voor uw klant?',
    description:
      'Ontdek hoe u de juiste warmtepomp kiest voor uw klant met ISDE-subsidie. Lees over hybride en all-electric warmtepompen, rendementen en subsidievoorwaarden.',
    date: '2026-07-13',
    excerpt:
      'In dit artikel leest u hoe u de juiste warmtepomp kiest voor uw klant, inclusief hybride en all-electric warmtepompen, rendementen en subsidievoorwaarden.',
    tags: ['Warmtepompen', 'ISDE-subsidie', 'Hybride warmtepompen', 'All-electric warmtepompen', 'Installatiebranche'],
    keyPoints: [
      'Hybride warmtepompen combineren elektrische en gasgestookte verwarming',
      'All-electric warmtepompen verdienen zich sneller terug dan hybride modellen',
      'De ISDE-subsidie voor warmtepompen bedraagt maximaal €5.000',
      'Een goede isolatie van de woning is essentieel voor het rendement van de warmtepomp',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Wat is de ISDE-subsidie voor warmtepompen?', answer: 'De ISDE-subsidie voor warmtepompen bedraagt maximaal €5.000. Deze subsidie is afhankelijk van het type warmtepomp en de woning waarin deze wordt geïnstalleerd.' },
      { question: 'Wat is het verschil tussen hybride en all-electric warmtepompen?', answer: 'Hybride warmtepompen combineren elektrische en gasgestookte verwarming, terwijl all-electric warmtepompen alleen elektriciteit gebruiken. All-electric warmtepompen verdienen zich sneller terug dan hybride modellen.' },
      { question: 'Hoe belangrijk is isolatie voor het rendement van een warmtepomp?', answer: 'Een goede isolatie van de woning is essentieel voor het rendement van de warmtepomp. Een slecht geïsoleerde woning verhoogt de energievraag en verlaagt het rendement van de warmtepomp.' },
      { question: 'Wat zijn de voordelen van een warmtepomp voor een woning?', answer: 'Warmtepompen bieden een aantal voordelen, zoals een lagere energierekening, een hoger wooncomfort en een verhoogde waarde van de woning. Bovendien zijn warmtepompen een milieuvriendelijke optie, omdat ze minder CO2-uitstoot produceren dan traditionele verwarmingsbronnen.' },
      { question: 'Hoe kan ik de juiste warmtepomp kiezen voor mijn klant?', answer: 'Om de juiste warmtepomp te kiezen voor uw klant, moet u rekening houden met factoren zoals de grootte van de woning, de isolatie, de energievraag en de subsidievoorwaarden. Een professioneel advies van een erkend installateur is essentieel om de juiste keuze te maken.' },
    ],
  },
  {
    slug: 'zonnepanelen-netcongestie-advies',
    readingTimeMinutes: 1,
    title: 'Zonnepanelen en netcongestie: hoe adviseert u tegen wachtlijsten en capaciteitsgrenzen?',
    description:
      'Netcongestie beperkt de mogelijkheden voor zonnepanelen. Ontdek hoe u als installateur uw klanten effectief adviseert over capaciteitsbeperkingen.',
    date: '2026-07-13',
    excerpt:
      'Netcongestie is een steeds grotere uitdaging voor installateurs van zonnepanelen. Hoe onderbouwt u uw advies?',
    tags: ['Zonnepanelen', 'Netcongestie', 'Installatiebranche', 'Subsidies'],
    keyPoints: [
      'Netcongestie definities en oorzaken',
      'Capaciteitsbeperkingen en wachtlijsten',
      'Rekentools voor capaciteitsberekening',
      'ISDE-subsidies en netcongestie',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Wat is netcongestie?', answer: 'Netcongestie is een situatie waarbij het elektriciteitsnet overbelast raakt door te veel gelijktijdige verbruikers. Dit kan leiden tot capaciteitsbeperkingen en wachtlijsten voor nieuwe aansluitingen.' },
      { question: 'Hoe bereken ik de capaciteit van mijn netaansluiting?', answer: 'U kunt de capaciteit van uw netaansluiting berekenen met behulp van onze rekentool op <a href="/rekentool-zonnepanelen">onze website</a> of door contact op te nemen met uw netbeheerder.' },
      { question: 'Kan ik nog steeds zonnepanelen installeren als er sprake is van netcongestie?', answer: 'Ja, maar u moet rekening houden met capaciteitsbeperkingen en wachtlijsten. U kunt contact opnemen met uw netbeheerder om te zien welke opties er zijn voor uw specifieke situatie. Meer informatie over netcongestie vindt u op de <a href="https://www.rvo.nl/">website van de RVO</a>.' },
      { question: 'Hoe zit het met ISDE-subsidies en netcongestie?', answer: 'De ISDE-subsidie is een belangrijk instrument voor het stimuleren van duurzame energie. Echter, netcongestie kan de capaciteit van het net beperken, waardoor subsidies niet altijd kunnen worden toegekend. U kunt meer informatie over de ISDE-subsidie vinden op <a href="/blog/isde-subsidie-warmtepompen">onze blog</a>.' },
    ],
  },
  {
    slug: 'thuisbatterij-netaansluiting-capaciteit',
    readingTimeMinutes: 1,
    title: 'Thuisbatterij en netaansluiting: wanneer vereist het batterijbeheer aanpassingen aan uw offerte?',
    description:
      'Lees hoe een thuisbatterij uw netaansluiting beïnvloedt en wanneer batterijbeheer aanpassingen in uw offerte vereist.',
    date: '2026-07-14',
    excerpt:
      'Een thuisbatterij kan de capaciteit van uw netaansluiting beïnvloeden, zeker in combinatie met andere verduurzamingsmaatregelen. Ontdek wanneer batterijbeheer aanpassingen in uw offerte vereist.',
    tags: ['Thuisbatterij', 'Netaansluiting', 'Capaciteit', 'Installatiebranche'],
    keyPoints: [
      'Bepaal de maximale capaciteit van uw netaansluiting',
      'Evalueer de impact van een thuisbatterij op uw netaansluiting',
      'Batterijbeheer kan aanpassingen in uw offerte vereisen',
      'EnerCalculatie helpt u bij het bepalen van de juiste capaciteit',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Wat is de invloed van een thuisbatterij op mijn netaansluiting?', answer: 'Een thuisbatterij kan de capaciteit van uw netaansluiting beïnvloeden, zeker in combinatie met andere verduurzamingsmaatregelen zoals zonnepanelen en warmtepompen.' },
      { question: 'Wanneer vereist batterijbeheer aanpassingen aan mijn offerte?', answer: 'Batterijbeheer vereist aanpassingen aan uw offerte wanneer de capaciteit van uw netaansluiting ontoereikend is of wanneer u meerdere verduurzamingsmaatregelen combineert.' },
      { question: 'Hoe kan ik de maximale capaciteit van mijn netaansluiting bepalen?', answer: 'U kunt de maximale capaciteit van uw netaansluiting bepalen door contact op te nemen met uw netbeheerder of door gebruik te maken van een rekentool zoals EnerCalculatie.' },
    ],
  },
  {
    slug: 'thuisbatterij-vergelijking-merken-en-typen',
    readingTimeMinutes: 1,
    title: 'Hoe kiest u de juiste thuisbatterij voor uw klant: een vergelijking van verschillende typen en merken',
    description:
      'Vergelijk thuisbatterijen voor een onderbouwd advies. Lees hier over zelfconsumptie, energieopslag en rendement.',
    date: '2026-07-14',
    excerpt:
      'Het kiezen van de juiste thuisbatterij voor uw klant kan lastig zijn. Maar met de juiste kennis en de juiste vergelijking, kunt u een onderbouwd advies geven.',
    tags: ['Thuisbatterij', 'Zelfconsumptie', 'Energieopslag', 'Installatiebranche'],
    keyPoints: [
      'Definitie van zelfconsumptie en energieopslag',
      'Vergelijking van verschillende typen en merken van thuisbatterijen',
      'Belang van rendement en terugverdientijd bij het kiezen van een thuisbatterij',
      'Het belang van een onderbouwd advies voor uw klant',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Wat is zelfconsumptie?', answer: 'Zelfconsumptie is het eigen verbruik van de door uw zonnepanelen opgewekte stroom. Een thuisbatterij kan dat verbruik verhogen door teruggeleverde stroom op te slaan en later te gebruiken.' },
      { question: 'Wat is energieopslag?', answer: 'Energieopslag is de mogelijkheid om energie die op een bepaald moment wordt opgewekt, op te slaan voor later gebruik. Thuisbatterijen zijn een vorm van energieopslag.' },
      { question: 'Hoe kies ik de juiste thuisbatterij voor mijn klant?', answer: 'Bij het kiezen van een thuisbatterij moet u rekening houden met factoren als het soort accu, de capaciteit, de garantie en de kosten. Vergelijk verschillende typen en merken om de beste keuze te maken.' },
      { question: 'Wat is de terugverdientijd van een thuisbatterij?', answer: 'De terugverdientijd van een thuisbatterij hangt af van factoren als de kosten van de batterij, de besparing op de energierekening en de salderingsregeling. Een gemiddelde terugverdientijd van 5-10 jaar is realistisch.' },
      { question: 'Waarom is een onderbouwd advies belangrijk voor mijn klant?', answer: 'Een onderbouwd advies zorgt ervoor dat uw klant de juiste keuze maakt en niet voor verrassingen komt te staan. Het advies moet zijn gebaseerd op de specifieke situatie van de klant en rekening houden met factoren als het verbruik, de opbrengst van de zonnepanelen en de financieringsmogelijkheden.' },
    ],
  },
  {
    slug: 'zonnepanelen-warmtepomp-combinatie',
    readingTimeMinutes: 1,
    title: 'Zonnepanelen en warmtepomp: de ideale combinatie voor een optimaal verduurzamingspakket',
    description:
      'Ontdek hoe u zonnepanelen en warmtepompen combineert voor een efficiënt verduurzamingspakket. Leer over de voordelen en vereisten voor een optimale combinatie.',
    date: '2026-07-15',
    excerpt:
      'Een combinatie van zonnepanelen en warmtepompen biedt een efficiënte en duurzame oplossing voor uw energiebehoeften. Ontdek hoe u deze combinatie kunt gebruiken om uw energierekening te verlagen en uw ecologische voetafdruk te reduceren.',
    tags: ['Zonnepanelen', 'Warmtepompen', 'Verduurzamingspakket', 'Installatiebranche'],
    keyPoints: [
      'Zonnepanelen en warmtepompen kunnen worden gecombineerd voor een efficiënt verduurzamingspakket',
      'De combinatie biedt een hogere energie-efficiëntie en een lagere energierekening',
      'Het is belangrijk om de juiste grootte en type warmtepomp te kiezen voor uw zonnepanelen-installatie',
      'Een professioneel ontwerp en installatie zijn essentieel voor een optimale combinatie',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Wat zijn de voordelen van het combineren van zonnepanelen en warmtepompen?', answer: 'De combinatie van zonnepanelen en warmtepompen biedt een hogere energie-efficiëntie, een lagere energierekening en een verminderde ecologische voetafdruk.' },
      { question: 'Hoe kies ik de juiste warmtepomp voor mijn zonnepanelen-installatie?', answer: 'Het is belangrijk om de juiste grootte en type warmtepomp te kiezen op basis van uw specifieke energiebehoeften en de omvang van uw zonnepanelen-installatie.' },
      { question: 'Is een professioneel ontwerp en installatie noodzakelijk voor een optimale combinatie?', answer: 'Ja, een professioneel ontwerp en installatie zijn essentieel om ervoor te zorgen dat de combinatie van zonnepanelen en warmtepompen optimaal functioneert en uw energierekening verlaagt.' },
      { question: 'Kan ik de combinatie van zonnepanelen en warmtepompen ook gebruiken voor mijn bedrijf?', answer: 'Ja, de combinatie van zonnepanelen en warmtepompen kan ook voor bedrijven worden gebruikt om de energierekening te verlagen en de ecologische voetafdruk te reduceren.' },
      { question: 'Wat is de terugverdientijd van de combinatie van zonnepanelen en warmtepompen?', answer: 'De terugverdientijd van de combinatie van zonnepanelen en warmtepompen kan variëren afhankelijk van verschillende factoren, zoals de grootte van de installatie, de energieprijs en de subsidiemogelijkheden.' },
    ],
  },
  {
    slug: 'isde-subsidie-aanvragen',
    readingTimeMinutes: 1,
    title: 'ISDE-subsidie aanvragen voor warmtepompen: een stap-voor-stap gids voor installateurs',
    description:
      'Lees hoe installateurs hun klanten kunnen helpen bij het aanvragen van de ISDE-subsidie voor warmtepompen met een stap-voor-stap gids',
    date: '2026-07-15',
    excerpt:
      'De ISDE-subsidie kan een aanzienlijke Premiëring betekenen voor klanten die een warmtepomp aanschaffen. Hier is een stap-voor-stap gids voor installateurs om hun klanten te helpen bij het aanvragen van de subsidie',
    tags: ['ISDE-subsidie', 'Warmtepompen', 'Installateurs', 'Subsidie aanvragen'],
    keyPoints: [
      'Hoe de ISDE-subsidie werkt',
      'Welke eisen uw klant moet voldoen',
      'Hoe u de subsidieaanvraag voorbereidt',
      'Wat de deadline is voor de aanvraag',
    ],
    category: 'Subsidies',
    faq: [
      { question: 'Wat is de ISDE-subsidie en hoe werkt het?', answer: 'De ISDE-subsidie is een financieringsregeling van de RVO voor woningeigenaren die een warmtepomp aanschaffen. De subsidie bedraagt eenmalig €1.025 en €225 per kW vermogen, met een minimumbedrag van €500' },
      { question: 'Welke eisen moet mijn klant voldoen om in aanmerking te komen voor de ISDE-subsidie?', answer: 'Uw klant moet een warmtepomp aanschaffen die op de actuele meldcodelijst van de RVO staat en voldoen aan de technische eisen die de RVO stelt' },
      { question: 'Hoe bereid ik de subsidieaanvraag voor en wat zijn de benodigde documenten?', answer: 'U moet een offerte opstellen met daarin de meldcode van de warmtepomp, de capaciteit, het vermogen en de totale investering. U moet ook een kopie van de factuur en de betalingsbewijs toevoegen' },
      { question: 'Wat is de deadline voor de ISDE-subsidieaanvraag?', answer: 'De deadline voor de aanvraag is 31 december 2030. Echter, het is raadzaam om de aanvraag zo snel mogelijk in te dienen, aangezien de subsidie beschikbaar is tot het subsidieplafond is bereikt' },
      { question: 'Kan ik als installateur de ISDE-subsidieaanvraag voor mijn klant indienen?', answer: 'Nee, de ISDE-subsidieaanvraag moet door de woningeigenaar zelf worden ingediend. U kunt als installateur wel uw klant hierbij assisteren en adviseren' },
    ],
  },
];
