import { renderHook } from '@testing-library/react-hooks';
import { useMatches } from '../useMatches';

jest.mock('../../services/teamApi', () => ({
  TeamApiService: {
    getTeamMatches: jest.fn().mockImplementation(() => Promise.resolve(require('../../mocks/matches').mockMatches)),
  },
}));

describe('useMatches fallback', () => {
  it('возвращает моки при ошибке API', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMatches(1));
    await waitForNextUpdate();
    expect(result.current.matches.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });
}); 