import { exampleLeagues } from './exampleLeagues';

const logos = [
    'https://upload.wikimedia.org/wikipedia/ru/e/eb/Manchester_City_FC_badge.svg',
    'https://upload.wikimedia.org/wikipedia/ru/0/0c/Crystal_Palace_FC_logo.svg',
    'https://upload.wikimedia.org/wikipedia/ru/6/6d/FC_Burnley.png',
    'https://upload.wikimedia.org/wikipedia/ru/2/2a/Brentford_FC_crest.svg',
];

export const exampleTeams = Array.from( { length: 30 }, ( _, i ) => ( {
    id: 10 + i,
    name: `Team ${ i + 1 }`,
    shortName: `T${ i + 1 }`,
    tla: `TLA${ i + 1 }`,
    crestUrl: 'https://upload.wikimedia.org/wikipedia/ru/6/6d/FC_Manchester_United_crest.svg',
    area: { id: (i % 2) + 1, name: `Country ${(i % 2) + 1}` },
    venue: `Stadium ${ i + 1 }`,
    lastUpdated: '2024-06-20T12:00:00Z'
} ) );
