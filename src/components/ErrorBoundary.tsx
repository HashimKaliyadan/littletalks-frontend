import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-500-page">
          <div className="error-500-glow"></div>
          <div className="error-500-container">
            <div className="error-500-card">
              <span className="error-code">500</span>
              <h1>Something Went Wrong</h1>
              <p>
                An unexpected internal error has occurred. Our consultants and engineering teams are notified.
              </p>
              <div className="error-buttons">
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
                >
                  <span>Reload Page</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a 
                  href="/" 
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    this.setState({ hasError: false });
                    window.location.href = "/";
                  }}
                >
                  <span>Go to Homepage</span>
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
