const CACHE_NAME = 'version-1'
const urlsToCache = [ 'index.html', 'offline.html' ]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache!')

        cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(() => {
        return fetch(e.request).then(function (response) {
          return response;
        }).catch((error) => {
          console.log('Network Only fetch failed', error);
          return caches.match('offline.html');
        });
      })
  )
});

self.addEventListener('activate', (e) => {
  const cacheWhiteList = []
  cacheWhiteList.push(CACHE_NAME)

  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
})