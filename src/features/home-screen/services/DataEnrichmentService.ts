// DataEnrichmentService: enrichment, фильтрация, сортировка, поиск
import { Match } from '../../team-api/types/match';
import { Team } from '../../team-api/types/team';
import { Competition as League } from '../../team-api/types/competition';

export class DataEnrichmentService
{
    static enrichTeamsFromMatches( matches: Match[], teams: Team[] = [] ): Team[]
    {
        const teamMap = new Map( teams.map( ( t ) => [ t.id, t ] ) );
        matches.forEach( ( m ) =>
        {
            [ m.homeTeam, m.awayTeam ].forEach( ( mt ) =>
            {
                if ( mt && !teamMap.has( mt.id ) ) teamMap.set( mt.id, {
                    id: mt.id,
                    name: mt.name,
                    crestUrl: mt.crestUrl,
                    lastUpdated: new Date().toISOString(),
                } );
            } );
        } );
        return Array.from( teamMap.values() );
    }

    static enrichLeaguesFromMatches( matches: Match[], leagues: League[] = [] ): League[]
    {
        const leagueMap = new Map( leagues.map( ( l ) => [ l.id, l ] ) );
        matches.forEach( ( m ) =>
        {
            if ( m.competition && !leagueMap.has( m.competition.id ) ) leagueMap.set( m.competition.id, m.competition );
        } );
        return Array.from( leagueMap.values() );
    }

    static ensureAllFields( matches: Match[] ): Match[]
    {
        const fallbackCompetition: League = {
            id: -1,
            area: { id: -1, name: 'Unknown', code: '' },
            name: 'Unknown',
            code: '',
            lastUpdated: new Date().toISOString(),
        };
        const fallbackTeam: Team = {
            id: -1,
            name: 'Unknown',
            lastUpdated: new Date().toISOString(),
        };
        return matches.map( ( m ) => ( {
            ...m,
            status: m.status || 'SCHEDULED',
            utcDate: m.utcDate || new Date().toISOString(),
            homeTeam: m.homeTeam || fallbackTeam,
            awayTeam: m.awayTeam || { ...fallbackTeam, id: -2 },
            competition: m.competition || fallbackCompetition,
        } ) );
    }

    // Фильтрация по статусу, лиге, команде, дате
    static filterMatches( matches: Match[], filters: {
        status?: string;
        leagueId?: number;
        teamId?: number;
        date?: string;
    } ): Match[]
    {
        return matches.filter( ( m ) =>
        {
            if ( filters.status && m.status !== filters.status ) return false;
            if ( filters.leagueId && m.competition?.id !== filters.leagueId ) return false;
            if ( filters.teamId && m.homeTeam?.id !== filters.teamId && m.awayTeam?.id !== filters.teamId ) return false;
            if ( filters.date && !m.utcDate?.startsWith( filters.date ) ) return false;
            return true;
        } );
    }

    // Сортировка по дате (asc/desc)
    static sortMatches( matches: Match[], order: 'asc' | 'desc' = 'asc' ): Match[]
    {
        return matches.slice().sort( ( a, b ) =>
        {
            const da = new Date( a.utcDate ).getTime();
            const db = new Date( b.utcDate ).getTime();
            return order === 'asc' ? da - db : db - da;
        } );
    }

    // Поиск по имени команды или турнира
    static searchMatches( matches: Match[], query: string ): Match[]
    {
        if ( !query ) return matches;
        const q = query.toLowerCase();
        return matches.filter( ( m ) =>
            m.homeTeam?.name?.toLowerCase().includes( q ) ||
            m.awayTeam?.name?.toLowerCase().includes( q ) ||
            m.competition?.name?.toLowerCase().includes( q )
        );
    }
} 