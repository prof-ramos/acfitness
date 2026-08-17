import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("AC Fitness foundation page", () => {
  it("explains the current product state without implying unavailable features", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("Treinos que continuam fazendo sentido");
    expect(markup).toContain("Fundação em curso");
    expect(markup).toContain("Sem login ainda");
    expect(markup).toContain("Sem dados reais");
    expect(markup).toContain("O que já está decidido");
    expect(markup).toContain('href="/api/v1/health"');
  });
});
