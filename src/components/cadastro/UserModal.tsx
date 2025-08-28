
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, X, User } from "lucide-react";
import { toast } from "sonner";
import { UserData } from "@/types/user";
import { useUsers } from "@/hooks/useUsers";

// Import all tab components
import DadosPessoaisTab from "@/components/rh/tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "@/components/rh/tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "@/components/rh/tabs/DadosFinanceirosTab";
import DadosBancariosTab from "@/components/rh/tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "@/components/rh/tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "@/components/rh/tabs/BeneficiosTab";
import DocumentacaoTab from "@/components/rh/tabs/DocumentacaoTab";
import TITab from "@/components/rh/tabs/TITab";
import DesligamentoTab from "@/components/rh/tabs/DesligamentoTab";
import CredenciaisTab from "@/components/cadastro/CredenciaisTab";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
}

const UserModal = ({ isOpen, onClose, user }: UserModalProps) => {
  const { adicionarUser, atualizarUser } = useUsers();
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [formData, setFormData] = useState<UserData>({
    id: user?.id || crypto.randomUUID(),
    nome: user?.nome || "",
    email: user?.email || "",
    cpf: user?.cpf || "",
    telefone: user?.telefone || "",
    username: user?.username || "",
    password: user?.password || "",
    confirmPassword: user?.confirmPassword || "",
    isActive: user?.isActive ?? true,
    userType: user?.userType || "colaborador",
    status: user?.status || "Novo",
    moduleAccess: user?.moduleAccess || [],
    
    // Initialize all collaborator data sections
    dadosPessoais: user?.dadosPessoais || {
      nome: "",
      cpf: "",
      pis: "",
      idade: "",
      dataNascimento: "",
      estadoCivil: "",
      nacionalidade: "Brasileira",
      genero: "",
      etnia: "",
      rg: "",
      orgaoExpedidorRg: "",
      ufEmissorRg: "",
      dataExpedicaoRg: "",
      naturalidade: "",
      nomeMae: "",
      nomePai: "",
      cep: "",
      endereco: "",
      numeroResidencia: "",
      complemento: "",
      bairro: "",
      pcd: "",
      doencaPreExistente: "",
      email: "",
      telefone: "",
      observacoes: ""
    },
    dadosProfissionais: user?.dadosProfissionais || {
      empresa: "",
      uf: "",
      setor: "",
      funcao: "",
      cargo: "",
      nivel: "",
      cbo: "",
      compativelFuncao: false,
      funcoesDesempenhadas: "",
      dataAdmissao: "",
      dataCadastro: "",
      tempoCasa: "",
      ultimaPromocao: "",
      previsaoFerias: "",
      tipoUsuario: "",
      sindicatoVinculado: "",
      regimeTrabalho: "",
      horarioTrabalho: "",
      cargaHorariaSemanal: "",
      origemContratacao: ""
    },
    dadosFinanceiros: user?.dadosFinanceiros || {
      salarioBase: "",
      adicionalNivel: "",
      insalubridade: "",
      sobreaviso: "",
      salarioBruto: "",
      valorHoraTrabalhada: "",
      pisoSalarial: "",
      mediaSalarial: "",
      dependentesIR: [],
      adiantamentoSalarial: false
    },
    dadosBancarios: user?.dadosBancarios || {
      banco: "",
      tipoConta: "",
      agencia: "",
      conta: ""
    },
    formacaoEscolaridade: user?.formacaoEscolaridade || {
      escolaridade: "",
      possuiDiploma: false,
      comprovantesEscolaridade: []
    },
    beneficios: user?.beneficios || {
      tipoPlano: "",
      quantidadeDependentesPlano: "",
      valeTransporte: {
        modalidade: "",
        dataSolicitacaoCartao: "",
        dataPagamento: ""
      },
      valeAlimentacao: {
        dataSolicitacaoCartao: "",
        dataPagamento: ""
      },
      planoSaude: {
        operadora: "",
        dataSolicitacao: "",
        vigenciaInicio: "",
        tipoPlano: "",
        possuiDependentes: false,
        dependentes: []
      }
    },
    documentacao: user?.documentacao || {
      anexos: [],
      solicitadoParaDPEm: "",
      solicitadoPor: "",
      motivoContratacao: "",
      observacoesGerais: "",
      exameAdmissional: {
        data: "",
        local: "",
        horario: ""
      }
    },
    dadosTI: user?.dadosTI || {
      servidorAcesso: "",
      permissoesNecessarias: "",
      restricoes: "",
      pastasAcesso: "",
      emailCorporativo: "",
      ramal: ""
    },
    desligamento: user?.desligamento || {
      motivoDesligamento: "",
      dataDesligamento: "",
      processadoPor: "",
      observacoes: "",
      itensDesligamento: []
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleSave = () => {
    try {
      // Basic validation
      if (!formData.dadosPessoais.nome) {
        toast.error("Nome completo é obrigatório");
        setActiveTab("dados-pessoais");
        return;
      }

      if (!formData.dadosPessoais.cpf) {
        toast.error("CPF é obrigatório");
        setActiveTab("dados-pessoais");
        return;
      }

      // Update basic fields from personal data
      const updatedFormData = {
        ...formData,
        nome: formData.dadosPessoais.nome,
        email: formData.dadosPessoais.email,
        cpf: formData.dadosPessoais.cpf,
        telefone: formData.dadosPessoais.telefone
      };

      if (user) {
        atualizarUser(updatedFormData.id, updatedFormData);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        adicionarUser(updatedFormData);
        toast.success("Usuário cadastrado com sucesso!");
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast.error("Erro ao salvar usuário");
    }
  };

  const handleFieldChange = (section: keyof UserData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: "dados-pessoais", label: "Dados Pessoais", icon: User },
    { id: "dados-profissionais", label: "Dados Profissionais", icon: User },
    { id: "dados-financeiros", label: "Dados Financeiros", icon: User },
    { id: "dados-bancarios", label: "Dados Bancários", icon: User },
    { id: "formacao", label: "Formação", icon: User },
    { id: "beneficios", label: "Benefícios", icon: User },
    { id: "documentacao", label: "Documentação", icon: User },
    { id: "ti", label: "TI", icon: User },
    { id: "credenciais", label: "Credenciais e Sistema", icon: User },
    { id: "desligamento", label: "Desligamento", icon: User }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-blue/10 rounded-lg">
              <User className="h-6 w-6 text-biodina-blue" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                {user ? "Editar Usuário" : "Novo Usuário"}
              </DialogTitle>
              <p className="text-gray-600">
                {user ? "Atualize as informações do usuário" : "Cadastre um novo usuário no sistema"}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full justify-start overflow-x-auto flex-shrink-0">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="whitespace-nowrap">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="dados-pessoais" className="mt-0">
              <DadosPessoaisTab
                formData={formData.dadosPessoais}
                onInputChange={(field, value) => handleFieldChange('dadosPessoais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab
                formData={formData.dadosProfissionais}
                onInputChange={(field, value) => handleFieldChange('dadosProfissionais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab
                formData={formData.dadosFinanceiros}
                onInputChange={(field, value) => handleFieldChange('dadosFinanceiros', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab
                formData={formData.dadosBancarios}
                onInputChange={(field, value) => handleFieldChange('dadosBancarios', field, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab
                formData={formData.formacaoEscolaridade}
                onInputChange={(field, value) => handleFieldChange('formacaoEscolaridade', field, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab
                formData={formData.beneficios}
                onInputChange={(field, value) => handleFieldChange('beneficios', field, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab
                formData={formData.documentacao}
                onInputChange={(field, value) => handleFieldChange('documentacao', field, value)}
                colaboradorData={formData}
              />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab
                formData={formData.dadosTI}
                onInputChange={(field, value) => handleFieldChange('dadosTI', field, value)}
              />
            </TabsContent>

            <TabsContent value="credenciais" className="mt-0">
              <CredenciaisTab
                formData={formData}
                onInputChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
                onModuleAccessChange={(modules) => setFormData(prev => ({ ...prev, moduleAccess: modules }))}
              />
            </TabsContent>

            <TabsContent value="desligamento" className="mt-0">
              <DesligamentoTab
                formData={formData.desligamento}
                onInputChange={(field, value) => handleFieldChange('desligamento', field, value)}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            {user ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
