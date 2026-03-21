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
  "Sviluppo",
  "Produttività",
  "Design",
  "Comunicazione",
  "AI",
  "Mie App",
];

export const defaultApps: App[] = [
  // ── MIE APP ─────────────────────────────────────────────
  {
    id: "pippify",
    name: "Pippify",
    description: "La tua app personale Pippify",
    url: "https://pippify.vercel.app/",
    icon: "🐾",
    color: "#f97316",
    category: "Mie App",
    pinned: true,
  },
  {
    id: "soli-agent",
    name: "Soli Agent",
    description: "Il tuo agente AI personale Soli",
    url: "https://soli-agent-beta.vercel.app/",
    icon: "🤖",
    color: "#a855f7",
    category: "Mie App",
    pinned: true,
  },

  // ── SVILUPPO ─────────────────────────────────────────────
  {
    id: "github",
    name: "GitHub",
    description: "Repository e version control",
    url: "https://github.com",
    icon: "🐙",
    color: "#6e40c9",
    category: "Sviluppo",
    pinned: false,
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy e hosting frontend",
    url: "https://vercel.com",
    icon: "▲",
    color: "#ffffff",
    category: "Sviluppo",
    pinned: false,
  },
  {
    id: "vscode",
    name: "VS Code Web",
    description: "Editor di codice nel browser",
    url: "https://vscode.dev",
    icon: "💙",
    color: "#007acc",
    category: "Sviluppo",
    pinned: false,
  },

  // ── AI ────────────────────────────────────────────────────
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Assistente AI OpenAI",
    url: "https://chat.openai.com",
    icon: "✨",
    color: "#10a37f",
    category: "AI",
    pinned: false,
  },
  {
    id: "claude",
    name: "Claude",
    description: "Assistente AI Anthropic",
    url: "https://claude.ai",
    icon: "🧠",
    color: "#d97706",
    category: "AI",
    pinned: false,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Generazione immagini AI",
    url: "https://midjourney.com",
    icon: "🎨",
    color: "#ec4899",
    category: "AI",
    pinned: false,
  },

  // ── PRODUTTIVITÀ ──────────────────────────────────────────
  {
    id: "notion",
    name: "Notion",
    description: "Note, wiki e project management",
    url: "https://notion.so",
    icon: "📝",
    color: "#ffffff",
    category: "Produttività",
    pinned: false,
  },
  {
    id: "linear",
    name: "Linear",
    description: "Issue tracking e roadmap",
    url: "https://linear.app",
    icon: "📐",
    color: "#5e6ad2",
    category: "Produttività",
    pinned: false,
  },

  // ── DESIGN ────────────────────────────────────────────────
  {
    id: "figma",
    name: "Figma",
    description: "Design e prototipazione UI",
    url: "https://figma.com",
    icon: "🖌️",
    color: "#f24e1e",
    category: "Design",
    pinned: false,
  },

  // ── COMUNICAZIONE ─────────────────────────────────────────
  {
    id: "slack",
    name: "Slack",
    description: "Messaggistica del team",
    url: "https://slack.com",
    icon: "💬",
    color: "#4a154b",
    category: "Comunicazione",
    pinned: false,
  },
];
