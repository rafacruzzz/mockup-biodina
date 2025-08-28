
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
  const { addUser, updateUser } = useUsers();
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
      nomeCompleto: "",
      cpf: "",
      rg: "",
      orgaoExpedidor: "",
      estadoCivil: "",
      dataNascimento: "",
      naturalidade: "",
      nacionalidade: "Brasileira",
      nomePai: "",
      nomeMae: "",
      telefone: "",
      celular: "",
      email: "",
      endereco: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "Brasil"
      }
    },
    dadosProfissionais: user?.dadosProfissionais || {
      matricula: "",
      dataAdmissao: "",
      cargo: "",
      departamento: "",
      centroCusto: "",
      nivelHierarquico: "",
      supervisor: "",
      tipoContrato: "",
      regimeContratacao: "",
      jornadaTrabalho: "",
      localTrabalho: "",
      observacoes: ""
    },
    dadosFinanceiros: user?.dadosFinanceiros || {
      salarioBase: 0,
      vale: 0,
      auxilioAlimentacao: 0,
      auxilioTransporte: 0,
      auxilioSaude: 0,
      auxilioEducacao: 0,
      outrosBeneficios: 0,
      descontos: {
        inss: 0,
        irrf: 0,
        valeTransporte: 0,
        planoSaude: 0,
        outros: 0
      },
      salarioLiquido: 0
    },
    dadosBancarios: user?.dadosBancarios || {
      banco: "",
      agencia: "",
      conta: "",
      tipoConta: "",
      operacao: "",
      pix: ""
    },
    formacaoEscolaridade: user?.formacaoEscolaridade || {
      escolaridade: "",
      instituicao: "",
      curso: "",
      anoInicio: "",
      anoFormatura: "",
      situacao: "",
      cursos: [],
      certificacoes: []
    },
    beneficios: user?.beneficios || {
      valeTransporte: false,
      valeRefeicao: false,
      valeAlimentacao: false,
      auxilioSaude: false,
      auxilioEducacao: false,
      seguroVida: false,
      previdenciaPrivada: false,
      outros: []
    },
    documentacao: user?.documentacao || {
      cpf: "",
      rg: "",
      ctps: "",
      pis: "",
      tituloEleitor: "",
      certificadoMilitar: "",
      cnh: "",
      passaporte: "",
      outros: []
    },
    dadosTI: user?.dadosTI || {
      email: "",
      usuario: "",
      grupos: [],
      permissoes: [],
      sistemas: []
    },
    desligamento: user?.desligamento || {
      dataDesligamento: "",
      motivoDesligamento: "",
      observacoes: "",
      entregaEquipamentos: false,
      entregaCracha: false,
      entregaDocumentos: false
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
      if (!formData.dadosPessoais.nomeCompleto) {
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
        nome: formData.dadosPessoais.nomeCompleto,
        email: formData.dadosPessoais.email,
        cpf: formData.dadosPessoais.cpf,
        telefone: formData.dadosPessoais.telefone
      };

      if (user) {
        updateUser(updatedFormData);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        addUser(updatedFormData);
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
                data={formData.dadosPessoais}
                onChange={(field, value) => handleFieldChange('dadosPessoais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab
                data={formData.dadosProfissionais}
                onChange={(field, value) => handleFieldChange('dadosProfissionais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab
                data={formData.dadosFinanceiros}
                onChange={(field, value) => handleFieldChange('dadosFinanceiros', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab
                data={formData.dadosBancarios}
                onChange={(field, value) => handleFieldChange('dadosBancarios', field, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab
                data={formData.formacaoEscolaridade}
                onChange={(field, value) => handleFieldChange('formacaoEscolaridade', field, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab
                data={formData.beneficios}
                onChange={(field, value) => handleFieldChange('beneficios', field, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab
                data={formData.documentacao}
                onChange={(field, value) => handleFieldChange('documentacao', field, value)}
              />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab
                data={formData.dadosTI}
                onChange={(field, value) => handleFieldChange('dadosTI', field, value)}
              />
            </TabsContent>

            <TabsContent value="credenciais" className="mt-0">
              <CredenciaisTab
                data={{
                  username: formData.username || "",
                  password: formData.password || "",
                  confirmPassword: formData.confirmPassword || "",
                  isActive: formData.isActive,
                  userType: formData.userType,
                  moduleAccess: formData.moduleAccess
                }}
                onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
              />
            </TabsContent>

            <TabsContent value="desligamento" className="mt-0">
              <DesligamentoTab
                data={formData.desligamento}
                onChange={(field, value) => handleFieldChange('desligamento', field, value)}
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
