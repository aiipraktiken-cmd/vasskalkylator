# Requirements: Vasskalkylator

**Defined:** 2026-03-26
**Core Value:** Ge en exakt, omedelbar siffra på hur mycket näring som bortförs — utan friktion, utan onödiga klick.

## v1 Requirements

### Calculation

- [ ] **CALC-01**: Användaren ser kväve (kg) beräknat i realtid utifrån hektar och säsong
- [ ] **CALC-02**: Användaren ser fosfor (kg) beräknat i realtid utifrån hektar och säsong
- [ ] **CALC-03**: Beräkning uppdateras omedelbart utan klick när hektar ändras

### Input

- [ ] **INPUT-01**: Användaren kan mata in antal hektar som decimalt tal (t.ex. 2,5)
- [ ] **INPUT-02**: Användaren kan välja säsong: Sommar (juli–sep) eller Vinter (okt–mar)

### Results

- [ ] **RES-01**: Estimerad skörd (våtvikt, ton-intervall) visas baserat på hektar och säsong
- [ ] **RES-02**: Vattenhalt för vald säsong visas (~50% sommar, ~10–20% vinter)

### Information

- [ ] **INFO-01**: Källhänvisning och beräkningsförklaring finns tillgänglig via expanderbar sektion

### Design

- [ ] **DESIGN-01**: Gränssnitt är minimalistiskt och skandinaviskt med naturinspirerad färgpalett
- [ ] **DESIGN-02**: Resultat (N och P) är visuellt framhävda som primärt innehåll

## v2 Requirements

### Export

- **EXP-01**: Användaren kan exportera beräkningsresultat som PDF
- **EXP-02**: Användaren kan kopiera resultat som formatterad text

### Advanced

- **ADV-01**: Beräkning med fler växtslag (inte bara vass)
- **ADV-02**: Jämförelsevy för sommar vs vinter sida vid sida

## Out of Scope

| Feature | Reason |
|---------|--------|
| Databassparning | Stateless kalkylator — inget värde i att spara |
| Användarinloggning | Publik kalkylator, ingen persondata |
| Native mobilapp | Webb + PWA räcker för detta verktyg |
| Flerartsberäkningar | Fokus på vass i v1 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CALC-01 | Phase 1 | Pending |
| CALC-02 | Phase 1 | Pending |
| CALC-03 | Phase 1 | Pending |
| INPUT-01 | Phase 1 | Pending |
| INPUT-02 | Phase 1 | Pending |
| RES-01 | Phase 1 | Pending |
| RES-02 | Phase 1 | Pending |
| INFO-01 | Phase 1 | Pending |
| DESIGN-01 | Phase 1 | Pending |
| DESIGN-02 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 10 total
- Mapped to phases: 10
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after initial definition*
