/* eslint-disable @typescript-eslint/no-floating-promises */
// hooks/useServiceWorkerUpdater.ts
import { useEffect, useState } from "react";

export function useServiceWorkerUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload(); // In case of silent activation fallback
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setUpdateAvailable(true); // 👉 Show prompt
              }
            });
          }
        });
      });
    }
  }, []);

  return { updateAvailable };
}
