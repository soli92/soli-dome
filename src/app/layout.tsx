import type { Metadata, Viewport } from "next";
import "./globals.css";

const supportedThemes = [
  "light",
  "dark",
  "fantasy",
  "cyberpunk",
  "90s-party",
  "steampunk",
  "ichigo",
  "vegeta",
  "zoro",
  "captain-america",
  "sasuke",
  "inuyasha",
] as const;

const themeBootstrapScript = `
(() => {
  const themes = new Set(${JSON.stringify(supportedThemes)});
  const themeKeys = ["soli-dome-theme", "theme", "data-theme"];
  const selected = themeKeys
    .map((key) => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    })
    .find((value) => typeof value === "string" && themes.has(value));
  document.documentElement.setAttribute("data-theme", selected || "cyberpunk");
})();
`;

export const metadata: Metadata = {
  title: "Soli Dome",
  description: "Il tuo portale personale per tutte le app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Soli Dome",
  },
  icons: {
    apple: "/icons/icon-192x192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070714",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" data-theme="cyberpunk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@400;600;700&family=Courier+Prime&family=Crimson+Text:wght@600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Merriweather:wght@400;700&family=Orbitron:wght@400;500;600;700&family=Oswald:wght@400;600;700&family=Rajdhani:wght@500;600;700&family=Russo+One&family=Share+Tech+Mono&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
