const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>'₹'+n.toLocaleString('en-IN');
const cart={mem:{},get(){try{return JSON.parse(localStorage.getItem('bw_cart'))||{}}catch(e){return this.mem}},
 set(c){this.mem=c;try{localStorage.setItem('bw_cart',JSON.stringify(c))}catch(e){}badge()},
 add(id){const c=this.get();c[id]=(c[id]||0)+1;this.set(c)},
 count(){return Object.values(this.get()).reduce((a,b)=>a+b,0)}};
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.appendChild(t)}
 t.innerHTML=m+' <a href="cart.html">View cart</a>';t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2400)}
function badge(){$$('.cartcount').forEach(e=>e.textContent=cart.count())}
const card=p=>`<article class="card"><a href="product.html?id=${p.id}" class="pimg" aria-label="${p.name}">${p.emoji}</a><div class="body"><span class="tag">${CATS[p.cat][0]}</span><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="price">${money(p.price)}<s>${money(p.mrp)}</s></div><button class="btn" data-add="${p.id}">Add to cart</button></div></article>`;
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-add]');
 if(a){cart.add(+a.dataset.add);toast('Added to cart ✓');const t=a.textContent;a.textContent='Added ✓';setTimeout(()=>a.textContent=t,1200)}
 if(e.target.id==='burger')$('nav.main').classList.toggle('open');
 const cp=e.target.closest('[data-copy]');if(cp){navigator.clipboard?.writeText(cp.dataset.copy);cp.textContent='Copied';setTimeout(()=>cp.textContent='Copy',1200)}
});
// Listing pages
const grid=$('#grid');
if(grid){const cat=document.body.dataset.cat;
 const draw=()=>{let l=PRODUCTS.filter(p=>cat==='all'||p.cat===cat);
  const q=($('#q')?.value||'').toLowerCase();if(q)l=l.filter(p=>(p.name+p.desc).toLowerCase().includes(q));
  const s=$('#sort')?.value;if(s==='lo')l.sort((a,b)=>a.price-b.price);if(s==='hi')l.sort((a,b)=>b.price-a.price);
  grid.innerHTML=l.length?l.map(card).join(''):'<p>No products match. Try a different search.</p>'};
 const qp=new URLSearchParams(location.search).get('q');if(qp&&$('#q'))$('#q').value=qp;$('#q')?.addEventListener('input',draw);$('#sort')?.addEventListener('change',draw);draw()}
// Home featured
const feat=$('#featured');if(feat)feat.innerHTML=[1,10,16,20,24,29,13,6].map(i=>card(PRODUCTS.find(p=>p.id===i))).join('');
// Product page
const pd=$('#product');
if(pd){const p=PRODUCTS.find(x=>x.id===+new URLSearchParams(location.search).get('id'));
 if(!p)pd.innerHTML='<p>Product not found. <a href="shop.html">Back to shop</a></p>';
 else{document.title=p.name+' | Pawfect';
  pd.innerHTML=`<div class="pd"><div class="pimg">${p.emoji}</div><div><span class="tag">${CATS[p.cat][0]}</span><h1 style="font-size:2.2rem">${p.name}</h1><p class="price" style="font-size:1.6rem;margin:.8rem 0">${money(p.price)}<s>${money(p.mrp)}</s></p><p>${p.desc}</p><p class="tag" style="margin:1rem 0">Free delivery above ₹999 · 7-day returns on unopened items</p><button class="btn" data-add="${p.id}">Add to cart</button> <a class="btn alt" href="cart.html">Go to cart</a></div></div>`;
  $('#related').innerHTML=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,4).map(card).join('')}}
// Cart
const cartEl=$('#cart');
if(cartEl){const draw=()=>{const c=cart.get(),ids=Object.keys(c).filter(i=>PRODUCTS.some(p=>p.id==i));
 if(!ids.length){cartEl.innerHTML='<p>Your cart is empty. <a href="shop.html">Start shopping</a></p>';$('#totals').innerHTML='';return}
 let sub=0;cartEl.innerHTML=ids.map(i=>{const p=PRODUCTS.find(x=>x.id==i);sub+=p.price*c[i];
  return `<div class="row"><div class="pimg">${p.emoji}</div><div class="info"><b>${p.name}</b><div>${money(p.price)}</div></div><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Decrease">−</button><span>${c[i]}</span><button data-q="${i}" data-d="1" aria-label="Increase">+</button></div></div>`}).join('');
 const ship=sub>=999?0:79;$('#totals').innerHTML=`<div class="sum"><span>Subtotal</span><span>${money(sub)}</span></div><div class="sum"><span>Delivery</span><span>${ship?money(ship):'Free'}</span></div><div class="sum t"><span>Total</span><span>${money(sub+ship)}</span></div><a class="btn" style="margin-top:1rem" href="checkout.html">Checkout</a>`};
 cartEl.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(!b)return;const c=cart.get();c[b.dataset.q]+=+b.dataset.d;if(c[b.dataset.q]<1)delete c[b.dataset.q];cart.set(c);draw()});draw()}
// Forms
$$('[data-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();
 if(f.dataset.form==='order'){if(!cart.count()){$('.note',f).textContent='Your cart is empty. Add something first.';$('.note',f).classList.add('show');return}cart.set({})}
 const n=$('.note',f);n.textContent=f.dataset.msg;n.classList.add('show');f.reset()}));
badge();
