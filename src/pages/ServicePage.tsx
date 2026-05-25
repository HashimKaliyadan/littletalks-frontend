import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import './ServicePage.css';

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  details: string[];
  selectKey: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'consulting',
    title: 'Restaurant Consulting & Planning',
    tagline: 'Concept to Launch Advisory',
    image: '/images/services_hero.png',
    description: 'Elevate your culinary space with strategic roadmap design. We partner with you from initial conceptual ideation to grand opening, ensuring operational synergy and culinary distinction.',
    details: [
      'F&B Concept Development & Brand Positioning',
      'Kitchen Workflow & Space Layout Design',
      'Feasibility Studies & Financial Modelling',
      'Pre-Opening Project Management & Checklists',
      'Operational Audits & SOP Formulation'
    ],
    selectKey: 'restaurant-consulting'
  },
  {
    id: 'legal',
    title: 'UAE Legal & Lab Documentation',
    tagline: 'Regulatory & Compliance Pathways',
    image: '/images/service_legal.png',
    description: 'Navigate the complex landscape of UAE regulations seamlessly. We handle municipality registrations, chemical laboratory filings, and trade requirements so you can focus on hospitality.',
    details: [
      'Dubai Municipality Portal Setup & Approvals',
      'Food Safety Permit & Trade License Clearance',
      'Laboratory Sample Documentation & Tracking',
      'Health & Safety Regulatory Compliance Audits',
      'Permits for Temporary & Special Events'
    ],
    selectKey: 'legal-docs'
  },
  {
    id: 'training',
    title: 'Staff Training & PHCA Pathway',
    tagline: 'Human Capital Excellence',
    image: '/images/service_training.png',
    description: 'Empower your kitchen and service teams with world-class capability. Our certified training programs instill uncompromising hygiene standards and elite service culture.',
    details: [
      'Person in Charge (PIC) Training (Levels 2 & 3)',
      'Basic Food Hygiene (BFH) & GHP Training',
      'Elite Culinary Service SOPs & Etiquette',
      'Custom Hospitality Soft Skills Mastery',
      'Performance Assessment & Staff Development'
    ],
    selectKey: 'staff-training'
  },
  {
    id: 'testing',
    title: 'Lab Testing Services',
    tagline: 'Precision Analytics & Quality Control',
    image: '/images/service_testing.png',
    description: 'Ensure absolute food safety and product integrity. Through our advanced associate laboratories, we perform comprehensive biological and chemical diagnostics.',
    details: [
      'Microbiological & Chemical Food Analysis',
      'Water, Ice, and Air Quality Swab Testing',
      'Product Shelf-Life Verification & Testing',
      'Nutritional Value Analysis & Labeling Compliance',
      'Allergen Detection & Validation'
    ],
    selectKey: 'lab-testing'
  },
  {
    id: 'menu',
    title: 'Menu Preparation & Engineering',
    tagline: 'Culinary Engineering & Optimization',
    image: '/images/service_menu.png',
    description: 'Craft high-performing, cost-efficient menus that delight guests. We combine culinary creativity with rigorous recipe costing to boost profitability.',
    details: [
      'Menu Engineering & High-Yield Recipe Design',
      'Standardized Recipe Costing & Portion Control',
      'Nutritional Profile Calculations',
      'Sensory Evaluation & Culinary Styling',
      'Seasonal Menu Curation & Theme Events'
    ],
    selectKey: 'menu-prep'
  },
  {
    id: 'transformation',
    title: 'Business Transformation',
    tagline: 'Strategic Growth & ESG Governance',
    image: '/images/service_transform.png',
    description: 'Future-proof your enterprise. From implementing ISO standards and sustainability models to restructuring corporate processes, we transform operations.',
    details: [
      'ISO 9001, 22000 & HACCP System Consulting',
      'ESG, Sustainability & Green Restaurant Advisory',
      'Business Process Re-engineering (BPR)',
      'Corporate Governance & Organizational Structuring',
      'Digital Transformation & IT System Integration'
    ],
    selectKey: 'business-transform'
  }
];

export default function ServicePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

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
  }, []);

  const handleInquiry = (serviceKey: string) => {
    navigate('/', { state: { selectedService: serviceKey } });
  };

  return (
    <>
      {/* Services Hero Section */}
      <section className="services-page-hero" ref={heroRef}>
        <div className="services-page-hero-glow"></div>
        
        <div className="services-page-hero-container">
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
          <div className="services-catalog-grid">
            {servicesData.map((service, index) => (
              <div 
                key={service.id} 
                className="service-detail-card reveal-fade-up"
                style={{ transitionDelay: `${0.1 + (index % 3) * 0.1}s` }}
              >
                <div className="service-detail-image-wrapper">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="service-detail-image"
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
        </div>
      </section>

      <Footer />
    </>
  );
}
