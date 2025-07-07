import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { store } from '../../api/store';
import { useAppDispatch } from '../useAppDispatch';

describe( 'useAppDispatch', () =>
{
    it( 'возвращает функцию dispatch с типами', () =>
    {
        const wrapper = ( { children }: any ) => (
            <Provider store= { store } > { children } < /Provider>
        );
    const { result } = renderHook( () => useAppDispatch(), { wrapper } );
    expect( typeof result.current ).toBe( 'function' );
    // Проверка типизации: можно вызвать dispatch с action
    expect( () => result.current( { type: 'UNKNOWN_ACTION' } ) ).not.toThrow();
} );
}); 