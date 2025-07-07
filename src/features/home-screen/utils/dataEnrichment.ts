// enrichment утилиты для HomeScreen (MVP)
import { Match, MatchTeam } from '../../team-api/types/match';
import { Team } from '../../team-api/types/team';
import { Competition as League } from '../../team-api/types/competition';

// Преобразует MatchTeam в Team (минимально)
function matchTeamToTeam(mt: MatchTeam): Team {
  return {
    id: mt.id,
    name: mt.name,
    crestUrl: mt.crestUrl,
    lastUpdated: new Date().toISOString(),
  };
}

// Собирает команды из матчей, если не переданы явно
export function enrichTeamsFromMatches(matches: Match[], teams: Team[] = []): Team[] {
  const teamMap = new Map(teams.map((t) => [t.id, t]));
  matches.forEach((m) => {
    [m.homeTeam, m.awayTeam].forEach((mt) => {
      if (mt && !teamMap.has(mt.id)) teamMap.set(mt.id, matchTeamToTeam(mt));
    });
  });
  return Array.from(teamMap.values());
}

// Собирает лиги из матчей, если не переданы явно
export function enrichLeaguesFromMatches(matches: Match[], leagues: League[] = []): League[] {
  const leagueMap = new Map(leagues.map((l) => [l.id, l]));
  matches.forEach((m) => {
    if (m.competition && !leagueMap.has(m.competition.id)) leagueMap.set(m.competition.id, m.competition);
  });
  return Array.from(leagueMap.values());
}

// Competition-заглушка
const fallbackCompetition: League = {
  id: -1,
  area: { id: -1, name: 'Unknown', code: '' },
  name: 'Unknown',
  code: '',
  lastUpdated: new Date().toISOString(),
};

// Team-заглушка
const fallbackTeam: Team = {
  id: -1,
  name: 'Unknown',
  lastUpdated: new Date().toISOString(),
};

// Гарантирует наличие обязательных полей для фильтрации/сортировки
export function ensureAllFields(matches: Match[]): Match[] {
  return matches.map((m) => ({
    ...m,
    status: m.status || 'SCHEDULED',
    utcDate: m.utcDate || new Date().toISOString(),
    homeTeam: m.homeTeam || fallbackTeam,
    awayTeam: m.awayTeam || { ...fallbackTeam, id: -2 },
    competition: m.competition || fallbackCompetition,
  }));
} 