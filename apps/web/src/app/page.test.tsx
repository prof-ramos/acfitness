import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

describe("AC Fitness foundation page", () => {
  it("exposes the real foundation checks without a fictitious workout", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("Fundação operacional");
    expect(markup).toContain("Aderência de referência");
    expect(markup).toContain("67%");
    expect(markup).toContain("Verificar conexão");
    expect(markup).toContain("Próxima etapa");
    expect(markup).not.toContain("Agachamento livre");
    expect(markup).not.toContain("O que já está decidido");
  });
});
