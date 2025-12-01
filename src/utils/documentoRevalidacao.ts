import { differenceInDays } from 'date-fns';

export type StatusRevalidacao = 'valido' | 'proximo_vencimento' | 'revalidacao_necessaria' | 'vencido';

export interface RevalidacaoInfo {
  status: StatusRevalidacao;
  diasRestantes: number;
  label: string;
  variant: 'default' | 'warning' | 'destructive';
  className: string;
}

/**
 * Calcula o status de revalidação de um documento baseado na data de próxima revalidação
 */
export const calcularStatusRevalidacao = (dataProximaRevalidacao?: Date): RevalidacaoInfo => {
  if (!dataProximaRevalidacao) {
    return {
      status: 'valido',
      diasRestantes: 999,
      label: 'Sem revalidação definida',
      variant: 'default',
      className: 'bg-muted text-muted-foreground',
    };
  }

  const hoje = new Date();
  const diasRestantes = differenceInDays(dataProximaRevalidacao, hoje);

  // Vencido (passou da data)
  if (diasRestantes < 0) {
    return {
      status: 'vencido',
      diasRestantes,
      label: 'Vencido',
      variant: 'destructive',
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
  }

  // Revalidação necessária (menos de 180 dias)
  if (diasRestantes < 180) {
    return {
      status: 'revalidacao_necessaria',
      diasRestantes,
      label: `Revalidação necessária (${diasRestantes} dias)`,
      variant: 'destructive',
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
  }

  // Próximo do vencimento (180-270 dias)
  if (diasRestantes < 270) {
    return {
      status: 'proximo_vencimento',
      diasRestantes,
      label: `Próximo vencimento (${diasRestantes} dias)`,
      variant: 'warning',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
  }

  // Válido (mais de 270 dias)
  return {
    status: 'valido',
    diasRestantes,
    label: 'Válido',
    variant: 'default',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };
};

/**
 * Verifica se um documento precisa de revalidação urgente
 */
export const necessitaRevalidacaoUrgente = (dataProximaRevalidacao?: Date): boolean => {
  if (!dataProximaRevalidacao) return false;
  const info = calcularStatusRevalidacao(dataProximaRevalidacao);
  return info.status === 'revalidacao_necessaria' || info.status === 'vencido';
};

/**
 * Filtra documentos que precisam de revalidação
 */
export const filtrarDocumentosParaRevalidacao = (documentos: any[]): any[] => {
  return documentos.filter(doc => necessitaRevalidacaoUrgente(doc.dataProximaRevalidacao));
};
