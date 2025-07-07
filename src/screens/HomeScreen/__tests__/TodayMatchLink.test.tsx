import React from 'react';
import { render } from '@testing-library/react-native';
import TodayMatchLink from '../TodayMatchLink';

describe( 'TodayMatchLink', () =>
{
    it( 'корректно склоняет слово "игра"', () =>
    {
        const { getByText } = render(
            <TodayMatchLink todayMatches={Array( 1 ).fill( { id: 1, homeTeam: {}, awayTeam: {}, time: '', date: '' } )} onPress={() => { }} />
        );
        expect( getByText( '1 игра' ) ).toBeTruthy();

        const { getByText: getByText2 } = render(
            <TodayMatchLink todayMatches={Array( 3 ).fill( { id: 1, homeTeam: {}, awayTeam: {}, time: '', date: '' } )} onPress={() => { }} />
        );
        expect( getByText2( '3 игры' ) ).toBeTruthy();

        const { getByText: getByText3 } = render(
            <TodayMatchLink todayMatches={Array( 5 ).fill( { id: 1, homeTeam: {}, awayTeam: {}, time: '', date: '' } )} onPress={() => { }} />
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
} ); 