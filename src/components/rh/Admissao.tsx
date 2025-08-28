import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar, CheckCircle, Clock, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DadosPessoaisTab from './tabs/DadosPessoaisTab';
import DadosProfissionaisTab from './tabs/DadosProfissionaisTab';
import DadosFinanceirosTab from './tabs/DadosFinanceirosTab';
import DadosBancariosTab from './tabs/DadosBancariosTab';
import FormacaoEscolaridadeTab from './tabs/FormacaoEscolaridadeTab';
import BeneficiosTab from './tabs/BeneficiosTab';
import DocumentacaoTab from './tabs/DocumentacaoTab';
import TITab from './tabs/TITab';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useUsers } from '@/hooks/useUsers';
import { UserData } from '@/types/user';
import { DadosPessoais, DadosProfissionais, DadosFinanceiros, DadosBancarios, FormacaoEscolaridade, Beneficios, Documentacao, DadosTI } from '@/types/colaborador';

interface AdmissaoData {
  dadosPessoais: DadosPessoais;
  dadosProfissionais: DadosProfissionais;
  dadosFinanceiros: DadosFinanceiros;
  dadosBancarios: DadosBancarios;
  formacaoEscolaridade: FormacaoEscolaridade;
  beneficios: Beneficios;
  documentacao: Documentacao;
  dadosTI: DadosTI;
}

const Admissao = () => {
  const { toast } = useToast();
  const { users, addUser } = useUsers();
  const [activeTab, setActiveTab] = useState('dados-pessoais');
  const [isAdmissaoModalOpen, setIsAdmissaoModalOpen] = useState(false);
  
  const [candidatos, setCandidatos] = useState([
    { id: '1', nome: 'João Silva', processo: 'Vendas - Estágio', status: 'Aprovado' },
    { id: '2', nome: 'Maria Oliveira', processo: 'Marketing - Analista Jr', status: 'Aprovado' },
    { id: '3', nome: 'Carlos Pereira', processo: 'TI - Desenvolvedor Pl', status: 'Aprovado' }
  ]);

  const [processos, setProcessos] = useState([
    { id: 'vendas-estagio', nome: 'Vendas - Estágio', dataAbertura: '2024-01-15', status: 'Em andamento' },
    { id: 'marketing-analista-jr', nome: 'Marketing - Analista Jr', dataAbertura: '2024-02-01', status: 'Concluído' },
    { id: 'ti-desenvolvedor-pl', nome: 'TI - Desenvolvedor Pl', dataAbertura: '2024-02-10', status: 'Em andamento' }
  ]);

  const [selectedCandidato, setSelectedCandidato] = useState(null);
  
  const [formData, setFormData] = useState<AdmissaoData>({
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
    }
  });

  const handleInputChange = (section: keyof AdmissaoData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFinalizeAdmissao = () => {
    // Create user with unified structure
    const newUser: Omit<UserData, 'id'> = {
      nome: formData.dadosPessoais.nome,
      email: formData.dadosPessoais.email,
      telefone: formData.dadosPessoais.telefone,
      status: 'Novo',
      ...formData,
      credentials: {
        isActive: false,
        userType: 'usuario',
        moduleAccess: []
      }
    };

    addUser(newUser);
    
    toast({
      title: "Admissão finalizada com sucesso!",
      description: `${formData.dadosPessoais.nome} foi admitido e está disponível no módulo de Cadastro.`,
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
      }
    });
    
    setIsAdmissaoModalOpen(false);
    setActiveTab('dados-pessoais');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dados-pessoais':
        return (
          <DadosPessoaisTab
            formData={formData.dadosPessoais}
            onInputChange={(field, value) => handleInputChange('dadosPessoais', field, value)}
          />
        );
      case 'dados-profissionais':
        return (
          <DadosProfissionaisTab
            formData={formData.dadosProfissionais}
            onInputChange={(field, value) => handleInputChange('dadosProfissionais', field, value)}
          />
        );
      case 'dados-financeiros':
        return (
          <DadosFinanceirosTab
            formData={formData.dadosFinanceiros}
            onInputChange={(field, value) => handleInputChange('dadosFinanceiros', field, value)}
          />
        );
      case 'dados-bancarios':
        return (
          <DadosBancariosTab
            formData={formData.dadosBancarios}
            onInputChange={(field, value) => handleInputChange('dadosBancarios', field, value)}
          />
        );
      case 'formacao':
        return (
          <FormacaoEscolaridadeTab
            formData={formData.formacaoEscolaridade}
            onInputChange={(field, value) => handleInputChange('formacaoEscolaridade', field, value)}
          />
        );
      case 'beneficios':
        return (
          <BeneficiosTab
            formData={formData.beneficios}
            onInputChange={(field, value) => handleInputChange('beneficios', field, value)}
          />
        );
      case 'documentacao':
        return (
          <DocumentacaoTab
            formData={formData.documentacao}
            onInputChange={(field, value) => handleInputChange('documentacao', field, value)}
          />
        );
      case 'ti':
        return (
          <TITab
            formData={formData.dadosTI}
            onInputChange={(field, value) => handleInputChange('dadosTI', field, value)}
          />
        );
      default:
        return null;
    }
  };

  const handleOpenAdmissaoModal = (candidato) => {
    setSelectedCandidato(candidato);
    setIsAdmissaoModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-biodina-blue">Admissão</h2>
          <p className="text-gray-600">Adicione novos colaboradores ao sistema</p>
        </div>
        <Button onClick={() => handleOpenAdmissaoModal(null)} className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Admissão
        </Button>
      </div>

      {/* Candidatos Aprovados */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Candidatos Aprovados</CardTitle>
          <Badge variant="secondary">
            <Users className="h-4 w-4 mr-2" />
            {candidatos.length}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidatos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum candidato aprovado encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {candidatos.map((candidato) => (
                <Card key={candidato.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-medium">{candidato.nome}</CardTitle>
                      <p className="text-sm text-gray-500">{candidato.processo}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {candidato.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => handleOpenAdmissaoModal(candidato)} className="w-full justify-center bg-biodina-gold hover:bg-biodina-gold/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Admitir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admissão Modal */}
      <Dialog open={isAdmissaoModalOpen} onOpenChange={setIsAdmissaoModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-biodina-gold" />
              Nova Admissão
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="dados-pessoais" className="text-xs">Pessoais</TabsTrigger>
              <TabsTrigger value="dados-profissionais" className="text-xs">Profissionais</TabsTrigger>
              <TabsTrigger value="dados-financeiros" className="text-xs">Financeiros</TabsTrigger>
              <TabsTrigger value="dados-bancarios" className="text-xs">Bancários</TabsTrigger>
              <TabsTrigger value="formacao" className="text-xs">Formação</TabsTrigger>
              <TabsTrigger value="beneficios" className="text-xs">Benefícios</TabsTrigger>
              <TabsTrigger value="documentacao" className="text-xs">Documentos</TabsTrigger>
              <TabsTrigger value="ti" className="text-xs">TI</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              {renderTabContent()}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdmissaoModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleFinalizeAdmissao} className="bg-biodina-gold hover:bg-biodina-gold/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalizar Admissão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admissao;
