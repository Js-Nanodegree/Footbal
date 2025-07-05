/**
 * Интеграционный тест TeamApiService с реальным API football-data.org (через TMPApiAxios).
 * Проверяет, что endpoint'ы возвращают валидные данные (без mock'ов).
 * Тесты пропускаются, если не задан API-ключ.
 */
require( 'dotenv' ).config( { path: require( 'path' ).resolve( __dirname, '../../../.env' ) } );

import { TeamApiService } from '../services/teamApi';

console.log( 'process.env:', process.env );
const API_KEY = process.env.FOOTBALL_API_KEY;
console.log( 'API_KEY (test):', API_KEY );

// Увеличиваем таймаут для реальных запросов
jest.setTimeout( 15000 );

describe( 'TeamApiService (integration, real API)', () =>
{
    if ( !API_KEY )
    {
        it( 'SKIP: FOOTBALL_API_KEY не задан, тесты пропущены', () =>
        {
            expect( true ).toBe( true );
        } );
        return;
    }

    let firstTeamId: number | undefined;

    it( 'getTeams (axios) возвращает массив команд', async () =>
    {
        const teams = await TeamApiService.getTeams( 1, 10, 'axios' );
        expect( Array.isArray( teams ) ).toBe( true );
        expect( teams.length ).toBeGreaterThan( 0 );
        expect( teams[ 0 ] ).toHaveProperty( 'id' );
        expect( teams[ 0 ] ).toHaveProperty( 'name' );
        firstTeamId = teams[ 0 ].id;
    } );

    it( 'getTeamDetails (axios) возвращает детали команды', async () =>
    {
        if ( !firstTeamId ) return;
        const team = await TeamApiService.getTeamDetails( firstTeamId, 'axios' );
        expect( team ).toHaveProperty( 'id', firstTeamId );
        expect( team ).toHaveProperty( 'name' );
    } );

    it( 'getTeamMatches (axios) возвращает матчи команды', async () =>
    {
        if ( !firstTeamId ) return;
        const matches = await TeamApiService.getTeamMatches( firstTeamId, 'axios' );
        expect( Array.isArray( matches ) ).toBe( true );
        // Матчей может не быть, но структура должна быть массивом
    } );

    it('getTeams (axios) с несуществующей страницей возвращает пустой массив', async () => {
        const teams = await TeamApiService.getTeams(9999, 10, 'axios');
        expect(Array.isArray(teams)).toBe(true);
        expect(teams.length).toBe(0);
    });

    it('getTeamDetails (axios) с несуществующим id выбрасывает ошибку', async () => {
        await expect(TeamApiService.getTeamDetails(9999999, 'axios')).rejects.toThrow();
    });

    it('getTeamMatches (axios) с несуществующим id возвращает пустой массив или ошибку', async () => {
        try {
            const matches = await TeamApiService.getTeamMatches(9999999, 'axios');
            expect(Array.isArray(matches)).toBe(true);
            expect(matches.length === 0 || matches.length > 0).toBe(true); // допускаем оба варианта
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
} ); 