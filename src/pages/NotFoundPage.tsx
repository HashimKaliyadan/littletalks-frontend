import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <>
      <div className="error-404-page">
        <div className="error-404-glow"></div>
        <div className="error-404-container">
          <div className="error-404-card">
            <span className="error-code">404</span>
            <h1>Page Not Found</h1>
            <p>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="error-buttons">
              <Link to="/" className="btn btn-primary" style={{ minWidth: '220px', justifyContent: 'center' }}>
                <span>Go to Homepage</span>
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
