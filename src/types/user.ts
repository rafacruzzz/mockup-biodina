
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI, DadosDesligamento } from './colaborador';
import { ModuleAccess } from './permissions';

export interface UserData {
  // Identificação do usuário
  id: string;
  
  // Dados básicos (mantidos para compatibilidade)
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  
  // Credenciais de sistema (opcionais)
  username?: string;
  password?: string;
  confirmPassword?: string;
  
  // Status e tipo
  isActive: boolean;
  userType: string;
  status: 'Novo' | 'Ativo' | 'Inativo' | 'Desligado';
  
  // Controle de sistema
  moduleAccess: ModuleAccess[];
  
  // Dados completos do colaborador (todas as abas)
  dadosPessoais: DadosPessoais;
  dadosProfissionais: DadosProfissionais;
  dadosFinanceiros: DadosFinanceiros;
  dadosBancarios: DadosBancarios;
  formacaoEscolaridade: FormacaoEscolaridade;
  beneficios: Beneficios;
  documentacao: Documentacao;
  dadosTI?: DadosTI;
  desligamento?: DadosDesligamento;
  
  // Campos adicionais para sugestões salariais
  planoCarreira?: string;
  sugestaoSalario?: string;
  breakdownSalarial?: string;
}

// Interface para usuários básicos (sem todas as abas)
export interface BasicUserData {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  isActive: boolean;
  userType: string;
  moduleAccess: ModuleAccess[];
}
