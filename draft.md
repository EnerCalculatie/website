## DC/AC-verhouding van een omvormer: hoe legt u overdimensionering uit aan uw klant?

Bij het ontwerpen van een zonnestroomsysteem komt de verhouding tussen het vermogen van de zonnepanelen en het vermogen van de omvormer regelmatig ter sprake. In veel gevallen wordt er gekozen voor overdimensionering. Wat houdt dit precies in, hoe verhoudt dit zich tot de technische grenzen en de veiligheidseisen, en hoe legt u dit helder uit aan uw klant?

---

## Wat is overdimensionering van een omvormer?

Overdimensionering houdt in dat het totale piekvermogen aan de gelijkstroomzijde (DC in Wattpiek, Wp) van de zonnepanelen hoger is dan het maximale wisselstroomvermogen (AC in kilowatt, kW) van de omvormer. 

In de praktijk ligt een gebruikelijke DC/AC-verhouding bij residentiële PV-systemen tussen de 110% en 130% (een DC/AC-ratio van 1,1 tot 1,3). De exacte optimale verhouding is afhankelijk van factoren zoals de dakoriëntatie en de hellingshoek van de zonnepanelen.

---

## Waarom kiest men voor overdimensionering?

Het overdimensioneren van de DC-zijde ten opzichte van de AC-zijde biedt verschillende praktische voordelen voor de werking van het systeem:

- **Eerdere opstart van de omvormer:** Door overdimensionering bereikt de omvormer sneller op de dag zijn minimale opstartspanning (start-up voltage). Hierdoor wordt de dagelijkse productieperiode van het systeem verlengd.
- **Hogere efficiëntie bij minder zonlicht:** Op bewolkte dagen en in de wintermaanden genereren zonnepanelen minder vermogen. Met een hogere DC-capaciteit produceert het systeem gedurende deze perioden sneller en efficiënter bruikbaar vermogen.
- **Beperkt verlies door clipping:** Wanneer de zonnepanelen op piekmomenten meer vermogen genereren dan de omvormer aan de AC-zijde maximaal kan omzetten, treedt 'clipping' (het aftoppen van vermogen) op. Bij een lichte overdimensionering (bijvoorbeeld 120%) bedraagt het jaarlijkse opbrengstverlies door clipping in de praktijk vaak slechts 1% tot 3%. Dit lichte verlies weegt in veel gevallen op tegen de extra winst in de ochtend, avond en koudere maanden.

---

## Netspanning en de 253V-grens

Naast de direct opgebrachte energie speelt ook de situatie op het elektriciteitsnet een rol:

- In buurten waar veel zonnepanelen op het net zijn aangesloten, kan de netspanning op zonnige dagen stijgen.
- Omvormers zijn ingesteld om uit te schakelen bij een te hoge netspanning (de 253V-grens) om de netveiligheid te waarborgen.
- Een kleinere AC-omvormer voedt minder vermogen per tijdsseenheid in op het net. Dit beperkt het risico dat de omvormer uitschakelt als gevolg van deze 253V-grens.

---

## Aansluiting en veiligheid: NEN 1010 en de hoofdzekering

Het bepalen van de AC-omvormercapaciteit moet worden afgestemd op de capaciteit van de hoofdaansluiting en de geldende installatienormen:

- **Aansluitcapaciteit:** Het maximaal aan te sluiten AC-vermogen op de hoofdaansluiting bepaalt de limiet voor de omvormercapaciteit. Dit voorkomt dat de netoverbelastingsbeveiliging (de hoofdzekering) kan spreken of dat een verhoging van de aansluiting noodzakelijk is.
- **Continuous vermogen en net-onbalans:** Bij een 3x25A-aansluiting geldt doorgaans een continu vermogen van 17,25 kW. Wanneer het omvormervermogen boven de 5 kW uitkomt, is in veel gevallen een 3-fase aansluiting noodzakelijk om onbalans in het net te voorkomen.
- **Beveiliging conform NEN 1010:** De NEN 1010 stelt dat elektrische installaties adequaat beveiligd moeten zijn tegen overstroom. Daarbij moet bij het ontwerp en de beveiliging de gelijktijdigheid van belastingen en opwekking worden berekend. 
- **Piekstromen beheren:** Een Home Energy Management System (EMS) kan de belasting in de woning dynamisch regelen (load balancing). Dit helpt om piekstromen op te vangen en het afschakelen van de hoofdzekering te voorkomen.

---

## Technische grenzen van de omvormer (Vmax en Isc)

Hoewel het verhogen van de DC/AC-ratio nuttig kan zijn, moet er rekening worden gehouden met de maximale specificaties van de omvormerfabrikant:

- Omvormerfabrikanten hanteren strikte grenzen voor de maximale DC-ingangsspanning ($V_{max}$) en de kortsluitstroom ($I_{sc}$).
- Het overschrijden van de maximale spanning kan permanente schade aan het apparaat veroorzaken en laat de fabrieksgarantie vervallen.
- De DC-ingangsspanning van de aangesloten panelenreeks dient daarom onder alle omstandigheden gecontroleerd te worden binnen de door de fabrikant gestelde waarden.