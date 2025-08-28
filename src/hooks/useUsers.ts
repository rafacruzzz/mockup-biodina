
import { useState, useCallback } from 'react';
import { UserData } from '@/types/user';

// Dados iniciais dos usuários (migrados dos colaboradores)
const initialUsers: UserData[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    email: 'maria.santos@biodina.com.br',
    cpf: '123.456.789-00',
    telefone: '(11) 98765-4321',
    username: 'maria.santos',
    isActive: true,
    userType: 'usuario',
    status: 'Ativo',
    moduleAccess: [],
    dadosPessoais: {
      nome: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      pis: '',
      idade: '32',
      dataNascimento: '1991-01-15',
      estadoCivil: 'Solteira',
      nacionalidade: 'Brasileira',
      genero: 'Feminino',
      etnia: 'Branca',
      rg: '12.345.678-9',
      orgaoExpedidorRg: 'SSP',
      ufEmissorRg: 'SP',
      dataExpedicaoRg: '2010-01-15',
      naturalidade: 'São Paulo',
      nomeMae: 'Ana Silva Santos',
      nomePai: 'João Santos',
      cep: '01234-567',
      endereco: 'Rua das Flores, 123',
      numeroResidencia: '123',
      complemento: 'Apto 45',
      bairro: 'Centro',
      pcd: 'Não',
      doencaPreExistente: 'Não',
      email: 'maria.santos@biodina.com.br',
      telefone: '(11) 98765-4321',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: 'Biodina',
      uf: 'SP',
      setor: 'Tecnologia da Informação',
      funcao: 'Desenvolvimento',
      cargo: 'Analista de Sistemas',
      nivel: 'Pleno',
      cbo: '2124-05',
      compativelFuncao: true,
      funcoesDesempenhadas: 'Desenvolvimento de sistemas, manutenção de aplicações',
      dataAdmissao: '2023-01-15',
      dataCadastro: '2023-01-15',
      tempoCasa: '1 ano e 7 meses',
      ultimaPromocao: '',
      previsaoFerias: '2024-01-15',
      tipoUsuario: 'CLT',
      sindicatoVinculado: 'Sindicato dos Trabalhadores em TI',
      regimeTrabalho: 'CLT',
      horarioTrabalho: '08:00 às 17:00',
      cargaHorariaSemanal: '40h',
      origemContratacao: 'Processo Seletivo'
    },
    dadosFinanceiros: {
      salarioBase: '5000.00',
      adicionalNivel: '500.00',
      insalubridade: '0.00',
      sobreaviso: '0.00',
      salarioBruto: '5500.00',
      valorHoraTrabalhada: '27.50',
      pisoSalarial: '4500.00',
      mediaSalarial: '5200.00',
      dependentesIR: [],
      adiantamentoSalarial: false
    },
    dadosBancarios: {
      banco: '341',
      tipoConta: 'corrente',
      agencia: '1234',
      conta: '56789-0'
    },
    formacaoEscolaridade: {
      escolaridade: 'superior-completo',
      possuiDiploma: true,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: 'familiar',
      quantidadeDependentesPlano: '0',
      valeTransporte: {
        modalidade: 'metro',
        dataSolicitacaoCartao: '2023-01-20',
        dataPagamento: '5'
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '2023-01-20',
        dataPagamento: '5'
      },
      planoSaude: {
        operadora: 'Unimed',
        dataSolicitacao: '2023-01-20',
        vigenciaInicio: '2023-02-01',
        tipoPlano: 'individual',
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: {
      anexos: [],
      solicitadoParaDPEm: '2023-01-15',
      solicitadoPor: 'RH',
      motivoContratacao: 'Expansão da equipe',
      observacoesGerais: '',
      exameAdmissional: {
        data: '2023-01-10',
        local: 'Clínica Ocupacional',
        horario: '08:00'
      }
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
    nome: 'João Pedro Oliveira',
    email: 'joao.oliveira@biodina.com.br',
    cpf: '987.654.321-00',
    telefone: '(11) 97654-3210',
    username: 'joao.oliveira',
    isActive: true,
    userType: 'gerente',
    status: 'Ativo',
    moduleAccess: [],
    dadosPessoais: {
      nome: 'João Pedro Oliveira',
      cpf: '987.654.321-00',
      pis: '',
      idade: '35',
      dataNascimento: '1988-08-20',
      estadoCivil: 'Casado',
      nacionalidade: 'Brasileira',
      genero: 'Masculino',
      etnia: 'Branca',
      rg: '98.765.432-1',
      orgaoExpedidorRg: 'SSP',
      ufEmissorRg: 'SP',
      dataExpedicaoRg: '2005-08-20',
      naturalidade: 'São Paulo',
      nomeMae: 'Maria Oliveira',
      nomePai: 'Pedro Oliveira',
      cep: '04567-890',
      endereco: 'Av. Paulista, 1000',
      numeroResidencia: '1000',
      complemento: 'Sala 200',
      bairro: 'Bela Vista',
      pcd: 'Não',
      doencaPreExistente: 'Não',
      email: 'joao.oliveira@biodina.com.br',
      telefone: '(11) 97654-3210',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: 'Biodina',
      uf: 'SP',
      setor: 'Comercial',
      funcao: 'Coordenação',
      cargo: 'Coordenador Comercial',
      nivel: 'Sênior',
      cbo: '1414-20',
      compativelFuncao: true,
      funcoesDesempenhadas: 'Coordenação da equipe comercial, gestão de vendas',
      dataAdmissao: '2022-08-20',
      dataCadastro: '2022-08-20',
      tempoCasa: '2 anos',
      ultimaPromocao: '2023-08-20',
      previsaoFerias: '2024-08-20',
      tipoUsuario: 'CLT',
      sindicatoVinculado: 'Sindicato dos Comerciários',
      regimeTrabalho: 'CLT',
      horarioTrabalho: '08:00 às 18:00',
      cargaHorariaSemanal: '44h',
      origemContratacao: 'Indicação'
    },
    dadosFinanceiros: {
      salarioBase: '8000.00',
      adicionalNivel: '1200.00',
      insalubridade: '0.00',
      sobreaviso: '0.00',
      salarioBruto: '9200.00',
      valorHoraTrabalhada: '45.45',
      pisoSalarial: '7000.00',
      mediaSalarial: '8500.00',
      dependentesIR: [],
      adiantamentoSalarial: true
    },
    dadosBancarios: {
      banco: '237',
      tipoConta: 'corrente',
      agencia: '5678',
      conta: '12345-6'
    },
    formacaoEscolaridade: {
      escolaridade: 'pos-graduacao',
      possuiDiploma: true,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: 'familiar',
      quantidadeDependentesPlano: '2',
      valeTransporte: {
        modalidade: 'onibus',
        dataSolicitacaoCartao: '2022-08-25',
        dataPagamento: '5'
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '2022-08-25',
        dataPagamento: '5'
      },
      planoSaude: {
        operadora: 'SulAmérica',
        dataSolicitacao: '2022-08-25',
        vigenciaInicio: '2022-09-01',
        tipoPlano: 'familiar',
        possuiDependentes: true,
        dependentes: [
          {
            id: '1',
            nomeCompleto: 'Ana Oliveira',
            documento: '123.456.789-01',
            dataNascimento: '1990-05-10'
          },
          {
            id: '2',
            nomeCompleto: 'Pedro Oliveira Jr.',
            documento: '123.456.789-02',
            dataNascimento: '2015-03-15'
          }
        ]
      }
    },
    documentacao: {
      anexos: [],
      solicitadoParaDPEm: '2022-08-20',
      solicitadoPor: 'RH',
      motivoContratacao: 'Substituição',
      observacoesGerais: '',
      exameAdmissional: {
        data: '2022-08-15',
        local: 'Clínica Ocupacional',
        horario: '14:00'
      }
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

  const desligarUser = useCallback((id: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id 
          ? { ...user, status: 'Desligado' as const, isActive: false }
          : user
      )
    );
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

  return {
    users,
    adicionarUser,
    desligarUser,
    atualizarUser
  };
};
