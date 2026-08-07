# Dynamische energiecontracten adviseren: hoe onderbouwt u de sturing van batterij en warmtepomp?

Het adviseren over dynamische energiecontracten en de bijbehorende aansturing van installaties vraagt om een onderbouwing van zowel financiële als technische aspecten. Hierbij spelen markttarieven, regelgeving en de capaciteit van de elektrische aansluiting een centrale rol.

## Werking van dynamische energiecontracten

Dynamische elektriciteitscontracten werken met uurprijzen die direct gekoppeld zijn aan de spotmarkt (EPEX Spot Day-Ahead). Leveranciers van deze contracten zijn wettelijk gehouden om de inkoopvergoeding en opslagen bovenop de spotmarktprijs transparant te vermelden.

Daarnaast staat de markt voor een verandering: de salderingsregeling voor kleinverbruikers wordt per 1 januari 2027 afgeschaft. Hierdoor verschuift het financiële rendement van zelfopgewekte stroom naar directe consumptie en slimme opslag.

## De rol van een Energy Management System (EMS)

Een Energy Management System (EMS) regelt de belasting in huis dynamisch via load balancing. Dit helpt om piekstromen en afschakeling van de hoofdzekering te voorkomen. 

Daarnaast kan een EMS warmtepompen en thuisbatterijen automatisch aansturen op basis van de actuele uurtarieven. Stroomverbruik kan hiermee worden verplaatst naar goedkope of negatieve uren. Deze slimme sturing vermindert de piekbelasting op het lokale elektriciteitsnet, wat bijdraagt aan het tegengaan van netcongestie.

## Sturing van warmtepompen en thuisbatterijen

Bij het aansturen van warmtepompen en thuisbatterijen gelden de volgende mogelijkheden en eigenschappen:

* **Warmtepompen:** Warmtepompen die gekoppeld zijn aan een thermisch buffervat kunnen warmte voor ruimtes of warm tapwater voorproduceren tijdens uren met lage elektriciteitsprijzen.
* **Thuisbatterijen:** Thuisbatterijen kunnen worden ingezet voor handel op de onbalansmarkt of de dynamische dag-vooruitmarkt. Het aansturingsalgoritme dient hierbij rekening te houden met de degradatie van de batterijcellen. 1-fase thuisbatterijen kunnen over het algemeen met maximaal 3,68 kW tot 5 kW laden of ontladen, afhankelijk van de netbeheerder.

## Technische randvoorwaarden en netcapaciteit

Bij het adviseren van sturing moet rekening gehouden worden met de technische grenzen van de elektrische installatie:

* **Beveiliging en selectiviteit (NEN 1010):** De NEN 1010 eist dat installaties adequaat beveiligd zijn tegen overstroom. Gelijktijdigheid moet hierin worden berekend, waarbij selectiviteit als belangrijke vuistregel geldt.
* **Maximaal vermogen op de aansluiting:** Bij een hoofdaansluiting van 1x35A of 3x25A mag een omvormer of laadpaal doorgaans op maximaal 16A worden afgezekerd (rekening houdend met de veiligheidsmarge/factor 1.6). Dit betekent een maximaal vermogen van 3,68 kW (16A × 230V) per fase. Op een 3x25A aansluiting bedraagt het maximale 3-fase vermogen daarmee ~11 kW (3 × 16A). Hoewel een 3x25A aansluiting een continu vermogen van 17,25 kW heeft, is het onjuist om te claimen dat dit volledige vermogen zomaar aangesloten kan worden; hogere vermogens vereisen verzwaring van de aansluiting (bijvoorbeeld naar 3x35A).
* **Fase-onbalans en Netcode Elektriciteit:** Om fase-onbalans te voorkomen, geldt op basis van de Netcode Elektriciteit dat invoeding boven de 16A (3,68 kVA) over meerdere fases verdeeld dient te worden. Vanaf omvormers groter dan ~3,68 kW (in de praktijk vaak vanaf 4 kW) moet daarom worden overgestapt op een 3-fase omvormer. Bij zonnepanelen is boven de 5 kW aan omvormervermogen veelal een 3-fase aansluiting noodzakelijk.
* **Laadpalen:** Het maximale vermogen op een 3x25A aansluiting is doorgaans 11 kW per lader zonder slimme sturing, tenzij load balancing actief is.

## Conclusie

Het onderbouwen van een advies voor dynamische contracten rust op het combineren van tariefstructuren met de technische grenzen van de installatie. Met een EMS kan het verbruik van warmtepompen en batterijen afgestemd worden op uurprijzen van de spotmarkt en het vervallen van de salderingsregeling per 2027. De bepalingen uit de NEN 1010 en de Netcode Elektriciteit stellen hierbij duidelijke kaderrichtlijnen voor wat betreft selectiviteit, vermogensgrenzen en faseverdeling.