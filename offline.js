document.querySelector('#retry').addEventListener('click',()=>location.reload());
const status=document.querySelector('#connection');
function update(){status.textContent=navigator.onLine?'A network is available. Tap Try again to reconnect.':'Waiting for an internet connection…'}
window.addEventListener('online',update);window.addEventListener('offline',update);update();
