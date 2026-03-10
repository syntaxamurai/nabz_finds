// ════════════════════════════════════
// AUTH
// ════════════════════════════════════
function openAuth(){document.getElementById('authModal').classList.add('open');}
function closeAuth(){document.getElementById('authModal').classList.remove('open');}
function switchAuth(tab,btn){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.auth-panel').forEach(p=>p.classList.remove('active'));
  if(btn)btn.classList.add('active');else{
    document.querySelectorAll('.auth-tab').forEach(t=>{if((t.getAttribute('onclick')||'').includes("'"+tab+"'"))t.classList.add('active');});
  }
  document.getElementById('auth-'+tab).classList.add('active');
  ['li-err','su-err','su-ok'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
}
function doLogin(){
  const email=document.getElementById('li-email').value.trim().toLowerCase();
  const pw=document.getElementById('li-pw').value;
  const err=document.getElementById('li-err');
  // Admin shortcut
  if(email==='admin@nabzfindz.com'&&pw===getAdmPw()){
    session={email,name:'Admin',isAdmin:true};save(K.session,session);
    closeAuth();openAdmin();return;
  }
  const user=users.find(u=>u.email===email&&u.pw===btoa(pw));
  if(!user){err.textContent='Incorrect email or password.';err.style.display='block';return;}
  session={email:user.email,name:user.name,isAdmin:false};save(K.session,session);
  loadWishlist();refreshWishUI();renderWishDrawer();
  closeAuth();updateUserNav();renderHome();
  toast('Welcome back, '+user.name.split(' ')[0]+'!');
  goPage('account');
}
function doSignup(){
  const name=document.getElementById('su-name').value.trim();
  const email=document.getElementById('su-email').value.trim().toLowerCase();
  const pw=document.getElementById('su-pw').value;
  const err=document.getElementById('su-err');
  const ok=document.getElementById('su-ok');
  if(!name||!email||!pw){err.textContent='Please fill in all fields.';err.style.display='block';ok.style.display='none';return;}
  if(pw.length<6){err.textContent='Password must be at least 6 characters.';err.style.display='block';ok.style.display='none';return;}
  if(users.find(u=>u.email===email)){err.textContent='An account with this email already exists.';err.style.display='block';ok.style.display='none';return;}
  users.push({email,name,pw:btoa(pw),joined:new Date().toLocaleDateString('en-KE')});
  save(K.users,users);
  err.style.display='none';ok.textContent='Account created! Signing you in…';ok.style.display='block';
  setTimeout(()=>{
    session={email,name,isAdmin:false};save(K.session,session);
    loadWishlist();refreshWishUI();renderWishDrawer();
    closeAuth();updateUserNav();renderHome();
    toast('Welcome to Nabz Findz, '+name.split(' ')[0]+'!');
    goPage('account');
  },1000);
}
function signOut(){
  session=null;save(K.session,null);
  wishlist=new Set();refreshWishUI();renderWishDrawer();
  updateUserNav();renderHome();goPage('home');toast('Signed out.');
}
function updateUserNav(){
  const btn=document.getElementById('userNavBtn');
  if(session){
    btn.style.color='var(--gold)';
    btn.title=session.name;
  }else{
    btn.style.color='';btn.title='Account';
  }
}
function onUserNavClick(){
  if(session){
    if(session.isAdmin)openAdmin();
    else goPage('account');
  }else openAuth();
}