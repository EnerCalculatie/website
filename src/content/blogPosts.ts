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
   *  afgerond, minimaal 1). Wordt automatisch berekend door de content-engine-
   *  pipeline (scripts/content-engine/) bij nieuwe artikelen; voor bestaande
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
    category: 'Zonnepanelen',
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
    category: 'Zonnepanelen',
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
    category: 'Thuisbatterijen',
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
    category: 'Warmtepompen',
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
    category: 'Warmtepompen',
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
    category: 'Bedrijfsvoering',
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
    category: 'Laadpalen',
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
    category: 'Warmtepompen',
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
    category: 'Kennisbank',
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
    category: 'Thuisbatterijen',
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
    category: 'Zonnepanelen',
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
    category: 'Thuisbatterijen',
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
    category: 'Thuisbatterijen',
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
    category: 'Subsidies',
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
    category: 'Laadpalen',
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
    category: 'Kennisbank',
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
    category: 'Kennisbank',
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
    category: 'Zonnepanelen',
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
  {
    slug: 'btw-op-thuisbatterij',
    readingTimeMinutes: 7,
    title: 'Btw op thuisbatterijen: hoe adviseert u uw klant over btw-teruggave?',
    seoTitle: 'Btw op thuisbatterij: fiscale regels & advies',
    description:
      'Hoe zit het met de btw op een thuisbatterij? Ontdek de fiscale voorwaarden voor btw-teruggave en hoe u uw klant als installateur adviseert.',
    date: '2026-07-17',
    excerpt:
      'De btw op een thuisbatterij terugvragen is een belangrijk verkoopargument voor installateurs. Ontdek de voorwaarden van de Belastingdienst en de KOR.',
    tags: ['Thuisbatterijen', 'Subsidies & regelgeving', 'Bedrijfsvoering installateur'],
    keyPoints: [
      'Btw-teruggave op een thuisbatterij is voor particulieren mogelijk onder specifieke voorwaarden van de Belastingdienst.',
      'De koppeling met een dynamisch energiecontract is essentieel voor het aantonen van actieve stroomhandel.',
      'De Kleineondernemersregeling (KOR) kan van invloed zijn op het recht op btw-teruggave van uw klant.',
      'Transparante advisering over het fiscale traject voorkomt onverwachte naheffingen en verhoogt uw offerteconversie.',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Is er een nultarief voor de btw op een thuisbatterij?', answer: 'Nee, in tegenstelling tot zonnepanelen geldt voor een thuisbatterij het standaard btw-tarief. Particulieren kunnen deze btw echter achteraf terugvragen via de Belastingdienst als zij aan de gestelde voorwaarden voldoen.' },
      { question: 'Kan een klant met een vast energiecontract de btw op een thuisbatterij terugvragen?', answer: 'In de regel niet. De Belastingdienst vereist actieve stroomhandel om te spreken van btw-ondernemerschap. Dit is alleen mogelijk met een dynamisch energiecontract waarbij de stroomtarieven per uur fluctueren.' },
      { question: 'Wat gebeurt er met de btw-teruggave als de klant al in de KOR zit?', answer: 'Als de klant al is aangemeld voor de Kleineondernemersregeling (KOR), is btw-teruggave op de thuisbatterij niet direct mogelijk. De klant moet de minimale looptijd van de KOR uitzitten of zich afmelden, wat fiscale gevolgen kan hebben. Adviseer uw klant altijd dit vooraf te toetsen bij de Belastingdienst.' },
    ],
  },
  {
    slug: 'scop-warmtepomp-berekenen-stroomverbruik',
    readingTimeMinutes: 8,
    title: 'SCOP-waarde van een warmtepomp: hoe vertaalt u dit naar een realistisch extra stroomverbruik?',
    seoTitle: 'SCOP warmtepomp berekenen: realistisch stroomverbruik',
    description:
      'Hoe kunt u de SCOP van een warmtepomp berekenen en vertalen naar een realistisch stroomverbruik? Handige tips en rekenvoorbeelden voor de installateur.',
    date: '2026-07-20',
    excerpt:
      'De SCOP-waarde is een belangrijke indicator voor warmtepomprendement, maar hoe vertaalt u dit naar een realistisch extra stroomverbruik voor uw klant?',
    tags: ['Warmtepompen', 'Rendement', 'Installatietechniek', 'Dimensionering'],
    keyPoints: [
      'Begrijp het fundamentele verschil tussen de momentane COP en de seizoensgebonden SCOP.',
      'Leer hoe u de warmtebehoefte van de woning nauwkeurig bepaalt als basis voor de verbruiksberekening.',
      'Houd rekening met de lagere COP voor tapwaterbereiding om onderschatting van het stroomverbruik te voorkomen.',
      'Corrigeer de theoretische SCOP-waarde op basis van het gekozen afgiftesysteem en de stooklijn.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Wat is het verschil tussen COP en SCOP?', answer: 'De COP is een momentopname van het rendement bij één specifieke buitentemperatuur en cv-watertemperatuur. De SCOP berekent het gemiddelde rendement over een volledig stookseizoen, gecorrigeerd voor het Nederlandse klimaatprofiel.' },
      { question: 'Waarom mag ik de SCOP voor ruimteverwarming niet gebruiken voor tapwater?', answer: 'Voor warm tapwater moet de warmtepomp cv-water van een veel hogere temperatuur leveren (meestal tussen de 50 en 58 graden Celsius). Dit grotere temperatuurverschil verlaagt het rendement aanzienlijk, waardoor de tapwater-COP vaak veel lager ligt dan de ruimteverwarmings-SCOP.' },
      { question: 'Hoe beïnvloedt de stooklijn het werkelijke stroomverbruik?', answer: 'Een weersafhankelijke regeling (stooklijn) verlaagt de aanvoertemperatuur wanneer het buiten milder is. Hierdoor stijgt het rendement van de warmtepomp op die dagen, wat resulteert in een gunstiger gemiddeld jaarverbruik.' },
    ],
  },
  {
    slug: 'laadpaal-netaansluiting-capaciteit-3x25a',
    readingTimeMinutes: 7,
    title: 'Laadpaal op een 3x25A netaansluiting: adviseren over capaciteit en gelijktijdigheid',
    seoTitle: 'Laadpaal netaansluiting capaciteit op 3x25A',
    description:
      'Hoe adviseert u over laadpaal netaansluiting capaciteit bij 3x25A? Alles over gelijktijdigheid, dynamische load balancing en overbelasting.',
    date: '2026-07-20',
    excerpt:
      'Een laadpaal installeren op een standaard 3x25A netaansluiting vraagt om een slimme aanpak. Ontdek hoe u adviseert over gelijktijdigheid, overbelasting en load balancing.',
    tags: ['Laadpalen', 'Installatietechniek', 'Netcapaciteit'],
    keyPoints: [
      'De standaard residentiële 3x25A netaansluiting raakt snel overbelast bij de combinatie van een laadpaal, warmtepomp en andere zware verbruikers.',
      'Bij een laadpaal is de gelijktijdigheidsfactor volgens de NEN 1010 gelijk aan 1, wat een aanzienlijke impact heeft op de resterende capaciteit.',
      'Dynamische load balancing via de P1-poort is essentieel om de selectiviteit te waarborgen en uitschakeling van de hoofdbeveiliging te voorkomen.',
      'Een integraal energieprofiel waarin opwek, opslag en verbruik samenkomen, vormt de basis voor een risicovrij en betrouwbaar installatieadvies.',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Kan een 11 kW laadpaal altijd op een standaard 3x25A netaansluiting?', answer: 'In theorie levert een 3x25A aansluiting maximaal 17,25 kW, wat voldoende is voor een 11 kW laadpaal (die 3x16A ofwel 11,04 kW vraagt). In de praktijk is het risico op overbelasting echter zeer groot zodra andere zware verbruikers, zoals een warmtepomp of inductiekookplaat, tegelijkertijd inschakelen. Dynamische load balancing is daarom in vrijwel alle gevallen noodzakelijk.' },
      { question: 'Wat schrijft de NEN 1010 voor over de gelijktijdigheid van laadpalen?', answer: 'De NEN 1010 schrijft voor dat voor laadpunten voor elektrische voertuigen een gelijktijdigheidsfactor van 1 (100%) moet worden gehanteerd. Dit komt omdat een laadpaal gedurende langere tijd onafgebroken het maximale vermogen kan afnemen, in tegenstelling tot huishoudelijke apparaten die cyclisch werken.' },
      { question: 'Wanneer is een netverzwaring naar 3x35A aan te raden voor een laadpaal?', answer: 'Een netverzwaring is aan te raden wanneer de structurele basislast van de woning (bijvoorbeeld door een grote all-electric warmtepomp, een elektrische kookplaat en een aircosysteem) zo hoog is dat er zelfs met load balancing onvoldoende vermogen overblijft om de auto op een acceptabele snelheid op te laden. Houd hierbij rekening met de hogere jaarlijkse vastrechtkosten van de netbeheerder.' },
    ],
  },
  {
    slug: 'airco-als-verwarming-berekenen',
    readingTimeMinutes: 7,
    title: 'Airco als verwarming: hoe berekent u de gasbesparing en het extra stroomverbruik voor uw klant?',
    seoTitle: 'Airco als verwarming berekenen: stappenplan',
    description:
      'Hoe kunt u de gasbesparing en het extra stroomverbruik van een airco als verwarming berekenen? Leer de exacte formules en ISSO-normen voor uw advies.',
    date: '2026-07-21',
    excerpt:
      'Wilt u voor uw klant de overstap van gas naar een airco als verwarming doorrekenen? Ontdek de exacte ISSO-formules om de gasbesparing en het extra stroomverbruik betrouwbaar te bepalen.',
    tags: ['Airco', 'Rendement', 'Installatietechniek', 'Warmtepompen'],
    keyPoints: [
      'Een m³ Gronings aardgas levert volgens ISSO-normen netto circa 8,8 kWh thermische warmte via een HR-ketel.',
      'De SCOP-waarde is leidend voor het berekenen van het seizoensgebonden elektriciteitsverbruik van de airco.',
      'Airco\'s verwarmen decentraal; de invloed op het tapwaterverbruik moet altijd apart worden gecalculeerd.',
      'De verhouding tussen gasreductie en stroomtoename hangt direct samen met de isolatieklasse en het stookgedrag.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Hoeveel stroom verbruikt een airco gemiddeld bij het verwarmen van een ruimte?', answer: 'Het stroomverbruik hangt direct af van de thermische warmtevraag van de ruimte en de SCOP van het systeem. Bij een gemiddelde jaarlijkse warmtebehoefte van 2200 kWh en een SCOP van 4,0 verbruikt de airco op jaarbasis circa 550 kWh aan elektriciteit.' },
      { question: 'Kan een airco de cv-ketel volledig vervangen voor de hele woning?', answer: 'Technisch kan een multi-splitsysteem met voldoende vermogen een woning volledig verwarmen, mits de transmissieberekening klopt. Er is dan wel een aparte elektrische oplossing nodig voor warm tapwater, zoals een warmtepompboiler, omdat een airco (lucht-lucht warmtepomp) geen sanitair water kan verwarmen.' },
      { question: 'Waarom daalt de COP-waarde van een airco als het buiten erg koud is?', answer: 'Bij lage buitentemperaturen is het temperatuurverschil tussen de buitenlucht en de gewenste binnentemperatuur groter, waardoor de compressor harder moet werken. Bovendien activeert het systeem periodiek een ontdooicyclus om ijsvorming op de buitenunit te smelten, wat extra energie kost.' },
    ],
  },
  {
    slug: 'conversie-verhogen-offertes-installatiebedrijf',
    readingTimeMinutes: 6,
    title: 'Conversie verhogen van offertes voor uw installatiebedrijf: de kracht van een digitaal adviesrapport',
    seoTitle: 'Conversie verhogen offertes installatiebedrijf: advies',
    description:
      'Conversie verhogen van offertes voor uw installatiebedrijf? Ontdek hoe een transparant digitaal adviesrapport het vertrouwen van uw klant vergroot.',
    date: '2026-07-22',
    excerpt:
      'Verhoog de conversie van uw installatie-offertes door kille prijsopgaves te vervangen door transparante, geautomatiseerde digitale adviesrapporten.',
    tags: ['Bedrijfsvoering', 'Offerteproces', 'Adviesrapport'],
    keyPoints: [
      'Vervang kille prijsopgaven door transparante digitale adviesrapporten die vertrouwen bouwen',
      'Ondervang twijfels over de salderingsregeling 2027 en terugleverkosten met heldere scenario\'s',
      'Combineer opwek, opslag en verbruik in één geautomatiseerd energieprofiel zonder dubbeltellingen',
      'Verklein de uitval in uw verkoop-pipeline en voorkom dat u in een zuiver prijsgevecht belandt',
    ],
    category: 'Bedrijfsvoering',
    faq: [
      { question: 'Waarom converseren traditionele PDF-offertes minder goed in de huidige markt?', answer: 'Traditionele offertes tonen vaak alleen materiaallijsten en een eindbedrag. In de huidige markt met veranderende regelgeving rondom de salderingsregeling, terugleverkosten en netcongestie roept een kale prijsopgave twijfel op bij de klant. Een adviesrapport legt juist uit wáárom een specifieke oplossing gekozen is.' },
      { question: 'Hoe helpt een digitaal adviesrapport bij vragen over de salderingsregeling per 2027?', answer: 'Door in het advies rapport doorgerekende scenario\'s te tonen voor zowel de periode tot 2027 als de jaren daarna, ziet de klant exact wat de impact is op het rendement en de zelfconsumptie. Dit neemt de angst voor veranderende wetgeving weg.' },
      { question: 'Hoe voorkomt u dubbele tellingen bij combinatie-offertes van warmtepomp, batterij en zonnepanelen?', answer: 'Door gebruik te maken van één geautomatiseerd en integraal rekenmodel worden de stroomopwekking van zonnepanelen, het extra verbruik van de warmtepomp en de opslag van de thuisbatterij op elkaar afgestemd in één doorlopend energieprofiel.' },
      { question: 'Kost het opstellen van een uitgebreid digitaal adviesrapport niet veel extra tijd?', answer: 'Nee, mits u gebruikmaakt van gespecialiseerde advies- en rekensoftware. Door slimme gegevensinvoer, zoals pdf-documentherkenning van energienota\'s en geautomatiseerde rekenmodellen, genereert u een compleet rapport binnen enkele minuten.' },
    ],
  },
  {
    slug: 'micro-omvormer-vs-centrale-omvormer-advies',
    readingTimeMinutes: 7,
    title: 'Micro-omvormer vs centrale omvormer met optimizers: onderbouw uw keuze in de offerte',
    seoTitle: 'Micro omvormer vs centrale omvormer advies: gids',
    description:
      'Hoe kiest u tussen micro-omvormers en een centrale omvormer met optimizers? Lees de technische criteria, NEN 1010 eisen en offerte-onderbouwing.',
    date: '2026-07-23',
    excerpt:
      'Ontdek hoe u als installateur de keuze tussen micro-omvormers en een centrale omvormer met optimizers technisch onderbouwt met NEN 1010-normen, schaduwanalyse en rendementsberekeningen.',
    tags: ['Zonnepanelen', 'Omvormers', 'Installatietechniek', 'NEN 1010'],
    keyPoints: [
      'Verschil in DC-spanning op het dak en de impact op de brandveiligheid volgens NEN 1010.',
      'Impact van schaduwwerking, complexe dakvlakken en uitbreidbaarheid op het systeemrendement.',
      'Onderhoudbaarheid, thermische belasting en uitvalrisico\'s per systeemarchitectuur.',
      'Onderbouwing in de offerte op basis van objectieve meetgegevens en de NEN 1010-normering.',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Wanneer kiest u voor micro-omvormers boven een centrale omvormer met optimizers?', answer: 'Micro-omvormers zijn de aangewezen keuze bij complexe daken met meerdere oriëntaties, harde schaduwelementen, kleine systeemgroottes, of situaties waarin hoge gelijkspanning (DC) op het dak en in het pand om veiligheidsredenen ongewenst is.' },
      { question: 'Hoe verhouden beide systemen zich tot de veiligheidseisen van NEN 1010?', answer: 'Bij micro-omvormers wordt de gelijkstroom direct achter het zonnepaneel omgezet naar 230V wisselstroom (AC), waardoor er geen hoge DC-stringspanningen ontstaan. Bij centrale omvormers met optimizers blijft de DC-stringspanning op het dak tijdens werking hoog, al beschikken moderne optimizers over actieve spanningsreductie bij uitschakeling.' },
      { question: 'Is een installatie met micro-omvormers eenvoudiger modulair uit te breiden?', answer: 'Ja. Omdat elk paneel een afzonderlijke omvormer heeft die op de AC-buskabel wordt aangesloten, is een uitbreiding niet gebonden aan de maximale ingangsspanning of MPP-trackers van een centrale omvormer.' },
      { question: 'Welke invloed heeft de omgevingstemperatuur op de levensduur van de omvormers?', answer: 'Micro-omvormers en optimizers hangen direct onder de zonnepanelen en worden blootgesteld aan thermische schommelingen. Centrale omvormers hangen binnen op een koelere plek. Een goede montage met voldoende ventilatieruimte achter de zonnepanelen is bij dakgekoppelde elektronica essentieel om de levensduur te borgen.' },
    ],
  },
  {
    slug: 'geautomatiseerd-verduurzamingsrapport-software',
    readingTimeMinutes: 5,
    title: 'Geautomatiseerd verduurzamingsrapport software: zo verkort u uw doorlooptijd',
    seoTitle: 'Geautomatiseerd verduurzamingsrapport software kiezen',
    description:
      'Met geautomatiseerd verduurzamingsrapport software verkort u de doorlooptijd van uw adviestrajecten en verhoogt u de conversie op uw installatieoffertes.',
    date: '2026-07-23',
    excerpt:
      'Ontdek hoe geautomatiseerd verduurzamingsrapport software de doorlooptijd van uw adviestraject verkort, fouten voorkomt en de conversie van uw offertes verhoogt.',
    tags: ['Software', 'Verduurzamingsrapport', 'Adviesproces', 'Installatietechniek'],
    keyPoints: [
      'Handmatige gegevensinvoer en complexe spreadsheets vertragen het adviestraject van installateurs aanzienlijk.',
      'Geautomatiseerde software bundelt opwek, opslag, warmte en laadpaaladvies in één integraal rapport.',
      'Gestandaardiseerde rekenmodellen borgen de aansluiting op actuele regelgeving en RVO-subsidie-eisen.',
      'Kortere doorlooptijden tussen de aanvraag en het rapport verhogen de conversie en klanttevredenheid.',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Wat is het grootste voordeel van geautomatiseerd verduurzamingsrapport software voor installateurs?', answer: 'Het grootste voordeel is de forse tijdsbesparing per klantdossier. In plaats van uren handmatig rekenen in spreadsheets genereert de software binnen enkele minuten een integraal adviesrapport waarin zonnepanelen, batterijen, warmtepompen en laadpalen samenhangend worden doorgerekend.' },
      { question: 'Hoe voorkomt software fouten bij het combineren van meerdere verduurzamingsmaatregelen?', answer: 'Geautomatiseerde software maakt gebruik van één centraal en doorlopend energieprofiel. Hierdoor wordt dubbeltelling van eigenverbruik of overschatting van het besparingspotentieel voorkomen wanneer zonnepanelen, een thuisbatterij en een warmtepomp samen worden geadviseerd.' },
      { question: 'Voldoen de rapporten uit geautomatiseerde software aan de eisen voor subsidieaanvragen?', answer: 'Ja, professionele software bouwt adviesrapporten op volgens de technische normen en eisen die de RVO stelt aan subsidieaanvragen, zoals bij de ISDE voor warmtepompen. Dit voorkomt vertraging en afwijzing bij de subsidieaanvraag door de klant.' },
      { question: 'Hoe helpt een geautomatiseerd adviesrapport bij het verhogen van de offerteconversie?', answer: 'Een helder, visueel en transparant adviesrapport bouwt direct vertrouwen op bij de woning- of pandeigenaar. Omdat de klant sneller antwoord krijgt en het rendement overzichtelijk wordt gepresenteerd, beslist de klant sneller en stijgt de conversie.' },
    ],
  },
  {
    slug: 'dynamic-load-balancing-laadpaal-adviseren',
    readingTimeMinutes: 7,
    title: 'Dynamic load balancing laadpaal adviseren: overbelasting voorkomen op locatie',
    seoTitle: 'Dynamic load balancing laadpaal adviseren: zo werkt het',
    description:
      'Dynamic load balancing laadpaal adviseren? Voorkom overbelasting op de netaansluiting en onderbouw uw advies. Praktische gids voor installateurs.',
    date: '2026-07-24',
    excerpt:
      'Hoe adviseert u dynamic load balancing bij laadpalen? Ontdek hoe u met slimme lastbalancering overbelasting van de netaansluiting voorkomt en een onderbouwd advies geeft.',
    tags: ['Laadpalen', 'Netaansluiting', 'Dynamic Load Balancing', 'Installatietechniek'],
    keyPoints: [
      'Dynamic load balancing (DLB) meet het actuele huishoudelijke verbruik via de P1-poort of CT-spoelen en past het laadvermogen automatisch aan volgens de IEC 61851-norm.',
      'Op een standaard 3x25A netaansluiting is DLB essentieel om het risico op overbelasting van de hoofdzekering bij gelijktijdig gebruik van een warmtepomp of kookplaat tot een minimum te beperken.',
      'Een onderbouwd adviesgesprek voorkomt onnodige en kostbare netuitbreidingen door de capaciteit van de aansluiting vooraf inzichtelijk te maken voor de klant.',
      'Geïntegreerde adviessoftware combineert het laadprofiel met overige verduurzamingsmaatregelen tot één transparant adviesrapport.',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Wat is het verschil tussen statische en dynamische load balancing bij een laadpaal?', answer: 'Bij statische load balancing stelt u een vast maximaal laadvermogen in dat nooit wordt overschreden, ongeacht het overige verbruik. Bij dynamische load balancing wordt het beschikbare vermogen continu in real-time gemeten via de P1-poort of CT-spoelen, waardoor de laadpaal direct bijschakelt wanneer het overige verbruik in het pand daalt.' },
      { question: 'Is dynamic load balancing verplicht bij de installatie van een laadpaal?', answer: 'Volgens de NEN 1010-normen is dynamic load balancing niet formeel wettelijk verplicht, maar in de praktijk is het bij een 11 kW laadpaal op een standaard 3x25A netaansluiting vrijwel onmisbaar. Zonder dynamische sturing is het risico op het doorslaan van de hoofdzekering bij gelijktijdig gebruik van apparaten zoals een warmtepomp of inductiekookplaat zeer groot.' },
      { question: 'Hoe communiceert een laadpaal met de slimme meter voor dynamic load balancing?', answer: 'De communicatie verloopt meestal via een fysieke datakabel (UTP) of een draadloze module tussen de P1-poort van de slimme meter (SMR 4.2 of SMR 5.0 protocol) of externe CT-stroomspoelen en de laadpaal. De laadpaal gebruikt dit signaal om conform de IEC 61851-norm het laadsignaal (PWM) naar het voertuig aan te passen.' },
      { question: 'Kan dynamic load balancing worden gecombineerd met zonnepanelen en een thuisbatterij?', answer: 'Ja, moderne laadpalen en energiemanagementsystemen (EMS) kunnen het laadvermogen afstemmen op zowel de netbelasting als de actuele opwek van zonnepanelen en de status van een thuisbatterij. Hierdoor kan het laadpunt voorrang geven aan het laden op eigen zonne-energie.' },
    ],
  },
  {
    slug: 'geluidsnorm-warmtepomp-buiteneenheid-advies',
    readingTimeMinutes: 7,
    title: 'Geluidsnormen voor warmtepompen: hoe onderbouwt u de plaatsing van de buiteneenheid in uw advies?',
    seoTitle: 'Geluidsnorm warmtepomp buiteneenheid: advies',
    description:
      'Hoe voldoet u aan de geluidsnorm warmtepomp buiteneenheid? Lees hoe u als installateur geluidsberekeningen en plaatsing onderbouwt in uw advies.',
    date: '2026-07-27',
    excerpt:
      'Als installateur bent u gebonden aan de BBL-geluidsnormen voor buiten opgestelde warmtepompen. Ontdek hoe u afstand, reflecties en omkastingen onderbouwt in uw klantadvies.',
    tags: ['Warmtepompen', 'Geluidsnormen', 'Installatietechniek', 'Buiteneenheid'],
    keyPoints: [
      'Het Besluit bouwwerken leefomgeving (BBL) stelt een grenswaarde van maximaal 40 dB(A) \'s nachts en 45 dB(A) overdag op de erfgrens.',
      'Het verschil tussen geluidsvermogen (Lwa) en geluidsdruk (Lp) vormt de rekenbasis bij het bepalen van de juiste afstand.',
      'Plaatsing nabij een buitenwand of in een hoek verhoogt de geluidsdruk met 3 tot 6 dB(A) door reflectie van geluidsgolven.',
      'Trillingsdempers, nachtmodus en akoestische omkastingen zijn effectieve maatregelen bij krappe kavelgrenzen.',
      'Een heldere akoestische onderbouwing in het adviesrapport voorkomt burenconflicten en aansprakelijkheid achteraf.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Welke geluidsnorm geldt er voor de buiteneenheid van een warmtepomp?', answer: 'Volgens artikel 3.21 van het Besluit bouwwerken leefomgeving (BBL) mag het geluidsdrukniveau veroorzaakt door een buiten opgestelde warmtepomp op de erfgrens met de buren (of bij een te openen raam van een woonfunctie) maximaal 40 dB(A) bedragen tussen 23:00 en 07:00 uur, en maximaal 45 dB(A) tussen 07:00 en 23:00 uur.' },
      { question: 'Wat is het verschil tussen geluidsvermogen (Lwa) en geluidsdruk (Lp)?', answer: 'Geluidsvermogen (Lwa) is de broneigenschap van de warmtepomp op de machine zelf, gemeten in een laboratorium. Geluidsdruk (Lp) is de daadwerkelijk waargenomen geluidsintensiteit op een specifieke plek (zoals de perceelgrens), beïnvloed door afstand, obstakels en reflecterende wanden.' },
      { question: 'Hoeveel invloed heeft een muur of hoek op het geluidsniveau van de buiteneenheid?', answer: 'Plaatsing vlak voor een harde gevel voegt door geluidsreflectie circa 3 dB(A) toe aan de geluidsdruk. Een plaatsing in een binnenhoek tussen twee muren verhoogt het geluidsdrukniveau met circa 6 dB(A) ten opzichte van een vrijstaande opstelling.' },
      { question: 'Wie is verantwoordelijk als de warmtepomp na installatie niet voldoet aan de geluidsnorm?', answer: 'De gebouweigenaar is juridisch verantwoordelijk voor het naleven van het BBL, maar u als installateur heeft een zorgplicht. Met een schriftelijke akoestische onderbouwing vooraf toont u aan dat het systeem zorgvuldig en compliant is ontworpen.' },
    ],
  },
  {
    slug: 'koelvermogen-airco-berekenen',
    readingTimeMinutes: 7,
    title: 'Koelvermogen van een airco berekenen: hoe onderbouwt u het benodigde vermogen per ruimte?',
    seoTitle: 'Koelvermogen airco berekenen: onderbouwing per ruimte',
    description:
      'Koelvermogen van een airco berekenen per ruimte? Ontdek de ISSO-factoren, m3-berekeningen, isolatieklassen en het invullen van een kloppend adviesrapport.',
    date: '2026-07-27',
    excerpt:
      'Hoe berekent u als installateur het benodigde koelvermogen van een airco per ruimte exact? Een heldere uitleg van de ISSO-methodiek, vermogensklassen, isolatiefactoren en de impact op het totale energieprofiel.',
    tags: ['Airco', 'Installatietechniek', 'Koelvermogen', 'Energierapport'],
    keyPoints: [
      'Het berekenen van het koelvermogen vereist een precieze analyse van het ruimtevolume (m³) en de thermische kenmerken van de schil.',
      'De ISSO-methodiek onderscheidt vermogensklassen (30 tot 50 Watt per m³) op basis van isolatiewaarde, glasoppervlak en zonbelasting.',
      'Overdimensionering leidt tot pendelgedrag en efficiëntieverlies, terwijl onderdimensionering het gewenste comfort verhindert.',
      'Een onderbouwde berekening koppelt het koel- en verwarmingsvermogen van de airco direct aan de totale energiebalans en zonnepaneel-opwek.',
    ],
    category: 'Airco',
    faq: [
      { question: 'Hoeveel Watt koelvermogen is gemiddeld nodig per kubieke meter (m³)?', answer: 'De algemeen gehanteerde richtlijn kent een spreiding van 30 tot 50 Watt per m³. Een goed geïsoleerde ruimte met HR++ of triple glas vereist doorgaans 30 Watt per m³, terwijl ruimtes met een hoog glasoppervlak, plat dak of matige isolatie al snel 40 tot 50 Watt per m³ vragen.' },
      { question: 'Wat is het risico van een overgedimensioneerde airco?', answer: 'Bij overdimensionering kan de inverter van de airconditioning niet ver genoeg terugmoduleren. Dit veroorzaakt een zogenaamd pendel-effect (frequent in- en uitschakelen van de compressor), wat leidt tot een hoger energieverbruik, grotere temperatuurschommelingen en versnelde slijtage.' },
      { question: 'Welke standaarden en richtlijnen onderbouwen een professionele koellastberekening?', answer: 'Professionele installateurs baseren hun advies op de richtlijnen van ISSO (zoals ISSO-publicatie 51 en 74 voor koellastberekeningen) en NEN-EN 14511 / NEN-EN 14825 voor seizoensprestaties (SEER en SCOP).' },
      { question: 'Hoe beïnvloedt een airco het totale energieprofiel van de woning?', answer: 'In de zomer vraagt de airco koelstroom op momenten dat zonnepanelen veel opwekken. In het stookseizoen werkt de airco als efficiënte lucht-lucht warmtepomp. Door het stroomverbruik in beide seizoenen mee te nemen, ontstaat een integraal en realistisch energie-advies.' },
    ],
  },
  {
    slug: 'monoblock-vs-split-warmtepomp',
    readingTimeMinutes: 7,
    title: 'Monoblock of split-warmtepomp: hoe onderbouwt u de keuze in uw klantadvies en offerte?',
    seoTitle: 'Monoblock vs split warmtepomp: onderbouw uw advies',
    description:
      'Twijfelt u tussen een monoblock vs split warmtepomp? Ontdek hoe u installatie-eisen, F-gassen en efficiëntie onderbouwt in uw advies en offerte.',
    date: '2026-07-28',
    excerpt:
      'Een gedegen keuze tussen een monoblock en een split-warmtepomp vraagt om inzicht in F-gascertificering, bouwkundige ruimte, geluidsnormen en leidingsverliezen. Zo onderbouwt u dit helder in uw offertes.',
    tags: ['Warmtepompen', 'Installatietechniek', 'F-gassen', 'Offerteproces'],
    keyPoints: [
      'Het fundamentele verschil ligt in het koudemiddelcircuit: bij een monoblock blijft dit in de buiteneenheid, bij een split loopt het tot in de woning.',
      'F-gascertificering is wettelijk verplicht voor het installeren van split-systemen, terwijl een monoblock puur waterzijdig aangesloten wordt.',
      'Plaatsingsruimte binnen en buiten, geluidsnormen op de perceelgrens en bevriezingsrisico\'s bepalen mede het geschikte systeemtype.',
      'Een heldere onderbouwing in het adviesrapport voorkomt onduidelijkheid over meerkosten, fysieke impact op het pand en subsidievoorwaarden.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Is een monoblock warmtepomp efficiënter dan een split-warmtepomp?', answer: 'In de basis ontlopen het nominale rendement en de SCOP-waarde van een monoblock en split elkaar nauwelijks wanneer vergelijkbare compressoren worden toegepast. Wel spelen thermische leidingverliezen over het waterzijdige buitentraject bij een monoblock en de gekozen vorstbeveiliging een rol in het netto jaarrendement.' },
      { question: 'Heeft u voor het installeren van een monoblock een F-gascertificaat nodig?', answer: 'Nee, bij een monoblock warmtepomp is het koudemiddelcircuit af fabriek hermetisch gesloten in de buiteneenheid. Omdat u als installateur uitsluitend CV-waterzijdige leidingen naar binnen aanlegt, is een F-gascertificering voor deze specifieke montage werkzaamheden niet verplicht.' },
      { question: 'Hoe voorkomt u bevriezingsschade bij een monoblock warmtepomp?', answer: 'Omdat er CV-water door de buitenleidingen van een monoblock stroomt, kan bij langdurige stroomuitval tijdens vorst schade ontstaan. Dit wordt in het ontwerp opgevangen door het toepassen van thermische vorstbeveiligingskleppen, een glycolmengsel of een scheidingswisselaar.' },
      { question: 'Komen zowel monoblock- als split-warmtepompen in aanmerking voor ISDE-subsidie?', answer: 'Ja, zowel monoblock- als split-lucht-waterwarmtepompen komen in aanmerking voor de ISDE-subsidie, mits het specifieke fabricaat en type op de actuele meldcodelijst van de RVO staat vermeld en aan de geldende kwaliteits- en efficiëntie-eisen voldoet.' },
    ],
  },
  {
    slug: 'mid-laadpaal-zakelijk-verrekenen-advies',
    readingTimeMinutes: 6,
    title: 'MID-gecertificeerde laadpaal voor zakelijk thuisladen: waar op letten in uw advies?',
    seoTitle: 'MID laadpaal zakelijk verrekenen: advies voor installateurs',
    description:
      'MID laadpaal zakelijk verrekenen: advies over MID-certificering, CPO-koppeling en netcapaciteit voor zakelijk thuisladen bij uw klanten.',
    date: '2026-07-29',
    excerpt:
      'Voor het zakelijk verrekenen van thuisgeladen stroom is een MID-gecertificeerde laadpaal een harde voorwaarde. Ontdek waar u als installateur op moet letten bij certificering, CPO-koppeling en netcapaciteit.',
    tags: ['Laadpalen', 'Zakelijk laden', 'Installatiebranche', 'Wetgeving'],
    keyPoints: [
      'MID-certificering (Measuring Instruments Directive) is een fiscale voorwaarde van de Belastingdienst voor het onbelast verrekenen van geladen kilowatturen met een werkgever of B.V.',
      'Automatische verrekening vereist naast een geijkte MID-stroommeter ook OCPP-ondersteuning en een Charge Point Operator (CPO) backoffice.',
      'Via een RFID-laadpas worden zakelijke laadsessies betrouwbaar gescheiden van het privégebruik van overige voertuigen binnen het huishouden.',
      'Het hoge laadvermogen bij zakelijk laden vereist een grondige controle van de netaansluiting en de toepassing van dynamic load balancing.',
      'In één gecombineerd adviesrapport maakt u de impact van een zakelijke laadpaal op het totale energieprofiel van de klant inzichtelijk.',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Waarom is een MID-gecertificeerde stroommeter verplicht voor zakelijk verrekenen?', answer: 'De Belastingdienst en de fiscale wetgeving eisen dat onbelaste kostenvergoedingen voor thuisgeladen kilowatturen gebaseerd zijn op een geijkte en aantoonbare meting. De Europese MID-richtlijn (Measuring Instruments Directive) garandeert de vereiste nauwkeurigheid en fraudebestendigheid.' },
      { question: 'Is een externe MID-kWh-meter in de groepenkast ook toegestaan?', answer: 'Ja, een externe gecertificeerde MID-meter op de laadpaalgroep in de meterkast is fiscaal toegestaan, mits de meetgegevens verzegeld en aantoonbaar via het verrekenplatform worden uitgelezen. In de praktijk wordt echter meestal gekozen voor een laadpaal met een ingebouwde MID-meter voor een snellere installatie.' },
      { question: 'Hoe werkt het verrekenen van laadkosten als de klant ook zonnepanelen heeft?', answer: 'De MID-meter registreert de exacte hoeveelheid kilowatturen die de laadpaal opneemt. De werkgever vergoedt het afgesproken kWh-tarief aan de werknemer op basis van deze meterstand. Hoe de stroom is opgewekt (uit de zonnepanelen of vanaf het net) verandert niets aan het geijkte verbruik dat de laadpaal registreert.' },
      { question: 'Wat is het verschil tussen een standaard laadpaal en een MID-gecertificeerde zakelijke laadpaal?', answer: 'Een standaard thuislader gebruikt vaak een niet-geijkte interne stroommeting en mist soms de benodigde software-protocollen (OCPP). Een MID-laadpaal beschikt over een officieel geijkte stroommeter, ondersteunt het OCPP-protocol voor gegevensuitwisseling met een backoffice en gebruikt een RFID-lezer voor gebruikersidentificatie.' },
    ],
  },
  {
    slug: 'vermogensgarantie-zonnepanelen-offerte',
    readingTimeMinutes: 6,
    title: 'Vermogensgarantie en productgarantie van zonnepanelen: hoe verwerkt u dit helder in uw adviesrapport?',
    seoTitle: 'Vermogensgarantie zonnepanelen offerte: zo adviseert u',
    description:
      'Vermogensgarantie zonnepanelen in de offerte helder uitleggen? Ontdek het verschil met productgarantie en de verwerking in uw adviesrapport.',
    date: '2026-07-30',
    excerpt:
      'Het verschil tussen productgarantie en vermogensgarantie van zonnepanelen is voor veel klanten onduidelijk. Ontdek hoe u beide garanties helder toelicht, onderbouwt met IEC-normen en correct verwerkt in uw offertes en adviesrapporten.',
    tags: ['Zonnepanelen', 'Garantie', 'Adviesrapport', 'Installatiebranche'],
    keyPoints: [
      'Het essentiële verschil tussen fysieke productgarantie en lineaire vermogensgarantie helder uitgelegd.',
      'Borging van kwaliteit en veiligheid via IEC 61215 en IEC 61730 normeringen in uw advies.',
      'Hoe de jaarlijkse degradatie direct invloed heeft op de meerjarige opbrengstberekening.',
      'Praktische handvatten om misverstanden over garantievoorwaarden in offertes te voorkomen.',
    ],
    category: 'Zonnepanelen',
    faq: [
      { question: 'Wat is het verschil tussen productgarantie en vermogensgarantie bij zonnepanelen?', answer: 'Productgarantie dekt fysieke gebreken en materiaaldefecten aan het zonnepaneel zelf (zoals delaminatie of gebroken soldeerverbindingen). Vermogensgarantie garandeert dat de module na een bepaald aantal jaren (meestal 25 tot 30 jaar) nog een minimaal percentage van het oorspronkelijke piekvermogen levert.' },
      { question: 'Welke IEC-normen borgen de kwaliteit van zonnepanelen in een offerte?', answer: 'De belangrijkste internationale normen zijn IEC 61215 (ontwerpkwalificatie en typegoedkeuring voor de mechanische en elektrische belasting) en IEC 61730 (elektrische en thermische veiligheid). Het vermelden van deze certificeringen geeft uw klant onderbouwde zekerheid.' },
      { question: 'Dekt de productgarantie van de fabrikant ook de arbeidskosten bij vervanging?', answer: 'Nee, fabrikanten vergoeden vanuit de standaard productgarantie meestal alleen de vervangende module of onderdelen. De arbeidskosten voor de de-installatie, montage en eventuele steigerhuur vallen doorgaans onder de installatiegarantie van de installateur of de aanvullende voorwaarden van de fabrikant.' },
      { question: 'Hoe verwerkt u de vermogensdegradatie correct in een rendementsberekening?', answer: 'Door in de meerjarige berekening rekening te houden met een jaarlijkse degradatiefactor (zoals 0,25% tot 0,55% verlies per jaar) en een initiële declassering in het eerste jaar. Hiermee berekent u de verwachte kilowatturen over 10 tot 25 jaar op een deterministische en verantwoorde wijze.' },
    ],
  },
  {
    slug: 'warmtepompboiler-adviseren-gasbesparing-isde',
    readingTimeMinutes: 6,
    title: 'Warmtepompboiler adviseren: hoe onderbouwt u de gasbesparing en ISDE-subsidie voor uw klant?',
    seoTitle: 'Warmtepompboiler adviseren: gasbesparing en ISDE-subsidie',
    description:
      'Warmtepompboiler adviseren aan uw klant? Lees hoe u de gasbesparing, het extra stroomverbruik en de ISDE-subsidie onderbouwt in uw adviesrapport.',
    date: '2026-07-31',
    excerpt:
      'Een warmtepompboiler is een effectieve tussenstap naar aardgasvrij wonen. Lees hoe u als installateur de gasbesparing, COP-waarde en ISDE-subsidie onderbouwt.',
    tags: ['Warmtepompboiler', 'ISDE-subsidie', 'Gasbesparing', 'Installatiebranche'],
    keyPoints: [
      'Onderbouw de gasbesparing voor warm tapwater op basis van gezinsgrootte en de COP-waarde van de boiler.',
      'Reken het extra elektriciteitsverbruik transparant door op basis van de rendementsfactor (COP).',
      'Controleer vooraf de actuele RVO-meldcodelijst om de ISDE-subsidieaanvraag voor de klant te waarborgen.',
      'Combineer een warmtepompboiler met zonnepanelen om het eigenverbruik van zonne-energie te verhogen.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Hoeveel gas bespaart een warmtepompboiler gemiddeld per jaar?', answer: 'Het gasverbruik voor warm tapwater bedraagt bij een gemiddeld huishouden circa 10 tot 20 procent van de totale gasvraag. Door het tapwater volledig elektrisch te verwarmen via een warmtepompboiler, vervalt dit gasverbruik voor tapwater volledig. De exacte besparing hangt af van de gezinsgrootte en het douchegedrag.' },
      { question: 'Komt elke warmtepompboiler in aanmerking voor ISDE-subsidie?', answer: 'Nee. Om in aanmerking te komen voor ISDE-subsidie moet het apparaat vermeld staan op de officiële meldcodelijst van de RVO voor warmtepompboilers. Daarnaast moet de installatie worden uitgevoerd door een bouw- of installatiebedrijf en moet de aanvraag binnen de gestelde termijn na installatie worden ingediend.' },
      { question: 'Wat is het effect van de aanzuiglucht op het rendement van een warmtepompboiler?', answer: 'Een warmtepompboiler die warme binnenlucht of ventilatieretourlucht gebruikt, behaalt over het algemeen een hogere COP-waarde dan een systeem dat koude buitenlucht aanzuigt. Wanneer binnenlucht uit een verwarmde ruimte wordt gebruikt, moet er echter rekening mee worden gehouden dat de ruimte-verwarmingsinstallatie die warmte deels moet compenseren.' },
      { question: 'Hoe kan een warmtepompboiler helpen bij het verhogen van de zelfconsumptie van zonnepanelen?', answer: 'Veel moderne warmtepompboilers beschikken over een stuurcontact (zoals SG Ready of een PV-contact). Hiermee kan het apparaat overdag, op momenten van overtollige zonnestroom, het water opwarmen tot een hogere temperatuur. Dit verhoogt het directe eigenverbruik van de zonnepaneleninstallatie.' },
    ],
  },
  {
    slug: 'verduurzamingsadvies-vve-collectief-plan',
    readingTimeMinutes: 6,
    title: 'Verduurzamingsadvies voor VvE’s: hoe onderbouwt u een collectief verduurzamingsplan?',
    seoTitle: 'Verduurzamingsadvies VvE: zo onderbouwt u een plan',
    description:
      'Hoe geeft u professioneel verduurzamingsadvies aan een VvE? Ontdek hoe u besluitvorming, draagvlak, subsidies en de terugverdientijd helder onderbouwt.',
    date: '2026-08-03',
    excerpt:
      'Het verduurzamen van een VvE vraagt om meer dan alleen een technische offerte. Ontdek hoe u met een integraal verduurzamingsadvies draagvlak creëert in de ledenvergadering en het collectieve energieprofiel onderbouwt.',
    tags: ['VvE', 'Verduurzaming', 'Adviesrapport', 'Installateurs'],
    keyPoints: [
      'Besluitvorming in een VvE vereist transparante rekenmodellen die individuele en collectieve baten helder scheiden.',
      'De verdeling van opwek en opslag over privé- en gemeenschappelijke meters vormt het belangrijkste technische knelpunt.',
      'Subsidies zoals de SVVE en de afbouw van de salderingsregeling maken een meerjarige kosten-batenanalyse noodzakelijk voor de ALV.',
      'Een integraal energieadvies op gebouwniveau verhoogt het draagvlak en verkort de besluitvormingstermijn van de ledenvergadering.',
    ],
    category: 'Subsidies',
    faq: [
      { question: 'Welke subsidies zijn beschikbaar voor het verduurzamen van een VvE?', answer: 'Via de Subsidieregeling verduurzaming voor verenigingen van eigenaars (SVVE) van de RVO kunnen VvE\'s subsidie aanvragen voor energieadvies, procesbegeleiding en concrete verduurzamingsmaatregelen zoals isolatie, warmtepompen en zonneboilers. Raadpleeg rvo.nl voor de actuele voorwaarden en vergoedingen.' },
      { question: 'Hoe onderbouwt u zonnepanelen op een gemeenschappelijk VvE-dak?', answer: 'U start met een analyse van de netaansluitingen: sluit u de installatie aan op de centrale meter voor algemene voorzieningen (zoals liften en verlichting), of op individuele slimme meters via stijgleidingen? De keuze bepaalt direct hoe het rendement verdeeld wordt over de servicekosten en het privéverbruik.' },
      { question: 'Waarom is de afbouw van de salderingsregeling extra relevant voor VvE\'s?', answer: 'Bij collectieve zonnepanelen op een algemene meter is de gelijktijdigheid tussen opwek en verbruik vaak laag. Na de afschaffing van het salderen per 2027 daalt de opbrengst van teruglevering scherp. Een advies moet daarom sturen op maximale zelfconsumptie of koppeling met laadpalen en warmtepompen.' },
      { question: 'Hoe voorkomt u overbelasting bij laadpalen op het parkeerdek van een VvE?', answer: 'Door in uw verduurzamingsadvies altijd te kiezen voor laadstations met Dynamic Load Balancing. Hiermee wordt het laadvermogen automatisch afgestemd op de resterende capaciteit van de hoofdaansluiting, zodat kostbare netuitbreidingen worden voorkomen.' },
    ],
  },
  {
    slug: 'radiatoren-geschikt-warmtepomp-lage-temperatuur',
    readingTimeMinutes: 6,
    title: 'Afgiftesysteem en warmtepomp: zo controleert u of radiatoren geschikt zijn voor lage temperatuur',
    seoTitle: 'Lage temperatuur radiatoren warmtepomp: advies',
    description:
      'Hoe controleert u of radiatoren geschikt zijn voor een warmtepomp? Lees ons lage temperatuur radiatoren warmtepomp advies voor vakprofessionals.',
    date: '2026-08-03',
    excerpt:
      'Een succesvolle warmtepomp-installatie valt of staat met het afgiftesysteem. Ontdek hoe u als installateur gecontroleerd berekent of bestaande radiatoren geschikt zijn voor lage temperatuur verwarming.',
    tags: ['Warmtepompen', 'Lage temperatuur', 'Radiatoren', 'Afgiftesysteem', 'Installatietechniek'],
    keyPoints: [
      'Herbereken het radiatorvermogen bij lage aanvoertemperaturen op basis van de exponentiële afgifte-omrekenfactor.',
      'Voer een exacte warmteverliesberekening uit per ruimte om onderdimensionering bij lagetemperatuurverwarming te voorkomen.',
      'Gebruik radiatorventilatoren, zwaardere paneelradiatoren (type 22/33) of lagetemperatuurradiatoren bij een capaciteitstekort.',
      'Zorg dat waterzijdig inregelen standaard onderdeel is van het advies om het rendement en de COP van de warmtepomp te borgen.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Hoeveel vermogen verliest een standaard radiator bij lage temperatuur?', answer: 'Bij een teruggang van een traditioneel regime (75/65/20 °C) naar een lagetemperatuurregime (45/35/20 °C) verliest een standaard paneelradiator gemiddeld 60 tot 70 procent van zijn nominale warmteafgifte. Een radiator die nominaal 2.000 Watt levert, geeft bij 45 °C aanvoer nog maar circa 600 tot 800 Watt af.' },
      { question: 'Wat is het verschil tussen een traditionele radiator en een lagetemperatuurradiator (LTV)?', answer: 'Een traditionele paneelradiator is ontworpen voor een hoge watertemperatuur en vertrouwt primair op natuurlijke straling en convectie. Een LTV-radiator of convector heeft een veel groter intern warmtewisselend oppervlak of maakt gebruik van geïntegreerde microventilatoren (geforceerde convectie) om bij lage watertemperaturen toch voldoende warmte aan de ruimte af te geven.' },
      { question: 'Is de 50-gradentest een betrouwbare methode om geschiktheid te testen?', answer: 'De 50-gradentest is een praktische indicatiewijze voor de woningeigenaar gedurende de wintermaanden, maar vervangt voor de installateur geen normatieve warmteverliesberekening. Een geslaagde test geeft aan dat de woning bij mild winterweer warm blijft, maar geeft geen garantie op voldoende vermogen tijdens de ontwerpbuitentemperatuur.' },
      { question: 'Waarom is waterzijdig inregelen kritiek bij lagetemperatuurverwarming?', answer: 'Bij lage aanvoertemperaturen is het temperatuurverschil (delta T) tussen aanvoer en retour kleiner. Als het cv-water ongelijkmatig door het systeem stroomt, ontstaan er grote kortsluitstromen. Dit leidt tot een te hoge retourtemperatuur naar de warmtepomp, wat het rendement (de COP) ernstig verslechtert en tot pendelgedrag leidt.' },
    ],
  },
  {
    slug: 'geintegreerd-energiesysteem-woningen',
    readingTimeMinutes: 7,
    title: 'De voordelen van een geïntegreerd energiesysteem voor woningen: zonnepanelen, warmtepompen en thuisbatterijen',
    seoTitle: 'Geïntegreerd energiesysteem: zon, batterij en warmtepomp',
    description:
      'Wat levert een geïntegreerd energiesysteem op? Lees hoe zonnepanelen, warmtepomp en thuisbatterij samen de zelfconsumptie verhogen en netbelasting',
    date: '2026-08-03',
    excerpt:
      'Ontdek hoe de integratie van zonnepanelen, warmtepompen en thuisbatterijen tot één samenhangend energiesysteem de zelfconsumptie verhoogt, terugleverkosten minimaliseert en uw klantadvies versterkt.',
    tags: ['Zonnepanelen', 'Thuisbatterijen', 'Warmtepompen', 'Energiebeheer'],
    keyPoints: [
      'Losse verduurzamingsmaatregelen lopen vast op terugleverkosten, netbelasting en de afschaffing van de salderingsregeling per 2027.',
      'Een geïntegreerd energiesysteem stemt opwek, thermische opslag en elektrische opslag dynamisch op elkaar af.',
      'Door slimme sturing via een Energiemanagementsysteem (EMS) stijgt de eigen consumptie van zonnestroom van circa 30% naar 60% tot 80%.',
      'Installateurs voorkomen \'stapelfouten\' in offertes door te rekenen met één doorlopend energieprofiel in plaats van losse productberekeningen.',
    ],
    category: 'Thuisbatterijen',
    faq: [
      { question: 'Wat is een geïntegreerd energiesysteem in een woning precies?', answer: 'Een geïntegreerd energiesysteem stemt de opwek van zonnepanelen, de warmtevraag van een warmtepomp en de opslag van een thuisbatterij via een energiemanagementsysteem (EMS) dynamisch op elkaar af om lokaal verbruik te maximaliseren.' },
      { question: 'Waarom stijgt de zelfconsumptie bij een geïntegreerd energiesysteem?', answer: 'Overschotten aan zonnestroom worden direct nuttig ingezet: eerst voor directe huishoudelijke vraag en thermische opslag (warmtepomp of warmtepompboiler), en vervolgens voor het laden van de thuisbatterij. Zo vloeit er minimaal stroom terug naar het net.' },
      { question: 'Is een thuisbatterij noodzakelijk als een woning al een warmtepomp heeft?', answer: 'Een batterij is niet verplicht, maar vormt wel de schakel om de avonduren te overbruggen. De warmtepomp vraagt ook \'s avonds stroom wanneer de zonnepanelen niets meer opwekken; een batterij voorkomt dat er op dat moment netstroom ingekocht moet worden.' },
      { question: 'Hoe voorkomt een geïntegreerd systeem overbelasting van de netaansluiting?', answer: 'Het energiemanagementsysteem meet continu de P1-poort en regelt via dynamic load balancing het vermogen van grote verbruikers (zoals de laadpaal, warmtepomp en batterij) bij binnen de grenzen van de hoofdzekering.' },
    ],
  },
  {
    slug: 'afgiftesysteem-warmtepomp-lage-temperatuur-radiatoren',
    readingTimeMinutes: 7,
    title: 'Afgiftesysteem en warmtepomp: hoe controleert u of radiatoren geschikt zijn voor lage temperatuur?',
    seoTitle: 'Lage temperatuur radiatoren warmtepomp advies',
    description:
      'Hoe controleert u of bestaande radiatoren geschikt zijn voor een warmtepomp? Praktisch lage temperatuur radiatoren warmtepomp advies voor installateurs.',
    date: '2026-08-04',
    excerpt:
      'Een warmtepomp presteert pas optimaal bij lage aanvoertemperaturen. Ontdek hoe u als installateur het bestaande afgiftesysteem controleert, de afgiftecapaciteit herrekent en uw klant van een passend advies voorziet.',
    tags: ['Warmtepompen', 'Afgiftesysteem', 'Radiatoren', 'Adviesvaardigheden', 'Installatietechniek'],
    keyPoints: [
      'Afgiftecapaciteit van radiatoren daalt exponentieel bij een lagere gemidelde watertemperatuur.',
      'Controleer radiatortypen (type 10 t/m 33) en bereken de effectieve afgifte bij een aanvoer van 35 tot 55 graden Celsius.',
      'Waterzijdig inregelen en het verhogen van de volumestroom zijn cruciaal om stromingsruis en rendementsverlies te voorkomen.',
      'Oplossingen bij capaciteitstekort variëren van actieve ventilatorconvectoren tot schilisolatie en ltv-radiatoren.',
      'Onderbouw uw advies richting de klant met transparante herberekeningen voor comfort en een hoge SCOP.',
    ],
    category: 'Warmtepompen',
    faq: [
      { question: 'Wat is het verschil tussen afgifte bij 75/65 graden Celsius en 45/35 graden Celsius?', answer: 'Bij een traditioneel temperatuurtraject van 75/65 graden Celsius bedraagt het gemiddelde temperatuurverschil met de ruimte (20 graden Celsius) circa 50 Kelvin. Bij een warmtepomptraject van 45/35 graden Celsius is dit gemiddelde temperatuurverschil nog maar 20 Kelvin. Door deze lagere Delta T verliest een standaard radiator meer dan de helft van zijn nominale warmteafgifte.' },
      { question: 'Moeten alle radiatoren worden vervangen bij de overstap naar een warmtepomp?', answer: 'Nee, dat is niet altijd noodzakelijk. Door het beter isoleren van het gebouw, het plaatsen van radiatorventilatoren of het verhogen van de volumestroom kan de afgifte van de bestaande radiatoren in veel gevallen voldoende zijn, met name in goed geïsoleerde ruimtes.' },
      { question: 'Hoe beïnvloedt de leidingdiameter het functioneren van de warmtepomp?', answer: 'Omdat een warmtepomp met een kleiner temperatuurverschil (Delta T van 5 tot 8 Kelvin) werkt dan een cv-ketel (Delta T van 15 tot 20 Kelvin), is er meer volumestroom aan water nodig om hetzelfde vermogen te verplaatsen. Te kleine leidingdiameters leiden dan tot hoge stromingsweerstand, ruis en storingen in de warmtepomp.' },
      { question: 'Wat is de rol van radiatorventilatoren bij lage temperatuur verwarming?', answer: 'Radiatorventilatoren verhogen de geforceerde convectie langs de platen van een bestaande radiator. Hierdoor neemt de warmteafgifte bij lage aanvoertemperaturen aanzienlijk toe, zonder dat de radiator fysiek vervangen hoeft te worden.' },
    ],
  },
  {
    slug: 'mia-vamil-laadpaal-adviseren-zakelijk',
    readingTimeMinutes: 6,
    title: 'Zakelijke laadpalen, SPRILA en fiscale stimulering: hoe adviseert u uw klant?',
    seoTitle: 'SPRILA en MIA VAMIL laadpalen adviseren',
    description:
      'MIA/Vamil voor standaard laadpalen is vervallen. Ontdek hoe u zakelijke klanten adviseert over de SPRILA-subsidie, KIA en netaansluitingen.',
    date: '2026-08-04',
    excerpt:
      'De fiscale regels voor zakelijke laadpalen zijn ingrijpend gewijzigd. MIA/Vamil is voor reguliere auto\'s vervallen; de SPRILA-subsidie en KIA zijn nu de belangrijkste voordelen.',
    tags: ['Laadpalen', 'Subsidies', 'Zakelijk', 'Advies'],
    keyPoints: [
      'MIA/Vamil is voor standaard personenwagen-laadpalen vervallen; dit geldt alleen nog voor zwaar transport of laadkluizen.',
      'De SPRILA-subsidie is hét alternatief voor Mkb-laadpalen, met vergoedingen tot € 800 per laadstation en € 1.600 per duopaal.',
      'Houd rekening met de harde SPRILA-drempel: er moet minimaal € 2.500 subsidie per locatie worden aangevraagd.',
      'Dynamic load balancing voorkomt overbelasting van de netaansluiting binnen congestiegebieden.',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Geldt de MIA/Vamil-regeling nog voor zakelijke laadpalen?', answer: 'Nee, voor standaard personenwagens is de MIA/Vamil voor laadpalen vervallen. Het geldt alleen nog voor zwaar transport (zoals e-vrachtwagens) of oplaadkluizen voor e-bikes/gereedschap. Voor gewone zakelijke laadpalen is de SPRILA-subsidie nu de aangewezen regeling.' },
      { question: 'Wat houdt de SPRILA-subsidie voor laadpalen in?', answer: 'De SPRILA-subsidie dekt een deel van de aanschaf en installatie van laadpalen op eigen terrein. Mkb\'ers ontvangen tot € 800 per laadstation of € 1.600 per duopaal, mits er per locatie minimaal € 2.500 aan subsidie wordt aangevraagd.' },
      { question: 'Hoe haalt een klant de minimale SPRILA-drempel van € 2.500?', answer: 'Door meerdere laadpalen te combineren, of door de kosten voor de basislaadinfrastructuur (bekabeling, graafwerk) mee te nemen in de aanvraag. Ook een gekoppelde stationaire batterij (min. 10 kWh) telt mee voor de SPRILA.' },
    ],
  },
  {
    slug: 'van-1-fase-naar-3-fase-verduurzaming-advies',
    readingTimeMinutes: 6,
    title: 'Van 1-fase naar 3-fase netaansluiting: hoe adviseert u uw klant over netverzwaarde verduurzaming?',
    seoTitle: '1 fase naar 3 fase verduurzaming advies voor installateurs',
    description:
      '1 fase naar 3 fase verduurzaming advies: hoe adviseert u uw klant bij netverzwaarde verduurzaming met warmtepomp, laadpaal en thuisbatterij? Lees de gids.',
    date: '2026-08-04',
    excerpt:
      'Het combineren van een warmtepomp, laadpaal en thuisbatterij vraagt vaak om een overstap van 1-fase naar 3-fase. Ontdek hoe u uw klant onderbouwd adviseert over netverzwaring.',
    tags: ['Laadpalen', 'Warmtepompen', 'Thuisbatterijen', 'Netcongestie', 'Installatietechniek'],
    keyPoints: [
      'Het verschil in continu vermogen tussen 1x35A (ca. 8,0 kW) en 3x25A (ca. 17,2 kW) inzichtelijk maken.',
      'Aanpassingen in de groepenkast volgens NEN 1010, inclusief 4-polige hoofdschakelaar en symmetrische fasebalancering.',
      'Het toepassen van dynamic load balancing via de P1-poort om overbelasting op afzonderlijke fasen te voorkomen.',
      'Een stappenplan voor het tijdig aanvragen van netverzwaring via MijnAansluiting.nl om opleververtraging te vermijden.',
    ],
    category: 'Laadpalen',
    faq: [
      { question: 'Wanneer is een overstap van 1-fase naar 3-fase noodzakelijk bij verduurzaming?', answer: 'Een overstap is noodzakelijk wanneer de gecombineerde gelijktijdige stroomvraag van apparaten zoals een all-electric warmtepomp, een 11 kW laadpaal en een inductiekookplaat het maximale continu vermogen van een 1-fase aansluiting (ca. 8,0 kW bij 1x35A) overschrijdt.' },
      { question: 'Wat moet er in de groepenkast worden aangepast bij verzwaring naar 3x25A?', answer: 'Er moet een 4-polige hoofdschakelaar geïnstalleerd worden, de bestaand 1-fase groepen moeten evenredig verdeeld worden over de drie fasen (L1, L2, L3) en er moeten 4-polige krachtgroepen geplaatst worden voor 3-fase verbruikers.' },
      { question: 'Is dynamic load balancing nog nodig op een 3x25A netaansluiting?', answer: 'Ja, want op een 3x25A aansluiting is de capaciteit per fase begrensd op 25A (circa 5,7 kW per fase). Een 11 kW laadpaal verbruikt al 16A per fase, waardoor overige gelijktijdige verbruikers een enkele fase alsnog kunnen overbelasten.' },
      { question: 'Wie vraagt de netverzwaring aan en hoe lang duurt dit?', answer: 'De klant vraagt de verzwaring zelf aan via MijnAansluiting.nl bij de regionale netbeheerder. De doorlooptijd varieert per regio en netbeheerder van enkele weken tot meerdere maanden.' },
    ],
  },
  {
    slug: 'r290-koudemiddel-propaan-warmtepomp-plaatsingsadvies',
    readingTimeMinutes: 3,
    title: 'R290 Koudemiddel (Propaan) in Warmtepompen: Plaatsingsadvies & Veiligheid',
    seoTitle: 'R290 Warmtepompen: Plaatsingsadvies en Veiligheid',
    description:
      'Wat betekent R290 (propaan) voor het plaatsingsadvies van monobloc warmtepompen? Lees alles over GWP, NEN-EN 378 A3-veiligheidszones en...',
    date: '2026-08-05',
    excerpt:
      'Door de F-gassenverordening wordt R290 (propaan) de norm voor monobloc warmtepompen. Ontdek de impact van de A3-veiligheidsclassificatie op het plaatsingsadvies en de buitenunit.',
    tags: ['R290', 'Propaan', 'Monobloc warmtepomp', 'Koudemiddel', 'F-gassen', 'Plaatsingsadvies', 'NEN-EN 378'],
    keyPoints: [
      'R290 heeft een extreem lage GWP van 3 vergeleken met R32 (675) en R410A (2088).',
      'Aanvoertemperaturen tot 70-75 °C zijn mogelijk zonder elektrisch bijverwarmen, ideaal voor bestaande bouw.',
      'Bij monobloc systemen bevindt het R290 koudemiddelcircuit zich volledig in de buitenunit.',
      'R290 valt in A3-veiligheidscategorie (niet-giftig, zeer ontvlambaar volgens NEN-EN 378).',
      'Plaatsing van de buitenunit vereist een veiligheidszone vrij van ontstekingsbronnen, gebouwopeningen en afvoerputten.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Waarom wordt R290 (propaan) gebruikt in warmtepompen?', answer: 'Vanwege de herziene F-gassenverordening worden koudemiddelen met een hoog GWP uitgefaseerd. R290 heeft een GWP van slechts 3 en kan hoge aanvoertemperaturen (tot 70-75 °C) leveren.' },
      { question: 'Waar moet een buitenunit met R290 koudemiddel geplaatst worden?', answer: 'De buitenunit moet geplaatst worden op een plek waar een veiligheidszone kan worden aangehouden. Deze zone moet vrij zijn van ontstekingsbronnen, gebouwopeningen (ramen/deuren) en afvoerputten.' },
      { question: 'Is R290 koudemiddel gevaarlijk binnenshuis?', answer: 'Bij monobloc systemen bevindt het R290-koudemiddel zich uitsluitend in de buitenunit. Er lopen enkel watervoerende leidingen naar de binnenruimte.' },
    ],
  },
  {
    slug: 'dc-ac-verhouding-omvormer-overdimensionering',
    readingTimeMinutes: 4,
    title: 'DC/AC-verhouding van een omvormer: hoe legt u overdimensionering uit aan uw klant?',
    seoTitle: 'DC/AC-verhouding Omvormer & Overdimensionering Uitgelegd',
    description:
      'Wat is de optimale DC/AC-verhouding voor een omvormer? Ontdek de voordelen van overdimensionering, de impact van clipping en de NEN 1010 richtlijnen.',
    date: '2026-08-06',
    excerpt:
      'Ontdek hoe overdimensionering van een omvormer werkt, wat een ideale DC/AC-verhouding is (110%-130%) en waarom opbrengstverlies door clipping minimaal is.',
    tags: ['DC/AC-verhouding', 'omvormer', 'overdimensionering', 'clipping', 'zonnepanelen', 'NEN 1010'],
    keyPoints: [
      'Een gebruikelijke DC/AC-verhouding ligt tussen de 110% en 130%.',
      'Overdimensionering zorgt voor snellere opstart en langere doorproductie bij lage instraling.',
      'Rendementsverlies door clipping is bij 120% overdimensionering meestal minder dan 1 tot 2% per jaar.',
      'Fabrieksspecificaties zoals Vdc max en Idc max mogen conform NEN 1010 niet overschreden worden.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Wat is de ideale DC/AC-verhouding voor een omvormer?', answer: 'Voor residentiële zonne-energiesystemen ligt een gebruikelijke en ideale DC/AC-verhouding doorgaans tussen de 110% en 130% (een verhouding van 1,1 tot 1,3).' },
      { question: 'Hoeveel opbrengstverlies treedt er op door clipping?', answer: 'Bij een DC/AC-verhouding van 120% is het rendementsverlies door clipping doorgaans nihil tot minimaal, vaak minder dan 1 tot 2% op jaarbasis. Dit wordt gecompenseerd in de randuren.' },
      { question: 'Is overdimensionering van een omvormer veilig volgens NEN 1010?', answer: 'Ja, mits het ontwerp binnen de fabrieksspecificaties van de omvormer blijft, met name de maximale ingangsspanning (Vdc max) en maximale ingangsstroom (Idc max).' },
    ],
  },
  {
    slug: 'brutomarge-berekenen-installatiebedrijf',
    readingTimeMinutes: 7,
    title: 'Brutomarge berekenen voor uw installatiebedrijf: zo onderbouwt u elke offerte',
    seoTitle: 'Brutomarge berekenen installatiebedrijf | Advies',
    description:
      'Brutomarge berekenen voor uw installatiebedrijf? Ontdek hoe u indirecte kosten, arbeid en materiaal correct opneemt in uw verduurzamingsofferte.',
    date: '2026-08-06',
    excerpt:
      'Het berekenen van een gezonde brutomarge op verduurzamingsprojecten vereist meer dan de inkoopprijs van hardware vermeerderen met een vaste opslag. Ontdek hoe u directe kosten, arbeid en risico\'s nauwkeurig onderbouwt.',
    tags: ['Bedrijfsvoering', 'Installatiebranche', 'Offerteproces'],
    keyPoints: [
      'Het verschil tussen brutomarge en nettowinst op verduurzamingsprojecten',
      'De vier verborgen kostenposten die de projectmarge ongemerkt uithollen',
      'Een stapsgewijze aanpak voor een waterdichte kostprijsberekening',
      'Hoe onderbouwde calculaties zorgen voor hogere conversie bij offertes',
    ],
    category: 'Subsidies',
    faq: [
      { question: 'Wat is het verschil tussen brutomarge en nettomarge voor een installatiebedrijf?', answer: 'De brutomarge is het verschil tussen de netto omzet van een project en de directe projectkosten (hardware, direct materiaal, onderaanneming en directe montage-uren). De nettomarge blijft over nadat ook alle indirecte bedrijfskosten, zoals bedrijfswagens, kantoorhuisvesting, softwarelicenties en algemene overhead, van de brutomarge zijn afgetrokken.' },
      { question: 'Welke directe kosten worden het vaakst vergeten bij het berekenen van de brutomarge?', answer: 'Installateurs vergeten in de calculatie frequent klein montagemateriaal, het inmeten en de technische engineering vooraf, steigerhuur of hoogwerkers, afvalafvoer, extra meters bekabeling, en een reservering voor garantie- en servicemomenten achteraf.' },
      { question: 'Hoe voorkomt u dat onvoorziene uren op de installatiedag de marge verdampen?', answer: 'Door voorafgaand aan de offerte een gestandaardiseerde inventarisatie uit te voeren van de meterkast, kabeltrajecten en daksituatie. Met duidelijke voorwaarden over stelposten en een normering op basis van eerdere projectdata voorkomt u dat extra werkuren ten laste van de brutomarge komen.' },
    ],
  },
  {
    slug: 'zonnepanelen-flats-appartementen-vve-installateurs',
    readingTimeMinutes: 4,
    title: 'Zonnepanelen op flats en appartementen: gids voor installateurs',
    seoTitle: 'Zonnepanelen op flats en VvE: NEN 1010-eisen',
    description:
      'Ontdek de technische, bouwkundige en juridische eisen voor het installeren van zonnepanelen op flats en appartementencomplexen. Inclusief NEN 1010 en...',
    date: '2026-08-07',
    excerpt:
      'Het installeren van zonnepanelen op flats en appartementen vereist specifieke kennis van VvE-besluitvorming, NEN 7250 windbelasting en NEN 1010 elektrische veiligheid.',
    tags: ['Zonnepanelen', 'VvE', 'NEN 1010', 'NEN 7250', 'Installatietechniek', 'Netcode Elektriciteit'],
    keyPoints: [
      'VvE-besluitvorming volgens de splitsingsakte en SVVE-subsidie zijn essentieel bij de projectvoorbereiding.',
      'Bouwkundige eisen conform NEN 7250 bepalen de wind- en dakbelasting op hoge gebouwen.',
      'Elektrische veiligheid volgens NEN 1010 vereist aandacht voor selectiviteit (16A / 3,68 kW), 3-fase fase-verdeling en somstromen.',
      'Saldering geldt uitsluitend per individuele kleinverbruikeraansluiting en is niet direct te verrekenen via een centrale VvE-meter.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Welke NEN-normen gelden voor zonnepanelen op flats?', answer: 'Voor de bouwkundige constructie en windbelasting geldt NEN 7250. Voor de elektrische installatie en bekabeling geldt de NEN 1010 norm voor laagspanningsinstallaties.' },
      { question: 'Hoe werkt de salderingsregeling bij een VvE?', answer: 'De wettelijke salderingsregeling geldt specifiek per individuele kleinverbruikeraansluiting achter de energiemeter. Dit kan niet zonder meer verrekend worden tussen een centrale VvE-meter en individuele appartementen.' },
      { question: 'Waarom is toetsing op somstromen belangrijk bij zonnepanelen?', answer: 'Wanneer het net én een omvormer op dezelfde groep kunnen invoeden, tellen de stromen bij elkaar op. Bij een situatie van 25A van het net en 16A van de omvormer (totaal 41A) kan een standaard 40A-aardlekschakelaar overbelast raken, wat een brandrisico vormt.' },
    ],
  },
  {
    slug: 'dynamische-energiecontracten-adviseren-sturing-batterij-warmtepomp',
    readingTimeMinutes: 4,
    title: 'Dynamisch energiecontract adviseren: slimme sturing van thuisbatterij en warmtepomp onderbouwen',
    seoTitle: 'Dynamisch Contract: Batterij en Warmtepomp Sturen',
    description:
      'Adviseer vakkundig over dynamische energiecontracten, de sturing van thuisbatterijen en warmtepompen via EMS, en NEN 1010 richtlijnen voor somstromen en...',
    date: '2026-08-07',
    excerpt:
      'Een onderbouwd advies over dynamische energiecontracten en de slimme sturing van thuisbatterijen en warmtepompen rust op kennis van uurprijzen, Energiemanagementsystemen (EMS) en installatieveiligheid conform NEN 1010.',
    tags: ['dynamisch energiecontract', 'thuisbatterij', 'warmtepomp', 'EMS', 'NEN 1010', 'netcongestie'],
    keyPoints: [
      'Uurprijzen (EPEX Spot) sturen thuisbatterij en warmtepomp via een slim Energiemanagementsysteem (EMS).',
      'Thermosche opslag in een buffer- of boilervat maakt efficiënte warmtepompsturing mogelijk bij lage stroomtarieven.',
      'Bij vermogens boven 3,68 kW / 16A is een 3-fase aansluiting vereist om fase-onbalans te voorkomen volgens de Netcode Elektriciteit.',
      'Controleer NEN 1010 normen op somstromen bij gelijktijdige invoeding om overbelasting van 40A-aardlekschakelaars te voorkomen.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Wat is nodig voor het aansturen van apparatuur op een dynamisch contract?', answer: 'Voor het aansturen van een thuisbatterij of warmtepomp op dynamische tarieven is een werkende slimme meter nodig, gecombineerd met een Energiemanagementsysteem (EMS) dat de apparaten aanstuurt op basis van de EPEX Spot- en EEX-beursprijzen.' },
      { question: 'Waar moet op worden gelet bij somstromen volgens NEN 1010?', answer: 'Bij gelijktijdige invoeding van netstroom en een omvormer/batterij op dezelfde aardlekschakelaar tellen de stromen op. Indien 25A van het net en 16A van de omvormer samenkomen (41A), kan een standaard 40A-aardlekschakelaar overbelast raken en brandgevaar opleveren.' },
    ],
  },
  {
    slug: 'dynamisch-energiecontract-sturing-thuisbatterij-warmtepomp',
    readingTimeMinutes: 4,
    title: 'Dynamische energiecontracten adviseren: hoe onderbouwt u de sturing van batterij en warmtepomp?',
    seoTitle: 'Dynamisch Energiecontract: Sturing Batterij en Warmtepomp',
    description:
      'Onderbouw uw advies over dynamische energiecontracten, thuisbatterijen en warmtepompen volgens NEN 1010, selectiviteit en de Netcode Elektriciteit.',
    date: '2026-08-08',
    excerpt:
      'Bij dynamische energiecontracten veranderen stroomtarieven per uur. Hoe onderbouwt u technisch en veilig de slimme sturing van thuisbatterijen en warmtepompen?',
    tags: ['Dynamisch energiecontract', 'Thuisbatterij', 'Warmtepomp', 'EMS', 'NEN 1010', 'Netcongestie', 'Netcode Elektriciteit'],
    keyPoints: [
      'Sturing op basis van EPEX Spot uurtarieven maximaliseert het nut van thuisbatterijen en warmtepompen.',
      'Het vervallen van de salderingsregeling per 1 januari 2027 stimuleert direct eigenverbruik.',
      'Een EMS voorkomt het afschakelen van de hoofdzekering via dynamische load balancing.',
      'Veiligheid conform NEN 1010 vereist speciale aandacht voor selectiviteit (max 16A op 1-fase), fase-onbalans en somstromen.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Is er subsidie beschikbaar voor de aanschaf van een thuisbatterij?', answer: 'Nee, voor kleinverbruikers in Nederland is er op dit moment geen landelijke ISDE- of andere aankoopsubsidie beschikbaar voor een thuisbatterij.' },
      { question: 'Wat is het maximale vermogen voor een 1-fase aansluiting bij 1x35A of 3x25A?', answer: 'Om de selectiviteit te waarborgen geldt in de praktijk een maximale afzekering van 16A per 1-fase groep, wat neerkomt op maximaal 3,68 kW (3.680 Watt).' },
      { question: 'Waarom is een 3-fase omvormer verplicht bij een vermogen groter dan 3,68 kW?', answer: 'Volgens de Netcode Elektriciteit moet invoeding boven de 16A (3,68 kVA) over meerdere fases worden verdeeld om fase-onbalans op het net te voorkomen.' },
      { question: 'Wat zijn somstromen en hoe beïnvloeden ze de veiligheid?', answer: 'Somstromen ontstaan wanneer stroom uit het net én van een omvormer op dezelfde groep of aardlekschakelaar invoeden. De stromen tellen bij elkaar op (bijv. 25A + 16A = 41A). Dit kan standaard 40A-aardlekschakelaars overbelasten en brandgevaar opleveren.' },
    ],
  },
  {
    slug: 'bodemgebonden-vs-lucht-water-warmtepomp-rendement',
    readingTimeMinutes: 3,
    title: 'Bodemgebonden warmtepomp vs. lucht-water warmtepomp: Meerkosten en rendement onderbouwd',
    seoTitle: 'Bodemgebonden vs Lucht-Water Warmtepomp: Rendement en Kosten',
    description:
      'Vergelijk bodemgebonden en lucht-water warmtepompen op SCOP-rendement, boorkosten, geluidsnormen (Bbl) en ISDE-subsidie voor een onderbouwde keuze.',
    date: '2026-08-08',
    excerpt:
      'Ontdek het verschil in seizoensrendement (SCOP 4,5-5,5+ vs 3,5-4,5), investeringskosten en regelgeving tussen een bodemgebonden en lucht-water warmtepomp.',
    tags: ['bodemgebonden warmtepomp', 'lucht-water warmtepomp', 'SCOP rendement', 'ISDE subsidie', 'passieve koeling', 'Bbl geluidsnormen'],
    keyPoints: [
      'Bodemgebonden warmtepompen behalen een hogere SCOP (4,5 tot 5,5+) dan lucht-water warmtepompen (3,5 tot 4,5).',
      'De broninfrastructuur van een bodem warmtepomp gaat 30 tot 50 jaar mee; de unit zelf 15 tot 20 jaar.',
      'Bodemgebonden systemen bieden de mogelijkheid tot energiezuinige passieve koeling.',
      'Buitenunits van lucht-water warmtepompen moeten op de perceelgrens voldoen aan Bbl-geluidsnormen (max. 40 dB(A) \'s nachts / 45 dB(A) overdag).',
      'Beide typen warmtepompen komen in aanmerking voor ISDE-subsidie.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Wat is het verschil in seizoensrendement (SCOP) tussen een bodem- en lucht-water warmtepomp?', answer: 'Een bodemgebonden warmtepomp behaalt gemiddeld een SCOP van 4,5 tot 5,5 of hoger. Een lucht-water warmtepomp behaalt een gemiddelde SCOP van 3,5 tot 4,5.' },
      { question: 'Hoe lang gaat een bodembron mee?', answer: 'De bodembron en de bijbehorende bronlussen hebben een verwachte levensduur van 30 tot 50 jaar. De warmtepompunit zelf gaat bij beide systemen circa 15 tot 20 jaar mee.' },
      { question: 'Welke geluidsnormen gelden voor een buitenunit van een lucht-water warmtepomp?', answer: 'Volgens het Besluit bouwwerken leefomgeving (Bbl) mag de geluidsdruk van een buitenunit op de perceelgrens maximaal 40 dB(A) bedragen tijdens de nachtperiode en maximaal 45 dB(A) overdag.' },
    ],
  },
  {
    slug: 'pvt-panelen-combineren-met-warmtepomp-rendement-eisen',
    readingTimeMinutes: 3,
    title: 'PVT-panelen combineren met een warmtepomp: Zo onderbouwt u de jaarrond efficiëntie voor uw klant',
    seoTitle: 'PVT-panelen en Warmtepomp Combineren: Rendement en Eisen',
    description:
      'Hoe onderbouwt u de efficiëntie van een PVT-paneel met warmtepomp? Ontdek de werking, NTA 8800-borging, BBL-geluidseisen, NEN 1010-inpassing en...',
    date: '2026-08-09',
    excerpt:
      'Het combineren van PVT-panelen met een water-water warmtepomp biedt een geïntegreerde oplossing voor elektriciteit en warmte. Ontdek de onderbouwing voor jaarrond efficiëntie, NTA 8800, BBL-geluidseisen en NEN 1010-richtlijnen.',
    tags: ['PVT-panelen', 'Warmtepomp', 'NTA 8800', 'NEN 1010', 'BBL geluidseisen', 'ISDE subsidie'],
    keyPoints: [
      'Jaarrond energiewinning uit zonlicht, omgevingslucht, wind en condensatiewarmte (ook \'s nachts en in de winter).',
      'Geen geluidsoverlast door ontbreken van een draaiende buitenunit met ventilator (voldoet eenvoudig aan BBL).',
      'Gestandaardiseerde rekenmethodiek binnen NTA 8800 voor BENG-indicatoren.',
      'Elektrische inpassing volgens NEN 1010 en Netcode (fase-onbalans, selectiviteit en beveiliging tegen somstromen).',
      'ISDE-subsidie mogelijk bij opname op de RVO apparatenlijst.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Hoe leveren PVT-panelen warmte in de winter en \'s nachts?', answer: 'PVT-panelen benutten naast direct zonlicht ook omgevingslucht, wind en condensatiewarmte als bron voor de water-water warmtepomp, waardoor ze ook zonder zonlicht en bij lage temperaturen warmte leveren.' },
      { question: 'Voldoet een PVT-warmtepompsysteem aan de BBL geluidseisen?', answer: 'Ja, doordat een PVT-systeem geen draaiende buitenunit met een ventilator heeft, veroorzaakt het geen geluidsoverlast en voldoet het doorgaans eenvoudig aan de BBL-normen.' },
      { question: 'Hoe worden de prestaties van PVT-panelen meegenomen in de BENG-berekening?', answer: 'De werking en het rendement van PVT-panelen als bron voor warmtepompen zijn gestandaardiseerd binnen de NTA 8800 rekenmethodiek voor het bepalen van de BENG-indicatoren.' },
      { question: 'Welke NEN 1010-eisen gelden voor de elektrische installatie van PVT met een warmtepomp?', answer: 'Belangrijke richtlijnen betreffen de fasering (3-fase bij warmtepompen >5 kW en omvormers >3,68 kW), selectiviteit bij afzekering, beveiliging tegen somstromen bij gelijktijdige invoeding en het eventueel toepassen van een EMS.' },
      { question: 'Is er ISDE-subsidie beschikbaar voor een warmtepomp met PVT-bron?', answer: 'Ja, warmtepompen met een PVT-bron komen in aanmerking voor de ISDE-subsidie, mits de specifieke combinatie of de warmtepomp vermeld staat op de goedgekeurde apparatenlijst van de RVO.' },
    ],
  },
  {
    slug: 'svoh-subsidie-verduurzaming-huurwoningen-advies',
    readingTimeMinutes: 2,
    title: 'SVOH-subsidie voor verduurzaming van huurwoningen: adviesgids',
    seoTitle: 'SVOH-subsidie Huurwoningen Advies & Voorwaarden',
    description:
      'Advies over de SVOH-subsidie voor verduurzaming van huurwoningen. Ontdek de voorwaarden, vergoedingen tot € 6.000 per woning en maatwerk energieadvies.',
    date: '2026-08-10',
    excerpt:
      'De Subsidie verduurzaming en onderhoud huurwoningen (SVOH) ondersteunt particuliere en zakelijke verhuurders tot en met 31 december 2029. Bekijk alle voorwaarden en vergoedingen.',
    tags: ['SVOH-subsidie', 'Verduurzaming huurwoningen', 'Energieadvies', 'Warmtepomp', 'Isolatie'],
    keyPoints: [
      'Maximaal € 6.000 subsidie per woning en € 400.000 per aanvrager',
      'Aanvragen mogelijk tot en met 31 december 2029 na uitvoering en betaling',
      'Geldt voor isolatie, hoogrendementsglas, warmtepompen en zonneboilers',
      '50% vergoeding voor maatwerk energieadvies (max. € 400 per woning)',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Wat is het maximale SVOH-subsidiebedrag per woning?', answer: 'Het subsidiebedrag bedraagt in de basis maximaal € 6.000 per huurwoning, met een totaalmaximum van € 400.000 per aanvrager.' },
      { question: 'Wanneer kan de SVOH-subsidie worden aangevraagd?', answer: 'De subsidie moet worden aangevraagd nadat de verduurzamingsmaatregelen zijn uitgevoerd en betaald. De regeling loopt tot en met 31 december 2029.' },
      { question: 'Is er ook subsidie beschikbaar voor energieadvies?', answer: 'Ja, voor een maatwerk energieadvies door een gecertificeerd adviseur wordt 50% van de advieskosten vergoed, tot een maximum van € 400 per woning.' },
    ],
  },
  {
    slug: 'omvormeruitval-253v-kabeltraject-offerte',
    readingTimeMinutes: 4,
    title: 'Spanningsopdrijving en omvormeruitval (253V): Kabeltraject onderbouwen in de offerte',
    seoTitle: 'Omvormeruitval (253V) Voorkomen: Kabeltraject Offerte',
    description:
      'Hoe voorkomt u omvormeruitval bij 253V? Ontdek NEN 1010 richtlijnen voor kabeltrajecten, aderdoorsnede en faseverdeling in uw offerte.',
    date: '2026-08-10',
    excerpt:
      'Omvormeruitval bij 253 Volt ontstaat vaak door spanningsopdrijving in het AC-kabeltraject. Lees hoe u de juiste aderdoorsnede en NEN 1010-normen onderbouwt in uw offerte.',
    tags: ['omvormeruitval', '253V', 'spanningsopdrijving', 'NEN 1010', 'kabeltraject', 'zonnepanelen'],
    keyPoints: [
      'Spanningsopdrijving binnenshuis valt onder de verantwoordelijkheid van de installateur en pandeigenaar.',
      'Omvormers schakelen volgens EN 50549-1 en de Netcode Elektriciteit uit bij meer dan 253V (230V + 10%).',
      'Conform NEN 1010 mag de spanningsstijging in het kabeltraject maximaal 1% (ca. 2,3V) bedragen.',
      'Gebruik van grotere aderdoorsnedes (zoals 4 mm² of 6 mm²) verlaagt de kabelweerstand en helpt uitval te voorkomen.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Waarom valt een omvormer uit bij 253 Volt?', answer: 'Volgens norm EN 50549-1 en de Netcode Elektriciteit moet een omvormer automatisch uitschakelen bij meer dan 253V (230V + 10%) om het net en apparatuur te beschermen.' },
      { question: 'Wie is verantwoordelijk voor spanningsopdrijving binnenshuis?', answer: 'De netbeheerder garandeert enkel de spanning tot de energiemeter (207V - 253V). Spanningsopdrijving achter de meter door kabelweerstand valt onder de verantwoordelijkheid van de installateur en pandeigenaar.' },
      { question: 'Hoeveel spanningsstijging staat NEN 1010 toe?', answer: 'NEN 1010 adviseert een maximale spanningsstijging en spanningsverlies van 1% (ongeveer 2,3V) in het kabeltraject tussen de omvormer en de meterkast.' },
    ],
  },
  {
    slug: 'infraroodverwarming-combineren-met-warmtepomp',
    readingTimeMinutes: 3,
    title: 'Infraroodverwarming combineren met warmtepompen: Een realistisch energieprofiel',
    seoTitle: 'Warmtepomp met Infrarood Combineren: Mogelijk?',
    description:
      'Is een warmtepomp combineren met infraroodpanelen verstandig? Lees alles over de COP, netbelasting, ISDE-subsidie en efficiënte bijverwarming.',
    date: '2026-08-11',
    excerpt:
      'Het combineren van een warmtepomp met infraroodpanelen past binnen een realistisch energieprofiel mits de warmtepomp dient als basisverwarming en infrarood als bijverwarming. Lees hoe dit werkt qua COP en netbelasting.',
    tags: ['warmtepomp', 'infraroodverwarming', 'energieprofiel', 'ISDE-subsidie', 'netbelasting'],
    keyPoints: [
      'Warmtepompen behalen een COP van 3 tot 5, terwijl infraroodpanelen een COP van 1 hebben.',
      'Infraroodverwarming is energetisch geschikt als bijverwarming in kortstondig gebruikte ruimtes.',
      'Elektrisch opgenomen vermogen bepaalt de netbelasting op een 3x25A-aansluiting.',
      'ISDE-subsidie is beschikbaar voor warmtepompen, maar niet voor infraroodpanelen.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Is infrarood geschikt als hoofdverwarming naast een warmtepomp?', answer: 'Nee, vanwege de COP van 1 leidt infrarood als hoofdverwarming tot een aanzienlijk hoger stroomverbruik en hogere energiekosten. Een warmtepomp (COP 3 tot 5) is energetisch veel efficiënter als basisverwarming.' },
      { question: 'Kun je ISDE-subsidie krijgen voor infraroodpanelen?', answer: 'Nee, er is geen landelijke ISDE-subsidie beschikbaar voor infraroodpanelen. Voor warmtepompen kun je wel gebruikmaken van de ISDE-subsidie.' },
      { question: 'Hoe voorkom je overbelasting van de groepenkast bij gelijktijdig gebruik?', answer: 'Door inzet van een Home Energy Management System (EMS) kan de elektrische belasting via load balancing dynamisch geregeld worden. Dit voorkomt piekstromen en het uitslaan van de hoofdzekering bij een standaard 3x25A-aansluiting.' },
    ],
  },
  {
    slug: 'ventilatiewarmtepomp-adviseren-besparing-onderbouwen',
    readingTimeMinutes: 2,
    title: 'Ventilatiewarmtepomp adviseren: onderbouw besparing en energieprestatie',
    seoTitle: 'Ventilatiewarmtepomp Advies & Besparing',
    description:
      'Ontdek hoe u de besparing van een ventilatiewarmtepomp bij type C ventilatie onderbouwt. Lees alles over NTA 8800, BENG-indicatoren en ISDE-subsidie.',
    date: '2026-08-12',
    excerpt:
      'Adviseert u over de verduurzaming van woningen met mechanische ventilatie? Een ventilatiewarmtepomp levert 200 tot 500 m³ gasbesparing per jaar op.',
    tags: ['ventilatiewarmtepomp', 'mechanische ventilatie', 'NTA 8800', 'ISDE subsidie', 'energieprestatie'],
    keyPoints: [
      'Gasbesparing van 200 tot 500 m³ aardgas per jaar in een gemiddelde eengezinswoning.',
      'BENG 2-indicator daalt en BENG 3-indicator stijgt binnen de NTA 8800 rekenmethode.',
      'Systeem benut afgevoerde lucht van circa 20 °C voor een constant hoog rendement.',
      'Voldoen aan minimaal ventilatiedebiet en vermelding op de RVO-meldcodelijst (ISDE) vereist.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Hoeveel gas bespaart een ventilatiewarmtepomp gemiddeld?', answer: 'In een gemiddelde eengezinswoning met mechanische ventilatie bespaart een ventilatiewarmtepomp circa 200 tot 500 m³ aardgas per jaar.' },
      { question: 'Wat is het effect van een ventilatiewarmtepomp op BENG en NTA 8800?', answer: 'Binnen de NTA 8800 rekenmethode verlaagt een ventilatiewarmtepomp de BENG 2-indicator (fossiel primair energiegebruik) en verhoogt deze de BENG 3-indicator (aandeel hernieuwbare energie).' },
      { question: 'Wanneer komt een ventilatiewarmtepomp in aanmerking voor ISDE-subsidie?', answer: 'Voor de ISDE-subsidie moet het specifieke type ventilatiewarmtepomp vermeld staan op de RVO-meldcodelijst en moet de installatie worden uitgevoerd door een deskundige installateur.' },
    ],
  },
  {
    slug: 'pv-surplus-laden-rendement-slimme-laadpaal',
    readingTimeMinutes: 3,
    title: 'Laden op zonne-energie: hoe onderbouwt u het rendement van een slimme laadpaal?',
    seoTitle: 'Rendement Slimme Laadpaal met PV-Surplus Laden',
    description:
      'Onderbouw het rendement van een slimme laadpaal met PV-surplus laden. Verhoog zelfconsumptie naar 60-70% en voorkom terugleverkosten vanaf 2027.',
    date: '2026-08-12',
    excerpt:
      'Met PV-surplus laden stijgt het lokaal verbruik van zonnestroom naar 60% tot 70%. Ontdek de technische onderbouwing, IEC 61851-1 normen en netbelasting.',
    tags: ['pv-surplus laden', 'slimme laadpaal', 'zonne-energie', 'salderingsregeling', 'dynamic load balancing', 'laadpaal installatie'],
    keyPoints: [
      'Zelfconsumptie van zonnestroom stijgt van 30% naar 60% - 70% met een slimme laadpaal',
      'Stopzetting van de salderingsregeling per 1 januari 2027 vereist meer lokaal verbruik',
      'Minimaal startvermogen voor PV-laden is 1,4 kW (1-fase, 6A) conform IEC 61851-1',
      'Automatische faseschakeling maakt opschaling naar 3-fase laden (tot 11 kW of 22 kW) mogelijk',
      'Dynamic Load Balancing en EMS voorkomen overbelasting van een 3x25A hoofdaansluiting',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Hoeveel stijgt de zelfconsumptie door slim te laden op zonnestroom?', answer: 'Door de inzet van slimme sturing op de laadpaal kan de zelfconsumptie van eigen zonnestroom stijgen van circa 30% naar 60% tot 70%.' },
      { question: 'Wat is de minimale stroomsterkte voor laden op zonnestroom?', answer: 'Conform IEC 61851-1 geldt voor een elektrisch voertuig een minimale stroomsterkte van 6 Ampère per fase, wat bij 1-fase overeenkomt met circa 1,4 kW surplus.' },
      { question: 'Waarom is dynamische sturing via de P1-poort belangrijk?', answer: 'Via de P1-poort meet de laadpaal in realtime hoeveel zonnestroom er over is, waardoor het laadvermogen direct op de actuele overproductie kan worden afgestemd.' },
    ],
  },
  {
    slug: 'zonnepanelen-installatie-uitbreiden-omvormer-regels',
    readingTimeMinutes: 4,
    title: 'Zonnepanelen-installatie uitbreiden: impact en regels',
    seoTitle: 'Zonnepanelen uitbreiden: omvormer & NEN 1010 regels',
    description:
      'Wilt u uw zonnepanelen uitbreiden? Ontdek de impact op uw omvormer, overdimensioneren, clipping en de NEN 1010 en Netcode richtlijnen.',
    date: '2026-08-13',
    excerpt:
      'Het uitbreiden van uw zonnepanelen heeft direct invloed op uw omvormer, bekabeling en groepenkast. Lees alles over overdimensioneren, clipping en NEN 1010 regels.',
    tags: ['zonnepanelen', 'omvormer', 'NEN 1010', 'clipping', 'groepenkast', 'energieleveren.nl'],
    keyPoints: [
      'Overdimensioneren van de omvormer geeft slechts 1 tot 3% jaarlijks verlies door clipping en zorgt voor snellere opstart bij lage instraling.',
      'Conform NEN 1010 mag de spanningsstijging tussen omvormer en meterkast maximaal 1% bedragen.',
      'Boven 16A (3,68 kW) is invoeding over meerdere fases verplicht via een 3-fase omvormer.',
      'Somstromen kunnen aardlekschakelaars overbelasten (bijv. 25A net + 16A omvormer = 41A op een 40A RCD).',
      'Aanmelden van de uitbreiding via energieleveren.nl is wettelijk verplicht.',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Wat is het effect van het overdimensioneren van een omvormer?', answer: 'Overdimensioneren betekent dat het DC-vermogen van de zonnepanelen hoger is dan het nominale vermogen van de omvormer. Dit leidt op piekmomenten tot \'clipping\', wat op jaarbasis gemiddeld minder dan 1 tot 3% verlies geeft, terwijl de omvormer bij lage instraling sneller opstart.' },
      { question: 'Waarom schakelt een omvormer uit bij 253 volt?', answer: 'Volgens de Netcode moet een omvormer automatisch uitschakelen wanneer de netspanning door overproductie stijgt boven de 253 volt (230V + 10%) om de elektrische installatie te beschermen.' },
      { question: 'Wanneer is een 3-fase omvormer verplicht?', answer: 'Invoeding boven de 16A (3,68 kVA) moet volgens de Netcode over meerdere fases worden verdeeld. Vanaf een omvormervermogen groter dan circa 3,68 kW (in de praktijk vanaf 4 kW) is een 3-fase omvormer vereist.' },
      { question: 'Wat zijn somstromen en waarom vormen ze een risico?', answer: 'Wanneer netstroom en omvormerstroom samenkomen op één aardlekschakelaar (zoals 25A + 16A = 41A), kan een standaard 40A-component overbelast raken. Dit zorgt voor brandgevaar als de bedrading hier niet op berekend is.' },
      { question: 'Moet ik het uitbreiden van mijn zonnepanelen aanmelden?', answer: 'Ja, bij elke uitbreiding van de zonnepaneelinstallatie waarbij het totale omvormervermogen verandert, is registratie op energieleveren.nl wettelijk verplicht.' },
    ],
  },
  {
    slug: 'oost-west-zonnepanelen-opbrengst-zelfconsumptie',
    readingTimeMinutes: 3,
    title: 'Oost-West Zonnepanelen: Opbrengst, Zelfconsumptie en Netbelasting',
    seoTitle: 'Oost-West Zonnepanelen: Opbrengst & Voordelen',
    description:
      'Ontdek de voordelen van een oost-west opstelling van zonnepanelen: een vlakkere productiecurve, hogere zelfconsumptie en minder netbelasting.',
    date: '2026-08-14',
    excerpt:
      'Een oost-west opstelling van zonnepanelen levert een vlakkere productiecurve op en verhoogt de directe zelfconsumptie. Ontdek de technische en praktische voordelen.',
    tags: ['zonnepanelen', 'oost-west opstelling', 'zelfconsumptie', 'omvormer', 'netbelasting'],
    keyPoints: [
      'Vlakkere en bredere productiecurve over de gehele dag',
      'Hogere directe zelfconsumptie vergeleken met een zuid-opstelling',
      'Minder piekbelasting op het net en kleiner risico op omvormeruitval boven 253V',
      'Hogere dakbenutting op platte daken en mogelijke onderdimensionering van de omvormer',
    ],
    category: 'Kennisbank',
    faq: [
      { question: 'Hoeveel minder opbrengst geeft een oost-west opstelling t.o.v. zuid?', answer: 'Een oost-west opstelling levert per geïnstalleerde Wattpiek op jaarbasis doorgaans circa 10 tot 20 procent minder totale elektriciteit op dan een optimale zuid-oriëntatie onder een hoek van 35 graden.' },
      { question: 'Waarom zorgt een oost-west opstelling voor meer zelfconsumptie?', answer: 'Door stroom op te wekken tijdens de ochtend- en namiddaguren sluit de opbrengst beter aan op het verbruiksprofiel van een standaard huishouden, waardoor de directe zelfconsumptie stijgt ten opzichte van een zuid-opstelling.' },
      { question: 'Kan de omvormer lichter worden uitgevoerd bij oost-west?', answer: 'Ja, doordat de twee dakvlakken niet gelijktijdig hun maximale piekvermogen bereiken, kan de omvormer worden ondergedimensioneerd ten opzichte van het totale Wattpiek-vermogen van de panelen.' },
    ],
  },
];
