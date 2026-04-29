"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import logoGold from "@soli92/solids/brand-assets/soli-icons/soli-icon-4x3-with-text-gold.png";
import logoMono from "@soli92/solids/brand-assets/soli-icons/soli-icon-4x3-with-text-mono.png";

const LIGHT_THEMES = new Set(["light", "captain-america"]);

interface SoliBrandLogoProps {
  className?: string;
  priority?: boolean;
}

export default function SoliBrandLogo({ className, priority = false }: SoliBrandLogoProps) {
  const [logo, setLogo] = useState<StaticImageData>(logoGold);

  useEffect(() => {
    const root = document.documentElement;
    const syncLogo = () => {
      const theme = root.getAttribute("data-theme") ?? "";
      setLogo(LIGHT_THEMES.has(theme) ? logoMono : logoGold);
    };

    syncLogo();

    const observer = new MutationObserver(syncLogo);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={logo}
      alt="Soli Dome"
      priority={priority}
      className={className}
      sizes="(max-width: 640px) 124px, 148px"
    />
  );
}
