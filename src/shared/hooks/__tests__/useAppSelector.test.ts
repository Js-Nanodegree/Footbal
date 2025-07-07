import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '../../api/store';
import { useAppSelector } from '../useAppSelector';

describe( 'useAppSelector', () =>
{
    it( 'возвращает корректное состояние из redux', () =>
    {
        const wrapper = ({ children }: any) => (
            <Provider store={store}>{children}</Provider>
        );
        const { result } = renderHook( () => useAppSelector( ( state ) => state ), { wrapper } );
        expect( result.current ).toHaveProperty( 'teamPastMatches' );
    } );
}); 