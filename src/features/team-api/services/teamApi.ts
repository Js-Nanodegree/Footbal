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

export interface FetchTeamsResult
{
    count: number;
    teams: Team[];
    links?: {
        next?: string;
        prev?: string;
    };
}

export async function fetchTeams( offset: number = 0, limit: number = 20 ): Promise<FetchTeamsResult>
{
    const res = await api.get( `/teams`, {
        params: { offset, limit },
    } );
    return {
        count: res.data.count,
        teams: res.data.teams,
        links: res.data.links,
    };
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