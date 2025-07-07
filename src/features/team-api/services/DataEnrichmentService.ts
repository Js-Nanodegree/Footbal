import { Match } from '../types/match';
import { Team } from '../types/team';
import { Competition } from '../types/competition';
import { Standing } from '../types/standing';

const fallbackTeam: Team = {
  id: -1,
  name: 'Unknown',
  lastUpdated: new Date().toISOString(),
  area: { id: -1, name: 'Unknown' },
};

const fallbackCompetition: Competition = {
  id: -1,
  area: { id: -1, name: 'Unknown', code: '' },
  name: 'Unknown',
  code: '',
  lastUpdated: new Date().toISOString(),
};

export class DataEnrichmentService {
  static enrichTeamsFromMatches(matches: Match[], teams: Team[] = []): Team[] {
    const teamMap = new Map(teams.map((t) => [t.id, t]));
    matches.forEach((m) => {
      [m.homeTeam, m.awayTeam].forEach((mt) => {
        if (mt && !teamMap.has(mt.id)) teamMap.set(mt.id, {
          id: mt.id,
          name: mt.name,
          crestUrl: mt.crestUrl,
          lastUpdated: new Date().toISOString(),
          area: mt.area || { id: -1, name: 'Unknown' },
        });
      });
    });
    return Array.from(teamMap.values());
  }

  static enrichLeaguesFromMatches(matches: Match[], leagues: Competition[] = []): Competition[] {
    const leagueMap = new Map(leagues.map((l) => [l.id, l]));
    matches.forEach((m) => {
      if (m.competition && !leagueMap.has(m.competition.id)) leagueMap.set(m.competition.id, {
        id: m.competition.id,
        area: m.competition.area || { id: -1, name: 'Unknown', code: '' },
        name: m.competition.name,
        code: m.competition.code || '',
        lastUpdated: new Date().toISOString(),
      });
    });
    return Array.from(leagueMap.values());
  }

  static ensureAllFields(matches: Match[]): Match[] {
    return matches.map((m) => ({
      ...m,
      status: m.status || 'SCHEDULED',
      utcDate: m.utcDate || new Date().toISOString(),
      homeTeam: m.homeTeam || fallbackTeam,
      awayTeam: m.awayTeam || { ...fallbackTeam, id: -2 },
      competition: m.competition || fallbackCompetition,
    }));
  }

  static filterMatches(matches: Match[], filters: {
    status?: string;
    leagueId?: number;
    teamId?: number;
    date?: string;
  }): Match[] {
    return matches.filter((m) => {
      if (filters.status && m.status !== filters.status) return false;
      if (filters.leagueId && m.competition?.id !== filters.leagueId) return false;
      if (filters.teamId && m.homeTeam?.id !== filters.teamId && m.awayTeam?.id !== filters.teamId) return false;
      if (filters.date && !m.utcDate?.startsWith(filters.date)) return false;
      return true;
    });
  }

  static sortMatches(matches: Match[], order: 'asc' | 'desc' = 'asc'): Match[] {
    return matches.slice().sort((a, b) => {
      const da = new Date(a.utcDate).getTime();
      const db = new Date(b.utcDate).getTime();
      return order === 'asc' ? da - db : db - da;
    });
  }

  static searchMatches(matches: Match[], query: string): Match[] {
    if (!query) return matches;
    const q = query.toLowerCase();
    return matches.filter((m) =>
      m.homeTeam?.name?.toLowerCase().includes(q) ||
      m.awayTeam?.name?.toLowerCase().includes(q) ||
      m.competition?.name?.toLowerCase().includes(q)
    );
  }

  // Аналогично можно добавить enrichment/filter/sort/search для standings, players и т.д.
} 