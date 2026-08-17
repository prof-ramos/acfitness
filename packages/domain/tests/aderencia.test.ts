import { describe, expect, it } from "vitest";
import { calcularAderencia, type OcorrenciaAderencia } from "../src/index";

const ocorrencia = (
  valores: OcorrenciaAderencia
): OcorrenciaAderencia => valores;

describe("calcularAderencia", () => {
  it("calcula concluídas válidas sobre previstas encerradas", () => {
    const ocorrencias: OcorrenciaAderencia[] = [
      ocorrencia({
        tipo: "prevista",
        estado: "concluida",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "concluida_com_atraso",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "nao_realizada",
        encerrada: true
      })
    ];

    expect(calcularAderencia(ocorrencias)).toBeCloseTo(2 / 3);
  });

  it("não conta extras e nem a semana ainda não encerrada", () => {
    const ocorrencias: OcorrenciaAderencia[] = [
      ocorrencia({
        tipo: "prevista",
        estado: "concluida",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "nao_realizada",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "concluida",
        encerrada: false
      }),
      ocorrencia({
        tipo: "extra",
        estado: "concluida",
        encerrada: true
      })
    ];

    expect(calcularAderencia(ocorrencias)).toBe(0.5);
  });

  it("remove pausas e cancelamentos justificados do denominador", () => {
    const ocorrencias: OcorrenciaAderencia[] = [
      ocorrencia({
        tipo: "prevista",
        estado: "concluida",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "nao_realizada",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "excluida_por_pausa",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "cancelada",
        encerrada: true,
        cancelamentoJustificado: true
      })
    ];

    expect(calcularAderencia(ocorrencias)).toBe(0.5);
  });

  it("retorna null quando não há prevista encerrada", () => {
    const ocorrencias: OcorrenciaAderencia[] = [
      ocorrencia({
        tipo: "extra",
        estado: "concluida",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "excluida_por_pausa",
        encerrada: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "cancelada",
        encerrada: true,
        cancelamentoJustificado: true
      }),
      ocorrencia({
        tipo: "prevista",
        estado: "concluida",
        encerrada: false
      })
    ];

    expect(calcularAderencia(ocorrencias)).toBeNull();
  });
});
