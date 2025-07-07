import React, { createContext, useContext, useCallback, ReactNode, useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

/**
 * AppContext хранит состояние фильтров, выбранной лиги, выбранных команд, лоадеров для HomeScreen.
 * selectedLeagueId и selectedTeamIds теперь НЕ персистятся через MMKV.
 */
interface AppContextValue
{
    selectedLeagueId: number | null;
    setSelectedLeagueId: ( id: number | null ) => void;
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
}

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

const AppContext = createContext<AppContextValue | undefined>( undefined );

export const AppContextProvider = ( { children }: { children: ReactNode } ) =>
{
    const { params } = useRoute();
    const [ selectedLeagueId, setSelectedLeagueId ] = useState<number | null>( null );
    const [ selectedTeamIds, setSelectedTeamIds ] = useState<number[]>( [] );
    const [ loading, setLoadingState ] = useState( { matches: false, teams: false, leagues: false } );
    const [ lastFetched, setLastFetched ] = useState<number | null>( null );
    const [ competition, setCompetition ] = useState( params?.competition || null );
    const cacheRef = useRef<{ [ key: string ]: { data: any; timestamp: number } }>( {} );

    useEffect( () =>
    {
        if ( params?.competition && params.competition !== competition )
        {
            setCompetition( params.competition );
        }
    }, [ params ] );

    // Обновление выбранной лиги
    const setSelectedLeagueIdCb = useCallback( ( id: number | null ) =>
    {
        setSelectedLeagueId( id );
    }, [] );

    // Обновление выбранных команд
    const setSelectedTeamIdsCb = useCallback( ( idOrArray: number | string | ( number | string )[] ) =>
    {
        if ( Array.isArray( idOrArray ) )
        {
            setSelectedTeamIds( idOrArray.map( Number ) );
        } else
        {
            const idNum = Number( idOrArray );
            setSelectedTeamIds( ( prev: number[] ) =>
            {
                const exists = prev.includes( idNum );
                return exists ? prev.filter( ( tid ) => tid !== idNum ) : [ ...prev, idNum ];
            } );
        }
    }, [] );

    // Кэширование: проверка, нужно ли делать запрос
    const isCacheValid = useCallback( ( key: string ) =>
    {
        const entry = cacheRef.current[ key ];
        if ( !entry ) return false;
        return Date.now() - entry.timestamp < CACHE_TTL;
    }, [] );

    // Сброс кэша и форс-рефетч
    const refresh = useCallback( () =>
    {
        cacheRef.current = {};
        setLastFetched( Date.now() );
    }, [] );

    const setLoading = useCallback( ( l: Partial<AppContextValue[ 'loading' ]> ) =>
    {
        setLoadingState( prev => ( { ...prev, ...l } ) );
    }, [] );

    return (
        <AppContext.Provider value={{ selectedLeagueId, setSelectedLeagueId: setSelectedLeagueIdCb, selectedTeamIds, setSelectedTeamIds: setSelectedTeamIdsCb, loading, setLoading, refresh, lastFetched, competition, setCompetition }}>
            {children}
        </AppContext.Provider>
    );
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