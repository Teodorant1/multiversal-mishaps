/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setCatchHandler } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";

// ✅ Declare proper SW scope
declare let self: ServiceWorkerGlobalScope;

// ✅ Cache offline fallback during install
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open("offline-fallback").then((cache) => cache.add("/offline.html")),
  );
});

// ✅ Precache files injected by Workbox (like _next static files, etc.)
// @ts-ignore: Injected by Workbox during build
precacheAndRoute(self.__WB_MANIFEST);

// ✅ Page navigations → network first
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages-cache",
  }),
);

// ✅ JS/CSS/workers → stale-while-revalidate
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  }),
);

// ✅ Images → cache first
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
  }),
);

// ✅ Offline fallback handler

setCatchHandler(async (options) => {
  const event = options.event as FetchEvent;
  console.log("[SW1] Offline fallback triggered for:", event.request.url);

  if (event.request.destination === "document") {
    console.log("[SW2] Offline fallback triggered for:", event.request.url);

    const cache = await caches.open("offline-fallback");
    const cachedResponse = await cache.match("/offline.html");
    return cachedResponse ?? Response.error();
  }

  return Response.error();
});
