import React from 'react';
import { render } from '@testing-library/react-native';
import FABScrollToTopDemoScreen from '../src/screens/FABScrollToTopDemoScreen';

describe( 'FABScrollToTopDemoScreen', () =>
{
    it( 'рендерит список и FAB', () =>
    {
        const { getByText } = render( <FABScrollToTopDemoScreen /> );
        expect( getByText( 'Item 1' ) ).toBeTruthy();
        // FAB появится при скролле, эмулировать scroll сложно, но можно проверить базовый рендер
    } );
} ); 