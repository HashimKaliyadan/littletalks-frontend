import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import './PartnersPage.css';

interface PartnerItem {
  id: string;
  name: string;
  type: string;
  description: string;
  details: string[];
  logo: React.ReactNode;
}

const partnersData: PartnerItem[] = [
  {
    id: 'interscience',
    name: 'Inter Science Laboratory',
    type: 'Laboratory & Analytical Partner',
    description: 'Our primary associate laboratory, InterScience, provides analytical services, microbiological food testing, chemical audits, and nutritional label audits to ensure international compliance standards.',
    details: [
      'ISO 17025 Accredited Laboratory Methods',
      'Swift Sample Retrieval & Technical Reporting',
      'Chemical & Pathogen Testing Verification',
      'Environmental & Ice Swab Diagnostics'
    ],
    logo: (
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
    )
  },
  {
    id: 'macadz',
    name: 'Mac Adz',
    type: 'Digital Transformation Partner',
    description: 'Our digital enablement associate, Mac Adz, partners with us to deliver high-performance F&B software, POS integrations, online marketing solutions, and custom brand designs.',
    details: [
      'Modern F&B Website Design & SEO',
      'Custom POS & E-Ordering Integrations',
      'Target Hospitality Social Media Marketing',
      'Technology Infrastructure Auditing'
    ],
    logo: (
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
    )
  },
  {
    id: 'lawman',
    name: 'Lawman',
    type: 'Corporate Legal & Advisory Partner',
    description: 'Our legal partner, Lawman, delivers corporate legal support, UAE restaurant licensing, municipality dispute resolution, and regulatory compliance consulting.',
    details: [
      'Dubai Trade License & Permit Clearance',
      'Labor Law & Employment Structuring',
      'Corporate Governance Frameworks',
      'Municipality Violation Dispute Assistance'
    ],
    logo: (
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
    )
  },
  {
    id: 'duedrops',
    name: 'Duedrops',
    type: 'Bakery & Supply Chain Partner',
    description: 'Duedrops is our premium associate supply chain partner, providing fine bakery, cake, and pastry ingredients to help restaurants engineer high-margin dessert menus.',
    details: [
      'Premium Baking Ingredient Sourcing',
      'Menu Engineering & Recipe Optimization',
      'Reliable cold-chain logistics across UAE',
      'Bulk Cost-Saving Audits for Pastry Operations'
    ],
    logo: (
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
    )
  },
  {
    id: 'phca',
    name: 'Pacific Hospitality & Culinary Academy (PHCA)',
    type: 'Vocational Training Partner',
    description: 'PHCA is our premier vocational training academy, delivering accredited food safety training, Person-In-Charge (PIC) certifications, and international employment pathways.',
    details: [
      'Certified PIC Level 2 & 3 Training',
      'Basic Food Hygiene (BFH) Qualifications',
      'Custom Culinary Service SOP Seminars',
      'Australia Hospitality Career Relocation Pathway'
    ],
    logo: (
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
    )
  }
];

export default function PartnersPage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);

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
  }, []);

  const handlePathwayInquiry = () => {
    navigate('/contact', { state: { selectedService: 'staff-training' } });
  };

  return (
    <>
      {/* Partners Hero Section */}
      <section className="partners-page-hero" ref={heroRef}>
        <div className="partners-page-hero-glow"></div>
        <div className="partners-page-hero-container">
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
          {/* Grid of Partners */}
          <div className="partners-catalog-grid">
            {partnersData.map((partner, index) => (
              <div 
                key={partner.id} 
                className="partner-detail-card reveal-fade-up"
                style={{ transitionDelay: `${0.1 + (index % 3) * 0.1}s` }}
              >
                <div className="partner-detail-logo-wrapper">
                  {partner.logo}
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

          {/* Australia Career Pathway Highlight Banner */}
          <div className="partners-career-banner reveal-fade-up">
            <div className="career-banner-glow"></div>
            <div className="career-banner-container">
              
              <div className="career-banner-left">
                <div className="career-badge-box">
                  <svg className="career-badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span>EDUCATION & CAREER PATHWAY</span>
                </div>
                <h2 className="career-banner-title">Upskill & Relocate to Australia</h2>
                <p className="career-banner-subtitle">
                  Through our elite partnership with PHCA, we offer students and hospitality staff premium educational training courses and placement pathways directly to Australia.
                </p>
                <ul className="career-bullets-grid">
                  <li>Accredited Hospitality Certifications</li>
                  <li>Visa & Interview Coaching</li>
                  <li>Paid Venue Internships in Australia</li>
                  <li>Pre-departure Support & Mentorship</li>
                </ul>
              </div>

              <div className="career-banner-right">
                <button 
                  onClick={handlePathwayInquiry}
                  className="btn btn-primary career-inquiry-btn"
                >
                  <span>Explore Relocation Pathway</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
