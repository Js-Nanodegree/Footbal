import { Match } from '../types/match';
import { Team } from '../types/team';
import { Competition } from '../types/competition';
import { Standing } from '../types/standing';
import { mockMatches } from '../mocks/matches';
import { mockTeams } from '../mocks/teams';
import { mockLeagues } from '../mocks/leagues';
// Если появятся моки standings, leagues — добавить сюда

export class MockDataProvider {
  static getMock(type: 'matches' | 'teams' | 'standings' | 'leagues'): Match[] | Team[] | Standing[] | Competition[] {
    switch (type) {
      case 'matches':
        return mockMatches as Match[];
      case 'teams':
        return mockTeams as Team[];
      case 'leagues':
        return mockLeagues as Competition[];
      // case 'standings': return standings as Standing[];
      default:
        return [];
    }
  }
} 