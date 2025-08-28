
import { useState, useCallback } from 'react';
import { UserData } from '@/types/user';

// Example users with full data structure
const initialUsers: UserData[] = [
  {
    id: '1',
    status: 'Ativo',
    credentials: {
      username: 'maria.santos',
      password: '',
      confirmPassword: '',
      isActive: true,
      userType: 'usuario'
    },
    moduleAccess: [],
    dadosPessoais: {
      nome: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      pis: '12345678901',
      idade: '28',
      dataNascimento: '1995-05-15',
      estadoCivil: 'solteiro',
      nacionalidade: 'brasileira',
      genero: 'feminino',
      etnia: 'parda',
      rg: '12.345.678-9',
      orgaoExpedidorRg: 'SSP',
      ufEmissorRg: 'SP',
      dataExpedicaoRg: '2015-01-01',
      naturalidade: 'São Paulo - SP',
      nomeMae: 'Ana Silva Santos',
      nomePai: 'João Santos',
      cep: '01234-567',
      endereco: 'Rua das Flores, 123',
      numeroResidencia: '123',
      complemento: 'Apt 45',
      bairro: 'Centro',
      pcd: 'nao',
      doencaPreExistente: 'nao',
      email: 'maria.santos@biodina.com.br',
      telefone: '(11) 98765-4321',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: 'Biodina',
      uf: 'SP',
      setor: 'Tecnologia da Informação',
      funcao: 'Analista de Sistemas',
      cargo: 'Analista de Sistemas',
      nivel: '2',
      cbo: '2124-05',
      compativelFuncao: true,
      funcoesDesempenhadas: 'Desenvolvimento e manutenção de sistemas',
      dataAdmissao: '2023-01-15',
      dataCadastro: '2023-01-10',
      tempoCasa: '1 ano e 8 meses',
      ultimaPromocao: '',
      previsaoFerias: '2024-07-15',
      tipoUsuario: 'funcionario',
      regimeTrabalho: 'hibrido',
      horarioTrabalho: '08:00 às 17:00',
      cargaHorariaSemanal: '40',
      origemContratacao: 'site-recrutamento'
    },
    dadosFinanceiros: {
      salarioBase: '5000.00',
      adicionalNivel: '500.00',
      insalubridade: '0.00',
      sobreaviso: '0.00',
      salarioBruto: '5500.00',
      valorHoraTrabalhada: '31.25',
      pisoSalarial: '4500.00',
      mediaSalarial: '5200.00',
      dependentesIR: [],
      adiantamentoSalarial: false
    },
    dadosBancarios: {
      banco: '341',
      tipoConta: 'corrente',
      agencia: '1234',
      conta: '12345-6'
    },
    formacaoEscolaridade: {
      escolaridade: 'superior-completo',
      possuiDiploma: true,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: '',
      quantidadeDependentesPlano: '0',
      valeTransporte: {
        modalidade: 'rio-card',
        dataSolicitacaoCartao: '2023-01-20',
        dataPagamento: '2023-01-31'
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '2023-01-20',
        dataPagamento: '2023-01-27'
      },
      planoSaude: {
        operadora: 'porto-seguro',
        dataSolicitacao: '2023-01-20',
        vigenciaInicio: '2023-02-01',
        tipoPlano: 'Plano Básico',
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: {
      anexos: []
    },
    dadosTI: {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    }
  },
  {
    id: '2',
    status: 'Ativo',
    credentials: {
      username: 'joao.oliveira',
      password: '',
      confirmPassword: '',
      isActive: true,
      userType: 'gerente'
    },
    moduleAccess: [],
    dadosPessoais: {
      nome: 'João Pedro Oliveira',
      cpf: '987.654.321-00',
      pis: '98765432109',
      idade: '35',
      dataNascimento: '1988-08-20',
      estadoCivil: 'casado',
      nacionalidade: 'brasileira',
      genero: 'masculino',
      etnia: 'branca',
      rg: '98.765.432-1',
      orgaoExpedidorRg: 'SSP',
      ufEmissorRg: 'SP',
      dataExpedicaoRg: '2010-01-01',
      naturalidade: 'Rio de Janeiro - RJ',
      nomeMae: 'Carla Oliveira',
      nomePai: 'Pedro Oliveira',
      cep: '04567-890',
      endereco: 'Av. Paulista, 1000',
      numeroResidencia: '1000',
      complemento: 'Sala 501',
      bairro: 'Bela Vista',
      pcd: 'nao',
      doencaPreExistente: 'nao',
      email: 'joao.oliveira@biodina.com.br',
      telefone: '(11) 97654-3210',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: 'Biodina',
      uf: 'SP',
      setor: 'Comercial',
      funcao: 'Coordenador Comercial',
      cargo: 'Coordenador Comercial',
      nivel: '3',
      cbo: '1414-20',
      compativelFuncao: true,
      funcoesDesempenhadas: 'Coordenação da equipe comercial e vendas',
      dataAdmissao: '2022-08-20',
      dataCadastro: '2022-08-15',
      tempoCasa: '2 anos e 1 mês',
      ultimaPromocao: '2023-08-20',
      previsaoFerias: '2024-08-15',
      tipoUsuario: 'funcionario',
      regimeTrabalho: 'presencial',
      horarioTrabalho: '08:00 às 18:00',
      cargaHorariaSemanal: '44',
      origemContratacao: 'indicacao'
    },
    dadosFinanceiros: {
      salarioBase: '8000.00',
      adicionalNivel: '1200.00',
      insalubridade: '0.00',
      sobreaviso: '0.00',
      salarioBruto: '9200.00',
      valorHoraTraduzida: '47.83',
      pisoSalarial: '7000.00',
      mediaSalarial: '8500.00',
      dependentesIR: [],
      adiantamentoSalarial: true
    },
    dadosBancarios: {
      banco: '237',
      tipoConta: 'corrente',
      agencia: '5678',
      conta: '98765-4'
    },
    formacaoEscolaridade: {
      escolaridade: 'pos-graduacao',
      possuiDiploma: true,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: '',
      quantidadeDependentesPlano: '1',
      valeTransporte: {
        modalidade: 'sptrans',
        dataSolicitacaoCartao: '2022-08-25',
        dataPagamento: '2022-08-31'
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '2022-08-25',
        dataPagamento: '2022-08-26'
      },
      planoSaude: {
        operadora: 'sul-america',
        dataSolicitacao: '2022-08-25',
        vigenciaInicio: '2022-09-01',
        tipoPlano: 'Plano Premium',
        possuiDependentes: true,
        dependentes: [
          {
            id: '1',
            nomeCompleto: 'Mariana Oliveira',
            documento: '123.456.789-01',
            dataNascimento: '1990-05-10'
          }
        ]
      }
    },
    documentacao: {
      anexos: []
    },
    dadosTI: {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    }
  }
];

export const useUsers = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);

  const adicionarUser = useCallback((novoUser: Omit<UserData, 'id'>) => {
    const user: UserData = {
      ...novoUser,
      id: Date.now().toString()
    };
    setUsers(prev => [...prev, user]);
    return user;
  }, []);

  const atualizarUser = useCallback((id: string, dadosAtualizados: Partial<UserData>) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id 
          ? { ...user, ...dadosAtualizados }
          : user
      )
    );
  }, []);

  const desligarUser = useCallback((id: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id 
          ? { ...user, status: 'Desligado' as const }
          : user
      )
    );
  }, []);

  return {
    users,
    adicionarUser,
    atualizarUser,
    desligarUser
  };
};
