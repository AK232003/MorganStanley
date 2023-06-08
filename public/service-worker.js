// service-worker.js

const CACHE_NAME = 'my-react-app-cache1';
const urlsToCache = ['/', '/caseManager', '/caseManager/list']; // Add all the URLs of your pages here

self.addEventListener('install', (event) => {
  // Perform the installation process
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercept and respond to fetch requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        console.log("Here");
        return response;
      }

      // Fetch and cache new requests
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
