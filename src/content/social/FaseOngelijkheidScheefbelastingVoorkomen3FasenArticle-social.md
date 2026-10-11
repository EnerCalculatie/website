# Post 1

Een klagende klant omdat de hoofdschakelaar eruit vliegt zodra de zonnepanelen én de laadpaal tegelijk draaien? Een terugkerend probleem bij residentiële 3x25A aansluitingen.

Wanneer 1-fase omvormers en laadpalen willekeurig op een 3-fase aansluiting worden aangesloten, ontstaat er ernstige scheefbelasting. Dit leidt tot concrete technische problemen in de praktijk:

- Uitval van de PV-omvormer door overspanning op een sterk invoedende fase.
- Een uitschakelende hoofdzekering, terwijl de overige twee fasen nauwelijks worden belast.
- Risico op overbelasting van de verdeelrail en aardlekschakelaars door somstromen (25A net + 16A PV = 41A op een component dat gedimensioneerd is op 40A).

De oplossing vereist een gestructureerde aanpak in het ontwerp:

1. **Fysieke rotatie:** Verdeel 1-fase apparaten doordacht over de installatie (bijv. PV op L1, laadpaal op L2, warmtepomp/verbruikers op L3).
2. **Dynamische sturing:** Pas Dynamic Load Balancing (DLB) toe via P1 of CT-spoelen om de actuele fasebelasting continu te bewaken.
3. **Schalen naar 3-fase:** Stap over op 3-fase apparatuur zodra het vermogen de grens van 3,68 kW (16A) overstijgt.

Hiermee voorkomt u storingen, waarborgt u de veiligheid conform NEN 1010 en voorkomt u onnodige kosten voor netverzwaring bij de netbeheerder.

Lees het volledige artikel met praktijkcases op enercalculatie.nl/kennisbank

---

# Post 2

Wist u dat een 16A PV-omvormer op een standaard 3x25A aansluiting kan leiden tot overbelasting van een 40A aardlekschakelaar? 

Bij het ontwerpen van een groepenkast wordt de focus vaak gelegd op de hoofdzekering, maar de Netcode Elektriciteit en NEN 1010 stellen harde grenzen aan faseverdeling en vermogens.

De belangrijkste datapunten en normen op een rij:

- **3,68 kW (16A):** De maximale grens voor enkelfasige invoeding of afname per fase. Boven dit vermogen is een 3-fase omvormer volgens de richtlijnen noodzakelijk.
- **11 kW (3 x 16A):** Het maximale totale 3-fase vermogen op een 3x25A aansluiting, rekening houdend met de factor 1,6 voor selectiviteit.
- **41A somstroom:** Wanneer een 16A omvormer invoert op een fase die ook 25A uit het net trekt, ontstaat een optelsom van 41A op de interne verdeelrail. Dit overstijgt de standaard belastbaarheid van veel toegepaste 40A aardlekschakelaars.

Het correct berekenen en verdelen van de fasebelasting is geen bijzaak, maar een essentieel onderdeel van een veilige installatie.

Bekijk alle technische onderbouwingen en de beslisboom op enercalculatie.nl/kennisbank

---

# Post 3

Wordt er binnen uw installatiebedrijf bij uitbreidingen nog gewerkt met 1-fase apparatuur, of kiest u standaard voor 3-fase en Dynamic Load Balancing?

Met de snelle toename van warmtepompen, laadpalen en zonnepanelen op residentiële 3x25A aansluitingen is het 'zomaar' aansluiten van een zware 1-fase verbruiker op L1 een risico geworden. Scheefbelasting veroorzaakt niet alleen storingen bij de eindgebruiker, maar kan door somstromen op de verdeelrail ook directe veiligheidsrisico's opleveren.

Stelling: Een professionele installateur levert op een 3-fase aansluiting geen vermogens boven de 3,68 kW meer enkelfasig op, ongeacht de wens van de klant.

Hoe borgt u de fasebalans bij toekomstige uitbreidingen in uw ontwerpen?

Lees het volledige artikel over het voorkomen van scheefbelasting op enercalculatie.nl/kennisbank