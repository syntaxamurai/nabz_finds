// ════════════════════════════════════
// ADMIN
// ════════════════════════════════════
function openAdmin(){
  document.getElementById('storeRoot').style.display='none';
  document.getElementById('storeNav').style.display='none';
  document.getElementById('adminWrap').classList.remove('hidden');
  renderAdmAll();
  document.getElementById('s-wa').value=getWa();
}
function exitAdmin(){
  document.getElementById('adminWrap').classList.add('hidden');
  document.getElementById('storeRoot').style.display='';
  document.getElementById('storeNav').style.display='';
  renderHome();
}
// Keyboard shortcut
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key==='A'){e.preventDefault();openAdmin();}});

function renderAdmAll(){renderAdmDash();renderAdmProdTable();renderAdmOrders();renderAdmCustomers();updatePendingPill();}

function admTab(name,btn){
  document.querySelectorAll('.adm-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.adm-nav-btn,.adm-mob-tab').forEach(b=>b.classList.remove('on'));
  document.getElementById('adm-'+name).classList.add('on');
  document.querySelectorAll('.adm-nav-btn,.adm-mob-tab').forEach(b=>{if((b.getAttribute('onclick')||'').includes("'"+name+"'"))b.classList.add('on');});
  if(name==='orders')renderAdmOrders();
  if(name==='customers')renderAdmCustomers();
}

// Admin Dashboard
function renderAdmDash(){
  const revenue=orders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+o.total,0);
  const pending=orders.filter(o=>o.status==='pending').length;
  const totalSold=products.reduce((s,p)=>s+(p.sold||0),0);
  const out=products.filter(p=>p.stock===0).length;
  document.getElementById('adm-stats-grid').innerHTML=[
    {n:products.length,l:'Products'},
    {n:'Ksh '+revenue.toLocaleString(),l:'Revenue'},
    {n:orders.length,l:'Orders'},
    {n:pending,l:'Pending'},
    {n:totalSold,l:'Units Sold'},
    {n:out,l:'Out of Stock'},
    {n:users.length,l:'Customers'},
    {n:orders.filter(o=>o.status==='confirmed').length,l:'Confirmed'},
  ].map(s=>`<div class="adm-stat"><div class="adm-stat-num" style="font-size:${String(s.n).length>6?'1.2rem':'1.8rem'}">${s.n}</div><div class="adm-stat-label">${s.l}</div></div>`).join('');

  // Stock movement chart
  const top=[...products].sort((a,b)=>(b.sold||0)-(a.sold||0)).slice(0,10);
  const maxSold=Math.max(...top.map(p=>p.sold||0),1);
  document.getElementById('stock-chart').innerHTML=top.map(p=>{
    const h=Math.max(4,Math.round(((p.sold||0)/maxSold)*72));
    return`<div class="chart-bar-wrap" title="${p.name}: ${p.sold||0} sold, ${p.stock} in stock">
      <div class="chart-bar" style="height:${h}px;background:${p.stock===0?'var(--err)':p.stock<=(p.lowStock||3)?'var(--warn)':'var(--gold)'}"></div>
      <div class="chart-label">${p.name.split(' ')[0]}</div>
    </div>`;
  }).join('');

  // Low stock
  const alerts=[...products.filter(p=>p.stock===0),...products.filter(p=>p.stock>0&&p.stock<=(p.lowStock||3))];
  const lsEl=document.getElementById('adm-low-stock');
  if(!alerts.length){lsEl.innerHTML='<div style="font-size:.75rem;color:var(--ok);padding:10px 0;">&#10003; All products have healthy stock levels.</div>';
  }else{
    lsEl.innerHTML=`<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>Product</th><th>Stock</th><th>Sold</th><th></th></tr></thead><tbody>${alerts.map(p=>`<tr><td class="adm-td-name">${p.name}</td><td><span class="${p.stock===0?'adm-stock-out':p.stock<=(p.lowStock||3)?'adm-stock-warn':'adm-stock-ok'}">${p.stock===0?'Sold Out':p.stock}</span></td><td>${p.sold||0}</td><td><button class="adm-btn adm-btn-outline adm-btn-xs" onclick="openEditProd(${p.id})">Restock</button></td></tr>`).join('')}</tbody></table></div>`;
  }

  // Recent orders
  const rec=orders.slice(0,5);
  document.getElementById('adm-recent-orders').innerHTML=rec.length
    ?`<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>${rec.map(o=>`<tr><td style="font-family:monospace;font-size:.64rem;color:var(--text3);">${o.id.slice(-8)}</td><td>${o.date}</td><td style="font-size:.7rem;">${o.customer||'guest'}</td><td>${o.items.length}</td><td>Ksh ${o.total.toLocaleString()}</td><td><span class="ord-status ord-${o.status}">${o.status}</span></td></tr>`).join('')}</tbody></table></div>`
    :'<div class="adm-empty"><p>No orders yet.</p></div>';
}

function updatePendingPill(){
  const n=orders.filter(o=>o.status==='pending').length;
  const el=document.getElementById('adm-pending');
  el.textContent=n+' pending';el.style.display=n>0?'':'none';
}

// Admin Products
function renderAdmProdTable(q=''){
  const list=q?products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||CATS[p.cat].toLowerCase().includes(q.toLowerCase())):products;
  const tbody=document.getElementById('adm-prod-tbody');
  if(!list.length){tbody.innerHTML=`<tr><td colspan="8"><div class="adm-empty"><p>${q?'No matches.':'No products.'}</p></div></td></tr>`;return;}
  tbody.innerHTML=list.map(p=>{
    const sc=p.stock===0?'adm-stock-out':p.stock<=(p.lowStock||3)?'adm-stock-warn':'adm-stock-ok';
    const thumb=p.img?`<img src="${p.img}" style="width:32px;height:40px;object-fit:cover;border:1px solid var(--border2);">`:`<div class="ph ${p.ph||'ph1'}" style="width:32px;height:40px;"></div>`;
    return`<tr>
      <td>${thumb}</td>
      <td class="adm-td-name">${p.name}</td>
      <td>${CATS[p.cat]||''}</td>
      <td>Ksh ${p.price.toLocaleString()}</td>
      <td><span class="${sc}">${p.stock===0?'Sold Out':p.stock}</span></td>
      <td>${p.sold||0}</td>
      <td class="badge">${p.badge?`<span class="adm-badge">${p.badge}</span>`:'-'}</td>
      <td><div class="adm-td-actions">
        <button class="adm-btn adm-btn-outline adm-btn-sm" onclick="openEditProd(${p.id})">Edit</button>
        <button class="adm-btn adm-btn-red adm-btn-sm" onclick="deleteProd(${p.id})">Delete</button>
      </div></td>
    </tr>`;
  }).join('');
}
function searchProds(q){admProdQ=q;renderAdmProdTable(q);}

// Admin Orders
function setOrdFilter(f,btn){
  admOrdFilter=f;
  document.querySelectorAll('#ord-filters .adm-btn').forEach(b=>{b.className='adm-btn adm-btn-outline adm-btn-sm';});
  if(btn)btn.className='adm-btn adm-btn-gold adm-btn-sm';
  renderAdmOrders();
}
function renderAdmOrders(){
  const list=admOrdFilter==='all'?orders:orders.filter(o=>o.status===admOrdFilter);
  const el=document.getElementById('adm-orders-list');
  if(!list.length){el.innerHTML=`<div class="adm-empty"><p>${admOrdFilter==='all'?'No orders yet.':'No '+admOrdFilter+' orders.'}</p></div>`;return;}
  el.innerHTML=`<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>${list.map(o=>`
    <tr>
      <td style="font-family:monospace;font-size:.64rem;color:var(--text3);">${o.id}</td>
      <td>${o.date}</td>
      <td style="font-size:.7rem;">${o.customer||'guest'}</td>
      <td><button style="background:none;border:none;cursor:pointer;font-size:.7rem;color:var(--gold);text-decoration:underline;" onclick="toggleOrdRow('${o.id}')">${o.items.length} item${o.items.length!==1?'s':''}</button></td>
      <td>Ksh ${o.total.toLocaleString()}</td>
      <td><span class="ord-status ord-${o.status}">${o.status}</span></td>
      <td><div class="adm-td-actions">
        ${o.status==='pending'?`<button class="adm-btn adm-btn-green adm-btn-sm" onclick="setOrdStatus('${o.id}','confirmed')">Confirm</button>`:''}
        ${o.status!=='cancelled'?`<button class="adm-btn adm-btn-red adm-btn-sm" onclick="setOrdStatus('${o.id}','cancelled')">Cancel</button>`:''}
        ${o.status==='cancelled'?`<button class="adm-btn adm-btn-outline adm-btn-sm" onclick="setOrdStatus('${o.id}','pending')">Restore</button>`:''}
      </div></td>
    </tr>
    <tr class="ord-detail-row" id="ord-row-${o.id}">
      <td colspan="7"><div class="ord-detail-inner">${o.items.map(i=>`<div class="ord-detail-line"><span>${i.qty}× ${i.name}</span><span>Ksh ${(i.price*i.qty).toLocaleString()}</span></div>`).join('')}<div class="ord-detail-total"><span>Order Total</span><span>Ksh ${o.total.toLocaleString()}</span></div></div></td>
    </tr>
  `).join('')}</tbody></table></div>`;
}
function toggleOrdRow(id){const r=document.getElementById('ord-row-'+id);if(r)r.style.display=r.style.display==='table-row'?'none':'table-row';}
function setOrdStatus(id,status){
  const o=orders.find(x=>x.id===id);if(!o)return;
  o.status=status;save(K.orders,orders);
  renderAdmOrders();renderAdmDash();updatePendingPill();
  toast('Order '+status);
}

// Admin Customers
function renderAdmCustomers(){
  const el=document.getElementById('adm-cust-list');if(!el)return;
  if(!users.length){el.innerHTML='<div class="adm-empty"><p>No registered customers yet.</p></div>';return;}
  el.innerHTML=`<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Orders</th></tr></thead><tbody>${users.map(u=>`<tr><td class="adm-td-name">${u.name}</td><td style="font-size:.72rem;">${u.email}</td><td>${u.joined||'—'}</td><td>${orders.filter(o=>o.customer===u.email).length}</td></tr>`).join('')}</tbody></table></div>`;
}

// Export
function exportCSV(){
  const rows=[['Order ID','Date','Customer','Items','Total','Status'],...orders.map(o=>[o.id,o.date,o.customer||'guest',o.items.map(i=>i.qty+'x '+i.name).join('; '),'Ksh '+o.total,o.status])];
  const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='nabzfindz-orders-'+Date.now()+'.csv';a.click();
}
function exportPDF(){
  const w=window.open('','_blank');
  w.document.write('<html><head><title>Orders — Nabz Findz</title><style>body{font-family:sans-serif;padding:24px;font-size:12px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:7px 10px;text-align:left;}th{background:#f5f5f5;}h2{margin-bottom:16px;}</style></head><body>');
  w.document.write('<h2>Nabz Findz — Orders Export</h2>');
  w.document.write('<table><thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>');
  orders.forEach(o=>{w.document.write(`<tr><td>${o.id}</td><td>${o.date}</td><td>${o.customer||'guest'}</td><td>${o.items.map(i=>i.qty+'x '+i.name).join(', ')}</td><td>Ksh ${o.total.toLocaleString()}</td><td>${o.status}</td></tr>`);});
  w.document.write('</tbody></table></body></html>');
  w.document.close();w.print();
}

// Product Modal
const CLR_GRADS={ph1:'#111019,#1D1A26',ph2:'#120F1A,#1E1828',ph3:'#100F18,#1A1825',ph4:'#0F1018,#191B24',ph5:'#111219,#1D1F26',ph6:'#130E1C,#1F162A',ph7:'#0F1014,#191B20',ph8:'#10100F,#1C1C18'};
function buildClrPicker(sel){
  document.getElementById('clr-picker').innerHTML=PH_CLASSES.map(c=>`<div class="clr-swatch${c===sel?' on':''}" style="background:linear-gradient(135deg,${CLR_GRADS[c]});" onclick="selClr('${c}')"></div>`).join('');
  admSelClr=sel||'ph1';
}
function selClr(c){
  admSelClr=c;
  document.querySelectorAll('.clr-swatch').forEach(s=>s.classList.toggle('on',(s.getAttribute('onclick')||'').includes("'"+c+"'")));
}
function handleImgUpload(input){
  const file=input.files[0];if(!file)return;
  if(file.size>5*1024*1024){toast('Image too large (max 5MB)');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    pendingImgData=e.target.result;
    const prev=document.getElementById('img-preview');
    prev.src=pendingImgData;prev.style.display='block';
    document.querySelector('#img-zone p').textContent='Image selected ✓';
  };
  reader.readAsDataURL(file);
}
function openAddProd(){
  admEditId=null;pendingImgData='';
  document.getElementById('prod-modal-title').textContent='Add Product';
  ['m-id','m-name','m-price','m-oldprice','m-stock','m-lowstock','m-desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('m-cat').value='';document.getElementById('m-badge').value='';
  const prev=document.getElementById('img-preview');prev.src='';prev.style.display='none';
  document.querySelector('#img-zone p').textContent='Click to upload image';
  buildClrPicker('ph1');
  document.getElementById('prod-modal').classList.remove('hidden');
}
function openEditProd(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  admEditId=id;pendingImgData=p.img||'';
  document.getElementById('prod-modal-title').textContent='Edit Product';
  document.getElementById('m-id').value=id;
  document.getElementById('m-name').value=p.name;
  document.getElementById('m-cat').value=p.cat;
  document.getElementById('m-badge').value=p.badge||'';
  document.getElementById('m-price').value=p.price;
  document.getElementById('m-oldprice').value=p.oldPrice||'';
  document.getElementById('m-stock').value=p.stock;
  document.getElementById('m-lowstock').value=p.lowStock||3;
  document.getElementById('m-desc').value=p.desc;
  const prev=document.getElementById('img-preview');
  if(p.img){prev.src=p.img;prev.style.display='block';document.querySelector('#img-zone p').textContent='Image uploaded ✓';}
  else{prev.src='';prev.style.display='none';document.querySelector('#img-zone p').textContent='Click to upload image';}
  buildClrPicker(p.ph||'ph1');
  document.getElementById('prod-modal').classList.remove('hidden');
  admTab('products',null);
}
function closeProdModal(){document.getElementById('prod-modal').classList.add('hidden');pendingImgData='';}
function saveProd(){
  const name=document.getElementById('m-name').value.trim();
  const cat=document.getElementById('m-cat').value;
  const badge=document.getElementById('m-badge').value;
  const price=parseInt(document.getElementById('m-price').value);
  const oldPrice=document.getElementById('m-oldprice').value?parseInt(document.getElementById('m-oldprice').value):undefined;
  const stock=parseInt(document.getElementById('m-stock').value)||0;
  const lowStock=parseInt(document.getElementById('m-lowstock').value)||3;
  const desc=document.getElementById('m-desc').value.trim();
  if(!name||!cat||!price||!desc){toast('Fill in all required fields');return;}
  if(admEditId){
    const idx=products.findIndex(p=>p.id===admEditId);
    if(idx>=0){const sold=products[idx].sold||0;products[idx]={...products[idx],name,cat,badge:badge||undefined,price,oldPrice,stock,lowStock,desc,ph:admSelClr,img:pendingImgData,sold};}
    toast(name+' updated');
  }else{
    products.push({id:nextProdId(),name,cat,badge:badge||undefined,price,oldPrice,stock,lowStock,desc,ph:admSelClr,img:pendingImgData,sold:0});
    toast(name+' added');
  }
  save(K.products,products);closeProdModal();renderAdmProdTable(admProdQ);renderAdmDash();renderHome();
}
function deleteProd(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  if(!confirm(`Delete "${p.name}"?`))return;
  products=products.filter(x=>x.id!==id);
  save(K.products,products);renderAdmProdTable(admProdQ);renderAdmDash();
  toast(p.name+' deleted');
}

// Settings
function changePw(){
  const cur=document.getElementById('s-cur').value;
  const nw=document.getElementById('s-new').value;
  const conf=document.getElementById('s-conf').value;
  if(cur!==getAdmPw()){toast('Current password incorrect');return;}
  if(nw.length<6){toast('Min 6 characters');return;}
  if(nw!==conf){toast('Passwords do not match');return;}
  localStorage.setItem(K.pw,nw);
  ['s-cur','s-new','s-conf'].forEach(id=>document.getElementById(id).value='');
  toast('Password updated');
}
function saveWa(){
  const v=document.getElementById('s-wa').value.trim().replace(/\D/g,'');
  if(!v||v.length<9){toast('Enter a valid number');return;}
  localStorage.setItem(K.wa,v);toast('Number saved');
}
function resetProds(){
  if(!confirm('Reset all products to defaults? Cannot be undone.'))return;
  products=JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  save(K.products,products);renderAdmProdTable();renderAdmDash();renderHome();toast('Products reset');
}
function clearOrds(){
  if(!confirm('Delete all orders permanently?'))return;
  orders=[];save(K.orders,orders);renderAdmOrders();renderAdmDash();updatePendingPill();toast('Orders cleared');
}