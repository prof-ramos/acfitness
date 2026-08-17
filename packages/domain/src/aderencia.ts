/**
 * Estados que alteram a contagem de aderência de uma ocorrência.
 *
 * Uma ocorrência cancelada só deixa de contar quando o cancelamento é
 * explicitamente justificado. Pausas são representadas por
 * `excluida_por_pausa`.
 */
export type EstadoOcorrenciaAderencia =
  | "concluida"
  | "concluida_com_atraso"
  | "nao_realizada"
  | "cancelada"
  | "excluida_por_pausa";

export type TipoOcorrenciaAderencia = "prevista" | "extra";

export interface OcorrenciaAderencia {
  /** Extras são atividades realizadas fora do que estava previsto. */
  tipo: TipoOcorrenciaAderencia;
  estado: EstadoOcorrenciaAderencia;
  /** Só semanas encerradas podem contribuir para a aderência. */
  encerrada: boolean;
  /** Necessário para retirar uma ocorrência cancelada do denominador. */
  cancelamentoJustificado?: boolean;
}

const estadosConcluidos = new Set<EstadoOcorrenciaAderencia>([
  "concluida",
  "concluida_com_atraso"
]);

const deveExcluirDoDenominador = (
  ocorrencia: OcorrenciaAderencia
): boolean =>
  ocorrencia.estado === "excluida_por_pausa" ||
  (ocorrencia.estado === "cancelada" &&
    ocorrencia.cancelamentoJustificado === true);

/**
 * Calcula a aderência das ocorrências de uma ou mais semanas.
 *
 * O resultado é uma fração entre zero e um. Retorna `null` quando não há
 * ocorrência prevista encerrada elegível para o denominador.
 */
export const calcularAderencia = (
  ocorrencias: readonly OcorrenciaAderencia[]
): number | null => {
  const previstasEncerradas = ocorrencias.filter(
    (ocorrencia) =>
      ocorrencia.tipo === "prevista" &&
      ocorrencia.encerrada &&
      !deveExcluirDoDenominador(ocorrencia)
  );

  if (previstasEncerradas.length === 0) {
    return null;
  }

  const concluidasValidas = previstasEncerradas.filter((ocorrencia) =>
    estadosConcluidos.has(ocorrencia.estado)
  );

  return concluidasValidas.length / previstasEncerradas.length;
};
