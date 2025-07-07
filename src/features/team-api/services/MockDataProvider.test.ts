import { MockDataProvider } from './MockDataProvider';
import { Match } from '../types/match';
import { Team } from '../types/team';

describe( 'MockDataProvider', () =>
{
    it( 'getMock("matches") возвращает массив матчей', () =>
    {
        const matches = MockDataProvider.getMock( 'matches' );
        expect( Array.isArray( matches ) ).toBe( true );
        expect( ( matches as Match[] ).length ).toBeGreaterThan( 0 );
        expect( ( matches as Match[] )[ 0 ] ).toHaveProperty( 'id' );
        expect( ( matches as Match[] )[ 0 ] ).toHaveProperty( 'status' );
    } );

    it( 'getMock("teams") возвращает массив команд', () =>
    {
        const teams = MockDataProvider.getMock( 'teams' );
        expect( Array.isArray( teams ) ).toBe( true );
        expect( ( teams as Team[] ).length ).toBeGreaterThan( 0 );
        expect( ( teams as Team[] )[ 0 ] ).toHaveProperty( 'id' );
        expect( ( teams as Team[] )[ 0 ] ).toHaveProperty( 'name' );
    } );

    it( 'getMock("unknown") возвращает пустой массив', () =>
    {
        const unknown = MockDataProvider.getMock( 'unknown' as any );
        expect( Array.isArray( unknown ) ).toBe( true );
        expect( unknown.length ).toBe( 0 );
    } );
} ); 