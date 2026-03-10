// ════════════════════════════════════
// PRODUCT DETAIL
// ════════════════════════════════════
function showProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  detailQty=1;
  const w=wishlist.has(p.id);
  const so=p.stock===0;
  const low=!so&&p.stock<=(p.lowStock||3);
  const sim=products.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4);
  let stTxt='',stCls='ok';
  if(so){stTxt='Out of stock';stCls='out';}
  else if(low){stTxt='Only '+p.stock+' left — order soon';stCls='low';}
  else{stTxt=p.stock+' in stock';stCls='ok';}
  document.getElementById('pd-content').innerHTML=`
    <div class="pd-img">${prodImgHTML(p,'pd-img-real')}</div>
    <div class="pd-thumbs">
      <div class="pd-thumb on">${prodImgHTML(p)}</div>
      <div class="pd-thumb"><div class="ph ph5" style="width:100%;height:100%;"></div></div>
      <div class="pd-thumb"><div class="ph ph7" style="width:100%;height:100%;"></div></div>
    </div>
    <div class="pd-body">
      <button class="back-link" onclick="history.go(-1)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"/></svg>Back</button>
      <div class="pd-cat eyebrow">${CATS[p.cat]||''}</div>
      <div class="pd-name">${p.name}</div>
      <div class="pd-price">${p.oldPrice?`<span class="pd-was">Ksh ${p.oldPrice.toLocaleString()}</span>`:''}${isMember()?`<span class="member-price"><span class="member-tag">Member Price</span>Ksh ${getMemberPrice(p).toLocaleString()}</span><span style="font-size:.72rem;color:var(--text3);text-decoration:line-through;margin-left:7px;">Ksh ${p.price.toLocaleString()}</span>`:`Ksh ${p.price.toLocaleString()}`}</div>
      <div class="pd-rating"><div class="stars"><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div></div><span class="pd-reviews">4.9 · 24 reviews</span></div>
      <div class="pd-stock ${stCls}">${stTxt}</div>
      <p class="pd-desc">${p.desc}</p>
      ${!so?`<div class="pd-qty-row"><span class="pd-qty-label">Qty</span><div class="pd-qty"><button onclick="dQty(-1)">−</button><span id="d-qty">1</span><button onclick="dQty(1)">+</button></div></div>`:''}
      <button class="btn-primary pd-add" ${so?'disabled style="opacity:.4;cursor:not-allowed;"':''} onclick="addDetailCart(${p.id})">${so?'Out of Stock':'Add to Bag'}</button>
      <button class="pd-wish-btn${w?' on':''}" id="pd-wish" onclick="toggleWishDetail(${p.id})">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="${w?'currentColor':'none'}" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span id="pd-wish-txt">${w?'Saved to Wishlist':'Save to Wishlist'}</span>
      </button>
    </div>
    <div class="accord">
      <div class="accord-item"><button class="accord-trigger" onclick="toggleAccord(this)">Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg></button><div class="accord-body">Handpicked and quality-checked. Bags come in dust bags. Perfumes 50ml unless stated. Gift sets in branded boxes with tissue and ribbon.</div></div>
      <div class="accord-item"><button class="accord-trigger" onclick="toggleAccord(this)">Delivery <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg></button><div class="accord-body">Orders before 12pm dispatched same day. Nairobi: Ksh 200. Outside Nairobi: Ksh 350–550. WhatsApp tracking update included.</div></div>
      <div class="accord-item"><button class="accord-trigger" onclick="toggleAccord(this)">Returns <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg></button><div class="accord-body">Item arrives damaged or not as described? Contact us within 24 hours on WhatsApp. We'll sort it immediately.</div></div>
    </div>
    ${sim.length?`<section class="section"><div class="sec-header"><div><div class="eyebrow" style="margin-bottom:6px;">You May Also Like</div><div class="sec-title" style="font-size:1.4rem;">More <em>Finds</em></div></div></div><div class="prod-grid">${sim.map(x=>cardHTML(x)).join('')}</div></section>`:''}
    <footer class="site-footer" style="padding:28px 22px;"><div class="footer-brand">Nabz <em>Findz</em></div><div class="footer-bottom" style="margin-top:14px;">&copy; 2026 Nabz Findz</div></footer>
  `;
  goPage('product');window.scrollTo(0,0);
}
function dQty(d){detailQty=Math.max(1,detailQty+d);const el=document.getElementById('d-qty');if(el)el.textContent=detailQty;}
function addDetailCart(id){
  const p=products.find(x=>x.id===id);if(!p||p.stock===0)return;
  const inCart=(cart.find(c=>c.id===id)||{qty:0}).qty;
  const canAdd=Math.min(detailQty,p.stock-inCart);
  if(canAdd<=0){toast('No more stock available');return;}
  for(let i=0;i<canAdd;i++)pushCart(id);
  refreshCartUI();toast(p.name+' added to bag');
  detailQty=1;const el=document.getElementById('d-qty');if(el)el.textContent=1;
}
function toggleWishDetail(id){
  wishlist.has(id)?wishlist.delete(id):wishlist.add(id);
  const w=wishlist.has(id);
  const btn=document.getElementById('pd-wish');
  if(btn){btn.querySelector('svg').setAttribute('fill',w?'currentColor':'none');btn.classList.toggle('on',w);}
  const txt=document.getElementById('pd-wish-txt');if(txt)txt.textContent=w?'Saved to Wishlist':'Save to Wishlist';
  refreshWishUI();renderWishDrawer();
}
function toggleAccord(btn){btn.nextElementSibling.classList.toggle('open');}