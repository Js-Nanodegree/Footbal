import { useState, useCallback } from 'react';

export interface Player
{
    id: number;
    name: string;
    position?: string;
    nationality?: string;
    shirtNumber?: number;
}

export interface Match
{
    id: number;
    utcDate: string;
    competition: { name: string };
    homeTeam: { id: number; name: string; crest: string };
    awayTeam: { id: number; name: string; crest: string };
}

export interface TeamDetails
{
    id: number;
    name: string;
    crest: string;
    area?: { name: string };
    venue?: string;
    squad?: Player[];
}

interface UseGetTeamDetailsResult
{
    team: TeamDetails | null;
    players: Player[];
    matches: Match[];
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
}

export const useGetTeamDetails = ( teamId: number ): UseGetTeamDetailsResult =>
{
    // TODO: интеграция с API football-data.org
    const [ team, setTeam ] = useState<TeamDetails | null>( null );
    const [ players, setPlayers ] = useState<Player[]>( [] );
    const [ matches, setMatches ] = useState<Match[]>( [] );
    const [ isLoading, setIsLoading ] = useState( true );
    const [ error, setError ] = useState<string | null>( null );

    const refresh = useCallback( () =>
    {
        // TODO: обновление данных по команде
    }, [ teamId ] );

    return {
        team,
        players,
        matches,
        isLoading,
        error,
        refresh,
    };
}; 