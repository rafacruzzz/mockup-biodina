import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, User, Bell, UserMinus, AlertTriangle } from "lucide-react";
import { ColaboradorData } from "@/types/colaborador";
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
      possuiDiploma: colaboradorData?.formacaoEscolaridade?.possuiDiploma || false
    },
    beneficios: {
      tipoPlano: colaboradorData?.beneficios?.tipoPlano || '',
      quantidadeDependentesPlano: colaboradorData?.beneficios?.quantidadeDependentesPlano || ''
    },
    documentacao: {
      anexos: colaboradorData?.documentacao?.anexos || []
    },
    desligamento: colaboradorData?.desligamento || {
      motivoDesligamento: '',
      dataDesligamento: '',
      processadoPor: '',
      observacoes: '',
      itensDesligamento: []
    }
  });

  const handleInputChange = (section: keyof ColaboradorData | string, field: string, value: any) => {
    if (section === 'planoCarreira' || section === 'sugestaoSalario' || section === 'breakdownSalarial') {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
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

  const handleDesligarColaborador = (motivo: string, data: string) => {
    const dadosDesligamento = {
      motivoDesligamento: motivo,
      dataDesligamento: data,
      processadoPor: 'Administrador', // Pode ser obtido do contexto de usuário
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

  const totalTabs = editMode ? (colaboradorDesligado ? 9 : 8) : 7;

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
            <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
              <TabsList className={`grid w-full grid-cols-${totalTabs} mb-4`}>
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
                {colaboradorDesligado && (
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
                  />
                </TabsContent>

                {editMode && colaboradorId && (
                  <TabsContent value="solicitacoes" className="mt-0">
                    <SolicitacoesTab colaboradorId={colaboradorId} />
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
