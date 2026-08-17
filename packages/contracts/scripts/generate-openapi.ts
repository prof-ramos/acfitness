import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { healthOpenApiDocument } from "../src/openapi";

const outputPath = fileURLToPath(new URL("../openapi.json", import.meta.url));
const document = `${JSON.stringify(healthOpenApiDocument, null, 2)}\n`;

await writeFile(outputPath, document, "utf8");
