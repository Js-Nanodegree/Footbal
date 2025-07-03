import axios from 'axios';
import { Team } from '../types/team';
import { Player } from '../types/player';
import { Match } from '../types/match';

const API_BASE = 'https://api.football-data.org/v4';
const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY || '';

const api = axios.create( {
    baseURL: API_BASE,
    headers: {
        'X-Auth-Token': API_TOKEN,
    },
} );

export async function fetchTeams( page: number = 1, pageSize: number = 20 ): Promise<Team[]>
{
    const res = await api.get( `/teams`, {
        params: { page, limit: pageSize },
    } );
    return res.data.teams;
}

export async function fetchTeamDetails( teamId: number ): Promise<Team>
{
    const res = await api.get( `/teams/${ teamId }` );
    return res.data;
}

export async function fetchTeamPlayers( teamId: number ): Promise<Player[]>
{
    const res = await api.get( `/teams/${ teamId }` );
    return res.data.squad;
}

export async function fetchTeamMatches( teamId: number ): Promise<Match[]>
{
    const res = await api.get( `/teams/${ teamId }/matches`, {
        params: { status: 'SCHEDULED' },
    } );
    return res.data.matches;
} 