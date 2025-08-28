import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, User, Building2, DollarSign, CreditCard, GraduationCap, Heart, FileText, Monitor } from "lucide-react";
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI } from "@/types/colaborador";
import { useColaboradores } from "@/hooks/useColaboradores";
import { useToast } from "@/hooks/use-toast";

// Import all the colaborador tabs
import DadosPessoaisTab from "@/components/rh/tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "@/components/rh/tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "@/components/rh/tabs/DadosFinanceirosTab";
import DadosBancariosTab from "@/components/rh/tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "@/components/rh/tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "@/components/rh/tabs/BeneficiosTab";
import DocumentacaoTab from "@/components/rh/tabs/DocumentacaoTab";

interface AdmissaoProps {
  isOpen: boolean;
  onClose: () => void;
  candidatoId?: string;
  candidatoData?: {
    dadosPessoais: DadosPessoais;
    dadosProfissionais: DadosProfissionais;
    dadosFinanceiros: DadosFinanceiros;
    dadosBancarios: DadosBancarios;
    formacaoEscolaridade: FormacaoEscolaridade;
    beneficios: Beneficios;
    documentacao?: Documentacao;
    dadosTI?: DadosTI;
  };
  onDataChange?: (data: any) => void;
}

const Admissao = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candidatoId, setCandidatoId] = useState<string | undefined>(undefined);
  const [candidatoData, setCandidatoData] = useState<{
    dadosPessoais: DadosPessoais;
    dadosProfissionais: DadosProfissionais;
    dadosFinanceiros: DadosFinanceiros;
    dadosBancarios: DadosBancarios;
    formacaoEscolaridade: FormacaoEscolaridade;
    beneficios: Beneficios;
    documentacao?: Documentacao;
    dadosTI?: DadosTI;
  } | null>(null);
  const [anexosCandidato, setAnexosCandidato] = useState<any[]>([]);

  const { adicionarColaborador } = useColaboradores();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setCandidatoData(prev => {
      if (!prev) return prev;

      const fieldParts = field.split('.');
      if (fieldParts.length > 1) {
        const [section, subField] = fieldParts;
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [subField]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleCadastrarColaborador = () => {
    if (!candidatoData) return;

    const novoUser = {
      nome: candidatoData.dadosPessoais.nome,
      email: candidatoData.dadosPessoais.email,
      telefone: candidatoData.dadosPessoais.telefone,
      status: 'Novo' as const,
      dadosPessoais: candidatoData.dadosPessoais,
      dadosProfissionais: candidatoData.dadosProfissionais,
      dadosFinanceiros: candidatoData.dadosFinanceiros,
      dadosBancarios: candidatoData.dadosBancarios,
      formacaoEscolaridade: candidatoData.formacaoEscolaridade,
      beneficios: candidatoData.beneficios,
      documentacao: {
        anexos: anexosCandidato,
        solicitadoParaDPEm: candidatoData.documentacao?.solicitadoParaDPEm,
        solicitadoPor: candidatoData.documentacao?.solicitadoPor,
        motivoContratacao: candidatoData.documentacao?.motivoContratacao,
        observacoesGerais: candidatoData.documentacao?.observacoesGerais,
        exameAdmissional: candidatoData.documentacao?.exameAdmissional
      },
      dadosTI: candidatoData.dadosTI || {
        servidorAcesso: '',
        permissoesNecessarias: '',
        restricoes: '',
        pastasAcesso: '',
        emailCorporativo: '',
        ramal: ''
      }
    };

    adicionarColaborador(novoUser);
    
    toast({
      title: "Usuário cadastrado com sucesso!",
      description: `${candidatoData.dadosPessoais.nome} foi adicionado ao sistema como usuário.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-biodina-gold/10 rounded-lg">
              <User className="h-6 w-6 text-biodina-gold" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-biodina-blue">
                Admissão de Candidato
              </DialogTitle>
              <p className="text-gray-600">
                Preencha os dados do candidato para efetuar a admissão
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="dados-pessoais" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="dados-pessoais">
                <User className="h-4 w-4 mr-2" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="dados-profissionais">
                <Building2 className="h-4 w-4 mr-2" />
                Dados Profissionais
              </TabsTrigger>
              <TabsTrigger value="dados-financeiros">
                <DollarSign className="h-4 w-4 mr-2" />
                Dados Financeiros
              </TabsTrigger>
              <TabsTrigger value="dados-bancarios">
                <CreditCard className="h-4 w-4 mr-2" />
                Dados Bancários
              </TabsTrigger>
              <TabsTrigger value="formacao">
                <GraduationCap className="h-4 w-4 mr-2" />
                Formação
              </TabsTrigger>
            </TabsList>
            
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="beneficios">
                <Heart className="h-4 w-4 mr-2" />
                Benefícios
              </TabsTrigger>
              <TabsTrigger value="documentacao">
                <FileText className="h-4 w-4 mr-2" />
                Documentação
              </TabsTrigger>
              <TabsTrigger value="ti">
                <Monitor className="h-4 w-4 mr-2" />
                TI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-pessoais" className="mt-0">
              <DadosPessoaisTab 
                formData={candidatoData?.dadosPessoais || {
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
                }}
                onInputChange={(field, value) => handleInputChange(`dadosPessoais.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-profissionais" className="mt-0">
              <DadosProfissionaisTab 
                formData={candidatoData?.dadosProfissionais || {
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
                }}
                onInputChange={(field, value) => handleInputChange(`dadosProfissionais.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-financeiros" className="mt-0">
              <DadosFinanceirosTab 
                formData={candidatoData?.dadosFinanceiros || {
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
                }}
                onInputChange={(field, value) => handleInputChange(`dadosFinanceiros.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="dados-bancarios" className="mt-0">
              <DadosBancariosTab 
                formData={candidatoData?.dadosBancarios || {
                  banco: '',
                  tipoConta: '',
                  agencia: '',
                  conta: ''
                }}
                onInputChange={(field, value) => handleInputChange(`dadosBancarios.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="formacao" className="mt-0">
              <FormacaoEscolaridadeTab 
                formData={candidatoData?.formacaoEscolaridade || {
                  escolaridade: '',
                  possuiDiploma: false,
                  comprovantesEscolaridade: []
                }}
                onInputChange={(field, value) => handleInputChange(`formacaoEscolaridade.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="beneficios" className="mt-0">
              <BeneficiosTab 
                formData={candidatoData?.beneficios || {
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
                }}
                onInputChange={(field, value) => handleInputChange(`beneficios.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="documentacao" className="mt-0">
              <DocumentacaoTab 
                formData={candidatoData?.documentacao || { anexos: [] }}
                onInputChange={(field, value) => handleInputChange(`documentacao.${field}`, value)}
              />
            </TabsContent>

            <TabsContent value="ti" className="mt-0">
              <TITab 
                formData={candidatoData?.dadosTI || {
                  servidorAcesso: '',
                  permissoesNecessarias: '',
                  restricoes: '',
                  pastasAcesso: '',
                  emailCorporativo: '',
                  ramal: ''
                }}
                onInputChange={(field, value) => handleInputChange(`dadosTI.${field}`, value)}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCadastrarColaborador} className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Save className="h-4 w-4 mr-2" />
            Admitir Candidato
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Admissao;
