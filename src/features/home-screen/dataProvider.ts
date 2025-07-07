import { getCache, setCache } from '../../shared/memory-bank/mmkvMemoryBank';
import { Match } from '../team-api/types/match';
import { Team } from '../team-api/types/team';
import { Competition } from '../team-api/types/competition';
import { DataEnrichmentService } from './services/DataEnrichmentService';
import { ErrorHandler } from './services/ErrorHandler';
import { MockDataProvider } from './services/MockDataProvider';
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

    // 2. Получаем реальные данные с API, fallback на моки через ErrorHandler и MockDataProvider
    let matches: Match[], teams: Team[], leagues: Competition[];
    const fetchApiData = async () =>
    {
        teams = await TeamApiService.getTeams();
        matches = await TeamApiService.getTeamMatches();
        leagues = await CompetitionApiService.getCompetitions();
        return { matches, teams, leagues };
    };
    const fetchMockData = () => ( {
        matches: MockDataProvider.getMock( 'matches' ),
        teams: MockDataProvider.getMock( 'teams' ),
        leagues: MockDataProvider.getMock( 'leagues' ),
    } );
    const { matches: rawMatches, teams: rawTeams, leagues: rawLeagues } = await ErrorHandler.handle( fetchApiData, fetchMockData );

    // 3. Enrichment и адаптация через DataEnrichmentService
    let enrichedMatches = DataEnrichmentService.ensureAllFields( rawMatches );
    let enrichedTeams = DataEnrichmentService.enrichTeamsFromMatches( enrichedMatches, rawTeams );
    let enrichedLeagues = DataEnrichmentService.enrichLeaguesFromMatches( enrichedMatches, rawLeagues );

    // 3.1 Фильтрация: только LIVE и ближайшие 3 дня
    const now = new Date();
    const threeDaysLater = new Date( now.getTime() + 3 * 24 * 60 * 60 * 1000 );
    enrichedMatches = enrichedMatches.filter( ( m ) =>
    {
        if ( m.status === 'LIVE' ) return true;
        const matchDate = new Date( m.utcDate );
        return matchDate >= now && matchDate <= threeDaysLater;
    } );

    // 4. Мержим с кэшем (оставляем только свежие по id)
    const oldTeams = cached?.teams || [];
    const oldMatches = cached?.matches || [];
    const oldLeagues = cached?.leagues || [];
    enrichedTeams = mergeById( enrichedTeams, oldTeams );
    enrichedMatches = mergeById( enrichedMatches, oldMatches );
    enrichedLeagues = mergeById( enrichedLeagues, oldLeagues );

    // 5. Сохраняем в MMKV
    const result: HomeScreenData = {
        matches: enrichedMatches,
        teams: enrichedTeams,
        leagues: enrichedLeagues,
        lastUpdated: Date.now(),
    };
    setCache( MMKV_KEY, result );
    return result;
} 