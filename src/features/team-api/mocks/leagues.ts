import { Competition } from '../types/competition';

export const mockLeagues: Competition[] = [
  {
    id: 1,
    area: { id: 100, name: 'England', code: 'ENG' },
    name: 'Premier League',
    code: 'PL',
    lastUpdated: '2024-06-20T00:00:00Z',
  },
  {
    id: 2,
    area: { id: 200, name: 'Spain', code: 'ESP' },
    name: 'La Liga',
    code: 'LL',
    lastUpdated: '2024-06-20T00:00:00Z',
  },
]; 