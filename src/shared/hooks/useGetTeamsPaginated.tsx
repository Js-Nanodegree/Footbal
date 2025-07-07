import { useState, useCallback } from 'react';

export interface Team
{
    id: number;
    name: string;
    crest: string;
    area?: { name: string };
}

interface UseGetTeamsPaginatedResult
{
    data: Team[];
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    error: string | null;
    onEndReached: () => void;
    refresh: () => void;
}

export const useGetTeamsPaginated = (): UseGetTeamsPaginatedResult =>
{
    // TODO: интеграция с API football-data.org
    const [ data, setData ] = useState<Team[]>( [] );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ isLoadingMore, setIsLoadingMore ] = useState( false );
    const [ hasMore, setHasMore ] = useState( true );
    const [ error, setError ] = useState<string | null>( null );

    const onEndReached = useCallback( () =>
    {
        // TODO: подгрузка следующей страницы
    }, [] );

    const refresh = useCallback( () =>
    {
        // TODO: обновление данных
    }, [] );

    return {
        data,
        isLoading,
        isLoadingMore,
        hasMore,
        error,
        onEndReached,
        refresh,
    };
}; 