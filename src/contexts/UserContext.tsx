import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ColaboradorData } from '@/types/colaborador';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePicture?: string;
  role: string;
  empresaId?: string;
  colaboradorId?: string;
  fotoPerfil?: File;
  colaboradorData?: ColaboradorData;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>({
    id: 'user-biodina',
    name: 'Danilo Silva',
    email: 'danilo@tecnologiadc.com.br',
    username: 'danilo.silva',
    profilePicture: '/placeholder.svg',
    role: 'Gerente de TI',
    empresaId: 'biodina-001',
    colaboradorId: '1',
    fotoPerfil: undefined,
    colaboradorData: {
      dadosPessoais: {
        nome: 'Danilo Silva',
        idade: '35',
        dataNascimento: '1989-03-15',
        estadoCivil: 'Casado',
        nacionalidade: 'Brasileira',
        genero: 'masculino',
        etnia: 'branco',
        naturalidade: 'Brasília-DF',
        nomeMae: 'Maria Silva Santos',
        nomePai: 'João Silva',
        cep: '70000-000',
        endereco: 'SQN 410 Bloco A Apt 101, Asa Norte',
        numeroResidencia: '101',
        complemento: 'Bloco A, Apt 101',
        bairro: 'Asa Norte',
        pcd: 'Não informado',
        doencaPreExistente: 'Não informado',
        email: 'danilo@tecnologiadc.com.br',
        telefone: '(61) 99999-9999',
        observacoes: 'Colaborador exemplar, sempre pontual e dedicado.'
      },
      dadosProfissionais: {
        empresa: 'Tecnologia DC',
        uf: 'DF',
        setor: 'Tecnologia da Informação',
        funcao: 'Gerenciamento de TI',
        cargo: 'Gerente de TI',
        nivel: '4',
        cbo: '142115',
        compativelFuncao: true,
        funcoesDesempenhadas: 'Gestão completa da área de TI, incluindo infraestrutura, desenvolvimento e suporte',
        dataAdmissao: '2020-01-15',
        dataCadastro: '2020-01-15',
        tempoCasa: '4 anos e 1 mês',
        ultimaPromocao: '2022-06-15',
        previsaoFerias: '2024-12-15',
        tipoUsuario: 'Gerente',
        sindicatoVinculado: 'SINDPD',
        regimeTrabalho: 'CLT',
        horarioTrabalho: '8h às 17h',
        cargaHorariaSemanal: '40h',
        origemContratacao: 'Processo Seletivo'
      },
      dadosFinanceiros: {
        salarioBase: '15000.00',
        adicionalNivel: '1500.00',
        insalubridade: '0.00',
        sobreaviso: '500.00',
        salarioBruto: '17000.00',
        valorHoraTrabalhada: '96.15',
        pisoSalarial: '12000.00',
        mediaSalarial: '15500.00',
        dependentesIR: [
          {
            id: '1',
            nome: 'Ana Silva Santos',
            documento: '123.456.789-01',
            idade: 9,
            grauParentesco: 'Filha',
            rg: '12.345.678-9',
            dataNascimento: '2015-03-15'
          },
          {
            id: '2',
            nome: 'Carlos Silva Santos',
            documento: '123.456.789-02',
            idade: 13,
            grauParentesco: 'Filho',
            rg: '98.765.432-1',
            dataNascimento: '2011-08-20'
          }
        ],
        adiantamentoSalarial: true
      },
      dadosBancarios: {
        banco: '341 - Itaú',
        tipoConta: 'Conta Corrente',
        agencia: '1234',
        conta: '56789-0',
        contaPF_PJ: 'pf',
        chavePix: 'danilo@email.com',
        bancoSecundario: '',
        tipoContaSecundario: '',
        agenciaSecundario: '',
        contaSecundario: ''
      },
      formacaoEscolaridade: {
        escolaridade: 'Pós-graduação',
        possuiDiploma: true,
        curriculo: {
          id: 'curr-1',
          nome: 'Curriculo_Danilo_Silva.pdf',
          tipo: 'application/pdf',
          tamanho: 2048000,
          dataUpload: '2024-01-10',
          categoria: 'curriculo',
          observacoes: 'Currículo atualizado com últimas experiências',
          arquivo: null,
          validadeIndeterminada: true
        },
        comprovantesEscolaridade: [
          {
            id: 'comp-1',
            nome: 'Diploma_Sistemas_Informacao.pdf',
            tipo: 'application/pdf',
            tamanho: 1536000,
            dataUpload: '2024-01-15',
            categoria: 'comprovante-escolaridade',
            observacoes: 'Bacharel em Sistemas de Informação - UnB (2010)',
            arquivo: null,
            validadeIndeterminada: true
          },
          {
            id: 'comp-2',
            nome: 'Certificado_Gestao_Projetos.pdf',
            tipo: 'application/pdf',
            tamanho: 1024000,
            dataUpload: '2024-01-20',
            categoria: 'comprovante-escolaridade',
            observacoes: 'Certificação em Gestão de Projetos - PMI (2020)',
            arquivo: null,
            validadeIndeterminada: true
          }
        ]
      },
      documentacao: {
        cpf: '123.456.789-00',
        pis: '12345678901',
        rg: '1234567',
        orgaoExpedidorRg: 'SSP',
        ufEmissorRg: 'DF',
        dataExpedicaoRg: '2010-01-15',
        anexos: [],
        solicitadoParaDPEm: '',
        solicitadoPor: '',
        motivoContratacao: '',
        observacoesGerais: ''
      },
      beneficios: {
        tipoPlano: 'premium',
        quantidadeDependentesPlano: '2',
        valeTransporte: {
          modalidade: 'banco',
          dataSolicitacaoCartao: '2024-01-10',
          dataPagamento: '2024-01-31'
        },
        valeAlimentacao: {
          dataSolicitacaoCartao: '2024-01-10',
          dataPagamento: '2024-01-26'
        },
        planoSaude: {
          operadora: 'bradesco',
          dataSolicitacao: '2024-01-05',
          vigenciaInicio: '2024-02-01',
          tipoPlano: 'Plano Executivo Premium com cobertura nacional e internacional',
          possuiDependentes: true,
          dependentes: [
            {
              id: '1',
              nomeCompleto: 'Ana Silva Santos',
              documento: '123.456.789-01',
              dataNascimento: '2015-05-20'
            },
            {
              id: '2',
              nomeCompleto: 'Carlos Silva Santos',
              documento: '123.456.789-02',
              dataNascimento: '2011-08-12'
            }
          ]
        }
      },
      dadosTI: {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: 'danilo@tecnologiadc.com.br',
        ramal: '2001'
      }
    }
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;