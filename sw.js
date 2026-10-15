const CACHE='tailor-ledger-offline-0412ae73877f10fe';
const ASSETS=['/offline.html','/offline.css','/offline.js','/icons/icon-192.png','/icons/icon-512.png','/icons/apple-touch-icon.png','/icons/maskable-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new Request(path,{cache:'reload',credentials:'omit'}))))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const name of await caches.keys())if(name.startsWith('tailor-ledger-offline-')&&name!==CACHE)await caches.delete(name);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 // Auth, API calls, writes, customer records and admin responses are never cached.
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).catch(async()=>await caches.match('/offline.html')||new Response('You are offline. Reconnect to use Tailor Ledger.',{status:503,headers:{'Content-Type':'text/plain'}})));
 }else if(ASSETS.includes(url.pathname)){
  event.respondWith(fetch(req).catch(()=>caches.match(url.pathname)));
 }
});
