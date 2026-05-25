import { useState, useEffect, useRef, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AboutPage from './pages/AboutPage.tsx';
import ServicePage from './pages/ServicePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import PartnersPage from './pages/PartnersPage.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import TermsOfServicePage from './pages/TermsOfServicePage.tsx';
import Footer from './components/Footer.tsx';
import './App.css';

interface Slide {
  image: string;
  title: string;
  tagline: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: '/images/banner1 lw.webp',
    title: 'Elevate Your Culinary Vision in the UAE',
    tagline: 'UAE\'s Premier Restaurant Consultancy',
    description: 'Little Talk helps UAE restaurants win with expert strategy, specialized training, and unforgettable dining experiences. From concept planning to operational excellence, we are your growth partners.'
  },
  {
    image: '/images/banner3 lw.webp',
    title: 'Expert Strategy & Specialized Training',
    tagline: 'Empowering Fine Dining & Culinary Venues',
    description: 'Elevate your kitchen and service performance. We deliver bespoke training programs, operational standards, and concept strategies tailored for premium culinary spaces.'
  },
  {
    image: '/images/banner2 lw copy 123.jpg',
    title: 'Unforgettable Guest Dining Experiences',
    tagline: 'From Concept Planning to Operational Excellence',
    description: 'We design complete sensory journeys. From atmospheric lighting and flow to curated menu storytelling, we ensure every guest experiences pure magic.'
  }
];

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Services', href: '/services', isRoute: true },
  { label: 'Products', href: '/products', isRoute: true },
  { label: 'Partners', href: '/partners', isRoute: true },
  { label: 'Contact Us', href: '/contact', isRoute: true }
];

const serviceOptions = [
  { value: 'restaurant-consulting', label: 'Restaurant Consulting & Planning' },
  { value: 'legal-docs', label: 'UAE Legal & Lab Documentation' },
  { value: 'staff-training', label: 'Staff Training & PHCA Pathway' },
  { value: 'lab-testing', label: 'Lab Testing Services' },
  { value: 'menu-prep', label: 'Menu Preparation & Engineering' },
  { value: 'business-transform', label: 'Business Transformation & ISO' },
  { value: 'product-inquiry', label: 'Product & Asset Inquiry' },
  { value: 'general', label: 'General Inquiry' }
];

function App() {
  const location = useLocation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<any>(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Custom dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Touch Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Scroll to hash on page load or navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  // Read router state for pre-selecting service on navigation
  useEffect(() => {
    if (location.state && (location.state as any).selectedService) {
      setSelectedService((location.state as any).selectedService);
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state so it doesn't trigger again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const getLinkHref = (link: typeof navigationLinks[0]) => {
    if (link.isRoute) return link.href;
    if (location.pathname !== '/') {
      return `/${link.href}`;
    }
    return link.href;
  };

  // Slider Handlers
  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(handleNext, 5000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, handleNext]);

  // Touch swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Scroll listener for Dynamic Island morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Click outside listener for custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Branded Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Utility Bar */}
        <div className={`top-utility-bar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="utility-container">
            <div className="utility-left">
              <a href="mailto:info@consultio.com" className="utility-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@consultio.com
              </a>
              <a href="tel:+971585960727" className="utility-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +971 58 59 60 727
              </a>
              <span className="utility-item hide-mobile">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Al Saqr Business Tower, 30th Floor, Sheikh Zayed Road, Dubai
              </span>
            </div>
            <div className="utility-right">
              <div className="utility-socials">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="header-container">
          <Link 
            to="/" 
            className="logo-container"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/images/little-talK-GREEN-LOGO-png-scaled.webp" 
              alt="Little Talk Logo" 
              className="logo-img" 
            />
            <div className="logo-text">
              <span className="logo-main">Little Talk</span>
              <span className="logo-sub">RESTAURANTS MANGEMENT LLC</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            {navigationLinks.map((link) => (
              'isRoute' in link && link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={getLinkHref(link)}
                  className="nav-link"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Elite Actions (Bilingual & CTA) */}
          <div className="header-actions">

            {/* Consultation CTA */}
            <Link to="/contact" className="btn btn-nav">
              <span>GET IN TOUCH</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="btn-touch-arrow">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <Link
            to="/"
            className="logo-container"
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src="/images/little-talK-GREEN-LOGO-png-scaled.webp"
              alt="Little Talk Logo"
              className="logo-img"
              style={{ height: '60px' }}
            />
            <div className="logo-text">
              <span className="logo-main">Little Talk</span>
              <span className="logo-sub">RESTAURANTS MANGEMENT LLC</span>
            </div>
          </Link>
          <button
            className="mobile-drawer-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="mobile-drawer-nav">
          {navigationLinks.map((link, idx) => (
            'isRoute' in link && link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="mobile-drawer-link"
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ) : (
              <a
                key={link.label}
                href={getLinkHref(link)}
                className="mobile-drawer-link"
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{link.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="mobile-drawer-cta">
          <Link
            to="/contact"
            className="btn btn-primary mobile-drawer-cta-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            <span>GET IN TOUCH</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mobile-drawer-contact">
          <div className="mobile-drawer-contact-label">CONTACT US</div>
          <a href="mailto:info@consultio.com" className="mobile-drawer-contact-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            info@consultio.com
          </a>
          <a href="tel:+971585960727" className="mobile-drawer-contact-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +971 58 59 60 727
          </a>
          <div className="mobile-drawer-contact-item no-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Al Saqr Business Tower, 30th Floor, Sheikh Zayed Road, Dubai
          </div>
        </div>

        {/* Social Icons */}
        <div className="mobile-drawer-socials">
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
      </nav>

      <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="*" element={
      <>
      {/* Main Landing Content */}
      <main id="home">
        {/* Full-screen Immersive Hero Slider */}
        <section className="hero-slider-section">
          <div
            className="slider-wrapper"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Background Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.image}
                className={`slide ${index === activeSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url("${slide.image}")` }}
              >
                {/* Subtle scrim overlay for readability */}
                <div className="slide-overlay"></div>
              </div>
            ))}

            {/* Content Card Overlay */}
            <div className="hero-content-container">
              <div className="hero-grid-layout">
                {/* Left Column: Text & CTA */}
                <div className="hero-left-col">
                  <div className="hero-text-content">
                    <div className="hero-star-badge">
                      <span className="badge-text">CONSULTING COMPANY, WITH 10+ YEARS</span>
                    </div>
                    <h1 className="hero-title">
                      Elevate Your Culinary Vision with the Best Restaurant Consultancy in UAE.
                    </h1>
                    <p className="hero-description">
                      Little Talk helps UAE restaurants win with expert strategy, specialized training, and unforgettable dining experiences. From concept planning to operational excellence, we are your growth partners in the Middle East and beyond.
                    </p>
                    <div className="hero-buttons">
                      <Link to="/services" className="btn btn-primary">
                        Explore Our Services
                        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                      <Link to="/contact" className="btn btn-secondary">
                        Get a Consultation
                        <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Dots Indicators */}
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section — Redesigned from Zero with Premium Parallax Depth */}
        <section id="about" className="premium-about-section" ref={(el) => {
          if (!el) {
            const oldHandler = (window as any).__aboutScrollHandler;
            if (oldHandler) {
              window.removeEventListener('scroll', oldHandler);
            }
            return;
          }
          
          const bgLayer = el.querySelector('.premium-about-bg') as HTMLElement;
          const glassContainer = el.querySelector('.premium-about-glass-container') as HTMLElement;
          
          const handleParallax = () => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
              if (bgLayer) bgLayer.style.transform = `translateY(${(scrollPercent - 0.5) * 90}px) scale(1.05)`;
              if (glassContainer) glassContainer.style.transform = `translateY(${(scrollPercent - 0.5) * -50}px)`;
            }
          };
          
          const oldHandler = (window as any).__aboutScrollHandler;
          if (oldHandler) {
            window.removeEventListener('scroll', oldHandler);
          }
          
          window.addEventListener('scroll', handleParallax, { passive: true });
          (window as any).__aboutScrollHandler = handleParallax;
          
          const revealEls = el.querySelectorAll('.reveal-fade-up');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          
          {/* Depth Layer 1: Ambient Parallax Background Image */}
          <div className="premium-about-bg"></div>
          
          {/* Depth Layer 2: Glossy Overlay to blend sections together */}
          <div className="premium-about-overlay"></div>
          
          {/* Depth Layer 3: Floating Premium Content Area */}
          <div className="premium-about-container">
            <div className="premium-about-glass-container reveal-fade-up">
              
              {/* Decorative Luxury Corner Borders */}
              <div className="corner-border top-left"></div>
              <div className="corner-border top-right"></div>
              <div className="corner-border bottom-left"></div>
              <div className="corner-border bottom-right"></div>

              {/* Header Title Grid */}
              <div className="premium-about-header">
                <div className="premium-about-title-wrapper reveal-fade-up">
                  <h2 className="premium-about-title">
                    Who is <span className="brand-gradient-text">Little Talk?</span>
                  </h2>
                </div>
              </div>

              {/* Content Narrative Block */}
              <div className="premium-about-narrative-block reveal-fade-up">
                <p className="premium-about-body-unified">
                  Based in Dubai and growing across India and the Middle East, Little Talk is a multidisciplinary consultancy firm. We bridge the gap between creative culinary ideas and structured business success. Our team comprises world-class experts in ISO standards, food safety, digital transformation, and corporate governance.
                </p>
              </div>

              {/* Cards Grid: Vision & Mission */}
              <div className="premium-about-cards">
                
                {/* Vision Card */}
                <div className="premium-vm-card vision reveal-fade-up">
                  <h3>Our Vision</h3>
                  <p>
                    To be the leading provider of innovative and exceptional restaurant management solutions, empowering our clients to deliver memorable dining experiences while ensuring operational excellence, sustainability, and growth.
                  </p>
                </div>

                {/* Mission Card */}
                <div className="premium-vm-card mission reveal-fade-up">
                  <h3>Our Mission</h3>
                  <p>
                    To provide tailored, comprehensive management services that enhance the efficiency, profitability, and customer satisfaction of restaurants through strategic planning, training, and quality control.
                  </p>
                </div>

              </div>
              
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section" ref={(el) => {
          if (!el) return;
          // Parallax scroll handler
          const parallaxBg = el.querySelector('.services-parallax-bg') as HTMLElement;
          const handleParallax = () => {
            if (!parallaxBg) return;
            const rect = el.getBoundingClientRect();
            const scrollPercent = -rect.top / window.innerHeight;
            parallaxBg.style.transform = `translateY(${scrollPercent * 60}px)`;
          };
          window.addEventListener('scroll', handleParallax, { passive: true });

          // IntersectionObserver for scroll reveals
          const revealEls = el.querySelectorAll(
            '.services-badge, .services-main-title, .services-main-subtitle, .service-card-v2'
          );
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          {/* Parallax Hero Banner */}
          <div className="services-parallax-banner">
            <div className="services-parallax-bg"></div>
            <div className="services-parallax-overlay"></div>
            <div className="services-parallax-content">
              <div className="services-badge">
                SERVICES WE OFFER
              </div>
              <h2 className="services-main-title">
                Bespoke Strategic Solutions for Global Restaurant Brands.
              </h2>
              <p className="services-main-subtitle">
                From concept planning and corporate governance to ISO certification and lab testing, we deliver end-to-end operational excellence.
              </p>
            </div>
          </div>

          {/* Content Layer */}
          <div className="services-content-layer">
            <div className="services-content-inner">
              <div className="services-grid">
                {/* Card 1 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/services_hero.png" 
                      alt="Restaurant Consulting & Planning" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>Restaurant Consulting & Planning</h3>
                    <p>Expert guidance from concept to launch.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/service_legal.png" 
                      alt="UAE Legal & Lab Documentation" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>UAE Legal & Lab Documentation</h3>
                    <p>Navigating local regulations, permits, and compliance with ease.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/service_training.png" 
                      alt="Staff Training" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>Staff Training</h3>
                    <p>Professional soft skills, food safety, and management training to empower your team.</p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/service_testing.png" 
                      alt="Lab Testing Services" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>Lab Testing Services</h3>
                    <p>Ensuring the highest standards of hygiene and quality through rigorous testing.</p>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/service_menu.png" 
                      alt="Menu Preparation" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>Menu Preparation</h3>
                    <p>Creative and cost-effective menu engineering to delight your guests.</p>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="service-card-v2">
                  <div className="service-img-wrapper">
                    <img 
                      src="/images/service_transform.png" 
                      alt="Business Transformation" 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-card-content">
                    <h3>Business Transformation</h3>
                    <p>ISO consultancy, ESG & sustainability, and business process re-engineering.</p>
                  </div>
                </div>
              </div>

              {/* Centered 'More Services' CTA */}
              <div className="services-more-container">
                <Link to="/services" className="btn btn-secondary services-more-btn">
                  <span>more</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="products-section" ref={(el) => {
          if (!el) return;
          // Parallax scroll handler
          const parallaxBg = el.querySelector('.products-parallax-bg') as HTMLElement;
          const handleParallax = () => {
            if (!parallaxBg) return;
            const rect = el.getBoundingClientRect();
            const scrollPercent = -rect.top / window.innerHeight;
            parallaxBg.style.transform = `translateY(${scrollPercent * 60}px)`;
          };
          window.addEventListener('scroll', handleParallax, { passive: true });

          // IntersectionObserver for scroll reveals
          const revealEls = el.querySelectorAll(
            '.products-badge, .products-main-title, .products-main-subtitle, .product-card'
          );
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          {/* Parallax Hero Banner */}
          <div className="products-parallax-banner">
            <div className="products-parallax-bg"></div>
            <div className="products-parallax-overlay"></div>
            <div className="products-parallax-content">
              <div className="products-badge">
                PREMIUM PRODUCT SOLUTIONS
              </div>
              <h2 className="products-main-title">
                High-End Mobile Kitchens & Vending Infrastructure.
              </h2>
              <p className="products-main-subtitle">
                Fueling food-service mobility and automated scaling across the Middle East with state-of-the-art logistics and culinary assets.
              </p>
            </div>
          </div>

          {/* Content Layer */}
          <div className="products-content-layer">
            <div className="products-content-inner">
              <div className="products-grid">
                {/* Product 1 */}
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      src="/images/food truck.jpg" 
                      alt="Custom Food Trucks" 
                      className="product-card-img"
                    />
                    <div className="product-img-overlay"></div>
                  </div>
                  <div className="product-card-content">
                    <h3>Custom Food Trucks</h3>
                    <p>Fully equipped mobile kitchens designed for modern brands.</p>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      src="/images/coffe.jpg" 
                      alt="Professional Coffee Machines" 
                      className="product-card-img"
                    />
                    <div className="product-img-overlay"></div>
                  </div>
                  <div className="product-card-content">
                    <h3>Professional Coffee Machines</h3>
                    <p>State-of-the-art brewing technology for the perfect cup.</p>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img 
                      src="/images/vend.jpg" 
                      alt="Vending Machines" 
                      className="product-card-img"
                    />
                    <div className="product-img-overlay"></div>
                  </div>
                  <div className="product-card-content">
                    <h3>Vending Machines</h3>
                    <p>Smart automated solutions for snacks and beverages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section — Redesigned with Premium Parallax & Frosted Silver-Glass */}
        <section id="partners" className="premium-partners-section" ref={(el) => {
          if (!el) {
            const oldHandler = (window as any).__partnersScrollHandler;
            if (oldHandler) {
              window.removeEventListener('scroll', oldHandler);
            }
            return;
          }
          
          const container = el.querySelector('.premium-partners-container') as HTMLElement;
          
          const handleParallax = () => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
              if (container) container.style.transform = `translateY(${(scrollPercent - 0.5) * -35}px)`;
            }
          };
          
          const oldHandler = (window as any).__partnersScrollHandler;
          if (oldHandler) {
            window.removeEventListener('scroll', oldHandler);
          }
          
          window.addEventListener('scroll', handleParallax, { passive: true });
          (window as any).__partnersScrollHandler = handleParallax;
          
          const revealEls = el.querySelectorAll('.reveal-fade-up');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          
          {/* Depth Layer 1: Vignette Overlay */}
          <div className="premium-partners-overlay"></div>
          
          {/* Depth Layer 2: Main Floating Content */}
          <div className="premium-partners-container">
            <div className="premium-partners-content">
              
              {/* Header Title Block */}
              <div className="premium-partners-header reveal-fade-up">
                <span className="premium-partners-subtitle">Partner Ecosystem</span>
                <h2 className="premium-partners-title">
                  Our Global <span className="brand-gradient-text">Tie-ups</span>
                </h2>
                <div className="accent-bar-glow"></div>
                <p className="premium-partners-desc">
                  We collaborate with industry leaders to provide a 360-degree support system for our clients:
                </p>
              </div>

              {/* Infinite Scrolling Partner Logos Marquee */}
              <div className="premium-partners-marquee-container reveal-fade-up">
                <div className="premium-partners-marquee-track">
                  
                  {/* Set 1 */}
                  <div className="premium-partner-card">
                    <div className="partner-logo logo-macadz">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="32" height="32" rx="8" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
                        <path d="M11 25V15L16 20L21 15V25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="28" cy="15" r="2.5" fill="#81D742"/>
                        <path d="M25 25L28 19L31 25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">Mac<span className="text-lime">Adz</span></span>
                        <span className="logo-txt-sub">DIGITAL SOLUTIONS</span>
                      </div>
                    </div>
                    <p>For cutting-edge Digital Marketing & Support.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-lawman">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5L32 10V21C32 27.5 27 32.5 20 35C13 32.5 8 27.5 8 21V10L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M15 15H25M17 15V25M23 15V25M20 28V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">LAW<span className="text-lime">MAN</span></span>
                        <span className="logo-txt-sub">LEGAL ADVISORY</span>
                      </div>
                    </div>
                    <p>For expert Legal Consultancy and compliance.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-duedrops">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 33C26.6274 33 32 27.6274 32 21C32 14.3726 20 5 20 5C20 5 8 14.3726 8 21C8 27.6274 13.3726 33 20 33Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M20 12C20 12 25 17 25 21C25 23.7614 22.7614 26 20 26" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">due<span className="text-lime">drops</span></span>
                        <span className="logo-txt-sub">BAKERY SUPPLIES</span>
                      </div>
                    </div>
                    <p>Premium cake and pastry supplies.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-interscience">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
                        <path d="M15 12H25M17 12V18L13 25C12.5 25.8 13.1 27 14 27H26C26.9 27 27.5 25.8 27 25L23 18V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 22H24" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">Inter<span className="text-lime">Science</span></span>
                        <span className="logo-txt-sub">LABORATORY</span>
                      </div>
                    </div>
                    <p>Our trusted partner for food testing and analysis.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-phca">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5L32 9V20C32 26.5 27.2 31.8 20 34.5C12.8 31.8 8 26.5 8 20V9L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M14 15L20 11L26 15V22C26 24 23.5 27 20 28.5C16.5 27 14 24 14 22V15Z" stroke="#81D742" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="20" cy="18" r="2" fill="#81D742"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">PH<span className="text-lime">CA</span></span>
                        <span className="logo-txt-sub">CULINARY ACADEMY</span>
                      </div>
                    </div>
                    <p>Accredited training and Australian career relocation pathways.</p>
                  </div>

                  {/* Set 2 (Duplicate for Seamless Scroll) */}
                  <div className="premium-partner-card">
                    <div className="partner-logo logo-macadz">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="32" height="32" rx="8" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
                        <path d="M11 25V15L16 20L21 15V25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="28" cy="15" r="2.5" fill="#81D742"/>
                        <path d="M25 25L28 19L31 25" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">Mac<span className="text-lime">Adz</span></span>
                        <span className="logo-txt-sub">DIGITAL SOLUTIONS</span>
                      </div>
                    </div>
                    <p>For cutting-edge Digital Marketing & Support.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-lawman">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5L32 10V21C32 27.5 27 32.5 20 35C13 32.5 8 27.5 8 21V10L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M15 15H25M17 15V25M23 15V25M20 28V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">LAW<span className="text-lime">MAN</span></span>
                        <span className="logo-txt-sub">LEGAL ADVISORY</span>
                      </div>
                    </div>
                    <p>For expert Legal Consultancy and compliance.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-duedrops">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 33C26.6274 33 32 27.6274 32 21C32 14.3726 20 5 20 5C20 5 8 14.3726 8 21C8 27.6274 13.3726 33 20 33Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M20 12C20 12 25 17 25 21C25 23.7614 22.7614 26 20 26" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">due<span className="text-lime">drops</span></span>
                        <span className="logo-txt-sub">BAKERY SUPPLIES</span>
                      </div>
                    </div>
                    <p>Premium cake and pastry supplies.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-interscience">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)"/>
                        <path d="M15 12H25M17 12V18L13 25C12.5 25.8 13.1 27 14 27H26C26.9 27 27.5 25.8 27 25L23 18V12" stroke="#81D742" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 22H24" stroke="#81D742" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">Inter<span className="text-lime">Science</span></span>
                        <span className="logo-txt-sub">LABORATORY</span>
                      </div>
                    </div>
                    <p>Our trusted partner for food testing and analysis.</p>
                  </div>

                  <div className="premium-partner-card">
                    <div className="partner-logo logo-phca">
                      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5L32 9V20C32 26.5 27.2 31.8 20 34.5C12.8 31.8 8 26.5 8 20V9L20 5Z" stroke="#81D742" strokeWidth="2" fill="rgba(129, 215, 66, 0.05)" strokeLinejoin="round"/>
                        <path d="M14 15L20 11L26 15V22C26 24 23.5 27 20 28.5C16.5 27 14 24 14 22V15Z" stroke="#81D742" strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="20" cy="18" r="2" fill="#81D742"/>
                      </svg>
                      <div className="partner-logo-text">
                        <span className="logo-txt-main">PH<span className="text-lime">CA</span></span>
                        <span className="logo-txt-sub">CULINARY ACADEMY</span>
                      </div>
                    </div>
                    <p>Accredited training and Australian career relocation pathways.</p>
                  </div>

                </div>
              </div>

              {/* Australia Pathway Callout Banner */}
              <div className="premium-career-banner reveal-fade-up">
                <div className="banner-glow-spot"></div>
                <div className="banner-left-content">
                  <div className="banner-badge-box">
                    <svg className="banner-badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span>EDUCATION & CAREER PATHWAY</span>
                  </div>
                  <h3>Upskill & Relocate to Australia</h3>
                  <p>
                    Through our elite partnership with PHCA, we offer students and hospitality staff premium educational training courses and placement pathways directly to Australia.
                  </p>
                </div>
                <Link to="/partners" className="btn btn-primary banner-cta-btn">
                  <span>Explore Opportunities</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Why Choose Us Section — Editorial Split Layout with Laser Rows */}
        <section id="why-choose-us" className="premium-why-us-section" ref={(el) => {
          if (!el) return;
          const revealEls = el.querySelectorAll('.reveal-fade-up');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          
          {/* Ambient Radial Glow Spotlights */}
          <div className="premium-why-us-glow-spot left"></div>
          <div className="premium-why-us-glow-spot right"></div>

          <div className="premium-why-us-container">
            
            {/* Asymmetric Split Layout */}
            <div className="why-us-split-layout">
              
              {/* Left Panel: Editorial Context */}
              <div className="why-us-left-panel reveal-fade-up">
                <span className="premium-why-us-subtitle">Global Reach, Local Expertise</span>
                <h2 className="premium-why-us-title">
                  Why Choose <span className="brand-gradient-text">Us</span>
                </h2>
                <div className="accent-bar-glow"></div>
                <p className="premium-why-us-desc">
                  With an active corporate presence in Qatar, Kuwait, Saudi Arabia, Oman, Australia, USA, UK, and Canada, we bring international best practices to your local doorstep.
                </p>
              </div>

              {/* Right Panel: Laser Row Features */}
              <div className="why-us-rows-panel">

                {/* Row 1: Food Safety & Engineering */}
                <div className="why-us-laser-row reveal-fade-up">
                  <span className="row-number">01</span>
                  <div className="row-icon-wrapper">
                    <svg className="row-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M12 12v.01" />
                      <path d="M12 8v1" />
                      <path d="M12 15v1" />
                      <path d="M8 12h1" />
                      <path d="M15 12h1" />
                    </svg>
                  </div>
                  <div className="row-text-content">
                    <h3>Food Safety & Engineering</h3>
                    <p>Ensuring state-of-the-art kitchen safety standards and mechanical layouts.</p>
                  </div>
                </div>

                {/* Row 2: Microbiologists & Healthcare */}
                <div className="why-us-laser-row reveal-fade-up">
                  <span className="row-number">02</span>
                  <div className="row-icon-wrapper">
                    <svg className="row-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2v6.226l-6.559 11.36A2 2 0 0 0 5.176 22h13.648a2 2 0 0 0 1.735-2.973L14 8.226V2" />
                      <path d="M8.5 2h7" />
                      <path d="M4.615 15h14.77" />
                      <circle cx="12" cy="18" r="1.5" />
                      <path d="M14 12a2 2 0 0 0-4 0" />
                    </svg>
                  </div>
                  <div className="row-text-content">
                    <h3>Microbiologists & Healthcare</h3>
                    <p>Backed by medical research and deep hygiene compliance protocols.</p>
                  </div>
                </div>

                {/* Row 3: IT & Cybersecurity */}
                <div className="why-us-laser-row reveal-fade-up">
                  <span className="row-number">03</span>
                  <div className="row-icon-wrapper">
                    <svg className="row-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v7" />
                      <path d="M12 15v7" />
                      <path d="M2 12h7" />
                      <path d="M15 12h7" />
                      <path d="M4.9 4.9l3.6 3.6" />
                      <path d="M19.1 19.1l-3.6-3.6" />
                      <path d="M4.9 19.1l3.6-3.6" />
                      <path d="M19.1 4.9l-3.6 3.6" />
                    </svg>
                  </div>
                  <div className="row-text-content">
                    <h3>IT & Cybersecurity</h3>
                    <p>Safeguarding point-of-sale systems, customer data, and tech integration.</p>
                  </div>
                </div>

                {/* Row 4: ISO & Quality Management */}
                <div className="why-us-laser-row reveal-fade-up">
                  <span className="row-number">04</span>
                  <div className="row-icon-wrapper">
                    <svg className="row-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="row-text-content">
                    <h3>ISO & Quality Management</h3>
                    <p>Standardizing F&B procedures to unlock scale, audit success, and F&B brand growth.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section (Premium Redesign) */}
        <section id="reviews" className="premium-reviews-section" ref={(el) => {
          if (!el) return;
          const revealEls = el.querySelectorAll('.reveal-fade-up');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          
          {/* Ambient Glow */}
          <div className="premium-reviews-glow-spot"></div>

          <div className="premium-reviews-container">
            
            <div className="premium-reviews-header reveal-fade-up">
              <span className="premium-reviews-subtitle">Real Client Feedback</span>
              <h2 className="premium-reviews-title">
                Customer <span className="brand-gradient-text">Reviews</span>
              </h2>
              <div className="accent-bar-glow"></div>
            </div>
            
            <div className="premium-reviews-grid">
              {/* Review 1 */}
              <div className="premium-review-card reveal-fade-up">
                <div className="stars-box">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx} className="star-char">{star}</span>
                  ))}
                </div>
                <p className="review-text">
                  "Little Talk completely transformed our kitchen operations. Their training protocols helped us achieve an A-grade hygiene rating in Dubai."
                </p>
                <div className="review-author">
                  <div className="author-avatar">TH</div>
                  <div className="author-info">
                    <h4>Tariq Al-Hashimi</h4>
                    <span>Executive Chef, Fine Dining</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="premium-review-card reveal-fade-up">
                <div className="stars-box">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx} className="star-char">{star}</span>
                  ))}
                </div>
                <p className="review-text">
                  "Their ISO compliance advice was flawless. Navigating UAE documentation was completely stress-free with Lawman's legal synergy."
                </p>
                <div className="review-author">
                  <div className="author-avatar">SM</div>
                  <div className="author-info">
                    <h4>Sara Al-Mansoori</h4>
                    <span>F&B Director, Luxury Hotel</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="premium-review-card reveal-fade-up">
                <div className="stars-box">
                  {"★★★★★".split("").map((star, idx) => (
                    <span key={idx} className="star-char">{star}</span>
                  ))}
                </div>
                <p className="review-text">
                  "Our staff training has reached new levels. The pathway opportunity for students is an outstanding addition to culinary academy programs."
                </p>
                <div className="review-author">
                  <div className="author-avatar">MK</div>
                  <div className="author-info">
                    <h4>Michael Kelly</h4>
                    <span>Dean, PHCA Academy</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Connect Us Section (Premium Redesign) */}
        <section id="contact" className="premium-contact-section" ref={(el) => {
          if (!el) return;
          const revealEls = el.querySelectorAll('.reveal-fade-up');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active');
                }
              });
            },
            { threshold: 0.1 }
          );
          revealEls.forEach((revealEl) => observer.observe(revealEl));
        }}>
          {/* Ambient Glow */}
          <div className="premium-contact-glow-spot"></div>

          <div className="premium-contact-container">
            <div className="premium-contact-card reveal-fade-up">
              <span className="premium-contact-subtitle">Get in Touch</span>
              <h2 className="premium-contact-title">
                Connect <span className="brand-gradient-text">us.</span>
              </h2>
              
              <form className="premium-contact-form" onSubmit={(e) => e.preventDefault()}>
                
                <div className="form-group-row-premium">
                  <input type="text" placeholder="Full Name" required className="form-input-premium" />
                  <input type="email" placeholder="Email Address" required className="form-input-premium" />
                </div>
                
                <div className="form-group-row-premium">
                  <input type="text" placeholder="Company / Restaurant Name" className="form-input-premium" />
                  <input type="tel" placeholder="Phone Number" className="form-input-premium" />
                </div>

                <div className="form-group-full-premium">
                  <div className="custom-dropdown-container" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`custom-dropdown-trigger ${selectedService ? 'has-value' : ''} ${isDropdownOpen ? 'is-open' : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>
                        {serviceOptions.find(opt => opt.value === selectedService)?.label || 'Select Service of Interest'}
                      </span>
                      <svg className="dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="custom-dropdown-menu">
                        {serviceOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`custom-dropdown-option ${selectedService === option.value ? 'is-selected' : ''}`}
                            onClick={() => {
                              setSelectedService(option.value);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Hidden select to preserve standard HTML5 validation and submission */}
                    <select
                      name="service"
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      style={{
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: '0',
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: '0',
                      }}
                    >
                      <option value="" disabled>Select Service of Interest</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group-full-premium">
                  <textarea 
                    placeholder="Tell us about your project or operational needs..." 
                    required 
                    className="form-input-premium form-textarea-premium"
                    rows={4}
                  ></textarea>
                </div>

                <div className="form-submit-row-premium">
                  <button type="submit" className="btn btn-primary submit-btn-premium">
                    <span>Submit Inquiry</span>
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
    } />
    </Routes>
    </>
  );
}

export default App;
