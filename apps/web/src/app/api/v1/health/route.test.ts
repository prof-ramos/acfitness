import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/v1/health", () => {
  it("returns the stable web foundation contract", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual({
      status: "ok",
      service: "acfitness-web",
      version: "foundation",
    });
  });
});
