(function () {
  'use strict';

  const WHATSAPP_NUMBER = '6281234567890';
  const STORAGE_KEY = 'warung_seduh_rasa_cart_v3';
  const DEFAULT_FALLBACK_PHOTO = 'https://images.pexels.com/photos/37179942/pexels-photo-37179942.jpeg?auto=compress&cs=tinysrgb&w=600';
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 15 Menu Lengkap dengan Exact URL Foto Asli Pexels
  const MENU_ITEMS = [
    // [Makanan Berat]
    {
      id: 'nasi-goreng-kampung-spesial',
      name: 'Nasi Goreng Kampung Spesial',
      category: 'Makanan Berat',
      price: 24000,
      image: 'https://images.pexels.com/photos/37171028/pexels-photo-37171028.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/34668495/pexels-photo-34668495.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Gurih & Smokey',
      spice: 'Sedang (bisa tanpa cabai)',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi Hangat + Telur & Acar',
      description: 'Nasi goreng bumbu ulek tradisional dengan aroma smokey menggugah selera, dilengkapi telur mata sapi, suwiran ayam, acar segar, dan kerupuk.'
    },
    {
      id: 'soto-ayam-kuah-kuning',
      name: 'Soto Ayam Kuah Kuning',
      category: 'Makanan Berat',
      price: 22000,
      image: 'https://images.pexels.com/photos/37081083/pexels-photo-37081083.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/37179942/pexels-photo-37179942.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Segar & Berempah',
      spice: 'Tidak Pedas (sambal terpisah)',
      caffeine: 'Bebas Kafein',
      serving: '1 Mangkuk Hangat + Sambal Pisah',
      description: 'Kuah kuning kaya rempah kunyit dan serai yang hangat serta ringan di perut. Cocok untuk keluarga hingga lansia dengan sambal dan jeruk nipis terpisah.'
    },
    {
      id: 'ayam-goreng-sambal-penyet',
      name: 'Ayam Goreng Sambal Penyet',
      category: 'Makanan Berat',
      price: 28000,
      image: 'https://images.pexels.com/photos/14272918/pexels-photo-14272918.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/37179942/pexels-photo-37179942.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Gurih Renyah',
      spice: 'Pedas Mantap',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi + Nasi & Lalapan',
      description: 'Ayam ungkep rempah digoreng keemasan hingga renyah di luar dan empuk di dalam, disajikan bersama sambal penyet segar dan lalapan.'
    },
    {
      id: 'mie-goreng-jawa-rumahan',
      name: 'Mie Goreng Jawa Rumahan',
      category: 'Makanan Berat',
      price: 23000,
      image: 'https://images.pexels.com/photos/13294535/pexels-photo-13294535.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/34668495/pexels-photo-34668495.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Manis Gurih',
      spice: 'Sedang',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi Hangat',
      description: 'Mie telur kenyal dimasak dengan bumbu kemiri, bawang putih, kecap manis pilihan, sawi hijau, kol segar, dan suwiran ayam gurih.'
    },
    {
      id: 'nasi-rendang-daging-empuk',
      name: 'Nasi Rendang Daging Empuk',
      category: 'Makanan Berat',
      price: 34000,
      image: 'https://images.pexels.com/photos/37090687/pexels-photo-37090687.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/37179942/pexels-photo-37179942.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Kaya Rempah & Gurih',
      spice: 'Sedang',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi + Nasi Putih & Sayur',
      description: 'Potongan daging sapi pilihan dimasak perlahan bersama santan dan rempah nusantara hingga empuk meresap sempurna.'
    },

    // [Camilan]
    {
      id: 'pisang-goreng-krispi',
      name: 'Pisang Goreng Krispi',
      category: 'Camilan',
      price: 15000,
      image: 'https://images.pexels.com/photos/35215468/pexels-photo-35215468.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/35215467/pexels-photo-35215467.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Manis & Renyah',
      spice: 'Tidak Pedas',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi (Isi 4 Potong Hangat)',
      description: 'Pisang kepok matang manis dibalut tepung renyah keemasan. Teman paling pas untuk menemani kopi atau teh sore Anda.'
    },
    {
      id: 'tahu-crispy-sambal-kecap',
      name: 'Tahu Crispy Sambal Kecap',
      category: 'Camilan',
      price: 14000,
      image: 'https://images.pexels.com/photos/33356138/pexels-photo-33356138.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/35215467/pexels-photo-35215467.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Gurih Renyah',
      spice: 'Pedas Ringan (kecap rawit terpisah)',
      caffeine: 'Bebas Kafein',
      serving: '1 Porsi Hangat + Kecap Rawit',
      description: 'Potongan tahu gurih digoreng garing renyah di luar namun lembut di dalam, lengkap dengan cocolan sambal kecap rawit terpisah.'
    },
    {
      id: 'roti-bakar-cokelat-kacang',
      name: 'Roti Bakar Cokelat Kacang',
      category: 'Camilan',
      price: 18000,
      image: 'https://images.pexels.com/photos/6966407/pexels-photo-6966407.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/35215467/pexels-photo-35215467.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Manis & Lumer',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Rendah (kakao)',
      serving: '1 Porsi (4 Potong Hangat)',
      description: 'Roti tebal panggang mentega harum dengan isian cokelat lumer dan taburan kacang sangrai renyah.'
    },

    // [Kopi & Teh]
    {
      id: 'kopi-tubruk-nusantara',
      name: 'Kopi Tubruk Nusantara',
      category: 'Kopi & Teh',
      price: 12000,
      image: 'https://images.pexels.com/photos/13926591/pexels-photo-13926591.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/29460192/pexels-photo-29460192.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Bold & Aromatik',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Tinggi',
      serving: '1 Gelas Panas (200 ml)',
      description: 'Seduhan kopi bubuk giling segar khas nusantara dengan aroma kuat dan karakter rasa tebal yang mantap.'
    },
    {
      id: 'es-kopi-susu-gula-aren',
      name: 'Es Kopi Susu Gula Aren',
      category: 'Kopi & Teh',
      price: 20000,
      image: 'https://images.pexels.com/photos/38845418/pexels-photo-38845418.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/2615326/pexels-photo-2615326.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Creamy & Manis Aren',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Sedang',
      serving: '1 Gelas Dingin (300 ml)',
      description: 'Perpaduan seimbang antara espresso kopi pilihan, susu creamy lembut, dan sirup gula aren asli.'
    },
    {
      id: 'es-teh-manis-segar',
      name: 'Es Teh Manis Segar',
      category: 'Kopi & Teh',
      price: 8000,
      image: 'https://images.pexels.com/photos/18263137/pexels-photo-18263137.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/38560523/pexels-photo-38560523.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Segar & Manis Pas',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Ringan',
      serving: '1 Gelas Dingin / Hangat',
      description: 'Seduhan daun teh wangi melati dengan tingkat kemanisan pas yang menyegarkan di segala suasana.'
    },

    // [Non-Kopi]
    {
      id: 'es-matcha-latte-creamy',
      name: 'Es Matcha Latte Creamy',
      category: 'Non-Kopi',
      price: 22000,
      image: 'https://images.pexels.com/photos/35470499/pexels-photo-35470499.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/33496468/pexels-photo-33496468.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Lembut & Earthy',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Ringan (teh hijau)',
      serving: '1 Gelas Dingin (300 ml)',
      description: 'Bubuk teh hijau matcha pilihan dikocok lembut bersama susu segar menghasilkan rasa earthy dan creamy yang nikmat.'
    },
    {
      id: 'cokelat-hangat-klasik',
      name: 'Cokelat Hangat Klasik',
      category: 'Non-Kopi',
      price: 19000,
      image: 'https://images.pexels.com/photos/9622378/pexels-photo-9622378.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/10407042/pexels-photo-10407042.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Pekat & Lembut',
      spice: 'Tidak Pedas',
      caffeine: 'Kafein Rendah',
      serving: '1 Cangkir Hangat (240 ml)',
      description: 'Minuman cokelat pekat dari kakao berkualitas dipadukan susu hangat yang menenangkan. Favorit pelajar dan keluarga.'
    },
    {
      id: 'wedang-jahe-madu-hangat',
      name: 'Wedang Jahe Madu Hangat',
      category: 'Non-Kopi',
      price: 15000,
      image: 'https://images.pexels.com/photos/34928357/pexels-photo-34928357.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/12898305/pexels-photo-12898305.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Hangat & Menenangkan',
      spice: 'Hangat Jahe',
      caffeine: 'Bebas Kafein',
      serving: '1 Gelas Panas (240 ml)',
      description: 'Seduhan jahe bakar segar dipadukan madu murni. Bebas kafein, sangat baik untuk menghangatkan tubuh dan melegakan tenggorokan.'
    },
    {
      id: 'es-jeruk-peras-murni',
      name: 'Es Jeruk Peras Murni',
      category: 'Non-Kopi',
      price: 13000,
      image: 'https://images.pexels.com/photos/38956011/pexels-photo-38956011.jpeg?auto=compress&cs=tinysrgb&w=600',
      fallback: 'https://images.pexels.com/photos/38560523/pexels-photo-38560523.jpeg?auto=compress&cs=tinysrgb&w=600',
      taste: 'Asam Manis Segar',
      spice: 'Tidak Pedas',
      caffeine: 'Bebas Kafein',
      serving: '1 Gelas Dingin / Hangat',
      description: 'Perasan jeruk manis segar 100% tanpa pemanis buatan, kaya vitamin C dan sangat menyegarkan.'
    }
  ];

  const CATEGORIES = ['Semua', 'Makanan Berat', 'Camilan', 'Kopi & Teh', 'Non-Kopi'];

  let state = {
    activeCategory: 'Semua',
    searchQuery: '',
    cart: [],
    orderMethod: 'Ambil di Tempat'
  };

  // Referensi Elemen DOM
  const elScrollProgress = document.getElementById('scroll-progress');
  const elHeader = document.getElementById('main-header');
  const elNavbarInner = document.getElementById('navbar-inner');
  const elBtnMobileMenu = document.getElementById('btn-mobile-menu');
  const elMobileNavPanel = document.getElementById('mobile-nav-panel');
  const elHeroParallaxCard = document.getElementById('hero-parallax-card');
  const elHeroBannerImg = document.getElementById('hero-banner-img');

  const elMenuGrid = document.getElementById('menu-grid');
  const elCategoryFilters = document.getElementById('category-filters');
  const elSearchInput = document.getElementById('search-input');
  const elBtnClearSearch = document.getElementById('btn-clear-search');
  const elMenuCountBadge = document.getElementById('menu-count-badge');
  const elEmptySearch = document.getElementById('empty-search-state');
  const elBtnResetFilter = document.getElementById('btn-reset-filter');

  const elCartBadge = document.getElementById('cart-badge');
  const elFloatingCartBar = document.getElementById('floating-cart-bar');
  const elBtnFloatingCart = document.getElementById('btn-floating-cart');
  const elFloatingCartCount = document.getElementById('floating-cart-count');
  const elFloatingCartTotal = document.getElementById('floating-cart-total');
  const elBtnBackToTop = document.getElementById('btn-back-to-top');

  const elCartDrawer = document.getElementById('cart-drawer');
  const elBtnOpenCart = document.getElementById('btn-open-cart');
  const elBtnCloseCart = document.getElementById('btn-close-cart');
  const elCartSubtitle = document.getElementById('cart-subtitle');
  const elCartItemsContainer = document.getElementById('cart-items-container');
  const elCartEmptyState = document.getElementById('cart-empty-state');
  const elBtnBrowseFromCart = document.getElementById('btn-browse-from-cart');
  const elCheckoutForm = document.getElementById('checkout-form');
  const elCartFooter = document.getElementById('cart-footer');
  const elCartTotal = document.getElementById('cart-total');

  const elMethodPickup = document.getElementById('method-pickup');
  const elMethodDelivery = document.getElementById('method-delivery');
  const elAddressWrapper = document.getElementById('address-field-wrapper');
  const elCustomerName = document.getElementById('customer-name');
  const elCustomerAddress = document.getElementById('customer-address');
  const elCustomerNotes = document.getElementById('customer-notes');
  const elErrorName = document.getElementById('error-name');
  const elErrorAddress = document.getElementById('error-address');

  const elBtnCheckoutWa = document.getElementById('btn-checkout-wa');
  const elBtnCopyRecap = document.getElementById('btn-copy-recap');
  const elBtnClearCart = document.getElementById('btn-clear-cart');

  const elDetailModal = document.getElementById('detail-modal');
  const elDetailTitle = document.getElementById('detail-modal-title');
  const elDetailBody = document.getElementById('detail-modal-body');
  const elBtnCloseDetail = document.getElementById('btn-close-detail');

  const elConfirmModal = document.getElementById('confirm-modal');
  const elBtnCancelClear = document.getElementById('btn-cancel-clear');
  const elBtnConfirmClear = document.getElementById('btn-confirm-clear');

  const elToastContainer = document.getElementById('toast-container');

  // ==================== UTILITAS AMAN (ANTI-XSS) ====================
  function formatRupiah(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
  }

  function clearChildren(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function sanitizeText(str) {
    return String(str || '').replace(/[\u0000-\u001F\u007F<>]/g, '').trim();
  }

  function showToast(message, isError) {
    const toast = document.createElement('div');
    toast.className = 'animate-toast px-5 py-3.5 rounded-2xl shadow-xl font-bold text-sm sm:text-base text-center border ' +
      (isError ? 'bg-red-600 text-white border-red-700' : 'bg-coffee text-white border-warm');
    toast.textContent = message;
    elToastContainer.appendChild(toast);

    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 2600);
  }

  // Handler onerror aman ke URL cadangan Pexels terverifikasi (BUKAN teks placeholder)
  function attachPexelsFallback(imgEl, fallbackUrl) {
    const targetFallback = fallbackUrl || DEFAULT_FALLBACK_PHOTO;
    imgEl.addEventListener('error', function () {
      if (imgEl.dataset.fallbackApplied === '1') return;
      imgEl.dataset.fallbackApplied = '1';
      imgEl.src = targetFallback;
    });
  }

  if (elHeroBannerImg) {
    attachPexelsFallback(elHeroBannerImg, 'https://images.pexels.com/photos/37171028/pexels-photo-37171028.jpeg?auto=compress&cs=tinysrgb&w=1200');
  }

  // ==================== LOCALSTORAGE ====================
  function loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        state.cart = parsed.filter(function (item) {
          return item &&
            typeof item.id === 'string' &&
            typeof item.name === 'string' &&
            typeof item.price === 'number' &&
            typeof item.qty === 'number' &&
            item.qty > 0;
        });
      }
    } catch (err) {
      state.cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch (err) {
      // Abaikan jika storage penuh / mode privat
    }
  }

  // ==================== ANIMASI SCROLL ====================
  let revealObserver = null;

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    targets.forEach(function (el) { revealObserver.observe(el); });
  }

  // Animated Counter (mendukung desimal 4.9)
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-num');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (c) {
        c.textContent = c.getAttribute('data-target') || '0';
      });
      return;
    }

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 900;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = decimals > 0 ? target.toFixed(decimals) : String(target);
          }
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.3 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  // Scroll Handler (Progress Bar, Navbar, Parallax Hero, Back-to-Top)
  let scrollTicking = false;
  function updateOnScroll() {
    scrollTicking = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    // 1. Scroll Progress Bar
    elScrollProgress.style.width = percent + '%';
    elScrollProgress.setAttribute('aria-valuenow', String(Math.round(percent)));

    // 2. Sticky Navbar Adaptif
    if (scrollY > 24) {
      elHeader.classList.add('scrolled');
      elNavbarInner.classList.remove('py-3.5');
      elNavbarInner.classList.add('py-2.5');
    } else {
      elHeader.classList.remove('scrolled');
      elNavbarInner.classList.add('py-3.5');
      elNavbarInner.classList.remove('py-2.5');
    }

    // 3. Hero Parallax Halus
    if (!prefersReducedMotion && elHeroParallaxCard && scrollY < 650) {
      elHeroParallaxCard.style.transform = 'translate3d(0, ' + (scrollY * 0.05).toFixed(1) + 'px, 0)';
    }

    // 4. Back to Top (> 400px)
    if (scrollY > 400) {
      elBtnBackToTop.classList.remove('floating-hidden');
      elBtnBackToTop.classList.add('floating-visible');
    } else {
      elBtnBackToTop.classList.add('floating-hidden');
      elBtnBackToTop.classList.remove('floating-visible');
    }
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateOnScroll);
    }
  }, { passive: true });

  // ==================== RENDER FILTER KATEGORI ====================
  function countByCategory(cat) {
    if (cat === 'Semua') return MENU_ITEMS.length;
    return MENU_ITEMS.filter(function (m) { return m.category === cat; }).length;
  }

  function renderCategories() {
    clearChildren(elCategoryFilters);
    CATEGORIES.forEach(function (cat) {
      const isActive = state.activeCategory === cat;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.className = 'btn-touch px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm sm:text-base border-2 ' +
        (isActive
          ? 'bg-coffee text-white border-coffee shadow-sm'
          : 'bg-white text-coffee border-warm hover:border-coffee');

      const labelSpan = document.createElement('span');
      labelSpan.textContent = cat;

      const countSpan = document.createElement('span');
      countSpan.className = 'ml-2 px-2 py-0.5 rounded-full text-xs font-extrabold ' +
        (isActive ? 'bg-white text-coffee' : 'bg-warm-surface text-coffee');
      countSpan.textContent = String(countByCategory(cat));

      btn.appendChild(labelSpan);
      btn.appendChild(countSpan);

      btn.addEventListener('click', function () {
        state.activeCategory = cat;
        renderCategories();
        renderMenuGrid(true);
      });
      elCategoryFilters.appendChild(btn);
    });
  }

  // ==================== RENDER GRID 15 MENU ====================
  function getCartQtyForMenu(menuId) {
    const found = state.cart.find(function (c) { return c.id === menuId; });
    return found ? found.qty : 0;
  }

  function createTag(text, colorClass) {
    const span = document.createElement('span');
    span.className = 'inline-block px-2.5 py-1 rounded-xl text-xs font-bold ' + colorClass;
    span.textContent = text;
    return span;
  }

  function renderMenuGrid(immediateVisible) {
    const query = state.searchQuery.trim().toLowerCase();
    const filtered = MENU_ITEMS.filter(function (item) {
      const matchCat = state.activeCategory === 'Semua' || item.category === state.activeCategory;
      const matchQuery = !query ||
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.taste.toLowerCase().indexOf(query) !== -1 ||
        item.spice.toLowerCase().indexOf(query) !== -1 ||
        item.caffeine.toLowerCase().indexOf(query) !== -1 ||
        item.description.toLowerCase().indexOf(query) !== -1 ||
        item.category.toLowerCase().indexOf(query) !== -1;
      return matchCat && matchQuery;
    });

    clearChildren(elMenuGrid);
    elMenuCountBadge.textContent = 'Menampilkan ' + filtered.length + ' menu' +
      (state.activeCategory !== 'Semua' ? ' • ' + state.activeCategory : '');

    if (filtered.length === 0) {
      elEmptySearch.classList.remove('hidden');
      return;
    }
    elEmptySearch.classList.add('hidden');

    filtered.forEach(function (item, index) {
      const card = document.createElement('article');
      // Kartu yang dirender ulang saat filter/pencarian LANGSUNG terlihat (is-visible)
      card.className = 'menu-card bg-white rounded-2xl border-2 border-warm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow ' +
        (immediateVisible || prefersReducedMotion ? 'reveal is-visible' : 'reveal');

      // Foto Asli Pexels (aspect-ratio 4:3, opacity: 1, latar #EFE7DA)
      const photoWrap = document.createElement('div');
      photoWrap.className = 'relative aspect-[4/3] bg-img-base overflow-hidden';

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.setAttribute('referrerpolicy', 'no-referrer');
      img.setAttribute('decoding', 'async');
      // Jangan gunakan loading="lazy" pada 6 kartu pertama agar foto langsung tampil seketika
      if (index >= 6) {
        img.setAttribute('loading', 'lazy');
      }
      img.className = 'food-img w-full h-full object-cover';
      attachPexelsFallback(img, item.fallback);
      photoWrap.appendChild(img);

      // Badge Kategori
      const catBadge = document.createElement('span');
      catBadge.className = 'absolute top-3 left-3 px-3 py-1 rounded-full bg-white bg-opacity-95 text-coffee text-xs font-extrabold shadow-sm';
      catBadge.textContent = item.category;
      photoWrap.appendChild(catBadge);

      card.appendChild(photoWrap);

      // Konten Kartu
      const body = document.createElement('div');
      body.className = 'p-5 flex-1 flex flex-col justify-between';

      const topInfo = document.createElement('div');

      const titleRow = document.createElement('div');
      titleRow.className = 'flex items-start justify-between gap-2';

      const title = document.createElement('h3');
      title.className = 'font-serif-title text-lg font-bold text-coffee leading-snug';
      title.textContent = item.name;

      const price = document.createElement('span');
      price.className = 'text-lg font-extrabold text-coffee whitespace-nowrap';
      price.textContent = formatRupiah(item.price);

      titleRow.appendChild(title);
      titleRow.appendChild(price);
      topInfo.appendChild(titleRow);

      const desc = document.createElement('p');
      desc.className = 'text-sm sm:text-base text-muted-warm mt-2 leading-relaxed line-clamp-2';
      desc.textContent = item.description;
      topInfo.appendChild(desc);

      // Badge Rasa, Pedas, & Kafein
      const tagsWrap = document.createElement('div');
      tagsWrap.className = 'flex flex-wrap gap-1.5 mt-3.5';
      tagsWrap.appendChild(createTag(item.taste, 'bg-warm-surface text-coffee'));

      if (item.category === 'Makanan Berat' || item.category === 'Camilan') {
        const isSpicy = item.spice.toLowerCase().indexOf('pedas mantap') !== -1;
        const isMed = item.spice.toLowerCase().indexOf('sedang') !== -1;
        tagsWrap.appendChild(createTag(
          item.spice,
          isSpicy ? 'bg-red-100 text-red-900' : (isMed ? 'bg-yellow-100 text-yellow-900' : 'bg-green-100 text-green-900')
        ));
      } else {
        const isNoCaf = item.caffeine === 'Bebas Kafein';
        tagsWrap.appendChild(createTag(
          item.caffeine,
          isNoCaf ? 'bg-green-100 text-green-900' : 'bg-warm-surface text-warm-accent'
        ));
      }
      topInfo.appendChild(tagsWrap);
      body.appendChild(topInfo);

      // Tombol Aksi
      const actions = document.createElement('div');
      actions.className = 'flex items-center gap-2.5 mt-5 pt-4 border-t border-warm';

      const btnDetail = document.createElement('button');
      btnDetail.type = 'button';
      btnDetail.className = 'btn-touch px-4 py-2 rounded-2xl bg-warm-surface text-coffee font-bold text-sm sm:text-base hover:bg-gray-200';
      btnDetail.textContent = 'Detail';
      btnDetail.addEventListener('click', function () {
        openDetailModal(item);
      });
      actions.appendChild(btnDetail);

      const qty = getCartQtyForMenu(item.id);
      if (qty === 0) {
        const btnAdd = document.createElement('button');
        btnAdd.type = 'button';
        btnAdd.className = 'btn-touch flex-1 px-4 py-2 rounded-2xl bg-coffee text-white font-bold text-sm sm:text-base shadow-sm';
        btnAdd.textContent = '+ Tambah';
        btnAdd.addEventListener('click', function () {
          addToCart(item);
        });
        actions.appendChild(btnAdd);
      } else {
        const qtyWrap = document.createElement('div');
        qtyWrap.className = 'flex-1 flex items-center justify-between bg-warm-surface rounded-2xl p-1 border-2 border-coffee';

        const btnMin = document.createElement('button');
        btnMin.type = 'button';
        btnMin.className = 'btn-touch rounded-xl bg-white text-coffee font-extrabold text-xl border border-warm';
        btnMin.setAttribute('aria-label', 'Kurangi ' + item.name);
        btnMin.textContent = '−';
        btnMin.addEventListener('click', function () {
          updateCartQty(item.id, -1);
        });

        const qtySpan = document.createElement('span');
        qtySpan.className = 'font-extrabold text-base text-coffee px-2';
        qtySpan.textContent = String(qty);

        const btnPlus = document.createElement('button');
        btnPlus.type = 'button';
        btnPlus.className = 'btn-touch rounded-xl bg-coffee text-white font-extrabold text-xl';
        btnPlus.setAttribute('aria-label', 'Tambah ' + item.name);
        btnPlus.textContent = '+';
        btnPlus.addEventListener('click', function () {
          updateCartQty(item.id, 1);
        });

        qtyWrap.appendChild(btnMin);
        qtyWrap.appendChild(qtySpan);
        qtyWrap.appendChild(btnPlus);
        actions.appendChild(qtyWrap);
      }

      body.appendChild(actions);
      card.appendChild(body);
      elMenuGrid.appendChild(card);

      if (!immediateVisible && revealObserver && !prefersReducedMotion) {
        revealObserver.observe(card);
      }
    });
  }

  // ==================== MODAL DETAIL MENU ====================
  function openDetailModal(item) {
    elDetailTitle.textContent = item.name;
    clearChildren(elDetailBody);

    const imgBox = document.createElement('div');
    imgBox.className = 'rounded-2xl overflow-hidden aspect-[4/3] bg-img-base border border-warm';
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.setAttribute('decoding', 'async');
    img.className = 'food-img w-full h-full object-cover';
    attachPexelsFallback(img, item.fallback);
    imgBox.appendChild(img);
    elDetailBody.appendChild(imgBox);

    const priceRow = document.createElement('div');
    priceRow.className = 'flex items-center justify-between';
    const catBadge = document.createElement('span');
    catBadge.className = 'px-3.5 py-1 rounded-full bg-warm-surface text-coffee font-bold text-sm';
    catBadge.textContent = item.category;
    const priceEl = document.createElement('span');
    priceEl.className = 'text-2xl font-extrabold text-coffee';
    priceEl.textContent = formatRupiah(item.price);
    priceRow.appendChild(catBadge);
    priceRow.appendChild(priceEl);
    elDetailBody.appendChild(priceRow);

    const descP = document.createElement('p');
    descP.className = 'text-base text-muted-warm leading-relaxed';
    descP.textContent = item.description;
    elDetailBody.appendChild(descP);

    const infoGrid = document.createElement('div');
    infoGrid.className = 'grid grid-cols-2 gap-3 bg-warm-surface p-4 rounded-2xl border border-warm';
    const specs = [
      { label: 'Profil Rasa', value: item.taste },
      { label: 'Tingkat Pedas', value: item.spice },
      { label: 'Kandungan Kafein', value: item.caffeine },
      { label: 'Porsi / Penyajian', value: item.serving }
    ];
    specs.forEach(function (s) {
      const box = document.createElement('div');
      const lbl = document.createElement('span');
      lbl.className = 'block text-xs font-semibold text-muted-warm';
      lbl.textContent = s.label;
      const val = document.createElement('span');
      val.className = 'block text-sm font-extrabold text-coffee mt-0.5';
      val.textContent = s.value;
      box.appendChild(lbl);
      box.appendChild(val);
      infoGrid.appendChild(box);
    });
    elDetailBody.appendChild(infoGrid);

    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.className = 'btn-touch w-full py-3.5 rounded-2xl bg-coffee text-white font-bold text-base shadow-md mt-2';
    btnAdd.textContent = '+ Tambah ke Keranjang • ' + formatRupiah(item.price);
    btnAdd.addEventListener('click', function () {
      addToCart(item);
      closeDetailModal();
    });
    elDetailBody.appendChild(btnAdd);

    elDetailModal.classList.remove('hidden');
    elDetailModal.classList.add('flex');
  }

  function closeDetailModal() {
    elDetailModal.classList.add('hidden');
    elDetailModal.classList.remove('flex');
  }

  // ==================== LOGIKA KERANJANG ====================
  function addToCart(item) {
    const existing = state.cart.find(function (c) { return c.id === item.id; });
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        fallback: item.fallback,
        qty: 1
      });
    }
    saveCartToStorage();
    updateCartUI();
    renderMenuGrid(true);
    showToast(item.name + ' ditambahkan ke keranjang');
  }

  function updateCartQty(id, delta) {
    const idx = state.cart.findIndex(function (c) { return c.id === id; });
    if (idx === -1) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    saveCartToStorage();
    updateCartUI();
    renderMenuGrid(true);
  }

  function removeCartItem(id) {
    state.cart = state.cart.filter(function (c) { return c.id !== id; });
    saveCartToStorage();
    updateCartUI();
    renderMenuGrid(true);
    showToast('Item dihapus dari keranjang');
  }

  function getCartCount() {
    return state.cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function getCartTotal() {
    return state.cart.reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);
  }

  function updateCartUI() {
    const totalItems = getCartCount();
    const totalPrice = getCartTotal();

    elCartBadge.textContent = String(totalItems);
    elFloatingCartCount.textContent = String(totalItems);
    elFloatingCartTotal.textContent = formatRupiah(totalPrice);
    elCartSubtitle.textContent = totalItems + ' item dipilih';
    elCartTotal.textContent = formatRupiah(totalPrice);

    // Floating Cart Bar tampil otomatis saat keranjang berisi >= 1 item
    if (totalItems > 0) {
      elFloatingCartBar.classList.remove('floating-hidden');
      elFloatingCartBar.classList.add('floating-visible');
    } else {
      elFloatingCartBar.classList.add('floating-hidden');
      elFloatingCartBar.classList.remove('floating-visible');
    }

    clearChildren(elCartItemsContainer);

    if (state.cart.length === 0) {
      elCartEmptyState.classList.remove('hidden');
      elCheckoutForm.classList.add('hidden');
      elCartFooter.classList.add('hidden');
      return;
    }

    elCartEmptyState.classList.add('hidden');
    elCheckoutForm.classList.remove('hidden');
    elCartFooter.classList.remove('hidden');

    state.cart.forEach(function (item) {
      const menuRef = MENU_ITEMS.find(function (m) { return m.id === item.id; });
      const thumbSrc = item.image || (menuRef ? menuRef.image : DEFAULT_FALLBACK_PHOTO);
      const thumbFallback = item.fallback || (menuRef ? menuRef.fallback : DEFAULT_FALLBACK_PHOTO);

      const row = document.createElement('div');
      row.className = 'p-3.5 rounded-2xl bg-warm-surface border border-warm flex flex-col gap-3';

      const top = document.createElement('div');
      top.className = 'flex items-start gap-3';

      // Thumbnail Foto Asli di Keranjang
      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'w-16 h-16 rounded-xl overflow-hidden bg-img-base border border-warm flex-shrink-0';
      const thumbImg = document.createElement('img');
      thumbImg.src = thumbSrc;
      thumbImg.alt = item.name;
      thumbImg.setAttribute('referrerpolicy', 'no-referrer');
      thumbImg.setAttribute('decoding', 'async');
      thumbImg.className = 'food-img w-full h-full object-cover';
      attachPexelsFallback(thumbImg, thumbFallback);
      thumbWrap.appendChild(thumbImg);

      const info = document.createElement('div');
      info.className = 'flex-1 min-w-0';
      const nameEl = document.createElement('h4');
      nameEl.className = 'font-bold text-base text-coffee leading-snug';
      nameEl.textContent = item.name;

      const priceEl = document.createElement('p');
      priceEl.className = 'text-sm font-semibold text-muted-warm mt-0.5';
      priceEl.textContent = formatRupiah(item.price) + ' × ' + item.qty + ' = ' + formatRupiah(item.price * item.qty);

      info.appendChild(nameEl);
      info.appendChild(priceEl);

      const btnDel = document.createElement('button');
      btnDel.type = 'button';
      btnDel.className = 'btn-touch px-2.5 rounded-xl text-red-700 hover:bg-red-100 text-sm font-bold flex-shrink-0';
      btnDel.setAttribute('aria-label', 'Hapus ' + item.name);
      btnDel.textContent = 'Hapus';
      btnDel.addEventListener('click', function () {
        removeCartItem(item.id);
      });

      top.appendChild(thumbWrap);
      top.appendChild(info);
      top.appendChild(btnDel);
      row.appendChild(top);

      const controls = document.createElement('div');
      controls.className = 'flex items-center space-x-3';

      const btnMin = document.createElement('button');
      btnMin.type = 'button';
      btnMin.className = 'btn-touch rounded-xl bg-white border border-warm text-coffee font-extrabold text-xl';
      btnMin.setAttribute('aria-label', 'Kurangi jumlah ' + item.name);
      btnMin.textContent = '−';
      btnMin.addEventListener('click', function () {
        updateCartQty(item.id, -1);
      });

      const qtyLabel = document.createElement('span');
      qtyLabel.className = 'font-extrabold text-base text-coffee w-8 text-center';
      qtyLabel.textContent = String(item.qty);

      const btnAdd = document.createElement('button');
      btnAdd.type = 'button';
      btnAdd.className = 'btn-touch rounded-xl bg-coffee text-white font-extrabold text-xl';
      btnAdd.setAttribute('aria-label', 'Tambah jumlah ' + item.name);
      btnAdd.textContent = '+';
      btnAdd.addEventListener('click', function () {
        updateCartQty(item.id, 1);
      });

      controls.appendChild(btnMin);
      controls.appendChild(qtyLabel);
      controls.appendChild(btnAdd);
      row.appendChild(controls);

      elCartItemsContainer.appendChild(row);
    });
  }

  // ==================== METODE PEMESANAN & VALIDASI ====================
  function updateOrderMethodUI() {
    const isPickup = state.orderMethod === 'Ambil di Tempat';
    elMethodPickup.className = 'btn-touch rounded-2xl border-2 font-bold text-sm sm:text-base px-3 py-2.5 ' +
      (isPickup ? 'bg-coffee text-white border-coffee' : 'bg-white text-coffee border-warm');
    elMethodDelivery.className = 'btn-touch rounded-2xl border-2 font-bold text-sm sm:text-base px-3 py-2.5 ' +
      (!isPickup ? 'bg-coffee text-white border-coffee' : 'bg-white text-coffee border-warm');

    if (isPickup) {
      elAddressWrapper.classList.add('hidden');
      elErrorAddress.classList.add('hidden');
    } else {
      elAddressWrapper.classList.remove('hidden');
    }
  }

  function validateCheckoutForm() {
    let valid = true;
    const nameVal = sanitizeText(elCustomerName.value);
    const addrVal = sanitizeText(elCustomerAddress.value);

    elErrorName.classList.add('hidden');
    elErrorAddress.classList.add('hidden');

    if (nameVal.length < 2) {
      elErrorName.textContent = 'Mohon isi nama pemesan minimal 2 huruf.';
      elErrorName.classList.remove('hidden');
      valid = false;
    }
    if (state.orderMethod === 'Pesan Antar' && addrVal.length < 8) {
      elErrorAddress.textContent = 'Mohon lengkapi alamat pengantaran dengan jelas.';
      elErrorAddress.classList.remove('hidden');
      valid = false;
    }
    if (!valid) {
      showToast('Mohon lengkapi data pemesanan yang ditandai merah.', true);
    }
    return valid;
  }

  function buildOrderRecapText() {
    const nameVal = sanitizeText(elCustomerName.value) || '-';
    const addrVal = sanitizeText(elCustomerAddress.value);
    const notesVal = sanitizeText(elCustomerNotes.value);

    const lines = [
      'Halo *Warung Seduh Rasa*, saya ingin memesan:',
      '',
      '*Daftar Pesanan:*'
    ];
    state.cart.forEach(function (item, idx) {
      lines.push((idx + 1) + '. ' + item.name + ' x' + item.qty + ' = ' + formatRupiah(item.price * item.qty));
    });
    lines.push('');
    lines.push('*Total Bayar:* ' + formatRupiah(getCartTotal()));
    lines.push('*Metode:* ' + state.orderMethod);
    lines.push('*Nama Pemesan:* ' + nameVal);
    if (state.orderMethod === 'Pesan Antar' && addrVal) {
      lines.push('*Alamat Antar:* ' + addrVal);
    }
    if (notesVal) {
      lines.push('*Catatan:* ' + notesVal);
    }
    lines.push('');
    lines.push('Terima kasih!');
    return lines.join('\n');
  }

  function copyTextToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      success = false;
    }
    document.body.removeChild(textarea);
    return success;
  }

  // ==================== EVENT LISTENERS ====================
  elBtnMobileMenu.addEventListener('click', function () {
    const isHidden = elMobileNavPanel.classList.contains('hidden');
    elMobileNavPanel.classList.toggle('hidden');
    elBtnMobileMenu.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  });
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      elMobileNavPanel.classList.add('hidden');
      elBtnMobileMenu.setAttribute('aria-expanded', 'false');
    });
  });

  elSearchInput.addEventListener('input', function (e) {
    state.searchQuery = e.target.value;
    if (state.searchQuery.trim().length > 0) {
      elBtnClearSearch.classList.remove('hidden');
      elBtnClearSearch.classList.add('flex');
    } else {
      elBtnClearSearch.classList.add('hidden');
      elBtnClearSearch.classList.remove('flex');
    }
    renderMenuGrid(true);
  });

  elBtnClearSearch.addEventListener('click', function () {
    state.searchQuery = '';
    elSearchInput.value = '';
    elBtnClearSearch.classList.add('hidden');
    elBtnClearSearch.classList.remove('flex');
    renderMenuGrid(true);
    elSearchInput.focus();
  });

  elBtnResetFilter.addEventListener('click', function () {
    state.activeCategory = 'Semua';
    state.searchQuery = '';
    elSearchInput.value = '';
    elBtnClearSearch.classList.add('hidden');
    elBtnClearSearch.classList.remove('flex');
    renderCategories();
    renderMenuGrid(true);
  });

  function openCartDrawer() {
    elCartDrawer.classList.remove('hidden');
    elCartDrawer.classList.add('flex');
  }
  function closeCartDrawer() {
    elCartDrawer.classList.add('hidden');
    elCartDrawer.classList.remove('flex');
  }

  elBtnOpenCart.addEventListener('click', openCartDrawer);
  elBtnFloatingCart.addEventListener('click', openCartDrawer);
  elBtnCloseCart.addEventListener('click', closeCartDrawer);
  elBtnBrowseFromCart.addEventListener('click', function () {
    closeCartDrawer();
    document.getElementById('menu').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  elCartDrawer.addEventListener('click', function (e) {
    if (e.target === elCartDrawer) closeCartDrawer();
  });

  elBtnCloseDetail.addEventListener('click', closeDetailModal);
  elDetailModal.addEventListener('click', function (e) {
    if (e.target === elDetailModal) closeDetailModal();
  });

  elBtnBackToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  elMethodPickup.addEventListener('click', function () {
    state.orderMethod = 'Ambil di Tempat';
    updateOrderMethodUI();
  });
  elMethodDelivery.addEventListener('click', function () {
    state.orderMethod = 'Pesan Antar';
    updateOrderMethodUI();
  });

  elBtnCheckoutWa.addEventListener('click', function () {
    if (state.cart.length === 0) return;
    if (!validateCheckoutForm()) return;
    const recap = buildOrderRecapText();
    const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(recap);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Membuka WhatsApp dengan rekap pesanan Anda...');
  });

  elBtnCopyRecap.addEventListener('click', function () {
    if (state.cart.length === 0) return;
    const copied = copyTextToClipboard(buildOrderRecapText());
    showToast(copied ? 'Rekap pesanan berhasil disalin!' : 'Gagal menyalin otomatis.', !copied);
  });

  document.getElementById('btn-copy-address').addEventListener('click', function () {
    const addr = document.getElementById('store-address-text').textContent;
    const copied = copyTextToClipboard(addr);
    showToast(copied ? 'Alamat warung berhasil disalin!' : 'Gagal menyalin alamat.', !copied);
  });

  document.getElementById('btn-copy-wa').addEventListener('click', function () {
    const wa = document.getElementById('store-wa-text').textContent;
    const copied = copyTextToClipboard(wa);
    showToast(copied ? 'Nomor WhatsApp berhasil disalin!' : 'Gagal menyalin nomor.', !copied);
  });

  elBtnClearCart.addEventListener('click', function () {
    elConfirmModal.classList.remove('hidden');
    elConfirmModal.classList.add('flex');
  });
  elBtnCancelClear.addEventListener('click', function () {
    elConfirmModal.classList.add('hidden');
    elConfirmModal.classList.remove('flex');
  });
  elBtnConfirmClear.addEventListener('click', function () {
    state.cart = [];
    saveCartToStorage();
    updateCartUI();
    renderMenuGrid(true);
    elConfirmModal.classList.add('hidden');
    elConfirmModal.classList.remove('flex');
    showToast('Keranjang berhasil dikosongkan.');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCartDrawer();
      elConfirmModal.classList.add('hidden');
      elConfirmModal.classList.remove('flex');
    }
  });

  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Inisialisasi
  loadCartFromStorage();
  initScrollReveal();
  renderCategories();
  renderMenuGrid(false);
  updateOrderMethodUI();
  updateCartUI();
  initAnimatedCounters();
  updateOnScroll();
})();
