# Soli Dome

Portale personale per aprire le tue app da un’unica home: ricerca, categorie, preferiti e modal per aggiungere link. UI dark con stile glass / vetro.

## Avvio

Richiede **Node.js 22+** (vedi `engines` in `package.json` e **`.nvmrc`**). Il file **`.npmrc`** forza `registry=https://registry.npmjs.org/` e `tag=latest` per install coerenti.

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
| `npm run test` | Vitest (unit, **happy-dom**, pool `threads`) |
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

## CI e changelog

Questo repo **non** include al momento workflow GitHub Actions nel tree: test e build si eseguono in locale o sul provider di deploy (es. Vercel). **Changelog** automatico non configurato; la storia è in Git.

---

Portale e contenuti: uso personale.
