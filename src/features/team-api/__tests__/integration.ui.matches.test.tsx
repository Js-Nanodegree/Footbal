import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { mockMatches } from '../mocks/matches';
import { DataEnrichmentService } from '../services/DataEnrichmentService';

// Пример простого компонента для отображения матчей
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
    <Text testID={`match-status-${ match.id }`}>{match.status}</Text>
    <Text testID={`match-home-${ match.id }`}>{match.homeTeam.name}</Text>
    <Text testID={`match-away-${ match.id }`}>{match.awayTeam.name}</Text>
  </>
);

describe( 'UI: отображение матчей', () =>
{
  it( 'отображает все матчи из useMatches', () =>
  {
    // В реальном проекте matches пришли бы из useMatches
    const matches = mockMatches;
    const { getByTestId } = render( <MatchesList matches={matches} /> );
    matches.forEach( ( match ) =>
    {
      expect( getByTestId( `match-id-${ match.id }` ) ).toBeTruthy();
      expect( getByTestId( `match-status-${ match.id }` ) ).toBeTruthy();
      expect( getByTestId( `match-home-${ match.id }` ) ).toBeTruthy();
      expect( getByTestId( `match-away-${ match.id }` ) ).toBeTruthy();
    } );
  } );

  it( 'отображает только live-матчи при фильтрации', () =>
  {
    const liveMatches = DataEnrichmentService.filterMatches( mockMatches, { status: 'LIVE' } );
    const { getByTestId, queryByTestId } = render( <MatchesList matches={liveMatches} /> );
    liveMatches.forEach( ( match ) =>
    {
      expect( getByTestId( `match-status-${ match.id }` ) ).toHaveTextContent( 'LIVE' );
    } );
    // Проверяем, что не отображаются не-live матчи
    mockMatches.filter( m => m.status !== 'LIVE' ).forEach( ( match ) =>
    {
      expect( queryByTestId( `match-id-${ match.id }` ) ).toBeNull();
    } );
  } );

  it( 'отображает только актуальные (SCHEDULED) матчи при фильтрации', () =>
  {
    const scheduledMatches = DataEnrichmentService.filterMatches( mockMatches, { status: 'SCHEDULED' } );
    const { getByTestId, queryByTestId } = render( <MatchesList matches={scheduledMatches} /> );
    scheduledMatches.forEach( ( match ) =>
    {
      expect( getByTestId( `match-status-${ match.id }` ) ).toHaveTextContent( 'SCHEDULED' );
    } );
    mockMatches.filter( m => m.status !== 'SCHEDULED' ).forEach( ( match ) =>
    {
      expect( queryByTestId( `match-id-${ match.id }` ) ).toBeNull();
    } );
  } );
} ); 