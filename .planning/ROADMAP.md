# Roadmap: Vasskalkylator

## Overview

En fas. Allt är en enda React-komponent med inget externt beroende utöver Tailwind och Lucide. Inga routes, ingen backend, ingen state management utöver useState. Roadmappen speglar detta: ett enda leveransblock som implementerar hela kalkylatorn.

## Phases

- [ ] **Phase 1: Complete App** — Hela kalkylatorn: inputs, realtidsberäkning, resultatvy, designsystem

## Phase Details

### Phase 1: Complete App
**Goal**: En fungerande, deploybar Vasskalkylator med full funktionalitet och korrekt design
**Depends on**: Nothing
**Requirements**: CALC-01, CALC-02, CALC-03, INPUT-01, INPUT-02, RES-01, RES-02, INFO-01, DESIGN-01, DESIGN-02
**Success Criteria** (what must be TRUE):
  1. Appen startar med `npm run dev` och visas korrekt i mobilbrowser
  2. Ändring av hektar-värdet uppdaterar N, P, och våtvikt omedelbart
  3. Val av sommar/vinter ger korrekta koefficienter (100/10 resp. 20/2)
  4. "Om beräkningarna" expanderar och visar källhänvisning
  5. Design matchar off-white/mörkgrön färgpalett och minimalistisk känsla
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md — Vite + React + TypeScript + Tailwind scaffold
- [ ] 01-02-PLAN.md — Kalkylatorkomponent med full logik och design

## Progress

**Execution Order:**
Phase 1 (only phase)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Complete App | 0/2 | Not started | - |
