import { exampleMatches } from './exampleMatches';

export const exampleTodayMatches = exampleMatches.filter( m => m.isLive ).map( m => m.id );
