
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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

  // Buscar lista resumida de empréstimos
  const { data, isLoading, error } = useQuery({
    queryKey: ['emprestimos'],
    queryFn: async () => {
      console.log('Buscando empréstimos...');
      const { data, error } = await supabase
        .from('emprestimos_resumo')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar empréstimos:', error);
        throw error;
      }

      console.log('Empréstimos encontrados:', data);
      return data;
    },
  });

  // Criar novo empréstimo
  const createMutation = useMutation({
    mutationFn: async (emprestimo: EmprestimoInsert) => {
      console.log('Criando empréstimo:', emprestimo);
      const { data, error } = await supabase
        .from('emprestimos')
        .insert(emprestimo as any)
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar empréstimo:', error);
        throw error;
      }

      console.log('Empréstimo criado:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  // Criar devolução
  const createDevolucaoMutation = useMutation({
    mutationFn: async (devolucao: DevolucaoInsert) => {
      console.log('Criando devolução:', devolucao);
      const { data, error } = await supabase
        .from('emprestimos_devolucoes')
        .insert(devolucao as any)
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar devolução:', error);
        throw error;
      }

      console.log('Devolução criada:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emprestimos'] });
    },
  });

  // Buscar empréstimos por ID de importação direta
  const getEmprestimosByImportacao = async (importacaoId: string) => {
    const { data, error } = await supabase
      .from('emprestimos_resumo')
      .select('*')
      .eq('id_importacao_direta', importacaoId);

    if (error) {
      console.error('Erro ao buscar empréstimos por importação:', error);
      throw error;
    }

    return data;
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
