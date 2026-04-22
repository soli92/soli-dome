---

# AI Log — soli-dome

Memoria di sviluppo AI-assisted. Annotazioni sui prompt, decisioni e pattern emersi costruendo questo progetto con il supporto di AI.

## Overview del progetto

**Soli Dome**: portale personale (Next.js) con griglia app, ricerca, categorie, preferiti, modal “aggiungi app”, PWA, UI **glass** dark e dati statici in `src/data/apps.ts`. Design system **@soli92/solids**. Test **Vitest** e **Playwright**.

**Stack AI usato (inferito)**: **Cursor** — `2d9d9c6 chore: add AGENTS.md, README link, Cursor agents-context rule`. Commit `🎨 Redesign…` suggeriscono sessioni di polishing UI assistite (inferenza moderata).

**Periodo di sviluppo**: 2026-03-21 (`e5ddc07` Initial commit) → 2026-04-08 (`b8943b4` bump SoliDS).

**Numero di commit**: 49

---

## Fasi di sviluppo (inferite dal history)

### Fase 1 — Init Next + dati app + componenti base

**Timeframe**: `e5ddc07` → `35340c0` main page.

**Cosa è stato fatto**: package, tailwind/tsconfig/postcss/next, gitignore, `apps.ts`, stili globali, layout, SearchBar, CategoryFilter, AppCard, AddAppModal, pagina principale, README.

**Evidenza di AI-assist** (inferita):

- Sequenza `feat: add <Component>` ordinata — tipico scaffold.

**Decisioni architetturali notevoli**:

- **Dati app** centralizzati in TypeScript (`7841c75 feat: add apps data`) invece che solo JSON statico.

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 2 — PWA offline, icone, meta, fix export dati

**Timeframe**: `8269fef` fix export → `28de86c` meta PWA.

**Cosa è stato fatto**: service worker, manifest SVG, icone 192/512, safe-area CSS, banner install, fix export `categories`/`apps`.

**Evidenza di AI-assist** (inferita):

- Implementazione PWA completa in pochi commit consecutivi.

**Decisioni architetturali notevoli**:

- **PWA-first** sul portale personale (uso da home screen mobile).

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 3 — Scroll desktop/mobile e redesign “glass”

**Timeframe**: `28e2b9b`–`952403b` (fix scroll, redesign AppCard/SearchBar/CategoryFilter/page/globals).

**Cosa è stato fatto**: iterazioni su overflow/scroll touchpad, rimozione blocchi scroll, redesign mobile-first e mesh background.

**Evidenza di AI-assist** (inferita):

- Serie `🎨 Redesign …` con messaggi marketing-style — comune in sessioni assistite su UI.

**Decisioni architetturali notevoli**:

- Scroll su **html/body** libero invece che wrapper overflow (`dc56b13`, `55af31d`).

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

### Fase 4 — Tile Storybook, test stack, app aggiuntive, bump SoliDS

**Timeframe**: `7e3ac8f` → `b8943b4`.

**Cosa è stato fatto**: Vitest/Playwright, tile Storybook SoliDS, Casa Mia in pinned, README stack, AGENTS/Cursor, Soli Dungeon Master nel portale (`35a2f84`), bump `@soli92/solids`.

**Evidenza di AI-assist** (inferita):

- `2d9d9c6` menzione esplicita **Cursor** nella documentazione.

**Decisioni architetturali notevoli**:

- **Playwright** per e2e oltre Vitest (`7e3ac8f`).

**Prompt chiave usati**: > [TODO da compilare manualmente]

**Lezioni apprese**: > [TODO da compilare manualmente]

---

## Pattern ricorrenti identificati

- **Emoji 🎨** su commit di redesign.
- **Export dati** come superficie di bugfix ricorrente (`8269fef`, `e7c4cc5`, `a70c48b` area apps).
- **Allineamento ecosistema**: bump SoliDS lo stesso giorno di altri repo personali.
- **Documentazione README** aggiornata quando cambia stack test (`0d181a6`).

---

## Tecnologie e scelte di stack

- **Framework**: Next.js 16 (da README citato in commit), React, TypeScript
- **Styling**: Tailwind + SoliDS, effetti glass in `globals.css`
- **State**: React locale (nessuno store globale dedotto dalla history)
- **Deploy**: non analizzato qui (tipico Vercel per Next)
- **LLM integration**: nessuna nel runtime

## Problemi tecnici risolti (inferiti)

1. **Export `apps` / `categories`**: `8269fef`, `e7c4cc5`.
2. **Prop `categories` errata in page**: `8fa45ed`, `9c72f78`.
3. **Prop `index` mancante AppCard**: `8dc0d8f`.
4. **Scroll touchpad desktop**: `1a2e4a2`, `28e2b9b`, `55af31d`.

---

## Appendice — Commit notevoli (estratto da `git log --oneline`)

- `b8943b4` chore(deps): bump @soli92/solids to ^1.5.0
- `35a2f84` feat(apps): aggiungi Soli Dungeon Master al portale
- `7e3ac8f` feat: Vitest/Playwright, tile SoliDS Storybook, aggiornamenti PWA e UI
- `952403b` 🎨 Redesign globals.css - dark mesh background, glass effects
- `4742737` feat: add service worker for offline support
- `a70c48b` feat: aggiunte app Pippify e Soli Agent
- `7841c75` feat: add apps data
- `e5ddc07` Initial commit

---

## Punti aperti / note per il futuro

> [TODO da compilare manualmente: sincronizzazione lista app con deploy reali, eventuale persistenza preferiti lato server]

---

> **Nota metodologica**: questo file è stato generato retroattivamente analizzando la history del repo. Le sezioni con `> [TODO da compilare manualmente]` richiedono la memoria del developer e non possono essere inferite dalla sola analisi automatica. Integra progressivamente con annotazioni manuali mentre lavori alle prossime fasi del progetto.

---
