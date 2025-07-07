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
            fullTime: { homeTeam: 0, awayTeam: 0 },
            halfTime: { homeTeam: 0, awayTeam: 0 },
            winner: null,
        },
        competition: {
            id: 1,
            name: 'Premier League',
        },
        season: { id: 1, startDate: '2024-06-01', endDate: '2025-05-31' },
        lastUpdated: '2024-06-20T00:00:00Z',
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
            fullTime: { homeTeam: 2, awayTeam: 1 },
            halfTime: { homeTeam: 1, awayTeam: 1 },
            winner: 'HOME_TEAM',
        },
        competition: {
            id: 2,
            name: 'La Liga',
        },
        season: { id: 2, startDate: '2024-06-01', endDate: '2025-05-31' },
        lastUpdated: '2024-06-20T00:00:00Z',
    },
    {
        id: 103,
        utcDate: '2024-06-22T19:00:00Z',
        status: 'LIVE',
        matchday: 2,
        homeTeam: {
            id: 4,
            name: 'Real Madrid',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
        },
        awayTeam: {
            id: 2,
            name: 'Barcelona',
            crestUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
        },
        score: {
            fullTime: { homeTeam: 1, awayTeam: 1 },
            halfTime: { homeTeam: 1, awayTeam: 0 },
            winner: null,
        },
        competition: {
            id: 2,
            name: 'La Liga',
        },
        season: { id: 2, startDate: '2024-06-01', endDate: '2025-05-31' },
        lastUpdated: '2024-06-20T00:00:00Z',
    },
]; 