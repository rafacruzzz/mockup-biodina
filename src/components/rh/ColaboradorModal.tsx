
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Save, User } from "lucide-react";
import { ColaboradorData } from "@/types/colaborador";
import DadosPessoaisTab from "./tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "./tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "./tabs/DadosFinanceirosTab";
import DadosBancariosTab from "./tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "./tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "./tabs/BeneficiosTab";

interface ColaboradorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ColaboradorModal = ({ isOpen, onClose }: ColaboradorModalProps) => {
  const [formData, setFormData] = useState<ColaboradorData>({
    dadosPessoais: {
      nome: '',
      cpf: '',
      pis: '',
      idade: '',
      dataNascimento: '',
      sexo: '',
      genero: '',
      etnia: '',
      rg: '',
      orgaoExpedidorRg: '',
      ufEmissorRg: '',
      dataExpedicaoRg: '',
      naturalidade: '',
      nomeMae: '',
      nomePai: '',
      cid: '',
      email: '',
      telefone: '',
      endereco: '',
      bairro: '',
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
      previsaoFerias: ''
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
      dependentesIR: ''
    },
    dadosBancarios: {
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    },
    formacaoEscolaridade: {
      escolaridade: '',
      possuiDiploma: false
    },
    beneficios: {
      tipoPlano: '',
      quantidadeDependentesPlano: ''
    }
  });

  const handleInputChange = (section: keyof ColaboradorData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Salvando colaborador:', formData);
    onClose();
  };

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
                Novo Colaborador
              </DialogTitle>
              <p className="text-gray-600">Cadastre um novo colaborador no sistema</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-6 mb-4">
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
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Salvar Colaborador
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ColaboradorModal;
