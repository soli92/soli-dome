import type { MetadataRoute } from "next";
import type { StaticImageData } from "next/image";
import appIcon from "@soli92/solids/brand-assets/soli-category-icons/soli-icon-app-icon.png";
import appleTouchIcon from "@soli92/solids/brand-assets/soli-category-icons/soli-icon-apple-touch.png";

function assetUrl(asset: string | StaticImageData): string {
  return typeof asset === "string" ? asset : asset.src;
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Soli Dome",
    short_name: "Soli Dome",
    description: "Il tuo portale personale per accedere a tutte le tue applicazioni",
    start_url: "/",
    display: "standalone",
    background_color: "#070714",
    theme_color: "#06b6d4",
    orientation: "portrait-primary",
    icons: [
      {
        src: assetUrl(appIcon),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: assetUrl(appleTouchIcon),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["productivity", "utilities"],
    shortcuts: [
      {
        name: "Aggiungi App",
        short_name: "Aggiungi",
        description: "Aggiungi una nuova applicazione al portale",
        url: "/?action=add",
        icons: [
          {
            src: assetUrl(appIcon),
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
