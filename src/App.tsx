import React, { ReactNode, useState } from 'react';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'src/shared/i18n';


// Удалить все вызовы i18n.load и i18n.activate
// Для смены языка использовать i18n.changeLanguage(lng)

// Для теста: временно активировать английский язык
// i18n.activate('en');

interface ErrorBoundaryProps
{
    children: ReactNode;
}
interface ErrorBoundaryState
{
    hasError: boolean;
}

if ( __DEV__ )
{
    require( './reactotronConfig' );
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
    const [ lang, setLang ] = useState( 'ru' );

    const handleLangChange = ( lng: 'ru' | 'en' ) =>
    {
        i18n.changeLanguage( lng );
        setLang( lng );
    };

    return (
        <I18nextProvider i18n={i18n}>
            <div style={{ flexDirection: 'row', gap: 8, margin: 12 }}>
                <button onClick={() => handleLangChange( 'ru' )} style={{ fontWeight: lang === 'ru' ? 'bold' : 'normal' }}>RU</button>
                <button onClick={() => handleLangChange( 'en' )} style={{ fontWeight: lang === 'en' ? 'bold' : 'normal' }}>EN</button>
            </div>
            <GlobalErrorBoundary>
                <App />
            </GlobalErrorBoundary>
        </I18nextProvider>
    );
} 