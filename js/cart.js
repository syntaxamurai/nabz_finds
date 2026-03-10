// ════════════════════════════════════
// CART
// ════════════════════════════════════
function addToCart(e,id){
  if(e)e.stopPropagation();
  const p=products.find(x=>x.id===id);if(!p||p.stock===0)return;
  const inCart=(cart.find(c=>c.id===id)||{qty:0}).qty;
  if(inCart>=p.stock){toast('No more stock available');return;}
  pushCart(id);refreshCartUI();
  toast(p.name+' added to bag');
  if(e){const b=e.currentTarget;b.textContent='Added!';b.classList.add('added');setTimeout(()=>{b.textContent='Add';b.classList.remove('added');},1400);}
}
function pushCart(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const ex=cart.find(c=>c.id===id);
  if(ex)ex.qty++;else cart.push({...p,qty:1});
}
function removeCart(id){cart=cart.filter(c=>c.id!==id);refreshCartUI();}
function adjustQty(id,d){
  const item=cart.find(c=>c.id===id);if(!item)return;
  if(d>0){const p=products.find(x=>x.id===id);if(p&&item.qty>=p.stock){toast('No more stock available');return;}}
  item.qty+=d;if(item.qty<=0)removeCart(id);else refreshCartUI();
}
function refreshCartUI(){
  const count=cart.reduce((s,c)=>s+c.qty,0);
  const dot=document.getElementById('cart-dot');dot.textContent=count;dot.style.display=count>0?'flex':'none';
  const sub=document.getElementById('cart-sub');if(sub)sub.textContent=count>0?count+' item'+(count!==1?'s':''):'Empty';
  renderCartDrawer();
}
function renderCartDrawer(){
  const body=document.getElementById('cartBody');
  const foot=document.getElementById('cartFoot');
  if(!cart.length){
    body.innerHTML=`<div class="drawer-empty"><svg class="drawer-empty-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Your bag is empty</p><button class="drawer-empty-cta" onclick="closeCart();goShop('all')">Browse Products</button></div>`;
    foot.style.display='none';return;
  }
  body.innerHTML=cart.map(c=>`<div class="cart-item">
    <div class="ci-swatch"><div class="swatch">${c.img?`<img src="${c.img}" style="width:100%;height:100%;object-fit:cover;">`:`<div class="ph ${c.ph||'ph1'}" style="width:100%;height:100%;"></div>`}</div></div>
    <div class="ci-body">
      <div class="ci-cat">${CATS[c.cat]||''}</div>
      <div class="ci-name">${c.name}</div>
      <div class="ci-qty-row"><button class="ci-qty-btn" onclick="adjustQty(${c.id},-1)">−</button><span class="ci-qty-val">${c.qty}</span><button class="ci-qty-btn" onclick="adjustQty(${c.id},1)">+</button></div>
      <div class="ci-price">Ksh ${((isMember()?Math.floor(c.price*(1-MEMBER_DISC)):c.price)*c.qty).toLocaleString()}</div>
      <button class="ci-remove" onclick="removeCart(${c.id})">Remove</button>
    </div>
  </div>`).join('');
  const ep=item=>isMember()?getMemberPrice(item):item.price;
  const total=cart.reduce((s,c)=>s+ep(c)*c.qty,0);
  document.getElementById('cartTotal').textContent='Ksh '+total.toLocaleString()+(isMember()?' (Member)':'');
  foot.style.display='block';
}
function openCart(){
  closeWish();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow='';
}