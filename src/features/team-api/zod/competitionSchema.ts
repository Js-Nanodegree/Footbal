import { z } from 'zod';

export const AreaSchema = z.object( {
    id: z.number(),
    name: z.string(),
    code: z.string().nullable().optional(),
    flag: z.string().nullable().optional(),
} );

export const CompetitionSeasonSchema = z.object( {
    id: z.number(),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    currentMatchday: z.number().nullable().optional(),
    winner: z.any().optional(),
} );

export const CompetitionSchema = z.object( {
    id: z.number(),
    area: AreaSchema,
    name: z.string(),
    code: z.string().nullable().optional(),
    type: z.string().nullable().optional(),
    emblem: z.string().nullable().optional(),
    plan: z.string().nullable().optional(),
    currentSeason: CompetitionSeasonSchema.nullable().optional(),
    numberOfAvailableSeasons: z.number().nullable().optional(),
    lastUpdated: z.string().nullable().optional(),
} ); 