import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, User, Shield, UserCheck, Building2, DollarSign, CreditCard, GraduationCap, Heart, FileText, MessageSquare, Monitor } from "lucide-react";
import { UserData } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";

// Import all the colaborador tabs
import DadosPessoaisTab from "@/components/rh/tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "@/components/rh/tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "@/components/rh/tabs/DadosFinanceirosTab";
import DadosBancariosTab from "@/components/rh/tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "@/components/rh/tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "@/components/rh/tabs/BeneficiosTab";
import DocumentacaoTab from "@/components/rh/tabs/DocumentacaoTab";
import SolicitacoesTab from "@/components/rh/tabs/SolicitacoesTab";
import TITab from "@/components/rh/tabs/TITab";
import UserCredentialsTab from "./UserCredentialsTab";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  editMode?: boolean;
}

const UserModal = ({ isOpen, onClose, userId, editMode = false }: UserModalProps) => {
  const { users, atualizarUser } = useUsers();
  const user = userId ? users.find(u => u.id === userId) : null;
  const [formData, setFormData] = useState<UserData>(user?.dados || {
    dadosPessoais: {
      nome: '',
      cpf: '',
      pis: '',
      idade: '',
      dataNascimento: '',
      estadoCivil: '',
      nacionalidade: '',
      genero: '',
      etnia: '',
      rg: '',
      orgaoExpedidorRg: '',
      ufEmissorRg: '',
      dataExpedicaoRg: '',
      naturalidade: '',
      nomeMae: '',
      nomePai: '',
      cep: '',
      endereco: '',
      numeroResidencia: '',
      complemento: '',
      bairro: '',
      pcd: '',
      doencaPreExistente: '',
      email: '',
      telefone: '',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: '',
      uf: '',
      setor: '',
      funcao: '',
      cargo: '',
      nivel: '',
      cbo: '',
      compativelFuncao: false,
      funcoesDesempenhadas: '',
      dataAdmissao: '',
      dataCadastro: '',
      tempoCasa: '',
      ultimaPromocao: '',
      previsaoFerias: '',
      tipoUsuario: '',
      regimeTrabalho: '',
      horarioTrabalho: '',
      cargaHorariaSemanal: '',
      origemContratacao: ''
    },
    dadosFinanceiros: {
      salarioBase: '',
      adicionalNivel: '',
      insalubridade: '',
      sobreaviso: '',
      salarioBruto: '',
      valorHoraTrabalhada: '',
      pisoSalarial: '',
      mediaSalarial: '',
      dependentesIR: [],
      adiantamentoSalarial: false
    },
    dadosBancarios: {
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    },
    formacaoEscolaridade: {
      escolaridade: '',
      possuiDiploma: false,
      comprovantesEscolaridade: []
    },
    beneficios: {
      tipoPlano: '',
      quantidadeDependentesPlano: '',
      valeTransporte: {
        modalidade: '',
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      planoSaude: {
        operadora: '',
        dataSolicitacao: '',
        vigenciaInicio: '',
        tipoPlano: '',
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: {
      anexos: []
    }
  } as UserData);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      // Handle nested field updates
      const fieldParts = field.split('.');
      if (fieldParts.length > 1) {
        const [section, subField] = fieldParts;
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof UserData],
            [subField]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSave = () => {
    if (userId) {
      atualizarUser(userId, formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <User className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                {editMode ? `${formData.nome || 'Usuário'}` : 'Novo Usuário'}
              </DialogTitle>
              <p className="text-gray-600">
                {editMode ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="dados-pessoais">
                <UserCheck className="h-4 w-4 mr-2" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais">
                <Building2 className="h-4 w-4 mr-2" />
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros">
                <DollarSign className="h-4 w-4 mr-2" />
                Dados Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios">
                <CreditCard className="h-4 w-4 mr-2" />
                Dados Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao">
                <GraduationCap className="h-4 w-4 mr-2" />
                Formação
              </TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="beneficios">
                <Heart className="h-4 w-4 mr-2" />
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao">
                <FileText className="h-4 w-4 mr-2" />
                Documentação
              </TabsTrigger>
              {editMode && (
                <TabsTrigger value="solicitacoes">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Solicitações
                </TabsTrigger>
              )}
              {editMode && (
                <TabsTrigger value="ti">
                  <Monitor className="h-4 w-4 mr-2" />
                  TI
                </TabsTrigger>
              )}
              <TabsTrigger value="credentials">
                <Shield className="h-4 w-4 mr-2" />
                Credenciais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-pessoais" className="mt-0">
              <DadosPessoaisTab 
                formData={formData.dadosPessoais}
                onInputChange={(field, value) => handleInputChange(`dadosPessoais.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab 
                formData={formData.dadosProfissionais}
                onInputChange={(field, value) => handleInputChange(`dadosProfissionais.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab 
                formData={formData.dadosFinanceiros}
                onInputChange={(field, value) => handleInputChange(`dadosFinanceiros.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab 
                formData={formData.dadosBancarios}
                onInputChange={(field, value) => handleInputChange(`dadosBancarios.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab 
                formData={formData.formacaoEscolaridade}
                onInputChange={(field, value) => handleInputChange(`formacaoEscolaridade.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab 
                formData={formData.beneficios}
                onInputChange={(field, value) => handleInputChange(`beneficios.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab 
                formData={formData.documentacao}
                onInputChange={(field, value) => handleInputChange(`documentacao.${field}`, value)}
              />
            </TabsContent>

            {editMode && (
              <TabsContent value="solicitacoes" className="mt-0">
                <SolicitacoesTab colaboradorId={userId || ''} />
              </TabsContent>
            )}

            {editMode && (
              <TabsContent value="ti" className="mt-0">
                <TITab 
                  formData={formData.dadosTI || {}}
                  onInputChange={(field, value) => handleInputChange(`dadosTI.${field}`, value)}
                />
              </TabsContent>
            )}

            <TabsContent value="credentials" className="mt-0">
              <UserCredentialsTab 
                formData={formData.credentials || { isActive: true, moduleAccess: [] }}
                onInputChange={(field, value) => handleInputChange(`credentials.${field}`, value)}
                userData={formData}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            {editMode ? 'Salvar Alterações' : 'Salvar Usuário'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
