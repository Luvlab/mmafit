const CACHE = 'mmafit-v1'

const PRECACHE = [
  '/',
  '/dashboard',
  '/manifest.json',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  // Only handle same-origin GET requests
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return

  // Network-first for HTML (always fresh), cache-first for assets
  const isHTML = e.request.headers.get('accept')?.includes('text/html')
  const isAsset = /\.(js|css|png|svg|woff2?|ico)(\?|$)/.test(e.request.url)

  if (isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(res => { caches.open(CACHE).then(c => c.put(e.request, res.clone())); return res })
        .catch(() => caches.match(e.request).then(r => r || caches.match('/')))
    )
  } else if (isAsset) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached
        return fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()))
          return res
        })
      })
    )
  }
})
