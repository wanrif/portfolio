import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(
        `[wanrif-os::ErrorBoundary] Section "${this.props.sectionName ?? 'unknown'}" threw an error:`,
        error,
        errorInfo,
      );
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='terminal-window my-4 overflow-hidden rounded-2xl border border-tuna-800/80 bg-shark-950/80 p-4 text-gallery-100 sm:p-5'>
          <div className='terminal-titlebar border-b border-tuna-800/50 pb-2 text-xs text-tuna-400'>
            <span>runtime :: error_recovery</span>
            <span className='terminal-chip text-[10px] text-tuna-300'>exception</span>
          </div>
          <div className='space-y-3 pt-3'>
            <p className='terminal-prompt text-tuna-400'>
              module.failure :: {this.props.sectionName ?? 'section'}
            </p>
            <p className='text-sm text-gallery-300'>
              An unexpected error occurred while rendering this module content.
            </p>
            {this.state.error?.message && (
              <pre className='overflow-x-auto rounded-lg border border-gallery-800/70 bg-shark-900/60 p-2 text-xs text-gallery-400'>
                {this.state.error.message}
              </pre>
            )}
            <button
              type='button'
              onClick={this.handleRetry}
              className='terminal-btn-secondary rounded-xl px-3 py-1.5 text-xs text-gallery-200 corner-bevel hover:text-gallery-100'
            >
              retry module
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
