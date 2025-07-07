import { exampleTeams } from './exampleTeams';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const exampleMatches = Array.from({ length: 50 }, (_, i) => {
  const homeIdx = getRandomInt(exampleTeams.length);
  let awayIdx = getRandomInt(exampleTeams.length);
  while (awayIdx === homeIdx) awayIdx = getRandomInt(exampleTeams.length);
  const homeTeam = exampleTeams[homeIdx];
  const awayTeam = exampleTeams[awayIdx];
  const leagueId = homeTeam.area.id; // 1 или 2
  const leagueName = leagueId === 1 ? 'Premier League' : 'La Liga';

  let status: 'SCHEDULED' | 'LIVE' | 'FINISHED' = 'SCHEDULED';
  let score: {
    winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
    fullTime: { homeTeam: number | null; awayTeam: number | null };
  } = { winner: null, fullTime: { homeTeam: null, awayTeam: null } };

  if (i < 10) {
    status = 'LIVE';
    score = {
      winner: null,
      fullTime: {
        homeTeam: getRandomInt(3) as number,
        awayTeam: getRandomInt(3) as number
      }
    };
  } else if (i >= 10 && i < 20) {
    status = 'FINISHED';
    const homeScore = getRandomInt(5) as number;
    const awayScore = getRandomInt(5) as number;
    let winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null = null;
    if (homeScore > awayScore) winner = 'HOME_TEAM';
    else if (homeScore < awayScore) winner = 'AWAY_TEAM';
    else winner = 'DRAW';
    score = {
      winner,
      fullTime: {
        homeTeam: homeScore,
        awayTeam: awayScore
      }
    };
  }

  return {
    id: 1000 + i,
    competition: { id: leagueId, name: leagueName },
    season: { id: 100 + leagueId, startDate: '2023-08-01', endDate: '2024-05-31' },
    utcDate: `2024-06-${String(10 + (i % 20)).padStart(2, '0')}T${String(12 + (i % 8)).padStart(2, '0')}:00:00Z`,
    status,
    homeTeam: { id: homeTeam.id, name: homeTeam.name, crestUrl: homeTeam.crestUrl },
    awayTeam: { id: awayTeam.id, name: awayTeam.name, crestUrl: awayTeam.crestUrl },
    score,
    lastUpdated: '2024-06-20T12:00:00Z'
  };
}); 