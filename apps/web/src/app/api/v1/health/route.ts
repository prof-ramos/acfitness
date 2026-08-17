import { healthResponseSchema } from "@acfitness/contracts";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    healthResponseSchema.parse({
      status: "ok",
      service: "acfitness-web",
      version: "foundation",
    }),
  );
}
