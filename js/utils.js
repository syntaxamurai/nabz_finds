// ════════════════════════════════════
// PRODUCT IMAGE HELPERS
// ════════════════════════════════════
function prodImgHTML(p,cls=''){
  if(p.img)return`<img src="${p.img}" alt="${p.name}" class="${cls}" style="width:100%;height:100%;object-fit:cover;">`;
  return`<div class="ph ${p.ph||'ph1'}" style="width:100%;height:100%;"></div>`;
}

// ════════════════════════════════════
// CARD HTML
// ════════════════════════════════════
function cardHTML(p){
  const w=wishlist.has(p.id);
  const so=p.stock===0;
  const low=!so&&p.stock<=(p.lowStock||3);
  return`<div class="prod-card" onclick="showProduct(${p.id})">
    <div class="prod-img-wrap">
      ${prodImgHTML(p)}
      ${so?'<div class="prod-sold-badge">Sold Out</div><div class="prod-sold-overlay"><span class="prod-sold-label">Sold Out</span></div>':p.badge?`<div class="prod-badge">${p.badge}</div>`:''}
      <button class="prod-heart${w?' on':''}" onclick="toggleHeart(event,${p.id})">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="${w?'currentColor':'none'}" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
    </div>
    <div class="prod-info">
      <div class="prod-cat-label">${CATS[p.cat]||''}</div>
      <div class="prod-name">${p.name}</div>
      ${low?`<div class="prod-stock-tag low-stock-tag">Only ${p.stock} left</div>`:''}
      <div class="prod-row">
        <div class="prod-price">${p.oldPrice?`<span class="prod-was">Ksh ${p.oldPrice.toLocaleString()}</span>`:''}${isMember()?`<span class="member-price"><span class="member-tag">Member</span>Ksh ${getMemberPrice(p).toLocaleString()}</span>`:`Ksh ${p.price.toLocaleString()}`}</div>
        ${so?`<button class="sold-btn" disabled>Sold Out</button>`:`<button class="add-btn" onclick="addToCart(event,${p.id})">Add</button>`}
      </div>
    </div>
  </div>`;
}