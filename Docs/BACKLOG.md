# Product Backlog — EnerCalculatie SaaS
## Product Owner Refinement & Sprint Planning
### Inclusief aanbevelingen Consultancy Audit Report + Multi-Tenant SaaS Uitwerking

**Versie:** 3.0 — 04-06-2026  
**Audit score:** 7,8/10 — Go voor pilot · Conditional Go voor productie  
**Bron:** EnerCalculatie Consultancy Audit & Product Review + interne backlog  
**Architectuur:** Zie [MULTITENANT_ARCHITECTURE.md](MULTITENANT_ARCHITECTURE.md)

---

## Wat is al gebouwd (Done — Sprint 0)

| Functionaliteit | Status |
|----------------|--------|
| AI document scan (OCR) via Gemini/OpenAI/Claude | ✅ Live |
| Energieprofiel invullen en berekenen | ✅ Live |
| Zonnepaneeladvies met deterministisch rekenmodel | ✅ Live |
| Thuisbatterijadvies | ✅ Live |
| ROI-berekening 25 jaar met salderingsregeling | ✅ Live |
| Concept adviesrapport afdrukken als PDF | ✅ Live |
| Deelbare rapport-URL voor klanten | ✅ Live |
| Dossieroverzicht met zoeken, filteren, archiveren | ✅ Live |
| RBAC: advisor / tenant_admin / superadmin | ✅ Live |
| Configureerbare energietarieven per tenant | ✅ Live |
| Configureerbare installatieprijzen per tenant | ✅ Live |
| GDPR: data-export + account-verwijdering | ✅ Live |
| Sentry error monitoring | ✅ Live |
| Staging omgeving | ✅ Live |
| ROI aannames transparant (IRR, NPV, UI tooltips) | ✅ Live (Sprint 1) |
| BTW-teruggave disclaimers & indicaties | ✅ Live (Sprint 1) |
| Teamleden uitnodigen via e-mail (RBAC admin) | ✅ Live (Sprint 2) |
| Gebruikersoverzicht (naam, rol, laatste inlog, beheer) | ✅ Live (Sprint 2) |
| Rol toekennen (advisor / tenant_admin) | ✅ Live (Sprint 2) |

---

## Audit CRITICAL — Onmiddellijk actie vereist

De audit identificeert twee CRITICAL risico's. Dit zijn de enige blokkades voor commerciële inzet.

### 🔴 CRITICAL 1 — ROI-transparantie

**Probleem:** Financiële claims in het rapport zijn niet volledig herleidbaar. Een adviseur of klant kan niet controleren hoe de terugverdientijd berekend is.

**Oplossing (Sprint 1):**
- Aannames-sectie toevoegen aan rapport (welke tarieven, inflatiefactor, saldering gebruikt)
- "Hoe berekend?" tooltip per ROI-getal
- IRR en NPV toevoegen naast terugverdientijd

---

### 🔴 CRITICAL 2 — Financiële claims & juridische disclaimer

**Probleem:** BTW-teruggave voor thuisbatterijen wordt gepresenteerd als feit. Dit is juridisch riskant — het is een indicatie, geen garantie.

**Oplossing (DIRECT — voor klantbezoek):**
- BTW-teruggave label wijzigen naar "Indicatieve BTW-teruggave*"
- Financiële disclaimer toevoegen onderaan rapport: "Berekeningen zijn indicatief. Tarieven en regelgeving kunnen wijzigen. Geen rechten ontleend."

---

## Risicomatrix (uit audit)

| Niveau | Item | Sprint |
|--------|------|--------|
| 🔴 CRITICAL | ROI-transparantie | ✅ Opgelost |
| 🔴 CRITICAL | Financiële claims / BTW-disclaimer | ✅ Opgelost |
| � HIGH | BTW-logica thuisbatterij | Sprint 1 |
| 🟠 HIGH | Validatie bouwjaar vs. energielabel | Sprint 1 |
| 🟠 HIGH | Productspecificaties in berekeningen | Sprint 2 |
| 🟡 MEDIUM | OCR confidence score | **Sprint 3 (Nu)** |
| 🟡 MEDIUM | Bronvermelding berekeningen (PVGIS) | Sprint 5 |
| 🟢 LOW | Tekstoptimalisaties | Sprint 9+ |

---

## Sprint Planning

### ⚡ Vandaag (voor klantbezoek) — Quick Wins

**Geen sprint — maximaal 2 uur werk:**

| Taak | Omschrijving |
|------|-------------|
| Financiële disclaimer | Tekst toevoegen onderaan rapport en gedeeld rapport |
| BTW-teruggave indicatief | Label wijzigen + asterisk + toelichting |

---

### Sprint 1 — Kwaliteitsverbetering Kern (Week 1)

**Sprintdoel:** De CRITICAL en HIGH audit-bevindingen oplossen zodat het platform commercieel verantwoord ingezet kan worden.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| ~~ROI aannames transparant maken (tooltips + aannames-sectie)~~ | Audit CRITICAL | ✅ Done | — |
| ~~IRR en NPV toevoegen aan ROI-weergave~~ | Audit CRITICAL | ✅ Done | — |
| Invoervalidatie met waarschuwingen (onlogische combinaties) | Audit HIGH + UX | 🔴 Hoog | 1 dag |
| CO2-besparing tonen in rapport en ROI | Audit rapport | 🟠 Middel | 1 dag |

**Acceptatiecriteria ROI-transparantie:**
- Elke ROI-getal heeft een tooltip: "Berekend op basis van: stroomtarief €X/kWh, inflatie 2,5%/jaar, saldering X%"
- Aannames-sectie onderaan rapport: gebruikte tarieven, jaar, salderingspercentage
- IRR en NPV zichtbaar naast terugverdientijd

**Acceptatiecriteria Invoervalidatie:**
- Waarschuwing bij bouwjaar >2010 met energielabel G ("onwaarschijnlijke combinatie")
- Waarschuwing bij 0 panelen in offerte-tab
- Waarschuwing als jaarverbruik <500 kWh (waarschijnlijk fout)

**Definition of Done:** Audit CRITICAL issues opgelost · Getest op staging · Akkoord PO · Live op productie

---

### Sprint 2 — Gebruikersbeheer (Week 2)

**Sprintdoel:** Tenant admins kunnen medewerkers uitnodigen en beheren zonder tussenkomst van systeembeheerder.

**Afhankelijkheid:** E-mailservice vereist (aanbeveling: Resend.com).

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Gebruikers uitnodigen via e-mail | 🔴 Hoog | 3 dagen |
| Gebruikersoverzicht: naam, rol, laatste inlog, status | 🔴 Hoog | 1 dag |
| Gebruiker deactiveren / heruitnodigen | 🔴 Hoog | 0,5 dag |
| Rol toekennen via UI (advisor / tenant_admin) | 🔴 Hoog | 0,5 dag |

**Acceptatiecriteria:**
- Supabase `inviteUserByEmail()` → activatielink per e-mail
- Gebruiker direct zichtbaar in overzicht na uitnodiging
- Deactiveren blokkeert login onmiddellijk
- Laatste inlogdatum zichtbaar via Supabase Auth admin API

---

### Sprint 3 — Pandgegevens Verrijking & OCR Kwaliteit (Week 3)

**Sprintdoel:** Pandgegevens zijn completer en de OCR-module geeft adviseurs vertrouwen in de uitgelezen gegevens.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| Daktype toevoegen aan intake (plat/schuin/mansarde) | Audit Pandgegevens | 🔴 Hoog | 0,5 dag |
| Woonoppervlak toevoegen aan intake | Audit Pandgegevens | 🔴 Hoog | 0,5 dag |
| BAG-verrijking: auto-fill via postcode + huisnummer | Audit Pandgegevens | 🟠 Middel | 2 dagen |
| OCR confidence score tonen na scan | Audit OCR | 🟠 Middel | 1 dag |
| Handmatige validatievlag bij lage OCR-betrouwbaarheid | Audit OCR | 🟠 Middel | 1 dag |

**Acceptatiecriteria BAG-verrijking:**
- Na invoer postcode + huisnummer: automatisch bouwjaar, woonoppervlak, woningtype ophalen via BAG API (gratis, overheid)
- Gebruiker kan automatisch ingevulde waarden overschrijven

**Acceptatiecriteria OCR confidence:**
- Elke uitgelezen waarde toont een betrouwbaarheidsindicator (hoog/middel/laag)
- Bij lage score: oranje waarschuwing "Controleer deze waarde"

---

### Sprint 4 — Productdatabase (Week 4)

**Sprintdoel:** Installateurs gebruiken hun eigen productcatalogus in berekeningen zodat offertes aansluiten op het werkelijke aanbod.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| Producten beheren (toevoegen, wijzigen, archiveren) | Backlog + Audit | 🔴 Hoog | 2 dagen |
| Producten selecteren in berekeningen | Backlog + Audit HIGH | 🔴 Hoog | 2 dagen |
| Productmerk en garantie tonen in rapport | Audit Rapport | 🟠 Middel | 1 dag |

**Acceptatiecriteria:**
- Producten hebben: naam, merk, vermogen (Wp), prijs excl. BTW, type, garantietermijn
- Selectie in zonnepanelen-tab → Wp overgenomen in berekening
- Merk en garantie automatisch zichtbaar in offerte

---

### Sprint 5 — ROI Uitbreiding & Rapport Verbetering (Week 5)

**Sprintdoel:** Het rapport is professioneler en de ROI-berekening is uitgebreider en transparanter voor kritische kopers.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| Scenarioanalyse: pessimistisch / realistisch / optimistisch | Audit ROI CRITICAL | 🔴 Hoog | 2 dagen |
| Gevoeligheidsanalyse (effect tariefwijziging op terugverdientijd) | Audit ROI CRITICAL | 🟠 Middel | 2 dagen |
| KPI-samenvatting bovenaan rapport (terugverdientijd, besparing p.j., CO2) | Audit Rapport | 🟠 Middel | 0,5 dag |
| Bronvermelding berekeningen (PVGIS-norm, Meteonorm) | Audit Zonnepanelen | 🟡 Laag | 0,5 dag |

---

### Sprint 6 — Batterijmodellering Uitgebreid (Week 6)

**Sprintdoel:** De thuisbatterijberekening is technisch correct en transparant, zodat het platform geloofwaardig is voor professionele kopers.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| Batterijdegradatie meenemen in 25-jaar berekening | Audit Batterij + ROI | 🔴 Hoog | 2 dagen |
| DoD (Depth of Discharge) en round-trip efficiency tonen | Audit Batterij | 🟠 Middel | 1 dag |
| Levensduur en cycli tonen in batterijoverzicht | Audit Batterij | 🟠 Middel | 1 dag |
| Specifieke opbrengst zonnepanelen (kWh/kWp) tonen | Audit Zonnepanelen | 🟡 Laag | 0,5 dag |

---

### Sprint 7 — Huisstijl & E-mail (Week 7)

**Sprintdoel:** Offertes zijn volledig branded en kunnen direct vanuit de applicatie worden verzonden.

**Afhankelijkheid:** E-mailservice uit Sprint 2 vereist.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Eigen logo en bedrijfsgegevens in rapport | 🟠 Middel | 2 dagen |
| Rapport en offerte per e-mail versturen | 🟠 Middel | 2 dagen |
| E-mailtemplate met bedrijfshuisstijl | 🟠 Middel | 1 dag |

---

### Sprint 8 — Klantprofiel & Auditlog (Week 8)

**Sprintdoel:** Dossiers bevatten contactgegevens en beheerders hebben inzicht in wijzigingen.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| Klantprofiel uitbreiden (naam, telefoon, e-mail klant) | Backlog | 🔴 Hoog | 1 dag |
| Auditlog gebruikersbeheer | Backlog + Audit Compliance | 🟠 Middel | 2 dagen |
| Versiebeheer berekeningen (vorige versie dossier bewaren) | Audit Architectuur | 🟠 Middel | 2 dagen |

---

### Sprint 9 — PVGIS Integratie (Week 9)

**Sprintdoel:** Opbrengstberekeningen zijn gebaseerd op officiële Europese zondata in plaats van vaste coëfficiënten.

| Story | Bron | Prioriteit | Schatting |
|-------|------|-----------|-----------|
| PVGIS API koppeling voor locatiespecifieke opbrengst | Audit PVGIS + Fase 3 roadmap | 🟠 Middel | 3 dagen |
| Verliesfactoren tonen (bekabeling, omvormer, vuil) | Audit Zonnepanelen | 🟡 Laag | 1 dag |
| Locatie-specifieke opbrengst vervangt vaste oriëntatiecoëfficiënten | Audit Zonnepanelen | 🟠 Middel | 1 dag |

---

### Sprint 10 — CRM HubSpot (Week 10)

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| HubSpot OAuth koppeling + leads importeren | 🔴 Hoog | 5 dagen |

---

### Sprint 11 — CRM Pipedrive (Week 11)

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Pipedrive API koppeling + leads importeren | 🟠 Middel | 5 dagen |

---

### Sprint 12 — Dakdetectie (Week 12)

**Voorwaarde:** API-licentie en kostenmodel besproken vóór start.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Satellietkaart + dakdetectie | 🟠 Middel | 5 dagen |

---

---

## Epic: Multi-Tenant SaaS Platform

> **Model:** Één deployment, meerdere klanten. Klant krijgt een login op app.enercalculatie.nl — geen eigen GitHub, geen eigen Railway, geen broncode.  
> **Architectuur:** Zie [MULTITENANT_ARCHITECTURE.md](MULTITENANT_ARCHITECTURE.md)

### Sprint MT1 — Architectuur & DOD Document (Week 1 — parallel aan Sprint 1)

**Sprintdoel:** Volledige documentatie van de multi-tenant architectuur en beheerhandleiding is beschikbaar. Dit is de DOD voor het multi-tenant model.

| Story | Prioriteit | Status |
|-------|-----------|--------|
| Complete architectuuroverzicht (infrastructuur, datamodel, RLS) | 🔴 Hoog | ✅ Gereed — zie MULTITENANT_ARCHITECTURE.md |
| Beheerhandleiding Railway (deployment, logs, rollback, variabelen) | 🔴 Hoog | ✅ Gereed — zie MULTITENANT_ARCHITECTURE.md |
| Beheerhandleiding Supabase (tenants, gebruikers, migraties, back-ups) | 🔴 Hoog | ✅ Gereed — zie MULTITENANT_ARCHITECTURE.md |
| Tenant lifecycle beschreven (registratie → gebruik → opzegging) | 🔴 Hoog | ✅ Gereed — zie MULTITENANT_ARCHITECTURE.md |
| Checklist nieuwe klant onboarden | 🔴 Hoog | ✅ Gereed — zie MULTITENANT_ARCHITECTURE.md |

**Definition of Done:** ✅ Volledig afgerond.

---

### Sprint MT2 — Self-Service Registratie & Onboarding (Week 3)

**Sprintdoel:** Een nieuwe klant kan zich zelfstandig registreren, wordt automatisch tenant_admin van zijn organisatie en kan direct aan de slag — zonder handmatige actie van jou.

> De technische basis (auth trigger, tenant aanmaken, RBAC) is al aanwezig. Deze sprint voegt de UX-laag toe.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Registratiepagina met bedrijfsnaam-veld | 🔴 Hoog | 1 dag |
| Welkomstmail na registratie (bedrijfsnaam + aan-de-slag-link) | 🔴 Hoog | 1 dag |
| Onboarding checklist in de UI (stap 1-5 naar eerste dossier) | 🟠 Middel | 2 dagen |
| E-mailbevestiging vereist vóór toegang (Supabase e-mail confirm) | 🔴 Hoog | 0,5 dag |

**Acceptatiecriteria:**
- Klant vult naam, bedrijfsnaam en e-mail in op /register
- Klant ontvangt bevestigingsmail → klikt link → is direct tenant_admin
- Welkomstscherm toont checklist: pandgegevens, AI scan, zonnepanelen, ROI, rapport
- Geen handmatige actie van EnerCalculatie nodig

**Definition of Done:** Klant kan zichzelf registreren en is binnen 5 minuten operationeel.

---

### Sprint MT3 — Superadmin Portal (Week 6)

**Sprintdoel:** Jij hebt als superadmin inzicht in alle tenants op het platform en kunt ze beheren.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Superadmin dashboard: overzicht alle tenants | 🔴 Hoog | 2 dagen |
| Tenant details: aantal gebruikers, dossiers, laatste activiteit | 🔴 Hoog | 1 dag |
| Tenant deactiveren / heractiveren | 🔴 Hoog | 1 dag |
| Impersonation: als superadmin inloggen als tenant (support) | 🟠 Middel | 1 dag |

**Acceptatiecriteria:**
- Superadmin ziet lijst van alle tenants met naam, e-mail, aanmaakdatum, status
- Klikken op tenant toont: gebruikersaantal, dossieraantal, laatste inlog
- Deactiveren blokkeert alle gebruikers van die tenant onmiddellijk
- Superadmin-portal is alleen bereikbaar met rol `superadmin`

---

### Sprint MT4 — Abonnementen & Usage Limieten (Week 9)

**Sprintdoel:** Klanten worden ingedeeld in een abonnement. Het platform handhaaft de limieten automatisch.

**Afhankelijkheid:** Prijsmodel moet door PO zijn vastgesteld vóór start.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Abonnementsmodel implementeren (Starter / Pro / Enterprise) | 🔴 Hoog | 2 dagen |
| Usage limieten per abonnement (dossiers/maand, gebruikers) | 🔴 Hoog | 2 dagen |
| Limiet-melding in UI bij overschrijding | 🔴 Hoog | 1 dag |

**Abonnementsmodel (PO-beslissing vereist):**

| Pakket | Gebruikers | Dossiers/maand | Prijs (voorstel) |
|--------|-----------|----------------|-----------------|
| Starter | 1 | 20 | €49/maand |
| Professional | 5 | 100 | €149/maand |
| Enterprise | Onbeperkt | Onbeperkt | Op aanvraag |

**Acceptatiecriteria:**
- Abonnement opgeslagen in `tenant_settings`
- Bij limietoverschrijding: melding "U heeft uw maandlimiet bereikt. Upgrade uw abonnement."
- Superadmin kan abonnement per tenant handmatig instellen

---

### Sprint MT5 — Stripe Facturatie (Week 11)

**Sprintdoel:** Betalende klanten worden automatisch gefactureerd via Stripe.

**Afhankelijkheid:** Stripe account + abonnementsmodel uit Sprint MT4.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Stripe integratie (abonnement aanmaken bij registratie) | 🔴 Hoog | 3 dagen |
| Betaalmethode instellen via Stripe Customer Portal | 🔴 Hoog | 1 dag |
| Facturen toegankelijk in accountinstellingen | 🟠 Middel | 1 dag |
| Webhook: abonnement geannuleerd → tenant deactiveren | 🔴 Hoog | 1 dag |

**Acceptatiecriteria:**
- Nieuwe klant doorloopt Stripe Checkout na registratie
- Maandelijkse factuur automatisch verstuurd door Stripe
- Bij mislukte betaling: tennant ontvangt e-mail + 7 dagen respijtperiode
- Bij annulering: toegang geblokkeerd na einde betaalperiode

---

### Sprint MT6 — White-Label & Custom Domein (Week 14, optioneel)

**Sprintdoel:** Enterprise-klanten kunnen de applicatie onder eigen naam en domein aanbieden.

| Story | Prioriteit | Schatting |
|-------|-----------|-----------|
| Custom subdomain per tenant (klant.enercalculatie.nl) | 🟠 Middel | 3 dagen |
| White-label: eigen logo in navigatiebalk en rapport | 🟠 Middel | 2 dagen |

> **PO-noot:** Alleen relevant voor resellers of grote installatiebedrijven. Uitstellen tot er concrete vraag is.

---

### Sprint 13+ — Toekomstige Uitbreidingen

| Story | Epic | Bron | Prioriteit |
|-------|------|------|-----------|
| EMS-strategie configuratie | Batterij | Audit | 🟡 Laag |
| Warmtepompadvies | Warmtepompen | Backlog | 🟡 Laag |
| Laadpaaladvies | Laadpalen | Backlog | 🟡 Laag |
| Dynamische energietarieven | Energie | Backlog | 🟡 Laag |
| Rechtenbeheer per module | Auth | Backlog | 🟠 Middel |
| Abonnement & pakketrestricties | Commercieel | Backlog | 🔴 Hoog (zodra relevant) |
| Teamleader integratie | CRM | Backlog | 🟠 Middel |

---

## Parallel: Business Track (geen development)

| Taak | Deadline | Eigenaar |
|------|----------|---------|
| Financiële disclaimer tekst opstellen | Vandaag | PO |
| Algemene voorwaarden | Vóór eerste betalende klant | PO + juridisch |
| Privacyverklaring | Vóór eerste betalende klant | PO + juridisch |
| Verwerkersovereenkomst | Vóór eerste betalende klant | PO + juridisch |
| Prijsmodel vaststellen | Sprint 2 | PO |
| Betaalplatform kiezen (Stripe) | Sprint 3 | PO |
| Supportkanaal inrichten | Sprint 2 | PO |

---

## Volledig Sprintoverzicht

| Sprint | Week | Thema | Key Deliverable | Bron |
|--------|------|-------|----------------|------|
| Vandaag | — | Quick wins | Disclaimer + BTW indicatief | Audit CRITICAL |
| MT1 | Week 1 | Multi-tenant architectuur | ✅ MULTITENANT_ARCHITECTURE.md | Multi-tenant |
| Sprint 1 | Week 1 | Kwaliteit kern | ROI transparant, validatie, CO2 | Audit CRITICAL/HIGH |
| Sprint 2 | Week 2 | Gebruikersbeheer | Medewerkers uitnodigen | Backlog |
| MT2 | Week 3 | Self-service onboarding | Klant registreert zichzelf | Multi-tenant |
| Sprint 3 | Week 3 | Pandgegevens + OCR | BAG-verrijking, confidence score | Audit |
| Sprint 4 | Week 4 | Productdatabase | Eigen catalogus in berekeningen | Backlog + Audit |
| Sprint 5 | Week 5 | ROI uitbreiding | Scenario-analyse, KPI-rapport | Audit CRITICAL |
| Sprint 6 | Week 6 | Batterijmodellering | Degradatie, DoD, cycli | Audit |
| MT3 | Week 6 | Superadmin portal | Overzicht + beheer alle tenants | Multi-tenant |
| Sprint 7 | Week 7 | Huisstijl + e-mail | Branded offertes per mail | Backlog |
| Sprint 8 | Week 8 | Klantprofiel + audit | Contactgegevens, auditlog | Backlog + Audit |
| MT4 | Week 9 | Abonnementen | Starter / Pro / Enterprise limieten | Multi-tenant |
| Sprint 9 | Week 9 | PVGIS integratie | Locatiespecifieke opbrengst | Audit Fase 3 |
| Sprint 10 | Week 10 | CRM HubSpot | Leads importeren | Backlog |
| MT5 | Week 11 | Stripe facturatie | Automatische facturatie | Multi-tenant |
| Sprint 11 | Week 11 | CRM Pipedrive | Leads importeren | Backlog |
| Sprint 12 | Week 12 | Dakdetectie | Automatische dakafmetingen | Backlog |
| MT6 | Week 14 | White-label | Custom domein + eigen logo | Multi-tenant |
| Sprint 13+ | TBD | Uitbreidingen | EMS, warmtepompen, laadpalen | Backlog + Audit |

---

## PO Samenvatting Audit vs. Backlog

| Audit aanbeveling | Status | Sprint |
|-------------------|--------|--------|
| Configureerbare energieprijzen | ✅ Al gebouwd | Done |
| Audittrail AI-gegevens | Deels (DDD laag aanwezig) | Sprint 8 |
| Versiebeheer berekeningen | Open | Sprint 8 |
| Financiële disclaimer | Open — URGENT | Vandaag |
| ROI herleidbaar | Open | Sprint 1 |
| IRR/NPV | Open | Sprint 1 |
| Scenarioanalyse | Open | Sprint 5 |
| OCR confidence score | Open | Sprint 3 |
| BAG-verrijking | Open | Sprint 3 |
| Daktype + woonoppervlak | Open | Sprint 3 |
| Productspecificaties | Open | Sprint 4 |
| CO2-besparing | Open | Sprint 1 |
| Batterijdegradatie | Open | Sprint 6 |
| DoD / cycli / levensduur | Open | Sprint 6 |
| PVGIS integratie | Open | Sprint 9 |
| Tooltips berekeningen | Open | Sprint 1 |
| Invoervalidatie waarschuwingen | Open | Sprint 1 |
| KPI-samenvatting rapport | Open | Sprint 5 |

# Backlog — Tenant Module Management

## Epic: Tenant Module Management

**Probleem / kans:** Installateurs zien nu alle modules, ongeacht hun abonnement.  
**Doel & waarde:** Per tenant instelbaar welke modules zichtbaar en toegankelijk zijn — zonder code-aanpassingen of redeployments.  
**Succesmetriek:**
- Modulewijziging actief binnen 5 seconden, zonder herstart
- 0 API-responses op niet-geactiveerde modules voor die tenant
- Beheerscherm functioneel voor applicatie-eigenaar

**Scope:**
- ✅ Tenants tabel, modules tabel, koppeltabel
- ✅ RLS-policies op alle nieuwe tabellen
- ✅ Frontend context/hook voor module-toegang
- ✅ Route-guards en navigatie-filtering
- ✅ API-level enforcement
- ✅ Admin beheerscherm (eenvoudig, geen self-service voor tenant)
- ❌ Automatische pakket-koppeling (later)
- ❌ Self-service upgrade flow voor tenants (later)

**Aannames & risico's:**
- Er is nog geen `tenants` tabel — blocker voor alle stories
- Supabase RLS moet correct ingericht worden, anders is API-enforcement lek

**Afhankelijkheden:** Supabase project (productie + staging), bestaande auth-flow (Supabase Auth)

---

## Overzicht

| # | Story | Type | MoSCoW | Blocker voor |
|---|---|---|---|---|
| 1 | Tenants fundament | Story | Must | 2, 3, 4, 5, 6 |
| 2 | Module registry | Story | Must | 3, 4, 5 |
| 7 | Spike: locatie berekeningslogica | Spike | Must | 8, 5 |
| 8 | Spike: backend strategie | Spike | Must | 5 |
| 3 | Module activatie per tenant | Story | Must | 4, 5 |
| 4 | Frontend module-guard | Story | Must | — |
| 5 | API-level enforcement | Story | Must | — |
| 6 | Admin beheerscherm | Story | Should | — |

---

## Sprint suggestie

### Sprint 1 — Fundament
- Story 1 — Tenants fundament
- Story 2 — Module registry
- Story 7 — Spike: locatie berekeningslogica
- Story 8 — Spike: backend strategie

### Sprint 2 — Core logica
- Story 3 — Module activatie per tenant
- Story 4 — Frontend module-guard

### Sprint 3 — Enforcement & beheer
- Story 5 — API-level enforcement
- Story 6 — Admin beheerscherm

---

## Stories

---

### Story 1 — Tenants fundament

**Als** ontwikkelaar  
**wil ik** een `tenants` tabel met bijbehorende RLS  
**zodat** elke gebruiker aan een tenant gekoppeld is en data correct geïsoleerd wordt

**MoSCoW:** Must — blocker voor alles

#### Acceptatiecriteria

```gherkin
Given een nieuw Supabase-project
When de migration wordt uitgevoerd
Then bestaat tabel `tenants` met kolommen: id (uuid), name (text), created_at

Given een ingelogde gebruiker
When die een query doet op `tenants`
Then ziet hij alleen de tenant waar hij zelf bij hoort (RLS enforcement)

Given een niet-ingelogde request
When die `tenants` bevraagt
Then krijgt die een 403
```

#### Technische notities
- Migration: `supabase/migrations/20260609_001_create_tenants.sql`
- Koppeltabel `user_tenants (user_id, tenant_id, role)` voor many-to-many
- RLS policy op basis van `auth.uid()` via `user_tenants`
- Geen `service_role` key client-side gebruiken

#### Migration

```sql
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_tenants (
  user_id uuid not null references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (user_id, tenant_id)
);

alter table public.tenants enable row level security;
alter table public.user_tenants enable row level security;

create policy "tenant: eigen tenant lezen"
  on public.tenants for select
  using (
    id in (
      select tenant_id from public.user_tenants
      where user_id = auth.uid()
    )
  );

create policy "user_tenants: eigen records lezen"
  on public.user_tenants for select
  using (user_id = auth.uid());
```

---

### Story 2 — Module registry

**Als** ontwikkelaar  
**wil ik** een vaste lijst van beschikbare modules in de database  
**zodat** de applicatie altijd weet welke modules bestaan, ongeacht of ze actief zijn

**MoSCoW:** Must — blocker voor Story 3

#### Acceptatiecriteria

```gherkin
Given de migration is uitgevoerd
When je de tabel `modules` bevraagt
Then staan daar minimaal 4 records: solar, battery, heatpump, airco

Given een onbekende module-slug
When die ergens in de code wordt gebruikt
Then gooit de TypeScript-type check een compile-error (string union type)
```

#### Technische notities
- Migration: `supabase/migrations/20260609_002_create_modules.sql`
- Seed: `supabase/seed.sql`
- TypeScript type `ModuleId = 'solar' | 'battery' | 'heatpump' | 'airco'` in `src/types/modules.ts`

#### Migration

```sql
create table public.modules (
  id text primary key,
  label text not null,
  description text,
  sort_order int not null default 0
);

alter table public.modules enable row level security;

create policy "modules: iedereen mag lezen"
  on public.modules for select
  using (true);
```

#### Seed

```sql
insert into public.modules (id, label, description, sort_order) values
  ('solar',    'Zonnepanelen',   'ROI-berekening zonnepanelen',   1),
  ('battery',  'Thuisbatterij',  'ROI-berekening thuisbatterij',  2),
  ('heatpump', 'Warmtepomp',     'ROI-berekening warmtepomp',     3),
  ('airco',    'Airconditioning','ROI-berekening airconditioning', 4)
on conflict (id) do nothing;
```

---

### Story 7 — Spike: locatie berekeningslogica

**Als** ontwikkelaar  
**wil ik** weten waar de ROI-berekeningslogica zich bevindt in de codebase  
**zodat** we een gefundeerde keuze kunnen maken over server-side vs client-side uitvoering

**MoSCoW:** Must — blocker voor Story 8 en Story 5  
**Tijdbox:** max 2 uur

#### Acceptatiecriteria

```gherkin
Given de codebase is doorzocht
When de spike is afgerond
Then is er een schriftelijke bevinding met:
  - Lijst van bestanden waar berekeningslogica zit
  - Per bestand: client-side of server-side
  - Conclusie: wel of geen refactor nodig voor Edge Functions
```

#### Aanpak

```bash
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | \
xargs grep -l "calculate\|rendement\|roi\|IRR\|terugverdien" 2>/dev/null
```

- Documenteer bevinding in `docs/spikes/001-berekeningen-locatie.md`

---

### Story 8 — Spike: backend strategie bepalen

**Als** ontwikkelaar  
**wil ik** weten of we Edge Functions of een aparte Railway backend gebruiken  
**zodat** de module-enforcement en berekeningslogica op de juiste plek landen

**MoSCoW:** Must — blocker voor Story 5  
**Tijdbox:** max 3 uur inclusief proof-of-concept

#### Acceptatiecriteria

```gherkin
Given de uitkomst van Story 7 bekend is
When de spike is afgerond
Then is er een ADR met:
  - Gekozen aanpak: Edge Functions of Railway backend
  - Onderbouwing op basis van huidige codebase
  - Geschatte impact op bestaande code
```

#### Afwegingscriteria

| Criterium | Edge Functions | Railway backend |
|---|---|---|
| Berekeningen nu al server-side | ✅ snel te koppelen | ✅ snel te koppelen |
| Berekeningen nu client-side, simpel | ✅ verplaatsen naar Edge | ⚠️ overkill |
| Berekeningen complex / veel dependencies | ⚠️ Deno heeft beperkingen | ✅ Node.js volledig |
| Snelheid van implementatie | ✅ sneller | ⚠️ extra Railway service |

- Documenteer in `docs/adr/001-backend-strategie.md`

---

### Story 3 — Module activatie per tenant

**Als** applicatie-eigenaar  
**wil ik** per tenant kunnen instellen welke modules actief zijn  
**zodat** klanten alleen de modules zien waarvoor ze betalen

**MoSCoW:** Must — blocker voor Story 4 en Story 5

#### Acceptatiecriteria

```gherkin
Given tenant A heeft module `solar` actief, module `battery` niet
When een gebruiker van tenant A inlogt
Then is solar zichtbaar in de navigatie en battery niet

Given een directe API-call naar een battery-endpoint door tenant A
When die call binnenkomt
Then returnt de API 403 met body { error: 'module_not_enabled' }

Given de eigenaar zet battery aan voor tenant A
When de gebruiker van tenant A de pagina refresht
Then is battery zichtbaar (binnen 5 seconden)
```

#### Technische notities
- Migration: `supabase/migrations/20260609_003_create_tenant_modules.sql`
- Bij app-init: fetch `tenant_modules` where `tenant_id = current_tenant` and `enabled = true`
- Opslaan in React context (`ModuleContext`) — niet in localStorage

#### Migration

```sql
create table public.tenant_modules (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  module_id text not null references public.modules(id) on delete cascade,
  enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (tenant_id, module_id)
);

alter table public.tenant_modules enable row level security;

create policy "tenant_modules: eigen tenant lezen"
  on public.tenant_modules for select
  using (
    tenant_id in (
      select tenant_id from public.user_tenants
      where user_id = auth.uid()
    )
  );

create index idx_tenant_modules_tenant_enabled
  on public.tenant_modules(tenant_id, enabled)
  where enabled = true;
```

---

### Story 4 — Frontend module-guard

**Als** installateur  
**wil ik** geen menu-items of pagina's zien voor modules die niet voor mij zijn geactiveerd  
**zodat** de interface overzichtelijk en niet verwarrend is

**MoSCoW:** Must

#### Acceptatiecriteria

```gherkin
Given module `heatpump` is niet actief voor mijn tenant
When ik inlog
Then zie ik geen heatpump-item in de navigatie

Given ik de directe URL `/heatpump` typ in de browser
When de pagina laadt
Then word ik geredirect naar `/dashboard` met een melding "Module niet beschikbaar"

Given module `heatpump` wordt geactiveerd door de beheerder
When ik de app refresh
Then verschijnt het heatpump-menu item
```

#### Technische notities
- `useModules()` hook die `ModuleContext` uitleest — `src/hooks/useModules.ts`
- Navigatie filtert op `isEnabled(module)`
- `<ModuleGuard module="heatpump">` component voor route-beveiliging — `src/components/ModuleGuard.tsx`
- Geen hardcoded module-checks verspreid door de codebase

#### TypeScript types — `src/types/modules.ts`

```typescript
export type ModuleId = 'solar' | 'battery' | 'heatpump' | 'airco'

export interface ModuleContextValue {
  enabledModules: ModuleId[]
  isEnabled: (module: ModuleId) => boolean
  isLoading: boolean
}
```

---

### Story 5 — API-level enforcement

**Als** ontwikkelaar  
**wil ik** dat API-endpoints controleren of de aanroepende tenant de betreffende module heeft  
**zodat** UI-bypass via directe API-calls geen data lekt

**MoSCoW:** Must  
**Afhankelijk van:** uitkomst Story 7 + Story 8

#### Acceptatiecriteria

```gherkin
Given een API-call naar `/battery/calculate` door tenant zonder battery-module
When de call binnenkomt bij de server
Then returnt de server HTTP 403 { error: 'module_not_enabled', module: 'battery' }

Given een API-call door een tenant mét battery-module
When de call binnenkomt
Then wordt die normaal verwerkt

Given een niet-geauthenticeerde call
When die een module-endpoint raakt
Then returnt de server HTTP 401

Given een geweigerde module-aanroep
When die plaatsvindt
Then wordt deze gelogd in `module_access_log` met tenant_id, module en timestamp
```

#### Technische notities
- `requireModule(tenantId, moduleId)` in `src/middleware/requireModule.ts`
- Gebruikt server-side Supabase client met service role key
- Service role key **nooit** in Vite bundle — alleen server/edge context
- Exacte implementatie afhankelijk van uitkomst Story 8 (Edge Functions vs Railway)

---

### Story 6 — Admin beheerscherm module-toggles

**Als** applicatie-eigenaar  
**wil ik** via een beheerscherm per tenant modules aan- en uitzetten  
**zodat** ik dit kan doen zonder directe database-toegang

**MoSCoW:** Should — Supabase Studio is tijdelijk acceptabel als workaround

#### Acceptatiecriteria

```gherkin
Given ik ben ingelogd als admin
When ik naar /admin/tenants ga
Then zie ik een lijst van alle tenants met per tenant de module-toggles

Given ik een module toggle omzet voor een tenant
When ik op Opslaan klik
Then is de wijziging direct actief zonder redeploy

Given een niet-admin gebruiker
When die /admin/* probeert te bereiken
Then krijgt die een 403 redirect
```

#### Technische notities
- Route `/admin/tenants` alleen toegankelijk voor `role = 'admin'` in `user_tenants`
- Update via server-side Supabase client (service role)
- Admin-rol check via RLS én server-side middleware — niet alleen frontend

---

## Out of scope (bewust)

| Item | Wanneer oppakken |
|---|---|
| Pakket-koppeling (Starter/Pro/Complete) | Na eerste betalende klant |
| Self-service upgrade flow voor tenant | Na pakket-koppeling |
| Airco module inhoud | Wanneer module gebouwd is |
| Facturatie koppeling | Aparte epic |

---

## Definition of Ready

Een story mag de sprint in als:
- Waarde en persona helder
- Acceptatiecriteria in Gherkin
- Afhankelijkheden bekend en geen blocker
- Inschatbaar en klein genoeg

## Definition of Done

Een story is af als:
- Acceptatiecriteria gehaald en getest
- RLS policies gecontroleerd
- Geen service role key client-side
- Uitgerold naar staging en goedgekeurd
- Uitgerold naar productie

# Backlog — Veilige deployments & zero-downtime uitrol

## Epic: Veilige deployments & zero-downtime uitrol

**Probleem / kans:** Een slechte deploy kan alle klanten tegelijk raken — app plat, data onbereikbaar, veel herstelwerk.  
**Doel & waarde:** Updates uitrollen zonder dat klanten downtime ervaren of data kwijtraken. Automatisch terugvallen op vorige versie bij een falende deploy.  
**Succesmetriek:**
- Falende deploy triggert automatische rollback binnen 2 minuten
- Geen klant ervaart downtime door een migration of deploy
- Rollback naar vorige versie uitvoerbaar in &lt; 5 minuten

**Scope:**
- ✅ Health check endpoint
- ✅ Railway deployment configuratie
- ✅ Backwards compatible migration strategie
- ✅ Rollback procedure gedocumenteerd
- ✅ Feature flag infrastructuur
- ❌ Per-tenant deployment (bewust out of scope)
- ❌ Automatische canary releases (later)

---

## Overzicht & prioritering

| # | Story | Type | MoSCoW | Blocker voor |
|---|---|---|---|---|
| 1 | Health check endpoint | Story | Must | 2 |
| 2 | Railway deployment safeguards | Story | Must | 3, 4 |
| 3 | Backwards compatible migration strategie | Story | Must | 4 |
| 4 | Rollback procedure | Story | Must | — |
| 5 | Feature flag infrastructuur | Story | Should | — |

---

## Sprint suggestie

### Sprint 1 — Fundament veilige deploy
- Story 1 — Health check endpoint
- Story 2 — Railway deployment safeguards
- Story 3 — Backwards compatible migration strategie

### Sprint 2 — Herstel & controle
- Story 4 — Rollback procedure
- Story 5 — Feature flag infrastructuur

---

## Stories

---

### Story 1 — Health check endpoint

**Als** Railway deployment systeem  
**wil ik** een endpoint kunnen aanroepen dat de applicatiestatus teruggeeft  
**zodat** Railway weet of een nieuwe deploy gezond is voordat hij live gaat

**MoSCoW:** Must — blocker voor Story 2  
**Tijdsinschatting:** 2-4 uur

#### Acceptatiecriteria

```gherkin
Given de applicatie draait en database bereikbaar is
When GET /health wordt aangeroepen
Then returnt de server HTTP 200 met body:
  { status: 'ok', db: 'ok', version: '&lt;git-sha&gt;', timestamp: '&lt;iso-date&gt;' }

Given de database niet bereikbaar is
When GET /health wordt aangeroepen
Then returnt de server HTTP 503 met body:
  { status: 'error', db: 'unreachable' }

Given de applicatie opstart
When /health nog niet 200 teruggeeft
Then stuurt Railway geen verkeer naar deze instantie
```

#### Technische notities
- Endpoint: `GET /health` — geen authenticatie vereist
- Doet een lightweight DB check: `select 1` via Supabase
- Geeft git SHA terug via `RAILWAY_GIT_COMMIT_SHA` environment variable
- Responsetijd moet onder 500ms blijven
- Bestandslocatie afhankelijk van uitkomst backend-strategie spike

---

### Story 2 — Railway deployment safeguards

**Als** applicatie-eigenaar  
**wil ik** dat Railway automatisch terugvalt op de vorige versie bij een falende deploy  
**zodat** klanten geen downtime ervaren als een update misgaat

**MoSCoW:** Must — blocker voor Story 3 en 4  
**Tijdsinschatting:** 2-3 uur

#### Acceptatiecriteria

```gherkin
Given een nieuwe deploy is gestart
When de health check binnen 2 minuten geen 200 teruggeeft
Then rolt Railway automatisch terug naar de vorige versie

Given een nieuwe deploy is gestart
When de health check 200 teruggeeft
Then switcht Railway verkeer naar de nieuwe versie zonder downtime

Given productie draait
When een deploy bezig is
Then blijft minimaal 1 instantie van de oude versie verkeer afhandelen
  totdat de nieuwe versie healthy is (rolling update)

Given staging en productie
When een deploy op staging faalt
Then wordt er nooit automatisch naar productie uitgerold
```

#### Technische notities

Railway configuratie in `railway.toml`:

```toml
[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 120
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
numReplicas = 1
```

- Staging en productie zijn aparte Railway services met eigen configuratie
- Productie deploy is altijd handmatig triggered, nooit automatisch vanuit commit
- Zet `RAILWAY_GIT_COMMIT_SHA` als environment variable

---

### Story 3 — Backwards compatible migration strategie

**Als** ontwikkelaar  
**wil ik** een vaste werkwijze voor database migrations  
**zodat** een schema-wijziging nooit de draaiende applicatie breekt

**MoSCoW:** Must  
**Tijdsinschatting:** 3-4 uur (inclusief documentatie en één voorbeeld-migration)

#### Acceptatiecriteria

```gherkin
Given een nieuwe kolom moet worden toegevoegd
When de migration wordt uitgerold
Then werkt de bestaande applicatiecode nog zonder aanpassing

Given een kolom moet worden hernoemd
When dit wordt doorgevoerd
Then gebeurt dit in drie aparte deploys:
  1. Nieuwe kolom toevoegen
  2. Data migreren en code updaten naar nieuwe kolom
  3. Oude kolom droppen

Given een migration wordt uitgerold op productie
When die migration faalt
Then is er een rollback-script beschikbaar dat de wijziging ongedaan maakt

Given een developer een migration aanmaakt
When die niet backwards compatible is
Then blokkeert de CI pipeline met een expliciete foutmelding
```

#### Technische notities

**Verplichte volgorde bij elke schema-wijziging:**
```
1. Migration schrijven (backwards compatible)
2. Migration reviewen — past het op bestaande code?
3. Uitrollen op staging
4. Applicatiecode uitrollen op staging
5. Testen
6. Migration uitrollen op productie
7. Applicatiecode uitrollen op productie
```

**Verboden in één deploy:**
- Kolom droppen waarop code nog leunt
- Kolom hernoemen zonder transitieperiode
- NOT NULL constraint toevoegen aan bestaande kolom zonder default

**Migration naamgeving:** `YYYYMMDD_NNN_beschrijving.sql`

Rollback altijd als comment bovenin het migratiebestand:

```sql
-- rollback: alter table public.tenants drop column IF EXISTS new_column;

alter table public.tenants add column new_column text;
```

- Documenteer werkwijze in `docs/runbooks/migration-strategie.md`

---

### Story 4 — Rollback procedure

**Als** applicatie-eigenaar of ontwikkelaar  
**wil ik** een gedocumenteerde en geteste rollback procedure  
**zodat** ik bij een falende deploy binnen 5 minuten terug ben op de vorige werkende versie

**MoSCoW:** Must  
**Tijdsinschatting:** 3-4 uur (inclusief test op staging)

#### Acceptatiecriteria

```gherkin
Given een deploy op productie heeft problemen veroorzaakt
When de rollback procedure wordt gevolgd
Then draait de vorige versie binnen 5 minuten weer op productie

Given de rollback procedure
When een developer die voor het eerst leest
Then kan hij zonder hulp een rollback uitvoeren

Given een rollback is uitgevoerd
When de database een niet-backwards-compatible migration had
Then is er een stap in de procedure die de migration terugdraait

Given de rollback procedure
When die voor het eerst wordt opgesteld
Then is die getest op staging voordat hij als geldig wordt beschouwd
```

#### Technische notities

Procedure in `docs/runbooks/rollback-procedure.md`:

```
1. Constateer het probleem (health check, Sentry alert, klantmelding)
2. Ga naar Railway dashboard → productie service
3. Klik "Rollback" naar vorige succesvolle deploy
4. Controleer /health — wacht op 200
5. Controleer Sentry — zijn de errors gestopt?
6. Indien migration ook teruggedraaid moet worden:
   a. Voer rollback SQL uit via Supabase dashboard
   b. Verifieer data-integriteit
7. Communiceer naar klanten indien &gt; 5 min downtime
```

- Minimum 1x testen op staging voor go-live
- Toevoegen aan Definition of Done: elke story met migration heeft rollback SQL

---

### Story 5 — Feature flag infrastructuur

**Als** applicatie-eigenaar  
**wil ik** nieuwe functionaliteit achter een feature flag kunnen plaatsen  
**zodat** ik een update kan uitrollen zonder dat klanten de nieuwe feature al zien

**MoSCoW:** Should  
**Tijdsinschatting:** 4-6 uur

#### Acceptatiecriteria

```gherkin
Given een nieuwe feature is gebouwd achter een flag
When de flag uit staat voor tenant A
Then ziet tenant A de nieuwe feature niet

Given een nieuwe feature is gebouwd achter een flag
When ik de flag aanzet voor tenant A via het admin scherm
Then ziet tenant A de feature direct zonder redeploy

Given een bugfix zonder flag
When die wordt uitgerold
Then is die direct actief voor alle tenants

Given een feature flag die niet meer nodig is
When de feature volledig uitgerold is
Then is de flag-code verwijderd uit de codebase (geen dead code)
```

#### Technische notities
- Aparte `tenant_feature_flags` tabel — los van `tenant_modules`
- Zelfde patroon als module-guard: context → hook → conditionele render
- Geen externe tool (LaunchDarkly e.d.) — te zwaar voor deze fase
- Flags zijn tijdelijk — `expires_at` kolom als reminder om op te ruimen

#### Migration

```sql
create table public.tenant_feature_flags (
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  flag text not null,
  enabled boolean not null default false,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (tenant_id, flag)
);

alter table public.tenant_feature_flags enable row level security;

create policy "feature_flags: eigen tenant lezen"
  on public.tenant_feature_flags for select
  using (
    tenant_id in (
      select tenant_id from public.user_tenants
      where user_id = auth.uid()
    )
  );
```

---

## Out of scope (bewust)

| Item | Wanneer oppakken |
|---|---|
| Per-tenant deployment | Niet nodig — Model A volstaat |
| Automatische canary releases | Na eerste 10 betalende klanten |
| Externe feature flag tool (LaunchDarkly) | Bij &gt; 50 tenants |
| Uptime SLA monitoring | Aparte epic |

---

## Definition of Ready
- Waarde en persona helder
- Acceptatiecriteria in Gherkin
- Afhankelijkheden bekend en geen blocker
- Inschatbaar en klein genoeg

## Definition of Done
- Acceptatiecriteria gehaald en getest op staging
- Health check valideert nieuwe versie voor productie
- Migration heeft rollback SQL gedocumenteerd
- Uitgerold naar productie en health check groen

# Backlog — Landingspagina webteksten & positionering

## Epic: Landingspagina webteksten optimaliseren

**Probleem / kans:** De huidige teksten verkopen features en positioneren EnerCalculatie als generieke SaaS-tool. Concurrenten Solar Monkey en OpusFlow communiceren al sterker op resultaat. Het unieke onderscheid — AI-extractie + deterministische engine + PDOK + adviesondersteuning — komt niet naar voren.  
**Doel & waarde:** Webteksten die de installateur herkennen in zijn dagelijkse probleem en EnerCalculatie positioneren als de rekenhulp die hem geloofwaardiger maakt bij zijn klant. Hogere conversie op demo-aanvragen.  
**Succesmetriek:**
- Hero-boodschap communiceert onderscheid t.o.v. Solar Monkey en OpusFlow
- Minimaal 1 social proof citaat aanwezig op de pagina
- Bounce rate daalt na wijzigingen (meten via Analytics)
- Demo-aanvragen stijgen na livegang

**Scope:**
- ✅ Herschrijven bestaande secties
- ✅ Nieuw social proof blok toevoegen
- ✅ CTA-teksten aanpassen
- ❌ Nieuwe secties of pagina's (aparte epic)
- ❌ Visueel ontwerp (tekst-only wijzigingen)

**Aannames & risico's:**
- Social proof story is afhankelijk van pilotklant — kan niet eerder live
- Merknaam-keuze (EnerCalculatie vs Enercalculatie) moet eerst vastgesteld zijn (Story 4 vorige epic)

---

## Overzicht & prioritering

| # | Story | MoSCoW | Afhankelijk van |
|---|---|---|---|
| 1 | Hero herschrijven | Must | — |
| 2 | Waarom-sectie herschrijven | Must | — |
| 3 | CTA-sectie herschrijven | Should | — |
| 4 | Core features subtitel aanpassen | Should | — |
| 5 | ROI Calculator kop aanpassen | Should | — |
| 6 | Enterprise sectie herschrijven | Should | — |
| 7 | Social proof blok toevoegen | Must | Pilotklant beschikbaar |

---

## Sprint suggestie

### Sprint 1 — Kern positionering
- Story 1 — Hero herschrijven
- Story 2 — Waarom-sectie herschrijven
- Story 3 — CTA-sectie herschrijven

### Sprint 2 — Verfijning + social proof
- Story 4 — Core features subtitel
- Story 5 — ROI Calculator kop
- Story 6 — Enterprise sectie
- Story 7 — Social proof (zodra pilotklant beschikbaar)

---

## Stories

---

### Story 1 — Hero herschrijven

**Als** installateur die de landingspagina bezoekt  
**wil ik** direct begrijpen wat EnerCalculatie voor mij doet  
**zodat** ik me herken in het aanbod en doorklik naar de demo

**MoSCoW:** Must

#### Acceptatiecriteria

```gherkin
Given ik land op de homepage
When ik de hero lees
Then zie ik een hoofdtitel die mijn rol en resultaat benoemt
  niet een generieke SaaS-claim

Given ik de subtitel lees
When ik scan welke modules ondersteund worden
Then zie ik expliciet: zonnepanelen, thuisbatterijen én warmtepomp

Given ik de badges onder de CTA bekijk
When ik ze lees
Then staan er: "AVG-proof", "Nederlandse servers", "Deterministische berekeningen"
```

#### Nieuwe teksten

**Hoofdtitel:**  
De slimste rekenhulp voor de verduurzamingsinstallateur.  
Jij doet het gesprek. Wij doen het rekenwerk.

**Subtitel:**  
Van energierekening tot onderbouwd verduurzamingsadvies — voor zonnepanelen, thuisbatterijen en warmtepompen. Geen Excel, geen typfouten, geen gemiste wetgeving. Alleen een adviesrapport waar jouw klant ja tegen zegt.

**Badges:**  
AVG-proof · Nederlandse servers · Deterministische berekeningen

---

### Story 2 — Waarom-sectie herschrijven

**Als** installateur die de pagina verder leest  
**wil ik** zien dat EnerCalculatie mijn geloofwaardigheid bij mijn klant vergroot  
**zodat** ik de waardepropositie begrijp als ondersteuning, niet als product

**MoSCoW:** Must

#### Acceptatiecriteria

```gherkin
Given ik de sectie "Waarom installateurs kiezen voor EnerCalculatie" lees
When ik de kop en subtitel lees
Then spreekt de tekst mij aan als installateur
  en niet als software-koper

Given ik de subtitel lees
When ik de boodschap opvat
Then begrijp ik dat EnerCalculatie mij helpt vertrouwen te winnen bij mijn klant
  niet dat het mij tijd bespaart (dat is bijzaak)
```

#### Nieuwe teksten

**Kop:**  
Jij verkoopt vertrouwen. Wij leveren de onderbouwing.

**Subtitel:**  
De installateur die zijn klant een foutloos, actueel adviesrapport kan geven wint de deal. Wij zorgen dat jij die installateur bent.

---

### Story 3 — CTA-sectie herschrijven

**Als** geïnteresseerde installateur onderaan de pagina  
**wil ik** een concrete uitnodiging zien die aansluit op mijn werkpraktijk  
**zodat** ik de drempel laag voel om een demo te boeken

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de CTA-sectie onderaan lees
When ik de kop lees
Then spreekt die mij aan op mijn rol als adviseur
  niet op "offerteproces versnellen"

Given ik de subtitel lees
When ik begrijp wat de demo inhoudt
Then weet ik dat het om een echte casus gaat in 20 minuten
  niet een vage "mogelijkheden bespreken"

Given ik de knoppen zie
When ik mijn keuze maak
Then zijn er twee opties: demo boeken OF ROI-calculator gebruiken
```

#### Nieuwe teksten

**Kop:**  
Klaar om de geloofwaardigste adviseur in de kamer te zijn?

**Subtitel:**  
Boek een livedemo en zie in 20 minuten hoe een echte casus eruitziet in EnerCalculatie — van energierekening tot adviesrapport.

**CTA knoppen:**
- Primair: "Boek een demo"
- Secundair: "Bereken mijn tijdsbesparing" (verwijst naar ROI-calculator sectie)

---

### Story 4 — Core features subtitel aanpassen

**Als** installateur die de features scant  
**wil ik** voelen dat dit gebouwd is door iemand die mijn vak kent  
**zodat** ik vertrouwen krijg in de inhoudelijke correctheid

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de features-sectie bekijk
When ik de subtitel lees
Then refereert die aan praktijkervaring in de installatietechniek
  niet aan een generiek "ontworpen voor vakmensen"
```

#### Nieuwe teksten

**Kop:**  
Alles wat je nodig hebt voor een onweerlegbaar adviesgesprek

**Subtitel:**  
Gebouwd op praktijkervaring in de installatietechniek. Niet door marketeers, maar door iemand die weet hoe een schouw eruitziet.

---

### Story 5 — ROI Calculator kop aanpassen

**Als** installateur die de ROI-calculator gebruikt  
**wil ik** een vraag zien die aansluit op mijn dagelijkse pijn  
**zodat** ik direct gemotiveerd ben om te schuiven

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de ROI-calculator sectie bekijk
When ik de kop lees
Then is het een vraag die mijn tijdsprobleem benoemt
  niet een instructie om ROI te berekenen

Given ik de subtitel lees
When ik begrijp wat ik moet doen
Then is de actie helder: schuif naar mijn aantal offertes
```

#### Nieuwe teksten

**Kop:**  
Hoeveel tijd kost jou één dossier vandaag?

**Subtitel:**  
Schuif naar jouw aantal offertes per maand en zie direct wat EnerCalculatie jou oplevert.

---

### Story 6 — Enterprise sectie herschrijven

**Als** installateur die de technische sectie leest  
**wil ik** begrijpen dat mijn klantdata veilig is en het gewoon werkt  
**zodat** ik niet afhaakt op jargon dat niet bij mij past

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de technische sectie lees
When ik de kop zie
Then staat er geen "enterprise-grade" jargon
  maar een concrete belofte over data en betrouwbaarheid

Given ik de subtitel lees
When ik hem begrijp
Then snap ik als niet-technische installateur wat het betekent
```

#### Nieuwe teksten

**Kop:**  
Nederlandse data. Veilige architectuur. Klaar voor jouw werkomgeving.

**Subtitel:**  
Alle klantdossiers staan op Nederlandse servers, volledig AVG-compliant. EnerCalculatie past naadloos in je bestaande werkwijze via open API en standaard integraties.

---

### Story 7 — Social proof blok toevoegen

**Als** twijfelende installateur  
**wil ik** zien dat een collega-installateur EnerCalculatie gebruikt en waardeert  
**zodat** ik durf door te klikken naar de demo

**MoSCoW:** Must — zodra pilotklant beschikbaar  
**Afhankelijkheid:** minimaal 1 betalende of pilot-klant die toestemming geeft voor citaat

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik minimaal 1 citaat van een echte installateur
  met naam, bedrijfsnaam en woonplaats

Given ik het citaat lees
When ik de inhoud opvat
Then gaat het over een concreet resultaat
  niet over een vage tevredenheid

Given er nog geen pilotklant beschikbaar is
When de pagina live gaat
Then is er een placeholder-sectie of is de sectie weggelaten
  nooit een nep-citaat
```

#### Richtlijn voor het citaat

Vraag de pilotklant specifiek:
- Hoeveel tijd kostte een dossier vroeger vs nu?
- Wat zei zijn klant over het adviesrapport?
- Wat is zijn installatiespecialisatie?

**Voorbeeld format:**  
"Met EnerCalculatie lever ik mijn klant binnen 5 minuten een onderbouwd advies. Vroeger deed ik daar een halve dag over."  
— Jan de Vries, De Vries Installatie, Utrecht

---

## Redactionele beslissing — buiten de backlog

Voordat stories 1 t/m 6 de sprint in kunnen moet de PO één beslissing nemen:  
**Officiële merknaam: EnerCalculatie of Enercalculatie?**  
Kies één schrijfwijze en communiceer die aan de developer. Alle stories gebruiken die schrijfwijze consistent.

## Definition of Ready

- Nieuwe teksten zijn goedgekeurd door PO
- Merknaam-beslissing is genomen
- Afhankelijkheden bekend en geen blocker

## Definition of Done

- Alle gewijzigde teksten live op soon.enercalculatie.nl
- Visueel gecontroleerd op desktop én mobiel
- Geen oude teksten meer zichtbaar
- Story 7: citaat is geverifieerd en toestemming is schriftelijk vastgelegd

---

# Backlog — Landingspagina conversie-optimalisatie

## Epic: Landingspagina conversie-optimalisatie

**Probleem / kans:** De landingspagina informeert maar converteert nog onvoldoende. Bezoekers missen het bewijs dat EnerCalculatie werkt (video, rapport-voorbeeld), concrete drempelverlagende elementen (garantie, stappenuitleg) en actieve bezwaarweerlegging. Concurrenten Solar Monkey en OpusFlow scoren hier beter.  
**Doel & waarde:** Meer demo-aanvragen via lagere drempel, hogere geloofwaardigheid en actieve bezwaarweerlegging — zonder extra advertentiebudget.  
**Succesmetriek:**
- Demo-aanvragen stijgen na implementatie (baseline meten vóór wijzigingen)
- Gemiddelde paginaduur stijgt (meer engagement)
- Video-afspeelrate > 40% van bezoekers

**Scope:**
- ✅ Productiedemo video
- ✅ Hoe-het-werkt blok
- ✅ Adviesrapport voorbeeld
- ✅ Bezwaren-sectie
- ✅ Vergelijkingstabel Excel vs EnerCalculatie
- ✅ No-risk / garantie formulering
- ✅ Urgentie/beschikbaarheid element
- ❌ Blog of kennisbank (aparte epic)
- ❌ Chatbot (te vroeg)
- ❌ Volledige app-tour (verwarring op landingspagina)

**Aannames & risico's:**
- Video vereist opname door Pascal — geen developer-werk
- Adviesrapport voorbeeld vereist goedkeuring op inhoud (geen klantdata tonen)
- Urgentie-element mag alleen live als het feitelijk klopt

---

## Overzicht & prioritering

| # | Story | MoSCoW | Impact | Afhankelijk van |
|---|---|---|---|---|
| 1 | Demo video toevoegen | Must | 🔴 Hoogst | Video-opname door Pascal |
| 2 | Hoe-het-werkt blok | Must | 🔴 Hoog | — |
| 3 | Adviesrapport voorbeeld | Must | 🔴 Hoog | Geanonimiseerd voorbeeld |
| 4 | Vergelijkingstabel Excel vs EnerCalculatie | Should | 🟡 Middel | — |
| 5 | Bezwaren-sectie | Should | 🟡 Middel | — |
| 6 | No-risk / garantie formulering | Should | 🟡 Middel | — |
| 7 | Urgentie element | Could | 🟢 Laag | Feitelijk juist zijn |

---

## Sprint suggestie

### Sprint 1 — Bewijs & begrip
- Story 1 — Demo video
- Story 2 — Hoe-het-werkt blok
- Story 3 — Adviesrapport voorbeeld

### Sprint 2 — Drempelverlagende elementen
- Story 4 — Vergelijkingstabel
- Story 5 — Bezwaren-sectie
- Story 6 — No-risk formulering
- Story 7 — Urgentie element

---

## Stories

---

### Story 1 — Demo video toevoegen

**Als** installateur die overweegt EnerCalculatie te proberen  
**wil ik** in 90 seconden zien hoe een echt dossier eruitziet  
**zodat** ik begrijp wat de tool doet zonder zelf een demo te boeken  

**MoSCoW:** Must  
**Afhankelijkheid:** video-opname door Pascal (geen developer-werk)

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik een ingebedde video direct onder of naast de hero

Given ik de video afspeelt
When ik hem bekijk
Then zie ik een echt adres worden ingevoerd,
  een energierekening worden geüpload,
  en een adviesrapport uitkomen
  alles binnen 90 seconden

Given de video niet automatisch afspeelt
When de pagina laadt
Then staat de video stil totdat ik zelf op play druk
  (geen autoplay met geluid)

Given ik op mobiel ben
When ik de video bekijk
Then is die volledig zichtbaar en bedienbaar op een klein scherm
```

#### Productie-instructies voor Pascal
- Gebruik Loom (gratis) of QuickTime schermopname
- Gebruik een fictief maar realistisch adres en een eigen energierekening
- Geen klantdata — genereer een demo-dossier
- Geen professionele productie nodig — authentiek en echt verkoopt beter
- Maximaal 90 seconden
- Voiceover: jouw stem, geen script — gewoon doorlopen wat je doet
- Embedden via YouTube (unlisted) of Vimeo

#### Technische notities
- Lazy-load de video — niet blokkeren voor LCP
- Thumbnail instellen (geen auto-gegenereerde)

---

### Story 2 — Hoe-het-werkt blok

**Als** installateur die beoordeelt of EnerCalculatie bij mijn werkwijze past  
**wil ik** in drie stappen begrijpen hoe de tool werkt  
**zodat** ik de drempel voel dalen en eerder doorklik  

**MoSCoW:** Must

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik een sectie met exact 3 stappen, elk met icoon en korte tekst

Given ik de stappen lees
When ik ze scan
Then begrijp ik het proces van adres invoeren tot rapport downloaden
  zonder technische termen

Given ik op mobiel ben
When ik de stappen bekijk
Then zijn ze verticaal gestapeld en goed leesbaar
```

#### Inhoud
**Sectie kop:** Zo werkt het — in 3 stappen

**Stap 1 — Pand registreren**  
Voer het adres in. PDOK-luchtfoto's en het actuele energieprofiel laden automatisch. Geen handmatig opzoekwerk.

**Stap 2 — Energierekening uploaden**  
Upload de pdf van de energierekening. Onze AI leest piek- en daltarieven en het gasverbruik exact uit. 0% typfouten.

**Stap 3 — Adviesrapport downloaden**  
EnerCalculatie berekent het optimale systeem en genereert een professioneel adviesrapport. Klaar voor de klant — in minder dan 5 minuten.

---

### Story 3 — Adviesrapport voorbeeld tonen

**Als** installateur die overweegt EnerCalculatie te kopen  
**wil ik** zien hoe het eindresultaat eruitziet dat ik aan mijn klant geef  
**zodat** ik kan beoordelen of dit professioneel genoeg is voor mijn klanten  

**MoSCoW:** Must  
**Afhankelijkheid:** geanonimiseerd voorbeeld-rapport beschikbaar stellen

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik een preview of screenshot van een echt adviesrapport

Given ik de preview bekijk
When ik die wil vergroten of downloaden
Then kan ik een geanonimiseerde PDF openen als voorbeeld

Given het rapport een echt adres of klantgegevens bevat
When het getoond wordt
Then zijn alle persoonlijke gegevens vervangen door fictieve data
  (Jan Voorbeeld, Fictiestraat 42, etc.)
```

#### Inhoud
**Sectie kop:** Dit is wat jouw klant in handen krijgt  
**Bijschrift:** Een professioneel, gepersonaliseerd adviesrapport — gegenereerd in EnerCalculatie. Klik om het voorbeeldrapport te bekijken.

#### Technische notities
- PDF hosten als statisch bestand op de server
- Thumbnail van eerste pagina als preview-afbeelding
- Geen klantdata — volledig fictief demo-rapport

---

### Story 4 — Vergelijkingstabel Excel vs EnerCalculatie

**Als** installateur die nog met Excel werkt  
**wil ik** in één oogopslag zien wat het verschil is  
**zodat** ik de overstap concreet kan afwegen  

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de vergelijkingstabel bekijk
When ik de rijen scan
Then zie ik minimaal 5 concrete vergelijkingspunten
  met meetbare of feitelijke verschillen

Given ik op mobiel ben
When ik de tabel bekijk
Then is die horizontaal scrollbaar of omgezet naar een leesbaar alternatief
```

#### Inhoud
**Sectie kop:** Nog werken met Excel en losse tools?

|  | Excel + handmatig | EnerCalculatie |
|---|---|---|
| **Tijd per dossier** | 2–3 uur | < 5 minuten |
| **Foutmarge berekeningen** | Hoog | 0% |
| **Actuele salderingsregels** | Handmatig bijhouden | Automatisch verwerkt |
| **PDOK-luchtfoto's** | Zelf opzoeken | Direct ingeladen |
| **Adviesrapport voor klant** | Zelf opmaken in Word | Automatisch gegenereerd |
| **Energierekening verwerken** | Handmatig overtypen | AI-extractie via upload |

---

### Story 5 — Bezwaren-sectie toevoegen

**Als** installateur met twijfels over de overstap  
**wil ik** dat mijn bezwaren direct worden weggenomen op de pagina  
**zodat** ik niet afhaakt maar toch een demo aanvraag  

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik twijfel over mijn data-veiligheid
When ik de bezwaren-sectie lees
Then vind ik een duidelijk antwoord over AVG en Nederlandse servers

Given ik twijfel of EnerCalculatie werkt met mijn bestaande tools
When ik de sectie lees
Then zie ik welke integraties beschikbaar zijn

Given ik twijfel of ik vastloop zonder support
When ik de sectie lees
Then zie ik een concrete support-belofte met reactietijd
```

#### Inhoud
Verwerken als uitklapbare FAQ-items (sluit aan op bestaande FAQ-sectie) of als aparte sectie met iconen.

**Bezwaar 1 — "Is mijn klantdata veilig?"**  
Alle dossiers staan op Nederlandse servers, volledig AVG-compliant en end-to-end versleuteld. Jij bent eigenaar van jouw data — altijd exporteerbaar, nooit gedeeld.

**Bezwaar 2 — "Werkt het met mijn huidige systemen?"**  
EnerCalculatie integreert via REST API met Exact Online, Teamleader en Afas. Gebruik je iets anders? We kijken samen wat mogelijk is.

**Bezwaar 3 — "Wat als ik vastloop?"**  
Elke klant krijgt persoonlijke onboarding. Daarna ben je bereikbaar via e-mail (reactie binnen 24 uur) of telefoon (Business-pakket: binnen 4 uur).

**Bezwaar 4 — "Kost dit me meer tijd dan het oplevert?"**  
Gebruik de ROI-calculator op deze pagina. Bij 10 dossiers per maand verdien je de kosten terug in de eerste week.

---

### Story 6 — No-risk / garantie formulering

**Als** installateur die twijfelt of hij het wil proberen  
**wil ik** weten dat ik niets riskeer bij het aanvragen van een demo  
**zodat** de drempel om te klikken zo laag mogelijk is  

**MoSCoW:** Should

#### Acceptatiecriteria

```gherkin
Given ik de demo-knop zie
When ik de omliggende tekst lees
Then staat er expliciet dat er geen creditcard nodig is
  of een andere no-risk formulering

Given ik overweeg een abonnement
When ik de prijzenpagina of CTA lees
Then zie ik een proefperiode of geld-terug-garantie benoemd
```

#### Inhoud
Onder de primaire CTA-knop toevoegen:  
*Geen creditcard vereist · Persoonlijke onboarding inbegrepen · Opzegbaar per maand*

Of bij prijzen:  
*Niet tevreden na 30 dagen? Je betaalt niets. Geen vragen, geen gedoe.*

#### Technische notities
- Kleine subtekst onder de knop — geen aparte sectie nodig
- Consistent toepassen op elke CTA-knop op de pagina

---

### Story 7 — Urgentie element toevoegen

**Als** geïnteresseerde installateur  
**wil ik** weten of er nog ruimte is voor nieuwe klanten  
**zodat** ik sneller besluit een demo te boeken  

**MoSCoW:** Could  
**Voorwaarde:** alleen live zetten als het feitelijk klopt — nooit nep-urgentie

#### Acceptatiecriteria

```gherkin
Given er beperkte onboarding-capaciteit is
When ik de CTA-sectie lees
Then zie ik een eerlijke melding over beschikbare plekken of wachttijd

Given de melding niet meer actueel is
When de capaciteit verandert
Then wordt de tekst direct bijgewerkt of verwijderd
  nooit een vaste "nog 3 plekken" die nooit verandert
```

#### Inhoud
Voorbeeld tekst (alleen als feitelijk juist):  
*We begeleiden nieuwe klanten persoonlijk bij de onboarding. Momenteel zijn er nog [X] startplekken beschikbaar in [maand]. Boek je demo om jouw plek te reserveren.*

#### Technische notities
- Beheerbaar via een eenvoudige config-variabele of CMS-veld
- Niet hardcoded in de HTML

---

## Buiten de backlog — actie voor Pascal

Story 1 (video) en Story 3 (rapport) zijn geen developer-taken maar content-taken. Die liggen bij Pascal:

| Actie | Door | Wanneer |
|---|---|---|
| Demo-video opnemen (90 sec, Loom) | Pascal | Voor Sprint 1 |
| Geanonimiseerd adviesrapport genereren als PDF | Pascal | Voor Sprint 1 |
| Beslissen welke garantietekst feitelijk klopt | Pascal | Voor Sprint 2 |
| Urgentie-tekst actueel houden na livegang | Pascal | Doorlopend |

## Definition of Ready

- Nieuwe teksten goedgekeurd door PO
- Video beschikbaar als embedbare URL
- Rapport-PDF beschikbaar en geanonimiseerd
- Urgentie-tekst feitelijk gecontroleerd

## Definition of Done

- Alle secties live op soon.enercalculatie.nl
- Getest op desktop en mobiel
- Video speelt af zonder autoplay
- Rapport-PDF downloadbaar
- Google Analytics events ingesteld op video-play en rapport-download

---

# Backlog — Landingspagina concurrentie-aanvullingen

## Epic: Landingspagina concurrentie-aanvullingen

**Probleem / kans:** Vergelijking met Solar Monkey en OpusFlow laat zien dat EnerCalculatie mist op vertrouwenssignalen (klantlogo's, score, cases), een dynamische prijscalculator en een lage-drempel instap via gratis proefperiode. Dit zijn bewezen conversieverhogers in de markt.  
**Doel & waarde:** De landingspagina brengen op het niveau van de marktleiders op de elementen die aantoonbaar bijdragen aan conversie — zonder de positionering als adviesmotor te verwateren.  
**Succesmetriek:**
- Prijscalculator wordt gebruikt door > 30% van bezoekers
- Klantlogo's zichtbaar binnen 2 weken na eerste betalende klant
- Demo-aanvragen stijgen na toevoeging gratis proefperiode CTA

**Scope:**
- ✅ Dynamische prijscalculator
- ✅ Klantlogo's + beoordelingsscore sectie
- ✅ Integratiepagina en logo's in body
- ✅ Gratis proefperiode CTA
- ✅ Cases / succesverhalen pagina (fundament)
- ❌ Volledig kenniscentrum / blog (aparte epic)
- ❌ ERP-functionaliteit (bewust buiten scope)
- ❌ Per-project pricing model (vaste prijs is voordeel)

**Aannames & risico's:**
- Klantlogo's en cases zijn afhankelijk van betalende klanten — niet eerder live
- Gratis proefperiode vereist beslissing over onboarding-schaalbaarheid
- Prijscalculator moet rekenkundig kloppen met de werkelijke prijzen

---

## Overzicht & prioritering

| # | Story | MoSCoW | Impact | Afhankelijk van |
|---|---|---|---|---|
| 1 | Dynamische prijscalculator | Must | 🔴 Hoogst | — |
| 2 | Integratiepagina + logo's in body | Must | 🔴 Hoog | — |
| 3 | Klantlogo's + beoordelingsscore | Must | 🔴 Hoog | Eerste betalende klanten |
| 4 | Gratis proefperiode CTA | Should | 🟡 Middel | Onboarding schaalbaar |
| 5 | Cases / succesverhalen pagina | Should | 🟡 Middel | Minimaal 2 klanten |
| 6 | Kennisartikel fundament (SEO) | Could | 🟢 Lang termijn | Na livegang |

---

## Sprint suggestie

### Sprint 1 — Nu te bouwen (geen klanten nodig)
- Story 1 — Dynamische prijscalculator
- Story 2 — Integratiepagina + logo's in body

### Sprint 2 — Na eerste klanten
- Story 3 — Klantlogo's + beoordelingsscore
- Story 4 — Gratis proefperiode CTA

### Sprint 3 — Groei
- Story 5 — Cases pagina
- Story 6 — Kennisartikel fundament

---

## Stories

---

### Story 1 — Dynamische prijscalculator

**Als** installateur die overweegt EnerCalculatie aan te schaffen  
**wil ik** direct zien wat het abonnement kost én wat het oplevert  
**zodat** ik de aankoopbeslissing rationeel kan maken zonder een demo te boeken  

**MoSCoW:** Must  
**Tijdsinschatting:** 4-6 uur

#### Acceptatiecriteria

```gherkin
Given ik de prijzenpagina of prijzensectie bekijk
When ik het aantal dossiers per maand inschuif
Then toont de calculator direct:
  - De maandelijkse abonnementsprijs (op basis van pakket)
  - De tijdsbesparing per maand (in uren)
  - De vrijgekomen waarde per maand (uren × €75 uurtarief)
  - De ROI-ratio (waarde ÷ kosten)

Given ik switch tussen pakketten (Standaard / Business)
When ik op een pakket klik
Then updaten alle cijfers direct zonder pagina-reload

Given ik op mobiel ben
When ik de calculator gebruik
Then is de slider bedienbaar met touch
  en zijn alle cijfers leesbaar

Given de ROI-waarde hoger is dan de abonnementsprijs
When de calculator de uitkomst toont
Then is de vrijgekomen waarde visueel benadrukt in groen
```

#### Rekenlogica
- Tijdsbesparing per maand = aantal dossiers × 2.5 uur (bespaard per dossier)
- Vrijgekomen waarde = tijdsbesparing × €75 (advies/installatietarief)
- ROI-ratio = vrijgekomen waarde ÷ abonnementsprijs
- Terugverdientijd = abonnementsprijs ÷ vrijgekomen waarde × 30 (dagen)

#### Inhoud
**Sectie kop:** Wat levert EnerCalculatie jou op?

Voorbeeld uitkomst bij 20 dossiers/mnd, Standaard pakket:
- Abonnement: €149/mnd
- Tijdsbesparing: 50 uur/mnd
- Vrijgekomen waarde: €3.750/mnd
- ROI: 25× — terugverdiend in 1,2 dag

**CTA onder de calculator:**  
*Dit zijn jouw cijfers — boek een demo om het in de praktijk te zien.*

#### Technische notities
- Uitbreiding op bestaande ROI-calculator component
- Sliders: 5–200 dossiers/mnd
- Pakketselectie: Standaard (€149) / Business (€249)
- Geen API-call nodig — volledig client-side berekening
- Prijzen als config-variabele, niet hardcoded

---

### Story 2 — Integratiepagina + logo's in body

**Als** installateur die al werkt met Exact Online of Teamleader  
**wil ik** direct zien dat EnerCalculatie daarmee integreert  
**zodat** ik weet dat ik mijn bestaande workflow niet hoef aan te passen  

**MoSCoW:** Must  
**Tijdsinschatting:** 3-4 uur

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik integratielogo's (Exact Online, Teamleader, Afas, PDOK)
  zichtbaar in de body — niet alleen in de footer

Given ik op een integratielogo klik of hover
When ik de tooltip of tekst lees
Then zie ik een één-zin omschrijving van wat de integratie doet

Given ik de integratiepagina bezoek via /integraties
When de pagina laadt
Then zie ik per integratie: naam, logo, beschrijving, status (beschikbaar / binnenkort)

Given een integratie nog niet beschikbaar is
When ik die zie in de lijst
Then staat er duidelijk "Binnenkort beschikbaar"
  zodat ik geen verkeerde verwachting heb
```

#### Inhoud
**Sectie kop in body:** Werkt naadloos samen met jouw bestaande tools

**Integraties:**
| Naam | Status | Omschrijving |
|---|---|---|
| Exact Online | Beschikbaar | Synchroniseer klanten en projecten automatisch |
| Teamleader | Beschikbaar | Koppel dossiers aan je CRM en agenda |
| Afas | Beschikbaar | Exporteer naar je administratie zonder handmatig werk |
| PDOK Kadaster | Beschikbaar | Luchtfoto's en panddata direct ingeladen via adres |

**CTA onder de logo's:**  
*Jouw tool staat er niet bij? Neem contact op — we bouwen graag mee.*

#### Technische notities
- Integratiepagina op `/integraties`
- Logo's in SVG voor scherpe weergave op alle schermen
- Status per integratie beheerbaar via config of CMS-veld

---

### Story 3 — Klantlogo's + beoordelingsscore

**Als** twijfelende installateur  
**wil ik** zien dat andere installateurs EnerCalculatie al gebruiken en waarderen  
**zodat** ik durft te vertrouwen op de tool zonder het zelf te hoeven uitproberen  

**MoSCoW:** Must — zodra eerste betalende klanten beschikbaar  
**Afhankelijkheid:** minimaal 3 klanten die toestemming geven voor logo-gebruik

#### Acceptatiecriteria

```gherkin
Given ik de landingspagina bezoek
When ik door de pagina scroll
Then zie ik een sectie met klantlogo's en een beoordelingsscore

Given er nog geen klanten zijn
When de pagina live gaat
Then is deze sectie volledig weggelaten
  nooit een lege of placeholder-sectie tonen

Given een klantlogo getoond wordt
When ik het zie
Then is het logo scherp, heeft het het juiste formaat
  en is toestemming van de klant schriftelijk vastgelegd

Given een beoordelingsscore getoond wordt
When ik die lees
Then verwijst die naar een aantoonbaar platform (Google Reviews of Trustpilot)
  nooit een zelf verzonnen score
```

#### Inhoud
**Sectie kop:** Vertrouwd door installateurs door heel Nederland

**Format:**
- Klantlogo's in een horizontale rij (grijswaarden voor stijlconsistentie)
- Onder de logo's: sterren + score + platform-naam
- Bijschrift: "X installatiebedrijven werken al met EnerCalculatie"

#### Actie voor Pascal (buiten developer-werk)
- Toestemming vragen bij eerste klanten voor logo-gebruik
- Google My Business profiel aanmaken voor reviewverzameling
- Trustpilot-profiel aanmaken als alternatief

---

### Story 4 — Gratis proefperiode CTA

**Als** installateur die zelf wil beslissen of EnerCalculatie bij mij past  
**wil ik** de tool kunnen proberen zonder eerst een afspraak te maken  
**zodat** de drempel om te starten zo laag mogelijk is  

**MoSCoW:** Should  
**Afhankelijkheid:** beslissing PO over onboarding-model (begeleid vs zelfstandig)

#### Acceptatiecriteria

```gherkin
Given ik de hero zie
When ik de CTA-opties scan
Then zie ik naast "Boek een demo" ook een optie om zelfstandig te starten

Given ik kies voor de proefperiode
When ik doorklik
Then kom ik op een registratiepagina zonder creditcard-vereiste

Given de proefperiode afloopt
When ik geen abonnement heb gekozen
Then ontvang ik een e-mail met de vraag of ik wil doorgaan
  geen automatische afschrijving

Given ik de proefperiode-knop zie
When ik de bijschrift-tekst lees
Then staat er expliciet: "14 dagen gratis · Geen creditcard · Persoonlijke onboarding"
```

#### Inhoud
**Tweede CTA-knop naast "Boek een demo":**  
*Probeer 14 dagen gratis*

**Bijschrift onder de knoppen:**  
*Geen creditcard · Persoonlijke onboarding inbegrepen · Opzegbaar per maand*

#### Technische notities
- Registratiepagina is een aparte story in de app-epic
- Proefperiode-logica (14 dagen, feature-toegang) is app-logica — niet landingspagina-logica
- Deze story raakt alleen de landingspagina: knoptekst + link

---

### Story 5 — Cases / succesverhalen pagina

**Als** installateur die serieus overweegt EnerCalculatie te kopen  
**wil ik** concrete verhalen lezen van collega-installateurs  
**zodat** ik me kan identificeren met hun situatie en beslissing  

**MoSCoW:** Should  
**Afhankelijkheid:** minimaal 2 klanten bereid tot een case-interview

#### Acceptatiecriteria

```gherkin
Given ik de navigatie bekijk
When ik de links scan
Then zie ik een "Cases" of "Succesverhalen" link in het menu

Given ik een case lees
When ik door de pagina scroll
Then zie ik: bedrijfsnaam, locatie, type installaties,
  probleem vóór EnerCalculatie, resultaat ná EnerCalculatie,
  één concreet getal (bv. "van 3 uur naar 8 minuten per dossier")

Given ik onderaan een case ben
When ik de pagina afsluit
Then zie ik een CTA om een demo te boeken
```

#### Inhoud per case (template)
**Bedrijf:** [naam] — [stad]  
**Specialisatie:** [zonnepanelen / warmtepomp / combinatie]

**Het probleem:**  
[2-3 zinnen over hoe ze het vroeger deden]

**De oplossing:**  
[2-3 zinnen over wat ze nu anders doen met EnerCalculatie]

**Het resultaat:**  
"[citaat van de eigenaar]"  
→ Van X uur naar Y minuten per dossier  
→ Conversie gestegen met Z%

#### Actie voor Pascal (buiten developer-werk)
- Case-interview afnemen met eerste klanten (30 min gesprek)
- Toestemming voor naam, bedrijf en foto vastleggen

---

### Story 6 — Kennisartikel fundament (SEO)

**Als** installateur die zoekt op "terugverdientijd thuisbatterij berekenen"  
**wil ik** een helder artikel vinden dat mij helpt  
**zodat** ik EnerCalculatie leer kennen als de expert in dit domein  

**MoSCoW:** Could  
**Tijdsinschatting:** 2-3 uur per artikel (Pascal schrijft, developer publiceert)

#### Acceptatiecriteria

```gherkin
Given ik zoek op een relevante term in Google
When ik de zoekresultaten bekijk
Then staat er minimaal 1 artikel van enercalculatie.nl in de resultaten

Given ik het artikel lees
When ik de inhoud scan
Then bevat het concrete, accurate informatie over het onderwerp
  en een CTA naar de tool of demo

Given het artikel gepubliceerd is
When ik de technische SEO check
Then heeft het een unieke meta title, description en heading-structuur
```

#### Onderwerp-suggesties (op zoekvolume)

| Onderwerp | Zoekintentie |
|---|---|
| Hoe bereken je de terugverdientijd van zonnepanelen? | Informatief — installateur + eindklant |
| Salderingsregeling 2025 — wat verandert er voor installateurs? | Actueel — hoge urgentie |
| Warmtepomp vs zonnepanelen — wat adviseer je eerst? | Beslissing — installateursgericht |
| Wat is een goede ROI voor een thuisbatterij in Nederland? | Informatief — eindklant zoekt dit |

#### Technische notities
- Blog sectie op `/blog` of `/kennis`
- Statisch gegenereerde pagina's (SSR/SSG) voor SEO
- Minimaal 800 woorden per artikel
- Intern linken naar relevante feature-pagina's

---

## Buiten de backlog — acties voor Pascal

| Actie | Prioriteit | Wanneer |
|---|---|---|
| Google My Business aanmaken voor reviews | 🔴 Nu | Direct |
| Toestemming klantlogo's vragen bij eerste klanten | 🔴 Zodra klant | Direct bij onboarding |
| Case-interview plannen met eerste 2 klanten | 🟡 Na eerste klanten | Binnen 2 weken na start |
| Beslissing: begeleid vs zelfstandig proefperiode | 🟡 Voor Sprint 2 | Voor Story 4 |
| Eerste kennisartikel schrijven | 🟢 Lang termijn | Na livegang |

## Definition of Ready

- Nieuwe content goedgekeurd door PO
- Klanttoestemmingen schriftelijk vastgelegd (stories 3, 5)
- Rekenlogica prijscalculator gevalideerd door PO (story 1)
- Onboarding-model besloten (story 4)

## Definition of Done

- Alle secties live op enercalculatie.nl
- Getest op desktop en mobiel
- Google Analytics events ingesteld op calculator-gebruik
- Beoordelingsscore verwijst naar aantoonbaar platform
- Cases: toestemming geverifieerd en vastgelegd
