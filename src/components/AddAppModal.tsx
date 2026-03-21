"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { App } from "@/data/apps";

interface AddAppModalProps {
  onClose: () => void;
  onAdd: (app: App) => void;
}

const COLORS = [
  "#6c63ff", "#a78bfa", "#ec4899", "#f59e0b",
  "#10b981", "#3b82f6", "#ef4444", "#f97316",
];

export default function AddAppModal({ onClose, onAdd }: AddAppModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    url: "",
    icon: "🔗",
    category: "Utilità",
    color: "#6c63ff",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.url) return;

    const newApp: App = {
      id: Date.now().toString(),
      ...form,
    };
    onAdd(newApp);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-[slideUp_0.3s_ease_forwards]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-dome-text font-semibold text-lg">Aggiungi App</h2>
          <button onClick={onClose} className="text-dome-muted hover:text-dome-text transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nome & Icona */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-20">
              <label className="text-xs text-dome-muted">Icona</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="glass border border-white/10 rounded-xl px-3 py-2 text-center text-xl focus:border-violet-500/50 transition-colors"
                maxLength={2}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs text-dome-muted">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Es. Notion"
                className="glass border border-white/10 rounded-xl px-3 py-2 text-sm text-dome-text placeholder-dome-muted focus:border-violet-500/50 transition-colors"
                required
              />
            </div>
          </div>

          {/* URL */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-dome-muted">URL *</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
              className="glass border border-white/10 rounded-xl px-3 py-2 text-sm text-dome-text placeholder-dome-muted focus:border-violet-500/50 transition-colors"
              required
            />
          </div>

          {/* Descrizione */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-dome-muted">Descrizione</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Breve descrizione..."
              className="glass border border-white/10 rounded-xl px-3 py-2 text-sm text-dome-text placeholder-dome-muted focus:border-violet-500/50 transition-colors"
            />
          </div>

          {/* Colore */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-dome-muted">Colore</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className="w-7 h-7 rounded-full transition-all"
                  style={{
                    background: c,
                    outline: form.color === c ? `2px solid ${c}` : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Aggiungi App
          </button>
        </form>
      </div>
    </div>
  );
}
