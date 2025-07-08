import React, { createContext, useContext, useCallback, ReactNode, useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

/**
 * AppContext хранит состояние фильтров, выбранной лиги, выбранных команд, лоадеров для HomeScreen.
 * selectedLeagueId и selectedTeamIds теперь НЕ персистятся через MMKV.
 */
interface AppContextValue
{
    selectedTeamIds: number[];
    setSelectedTeamIds: ( id: number | string | ( number | string )[] ) => void;
    loading: {
        matches: boolean;
        teams: boolean;
        leagues: boolean;
    };
    setLoading: ( l: Partial<AppContextValue[ 'loading' ]> ) => void;
    refresh: () => void;
    lastFetched: number | null;
    competition: any | null;
    setCompetition: ( c: any | null ) => void;
    refreshTeams: () => void;
}

const AppContext = createContext<AppContextValue | undefined>( undefined );

export const AppContextProvider: React.FC<{
    children: React.ReactNode;
}> = ( { children } ) =>
{
    const [ selectedTeamIds, _setSelectedTeamIds ] = useState<number[]>( [] );
    const [ loading, setLoadingState ] = useState( { matches: false, teams: false, leagues: false } );
    const [ lastFetched, setLastFetched ] = useState<number | null>( null );
    const [ competition, setCompetition ] = useState<any | null>( null );
    const cacheRef = useRef<{ [ key: string ]: { data: any; timestamp: number } }>( {} );

    const refresh = useCallback( () =>
    {
        cacheRef.current = {};
        setLastFetched( Date.now() );
    }, [] );

    const setLoading = useCallback( ( l: Partial<AppContextValue[ 'loading' ]> ) =>
    {
        setLoadingState( prev => ( { ...prev, ...l } ) );
    }, [] );

    // Корректная функция-обёртка для setSelectedTeamIds
    const setSelectedTeamIds = useCallback( ( id: number | string | ( number | string )[] ) =>
    {
        if ( Array.isArray( id ) )
        {
            _setSelectedTeamIds( id.map( Number ) );
        } else
        {
            const idNum = Number( id );
            _setSelectedTeamIds( ( prev ) =>
            {
                const exists = prev.includes( idNum );
                return exists ? prev.filter( ( tid ) => tid !== idNum ) : [ ...prev, idNum ];
            } );
        }
    }, [] );

    const value: AppContextValue = {
        selectedTeamIds,
        setSelectedTeamIds,
        loading,
        setLoading,
        refresh,
        lastFetched,
        competition,
        setCompetition,
        refreshTeams: () =>
        {
            setSelectedTeamIds( [] );
        },
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Хук для доступа к AppContext HomeScreen.
 */
export const useAppContext = () =>
{
    const ctx = useContext( AppContext );
    if ( !ctx ) throw new Error( 'useAppContext должен использоваться внутри AppContextProvider' );
    return ctx;
}; 