# Vasskalkylator

## What This Is

En minimalistisk React-app för att beräkna hur mycket kväve (N) och fosfor (P) som bortförs vid vasskörd. Användaren matar in skördad yta i hektar och väljer säsong (sommar/vinter) — resultaten uppdateras i realtid utan knappklick. Appen riktar sig till aktörer inom vattenvård, lantbruk och vasshantering som arbetar med BalticReed-metodiken.

## Core Value

Ge en exakt, omedelbar siffra på hur mycket näring som bortförs — utan friktion, utan onödiga klick.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Realtidsberäkning av kväve och fosfor baserat på hektar × säsongskoefficient
- [ ] Val av skördesäsong: sommar (juli–sep) eller vinter (okt–mar)
- [ ] Resultat visas tydligt: kväve (kg), fosfor (kg)
- [ ] Estimerad skörd (våtvikt, ton) baserat på säsong
- [ ] Vattenhalt visas per säsong (~50% sommar, ~10–20% vinter)
- [ ] Dold info-sektion med källhänvisning (BalticReed, finska ELY-centralen)
- [ ] Skandinavisk, minimalistisk design med naturinspirerad färgpalett

### Out of Scope

- Databassparning — kalkylatorn är stateless, inget att spara
- Användarautentisering — publik kalkylator, ingen inloggning
- PDF-export — kan läggas till i v2 om efterfrågat
- Flerartsberäkningar (andra växter) — fokus på vass
- Mobilapp (native) — webb räcker för detta verktyg

## Context

- Beräkningsmodellen baseras på BalticReed-projektet och finska ELY-centralens rapporter
- Sommarkoefficienter: 100 kg N/ha, 10 kg P/ha (topp i mitten av augusti)
- Vinterkoefficienter: 20 kg N/ha, 2 kg P/ha
- Torrvikt: 5–10 ton/ha oavsett säsong
- Våtvikt sommar (50% vattenhalt): 10–20 ton/ha
- Våtvikt vinter (10–20% vattenhalt): 5,5–12 ton/ha
- Design: off-white bakgrund (#F7F7F5), dämpad mörkgrön (#4A5D4E), naturinspirerade nyanser

## Constraints

- **Stack**: React + TypeScript + Tailwind CSS + Lucide React — detta är bestämt
- **Rendering**: Realtid via useState, ingen calculate-knapp
- **Design**: Minimalistisk/skandinavisk — inga starka primärfärger, inga tunga skuggor
- **Scope**: Single-page kalkylator, inga routes, ingen backend

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Realtidsberäkning (ingen knapp) | Modernare UX, lägre friktion, direkt feedback | — Pending |
| Tailwind CSS | Designsystemet kräver precis kontroll över färger och spacing | — Pending |
| Dold info-sektion | Källhänvisning ska finnas men inte störa det minimalistiska intrycket | — Pending |
| Vinter/sommar-split | Koefficienter skiljer sig markant (5x kväve, 5x fosfor) — säsong är kritisk parameter | — Pending |

---
*Last updated: 2026-03-26 after initialization*
