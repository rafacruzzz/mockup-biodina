
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ColaboradorData } from '@/types/colaborador';

interface User {
  id: string;
  nome: string;
  email: string;
  nomeUsuario: string;
  fotoPerfil?: string;
  colaboradorId?: string;
  colaboradorData: ColaboradorData;
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

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  
  // Dados mockados completos do usuário logado
  const [user, setUser] = useState<User>({
    id: '1',
    nome: 'Danilo Silva',
    email: 'danilo@tecnologiadc.com.br',
    nomeUsuario: 'GERENCIADOR',
    colaboradorId: '1',
    fotoPerfil: undefined,
    colaboradorData: {
      dadosPessoais: {
        nome: 'Danilo Silva',
        cpf: '123.456.789-00',
        pis: '12345678901',
        idade: '35',
        dataNascimento: '1989-03-15',
        estadoCivil: 'Casado',
        nacionalidade: 'Brasileira',
        genero: 'masculino',
        etnia: 'branco',
        rg: '1234567',
        orgaoExpedidorRg: 'SSP',
        ufEmissorRg: 'DF',
        dataExpedicaoRg: '2010-01-15',
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
        cbo: '142510',
        compativelFuncao: true,
        funcoesDesempenhadas: 'Gestão de equipe de desenvolvimento, planejamento de projetos de TI, supervisão de infraestrutura tecnológica, implementação de soluções de software.',
        dataAdmissao: '2018-07-15',
        dataCadastro: '2018-07-10',
        tempoCasa: '6 anos e 5 meses',
        ultimaPromocao: '2022-01-15',
        previsaoFerias: '2024-12-15',
        planoCarreira: 'Plano de Carreira - Gerência de TI',
        sugestaoSalario: 'R$ 8.500,00',
        breakdownSalarial: 'Salário base: R$ 7.000,00 + Nível 4: R$ 1.000,00 + Adicional gestão: R$ 500,00'
      },
      dadosFinanceiros: {
        salarioBase: '7000.00',
        adicionalNivel: '1000.00',
        insalubridade: '0.00',
        sobreaviso: '500.00',
        salarioBruto: '8500.00',
        valorHoraTrabalhada: '48.30',
        pisoSalarial: '6500.00',
        mediaSalarial: '8200.00',
        dependentesIR: '2',
        sugestaoSalario: 'R$ 8.500,00',
        breakdownSalarial: 'Salário base: R$ 7.000,00 + Nível 4: R$ 1.000,00 + Adicional gestão: R$ 500,00',
        planoCarreira: 'Plano de Carreira - Gerência de TI'
      },
      dadosBancarios: {
        banco: '001',
        tipoConta: 'corrente',
        agencia: '3285-4',
        conta: '12345-6'
      },
      formacaoEscolaridade: {
        escolaridade: 'superior-completo',
        possuiDiploma: true
      },
      beneficios: {
        tipoPlano: 'premium',
        quantidadeDependentesPlano: '2'
      },
      documentacao: {
        anexos: [
          {
            id: '1',
            nome: 'RG_Danilo_Silva.pdf',
            tipo: 'application/pdf',
            tamanho: 1024000,
            dataUpload: '2024-01-15',
            categoria: 'RG',
            observacoes: 'Documento principal de identificação',
            arquivo: null
          },
          {
            id: '2',
            nome: 'CPF_Danilo_Silva.pdf',
            tipo: 'application/pdf',
            tamanho: 856000,
            dataUpload: '2024-01-15',
            categoria: 'CPF',
            observacoes: 'Comprovante de situação cadastral',
            arquivo: null
          },
          {
            id: '3',
            nome: 'Diploma_Sistemas_Informacao.pdf',
            tipo: 'application/pdf',
            tamanho: 2048000,
            dataUpload: '2024-01-15',
            categoria: 'Diploma/Certificado',
            observacoes: 'Bacharel em Sistemas de Informação - UnB (2010)',
            arquivo: null
          },
          {
            id: '4',
            nome: 'Comprovante_Residencia.pdf',
            tipo: 'application/pdf',
            tamanho: 1536000,
            dataUpload: '2024-01-15',
            categoria: 'Comprovante de Residência',
            observacoes: 'Conta de luz - dezembro 2024',
            arquivo: null
          },
          {
            id: '5',
            nome: 'Exames_Medicos_2024.pdf',
            tipo: 'application/pdf',
            tamanho: 3072000,
            dataUpload: '2024-01-15',
            categoria: 'Exames Médicos',
            observacoes: 'Exames admissionais e periódicos',
            arquivo: null
          }
        ]
      }
    }
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
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
