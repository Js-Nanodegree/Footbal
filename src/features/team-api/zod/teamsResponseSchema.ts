import { z } from 'zod';
import { TeamSchema } from './teamSchema';

/**
 * Zod-схема для ответа /teams
 */
export const TeamsResponseSchema = z.object( {
    count: z.number(),
    teams: z.array( TeamSchema ),
} ); 