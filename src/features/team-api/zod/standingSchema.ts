import { z } from 'zod';

export const TeamStandingInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  crest: z.string().optional(),
});

export const TableEntrySchema = z.object({
  position: z.number(),
  team: TeamStandingInfoSchema,
  playedGames: z.number(),
  won: z.number(),
  draw: z.number(),
  lost: z.number(),
  points: z.number(),
  goalsFor: z.number(),
  goalsAgainst: z.number(),
  goalDifference: z.number(),
});

export const StandingSchema = z.object({
  stage: z.string(),
  type: z.string(),
  group: z.string().optional(),
  table: z.array(TableEntrySchema),
}); 