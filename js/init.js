// ════════════════════════════════════
// INIT
// ════════════════════════════════════
if(session){updateUserNav();loadWishlist();}
renderHome();renderCartDrawer();renderWishDrawer();
if(window.location.hash==='#admin')openAdmin();