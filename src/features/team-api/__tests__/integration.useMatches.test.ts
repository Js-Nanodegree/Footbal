import { renderHook } from '@testing-library/react-hooks';
import { useMatches } from '../hooks/useMatches';
import { MockDataProvider } from '../services/MockDataProvider';
import { DataEnrichmentService } from '../services/DataEnrichmentService';
import { ErrorHandler } from '../services/ErrorHandler';

// Мокаем API-клиент
jest.mock( '../services/teamApi', () => ( {
    getTeamMatches: jest.fn().mockResolvedValue( MockDataProvider.getMock( 'matches' ) ),
} ) );

describe( 'Integration: API Football → сервисы → useMatches → UI', () =>
{
    it( 'полный путь: API → enrichment → useMatches → валидные данные', async () =>
    {
        // 1. Получаем данные с API (замоканный)
        const apiMatches = await ErrorHandler.handle(
            () => require( '../services/teamApi' ).getTeamMatches(),
            () => MockDataProvider.getMock( 'matches' )
        );
        expect( apiMatches.length ).toBeGreaterThan( 0 );

        // 2. Enrichment
        const enrichedMatches = DataEnrichmentService.ensureAllFields( apiMatches );
        expect( enrichedMatches.every( m => m.status && m.utcDate && m.homeTeam && m.awayTeam ) ).toBe( true );

        // 3. Фильтрация live-матчей
        const liveMatches = DataEnrichmentService.filterMatches( enrichedMatches, { status: 'LIVE' } );
        expect( liveMatches.every( m => m.status === 'LIVE' ) ).toBe( true );

        // 4. Фильтрация актуальных матчей (например, SCHEDULED)
        const scheduledMatches = DataEnrichmentService.filterMatches( enrichedMatches, { status: 'SCHEDULED' } );
        expect( scheduledMatches.every( m => m.status === 'SCHEDULED' ) ).toBe( true );

        // 5. Используем хук useMatches
        const { result, waitForNextUpdate } = renderHook( () => useMatches() );
        await waitForNextUpdate();
        expect( result.current.matches.length ).toBeGreaterThan( 0 );

        // 6. Проверяем фильтрацию в хуке (например, по лиге)
        act( () =>
        {
            result.current.setLeagueId( 1 );
        } );
        await waitForNextUpdate();
        expect( result.current.matches.every( m => m.competition.id === 1 ) ).toBe( true );
    } );

    it( 'по умолчанию фильтрует матчи по первой лиге', async () =>
    {
        // 1. Получаем список лиг (моки)
        const leagues = MockDataProvider.getMock( 'leagues' );
        expect( leagues.length ).toBeGreaterThan( 0 );
        const defaultLeagueId = leagues[ 0 ].id;

        // 2. Получаем матчи через useMatches
        const { result, waitForNextUpdate } = renderHook( () => useMatches() );
        await waitForNextUpdate();

        // 3. Фильтруем матчи по первой лиге
        const filteredByLeague = DataEnrichmentService.filterMatches( result.current.matches, { leagueId: defaultLeagueId } );

        // 4. Проверяем, что все матчи относятся к первой лиге
        expect( filteredByLeague.length ).toBeGreaterThan( 0 );
        expect( filteredByLeague.every( m => m.competition.id === defaultLeagueId ) ).toBe( true );
    } );
} ); 