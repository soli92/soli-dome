# 🌐 Soli Dome

Portale personale per accedere a tutte le tue applicazioni, con design dark/glassmorphism.

## ✨ Features

- 🔍 **Ricerca live** — filtra le app in tempo reale
- 📂 **Categorie** — filtra per tipo di app
- 📌 **Preferiti** — le app pinnate appaiono sempre in cima
- ➕ **Aggiungi app** — modal per aggiungere nuove app al volo
- 🌙 **Dark mode** — design glassmorphism dark
- 📱 **Responsive** — funziona su mobile, tablet e desktop
- ⚡ **Veloce** — Next.js 14 + Tailwind CSS

## 🚀 Come iniziare

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

## 🛠️ Personalizzare le app

Modifica il file `src/data/apps.ts` per aggiungere, rimuovere o modificare le app nel portale.

```ts
{
  id: "1",
  name: "La mia App",
  description: "Descrizione breve",
  url: "https://...",
  icon: "🚀",
  category: "Sviluppo",
  color: "#6c63ff",
  pinned: true,  // opzionale: appare nei preferiti
}
```

## 🏗️ Tech Stack

- **Next.js 14** — framework React
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Lucide React** — icone

---

*Built with ✦ by Soli*
