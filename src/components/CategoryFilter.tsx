"use client";

import { Dispatch, SetStateAction } from "react";
import { categories } from "@/data/apps";

interface CategoryFilterProps {
  active: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {["Tutte", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`pill flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium border
            ${active === cat
              ? "pill-active"
              : "glass text-white/50 border-white/10 hover:text-white/80"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
