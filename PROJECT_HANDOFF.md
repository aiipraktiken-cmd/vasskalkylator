# Handoff — Vasskalkylator
_Last updated: 2026-03-27_

## Current State
Single-page React kalkylator för att beräkna kväve (N) och fosfor (P) vid vasskörd. Fullt fungerande och deployad på Vercel. Realtidsberäkning, sommar/vinter-säsong, kopieringsknappar för N/P, outline-titel. Koden finns på GitHub (aiipraktiken-cmd/vasskalkylator) och deployas automatiskt vid push till main.

## This Session
- Initierade hela projektet från scratch: GSD planning docs, Vite + React + TypeScript + Tailwind scaffold
- `src/App.tsx` — komplett kalkylator med all logik och design
- `vercel.json` — deploy-konfiguration klar
- Pushade till GitHub, länkade till Vercel
- Design-uppdatering: outline-titel (`WebkitTextStroke: 2px #4A5D4E`, text-6xl/8xl) och kopieringsknappar med Copy/Check-ikon toggle
- Lade till kortet på `local-startpage/index.html` (mörkgrön, 1×1, SlideStudio krympte till 2-wide)

## Open Issues
- Vercel-URL okänd — troligen `vasskalkylator.vercel.app`, men verifiera och uppdatera `local-startpage/index.html` om den avviker

## Next Steps
1. Verifiera Vercel-URL och uppdatera startpage-kortet om nödvändigt
2. Eventuellt: favicon (`/favicon.svg` saknas — `index.html` refererar till den)
3. v2-idéer: PDF-export, jämförelsevy sommar vs vinter

## Key Context
- Beräkningskoefficienter: sommar 100N/10P per ha, vinter 20N/2P per ha (BalticReed/finska ELY)
- Projektkatalog: `DEV/projects/vasskalkylator/`
- GitHub: `aiipraktiken-cmd/vasskalkylator` — Vercel deployas automatiskt på push till main
- Startpage-kortet pekar på `https://vasskalkylator.vercel.app` — uppdatera URL vid behov
