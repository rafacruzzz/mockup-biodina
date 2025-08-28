
import { useState, useCallback } from 'react';
import { User, UserData } from '@/types/user';
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI } from '@/types/colaborador';

// Initialize with example users (migrated from colaboradores)
const initialUsers: User[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    cargo: 'Analista de Sistemas',
    departamento: 'Tecnologia da Informação',
    email: 'maria.santos@biodina.com.br',
    telefone: '(11) 98765-4321',
    dataAdmissao: '2023-01-15',
    status: 'Ativo',
    dados: {
      dadosPessoais: {
        nome: 'Maria Silva Santos',
        cpf: '123.456.789-01',
        pis: '12345678901',
        idade: '28',
        dataNascimento: '1995-03-15',
        estadoCivil: 'solteira',
        nacionalidade: 'brasileira',
        genero: 'feminino',
        etnia: 'branca',
        rg: '12.345.678-9',
        orgaoExpedidorRg: 'SSP',
        ufEmissorRg: 'SP',
        dataExpedicaoRg: '2015-01-10',
        naturalidade: 'São Paulo',
        nomeMae: 'Ana Silva Santos',
        nomePai: 'José Santos',
        cep: '01234-567',
        endereco: 'Rua das Flores, 123',
        numeroResidencia: '123',
        complemento: 'Apto 45',
        bairro: 'Centro',
        pcd: 'nao',
        doencaPreExistente: 'nao',
        email: 'maria.santos@biodina.com.br',
        telefone: '(11) 98765-4321',
        observacoes: ''
      } as DadosPessoais,
      dadosProfissionais: {
        empresa: 'Biodina',
        uf: 'SP',
        setor: 'TI',
        funcao: 'Desenvolvimento',
        cargo: 'Analista de Sistemas',
        nivel: '3',
        cbo: '317110',
        compativelFuncao: true,
        funcoesDesempenhadas: 'Desenvolvimento de sistemas web',
        dataAdmissao: '2023-01-15',
        dataCadastro: '2023-01-15',
        tempoCasa: '1 ano',
        ultimaPromocao: '',
        previsaoFerias: '2024-01-15',
        tipoUsuario: 'funcionario',
        regimeTrabalho: 'presencial',
        horarioTrabalho: '08:00 às 17:00',
        cargaHorariaSemanal: '40',
        origemContratacao: 'linkedin'
      } as DadosProfissionais,
      dadosFinanceiros: {
        salarioBase: '5000',
        adicionalNivel: '500',
        insalubridade: '0',
        sobreaviso: '0',
        salarioBruto: '5500',
        valorHoraTrabalhada: '31.25',
        pisoSalarial: '4500',
        mediaSalarial: '5200',
        dependentesIR: [],
        adiantamentoSalarial: false
      } as DadosFinanceiros,
      dadosBancarios: {
        banco: '341',
        tipoConta: 'corrente',
        agencia: '1234',
        conta: '12345-6'
      } as DadosBancarios,
      formacaoEscolaridade: {
        escolaridade: 'superior-completo',
        possuiDiploma: true,
        comprovantesEscolaridade: []
      } as FormacaoEscolaridade,
      beneficios: {
        tipoPlano: 'intermediario',
        quantidadeDependentesPlano: '0',
        valeTransporte: {
          modalidade: 'sptrans',
          dataSolicitacaoCartao: '2023-01-10',
          dataPagamento: '2023-01-31'
        },
        valeAlimentacao: {
          dataSolicitacaoCartao: '2023-01-10',
          dataPagamento: '2023-01-31'
        },
        planoSaude: {
          operadora: 'bradesco',
          dataSolicitacao: '2023-01-10',
          vigenciaInicio: '2023-02-01',
          tipoPlano: 'básico',
          possuiDependentes: false,
          dependentes: []
        }
      } as Beneficios,
      documentacao: {
        anexos: []
      } as Documentacao,
      dadosTI: {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: '',
        ramal: ''
      } as DadosTI
    },
    credentials: {
      username: 'maria.santos',
      isActive: true,
      userType: 'usuario',
      moduleAccess: []
    }
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    cargo: 'Coordenador Comercial',
    departamento: 'Comercial',
    email: 'joao.oliveira@biodina.com.br',
    telefone: '(11) 97654-3210',
    dataAdmissao: '2022-08-20',
    status: 'Ativo',
    dados: {
      dadosPessoais: {
        nome: 'João Pedro Oliveira',
        cpf: '987.654.321-09',
        pis: '98765432109',
        idade: '32',
        dataNascimento: '1991-08-10',
        estadoCivil: 'casado',
        nacionalidade: 'brasileiro',
        genero: 'masculino',
        etnia: 'parda',
        rg: '98.765.432-1',
        orgaoExpedidorRg: 'SSP',
        ufEmissorRg: 'SP',
        dataExpedicaoRg: '2010-05-15',
        naturalidade: 'Rio de Janeiro',
        nomeMae: 'Carmen Oliveira',
        nomePai: 'Pedro Oliveira Silva',
        cep: '04567-890',
        endereco: 'Av. Principal, 456',
        numeroResidencia: '456',
        complemento: 'Casa',
        bairro: 'Vila Nova',
        pcd: 'nao',
        doencaPreExistente: 'nao',
        email: 'joao.oliveira@biodina.com.br',
        telefone: '(11) 97654-3210',
        observacoes: ''
      } as DadosPessoais,
      dadosProfissionais: {
        empresa: 'Biodina',
        uf: 'SP',
        setor: 'Comercial',
        funcao: 'Coordenação',
        cargo: 'Coordenador Comercial',
        nivel: '4',
        cbo: '142105',
        compativelFuncao: true,
        funcoesDesempenhadas: 'Coordenação da equipe comercial e vendas',
        dataAdmissao: '2022-08-20',
        dataCadastro: '2022-08-20',
        tempoCasa: '1 ano e 4 meses',
        ultimaPromocao: '2023-08-20',
        previsaoFerias: '2024-08-20',
        tipoUsuario: 'funcionario',
        regimeTrabalho: 'hibrido',
        horarioTrabalho: '08:00 às 18:00',
        cargaHorariaSemanal: '44',
        origemContratacao: 'indicacao'
      } as DadosProfissionais,
      dadosFinanceiros: {
        salarioBase: '7000',
        adicionalNivel: '700',
        insalubridade: '0',
        sobreaviso: '500',
        salarioBruto: '8200',
        valorHoraTrabalhada: '40.91',
        pisoSalarial: '6500',
        mediaSalarial: '7500',
        dependentesIR: [],
        adiantamentoSalarial: true
      } as DadosFinanceiros,
      dadosBancarios: {
        banco: '237',
        tipoConta: 'corrente',
        agencia: '5678',
        conta: '98765-4'
      } as DadosBancarios,
      formacaoEscolaridade: {
        escolaridade: 'pos-graduacao',
        possuiDiploma: true,
        comprovantesEscolaridade: []
      } as FormacaoEscolaridade,
      beneficios: {
        tipoPlano: 'premium',
        quantidadeDependentesPlano: '2',
        valeTransporte: {
          modalidade: 'vale-combustivel',
          dataSolicitacaoCartao: '2022-08-15',
          dataPagamento: '2022-08-31'
        },
        valeAlimentacao: {
          dataSolicitacaoCartao: '2022-08-15',
          dataPagamento: '2022-08-31'
        },
        planoSaude: {
          operadora: 'sul-america',
          dataSolicitacao: '2022-08-15',
          vigenciaInicio: '2022-09-01',
          tipoPlano: 'premium',
          possuiDependentes: true,
          dependentes: []
        }
      } as Beneficios,
      documentacao: {
        anexos: []
      } as Documentacao,
      dadosTI: {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: '',
        ramal: ''
      } as DadosTI
    },
    credentials: {
      username: 'joao.oliveira',
      isActive: true,
      userType: 'gerente',
      moduleAccess: []
    }
  }
];

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const adicionarUser = useCallback((novoUserData: Omit<UserData, 'id'>) => {
    const user: User = {
      id: Date.now().toString(),
      nome: novoUserData.dadosPessoais.nome,
      email: novoUserData.dadosPessoais.email,
      telefone: novoUserData.dadosPessoais.telefone,
      cargo: novoUserData.dadosProfissionais.cargo,
      departamento: novoUserData.dadosProfissionais.setor,
      dataAdmissao: novoUserData.dadosProfissionais.dataAdmissao,
      status: 'Novo',
      dados: {
        ...novoUserData,
        id: Date.now().toString(),
        nome: novoUserData.dadosPessoais.nome,
        email: novoUserData.dadosPessoais.email,
        telefone: novoUserData.dadosPessoais.telefone,
        status: 'Novo'
      }
    };
    setUsers(prev => [...prev, user]);
    return user;
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

  const atualizarUser = useCallback((id: string, dadosAtualizados: Partial<UserData>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? {
              ...user,
              dados: { ...user.dados, ...dadosAtualizados },
              nome: dadosAtualizados.dadosPessoais?.nome || user.nome,
              email: dadosAtualizados.dadosPessoais?.email || user.email,
              telefone: dadosAtualizados.dadosPessoais?.telefone || user.telefone,
              cargo: dadosAtualizados.dadosProfissionais?.cargo || user.cargo,
              departamento: dadosAtualizados.dadosProfissionais?.setor || user.departamento
            }
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
