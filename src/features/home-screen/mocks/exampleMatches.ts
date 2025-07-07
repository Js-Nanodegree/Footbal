import { exampleTeams } from './exampleTeams';
import { exampleLeagues } from './exampleLeagues';

function getRandomInt( max: number ): number
{
    return Math.floor( Math.random() * max );
}

// Гарантируем, что будет хотя бы 3 live-матча
const liveMatchIndexes = new Set<number>();
while ( liveMatchIndexes.size < 3 )
{
    liveMatchIndexes.add( getRandomInt( 20 ) );
}

export const exampleMatches = Array.from( { length: 20 }, ( _, i ) =>
{
    let homeIdx = getRandomInt( exampleTeams.length );
    let awayIdx = getRandomInt( exampleTeams.length );
    while ( awayIdx === homeIdx ) awayIdx = getRandomInt( exampleTeams.length );
    const homeTeam = exampleTeams[ homeIdx ];
    const awayTeam = exampleTeams[ awayIdx ];
    const leagueId = homeTeam.leagueId;
    const hour = String( 8 + getRandomInt( 12 ) ).padStart( 2, '0' );
    const minute = String( getRandomInt( 2 ) * 30 ).padStart( 2, '0' );
    const time = `${ hour }:${ minute }`;
    const date = `${ getRandomInt( 28 ) + 1 } OCT`;
    const homeScore = getRandomInt( 6 );
    const awayScore = getRandomInt( 6 );
    const stadium = `Stadium ${ getRandomInt( 50 ) + 1 }`;
    // Гарантируем, что хотя бы 3 live-матча
    const isLive = liveMatchIndexes.has( i ) ? true : Math.random() < 0.2;
    const badgeText = Math.random() < 0.5 ? 'Тур' : undefined;
    return {
        id: i + 1,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeTeam: { name: homeTeam.name, logo: homeTeam.logo },
        awayTeam: { name: awayTeam.name, logo: awayTeam.logo },
        leagueId,
        homeScore,
        awayScore,
        time,
        date,
        stadium,
        isLive,
        badgeText,
    };
} ); 