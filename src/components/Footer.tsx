import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <footer className="lt-footer">
      {/* ── Main Grid ── */}
      <div className="lt-footer-main">

        {/* LEFT: Brand + Socials + Newsletter */}
        <div className="lt-footer-left">
          {/* Logo */}
          <Link
            to="/"
            className="logo-container"
            aria-label="Little Talk Home"
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

          {/* Social Icons */}
          <div className="lt-footer-socials">
            <a href="#" aria-label="Instagram" className="lt-social" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="lt-social" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="lt-social" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="lt-social" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter" className="lt-social" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>


        </div>

        {/* RIGHT: Navigation Columns */}
        <div className="lt-footer-nav">
          {/* Column 1: Services */}
          <div className="lt-footer-col">
            <h3 className="lt-footer-col-title">Services</h3>
            <ul>
              <li><Link to="/services">Restaurant Consulting</Link></li>
              <li><Link to="/services">Legal &amp; Documentation</Link></li>
              <li><Link to="/services">Staff Training</Link></li>
              <li><Link to="/services">Lab Testing</Link></li>
              <li><Link to="/services">Menu Engineering</Link></li>
              <li><Link to="/services">Business Transformation</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="lt-footer-col">
            <h3 className="lt-footer-col-title">Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/partners">Partner With Us</Link></li>
              <li><Link to="/products">Our Products</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lt-footer-col">
            <h3 className="lt-footer-col-title">Resources</h3>
            <ul>
              <li><Link to="/contact">Get a Consultation</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="lt-footer-divider" />

      {/* ── Bottom Bar ── */}
      <div className="lt-footer-bottom">
        <p className="lt-footer-copy">© {year} Little Talk Restaurants Management LLC</p>
        <div className="lt-footer-bottom-links">
          <Link to="/privacy-policy">Legal</Link>
          <Link to="/terms-of-service">Terms of service</Link>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="lt-footer-disclaimer">
        <p>
          Little Talk's consulting services are intended for informational and operational improvement purposes only.
          All regulatory submissions, legal filings, and compliance decisions should be reviewed by licensed UAE
          professionals. Little Talk Restaurants Management LLC is registered in Dubai, UAE.
        </p>
      </div>
    </footer>
  );
}
