import { Team } from 'src/features/team-api/types/team';
import { Match } from 'src/features/team-api/types/match';

// Фильтрация команд по лиге
export function filterTeamsByLeague(teams: Team[], ): Team[] {
  return teams||[];
}

// Фильтрация матчей по лиге
export function filterMatchesByLeague(matches: Match[]): Match[] {
  return matches||[];
}

// Фильтрация матчей по выбранным командам
export function filterMatchesByTeams(matches: Match[], selectedTeamIds: (number | string)[]): Match[] {
  console.log( selectedTeamIds, 'selectedTeamIds' );
  if ( selectedTeamIds.length === 0 ) return matches;
  return matches.filter(
    match =>
      selectedTeamIds.includes(match.homeTeam?.id) ||
      selectedTeamIds.includes(match.awayTeam?.id)
  );
} 