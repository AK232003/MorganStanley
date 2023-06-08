console.warn('sw file in public folder')
let cacheData = "app-V2";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                // 'https://apis.google.com/js/api.js?onload=__iframefcb418694',
                // 'https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.wW0KrNepdTU.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo8Je2IwWe-sD_xcm5fABAaEfyuc1g/cb=gapi.loaded_0?le=scs',
                'index.html',
                // '/',
                '/caseManager',
                '/caseManager/Dashboard',
                '/caseManager/addChild',
                '/caseManager/addExcel',
                '/caseManager/list',
                // '/caseManager/list/12',
                // '/caseManager/dish.png',
                '/admin',
                '/admin/addUser',
                '/admin/managersList',
                '/admin/workersList',
                '/groundworker',
                '/groundworker/caseDetails'
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if(!navigator.onLine)
    {
        event.respondWith(
            caches.match(event.request).then((resp) =>{
                if(resp) {
                    return resp
                }
            })
        )
    }
    
})

// const CACHE_NAME = 'v-1';
// const urlsToCache = ['index.html', 'offline.html'];

// const self = this;
// // Install SW
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log('Opened cache');

//                 return cache.addAll(urlsToCache);
//             })
//     )
// });

// // Listen for reqs
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(() => {
//                 return fetch(event.request)
//                 .catch(() => {
//                     caches.match('offline.html')
//                 })
//             })
//     )
// });

// // Activate SW
// self.addEventListener('activate', (event) => {
//     const cacheWhiteList = [];
//     cacheWhiteList.push(CACHE_NAME);

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhiteList.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )
// });