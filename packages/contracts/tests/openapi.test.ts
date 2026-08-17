import { describe, expect, it } from "vitest";

import {
  healthOpenApiDocument,
  healthResponseJsonSchema,
  healthResponseSchema
} from "../src/index";

describe("health OpenAPI document", () => {
  it("descreve GET /api/v1/health como um documento OpenAPI 3.1", () => {
    expect(healthOpenApiDocument.openapi).toBe("3.1.0");
    expect(healthOpenApiDocument.info).toEqual({
      title: "AC Fitness API",
      version: "0.1.0"
    });

    const operation = healthOpenApiDocument.paths["/api/v1/health"].get;
    expect(operation.operationId).toBe("getHealth");
    expect(operation.responses["200"].content["application/json"].schema).toBe(
      healthResponseJsonSchema
    );
  });

  it("mantém no documento o schema JSON derivado do contrato Zod", () => {
    expect(healthResponseJsonSchema).toEqual({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      additionalProperties: false,
      properties: {
        status: { const: "ok", type: "string" },
        service: { minLength: 1, type: "string" },
        version: { minLength: 1, type: "string" }
      },
      required: ["status", "service", "version"],
      type: "object"
    });

    expect(healthResponseSchema.parse({
      status: "ok",
      service: "api",
      version: "0.1.0"
    })).toEqual({
      status: "ok",
      service: "api",
      version: "0.1.0"
    });
  });
});
