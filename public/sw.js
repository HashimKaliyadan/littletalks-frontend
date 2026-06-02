const CACHE_NAME = 'littletalk-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.webmanifest'
];

// Install Event - caching assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - cleaning up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network First, falling back to cache
self.addEventListener('fetch', (e) => {
  // Only handle GET requests and local origin requests
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }

  // SPA navigation routing: Serve index.html for all page navigations
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch('/index.html')
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            if (networkResponse.status === 200) {
              cache.put('/index.html', networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // If network fails (offline), fallback to cache
          return caches.match('/index.html').then((cachedResponse) => {
            return cachedResponse || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
          });
        })
    );
    return;
  }

  // Network First strategy for static assets
  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // If network fails, serve from cache
        return caches.match(e.request).then((cachedResponse) => {
          return cachedResponse || new Response('Asset offline', { status: 404 });
        });
      })
  );
});
