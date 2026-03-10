// ════════════════════════════════════
// SHOP
// ════════════════════════════════════
const SHOP_HDRS={all:['All Products','The Full <em>Collection</em>'],handbags:['Handbags','Carry it with <em>Class</em>'],perfumes:['Perfumes','Smell Like a <em>Dream</em>'],makeup:['Makeup','Your Best <em>Face Forward</em>'],giftsets:['Gift Sets','Give the <em>Perfect Gift</em>']};
function updateShopHeader(){
  const [ey,ti]=SHOP_HDRS[shopFilter]||SHOP_HDRS.all;
  document.getElementById('shop-eyebrow').textContent=ey;
  document.getElementById('shop-title').innerHTML=ti;
  document.querySelectorAll('.filter-chip').forEach(b=>{
    const m={all:'all',handbags:'handbags',perfumes:'perfumes',makeup:'makeup','gift sets':'giftsets'};
    b.classList.toggle('on',(m[b.textContent.trim().toLowerCase()]||b.textContent.trim().toLowerCase())===shopFilter);
  });
}
function filterShop(cat,btn){shopFilter=cat;updateShopHeader();renderShopGrid();}
function sortShop(v){shopSort=v;renderShopGrid();}
function renderShopGrid(){
  let list=shopFilter==='all'?[...products]:products.filter(p=>p.cat===shopFilter);
  if(shopSort==='asc')list.sort((a,b)=>a.price-b.price);
  else if(shopSort==='desc')list.sort((a,b)=>b.price-a.price);
  else if(shopSort==='new')list=[...list.filter(p=>p.badge==='New'),...list.filter(p=>p.badge!=='New')];
  else if(shopSort==='stock')list=[...list.filter(p=>p.stock>0),...list.filter(p=>p.stock===0)];
  document.getElementById('shop-count').textContent=list.length+' product'+(list.length!==1?'s':'');
  document.getElementById('shop-grid').innerHTML=list.length?list.map(p=>cardHTML(p)).join(''):'<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text3);font-size:.85rem;">No products found.</div>';
}