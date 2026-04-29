"use client";

import Image from "next/image";
import symbolGold from "@soli92/solids/brand-assets/soli-category-icons/soli-icon-symbol.png";

interface SoliLogoLoaderProps {
  label?: string;
}

export default function SoliLogoLoader({ label = "Caricamento in corso" }: SoliLogoLoaderProps) {
  return (
    <div className="bg-mesh min-h-screen grid place-items-center" aria-busy="true" aria-label={label}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          <div className="absolute inset-2 rounded-full bg-card/70 border border-border/50 backdrop-blur-sm grid place-items-center">
            <Image src={symbolGold} alt="" aria-hidden className="w-8 h-8 animate-pulse" />
          </div>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
