import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../api/client.ts';
import type { ServiceItem } from '../types/cms.ts';
import Footer from '../components/Footer.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import EmptyState from '../components/EmptyState.tsx';
import './ServicePage.css';

export default function ServicePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getServices()
      .then((data) => {
        if (!cancelled) {
          setServicesData(data);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
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

    const sections = [heroRef.current, servicesRef.current];
    sections.forEach((section) => {
      if (section) {
        const revealEls = section.querySelectorAll('.reveal-fade-up');
        revealEls.forEach((el) => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const handleInquiry = (serviceKey: string) => {
    navigate('/contact', { state: { selectedService: serviceKey } });
  };

  return (
    <>
      {/* Services Hero Section */}
      <section className="services-page-hero" ref={heroRef}>
        <div className="services-page-hero-glow"></div>
        
        <div className="services-page-hero-container">
          <Breadcrumbs />
          <div className="services-page-hero-content reveal-fade-up">
            <span className="services-page-hero-label">What We Deliver</span>
            <h1 className="services-page-hero-title">
              Our <span className="brand-gradient-text">Services.</span>
            </h1>
            <div className="services-page-hero-divider"></div>
            <p className="services-page-hero-subtitle">
              From concept formulation to corporate governance and microbiological testing, we offer premium end-to-end consulting solutions designed for the GCC’s top culinary and hospitality brands.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Catalog Grid Section */}
      <section className="services-catalog-section" ref={servicesRef}>
        <div className="services-catalog-glow-1"></div>
        <div className="services-catalog-glow-2"></div>
        
        <div className="services-catalog-container">
          {isLoading ? (
            <div className="services-catalog-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index} 
                  className="service-detail-card"
                  style={{ opacity: 1, transform: 'none' }}
                >
                  <div className="service-detail-image-wrapper">
                    <div className="skeleton-shimmer skeleton-block" style={{ width: '100%', height: '100%' }} />
                  </div>
                  
                  <div className="service-detail-content">
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '28px', width: '75%', marginBottom: '12px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '45%', marginBottom: '24px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '90%', marginBottom: '28px' }} />
                    
                    <div style={{ marginBottom: '28px', flexGrow: 1 }}>
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '80%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '70%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '85%' }} />
                    </div>
                    
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '52px', borderRadius: '12px', width: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <EmptyState
              title="Unable to Load Services"
              description="Please ensure the API server is running and try again."
            />
          ) : servicesData.length === 0 ? (
            <EmptyState 
              title="No Services Found" 
              description="We are currently restructuring our service offerings. Please contact us for custom inquiries."
            />
          ) : (
            <div className="services-catalog-grid">
              {servicesData.map((service, index) => (
                <div 
                  key={service.slug} 
                  className="service-detail-card reveal-fade-up"
                  style={{ transitionDelay: `${0.1 + (index % 3) * 0.1}s` }}
                >
                  <div className="service-detail-image-wrapper">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="service-detail-image"
                      loading="lazy"
                    />
                    <div className="service-detail-image-overlay"></div>
                    <div className="service-detail-tag">{service.tagline}</div>
                  </div>
                  
                  <div className="service-detail-content">
                    <h2 className="service-detail-title">{service.title}</h2>
                    <p className="service-detail-desc">{service.description}</p>
                    
                    <div className="service-bullets-container">
                      <span className="service-bullets-title">Key Offerings</span>
                      <ul className="service-bullets-list">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="service-bullet-item">
                            <svg className="service-bullet-bullet" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => handleInquiry(service.selectKey)}
                      className="btn btn-primary service-inquiry-btn"
                    >
                      <span>Inquire About This Service</span>
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
