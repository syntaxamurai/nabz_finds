// ════════════════════════════════════
// CHECKOUT — logs order, deducts stock
// ════════════════════════════════════
// Real-time card refresh — updates individual cards in place without full re-render
function liveRefreshCards(ids){
  ids.forEach(id=>{
    const p=products.find(x=>x.id===id);if(!p)return;
    // Update all prod-heart buttons and add-btn in all grids
    document.querySelectorAll('.prod-card').forEach(card=>{
      const heartBtn=card.querySelector('.prod-heart');
      const addBtn=card.querySelector('.add-btn,.sold-btn');
      if(!heartBtn||!addBtn)return;
      // Detect if this card is for our product by checking onclick
      const onclick=card.getAttribute('onclick')||'';
      if(!onclick.includes('showProduct('+id+')'))return;
      // Flash the card
      card.classList.add('stock-updated');
      setTimeout(()=>card.classList.remove('stock-updated'),800);
      // If now sold out, replace add btn
      if(p.stock===0){
        addBtn.outerHTML=`<button class="sold-btn" disabled>Sold Out</button>`;
        // Add sold out overlay to image
        const imgWrap=card.querySelector('.prod-img-wrap');
        if(imgWrap&&!imgWrap.querySelector('.prod-sold-overlay')){
          imgWrap.innerHTML+=`<div class="prod-sold-badge">Sold Out</div><div class="prod-sold-overlay"><span class="prod-sold-label">Sold Out</span></div>`;
        }
      }
    });
  });
}

function checkout(){
  if(!cart.length)return;
  const effPrice=item=>isMember()?getMemberPrice(item):item.price;
  const total=cart.reduce((s,c)=>s+effPrice(c)*c.qty,0);
  const items=cart.map(c=>({id:c.id,name:c.name,qty:c.qty,price:effPrice(c),cat:c.cat,memberDisc:isMember()}));
  const order={id:nextOrdId(),date:new Date().toLocaleString('en-KE',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}),items,total,status:'pending',customer:session?session.email:'guest'};
  orders.unshift(order);save(K.orders,orders);
  items.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    if(p){p.stock=Math.max(0,p.stock-item.qty);p.sold=(p.sold||0)+item.qty;}
  });
  save(K.products,products);renderHome();
  // Real-time: update any visible product cards in shop/home grids
  liveRefreshCards(items.map(i=>i.id));
  const msg=encodeURIComponent('Hi Nabz Findz! Order:\n\n'+items.map(c=>`• ${c.qty}x ${c.name} — Ksh ${(c.price*c.qty).toLocaleString()}`).join('\n')+'\n\nTotal: Ksh '+total.toLocaleString()+'\n\nPlease confirm. Thank you!');
  window.open('https://wa.me/'+getWa()+'?text='+msg,'_blank');
  cart=[];refreshCartUI();closeCart();toast('Order sent via WhatsApp!');
}