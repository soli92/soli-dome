# AGENTS.md — contesto per assistenti AI

Riassunto operativo per **Soli Dome** (portale app / home links). Dettaglio: **`README.md`**. Stato file: **`git status`**.

**Aggiornato:** 2025-03-26

## Repo

**Next.js 16**, **React 19**, Tailwind + **`@soli92/solids`**, **Lucide**. Node **22+**. Dati app in **`src/data/apps.ts`** (e test in `apps.test.ts`).

## Cosa fare dopo (checklist)

1. **Dopo modifiche alle app** — aggiornare `src/data/apps.ts`; eseguire `npm run test` (Vitest).
2. **Prima di PR** — `npm run lint`, `npm run test`, opz. `npm run test:e2e` o `npm run test:all`.
3. **Release / deploy** — `npm run build` come da README.

## Comandi

`npm run dev` · `npm run lint` · `npm run test` · `npm run test:watch` · `npm run test:e2e` · `npm run test:all` · `npm run build`

## File utili

`README.md` · `src/data/apps.ts` · `playwright.config.ts`

## Regole per l’agente

- UI dark / glass: rispettare pattern e token **SoliDS** già usati nel progetto.
- Non introdurre dipendenze non necessarie; stack volutamente snello.
