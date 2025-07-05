import { TeamSchema } from '../zod/teamSchema';
import { tmpApiAxios } from '../clients/tmpApiAxios';
import { Team } from '../types/team';

const BASE_URL = 'https://api.football-data.org/v4';

export async function getTeamDetailsEndpoint(
    teamId: number,
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
): Promise<Team>
{
    const url = `/teams/${ teamId }`;
    if ( client === 'axios' )
    {
        const data = await tmpApiAxios.request( {
            url,
            method: 'get',
            ...( axiosOptions || {} ),
        } );
        return TeamSchema.parse( data ) as Team;
    } else
    {
        const res = await fetch( BASE_URL + url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        return TeamSchema.parse( data ) as Team;
    }
} 