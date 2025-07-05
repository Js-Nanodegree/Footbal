import { MatchesResponseSchema } from '../zod/matchesResponseSchema';
import { tmpApiAxios } from '../clients/tmpApiAxios';
import { Match } from '../types/match';

const BASE_URL = 'https://api.football-data.org/v4';

export async function getTeamMatchesEndpoint(
    teamId: number,
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
): Promise<Match[]>
{
    const url = `/teams/${ teamId }/matches`;
    if ( client === 'axios' )
    {
        const data = await tmpApiAxios.request( {
            url,
            method: 'get',
            ...( axiosOptions || {} ),
        } );
        const parsed = MatchesResponseSchema.parse( data );
        return parsed.matches as Match[];
    } else
    {
        const res = await fetch( BASE_URL + url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        const parsed = MatchesResponseSchema.parse( data );
        return parsed.matches as Match[];
    }
} 