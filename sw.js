const CACHE_NAME = 'survive-id-v3';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './data.js',
    './manifest.json',
    './icon.png',
    './fonts/Inter-Regular.ttf',
    './fonts/Inter-Bold.ttf',
    './fonts/Orbitron-Medium.ttf',
    './fonts/Orbitron-Bold.ttf'
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
