import { TeamsResponseSchema } from '../zod/teamsResponseSchema';
import { tmpApiAxios } from '../clients/tmpApiAxios';
import { Team } from '../types/team';

const BASE_URL = 'https://api.football-data.org/v4';

export async function getTeamsEndpoint(
    page = 1,
    pageSize = 20,
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
): Promise<Team[]>
{
    const url = `/teams?limit=${ pageSize }&offset=${ ( page - 1 ) * pageSize }`;
    if ( client === 'axios' )
    {
        const data = await tmpApiAxios.request( {
            url,
            method: 'get',
            ...( axiosOptions || {} ),
        } );
        const parsed = TeamsResponseSchema.parse( data );
        return parsed.teams as Team[];
    } else
    {
        const res = await fetch( BASE_URL + url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        const parsed = TeamsResponseSchema.parse( data );
        return parsed.teams as Team[];
    }
} 