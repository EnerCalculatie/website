# DC/AC-verhouding van een omvormer: overdimensionering uitgelegd

Bij het ontwerpen van een zonne-energie-installatie speelt de DC/AC-verhouding van een omvormer een belangrijke rol. In dit artikel wordt uitgelegd wat deze verhouding inhoudt, hoe overdimensionering in de praktijk werkt en welke invloed dit heeft op het systeem en de netaansluiting.

## Wat is de DC/AC-verhouding?

De DC/AC-verhouding geeft de verhouding aan tussen het totale geïnstalleerde piekvermogen van de zonnepanelen (DC-zijde in Wattpiek) en het maximale wisselstroom-uitgangsvermogen van de omvormer (AC-zijde in Watt). 

Zonnepanelen behalen hun theoretische Standard Test Conditions (STC) vermogen in de praktijk zelden. Dit wordt veroorzaakt door omgevingsfactoren zoals een verhoogde celtemperatuur, een niet-optimale hellingshoek en de oriëntatie van de panelen.

## Wat houdt overdimensionering in?

Van het overdimensioneren van een omvormer is sprake wanneer de DC/AC-verhouding groter is dan 100%, typisch tussen 110% en 130%. 

Het overdimensioneren verlaagt de opstartspanning van het systeem. Hierdoor kan de installatie bij een lage lichtintensiteit sneller energie produceren. Daarnaast is het omzettingsrendement van omvormers optimaal wanneer deze worden belast tussen de 50% en 100% van hun nominale vermogen. Dit rendementsbereik wordt vaker bereikt wanneer het DC-veld is overgedimensioneerd.

Officiële specificaties van fabrikanten zoals SolarEdge staan voor specifieke omvormers een DC-overdimensionering toe van 135% tot maximaal 200%, afhankelijk van het specifieke model en de systeemarchitectuur.

## Het verschijnsel clipping

Wanneer de capaciteit van het DC-veld groter is ingesteld dan het maximale vermogen van de omvormer, kan er op piekmomenten clipping optreden. Clipping treedt op wanneer het opgewekte gelijkstroomvermogen het maximale wisselstroomvermogen van de omvormer overschrijdt. De omvormer topt het vermogen op dat moment af om binnen veilige bedrijfsgrenzen te blijven.

## Invloed op de netaansluiting en regelgeving

Het kiezen voor een lagere AC-capaciteit van de omvormer heeft directe gevolgen voor de netaansluiting:

* **Voorkomen van overbelasting:** Een lagere AC-capaciteit voorkomt dat het maximale aansluitvermogen op de hoofdaansluiting (zoals 1x35A of 3x25A) wordt overschreden. Een 3x25A aansluiting levert een continu vermogen van 17,25 kW.
* **Beperken van overspanning:** Het risico op overspanning op het lokale netwerk wordt hiermee eveneens beperkt.
* **Fasering:** Boven de 5 kW aan omvormervermogen is een 3-fase aansluiting veelal noodzakelijk om onbalans in het net te voorkomen.
* **NEN 1010:** De NEN1010 eist dat elektrische installaties adequaat beveiligd zijn tegen overstroom. Hierbij moet de gelijktijdigheid worden berekend.

## Samenvatting

Het overdimensioneren van een omvormer (met een DC/AC-verhouding boven de 100%) sluit aan bij de praktijkprestaties van zonnepanelen, die door factoren als temperatuur en oriëntatie hun theoretische vermogen zelden behalen. Door een hogere DC/AC-verhouding wordt de opstartspanning verlaagd en werkt de omvormer vaker in het optimale rendementsbereik van 50% tot 100% belasting. Eventuele overcapaciteit op piekmomenten wordt door clipping opgevangen om de omvormer te beschermen. Een lagere AC-capaciteit helpt daarnaast om binnen de grenzen van de hoofdaansluiting en het lokale net te blijven.