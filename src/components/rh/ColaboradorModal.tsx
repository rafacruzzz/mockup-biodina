import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, User, Bell, UserMinus, AlertTriangle, Monitor, Shield, AlertCircle, FileText } from "lucide-react";
import { useDraft } from "@/hooks/useDraft";
import { DraftIndicator, DraftSaveButton } from "@/components/cadastro/DraftIndicator";
import { ColaboradorData } from "@/types/colaborador";
import { ModuloUsuario, EmpresaVinculada } from "@/types/permissions";
import { getSolicitacoesByColaborador } from "@/data/solicitacoes";
import { useColaboradores } from "@/hooks/useColaboradores";
import { useEmpresa } from "@/contexts/EmpresaContext";
import { useModulosUsuario } from "@/hooks/useModulosUsuario";
import DadosPessoaisTab from "./tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "./tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "./tabs/DadosFinanceirosTab";
import DadosBancariosTab from "./tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "./tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "./tabs/BeneficiosTab";
import DocumentacaoTab from "./tabs/DocumentacaoTab";
import SolicitacoesTab from "./tabs/SolicitacoesTab";
import DesligamentoTab from "./tabs/DesligamentoTab";
import DesligarColaboradorModal from "./DesligarColaboradorModal";
import TITab from "./tabs/TITab";
import ModuleAccessTree from "../cadastro/ModuleAccessTree";
import { EmpresasDoUsuario } from "../cadastro/EmpresasDoUsuario";

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  colaboradorId?: string;
  editMode?: boolean;
  colaboradorData?: ColaboradorData;
  context?: "colaborador" | "usuario";
}

const ColaboradorModal = ({ 
  isOpen, 
  onClose, 
  colaboradorId, 
  editMode = false,
  colaboradorData,
  context = "colaborador"
}: ColaboradorModalProps) => {
  const { desligarColaborador } = useColaboradores();
  const { empresaAtual, filiais } = useEmpresa();
  const [isDesligarModalOpen, setIsDesligarModalOpen] = useState(false);
  const [colaboradorDesligado, setColaboradorDesligado] = useState(!!colaboradorData?.desligamento);
  
  // Hook de rascunho
  const { 
    hasDraft, 
    draftInfo, 
    saveDraft, 
    loadDraft, 
    discardDraft, 
    clearDraftOnSave 
  } = useDraft<any>({
    moduleName: 'rh',
    entityType: 'colaboradores',
    expirationDays: 7
  });
  
  const [formData, setFormData] = useState<ColaboradorData & {
    planoCarreira?: string;
    sugestaoSalario?: string;
    breakdownSalarial?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
    isActive?: boolean;
    moduleAccess?: ModuloUsuario[];
    empresasVinculadas?: EmpresaVinculada[];
  }>({
    dadosPessoais: {
      nome: colaboradorData?.dadosPessoais?.nome || '',
      idade: colaboradorData?.dadosPessoais?.idade || '',
      dataNascimento: colaboradorData?.dadosPessoais?.dataNascimento || '',
      estadoCivil: colaboradorData?.dadosPessoais?.estadoCivil || '',
      nacionalidade: colaboradorData?.dadosPessoais?.nacionalidade || '',
      genero: colaboradorData?.dadosPessoais?.genero || '',
      etnia: colaboradorData?.dadosPessoais?.etnia || '',
      naturalidade: colaboradorData?.dadosPessoais?.naturalidade || '',
      nomeMae: colaboradorData?.dadosPessoais?.nomeMae || '',
      nomePai: colaboradorData?.dadosPessoais?.nomePai || '',
      cep: colaboradorData?.dadosPessoais?.cep || '',
      endereco: colaboradorData?.dadosPessoais?.endereco || '',
      numeroResidencia: colaboradorData?.dadosPessoais?.numeroResidencia || '',
      complemento: colaboradorData?.dadosPessoais?.complemento || '',
      bairro: colaboradorData?.dadosPessoais?.bairro || '',
      comprovanteResidencia: colaboradorData?.dadosPessoais?.comprovanteResidencia || undefined,
      pcd: colaboradorData?.dadosPessoais?.pcd || '',
      doencaPreExistente: colaboradorData?.dadosPessoais?.doencaPreExistente || '',
      email: colaboradorData?.dadosPessoais?.email || '',
      telefone: colaboradorData?.dadosPessoais?.telefone || '',
      observacoes: colaboradorData?.dadosPessoais?.observacoes || ''
    },
    dadosProfissionais: {
      empresa: colaboradorData?.dadosProfissionais?.empresa || '',
      uf: colaboradorData?.dadosProfissionais?.uf || '',
      setor: colaboradorData?.dadosProfissionais?.setor || '',
      funcao: colaboradorData?.dadosProfissionais?.funcao || '',
      cargo: colaboradorData?.dadosProfissionais?.cargo || '',
      nivel: colaboradorData?.dadosProfissionais?.nivel || '',
      cbo: colaboradorData?.dadosProfissionais?.cbo || '',
      compativelFuncao: colaboradorData?.dadosProfissionais?.compativelFuncao || false,
      funcoesDesempenhadas: colaboradorData?.dadosProfissionais?.funcoesDesempenhadas || '',
      dataAdmissao: colaboradorData?.dadosProfissionais?.dataAdmissao || '',
      dataCadastro: colaboradorData?.dadosProfissionais?.dataCadastro || '',
      tempoCasa: colaboradorData?.dadosProfissionais?.tempoCasa || '',
      ultimaPromocao: colaboradorData?.dadosProfissionais?.ultimaPromocao || '',
      previsaoFerias: colaboradorData?.dadosProfissionais?.previsaoFerias || '',
      tipoUsuario: colaboradorData?.dadosProfissionais?.tipoUsuario || '',
      sindicatoVinculado: colaboradorData?.dadosProfissionais?.sindicatoVinculado || '',
      regimeTrabalho: colaboradorData?.dadosProfissionais?.regimeTrabalho || '',
      horarioTrabalho: colaboradorData?.dadosProfissionais?.horarioTrabalho || '',
      cargaHorariaSemanal: colaboradorData?.dadosProfissionais?.cargaHorariaSemanal || '',
      origemContratacao: colaboradorData?.dadosProfissionais?.origemContratacao || ''
    },
    dadosFinanceiros: {
      salarioBase: colaboradorData?.dadosFinanceiros?.salarioBase || '',
      adicionalNivel: colaboradorData?.dadosFinanceiros?.adicionalNivel || '',
      insalubridade: colaboradorData?.dadosFinanceiros?.insalubridade || '',
      sobreaviso: colaboradorData?.dadosFinanceiros?.sobreaviso || '',
      salarioBruto: colaboradorData?.dadosFinanceiros?.salarioBruto || '',
      valorHoraTrabalhada: colaboradorData?.dadosFinanceiros?.valorHoraTrabalhada || '',
      pisoSalarial: colaboradorData?.dadosFinanceiros?.pisoSalarial || '',
      mediaSalarial: colaboradorData?.dadosFinanceiros?.mediaSalarial || '',
      dependentesIR: colaboradorData?.dadosFinanceiros?.dependentesIR || [],
      adiantamentoSalarial: colaboradorData?.dadosFinanceiros?.adiantamentoSalarial || false
    },
    dadosBancarios: {
      banco: colaboradorData?.dadosBancarios?.banco || '',
      tipoConta: colaboradorData?.dadosBancarios?.tipoConta || '',
      agencia: colaboradorData?.dadosBancarios?.agencia || '',
      conta: colaboradorData?.dadosBancarios?.conta || '',
      contaPF_PJ: colaboradorData?.dadosBancarios?.contaPF_PJ || '',
      chavePix: colaboradorData?.dadosBancarios?.chavePix || '',
      bancoSecundario: colaboradorData?.dadosBancarios?.bancoSecundario || '',
      tipoContaSecundario: colaboradorData?.dadosBancarios?.tipoContaSecundario || '',
      agenciaSecundario: colaboradorData?.dadosBancarios?.agenciaSecundario || '',
      contaSecundario: colaboradorData?.dadosBancarios?.contaSecundario || ''
    },
    formacaoEscolaridade: {
      escolaridade: colaboradorData?.formacaoEscolaridade?.escolaridade || '',
      possuiDiploma: colaboradorData?.formacaoEscolaridade?.possuiDiploma || false,
      curriculo: colaboradorData?.formacaoEscolaridade?.curriculo || undefined,
      comprovantesEscolaridade: colaboradorData?.formacaoEscolaridade?.comprovantesEscolaridade || []
    },
    beneficios: {
      tipoPlano: colaboradorData?.beneficios?.tipoPlano || '',
      quantidadeDependentesPlano: colaboradorData?.beneficios?.quantidadeDependentesPlano || '',
      valeTransporte: colaboradorData?.beneficios?.valeTransporte || {
        modalidade: '',
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      valeAlimentacao: colaboradorData?.beneficios?.valeAlimentacao || {
        dataSolicitacaoCartao: '',
        dataPagamento: ''
      },
      planoSaude: colaboradorData?.beneficios?.planoSaude || {
        operadora: '',
        dataSolicitacao: '',
        vigenciaInicio: '',
        tipoPlano: '',
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: {
      cpf: colaboradorData?.documentacao?.cpf || '',
      pis: colaboradorData?.documentacao?.pis || '',
      rg: colaboradorData?.documentacao?.rg || '',
      orgaoExpedidorRg: colaboradorData?.documentacao?.orgaoExpedidorRg || '',
      ufEmissorRg: colaboradorData?.documentacao?.ufEmissorRg || '',
      dataExpedicaoRg: colaboradorData?.documentacao?.dataExpedicaoRg || '',
      anexos: colaboradorData?.documentacao?.anexos || [],
      solicitadoParaDPEm: colaboradorData?.documentacao?.solicitadoParaDPEm || '',
      solicitadoPor: colaboradorData?.documentacao?.solicitadoPor || '',
      motivoContratacao: colaboradorData?.documentacao?.motivoContratacao || '',
      observacoesGerais: colaboradorData?.documentacao?.observacoesGerais || '',
      exameAdmissional: colaboradorData?.documentacao?.exameAdmissional || {
        data: '',
        local: '',
        horario: ''
      }
    },
    dadosTI: colaboradorData?.dadosTI || {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    },
    desligamento: colaboradorData?.desligamento || {
      motivoDesligamento: '',
      dataDesligamento: '',
      processadoPor: '',
      observacoes: '',
      itensDesligamento: []
    },
    username: '',
    password: '',
    confirmPassword: '',
    userType: '',
    isActive: true,
    moduleAccess: [],
    empresasVinculadas: empresaAtual ? [{
      id: empresaAtual.id,
      tipo: 'principal',
      nome: empresaAtual.nome,
      moduleAccess: [],
    }] : []
  });

  const { modulosDisponiveis } = useModulosUsuario({
    empresaPrincipal: empresaAtual,
    empresasVinculadas: formData.empresasVinculadas || [],
    filiais: filiais,
  });

  const handleInputChange = (section: keyof ColaboradorData | string, field: string, value: any) => {
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
          ...prev[section as keyof ColaboradorData],
          [field]: value
        }
      }));
    }
  };

  const handleUserInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModuleAccessChange = (modules: ModuloUsuario[]) => {
    setFormData(prev => ({
      ...prev,
      moduleAccess: modules
    }));
  };

  const handleEmpresasChange = (empresas: EmpresaVinculada[]) => {
    setFormData(prev => ({
      ...prev,
      empresasVinculadas: empresas
    }));
  };

  const handleDesligarColaborador = (motivo: string, data: string) => {
    const dadosDesligamento = {
      motivoDesligamento: motivo,
      dataDesligamento: data,
      processadoPor: 'Administrador',
      observacoes: '',
      itensDesligamento: [
        { id: '1', nome: 'Crachá hospital', necessario: false, dataEntrega: '', entregue: false },
        { id: '2', nome: 'Crachá empresa', necessario: false, dataEntrega: '', entregue: false },
        { id: '3', nome: 'Cartão estacionamento empresa', necessario: false, dataEntrega: '', entregue: false },
        { id: '4', nome: 'Controle de estacionamento empresa', necessario: false, dataEntrega: '', entregue: false },
        { id: '5', nome: 'Jaleco', necessario: false, dataEntrega: '', entregue: false },
        { id: '6', nome: 'EPIs', necessario: false, dataEntrega: '', entregue: false },
        { id: '7', nome: 'Veículo frota', necessario: false, dataEntrega: '', entregue: false },
        { id: '8', nome: 'Cadastro Uber empresas', necessario: false, dataEntrega: '', entregue: false },
        { id: '9', nome: 'Cartão corporativo', necessario: false, dataEntrega: '', entregue: false },
        { id: '10', nome: 'Notebook e acessórios', necessario: false, dataEntrega: '', entregue: false },
      ]
    };

    setFormData(prev => ({
      ...prev,
      desligamento: dadosDesligamento
    }));

    setColaboradorDesligado(true);

    if (colaboradorId) {
      desligarColaborador(colaboradorId);
    }
  };

  const handleRestoreDraft = () => {
    const draftData = loadDraft();
    if (draftData) {
      setFormData(draftData);
    }
  };

  const handleSave = () => {
    console.log('Salvando colaborador:', formData);
    clearDraftOnSave();
    onClose();
  };

  const isFormEmpty = !formData.dadosPessoais.nome && !formData.dadosPessoais.email;

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

  const solicitacoesPendentes = editMode && colaboradorId ? 
    getSolicitacoesByColaborador(colaboradorId).filter(s => s.status === 'pendente').length : 0;

  const totalTabs = editMode ? (colaboradorDesligado ? 12 : 11) : 9;

  const getModalTitle = () => {
    if (context === "usuario") {
      return editMode ? `Editar Usuário - ${formData.dadosPessoais.nome}` : 'Novo Usuário';
    }
    return editMode ? `Editar Colaborador - ${formData.dadosPessoais.nome}` : 'Novo Colaborador';
  };

  const getModalDescription = () => {
    if (context === "usuario") {
      return editMode ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema';
    }
    return editMode ? 'Edite as informações do colaborador' : 'Cadastre um novo colaborador no sistema';
  };

  const getDesligarButtonText = () => {
    return context === "usuario" ? "Desligar Usuário" : "Desligar Colaborador";
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] flex flex-col">
          <DialogHeader className="pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-imuv-cyan/10 rounded-lg">
                  <User className="h-6 w-6 text-imuv-cyan" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-imuv-blue flex items-center gap-2">
                    {getModalTitle()}
                    {colaboradorDesligado && (
                      <Badge variant="destructive" className="ml-2">
                        Desligado
                      </Badge>
                    )}
                  </DialogTitle>
                  <p className="text-gray-600">
                    {getModalDescription()}
                  </p>
                </div>
              </div>
              
              {editMode && !colaboradorDesligado && (
                <Button
                  variant="outline"
                  onClick={() => setIsDesligarModalOpen(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  {getDesligarButtonText()}
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Draft Indicator */}
            {hasDraft && !editMode && (
              <div className="mb-4 px-1">
                <DraftIndicator
                  hasDraft={hasDraft}
                  draftInfo={draftInfo}
                  onRestore={handleRestoreDraft}
                  onDiscard={discardDraft}
                />
              </div>
            )}

            <Tabs defaultValue="usuario" className="h-full flex flex-col">
              <div className="flex-shrink-0 overflow-x-auto pb-2">
                <TabsList className="inline-flex w-max min-w-full h-12 p-1 gap-1">
                  <TabsTrigger value="usuario" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Usuário</span>
                  </TabsTrigger>
                  <TabsTrigger value="controle-sistema" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Controle Sistema</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-pessoais" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Dados Pessoais</span>
                    <span className="sm:hidden">Pessoais</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-profissionais" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Dados Profissionais</span>
                    <span className="sm:hidden">Profissionais</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-financeiros" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Dados Financeiros</span>
                    <span className="sm:hidden">Financeiros</span>
                  </TabsTrigger>
                  <TabsTrigger value="dados-bancarios" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Dados Bancários</span>
                    <span className="sm:hidden">Bancários</span>
                  </TabsTrigger>
                  <TabsTrigger value="formacao-escolaridade" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Formação</span>
                    <span className="sm:hidden">Form.</span>
                  </TabsTrigger>
                  <TabsTrigger value="beneficios" className="px-3 py-2 text-xs whitespace-nowrap">
                    Benefícios
                  </TabsTrigger>
                  <TabsTrigger value="documentacao" className="px-3 py-2 text-xs whitespace-nowrap">
                    <span className="hidden sm:inline">Documentação</span>
                    <span className="sm:hidden">Docs</span>
                  </TabsTrigger>
                  {editMode && (
                    <TabsTrigger value="solicitacoes" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap relative">
                      <Bell className="h-4 w-4" />
                      <span className="hidden sm:inline">Solicitações</span>
                      <span className="sm:hidden">Solic.</span>
                      {solicitacoesPendentes > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                        >
                          {solicitacoesPendentes}
                        </Badge>
                      )}
                    </TabsTrigger>
                  )}
                  {editMode && (
                    <TabsTrigger value="ti" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <Monitor className="h-4 w-4" />
                      <span>TI</span>
                    </TabsTrigger>
                  )}
                  {colaboradorDesligado && (
                    <TabsTrigger value="desligamento" className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="hidden sm:inline">Desligamento</span>
                      <span className="sm:hidden">Deslig.</span>
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto px-1">
                <TabsContent value="usuario" className="mt-0 h-auto">
                  <div className="space-y-6 pb-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 border-b pb-2">
                        Credenciais de Acesso
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário *</label>
                          <input
                            id="username"
                            type="text"
                            value={formData.username || ''}
                            onChange={(e) => handleUserInputChange('username', e.target.value)}
                            placeholder="Digite o nome de usuário"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-biodina-gold focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Tipo de Usuário *</label>
                          <select
                            id="userType"
                            value={formData.userType || ''}
                            onChange={(e) => handleUserInputChange('userType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-biodina-gold focus:border-transparent"
                          >
                            <option value="">Selecione o tipo</option>
                            <option value="admin">Administrador</option>
                            <option value="gerente">Gerente</option>
                            <option value="usuario">Usuário</option>
                            <option value="visitante">Visitante</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha *</label>
                          <input
                            id="password"
                            type="password"
                            value={formData.password || ''}
                            onChange={(e) => handleUserInputChange('password', e.target.value)}
                            placeholder="Digite a senha"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-biodina-gold focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha *</label>
                          <input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword || ''}
                            onChange={(e) => handleUserInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirme a senha"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-biodina-gold focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 border-b pb-2">
                        Status
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          id="isActive"
                          type="checkbox"
                          checked={formData.isActive || false}
                          onChange={(e) => handleUserInputChange('isActive', e.target.checked)}
                          className="h-4 w-4 text-biodina-gold focus:ring-biodina-gold border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Usuário ativo</label>
                        <Badge variant={formData.isActive ? "default" : "secondary"}>
                          {formData.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="controle-sistema" className="mt-0 h-auto">
                  <div className="space-y-6 pb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Permissões e Controles de Sistema</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Configure as permissões de acesso aos módulos do sistema. Você pode aplicar um perfil pré-definido ou configurar as permissões individualmente.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <EmpresasDoUsuario
                        empresaPrincipal={empresaAtual}
                        filiais={filiais}
                        empresasVinculadas={formData.empresasVinculadas || []}
                        onEmpresasChange={handleEmpresasChange}
                      />
                    </div>

                    {formData.empresasVinculadas && formData.empresasVinculadas.length > 1 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Este usuário tem acesso a múltiplas empresas. Os módulos disponíveis são a interseção dos módulos habilitados em todas as empresas vinculadas.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Permissões Detalhadas</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Configure permissões específicas para cada módulo e submódulo
                        </p>
                        <ModuleAccessTree 
                          modules={formData.moduleAccess || []}
                          onModuleChange={handleModuleAccessChange}
                          modulosDisponiveis={modulosDisponiveis as string[]}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dados-pessoais" className="mt-0 h-auto">
                  <div className="pb-6">
                    <DadosPessoaisTab 
                      formData={formData.dadosPessoais}
                      onInputChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="dados-profissionais" className="mt-0 h-auto">
                  <div className="pb-6">
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
                  </div>
                </TabsContent>

                <TabsContent value="dados-financeiros" className="mt-0 h-auto">
                  <div className="pb-6">
                    <DadosFinanceirosTab 
                      formData={dadosFinanceirosWithSuggestion}
                      onInputChange={(field, value) => handleInputChange('dadosFinanceiros', field, value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="dados-bancarios" className="mt-0 h-auto">
                  <div className="pb-6">
                    <DadosBancariosTab 
                      formData={formData.dadosBancarios}
                      onInputChange={(field, value) => handleInputChange('dadosBancarios', field, value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="formacao-escolaridade" className="mt-0 h-auto">
                  <div className="pb-6">
                    <FormacaoEscolaridadeTab 
                      formData={formData.formacaoEscolaridade}
                      onInputChange={(field, value) => handleInputChange('formacaoEscolaridade', field, value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="beneficios" className="mt-0 h-auto">
                  <div className="pb-6">
                    <BeneficiosTab 
                      formData={formData.beneficios}
                      onInputChange={(field, value) => handleInputChange('beneficios', field, value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="documentacao" className="mt-0 h-auto">
                  <div className="pb-6">
                    <DocumentacaoTab 
                      formData={formData.documentacao}
                      onInputChange={(field, value) => handleInputChange('documentacao', field, value)}
                      colaboradorData={formData}
                    />
                  </div>
                </TabsContent>

                {editMode && colaboradorId && (
                  <TabsContent value="solicitacoes" className="mt-0 h-auto">
                    <div className="pb-6">
                      <SolicitacoesTab colaboradorId={colaboradorId} />
                    </div>
                  </TabsContent>
                )}

                {editMode && (
                  <TabsContent value="ti" className="mt-0 h-auto">
                    <div className="pb-6">
                      <TITab 
                        formData={formData.dadosTI!}
                        onInputChange={(field, value) => handleInputChange('dadosTI', field, value)}
                      />
                    </div>
                  </TabsContent>
                )}

                {colaboradorDesligado && formData.desligamento && (
                  <TabsContent value="desligamento" className="mt-0 h-auto">
                    <div className="pb-6">
                      <DesligamentoTab 
                        formData={formData.desligamento}
                        onInputChange={(field, value) => handleInputChange('desligamento', field, value)}
                      />
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
            {!editMode && (
              <DraftSaveButton
                onSaveDraft={() => saveDraft(formData)}
                disabled={isFormEmpty}
              />
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <Save className="h-4 w-4 mr-2" />
              {editMode ? 'Salvar Alterações' : `Salvar ${context === "usuario" ? "Usuário" : "Colaborador"}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DesligarColaboradorModal
        isOpen={isDesligarModalOpen}
        onClose={() => setIsDesligarModalOpen(false)}
        onConfirm={handleDesligarColaborador}
        colaboradorNome={formData.dadosPessoais.nome}
      />
    </>
  );
};

export default ColaboradorModal;
