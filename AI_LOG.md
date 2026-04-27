---

# AI Log — soli-dome

Memoria di sviluppo AI-assisted. Annotazioni sui prompt, decisioni e pattern emersi costruendo questo progetto con il supporto di AI.

## Overview del progetto

**Soli Dome**: portale personale (Next.js) con griglia app, ricerca, categorie, preferiti, modal “aggiungi app”, PWA, UI **glass** dark e dati statici in `src/data/apps.ts`. Design system **@soli92/solids ^1.7.0** (font in layout, test `src/solids-package.test.ts`). Test **Vitest** e **Playwright**.

**Stack AI usato (inferito; aggiornato 2026-04-22)**: **Cursor** — `2d9d9c6` + `.cursor/rules/agents-context.mdc`. Commit `🎨 Redesign…` su più componenti. Nessun SDK LLM nel portale. Test **Vitest/Playwright** (`7e3ac8f`).

**Periodo di sviluppo**: 2026-03-21 (`e5ddc07` Initial commit) → 2026-04-08 (`b8943b4` bump SoliDS).

**Numero di commit**: 49

---

## Aggiornamento 2026-04-27 — app Health, Wand and Fire

- **`src/data/apps.ts`**: aggiunta tile **Health, Wand and Fire** (categoria Mie App, URL produzione Vercel, icona, colore), allineata al [repo](https://github.com/soli92/health-wand-and-fire).
- **Test**: `src/data/apps.test.ts` asserisce presenza `id` `health-wand-and-fire` e URL atteso.
- **Doc**: README, AGENTS.md, questo file.

---

## Fasi di sviluppo (inferite dal history)

### Fase 1 — Init Next + dati app + componenti base

**Timeframe**: `e5ddc07` → `35340c0` main page.

**Cosa è stato fatto**: package, tailwind/tsconfig/postcss/next, gitignore, `apps.ts`, stili globali, layout, SearchBar, CategoryFilter, AppCard, AddAppModal, pagina principale, README.

**Evidenza di AI-assist** (inferita):

- Sequenza `feat: add <Component>` ordinata — tipico scaffold.

**Decisioni architetturali notevoli**:

- **Dati app** centralizzati in TypeScript (`7841c75 feat: add apps data`) invece che solo JSON statico.

**Prompt chiave usati**

> **Prompt [inferito]**: "Crea app Next con dati statici `apps.ts`, layout glass dark, SearchBar, CategoryFilter, AppCard, AddAppModal."
> *Evidenza*: `7841c75`–`35340c0`, sequenza `feat: add …`.

**Lezioni apprese**

- Tenere **export named** di `apps`/`categories` coerenti evita errori runtime silenziosi (`8269fef`, `e7c4cc5`).

### Fase 2 — PWA offline, icone, meta, fix export dati

**Timeframe**: `8269fef` fix export → `28de86c` meta PWA.

**Cosa è stato fatto**: service worker, manifest SVG, icone 192/512, safe-area CSS, banner install, fix export `categories`/`apps`.

**Evidenza di AI-assist** (inferita):

- Implementazione PWA completa in pochi commit consecutivi.

**Decisioni architetturali notevoli**:

- **PWA-first** sul portale personale (uso da home screen mobile).

**Prompt chiave usati**

> **Prompt [inferito]**: "Aggiungi service worker, manifest PWA, icone 192/512, meta tag iOS, banner install, correggi export dati."
> *Evidenza*: `4742737`–`28de86c`, `8269fef`.

**Lezioni apprese**

- **PWA** richiede coerenza tra `layout.tsx`, manifest e path icone (`304ca1b`, `0b7e553`).

### Fase 3 — Scroll desktop/mobile e redesign “glass”

**Timeframe**: `28e2b9b`–`952403b` (fix scroll, redesign AppCard/SearchBar/CategoryFilter/page/globals).

**Cosa è stato fatto**: iterazioni su overflow/scroll touchpad, rimozione blocchi scroll, redesign mobile-first e mesh background.

**Evidenza di AI-assist** (inferita):

- Serie `🎨 Redesign …` con messaggi marketing-style — comune in sessioni assistite su UI.

**Decisioni architetturali notevoli**:

- Scroll su **html/body** libero invece che wrapper overflow (`dc56b13`, `55af31d`).

**Prompt chiave usati**

> **Prompt [inferito]**: "Redesign mobile-first con mesh background e glass; risolvi scroll touchpad rimuovendo overflow hidden annidati."
> *Evidenza*: `952403b`–`18085d7`, `1a2e4a2`–`55af31d`.

**Lezioni apprese**

- **overflow: hidden** su wrapper intermedi rompe scroll/touchpad su desktop (`1a2e4a2`, `55af31d`).

### Fase 4 — Tile Storybook, test stack, app aggiuntive, bump SoliDS

**Timeframe**: `7e3ac8f` → `b8943b4`.

**Cosa è stato fatto**: Vitest/Playwright, tile Storybook SoliDS, Casa Mia in pinned, README stack, AGENTS/Cursor, Soli Dungeon Master nel portale (`35a2f84`), bump `@soli92/solids`.

**Evidenza di AI-assist** (inferita):

- `2d9d9c6` menzione esplicita **Cursor** nella documentazione.

**Decisioni architetturali notevoli**:

- **Playwright** per e2e oltre Vitest (`7e3ac8f`).

**Prompt chiave usati**

> **Prompt [inferito]**: "Aggiungi Vitest/Playwright, tile Storybook, app pinned (Casa Mia, Soli DM, …), aggiorna README stack, bump SoliDS."
> *Evidenza*: `7e3ac8f`, `cfcdde1`, `35a2f84`, `b8943b4`.

**Lezioni apprese**

- **Dati app** (`src/data/apps.ts`) vanno aggiornati quando si aggiunge un’app reale (`35a2f84`, `apps.test.ts` in `AGENTS.md`).

### Fase 5 — Bump @soli92/solids 1.7.0, font stack, test dipendenza (2026-04-24)

**Cosa è stato fatto**: dipendenza **`@soli92/solids` ^1.7.0**; link **Google Fonts** in `src/app/layout.tsx`; **`src/solids-package.test.ts`** in Vitest; README / AGENTS / AI_LOG aggiornati.

**Lezioni**: tema **cyberpunk** usa font da token — caricare le famiglie da Google Fonts evita fallback imprevisti.

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

- **grep `TODO|FIXME|HACK|XXX`** in `src/`: nessun match prioritario in questa passata.
- **`src/data/apps.ts`**: URL hardcoded (`https://…`) — sincronizzare manualmente con deploy reali quando cambiano domini Vercel.
- **Debito tecnico inferito**: preferiti “pinned” solo lato client — nessuna persistenza server nel modello dati attuale.
- **Debito tecnico inferito**: Playwright e2e dipendono da config locale (`playwright.config.ts`) — verificare esecuzione in CI vs solo locale.
- **Debito tecnico inferito**: `AddAppModal` consente URL arbitrari — validazione XSS/open redirect non deducibile dal solo git.

---

> **Nota metodologica**: completamento 2026-04-22; **2026-04-27** vedi sezione *Health, Wand and Fire*; verificare `apps.test.ts` dopo ogni modifica a `apps.ts`.

---

## Metodologia compilazione automatica

Completamento autonomo il **22 aprile 2026** analizzando:

- **49** commit (stima iniziale)
- **~8** file (`src/data/apps.ts`, `src/data/apps.test.ts`, `AGENTS.md`, `playwright.config.ts`, `package.json`, `app/page.tsx`, `.cursor/rules`)
- **0** TODO/FIXME rilevanti dal grep workspace

**Punti di minore confidenza:**

- Elenco app aggiornato dopo commit `53079d0` (Soli Prof) potrebbe non essere riflesso in questa copia locale se non pullato.
- Validazione sicurezza URL non ispezionata nel codice in questa passata.

---
