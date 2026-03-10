// ════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════
function goPage(id){
  document.querySelectorAll('#storeRoot .page').forEach(p=>p.classList.remove('active'));
  const pg=document.getElementById('page-'+id);
  if(pg){pg.classList.add('active');window.scrollTo(0,0);}
  if(id==='account')renderAccount();
}
function goShop(cat){shopFilter=cat;updateShopHeader();renderShopGrid();goPage('shop');}
function navTo(page,cat){closeMobMenu();cat?goShop(cat):goPage(page);return false;}
function openMobMenu(){document.getElementById('mobMenu').classList.add('open');document.getElementById('mobOverlay').classList.add('open');}
function closeMobMenu(){document.getElementById('mobMenu').classList.remove('open');document.getElementById('mobOverlay').classList.remove('open');}