import { z } from 'zod';

export const AreaSchema = z.object( {
    id: z.number(),
    name: z.string(),
    code: z.string(),
    flag: z.string().optional(),
} );

export const CompetitionSeasonSchema = z.object( {
    id: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    currentMatchday: z.number().optional(),
    winner: z.any().optional(),
} );

export const CompetitionSchema = z.object( {
    id: z.number(),
    area: AreaSchema,
    name: z.string(),
    code: z.string(),
    type: z.string().optional(),
    emblem: z.string().optional(),
    plan: z.string().optional(),
    currentSeason: CompetitionSeasonSchema.optional(),
    numberOfAvailableSeasons: z.number().optional(),
    lastUpdated: z.string(),
} ); 