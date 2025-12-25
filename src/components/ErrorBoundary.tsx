import { type ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
        <p className="text-gray-600">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <Button onClick={() => {
          resetErrorBoundary();
          window.location.reload();
        }}>
          Reload Page
        </Button>
      </div>
    </div>
  );
}

export default function ErrorBoundary({ children, fallback }: Props) {
  const fallbackComponent = fallback ? () => <>{fallback}</> : ErrorFallback;

  return (
    <ReactErrorBoundary
      FallbackComponent={fallbackComponent}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}


