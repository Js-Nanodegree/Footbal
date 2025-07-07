export const exampleLeagues = Array.from( { length: 10 }, ( _, i ) => ( {
    id: i + 1,
    area: { id: 2000 + i, name: `Country ${ i + 1 }`, code: `C${ i + 1 }`, flag: '' },
    name: `League ${ i + 1 }`,
    code: `L${ i + 1 }`,
    type: 'LEAGUE',
    emblem: 'https://upload.wikimedia.org/wikipedia/ru/f/f2/Premier_League_Logo.svg',
    plan: 'TIER_ONE',
    currentSeason: {
        id: 100 + i,
        startDate: '2023-08-01',
        endDate: '2024-05-31',
        currentMatchday: 12
    },
    numberOfAvailableSeasons: 10,
    lastUpdated: '2024-06-20T12:00:00Z'
} ) ); 