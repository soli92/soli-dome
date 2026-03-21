"use client";

import { categories } from "@/data/apps";

interface CategoryFilterProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            active === cat
              ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
              : "glass text-dome-muted border border-white/5 hover:border-violet-500/30 hover:text-dome-text"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
