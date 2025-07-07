import { exampleMatches } from '../mocks/exampleMatches';
import { DataEnrichmentService } from '../services/DataEnrichmentService';

describe( 'DataEnrichmentService', () =>
{
  it('enrichTeamsFromMatches: собирает все команды из матчей', () => {
    const teams = DataEnrichmentService.enrichTeamsFromMatches( exampleMatches, [] );
    expect(teams.length).toBeGreaterThan(0);
    // Все id уникальны
    const ids = teams.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('enrichLeaguesFromMatches: собирает все лиги из матчей', () => {
    const leagues = DataEnrichmentService.enrichLeaguesFromMatches( exampleMatches, [] );
    expect(leagues.length).toBeGreaterThan(0);
    // Все id уникальны
    const ids = leagues.map(l => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ensureAllFields: гарантирует обязательные поля', () => {
    const matches = DataEnrichmentService.ensureAllFields( exampleMatches );
    matches.forEach(m => {
      expect(m.status).toBeTruthy();
      expect(m.utcDate).toBeTruthy();
      expect(m.homeTeam).toBeTruthy();
      expect(m.awayTeam).toBeTruthy();
      expect(m.competition).toBeTruthy();
    });
  });
}); 