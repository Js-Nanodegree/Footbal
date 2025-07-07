import { exampleLeagues } from './exampleLeagues';

const logos = [
    'https://upload.wikimedia.org/wikipedia/ru/e/eb/Manchester_City_FC_badge.svg',
    'https://upload.wikimedia.org/wikipedia/ru/0/0c/Crystal_Palace_FC_logo.svg',
    'https://upload.wikimedia.org/wikipedia/ru/6/6d/FC_Burnley.png',
    'https://upload.wikimedia.org/wikipedia/ru/2/2a/Brentford_FC_crest.svg',
];

export const exampleTeams = Array.from( { length: 40 }, ( _, i ) =>
{
    const leagueId = ( Math.floor( i / 10 ) % exampleLeagues.length ) + 1;
    return {
        id: i + 1,
        name: `Team ${ i + 1 }`,
        logo: logos[ i % logos.length ],
        leagueId,
    };
} );
