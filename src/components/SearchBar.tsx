"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Glow ring when focused */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />

      <div className="relative flex items-center glass rounded-2xl px-4 py-3 border border-white/5 focus-within:border-violet-500/40 transition-colors">
        <Search size={18} className="text-dome-muted flex-shrink-0 mr-3" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cerca un'app..."
          className="flex-1 bg-transparent text-dome-text placeholder-dome-muted text-sm focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="ml-2 text-dome-muted hover:text-dome-text transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
