const icons = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="m5 5 14 14M19 5 5 19"/>',
  truck: '<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  box: '<path d="m3 7 9-5 9 5v11l-9 4-9-4V7Zm0 0 9 5 9-5M12 12v10M7 4.8l10 5"/>',
  spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>'
};
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const svg = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
$$('[data-icon]').forEach(element => { element.innerHTML = svg(element.dataset.icon); });

const products = [
  { id: 1, name: 'Signature Bomber Ceket', category: 'Giyim', price: 4290, image: 'trench.jpg', badge: 'YENİ SEZON', colors: ['#b68362', '#383b32'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Yalın kesimi, fermuar detayı ve rahat silüetiyle mevsim geçişlerinin vazgeçilmezi. Şehirde geçen uzun günlerden hafta sonu yürüyüşlerine.' },
  { id: 2, name: 'Élan Omuz Çantası', category: 'Çanta', price: 3490, image: 'bag.jpg', badge: 'ÇOK SEVİLEN', colors: ['#242321', '#592725', '#c3aa85'], sizes: ['Standart'], description: 'Günlük ritmine eşlik eden sade bir form. İhtiyaçlarına yer açan dengeli tasarımıyla, yanından ayırmak istemeyeceğin bir parça.' },
  { id: 3, name: 'Yumuşak Dokulu Panço', category: 'Giyim', price: 1890, image: 'knit.jpg', badge: 'RABÜS SEÇKİSİ', colors: ['#e4ddd0', '#858c7b'], sizes: ['S', 'M', 'L'], description: 'Örgü dokusu ve rahat silüetiyle serin günlerin en iyi eşlikçisi. Püskül detaylarıyla tek başına zarif, katmanlarla zahmetsiz.' },
  { id: 4, name: 'Sculpture Taşlı Küpe', category: 'Aksesuar', price: 790, image: 'earrings.jpg', badge: 'İNCE BİR DOKUNUŞ', colors: ['#668495', '#c3c4c3'], sizes: ['Standart'], description: 'Işığı yakalayan taşlar ve heykelsi detaylar. Gündüzden geceye, stiline karakter katan küçük bir dokunuş.' },
  { id: 5, name: 'Studio Rahat Pantolon', category: 'Giyim', price: 3790, image: 'blazer.jpg', badge: 'HER GÜN İÇİN', colors: ['#d5b0a0', '#b5a58f'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Rahat kesim, yumuşak doku ve özenli detaylar. Gündüzden akşam planlarına uzanan çok yönlü bir gardırop parçası.' },
  { id: 6, name: 'Mini City Çanta', category: 'Çanta', price: 2490, image: 'mini-bag.jpg', badge: 'YENİ', colors: ['#322b25', '#a28664'], sizes: ['Standart'], description: 'En sevdiklerini yanında taşı. Kompakt bir formda, günlük hayatın küçük ihtiyaçlarına yer açan zamansız bir tasarım.' },
  { id: 7, name: 'Everyday Güneş Gözlüğü', category: 'Aksesuar', keywords: 'gözlük güneş', price: 1290, image: 'glasses.jpg', badge: 'ZAMANSIZ', colors: ['#262321', '#745235'], sizes: ['Standart'], description: 'Karakterli çizgiler, dengeli oranlar. Şehir stiline son dokunuşu yapan klasik çerçeve.' },
  { id: 8, name: 'Essential Pamuklu Gömlek', category: 'Giyim', price: 1590, image: 'shirt.jpg', badge: 'GARDIROP KLASİĞİ', colors: ['#e9e8e1', '#9aafbb'], sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Sade yakası ve rahat kesimiyle her gün yeniden giyebileceğin bir klasik. Favori pantolonunla, kendi ritminde.' }
];
const money = value => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);
const normalize = value => value.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
function readArray(key, legacyKey) {
  try {
    const raw = localStorage.getItem(key) ?? localStorage.getItem(legacyKey);
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}
let cart = readArray('rabus-cart', 'velour-cart').filter(item => {
  const product = products.find(product => product.id === item?.id);
  return product && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99 && product.sizes.includes(item.size);
});
let favorites = [...new Set(readArray('rabus-favorites', 'velour-favorites'))].filter(id => products.some(product => product.id === id));
let filter = 'Tümü';
let detailId = null;
let selectedSize = '';
let returnFocus = null;
let toastTimer;

function persist() {
  try {
    localStorage.setItem('rabus-cart', JSON.stringify(cart));
    localStorage.setItem('rabus-favorites', JSON.stringify(favorites));
  } catch { /* Shopping remains available when browser storage is disabled. */ }
}
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3300);
}
function renderProducts() {
  let list = products.filter(product => filter === 'Tümü' || (filter === 'Favoriler' ? favorites.includes(product.id) : product.category === filter));
  const sort = $('#sort').value;
  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  $('#result-count').textContent = `${list.length} ürün`;
  $('#empty-state').hidden = list.length > 0;
  $('#products').innerHTML = list.map(product => `<article class="product">
    <div class="product-photo"><button class="product-view" data-product="${product.id}" aria-label="${product.name} detaylarını gör"><img src="assets/${product.image}" alt="${product.name}" width="600" height="800" loading="lazy"></button>
    <span class="product-badge">${product.badge}</span><button class="favorite ${favorites.includes(product.id) ? 'saved' : ''}" data-favorite="${product.id}" aria-label="${product.name}: ${favorites.includes(product.id) ? 'favorilerden kaldır' : 'favorilere ekle'}" aria-pressed="${favorites.includes(product.id)}">${svg('heart')}</button><button class="quick-add" data-product="${product.id}">Yakından keşfet</button></div>
    <div class="product-info"><p class="product-category">${product.category}</p><button class="product-name" data-product="${product.id}">${product.name}</button><div class="product-info-bottom"><span class="price">${money(product.price)}</span><div class="swatches" aria-label="Koleksiyonun renk paleti">${product.colors.map(color => `<i style="background:${color}" aria-hidden="true"></i>`).join('')}</div></div></div></article>`).join('');
  $$('[data-filter]').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $$('#main-nav [data-nav]').forEach(link => link.classList.toggle('active', link.dataset.nav === filter));
  $('#favorites-count').textContent = favorites.length;
  $('#favorites-count').hidden = favorites.length === 0;
}
function setPageInert(value) {
  $$('.site-header, main, footer, .announcement').forEach(element => { element.inert = value; });
}
function closePanels(restoreFocus = true) {
  $$('dialog[open]').forEach(dialog => dialog.close());
  $('#cart').hidden = true;
  $('#overlay').hidden = true;
  document.body.style.overflow = '';
  setPageInert(false);
  if (restoreFocus && returnFocus?.isConnected) returnFocus.focus();
}
function openDialog(selector) {
  const previousFocus = document.activeElement;
  closePanels(false);
  returnFocus = previousFocus;
  $(selector).showModal();
  document.body.style.overflow = 'hidden';
}
function showProduct(id) {
  const product = products.find(product => product.id === id);
  if (!product) return;
  detailId = id;
  selectedSize = product.sizes.length === 1 ? product.sizes[0] : '';
  $('#product-detail').innerHTML = `<img src="assets/${product.image}" alt="${product.name}" width="600" height="800"><div class="detail-copy"><span class="eyebrow">${product.category.toLocaleUpperCase('tr')} · RABÜS</span><h2 id="detail-title">${product.name}</h2><span class="price">${money(product.price)}</span><p>${product.description}</p><span class="size-label" id="size-label">Beden seçimi</span><div class="sizes" role="group" aria-labelledby="size-label">${product.sizes.map(size => `<button data-size="${size}" class="${size === selectedSize ? 'selected' : ''}" aria-pressed="${size === selectedSize}">${size}</button>`).join('')}</div><button class="button primary full" id="add-to-cart">Alışveriş çantama ekle</button><p class="detail-services">2.500 TL üzeri ücretsiz kargo<br>14 gün içinde kolay iade</p><small>Konsept koleksiyon · Ürünler örnek amaçlıdır.</small></div>`;
  openDialog('#product-dialog');
}
function addCart() {
  const product = products.find(product => product.id === detailId);
  if (!product || !product.sizes.includes(selectedSize)) { toast('Sana uygun bedeni seçmeyi unutma.'); return; }
  const existing = cart.find(item => item.id === detailId && item.size === selectedSize);
  if (existing?.qty >= 99) { toast('Bu parça için en fazla 99 adet ekleyebilirsin.'); return; }
  if (existing) existing.qty += 1;
  else cart.push({ id: detailId, size: selectedSize, qty: 1 });
  persist(); renderCart(); closePanels(); toast('Güzel seçim. Ürün çantana eklendi.');
}
function cartTotal() { return cart.reduce((sum, item) => sum + products.find(product => product.id === item.id).price * item.qty, 0); }
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  $('#cart-count').textContent = count;
  $('#cart-open').setAttribute('aria-label', `Sepetim, ${count} ürün`);
  $('#cart-items').innerHTML = cart.length ? cart.map((item, index) => {
    const product = products.find(product => product.id === item.id);
    return `<div class="cart-item"><img src="assets/${product.image}" alt="${product.name}" width="91" height="123"><div style="flex:1;min-width:0"><h3>${product.name}</h3><p>Beden: ${item.size}</p><p>${money(product.price)}</p><div class="quantity"><button data-quantity="${index}" data-delta="-1" aria-label="${product.name} adedini azalt">−</button><span>${item.qty}</span><button data-quantity="${index}" data-delta="1" aria-label="${product.name} adedini artır" ${item.qty === 99 ? 'disabled' : ''}>+</button><button class="remove" data-remove="${index}">Kaldır</button></div></div></div>`;
  }).join('') : `<div class="empty-state">${svg('bag')}<h3>Bir güzel başlangıç.</h3><p>Çantanda henüz bir parça yok. Yeni favorilerini keşfetmeye ne dersin?</p><button class="button primary full" data-close>Koleksiyona dön</button></div>`;
  const total = cartTotal();
  $('#cart-summary').innerHTML = cart.length ? `<div class="summary-line"><span>Ara toplam</span><strong>${money(total)}</strong></div><div class="summary-line"><span>Kargo</span><span>${total >= 2500 ? 'Bizden' : 'Ödeme adımında hesaplanır'}</span></div><div class="shipping-progress" aria-hidden="true"><span style="width:${Math.min(100, total / 25)}%"></span></div><p class="cart-note">${total < 2500 ? `Ücretsiz kargoya ${money(2500 - total)} kaldı.` : 'Bu seçkine ücretsiz kargo eşlik ediyor.'}</p><button class="button primary full" id="checkout">Sipariş özetini gör</button><p class="cart-note">Konsept mağaza. Gerçek ödeme alınmaz.</p>` : '';
}
function showInfo(title, body) {
  $('#info-content').innerHTML = `<p class="eyebrow">RABÜS ATELIER</p><h2 id="info-title">${title}</h2>${body}`;
  openDialog('#info-dialog');
}
function closeMenu() {
  $('#main-nav').classList.remove('open');
  $('#menu-open').setAttribute('aria-expanded', 'false');
  $('#menu-open').setAttribute('aria-label', 'Menüyü aç');
}
function selectFilter(value, scroll = false) {
  filter = value;
  renderProducts();
  closeMenu();
  if (scroll) $('#koleksiyon').scrollIntoView({ behavior: 'smooth' });
}
function renderSearch() {
  const query = normalize($('#search-input').value.trim());
  const results = products.filter(product => normalize(`${product.name} ${product.category} ${product.keywords || ''}`).includes(query));
  $('#search-results').innerHTML = results.length ? results.map(product => `<button class="search-result" data-product="${product.id}"><img src="assets/${product.image}" alt="" width="58" height="73"><span>${product.name}<small>${product.category} · ${money(product.price)}</small></span></button>`).join('') : '<p class="cart-note">Aradığın parçayı bulamadık. Başka bir kelimeyle yeniden deneyebilirsin.</p>';
}

const information = {
  'Teslimat ve iade': '<p>Konsept mağazada 2.500 TL ve üzeri siparişler için ücretsiz kargo ve 14 gün kolay iade deneyimi öngörülmüştür.</p><p>Gerçek teslimat ve iade koşulları satış başlamadan önce marka tarafından belirlenecektir.</p>',
  'Beden rehberi': '<p>Örnek beden aralıkları: XS (34), S (36), M (38), L (40), XL (42).</p><p>Bu değerler tasarım amaçlıdır. Kesin ürün ölçüleri gerçek koleksiyonla birlikte eklenecektir.</p>',
  'İletişim': '<p>Rabüs şu anda bir konsept mağazadır. Müşteri hizmetleri e-posta adresi ve iletişim kanalları marka bilgileri tamamlandığında burada yer alacak.</p>',
  'Gizlilik': '<p>Sepetin ve favorilerin yalnızca bu tarayıcıda saklanır. Bülten formu e-posta adresini sunucuya göndermez veya kaydetmez.</p><p>Gerçek mağazanın gizlilik ve çerez metinleri, kullanılacak hizmetlere göre hazırlanacaktır.</p>'
};
document.addEventListener('click', event => {
  const product = event.target.closest('[data-product]');
  if (product) showProduct(Number(product.dataset.product));
  const favorite = event.target.closest('[data-favorite]');
  if (favorite) {
    const id = Number(favorite.dataset.favorite);
    const adding = !favorites.includes(id);
    favorites = adding ? [...favorites, id] : favorites.filter(value => value !== id);
    persist(); renderProducts();
    $(`[data-favorite="${id}"]`)?.focus();
    toast(adding ? 'Bu parça artık favorilerinde.' : 'Parça favorilerinden kaldırıldı.');
  }
  const category = event.target.closest('[data-filter], [data-nav]');
  if (category) selectFilter(category.dataset.filter || category.dataset.nav);
  if (event.target.closest('[data-close]')) closePanels();
  const size = event.target.closest('[data-size]');
  if (size) {
    selectedSize = size.dataset.size;
    $$('[data-size]').forEach(button => {
      const active = button.dataset.size === selectedSize;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  if (event.target.closest('#add-to-cart')) addCart();
  const quantity = event.target.closest('[data-quantity]');
  if (quantity) {
    const index = Number(quantity.dataset.quantity);
    if (!cart[index]) return;
    cart[index].qty = Math.min(99, cart[index].qty + Number(quantity.dataset.delta));
    cart = cart.filter(item => item.qty > 0);
    persist(); renderCart();
    $(`#cart [data-quantity="${index}"][data-delta="${quantity.dataset.delta}"]`)?.focus();
  }
  const remove = event.target.closest('[data-remove]');
  if (remove) { cart.splice(Number(remove.dataset.remove), 1); persist(); renderCart(); $('#cart [data-close]').focus(); }
  if (event.target.closest('#checkout')) showInfo('Seçkin hazır.', `<p>${cart.reduce((sum, item) => sum + item.qty, 0)} parça · ${money(cartTotal())}</p><p>Rabüs şu anda bir konsept mağaza. Henüz sipariş oluşturulmaz ve gerçek ödeme alınmaz.</p><button class="button primary full" data-close>Keşfetmeye devam et</button>`);
  const info = event.target.closest('[data-info]');
  if (info && information[info.dataset.info]) showInfo(info.dataset.info, information[info.dataset.info]);
  if (event.target.closest('#main-nav a') && !category) closeMenu();
});
$('#sort').addEventListener('change', renderProducts);
function resetCollection() { $('#sort').value = 'featured'; selectFilter('Tümü', true); }
$('#all-products').addEventListener('click', resetCollection);
$('#empty-reset').addEventListener('click', resetCollection);
$('#cart-open').addEventListener('click', () => {
  const previousFocus = document.activeElement;
  closePanels(false);
  returnFocus = previousFocus;
  renderCart();
  $('#cart').hidden = false;
  $('#overlay').hidden = false;
  document.body.style.overflow = 'hidden';
  setPageInert(true);
  $('#cart [data-close]').focus();
});
$('#overlay').addEventListener('click', () => closePanels());
$('#favorites-open').addEventListener('click', () => selectFilter('Favoriler', true));
$('#menu-open').addEventListener('click', () => {
  const expanded = $('#main-nav').classList.toggle('open');
  $('#menu-open').setAttribute('aria-expanded', String(expanded));
  $('#menu-open').setAttribute('aria-label', expanded ? 'Menüyü kapat' : 'Menüyü aç');
});
$('#search-open').addEventListener('click', () => {
  $('#search-input').value = '';
  renderSearch();
  openDialog('#search-dialog');
  $('#search-input').focus();
});
$('#search-input').addEventListener('input', renderSearch);
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.style.overflow = ''; });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closePanels(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePanels();
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePanels();
    closeMenu();
  }
  if (event.key !== 'Tab' || $('#cart').hidden) return;
  const focusable = [...$('#cart').querySelectorAll('button:not([disabled]), a[href], input, select, [tabindex="0"]')];
  const first = focusable[0], last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
$('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  $('#newsletter-message').textContent = 'İlgin için teşekkürler. Rabüs bülteni mağaza açıldığında aktif olacak; e-posta adresin kaydedilmedi.';
  event.target.reset();
});
persist(); renderProducts(); renderCart();
