// ════════════════════════════════════
// HOME
// ════════════════════════════════════
function renderHome(){
  const picks=products.filter(p=>p.badge==='New'||p.badge==='Best Seller').slice(0,8);
  const el=document.getElementById('home-arrivals');
  if(el)el.innerHTML=picks.map(p=>cardHTML(p)).join('');
  // Member early-access banner in home
  const memberBanner=document.getElementById('member-early-access');
  if(memberBanner){
    if(isMember()){
      memberBanner.style.display='flex';
      memberBanner.innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><p>Welcome back, <strong>${session.name.split(' ')[0]}</strong>. You have <strong>10% member pricing</strong> on all products — prices shown reflect your discount.<span class="sync-dot" style="margin-left:8px;"></span></p>`;
    }else{
      memberBanner.style.display='none';
    }
  }
  ['handbags','perfumes','makeup','giftsets'].forEach(c=>{
    const el=document.getElementById('cc-'+c);if(!el)return;
    const total=products.filter(p=>p.cat===c).length;
    const inStock=products.filter(p=>p.cat===c&&p.stock>0).length;
    el.textContent=total+' pieces'+(inStock<total?' · '+inStock+' in stock':'');
  });
}