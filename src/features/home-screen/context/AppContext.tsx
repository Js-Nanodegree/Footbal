import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';

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
}

const AppContext = createContext<AppContextValue | undefined>( undefined );

export const AppContextProvider = ( { children }: { children: ReactNode } ) =>
{
    const [ selectedLeagueId, setSelectedLeagueIdState ] = useState<number | null>( null );
    const [ selectedTeamIds, setSelectedTeamIdsState ] = useState<number[]>( [] );
    const [ loading, setLoadingState ] = useState( { matches: false, teams: false, leagues: false } );

    // setSelectedLeagueId — только стейт
    const setSelectedLeagueId = useCallback( ( id: number | null ) =>
    {
        setSelectedLeagueIdState( id );
    }, [] );

    // setSelectedTeamIds — только стейт
    const setSelectedTeamIds = useCallback( ( idOrArray: number | string | ( number | string )[] ) =>
    {
        if ( Array.isArray( idOrArray ) )
        {
            setSelectedTeamIdsState( idOrArray.map( Number ) );
        }
        else
        {
            const idNum = Number( idOrArray );
            setSelectedTeamIdsState( prev =>
            {
                const exists = prev.includes( idNum );
                return exists ? prev.filter( tid => tid !== idNum ) : [ ...prev, idNum ];
            } );
        }
    }, [] );

    // Обновление loading по частям
    const setLoading = useCallback( ( l: Partial<AppContextValue[ 'loading' ]> ) =>
    {
        setLoadingState( prev => ( { ...prev, ...l } ) );
    }, [] );

    return (
        <AppContext.Provider value={{ selectedLeagueId, setSelectedLeagueId, selectedTeamIds, setSelectedTeamIds, loading, setLoading }}>
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