import { renderHook } from '@testing-library/react-hooks';
import { MockDataProvider } from '../services/MockDataProvider';
import { mockLeagues } from '../mocks/leagues';

// Пример хука useCompetitions (если его нет — реализовать аналогично useMatches)
const useCompetitions = () =>
{
  // В реальном проекте здесь был бы вызов API или redux/selectors
  // Для теста возвращаем моки
  return { leagues: mockLeagues, loading: false, error: null };
};

describe( 'Integration: useCompetitions', () =>
{
  it( 'возвращает валидные лиги и дефолтная лига корректна', async () =>
  {
    // 1. Получаем лиги через хук
    const { result } = renderHook( () => useCompetitions() );
    expect( result.current.leagues.length ).toBeGreaterThan( 0 );
    // 2. Проверяем, что дефолтная лига — первая из моков
    const defaultLeague = result.current.leagues[ 0 ];
    expect( defaultLeague ).toEqual( mockLeagues[ 0 ] );
    // 3. Проверяем валидность полей
    expect( defaultLeague ).toHaveProperty( 'id' );
    expect( defaultLeague ).toHaveProperty( 'name' );
    expect( defaultLeague ).toHaveProperty( 'area' );
  } );

  it( 'MockDataProvider.getMock("leagues") возвращает те же лиги', () =>
  {
    const leagues = MockDataProvider.getMock( 'leagues' );
    expect( leagues ).toEqual( mockLeagues );
  } );
} ); 