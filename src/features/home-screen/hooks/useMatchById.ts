import { useEffect } from 'react';
// import { exampleMatches } from '../mocks/exampleMatches';

const log = ( msg: string, data?: any ) =>
{
 
    console.log( `[Reactotron] ${ msg }`, data );
};

export function useMatchById( id: number )
{
    // const match = useMemo( () => exampleMatches.find( m => m.id === id ), [ id ] );

    useEffect( () =>
    {
        log( 'useMatchById: входные параметры', { id } );
        log( 'useMatchById: результат', { found: !!match, match } );
    }, [ id, match ] );

    return match;
} 