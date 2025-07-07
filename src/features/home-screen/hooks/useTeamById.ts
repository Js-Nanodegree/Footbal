import { useMemo } from 'react';
import { exampleTeams } from '../mocks/exampleTeams';

export function useTeamById( id: number )
{
    return useMemo( () => exampleTeams.find( t => t.id === id ), [ id ] );
} 