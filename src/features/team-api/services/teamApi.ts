import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { tmpApiAxios } from '../clients/tmpApiAxios'; // Импорт singleton-инстанса
import { mockTeams } from '../mocks/teams';
import { Match } from '../types/match';
import { Team } from '../types/team';
import { TeamSchema } from '../zod/teamSchema';

// @ts-ignore
// eslint-disable-next-line no-var
declare var process: any;

// Универсальное получение API_KEY для Node.js и React Native:
let API_KEY = '';
try
{
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  API_KEY = require( '@env' ).FOOTBALL_DATA_API_KEY || '';
} catch ( e )
{
  if ( typeof process !== 'undefined' && process.env && process.env.FOOTBALL_DATA_API_KEY )
  {
    API_KEY = process.env.FOOTBALL_DATA_API_KEY;
  }
}

// Zod-схемы для валидации (можно расширять)
export const TeamsResponseSchema = z.object({
  count: z.number(),
  teams: z.array(TeamSchema),
});

export const MatchSchema = z.object({
  id: z.number(),
  utcDate: z.string(),
});

// MatchesResponseSchema: соответствует реальному ответу API getTeamMatches
export const MatchesResponseSchema = z.object({
  filters: z.unknown(), // фильтры (можно описать подробнее при необходимости)
  resultSet: z.unknown(), // метаинформация о выдаче
  matches: z.array(
    z.object( {
      area: z.object( {
        id: z.number(),
        name: z.string(),
        code: z.string().optional(),
        flag: z.string().optional(),
      } ),
      competition: z.object( {
        id: z.number(),
        name: z.string(),
        code: z.string().optional(),
        type: z.string().optional(),
        emblem: z.string().optional(),
      } ),
      season: z.object( {
        id: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        currentMatchday: z.number().nullable(),
        winner: z.unknown().nullable(),
      } ),
      id: z.number(),
      utcDate: z.string(),
      status: z.string(),
      matchday: z.number().nullable(),
      stage: z.string().nullable(),
      group: z.string().nullable(),
      lastUpdated: z.string(),
      homeTeam: z.object( {
        id: z.number(),
        name: z.string(),
        shortName: z.string().optional(),
        tla: z.string().optional(),
        crest: z.string().optional(),
      } ),
      awayTeam: z.object( {
        id: z.number(),
        name: z.string(),
        shortName: z.string().optional(),
        tla: z.string().optional(),
        crest: z.string().optional(),
      } ),
      score: z.object( {
        winner: z.string().nullable(),
        duration: z.string().nullable(),
        fullTime: z.object( { home: z.number().nullable(), away: z.number().nullable() } ),
        halfTime: z.object( { home: z.number().nullable(), away: z.number().nullable() } ),
      } ),
      odds: z.object( { msg: z.string().optional() } ).optional(),
      referees: z.array( z.unknown() ),
    } )
  ),
});
// Эпизация: структура ответа getTeamMatches включает filters, resultSet и массив матчей (matches) с полной типизацией каждого поля согласно football-data.org API.

// Централизованный обработчик ошибок
function handleApiError(error: unknown): never {
  if (error instanceof z.ZodError) {
    throw new Error('Ошибка валидации данных API');
  }
  // AxiosError с кастомным message
  if (error instanceof Error) {
    throw new Error( error.message );
  }
  throw new Error('Неизвестная ошибка API');
}

export class TeamApiService {
  static async getTeams(
    page = 1,
    pageSize = 20,
    client: 'fetch' | 'axios' = 'fetch',
    axiosOptions?: AxiosRequestConfig
  ): Promise<Team[]>
  {
    const url = `/teams?limit=${ pageSize }&offset=${ ( page - 1 ) * pageSize }`;
    try {
      if ( client === 'axios' )
      {
        const data = await tmpApiAxios.request( {
          url,
          method: 'get',
          ...( axiosOptions || {} ),
        } );
        const parsed = TeamsResponseSchema.parse( data );
        return parsed.teams as Team[];
      } else
      {
        const res = await fetch( url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        const parsed = TeamsResponseSchema.parse( data );
        return parsed.teams as Team[];
      }
    } catch (error) {
      // Логируем ошибку
      console.error( 'Ошибка получения команд или валидации Zod:', error );
      // TODO: [2024-06-20] refactor: Разделить обработку ошибок API и ошибок валидации Zod, возвращать моки только при ошибке схемы
      return mockTeams;
    }
  }

  static async getTeamDetails(
    teamId?: number,
    client: 'fetch' | 'axios' = 'fetch',
    axiosOptions?: AxiosRequestConfig
  ): Promise<Team>
  {
    if ( !teamId )
    {
      // Возвращаем первый мок, если teamId не передан
      return mockTeams[ 0 ];
    }
    const url = `/teams/${ teamId }`;
    try {
      if ( client === 'axios' )
      {
        const data = await tmpApiAxios.request( {
          url,
          method: 'get',
          ...( axiosOptions || {} ),
        } );
        return TeamSchema.parse( data ) as Team;
      } else
      {
        const res = await fetch( url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        return TeamSchema.parse( data ) as Team;
      }
    } catch (error) {
      // Логируем ошибку
      console.error( 'Ошибка получения деталей команды или валидации Zod:', error );
      // TODO: [2024-06-20] refactor: Разделить обработку ошибок API и ошибок валидации Zod, возвращать моки только при ошибке схемы
      return mockTeams[ 0 ];
    }
  }

  static async getTeamMatches(
    teamId: number,
    client: 'fetch' | 'axios' = 'fetch',
    axiosOptions?: AxiosRequestConfig
  ): Promise<Match[]>
  {
    const url = `/teams/${ teamId }/matches`;
    try {
      if ( client === 'axios' )
      {
        const data = await tmpApiAxios.request( {
          url,
          method: 'get',
          ...( axiosOptions || {} ),
        } );
        const parsed = MatchesResponseSchema.parse( data );
        return parsed.matches as unknown as Match[];
      } else
      {
        const res = await fetch( url, { headers: { 'X-Auth-Token': API_KEY } } );
        if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
        const data = await res.json();
        const parsed = MatchesResponseSchema.parse( data );
        return parsed.matches as unknown as Match[];
      }
    } catch (error) {
      // Логируем ошибку
      console.error( 'Ошибка получения матчей команды или валидации Zod:', error );
      // TODO: [2024-06-20] refactor: Разделить обработку ошибок API и ошибок валидации Zod, возвращать моки только при ошибке схемы
      return [];
    }
  }
}

// Контекст: Сервис TeamApiService инкапсулирует работу с API football-data.org, поддерживает fetch и axios, позволяет настраивать baseURL, headers и опции через tmpApiAxios. 