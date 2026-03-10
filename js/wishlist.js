// ════════════════════════════════════
// WISHLIST
// ════════════════════════════════════
function toggleHeart(e,id){
  e.stopPropagation();
  wishlist.has(id)?wishlist.delete(id):wishlist.add(id);
  const w=wishlist.has(id);
  e.currentTarget.querySelector('svg').setAttribute('fill',w?'currentColor':'none');
  e.currentTarget.classList.toggle('on',w);
  refreshWishUI();renderWishDrawer();
  toast(w?'Saved to wishlist':'Removed from wishlist');
}
function refreshWishUI(){
  const n=wishlist.size;
  const dot=document.getElementById('wish-dot');dot.textContent=n;dot.style.display=n>0?'flex':'none';
  const sub=document.getElementById('wish-sub');if(sub)sub.textContent=n+' saved item'+(n!==1?'s':'')+(isMember()?'<span class="sync-dot"></span>':'');
  saveWishlist();
}
function renderWishDrawer(){
  const body=document.getElementById('wishBody');if(!body)return;
  const items=products.filter(p=>wishlist.has(p.id));
  if(!items.length){
    body.innerHTML=`<div class="drawer-empty"><svg class="drawer-empty-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p>Nothing saved yet</p><button class="drawer-empty-cta" onclick="closeWish();goShop('all')">Browse Products</button></div>`;return;
  }
  body.innerHTML=items.map(p=>{const so=p.stock===0;const low=!so&&p.stock<=(p.lowStock||3);return`<div class="wish-item">
    <div class="wi-swatch" onclick="closeWish();showProduct(${p.id})">${p.img?`<img src="${p.img}" style="width:100%;height:100%;object-fit:cover;">`:`<div class="ph ${p.ph||'ph1'}" style="width:100%;height:100%;"></div>`}</div>
    <div class="wi-body">
      <div class="wi-cat">${CATS[p.cat]||''}</div>
      <div class="wi-name" onclick="closeWish();showProduct(${p.id})">${p.name}</div>
      <div class="wi-price">Ksh ${p.price.toLocaleString()}</div>
      ${so?'<div class="wi-sold">Sold Out</div>':low?`<div style="font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:var(--warn);margin-bottom:6px;">Only ${p.stock} left</div>`:''}
      <div class="wi-actions">
        ${so?'':`<button class="wi-add" onclick="addToCart(null,${p.id});renderWishDrawer()">Add to Bag</button>`}
        <button class="wi-rm" onclick="removeFromWish(${p.id})" title="Remove"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
    </div>
  </div>`;}).join('');
}
function removeFromWish(id){wishlist.delete(id);refreshWishUI();renderWishDrawer();toast('Removed from wishlist');}
function openWish(){
  closeCart();
  document.getElementById('wishDrawer').classList.add('open');
  document.getElementById('wishOverlay').classList.add('open');
  document.body.style.overflow='hidden';
  renderWishDrawer();
}
function closeWish(){
  document.getElementById('wishDrawer').classList.remove('open');
  document.getElementById('wishOverlay').classList.remove('open');
  document.body.style.overflow='';
}