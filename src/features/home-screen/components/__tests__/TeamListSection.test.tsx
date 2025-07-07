import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TeamListSection from '../TeamListSection';
import { AppContextProvider } from '../../context/AppContext';

jest.mock( '../../mocks/exampleTeams', () => ( {
    exampleTeams: [
        { id: 1, name: 'Team 1', logo: '', leagueId: 1 },
        { id: 2, name: 'Team 2', logo: '', leagueId: 1 },
        { id: 3, name: 'Team 3', logo: '', leagueId: 1 },
    ],
} ) );

describe( 'TeamListSection', () =>
{
    it( 'отображает команды и позволяет выбрать/снять выбор', () =>
    {
        const { getByTestId } = render(
            <AppContextProvider>
                <TeamListSection teamIds={[ 1, 2, 3 ]} loading={false} />
            </AppContextProvider>
        );
        // Выбираем команду 2
        const team2 = getByTestId( 'team-item-2' );
        fireEvent.press( team2 );
        // Снова нажимаем — снимаем выбор
        fireEvent.press( team2 );
    } );

    it( 'сбрасывает выделения при сбросе фильтрации', () =>
    {
        const { getByTestId, rerender } = render(
            <AppContextProvider>
                <TeamListSection teamIds={[ 1, 2, 3 ]} loading={false} />
            </AppContextProvider>
        );
        const team1 = getByTestId( 'team-item-1' );
        fireEvent.press( team1 );
        // Сброс фильтрации — передаём пустой массив teamIds
        rerender(
            <AppContextProvider>
                <TeamListSection teamIds={[]} loading={false} />
            </AppContextProvider>
        );
    } );
} ); 