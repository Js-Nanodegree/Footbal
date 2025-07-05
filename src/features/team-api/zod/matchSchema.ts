import { z } from 'zod';

/**
 * Zod-схема для Match (матч)
 */
export const MatchSchema = z.object( {
    id: z.number(),
    utcDate: z.string(),
} ); 