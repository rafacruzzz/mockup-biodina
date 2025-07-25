
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, User, Bell } from "lucide-react";
import { ColaboradorData } from "@/types/colaborador";
import { getSolicitacoesByColaborador } from "@/data/solicitacoes";
import DadosPessoaisTab from "./tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "./tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "./tabs/DadosFinanceirosTab";
import DadosBancariosTab from "./tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "./tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "./tabs/BeneficiosTab";
import DocumentacaoTab from "./tabs/DocumentacaoTab";
import SolicitacoesTab from "./tabs/SolicitacoesTab";

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
      genero: colaboradorData?.dadosPessoais?.genero || '',
      etnia: colaboradorData?.dadosPessoais?.etnia || '',
      rg: colaboradorData?.dadosPessoais?.rg || '',
      orgaoExpedidorRg: colaboradorData?.dadosPessoais?.orgaoExpedidorRg || '',
      ufEmissorRg: colaboradorData?.dadosPessoais?.ufEmissorRg || '',
      dataExpedicaoRg: colaboradorData?.dadosPessoais?.dataExpedicaoRg || '',
      naturalidade: colaboradorData?.dadosPessoais?.naturalidade || '',
      nomeMae: colaboradorData?.dadosPessoais?.nomeMae || '',
      nomePai: colaboradorData?.dadosPessoais?.nomePai || '',
      cid: colaboradorData?.dadosPessoais?.cid || '',
      email: colaboradorData?.dadosPessoais?.email || '',
      telefone: colaboradorData?.dadosPessoais?.telefone || '',
      endereco: colaboradorData?.dadosPessoais?.endereco || '',
      bairro: colaboradorData?.dadosPessoais?.bairro || '',
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
      previsaoFerias: colaboradorData?.dadosProfissionais?.previsaoFerias || ''
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
      dependentesIR: colaboradorData?.dadosFinanceiros?.dependentesIR || ''
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

  // Contar solicitações pendentes para o colaborador
  const solicitacoesPendentes = editMode && colaboradorId ? 
    getSolicitacoesByColaborador(colaboradorId).filter(s => s.status === 'pendente').length : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <User className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                {editMode ? `Editar Colaborador - ${formData.dadosPessoais.nome}` : 'Novo Colaborador'}
              </DialogTitle>
              <p className="text-gray-600">
                {editMode ? 'Edite as informações do colaborador' : 'Cadastre um novo colaborador no sistema'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className={`grid w-full ${editMode ? 'grid-cols-8' : 'grid-cols-7'} mb-4`}>
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
            </TabsList>

            <div className="flex-1 overflow-y-auto">
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
  );
};

export default ColaboradorModal;
