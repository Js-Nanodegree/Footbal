import { teamsHandlers } from './handlers/teams';
import { matchesHandlers } from './handlers/matches';
import { playersHandlers } from './handlers/players';
import { filtersHandlers } from './handlers/filters';

export const handlers = [
    ...teamsHandlers,
    ...matchesHandlers,
    ...playersHandlers,
    ...filtersHandlers,
]; 