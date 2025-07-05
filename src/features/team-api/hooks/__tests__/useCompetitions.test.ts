import { renderHook, act } from '@testing-library/react-hooks';
import { useCompetitions } from '../useCompetitions';
import { CompetitionApiService } from '../../services/competitionApi';

jest.mock('../../services/competitionApi');

const mockCompetitions = [
  { id: 1, name: 'Premier League', code: 'PL', area: { id: 2072, name: 'England', code: 'ENG', flag: '' }, lastUpdated: '', type: 'LEAGUE' },
  { id: 2, name: 'La Liga', code: 'LL', area: { id: 2224, name: 'Spain', code: 'ESP', flag: '' }, lastUpdated: '', type: 'LEAGUE' },
];

describe('useCompetitions', () => {
  beforeEach(() => {
    (CompetitionApiService.getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('загружает список турниров', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCompetitions('axios', 'test_key'));
    await waitForNextUpdate();
    expect(result.current.competitions).toEqual(mockCompetitions);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('обрабатывает ошибку загрузки', async () => {
    (CompetitionApiService.getCompetitions as jest.Mock).mockRejectedValue(new Error('Ошибка'));
    const { result, waitForNextUpdate } = renderHook(() => useCompetitions('axios', 'test_key'));
    await waitForNextUpdate();
    expect(result.current.error).toBe('Ошибка');
    expect(result.current.loading).toBe(false);
  });

  it('refresh повторно загружает турниры', async () => {
    (CompetitionApiService.getCompetitions as jest.Mock).mockResolvedValue(mockCompetitions);
    const { result, waitForNextUpdate } = renderHook(() => useCompetitions('axios', 'test_key'));
    await waitForNextUpdate();
    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(result.current.competitions).toEqual(mockCompetitions);
  });
}); 