import { Match } from '../types/match';

export const mockMatches: Match[] = [
    {
        id: 101,
        utcDate: '2024-06-20T18:00:00Z',
        status: 'SCHEDULED',
        matchday: 1,
        homeTeam: {
            id: 1,
            name: 'Arsenal',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
        },
        awayTeam: {
            id: 3,
            name: 'Chelsea',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
        },
        score: {
            fullTime: { home: 0, away: 0 },
            halfTime: { home: 0, away: 0 },
            winner: null,
        },
        competition: {
            id: 1,
            name: 'Premier League',
            code: 'EPL',
            emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
        },
    },
    {
        id: 102,
        utcDate: '2024-06-21T20:00:00Z',
        status: 'FINISHED',
        matchday: 1,
        homeTeam: {
            id: 2,
            name: 'Barcelona',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
        },
        awayTeam: {
            id: 1,
            name: 'Arsenal',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
        },
        score: {
            fullTime: { home: 2, away: 1 },
            halfTime: { home: 1, away: 1 },
            winner: 'HOME_TEAM',
        },
        competition: {
            id: 2,
            name: 'La Liga',
            code: 'LL',
            emblemUrl: 'https://upload.wikimedia.org/wikipedia/en/7/79/LaLiga_Santander.svg',
        },
    },
]; 