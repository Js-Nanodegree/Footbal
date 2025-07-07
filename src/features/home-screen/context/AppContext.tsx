import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedLeagueId, setSelectedTeamIds } from '../redux/homeScreenSlice';

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
    const dispatch = useDispatch();
    const selectedLeagueId = useSelector((state: any) => state.homeScreen.selectedLeagueId);
    const selectedTeamIds = useSelector((state: any) => state.homeScreen.selectedTeamIds);
    const [ loading, setLoadingState ] = React.useState( { matches: false, teams: false, leagues: false } );

    const setSelectedLeagueIdCb = useCallback( ( id: number | null ) =>
    {
        dispatch(setSelectedLeagueId(id));
    }, [dispatch] );

    const setSelectedTeamIdsCb = useCallback( ( idOrArray: number | string | ( number | string )[] ) =>
    {
        if ( Array.isArray( idOrArray ) )
        {
            dispatch(setSelectedTeamIds(idOrArray.map(Number)));
        }
        else
        {
            const idNum = Number( idOrArray );
            dispatch((dispatch: any, getState: any) => {
                const prev = getState().homeScreen.selectedTeamIds;
                const exists = prev.includes(idNum);
                const newIds = exists ? prev.filter((tid: number) => tid !== idNum) : [...prev, idNum];
                dispatch(setSelectedTeamIds(newIds));
            });
        }
    }, [dispatch] );

    const setLoading = useCallback( ( l: Partial<AppContextValue[ 'loading' ]> ) =>
    {
        setLoadingState( prev => ( { ...prev, ...l } ) );
    }, [] );

    return (
        <AppContext.Provider value={{ selectedLeagueId, setSelectedLeagueId: setSelectedLeagueIdCb, selectedTeamIds, setSelectedTeamIds: setSelectedTeamIdsCb, loading, setLoading }}>
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