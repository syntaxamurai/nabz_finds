// ════════════════════════════════════
// MISC
// ════════════════════════════════════
function subscribe(){const i=document.getElementById('nl-email');if(!i||!i.value.includes('@')){toast('Enter a valid email');return;}toast("You're on the list!");i.value='';}
function sendMsg(){toast("Message sent! We'll reply soon.");}
function toast(msg){const t=document.getElementById('toast');document.getElementById('toast-msg').textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400);}