import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import './ContactPage.css';

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

export default function ContactPage() {
  const location = useLocation();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set initial service from router navigation state if any
  useEffect(() => {
    if (location.state && (location.state as any).selectedService) {
      setSelectedService((location.state as any).selectedService);
      // Clean up the location state history to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

    const sections = [heroRef.current, contentRef.current];
    sections.forEach((section) => {
      if (section) {
        const revealEls = section.querySelectorAll('.reveal-fade-up');
        revealEls.forEach((el) => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. Our team will contact you shortly!');
  };

  return (
    <>
      {/* Contact Hero Section */}
      <section className="contact-page-hero" ref={heroRef}>
        <div className="contact-page-hero-glow"></div>
        <div className="contact-page-hero-container">
          <div className="contact-page-hero-content reveal-fade-up">
            <span className="contact-page-hero-label">Get In Touch</span>
            <h1 className="contact-page-hero-title">
              Contact <span className="brand-gradient-text">us.</span>
            </h1>
            <div className="contact-page-hero-divider"></div>
            <p className="contact-page-hero-subtitle">
              Have a project or partnership in mind? We'd love to hear from you. Send us an inquiry below or reach out directly to our Dubai head office.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split Section */}
      <section className="contact-page-content" ref={contentRef}>
        <div className="contact-page-glow-1"></div>
        <div className="contact-page-glow-2"></div>

        <div className="contact-page-container">
          <div className="contact-page-grid">
            
            {/* Left Column: Info & Map */}
            <div className="contact-info-column reveal-fade-up">
              
              {/* Contact Cards */}
              <div className="contact-cards-stack">
                
                {/* Office Address */}
                <div className="contact-info-card">
                  <div className="contact-card-icon-wrapper">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <h3>Head Office Location</h3>
                    <p>Al Saqr Business Tower, 30th Floor, Sheikh Zayed Road, Dubai, UAE</p>
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="contact-info-card">
                  <div className="contact-card-icon-wrapper">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="contact-card-text">
                    <h3>Direct Communication</h3>
                    <p>Phone: <a href="tel:+971585960727">+971 58 59 60 727</a></p>
                    <p>Email: <a href="mailto:info@consultio.com">info@consultio.com</a></p>
                  </div>
                </div>


              </div>

              {/* Styled Maps container */}
              <div className="contact-map-card">
                <iframe 
                  title="Al Saqr Business Tower Dubai location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9192429406085!2d55.27181057630737!3d25.20593452655388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433f52445107%3A0xe541c888e2c2b3e8!2sAl%20Saqr%20Business%20Tower!5e0!3m2!1sen!2sae!4v1716584000000!5m2!1sen!2sae" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Right Column: Premium Form */}
            <div className="contact-form-column reveal-fade-up" style={{ transitionDelay: '0.15s' }}>
              <div className="contact-form-card">
                <span className="contact-form-subtitle">Online Inquiry</span>
                <h2>Send a Message</h2>
                <p className="contact-form-hint">Fill out the fields below and our business consultants will reach back to you within 24 hours.</p>

                <form className="contact-page-form" onSubmit={handleSubmit}>
                  
                  <div className="contact-form-group-row">
                    <input type="text" placeholder="Full Name" required className="contact-page-input" />
                    <input type="email" placeholder="Email Address" required className="contact-page-input" />
                  </div>
                  
                  <div className="contact-form-group-row">
                    <input type="text" placeholder="Company / Restaurant Name" className="contact-page-input" />
                    <input type="tel" placeholder="Phone Number" className="contact-page-input" />
                  </div>

                  <div className="contact-form-group-full">
                    <div className="contact-dropdown-container" ref={dropdownRef}>
                      <button
                        type="button"
                        className={`contact-dropdown-trigger ${selectedService ? 'has-value' : ''} ${isDropdownOpen ? 'is-open' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>
                          {serviceOptions.find(opt => opt.value === selectedService)?.label || 'Select Service of Interest'}
                        </span>
                        <svg className="contact-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="contact-dropdown-menu">
                          {serviceOptions.map((option) => (
                            <div
                              key={option.value}
                              className={`contact-dropdown-option ${selectedService === option.value ? 'is-selected' : ''}`}
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
                      
                      {/* Hidden select to preserve standard HTML5 validation */}
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

                  <div className="contact-form-group-full">
                    <textarea 
                      placeholder="Tell us about your project, target launch dates, or general consulting requirements..." 
                      required 
                      className="contact-page-input contact-page-textarea"
                      rows={5}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary contact-submit-btn">
                    <span>Submit Inquiry</span>
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
