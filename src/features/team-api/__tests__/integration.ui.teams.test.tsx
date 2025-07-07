import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { mockTeams } from '../mocks/teams';

// Пример простого компонента для отображения команд
const TeamsList = ( { teams }: { teams: typeof mockTeams } ) => (
  <>
    {teams.map( ( team ) => (
      <TeamItem key={team.id} team={team} />
    ) )}
  </>
);

const TeamItem = ( { team }: { team: typeof mockTeams[ 0 ] } ) => (
  <>
    <Text testID={`team-name-${ team.id }`}>{team.name}</Text>
    <Text testID={`team-area-${ team.id }`}>{team.area?.name}</Text>
  </>
);

describe( 'UI: отображение команд', () =>
{
  it( 'отображает все команды из useTeams', () =>
  {
    // В реальном проекте teams пришли бы из useTeams
    const teams = mockTeams;
    const { getByTestId } = render( <TeamsList teams={teams} /> );
    teams.forEach( ( team ) =>
    {
      expect( getByTestId( `team-name-${ team.id }` ) ).toBeTruthy();
      expect( getByTestId( `team-area-${ team.id }` ) ).toBeTruthy();
    } );
  } );
} ); 