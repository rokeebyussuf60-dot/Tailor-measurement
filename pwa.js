let promptEvent=null;
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const button=document.createElement('button');button.id='install-app';button.type='button';button.textContent='＋ Install app';button.setAttribute('aria-label','Install Tailor Ledger');
const installDialog=document.createElement('dialog');installDialog.id='install-instructions';
installDialog.innerHTML='<div class="dialog-head"><h2>Install Tailor Ledger</h2><button type="button" class="ghost" aria-label="Close install instructions">✕</button></div><p>Add your studio to your home screen for quick access.</p><p><strong>iPhone / iPad:</strong> Open this site in Safari, tap Share, then Add to Home Screen. Keep Open as Web App enabled if shown.</p><p><strong>Android / desktop:</strong> Open your browser menu and choose Install app or Add to Home screen.</p><p class="muted">Your records still need internet. Installation does not enable offline editing.</p>';
installDialog.querySelector('button').onclick=()=>installDialog.close();
const status=document.createElement('div');status.id='connection-banner';status.setAttribute('role','status');status.textContent='You’re offline. Reconnect before saving changes.';
document.body.append(button,installDialog,status);
function sync(){button.hidden=standalone();status.hidden=navigator.onLine}
button.onclick=async()=>{if(promptEvent){const event=promptEvent;promptEvent=null;try{await event.prompt();const choice=await event.userChoice;if(choice.outcome==='accepted')button.hidden=true}catch{installDialog.showModal()}}else installDialog.showModal()};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;sync()});
window.addEventListener('appinstalled',()=>{promptEvent=null;button.hidden=true;installDialog.close()});
window.addEventListener('online',sync);window.addEventListener('offline',sync);window.matchMedia('(display-mode: standalone)').addEventListener('change',sync);sync();
if('serviceWorker' in navigator&&window.isSecureContext){const register=()=>navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'}).catch(()=>{ /* Core online functionality remains available if registration fails. */ });if(document.readyState==='complete')register();else window.addEventListener('load',register,{once:true})}
