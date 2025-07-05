import { z } from 'zod';

/**
 * Zod-схема для ответа /teams/{id}/matches (полная эпизация)
 */
export const MatchesResponseSchema = z.object( {
    filters: z.unknown(),
    resultSet: z.unknown(),
    matches: z.array(
        z.object( {
            area: z.object( {
                id: z.number(),
                name: z.string(),
                code: z.string().optional(),
                flag: z.string().optional(),
            } ),
            competition: z.object( {
                id: z.number(),
                name: z.string(),
                code: z.string().optional(),
                type: z.string().optional(),
                emblem: z.string().optional(),
            } ),
            season: z.object( {
                id: z.number(),
                startDate: z.string(),
                endDate: z.string(),
                currentMatchday: z.number().nullable(),
                winner: z.unknown().nullable(),
            } ),
            id: z.number(),
            utcDate: z.string(),
            status: z.string(),
            matchday: z.number().nullable(),
            stage: z.string().nullable(),
            group: z.string().nullable(),
            lastUpdated: z.string(),
            homeTeam: z.object( {
                id: z.number(),
                name: z.string(),
                shortName: z.string().optional(),
                tla: z.string().optional(),
                crest: z.string().optional(),
            } ),
            awayTeam: z.object( {
                id: z.number(),
                name: z.string(),
                shortName: z.string().optional(),
                tla: z.string().optional(),
                crest: z.string().optional(),
            } ),
            score: z.object( {
                winner: z.string().nullable(),
                duration: z.string().nullable(),
                fullTime: z.object( { home: z.number().nullable(), away: z.number().nullable() } ),
                halfTime: z.object( { home: z.number().nullable(), away: z.number().nullable() } ),
            } ),
            odds: z.object( { msg: z.string().optional() } ).optional(),
            referees: z.array( z.unknown() ),
        } )
    ),
} ); 