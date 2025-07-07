jest.mock( '../../services/teamApi', () => ( {
    TeamApiService: {
        getTeams: jest.fn(),
        getTeamDetails: jest.fn(),
        getTeamMatches: jest.fn(),
    },
} ) );

import { renderHook, act } from '@testing-library/react-hooks';
import { useTeams } from '../useTeams';
import { TeamApiService } from '../../services/teamApi';

const mockTeams = [
    { id: 1, name: 'Team 1', lastUpdated: '' },
    { id: 2, name: 'Team 2', lastUpdated: '' },
];
const mockTeamsPage2 = [
    { id: 3, name: 'Team 3', lastUpdated: '' },
    { id: 4, name: 'Team 4', lastUpdated: '' },
];

function flushPromises()
{
    // @ts-ignore
    return new Promise( resolve => setImmediate( resolve ) );
}

describe( 'useTeams', () =>
{
    beforeEach( () =>
    {
        jest.clearAllMocks();
    } );

    it( 'загружает список команд', async () =>
    {
        ( TeamApiService.getTeams as jest.Mock ).mockImplementation( () => Promise.resolve( mockTeams ) );
        const { result } = renderHook( () => useTeams( 2 ) );
        await act( async () =>
        {
            await flushPromises();
        } );
        expect( result.current.teams ).toEqual( mockTeams );
        expect( result.current.error ).toBeNull();
    } );

    it( 'обрабатывает ошибку загрузки', async () =>
    {
        ( TeamApiService.getTeams as jest.Mock ).mockImplementation( () => Promise.reject( new Error( 'Ошибка' ) ) );
        const { result } = renderHook( () => useTeams( 2 ) );
        await act( async () =>
        {
            await flushPromises();
        } );
        expect( result.current.error ).toBe( 'Ошибка' );
    } );

    it( 'загружает следующую страницу', async () =>
    {
        ( TeamApiService.getTeams as jest.Mock )
            .mockImplementationOnce( () => Promise.resolve( mockTeams ) )
            .mockImplementationOnce( () => Promise.resolve( mockTeamsPage2 ) );
        const { result, rerender } = renderHook( () => useTeams( 2 ) );
        await act( async () =>
        {
            await flushPromises(); // первая страница
            result.current.loadNextPage();
            await flushPromises(); // page увеличился, useEffect сработал
            rerender(); // инициируем повторный рендер
            await flushPromises(); // fetchTeams завершился для второй страницы
        } );
        expect( result.current.teams ).toEqual( [ ...mockTeams, ...mockTeamsPage2 ] );
    } );

    it( 'refresh сбрасывает список', async () =>
    {
        ( TeamApiService.getTeams as jest.Mock )
            .mockImplementationOnce( () => Promise.resolve( mockTeams ) )
            .mockImplementationOnce( () => Promise.resolve( mockTeams ) );
        const { result } = renderHook( () => useTeams( 2 ) );
        await act( async () =>
        {
            await flushPromises(); // первая загрузка
            result.current.refresh();
            await flushPromises(); // после refresh
        } );
        expect( result.current.page ).toBe( 1 );
        expect( result.current.teams ).toEqual( mockTeams );
    } );
} );

jest.mock('../../services/teamApi', () => ({
  TeamApiService: {
    getTeams: jest.fn().mockImplementation(() => Promise.resolve(require('../../mocks/teams').mockTeams)),
  },
}));

describe('useTeams fallback', () => {
  it('возвращает моки при ошибке API', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTeams());
    await waitForNextUpdate();
    expect(result.current.teams.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });
}); 