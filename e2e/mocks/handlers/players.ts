import { rest } from 'msw';

export const playersHandlers = [
    // Получить список игроков
    rest.get( 'http://localhost:4000/players', ( req, res, ctx ) =>
    {
        return res( ctx.json( [
            { id: 201, name: 'Messi', team: 'Barcelona', position: 'Forward' },
            { id: 202, name: 'Saka', team: 'Arsenal', position: 'Midfielder' }
        ] ) );
    } ),
    // Получить детали игрока
    rest.get( 'http://localhost:4000/players/:id', ( req, res, ctx ) =>
    {
        const { id } = req.params;
        if ( id === '201' )
        {
            return res( ctx.json( { id: 201, name: 'Messi', team: 'Barcelona', position: 'Forward', stats: { goals: 30 } } ) );
        }
        return res( ctx.status( 404 ), ctx.json( { error: 'Player not found' } ) );
    } ),
]; 