import { Link } from 'react-router-dom';
import './EmptyState.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showActionButton?: boolean;
  actionText?: string;
  actionPath?: string;
}

export default function EmptyState({
  title = 'No Items Found',
  description = 'We couldn\'t find any records matching this category. Please check back later or modify your selection.',
  showActionButton = true,
  actionText = 'Back to Home',
  actionPath = '/'
}: EmptyStateProps) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-card">
        <div className="empty-state-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{description}</p>
        {showActionButton && (
          <Link to={actionPath} className="btn btn-primary empty-state-btn">
            <span>{actionText}</span>
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
