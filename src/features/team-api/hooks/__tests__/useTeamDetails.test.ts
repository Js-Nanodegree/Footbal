jest.mock('../../services/teamApi', () => ({
  TeamApiService: {
    getTeams: jest.fn(),
    getTeamDetails: jest.fn(),
    getTeamMatches: jest.fn(),
  },
}));

import { renderHook, act } from '@testing-library/react-hooks';
import { useTeamDetails } from '../useTeamDetails';
import { TeamApiService } from '../../services/teamApi';

const mockTeam = { id: 1, name: 'Team 1', lastUpdated: '' };

describe('useTeamDetails', () => {
  beforeEach(() => {
    (TeamApiService.getTeamDetails as jest.Mock).mockResolvedValue(mockTeam);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('загружает детали команды', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTeamDetails(1));
    await waitForNextUpdate();
    expect(result.current.team).toEqual(mockTeam);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('обрабатывает ошибку загрузки', async () => {
    (TeamApiService.getTeamDetails as jest.Mock).mockRejectedValue(new Error('Ошибка'));
    const { result, waitForNextUpdate } = renderHook(() => useTeamDetails(1));
    await waitForNextUpdate();
    expect(result.current.error).toBe('Ошибка');
    expect(result.current.loading).toBe(false);
  });

  it('refresh повторно загружает детали', async () => {
    (TeamApiService.getTeamDetails as jest.Mock).mockResolvedValue(mockTeam);
    const { result, waitForNextUpdate } = renderHook(() => useTeamDetails(1));
    await waitForNextUpdate();
    act(() => {
      result.current.refresh();
    });
    await waitForNextUpdate();
    expect(result.current.team).toEqual(mockTeam);
  });
}); 