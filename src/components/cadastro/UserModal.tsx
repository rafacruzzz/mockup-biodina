
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, User, Shield, Users, Briefcase, DollarSign, CreditCard, GraduationCap, Heart, FileText, MessageSquare, Monitor } from "lucide-react";
import { UserData } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";
import UserCredentialsTab from "./UserCredentialsTab";
import AccessProfileSelector from "./AccessProfileSelector";
import ModuleAccessTree from "./ModuleAccessTree";
import DadosPessoaisTab from "../rh/tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "../rh/tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "../rh/tabs/DadosFinanceirosTab";
import DadosBancariosTab from "../rh/tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "../rh/tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "../rh/tabs/BeneficiosTab";
import DocumentacaoTab from "../rh/tabs/DocumentacaoTab";
import SolicitacoesTab from "../rh/tabs/SolicitacoesTab";
import TITab from "../rh/tabs/TITab";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  editMode?: boolean;
}

const UserModal = ({ isOpen, onClose, userData, editMode = false }: UserModalProps) => {
  const { adicionarUser, atualizarUser } = useUsers();
  
  const [formData, setFormData] = useState<UserData>({
    id: userData?.id || '',
    status: userData?.status || 'Novo',
    credentials: {
      username: userData?.credentials?.username || '',
      password: userData?.credentials?.password || '',
      confirmPassword: userData?.credentials?.confirmPassword || '',
      isActive: userData?.credentials?.isActive ?? true,
      userType: userData?.credentials?.userType || ''
    },
    moduleAccess: userData?.moduleAccess || [],
    dadosPessoais: {
      nome: userData?.dadosPessoais?.nome || '',
      cpf: userData?.dadosPessoais?.cpf || '',
      pis: userData?.dadosPessoais?.pis || '',
      idade: userData?.dadosPessoais?.idade || '',
      dataNascimento: userData?.dadosPessoais?.dataNascimento || '',
      estadoCivil: userData?.dadosPessoais?.estadoCivil || '',
      nacionalidade: userData?.dadosPessoais?.nacionalidade || '',
      genero: userData?.dadosPessoais?.genero || '',
      etnia: userData?.dadosPessoais?.etnia || '',
      rg: userData?.dadosPessoais?.rg || '',
      orgaoExpedidorRg: userData?.dadosPessoais?.orgaoExpedidorRg || '',
      ufEmissorRg: userData?.dadosPessoais?.ufEmissorRg || '',
      dataExpedicaoRg: userData?.dadosPessoais?.dataExpedicaoRg || '',
      naturalidade: userData?.dadosPessoais?.naturalidade || '',
      nomeMae: userData?.dadosPessoais?.nomeMae || '',
      nomePai: userData?.dadosPessoais?.nomePai || '',
      cep: userData?.dadosPessoais?.cep || '',
      endereco: userData?.dadosPessoais?.endereco || '',
      numeroResidencia: userData?.dadosPessoais?.numeroResidencia || '',
      complemento: userData?.dadosPessoais?.complemento || '',
      bairro: userData?.dadosPessoais?.bairro || '',
      pcd: userData?.dadosPessoais?.pcd || '',
      doencaPreExistente: userData?.dadosPessoais?.doencaPreExistente || '',
      email: userData?.dadosPessoais?.email || '',
      telefone: userData?.dadosPessoais?.telefone || '',
      observacoes: userData?.dadosPessoais?.observacoes || ''
    },
    dadosProfissionais: {
      empresa: userData?.dadosProfissionais?.empresa || '',
      uf: userData?.dadosProfissionais?.uf || '',
      setor: userData?.dadosProfissionais?.setor || '',
      funcao: userData?.dadosProfissionais?.funcao || '',
      cargo: userData?.dadosProfissionais?.cargo || '',
      nivel: userData?.dadosProfissionais?.nivel || '',
      cbo: userData?.dadosProfissionais?.cbo || '',
      compativelFuncao: userData?.dadosProfissionais?.compativelFuncao || false,
      funcoesDesempenhadas: userData?.dadosProfissionais?.funcoesDesempenhadas || '',
      dataAdmissao: userData?.dadosProfissionais?.dataAdmissao || '',
      dataCadastro: userData?.dadosProfissionais?.dataCadastro || '',
      tempoCasa: userData?.dadosProfissionais?.tempoCasa || '',
      ultimaPromocao: userData?.dadosProfissionais?.ultimaPromocao || '',
      previsaoFerias: userData?.dadosProfissionais?.previsaoFerias || '',
      tipoUsuario: userData?.dadosProfissionais?.tipoUsuario || '',
      regimeTrabalho: userData?.dadosProfissionais?.regimeTrabalho || '',
      horarioTrabalho: userData?.dadosProfissionais?.horarioTrabalho || '',
      cargaHorariaSemanal: userData?.dadosProfissionais?.cargaHorariaSemanal || '',
      origemContratacao: userData?.dadosProfissionais?.origemContratacao || ''
    },
    dadosFinanceiros: {
      salarioBase: userData?.dadosFinanceiros?.salarioBase || '',
      adicionalNivel: userData?.dadosFinanceiros?.adicionalNivel || '',
      insalubridade: userData?.dadosFinanceiros?.insalubridade || '',
      sobreaviso: userData?.dadosFinanceiros?.sobreaviso || '',
      salarioBruto: userData?.dadosFinanceiros?.salarioBruto || '',
      valorHoraTrabalhada: userData?.dadosFinanceiros?.valorHoraTrabalhada || '',
      pisoSalarial: userData?.dadosFinanceiros?.pisoSalarial || '',
      mediaSalarial: userData?.dadosFinanceiros?.mediaSalarial || '',
      dependentesIR: userData?.dadosFinanceiros?.dependentesIR || [],
      adiantamentoSalarial: userData?.dadosFinanceiros?.adiantamentoSalarial || false
    },
    dadosBancarios: {
      banco: userData?.dadosBancarios?.banco || '',
      tipoConta: userData?.dadosBancarios?.tipoConta || '',
      agencia: userData?.dadosBancarios?.agencia || '',
      conta: userData?.dadosBancarios?.conta || ''
    },
    formacaoEscolaridade: {
      escolaridade: userData?.formacaoEscolaridade?.escolaridade || '',
      possuiDiploma: userData?.formacaoEscolaridade?.possuiDiploma || false,
      comprovantesEscolaridade: userData?.formacaoEscolaridade?.comprovantesEscolaridade || []
    },
    beneficios: {
      tipoPlano: userData?.beneficios?.tipoPlano || '',
      quantidadeDependentesPlano: userData?.beneficios?.quantidadeDependentesPlano || '',
      valeTransporte: {
        modalidade: userData?.beneficios?.valeTransporte?.modalidade || '',
        dataSolicitacaoCartao: userData?.beneficios?.valeTransporte?.dataSolicitacaoCartao || '',
        dataPagamento: userData?.beneficios?.valeTransporte?.dataPagamento || ''
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: userData?.beneficios?.valeAlimentacao?.dataSolicitacaoCartao || '',
        dataPagamento: userData?.beneficios?.valeAlimentacao?.dataPagamento || ''
      },
      planoSaude: {
        operadora: userData?.beneficios?.planoSaude?.operadora || '',
        dataSolicitacao: userData?.beneficios?.planoSaude?.dataSolicitacao || '',
        vigenciaInicio: userData?.beneficios?.planoSaude?.vigenciaInicio || '',
        tipoPlano: userData?.beneficios?.planoSaude?.tipoPlano || '',
        possuiDependentes: userData?.beneficios?.planoSaude?.possuiDependentes || false,
        dependentes: userData?.beneficios?.planoSaude?.dependentes || []
      }
    },
    documentacao: {
      anexos: userData?.documentacao?.anexos || []
    },
    dadosTI: {
      servidorAcesso: userData?.dadosTI?.servidorAcesso || '',
      permissoesNecessarias: userData?.dadosTI?.permissoesNecessarias || '',
      restricoes: userData?.dadosTI?.restricoes || '',
      pastasAcesso: userData?.dadosTI?.pastasAcesso || '',
      emailCorporativo: userData?.dadosTI?.emailCorporativo || '',
      ramal: userData?.dadosTI?.ramal || ''
    }
  });

  const handleInputChange = (section: keyof UserData, field: string, value: any) => {
    if (section === 'credentials' || section === 'moduleAccess') {
      setFormData(prev => ({
        ...prev,
        [section]: section === 'moduleAccess' ? value : { ...prev[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const handleModuleAccessChange = (modules: any[]) => {
    setFormData(prev => ({
      ...prev,
      moduleAccess: modules
    }));
  };

  const handleSave = () => {
    if (editMode && userData?.id) {
      atualizarUser(userData.id, formData);
    } else {
      adicionarUser(formData);
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
                {editMode ? `Editar Usuário - ${formData.dadosPessoais.nome}` : 'Novo Usuário'}
              </DialogTitle>
              <p className="text-gray-600">
                {editMode ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="usuario" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-11 mb-4 h-auto p-1">
              <TabsTrigger value="usuario" className="text-xs p-2">
                <User className="h-3 w-3 mr-1" />
                Usuário
              </TabsTrigger>
              <TabsTrigger value="controle-sistema" className="text-xs p-2">
                <Shield className="h-3 w-3 mr-1" />
                Controle
              </TabsTrigger>
              <TabsTrigger value="dados-pessoais" className="text-xs p-2">
                <Users className="h-3 w-3 mr-1" />
                Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais" className="text-xs p-2">
                <Briefcase className="h-3 w-3 mr-1" />
                Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="text-xs p-2">
                <DollarSign className="h-3 w-3 mr-1" />
                Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios" className="text-xs p-2">
                <CreditCard className="h-3 w-3 mr-1" />
                Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao" className="text-xs p-2">
                <GraduationCap className="h-3 w-3 mr-1" />
                Formação
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="text-xs p-2">
                <Heart className="h-3 w-3 mr-1" />
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao" className="text-xs p-2">
                <FileText className="h-3 w-3 mr-1" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="solicitacoes" className="text-xs p-2">
                <MessageSquare className="h-3 w-3 mr-1" />
                Solicitações
              </TabsTrigger>
              <TabsTrigger value="ti" className="text-xs p-2">
                <Monitor className="h-3 w-3 mr-1" />
                TI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="usuario" className="mt-0">
              <UserCredentialsTab
                formData={formData.credentials}
                dadosPessoais={formData.dadosPessoais}
                onInputChange={(field, value) => handleInputChange('credentials', field, value)}
                onDadosPessoaisChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
              />
            </TabsContent>

            <TabsContent value="controle-sistema" className="mt-0">
              <div className="space-y-6 pb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Permissões e Controles de Sistema</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Configure as permissões de acesso aos módulos do sistema. Você pode aplicar um perfil pré-definido ou configurar as permissões individualmente.
                  </p>
                </div>

                <div className="space-y-4">
                  <AccessProfileSelector onProfileSelect={handleModuleAccessChange} />
                </div>

                <div className="space-y-4">
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Permissões Detalhadas</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure permissões específicas para cada módulo e funcionalidade
                    </p>
                    <ModuleAccessTree 
                      modules={formData.moduleAccess}
                      onModuleChange={handleModuleAccessChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dados-pessoais" className="mt-0">
              <DadosPessoaisTab
                formData={formData.dadosPessoais}
                onInputChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab
                formData={formData.dadosProfissionais}
                onInputChange={(field, value) => handleInputChange('dadosProfissionais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab
                formData={formData.dadosFinanceiros}
                onInputChange={(field, value) => handleInputChange('dadosFinanceiros', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab
                formData={formData.dadosBancarios}
                onInputChange={(field, value) => handleInputChange('dadosBancarios', field, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab
                formData={formData.formacaoEscolaridade}
                onInputChange={(field, value) => handleInputChange('formacaoEscolaridade', field, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab
                formData={formData.beneficios}
                onInputChange={(field, value) => handleInputChange('beneficios', field, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab
                formData={formData.documentacao}
                onInputChange={(field, value) => handleInputChange('documentacao', field, value)}
              />
            </TabsContent>

            <TabsContent value="solicitacoes" className="mt-0">
              <SolicitacoesTab colaboradorId={formData.id} />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab
                formData={formData.dadosTI}
                onInputChange={(field, value) => handleInputChange('dadosTI', field, value)}
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
