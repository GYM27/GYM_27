const CACHE_NAME = 'analise-jogo-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css', // Se o seu CSS estivesse num ficheiro separado
  '/script.js', // Se o seu JS estivesse num ficheiro separado
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// O evento 'install' é executado quando o Service Worker é instalado pela primeira vez
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso!');
        return cache.addAll(urlsToCache);
      })
  );
});

// O evento 'fetch' permite intercetar os pedidos de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devolve o ficheiro em cache se existir
        }
        return fetch(event.request); // Caso contrário, faz o pedido à rede
      })
  );
});