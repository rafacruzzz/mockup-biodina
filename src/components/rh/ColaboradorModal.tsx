import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, User, Bell, UserMinus, AlertTriangle, Monitor, Shield } from "lucide-react";
import { ColaboradorData } from "@/types/colaborador";
import { ModuleAccess } from "@/types/permissions";
import { getSolicitacoesByColaborador } from "@/data/solicitacoes";
import { useColaboradores } from "@/hooks/useColaboradores";
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
import AccessProfileSelector from "../cadastro/AccessProfileSelector";
import ModuleAccessTree from "../cadastro/ModuleAccessTree";

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
  colaboradorId?: string;
  editMode?: boolean;
  colaboradorData?: ColaboradorData;
}

const ColaboradorModal = ({ 
  isOpen, 
  onClose, 
  colaboradorId, 
  editMode = false,
  colaboradorData 
}: ColaboradorModalProps) => {
  const { desligarColaborador } = useColaboradores();
  const [isDesligarModalOpen, setIsDesligarModalOpen] = useState(false);
  const [colaboradorDesligado, setColaboradorDesligado] = useState(!!colaboradorData?.desligamento);
  
  const [formData, setFormData] = useState<ColaboradorData & {
    planoCarreira?: string;
    sugestaoSalario?: string;
    breakdownSalarial?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
    isActive?: boolean;
    moduleAccess?: ModuleAccess[];
  }>({
    dadosPessoais: {
      nome: colaboradorData?.dadosPessoais?.nome || '',
      cpf: colaboradorData?.dadosPessoais?.cpf || '',
      pis: colaboradorData?.dadosPessoais?.pis || '',
      idade: colaboradorData?.dadosPessoais?.idade || '',
      dataNascimento: colaboradorData?.dadosPessoais?.dataNascimento || '',
      estadoCivil: colaboradorData?.dadosPessoais?.estadoCivil || '',
      nacionalidade: colaboradorData?.dadosPessoais?.nacionalidade || '',
      genero: colaboradorData?.dadosPessoais?.genero || '',
      etnia: colaboradorData?.dadosPessoais?.etnia || '',
      rg: colaboradorData?.dadosPessoais?.rg || '',
      orgaoExpedidorRg: colaboradorData?.dadosPessoais?.orgaoExpedidorRg || '',
      ufEmissorRg: colaboradorData?.dadosPessoais?.ufEmissorRg || '',
      dataExpedicaoRg: colaboradorData?.dadosPessoais?.dataExpedicaoRg || '',
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
      conta: colaboradorData?.dadosBancarios?.conta || ''
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
    moduleAccess: []
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

  const handleModuleAccessChange = (modules: ModuleAccess[]) => {
    setFormData(prev => ({
      ...prev,
      moduleAccess: modules
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

  const handleSave = () => {
    console.log('Salvando colaborador:', formData);
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

  const solicitacoesPendentes = editMode && colaboradorId ? 
    getSolicitacoesByColaborador(colaboradorId).filter(s => s.status === 'pendente').length : 0;

  const totalTabs = editMode ? (colaboradorDesligado ? 12 : 11) : 9;

  const getTabsGridClass = (totalTabs: number) => {
    switch (totalTabs) {
      case 9: return 'grid grid-cols-9';
      case 10: return 'grid grid-cols-10';
      case 11: return 'grid grid-cols-11';
      case 12: return 'grid grid-cols-12';
      default: return 'grid grid-cols-9';
    }
  };

  return (
    <>
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
                    {editMode ? `Editar Colaborador - ${formData.dadosPessoais.nome}` : 'Novo Colaborador'}
                    {colaboradorDesligado && (
                      <Badge variant="destructive" className="ml-2">
                        Desligado
                      </Badge>
                    )}
                  </DialogTitle>
                  <p className="text-gray-600">
                    {editMode ? 'Edite as informações do colaborador' : 'Cadastre um novo colaborador no sistema'}
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
                  Desligar Colaborador
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="usuario" className="h-full flex flex-col">
              <TabsList className={`${getTabsGridClass(totalTabs)} w-full mb-4`}>
                <TabsTrigger value="usuario" className="text-xs">
                  <User className="h-4 w-4 mr-1" />
                  Usuário
                </TabsTrigger>
                <TabsTrigger value="controle-sistema" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Controle Sistema
                </TabsTrigger>
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
                {editMode && (
                  <TabsTrigger value="solicitacoes" className="text-xs relative">
                    <Bell className="h-4 w-4 mr-1" />
                    Solicitações
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
                  <TabsTrigger value="ti" className="text-xs">
                    <Monitor className="h-4 w-4 mr-1" />
                    TI
                  </TabsTrigger>
                )}
                {colaboradorDesligado && (
                  <TabsTrigger value="desligamento" className="text-xs">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Desligamento
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="flex-1 overflow-y-auto px-1">
                <TabsContent value="usuario" className="mt-0">
                  <div className="space-y-6 pb-4">
                    {/* Credenciais de Acesso */}
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

                    {/* Status */}
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

                <TabsContent value="controle-sistema" className="mt-0">
                  <div className="space-y-6 pb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Permissões e Controles de Sistema</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Configure as permissões de acesso aos módulos do sistema. Você pode aplicar um perfil pré-definido ou configurar as permissões individualmente.
                      </p>
                    </div>

                    {/* Seletor de Perfil */}
                    <div className="space-y-4">
                      <AccessProfileSelector onProfileSelect={handleModuleAccessChange} />
                    </div>

                    {/* Árvore de Permissões */}
                    <div className="space-y-4">
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-gray-900 mb-4">Permissões Detalhadas</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Configure permissões específicas para cada módulo e funcionalidade
                        </p>
                        <ModuleAccessTree 
                          modules={formData.moduleAccess || []}
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

                {editMode && colaboradorId && (
                  <TabsContent value="solicitacoes" className="mt-0">
                    <SolicitacoesTab colaboradorId={colaboradorId} />
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

                {colaboradorDesligado && formData.desligamento && (
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
              {editMode ? 'Salvar Alterações' : 'Salvar Colaborador'}
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
