import { rest } from 'msw';

const allMatches = [
  { id: 101, homeTeam: 'Arsenal', awayTeam: 'Chelsea', status: 'LIVE', date: '2024-06-20', tournament: 'EPL' },
  { id: 102, homeTeam: 'Barcelona', awayTeam: 'Real Madrid', status: 'FINISHED', date: '2024-06-19', tournament: 'La Liga' },
];

export const filtersHandlers = [
  // Фильтрация матчей по турниру и статусу
  rest.get('http://localhost:4000/matches', (req, res, ctx) => {
    const tournament = req.url.searchParams.get('tournament');
    const status = req.url.searchParams.get('status');
    let data = [...allMatches];
    if (tournament) data = data.filter(m => m.tournament === tournament);
    if (status) data = data.filter(m => m.status === status);
    return res(ctx.json(data));
  }),
]; 