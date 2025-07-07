import React, { ReactNode } from 'react';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import App from './App';

interface ErrorBoundaryProps
{
    children: ReactNode;
}
interface ErrorBoundaryState
{
    hasError: boolean;
}

class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor( props: ErrorBoundaryProps )
    {
        super( props );
        this.state = { hasError: false };
    }
    static getDerivedStateFromError( error: unknown )
    {
        return { hasError: true };
    }
    componentDidCatch( error: unknown, errorInfo: unknown )
    {
        // Можно отправить ошибку в Sentry или логгер
    }
    render()
    {
        if ( this.state.hasError )
        {
            return <ErrorState message="Что-то пошло не так" />;
        }
        return this.props.children;
    }
}

export default function AppWrapper()
{
    return (
        <GlobalErrorBoundary>
            <App />
        </GlobalErrorBoundary>
    );
} 