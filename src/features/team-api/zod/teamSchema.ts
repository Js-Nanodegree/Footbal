import { z } from 'zod';

/**
 * Zod-схема для Team (команда)
 */
export const TeamSchema = z.object( {
    id: z.number(),
    name: z.string(),
} ); 