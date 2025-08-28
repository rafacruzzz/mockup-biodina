import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI } from "@/types/colaborador";
import DadosPessoaisTab from "./tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "./tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "./tabs/DadosFinanceirosTab";
import DadosBancariosTab from "./tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "./tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "./tabs/BeneficiosTab";
import DocumentacaoTab from "./tabs/DocumentacaoTab";
import TITab from "./tabs/TITab";
import { useUsers } from '@/hooks/useUsers';

interface AdmissaoProps {
  isOpen: boolean;
  onClose: () => void;
}

const Admissao = ({ isOpen, onClose }: AdmissaoProps) => {
  const { toast } = useToast();
  const { adicionarUser } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [anexosCandidato, setAnexosCandidato] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("dados-pessoais");
  const [formData, setFormData] = useState({
    dadosPessoais: {
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
    } as DadosPessoais,
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
    } as DadosProfissionais,
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
    } as DadosFinanceiros,
    dadosBancarios: {
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    } as DadosBancarios,
    formacaoEscolaridade: {
      escolaridade: '',
      possuiDiploma: false,
      comprovantesEscolaridade: []
    } as FormacaoEscolaridade,
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
    } as Beneficios,
    documentacao: {
      anexos: []
    } as Documentacao,
    dadosTI: {
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    } as DadosTI
  });

  useEffect(() => {
    // Simulação de dados preenchidos automaticamente
    setFormData(prev => ({
      ...prev,
      dadosProfissionais: {
        ...prev.dadosProfissionais,
        dataCadastro: new Date().toISOString().split('T')[0],
        tempoCasa: '0 meses'
      }
    }));
  }, []);

  const handleCadastrarColaborador = async () => {
    try {
      setIsLoading(true);
      
      // Create complete user data from form
      const novoUserData = {
        dadosPessoais: formData.dadosPessoais,
        dadosProfissionais: formData.dadosProfissionais,
        dadosFinanceiros: formData.dadosFinanceiros,
        dadosBancarios: formData.dadosBancarios,
        formacaoEscolaridade: formData.formacaoEscolaridade,
        beneficios: formData.beneficios,
        documentacao: {
          ...formData.documentacao,
          anexos: anexosCandidato
        },
        dadosTI: formData.dadosTI
      };

      // Use adicionarUser instead of adicionarColaborador
      const novoUser = adicionarUser(novoUserData);

      toast({
        title: "Usuário cadastrado com sucesso!",
        description: `${novoUser.nome} foi adicionado ao sistema. Acesse Cadastro > Usuários para configurar permissões.`,
      });

      // Reset form
      setFormData({
        dadosPessoais: {
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
        } as DadosPessoais,
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
        } as DadosProfissionais,
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
        } as DadosFinanceiros,
        dadosBancarios: {
          banco: '',
          tipoConta: '',
          agencia: '',
          conta: ''
        } as DadosBancarios,
        formacaoEscolaridade: {
          escolaridade: '',
          possuiDiploma: false,
          comprovantesEscolaridade: []
        } as FormacaoEscolaridade,
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
        } as Beneficios,
        documentacao: {
          anexos: []
        } as Documentacao,
        dadosTI: {
          servidorAcesso: '',
          permissoesNecessarias: '',
          restricoes: '',
          pastasAcesso: '',
          emailCorporativo: '',
          ramal: ''
        } as DadosTI
      });
      
      onClose();
      
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (tab: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <UserCheck className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                Admissão de Colaborador
              </DialogTitle>
              <p className="text-gray-600">
                Preencha os dados do novo colaborador para efetivar a admissão
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="dados-pessoais" onClick={() => setActiveTab("dados-pessoais")}>
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais" onClick={() => setActiveTab("dados-profissionais")}>
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros" onClick={() => setActiveTab("dados-financeiros")}>
                Dados Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios" onClick={() => setActiveTab("dados-bancarios")}>
                Dados Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao" onClick={() => setActiveTab("formacao")}>
                Formação
              </TabsTrigger>
            </TabsList>

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

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab
                formData={formData.formacaoEscolaridade}
                onInputChange={(field, value) => handleInputChange('formacaoEscolaridade', field, value)}
              />
            </TabsContent>

            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="beneficios" onClick={() => setActiveTab("beneficios")}>
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao" onClick={() => setActiveTab("documentacao")}>
                Documentação
              </TabsTrigger>
              <TabsTrigger value="ti" onClick={() => setActiveTab("dadosTI")}>
                TI
              </TabsTrigger>
            </TabsList>

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
                anexosCandidato={anexosCandidato}
                setAnexosCandidato={setAnexosCandidato}
              />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab
                formData={formData.dadosTI}
                onInputChange={(field, value) => handleInputChange('dadosTI', field, value)}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCadastrarColaborador} className="bg-biodina-gold hover:bg-biodina-gold/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Colaborador
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Admissao;
