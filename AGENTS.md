# AGENTS.md — verwijzing naar de projectregels

> **Lees `CLAUDE.md` in deze map. Dat is de enige bron voor de architectuur- en stijlregels van deze website.**
>
> Alles daarin geldt onverkort, ongeacht welke agent je bent.

## Waarom dit bestand kort is

Tot 2026-07-20 was dit een volledige kopie van `CLAUDE.md`, met alleen "Claude Code" vervangen door "Codex". Twee bestanden van 20 KB met dezelfde regels lopen gegarandeerd uit elkaar: je past er één aan en de andere agent werkt maanden met verouderde afspraken. In de vault (`~/workspace-secondbrain`) is dezelfde dubbeling op dezelfde dag opgeruimd.

Eén bron, één plek om te onderhouden.

## Het minimum, mocht je `CLAUDE.md` niet lezen

1. **Dit is de marketingsite**, niet de applicatie. React 19 + Vite + Tailwind v4, Express-backend, hosting op Railway.
2. **Wijzig nooit `dist/` of `dist-ssr/`.** Dat zijn buildmappen; je werk is bij de volgende build weg. Bewerk het bronbestand.
3. **Railway deployt automatisch bij elke push naar `main`.** Pushen is live zetten. Werk op een branch en laat de merge het bewuste go-moment zijn.
4. **CI draait op push en pull request naar main**: `typecheck`, `lint`, `test`, `build` en `qc:seo`. Laat die groen zijn voordat je om een merge vraagt.
5. **Geen tracking zonder toestemming.** Google Analytics is op 2026-07-20 verwijderd; bezoekersstatistiek loopt cookieloos via Cloudflare Web Analytics, en daarom is er geen cookiebanner. Zet er niets voor terug zonder de AVG-kant opnieuw te wegen.
6. **Teksten die bezoekers lezen** volgen de tone-of-voice-regels uit `EnerCalculatie-HQ/marketing/anti-ai-writing.md` in de vault: geen gedachtestreepjes als leesteken, geen wollige taal, geen emoji in zakelijke tekst.
