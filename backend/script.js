// js/script.js
// Handles: cart (localStorage), toast, lightbox, scroll animations, reservation/contact demos

/* ---------- Utilities ---------- */
const CART_KEY = 'vegdelight_cart_v1';
const RES_KEY = 'vegdelight_reservations_v1';
const MSG_KEY = 'vegdelight_messages_v1';

function $(sel){ return document.querySelector(sel); }
function $All(sel){ return Array.from(document.querySelectorAll(sel)); }

/* ---------- Toast ---------- */
function showToast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  t.style.opacity = '1';
  setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=> t.style.display='none',250); }, 1800);
}

/* ---------- Lightbox ---------- */
function openLightbox(src, alt=''){
  // create backdrop
  let back = document.getElementById('lightboxBackdrop');
  if(back) back.remove();
  back = document.createElement('div');
  back.id = 'lightboxBackdrop';
  back.innerHTML = `<div style="position:relative;max-width:1100px;width:100%;">
      <button id="lbClose" style="position:absolute;right:-10px;top:-10px;background:#fff;border-radius:999px;padding:6px 8px;border:none;cursor:pointer;font-weight:700;box-shadow:0 6px 20px rgba(0,0,0,0.2)">✕</button>
      <img src="${src}" alt="${alt}" />
    </div>`;
  back.addEventListener('click', (e)=>{
    if(e.target.id === 'lightboxBackdrop' || e.target.id === 'lbClose') back.remove();
  });
  document.body.appendChild(back);
}

/* ---------- Scroll animation (fade-up) ---------- */
function handleScrollReveal(){
  const reveal = document.querySelectorAll('.fade-up, .scale-in');
  reveal.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 60){
      el.style.opacity = 1;
      el.classList.add('scale-in'); // some already have scale-in
    }
  });
}
window.addEventListener('scroll', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);

/* ---------- CART (localStorage) ---------- */
function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(item){
  /* item: {id,name,price,image,category} */
  const cart = loadCart();
  const found = cart.find(i=>i.id===item.id);
  if(found) found.qty += 1;
  else cart.push({...item, qty:1});
  saveCart(cart);
  renderCart();
  showToast(`${item.name} added to cart`);
}
function removeFromCart(id){
  let cart = loadCart();
  cart = cart.filter(i=>i.id!==id);
  saveCart(cart);
  renderCart();
}
function changeQty(id, delta){
  const cart = loadCart();
  const it = cart.find(i=>i.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty <=0) removeFromCart(id);
  else saveCart(cart), renderCart();
}
function renderCart(){
  const container = document.getElementById('cart-items');
  if(!container) return;
  const cart = loadCart();
  container.innerHTML = '';
  if(cart.length === 0){
    container.innerHTML = `<div class="text-gray-600">Cart is empty</div>`;
    $('#cart-total') && ($('#cart-total').textContent = '₹0');
    return;
  }
  let total = 0;
  cart.forEach(it=>{
    total += it.price * it.qty;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between py-2 border-b';
    row.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${it.image}" alt="${it.name}" class="w-12 h-12 object-cover rounded"/>
        <div>
          <div class="font-semibold">${it.name}</div>
          <div class="text-xs text-gray-500">${it.category}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="font-semibold">₹${(it.price * it.qty).toFixed(0)}</div>
        <div class="flex items-center justify-end text-gray-600 text-sm gap-2 mt-1">
          <button class="px-2" data-action="dec" data-id="${it.id}">−</button>
          <span>${it.qty}</span>
          <button class="px-2" data-action="inc" data-id="${it.id}">＋</button>
        </div>
      </div>
    `;
    container.appendChild(row);
  });
  $('#cart-total') && ($('#cart-total').textContent = '₹' + total.toFixed(0));

  // attach inc/dec
  container.querySelectorAll('[data-action="inc"]').forEach(b=> b.addEventListener('click', e=>{
    changeQty(e.target.dataset.id, +1);
  }));
  container.querySelectorAll('[data-action="dec"]').forEach(b=> b.addEventListener('click', e=>{
    changeQty(e.target.dataset.id, -1);
  }));
}

/* Initialize add-to-cart buttons rendered via data attributes */
function initAddButtons(){
  $All('[data-add-item]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      try{
        const item = JSON.parse(btn.getAttribute('data-add-item'));
        addToCart(item);
      }catch(e){ console.error(e); }
    });
  });
}

/* ---------- Reservation save (demo) ---------- */
function saveReservation(data){
  const arr = JSON.parse(localStorage.getItem(RES_KEY) || '[]');
  arr.push(data);
  localStorage.setItem(RES_KEY, JSON.stringify(arr));
  showToast('Reservation saved (demo)');
}

/* ---------- Contact message save (demo) ---------- */
function saveContactMsg(data){
  const arr = JSON.parse(localStorage.getItem(MSG_KEY) || '[]');
  arr.push(data);
  localStorage.setItem(MSG_KEY, JSON.stringify(arr));
  showToast('Message saved (demo)');
}

/* ---------- Init on load ---------- */
window.addEventListener('load', ()=>{
  renderCart();
  initAddButtons();

  // bind lightbox triggers (images with data-light)
  $All('[data-light]').forEach(img=>{
    img.addEventListener('click', ()=> openLightbox(img.src, img.alt));
  });

  // reservation form if exists
  const rform = document.getElementById('reservation-form');
  if(rform){
    rform.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = {
        name: rform.name.value.trim(),
        phone: rform.phone.value.trim(),
        datetime: rform.datetime.value,
        guests: rform.guests.value,
        notes: rform.notes.value.trim(),
        createdAt: new Date().toISOString()
      };
      if(!data.name || !data.phone || !data.datetime || !data.guests){
        showToast('Please fill required fields');
        return;
      }
      saveReservation(data);
      rform.reset();
    });
  }

  // contact form
  const cform = document.getElementById('contact-form');
  if(cform){
    cform.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = { name: cform.name.value.trim(), email: cform.email.value.trim(), message: cform.message.value.trim(), createdAt: new Date().toISOString() };
      if(!data.name || !data.email || !data.message){ showToast('Please fill required fields'); return; }
      saveContactMsg(data);
      cform.reset();
    });
  }

  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

});
