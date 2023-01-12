const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

/** install */
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");

  event.waitUntil(
    (async () => {
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

/** fetch */
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log(
            "[Service Worker] Fetch failed; returning offline page instead.",
            error
          );

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});

/** push */
self.addEventListener("push", (event) => {
  // const data = JSON.parse(event.data.text());
  // console.log("New notification", data);
  const data = {
    title: "hihi",
    body: "body임",
    icon: "dfs",
  };
  event.waitUntil(self.registration.showNotification(data.title, data));
});

/** push notification */
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click Received.", event.notification.data);
  event.notification.close();
});
