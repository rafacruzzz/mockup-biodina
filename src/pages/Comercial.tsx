import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SidebarLayout from "@/components/SidebarLayout";
import OportunidadeAvancadaForm from "@/components/comercial/OportunidadeAvancadaForm";
import PedidoModal from "@/components/comercial/PedidoModal";
import PedidoForm from "@/components/comercial/PedidoForm";
import ContratacaoSimplesForm from "@/components/comercial/ContratacaoSimplesForm";
import ImportacaoDiretaForm from "@/components/comercial/ImportacaoDiretaForm";
// import AssinaturasDigitaisView from "@/components/comercial/AssinaturasDigitaisView"; // COMENTADO - NÃO USAR NO MOMENTO
import EmprestimosTable from "@/components/comercial/EmprestimosTable";
import AgendaComercial from "@/components/comercial/AgendaComercial";
import { 
  TrendingUp, Target, FileText, BarChart3, Plus, Search, Edit,
  DollarSign, Calendar, Phone, MapPin, Briefcase, Eye, Thermometer, Filter,
  ShoppingCart, Headphones, ArrowLeft, Package, Truck, ClipboardList,
  AlertTriangle, UserCheck, Clock, CreditCard, Flame, Rocket, Trophy, Medal,
  Gavel, Building2, Globe, HandCoins, FileSpreadsheet // FileSignature COMENTADO - NÃO USAR NO MOMENTO
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

const Comercial = () => {
  const [activeModule, setActiveModule] = useState<'main' | 'vendas' | 'emprestimos' | 'assessoria' | 'departamento-tecnico' /* | 'assinaturas' */>('main'); // ASSINATURAS COMENTADO - NÃO USAR NO MOMENTO
  const [activeTab, setActiveTab] = useState('indicadores');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [showOportunidadeAvancadaForm, setShowOportunidadeAvancadaForm] = useState(false);
  const [editingOportunidade, setEditingOportunidade] = useState<any>();
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<any>();
  const [showContratacaoSimplesForm, setShowContratacaoSimplesForm] = useState(false);
  const [showImportacaoDiretaForm, setShowImportacaoDiretaForm] = useState(false);
  // const [showAssinaturas, setShowAssinaturas] = useState(false); // COMENTADO - NÃO USAR NO MOMENTO

  const oportunidades = [
    { 
      id: 1,
      codigo: '10678',
      cliente: 'Associação das Pioneiras Sociais',
      contato: 'Ramal - 3319-1111',
      responsavel: 'Faber Oliveira',
      origem: 'Vendas RJ',
      familiaComercial: 'Radiometer ABL',
      situacao: 'ganha',
      status: 'Ganha',
      resultadoOportunidade: 'ganho',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 782530,
      dataAbertura: '20/03/2024',
      dataContato: '20/03/2024',
      termometro: 100,
      fonteLead: 'Site',
      segmento: 'Hospitalar',
      modalidade: 'licitacao',
      descricao: 'DOS 3 EQUIPAMENTOS ADQUIRIDOS POR (ID) O DE Nº SERIE 754R2826N025 IRA SER INSTALADO NO SARAH-DF.',
      produtos: ['ABL800 Flex', 'Sensor pH'],
      servicos: ['Instalação', 'Treinamento']
    },
    { 
      id: 2,
      codigo: '10679',
      cliente: 'Hospital Universitário Onofre Lopes',
      contato: 'contato@huol.ufrn.br',
      responsavel: 'Maria Santos',
      origem: 'Vendas RN',
      familiaComercial: 'Nova Biomedical',
      situacao: 'em_triagem',
      status: 'Em Triagem',
      resultadoOportunidade: 'em_andamento',
      tipoAplicacao: 'locacao',
      tipoOportunidade: 'periodica',
      valor: 450000,
      dataAbertura: '15/03/2024',
      dataContato: '16/03/2024',
      termometro: 85,
      fonteLead: 'Indicação',
      segmento: 'Universitário',
      modalidade: 'contratacao_simples',
      descricao: 'Equipamentos para laboratório de análises clínicas',
      produtos: [],
      servicos: []
    },
    { 
      id: 3,
      codigo: '10680',
      cliente: 'CEMA - Central de Medicamentos',
      contato: '(85) 3101-1234',
      responsavel: 'João Silva',
      origem: 'Vendas CE',
      familiaComercial: 'WEBMED',
      situacao: 'em_acompanhamento',
      status: 'Em Acompanhamento',
      resultadoOportunidade: 'em_andamento',
      tipoAplicacao: 'servico',
      tipoOportunidade: 'pontual',
      valor: 280000,
      dataAbertura: '10/03/2024',
      dataContato: '12/03/2024',
      termometro: 45,
      fonteLead: 'Cold Call',
      segmento: 'Público',
      modalidade: 'licitacao',
      descricao: 'Sistema de gestão hospitalar integrado',
      produtos: ['Sistema WEBMED'],
      servicos: ['Consultoria', 'Implementação']
    },
    { 
      id: 4,
      codigo: '10681',
      cliente: 'Prefeitura de São Paulo',
      contato: 'licitacoes@saude.sp.gov.br',
      responsavel: 'Carlos Oliveira',
      origem: 'Vendas SP',
      familiaComercial: 'Stat Profile',
      situacao: 'perdida',
      status: 'Perdida',
      resultadoOportunidade: 'perda',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 1250000,
      dataAbertura: '05/03/2024',
      dataContato: '08/03/2024',
      termometro: 75,
      fonteLead: 'Licitação',
      segmento: 'Municipal',
      modalidade: 'licitacao',
      descricao: 'Gasômetros para rede municipal de saúde',
      produtos: ['Gasômetro Stat Profile'],
      servicos: []
    },
    {
      id: 5,
      codigo: '10682',
      cliente: 'Hospital Albert Einstein',
      contato: 'compras@einstein.br',
      responsavel: 'Ana Costa',
      origem: 'Vendas SP',
      familiaComercial: 'Radiometer ABL',
      situacao: 'em_acompanhamento',
      status: 'Em Acompanhamento',
      resultadoOportunidade: 'em_andamento',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 890000,
      dataAbertura: '25/03/2024',
      dataContato: '26/03/2024',
      termometro: 95,
      fonteLead: 'Referência',
      segmento: 'Privado',
      modalidade: 'contratacao_simples',
      descricao: 'Modernização do laboratório de análises',
      produtos: ['ABL800 Basic'],
      servicos: ['Manutenção']
    },
    // Exemplos de Importação Direta
    {
      id: 'IMP-2024-001',
      codigo: 'IMP-2024-001',
      cliente: 'Hospital Albert Einstein',
      contato: 'compras@einstein.br',
      responsavel: 'Carlos Silva',
      origem: 'Importação Direta',
      familiaComercial: 'Radiometer ABL',
      situacao: 'ganha',
      status: 'Ganha',
      resultadoOportunidade: 'ganho',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 150000,
      dataAbertura: '10/01/2024',
      dataContato: '12/01/2024',
      termometro: 100,
      fonteLead: 'Importação',
      segmento: 'Privado',
      modalidade: 'importacao_direta',
      descricao: 'Importação direta de equipamentos médicos para modernização do laboratório',
      produtos: ['ABL800 FLEX', 'Sensor CO2', 'Sistema WEBMED'],
      servicos: ['Instalação', 'Treinamento']
    },
    {
      id: 'IMP-2024-002',
      codigo: 'IMP-2024-002',
      cliente: 'Hospital Sírio-Libanês',
      contato: 'suprimentos@hsl.org.br',
      responsavel: 'Maria Santos',
      origem: 'Importação Direta',
      familiaComercial: 'Nova Biomedical',
      situacao: 'em_acompanhamento',
      status: 'Em Acompanhamento',
      resultadoOportunidade: 'em_andamento',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 168500,
      dataAbertura: '01/02/2024',
      dataContato: '02/02/2024',
      termometro: 85,
      fonteLead: 'Importação',
      segmento: 'Privado',
      modalidade: 'importacao_direta',
      descricao: 'Importação de analisadores de gases sanguíneos e eletrodos',
      produtos: ['Nova StatProfile', 'ABL90 FLEX PLUS', 'Eletrodo pH'],
      servicos: ['Manutenção', 'Suporte Técnico']
    },
    {
      id: 'IMP-2024-003',
      codigo: 'IMP-2024-003',
      cliente: 'INCA - Instituto Nacional de Câncer',
      contato: 'compras@inca.gov.br',
      responsavel: 'João Oliveira',
      origem: 'Importação Direta',
      familiaComercial: 'Radiometer PHO',
      situacao: 'em_triagem',
      status: 'Em Triagem',
      resultadoOportunidade: 'em_andamento',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 15500,
      dataAbertura: '10/12/2023',
      dataContato: '15/12/2023',
      termometro: 60,
      fonteLead: 'Importação',
      segmento: 'Público',
      modalidade: 'importacao_direta',
      descricao: 'Importação de eletrodos e gás calibrador para análise sanguínea',
      produtos: ['Eletrodos pH e Gases', 'Gás Calibrador'],
      servicos: ['Instalação']
    }
  ];

  const calculateFunnelData = () => {
    const activeOportunidades = oportunidades.filter(op => op.resultadoOportunidade !== 'perda');
    
    const funnelStages = [
      {
        fase: 'Temperatura < 60',
        cor: 'from-orange-400 to-orange-500',
        borderColor: 'border-orange-400',
        icon: '🌡️',
        count: activeOportunidades.filter(op => op.termometro < 60).length,
        valor: activeOportunidades.filter(op => op.termometro < 60).reduce((sum, op) => sum + op.valor, 0)
      },
      {
        fase: 'Em Processo (60-80)',
        cor: 'from-yellow-400 to-orange-400',
        borderColor: 'border-yellow-400',
        icon: '📈',
        count: activeOportunidades.filter(op => op.termometro >= 60 && op.termometro < 80).length,
        valor: activeOportunidades.filter(op => op.termometro >= 60 && op.termometro < 80).reduce((sum, op) => sum + op.valor, 0)
      },
      {
        fase: 'Boas Chances (80-90)',
        cor: 'from-orange-500 to-red-500',
        borderColor: 'border-orange-500',
        icon: '🔥',
        count: activeOportunidades.filter(op => op.termometro >= 80 && op.termometro < 90).length,
        valor: activeOportunidades.filter(op => op.termometro >= 80 && op.termometro < 90).reduce((sum, op) => sum + op.valor, 0)
      },
      {
        fase: 'Comprometido (90+)',
        cor: 'from-red-500 to-red-600',
        borderColor: 'border-red-500',
        icon: '🚀',
        count: activeOportunidades.filter(op => op.termometro >= 90 && op.resultadoOportunidade !== 'ganho').length,
        valor: activeOportunidades.filter(op => op.termometro >= 90 && op.resultadoOportunidade !== 'ganho').reduce((sum, op) => sum + op.valor, 0)
      },
      {
        fase: 'Conquistado (100)',
        cor: 'from-red-800 to-red-900',
        borderColor: 'border-red-800',
        icon: '🏆',
        count: activeOportunidades.filter(op => op.resultadoOportunidade === 'ganho').length,
        valor: activeOportunidades.filter(op => op.resultadoOportunidade === 'ganho').reduce((sum, op) => sum + op.valor, 0)
      }
    ];

    return funnelStages.map((stage, index) => ({
      ...stage,
      percentual: Math.max((stage.count / Math.max(funnelStages[0].count, 1)) * 100, 20)
    }));
  };

  const funnelData = calculateFunnelData();

  const conversaoUFData = [
    { uf: 'SP', conversao: 108.3 },
    { uf: 'RJ', conversao: 94.0 },
    { uf: 'CE', conversao: 82.5 },
    { uf: 'RN', conversao: 74.8 },
  ];

  const indicadores = {
    posicaoEstoque: [
      { produto: 'ABL800 Flex', quantidade: 12, localizacao: 'Galpão A' },
      { produto: 'Sensor pH', quantidade: 45, localizacao: 'Galpão B' },
      { produto: 'Gasômetro Stat Profile', quantidade: 3, localizacao: 'Galpão A' },
      { produto: 'Sistema WEBMED', quantidade: 8, localizacao: 'Digital' }
    ],
    importacaoPrevisao: [
      { item: 'ABL800 Basic', previsao: '15/02/2025', quantidade: 5, fornecedor: 'Radiometer' },
      { item: 'Nova Biomedical Kit', previsao: '28/02/2025', quantidade: 10, fornecedor: 'Nova Biomedical' },
      { item: 'Sensores Diversos', previsao: '10/03/2025', quantidade: 25, fornecedor: 'Multiple' }
    ],
    pedidosProgramados: [
      { cliente: 'Hospital Albert Einstein', data: '20/01/2025', valor: 890000, status: 'Confirmado' },
      { cliente: 'HUOL', data: '05/02/2025', valor: 450000, status: 'Pendente' },
      { cliente: 'CEMA', data: '15/02/2025', valor: 280000, status: 'Confirmado' }
    ],
    faturamentoProjeto: [
      { projeto: 'Radiometer ABL - Associação Pioneiras', valor: 782530, status: 'Faturado' },
      { projeto: 'Nova Biomedical - HUOL', valor: 450000, status: 'Em Processamento' },
      { projeto: 'WEBMED - CEMA', valor: 280000, status: 'Aguardando' }
    ],
    restricaoFinanceira: [
      { cliente: 'Prefeitura São Paulo', valor: 125000, motivo: 'Inadimplência', dias: 45 },
      { cliente: 'Hospital Regional CE', valor: 89000, motivo: 'Documentação Pendente', dias: 12 }
    ],
    pedidosSeparacao: [
      { pedido: 'PED-2025-001', cliente: 'Hospital Einstein', itens: 3, status: 'Em Separação' },
      { pedido: 'PED-2025-002', cliente: 'HUOL', itens: 5, status: 'Aguardando Peças' }
    ],
    pedidosDesmembramento: [
      { pedido: 'PED-2024-078', cliente: 'CEMA', original: 280000, desmembrado: 140000, motivo: 'Entrega Parcial' }
    ],
    posicaoPedidos: [
      { pedido: 'PED-2025-001', cliente: 'Hospital Einstein', status: 'Em Trânsito', previsao: '25/01/2025' },
      { pedido: 'PED-2024-089', cliente: 'Hospital Regional', status: 'Separado', previsao: '22/01/2025' }
    ],
    aguardandoAutorizacao: [
      { item: 'Desconto Especial - HUOL', valor: 50000, gestor: 'Carlos Oliveira', dias: 3 },
      { item: 'Prazo Estendido - Einstein', valor: 890000, gestor: 'Ana Costa', dias: 1 }
    ]
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'bg-green-500';
      case 'em_triagem': return 'bg-blue-500';
      case 'em_acompanhamento': return 'bg-orange-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getSituacaoLabel = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'Ganha';
      case 'em_triagem': return 'Em Triagem';
      case 'em_acompanhamento': return 'Em Acompanhamento';
      case 'perdida': return 'Perdida';
      case 'cancelada': return 'Cancelada';
      default: return situacao;
    }
  };

  const getTermometroColor = (termometro: number) => {
    if (termometro < 60) return 'bg-red-500';
    if (termometro < 80) return 'bg-yellow-500';
    if (termometro < 90) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const handleNovaOportunidade = (modalidade: 'licitacao' | 'contratacao_simples' | 'importacao_direta') => {
    setEditingOportunidade(undefined);
    
    if (modalidade === 'licitacao') {
      setShowOportunidadeAvancadaForm(true);
    } else if (modalidade === 'contratacao_simples') {
      setShowContratacaoSimplesForm(true);
    } else if (modalidade === 'importacao_direta') {
      setShowImportacaoDiretaForm(true);
    }
  };

  const handleEditOportunidade = (oportunidade: any) => {
    setEditingOportunidade(oportunidade);
    
    if (oportunidade.modalidade === 'licitacao') {
      setShowOportunidadeAvancadaForm(true);
    } else if (oportunidade.modalidade === 'contratacao_simples' || oportunidade.modalidade === 'comercial_administrativo') {
      setShowContratacaoSimplesForm(true);
    } else if (oportunidade.modalidade === 'importacao_direta') {
      setShowImportacaoDiretaForm(true);
    }
  };

  const handleSaveOportunidade = (formData: any) => {
    console.log('Salvando oportunidade:', formData);
    setShowOportunidadeAvancadaForm(false);
    setShowContratacaoSimplesForm(false);
    setShowImportacaoDiretaForm(false);
    setEditingOportunidade(undefined);
  };

  const handleGerarPedido = (oportunidade: any) => {
    if (oportunidade.status !== 'Ganha') {
      alert('Pedidos só podem ser gerados para oportunidades com status "Ganha"');
      return;
    }
    setSelectedOportunidade(oportunidade);
    setShowPedidoModal(true);
  };

  const handleAdicionarPedido = () => {
    setShowPedidoForm(true);
  };

  const handleSavePedido = (pedidoData: any) => {
    console.log('Salvando pedido:', pedidoData);
    setShowPedidoForm(false);
  };

  const getOportunidadesPorModalidade = (modalidade: string) => {
    return oportunidades.filter(oportunidade => {
      const oportunidadeModalidade = oportunidade.modalidade === 'comercial_administrativo' 
        ? 'contratacao_simples' 
        : oportunidade.modalidade;
      
      return oportunidadeModalidade === modalidade;
    });
  };

  const filteredOportunidades = (modalidade: string) => {
    const oportunidadesPorModalidade = getOportunidadesPorModalidade(modalidade);
    
    return oportunidadesPorModalidade.filter(oportunidade => {
      const matchesSearch = oportunidade.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oportunidade.codigo.includes(searchTerm) ||
        oportunidade.responsavel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'todos' || oportunidade.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const handleLicitacaoConvertida = (licitacaoData: any) => {
    console.log('Processando licitação convertida automaticamente:', licitacaoData);
    
    const novaOportunidade = {
      id: Date.now(),
      codigo: `LIC-${licitacaoData.numeroPregao}`,
      cliente: licitacaoData.nomeInstituicao,
      contato: licitacaoData.dataContato || '',
      responsavel: 'Sistema Automático',
      origem: `Licitação ${licitacaoData.numeroPregao}`,
      familiaComercial: 'Automático',
      situacao: 'ganha',
      status: 'Ganha',
      resultadoOportunidade: 'ganho',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: licitacaoData.estrategiaValorFinal || 0,
      dataAbertura: new Date().toISOString().split('T')[0],
      dataContato: new Date().toISOString().split('T')[0],
      termometro: 100,
      fonteLead: 'Licitação Convertida',
      segmento: 'Público',
      modalidade: 'comercial_administrativo',
      descricao: `Oportunidade criada automaticamente da licitação ${licitacaoData.numeroPregao} - ${licitacaoData.objetoLicitacao}`,
      produtos: [],
      servicos: []
    };

    console.log('Nova oportunidade criada:', novaOportunidade);
    alert(`Licitação convertida com sucesso! Uma nova oportunidade foi criada automaticamente no Comercial Administrativo.`);
  };

  const renderMainModules = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setActiveModule('vendas')}
        >
          <CardContent className="p-8 text-center">
            <ShoppingCart className="h-16 w-16 text-biodina-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-biodina-blue mb-2">Vendas</h3>
            <p className="text-gray-600">Gestão do processo comercial e oportunidades</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setActiveModule('emprestimos')}
        >
          <CardContent className="p-8 text-center">
            <HandCoins className="h-16 w-16 text-biodina-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-biodina-blue mb-2">Empréstimos</h3>
            <p className="text-gray-600">Gestão de empréstimos</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setActiveModule('assessoria')}
        >
          <CardContent className="p-8 text-center">
            <Target className="h-16 w-16 text-biodina-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-biodina-blue mb-2">Assessoria Científica</h3>
            <p className="text-gray-600">Suporte científico especializado</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setActiveModule('departamento-tecnico')}
        >
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-biodina-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-biodina-blue mb-2">Departamento Técnico</h3>
            <p className="text-gray-600">Suporte técnico e manutenção</p>
          </CardContent>
        </Card>

        {/* COMENTADO - NÃO USAR NO MOMENTO
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setActiveModule('assinaturas')}
        >
          <CardContent className="p-8 text-center">
            <FileSignature className="h-16 w-16 text-biodina-blue mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-biodina-blue mb-2">Assinaturas Digitais</h3>
            <p className="text-gray-600">Central de assinaturas e aprovações digitais</p>
          </CardContent>
        </Card>
        */}
      </div>

      {/* Agenda Comercial Section */}
      <div className="w-full">
        <AgendaComercial />
      </div>
    </div>
  );

  const renderAssessoriaModule = () => {
    return (
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
          <h2 className="text-2xl font-bold text-biodina-blue">Comercial / Assessoria Científica</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Módulo de Assessoria Científica em desenvolvimento</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDepartamentoTecnicoModule = () => {
    return (
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
          <h2 className="text-2xl font-bold text-biodina-blue">Comercial / Departamento Técnico</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Módulo de Departamento Técnico em desenvolvimento</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderVendasModule = () => {
    const tabs = [
      { id: 'indicadores', label: 'Indicadores Comerciais e Análise de Conversão', icon: BarChart3 },
      { id: 'licitacao', label: 'Licitação', icon: Gavel },
      { id: 'contratacao', label: 'Contratação', icon: Building2 },
      { id: 'importacao', label: 'Importação Direta', icon: Globe },
    ];

    const renderContent = () => {
      switch (activeTab) {
        case 'indicadores': return renderIndicadoresEAnalise();
        case 'licitacao': return renderOportunidadesPorModalidade('licitacao');
        case 'contratacao': return renderOportunidadesPorModalidade('contratacao_simples');
        case 'importacao': return renderOportunidadesPorModalidade('importacao_direta');
        default: return renderIndicadoresEAnalise();
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
          <h1 className="text-2xl font-bold text-biodina-blue">Comercial / Vendas</h1>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
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

  const renderEmprestimosModule = () => {
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
          <h1 className="text-2xl font-bold text-biodina-blue">Comercial / Empréstimos</h1>
        </div>

        <EmprestimosTable />
      </div>
    );
  };

  /* COMENTADO - NÃO USAR NO MOMENTO
  const renderAssinaturasModule = () => {
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
          <h1 className="text-2xl font-bold text-biodina-blue">Comercial / Assinaturas Digitais</h1>
        </div>

        <AssinaturasDigitaisView />
      </div>
    );
  };
  */

  const renderOportunidadesPorModalidade = (modalidade: string) => {
    const getModalidadeLabel = (modalidade: string) => {
      switch (modalidade) {
        case 'licitacao': return 'Licitação';
        case 'contratacao_simples': return 'Contratação';
        case 'importacao_direta': return 'Importação Direta';
        default: return modalidade;
      }
    };

    const getModalidadeIcon = (modalidade: string) => {
      switch (modalidade) {
        case 'licitacao': return Gavel;
        case 'contratacao_simples': return Building2;
        case 'importacao_direta': return Globe;
        default: return Briefcase;
      }
    };

    const Icon = getModalidadeIcon(modalidade);

    return (
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {getModalidadeLabel(modalidade)}
            </CardTitle>
            <div className="flex gap-2">
              {modalidade === 'importacao_direta' && (
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Modelo de Importação
                </Button>
              )}
              <Button 
                className="bg-biodina-gold hover:bg-biodina-gold/90"
                onClick={() => handleNovaOportunidade(modalidade as 'licitacao' | 'contratacao_simples' | 'importacao_direta')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Pesquisar oportunidades..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Em Triagem">Em Triagem</SelectItem>
                  <SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem>
                  <SelectItem value="Ganha">Ganha</SelectItem>
                  <SelectItem value="Perdida">Perdida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Termômetro</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOportunidades(modalidade).map((oportunidade) => (
                  <TableRow key={oportunidade.id}>
                    <TableCell className="font-medium">{oportunidade.codigo}</TableCell>
                    <TableCell>{oportunidade.cliente}</TableCell>
                    <TableCell>{oportunidade.responsavel}</TableCell>
                    <TableCell>
                      <Badge className={`${getSituacaoColor(oportunidade.situacao)} text-white`}>
                        {oportunidade.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{oportunidade.fonteLead}</TableCell>
                    <TableCell>{oportunidade.segmento}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4" />
                          <span className="text-sm font-medium">{oportunidade.termometro}°</span>
                        </div>
                        <div 
                          className={`w-3 h-3 rounded-full ${getTermometroColor(oportunidade.termometro)}`}
                          title={`Termômetro: ${oportunidade.termometro}°`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(oportunidade.valor)}</TableCell>
                    <TableCell>{oportunidade.dataAbertura}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditOportunidade(oportunidade)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleGerarPedido(oportunidade)}
                          disabled={oportunidade.status !== 'Ganha'}
                          title={oportunidade.status !== 'Ganha' ? 'Pedidos só podem ser gerados para oportunidades ganhas' : 'Gerar pedido'}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderIndicadoresEAnalise = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Indicadores Comerciais Card */}
      <Card className="shadow-lg h-[600px] flex flex-col xl:col-span-1">
        <CardHeader className="pb-4 flex-shrink-0">
          <CardTitle className="flex items-center gap-2 text-biodina-blue text-lg">
            <BarChart3 className="h-5 w-5" />
            Indicadores Comerciais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-700 mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              POSIÇÃO DE ESTOQUE
            </h4>
            <div className="space-y-2">
              {indicadores.posicaoEstoque.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.produto}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {item.quantidade} un.
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-orange-700 mb-2 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              IMPORTAÇÃO PREVISÃO
            </h4>
            <div className="space-y-2">
              {indicadores.importacaoPrevisao.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.item}</span>
                  <span className="text-xs text-orange-600 font-medium">{item.previsao}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              PEDIDOS PROGRAMADOS
            </h4>
            <div className="space-y-2">
              {indicadores.pedidosProgramados.slice(0, 2).map((item, index) => (
                <div key={index} className="bg-white p-2 rounded-md shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">{item.cliente}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(item.valor)}</div>
                      <div className="text-xs text-gray-500">{item.data}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              RESTRIÇÃO FINANCEIRA
            </h4>
            <div className="space-y-2">
              {indicadores.restricaoFinanceira.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.cliente}</span>
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                    {item.dias} dias
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-yellow-700 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              AGUARDANDO AUTORIZAÇÃO
            </h4>
            <div className="space-y-2">
              {indicadores.aguardandoAutorizacao.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.item}</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {item.dias} dias
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversão por UF Chart */}
      <Card className="shadow-lg xl:col-span-1">
        <CardHeader>
          <CardTitle>Conversão por UF</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversaoUFData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="uf" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
              <Bar dataKey="conversao" fill="#0A2342" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribuição por Situação Chart */}
      <Card className="shadow-lg xl:col-span-1">
        <CardHeader>
          <CardTitle>Distribuição por Situação</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Ganha', value: 1, fill: '#22c55e' },
                  { name: 'Em Triagem', value: 1, fill: '#3b82f6' },
                  { name: 'Em Acompanhamento', value: 1, fill: '#f97316' },
                  { name: 'Perdida', value: 1, fill: '#ef4444' }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderAgenda = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* <AgendaComercial /> */} {/* Commented out AgendaComercial component for future use */}

      <Card className="shadow-lg h-[600px] flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <CardTitle className="flex items-center gap-2 text-biodina-blue text-lg">
            <BarChart3 className="h-5 w-5" />
            Indicadores Comerciais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 flex-1 overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-blue-700 mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              POSIÇÃO DE ESTOQUE
            </h4>
            <div className="space-y-2">
              {indicadores.posicaoEstoque.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.produto}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {item.quantidade} un.
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-orange-700 mb-2 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              IMPORTAÇÃO PREVISÃO
            </h4>
            <div className="space-y-2">
              {indicadores.importacaoPrevisao.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.item}</span>
                  <span className="text-xs text-orange-600 font-medium">{item.previsao}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-green-700 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              PEDIDOS PROGRAMADOS
            </h4>
            <div className="space-y-2">
              {indicadores.pedidosProgramados.slice(0, 2).map((item, index) => (
                <div key={index} className="bg-white p-2 rounded-md shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-700">{item.cliente}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(item.valor)}</div>
                      <div className="text-xs text-gray-500">{item.data}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-red-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              RESTRIÇÃO FINANCEIRA
            </h4>
            <div className="space-y-2">
              {indicadores.restricaoFinanceira.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.cliente}</span>
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                    {item.dias} dias
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg">
            <h4 className="font-semibold text-sm text-yellow-700 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              AGUARDANDO AUTORIZAÇÃO
            </h4>
            <div className="space-y-2">
              {indicadores.aguardandoAutorizacao.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                  <span className="text-sm font-medium text-gray-700">{item.item}</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {item.dias} dias
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarLayout>
      <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
        {activeModule === 'main' && (
          <header className="mb-4">
            <h1 className="text-2xl font-bold text-biodina-blue mb-1">Comercial</h1>
            <p className="text-gray-600 text-sm">Gestão completa do processo comercial</p>
          </header>
        )}

        {activeModule === 'main' && renderMainModules()}
        {activeModule === 'vendas' && renderVendasModule()}
        {activeModule === 'emprestimos' && renderEmprestimosModule()}
        {activeModule === 'assessoria' && renderAssessoriaModule()}
        {activeModule === 'departamento-tecnico' && renderDepartamentoTecnicoModule()}
        {/* activeModule === 'assinaturas' && renderAssinaturasModule() */} {/* COMENTADO - NÃO USAR NO MOMENTO */}
      </div>

      {showOportunidadeAvancadaForm && (
        <OportunidadeAvancadaForm
          isOpen={showOportunidadeAvancadaForm}
          oportunidade={editingOportunidade}
          onClose={() => {
            setShowOportunidadeAvancadaForm(false);
            setEditingOportunidade(undefined);
          }}
          onSave={(data) => {
            if (data.status === 'convertida') {
              handleLicitacaoConvertida(data);
            }
            handleSaveOportunidade(data);
          }}
        />
      )}

      {showContratacaoSimplesForm && (
        <ContratacaoSimplesForm
          isOpen={showContratacaoSimplesForm}
          oportunidade={editingOportunidade}
          onClose={() => {
            setShowContratacaoSimplesForm(false);
            setEditingOportunidade(undefined);
          }}
          onSave={handleSaveOportunidade}
        />
      )}

      {showImportacaoDiretaForm && (
        <ImportacaoDiretaForm
          isOpen={showImportacaoDiretaForm}
          oportunidade={editingOportunidade}
          onClose={() => {
            setShowImportacaoDiretaForm(false);
            setEditingOportunidade(undefined);
          }}
          onSave={handleSaveOportunidade}
        />
      )}

      {showPedidoModal && selectedOportunidade && (
        <PedidoModal
          isOpen={showPedidoModal}
          oportunidade={selectedOportunidade}
          onClose={() => {
            setShowPedidoModal(false);
            setSelectedOportunidade(undefined);
          }}
          onSave={(pedido) => {
            console.log('Salvando pedido:', pedido);
            setShowPedidoModal(false);
            setSelectedOportunidade(undefined);
          }}
        />
      )}

      {showPedidoForm && (
        <PedidoForm
          onClose={() => setShowPedidoForm(false)}
          onSave={handleSavePedido}
        />
      )}
    </SidebarLayout>
  );
};

export default Comercial;
