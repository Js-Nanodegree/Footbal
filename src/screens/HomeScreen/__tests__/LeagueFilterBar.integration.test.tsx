import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LeagueFilterBar, { League } from '../../../features/home-screen/components/LeagueFilterBar';

const mockLeagues: League[] = [
  { id: 1, name: 'Premier League' },
  { id: 2, name: 'La Liga' },
];

describe( 'LeagueFilterBar (интеграционный)', () =>
{
  it( 'отображает все лиги и выделяет активную', () =>
  {
    const { getByText } = render(
      <LeagueFilterBar leagues={mockLeagues} activeLeagueId={1} onLeagueChange={() => { }} />
    );
    expect( getByText( 'Premier League' ) ).toBeTruthy();
    expect( getByText( 'La Liga' ) ).toBeTruthy();
    // Проверяем, что активная лига выделена (цвет)
    const active = getByText( 'Premier League' );
    expect( active.props.style ).toEqual(
      expect.objectContaining( { color: '#fff', fontWeight: 'bold' } )
    );
  } );

  it( 'вызывает onLeagueChange при выборе лиги', () =>
  {
    const onLeagueChange = jest.fn();
    const { getByText } = render(
      <LeagueFilterBar leagues={mockLeagues} activeLeagueId={1} onLeagueChange={onLeagueChange} />
    );
    fireEvent.press( getByText( 'La Liga' ) );
    expect( onLeagueChange ).toHaveBeenCalledWith( 2 );
  } );
} ); 