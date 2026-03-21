"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { App, categories } from "@/data/apps";

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
  const [category, setCategory] = useState(categories[0]);
  const [icon, setIcon] = useState("🚀");
  const [color, setColor] = useState("#6366f1");
  const [pinned, setPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      url: url.startsWith("http") ? url.trim() : `https://${url.trim()}`,
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
      <div className="relative w-full sm:max-w-md glass border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 safe-bottom">
        {/* Handle mobile */}
        <div className="sm:hidden w-10 h-1 bg-white/20 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Aggiungi app</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${color}22`, border: `1px solid ${color}44` }}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{name || "Nome app"}</p>
              <p className="text-xs text-white/40">{url || "https://..."}</p>
            </div>
          </div>

          {/* Emoji picker */}
          <div>
            <label className="text-xs text-white/40 mb-2 block font-medium">Icona</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setIcon(e)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all
                    ${icon === e ? "bg-indigo-500/30 border-2 border-indigo-400" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="text-xs text-white/40 mb-2 block font-medium">Colore</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${color === c ? "ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110" : ""}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="text-xs text-white/40 mb-1.5 block font-medium">Nome *</label>
            <input
              type="text"
              placeholder="Es. Notion"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-xs text-white/40 mb-1.5 block font-medium">URL *</label>
            <input
              type="text"
              placeholder="https://notion.so"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30"
            />
          </div>

          {/* Descrizione */}
          <div>
            <label className="text-xs text-white/40 mb-1.5 block font-medium">Descrizione</label>
            <input
              type="text"
              placeholder="Breve descrizione..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="search-input w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30"
            />
          </div>

          {/* Categoria + Pinned */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-white/40 mb-1.5 block font-medium">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="search-input w-full px-4 py-3 rounded-xl text-sm text-white bg-transparent"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-gray-900">{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-shrink-0">
              <label className="text-xs text-white/40 mb-1.5 block font-medium">Preferita</label>
              <button
                type="button"
                onClick={() => setPinned(!pinned)}
                className={`w-full h-[46px] px-4 rounded-xl border text-sm font-medium transition-all
                  ${pinned ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300" : "bg-white/5 border-white/10 text-white/40"}`}
              >
                {pinned ? "⭐ Sì" : "☆ No"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name || !url}
            className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-1"
          >
            <Plus className="w-4 h-4" />
            Aggiungi app
          </button>
        </form>
      </div>
    </div>
  );
}
