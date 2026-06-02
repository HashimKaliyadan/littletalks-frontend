import { useState, useEffect, useRef } from 'react';
import { getPartners } from '../api/client.ts';
import type { PartnerItem } from '../types/cms.ts';
import PartnerLogo from '../components/PartnerLogo.tsx';
import Footer from '../components/Footer.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import EmptyState from '../components/EmptyState.tsx';
import './PartnersPage.css';

export default function PartnersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

  const [partnersData, setPartnersData] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPartners()
      .then((data) => {
        if (!cancelled) {
          setPartnersData(data);
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

    const sections = [heroRef.current, partnersRef.current];
    sections.forEach((section) => {
      if (section) {
        const revealEls = section.querySelectorAll('.reveal-fade-up');
        revealEls.forEach((el) => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, [isLoading]);


  return (
    <>
      {/* Partners Hero Section */}
      <section className="partners-page-hero" ref={heroRef}>
        <div className="partners-page-hero-glow"></div>
        <div className="partners-page-hero-container">
          <Breadcrumbs />
          <div className="partners-page-hero-content reveal-fade-up">
            <span className="partners-page-hero-label">Partner Ecosystem</span>
            <h1 className="partners-page-hero-title">
              Our <span className="brand-gradient-text">Partners.</span>
            </h1>
            <div className="partners-page-hero-divider"></div>
            <p className="partners-page-hero-subtitle">
              We collaborate with industry-leading organizations, laboratory networks, and educational academies to provide a comprehensive, 360-degree support system for GCC F&B brands.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Catalog Grid Section */}
      <section className="partners-catalog-section" ref={partnersRef}>
        <div className="partners-catalog-glow-1"></div>
        <div className="partners-catalog-glow-2"></div>
        
        <div className="partners-catalog-container">
          {isLoading ? (
            <div className="partners-catalog-grid">
              {Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={index} 
                  className="partner-detail-card"
                  style={{ opacity: 1, transform: 'none' }}
                >
                  <div className="partner-detail-logo-wrapper">
                    <div className="skeleton-shimmer skeleton-block" style={{ width: '180px', height: '36px', borderRadius: '8px' }} />
                  </div>
                  
                  <div className="partner-detail-content">
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '35%', marginBottom: '16px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
                    <div className="skeleton-shimmer skeleton-block" style={{ height: '14px', width: '92%', marginBottom: '24px' }} />
                    
                    <div className="partner-bullets-container">
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '16px', width: '25%', marginBottom: '16px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '80%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '70%', marginBottom: '12px' }} />
                      <div className="skeleton-shimmer skeleton-block" style={{ height: '12px', width: '75%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <EmptyState
              title="Unable to Load Partners"
              description="Please ensure the API server is running and try again."
            />
          ) : partnersData.length === 0 ? (
            <EmptyState 
              title="No Partners Listed" 
              description="We currently have no global associate tie-ups listed. Please contact us for more information on potential collaborations."
            />
          ) : (
            <div className="partners-catalog-grid">
              {partnersData.map((partner, index) => (
                <div 
                  key={partner.slug} 
                  className="partner-detail-card reveal-fade-up"
                  style={{ transitionDelay: `${0.1 + (index % 3) * 0.1}s` }}
                >
                  <div className="partner-detail-logo-wrapper">
                    <PartnerLogo logoKey={partner.logoKey} />
                  </div>
                  
                  <div className="partner-detail-content">
                    <span className="partner-detail-type">{partner.type}</span>
                    <p className="partner-detail-desc">{partner.description}</p>
                    
                    <div className="partner-bullets-container">
                      <span className="partner-bullets-title">Cooperation Focus</span>
                      <ul className="partner-bullets-list">
                        {partner.details.map((detail, idx) => (
                          <li key={idx} className="partner-bullet-item">
                            <svg className="partner-bullet-bullet" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
