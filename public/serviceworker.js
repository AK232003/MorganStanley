console.warn('sw file in public folder')
let cacheData = "app-V20";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/bundle.js',
                'static/js/main.ee0924d1.js',
                'static/css/main.513ac754.css',
                'logo_scroll.png',
                // 'https://apis.google.com/js/api.js?onload=__iframefcb418694',
                // 'https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.wW0KrNepdTU.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo8Je2IwWe-sD_xcm5fABAaEfyuc1g/cb=gapi.loaded_0?le=scs',
                'index.html',
                '/',
                '/admin',
                '/admin/managersList',
                '/admin/addUser',
                '/admin/workersList',
                '/admin/childrenProfiles',
                '/caseManager',
                '/caseManager/addChild',
                '/caseManager/profiles',
                '/caseManager/reports',
                '/caseManager/taskStatus',
                '/caseManager/taskComments',
                '/groundWorker',
                '/groundWorker/profiles',
                '/groundWorker/caseDetails',
                'locales/en/translation.json',
                'locales/hi/translation.json',
                'locales/mr/translation.json'
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    // if(evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        if(!navigator.onLine) {

            event.respondWith(
                caches.match(event.request).then((resp) =>{
                    if(resp) {
                        return resp
                    }
                })
                )
            // }
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