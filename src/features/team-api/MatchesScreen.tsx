import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useMatches } from './hooks/useMatches';
import Loader from 'src/shared/ui/loader/Loader';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import MatchCard from 'src/shared/ui/match-card/MatchCard';

export default function MatchesScreen( { teamId }: { teamId: number } )
{
    const { matches, loading, error } = useMatches( teamId );

    const safeMatches = Array.isArray( matches ) ? matches : [];

    const refresh = () =>
    {
        // Можно реализовать refresh через redux или локальный state
        // Например, dispatch(fetchMatchesThunk(teamId))
    };

    if ( loading && safeMatches.length === 0 ) return <Loader />;
    if ( error && safeMatches.length === 0 ) return <ErrorState message={error} onRetry={refresh} />;
    if ( safeMatches.length === 0 ) return <ErrorState message="Нет матчей" onRetry={refresh} />;

    return (
        <FlatList
            data={safeMatches}
            keyExtractor={item => item.id.toString()}
            renderItem={( { item } ) => <MatchCard match={item} />}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
            contentContainerStyle={{ padding: 16 }}
            testID="matches-list"
        />
    );
} 