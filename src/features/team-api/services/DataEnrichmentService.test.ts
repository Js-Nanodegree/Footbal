import { DataEnrichmentService } from './DataEnrichmentService';
import { mockMatches } from '../mocks/matches';
import { mockTeams } from '../mocks/teams';

describe( 'DataEnrichmentService', () =>
{
    it( 'enrichTeamsFromMatches: собирает все команды из матчей', () =>
    {
        const teams = DataEnrichmentService.enrichTeamsFromMatches( mockMatches, [] );
        expect( teams.length ).toBeGreaterThan( 0 );
        const ids = teams.map( t => t.id );
        expect( new Set( ids ).size ).toBe( ids.length );
        expect( teams[ 0 ] ).toHaveProperty( 'lastUpdated' );
        expect( teams[ 0 ] ).toHaveProperty( 'area' );
    } );

    it( 'enrichLeaguesFromMatches: собирает все лиги из матчей', () =>
    {
        const leagues = DataEnrichmentService.enrichLeaguesFromMatches( mockMatches, [] );
        expect( leagues.length ).toBeGreaterThan( 0 );
        const ids = leagues.map( l => l.id );
        expect( new Set( ids ).size ).toBe( ids.length );
        expect( leagues[ 0 ] ).toHaveProperty( 'lastUpdated' );
        expect( leagues[ 0 ] ).toHaveProperty( 'area' );
    } );

    it( 'ensureAllFields: гарантирует обязательные поля', () =>
    {
        const matches = DataEnrichmentService.ensureAllFields( mockMatches );
        matches.forEach( m =>
        {
            expect( m.status ).toBeTruthy();
            expect( m.utcDate ).toBeTruthy();
            expect( m.homeTeam ).toBeTruthy();
            expect( m.awayTeam ).toBeTruthy();
            expect( m.competition ).toBeTruthy();
        } );
    } );

    it( 'filterMatches: фильтрует по статусу', () =>
    {
        const filtered = DataEnrichmentService.filterMatches( mockMatches, { status: 'LIVE' } );
        expect( filtered.every( m => m.status === 'LIVE' ) ).toBe( true );
    } );

    it( 'sortMatches: сортирует по дате', () =>
    {
        const sorted = DataEnrichmentService.sortMatches( mockMatches, 'asc' );
        for ( let i = 1; i < sorted.length; i++ )
        {
            expect( new Date( sorted[ i ].utcDate ).getTime() ).toBeGreaterThanOrEqual( new Date( sorted[ i - 1 ].utcDate ).getTime() );
        }
    } );

    it( 'searchMatches: ищет по имени команды', () =>
    {
        const found = DataEnrichmentService.searchMatches( mockMatches, 'Arsenal' );
        expect( found.some( m => m.homeTeam.name === 'Arsenal' || m.awayTeam.name === 'Arsenal' ) ).toBe( true );
    } );
} ); 