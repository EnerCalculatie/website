export interface BlogPostMeta {
  slug: string;
  /** Volledige, beschrijvende titel. Gerenderd als H1 en in de kaarten/RSS —
   *  mag lang zijn. Voor de <title>-tag gebruikt BlogPostLayout `seoTitle`. */
  title: string;
  /** Titel voor de <title>-tag: max 60 tekens, zoekwoord vooraan, zonder
   *  merksuffix (dat past er niet meer bij binnen de limiet). Leeg = valt terug
   *  op `title`, wat bij een lange titel afkapt in de zoekresultaten. */
  seoTitle?: string;
  /** Meta description: max 155 tekens, anders kapt Google hem af. */
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
    seoTitle: 'Salderingsregeling 2027: wat verandert er voor uw klant?',
    image: '/og-verduurzaming.jpg',
  description:
      'De salderingsregeling wordt per 1 januari 2027 in één keer afgeschaft. Lees wat dit betekent voor uw terugverdientijd-berekening en adviesgesprek.',
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
    seoTitle: '0% btw op zonnepanelen: wanneer geldt het nultarief?',
    image: '/og-zonnepanelen.jpg',
  description:
      'Sinds 1 januari 2023 geldt 0% btw op zonnepanelen op woningen. Lees wanneer het nultarief geldt, wat erbuiten valt en hoe u dit in de offerte verwerkt.',
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
    seoTitle: 'Terugleverkosten doorrekenen: wat doet een thuisbatterij?',
    image: '/og-thuisbatterij.jpg',
  description:
      'Energieleveranciers rekenen terugleverkosten door. Lees hoe die worden berekend, wat de ACM hierover vaststelde, en hoe een thuisbatterij ze verlaagt.',
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
    seoTitle: 'ISDE-subsidie warmtepomp: wat de RVO moet zien',
    image: '/og-warmtepomp.jpg',
  description:
      'De RVO beoordeelt ISDE-aanvragen op technische onderbouwing en meldcodes. Lees wat uw adviesrapport moet bevatten en waar de grens ligt.',
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
    seoTitle: 'Warmtepomp-rendement: de standaardaannames op een rij',
    image: '/og-warmtepomp.jpg',
  description:
      'Een warmtepomp-besparing rust op drie vaste aannames: gasverbruik, ketelrendement en warmwater. Lees welke dat zijn en wat een hybride systeem verandert.',
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
    seoTitle: 'Van Excel naar geautomatiseerd verduurzamingsadvies',
    image: '/og-verduurzaming.jpg',
  description:
      'Een eigen Excel-rekenmodel werkt — tot een tarief wijzigt of een collega het overneemt. Lees wat een geautomatiseerd adviestraject verandert.',
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
    seoTitle: 'Laadpaal-advies: welke configuratie past bij uw klant?',
    image: '/og-laadpalen.jpg',
  description:
      'Laadvermogen, load balancing en de groepenkast bepalen welke laadpaal past. Lees hoe u dit technisch onderbouwt én uitlegt aan uw klant.',
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
    seoTitle: 'Airco of warmtepomp: wanneer kiest u wat?',
    image: '/og-airco.jpg',
  description:
      'Airco, hybride of volledig elektrische warmtepomp? Lees hoe de bouwkundige situatie en de SCOP-norm bepalen welke keuze u onderbouwt.',
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
    seoTitle: 'Verduurzamingsmarkt 2026: trends voor installateurs',
    image: '/og-verduurzaming.jpg',
  description:
      'ISDE-bedragen, groei van thuisbatterijen, netcongestie-prioritering en het einde van de saldering. Lees wat 2026 verandert aan uw adviesgesprek.',
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
    seoTitle: 'Thuisbatterij dimensioneren: de juiste capaciteit',
    image: '/og-thuisbatterij.jpg',
  description:
      'De juiste capaciteit hangt af van zelfconsumptie, productie en het doel van uw klant. Lees welke vuistregels gelden en wat kWh van kW onderscheidt.',
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
    seoTitle: 'Dakoriëntatie zonnepanelen: hoeveel opbrengst verliest u?',
    image: '/og-zonnepanelen.jpg',
  description:
      'Een zuidgericht dak met 35° helling levert het meeste op, maar de meeste daken wijken af. Lees hoeveel opbrengst oost, west of noord kost.',
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
    seoTitle: 'Netcongestie 2026: wachtlijst voor kleinverbruikers',
    image: '/og-verduurzaming.jpg',
  description:
      'Vanaf 1 juli 2026 komen ook kleinverbruikers op de netcongestie-wachtlijst. Lees wat dit betekent voor uw zakelijke aansluitadvies.',
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
    seoTitle: 'Thuisbatterij: verzekeringseisen en energielabel 2026',
    image: '/og-thuisbatterij.jpg',
  description:
      'Verzekeraars stellen strengere eisen, en per 29 mei 2026 telt een thuisbatterij mee voor het energielabel. Lees welke eisen er gelden.',
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
    seoTitle: 'Energie-investeringsaftrek (EIA) 2026 voor uw klant',
    image: '/og-verduurzaming.jpg',
  description:
      'Bij zakelijke klanten telt niet de ISDE maar de EIA: 40% extra aftrekbaar in 2026. Lees wat de Energielijst eist en hoe u dit onderbouwt.',
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
    seoTitle: 'Bidirectioneel laden: V2G en V2H in uw laadpaal-advies',
    image: '/og-laadpalen.jpg',
  description:
      'Renault is de eerste fabrikant met een opschaalbare V2G-dienst in Nederland. Lees het verschil tussen V2H en V2G, en welke regelingen gelden.',
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
    seoTitle: 'Energiemanagementsysteem en P1-poort: slim aansturen',
    image: '/og-verduurzaming.jpg',
  description:
      'Een EMS leest via de P1-poort het actuele vermogen en stemt batterij, laadpaal en warmtepomp op elkaar af. Lees wat dit betekent voor uw ontwerp.',
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
    seoTitle: 'Energielabel C-plicht 2030 voor particuliere verhuur',
    image: '/og-verduurzaming.jpg',
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
    seoTitle: 'Netontwikkelingsbijdrage zonnepanelen doorrekenen',
    image: '/og-zonnepanelen.jpg',
  description:
      'Lees hoe u de netontwikkelingsbijdrage verwerkt in uw zonnepaneeladvies: transparant doorrekenen en de impact op de terugverdientijd bepalen.',
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
    seoTitle: 'Rendementsverlies zonnepanelen: schaduw en vervuiling',
    image: '/og-zonnepanelen.jpg',
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
    seoTitle: 'Verduurzamingspakket samenstellen met beperkt budget',
    image: '/og-verduurzaming.jpg',
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
    seoTitle: 'Verduurzaming: kosten-batenanalyse voor uw klant',
    image: '/og-verduurzaming.jpg',
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
    slug: 'thuisbatterij-netaansluiting-capaciteit',
    readingTimeMinutes: 1,
    title: 'Thuisbatterij en netaansluiting: wanneer vereist het batterijbeheer aanpassingen aan uw offerte?',
    seoTitle: 'Thuisbatterij en netaansluiting: wat uw offerte raakt',
    image: '/og-thuisbatterij.jpg',
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
    slug: 'laadpalen-voor-elektrische-autos',
    readingTimeMinutes: 2,
    title: 'Laadpalen voor elektrische auto\'s: een vergelijking van typen en merken',
    seoTitle: 'Laadpalen elektrische auto\'s vergelijking',
    image: '/og-laadpalen.jpg',
    description:
      'Laadpalen voor elektrische auto\'s: ontdek de verschillen tussen typen en merken en kies de juiste laadpaal voor uw klant',
    date: '2026-07-15',
    excerpt:
      'Een overzicht van de verschillende typen laadpalen voor elektrische auto\'s en hoe u de juiste kiest voor uw klant',
    tags: ['Laadpalen', 'Elektrische auto\'s', 'Installatiebranche'],
    keyPoints: [
      'Laadpalen voor elektrische auto\'s: een overzicht van de verschillende typen',
      'Hoe kiest u de juiste laadpaal voor uw klant',
      'Laadpalen en netcongestie: hoe voorkomt u overbelasting',
      'Load balancing: de oplossing voor een betrouwbare installatie',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Wat zijn de verschillen tussen een 1-fase en 3-fase laadpaal?', answer: 'Een 1-fase laadpaal levert doorgaans enkele kW\'s aan laadvermogen, terwijl een 3-fase laadpaal een aanzienlijk hoger vermogen kan leveren.' },
      { question: 'Hoe belangrijk is load balancing bij de installatie van een laadpaal?', answer: 'Load balancing is cruciaal om overbelasting van de installatie te voorkomen en een betrouwbare laadpaal te garanderen.' },
      { question: 'Kan ik een laadpaal installeren zonder load balancing?', answer: 'Het is mogelijk om een laadpaal te installeren zonder load balancing, maar dit kan leiden tot overbelasting en onbetrouwbare werking.' },
      { question: 'Hoe kies ik de juiste laadpaal voor mijn klant?', answer: 'U kiest de juiste laadpaal door te kijken naar het laadvermogen van de auto, de capaciteit van de aansluiting en de beschikbare ruimte in de woning.' },
      { question: 'Wat is de rol van de netbeheerder bij de installatie van een laadpaal?', answer: 'De netbeheerder is verantwoordelijk voor de capaciteit van de aansluiting en kan in sommige gevallen een capaciteitsuitbreiding vereisen.' },
    ],
  },
  {
    slug: 'hybride-warmtepomp-business-case',
    readingTimeMinutes: 1,
    title: 'Hoe onderbouwt u de business case voor een hybride warmtepomp bij een bestaande gasketel',
    seoTitle: 'hybride warmtepomp business case',
    image: '/og-warmtepomp.jpg',
  description:
      'Ontdek hoe u de business case voor een hybride warmtepomp onderbouwt bij een bestaande gasketel',
    date: '2026-07-15',
    excerpt:
      'Een hybride warmtepomp is een aantrekkelijk alternatief voor bestaande gasketels. Lees hier hoe u de business case onderbouwt',
    tags: ['Warmtepompen', 'Hybride warmtepompen', 'Gasketels', 'Installatiebranche'],
    keyPoints: [
      'Een hybride warmtepomp is een combinatie van een gasketel en een warmtepomp',
      'Deze combinatie kan meer dan 40% aan energie besparen',
      'Een hybride warmtepomp is een duurzame en kostenefficiënte oplossing',
      'De ISDE-subsidie kan de aanschaf van een hybride warmtepomp ondersteunen',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Wat is een hybride warmtepomp?', answer: 'Een hybride warmtepomp is een combinatie van een gasketel en een warmtepomp, die samenwerken om de warmtevraag van een woning te dekken.' },
      { question: 'Hoeveel energie kan een hybride warmtepomp besparen?', answer: 'Een hybride warmtepomp kan meer dan 40% aan energie besparen ten opzichte van een traditionele gasketel.' },
      { question: 'Kan ik een hybride warmtepomp combineren met zonnepanelen?', answer: 'Ja, een hybride warmtepomp kan prima worden gecombineerd met zonnepanelen, om nog meer energie te besparen en de CO2-uitstoot te verlagen.' },
      { question: 'Hoe kan ik de business case voor een hybride warmtepomp onderbouwen?', answer: 'U kunt de business case voor een hybride warmtepomp onderbouwen door de energiekosten te berekenen, de ISDE-subsidie te berekenen en de interviews met tevreden klanten te delen.' },
      { question: 'Wat zijn de voordelen van een hybride warmtepomp ten opzichte van een traditionele gasketel?', answer: 'Een hybride warmtepomp is een duurzame en kostenefficiënte oplossing, die minder fossiele brandstoffen verbruikt en minder CO2-uitstoot produceert.' },
    ],
  },
  {
    slug: 'stroomstoring-zonnepanelen-thuisbatterij',
    readingTimeMinutes: 4,
    title: 'Stroomstoring en zonnepanelen: hoe een thuisbatterij uw klant helpt',
    seoTitle: 'Stroomstoring overbruggen met zonnepanelen en thuisbatterij',
    image: '/og-thuisbatterij.jpg',
  description:
      'Wat gebeurt er met zonnepanelen tijdens een stroomstoring? Ontdek hoe u met een thuisbatterij en back-upfunctie uw klant voorziet van noodstroom.',
    date: '2026-07-15',
    excerpt:
      'Een standaard PV-systeem valt uit tijdens een stroomstoring. Ontdek hoe u met een thuisbatterij, EPS of ATS uw klanten toch van stroom voorziet.',
    tags: ['Thuisbatterijen', 'Zonnepanelen', 'Installatietechniek', 'Netbeheer'],
    keyPoints: [
      'Een standaard PV-systeem schakelt uit bij netuitval vanwege verplichte anti-islanding.',
      'Met een EPS-aansluiting levert u gerichte noodstroom op specifieke stopcontacten of een enkele groep.',
      'Volledig eilandbedrijf voor de hele woning vereist een externe ATS om het pand fysiek af te schakelen van het net.',
      'Voorzie de back-up van een correct TT-stelsel en aardpen om de veiligheid te waarborgen zonder net-aarding.',
      'Manage de klantverwachting: een batterij kan tijdens een winterse stroomuitval deels leeg zijn en heeft gelimiteerd piekvermogen.',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Blijven zonnepanelen standaard werken tijdens een stroomstoring?', answer: 'Nee. Zonder specifieke back-upvoorzieningen of een eilandmodus schakelt de omvormer direct uit wanneer het net wegvalt. Dit is een verplichte veiligheidsmaatregel (anti-islanding).' },
      { question: 'Wat is het verschil tussen een EPS-uitgang en een ATS-systeem?', answer: 'Een EPS (Emergency Power Supply) is een uitgang op de omvormer die stroom levert aan één of meerdere specifieke groepen of stopcontacten. Een ATS (Automatic Transfer Switch) plaatst u direct achter de hoofdschakelaar en scheidt de hele woning fysiek van het elektriciteitsnet, waarna de hele groepenkast (binnen de vermogenslimieten) van stroom wordt voorzien.' },
      { question: 'Kan de klant een warmtepomp laten draaien op de noodstroomvoorziening?', answer: 'In theorie is dit mogelijk, maar in de praktijk vraagt een warmtepomp vaak een (aanloop)vermogen dat de limieten van de omvormer en batterij overschrijdt. Bovendien zal de batterij hierdoor zeer snel ontladen. Het is aan te raden zware verbruikers buiten de noodstroomcircuits te houden.' },
      { question: 'Is er een extra aardpen nodig bij het installeren van een noodstroomsysteem?', answer: 'Ja, in de meeste gevallen wel. Zodra een woning wordt losgekoppeld van het stroomnet (eilandbedrijf), kan de verbinding met de aarding van de netbeheerder vervallen. Een lokaal TT-stelsel met een adequate eigen aardpen is dan noodzakelijk om de werking van aardlekschakelaars te waarborgen.' },
    ],
  },
  {
    slug: 'energieopslag-toekomst-trends-installateurs',
    readingTimeMinutes: 7,
    title: 'Energieopslag in de toekomst: trends en kansen voor de installateur',
    seoTitle: 'Energieopslag toekomst: trends voor de installatiebranche',
    image: '/og-thuisbatterij.jpg',
  description:
      'Wat brengt de toekomst van energieopslag? Ontdek de belangrijkste trends, technologische ontwikkelingen en kansen voor Nederlandse installateurs.',
    date: '2026-07-15',
    excerpt:
      'De markt voor energieopslag ontwikkelt zich in sneltreinvaart. Ontdek hoe netcongestie, veranderende wetgeving en slimme EMS-sturing de rol van de thuisbatterij in de toekomst van de Nederlandse verduurzaming bepalen.',
    tags: ['Thuisbatterijen', 'Netcongestie', 'Subsidies & regelgeving'],
    keyPoints: [
      'De verschuiving van salderen naar maximale zelfconsumptie vanaf 2027 versterkt de noodzaak voor lokale opslag.',
      'De integratie van dynamische tarieven en slimme energiemanagementsystemen (EMS) optimaliseert de terugverdientijd.',
      'Nieuwe batterijtechnologieën zoals natrium-ion en solid-state veranderen de marktveiligheid en grondstoffenketen.',
      'Installateurs transformeren van pure productverkopers naar strategische energieadviseurs.',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Wat is de invloed van de salderingsregeling op de toekomst van energieopslag?', answer: 'Vanaf 1 januari 2027 verdwijnt de salderingsregeling volledig. Hierdoor wordt het direct opslaan of slim verbruiken van zelfopgewekte zonne-energie essentieel. Energieopslag helpt om het rendement van zonnepanelen te behouden en terugleverkosten te minimaliseren.' },
      { question: 'Welke rol spelen dynamische energietarieven bij toekomstige energieopslag?', answer: 'Toekomstige opslagsystemen laden op wanneer de stroomprijzen negatief of zeer laag zijn, en ontladen tijdens piekuren wanneer de tarieven hoog zijn. Dit slimme handelsmodel verbetert de businesscase voor de eindgebruiker aanzienlijk, onafhankelijk van directe opwek.' },
      { question: 'Waarom is een energiemanagementsysteem (EMS) belangrijk bij energieopslag in de toekomst?', answer: 'Een EMS koppelt de batterij aan zonnepanelen, warmtepompen en laadpalen. Het zorgt voor een deterministisch berekende sturing op basis van weersvoorspellingen, het actuele huishoudelijke verbruiksprofil en dynamische energieprijzen.' },
    ],
  },
  {
    slug: 'hybride-warmtepomp-dimensionering-gasketel',
    readingTimeMinutes: 6,
    title: 'Hybride warmtepomp dimensioneren: gasketel behouden of volledig elektrisch gaan?',
    seoTitle: 'Hybride warmtepomp dimensionering: gids voor installateurs',
    image: '/og-warmtepomp.jpg',
    description:
      'Hoe pakt u hybride warmtepomp dimensionering aan? Ontdek de afweging tussen een bivalente opstelling en all-electric voor uw klanten.',
    date: '2026-07-15',
    excerpt:
      'Voor welke klanten is een hybride warmtepomp de beste keuze, en wanneer adviseert u all-electric? Een diepgaande gids over bivalente dimensionering, warmteverlies en netbelasting.',
    tags: ['Warmtepompen', 'Installatietechniek', 'Rendement'],
    keyPoints: [
      'De basis van hybride warmtepomp dimensionering is een nauwkeurige transmissieberekening en het bepalen van het bivalente punt.',
      'De afweging tussen bivalent (hybride) en monovalent (all-electric) hangt direct samen met de isolatiegraad en het afgiftesysteem.',
      'Netbeheer Nederland adviseert kritisch te kijken naar gelijktijdigheid om overbelasting van het elektriciteitsnet te voorkomen.',
      'ISDE-subsidieonderbouwing via de RVO vereist kloppende technische specificaties en goedgekeurde meldcodes.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Wat is het bivalente punt bij hybride warmtepomp dimensionering?', answer: 'Het bivalente punt is de buitentemperatuur waarbij de warmtepomp het warmteverlies van de woning niet meer volledig zelfstandig kan dekken. Beneden deze temperatuur moet de gasketel of een elektrisch element bijspringen om de woning comfortabel warm te houden.' },
      { question: 'Wanneer is een all-electric warmtepomp beter dan een hybride opstelling?', answer: 'Een all-electric (monovalente) warmtepomp is de beste keuze als de woning zeer goed geïsoleerd is (minimaal label B, maar bij voorkeur label A of hoger), beschikt over een afgiftesysteem op lage temperatuur en de netaansluiting voldoende capaciteit heeft.' },
      { question: 'Hoe beïnvloedt de stooklijn de dimensionering van de warmtepomp?', answer: 'De stooklijn bepaalt bij welke watertemperatuur het afgiftesysteem de woning verwarmt op basis van de buitentemperatuur. Hoe lager de stooklijn kan worden ingesteld, hoe efficiënter de warmtepomp werkt (hogere SCOP), wat directe invloed heeft op het benodigde vermogen.' },
      { question: 'Waar vind ik de actuele subsidievoorwaarden voor warmtepompen?', answer: 'De meest actuele voorwaarden, startbedragen en de officiële meldcodelijst voor de ISDE-subsidie worden gepubliceerd en beheerd door de Rijksdienst voor Ondernemend Nederland (rvo.nl).' },
    ],
  },
  {
    slug: 'seizoensvariabiliteit-zonnepanelen-rendement',
    readingTimeMinutes: 7,
    title: 'De impact van seizoensvariabiliteit op zonnepanelen rendement: hoe houdt u hier rekening mee in uw advies?',
    seoTitle: 'Zonnepanelen rendement en seizoensinvloeden berekenen',
    image: '/og-zonnepanelen.jpg',
    description:
      'Hoe beïnvloedt seizoensvariabiliteit het zonnepanelen rendement? Praktische handvatten voor installateurs voor een realistisch opwekprofiel.',
    date: '2026-07-16',
    excerpt:
      'Seizoensvariabiliteit heeft een enorme impact op de opbrengst van PV-systemen. Ontdek hoe u als installateur een realistisch zonnepanelen rendement berekent en adviseert.',
    tags: ['Zonnepanelen', 'Rendement', 'Installatietechniek', 'Adviesvaardigheden'],
    keyPoints: [
      'Begrijp de verdeling van de jaarlijkse PV-opbrengst over de seizoenen in Nederland.',
      'Leer hoe de temperatuurcoëfficiënt het zonnepanelen rendement op hete zomerdagen beïnvloedt.',
      'Ontdek waarom de afbouw van de salderingsregeling dwingt tot sturen op uurprofielen.',
      'Krijg concrete handvatten om seizoenspatronen transparant te presenteren aan uw klanten.',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Hoeveel procent van de jaaropbrengst wordt in de winter opgewekt?', answer: 'In de meteorologische winter (december, januari en februari) wekken zonnepanelen in Nederland gemiddeld slechts 8 tot 10 procent van hun totale jaarlijkse opbrengst op. De resterende 90 procent wordt verdeeld over de lente, zomer en herfst, waarbij de piek in mei en juni ligt.' },
      { question: 'Waarom daalt het rendement van zonnepanelen als het erg warm is?', answer: 'Dit komt door de temperatuurcoëfficiënt van de zonnecellen. Naarmate de temperatuur van het paneel stijgt boven de standaard testconditie van 25 graden Celsius, daalt de spanning van de cellen. Dit leidt tot een vermogensverlies van gemiddeld 0,3 tot 0,4 procent per graad temperatuurstijging.' },
      { question: 'Hoe beïnvloedt de afschaffing van de salderingsregeling het advies over seizoensvariabiliteit?', answer: 'Zolang de salderingsregeling actief is, mag winterverbruik worden weggestreept tegen zomeropwekking. Na de afschaffing vervalt dit voordeel. Het zonnepanelen rendement wordt dan sterk afhankelijk van directe zelfconsumptie en slimme opslag, omdat overtollige zomerstroom tegen lage tarieven wordt teruggeleverd.' },
    ],
  },
  {
    slug: 'pdf-documentherkenning-offerteproces-installateurs',
    readingTimeMinutes: 5,
    title: 'Offerte software voor installatietechniek: sneller via pdf-import',
    seoTitle: 'Offerte software installatietechniek: pdf-herkenning',
    description:
      'Ontdek hoe slimme offerte software voor de installatietechniek met pdf-documentherkenning uw energieprofielen en adviesrapporten automatiseert.',
    date: '2026-07-17',
    excerpt:
      'Handmatig energienota\'s overtypen in uw rekentool kost tijd en is foutgevoelig. Ontdek hoe pdf-documentherkenning uw offerteproces voorgoed versnelt en professionaliseert.',
    tags: ['Bedrijfsvoering', 'Software', 'Zonnepanelen', 'Thuisbatterijen'],
    keyPoints: [
      'Bespaar kostbare tijd door handmatige data-invoer volledig over te slaan.',
      'Drastische verlaging van de foutmarge bij het invoeren van historische verbruiksdata.',
      'Zorgvuldige naleving van de privacywetgeving (AVG) bij het verwerken van klantinformatie.',
      'Versnel de doorlooptijd van uw offertes en verhoog de conversie in het adviesgesprek.',
    ],
    category: 'Subsidies',
    faq: [
      { question: 'Wat is pdf-documentherkenning in de installatietechniek?', answer: 'Dit is de geautomatiseerde extractie van gestructureerde verbruiksgegevens uit digitale energienota\'s en jaarrekeningen door middel van algoritmen, waardoor handmatige invoer door een adviseur overbodig wordt.' },
      { question: 'Is het uploaden van energienota\'s AVG-proof?', answer: 'Ja, mits de software voldoet aan de richtlijnen van de Autoriteit Persoonsgegevens. Dit betekent dat persoonsgegevens veilig worden verwerkt, versleuteld worden verzonden en niet langer dan noodzakelijk worden bewaard.' },
      { question: 'Welke bestanden kunnen door deze software worden uitgelezen?', answer: 'De software herkent gestructureerde pdf-bestanden van de bekende Nederlandse energieleveranciers en netbeheerders, inclusief de gedetailleerde verbruikstabellen en tariefspecificaties.' },
    ],
  },
];
