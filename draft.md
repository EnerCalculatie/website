# Dynamische energiecontracten adviseren: hoe onderbouwt u de sturing van batterij en warmtepomp?

Bij het adviseren over dynamische energiecontracten en de slimme sturing van thuisbatterijen en warmtepompen spelen zowel markttechnische als installatietechnische factoren een rol. Een onderbouwd advies rust op inzicht in tariefstructuren, sturingsmogelijkheden en de bijbehorende veiligheids- en capaciteitsnormen.

## Werking van dynamische energiecontracten

Bij een dynamisch energiecontract veranderen de elektriciteitstarieven elk uur op basis van de spotmarkt (EPEX Spot). De gastarieven veranderen doorgaans elke 24 uur op basis van de EEX-beurs. Energieleveranciers mogen bovenop deze kale beursprijs een inkoopvergoeding per kWh en m³ alsook vaste leveringskosten in rekening brengen.

Voor het optimaal laten functioneren van geautomatiseerde sturing op basis van deze dynamische tarieven is een werkende slimme meter vereist die gedetailleerde meetdata uitleest.

## Slimme sturing via een Energiemanagementsysteem (EMS)

Een Energiemanagementsysteem (EMS) regelt de belasting in huis dynamisch (load balancing) om piekstromen en afschakeling van de hoofdzekering te voorkomen. Via een EMS kunnen apparaten geautomatiseerd worden aangestuurd op basis van marktcurves:

- **Thuisbatterij:** Een thuisbatterij kan geautomatiseerd laden tijdens uren met lage of negatieve beursprijzen en ontladen tijdens piekuren met hoge tarieven.
- **Warmtepomp:** De sturing van een warmtepomp op dynamische tarieven maakt gebruik van thermische opslag in een buffer- of boilervat om warmte te produceren en op te slaan gedurende goedkope of negatieve stroomuren.

Slimme, dynamische sturing van warmtepompen en batterijen helpt bij het beperken van piekbelastingen op het lokale laagspanningsnet (netcongestie). Daarnaast verhoogt het afschaffen van de salderingsregeling per 2027 de economische noodzaak om opgewekte zonne-energie direct te verbruiken of op te slaan via slim gestuurde apparaten.

## Technische randvoorwaarden en installatie-eisen

Bij het opstellen van een advies moet rekening worden gehouden met de vermogensgrenzen van de apparatuur en de eisen uit de NEN 1010 en Netcode Elektriciteit.

### Vermogen en fasering
- **Warmtepompen:** Een warmtepomp boven de 5 kW thermisch vraagt in veel gevallen om een 3-fase aansluiting voor een optimale verdeling van de belasting.
- **Thuisbatterijen:** 1-fase thuisbatterijen kunnen over het algemeen met maximaal 3,68 kW tot 5 kW laden of ontladen, afhankelijk van de netbeheerder.
- **Zonnepanelen:** Boven de 5 kW aan omvormervermogen is een 3-fase aansluiting veelal noodzakelijk om onbalans in het net te voorkomen.
- **Fase-onbalans:** Om fase-onbalans volgens de Netcode Elektriciteit te voorkomen, dient invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld te worden. Dit betekent dat men vanaf omvormers groter dan circa 3,68 kW (of 4 kW in de praktijk) dient over te stappen op een 3-fase omvormer.

### Beveiliging, selectiviteit en somstromen (NEN 1010)
De NEN 1010 eist dat elektrische installaties adequaat beveiligd zijn tegen overstroom, waarbij de gelijktijdigheid moet worden berekend.

- **Selectiviteit en maximaal invoedvermogen:** Bij een hoofdaansluiting van 1x35A of 3x25A mag een omvormer of laadpaal (met toepassing van de veiligheidsmarge/factor 1,6) op maximaal 16A worden afgezekerd. Dit komt overeen met een maximaal vermogen van 3,68 kW (16A × 230V) per fase, of circa 11 kW totaal bij een 3-fase opstelling op 3x25A. Hoewel het continue vermogen van een 3x25A aansluiting 17,25 kW bedraagt, is het onjuist om te claimen dat dit volledige vermogen zomaar op een standaard huisaansluiting kan worden aangesloten; dit vereist verzwaring van de aansluiting (bijvoorbeeld naar 3x35A of hoger).
- **Somstromen bij gelijktijdige invoeding:** Indien het net én een omvormer (PV of batterij) op dezelfde groep of dezelfde aardlekschakelaar kunnen invoeden, telt de stroom van beide bronnen bij elkaar op. Zo geeft een combinatie van 25A vanaf het net en 16A vanaf de omvormer een optelsom van 41A. Een standaard 40A-aardlekschakelaar is daar niet op berekend, wat kan leiden tot overbelasting en brandgevaar. Bij gelijktijdige invoeding (zoals een ontladende batterij terwijl het net ook belast wordt) moet de optelsom van alle gelijktijdig actieve stromen getoetst worden aan de nominale stroom van elke gedeelde beveiliging.