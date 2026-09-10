## SEER en SCOP — definitie
SEER (Seasonal Energy Efficiency Ratio) en SCOP (Seasonal Coefficient of Performance) zijn **seizoensrendementen** voor koeling resp. verwarming door een airco/warmtepomp-systeem, vastgelegd in EN 14825. Ze verschillen van de statische EER/COP: EER/COP meten het rendement op één vast testpunt (nominale buiten-/binnentemperatuur, vol vermogen), terwijl SEER/SCOP het rendement middelen over een heel stookseizoen — inclusief deellastwerking, opstart/stop-verliezen, ontdooicycli en een verdeling van buitentemperaturen (temperatuurbins) die representatief is voor een Europese klimaatzone.

## Klimaatzones (EN 14825)
EN 14825 definieert drie referentie-klimaatzones voor de SCOP-bepaling: **kouder** (Helsinki), **gemiddeld** (Straatsburg) en **warmer** (Athene). Een SCOP-waarde op een Nederlands product-datasheet is vrijwel altijd de "gemiddeld"-klimaatzone (Straatsburg) — vergelijk nooit SCOP-waarden zonder te controleren of ze op dezelfde klimaatzone zijn bepaald.

## Jaarlijks energieverbruik berekenen
De EU Ecodesign-methodiek (Verordening 2016/2281) berekent het jaarlijkse elektriciteitsverbruik voor koeling als:
**Jaarverbruik (kWh) = Nominale koellast (kW) × referentie-vollasturen ÷ SEER**
Voor verwarming geldt dezelfde opzet met de benodigde warmteafgifte en SCOP. De referentie-vollasturen liggen vast per klimaatzone/toepassing in de verordening zelf — dit is geen vrij te kiezen aanname.

## Nominale capaciteit vs. praktijkrendement
De genormeerde nominale koelcapaciteit (Prated) wordt gemeten bij vaste testcondities (buiten 35°C / binnen 27°C voor koeling, EN 14825). Het werkelijke jaarverbruik wijkt hiervan af door: isolatiegraad van de woning, mate van over-/onderdimensionering t.o.v. de werkelijke koel-/warmtevraag, inverter- vs. on/off-technologie (inverters hebben een beter deellastrendement), en afwijkende buitentemperaturen t.o.v. de EN 14825-referentiereeks.

## Single-split versus multi-split: vergelijking en zonebenadering
- **Single-split:** één binnenunit gekoppeld aan één eigen buitenunit.
  - Voordelen: hoogste seizoensrendement (SEER), kortere koudemiddelleidingen met minimaal drukverlies, optimale deellastmodulatie per individuele ruimte, en volledige redundantie (storing raakt slechts één zone).
  - Aandachtspunt: vereist een aparte montageplek op gevel of dak per gekoelde ruimte.
- **Multi-split:** één centrale buitenunit gekoppeld aan 2 tot 5 binnenunits.
  - Voordelen: slechts één buitenunit op dak of gevel, één centrale dak- of geveldoorvoer, esthetisch compacter bij meerdere kamers.
  - Aandachtspunt: langere koudemiddelleidingen, complexere inbedrijfstelling, en lager deellastrendement wanneer slechts één kleine binnenunit (bijv. 2,0 kW slaapkamer) koeling vraagt terwijl een zwaardere buitenunit (bijv. 7,0 kW) op zijn minimale modulatiegrens moet draaien.

## Benodigd koelvermogen per zone dimensioneren
- **Vuistregel woningbouw:** 30 tot 50 Watt koelvermogen per m³ ruimtevolume.
  - 30 W/m³: goed geïsoleerd (label A/B), weinig direct glas op zuid of buitenzonwering aanwezig.
  - 40 W/m³: gemiddeld geïsoleerd, normaal glasoppervlak.
  - 50 W/m³: matig geïsoleerd, plat dak, veel raamoppervlak op zuid/west zonder screens.
- **Gelijktijdigheidsfactor bij multi-split (diversiteit):** in woningen valt de maximale koellast van de woonkamer (overdag/namiddag) zelden samen met de slaapkamers ('s nachts). De buitenunit van een multi-split hoeft daarom doorgaans niet 100% van de som van alle binnenunit-pieken te dekken; een dimensioneringsverhouding van 80% tot 100% tussen buitenunit en de opgetelde binnencapaciteit is gebruikelijk conform fabrikanttabellen.

## Elektrische aansluiting en groepenkast (NEN 1010 vs. Netcode Elektriciteit)
- **Airco's zijn stroomafnemers (verbruikers), géén invoeders.**
- **Belangrijk onderscheid met zonnepanelen:** de verplichting uit de Netcode Elektriciteit om vermogens boven 16A (3,68 kVA) over meerdere fasen te verdelen ter voorkoming van fase-onbalans geldt **uitsluitend voor invoeding (teruglevering door PV of ontladende batterijen)** op het openbare net. Deze invoedings-onbalanseis is NIET van toepassing op residentiële airco-afname.
- **Aansluiting volgens NEN 1010:**
  - Single-split en lichte multi-split buitenunits (nominaal koelvermogen tot ~5,0 kW): elektrisch opgenomen vermogen is door de hoge SEER typisch slechts 0,6 tot 1,5 kWe. Dit wordt aangesloten op een standaard 1-fase eindgroep van 16A (230V, max 3.680W continue belasting).
  - Middelzware multi-split buitenunits (tot ~7,0 à 8,0 kW koeling): elektrisch opgenomen vermogen ligt tussen 1,8 en 2,5 kWe. Past op een 1-fase 16A groep mits selectiviteit gewaarborgd is.
  - Zware multi-split (boven ~10 kW koelvermogen): kan fabrikantafhankelijk als 1-fase of 3-fase (krachtstroom 400V, 3x16A) geleverd worden om overbelasting van een enkele fase en de hoofdzekering (3x25A) te voorkomen conform normale NEN 1010 belastingverdeling.
  - **Verwar nooit thermisch koelvermogen (kWth) met elektrisch vermogen (kWe):** elektrisch vermogen (kWe) = koelvermogen (kWth) gedeeld door SEER/EER. Een 3,5 kW airco verbruikt bij vollast circa 1,0 kW elektriciteit (circa 4,3 Ampère op 230V).

Bron: EN 14825 / EU Ecodesign-verordening 2016/2281 / NEN 1010
