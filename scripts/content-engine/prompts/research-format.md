# Omzetten: onderzoeksfeiten naar JSON

Zet elke feitregel om naar een object in `facts`. `confidence`: 90 als de bron een officiële instantie is
(RVO, ACM, Rijksoverheid, Netbeheer Nederland, netbeheerder, CBS), anders 75.

```json
{
  "topic": "<Onderwerp>",
  "facts": [
    {
      "claim": "<De feitelijke stelling>",
      "source": "<Naam van de bron>",
      "confidence": 90,
      "datum": "<publicatiedatum>",
      "url": "<URL>"
    }
  ]
}
```
