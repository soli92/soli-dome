"use client";

import { useEffect, useRef } from "react";

export default function ServiceWorkerRegister() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Registrato con successo:", registration.scope);
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            registration.update();
          }, 60 * 1000);
        })
        .catch((error) => {
          console.error("[SW] Registrazione fallita:", error);
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
    }

    return () => {
      window.removeEventListener("load", register);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return null;
}
