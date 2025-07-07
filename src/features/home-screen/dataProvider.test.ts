import { getHomeScreenData, HomeScreenData } from './dataProvider';
import { clearCache } from '../../shared/memory-bank/mmkvMemoryBank';

describe('dataProvider', () => {
  const MMKV_KEY = 'homeScreenData';

  beforeEach(() => {
    clearCache(MMKV_KEY);
  });

  it('getHomeScreenData: возвращает валидные enriched данные', async () => {
    const data: HomeScreenData = await getHomeScreenData();
    expect(Array.isArray(data.matches)).toBe(true);
    expect(Array.isArray(data.teams)).toBe(true);
    expect(Array.isArray(data.leagues)).toBe(true);
    expect(data.matches.length).toBeGreaterThan(0);
    expect(data.teams.length).toBeGreaterThan(0);
    expect(data.leagues.length).toBeGreaterThan(0);
    // Проверяем обязательные поля
    data.matches.forEach(m => {
      expect(m.status).toBeTruthy();
      expect(m.utcDate).toBeTruthy();
      expect(m.homeTeam).toBeTruthy();
      expect(m.awayTeam).toBeTruthy();
      expect(m.competition).toBeTruthy();
    });
  });

  it('getHomeScreenData: повторный вызов возвращает данные из MMKV', async () => {
    const data1 = await getHomeScreenData();
    const data2 = await getHomeScreenData();
    expect(data2.lastUpdated).toBe(data1.lastUpdated);
    expect(data2.matches.length).toBe(data1.matches.length);
  });
}); 