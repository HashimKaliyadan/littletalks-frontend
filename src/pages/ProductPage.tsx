import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import EmptyState from '../components/EmptyState.tsx';
import './ProductPage.css';

interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  details: string[];
}

const productsData: ProductItem[] = [
  {
    id: 'food-trucks',
    title: 'Custom Food Trucks',
    tagline: 'Bespoke Mobile Culinary Hubs',
    image: '/images/food_truck.webp',
    description: 'High-performance, fully customized mobile kitchens designed to represent your brand on the move. Built with premium materials and optimized workflows for high-volume operations.',
    details: [
      'Custom stainless steel kitchen layout and counter design',
      'Certified gas manifold and electrical wiring installations',
      'High-capacity ventilation hoods and integrated fire suppression',
      'Dubai Municipality and Civil Defence approval compliance',
      'Premium chassis customization, vehicle wraps, and external LED branding'
    ]
  },
  {
    id: 'coffee-machines',
    title: 'Professional Coffee Machines',
    tagline: 'Precision Espresso Engineering',
    image: '/images/coffe.webp',
    description: 'Elite commercial espresso systems and grinding technology selected for professional baristas and high-throughput environments. Ensures consistency and speed in every extraction.',
    details: [
      'Multi-boiler heating technology with independent PID temperature control',
      'Volumetric dosing and programmable pre-infusion profiles',
      'Heavy-duty custom grinding burrs with micro-metrical adjustment',
      'Professional-grade water filtration and softening systems',
      'Dynamic steam wands and auto-frothing modules for rapid service'
    ]
  },
  {
    id: 'vending-machines',
    title: 'Smart Vending Machines',
    tagline: 'Automated Retail Solutions',
    image: '/images/vend.webp',
    description: 'Smart, automated dispensing kiosks designed for contact-free retail and 24/7 self-service convenience. Equipped with remote telemetry and secure digital payments.',
    details: [
      'Contactless card, mobile pay (Apple/Samsung Pay), and cash validator systems',
      'Smart telemetry cloud for real-time sales and inventory tracking',
      'Dual-zone high-efficiency cooling for fresh foods and beverages',
      'Drop-sensor product delivery assurance technology',
      'Sleek glass front and customizable vinyl wraps for corporate branding'
    ]
  }
];

export default function ProductPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Simulated 1.2-second network loading delay for products
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
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

    const sections = [heroRef.current, productsRef.current];
    sections.forEach((section) => {
      if (section) {
        const revealEls = section.querySelectorAll('.reveal-fade-up');
        revealEls.forEach((el) => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const handleInquiry = () => {
    navigate('/contact', { state: { selectedService: 'product-inquiry' } });
  };

  return (
    <>
      {/* Product Hero Section */}
      <section className="products-page-hero" ref={heroRef}>
        <div className="products-page-hero-glow"></div>
        
        <div className="products-page-hero-container">
          <Breadcrumbs />
          <div className="products-page-hero-content reveal-fade-up">
            <span className="products-page-hero-label">What We Equip</span>
            <h1 className="products-page-hero-title">
              Our <span className="brand-gradient-text">Products.</span>
            </h1>
            <div className="products-page-hero-divider"></div>
            <p className="products-page-hero-subtitle">
              Providing cutting-edge physical assets and mobile infrastructure for food service mobility and automated scaling across the Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Products Catalog Grid Section */}
      <section className="products-catalog-section" ref={productsRef}>
        <div className="products-catalog-glow-1"></div>
        <div className="products-catalog-glow-2"></div>
        
        <div className="products-catalog-container">
          {isLoading ? (
            <div className="products-catalog-grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={index} 
                  className="product-detail-card"
                  style={{ opacity: 1, transform: 'none' }}
                >
                  <div className="product-detail-image-wrapper">
                    <div className="skeleton-shimmer skeleton-block" style={{ width: '100%', height: '100%' }} />
                  </div>
                  
                  <div className="product-detail-content">
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '28px', width: '70%', marginBottom: '12px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '85%', marginBottom: '24px' }} />
                    
                    <div style={{ marginBottom: '24px', flexGrow: 1 }}>
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '16px', width: '35%', marginBottom: '16px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '80%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '75%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '85%' }} />
                    </div>
                    
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '52px', borderRadius: '12px', width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : productsData.length === 0 ? (
            <EmptyState 
              title="No Products Available" 
              description="We currently have no physical assets or kitchen equipment listed. Please check back later or contact us for custom requests."
            />
          ) : (
            <div className="products-catalog-grid">
              {productsData.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-detail-card reveal-fade-up"
                  style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
                >
                  <div className="product-detail-image-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="product-detail-image"
                      loading="lazy"
                    />
                    <div className="product-detail-image-overlay"></div>
                    <div className="product-detail-tag">{product.tagline}</div>
                  </div>
                  
                  <div className="product-detail-content">
                    <h2 className="product-detail-title">{product.title}</h2>
                    <p className="product-detail-desc">{product.description}</p>
                    
                    <div className="product-bullets-container">
                      <span className="product-bullets-title">Key Specifications</span>
                      <ul className="product-bullets-list">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="product-bullet-item">
                            <svg className="product-bullet-bullet" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={handleInquiry}
                      className="btn btn-primary product-inquiry-btn"
                    >
                      <span>Inquire About Product</span>
                      <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
