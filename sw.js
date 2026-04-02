// sw.js - Service Worker للتخزين المؤقت
const CACHE_NAME = 'first-aid-v1';
const urlsToCache = [
    '/',
    '/index.html',
    // ملفات CSS والخطوط
    'https://fonts.googleapis.com/css2?family=Cairo:wght@600;900&family=Tajawal:wght@400;700&family=Amiri:wght@700&display=swap',
    // الصور - أضف جميع مسارات الصور
    '/images/cpr.jpg',
    '/images/stroke_mi.jpg',
    '/images/anaphylaxis.jpg',
    '/images/heatstroke.jpg',
    '/images/drowning.jpg',
    '/images/pph.jpg',
    '/images/bleeding.jpg',
    '/images/fracture.jpg',
    '/images/burn.jpg',
    '/images/choking.jpg',
    '/images/fainting.jpg',
    '/images/snakebite.jpg',
    '/images/poison.jpg',
    '/images/diabetes.jpg',
    '/images/seizure.jpg',
    '/images/nosebleed.jpg',
    '/images/evacuation.jpg',
    '/images/firstaidbag.jpg',
    '/images/conclusion.jpg',
    // الفيديوهات - أضف جميع مسارات الفيديو
    '/videos/cpr.mp4',
    '/videos/stroke_mi.mp4',
    '/videos/anaphylaxis.mp4',
    '/videos/heatstroke.mp4',
    '/videos/drowning.mp4',
    '/videos/pph.mp4',
    '/videos/bleeding.mp4',
    '/videos/fracture.mp4',
    '/videos/burn.mp4',
    '/videos/choking.mp4',
    '/videos/fainting.mp4',
    '/videos/snakebite.mp4',
    '/videos/poison.mp4',
    '/videos/diabetes.mp4',
    '/videos/seizure.mp4',
    '/videos/nosebleed.mp4',
    '/videos/evacuation.mp4'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// استرجاع الملفات من التخزين المؤقت
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // إرجاع الملف من التخزين المؤقت إذا وجد
            if (response) {
                return response;
            }
            // وإلا جلب من الشبكة
            return fetch(event.request);
        })
    );
});

// تحديث التخزين المؤقت عند إصدار نسخة جديدة
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});