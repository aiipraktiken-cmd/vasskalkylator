# Handoff — Vasskalkylator
_Last updated: 2026-04-15_

## Current State
Single-page React kalkylator för N/P-reduktion vid vasskörd. Deployad på Vercel med auto-deploy vid push till main. Tre resultatpaneler: "Bortförd näring" (N/P + kopieringsknappar), "Näringsnyttan" (fosfor, kväve, torrvikt, våtvikt, vattenhalt) och "Energi & Klimat" (energipotential, CO₂-bindning, villojämförelse).

## This Session
- Ändrade torrvikt-schablon från 7,5 → **5 ton/ha** i `src/App.tsx` (`TS_SCHABLON`)
- Uppdaterade alla infotexter och antagandetabellen med nytt värde
- Pushat till main → Vercel

## Open Issues
- Favicon saknas — `index.html` refererar till `/favicon.svg`

## Next Steps
1. Lägg till favicon (`public/favicon.svg`)
2. Expert-läge: låt användaren justera TS/ha eller vattenhalt manuellt
3. v2-idéer: jämförelsevy sommar vs vinter sida vid sida, PDF-export

## Key Context
- `src/App.tsx` — all logik och UI i en fil
- Konstanter: `SUMMER_P/N`, `WINTER_P/N`, `TS_SCHABLON = 5`, `WATER_SUMMER = 0.50`, `WATER_WINTER = 0.15`
- Energikonstanter: 4,8 MWh/ton TS, 1,83 ton CO₂/ton TS, 5 000 kWh/år per villa
- GitHub: `aiipraktiken-cmd/vasskalkylator` → Vercel auto-deploy på push till main
- Live URL: `https://vasskalkylator.vercel.app`
