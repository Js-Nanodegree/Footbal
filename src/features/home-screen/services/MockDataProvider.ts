// MockDataProvider: централизованный сервис для мок-данных HomeScreen
import { exampleMatches } from '../mocks/exampleMatches';
import { exampleTeams } from '../mocks/exampleTeams';
import { exampleLeagues } from '../mocks/exampleLeagues';
import { Match } from '../../team-api/types/match';
import { Team } from '../../team-api/types/team';
import { Competition } from '../../team-api/types/competition';

export class MockDataProvider {
  static getMock(type: 'matches' | 'teams' | 'leagues'): Match[] | Team[] | Competition[] {
    switch (type) {
      case 'matches':
        return exampleMatches as Match[];
      case 'teams':
        return exampleTeams as Team[];
      case 'leagues':
        return exampleLeagues as Competition[];
      default:
        return [];
    }
  }
  // Можно добавить getRandomMock, getEmptyMock и т.д. для edge-cases
} 