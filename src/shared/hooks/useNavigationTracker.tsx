import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

/**
 * useNavigationTracker — хук для трекинга переходов между экранами.
 * Логирует переходы и возвращает navigate с логированием.
 */
export function useNavigationTracker()
{
    const navigation = useNavigation();

    const trackedNavigate = useCallback( ( screen: string, params?: any ) =>
    {
        // Здесь можно добавить отправку аналитики, Sentry и т.д.
        console.log( '[NAVIGATE]', screen, params );
        navigation.navigate( screen as never, params as never );
    }, [ navigation ] );

    return {
        ...navigation,
        navigate: trackedNavigate,
    };
} 