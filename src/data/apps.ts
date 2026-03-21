// 📦 Dati delle tue applicazioni
// Aggiungi, modifica o rimuovi app da qui

export interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;       // emoji o URL immagine
  category: string;
  color: string;      // colore accent della card (hex)
  pinned?: boolean;
}

export const categories = [
  "Tutti",
  "Produttività",
  "Sviluppo",
  "Analytics",
  "Comunicazione",
  "Media",
  "Utilità",
];

export const apps: App[] = [
  {
    id: "1",
    name: "GitHub",
    description: "Repository e codice sorgente",
    url: "https://github.com",
    icon: "🐙",
    category: "Sviluppo",
    color: "#6e40c9",
    pinned: true,
  },
  {
    id: "2",
    name: "Vercel",
    description: "Deploy e hosting delle app",
    url: "https://vercel.com",
    icon: "▲",
    category: "Sviluppo",
    color: "#ffffff",
    pinned: true,
  },
  {
    id: "3",
    name: "Notion",
    description: "Note, documenti e database",
    url: "https://notion.so",
    icon: "📓",
    category: "Produttività",
    color: "#ffffff",
    pinned: true,
  },
  {
    id: "4",
    name: "Figma",
    description: "Design e prototipazione UI",
    url: "https://figma.com",
    icon: "🎨",
    category: "Sviluppo",
    color: "#f24e1e",
  },
  {
    id: "5",
    name: "Linear",
    description: "Project management e issue tracking",
    url: "https://linear.app",
    icon: "📐",
    category: "Produttività",
    color: "#5e6ad2",
  },
  {
    id: "6",
    name: "Slack",
    description: "Messaggistica e comunicazione team",
    url: "https://slack.com",
    icon: "💬",
    category: "Comunicazione",
    color: "#4a154b",
  },
  {
    id: "7",
    name: "Google Analytics",
    description: "Statistiche e traffico web",
    url: "https://analytics.google.com",
    icon: "📊",
    category: "Analytics",
    color: "#e37400",
  },
  {
    id: "8",
    name: "Supabase",
    description: "Database e backend as a service",
    url: "https://supabase.com",
    icon: "🗄️",
    category: "Sviluppo",
    color: "#3ecf8e",
  },
  {
    id: "9",
    name: "Spotify",
    description: "Musica e podcast",
    url: "https://spotify.com",
    icon: "🎵",
    category: "Media",
    color: "#1db954",
  },
  {
    id: "10",
    name: "Gmail",
    description: "Email e posta elettronica",
    url: "https://mail.google.com",
    icon: "📧",
    category: "Comunicazione",
    color: "#ea4335",
  },
  {
    id: "11",
    name: "ChatGPT",
    description: "Assistente AI OpenAI",
    url: "https://chat.openai.com",
    icon: "🤖",
    category: "Utilità",
    color: "#10a37f",
    pinned: true,
  },
  {
    id: "12",
    name: "Cloudflare",
    description: "DNS, CDN e sicurezza web",
    url: "https://cloudflare.com",
    icon: "☁️",
    category: "Sviluppo",
    color: "#f38020",
  },
];
