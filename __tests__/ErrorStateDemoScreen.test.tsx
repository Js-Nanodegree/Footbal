import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorStateDemoScreen from '../src/screens/ErrorStateDemoScreen';

describe( 'ErrorStateDemoScreen', () =>
{
    it( 'рендерит ErrorState и считает попытки', () =>
    {
        const { getByText } = render( <ErrorStateDemoScreen /> );
        expect( getByText( /Ошибка!/ ) ).toBeTruthy();
        const retryButton = getByText( 'Попробовать снова' );
        fireEvent.press( retryButton );
        expect( getByText( /Попыток: 1/ ) ).toBeTruthy();
    } );
} ); 