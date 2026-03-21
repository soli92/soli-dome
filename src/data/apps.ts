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

export const apps: App[] = [
  // Mie App
  {
    id: "pippify",
    name: "Pippify",
    description: "La mia app personale",
    url: "https://pippify.vercel.app/",
    icon: "🐾",
    color: "from-pink-500 to-rose-500",
    category: "Mie App",
    pinned: true,
  },
  {
    id: "soli-agent",
    name: "Soli Agent",
    description: "Agente AI personale",
    url: "https://soli-agent-beta.vercel.app/",
    icon: "🤖",
    color: "from-violet-500 to-purple-500",
    category: "Mie App",
    pinned: true,
  },
  // Sviluppo
  {
    id: "github",
    name: "GitHub",
    description: "Repository e codice",
    url: "https://github.com",
    icon: "🐙",
    color: "from-gray-600 to-gray-800",
    category: "Sviluppo",
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy e hosting",
    url: "https://vercel.com",
    icon: "▲",
    color: "from-slate-600 to-slate-900",
    category: "Sviluppo",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design e prototipi",
    url: "https://figma.com",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    category: "Design",
  },
  // Produttività
  {
    id: "notion",
    name: "Notion",
    description: "Note e documenti",
    url: "https://notion.so",
    icon: "📝",
    color: "from-gray-700 to-gray-900",
    category: "Produttività",
  },
  {
    id: "linear",
    name: "Linear",
    description: "Project management",
    url: "https://linear.app",
    icon: "📋",
    color: "from-indigo-500 to-blue-600",
    category: "Produttività",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Messaggistica team",
    url: "https://slack.com",
    icon: "💬",
    color: "from-yellow-400 to-orange-500",
    category: "Comunicazione",
  },
  // AI
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Assistente AI OpenAI",
    url: "https://chat.openai.com",
    icon: "🧠",
    color: "from-green-500 to-teal-600",
    category: "AI",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Assistente AI Anthropic",
    url: "https://claude.ai",
    icon: "✨",
    color: "from-orange-400 to-amber-500",
    category: "AI",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Generazione immagini AI",
    url: "https://midjourney.com",
    icon: "🖼️",
    color: "from-blue-500 to-cyan-500",
    category: "AI",
  },
  // Utility
  {
    id: "google",
    name: "Google",
    description: "Motore di ricerca",
    url: "https://google.com",
    icon: "🔍",
    color: "from-blue-400 to-green-400",
    category: "Utility",
  },
];
