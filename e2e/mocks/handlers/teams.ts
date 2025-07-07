import { rest } from 'msw/node';

export const teamsHandlers = [
  // Получить список команд
  rest.get('http://localhost:4000/teams', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Arsenal', section: 'A' },
      { id: 2, name: 'Barcelona', section: 'B' }
    ]));
  }),
  // Добавить команду
  rest.post('http://localhost:4000/teams', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3, name: 'Chelsea', section: 'A' }));
  }),
  // Обновить команду
  rest.put('http://localhost:4000/teams/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json({ id, name: 'Updated Team', section: 'A' }));
  }),
  // Удалить команду
  rest.delete('http://localhost:4000/teams/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
]; 