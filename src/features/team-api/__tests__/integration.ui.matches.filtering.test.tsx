import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { mockMatches } from '../mocks/matches';
import { DataEnrichmentService } from '../services/DataEnrichmentService';

const MatchesList = ( { matches }: { matches: typeof mockMatches } ) => (
  <>
    {matches.map( ( match ) => (
      <MatchItem key={match.id} match={match} />
    ) )}
  </>
);

const MatchItem = ( { match }: { match: typeof mockMatches[ 0 ] } ) => (
  <>
    <Text testID={`match-id-${ match.id }`}>{match.id}</Text>
    <Text testID={`match-league-${ match.id }`}>{match.competition.id}</Text>
    <Text testID={`match-home-${ match.id }`}>{match.homeTeam.name}</Text>
    <Text testID={`match-away-${ match.id }`}>{match.awayTeam.name}</Text>
  </>
);

describe( 'UI: фильтрация матчей по лиге и команде', () =>
{
  it( 'отображает только матчи выбранной лиги', () =>
  {
    const leagueId = 1;
    const filtered = DataEnrichmentService.filterMatches( mockMatches, { leagueId } );
    const { getByTestId, queryByTestId } = render( <MatchesList matches={filtered} /> );
    filtered.forEach( ( match ) =>
    {
      expect( getByTestId( `match-league-${ match.id }` ) ).toHaveTextContent( String( leagueId ) );
    } );
    mockMatches.filter( m => m.competition.id !== leagueId ).forEach( ( match ) =>
    {
      expect( queryByTestId( `match-id-${ match.id }` ) ).toBeNull();
    } );
  } );

  it( 'отображает только матчи выбранной команды', () =>
  {
    const teamId = 1;
    const filtered = DataEnrichmentService.filterMatches( mockMatches, { teamId } );
    const { getByTestId, queryByTestId } = render( <MatchesList matches={filtered} /> );
    filtered.forEach( ( match ) =>
    {
      expect(
        match.homeTeam.id === teamId || match.awayTeam.id === teamId
      ).toBe( true );
    } );
    mockMatches.filter( m => m.homeTeam.id !== teamId && m.awayTeam.id !== teamId ).forEach( ( match ) =>
    {
      expect( queryByTestId( `match-id-${ match.id }` ) ).toBeNull();
    } );
  } );
} ); 