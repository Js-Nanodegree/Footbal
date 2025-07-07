import { useMemo } from 'react';
import { exampleMatches } from '../mocks/exampleMatches';

export function useMatchById( id: number )
{
    return useMemo( () => exampleMatches.find( m => m.id === id ), [ id ] );
} 