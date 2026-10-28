
const VERSION='sag-pwa-visual-fix-v2';
const PAGES=['/','/index.html','/about.html','/services.html','/gallery.html','/faq.html','/testimonials.html','/contact.html','/offline.html','/styles.css','/app.js','/assets/sag-client-logo.webp','/assets/sag-generated-services.webp','/manifest.webmanifest'];
self.addEventListener('install',function(event){event.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(PAGES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(event){event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(event){var req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(function(r){if(r.ok){var copy=r.clone();event.waitUntil(caches.open(VERSION).then(function(c){return c.put(req,copy)}))}return r}).catch(function(){return caches.match(req).then(function(x){return x||caches.match('/offline.html')})}));return}
 event.respondWith(caches.match(req).then(function(cached){return cached||fetch(req).then(function(resp){if(resp.ok){var copy=resp.clone();event.waitUntil(caches.open(VERSION).then(function(c){return c.put(req,copy)}))}return resp})}))
});
