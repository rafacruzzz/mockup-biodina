import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useUsers } from "@/hooks/useUsers";
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI } from "@/types/colaborador";
import { Candidato } from "@/types/candidato";
import DadosPessoaisTab from "./tabs/DadosPessoaisTab";
import DadosProfissionaisTab from "./tabs/DadosProfissionaisTab";
import DadosFinanceirosTab from "./tabs/DadosFinanceirosTab";
import DadosBancariosTab from "./tabs/DadosBancariosTab";
import FormacaoEscolaridadeTab from "./tabs/FormacaoEscolaridadeTab";
import BeneficiosTab from "./tabs/BeneficiosTab";
import DocumentacaoTab from "./tabs/DocumentacaoTab";
import { TITab } from './tabs/TITab';

interface AdmissaoProps {
  candidato?: Candidato;
}

const Admissao = () => {
  const { toast } = useToast();
  const { adicionarUser } = useUsers();

  const [activeTab, setActiveTab] = useState('dados-pessoais');
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(null);

  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>({
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
  });

  const [dadosProfissionais, setDadosProfissionais] = useState<DadosProfissionais>({
    empresa: '',
    uf: '',
    setor: '',
    funcao: '',
    cargo: '',
    nivel: '',
    cbo: '',
    compativelFuncao: true,
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
  });

  const [dadosFinanceiros, setDadosFinanceiros] = useState<DadosFinanceiros>({
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
  });

  const [dadosBancarios, setDadosBancarios] = useState<DadosBancarios>({
    banco: '',
    tipoConta: '',
    agencia: '',
    conta: ''
  });

  const [formacaoEscolaridade, setFormacaoEscolaridade] = useState<FormacaoEscolaridade>({
    escolaridade: '',
    possuiDiploma: false,
    comprovantesEscolaridade: []
  });

  const [beneficios, setBeneficios] = useState<Beneficios>({
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
  });

  const [documentacao, setDocumentacao] = useState<Documentacao>({
    anexos: []
  });

  const [dadosTI, setDadosTI] = useState<DadosTI>({
    servidorAcesso: '',
    permissoesNecessarias: '',
    restricoes: '',
    pastasAcesso: '',
    emailCorporativo: '',
    ramal: ''
  });

  const handleCadastrarColaborador = () => {
    const novoUser = {
      nome: dadosPessoais.nome,
      email: dadosPessoais.email,
      telefone: dadosPessoais.telefone,
      status: 'Novo' as const,
      dadosPessoais,
      dadosProfissionais: {
        ...dadosProfissionais,
        cargo: dadosProfissionais.cargo,
        dataAdmissao: dadosProfissionais.dataAdmissao
      },
      dadosFinanceiros,
      dadosBancarios,
      formacaoEscolaridade,
      beneficios,
      documentacao: { anexos: [] },
      dadosTI,
      credentials: {
        isActive: false,
        userType: 'usuario' as const,
        moduleAccess: []
      }
    };

    const userCriado = adicionarUser(novoUser);
    
    toast({
      title: "Usuário cadastrado com sucesso!",
      description: `${userCriado.nome} foi adicionado ao sistema como usuário.`,
    });

    // Reset forms
    setDadosPessoais({
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
    });

    setDadosProfissionais({
      empresa: '',
      uf: '',
      setor: '',
      funcao: '',
      cargo: '',
      nivel: '',
      cbo: '',
      compativelFuncao: true,
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
    });

    setDadosFinanceiros({
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
    });

    setDadosBancarios({
      banco: '',
      tipoConta: '',
      agencia: '',
      conta: ''
    });

    setFormacaoEscolaridade({
      escolaridade: '',
      possuiDiploma: false,
      comprovantesEscolaridade: []
    });

    setBeneficios({
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
    });

    setDocumentacao({
      anexos: []
    });

    setDadosTI({
      servidorAcesso: '',
      permissoesNecessarias: '',
      restricoes: '',
      pastasAcesso: '',
      emailCorporativo: '',
      ramal: ''
    });

    setActiveTab('dados-pessoais');
    setSelectedCandidato(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dados-pessoais':
        return (
          <DadosPessoaisTab
            formData={dadosPessoais}
            onInputChange={(field, value) =>
              setDadosPessoais(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'dados-profissionais':
        return (
          <DadosProfissionaisTab
            formData={dadosProfissionais}
            onInputChange={(field, value) =>
              setDadosProfissionais(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'dados-financeiros':
        return (
          <DadosFinanceirosTab
            formData={dadosFinanceiros}
            onInputChange={(field, value) =>
              setDadosFinanceiros(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'dados-bancarios':
        return (
          <DadosBancariosTab
            formData={dadosBancarios}
            onInputChange={(field, value) =>
              setDadosBancarios(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'formacao':
        return (
          <FormacaoEscolaridadeTab
            formData={formacaoEscolaridade}
            onInputChange={(field, value) =>
              setFormacaoEscolaridade(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'beneficios':
        return (
          <BeneficiosTab
            formData={beneficios}
            onInputChange={(field, value) =>
              setBeneficios(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'ti':
        return (
          <TITab
            formData={dadosTI}
            onInputChange={(field, value) => 
              setDadosTI(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      case 'documentacao':
        return (
          <DocumentacaoTab
            formData={documentacao}
            onInputChange={(field, value) => 
              setDocumentacao(prev => ({ ...prev, [field]: value }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-biodina-blue">Admissão de Colaborador</h1>
      <p className="text-gray-600 mb-6">Preencha os dados do novo colaborador para efetuar a admissão no sistema.</p>

      <div className="md:flex gap-8">
        {/* Tabs */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'dados-pessoais' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dados-pessoais')}
              >
                Dados Pessoais
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'dados-profissionais' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dados-profissionais')}
              >
                Dados Profissionais
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'dados-financeiros' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dados-financeiros')}
              >
                Dados Financeiros
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'dados-bancarios' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('dados-bancarios')}
              >
                Dados Bancários
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'formacao' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('formacao')}
              >
                Formação e Escolaridade
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'beneficios' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('beneficios')}
              >
                Benefícios
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'ti' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('ti')}
              >
                Dados de TI
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${activeTab === 'documentacao' ? 'text-biodina-gold' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('documentacao')}
              >
                Documentação
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Form Content */}
        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'dados-pessoais' && 'Dados Pessoais'}
                {activeTab === 'dados-profissionais' && 'Dados Profissionais'}
                {activeTab === 'dados-financeiros' && 'Dados Financeiros'}
                {activeTab === 'dados-bancarios' && 'Dados Bancários'}
                {activeTab === 'formacao' && 'Formação e Escolaridade'}
                {activeTab === 'beneficios' && 'Benefícios'}
                {activeTab === 'ti' && 'Dados de TI'}
                {activeTab === 'documentacao' && 'Documentação'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex justify-end">
        <Button onClick={handleCadastrarColaborador}>Cadastrar Colaborador</Button>
      </div>
    </div>
  );
};

export default Admissao;
