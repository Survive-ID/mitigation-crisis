const CACHE_NAME = 'survive-id-v3';
const ASSETS = [
    '/mitigation-crisis/',
    '/mitigation-crisis/index.html',
    '/mitigation-crisis/styles.css',
    '/mitigation-crisis/script.js',
    '/mitigation-crisis/data.js',
    '/mitigation-crisis/manifest.json',
    '/mitigation-crisis/icon.png',
    '/mitigation-crisis/fonts/Inter-Regular.ttf',
    '/mitigation-crisis/fonts/Inter-Bold.ttf',
    '/mitigation-crisis/fonts/Orbitron-Medium.ttf',
    '/mitigation-crisis/fonts/Orbitron-Bold.ttf'
];

// Install Event: Cache core assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Event: Clean old caches
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
        })
    );
    self.clients.claim();
});

// Fetch Event: Serve from cache, fall back to network
self.addEventListener('fetch', (e) => {
    e.waitUntil(
        e.respondWith(
            caches.match(e.request).then((res) => {
                return res || fetch(e.request);
            })
        )
    );
});

