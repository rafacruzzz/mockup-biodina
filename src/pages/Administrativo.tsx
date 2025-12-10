import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  Shield, FileCheck, Building2, Scale, CheckCircle2, BookOpen, ArrowLeft,
  BarChart3, FileText, RefreshCw, UserCheck, Route, Shield as ShieldIcon, Plus, Gavel, MessageSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { NovoRegistroAnvisaModal } from '@/components/administrativo/NovoRegistroAnvisaModal';
import { RegistrosAnvisaTable } from '@/components/administrativo/components/RegistrosAnvisaTable';
import { HistoricoRegistroModal } from '@/components/administrativo/components/HistoricoRegistroModal';
import { AtualizacoesAnvisaTable } from '@/components/administrativo/components/AtualizacoesAnvisaTable';
import { NovaAtualizacaoModal } from '@/components/administrativo/NovaAtualizacaoModal';
import { DueDiligenceTable } from '@/components/administrativo/components/DueDiligenceTable';
import { NovaTriagemModal } from '@/components/administrativo/NovaTriagemModal';
import { DocumentacaoTab } from '@/components/administrativo/rt/DocumentacaoTab';
import { GestaoNCTab as GestaoNCTabRT } from '@/components/administrativo/rt/GestaoNCTab';
import { MonitoramentoAuditoriaTab } from '@/components/administrativo/rt/MonitoramentoAuditoriaTab';
import { EstruturaEPadroesTab } from '@/components/administrativo/qualidade/EstruturaEPadroesTab';
import { ColetaDadosTab } from '@/components/administrativo/qualidade/ColetaDadosTab';
import { GestaoNCTab } from '@/components/administrativo/qualidade/GestaoNCTab';
import { AnaliseIndicadoresTab } from '@/components/administrativo/qualidade/AnaliseIndicadoresTab';
import { AcaoCampoTab } from '@/components/administrativo/qualidade/AcaoCampoTab';
import { ProcessosTab } from '@/components/administrativo/juridico/ProcessosTab';
import { ChamadosJuridicoTab } from '@/components/administrativo/juridico/ChamadosJuridicoTab';
import { LinksSMTab } from '@/components/administrativo/institucional/LinksSMTab';
import { ControleImoveisTab } from '@/components/administrativo/institucional/ControleImoveisTab';
import { ControleVeiculosTab } from '@/components/administrativo/institucional/ControleVeiculosTab';
import { DocumentosEmpresaTab } from '@/components/administrativo/institucional/DocumentosEmpresaTab';
import { RastreabilidadeRegulatorioTab } from '@/components/administrativo/regulatorio/rastreabilidade/RastreabilidadeRegulatorioTab';
import { BoasPraticasTab } from '@/components/administrativo/regulatorio/boas-praticas/BoasPraticasTab';
import { modules } from '@/data/cadastroModules';
import { toast } from '@/components/ui/use-toast';
import { parse, subDays, differenceInDays, format } from 'date-fns';

const Administrativo = () => {
  const [activeModule, setActiveModule] = useState<'main' | 'rt' | 'regulatorio' | 'institucional' | 'juridico' | 'compliance' | 'biblioteca'>('main');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [qualidadeTab, setQualidadeTab] = useState('estrutura');
  const [rtTab, setRtTab] = useState('documentacoes');
  const [institucionalTab, setInstitucionalTab] = useState('links-sm');
  const [showNovoRegistroModal, setShowNovoRegistroModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedRegistroHistory, setSelectedRegistroHistory] = useState<any>(null);
  const [showNovaAtualizacaoModal, setShowNovaAtualizacaoModal] = useState(false);
  const [showAtualizacaoHistoryModal, setShowAtualizacaoHistoryModal] = useState(false);
  const [selectedAtualizacaoHistory, setSelectedAtualizacaoHistory] = useState<any>(null);
  const [showNovaTriagemModal, setShowNovaTriagemModal] = useState(false);
  const [selectedTriagem, setSelectedTriagem] = useState<any>(null);

  const renderMainModules = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-biodina-blue mb-2">Módulo Administrativo</h1>
        <p className="text-gray-600">Gestão administrativa e institucional</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Primeira linha */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('rt')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Shield className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">RT</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Responsabilidade Técnica e gestão de profissionais habilitados
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('regulatorio')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <FileCheck className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Regulatório</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão de conformidade regulatória e documentação oficial
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('institucional')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Building2 className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Institucional</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão institucional e relações corporativas
            </p>
          </CardContent>
        </Card>

        {/* Segunda linha */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('juridico')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <Scale className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Jurídico</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão jurídica, contratos e assessoria legal
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('compliance')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <CheckCircle2 className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Compliance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Conformidade corporativa e gestão de riscos
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-biodina-blue/20"
          onClick={() => setActiveModule('biblioteca')}
        >
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-4 p-4 bg-biodina-blue/10 rounded-full w-fit">
              <BookOpen className="h-16 w-16 text-biodina-blue" />
            </div>
            <CardTitle className="text-xl font-bold text-biodina-blue">Qualidade</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Gestão da qualidade e documentação técnica
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRTModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Responsabilidade Técnica</h2>
      </div>
      
      <Tabs value={rtTab} onValueChange={setRtTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documentacoes">INTEGRAÇÃO RT / CONTROLE DE QUALIDADE</TabsTrigger>
          <TabsTrigger value="gestao-nc">GESTÃO DE NÃO CONFORMIDADES</TabsTrigger>
          <TabsTrigger value="monitoramento-auditoria">MONITORAMENTO E AUDITORIA</TabsTrigger>
        </TabsList>

        <TabsContent value="documentacoes" className="mt-6">
          <DocumentacaoTab />
        </TabsContent>

        <TabsContent value="gestao-nc" className="mt-6">
          <GestaoNCTabRT />
        </TabsContent>

        <TabsContent value="monitoramento-auditoria" className="mt-6">
          <MonitoramentoAuditoriaTab />
        </TabsContent>
      </Tabs>
    </div>
  );

  // Dados mockados para o dashboard regulatório
  const regulatorioData = {
    indicadores: [
      { label: 'Produtos Registrados', valor: 1247, variacao: '+12%', cor: 'text-green-600' },
      { label: 'Conformidade Regulatória', valor: '94%', variacao: '+2%', cor: 'text-blue-600' },
      { label: 'Pendências Ativas', valor: 23, variacao: '-8%', cor: 'text-orange-600' },
      { label: 'Auditorias Realizadas', valor: 18, variacao: '+3%', cor: 'text-purple-600' }
    ],
    conformidadeData: [
      { categoria: 'Registro ANVISA', conformes: 85, nao_conformes: 15 },
      { categoria: 'Boas Práticas', conformes: 92, nao_conformes: 8 },
      { categoria: 'Rastreabilidade', conformes: 88, nao_conformes: 12 },
      { categoria: 'Qualidade', conformes: 95, nao_conformes: 5 },
    ],
    distribuicaoData: [
      { name: 'Conformes', value: 75, fill: '#22c55e' },
      { name: 'Pendentes', value: 18, fill: '#f59e0b' },
      { name: 'Não Conformes', value: 7, fill: '#ef4444' }
    ],
    produtosPendentes: [
      { produto: 'Equipamento Médico XYZ-100', registro: 'REG-2024-001', vencimento: '15/02/2025', dias: 25, status: 'Urgente' },
      { produto: 'Dispositivo ABC-200', registro: 'REG-2024-002', vencimento: '28/03/2025', dias: 68, status: 'Atenção' },
      { produto: 'Sistema Diagnóstico DEF-300', registro: 'REG-2024-003', vencimento: '10/04/2025', dias: 81, status: 'Normal' },
      { produto: 'Analisador GHI-400', registro: 'REG-2024-004', vencimento: '22/05/2025', dias: 123, status: 'Normal' }
    ],
    produtosPendentes2: (() => {
      const produtos = [
        { produto: 'Monitor Cardíaco MNO-500', vencimento: '08/03/2025' },
        { produto: 'Ventilador Pulmonar PQR-600', vencimento: '18/04/2025' },
        { produto: 'Bomba de Infusão STU-700', vencimento: '05/06/2025' },
        { produto: 'Desfibrilador VWX-800', vencimento: '12/01/2025' }
      ];
      
      return produtos.map(p => {
        const vencimento = parse(p.vencimento, 'dd/MM/yyyy', new Date());
        const dataMinima = subDays(vencimento, 180);
        const dataMaxima = subDays(vencimento, 90);
        const hoje = new Date();
        const diasParaPeticionamento = differenceInDays(dataMinima, hoje);
        
        return {
          produto: p.produto,
          vencimento: p.vencimento,
          dataMinimaPeticionamento: format(dataMinima, 'dd/MM/yyyy'),
          dataMaximaPeticionamento: format(dataMaxima, 'dd/MM/yyyy'),
          diasParaPeticionamento
        };
      });
    })()
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgente': return 'bg-red-500 text-white';
      case 'Atenção': return 'bg-orange-500 text-white';
      case 'Normal': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Mock data para as tabelas
  const registrosAnvisa = [
    { id: '1', numeroRegistro: 'REG-2024-001', produto: 'Equipamento XYZ', fabricante: 'Fabricante A', area: 'produtos_saude', status: 'vigente', dataRegistro: '2024-01-15', dataVencimento: '2029-01-15' },
    { id: '2', numeroRegistro: 'REG-2024-002', produto: 'Dispositivo ABC', fabricante: 'Fabricante B', area: 'medicamentos', status: 'renovacao', dataRegistro: '2023-06-20', dataVencimento: '2024-06-20' },
  ];

  const atualizacoesAnvisa = [
    { id: '1', idProduto: 'PROD-001', nomeProduto: 'Equipamento XYZ', areaAnvisa: 'produtos_saude', tipoAtualizacao: 'renovacao', status: 'em_andamento', dataSolicitacao: '2024-01-10', prazo: '2024-03-10' },
    { id: '2', idProduto: 'PROD-002', nomeProduto: 'Dispositivo ABC', areaAnvisa: 'medicamentos', tipoAtualizacao: 'alteracao', status: 'pendente', dataSolicitacao: '2024-02-05', prazo: '2024-04-05' },
  ];

  const dueDiligenceData = [
    { id: 1, idTriagem: 'TRI-2024-001', nomeFornecedor: 'Fornecedor Alpha', dataCriacao: '2024-01-20', statusAtual: 'Em Análise', responsavel: 'João Silva', contatoPrincipal: 'Carlos Mendes', emailContato: 'carlos@alpha.com', telefoneContato: '(11) 99999-0001', produtosInteresse: 'Equipamentos médicos', protocoloInterno: 'PROT-001' },
    { id: 2, idTriagem: 'TRI-2024-002', nomeFornecedor: 'Fornecedor Beta', dataCriacao: '2024-02-15', statusAtual: 'Aprovado', responsavel: 'Maria Santos', contatoPrincipal: 'Ana Paula', emailContato: 'ana@beta.com', telefoneContato: '(11) 99999-0002', produtosInteresse: 'Dispositivos diagnósticos', protocoloInterno: 'PROT-002' },
  ];

  const renderRegistroProdutos = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowNovoRegistroModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Registro
        </Button>
      </div>
      <RegistrosAnvisaTable 
        registros={registrosAnvisa}
        onEdit={(id) => toast({ title: "Editar registro", description: `Editando registro ${id}` })}
        onDelete={(id) => toast({ title: "Excluir registro", description: `Registro ${id} excluído` })}
        onViewHistory={(registro) => {
          setSelectedRegistroHistory(registro);
          setShowHistoryModal(true);
        }}
      />
    </div>
  );

  const renderAtualizacoesProdutos = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowNovaAtualizacaoModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Atualização
        </Button>
      </div>
      <AtualizacoesAnvisaTable 
        atualizacoes={atualizacoesAnvisa}
        onEdit={(id) => toast({ title: "Editar atualização", description: `Editando atualização ${id}` })}
        onDelete={(id) => toast({ title: "Excluir atualização", description: `Atualização ${id} excluída` })}
        onViewHistory={(atualizacao) => {
          setSelectedAtualizacaoHistory(atualizacao);
          setShowAtualizacaoHistoryModal(true);
        }}
      />
    </div>
  );

  const renderDueDiligence = () => (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowNovaTriagemModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Triagem
        </Button>
      </div>
      <DueDiligenceTable 
        data={dueDiligenceData}
        onView={(id) => toast({ title: "Visualizar triagem", description: `Visualizando triagem ${id}` })}
        onEdit={(id) => toast({ title: "Editar triagem", description: `Editando triagem ${id}` })}
        onDelete={(id) => toast({ title: "Excluir triagem", description: `Triagem ${id} excluída` })}
      />
    </div>
  );

  const renderRegulatorioModule = () => {
    const tabs = [
      { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
      { id: 'registro-produtos', label: 'REGISTRO DOS PRODUTOS', icon: FileText },
      { id: 'atualizacoes-produtos', label: 'ATUALIZAÇÕES DE PRODUTOS', icon: RefreshCw },
      { id: 'due-diligence', label: 'DUE DILIGENCE - FORNECEDOR', icon: UserCheck },
      { id: 'rastreabilidade', label: 'RASTREABILIDADE', icon: Route },
      { id: 'boas-praticas', label: 'BOAS PRÁTICAS', icon: CheckCircle2 },
    ];

    const renderContent = () => {
      switch (activeTab) {
        case 'dashboard': return renderRegulatorioIndicadores();
        case 'registro-produtos': return renderRegistroProdutos();
        case 'atualizacoes-produtos': return renderAtualizacoesProdutos();
        case 'due-diligence': return renderDueDiligence();
        case 'rastreabilidade': return <RastreabilidadeRegulatorioTab />;
        case 'boas-praticas': return <BoasPraticasTab />;
        default: return renderRegulatorioIndicadores();
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveModule('main')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-biodina-blue">Administrativo / Regulatório</h1>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-biodina-blue text-biodina-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          {renderContent()}
        </div>
      </div>
    );
  };

  const renderRegulatorioIndicadores = () => (
    <div className="space-y-6">
      {/* Cards de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {regulatorioData.indicadores.map((indicador, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{indicador.label}</h3>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{indicador.valor}</div>
                <p className={`text-xs ${indicador.cor}`}>
                  {indicador.variacao} em relação ao mês anterior
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Conformidade por Categoria */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Conformidade por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regulatorioData.conformidadeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conformes" fill="#22c55e" name="Conformes" />
                <Bar dataKey="nao_conformes" fill="#ef4444" name="Não Conformes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Distribuição Geral */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Distribuição de Situação Regulatória</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regulatorioData.distribuicaoData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regulatorioData.distribuicaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos com Vencimento Próximo */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Produtos com Vencimento de Registro Próximo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Produto</th>
                  <th className="text-left py-2 px-4 font-medium">Número do Registro</th>
                  <th className="text-left py-2 px-4 font-medium">Data de Vencimento</th>
                  <th className="text-left py-2 px-4 font-medium">Dias para Vencimento</th>
                  <th className="text-left py-2 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {regulatorioData.produtosPendentes.map((produto, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{produto.produto}</td>
                    <td className="py-3 px-4 font-mono text-sm">{produto.registro}</td>
                    <td className="py-3 px-4">{produto.vencimento}</td>
                    <td className="py-3 px-4">{produto.dias} dias</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(produto.status)}>
                        {produto.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Segunda Tabela de Produtos com Vencimento Próximo */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Boas Práticas com Vencimento Próximo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium">Produto</th>
                  <th className="text-left py-2 px-4 font-medium">Data de Vencimento</th>
                  <th className="text-left py-2 px-4 font-medium">Data Mínima para Peticionamento</th>
                  <th className="text-left py-2 px-4 font-medium">Data Máxima para Peticionamento</th>
                  <th className="text-left py-2 px-4 font-medium">Dias para Peticionamento</th>
                </tr>
              </thead>
              <tbody>
                {regulatorioData.produtosPendentes2.map((produto, index) => {
                  const getDiasColor = (dias: number) => {
                    if (dias < 0) return 'text-red-600 font-semibold';
                    if (dias < 30) return 'text-orange-600 font-semibold';
                    return 'text-green-600 font-semibold';
                  };
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{produto.produto}</td>
                      <td className="py-3 px-4">{produto.vencimento}</td>
                      <td className="py-3 px-4">{produto.dataMinimaPeticionamento}</td>
                      <td className="py-3 px-4">{produto.dataMaximaPeticionamento}</td>
                      <td className="py-3 px-4">
                        <span className={getDiasColor(produto.diasParaPeticionamento)}>
                          {produto.diasParaPeticionamento} dias
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmptyTab = (titulo: string, descricao: string) => (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <FileCheck className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{titulo}</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {descricao}. Esta funcionalidade está em desenvolvimento e em breve estará disponível.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderInstitucionalModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Institucional</h2>
      </div>
      
      <Tabs value={institucionalTab} onValueChange={setInstitucionalTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="links-sm">Links SM</TabsTrigger>
          <TabsTrigger value="imoveis">Controle de Imóveis</TabsTrigger>
          <TabsTrigger value="veiculos">Controle de Veículos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos da Empresa</TabsTrigger>
        </TabsList>

        <TabsContent value="links-sm" className="mt-6">
          <LinksSMTab />
        </TabsContent>

        <TabsContent value="imoveis" className="mt-6">
          <ControleImoveisTab />
        </TabsContent>

        <TabsContent value="veiculos" className="mt-6">
          <ControleVeiculosTab />
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          <DocumentosEmpresaTab />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderJuridicoModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Administrativo / Jurídico</h2>
      </div>
      
      <Tabs defaultValue="processos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="processos" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            PROCESSOS
          </TabsTrigger>
          <TabsTrigger value="chamados" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            CHAMADOS JURÍDICOS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="processos" className="mt-6">
          <ProcessosTab />
        </TabsContent>

        <TabsContent value="chamados" className="mt-6">
          <ChamadosJuridicoTab />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderComplianceModule = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => setActiveModule('main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold text-biodina-blue">Compliance</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Módulo em Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            O módulo de Compliance está em desenvolvimento. 
            Em breve você poderá gerenciar conformidade corporativa, 
            gestão de riscos e auditoria interna.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderBibliotecaModule = () => (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setActiveModule('main')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h2 className="text-2xl font-bold text-biodina-blue">Qualidade</h2>
        </div>
        
        <Tabs value={qualidadeTab} onValueChange={setQualidadeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="estrutura">Estrutura e Padrões</TabsTrigger>
            <TabsTrigger value="coleta">Coleta de Dados e Inspeção</TabsTrigger>
            <TabsTrigger value="nao-conformidades">Gestão de Não Conformidades</TabsTrigger>
            <TabsTrigger value="analise">Análise de Dados e Indicadores</TabsTrigger>
            <TabsTrigger value="acao-campo">Ação de Campo</TabsTrigger>
          </TabsList>

          <TabsContent value="estrutura" className="mt-6">
            <EstruturaEPadroesTab />
          </TabsContent>

          <TabsContent value="coleta" className="mt-6">
            <ColetaDadosTab />
          </TabsContent>

          <TabsContent value="nao-conformidades" className="mt-6">
            <GestaoNCTab />
          </TabsContent>

          <TabsContent value="analise" className="mt-6">
            <AnaliseIndicadoresTab />
          </TabsContent>

          <TabsContent value="acao-campo" className="mt-6">
            <AcaoCampoTab />
          </TabsContent>
        </Tabs>
      </div>
    );

  const renderContent = () => {
    switch (activeModule) {
      case 'rt':
        return renderRTModule();
      case 'regulatorio':
        return renderRegulatorioModule();
      case 'institucional':
        return renderInstitucionalModule();
      case 'juridico':
        return renderJuridicoModule();
      case 'compliance':
        return renderComplianceModule();
      case 'biblioteca':
        return renderBibliotecaModule();
      default:
        return renderMainModules();
    }
  };

  return (
    <SidebarLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {renderContent()}
      </div>
      
      <NovoRegistroAnvisaModal 
        isOpen={showNovoRegistroModal}
        onClose={() => setShowNovoRegistroModal(false)}
      />

      <HistoricoRegistroModal 
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        registro={selectedRegistroHistory}
      />

      <NovaAtualizacaoModal 
        isOpen={showNovaAtualizacaoModal}
        onClose={() => setShowNovaAtualizacaoModal(false)}
        onAtualizacaoSalva={(atualizacao) => {
          toast({
            title: "Atualização criada com sucesso!",
            description: `${atualizacao.nomeArquivoPrincipal} foi registrada no sistema.`,
          });
        }}
      />

      <NovaTriagemModal
        open={showNovaTriagemModal}
        onOpenChange={(open) => {
          setShowNovaTriagemModal(open);
          if (!open) setSelectedTriagem(null);
        }}
        editingData={selectedTriagem}
      />
    </SidebarLayout>
  );
};

export default Administrativo;