import { describe, expect, it } from "vitest";

import { createClient, getHealth } from "../src/index";

describe("generated health client", () => {
  it("uses the generated Fetch client and SDK without network access", async () => {
    const requests: Request[] = [];
    const fetchFake: typeof fetch = async (input) => {
      const request = input instanceof Request ? input : new Request(input);
      requests.push(request);

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

    const generatedClient = createClient({
      baseUrl: "https://api.example.test",
      fetch: fetchFake
    });
    const result = await getHealth({ client: generatedClient });

    expect(result).toMatchObject({
      data: {
        status: "ok",
        service: "acfitness-api",
        version: "0.1.0"
      }
    });
    expect(result.error).toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(requests[0]?.url).toBe("https://api.example.test/api/v1/health");
    expect(requests[0]?.method).toBe("GET");
  });

  it("returns the generated error result for a non-2xx response", async () => {
    const fetchFake: typeof fetch = async () =>
      new Response("upstream unavailable", {
        status: 503,
        statusText: "Service Unavailable"
      });
    const generatedClient = createClient({
      baseUrl: "https://api.example.test",
      fetch: fetchFake
    });

    const result = await getHealth({ client: generatedClient });

    expect(result).toMatchObject({
      error: "upstream unavailable",
      response: { status: 503 }
    });
    expect(result.data).toBeUndefined();
  });
});
