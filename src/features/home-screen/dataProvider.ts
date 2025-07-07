import { getCache, setCache } from '../../shared/memory-bank/mmkvMemoryBank';
import { Match } from '../team-api/types/match';
import { Team } from '../team-api/types/team';
import { Competition } from '../team-api/types/competition';
import { enrichTeamsFromMatches, enrichLeaguesFromMatches, ensureAllFields } from './utils/dataEnrichment';
import { exampleMatches } from './mocks/exampleMatches';
import { exampleTeams } from './mocks/exampleTeams';
import { exampleLeagues } from './mocks/exampleLeagues';
import { TeamApiService } from '../team-api/services/teamApi';
import { CompetitionApiService } from '../team-api/services/competitionApi';

const MMKV_KEY = 'homeScreenData';
const TTL = 24 * 60 * 60 * 1000; // 24ч

export interface HomeScreenData
{
    matches: Match[];
    teams: Team[];
    leagues: Competition[];
    lastUpdated: number;
}

function isExpired( lastUpdated: number )
{
    return Date.now() - lastUpdated > TTL;
}

function mergeById<T extends { id: number }>( newArr: T[], oldArr: T[] ): T[]
{
    const map = new Map<number, T>();
    oldArr.forEach( item => map.set( item.id, item ) );
    newArr.forEach( item => map.set( item.id, item ) ); // новые заменяют старые
    return Array.from( map.values() );
}

export async function getHomeScreenData(): Promise<HomeScreenData>
{
    // 1. Пробуем из MMKV
    const cached = getCache<HomeScreenData>( MMKV_KEY );
    if ( cached && !isExpired( cached.lastUpdated ) )
    {
        return cached;
    }

    // 2. Получаем реальные данные с API, fallback на моки
    let matches, teams, leagues;
    try
    {
        teams = await TeamApiService.getTeams();
        matches = await TeamApiService.getTeamMatches();
        leagues = await CompetitionApiService.getCompetitions();
    } catch ( e )
    {
        matches = exampleMatches;
        teams = exampleTeams;
        leagues = exampleLeagues;
    }

    // 3. Enrichment и адаптация
    matches = ensureAllFields( matches );
    teams = enrichTeamsFromMatches( matches, teams );
    leagues = enrichLeaguesFromMatches( matches, leagues );

    // 4. Мержим с кэшем (оставляем только свежие по id)
    const oldTeams = cached?.teams || [];
    const oldMatches = cached?.matches || [];
    const oldLeagues = cached?.leagues || [];
    teams = mergeById( teams, oldTeams );
    matches = mergeById( matches, oldMatches );
    leagues = mergeById( leagues, oldLeagues );

    const data: HomeScreenData = {
        matches,
        teams,
        leagues,
        lastUpdated: Date.now(),
    };
    setCache( MMKV_KEY, data );
    return data;
} 