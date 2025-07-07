import { renderHook, act } from '@testing-library/react-hooks';
import { useTeamListSelection } from '../useTeamListSelection';

describe( 'useTeamListSelection', () =>
{
    it( 'инициализируется с initialSelectedIds', () =>
    {
        const { result } = renderHook( () =>
            useTeamListSelection( [ '1', '2', '3' ], [ '2' ] )
        );
        expect( result.current.selectedIds ).toEqual( [ '2' ] );
    } );

    it( 'сбрасывает selectedIds при изменении initialSelectedIds', () =>
    {
        const { result, rerender } = renderHook(
            ( { all, initial } ) => useTeamListSelection( all, initial ),
            { initialProps: { all: [ '1', '2', '3' ], initial: [ '2' ] } }
        );
        expect( result.current.selectedIds ).toEqual( [ '2' ] );
        rerender( { all: [ '1', '2', '3' ], initial: [ '1', '3' ] } );
        expect( result.current.selectedIds ).toEqual( [ '1', '3' ] );
    } );

    it( 'добавляет и удаляет id', () =>
    {
        const { result } = renderHook( () =>
            useTeamListSelection( [ '1', '2', '3' ], [] )
        );
        act( () => result.current.select( '2' ) );
        expect( result.current.selectedIds ).toEqual( [ '2' ] );
        act( () => result.current.unselect( '2' ) );
        expect( result.current.selectedIds ).toEqual( [] );
    } );

    it( 'не позволяет выбрать больше MAX_SELECTION', () =>
    {
        const { result } = renderHook( () =>
            useTeamListSelection( [ '1', '2', '3', '4', '5', '6', '7' ], [ '1', '2', '3', '4', '5', '6' ] )
        );
        act( () => result.current.select( '7' ) );
        expect( result.current.selectedIds ).toEqual( [ '1', '2', '3', '4', '5', '6' ] ); // не добавляет 7-ю
    } );
} ); 