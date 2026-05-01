// サービスワーカー：オフラインでも動くようにファイルを保存するロボットのようなものだよ！

const CACHE_NAME = 'odai-gacha-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// インストールされたときに、ファイルをキャッシュ（保存）するよ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('ファイルを覚えたよ！');
        return cache.addAll(urlsToCache);
      })
  );
});

// インターネットからファイルを持ってくる代わりに、保存したファイルを使うよ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 保存されていたらそれを使うし、なければインターネットに取りに行くよ
        return response || fetch(event.request);
      })
  );
});
