
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EmprestimoResumo, Emprestimo, EmprestimoDevolucao } from '@/types/emprestimo';

// Mock data for demonstration
const mockEmprestimos: EmprestimoResumo[] = [
  {
    id: '1',
    numero_processo: 'EMP-2024-0001',
    cliente_cnpj: '12.345.678/0001-90',
    cliente_nome: 'Empresa ABC Ltda',
    ref_produto_emprestado: 'PROD-001',
    desc_produto_emprestado: 'Equipamento médico portátil',
    valor_emprestimo_dolar: 5000.00,
    data_emprestimo: '2024-01-15',
    total_retornado: 2500.00,
    saldo: 2500.00,
    status: 'Ativo',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    numero_processo: 'EMP-2024-0002',
    cliente_cnpj: '98.765.432/0001-10',
    cliente_nome: 'Clínica XYZ S.A.',
    ref_produto_emprestado: 'PROD-002',
    desc_produto_emprestado: 'Monitor cardíaco',
    valor_emprestimo_dolar: 3000.00,
    data_emprestimo: '2024-02-01',
    total_retornado: 3000.00,
    saldo: 0.00,
    status: 'Quitado',
    created_at: '2024-02-01T14:30:00Z',
    updated_at: '2024-02-15T16:20:00Z'
  }
];

// Tipos locais para evitar problemas com tipos auto-gerados
interface EmprestimoInsert {
  cliente_cnpj: string;
  cliente_nome: string;
  danfe_emprestimo?: string;
  ref_produto_emprestado: string;
  desc_produto_emprestado?: string;
  valor_emprestimo_dolar: number;
  data_emprestimo: string;
  data_saida?: string;
  id_importacao_direta?: string | null;
  observacoes?: string;
}

interface DevolucaoInsert {
  emprestimo_id: string;
  danfe_retorno?: string;
  ref_produto_recebido: string;
  desc_produto_recebido?: string;
  valor_retornado_dolar: number;
  data_retorno: string;
  data_baixa?: string;
  observacoes?: string;
}

export const useEmprestimos = () => {
  const queryClient = useQueryClient();

  // Buscar lista resumida de empréstimos (usando mock data por enquanto)
  const { data, isLoading, error } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: async (): Promise<EmprestimoResumo[]> => {
      console.log('Buscando empréstimos (mock data)...');
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockEmprestimos;
    },
  });

  // Criar novo empréstimo
  const createMutation = useMutation({
    mutationFn: async (emprestimo: EmprestimoInsert): Promise<Emprestimo> => {
      console.log('Criando empréstimo (mock):', emprestimo);
      
      // Simular criação
      const novoEmprestimo: Emprestimo = {
        id: Date.now().toString(),
        numero_processo: `EMP-2024-${String(mockEmprestimos.length + 1).padStart(4, '0')}`,
        ...emprestimo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Adicionar ao mock data
      const novoResumo: EmprestimoResumo = {
        ...novoEmprestimo,
        total_retornado: 0,
        saldo: emprestimo.valor_emprestimo_dolar,
        status: 'Ativo'
      };
      
      mockEmprestimos.push(novoResumo);
      
      return novoEmprestimo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  // Criar devolução
  const createDevolucaoMutation = useMutation({
    mutationFn: async (devolucao: DevolucaoInsert): Promise<EmprestimoDevolucao> => {
      console.log('Criando devolução (mock):', devolucao);
      
      const novaDevolucao: EmprestimoDevolucao = {
        id: Date.now().toString(),
        ...devolucao,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Atualizar empréstimo correspondente no mock
      const emprestimoIndex = mockEmprestimos.findIndex(emp => emp.id === devolucao.emprestimo_id);
      if (emprestimoIndex !== -1) {
        const emprestimo = mockEmprestimos[emprestimoIndex];
        emprestimo.total_retornado += devolucao.valor_retornado_dolar;
        emprestimo.saldo = emprestimo.valor_emprestimo_dolar - emprestimo.total_retornado;
        emprestimo.status = emprestimo.saldo <= 0 ? 'Quitado' : 'Ativo';
      }

      return novaDevolucao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  // Buscar empréstimos por ID de importação direta
  const getEmprestimosByImportacao = async (importacaoId: string): Promise<EmprestimoResumo[]> => {
    console.log('Buscando empréstimos por importação (mock):', importacaoId);
    return mockEmprestimos.filter(emp => emp.id_importacao_direta === importacaoId);
  };

  return {
    data,
    isLoading,
    error,
    createEmprestimo: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createDevolucao: createDevolucaoMutation.mutateAsync,
    isCreatingDevolucao: createDevolucaoMutation.isPending,
    getEmprestimosByImportacao,
  };
};
