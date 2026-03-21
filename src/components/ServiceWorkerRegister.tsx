"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[SW] Registrato con successo:", registration.scope);

            // Controlla aggiornamenti ogni 60 secondi
            setInterval(() => {
              registration.update();
            }, 60 * 1000);
          })
          .catch((error) => {
            console.error("[SW] Registrazione fallita:", error);
          });
      });
    }
  }, []);

  return null;
}
