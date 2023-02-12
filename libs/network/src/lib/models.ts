import { z } from 'zod';

export const IfConfigResult = z.object({
  ip_addr: z.string(),
});

export type IfConfigResultType = z.infer<typeof IfConfigResult>;
