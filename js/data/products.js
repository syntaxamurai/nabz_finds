// ════════════════════════════════════
// CONSTANTS & STORAGE
// ════════════════════════════════════
const K={products:'nf_products',orders:'nf_orders',users:'nf_users',session:'nf_session',pw:'nf_adm_pw',wa:'nf_wa'};
const CATS={handbags:'Handbags',perfumes:'Perfumes',makeup:'Makeup',giftsets:'Gift Sets'};
const PH_CLASSES=['ph1','ph2','ph3','ph4','ph5','ph6','ph7','ph8'];
const PH_GRADS={ph1:'#111019,#1D1A26',ph2:'#120F1A,#1E1828',ph3:'#100F18,#1A1825',ph4:'#0F1018,#191B24',ph5:'#111219,#1D1F26',ph6:'#130E1C,#1F162A',ph7:'#0F1014,#191B20',ph8:'#10100F,#1C1C18'};

const DEFAULT_PRODUCTS=[
  {id:1,cat:'handbags',name:'The Clara Structured Tote',price:3800,badge:'New',ph:'ph1',stock:8,lowStock:3,sold:4,img:'',desc:'A clean, structured tote from office to evening. Smooth vegan leather, gold-tone hardware, detachable pouch. Fits a 13" laptop.'},
  {id:2,cat:'handbags',name:'Sienna Mini Crossbody',price:2400,oldPrice:2900,badge:'Sale',ph:'ph5',stock:5,lowStock:2,sold:9,img:'',desc:'Compact but mighty. Adjustable chain strap, magnetic clasp and soft suede lining.'},
  {id:3,cat:'handbags',name:'Mali Quilted Shoulder Bag',price:3200,badge:'Best Seller',ph:'ph1',stock:3,lowStock:3,sold:14,img:'',desc:'Diamond-quilted texture meets refined hardware. Padded, luxe and utterly chic.'},
  {id:4,cat:'handbags',name:'Naomi Boxy Clutch',price:1800,ph:'ph5',stock:10,lowStock:3,sold:3,img:'',desc:'The boxy clutch that goes with everything. Magnetic snap closure, wrist strap included.'},
  {id:5,cat:'handbags',name:'The Jade Top-Handle',price:4200,badge:'Limited',ph:'ph1',stock:2,lowStock:2,sold:6,img:'',desc:'Structured top-handle silhouette, croc-embossed exterior, satin lining, brass hardware. Comes in a dust bag.'},
  {id:6,cat:'handbags',name:'Zara Basket Weave Tote',price:2700,ph:'ph5',stock:0,lowStock:3,sold:8,img:'',desc:'Relaxed yet polished. The woven tote that pairs with everything.'},
  {id:7,cat:'perfumes',name:'Rose & Oud Eau de Parfum',price:1800,oldPrice:2200,badge:'Best Seller',ph:'ph2',stock:12,lowStock:4,sold:22,img:'',desc:'Bulgarian rose and dark oud — opens bright, dries down sensual. 50ml.'},
  {id:8,cat:'perfumes',name:'Soft Girl Musk',price:1400,badge:'New',ph:'ph6',stock:15,lowStock:5,sold:7,img:'',desc:'Clean, creamy musk — white flowers, soft woods and a hint of vanilla. 50ml.'},
  {id:9,cat:'perfumes',name:'Ambre Noir',price:2100,ph:'ph2',stock:6,lowStock:3,sold:5,img:'',desc:'Dark amber, incense and cedar. Mysterious, bold and completely addictive. 50ml.'},
  {id:10,cat:'perfumes',name:'Fleur de Jardin',price:1600,ph:'ph6',stock:9,lowStock:3,sold:4,img:'',desc:'Light breezy floral — fresh peonies, jasmine and a clean green base. 50ml.'},
  {id:11,cat:'perfumes',name:'Vanilla Soleil',price:1500,oldPrice:1900,badge:'Sale',ph:'ph2',stock:0,lowStock:3,sold:11,img:'',desc:'Sun-warmed skin, creamy vanilla and a hint of coconut. 50ml.'},
  {id:12,cat:'makeup',name:'Velvet Matte Lip Kit',price:1200,badge:'New',ph:'ph3',stock:20,lowStock:5,sold:8,img:'',desc:'Long-wear matte lip duo — liner and lipstick in dusty rose nude.'},
  {id:13,cat:'makeup',name:'Glass Skin Serum Foundation',price:2200,badge:'Best Seller',ph:'ph7',stock:11,lowStock:4,sold:19,img:'',desc:'Lightweight serum-foundation with SPF 30. Luminous, skin-like finish. 20 shades.'},
  {id:14,cat:'makeup',name:'Soft Glam Eye Palette',price:1800,ph:'ph3',stock:7,lowStock:3,sold:6,img:'',desc:'12 eyeshadows — champagnes, warm browns, taupes and a pop of copper.'},
  {id:15,cat:'makeup',name:'Brow Lamination Kit',price:900,ph:'ph7',stock:14,lowStock:4,sold:3,img:'',desc:'DIY laminated brow look at home. Lasts up to 6 weeks.'},
  {id:16,cat:'makeup',name:'Glazed Lip Oil Set',price:1100,badge:'Limited',ph:'ph3',stock:4,lowStock:3,sold:10,img:'',desc:'3 high-shine lip oils in sheer rose, berry and clear.'},
  {id:17,cat:'makeup',name:'Sun-Kissed Glow Bronzer',price:1300,ph:'ph7',stock:8,lowStock:3,sold:5,img:'',desc:'Finely milled bronzer for a natural sun-kiss. Buildable, zero orange.'},
  {id:18,cat:'makeup',name:'Setting Spray & Primer Duo',price:1500,ph:'ph3',stock:16,lowStock:4,sold:7,img:'',desc:'Hydrating primer + finishing setting spray.'},
  {id:19,cat:'giftsets',name:'The Glam Girl Gift Box',price:5500,badge:'Limited',ph:'ph4',stock:3,lowStock:2,sold:8,img:'',desc:'Mini Soft Girl Musk, Velvet Matte Lip Kit, Glazed Lip Oil and satin pouch in a ribbon-tied box.'},
  {id:20,cat:'giftsets',name:'Perfume & Bag Duo',price:5900,badge:'New',ph:'ph8',stock:5,lowStock:2,sold:3,img:'',desc:'Sienna Mini Crossbody + 50ml Rose & Oud in a branded gift bag.'},
  {id:21,cat:'giftsets',name:'The Soft Girl Edit',price:4200,ph:'ph4',stock:6,lowStock:2,sold:4,img:'',desc:'Soft Girl Musk, Glazed Lip Oil Set and travel moisturiser in a reusable floral tote.'},
  {id:22,cat:'giftsets',name:'Glow Up Makeup Set',price:3800,ph:'ph8',stock:0,lowStock:2,sold:6,img:'',desc:'Glass Skin Foundation, Glazed Lip Oil in rose and mini setting spray.'},
  {id:23,cat:'giftsets',name:'The Luxe Pamper Box',price:7500,badge:'Best Seller',ph:'ph4',stock:2,lowStock:2,sold:12,img:'',desc:'Jade Top-Handle bag, Ambre Noir perfume and Soft Glam Eye Palette in a black box with gold ribbon.'},
];

// Member discount (10% off for logged-in customers)
const MEMBER_DISC=0.10;
function getMemberPrice(p){return session&&!session.isAdmin?Math.floor(p.price*(1-MEMBER_DISC)):p.price;}
function isMember(){return session&&!session.isAdmin;}

function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):JSON.parse(JSON.stringify(d));}catch{return JSON.parse(JSON.stringify(d));}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v));}
function saveWishlist(){
  if(!session||session.isAdmin)return;
  const u=users.find(x=>x.email===session.email);
  if(u){u.wishlist=[...wishlist];save(K.users,users);}
}
function loadWishlist(){
  if(!session||session.isAdmin){wishlist=new Set();return;}
  const u=users.find(x=>x.email===session.email);
  wishlist=new Set(u&&u.wishlist?u.wishlist:[]);
}

let products=load(K.products,DEFAULT_PRODUCTS);
let orders=load(K.orders,[]);
let users=load(K.users,[]);
let session=load(K.session,null); // {email,name,isAdmin}
let cart=[], wishlist=new Set();
let shopFilter='all', shopSort='', detailQty=1;
let admEditId=null, admSelClr='ph1', admProdQ='', admOrdFilter='all';
let pendingImgData='';

function getAdmPw(){return localStorage.getItem(K.pw)||'nabz2026';}
function getWa(){return localStorage.getItem(K.wa)||'254700000000';}
function nextProdId(){return products.length?Math.max(...products.map(p=>p.id))+1:1;}
function nextOrdId(){return'ORD-'+Date.now();}