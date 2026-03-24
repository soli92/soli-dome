"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function detectIOS(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) &&
    !(window.navigator as Navigator & { standalone?: boolean }).standalone
  );
}

export default function InstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isIOS = detectIOS();

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed) return;

    if (isIOS) {
      setTimeout(() => setIsVisible(true), 2000);
    }

    // Rileva Android / Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setIsVisible(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isIOS]);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
    }
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-slide-up">
      <div className="relative bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-2xl shadow-primary/15">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/20 pointer-events-none" />

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-sm">
            SD
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-foreground font-semibold text-sm">Installa Soli Dome</p>
            {isIOS ? (
              <p className="text-muted-foreground text-xs mt-0.5">
                Tocca <span className="text-primary">Condividi</span> poi &ldquo;Aggiungi a Home&rdquo;
              </p>
            ) : (
              <p className="text-muted-foreground text-xs mt-0.5">
                Aggiungi alla schermata home per accesso rapido
              </p>
            )}
          </div>

          {!isIOS && (
            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex-shrink-0"
            >
              <Download size={14} />
              Installa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
