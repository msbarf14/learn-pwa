const CACHE_NAME = "firstpwa-v1.04";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/order.html",
  "/pages/profile.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/assets/BANNER.jpg",
  "/assets/bawang_merah_bersih.jpg",
  "/assets/bawang_putih.jpg",
  "/assets/cabai_acar.jpg",
  "/assets/tahu.jpg",
  "/assets/tempe.jpg",
  "/assets/terong.jpg",
  "/assets/timun.jpg",
  "/assets/tomat.jpg",
  "/assets/profile.jpg",
  // icon set 
  "/assets/icon-72x72.png",
  "/assets/icon-96x96.png",
  "/assets/icon-144x144.png",
  "/assets/icon-152x152.png",
  "/assets/icon-192x192.png",
  "/assets/icon-384x384.png",
  "/assets/icon-512x512.png",
  
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];
//  save asset to cache
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//  fetch data asset to cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

//  menghapus cache lama
  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });