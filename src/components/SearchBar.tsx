"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
      <input
        type="text"
        placeholder="Cerca un'app..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input w-full pl-11 pr-10 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted-foreground font-medium"
      />
      {value && (
        <button
          type="button"
          aria-label="Cancella ricerca"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
