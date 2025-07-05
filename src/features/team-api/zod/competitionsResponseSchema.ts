import { z } from 'zod';
import { CompetitionSchema } from './competitionSchema';

export const CompetitionsResponseSchema = z.object({
  count: z.number(),
  competitions: z.array(CompetitionSchema),
}); 