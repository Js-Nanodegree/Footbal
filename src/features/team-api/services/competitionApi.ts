import { getCompetitionsEndpoint } from '../endpoints/getCompetitions';
import { getStandingsEndpoint } from '../endpoints/getStandings';
import { Competition } from '../types/competition';
import { Standing } from '../types/standing';

// Моки для competitions
export const mockCompetitions: Competition[] = [
  {
    id: 1,
    area: { id: 2072, name: 'England', code: 'ENG' },
    name: 'Premier League',
    code: 'EPL',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    plan: 'TIER_ONE',
    lastUpdated: '2024-06-20T00:00:00Z',
  },
  {
    id: 2,
    area: { id: 2224, name: 'Spain', code: 'ESP' },
    name: 'La Liga',
    code: 'LL',
    emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/7/79/LaLiga_Santander.svg',
    plan: 'TIER_ONE',
    lastUpdated: '2024-06-20T00:00:00Z',
  },
];

// Моки для standings
export const mockStandings: Standing[] = [
  {
    stage: 'REGULAR_SEASON',
    type: 'TOTAL',
    group: 'A',
    table: [
      {
        position: 1,
        team: {
          id: 1,
          name: 'Arsenal',
          crest: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
        },
        playedGames: 38,
        won: 28,
        draw: 6,
        lost: 4,
        points: 90,
        goalsFor: 85,
        goalsAgainst: 30,
        goalDifference: 55,
      },
      {
        position: 2,
        team: {
          id: 2,
          name: 'Manchester City',
          crest: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
        },
        playedGames: 38,
        won: 26,
        draw: 8,
        lost: 4,
        points: 86,
        goalsFor: 80,
        goalsAgainst: 32,
        goalDifference: 48,
      },
    ],
  },
];

export class CompetitionApiService {
  static async getCompetitions(
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
  ): Promise<Competition[]> {
    return mockCompetitions;

    // try {
    //   return await getCompetitionsEndpoint(client, API_KEY, axiosOptions);
    // } catch (error) {
    //   // Можно добавить централизованную обработку ошибок
    //   throw error;
    // }
  }

  static async getStandings(
    competitionId: number,
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
  ): Promise<Standing[]> {
    return mockStandings;

    // try {
    //   return await getStandingsEndpoint(competitionId, client, API_KEY, axiosOptions);
    // } catch (error) {
    //   // Возвращаем моки при ошибке
    // return mockStandings;
    // }
  }
} 