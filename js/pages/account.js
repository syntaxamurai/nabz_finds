// ════════════════════════════════════
// USER ACCOUNT PAGE
// ════════════════════════════════════
function renderAccount(){
  if(!session){openAuth();return;}
  const hero=document.getElementById('acct-hero');
  if(hero)hero.innerHTML=`
    <div class="account-avatar">${session.name.charAt(0).toUpperCase()}</div>
    <div class="eyebrow" style="margin-bottom:5px;">My Account</div>
    <div class="sec-title" style="font-size:1.4rem;">${session.name}</div>
    <div style="font-size:.74rem;color:var(--text3);margin-top:4px;">${session.email}</div>
    <button onclick="signOut()" style="margin-top:14px;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);background:none;border:1px solid var(--border);padding:7px 14px;cursor:pointer;">Sign Out</button>
  `;
  renderAcctOrders();renderAcctWishlist();renderAcctProfile();
}
function renderAcctOrders(){
  const el=document.getElementById('acct-orders');if(!el)return;
  const myOrders=session?orders.filter(o=>o.customer===session.email):[];
  if(!myOrders.length){el.innerHTML='<div style="padding:32px 0;color:var(--text3);font-size:.82rem;">No orders yet. When you checkout via WhatsApp your orders will appear here.</div>';return;}
  el.innerHTML=myOrders.map(o=>`<div class="order-hist-card">
    <div class="oh-head"><span class="oh-id">${o.id}</span><span class="oh-date">${o.date}</span><span class="oh-status ${o.status}">${o.status}</span></div>
    <div class="oh-items">${o.items.map(i=>`${i.qty}× ${i.name}`).join(', ')}</div>
    <div class="oh-total">Total: Ksh ${o.total.toLocaleString()}</div>
  </div>`).join('');
}
function renderAcctWishlist(){
  const el=document.getElementById('acct-wishlist');if(!el)return;
  const items=products.filter(p=>wishlist.has(p.id));
  if(!items.length){el.innerHTML='<div style="padding:32px 0;color:var(--text3);font-size:.82rem;">Nothing in your wishlist yet.</div>';return;}
  el.innerHTML=`<div class="prod-grid">${items.map(p=>cardHTML(p)).join('')}</div>`;
}
function renderAcctProfile(){
  const el=document.getElementById('acct-profile');if(!el||!session)return;
  el.innerHTML=`<div style="max-width:360px;">
    <div style="font-size:.76rem;color:var(--text3);line-height:1.9;margin-bottom:18px;">Name: ${session.name}<br>Email: ${session.email}</div>
    <button onclick="signOut()" class="btn-secondary" style="max-width:180px;">Sign Out</button>
  </div>`;
}
function switchAcctTab(name,btn){
  document.querySelectorAll('.account-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.account-panel').forEach(p=>p.classList.remove('on'));
  if(btn)btn.classList.add('on');
  document.getElementById('acct-'+name).classList.add('on');
}