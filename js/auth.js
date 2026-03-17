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
    session={email,name:'Admin',isAdmin:true};
    save(K.session,session);
    closeAuth();
    updateUserNav(); // FIX: was missing — nav icon never turned gold for admin
    openAdmin();
    return;
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

// ── User nav dropdown ────────────────────────────────────────────────────────
// FIX: Instead of navigating blindly on click, show a small dropdown that gives
// the user a "Sign Out" option. This is the only way signOut() was reachable.
function onUserNavClick(){
  if(!session){ openAuth(); return; }

  // If a dropdown is already open, close it and bail
  const existing=document.getElementById('user-nav-dropdown');
  if(existing){ existing.remove(); return; }

  const dropdown=document.createElement('div');
  dropdown.id='user-nav-dropdown';
  dropdown.style.cssText=[
    'position:fixed',
    'top:56px',
    'right:16px',
    'background:var(--surface1,#1a1a1a)',
    'border:1px solid var(--border1,#333)',
    'border-radius:8px',
    'box-shadow:0 8px 32px rgba(0,0,0,.45)',
    'z-index:9999',
    'min-width:180px',
    'overflow:hidden',
    'font-family:var(--font-body,sans-serif)',
  ].join(';');

  // Header row — shows who is logged in
  const header=document.createElement('div');
  header.style.cssText='padding:12px 16px 10px;border-bottom:1px solid var(--border1,#333);';
  header.innerHTML=`
    <div style="font-size:.7rem;color:var(--text3,#888);text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">
      ${session.isAdmin ? 'Admin' : 'Signed in as'}
    </div>
    <div style="font-size:.82rem;font-weight:600;color:var(--text1,#eee);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;">
      ${session.name}
    </div>`;
  dropdown.appendChild(header);

  // Menu items
  const items=[];

  if(session.isAdmin){
    items.push({ label:'Admin Panel', icon:'⚙', action:()=>{ closeDropdown(); openAdmin(); } });
  } else {
    items.push({ label:'My Account',  icon:'👤', action:()=>{ closeDropdown(); goPage('account'); } });
  }

  items.push({ label:'Sign Out', icon:'→', action:()=>{ closeDropdown(); signOut(); }, danger:true });

  items.forEach(item=>{
    const btn=document.createElement('button');
    btn.style.cssText=[
      'display:flex',
      'align-items:center',
      'gap:10px',
      'width:100%',
      'padding:11px 16px',
      'background:none',
      'border:none',
      'cursor:pointer',
      'font-size:.82rem',
      'text-align:left',
      item.danger ? 'color:var(--gold,#b8935a)' : 'color:var(--text1,#eee)',
    ].join(';');
    btn.innerHTML=`<span style="font-size:.9rem;opacity:.7;">${item.icon}</span>${item.label}`;
    btn.onmouseenter=()=>btn.style.background='rgba(255,255,255,.06)';
    btn.onmouseleave=()=>btn.style.background='none';
    btn.onclick=item.action;
    dropdown.appendChild(btn);
  });

  document.body.appendChild(dropdown);

  // Close when clicking anywhere outside
  function closeDropdown(){
    const d=document.getElementById('user-nav-dropdown');
    if(d) d.remove();
    document.removeEventListener('click', outsideClick);
  }
  function outsideClick(e){
    const d=document.getElementById('user-nav-dropdown');
    if(d && !d.contains(e.target) && e.target.id!=='userNavBtn'){
      closeDropdown();
    }
  }
  // Delay listener so this click doesn't immediately close it
  setTimeout(()=>document.addEventListener('click', outsideClick), 0);
}