const CACHE_NAME = 'black-star-game-cache-v1';

// eslint-disable-next-line no-underscore-dangle
const urlsToCache = self.__WB_MANIFEST;

self.addEventListener('install', async event => {
    // Precache urls from workbox manifest
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(urlsToCache.map(({ url }) => url)).catch(err => {
                console.error(err);

                throw err;
            });
        })
    );
});

self.addEventListener('activate', event => {
    // Delete old caches

    event.waitUntil(
        caches.keys().then(
            cacheNames =>
                Promise.all(
                    cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
                )
            // eslint-disable-next-line function-paren-newline
        )
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        // eslint-disable-next-line consistent-return
        (() => {
            if (event.request.url.startsWith('http')) {
                return fetch(event.request)
                    .then(
                        networkResponse =>
                            caches.open(CACHE_NAME).then(cache => {
                                if (
                                    !networkResponse ||
                                    networkResponse.status !== 200 ||
                                    networkResponse.type !== 'basic'
                                ) {
                                    return networkResponse;
                                }

                                cache.put(event.request, networkResponse.clone());

                                return networkResponse;
                            })
                        // eslint-disable-next-line function-paren-newline
                    )
                    .catch(() => caches.match(event.request));
            }
        })()
    );
});
