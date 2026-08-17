import { z } from "zod";

import { healthResponseSchema } from "./health";

/** Schema JSON usado pelo documento OpenAPI e derivado do contrato Zod. */
export const healthResponseJsonSchema = z.toJSONSchema(healthResponseSchema, {
  target: "draft-2020-12"
});

/** Documento OpenAPI mínimo da API REST pública. */
export const healthOpenApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "AC Fitness API",
    version: "0.1.0"
  },
  paths: {
    "/api/v1/health": {
      get: {
        operationId: "getHealth",
        responses: {
          "200": {
            description: "API is healthy.",
            content: {
              "application/json": {
                schema: healthResponseJsonSchema
              }
            }
          }
        }
      }
    }
  }
} as const;
