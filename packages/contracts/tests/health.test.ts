import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "../src/index";

describe("healthResponseSchema", () => {
  it("valida a resposta de health com status, service e version", () => {
    const resposta = {
      status: "ok",
      service: "api",
      version: "0.1.0"
    };

    expect(healthResponseSchema.parse(resposta)).toEqual(resposta);
  });

  it("rejeita resposta sem os campos obrigatórios", () => {
    const resultado = healthResponseSchema.safeParse({
      status: "ok",
      service: "api"
    });

    expect(resultado.success).toBe(false);
  });

  it("rejeita tipos incompatíveis", () => {
    const resultado = healthResponseSchema.safeParse({
      status: 200,
      service: "api",
      version: "0.1.0"
    });

    expect(resultado.success).toBe(false);
  });

  it("rejeita status fora do contrato", () => {
    const resultado = healthResponseSchema.safeParse({
      status: "degraded",
      service: "api",
      version: "0.1.0"
    });

    expect(resultado.success).toBe(false);
  });

  it("rejeita propriedades desconhecidas como o contrato OpenAPI", () => {
    const resultado = healthResponseSchema.safeParse({
      status: "ok",
      service: "api",
      version: "0.1.0",
      detail: "não faz parte do contrato"
    });

    expect(resultado.success).toBe(false);
  });
});
