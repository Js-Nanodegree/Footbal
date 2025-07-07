import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { mockLeagues } from '../mocks/leagues';

// Пример простого компонента для отображения лиг
const LeaguesList = ( { leagues }: { leagues: typeof mockLeagues } ) => (
  <>
    {leagues.map( ( league ) => (
      <LeagueItem key={league.id} league={league} />
    ) )}
  </>
);

const LeagueItem = ( { league }: { league: typeof mockLeagues[ 0 ] } ) => (
  <>
    <Text testID={`league-name-${ league.id }`}>{league.name}</Text>
    <Text testID={`league-area-${ league.id }`}>{league.area.name}</Text>
  </>
);

describe( 'UI: отображение лиг', () =>
{
  it( 'отображает все лиги из useCompetitions', () =>
  {
    // В реальном проекте leagues пришли бы из useCompetitions
    const leagues = mockLeagues;
    const { getByTestId } = render( <LeaguesList leagues={leagues} /> );
    leagues.forEach( ( league ) =>
    {
      expect( getByTestId( `league-name-${ league.id }` ) ).toBeTruthy();
      expect( getByTestId( `league-area-${ league.id }` ) ).toBeTruthy();
    } );
  } );
} ); 