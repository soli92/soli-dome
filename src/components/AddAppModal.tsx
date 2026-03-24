"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { App, categories, defaultNewAppCategory } from "@/data/apps";

function normalizeAppUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const withScheme =
    t.startsWith("http://") || t.startsWith("https://") ? t : `https://${t}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.href;
  } catch {
    return null;
  }
}

interface AddAppModalProps {
  onAdd: (app: App) => void;
  onClose: () => void;
}

const EMOJIS = ["🚀","💡","🎯","📊","🛠️","🎨","📱","🌐","💬","📁","⚡","🔒","🤖","🎵","📷","🗂️"];
const COLORS = [
  "#6366f1","#8b5cf6","#ec4899","#f59e0b",
  "#10b981","#3b82f6","#ef4444","#14b8a6",
];

export default function AddAppModal({ onAdd, onClose }: AddAppModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultNewAppCategory);
  const [icon, setIcon] = useState("🚀");
  const [color, setColor] = useState("#3B82F6");
  const [pinned, setPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const href = normalizeAppUrl(url);
    if (!href) return;
    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      url: href,
      description: description.trim(),
      category,
      icon,
      color,
      pinned,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md glass border border-border/80 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 safe-bottom">
        {/* Handle mobile */}
        <div className="sm:hidden w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Aggiungi app</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/60">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${color}22`, border: `1px solid ${color}44` }}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{name || "Nome app"}</p>
              <p className="text-xs text-muted-foreground">{url || "https://..."}</p>
            </div>
          </div>

          {/* Emoji picker */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block font-medium">Icona</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setIcon(e)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all
                    ${icon === e ? "bg-primary/25 border-2 border-primary" : "bg-muted/40 border border-border/60 hover:bg-muted/60"}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block font-medium">Colore</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${color === c ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : ""}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Nome *</label>
            <input
              type="text"
              placeholder="Es. Notion"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block font-medium">URL *</label>
            <input
              type="text"
              placeholder="https://notion.so"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Descrizione */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Descrizione</label>
            <input
              type="text"
              placeholder="Breve descrizione..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Categoria + Pinned */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="search-input w-full px-4 py-3 rounded-xl text-sm text-foreground bg-transparent"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-card text-foreground">{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-shrink-0">
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Preferita</label>
              <button
                type="button"
                onClick={() => setPinned(!pinned)}
                className={`w-full h-[46px] px-4 rounded-xl border text-sm font-medium transition-all
                  ${pinned ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted/30 border-border/60 text-muted-foreground"}`}
              >
                {pinned ? "⭐ Sì" : "☆ No"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim() || !url.trim() || !normalizeAppUrl(url)}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-1"
          >
            <Plus className="w-4 h-4" />
            Aggiungi app
          </button>
        </form>
      </div>
    </div>
  );
}
