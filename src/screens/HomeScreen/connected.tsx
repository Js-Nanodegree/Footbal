import React from 'react';
import Screen from './screen';
import { AppContextProvider } from 'src/features/home-screen/context';
// import { useMatches } from 'src/features/team-api/hooks/useMatches';
// import { useCompetitions } from 'src/features/team-api/hooks/useCompetitions';
// import { useTeams } from 'src/features/team-api/hooks/useTeams';

// Моковые данные
const mockMatches = [
    {
        id: 1,
        homeTeam: { name: 'Барселона', logo: 'https://upload.wikimedia.org/wikipedia/ru/4/47/FCB.svg' },
        awayTeam: { name: 'Реал Мадрид', logo: 'https://upload.wikimedia.org/wikipedia/ru/9/98/Real_Madrid.png' },
        homeScore: 2,
        awayScore: 1,
        league: 'Ла Лига',
        time: '2025-06-20T19:00:00Z',
        stadium: 'Камп Ноу',
        backgroundLogo: 'https://upload.wikimedia.org/wikipedia/ru/4/47/FCB.svg',
    },
    {
        id: 2,
        homeTeam: { name: 'Манчестер Сити', logo: 'https://upload.wikimedia.org/wikipedia/ru/e/eb/Manchester_City_FC_badge.svg' },
        awayTeam: { name: 'Ливерпуль', logo: 'https://upload.wikimedia.org/wikipedia/ru/0/0c/Liverpool_FC.svg' },
        homeScore: 1,
        awayScore: 1,
        league: 'АПЛ',
        time: '2025-06-21T17:30:00Z',
        stadium: 'Этихад',
        backgroundLogo: 'https://upload.wikimedia.org/wikipedia/ru/e/eb/Manchester_City_FC_badge.svg',
    },
];

const mockCompetitions = [
    {
        id: 101,
        name: 'Ла Лига',
        area: { name: 'Испания' },
        emblemUrl: 'https://upload.wikimedia.org/wikipedia/ru/9/92/La_Liga.png',
    },
    {
        id: 102,
        name: 'АПЛ',
        area: { name: 'Англия' },
        emblemUrl: 'https://upload.wikimedia.org/wikipedia/ru/f/f2/Premier_League_Logo.svg',
    },
];

const mockTeams = [
    {
        id: 201,
        name: 'Барселона',
        area: { name: 'Испания' },
        crestUrl: 'https://upload.wikimedia.org/wikipedia/ru/4/47/FCB.svg',
    },
    {
        id: 202,
        name: 'Реал Мадрид',
        area: { name: 'Испания' },
        crestUrl: 'https://upload.wikimedia.org/wikipedia/ru/9/98/Real_Madrid.png',
    },
    {
        id: 203,
        name: 'Манчестер Сити',
        area: { name: 'Англия' },
        crestUrl: 'https://upload.wikimedia.org/wikipedia/ru/e/eb/Manchester_City_FC_badge.svg',
    },
];

export default function HomeScreenConnected()
{
    return (
        <AppContextProvider>
            <Screen />
        </AppContextProvider>
    );
}
