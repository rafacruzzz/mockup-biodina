import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, User, Shield, UserMinus, AlertTriangle, Monitor, Bell } from "lucide-react";
import { UserData } from "@/types/user";
import { ModuleAccess } from "@/types/permissions";
import AccessProfileSelector from "./AccessProfileSelector";
import ModuleAccessTree from "./ModuleAccessTree";

// Importar todas as abas do colaborador
import DadosPessoaisTab from "../rh/tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "../rh/tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "../rh/tabs/DadosFinanceirosTab";
import DadosBancariosTab from "../rh/tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "../rh/tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "../rh/tabs/BeneficiosTab";
import DocumentacaoTab from "../rh/tabs/DocumentacaoTab";
import TITab from "../rh/tabs/TITab";
import DesligamentoTab from "../rh/tabs/DesligamentoTab";
import SolicitacoesTab from "../rh/tabs/SolicitacoesTab";
import CredenciaisTab from "./CredenciaisTab";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  editMode?: boolean;
  showCredentials?: boolean; // Controla se mostra abas de credenciais
}

const UserModal = ({ 
  isOpen, 
  onClose, 
  userData, 
  editMode = false,
  showCredentials = true 
}: UserModalProps) => {
  const [userDesligado, setUserDesligado] = useState(!!userData?.desligamento);
  
  const [formData, setFormData] = useState<UserData>({
    id: userData?.id || '',
    nome: userData?.nome || '',
    email: userData?.email || '',
    cpf: userData?.cpf || '',
    telefone: userData?.telefone || '',
    username: userData?.username || '',
    password: userData?.password || '',
    confirmPassword: userData?.confirmPassword || '',
    isActive: userData?.isActive ?? true,
    userType: userData?.userType || '',
    status: userData?.status || 'Novo',
    moduleAccess: userData?.moduleAccess || [],
    dadosPessoais: userData?.dadosPessoais || {
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
    dadosProfissionais: userData?.dadosProfissionais || {
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
      sindicatoVinculado: '',
      regimeTrabalho: '',
      horarioTrabalho: '',
      cargaHorariaSemanal: '',
      origemContratacao: ''
    },
    dadosFinanceiros: userData?.dadosFinanceiros || {
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
    dadosBancarios: userData?.dadosBancarios || {
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    },
    formacaoEscolaridade: userData?.formacaoEscolaridade || {
      escolaridade: '',
      possuiDiploma: false,
      comprovantesEscolaridade: []
    },
    beneficios: userData?.beneficios || {
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
    documentacao: userData?.documentacao || {
      anexos: [],
      solicitadoParaDPEm: '',
      solicitadoPor: '',
      motivoContratacao: '',
      observacoesGerais: '',
      exameAdmissional: {
        data: '',
        local: '',
        horario: ''
      }
    },
    dadosTI: userData?.dadosTI || {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    },
    desligamento: userData?.desligamento,
    planoCarreira: userData?.planoCarreira || '',
    sugestaoSalario: userData?.sugestaoSalario || '',
    breakdownSalarial: userData?.breakdownSalarial || ''
  });

  const handleInputChange = (section: keyof UserData | string, field: string, value: any) => {
    if (section === 'planoCarreira' || section === 'sugestaoSalario' || section === 'breakdownSalarial') {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    } else if (section === 'beneficios') {
      if (field === 'valeTransporte' || field === 'valeAlimentacao' || field === 'planoSaude') {
        try {
          const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
          setFormData(prev => ({
            ...prev,
            beneficios: {
              ...prev.beneficios,
              [field]: parsedValue
            }
          }));
        } catch (e) {
          console.error('Error parsing nested benefit data:', e);
        }
      } else {
        setFormData(prev => ({
          ...prev,
          beneficios: {
            ...prev.beneficios,
            [field]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof UserData],
          [field]: value
        }
      }));
    }
  };

  const handleModuleAccessChange = (modules: ModuleAccess[]) => {
    setFormData(prev => ({
      ...prev,
      moduleAccess: modules
    }));
  };

  const handleDesligarUser = (motivo: string, data: string) => {
    const dadosDesligamento = {
      motivoDesligamento: motivo,
      dataDesligamento: data,
      processadoPor: 'Administrador',
      observacoes: '',
      itensDesligamento: [
        { id: '1', nome: 'Crachá hospital', necessario: false, dataEntrega: '', entregue: false },
        { id: '2', nome: 'Crachá empresa', necessario: false, dataEntrega: '', entregue: false },
        // ... keep existing code (lista completa de itens)
      ]
    };

    setFormData(prev => ({
      ...prev,
      desligamento: dadosDesligamento,
      status: 'Desligado',
      isActive: false
    }));

    setUserDesligado(true);
  };

  const handleSave = () => {
    console.log('Salvando usuário:', formData);
    onClose();
  };

  const dadosProfissionaisWithSuggestion = {
    ...formData.dadosProfissionais,
    planoCarreira: formData.planoCarreira,
    sugestaoSalario: formData.sugestaoSalario,
    breakdownSalarial: formData.breakdownSalarial
  };

  const dadosFinanceirosWithSuggestion = {
    ...formData.dadosFinanceiros,
    planoCarreira: formData.planoCarreira,
    sugestaoSalario: formData.sugestaoSalario,
    breakdownSalarial: formData.breakdownSalarial
  };

  // Determinar quantas abas temos baseado no modo e se tem credenciais
  const baseTabsCount = 7; // Dados pessoais até documentação
  const credentialsTabsCount = showCredentials ? 1 : 0;
  const editTabsCount = editMode ? 2 : 0; // Solicitações + TI
  const desligamentoTabsCount = userDesligado ? 1 : 0;
  const totalTabs = baseTabsCount + credentialsTabsCount + editTabsCount + desligamentoTabsCount;

  const getTabsGridClass = (totalTabs: number) => {
    if (totalTabs <= 7) return 'grid grid-cols-7';
    if (totalTabs <= 8) return 'grid grid-cols-8';
    if (totalTabs <= 9) return 'grid grid-cols-9';
    return 'grid grid-cols-10';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-biodina-gold/10 rounded-lg">
                <User className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-biodina-blue flex items-center gap-2">
                  {editMode ? `Editar Usuário - ${formData.nome}` : 'Novo Usuário'}
                  {userDesligado && (
                    <Badge variant="destructive" className="ml-2">
                      Desligado
                    </Badge>
                  )}
                </DialogTitle>
                <p className="text-gray-600">
                  {editMode ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema'}
                </p>
              </div>
            </div>
            
            {editMode && !userDesligado && (
              <Button
                variant="outline"
                onClick={() => handleDesligarUser('', '')}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                <UserMinus className="h-4 w-4 mr-2" />
                Desligar Usuário
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className={`${getTabsGridClass(totalTabs)} w-full mb-4`}>
              <TabsTrigger value="dados-pessoais" className="text-xs">
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais" className="text-xs">
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="text-xs">
                Dados Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios" className="text-xs">
                Dados Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao-escolaridade" className="text-xs">
                Formação
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="text-xs">
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao" className="text-xs">
                Documentação
              </TabsTrigger>
              
              {showCredentials && (
                <TabsTrigger value="credenciais-sistema" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Sistema
                </TabsTrigger>
              )}
              
              {editMode && (
                <TabsTrigger value="solicitacoes" className="text-xs">
                  <Bell className="h-4 w-4 mr-1" />
                  Solicitações
                </TabsTrigger>
              )}
              
              {editMode && (
                <TabsTrigger value="ti" className="text-xs">
                  <Monitor className="h-4 w-4 mr-1" />
                  TI
                </TabsTrigger>
              )}
              
              {userDesligado && (
                <TabsTrigger value="desligamento" className="text-xs">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Desligamento
                </TabsTrigger>
              )}
            </TabsList>

            <div className="flex-1 overflow-y-auto px-1">
              <TabsContent value="dados-pessoais" className="mt-0">
                <DadosPessoaisTab 
                  formData={formData.dadosPessoais}
                  onInputChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
                />
              </TabsContent>

              <TabsContent value="dados-profissionais" className="mt-0">
                <DadosProfissionaisTab 
                  formData={dadosProfissionaisWithSuggestion}
                  onInputChange={(field, value) => {
                    if (field === 'planoCarreira' || field === 'sugestaoSalario' || field === 'breakdownSalarial') {
                      handleInputChange(field, '', value);
                    } else {
                      handleInputChange('dadosProfissionais', field, value);
                    }
                  }}
                />
              </TabsContent>

              <TabsContent value="dados-financeiros" className="mt-0">
                <DadosFinanceirosTab 
                  formData={dadosFinanceirosWithSuggestion}
                  onInputChange={(field, value) => handleInputChange('dadosFinanceiros', field, value)}
                />
              </TabsContent>

              <TabsContent value="dados-bancarios" className="mt-0">
                <DadosBancariosTab 
                  formData={formData.dadosBancarios}
                  onInputChange={(field, value) => handleInputChange('dadosBancarios', field, value)}
                />
              </TabsContent>

              <TabsContent value="formacao-escolaridade" className="mt-0">
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
                  colaboradorData={formData}
                />
              </TabsContent>

              {showCredentials && (
                <TabsContent value="credenciais-sistema" className="mt-0">
                  <CredenciaisTab 
                    formData={formData}
                    onInputChange={handleInputChange}
                    onModuleAccessChange={handleModuleAccessChange}
                  />
                </TabsContent>
              )}

              {editMode && formData.id && (
                <TabsContent value="solicitacoes" className="mt-0">
                  <SolicitacoesTab colaboradorId={formData.id} />
                </TabsContent>
              )}

              {editMode && (
                <TabsContent value="ti" className="mt-0">
                  <TITab 
                    formData={formData.dadosTI!}
                    onInputChange={(field, value) => handleInputChange('dadosTI', field, value)}
                  />
                </TabsContent>
              )}

              {userDesligado && formData.desligamento && (
                <TabsContent value="desligamento" className="mt-0">
                  <DesligamentoTab 
                    formData={formData.desligamento}
                    onInputChange={(field, value) => handleInputChange('desligamento', field, value)}
                  />
                </TabsContent>
              )}
            </div>
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
