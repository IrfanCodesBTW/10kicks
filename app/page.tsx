import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScrollReveal, useHorizontalScroll } from '@/lib/animations';
import { useTilt3D } from '@/lib/animations/hooks/useTilt3D';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';
import Hero from '@/components/hero/Hero';
import ProductCard from '@/components/products/ProductCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { PRODUCTS } from '@/lib/data/products';
import { BRANDS } from '@/lib/data/brands';
import { useUI, useWishlist } from '@/lib/context/AppContext';

// Countdown digit micro-flip animator component
function CountdownUnit({ value, label }: { value: string; label: string }) {
  const [prevVal, setPrevVal] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevVal) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setPrevVal(value);
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevVal]);

  return (
    <div className="countdown-unit">
      <span className={`countdown-number ${animating ? 'digit-flip' : ''}`}>
        {value}
      </span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function Page() {
  const navigate = useNavigate();
  const { 
    openOverlay, 
    setSelectedProductId, 
    setSelectedSize, 
    setDetailQuantity, 
    showToast,
    setSelectedStoryId 
  } = useUI();
  const { toggleWishlist, isSaved } = useWishlist();
  
  const pageRef = useRef<HTMLDivElement>(null);
  const museumTrackRef = useRef<HTMLDivElement>(null);
  const museumOuterRef = useRef<HTMLDivElement>(null);
  const membershipCardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useTilt3D(membershipCardRef, 15);

  // Spotlight and Drops collection selection
  const spotlightProduct = PRODUCTS.find(p => p.id === 'nk2'); // Chicago Jordans
  const secondaryDrops = PRODUCTS.filter(p => ['nb1', 'yz1', 'as1'].includes(p.id));

  // Live timer countdown state
  const [days, setDays] = useState('03');
  const [hours, setHours] = useState('14');
  const [mins, setMins] = useState('22');
  const [secs, setSecs] = useState('10');

  useEffect(() => {
    // Generate dates targeted to next Friday 6:00 PM
    const nextDrop = new Date();
    nextDrop.setDate(nextDrop.getDate() + ((5 - nextDrop.getDay() + 7) % 7));
    nextDrop.setHours(18, 0, 0, 0);

    const timer = setInterval(() => {
      const diff = nextDrop.getTime() - new Date().getTime();
      if (diff <= 0) {
        setDays('00');
        setHours('00');
        setMins('00');
        setSecs('00');
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(String(d).padStart(2, '0'));
      setHours(String(h).padStart(2, '0'));
      setMins(String(m).padStart(2, '0'));
      setSecs(String(s).padStart(2, '0'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll-triggered reveals for all .reveal elements
  useScrollReveal(pageRef, { y: 40, duration: 0.8 });

  // Marquee parallax scroll animation
  useGSAP(() => {
    if (prefersReducedMotion) return;
    gsap.to('#bigTypeMarquee', {
      x: '-35%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.big-type-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }, { scope: pageRef, dependencies: [prefersReducedMotion] });

  // Horizontal museum drag + scroll
  useHorizontalScroll({
    trackRef: museumTrackRef,
    outerRef: museumOuterRef,
    dragEnabled: true,
    scrub: 1,
  });

  const handleSpotlightClick = (id: string) => {
    setSelectedProductId(id);
    setSelectedSize(null);
    setDetailQuantity(1);
    openOverlay('detailOverlay');
  };

  const getBrandSlug = (brandName: string) => {
    const name = brandName.toLowerCase();
    if (name.includes('jordan') || name.includes('dunk') || name.includes('travis') || name.includes('kobe') || name.includes('nike')) {
      return 'nike';
    }
    if (name.includes('yeezy')) return 'yeezy';
    if (name.includes('new balance')) return 'newbalance';
    if (name.includes('asics')) return 'asics';
    return name.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div ref={pageRef}>
      {/* Cinematic Hero */}
      <Hero />

      {/* ── IMMERSIVE TRUST METRIC BAR ── */}
      <section className="trust-bar section">
        <div className="trust-grid">
          <div className="trust-item reveal">
            <h3 className="trust-val">100%</h3>
            <span className="trust-label">Verified Authentic</span>
          </div>
          <div className="trust-item reveal">
            <h3 className="trust-val">2500+</h3>
            <span className="trust-label">Collectors Globally</span>
          </div>
          <div className="trust-item reveal">
            <h3 className="trust-val">24HR</h3>
            <span className="trust-label">Express Delivery</span>
          </div>
          <div className="trust-item reveal">
            <h3 className="trust-val">LIMITED</h3>
            <span className="trust-label">Weekly Releases</span>
          </div>
        </div>
      </section>

      {/* ── LUXURY BRAND RECOGNITION MATRIX ── */}
      <section className="luxury-brand-grid-section section">
        <div className="brand-logo-grid" id="brandLogoGrid">
          {[
            'Air Jordan', 'Yeezy', 'New Balance', 'Asics', 'Salomon', 'Nike Dunk',
            'Off-White', 'Fear Of God', 'Aime Leon Dore', 'Travis Scott', 'Kobe', "Arc'teryx"
          ].map((brand, idx) => (
            <button 
              key={idx} 
              type="button"
              className="brand-logo-card reveal"
              onClick={() => navigate(`/brand/${getBrandSlug(brand)}`)}
              aria-label={`View ${brand} Archive`}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* ── curations spotlight showcase ── */}
      <section id="drops" className="section">
        <div className="section-label reveal">Curated Collection</div>
        <h2 className="section-title reveal">This Season's<br />Spotlights</h2>
        <p className="section-desc reveal">
          A meticulously selected roster of silhouettes that transcend utility to define contemporary streetwear style.
        </p>

        {/* Asymmetrical Magazine Layout Grid */}
        <div className="featured-magazine-grid">
          {/* Main Chicago Jordan spotlight Left */}
          {spotlightProduct && (
            <div className="featured-spotlight reveal" onClick={() => handleSpotlightClick(spotlightProduct.id)}>
              <div className="spotlight-background-text">{spotlightProduct.brand.toUpperCase()}</div>
              <div className="spotlight-image-container">
                <img src={spotlightProduct.image} alt={spotlightProduct.name} loading="lazy" />
              </div>
              <div className="spotlight-editorial">
                <div className="product-brand-tag">GRAIL ARCHIVE // SPOTLIGHT</div>
                <h3 className="spotlight-quote">"The blueprint of contemporary sneaker heritage."</h3>
                <div className="spotlight-meta">
                  <div className="product-name-label" style={{ fontSize: 'var(--text-lg)' }}>{spotlightProduct.name}</div>
                  <div className="product-price-label" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-accent)' }}>
                    ₹{spotlightProduct.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <MagneticButton
                  as="button"
                  className="btn-luxury-cta"
                  style={{ marginTop: 'var(--space-4)', width: 'fit-content', padding: '0 var(--space-8)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpotlightClick(spotlightProduct.id);
                  }}
                  magneticOptions={{ strength: 0.35, area: 150 }}
                >
                  Reserve Pair &rarr;
                </MagneticButton>
              </div>
            </div>
          )}

          {/* Secondary support cards list Right */}
          <div className="featured-side-list">
            <div className="catalog-drawer-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
              {secondaryDrops.map((p, idx) => (
                <ProductCard key={p.id} product={p} tag={`EDITORIAL 0${idx + 2}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX BACKGROUND TYPOGRAPHY MARQUEE ── */}
      <div className="big-type-section" aria-hidden="true">
        <div className="big-type" id="bigTypeMarquee">
          <span>COLLECTORS</span>
          <span className="big-type-outline">ARCHIVE</span>
          <span className="big-type-accent">CULTURE</span>
          <span className="big-type-outline">LIMITED</span>
          <span>COLLECTORS</span>
          <span className="big-type-outline">ARCHIVE</span>
          <span className="big-type-accent">CULTURE</span>
          <span className="big-type-outline">LIMITED</span>
        </div>
      </div>

      {/* ── SEAMLESS HORIZONTAL MUSEUM ── */}
      <section id="universeOuter" className="brand-universe-wrapper" ref={museumOuterRef}>
        <div className="section">
          <div className="section-label" style={{ color: 'var(--color-gold)' }}>Brand Roster</div>
          <h2 className="section-title" style={{ color: '#F5F2EB' }}>The Brand Universe</h2>
          <p className="section-desc" style={{ color: 'var(--color-text-muted)' }}>
            A physical horizontal gallery showcasing premium silhouettes across seven historical footwear labels. Drag or scroll to browse.
          </p>
          
          <div id="universeTrack" className="universe-scroll-track" ref={museumTrackRef}>
            {BRANDS.map((b, i) => {
              const num = String(i + 1).padStart(2, '0');
              const productsCount = PRODUCTS.filter((p) => p.brand === b.id).length;
              return (
                <button 
                  key={b.id} 
                  type="button"
                  className="universe-panel" 
                  onClick={() => navigate(`/brand/${b.id}`)}
                  style={{ textAlign: 'left' }}
                  aria-label={`Explore ${b.name} Collection`}
                >
                  <div className="universe-panel-bg-text">{b.name.split(' ')[0]}</div>
                  <div className="universe-panel-num">{num}</div>
                  <h3 className="universe-panel-title">{b.name}</h3>
                  <p className="universe-panel-desc">{b.description}</p>
                  <div className="universe-panel-footer">
                    <span className="universe-panel-count">{productsCount} Curated Pieces</span>
                    <span className="universe-panel-link">Explore Collection &rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="drag-hint-wrap">
            <span>Hold & Drag to Pan Gallery</span>
            <span className="drag-arrow">&rarr;</span>
          </div>
        </div>
      </section>

      {/* ── ANALYTICAL ESSAY STORIES ── */}
      <section id="culture" className="section">
        <div className="section-label reveal">Culture Stories</div>
        <h2 className="section-title reveal">Beyond The Box</h2>
        <p className="section-desc reveal">
          Footwear is never just leather and rubber. Read our analytical narratives on design evolution, history, and collaborations.
        </p>

        <div className="stories-editorial-grid">
          <div 
            className="story-block reveal" 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              setSelectedStoryId('story1');
              openOverlay('storyOverlay');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedStoryId('story1');
                openOverlay('storyOverlay');
              }
            }}
            aria-label="Read Essay: The Anatomy of Grails"
          >
            <span className="story-date">Design &bull; June 2026</span>
            <h3 className="story-headline">The Anatomy of Grails</h3>
            <p className="story-excerpt">
              An examination of why certain silhouettes transcend commodity status to enter the realm of museum art and historical collectibles.
            </p>
            <span className="story-read-more">Read Essay</span>
          </div>

          <div 
            className="story-block reveal" 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              setSelectedStoryId('story2');
              openOverlay('storyOverlay');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedStoryId('story2');
                openOverlay('storyOverlay');
              }
            }}
            aria-label="Read Essay: Terrace Footwear Revival"
          >
            <span className="story-date">History &bull; May 2026</span>
            <h3 className="story-headline">Terrace Footwear Revival</h3>
            <p className="story-excerpt">
              Tracing the journey of low-profile court shoes from European football stands of the 80s to the fashion capital runways of modern Milan.
            </p>
            <span className="story-read-more">Read Essay</span>
          </div>

          <div 
            className="story-block reveal" 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              setSelectedStoryId('story3');
              openOverlay('storyOverlay');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedStoryId('story3');
                openOverlay('storyOverlay');
              }
            }}
            aria-label="Read Essay: Collaborative Alchemy"
          >
            <span className="story-date">Culture &bull; April 2026</span>
            <h3 className="story-headline">Collaborative Alchemy</h3>
            <p className="story-excerpt">
              How designers bridge high-fashion runways and rubber soles to construct storytelling models that resonate across youth cultures.
            </p>
            <span className="story-read-more">Read Essay</span>
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN launch calendar ── */}
      <section className="rare-drops-campaign" id="rare-drops">
        <div className="section">
          <div className="rare-campaign-grid">
            
            {/* Visual Ring Left */}
            <div className="countdown-showcase reveal">
              <div className="countdown-showcase-ring"></div>
              <img 
                src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600" 
                className="countdown-product-img" 
                alt="Asics Launch Spotlight" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600';
                }}
              />
            </div>

            {/* Timer detail panels Right */}
            <div className="countdown-content reveal">
              <div className="section-label" style={{ color: 'var(--color-gold)' }}>Paragraph Release Calendar</div>
              <h2 className="section-title" style={{ color: '#fff', marginBottom: 'var(--space-2)' }}>Asics Kayano 14</h2>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', fontStyle: 'italic' }}>
                The late 2000s technical running renaissance. Hand-numbered elements, premium mesh panels, and metallic birch finishes.
              </p>
              
              <div className="countdown-clock">
                <CountdownUnit value={days} label="Days" />
                <CountdownUnit value={hours} label="Hrs" />
                <CountdownUnit value={mins} label="Mins" />
                <CountdownUnit value={secs} label="Secs" />
              </div>

              <MagneticButton
                as="button"
                className="btn-luxury-cta"
                style={{ width: 'fit-content', padding: '0 var(--space-10)', cursor: 'pointer' }}
                onClick={() => handleSpotlightClick('as1')}
                magneticOptions={{ strength: 0.35, area: 150 }}
              >
                Reserve Placement &nbsp; &rarr;
              </MagneticButton>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── VIP BLACK MEMBER LOUNGE panel ── */}
      <section className="section membership-section">
        <div className="membership-container">
          <div className="reveal">
            <div className="section-label">VIP Concierge</div>
            <h2 className="section-title">10KICKS Black</h2>
            <p className="section-desc">
              Exclusivity is value. Gain access to private sneaker lockers, rare drops before general release, and private fashion house events.
            </p>
            
            <div className="membership-list">
              <div className="membership-item">
                <span className="membership-item-num">01</span>
                <span className="membership-item-text">Early private reservations on limited releases.</span>
              </div>
              <div className="membership-item">
                <span className="membership-item-num">02</span>
                <span className="membership-item-text">Concierge delivery service with secure tracking.</span>
              </div>
              <div className="membership-item">
                <span className="membership-item-num">03</span>
                <span className="membership-item-text">Verified collection portfolios with historical records.</span>
              </div>
            </div>

            <button 
              className="btn-luxury-cta" 
              onClick={() => showToast('VIP registration is currently invite-only.')}
              style={{ cursor: 'pointer' }}
            >
              Request Invitation
            </button>
          </div>

          <div className="membership-card-wrap reveal">
            <div ref={membershipCardRef} className="membership-black-card" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-top">
                <span className="card-brand-name">10KICKS</span>
                <span className="card-tier">BLACK MEMBER</span>
              </div>
              <div className="card-bottom">
                <div className="card-holder">
                  <span className="card-holder-label">Collector Portfolio</span>
                  <span className="card-holder-name">Verified Member</span>
                </div>
                <span className="card-number">•••• 8802</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
