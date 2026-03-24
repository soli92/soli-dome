# Soli Dome

Portale personale per aprire le tue app da un’unica home: ricerca, categorie, preferiti e modal per aggiungere link. UI dark con stile glass / vetro.

## Avvio

Richiede **Node 24+** (vedi `engines` in `package.json`).

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Personalizzare le app

Modifica [`src/data/apps.ts`](./src/data/apps.ts): ogni voce ha `id`, `name`, `description`, `url`, `icon`, `category`, `color`, opzionale `pinned` per i preferiti.

È presente anche un test sui dati in [`src/data/apps.test.ts`](./src/data/apps.test.ts).

## Test

| Comando | Descrizione |
|---------|-------------|
| `npm run test` | Vitest (unit, una esecuzione) |
| `npm run test:watch` | Vitest in watch |
| `npm run test:coverage` | Con copertura |
| `npm run test:e2e` | Playwright |
| `npm run test:all` | Unit + e2e |

## Stack

- **Next.js** 16, **React** 19, **TypeScript**
- **Tailwind CSS** + **`@soli92/solids`** (design system: token e preset)
- **Lucide React** (icone)
- **Vitest** + Testing Library, **Playwright** (e2e)

## Lint

```bash
npm run lint
```

## Build produzione

```bash
npm run build
npm start
```

---

Portale e contenuti: uso personale.
