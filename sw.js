const C = "alireza-planner-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(C).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./manifest.webmanifest"
      ])
    )
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== C)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
