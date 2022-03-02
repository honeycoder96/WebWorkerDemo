const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/basic/index.html',
  '/basic/offline.html',
  '/basic/sw.js',
];
 
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

  self.addEventListener('fetch', function(event) {
    // network only
    event.respondWith(
        fetch(event.request)
    );

    // cache first
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         return response || fetch(event.request);
    //     })
    // );

    // cache first with generic fallback
    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         return response || fetch(event.request);
    //     }).catch(() => {
    //         return caches.match('/basic/offline.html');
    //     })
    // );
  }); 