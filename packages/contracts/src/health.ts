import { z } from "zod";

/** Contrato JSON reutilizável da resposta GET /api/v1/health. */
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.string().min(1),
  version: z.string().min(1)
}).strict();

export type HealthResponse = z.infer<typeof healthResponseSchema>;
