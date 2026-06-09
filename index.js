// ── LUXURY SNEAKER PLATFORM ENGINE (10KICKS) ─────────────────────────

// Initialize database with premium expanded selections
const DB = {
  nike: [
    {
      id: 'nk1',
      name: 'AIR JORDAN 1 LOW Black Toe',
      price: 8995,
      back: 'nike',
      img: 'https://images.footlocker.com/is/image/EBFL2/CZ0790106_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/CZ0790106_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Sleek, low-cut, and built for daily expression. The Air Jordan 1 Low packs iconic court heritage with lightweight materials for modern street style.',
      materials: 'Premium grain leather, custom rubber cupsole, encapsulated Air-Sole unit.',
      styleNotes: 'Style with wide-leg relaxed denim and a vintage boxy tee.'
    },
    {
      id: 'nk2',
      name: 'AIR JORDAN 1 RETRO HIGH OG Chicago',
      price: 16995,
      back: 'nike',
      img: 'https://images.footlocker.com/is/image/EBFL2/DZ5485612_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/DZ5485612_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The blueprint of sneaker culture. Premium distressed leather paneling, Wings brand detail, and the legendary Chicago colorway in a limited retro release.',
      materials: 'Full grain tumble leather upper, woven tongue tags, rubber outsole.',
      styleNotes: 'Tuck into tailored utility trousers, accented with an overcoat.'
    },
    {
      id: 'nk3',
      name: 'AIR JORDAN 1 RETRO HIGH Patent Bred',
      price: 15495,
      back: 'nike',
      img: 'https://images.footlocker.com/is/image/EBFL2/555088063_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/555088063_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Sitting perfectly at the intersection of high fashion and street performance. Classic Bred color blocking with a glossy, premium patent leather shine.',
      materials: 'Patent leather panels, nylon tongue details, solid rubber cupsole.',
      styleNotes: 'Best styled with raw selvedge denim and a clean neutral hoodie.'
    },
    {
      id: 'nk4',
      name: 'NIKE AIR FORCE 1 \'07 Triple White',
      price: 8295,
      back: 'nike',
      img: 'https://images.footlocker.com/is/image/EBFL2/CW2288111_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/CW2288111_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The defining street aesthetic. Clean, crisp white leather that matches every outfit, with a durable rubber sole for all-day comfort.',
      materials: 'Full grain leather upper, foam midsole with encapsulated Air unit.',
      styleNotes: 'Style with white crew socks, clean athletic shorts, and a relaxed-fit knit sweater.'
    }
  ],
  adidas: [
    {
      id: 'ad1',
      name: 'ADIDAS SAMBA OG White Black',
      price: 10999,
      back: 'adidas',
      img: 'https://images.footlocker.com/is/image/EBFL2/B75806_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/B75806_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The terrace culture superstar. A football trainer born in 1950, reborn as a modern design staple. Features a low-profile gum sole and signature serrated three-stripes.',
      materials: 'Supple leather upper, suede T-toe overlay, premium gum rubber outsole.',
      styleNotes: 'Pair with relaxed white trousers and an open knit shirt.'
    },
    {
      id: 'ad2',
      name: 'SL 72 RS RETRO SHOES Blue',
      price: 7999,
      back: 'adidas',
      img: 'https://images.footlocker.com/is/image/EBFL2/IG2132_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/IG2132_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Retro 70s track identity engineered for the modern pavement. Lightweight nylon upper mixed with supple suede panels and a cushioned EVA midsole.',
      materials: 'Nylon weave upper, premium suede trims, rippled traction outsole.',
      styleNotes: 'Wear with retro athletics shorts and a vintage track jacket.'
    },
    {
      id: 'ad3',
      name: 'ADIDAS GAZELLE CLASSIC Black',
      price: 9999,
      back: 'adidas',
      img: 'https://images.footlocker.com/is/image/EBFL2/BB5476_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/BB5476_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Suede terrace classic built on a retro indoor silhouette. Highlighted by gold-foil lettering and serrated leather stripes.',
      materials: 'Suede leather upper, synthetic lining, textured rubber cupsole.',
      styleNotes: 'Best styled with relaxed chino pants and a vintage-wash collegiate tee.'
    },
    {
      id: 'ad4',
      name: 'ADIDAS STAN SMITH White Green',
      price: 8999,
      back: 'adidas',
      img: 'https://images.footlocker.com/is/image/EBFL2/FX5502_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/FX5502_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The clean tennis original. Defined by perforated three-stripes, green heel tab detailing, and a minimalist design aesthetic.',
      materials: 'Primegreen high-performance recycled upper, rubber outsole.',
      styleNotes: 'Pair with smart linen trousers and a striped polo shirt.'
    }
  ],
  newbalance: [
    {
      id: 'nb1',
      name: 'NEW BALANCE 550 White Grey',
      price: 11999,
      back: 'newbalance',
      img: 'https://images.footlocker.com/is/image/EBFL2/BB550WT1_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/BB550WT1_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The 1989 court classic reborn. Simple, clean lines, and vintage off-white tones that define contemporary luxury. Suede overlays meet a chunkier heritage sole.',
      materials: 'Perforated leather details, suede overlay, Ortholite comfort footbed.',
      styleNotes: 'Clean preppy style with pleated trousers and a heavy knit crewneck.'
    },
    {
      id: 'nb2',
      name: 'NEW BALANCE 9060 Rain Cloud',
      price: 15999,
      back: 'newbalance',
      img: 'https://images.footlocker.com/is/image/EBFL2/U9060FNA_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/U9060FNA_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'A futuristic expression of classic running lineage. Features warped, exaggerated design details inspired by early 2000s tech aesthetics.',
      materials: 'Heavy mesh upper, pigskin suede overlays, dual-density ABZORB sole.',
      styleNotes: 'Wear with cropped cargo pants and a relaxed-fit mock neck.'
    },
    {
      id: 'nb3',
      name: 'NEW BALANCE 1906R Castlerock',
      price: 14999,
      back: 'newbalance',
      img: 'https://images.footlocker.com/is/image/EBFL2/M1906RVN_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/M1906RVN_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'A tech running icon from 2010 reimagined for the modern street. Classic N-ergy cushioning provides premium impact protection.',
      materials: 'Breathable open mesh upper, synthetic overlays, TPU heel cage.',
      styleNotes: 'Wear with wide nylon windpants and a technical half-zip pullover.'
    }
  ],
  yeezy: [
    {
      id: 'yz1',
      name: 'YEEZY BOOST 350 V2 Zebra',
      price: 24999,
      back: 'yeezy',
      img: 'https://images.footlocker.com/is/image/EBFL2/CP9654_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/CP9654_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'A modern design archive. Features engineered Primeknit, monofilament side stripes, and full-length Boost cushioning for a cloud-like ride.',
      materials: 'Recycled Primeknit upper, translucent TPU cage, responsive Boost foam.',
      styleNotes: 'Monochromatic street style with distressed denim and an oversized hoodie.'
    },
    {
      id: 'yz2',
      name: 'YEEZY FOAM RUNNER Onyx',
      price: 8999,
      back: 'yeezy',
      img: 'https://images.footlocker.com/is/image/EBFL2/HP8739_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/HP8739_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Futuristic organic design cast in a single piece. Offers lightweight comfort, unique ventilation channels, and a sculptural aesthetic.',
      materials: 'Injected EVA foam blended with harvested algae.',
      styleNotes: 'Minimalist lounge look with fleece sweatpants and a luxury coat.'
    }
  ],
  asics: [
    {
      id: 'as1',
      name: 'ASICS GEL-KAYANO 14 Birch',
      price: 13999,
      back: 'asics',
      img: 'https://images.footlocker.com/is/image/EBFL2/1201A019200_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/1201A019200_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Late 2000s tech runner aesthetic with updated materials. Represents the perfect intersection of performance running and luxury streetwear.',
      materials: 'Open knit mesh, synthetic leather overlays, signature GEL technology.',
      styleNotes: 'Style with loose shell windbreaker pants and an utility vest.'
    }
  ],
  puma: [
    {
      id: 'pm1',
      name: 'PUMA PALERMO Leather Black',
      price: 6999,
      back: 'puma',
      img: 'https://images.footlocker.com/is/image/EBFL2/39646302_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/39646302_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'A legendary terrace style from the 80s archives. Clean, low-profile aesthetics complete with signature Palermo branding details.',
      materials: 'Smooth leather upper, suede overlays, gum rubber outsole.',
      styleNotes: 'Style with corduroy shorts, white socks, and a simple white tee.'
    },
    {
      id: 'pm2',
      name: 'PUMA SUEDE CLASSIC Black',
      price: 5999,
      back: 'puma',
      img: 'https://images.footlocker.com/is/image/EBFL2/37491501_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/37491501_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The timeless classic that defined b-boy culture and street styling since 1968. Features the iconic Formstrip overlay.',
      materials: 'Full premium suede upper, rubber cupsole.',
      styleNotes: 'Style with cuffed chinos, an graphic tee, and an unbuttoned overshirt.'
    }
  ],
  converse: [
    {
      id: 'cv1',
      name: 'CHUCK 70 HIGH TOP Parchment',
      price: 6399,
      back: 'converse',
      img: 'https://images.footlocker.com/is/image/EBFL2/162053C_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/162053C_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The standard of street canvas shoes. Combines retro details with modern comfort accents, durable heavy canvas, and varnished egret foxing.',
      materials: '12oz organic cotton canvas upper, plush Ortholite lining, rubber toe cap.',
      styleNotes: 'Completely versatile. Pair with everything from suits to cargo shorts.'
    },
    {
      id: 'cv2',
      name: 'CHUCK 70 HIGH TOP Black',
      price: 6399,
      back: 'converse',
      img: 'https://images.footlocker.com/is/image/EBFL2/162050C_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/162050C_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The definitive silhouette that shaped generations. Heavyweight canvas and classic star ankle patch details.',
      materials: '12oz cotton canvas, varnished rubber midbox, Ortholite padding.',
      styleNotes: 'Looks best with vintage relaxed-fit trousers and a tucked-in tank.'
    }
  ],
  reebok: [
    {
      id: 'rb1',
      name: 'REEBOK CLUB C 85 White',
      price: 6999,
      back: 'reebok',
      img: 'https://images.footlocker.com/is/image/EBFL2/AR0455_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/AR0455_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'Minimalist court trainer from 1985. Retro tennis style details, clean leather overlays, and subtle Union Jack flag window box branding.',
      materials: 'Soft garment leather upper, molded sockliner, abrasion-resistant rubber outsole.',
      styleNotes: 'Style with grey marl sweatpants and a vintage collegiate crewneck.'
    },
    {
      id: 'rb2',
      name: 'REEBOK CLASSIC LEATHER White',
      price: 7999,
      back: 'reebok',
      img: 'https://images.footlocker.com/is/image/EBFL2/49799_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/49799_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'A running silhouette born in 1983, now a street classic. Soft premium leather provides ultimate everyday comfort.',
      materials: 'Garment leather upper, lightweight die-cut EVA midsole, rubber outsole.',
      styleNotes: 'Pair with light-wash blue denim and a relaxed-fit coach jacket.'
    }
  ],
  vans: [
    {
      id: 'vn1',
      name: 'VANS OLD SKOOL Black White',
      price: 5299,
      back: 'vans',
      img: 'https://images.footlocker.com/is/image/EBFL2/VN000D3HY28_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/VN000D3HY28_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The skate classic that first bared the iconic side stripe. Vulcanized waffle sole and durable canvas/suede design panels.',
      materials: 'Suede and canvas upper, reinforced toe caps, rubber waffle outsole.',
      styleNotes: 'Looks classic with black dickies trousers and a heavyweight graphic tee.'
    },
    {
      id: 'vn2',
      name: 'VANS CLASSIC SLIP-ON Checkerboard',
      price: 4799,
      back: 'vans',
      img: 'https://images.footlocker.com/is/image/EBFL2/EYEBWW_a1?wid=500&hei=500&fmt=png-alpha',
      imgs: [
        'https://images.footlocker.com/is/image/EBFL2/EYEBWW_a1?wid=500&hei=500&fmt=png-alpha'
      ],
      desc: 'The legendary low-profile slip-on with side accents and checkerboard printing that defined skate and pop culture.',
      materials: 'Sturdy canvas upper, elastic side accents, waffle rubber sole.',
      styleNotes: 'Style with loose denim and a relaxed-fit linen shirt.'
    }
  ]
};

// Brands data with extended roster
const BRANDS_DATA = [
  { id: 'nike', name: 'Nike / Jordan', description: 'Grails and street culture icons.', tagline: 'The Blueprint of Street Culture.', collectionCount: 4 },
  { id: 'adidas', name: 'Adidas', description: 'Terrace heritage and athletic performance.', tagline: 'Timeless Terraces.', collectionCount: 4 },
  { id: 'newbalance', name: 'New Balance', description: 'Boston craftsmanship meets modern minimal design.', tagline: 'Craftsmanship First.', collectionCount: 3 },
  { id: 'yeezy', name: 'Yeezy', description: 'Sculptural organic footwear silhouettes.', tagline: 'Design in its Purest Form.', collectionCount: 2 },
  { id: 'asics', name: 'Asics', description: 'Technical runners for modern fit aesthetics.', tagline: 'The Technical Renaissance.', collectionCount: 1 },
  { id: 'puma', name: 'Puma', description: 'Terrace Palermo and Speedcat designs.', tagline: 'Terrace Cool Reborn.', collectionCount: 2 },
  { id: 'converse', name: 'Converse', description: 'Classic canvas silhouettes that define eras.', tagline: 'Eras of Canvas.', collectionCount: 2 },
  { id: 'reebok', name: 'Reebok', description: 'Heritage court trainers and clean sportswear classics.', tagline: 'Heritage of the Court.', collectionCount: 2 },
  { id: 'vans', name: 'Vans', description: 'Classic vulcanized skate footwear since 1966.', tagline: 'Off The Wall.', collectionCount: 2 }
];

const SIZES = [6, 7, 8, 9, 10, 11, 12];

// State variables
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
  cart = [];
}
let wishlist = [];
try {
  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
} catch (e) {
  wishlist = [];
}
let users = {};
let currentUser = null;
try {
  currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
} catch (e) {
  currentUser = null;
}
let curProd = null;
let detQty = 1;
let selectedSize = null;
let activeCheckoutPayTab = 'card';
let toastTmr = null;
let lenisInstance = null;

// Helpers
function findP(id) {
  for (const arr of Object.values(DB)) {
    const p = arr.find(x => x.id === id);
    if (p) return p;
  }
  return null;
}

// ── CUSTOM CURSOR SPOTLIGHT ───────────────────────────────────────────
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const ring = document.getElementById('customCursorRing');
  if (!cursor || !ring) return;

  // Disable custom cursor on touch devices to prevent lag and usability friction
  if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
    cursor.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isMoving = false;
  let moveTimeout;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
      document.body.classList.add('mouse-moving');
      isMoving = true;
    }
    
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      document.body.classList.remove('mouse-moving');
      isMoving = false;
    }, 1500);

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth lagging ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover states expansion
  const interactiveTargets = 'a, button, .drop-card, .brand-panel, .universe-panel, .gallery-thumbnail, [onclick]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveTargets)) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      ring.style.transform = 'translate(-50%, -50%) scale(1.2)';
      ring.style.borderColor = 'var(--color-accent)';
      ring.style.backgroundColor = 'rgba(255, 90, 31, 0.05)';
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveTargets)) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.borderColor = 'var(--color-accent)';
      ring.style.backgroundColor = 'transparent';
    }
  });
}

// ── LENIS SMOOTH SCROLLING ────────────────────────────────────────────
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync scroll positions to active states
  lenisInstance.on('scroll', ScrollTrigger.update);
  
  // Sticky nav state
  const nav = document.getElementById('mainNav');
  lenisInstance.on('scroll', (e) => {
    if (nav) {
      nav.classList.toggle('nav-scrolled', e.scroll > 60);
      nav.classList.toggle('scrolled', e.scroll > 60);
    }
    // Hide hamburger toggle when scrolled
    const hamburger = document.getElementById('hamburgerToggle');
    if (hamburger) {
      hamburger.style.opacity = e.scroll > 60 ? '1' : '1';
    }
    
    const topBtn = document.getElementById('scrollTopBtn');
    if (topBtn) {
      topBtn.classList.toggle('visible', e.scroll > 400);
    }
  });
}

// ── OVERLAYS MANAGEMENT ───────────────────────────────────────────────
function openOverlay(id, isModal = false) {
  const el = document.getElementById(id);
  if (!el) return;
  document.body.classList.add('overlay-open');
  el.classList.add('active');
  
  // Disable lenis scrolling while drawer is active
  if (lenisInstance) lenisInstance.stop();

  if (typeof gsap !== 'undefined') {
    if (isModal) {
      const modal = el.querySelector('.overlay-modal');
      gsap.fromTo(modal, { scale: 0.95, y: 15, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'all' });
    } else {
      const drawer = el.querySelector('.overlay-drawer');
      gsap.fromTo(drawer, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out', clearProps: 'all' });
    }
  }
}

function closeOverlay(id, isModal = false) {
  const el = document.getElementById(id);
  if (!el) return;
  
  if (typeof gsap !== 'undefined') {
    if (isModal) {
      const modal = el.querySelector('.overlay-modal');
      gsap.to(modal, { scale: 0.95, y: 15, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
        el.classList.remove('active');
        checkActiveOverlays();
      }});
    } else {
      const drawer = el.querySelector('.overlay-drawer');
      gsap.to(drawer, { x: '100%', duration: 0.35, ease: 'power2.in', onComplete: () => {
        el.classList.remove('active');
        checkActiveOverlays();
      }});
    }
  } else {
    el.classList.remove('active');
    checkActiveOverlays();
  }
}

function checkActiveOverlays() {
  const activeBackdrops = document.querySelectorAll('.overlay-backdrop.active');
  if (activeBackdrops.length === 0) {
    document.body.classList.remove('overlay-open');
    if (lenisInstance) lenisInstance.start();
  }
}

function closeAllOverlays() {
  document.querySelectorAll('.overlay-backdrop.active').forEach(el => {
    el.classList.remove('active');
  });
  document.body.classList.remove('overlay-open');
  if (lenisInstance) lenisInstance.start();
}

function closeOverlayOnBg(e, id) {
  if (e.target === document.getElementById(id)) {
    const isModal = ['authOverlay', 'checkoutOverlay', 'successOverlay', 'aboutOverlay'].includes(id);
    closeOverlay(id, isModal);
  }
}

// ── DYNAMIC RENDERING (DROPS GRID & BRAND PANELS) ─────────────────────
function renderDropsGrid() {
  const grid = document.getElementById('dropsGrid');
  if (!grid) return;
  
  // Curated editorial sneakers lists
  const drops = [
    { id: 'nk2', isFeatured: true, tag: 'GRAIL ARCHIVE // 01', status: 'Hot Release' },
    { id: 'nb1', isFeatured: false, tag: 'EDITORIAL // 02', status: 'Curated Drop' },
    { id: 'yz1', isFeatured: false, tag: 'DESIGN PIECE // 03', status: 'Few Left' },
    { id: 'as1', isFeatured: false, tag: 'TECH RUN // 04', status: 'In Stock' }
  ];
  
  grid.innerHTML = drops.map((d, index) => {
    const p = findP(d.id);
    if (!p) return '';
    const bData = BRANDS_DATA.find(x => x.id === p.back);
    const brandName = bData ? bData.name : p.back.toUpperCase();
    const displayPrice = '₹' + p.price.toLocaleString('en-IN');
    
    if (d.isFeatured) {
      // Large Asymmetric Featured Spotlight layout
      return `
        <div class="featured-spotlight reveal" onclick="openProductDetail('${p.id}')">
          <div class="spotlight-background-text">${brandName}</div>
          <div class="spotlight-image-container">
            <img src="${p.img}" alt="${p.name}" loading="lazy"/>
          </div>
          <div class="spotlight-editorial">
            <div class="product-brand-tag">${d.tag}</div>
            <h3 class="spotlight-quote">"${p.desc.split('.')[0]}."</h3>
            <div class="spotlight-meta">
              <div class="product-name-label" style="font-size: var(--text-lg);">${p.name}</div>
              <div class="product-price-label" style="font-size: var(--text-lg); color: var(--color-accent);">${displayPrice}</div>
            </div>
            <button class="btn-luxury-cta" style="margin-top:var(--space-4); width:fit-content; padding: 0 var(--space-8);" onclick="event.stopPropagation(); openProductDetail('${p.id}')">
              Reserve Pair &rarr;
            </button>
          </div>
        </div>
      `;
    } else {
      // Asymmetric supporting product card
      return `
        <div class="product-card reveal" onclick="openProductDetail('${p.id}')">
          <div class="product-image-wrap">
            <div class="product-hover-actions">
              <button class="card-action-btn ${wishlist.some(w => w.id === p.id) ? 'active' : ''}" onclick="event.stopPropagation(); handleToggleWishlist('${p.id}')" title="Save to Collection">
                ${wishlist.some(w => w.id === p.id) ? 
                  `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>` : 
                  `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
                }
              </button>
            </div>
            <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600'"/>
            <div class="product-card-quickadd" onclick="event.stopPropagation(); handleQuickAdd('${p.id}')">
              Reserve Pair +
            </div>
          </div>
          <div class="product-meta-block">
            <div class="product-brand-tag">${brandName} &middot; ${d.tag.split(' // ')[1]}</div>
            <div class="product-title-row">
              <h4 class="product-name-label">${p.name}</h4>
              <span class="product-price-label">${displayPrice}</span>
            </div>
          </div>
        </div>
      `;
    }
  }).join('');
}

function renderBrandUniverse() {
  const track = document.getElementById('universeTrack');
  if (!track) return;
  
  track.innerHTML = BRANDS_DATA.map((b, i) => {
    const num = String(i + 1).padStart(2, '0');
    const productsCount = DB[b.id]?.length || 0;
    return `
      <div class="universe-panel" onclick="window.location.href='brand.html?id=${b.id}'">
        <div class="universe-panel-bg-text">${b.name.split(' ')[0]}</div>
        <div class="universe-panel-num">${num}</div>
        <h3 class="universe-panel-title">${b.name}</h3>
        <p class="universe-panel-desc">${b.description}</p>
        <div class="universe-panel-footer">
          <span class="universe-panel-count">${productsCount} Curated Pieces</span>
          <span class="universe-panel-link">Explore Collection &rarr;</span>
        </div>
      </div>
    `;
  }).join('');
}

// ── BRAND CATALOG ACTIONS ─────────────────────────────────────────────
let currentBrandId = 'nike';
function openCatalogOverlay(brandId) {
  currentBrandId = brandId;
  const b = BRANDS_DATA.find(x => x.id === brandId);
  if (!b) return;
  
  document.getElementById('catalogTitle').textContent = `${b.name} Collection`;
  document.getElementById('catalogSearch').value = '';
  
  renderCatalogGrid();
  openOverlay('catalogOverlay');
}

function renderCatalogGrid(filteredProducts = null) {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  
  const productsToRender = filteredProducts || DB[currentBrandId] || [];
  if (productsToRender.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" style="width:36px; height:36px; stroke:var(--color-text-faint); stroke-width:1.5; fill:none; margin:0 auto 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <div class="empty-state-text">No collection items found.</div>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = productsToRender.map(p => {
    const inW = wishlist.some(w => w.id === p.id);
    const displayPrice = '₹' + p.price.toLocaleString('en-IN');
    
    return `
      <div class="product-card" onclick="openProductDetail('${p.id}')">
        <div class="product-image-wrap">
          <div class="product-hover-actions">
            <button class="card-action-btn ${inW ? 'active' : ''}" onclick="event.stopPropagation(); handleToggleWishlist('${p.id}')" title="Save to Collection">
              ${inW ? 
                `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>` : 
                `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
              }
            </button>
          </div>
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600'"/>
          <div class="product-card-quickadd" onclick="event.stopPropagation(); handleQuickAdd('${p.id}')">
            Reserve Pair +
          </div>
        </div>
        <div class="product-meta-block">
          <div class="product-brand-tag">${p.back.toUpperCase()}</div>
          <div class="product-title-row">
            <h4 class="product-name-label">${p.name}</h4>
            <span class="product-price-label">${displayPrice}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterCatalog() {
  const q = document.getElementById('catalogSearch').value.trim().toLowerCase();
  if (!q) {
    renderCatalogGrid();
    return;
  }
  const filtered = (DB[currentBrandId] || []).filter(p => p.name.toLowerCase().includes(q));
  renderCatalogGrid(filtered);
}

// ── CAMPAIGN PRODUCT DETAIL ACTIONS ──────────────────────────────────
function openProductDetail(id) {
  const p = findP(id);
  if (!p) return;
  
  curProd = p;
  detQty = 1;
  selectedSize = null;
  
  document.getElementById('detailTitle').textContent = p.name;
  
  // Build Campaign Layout Structure dynamically
  const contentEl = document.getElementById('detailCampaignContent');
  if (!contentEl) return;
  
  const displayPrice = '₹' + p.price.toLocaleString('en-IN');
  const inW = wishlist.some(w => w.id === p.id);
  
  // Render layout structure
  contentEl.innerHTML = `
    <div class="detail-campaign-layout">
      <!-- Media Gallery -->
      <div class="detail-campaign-media">
        <div class="campaign-gallery-hero">
          <img src="${p.img}" id="mainDetailHeroImg" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600'"/>
        </div>
        <div class="campaign-gallery-strip">
          ${p.imgs.map((imgUrl, idx) => `
            <div class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" onclick="swapDetailHero(this, '${imgUrl}')">
              <img src="${imgUrl}" alt="Thumbnail ${idx}"/>
            </div>
          `).join('')}
          ${p.imgs.length < 4 ? `
            <div class="gallery-thumbnail" onclick="swapDetailHero(this, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600')">
              <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600" alt="Alternate View"/>
            </div>
          ` : ''}
        </div>
      </div>
      
      <!-- Info Details Column -->
      <div class="detail-campaign-info">
        <div class="detail-editorial-header">
          <div class="detail-editorial-brand">${p.back.toUpperCase()} &middot; ORIGINALS</div>
          <h3 class="detail-editorial-name">${p.name}</h3>
          <div class="detail-editorial-price-row">
            <span class="detail-editorial-price">${displayPrice}</span>
            <span class="detail-editorial-tax">Incl. import duties & taxes</span>
          </div>
        </div>
        
        <p class="detail-editorial-story-snippet">"${p.desc}"</p>
        
        <!-- Size Selector -->
        <div>
          <div class="detail-sizes-header">
            <span>Select Size (UK)</span>
            <span class="size-guide-link" onclick="showToastNotification('Size Guide: Standard UK sizing matches US - 1.')">Size Chart</span>
          </div>
          <div class="detail-sizes-grid">
            ${SIZES.map(sz => `
              <button class="detail-size-btn" onclick="selectDetailSize(this, ${sz})">${sz}</button>
            `).join('')}
          </div>
        </div>
        
        <!-- Styling Advice -->
        <div class="detail-styling-guide">
          <div class="detail-styling-title">Fashion Director Styling Notes</div>
          <p>${p.styleNotes || 'Style with relaxed-fit pleated flannel trousers and structural outerwear to balance silhouettes.'}</p>
        </div>
        
        <!-- Qty and actions -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px;">
          <div class="qty-picker-container">
            <span class="qty-label">Quantity</span>
            <div class="qty-controller">
              <button class="qty-ctrl-btn" onclick="changeDetailQty(-1)">-</button>
              <span class="qty-ctrl-val" id="detailQtyVal">1</span>
              <button class="qty-ctrl-btn" onclick="changeDetailQty(1)">+</button>
            </div>
          </div>
          <span style="font-size:11px; text-transform:uppercase; color:var(--color-gold); font-weight:800; letter-spacing:0.1em;">In Stock // Ready to Ship</span>
        </div>
        
        <div class="detail-actions-panel">
          <button class="btn-luxury-cta magnetic-btn" id="detailCartBtn" onclick="addDetailToCart()">
            Reserve Pair
          </button>
          <button class="btn-luxury-outline" id="detailWishBtn" onclick="toggleDetailWish()">
            ${inW ? 
              `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2; display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> Saved` : 
              `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5; display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Save`
            }
          </button>
        </div>
      </div>
    </div>
  `;
  
  openOverlay('detailOverlay');
  initMagneticButtons();
}

function swapDetailHero(el, imgUrl) {
  document.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const heroImg = document.getElementById('mainDetailHeroImg');
  if (heroImg) {
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(heroImg, { opacity: 0.4, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }
    heroImg.src = imgUrl;
  }
}

function selectDetailSize(btn, sz) {
  document.querySelectorAll('.detail-size-btn').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = sz;
}

function changeDetailQty(direction) {
  detQty = Math.max(1, Math.min(10, detQty + direction));
  const valEl = document.getElementById('detailQtyVal');
  if (valEl) valEl.textContent = detQty;
}

function handleQuickAdd(id) {
  openProductDetail(id);
}

function addDetailToCart() {
  if (!curProd) return;
  if (!selectedSize) {
    showToastNotification('⚠️ Please select a size (UK) first.');
    return;
  }
  addToCart(curProd.id, selectedSize, detQty);
  
  const btn = document.getElementById('detailCartBtn');
  if (btn) {
    btn.innerHTML = 'Reserved &nbsp; ✓';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.innerHTML = 'Reserve Pair';
      btn.style.background = '';
    }, 1500);
  }
}

// ── CART SYSTEM ACTIONS ───────────────────────────────────────────────
function addToCart(id, size, qty) {
  const p = findP(id);
  if (!p) return;
  
  const key = id + '_' + size;
  const existingItem = cart.find(c => c.key === key);
  
  if (existingItem) {
    existingItem.qty = Math.min(10, existingItem.qty + qty);
  } else {
    cart.push({ key, id, name: p.name, price: p.price, img: p.img, size, qty });
  }
  
  updateCartBadges();
  renderCart();
  showToastNotification(`Reserved: ${p.name.split(' ').slice(0, 3).join(' ')}`);
  
  const badge = document.getElementById('cartCnt');
  if (badge && typeof gsap !== 'undefined') {
    gsap.fromTo(badge, { scale: 1.5 }, { scale: 1, duration: 0.3, ease: 'back.out(1.5)' });
  }
}

function removeFromCart(key) {
  cart = cart.filter(c => c.key !== key);
  updateCartBadges();
  renderCart();
}

function changeCartQty(key, direction) {
  const item = cart.find(c => c.key === key);
  if (!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty + direction));
  updateCartBadges();
  renderCart();
}

function updateCartBadges() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.querySelectorAll('#cartCnt, #mobCartCnt').forEach(badge => {
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('show', count > 0);
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  });
  
  const chkBtn = document.getElementById('cartCheckoutBtn');
  if (chkBtn) {
    chkBtn.disabled = cart.length === 0;
  }
}

function renderCart() {
  const content = document.getElementById('cartContent');
  if (!content) return;
  
  if (cart.length === 0) {
    content.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" style="width:48px; height:48px; fill:none; stroke:var(--color-text-faint); stroke-width:1.5; margin:0 auto 16px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <div class="empty-state-text" style="font-family: var(--font-editorial); font-size:1.15rem; font-style:italic;">Your luxury locker is empty.<br/>Browse our collections to select.</div>
      </div>
    `;
    document.getElementById('cartSubtotal').textContent = '₹0';
    document.getElementById('cartGST').textContent = '₹0';
    document.getElementById('cartGrandTotal').textContent = '₹0';
    return;
  }
  
  content.innerHTML = `
    <div class="cart-drawer-list">
      ${cart.map(c => `
        <div class="cart-drawer-item">
          <div class="cart-drawer-img-wrap">
            <img src="${c.img}" alt="${c.name}"/>
          </div>
          <div class="cart-drawer-details">
            <div class="cart-drawer-name">${c.name}</div>
            <div class="cart-drawer-size">Size: UK ${c.size}</div>
            <div class="cart-drawer-price">₹${(c.price * c.qty).toLocaleString('en-IN')}</div>
            <div class="cart-item-qty" style="margin-top:4px;">
              <button class="cart-item-qty-btn" style="width:20px; height:20px;" onclick="changeCartQty('${c.key}', -1)">-</button>
              <span class="cart-item-qty-val" style="font-size:12px; min-width:14px;">${c.qty}</span>
              <button class="cart-item-qty-btn" style="width:20px; height:20px;" onclick="changeCartQty('${c.key}', 1)">+</button>
            </div>
          </div>
          <span class="cart-drawer-remove" onclick="removeFromCart('${c.key}')" title="Remove Item">&times;</span>
        </div>
      `).join('')}
    </div>
  `;
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  
  document.getElementById('cartSubtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('cartGST').textContent = '₹' + gst.toLocaleString('en-IN');
  document.getElementById('cartGrandTotal').textContent = '₹' + total.toLocaleString('en-IN');
}

function openCartOverlay() {
  renderCart();
  openOverlay('cartOverlay');
}

function closeCartOverlay() {
  closeOverlay('cartOverlay');
}

// ── WISHLIST / SAVE COLLECTION SYSTEM ────────────────────────────────
function handleToggleWishlist(id) {
  const p = findP(id);
  if (!p) return;
  
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToastNotification('Removed from collection');
  } else {
    wishlist.push({ id, name: p.name, price: p.price, img: p.img });
    showToastNotification('Saved to collection');
  }
  
  // Update state buttons in loops
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.card-action-btn');
    if (btn && btn.getAttribute('onclick')?.includes(id)) {
      const active = wishlist.some(w => w.id === id);
      btn.classList.toggle('active', active);
      btn.innerHTML = active ? 
        `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>` : 
        `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
  });
  
  updateWishlistBadges();
  renderWishlist();
}

function toggleDetailWish() {
  if (!curProd) return;
  handleToggleWishlist(curProd.id);
  const inW = wishlist.some(w => w.id === curProd.id);
  const btn = document.getElementById('detailWishBtn');
  if (btn) {
    btn.innerHTML = inW ? 
      `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2; display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> Saved` : 
      `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5; display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Save`;
  }
}

function updateWishlistBadges() {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (e) {
    console.error('Failed to save wishlist to localStorage', e);
  }
  const count = wishlist.length;
  document.querySelectorAll('#wishCnt, #mobWishCnt').forEach(badge => {
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('show', count > 0);
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  });
}

function renderWishlist() {
  const content = document.getElementById('wishlistContent');
  if (!content) return;
  
  if (wishlist.length === 0) {
    content.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" style="width:48px; height:48px; fill:none; stroke:var(--color-text-faint); stroke-width:1.5; margin:0 auto 16px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <div class="empty-state-text" style="font-family: var(--font-editorial); font-size:1.15rem; font-style:italic;">Your saved collection is empty.</div>
      </div>
    `;
    return;
  }
  
  content.innerHTML = `
    <div class="cart-drawer-list">
      ${wishlist.map(w => `
        <div class="cart-drawer-item">
          <div class="cart-drawer-img-wrap" onclick="closeWishlistOverlay(); openProductDetail('${w.id}')" style="cursor:pointer;">
            <img src="${w.img}" alt="${w.name}"/>
          </div>
          <div class="cart-drawer-details">
            <div class="cart-drawer-name" onclick="closeWishlistOverlay(); openProductDetail('${w.id}')" style="cursor:pointer; font-weight:700; text-transform:uppercase;">${w.name}</div>
            <div class="cart-drawer-price">₹${w.price.toLocaleString('en-IN')}</div>
            <button class="btn-luxury-cta" style="height:28px; font-size:9px; margin-top:6px; padding:0 8px; width:fit-content;" onclick="moveWishlistItemToCart('${w.id}')">
              Select Size & Locker
            </button>
          </div>
          <span class="cart-drawer-remove" onclick="handleToggleWishlist('${w.id}')" title="Remove Saved">&times;</span>
        </div>
      `).join('')}
    </div>
  `;
}

function moveWishlistItemToCart(id) {
  closeWishlistOverlay();
  openProductDetail(id);
}

function scrollWishlistToDrops() {
  closeWishlistOverlay();
  setTimeout(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo('#drops');
    } else {
      const el = document.getElementById('drops');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 400);
}

function openWishlistOverlay() {
  renderWishlist();
  openOverlay('wishlistOverlay');
}

function closeWishlistOverlay() {
  closeOverlay('wishlistOverlay');
}

// ── CUSTOM AUTH ACTIONS ───────────────────────────────────────────────
function openAuthOverlay() {
  document.getElementById('authError').style.display = 'none';
  openOverlay('authOverlay', true);
}

function closeAuthOverlay() {
  closeOverlay('authOverlay', true);
}

function switchAuthTab(tab) {
  document.getElementById('tabSignIn').classList.toggle('active', tab === 'in');
  document.getElementById('tabSignUp').classList.toggle('active', tab === 'up');
  document.getElementById('formSignIn').style.display = tab === 'in' ? 'block' : 'none';
  document.getElementById('formSignUp').style.display = tab === 'up' ? 'block' : 'none';
  document.getElementById('authError').style.display = 'none';
}

function showAuthError(msg) {
  const errBox = document.getElementById('authError');
  errBox.textContent = msg;
  errBox.style.display = 'block';
}

function handleSignIn() {
  const em = document.getElementById('signInEmail').value.trim();
  const pw = document.getElementById('signInPass').value;
  
  if (!em || !pw) {
    showAuthError('All fields must be filled.');
    return;
  }
  if (!users[em]) {
    showAuthError('No customer portfolio matches this email.');
    return;
  }
  if (users[em].pass !== pw) {
    showAuthError('Access Denied: Incorrect passphrase.');
    return;
  }
  
  completeLogin(users[em].name, em);
}

function handleSignUp() {
  const nm = document.getElementById('signUpName').value.trim();
  const em = document.getElementById('signUpEmail').value.trim();
  const pw = document.getElementById('signUpPass').value;
  
  if (!nm || !em || !pw) {
    showAuthError('All fields must be filled.');
    return;
  }
  if (pw.length < 6) {
    showAuthError('Passphrase must contain at least 6 characters.');
    return;
  }
  if (users[em]) {
    showAuthError('An account is already linked to this email.');
    return;
  }
  
  users[em] = { name: nm, pass: pw };
  completeLogin(nm, em);
}

function handleGuestLogin() {
  completeLogin('Collector Guest', null);
}

function completeLogin(name, email) {
  currentUser = { name, email };
  try {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  } catch (e) {
    console.error('Failed to save user session to localStorage', e);
  }
  const loginBtn = document.getElementById('btn-login');
  if (loginBtn) loginBtn.style.display = 'none';
  
  const userBtn = document.getElementById('btn-user');
  if (userBtn) {
    userBtn.style.display = 'inline-flex';
    const textSpan = userBtn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = name.split(' ')[0];
    } else {
      userBtn.innerHTML = `
        <svg viewBox="0 0 24 24" style="width:13px; height:13px; stroke:currentColor; stroke-width:2; fill:none; margin-right:6px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>${name.split(' ')[0]}</span>
      `;
    }
  }
  
  showToastNotification(`Welcome to 10KICKS, ${name.split(' ')[0]}`);
  closeAuthOverlay();
}

function handleSignOut() {
  if (confirm('Log out of 10KICKS Portfolio?')) {
    currentUser = null;
    try {
      localStorage.removeItem('currentUser');
    } catch (e) {
      console.error('Failed to clear user session', e);
    }
    const loginBtn = document.getElementById('btn-login');
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    const userBtn = document.getElementById('btn-user');
    if (userBtn) userBtn.style.display = 'none';
    showToastNotification('Signed out');
  }
}

// ── CUSTOM CHECKOUT & PAYMENT FLOW ────────────────────────────────────
function openCheckoutOverlay() {
  if (cart.length === 0) {
    showToastNotification('Your cart is empty!');
    return;
  }
  closeCartOverlay();
  
  if (currentUser && currentUser.email) {
    const emailInput = document.getElementById('chkEmail');
    if (emailInput) emailInput.value = currentUser.email;
  }
  
  renderCheckoutSummary();
  openOverlay('checkoutOverlay', true);
}

function closeCheckoutOverlay() {
  closeOverlay('checkoutOverlay', true);
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsSummary');
  if (!container) return;
  
  container.innerHTML = cart.map(c => `
    <div class="checkout-totals-row">
      <span>${c.name.split(' ').slice(0,3).join(' ')} ×${c.qty} (UK ${c.size})</span>
      <span>₹${(c.price * c.qty).toLocaleString('en-IN')}</span>
    </div>
  `).join('');
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = Math.round(subtotal * 0.18);
  const isCod = activeCheckoutPayTab === 'cod';
  const codFee = isCod ? 49 : 0;
  const grand = subtotal + gst + codFee;
  
  document.getElementById('chkSubtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('chkGST').textContent = '₹' + gst.toLocaleString('en-IN');
  document.getElementById('chkGrandTotal').textContent = '₹' + grand.toLocaleString('en-IN');
  
  const codRow = document.getElementById('chkCodRow');
  if (codRow) codRow.style.display = isCod ? 'flex' : 'none';
}

function switchCheckoutPayTab(tab) {
  activeCheckoutPayTab = tab;
  
  document.querySelectorAll('.payment-tab').forEach(el => {
    const isMatched = el.textContent.toLowerCase().includes(tab);
    el.classList.toggle('active', isMatched);
  });
  
  document.getElementById('chkPayCard').style.display = tab === 'card' ? 'block' : 'none';
  document.getElementById('chkPayUpi').style.display = tab === 'upi' ? 'block' : 'none';
  document.getElementById('chkPayNet').style.display = tab === 'net' ? 'block' : 'none';
  document.getElementById('chkPayCod').style.display = tab === 'cod' ? 'block' : 'none';
  
  renderCheckoutSummary();
}

function selectUpiApp(el) {
  document.querySelectorAll('.upi-app-btn, .upi-checkout-btn').forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

function selectNetBank(el) {
  document.querySelectorAll('.bank-btn, .bank-checkout-btn').forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

function formatCardInput(inp) {
  let v = inp.value.replace(/\D/g, '').slice(0, 16);
  inp.value = v.match(/.{1,4}/g)?.join(' ') || v;
}

function formatCardExpInput(inp) {
  let v = inp.value.replace(/\D/g, '').slice(0, 4);
  if (v.length >= 3) {
    v = v.slice(0, 2) + '/' + v.slice(2);
  }
  inp.value = v;
}

function handlePlaceOrder() {
  const fn = document.getElementById('chkFn').value.trim();
  const address = document.getElementById('chkAddress').value.trim();
  const phone = document.getElementById('chkPhone').value.trim();
  
  if (!fn || !address || !phone) {
    showToastNotification('⚠️ Complete shipping portfolio details.');
    return;
  }
  
  if (activeCheckoutPayTab === 'card') {
    const cardNum = document.getElementById('chkCardNum').value.replace(/\s/g, '');
    const cardCvv = document.getElementById('chkCardCvv').value;
    if (cardNum.length < 16) {
      showToastNotification('⚠️ Enter a valid 16-digit card number.');
      return;
    }
    if (cardCvv.length < 3) {
      showToastNotification('⚠️ Enter a valid 3-digit CVV.');
      return;
    }
  } else if (activeCheckoutPayTab === 'upi') {
    const upiId = document.getElementById('chkUpiId').value.trim();
    if (!upiId.includes('@')) {
      showToastNotification('⚠️ Enter a valid UPI Address (@).');
      return;
    }
  }
  
  const payBtn = document.getElementById('btnPayNow');
  if (payBtn) {
    payBtn.textContent = 'Verifying Transaction...';
    payBtn.disabled = true;
  }
  
  setTimeout(() => {
    if (payBtn) {
      payBtn.textContent = 'Confirm Reservation';
      payBtn.disabled = false;
    }
    
    const oid = '10K' + Date.now().toString().slice(-8).toUpperCase();
    document.getElementById('successOrderId').textContent = 'Collection ID: ' + oid;
    
    cart = [];
    updateCartBadges();
    renderCart();
    
    closeCheckoutOverlay();
    openOverlay('successOverlay', true);
  }, 2000);
}

function handleSuccessContinue() {
  closeOverlay('successOverlay', true);
}

// ── SEARCH IN CATALOGUE ───────────────────────────────────────────────
function runSearch() {
  const query = document.getElementById('hdrSearch').value.trim().toLowerCase();
  if (!query) return;
  
  let matches = [];
  for (const [brand, products] of Object.entries(DB)) {
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || brand.toLowerCase().includes(query));
    matches = matches.concat(filtered);
  }
  
  if (matches.length > 0) {
    document.getElementById('catalogTitle').textContent = `Search: "${query}"`;
    currentBrandId = 'search_results';
    
    const grid = document.getElementById('catalogGrid');
    document.getElementById('catalogSearch').value = query;
    
    renderCatalogGrid(matches);
    openOverlay('catalogOverlay');
  } else {
    showToastNotification(`No collectibles found for "${query}"`);
  }
}

// ── MAGNETIC BUTTON INTERACTIONS ──────────────────────────────────────
function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-luxury-cta, .btn-luxury-outline, .magnetic-btn');
  if (typeof gsap === 'undefined') return;
  // Skip magnetic effect on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// ── HAMBURGER MENU DRAWER ──────────────────────────────────────────
function toggleHamburgerMenu() {
  const overlay = document.getElementById('hamburgerOverlay');
  if (!overlay) return;
  if (overlay.classList.contains('active')) {
    closeHamburgerMenu();
  } else {
    openHamburgerMenu();
  }
}

function openHamburgerMenu() {
  const overlay = document.getElementById('hamburgerOverlay');
  if (!overlay) return;
  document.body.classList.add('overlay-open');
  overlay.classList.add('active');
  if (lenisInstance) lenisInstance.stop();
  
  if (typeof gsap !== 'undefined') {
    const drawer = overlay.querySelector('.overlay-drawer');
    gsap.fromTo(drawer, { y: '100%' }, { y: '0%', duration: 0.5, ease: 'power3.out', clearProps: 'all' });
  }
}

function closeHamburgerMenu() {
  const overlay = document.getElementById('hamburgerOverlay');
  if (!overlay) return;
  
  if (typeof gsap !== 'undefined') {
    const drawer = overlay.querySelector('.overlay-drawer');
    gsap.to(drawer, { y: '100%', duration: 0.35, ease: 'power2.in', onComplete: () => {
      overlay.classList.remove('active');
      checkActiveOverlays();
    }});
  } else {
    overlay.classList.remove('active');
    checkActiveOverlays();
  }
}

// ── SEARCH BOX FOR MOBILE & TABLETS ───────────────────────────────────
function openSearchDrawer() {
  // Mobile search falls back to opening Search/Catalog dialog
  openOverlay('catalogOverlay');
  document.getElementById('catalogSearch').focus();
}

// ── TOAST MESSAGES ────────────────────────────────────────────────────
function showToastNotification(msg) {
  const toast = document.getElementById('customToast');
  if (!toast) return;
  
  toast.textContent = msg;
  toast.classList.add('active');
  
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// ── LIVE COUNTDOWN LAUNCH TIMER ───────────────────────────────────────
function initCountdownClock() {
  // Date target set dynamically to next Friday at 6:00 PM (typical drop calendar)
  const nextDrop = new Date();
  nextDrop.setDate(nextDrop.getDate() + (5 - nextDrop.getDay() + 7) % 7);
  nextDrop.setHours(18, 0, 0, 0);

  function update() {
    const diff = nextDrop.getTime() - new Date().getTime();
    if (diff <= 0) {
      document.querySelectorAll('.countdown-number').forEach(el => el.textContent = '00');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const dEl = document.getElementById('daysVal');
    const hEl = document.getElementById('hoursVal');
    const mEl = document.getElementById('minsVal');
    const sEl = document.getElementById('secsVal');
    
    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }

  setInterval(update, 1000);
  update();
}

// ── HORIZONTAL MUSEUM SCROLL PINNING ──────────────────────────────────
function initBrandUniversePinning() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const track = document.getElementById('universeTrack');
  const outer = document.getElementById('universeOuter');
  if (!track || !outer) return;

  // Pin section and scroll horizontally using GSAP ScrollTrigger
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 120),
    ease: 'none',
    scrollTrigger: {
      trigger: outer,
      pin: true,
      scrub: 1,
      start: 'top 12%',
      end: () => '+=' + (track.scrollWidth - window.innerWidth + 150),
      invalidateOnRefresh: true
    }
  });

  // GSAP Mouse Interaction Drag-like effect for track
  let isDragging = false, startX = 0, scrollLeft = 0;
  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  document.addEventListener('mouseup', () => { isDragging = false; track.style.cursor = 'grab'; });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });
  track.style.cursor = 'grab';
}

// ── BRAND GRID INITIALIZATION (Phase 7) ──────────────────────────────────
const LUXURY_BRANDS = [
  "Air Jordan", "Yeezy", "New Balance", "Asics", "Salomon", "Nike Dunk",
  "Off-White", "Fear Of God", "Aime Leon Dore", "Travis Scott", "Kobe", "Arc'teryx"
];

function initBrandGrid() {
  const grid = document.getElementById('brandLogoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  LUXURY_BRANDS.forEach(brand => {
    const card = document.createElement('div');
    card.className = 'brand-logo-card reveal';
    card.textContent = brand;
    grid.appendChild(card);
  });
}

// ── INITIALIZATION ON PAGE LOAD ───────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Setup cursor
  initCustomCursor();
  
  // Setup Lenis Smooth Scroll
  initLenis();

  // Initial user session sync
  if (currentUser) {
    const loginBtn = document.getElementById('btn-login');
    if (loginBtn) loginBtn.style.display = 'none';
    const userBtn = document.getElementById('btn-user');
    if (userBtn) {
      userBtn.style.display = 'inline-flex';
      const textSpan = userBtn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = currentUser.name.split(' ')[0];
      }
    }
  }

  // Initial loops and states rendering
  renderDropsGrid();
  renderBrandUniverse();
  renderBrandsDirectory();
  initBrandGrid();
  updateCartBadges();
  updateWishlistBadges();
  initCountdownClock();
  initMagneticButtons();

  // Brand Catalog Page Initialization
  if (window.location.pathname.includes('brand.html')) {
    const params = new URLSearchParams(window.location.search);
    const bId = params.get('id');
    if (bId && DB[bId]) {
      currentBrandId = bId;
      const b = BRANDS_DATA.find(x => x.id === bId);
      const titleEl = document.getElementById('pageCatalogTitle');
      if (titleEl) titleEl.textContent = `${b.name} Collection`;
      
      renderPageCatalogGrid();
    } else {
      window.location.href = 'brands.html';
    }
  }
});

// Setup GSAP entries after full load (to prevent jumps)
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Mobile: reduce animation complexity for 60fps
  const isMobile = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;

  // Initialize horizontal museum scrolling
  initBrandUniversePinning();

  // Staggered letters intro reveal timeline for hero text
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: isMobile ? 0.6 : 1 } });
  tl.to('.hero-line span', { y: '0%', stagger: isMobile ? 0.08 : 0.15, delay: isMobile ? 0.2 : 0.4 })
    .from('.hero-subtitle', { opacity: 0, y: isMobile ? 10 : 15, duration: isMobile ? 0.5 : 0.8 }, '-=0.6')
    .from('.hero-btn-wrap', { opacity: 0, y: isMobile ? 10 : 15, duration: isMobile ? 0.4 : 0.6 }, '-=0.5')
    .from('.hero-shoe-img', { opacity: 0, y: isMobile ? 60 : 100, scale: isMobile ? 0.95 : 0.9, duration: isMobile ? 0.8 : 1.2, ease: 'expo.out' }, '-=0.8')
    .from('.hero-shoe-shadow', { opacity: 0, scale: 0.5, duration: isMobile ? 0.6 : 1 }, '-=1')
    .from('.hero-collector-card', { opacity: 0, x: isMobile ? 20 : 40, duration: isMobile ? 0.5 : 0.8 }, '-=0.8');

  // Parallax backdrop outline scrolling marquee
  gsap.to('#bigTypeMarquee', {
    x: '-35%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.big-type-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2
    }
  });

  // Reveal elements on scroll trigger
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
});

// ── BRANDS DIRECTORY ACTIONS ───────────────────────────────────────────
function openBrandsOverlay() {
  window.location.href = 'brands.html';
}

function closeBrandsOverlay() {
  closeOverlay('brandsOverlay');
}

function openBrandCatalog(brandId) {
  window.location.href = `brand.html?id=${brandId}`;
}

function renderBrandsDirectory() {
  const grid = document.querySelector('.brands-directory-grid');
  if (!grid) return;
  
  grid.innerHTML = BRANDS_DATA.map(b => {
    const productsCount = DB[b.id]?.length || 0;
    return `
      <a href="brand.html?id=${b.id}" class="brand-dir-card" style="text-decoration:none; display:flex; flex-direction:column;">
        <div class="brand-dir-title">${b.name}</div>
        <div class="brand-dir-count">${productsCount} Curated Pieces</div>
      </a>
    `;
  }).join('');
}

function renderPageCatalogGrid(filteredProducts = null) {
  const grid = document.getElementById('pageCatalogGrid');
  if (!grid) return;
  
  const productsToRender = filteredProducts || DB[currentBrandId] || [];
  if (productsToRender.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 60px 20px;">
        <svg viewBox="0 0 24 24" style="width:36px; height:36px; stroke:var(--color-text-faint); stroke-width:1.5; fill:none; margin:0 auto 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <div class="empty-state-text">No collection items found.</div>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = productsToRender.map(p => {
    const inW = wishlist.some(w => w.id === p.id);
    const displayPrice = '₹' + p.price.toLocaleString('en-IN');
    
    return `
      <div class="product-card" onclick="openProductDetail('${p.id}')">
        <div class="product-image-wrap">
          <div class="product-hover-actions">
            <button class="card-action-btn ${inW ? 'active' : ''}" onclick="event.stopPropagation(); handleToggleWishlist('${p.id}')" title="Save to Collection">
              ${inW ? 
                `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--color-accent); stroke:var(--color-accent); stroke-width:2;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>` : 
                `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.5;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
              }
            </button>
          </div>
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600'"/>
          <div class="product-card-quickadd" onclick="event.stopPropagation(); handleQuickAdd('${p.id}')">
            Reserve Pair +
          </div>
        </div>
        <div class="product-meta-block">
          <div class="product-brand-tag">${p.back.toUpperCase()}</div>
          <div class="product-title-row">
            <h4 class="product-name-label">${p.name}</h4>
            <span class="product-price-label">${displayPrice}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterPageCatalog() {
  const q = document.getElementById('pageCatalogSearch').value.trim().toLowerCase();
  if (!q) {
    renderPageCatalogGrid();
    return;
  }
  const filtered = (DB[currentBrandId] || []).filter(p => p.name.toLowerCase().includes(q));
  renderPageCatalogGrid(filtered);
}
