import { getCompetitionsEndpoint } from '../endpoints/getCompetitions';
import { getStandingsEndpoint } from '../endpoints/getStandings';
import { Competition } from '../types/competition';
import { Standing } from '../types/standing';

export class CompetitionApiService {
  static async getCompetitions(
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
  ): Promise<Competition[]> {
    try {
      return await getCompetitionsEndpoint(client, API_KEY, axiosOptions);
    } catch (error) {
      // Можно добавить централизованную обработку ошибок
      throw error;
    }
  }

  static async getStandings(
    competitionId: number,
    client: 'fetch' | 'axios' = 'fetch',
    API_KEY: string,
    axiosOptions?: any
  ): Promise<Standing[]> {
    try {
      return await getStandingsEndpoint(competitionId, client, API_KEY, axiosOptions);
    } catch (error) {
      throw error;
    }
  }
} 