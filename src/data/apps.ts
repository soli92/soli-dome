export interface App {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  category: string;
  pinned?: boolean;
}

export const categories = [
  "Tutte",
  "Mie App",
  "Sviluppo",
  "Produttività",
  "Design",
  "Comunicazione",
  "AI",
];

export const apps: App[] = [
  {
    id: "pippify",
    name: "Pippify",
    description: "La tua app personale",
    url: "https://pippify.vercel.app/",
    icon: "🐾",
    color: "#f97316",
    category: "Mie App",
    pinned: true,
  },
  {
    id: "soli-agent",
    name: "Soli Agent",
    description: "Il tuo agente AI personale",
    url: "https://soli-agent-beta.vercel.app/",
    icon: "🤖",
    color: "#8b5cf6",
    category: "Mie App",
    pinned: true,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Repository e codice sorgente",
    url: "https://github.com",
    icon: "🐙",
    color: "#ffffff",
    category: "Sviluppo",
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy e hosting",
    url: "https://vercel.com",
    icon: "▲",
    color: "#ffffff",
    category: "Sviluppo",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Note e documenti",
    url: "https://notion.so",
    icon: "📝",
    color: "#ffffff",
    category: "Produttività",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design e prototipazione",
    url: "https://figma.com",
    icon: "🎨",
    color: "#f24e1e",
    category: "Design",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Comunicazione del team",
    url: "https://slack.com",
    icon: "💬",
    color: "#4a154b",
    category: "Comunicazione",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Project management",
    url: "https://linear.app",
    icon: "📐",
    color: "#5e6ad2",
    category: "Produttività",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Assistente AI di OpenAI",
    url: "https://chat.openai.com",
    icon: "🧠",
    color: "#10a37f",
    category: "AI",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Database e autenticazione",
    url: "https://supabase.com",
    icon: "🗄️",
    color: "#3ecf8e",
    category: "Sviluppo",
  },
  {
    id: "railway",
    name: "Railway",
    description: "Deploy backend e database",
    url: "https://railway.app",
    icon: "🚂",
    color: "#0b0d0e",
    category: "Sviluppo",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Assistente AI di Anthropic",
    url: "https://claude.ai",
    icon: "✨",
    color: "#d4a574",
    category: "AI",
  },
];
