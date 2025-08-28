import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DadosPessoaisTab } from "@/components/rh/tabs/DadosPessoaisTab";
import { DadosProfissionaisTab } from "@/components/rh/tabs/DadosProfissionaisTab";
import { DadosFinanceirosTab } from "@/components/rh/tabs/DadosFinanceirosTab";
import { DadosBancariosTab } from "@/components/rh/tabs/DadosBancariosTab";
import { FormacaoEscolaridadeTab } from "@/components/rh/tabs/FormacaoEscolaridadeTab";
import { BeneficiosTab } from "@/components/rh/tabs/BeneficiosTab";
import { DocumentacaoTab } from "@/components/rh/tabs/DocumentacaoTab";
import { SolicitacoesTab } from "@/components/rh/tabs/SolicitacoesTab";
import { TITab } from "@/components/rh/tabs/TITab";
import { useUsers } from '@/hooks/useUsers';
import { UserData } from '@/types/user';

interface AdmissaoProps {
  isOpen: boolean;
  onClose: () => void;
  candidatoSelecionado?: any;
}

const Admissao = ({ isOpen, onClose, candidatoSelecionado }: AdmissaoProps) => {
  const { adicionarUser } = useUsers();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dados-pessoais");

  const [userData, setUserData] = useState<Omit<UserData, 'id'>>({
    status: 'Novo',
    credentials: {
      username: '',
      password: '',
      confirmPassword: '',
      isActive: true,
      userType: 'usuario'
    },
    moduleAccess: [],
    dadosPessoais: {
      nome: candidatoSelecionado?.nome || '',
      cpf: candidatoSelecionado?.cpf || '',
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
      pcd: 'nao-informado',
      doencaPreExistente: 'nao-informado',
      email: candidatoSelecionado?.email || '',
      telefone: candidatoSelecionado?.telefone || '',
      observacoes: ''
    },
    dadosProfissionais: {
      empresa: '',
      uf: '',
      setor: '',
      funcao: '',
      cargo: candidatoSelecionado?.cargo || '',
      nivel: '',
      cbo: '',
      compativelFuncao: false,
      funcoesDesempenhadas: '',
      dataAdmissao: '',
      dataCadastro: '',
      tempoCasa: '',
      ultimaPromocao: '',
      previsaoFerias: '',
      tipoUsuario: 'funcionario',
      regimeTrabalho: 'presencial',
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
    documentacao: {
      anexos: []
    },
    dadosTI: {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    }
  });

  const handleInputChange = (section: keyof UserData, field: string, value: any) => {
    if (section === 'credentials' || section === 'moduleAccess') {
      setUserData(prev => ({
        ...prev,
        [section]: section === 'moduleAccess' ? value : { ...prev[section], [field]: value }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const handleSave = () => {
    // Create user with complete data structure
    const novoUser = {
      ...userData,
      // Auto-generate username from nome if not provided
      credentials: {
        ...userData.credentials,
        username: userData.credentials.username || 
          userData.dadosPessoais.nome.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '')
      }
    };

    adicionarUser(novoUser);
    
    toast({
      title: "Usuário criado com sucesso!",
      description: `${userData.dadosPessoais.nome} foi adicionado ao sistema.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <UserPlus className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                Admissão de Novo Usuário
              </DialogTitle>
              <p className="text-gray-600">
                Complete os dados do candidato aprovado para criar o usuário no sistema
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-9 mb-4 h-auto p-1">
              <TabsTrigger value="dados-pessoais" className="text-xs p-2">
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais" className="text-xs p-2">
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="text-xs p-2">
                Dados Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios" className="text-xs p-2">
                Dados Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao" className="text-xs p-2">
                Formação
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="text-xs p-2">
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao" className="text-xs p-2">
                Documentação
              </TabsTrigger>
              <TabsTrigger value="solicitacoes" className="text-xs p-2">
                Solicitações
              </TabsTrigger>
              <TabsTrigger value="ti" className="text-xs p-2">
                TI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-pessoais" className="mt-0">
              <DadosPessoaisTab
                formData={userData.dadosPessoais}
                onInputChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab
                formData={userData.dadosProfissionais}
                onInputChange={(field, value) => handleInputChange('dadosProfissionais', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab
                formData={userData.dadosFinanceiros}
                onInputChange={(field, value) => handleInputChange('dadosFinanceiros', field, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab
                formData={userData.dadosBancarios}
                onInputChange={(field, value) => handleInputChange('dadosBancarios', field, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab
                formData={userData.formacaoEscolaridade}
                onInputChange={(field, value) => handleInputChange('formacaoEscolaridade', field, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab
                formData={userData.beneficios}
                onInputChange={(field, value) => handleInputChange('beneficios', field, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab
                formData={userData.documentacao}
                onInputChange={(field, value) => handleInputChange('documentacao', field, value)}
              />
            </TabsContent>

            <TabsContent value="solicitacoes" className="mt-0">
              <SolicitacoesTab colaboradorId={""} />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab
                formData={userData.dadosTI}
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
            Criar Usuário
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Admissao;
