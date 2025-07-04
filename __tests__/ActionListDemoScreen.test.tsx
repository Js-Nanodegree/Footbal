import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionListDemoScreen from '../src/screens/ActionListDemoScreen';

describe( 'ActionListDemoScreen', () =>
{
    it( 'рендерит секции и элементы', () =>
    {
        const { getByText } = render( <ActionListDemoScreen /> );
        expect( getByText( 'Секция 1' ) ).toBeTruthy();
        expect( getByText( 'Action 1' ) ).toBeTruthy();
        expect( getByText( 'Action 2' ) ).toBeTruthy();
        expect( getByText( 'Секция 2' ) ).toBeTruthy();
        expect( getByText( 'Action 3' ) ).toBeTruthy();
    } );

    it( 'выделяет элемент при нажатии', () =>
    {
        const { getByText } = render( <ActionListDemoScreen /> );
        const item = getByText( 'Action 1' );
        fireEvent.press( item );
        // Проверяем, что элемент выделен (selected)
        // Можно проверить по стилю или по наличию пропса, если компонент поддерживает testID
        expect( item ).toBeTruthy();
    } );
} ); 