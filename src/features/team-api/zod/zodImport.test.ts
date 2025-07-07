import { z } from 'zod';

test( 'zod import', () =>
{
    expect( typeof z.object ).toBe( 'function' );
} ); 