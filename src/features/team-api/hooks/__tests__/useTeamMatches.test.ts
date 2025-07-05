jest.mock( '../../services/teamApi', () => ( {
    TeamApiService: {
        getTeams: jest.fn(),
        getTeamDetails: jest.fn(),
        getTeamMatches: jest.fn(),
    },
} ) );

import { renderHook, act } from '@testing-library/react-hooks';
import { useTeamMatches } from '../useTeamMatches';
import { TeamApiService } from '../../services/teamApi';

const mockMatches = [
    { id: 1, utcDate: '', competition: { id: 1, name: '' }, season: { id: 1, startDate: '', endDate: '' }, status: '', homeTeam: { id: 1, name: '' }, awayTeam: { id: 2, name: '' }, score: { fullTime: { homeTeam: 1, awayTeam: 2 } }, lastUpdated: '' },
];

describe( 'useTeamMatches', () =>
{
    beforeEach( () =>
    {
        ( TeamApiService.getTeamMatches as jest.Mock ).mockResolvedValue( mockMatches );
    } );
    afterEach( () =>
    {
        jest.clearAllMocks();
    } );

    it( 'загружает матчи команды', async () =>
    {
        const { result, waitForNextUpdate } = renderHook( () => useTeamMatches( 1 ) );
        await waitForNextUpdate();
        expect( result.current.matches ).toEqual( mockMatches );
        expect( result.current.loading ).toBe( false );
        expect( result.current.error ).toBeNull();
    } );

    it( 'обрабатывает ошибку загрузки', async () =>
    {
        ( TeamApiService.getTeamMatches as jest.Mock ).mockRejectedValue( new Error( 'Ошибка' ) );
        const { result, waitForNextUpdate } = renderHook( () => useTeamMatches( 1 ) );
        await waitForNextUpdate();
        expect( result.current.error ).toBe( 'Ошибка' );
        expect( result.current.loading ).toBe( false );
    } );

    it( 'refresh повторно загружает матчи', async () =>
    {
        ( TeamApiService.getTeamMatches as jest.Mock ).mockResolvedValue( mockMatches );
        const { result, waitForNextUpdate } = renderHook( () => useTeamMatches( 1 ) );
        await waitForNextUpdate();
        act( () =>
        {
            result.current.refresh();
        } );
        await waitForNextUpdate();
        expect( result.current.matches ).toEqual( mockMatches );
    } );
} ); 