import { describe, expect, it } from "vitest";

import { ApiClientHttpError, createApiClient } from "../src/index";

describe("createApiClient", () => {
  it("consulta o endpoint de health e retorna a resposta validada", async () => {
    const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = [];
    const fetchFake: typeof fetch = async (input, init) => {
      calls.push({ input, init });
      return new Response(
        JSON.stringify({
          status: "ok",
          service: "acfitness-api",
          version: "0.1.0"
        }),
        {
          headers: { "content-type": "application/json" },
          status: 200
        }
      );
    };

    const client = createApiClient({
      baseUrl: "https://api.example.test",
      fetch: fetchFake
    });

    await expect(client.getHealth()).resolves.toEqual({
      status: "ok",
      service: "acfitness-api",
      version: "0.1.0"
    });
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual({
      input: "https://api.example.test/api/v1/health",
      init: {
        headers: { Accept: "application/json" },
        method: "GET"
      }
    });
  });

  it("falha com erro HTTP quando a API responde com status não-ok", async () => {
    const fetchFake: typeof fetch = async () =>
      new Response("upstream unavailable", {
        status: 503,
        statusText: "Service Unavailable"
      });
    const client = createApiClient({
      baseUrl: "https://api.example.test",
      fetch: fetchFake
    });

    const request = client.getHealth();

    await expect(request).rejects.toBeInstanceOf(ApiClientHttpError);
    await expect(request).rejects.toMatchObject({ status: 503 });
    await expect(request).rejects.toThrow("HTTP 503 Service Unavailable");
  });

  it("falha quando a resposta HTTP não corresponde ao contrato compartilhado", async () => {
    const fetchFake: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          status: "degraded",
          service: "acfitness-api",
          version: "0.1.0"
        }),
        { status: 200 }
      );
    const client = createApiClient({
      baseUrl: "https://api.example.test",
      fetch: fetchFake
    });

    await expect(client.getHealth()).rejects.toThrow();
  });
});
