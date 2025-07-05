import { z } from 'zod';
import { StandingSchema } from './standingSchema';

export const StandingsResponseSchema = z.object({
  standings: z.array(StandingSchema),
}); 