import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const pathMap: Record<string, string> = {
  '/about': 'About Us',
  '/services': 'Services',
  '/products': 'Products',
  '/partners': 'Partners',
  '/contact': 'Contact Us',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageLabel = pathMap[currentPath] || 'Page';

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to="/" className="breadcrumbs-link">
            Home
          </Link>
        </li>
        <li className="breadcrumbs-separator" aria-hidden="true">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </li>
        <li className="breadcrumbs-item active" aria-current="page">
          <span className="breadcrumbs-current">{pageLabel}</span>
        </li>
      </ol>
    </nav>
  );
}
