import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodayMatchLink from '../../../features/home-screen/components/TodayMatchLink';

describe( 'TodayMatchLink (интеграционный)', () =>
{
  it( 'корректно отображает количество матчей и склоняет слово "игра"', () =>
  {
    const { getByText } = render(
      <TodayMatchLink todayMatches={Array( 1 ).fill( { id: 1, homeTeam: { name: '', logo: '' }, awayTeam: { name: '', logo: '' }, time: '', date: '' } )} onPress={() => { }} />
    );
    expect( getByText( '1 игра' ) ).toBeTruthy();

    const { getByText: getByText2 } = render(
      <TodayMatchLink todayMatches={Array( 3 ).fill( { id: 1, homeTeam: { name: '', logo: '' }, awayTeam: { name: '', logo: '' }, time: '', date: '' } )} onPress={() => { }} />
    );
    expect( getByText2( '3 игры' ) ).toBeTruthy();

    const { getByText: getByText3 } = render(
      <TodayMatchLink todayMatches={Array( 5 ).fill( { id: 1, homeTeam: { name: '', logo: '' }, awayTeam: { name: '', logo: '' }, time: '', date: '' } )} onPress={() => { }} />
    );
    expect( getByText3( '5 игр' ) ).toBeTruthy();
  } );

  it( 'отображает "Нет матчей" при пустом todayMatches', () =>
  {
    const { getByText } = render(
      <TodayMatchLink todayMatches={[]} onPress={() => { }} />
    );
    expect( getByText( 'Нет матчей' ) ).toBeTruthy();
  } );

  it( 'вызывает onPress при нажатии на "Все"', () =>
  {
    const onPress = jest.fn();
    const { getByText } = render(
      <TodayMatchLink todayMatches={Array( 2 ).fill( { id: 1, homeTeam: { name: '', logo: '' }, awayTeam: { name: '', logo: '' }, time: '', date: '' } )} onPress={onPress} />
    );
    fireEvent.press( getByText( 'Все' ) );
    expect( onPress ).toHaveBeenCalled();
  } );
} ); 