import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const typescriptFiles = ["**/*.{ts,tsx}"];

export default defineConfig(
  globalIgnores([
    "**/.next/**",
    "**/build/**",
    "**/coverage/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/out/**"
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: typescriptFiles
  }))
);
