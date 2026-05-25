import { useEffect, useRef } from 'react';
import Footer from '../components/Footer.tsx';
import './AboutPage.css';

const teamMembers = [
  {
    name: 'Muhsin',
    role: 'Managing Director',
    image: '/images/Muhsin.png',
    bio: 'Visionary leader driving Little Talk\'s strategic growth across the UAE hospitality landscape with over a decade of industry expertise.'
  },
  {
    name: 'Rabeeh',
    role: 'Medical Assistant',
    image: '/images/Rabeeh.png',
    bio: 'Orchestrates operational excellence and quality management frameworks, ensuring every client engagement exceeds industry benchmarks.'
  },
  {
    name: 'Jamsheer',
    role: 'Finance Manager',
    image: '/images/Jamsheer.png',
    bio: 'Leads technical innovation in food safety engineering and IT infrastructure, bridging cutting-edge technology with culinary operations.'
  }
];

const associatePartners = [
  {
    name: 'Inter Science Laboratory',
    type: 'Laboratory Partner',
    description: 'Precision laboratory testing and analytical services ensuring your food safety and quality standards meet international compliance requirements.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v8l-6 10a2 2 0 001.7 3h16.6a2 2 0 001.7-3L20 12V4" />
        <path d="M10 4h12" />
        <circle cx="15" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="18" r="1" fill="currentColor" stroke="none" />
        <circle cx="17" cy="22" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    name: 'Mac Adz',
    type: 'Digital Partner',
    description: 'End-to-end digital transformation, web presence, and smart technology solutions tailored for modern hospitality and F&B operations.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="26" height="18" rx="2" />
        <path d="M10 26h12" />
        <path d="M16 22v4" />
        <path d="M9 12l4 4-4 4" />
        <path d="M16 18h6" />
      </svg>
    )
  },
  {
    name: 'Lawman',
    type: 'Legal Partner',
    description: 'Comprehensive legal advisory covering licensing, regulatory compliance, labor law, and corporate governance for UAE-based businesses.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3v4" />
        <path d="M6 12l10-5 10 5" />
        <path d="M8 12v10" />
        <path d="M14 12v10" />
        <path d="M18 12v10" />
        <path d="M24 12v10" />
        <path d="M4 22h24" />
        <path d="M2 25h28" />
        <path d="M6 25v3h20v-3" />
      </svg>
    )
  }
];

function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
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

    const sections = [heroRef.current, teamRef.current, partnersRef.current];
    sections.forEach((section) => {
      if (section) {
        const revealEls = section.querySelectorAll('.reveal-fade-up');
        revealEls.forEach((el) => observer.observe(el));
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
           Hero Split Section 
         ═══════════════════════════════════════════════════════════ */}
      <section className="about-hero-section" ref={heroRef}>
        <div className="about-hero-glow-tl"></div>
        <div className="about-hero-glow-br"></div>
        
        <div className="about-hero-container">
          <div className="about-hero-grid">
            {/* Left: Editorial Copy */}
            <div className="about-hero-text reveal-fade-up">
              <span className="about-hero-label">Who We Are</span>
              <h1 className="about-hero-title">
                About <span className="brand-gradient-text">us.</span>
              </h1>
              <div className="about-hero-divider"></div>
              <p className="about-hero-paragraph">
                Little Talk Restaurants Management LLC is a UAE-based consultancy dedicated to transforming the hospitality and food service landscape. We partner with restaurants, hotels, and institutional kitchens to deliver world-class standards in food safety, operational excellence, and culinary innovation.
              </p>
              <p className="about-hero-paragraph">
                With deep roots in the GCC market and a team of internationally certified professionals, we bring a unique blend of local expertise and global best practices. From ISO compliance frameworks to bespoke staff training pathways, our solutions are designed to elevate every dimension of your operation.
              </p>
              <p className="about-hero-paragraph">
                Our mission is simple: empower food businesses to achieve sustainable growth, uncompromising safety, and unforgettable guest experiences — every single day.
              </p>
              <div className="about-hero-stats">
                <div className="about-stat">
                  <span className="about-stat-number">12+</span>
                  <span className="about-stat-label">Years Experience</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat">
                  <span className="about-stat-number">200+</span>
                  <span className="about-stat-label">Clients Served</span>
                </div>
                <div className="about-stat-divider"></div>
                <div className="about-stat">
                  <span className="about-stat-number">6</span>
                  <span className="about-stat-label">Industry Sectors</span>
                </div>
              </div>
            </div>
            
            {/* Right: Hero Image */}
            <div className="about-hero-image-col reveal-fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="about-hero-image-wrapper">
                <img
                  src="/images/about_hero.png"
                  alt="Little Talk Consultancy — Professional restaurant consultation in Dubai"
                  className="about-hero-image"
                />
                <div className="about-hero-image-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>UAE Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           Our Team Section
         ═══════════════════════════════════════════════════════════ */}
      <section className="about-team-section" ref={teamRef}>
        <div className="about-team-glow"></div>
        <div className="about-team-container">
          <div className="about-section-header reveal-fade-up">
            <span className="about-section-label">Leadership</span>
            <h2 className="about-section-title">
              Our <span className="brand-gradient-text">Team.</span>
            </h2>
            <p className="about-section-desc">
              The driving force behind Little Talk — a team of seasoned professionals united by a passion for culinary excellence and operational mastery.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name} 
                className="about-team-card reveal-fade-up"
                style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="about-team-photo-wrapper">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    className="about-team-photo"
                  />
                  <div className="about-team-photo-overlay"></div>
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <span className="about-team-role">{member.role}</span>
                  <p className="about-team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           Associate Partners Section
         ═══════════════════════════════════════════════════════════ */}
      <section className="about-partners-section" ref={partnersRef}>
        <div className="about-partners-glow"></div>
        <div className="about-partners-container">
          <div className="about-section-header reveal-fade-up">
            <span className="about-section-label">Collaborations</span>
            <h2 className="about-section-title">
              Associate <span className="brand-gradient-text">Partners.</span>
            </h2>
            <p className="about-section-desc">
              We work hand-in-hand with industry-leading partners to deliver comprehensive solutions that span laboratory testing, digital innovation, and legal governance.
            </p>
          </div>

          <div className="about-partners-grid">
            {associatePartners.map((partner, index) => (
              <div
                key={partner.name}
                className="about-partner-tile reveal-fade-up"
                style={{ transitionDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="about-partner-icon-ring">
                  {partner.icon}
                </div>
                <h3 className="about-partner-name">{partner.name}</h3>
                <span className="about-partner-type">{partner.type}</span>
                <p className="about-partner-desc">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;
