import { Team } from '../types/team';
import { Player } from '../types/player';
import { Match } from '../types/match';
import { z } from 'zod';
import { FOOTBALL_API_KEY } from '@env';

// Базовый URL football-data.org
const BASE_URL = 'https://api.football-data.org/v4';

// Ключ API импортируется из .env через @env
const API_KEY = FOOTBALL_API_KEY || '';

// Zod-схемы для валидации (можно расширять)
export const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TeamsResponseSchema = z.object({
  count: z.number(),
  teams: z.array(TeamSchema),
});

export const MatchSchema = z.object({
  id: z.number(),
  utcDate: z.string(),
});

export const MatchesResponseSchema = z.object({
  count: z.number(),
  matches: z.array(MatchSchema),
});

// Централизованный обработчик ошибок
function handleApiError(error: unknown): never {
  if (error instanceof z.ZodError) {
    throw new Error('Ошибка валидации данных API');
  }
  if (error instanceof Error) {
    throw new Error(`API error: ${error.message}`);
  }
  throw new Error('Неизвестная ошибка API');
}

export class TeamApiService {
  static async getTeams(page = 1, pageSize = 20): Promise<Team[]> {
    try {
      const res = await fetch(`${BASE_URL}/teams?limit=${pageSize}&offset=${(page-1)*pageSize}`, {
        headers: { 'X-Auth-Token': API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const parsed = TeamsResponseSchema.parse(data);
      return parsed.teams as Team[];
    } catch (error) {
      handleApiError(error);
    }
  }

  static async getTeamDetails(teamId: number): Promise<Team> {
    try {
      const res = await fetch(`${BASE_URL}/teams/${teamId}`, {
        headers: { 'X-Auth-Token': API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return TeamSchema.parse(data) as Team;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async getTeamMatches(teamId: number): Promise<Match[]> {
    try {
      const res = await fetch(`${BASE_URL}/teams/${teamId}/matches`, {
        headers: { 'X-Auth-Token': API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const parsed = MatchesResponseSchema.parse(data);
      return parsed.matches as Match[];
    } catch (error) {
      handleApiError(error);
    }
  }
}

// Контекст: Сервис TeamApiService инкапсулирует работу с API football-data.org, типизирует и валидирует ответы, централизует обработку ошибок. 