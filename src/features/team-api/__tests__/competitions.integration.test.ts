import { CompetitionApiService } from '../services/competitionApi';
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

jest.setTimeout(15000);

describe('CompetitionApiService (integration, real API)', () => {
  if (!API_KEY) {
    it('SKIP: FOOTBALL_DATA_API_KEY не задан, тесты пропущены', () => {
      expect(true).toBe(true);
    });
    return;
  }

  it('getCompetitions (axios) возвращает массив турниров', async () => {
    const competitions = await CompetitionApiService.getCompetitions('axios', API_KEY);
    expect(Array.isArray(competitions)).toBe(true);
    expect(competitions.length).toBeGreaterThan(0);
    expect(competitions[0]).toHaveProperty('id');
    expect(competitions[0]).toHaveProperty('name');
    expect(competitions[0]).toHaveProperty('code');
    expect(competitions[0]).toHaveProperty('area');
  });

  it('getCompetitions (axios) с невалидным ключом выбрасывает ошибку', async () => {
    await expect(CompetitionApiService.getCompetitions('axios', 'invalid_key')).rejects.toThrow();
  });
}); 