export { client } from "./generated/client.gen";
export {
  createClient,
  createConfig,
  mergeHeaders
} from "./generated/client";
export { getHealth } from "./generated/sdk.gen";

export type {
  Client,
  ClientOptions,
  Config,
  CreateClientConfig,
  Options as ClientRequestOptions,
  RequestOptions,
  RequestResult,
  ResponseStyle
} from "./generated/client";
export type {
  Options as GetHealthOptions
} from "./generated/sdk.gen";
export type {
  GetHealthData,
  GetHealthResponse,
  GetHealthResponses
} from "./generated/types.gen";
