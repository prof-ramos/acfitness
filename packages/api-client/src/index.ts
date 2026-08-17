import {
  healthResponseSchema,
  type HealthResponse
} from "@acfitness/contracts";

export interface ApiClientOptions {
  baseUrl: string | URL;
  fetch?: typeof fetch;
}

export interface ApiClient {
  getHealth(): Promise<HealthResponse>;
}

export class ApiClientHttpError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(response: Response) {
    const statusText = response.statusText ? ` ${response.statusText}` : "";
    super(`API request failed with HTTP ${response.status}${statusText}`);
    this.name = "ApiClientHttpError";
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export function createApiClient({
  baseUrl,
  fetch: fetchImplementation = globalThis.fetch
}: ApiClientOptions): ApiClient {
  const healthUrl = new URL("/api/v1/health", baseUrl).toString();

  return {
    async getHealth() {
      const response = await fetchImplementation(healthUrl, {
        headers: { Accept: "application/json" },
        method: "GET"
      });

      if (!response.ok) {
        throw new ApiClientHttpError(response);
      }

      return healthResponseSchema.parse(await response.json());
    }
  };
}
