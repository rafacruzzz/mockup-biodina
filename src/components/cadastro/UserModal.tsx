
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { UserData } from "@/types/user";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserData;
  onSave: (data: UserData) => void;
}

const UserModal = ({ isOpen, onClose, userData, onSave }: UserModalProps) => {
  const { toast } = useToast();
  
  // Initialize form data with proper defaults
  const [formData, setFormData] = useState<UserData>(() => {
    if (userData) {
      return userData;
    }
    
    // Default initialization for new user
    return {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      status: 'Novo',
      dadosPessoais: {
        nome: '',
        cpf: '',
        pis: '',
        idade: '',
        dataNascimento: '',
        estadoCivil: '',
        nacionalidade: 'brasileira',
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
        pcd: 'nao',
        doencaPreExistente: 'nao',
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
      documentacao: { anexos: [] },
      dadosTI: {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: '',
        ramal: ''
      },
      credentials: {
        isActive: false,
        userType: 'usuario',
        moduleAccess: []
      }
    };
  });

  const [activeTab, setActiveTab] = useState<string>('dados-pessoais');

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: keyof UserData, field: string, value: any) => {
    setFormData(prev => {
      const currentSection = prev[section];
      if (typeof currentSection === 'object' && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleSave = () => {
    if (formData.nome && formData.email && formData.telefone) {
      onSave(formData);
      onClose();
      toast({
        title: "Dados salvos com sucesso!",
        description: `${formData.nome} foi atualizado no sistema.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dados-pessoais':
        return (
          <DadosPessoaisTab
            formData={formData.dadosPessoais}
            onInputChange={(field, value) => handleNestedInputChange('dadosPessoais', field, value)}
          />
        );
      case 'dados-profissionais':
        return (
          <DadosProfissionaisTab
            formData={formData.dadosProfissionais}
            onInputChange={(field, value) => handleNestedInputChange('dadosProfissionais', field, value)}
          />
        );
      case 'dados-financeiros':
        return (
          <DadosFinanceirosTab
            formData={formData.dadosFinanceiros}
            onInputChange={(field, value) => handleNestedInputChange('dadosFinanceiros', field, value)}
          />
        );
      case 'dados-bancarios':
        return (
          <DadosBancariosTab
            formData={formData.dadosBancarios}
            onInputChange={(field, value) => handleNestedInputChange('dadosBancarios', field, value)}
          />
        );
      case 'formacao':
        return (
          <FormacaoEscolaridadeTab
            formData={formData.formacaoEscolaridade}
            onInputChange={(field, value) => handleNestedInputChange('formacaoEscolaridade', field, value)}
          />
        );
      case 'beneficios':
        return (
          <BeneficiosTab
            formData={formData.beneficios}
            onInputChange={(field, value) => handleNestedInputChange('beneficios', field, value)}
          />
        );
      case 'documentacao':
        return (
          <DocumentacaoTab
            formData={formData.documentacao}
            onInputChange={(field, value) => handleNestedInputChange('documentacao', field, value)}
          />
        );
      case 'solicitacoes':
        return userData ? (
          <SolicitacoesTab colaboradorId={userData.id} />
        ) : null;
      case 'ti':
        return (
          <TITab
            formData={formData.dadosTI}
            onInputChange={(field, value) => handleNestedInputChange('dadosTI', field, value)}
          />
        );
      case 'credenciais':
        return (
          <UserCredentialsTab
            formData={formData.credentials || { isActive: false, userType: 'usuario', moduleAccess: [] }}
            onInputChange={(field, value) => handleNestedInputChange('credentials', field, value)}
          />
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'dados-pessoais', label: 'Dados Pessoais' },
    { id: 'dados-profissionais', label: 'Dados Profissionais' },
    { id: 'dados-financeiros', label: 'Dados Financeiros' },
    { id: 'dados-bancarios', label: 'Dados Bancários' },
    { id: 'formacao', label: 'Formação' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'documentacao', label: 'Documentação' },
    { id: 'solicitacoes', label: 'Solicitações' },
    { id: 'ti', label: 'TI' },
    { id: 'credenciais', label: 'Credenciais' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{userData ? 'Editar Cadastro' : 'Novo Cadastro'}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Renderiza o conteúdo da aba ativa */}
          <TabsContent value={activeTab}>
            {renderTabContent()}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
