"use client";

import { createClient, getHealth } from "@acfitness/api-client";
import { useState } from "react";

type CheckState =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "operational"; version: string }
  | { status: "unavailable" };

export function HealthCheck() {
  const [state, setState] = useState<CheckState>({ status: "idle" });

  async function verifyConnection() {
    setState({ status: "checking" });

    try {
      const client = createClient({ baseUrl: window.location.origin });
      const result = await getHealth({ client });

      if (result.error || !result.data) {
        setState({ status: "unavailable" });
        return;
      }

      setState({ status: "operational", version: result.data.version });
    } catch {
      setState({ status: "unavailable" });
    }
  }

  const isChecking = state.status === "checking";

  return (
    <div className="api-check">
      <button type="button" onClick={verifyConnection} disabled={isChecking}>
        {isChecking ? "Verificando…" : "Verificar conexão"}
      </button>
      <p className={`connection-state connection-${state.status}`} aria-live="polite">
        {state.status === "idle" && "Ainda não verificada neste dispositivo."}
        {state.status === "checking" && "Consultando o contrato gerado…"}
        {state.status === "operational" && `API operacional · ${state.version}`}
        {state.status === "unavailable" && "API indisponível. Tente novamente."}
      </p>
    </div>
  );
}
