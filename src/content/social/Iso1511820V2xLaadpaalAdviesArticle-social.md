# Post 1: Probleem & Oplossing

Een bidirectionele laadpaal (V2X) is níét simpelweg een kwestie van een software-update uitvoeren. 

Veel installateurs lopen vast op een onvoorzien risico in de meterkast: het gevaar van somstromen volgens NEN 1010.

**Het probleem:**
Wanneer een elektrisch voertuig via V2X stroom teruglevert aan de woning terwijl ook de netvoeding actief is op dezelfde groep, tellen de stromen bij elkaar op. 

25A vanaf het net + 16A vanaf het voertuig = 41A totale stroom. 

Een standaard 40A-aardlekschakelaar is hier niet op berekend. Het gevolg? Overbelasting, oververhitting en in het ergste geval brandgevaar.

**De oplossing:**
Een toekomstbestendig advies combineert de internationale ISO 15118-20 norm en OCPP 2.0.1 met een strikte toetsing van de gedeelde beveiligingen in de meterkast. Zorg dat het nominale vermogen van de beveiligingscomponenten is afgestemd op de gecombineerde stroom én pas Dynamic Load Balancing toe.

Wil je precies weten waar je op moet letten bij de hardwarekeuze en NEN 1010 eisen voor V2X?

Lees het volledige artikel op enercalculatie.nl/kennisbank

---

# Post 2: Datapunt & Inzicht

**11 kW laden op een 3x25A aansluiting laat slechts 9A per fase over voor het huishouden.**

Bij een 3-fase laadpaal op 11 kW trekt het voertuig 16A per fase. Sluit de klant 's avonds de auto aan en zet tegelijkertijd de warmtepomp of inductiekookplaat aan? Dan grijpt de hoofdzekering in.

Met de komst van bidirectioneel laden (V2X) en de ISO 15118-20 communicatiestandaard verandert de rol van de EV-accu. De auto wordt een flexibele thuisbatterij, maar stelt extreme eisen aan het energiemanagement in de woning.

**De belangrijkste technische inzichten op een rij:**
* **ISO 15118-20 & OCPP 2.0.1:** De vereiste combinatie door netbeheerders voor het veilig aansturen van V2G en het voorkomen van netcongestie.
* **Plug & Charge (PnC):** Automatische authenticatie via PKI-certificaten en TLS-encryptie, zonder fysieke laadpas.
* **Noodzaak van Load Balancing:** Sturing via P1-poort of CT-spoelen is niet langer optioneel, maar noodzakelijk om de 3x25A hoofdzekering heel te houden.

Fabrikanten zoals Alfen en Zaptec bereiden hun hardware hier nu al op voor. Ben jij als installateur al voorbereid op deze eisen?

Duik in de technische details en lees het complete artikel op enercalculatie.nl/kennisbank

---

# Post 3: Punchy & Discussie

Bidirectioneel laden (V2X) via ISO 15118-20 wordt door netbeheerders gepresenteerd als dé oplossing voor netcongestie. 

Maar laten we eerlijk zijn: de praktische complexiteit wordt neergelegd bij de installateur.

Van beveiliging tegen somstromen (NEN 1010) tot het inrichten van PKI-certificaten voor Plug & Charge en het voorkomen van het trippen van 3x25A hoofdzekeringen. Een laadpaal adviseren is al lang geen kwestie meer van 'beugeltje ophangen en kabel trekken'.

Stelling: *Installateurs die nu nog laadpalen adviseren zonder ondersteuning voor ISO 15118-20 en OCPP 2.0.1, zadelen hun klanten over twee jaar op met verouderde hardware.*

Ben je het hiermee eens, of zie je dat in de praktijk anders? 

Praat mee in de reacties of lees de volledige analyse op enercalculatie.nl/kennisbank