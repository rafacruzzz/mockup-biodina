import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Save, Plus, Edit, Upload, Download, Eye, Calendar, AlertTriangle, CheckCircle2, XCircle, Scale, FlaskConical, BarChart3, Briefcase, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";
import PedidoForm from "./PedidoForm";
import CustomAlertModal from "./components/CustomAlertModal";
import EmpresaParticipanteSelect from "./EmpresaParticipanteSelect";
import AprovacaoEmpresaModal from "./AprovacaoEmpresaModal";
import { concorrentes as mockConcorrentes, pedidos as mockPedidos } from "@/data/licitacaoMockData";
import { licitacoes } from "@/data/licitacaoData";
import { AprovacaoEmpresa } from "@/types/licitacao";
import { formatCurrency, getTermometroColor, getTermometroStage, getRankingColor, getAtendeEditalBadge } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { PedidoCompleto } from "@/types/comercial";
import { useEmpresa } from "@/contexts/EmpresaContext";

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

// Tipo para licitantes
interface LicitanteItem {
  id: number;
  empresa: string;
  objeto?: string;
  marca: string;
  modelo: string;
  valorUnitario: number;
  quantidade: number;
  valorFinal: number;
  atendeEdital: boolean;
  ranking: number;
  status: 'habilitado' | 'inabilitado' | 'desclassificado' | 'vencedor' | 'adjudicada' | 'aceita_habilitada' | 'homologada';
}

// Tipo para tabela de licitantes
interface TabelaLicitantes {
  id: number;
  numero: number;
  titulo: string;
  licitantes: LicitanteItem[];
}


const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const { toast } = useToast();
  
  const { empresaAtual, filialAtual } = useEmpresa();
  
  // Empresa ativa é a filial se logado em uma filial, senão é a principal
  const empresaAtivaId = filialAtual?.id || empresaAtual?.id || '';
  const [activeTab, setActiveTab] = useState('dados-gerais');
  
  // Funções auxiliares para status de licitantes
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'habilitado': return 'bg-blue-500 text-white';
      case 'inabilitado': return 'bg-red-500 text-white';
      case 'desclassificado': return 'bg-gray-500 text-white';
      case 'vencedor': return 'bg-green-500 text-white';
      case 'adjudicada': return 'bg-purple-500 text-white';
      case 'aceita_habilitada': return 'bg-teal-500 text-white';
      case 'homologada': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      habilitado: 'Habilitado',
      inabilitado: 'Inabilitado',
      desclassificado: 'Desclassificado',
      vencedor: 'Vencedor',
      adjudicada: 'Adjudicada',
      aceita_habilitada: 'Aceita e Habilitada',
      homologada: 'Homologada'
    };
    return labels[status] || status;
  };
  const [showEmprestimoAlert, setShowEmprestimoAlert] = useState(false);
  
  // Estados de solicitação
  const [solicitouEsclarecimento, setSolicitouEsclarecimento] = useState(false);
  const [solicitouImpugnacao, setSolicitouImpugnacao] = useState(false);
  const [solicitouAnaliseCientifica, setSolicitouAnaliseCientifica] = useState(false);
  const [solicitouAnaliseGerencial, setSolicitouAnaliseGerencial] = useState(false);
  const [solicitouRecurso, setSolicitouRecurso] = useState(false);
  const [solicitouRecursoConcorrente, setSolicitouRecursoConcorrente] = useState(false);
  
  // Estados para modais
  const [showLicitacaoModal, setShowLicitacaoModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [showLicitanteModal, setShowLicitanteModal] = useState(false);
  const [showAprovacaoEmpresaModal, setShowAprovacaoEmpresaModal] = useState(false);
  
  // Estados para empresa participante 1
  const [empresaParticipante, setEmpresaParticipante] = useState({
    empresaParticipanteId: oportunidade?.empresaParticipanteId || '',
    empresaParticipanteNome: oportunidade?.empresaParticipanteNome || '',
    empresaParticipanteCNPJ: oportunidade?.empresaParticipanteCNPJ || ''
  });
  const [aprovacaoEmpresa, setAprovacaoEmpresa] = useState<AprovacaoEmpresa | undefined>(
    oportunidade?.aprovacaoEmpresa
  );
  
  // Estados para empresa participante 2 (segunda empresa)
  const [empresaParticipante2, setEmpresaParticipante2] = useState({
    empresaParticipanteId: oportunidade?.empresaParticipanteId2 || '',
    empresaParticipanteNome: oportunidade?.empresaParticipanteNome2 || '',
    empresaParticipanteCNPJ: oportunidade?.empresaParticipanteCNPJ2 || ''
  });
  const [aprovacaoEmpresa2, setAprovacaoEmpresa2] = useState<AprovacaoEmpresa | undefined>(
    oportunidade?.aprovacaoEmpresa2
  );
  
  // Estado para múltiplas tabelas de licitantes (inicia com uma tabela padrão)
  const [tabelasLicitantes, setTabelasLicitantes] = useState<TabelaLicitantes[]>([
    { id: 1, numero: 1, titulo: 'Tabela de Licitantes 1', licitantes: [] }
  ]);
  
  
  // Estado para rastrear qual tabela está recebendo o novo licitante
  const [tabelaAtiva, setTabelaAtiva] = useState<number | null>(null);
  
  // Estado para novo licitante
  const [novoLicitante, setNovoLicitante] = useState({
    empresa: '',
    objeto: '',
    marca: '',
    modelo: '',
    valorUnitario: 0,
    quantidade: 1,
    atendeEdital: true,
    ranking: 1,
    status: 'habilitado' as LicitanteItem['status']
  });
  
  // Estados para dados
  const [concorrentes, setConcorrentes] = useState([
    { 
      id: 1, 
      nome: 'MedTech SA',
      marcaModelo: 'ABL800 Flex',
      comparativo: 'Equipamento com boa precisão, porém com custo operacional mais alto devido aos reagentes.',
      atendeEdital: 'sim'
    },
    { 
      id: 2, 
      nome: 'Global Diagnóstico',
      marcaModelo: 'GEM Premier 4000',
      comparativo: 'Solução robusta mas com interface menos intuitiva comparada ao nosso produto.',
      atendeEdital: 'nao'
    }
  ]);

  const [pedidos, setPedidos] = useState([
    { 
      id: 1, 
      codigo: 'PED-001', 
      cliente: 'Associação das Pioneiras Sociais',
      dataGeracao: '2024-03-20',
      situacao: 'Em Aberto',
      valor: 782530
    }
  ]);

  const [formData, setFormData] = useState({
    // Empresa - automaticamente definida pela empresa logada
    empresaId: oportunidade?.empresaId || empresaAtivaId,
    cliente: oportunidade?.cliente || '',
    cpfCnpj: oportunidade?.cpfCnpj || '',
    descricao: oportunidade?.descricao || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [],
    analiseTecnica: oportunidade?.analiseTecnica || '',
    termometro: oportunidade?.termometro || 50,
    resultadoOportunidade: oportunidade?.resultadoOportunidade || 'em_andamento',
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    
    // Campos específicos para Licitação
    dataLicitacao: oportunidade?.dataLicitacao || '',
    resumoEdital: oportunidade?.resumoEdital || '',
    impugnacaoEdital: oportunidade?.impugnacaoEdital || '',
    valorMinimoFinal: oportunidade?.valorMinimoFinal || 0,
    valorMinimoFinal2: oportunidade?.valorMinimoFinal2 || 0, // Valor mínimo para segunda empresa
    participantes: oportunidade?.participantes || [],
    
    // Campos adicionais da licitação
    naturezaOperacao: oportunidade?.naturezaOperacao || '',
    numeroPregao: oportunidade?.numeroPregao || '',
    numeroProcesso: oportunidade?.numeroProcesso || '',
    numeroUasg: oportunidade?.numeroUasg || '',
    qualSite: oportunidade?.qualSite || '',
    permiteAdesao: oportunidade?.permiteAdesao || '',
    observacoesAdesao: oportunidade?.observacoesAdesao || '',
    produtos: oportunidade?.produtos?.length ? oportunidade.produtos : [{ id: crypto.randomUUID(), produto: '', valorEstimado: 0 }],
    quantidadeEquipamentos: oportunidade?.quantidadeEquipamentos || 0,
    quantidadeExames: oportunidade?.quantidadeExames || 0,
    haviaContratoAnterior: oportunidade?.haviaContratoAnterior || '',
    marcaModeloAnterior: oportunidade?.marcaModeloAnterior || '',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    dataAssinaturaAta: oportunidade?.dataAssinaturaAta || '',
    analiseEstrategia: oportunidade?.analiseEstrategia || '',
    manifestacaoRecorrer: oportunidade?.manifestacaoRecorrer || '',
    pedidoEsclarecimento: oportunidade?.pedidoEsclarecimento || '',
    recursoConcorrente: oportunidade?.recursoConcorrente || '',
    contrarrazoes: oportunidade?.contrarrazoes || '',
    motivosFracasso: oportunidade?.motivosFracasso || '',
    observacaoGeral: oportunidade?.observacaoGeral || '',
    
    // Novos campos da participação
    estrategiaParticipacao: oportunidade?.estrategiaParticipacao || '',
    planejamentoComercial: oportunidade?.planejamentoComercial || '',
    
    // Campo para solicitação de análise técnica
    solicitarAnaliseTecnica: oportunidade?.solicitarAnaliseTecnica || false,
    
    // Campos da Análise Gerencial (AG)
    estrategiaComercialAG: oportunidade?.estrategiaComercialAG || '',
    valorEntradaAG: oportunidade?.valorEntradaAG || 0,
    valorLimiteAG: oportunidade?.valorLimiteAG || 0,
    
  });

  // Estado para histórico de análises científicas versionadas
  const [historicoAnalisesCientificas, setHistoricoAnalisesCientificas] = useState<Array<{id: number; texto: string; data: string; numero: number}>>(
    oportunidade?.historicoAnalisesCientificas || []
  );


  const handleAtualizarTituloTabela = (tabelaId: number, novoTitulo: string) => {
    setTabelasLicitantes(tabelasLicitantes.map(tabela =>
      tabela.id === tabelaId ? { ...tabela, titulo: novoTitulo } : tabela
    ));
  };

  const isStatusPerdida = () => {
    return formData.resultadoOportunidade === 'perda';
  };

  const canShowPedidos = () => {
    return formData.resultadoOportunidade === 'ganho';
  };

  const isReadOnlyMode = () => {
    return isStatusPerdida();
  };

  const handleNaturezaOperacaoChange = (value: string) => {
    if (value === 'emprestimo') {
      setShowEmprestimoAlert(true);
    }
    setFormData({...formData, naturezaOperacao: value});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({...formData, [field]: value});
  };

  const handleSolicitarAnaliseTecnica = (checked: boolean) => {
    setFormData({...formData, solicitarAnaliseTecnica: checked});
    
    if (checked) {
      toast({
        title: "Solicitação enviada",
        description: "Os responsáveis pela análise técnica foram notificados para preencherem os campos necessários na aba 'Análise Técnica'.",
      });
    } else {
      toast({
        title: "Solicitação cancelada",
        description: "A solicitação de análise técnica foi cancelada.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação: empresa participante obrigatória
    if (!empresaParticipante.empresaParticipanteId) {
      toast({
        title: "Campo obrigatório",
        description: "Selecione a empresa participante da licitação antes de salvar.",
        variant: "destructive"
      });
      return;
    }
    
    onSave({ 
      ...formData, 
      tabelasLicitantes,
      ...empresaParticipante,
      aprovacaoEmpresa,
      empresaParticipanteId2: empresaParticipante2.empresaParticipanteId,
      empresaParticipanteNome2: empresaParticipante2.empresaParticipanteNome,
      empresaParticipanteCNPJ2: empresaParticipante2.empresaParticipanteCNPJ,
      aprovacaoEmpresa2
    });
  };
  
  const handleEmpresaParticipanteChange = (data: {
    empresaParticipanteId: string;
    empresaParticipanteNome: string;
    empresaParticipanteCNPJ: string;
  }) => {
    setEmpresaParticipante(data);
    // Resetar aprovação quando muda a empresa
    setAprovacaoEmpresa(undefined);
  };
  
  const handleSolicitarAprovacao = () => {
    setAprovacaoEmpresa({
      status: 'pendente',
      observacao: 'Aguardando aprovação gerencial'
    });
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de aprovação foi enviada ao gestor comercial.",
    });
  };
  
  const handleAprovacaoEmpresa = (aprovacao: AprovacaoEmpresa) => {
    setAprovacaoEmpresa(aprovacao);
  };
  
  // Handlers para segunda empresa
  const handleEmpresaParticipante2Change = (data: {
    empresaParticipanteId: string;
    empresaParticipanteNome: string;
    empresaParticipanteCNPJ: string;
  }) => {
    setEmpresaParticipante2(data);
    setAprovacaoEmpresa2(undefined);
  };
  
  const handleSolicitarAprovacao2 = () => {
    setAprovacaoEmpresa2({
      status: 'pendente',
      observacao: 'Aguardando aprovação gerencial'
    });
    toast({
      title: "Solicitação enviada",
      description: "A solicitação de aprovação da segunda empresa foi enviada ao gestor comercial.",
    });
  };
  
  const handleAprovacaoEmpresa2 = (aprovacao: AprovacaoEmpresa) => {
    setAprovacaoEmpresa2(aprovacao);
  };
  
  // Verifica se pode avançar para fase de proposta
  const canAdvanceToProposal = () => {
    return empresaParticipante.empresaParticipanteId && 
           aprovacaoEmpresa?.status === 'aprovado';
  };

  const handleAdicionarTabela = () => {
    const proximoNumero = tabelasLicitantes.length > 0 
      ? Math.max(...tabelasLicitantes.map(t => t.numero)) + 1 
      : 1;
    
    setTabelasLicitantes([
      ...tabelasLicitantes,
      { id: Date.now(), numero: proximoNumero, titulo: `Tabela de Licitantes ${proximoNumero}`, licitantes: [] }
    ]);
    
    toast({
      title: "Tabela adicionada",
      description: `Tabela de Licitantes ${proximoNumero} criada com sucesso.`
    });
  };

  const handleExcluirTabela = (tabelaId: number) => {
    if (tabelasLicitantes.length === 1) {
      toast({
        title: "Não é possível excluir",
        description: "É necessário manter pelo menos uma tabela de licitantes.",
        variant: "destructive"
      });
      return;
    }
    
    setTabelasLicitantes(tabelasLicitantes.filter(t => t.id !== tabelaId));
    
    toast({
      title: "Tabela excluída",
      description: "Tabela de licitantes removida com sucesso."
    });
  };

  const handleAbrirModalLicitante = (tabelaId: number) => {
    setTabelaAtiva(tabelaId);
    setShowLicitanteModal(true);
  };

  const handleAdicionarLicitante = () => {
    if (!novoLicitante.empresa || !novoLicitante.marca || !novoLicitante.modelo) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha Empresa, Marca e Modelo.",
        variant: "destructive"
      });
      return;
    }
    
    if (!tabelaAtiva) {
      toast({
        title: "Erro",
        description: "Nenhuma tabela selecionada.",
        variant: "destructive"
      });
      return;
    }
    
    const valorFinal = novoLicitante.valorUnitario * novoLicitante.quantidade;
    
    const licitante: LicitanteItem = {
      id: Date.now(),
      empresa: novoLicitante.empresa,
      marca: novoLicitante.marca,
      modelo: novoLicitante.modelo,
      valorUnitario: novoLicitante.valorUnitario,
      quantidade: novoLicitante.quantidade,
      valorFinal,
      atendeEdital: novoLicitante.atendeEdital,
      ranking: novoLicitante.ranking,
      status: novoLicitante.status
    };
    
    setTabelasLicitantes(tabelasLicitantes.map(tabela => 
      tabela.id === tabelaAtiva 
        ? { ...tabela, licitantes: [...tabela.licitantes, licitante] }
        : tabela
    ));
    
    setNovoLicitante({
      empresa: '',
      objeto: '',
      marca: '',
      modelo: '',
      valorUnitario: 0,
      quantidade: 1,
      atendeEdital: true,
      ranking: 1,
      status: 'habilitado'
    });
    setShowLicitanteModal(false);
    setTabelaAtiva(null);
    
    toast({
      title: "Licitante adicionado",
      description: "Licitante cadastrado com sucesso."
    });
  };

  const handleExcluirLicitante = (tabelaId: number, licitanteId: number) => {
    setTabelasLicitantes(tabelasLicitantes.map(tabela => 
      tabela.id === tabelaId 
        ? { ...tabela, licitantes: tabela.licitantes.filter(l => l.id !== licitanteId) }
        : tabela
    ));
    
    toast({
      title: "Licitante excluído",
      description: "Licitante removido com sucesso."
    });
  };

  const handleSalvarPedido = (pedidoData: any) => {
    const novoPedido = {
      id: Date.now(),
      codigo: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
      cliente: formData.cliente || 'Cliente',
      dataGeracao: new Date().toISOString().split('T')[0],
      situacao: 'Em Aberto',
      valor: pedidoData.produtos?.reduce((sum: number, prod: any) => sum + (prod.valorTotal || 0), 0) || 0
    };
    setPedidos([...pedidos, novoPedido]);
    setShowPedidoForm(false);
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderDadosGerais = () => (
    <div className="space-y-6">
      {/* Dados Específicos da Licitação */}
      <div className="border rounded-lg p-4 space-y-4 bg-yellow-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Dados Específicos da Licitação
        </h3>
        
        {/* Situação/Status do Pregão - PRIMEIRO CAMPO */}
        <div>
          <Label htmlFor="situacaoPregao" className="text-base font-semibold">Situação/Status do Pregão *</Label>
          <Select 
            value={formData.situacaoPregao} 
            onValueChange={(value) => setFormData({...formData, situacaoPregao: value})}
            disabled={isReadOnlyMode()}
          >
            <SelectTrigger className="border-2 border-primary/30">
              <SelectValue placeholder="Selecione a situação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cadastro_proposta">Cadastro de proposta</SelectItem>
              <SelectItem value="em_analise">Em análise</SelectItem>
              <SelectItem value="etapa_lances">Etapa de lances</SelectItem>
              <SelectItem value="visualizacao_propostas">Visualização de Propostas</SelectItem>
              <SelectItem value="aceitacao_propostas">Aceitação de Propostas</SelectItem>
              <SelectItem value="habilitacao_fornecedores">Habilitação de Fornecedores</SelectItem>
              <SelectItem value="negociacao_preco">Negociação de Preço</SelectItem>
              <SelectItem value="recursos">Recursos</SelectItem>
              <SelectItem value="suspenso">Suspenso</SelectItem>
              <SelectItem value="adjudicacao">Adjudicação</SelectItem>
              <SelectItem value="homologacao">Homologação</SelectItem>
              <SelectItem value="ata_contrato">Ata/Contrato</SelectItem>
              <SelectItem value="empenho">Empenho</SelectItem>
            </SelectContent>
          </Select>
        </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dataLicitacao">Data da Licitação</Label>
            <Input
              id="dataLicitacao"
              type="date"
              value={formData.dataLicitacao}
              onChange={(e) => handleInputChange('dataLicitacao', e.target.value)}
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="naturezaOperacao">Qual Natureza da Operação</Label>
            <Select 
              value={formData.naturezaOperacao} 
              onValueChange={handleNaturezaOperacaoChange}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amostra">AMOSTRA</SelectItem>
                <SelectItem value="comodato">COMODATO</SelectItem>
                <SelectItem value="conserto">CONSERTO</SelectItem>
                <SelectItem value="consignacao">CONSIGNAÇÃO</SelectItem>
                <SelectItem value="demonstracao">DEMONSTRAÇÃO</SelectItem>
                <SelectItem value="doacao">DOAÇÃO</SelectItem>
                <SelectItem value="emprestimo">EMPRÉSTIMO</SelectItem>
                <SelectItem value="exposicao">EXPOSIÇÃO</SelectItem>
                <SelectItem value="importacao">IMPORTAÇÃO</SelectItem>
                <SelectItem value="locacao">LOCAÇÃO</SelectItem>
                <SelectItem value="logistica">LOGÍSTICA</SelectItem>
                <SelectItem value="mostruario">MOSTRUÁRIO</SelectItem>
                <SelectItem value="simples_remessa">SIMPLES REMESSA</SelectItem>
                <SelectItem value="treinamento">TREINAMENTO</SelectItem>
                <SelectItem value="vendas">VENDAS</SelectItem>
                <SelectItem value="outras">OUTRAS</SelectItem>
                <SelectItem value="troca">TROCA</SelectItem>
                <SelectItem value="perda">PERDA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="numeroPregao">Nº Pregão / INEX / ATA / SRP</Label>
            <Input
              id="numeroPregao"
              value={formData.numeroPregao}
              onChange={(e) => setFormData({...formData, numeroPregao: e.target.value})}
              placeholder="Ex: PE 001/2024"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="numeroProcesso">Nº Processo</Label>
            <Input
              id="numeroProcesso"
              value={formData.numeroProcesso}
              onChange={(e) => setFormData({...formData, numeroProcesso: e.target.value})}
              placeholder="Ex: 23038.000001/2024-00"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="numeroUasg">Nº UASG</Label>
            <Input
              id="numeroUasg"
              value={formData.numeroUasg}
              onChange={(e) => setFormData({...formData, numeroUasg: e.target.value})}
              placeholder="Ex: 123456"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="qualSite">Qual Site?</Label>
            <Input
              id="qualSite"
              value={formData.qualSite}
              onChange={(e) => setFormData({...formData, qualSite: e.target.value})}
              placeholder="https://..."
              disabled={isReadOnlyMode()}
            />
          </div>
        </div>

        <div>
          <Label>Permite Adesão?</Label>
          <RadioGroup 
            value={formData.permiteAdesao} 
            onValueChange={(value) => setFormData({...formData, permiteAdesao: value})}
            disabled={isReadOnlyMode()}
            className="flex flex-row space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="adesao-sim" />
              <Label htmlFor="adesao-sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="adesao-nao" />
              <Label htmlFor="adesao-nao">Não</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao-menciona" id="adesao-nao-menciona" />
              <Label htmlFor="adesao-nao-menciona">Não menciona</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.permiteAdesao === 'sim' && (
          <div>
            <Label htmlFor="observacoesAdesao">Observações (Adesão)</Label>
            <Textarea
              id="observacoesAdesao"
              value={formData.observacoesAdesao}
              onChange={(e) => setFormData({...formData, observacoesAdesao: e.target.value})}
              placeholder="Observações sobre a adesão"
              rows={3}
              disabled={isReadOnlyMode()}
            />
          </div>
        )}

        <div className="space-y-3">
          <Label>Produtos</Label>
          {formData.produtos.map((item, index) => (
            <div key={item.id} className="flex items-end gap-3">
              <div className="flex-1">
                {index === 0 && <Label className="text-xs text-muted-foreground mb-1">Produto</Label>}
                <Select 
                  value={item.produto} 
                  onValueChange={(value) => {
                    const updated = [...formData.produtos];
                    updated[index] = { ...updated[index], produto: value };
                    setFormData({...formData, produtos: updated});
                  }}
                  disabled={isReadOnlyMode()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione do cadastro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abl800">ABL800 Flex</SelectItem>
                    <SelectItem value="gasometro">Gasômetro</SelectItem>
                    <SelectItem value="sistema">Sistema WEBMED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-36">
                {index === 0 && <Label className="text-xs text-muted-foreground mb-1">Valor Estimado</Label>}
                <Input
                  type="number"
                  step="0.01"
                  value={item.valorEstimado}
                  onChange={(e) => {
                    const updated = [...formData.produtos];
                    updated[index] = { ...updated[index], valorEstimado: Number(e.target.value) };
                    setFormData({...formData, produtos: updated});
                  }}
                  placeholder="0,00"
                  disabled={isReadOnlyMode()}
                />
              </div>
              <div className="w-40">
                {index === 0 && <Label className="text-xs text-muted-foreground mb-1">Qtd Equip. / Total Est.</Label>}
                <Input
                  type="number"
                  value={item.quantidadeEquipamentos || 0}
                  onChange={(e) => {
                    const updated = [...formData.produtos];
                    updated[index] = { ...updated[index], quantidadeEquipamentos: Number(e.target.value) };
                    setFormData({...formData, produtos: updated});
                  }}
                  placeholder="0"
                  disabled={isReadOnlyMode()}
                />
              </div>
              <div className="w-40">
                {index === 0 && <Label className="text-xs text-muted-foreground mb-1">Qtd Exames / Total Est.</Label>}
                <Input
                  type="number"
                  value={item.quantidadeExames || 0}
                  onChange={(e) => {
                    const updated = [...formData.produtos];
                    updated[index] = { ...updated[index], quantidadeExames: Number(e.target.value) };
                    setFormData({...formData, produtos: updated});
                  }}
                  placeholder="0"
                  disabled={isReadOnlyMode()}
                />
              </div>
              {formData.produtos.length > 1 && !isReadOnlyMode() && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 shrink-0 text-destructive hover:text-destructive/80"
                  onClick={() => {
                    const updated = formData.produtos.filter((_, i) => i !== index);
                    setFormData({...formData, produtos: updated});
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          {!isReadOnlyMode() && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFormData({
                  ...formData,
                  produtos: [...formData.produtos, { id: crypto.randomUUID(), produto: '', valorEstimado: 0, quantidadeEquipamentos: 0, quantidadeExames: 0 }]
                });
              }}
              className="mt-1"
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Produto
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="haviaContratoAnterior">Fornecedor anterior?</Label>
          <RadioGroup 
            value={formData.haviaContratoAnterior} 
            onValueChange={(value) => setFormData({...formData, haviaContratoAnterior: value})}
            disabled={isReadOnlyMode()}
            className="flex flex-row space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="contrato-sim" />
              <Label htmlFor="contrato-sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="contrato-nao" />
              <Label htmlFor="contrato-nao">Não</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.haviaContratoAnterior === 'sim' && (
          <div>
            <Label htmlFor="marcaModeloAnterior">Qual o Fornecedor Anterior?</Label>
            <Input
              id="marcaModeloAnterior"
              value={formData.marcaModeloAnterior}
              onChange={(e) => setFormData({...formData, marcaModeloAnterior: e.target.value})}
              placeholder="Ex: Empresa XYZ Ltda"
              disabled={isReadOnlyMode()}
            />
          </div>
        )}


        <div>
          <Label htmlFor="dataAssinaturaAta">Data da Assinatura e Envio da ATA</Label>
          <Input
            id="dataAssinaturaAta"
            type="date"
            value={formData.dataAssinaturaAta}
            onChange={(e) => setFormData({...formData, dataAssinaturaAta: e.target.value})}
            disabled={isReadOnlyMode()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resumoEdital">Resumo do Edital</Label>
          <RichTextEditor
            content={formData.resumoEdital}
            onChange={(html) => setFormData({ ...formData, resumoEdital: html })}
            placeholder="Descreva o resumo do edital..."
            disabled={isReadOnlyMode()}
          />
        </div>

        {/* Botões de Solicitação */}
        <div className="flex gap-3 flex-wrap">
          <Button
            variant={solicitouAnaliseCientifica ? "secondary" : "outline"}
            onClick={() => {
              setSolicitouAnaliseCientifica(true);
              // Persistir no mock data para que a Assessoria Científica veja
              if (oportunidade?.id) {
                const lic = licitacoes.find(l => l.id === oportunidade.id);
                if (lic) {
                  lic.solicitouAnaliseCientifica = true;
                  lic.dataSolicitacaoAC = new Date().toISOString().split('T')[0];
                }
              }
              toast({ title: "Solicitação enviada", description: "Análise da Assessoria Científica solicitada com sucesso." });
            }}
            disabled={isReadOnlyMode() || solicitouAnaliseCientifica}
            className="gap-2"
          >
            <FlaskConical className="h-4 w-4" />
            {solicitouAnaliseCientifica ? "✓ Análise Científica Solicitada" : "Solicitar Análise da Assessoria Científica"}
          </Button>
          <Button
            variant={solicitouEsclarecimento ? "secondary" : "outline"}
            onClick={() => {
              setSolicitouEsclarecimento(true);
              toast({ title: "Solicitação enviada", description: "Pedido de Esclarecimento enviado à Análise Jurídica." });
            }}
            disabled={isReadOnlyMode() || solicitouEsclarecimento}
            className="gap-2"
          >
            <Scale className="h-4 w-4" />
            {solicitouEsclarecimento ? "✓ Esclarecimento Solicitado" : "Solicitar Análise Jurídica - Pedido de Esclarecimento"}
          </Button>
          <Button
            variant={solicitouImpugnacao ? "secondary" : "outline"}
            onClick={() => {
              setSolicitouImpugnacao(true);
              toast({ title: "Solicitação enviada", description: "Impugnação do Edital enviada à Análise Jurídica." });
            }}
            disabled={isReadOnlyMode() || solicitouImpugnacao}
            className="gap-2"
          >
            <Scale className="h-4 w-4" />
            {solicitouImpugnacao ? "✓ Impugnação Solicitada" : "Solicitar Análise Jurídica - Impugnação do Edital"}
          </Button>
          <Button
            variant={solicitouAnaliseGerencial ? "secondary" : "outline"}
            onClick={() => {
              setSolicitouAnaliseGerencial(true);
              toast({ title: "Solicitação enviada", description: "Análise Gerencial solicitada com sucesso." });
            }}
            disabled={isReadOnlyMode() || solicitouAnaliseGerencial}
            className="gap-2"
          >
            <Briefcase className="h-4 w-4" />
            {solicitouAnaliseGerencial ? "✓ Análise Gerencial Solicitada" : "Solicitar Análise Gerencial"}
          </Button>
        </div>

        {/* Análises Científicas (read-only, só aparece após solicitar) */}
        {solicitouAnaliseCientifica && (
          <div>
            <Label>Análises Científicas</Label>
            <p className="text-xs text-muted-foreground mb-1">Editável na aba AC</p>
            {historicoAnalisesCientificas.length === 0 ? (
              <p className="text-sm text-muted-foreground italic p-3 border rounded-md bg-muted/50">Nenhuma análise científica salva ainda.</p>
            ) : (
              <div className="space-y-2">
                {historicoAnalisesCientificas.map((analise) => (
                  <Card key={analise.id} className="bg-muted/50">
                    <CardHeader className="py-2 px-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Análise {analise.numero}</span>
                        <span className="text-xs text-muted-foreground">{analise.data}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                      <p className="text-sm whitespace-pre-wrap">{analise.texto}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pedido de Esclarecimento (read-only, só aparece após solicitar) */}
        {solicitouEsclarecimento && (
          <div>
            <Label htmlFor="pedidoEsclarecimentoDG">Pedido de Esclarecimento</Label>
            <p className="text-xs text-muted-foreground mb-1">Editável na aba AJ</p>
            <Textarea
              id="pedidoEsclarecimentoDG"
              value={formData.pedidoEsclarecimento}
              readOnly
              placeholder="Preenchido pela Análise Jurídica (aba AJ)"
              rows={3}
              className="bg-muted/50"
            />
          </div>
        )}

        {/* Impugnação do Edital (read-only, só aparece após solicitar) */}
        {solicitouImpugnacao && (
          <div>
            <Label htmlFor="impugnacaoEditalDG">Impugnação do Edital</Label>
            <p className="text-xs text-muted-foreground mb-1">Editável na aba AJ</p>
            <Textarea
              id="impugnacaoEditalDG"
              value={formData.impugnacaoEdital}
              readOnly
              placeholder="Preenchido pela Análise Jurídica (aba AJ)"
              rows={3}
              className="bg-muted/50"
            />
          </div>
        )}

        {/* 3. Empresa Participante 1 + Valor Mínimo 1 */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-transparent">
          <CardContent className="pt-4 space-y-4">
            <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Empresa Participante 1
            </h4>
            <EmpresaParticipanteSelect
              empresaParticipanteId={empresaParticipante.empresaParticipanteId}
              empresaParticipanteNome={empresaParticipante.empresaParticipanteNome}
              empresaParticipanteCNPJ={empresaParticipante.empresaParticipanteCNPJ}
              aprovacaoEmpresa={aprovacaoEmpresa}
              onChange={handleEmpresaParticipanteChange}
              onSolicitarAprovacao={handleSolicitarAprovacao}
              onAprovar={handleAprovacaoEmpresa}
              onRejeitar={handleAprovacaoEmpresa}
              licitacaoData={{
                id: oportunidade?.id || 0,
                numeroPregao: oportunidade?.codigo || formData.numeroPregao || '',
                nomeInstituicao: oportunidade?.cliente || formData.cliente || '',
                objetoLicitacao: oportunidade?.descricao || formData.descricao || ''
              }}
              disabled={isReadOnlyMode()}
              required={true}
            />
            <div>
              <Label htmlFor="valorMinimoFinal">Valor mínimo Final - Empresa 1 (R$)</Label>
              <Input
                id="valorMinimoFinal"
                type="number"
                step="0.01"
                value={formData.valorMinimoFinal}
                onChange={(e) => handleInputChange('valorMinimoFinal', parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                disabled={isReadOnlyMode()}
              />
            </div>
          </CardContent>
        </Card>

        {/* 4. Empresa Participante 2 + Valor Mínimo 2 */}
        <Card className="border-2 border-secondary/20 bg-gradient-to-r from-green-50 to-transparent">
          <CardContent className="pt-4 space-y-4">
            <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Empresa Participante 2 (Opcional)
            </h4>
            <EmpresaParticipanteSelect
              empresaParticipanteId={empresaParticipante2.empresaParticipanteId}
              empresaParticipanteNome={empresaParticipante2.empresaParticipanteNome}
              empresaParticipanteCNPJ={empresaParticipante2.empresaParticipanteCNPJ}
              aprovacaoEmpresa={aprovacaoEmpresa2}
              onChange={handleEmpresaParticipante2Change}
              onSolicitarAprovacao={handleSolicitarAprovacao2}
              onAprovar={handleAprovacaoEmpresa2}
              onRejeitar={handleAprovacaoEmpresa2}
              licitacaoData={{
                id: oportunidade?.id || 0,
                numeroPregao: oportunidade?.codigo || formData.numeroPregao || '',
                nomeInstituicao: oportunidade?.cliente || formData.cliente || '',
                objetoLicitacao: oportunidade?.descricao || formData.descricao || ''
              }}
              disabled={isReadOnlyMode()}
              required={false}
            />
            <div>
              <Label htmlFor="valorMinimoFinal2">Valor mínimo Final - Empresa 2 (R$)</Label>
              <Input
                id="valorMinimoFinal2"
                type="number"
                step="0.01"
                value={formData.valorMinimoFinal2}
                onChange={(e) => handleInputChange('valorMinimoFinal2', parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                disabled={isReadOnlyMode()}
              />
            </div>
          </CardContent>
        </Card>

        {/* 6. Seção de Recursos - condicional ao status "recursos" */}
        {formData.situacaoPregao === 'recursos' && (
          <Card className="border-orange-200 bg-orange-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                ⚖️ Recursos
              </CardTitle>
              <p className="text-sm text-muted-foreground">Selecione o tipo de recurso para solicitar análise jurídica</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={solicitouRecurso ? "default" : "outline"}
                  onClick={() => {
                    setSolicitouRecurso(true);
                    toast({ title: "Solicitação enviada", description: "Análise Jurídica para Recurso solicitada com sucesso." });
                  }}
                  className="flex-1"
                >
                  📄 Recurso
                </Button>
                <Button
                  type="button"
                  variant={solicitouRecursoConcorrente ? "default" : "outline"}
                  onClick={() => {
                    setSolicitouRecursoConcorrente(true);
                  }}
                  className="flex-1"
                >
                  📋 Recurso do Concorrente
                </Button>
              </div>

              {/* A - Recurso próprio */}
              {solicitouRecurso && (
                <div className="border rounded-lg p-4 space-y-2 bg-background">
                  <Label htmlFor="manifestacaoRecorrerDG">Razões para Recurso</Label>
                  <p className="text-xs text-muted-foreground">Preenchido pela Análise Jurídica (aba AJ)</p>
                  <Textarea
                    id="manifestacaoRecorrerDG"
                    value={formData.manifestacaoRecorrer}
                    readOnly
                    placeholder="Aguardando resposta da Análise Jurídica..."
                    rows={4}
                    className="bg-muted/50"
                  />
                </div>
              )}

              {/* B - Recurso do concorrente */}
              {solicitouRecursoConcorrente && (
                <div className="border rounded-lg p-4 space-y-3 bg-background">
                  <div className="space-y-2">
                    <Label htmlFor="recursoConcorrenteDG">Recurso do Concorrente</Label>
                    <p className="text-xs text-muted-foreground">Cole abaixo o recurso apresentado pelo concorrente</p>
                    <Textarea
                      id="recursoConcorrenteDG"
                      value={formData.recursoConcorrente || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, recursoConcorrente: e.target.value }))}
                      placeholder="Cole o recurso do concorrente aqui..."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      toast({ title: "Solicitação enviada", description: "Recurso do concorrente enviado para Análise Jurídica." });
                    }}
                  >
                    📨 Solicitar Análise Jurídica
                  </Button>
                  <div className="space-y-2 mt-3">
                    <Label htmlFor="contrarrazoesDG">Contrarrazões</Label>
                    <p className="text-xs text-muted-foreground">Preenchido pela Análise Jurídica (aba AJ)</p>
                    <Textarea
                      id="contrarrazoesDG"
                      value={formData.contrarrazoes}
                      readOnly
                      placeholder="Aguardando resposta da Análise Jurídica..."
                      rows={4}
                      className="bg-muted/50"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Campos AG (read-only, só aparecem após solicitar) */}
        {solicitouAnaliseGerencial && (
          <>
            {/* Empresa Participante (read-only, da seleção na aba AG) */}
            {empresaParticipante.empresaParticipanteNome && (
              <div>
                <Label htmlFor="empresaParticipanteDG">Empresa Participante</Label>
                <p className="text-xs text-muted-foreground mb-1">Definida na aba AG</p>
                <Input
                  id="empresaParticipanteDG"
                  value={`${empresaParticipante.empresaParticipanteNome} - ${empresaParticipante.empresaParticipanteCNPJ}`}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            )}

            {/* Estratégia Comercial (read-only, editável na aba AG) */}
            <div>
              <Label htmlFor="estrategiaComercialDG">Estratégia Comercial</Label>
              <p className="text-xs text-muted-foreground mb-1">Editável na aba AG</p>
              <Textarea
                id="estrategiaComercialDG"
                value={formData.estrategiaComercialAG}
                readOnly
                placeholder="Preenchido pela Análise Gerencial (aba AG)"
                rows={3}
                className="bg-muted/50"
              />
            </div>

            {/* Valor de Entrada e Valor Limite (read-only, editável na aba AG) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorEntradaDG">Valor de Entrada (R$)</Label>
                <p className="text-xs text-muted-foreground mb-1">Editável na aba AG</p>
                <Input
                  id="valorEntradaDG"
                  type="number"
                  value={formData.valorEntradaAG}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Label htmlFor="valorLimiteDG">Valor Limite (R$)</Label>
                <p className="text-xs text-muted-foreground mb-1">Editável na aba AG</p>
                <Input
                  id="valorLimiteDG"
                  type="number"
                  value={formData.valorLimiteAG}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            </div>
          </>
        )}

        {/* Análise Científica - Histórico (read-only, só aparece após solicitar) */}
        {solicitouAnaliseCientifica && historicoAnalisesCientificas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Análise Científica (AC)</CardTitle>
              <p className="text-xs text-muted-foreground">Editável na aba AC</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {historicoAnalisesCientificas.map((analise) => (
                <div key={analise.id} className="p-3 border rounded-lg bg-muted/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Análise {analise.numero}</span>
                    <span className="text-xs text-muted-foreground">{analise.data}</span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analise.texto}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Tabelas de Licitantes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Tabelas de Licitantes</Label>
            {!isReadOnlyMode() && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAdicionarTabela}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Tabela de Licitantes
              </Button>
            )}
          </div>
          
          {tabelasLicitantes.map((tabela) => (
            <Card key={tabela.id} className="border">
              <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                {!isReadOnlyMode() ? (
                  <Input
                    value={tabela.titulo}
                    onChange={(e) => handleAtualizarTituloTabela(tabela.id, e.target.value)}
                    className="text-base font-semibold border-none bg-transparent p-0 h-auto focus-visible:ring-1 max-w-[300px]"
                    placeholder="Título da tabela..."
                  />
                ) : (
                  <CardTitle className="text-base font-medium">
                    {tabela.titulo}
                  </CardTitle>
                )}
                <div className="flex items-center gap-2">
                  {!isReadOnlyMode() && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAbrirModalLicitante(tabela.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Licitante
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleExcluirTabela(tabela.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Licitante</TableHead>
                        <TableHead>Objeto</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Valor Unitário</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Valor Final</TableHead>
                        <TableHead>Atende ao Edital?</TableHead>
                        <TableHead>Ranking</TableHead>
                        <TableHead>Status</TableHead>
                        {!isReadOnlyMode() && <TableHead>Ações</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tabela.licitantes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={isReadOnlyMode() ? 10 : 11} className="text-center text-muted-foreground py-8">
                            Nenhum licitante cadastrado. Clique em "Adicionar Licitante" para começar.
                          </TableCell>
                        </TableRow>
                      ) : (
                        tabela.licitantes.map((licitante) => (
                          <TableRow key={licitante.id}>
                            <TableCell className="font-medium">{licitante.empresa}</TableCell>
                            <TableCell>{licitante.objeto || '-'}</TableCell>
                            <TableCell>{licitante.marca}</TableCell>
                            <TableCell>{licitante.modelo}</TableCell>
                            <TableCell>{formatCurrency(licitante.valorUnitario)}</TableCell>
                            <TableCell>{licitante.quantidade}</TableCell>
                            <TableCell>{formatCurrency(licitante.valorFinal)}</TableCell>
                            <TableCell>
                              <Badge className={getAtendeEditalBadge(licitante.atendeEdital)}>
                                {licitante.atendeEdital ? 'SIM' : 'NÃO'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getRankingColor(licitante.ranking)}>
                                {licitante.ranking}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(licitante.status)}>
                                {getStatusLabel(licitante.status)}
                              </Badge>
                            </TableCell>
                            {!isReadOnlyMode() && (
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleExcluirLicitante(tabela.id, licitante.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Resultado e Observações */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Resultado e Observações</h3>

        <div>
          <Label htmlFor="resultadoOportunidade">Resultado da Licitação</Label>
          <Select 
            value={formData.resultadoOportunidade} 
            onValueChange={(value) => setFormData({...formData, resultadoOportunidade: value})}
            disabled={isReadOnlyMode()}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="ganho">Ganho</SelectItem>
              <SelectItem value="perda">Perda</SelectItem>
              <SelectItem value="fracassado">Fracassado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.resultadoOportunidade === 'ganho' && (
          <div>
            <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
            <Textarea
              id="motivoGanho"
              value={formData.motivoGanho}
              onChange={(e) => setFormData({...formData, motivoGanho: e.target.value})}
              placeholder="Descreva o motivo do ganho"
              rows={3}
              disabled={isReadOnlyMode()}
            />
          </div>
        )}

        {formData.resultadoOportunidade === 'perda' && (
          <div>
            <Label htmlFor="motivoPerda">Motivo da Perda</Label>
            <Textarea
              id="motivoPerda"
              value={formData.motivoPerda}
              onChange={(e) => setFormData({...formData, motivoPerda: e.target.value})}
              placeholder="Descreva o motivo da perda"
              rows={3}
              disabled={isReadOnlyMode()}
            />
          </div>
        )}

        {formData.resultadoOportunidade === 'fracassado' && (
          <div>
            <Label htmlFor="motivosFracasso">Motivos do Fracasso do Pregão</Label>
            <Textarea
              id="motivosFracasso"
              value={formData.motivosFracasso}
              onChange={(e) => setFormData({...formData, motivosFracasso: e.target.value})}
              placeholder="Detalhe os motivos do fracasso"
              rows={3}
              disabled={isReadOnlyMode()}
            />
          </div>
        )}

        <div>
          <Label htmlFor="observacaoGeral">Observação (Geral Licitação)</Label>
          <Textarea
            id="observacaoGeral"
            value={formData.observacaoGeral}
            onChange={(e) => setFormData({...formData, observacaoGeral: e.target.value})}
            placeholder="Observações gerais sobre a licitação"
            rows={4}
            disabled={isReadOnlyMode()}
          />
        </div>
      </div>
    </div>
  );

  const handleSalvarAnalise = () => {
    if (!formData.analiseTecnica.trim()) {
      toast({ title: "Campo vazio", description: "Escreva a análise antes de salvar.", variant: "destructive" });
      return;
    }
    const novaAnalise = {
      id: Date.now(),
      texto: formData.analiseTecnica,
      data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      numero: historicoAnalisesCientificas.length + 1
    };
    setHistoricoAnalisesCientificas([...historicoAnalisesCientificas, novaAnalise]);
    setFormData({ ...formData, analiseTecnica: '' });
    toast({ title: "Análise salva", description: `Análise ${novaAnalise.numero} registrada com sucesso.` });
  };

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="analiseTecnicaCientifica">Análise Técnica-Científica</Label>
        <Textarea
          id="analiseTecnicaCientifica"
          value={formData.analiseTecnica}
          onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
          placeholder="Digite sua análise técnica-científica aqui..."
          rows={6}
          disabled={isReadOnlyMode()}
        />
        <div className="flex justify-end mt-2">
          <Button onClick={handleSalvarAnalise} disabled={isReadOnlyMode() || !formData.analiseTecnica.trim()} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Análise
          </Button>
        </div>
      </div>

      {/* Histórico de Análises */}
      {historicoAnalisesCientificas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Histórico de Análises ({historicoAnalisesCientificas.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {historicoAnalisesCientificas.map((analise) => (
              <Collapsible key={analise.id}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-md border hover:bg-accent text-left">
                  <span className="font-medium text-sm">Análise {analise.numero}</span>
                  <span className="text-xs text-muted-foreground">{analise.data}</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 border border-t-0 rounded-b-md bg-muted/30">
                  <p className="text-sm whitespace-pre-wrap">{analise.texto}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Análise da Concorrência */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Análise da Concorrência</h3>
          {!isReadOnlyMode() && (
            <Button onClick={() => setShowConcorrenteModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Concorrente
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Concorrentes Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Concorrente</TableHead>
                    <TableHead>Marca/Modelo</TableHead>
                    <TableHead>Comparativo</TableHead>
                    <TableHead>Atende ao Edital?</TableHead>
                    {!isReadOnlyMode() && <TableHead>Ações</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {concorrentes.map((concorrente) => (
                    <TableRow key={concorrente.id}>
                      <TableCell className="font-medium">{concorrente.nome}</TableCell>
                      <TableCell>{concorrente.marcaModelo || '-'}</TableCell>
                      <TableCell>
                        {concorrente.comparativo ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {truncateText(concorrente.comparativo)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-sm">{concorrente.comparativo}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {concorrente.atendeEdital ? (
                          <Badge className={concorrente.atendeEdital === 'sim' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {concorrente.atendeEdital === 'sim' ? 'SIM' : 'NÃO'}
                          </Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      {!isReadOnlyMode() && (
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {concorrentes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={isReadOnlyMode() ? 4 : 5} className="text-center text-gray-500 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          Nenhum concorrente cadastrado - Alarme diário até preenchimento
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHistorico = () => (
    <div className="space-y-6">
      <ChatInterno oportunidadeId={oportunidade?.id || formData.cpfCnpj || 'nova'} />
    </div>
  );

  const renderDocumentos = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documentos da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!isReadOnlyMode() && (
              <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Clique para fazer upload</span>
              </div>
            )}
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Edital.pdf</span>
              <span className="text-xs text-gray-500">27/05/2025</span>
              <Button size="sm" variant="outline" className="mt-2">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">ATA.pdf</span>
              <span className="text-xs text-gray-500">28/05/2025</span>
              <Button size="sm" variant="outline" className="mt-2">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-orange-500 mb-2" />
              <span className="text-sm font-medium">Recurso.pdf</span>
              <span className="text-xs text-gray-500">26/05/2025</span>
              <Button size="sm" variant="outline" className="mt-2">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {oportunidade ? 'Editar' : 'Nova'} Oportunidade - Licitação
              </span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full overflow-x-auto">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="analise-tecnica">AC</TabsTrigger>
              <TabsTrigger value="analise-juridica">AJ</TabsTrigger>
              <TabsTrigger value="analise-gerencial">AG</TabsTrigger>
              <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="mt-6">
              {renderDadosGerais()}
            </TabsContent>

            <TabsContent value="analise-tecnica" className="mt-6">
              {renderAnaliseTecnica()}
            </TabsContent>

            <TabsContent value="analise-juridica" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Análise Jurídica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pedidoEsclarecimento">Pedido de Esclarecimento</Label>
                      <Textarea
                        id="pedidoEsclarecimento"
                        value={formData.pedidoEsclarecimento}
                        onChange={(e) => handleInputChange('pedidoEsclarecimento', e.target.value)}
                        placeholder="Descreva o pedido de esclarecimento..."
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="impugnacaoEditalAJ">Impugnação do Edital</Label>
                      <Textarea
                        id="impugnacaoEditalAJ"
                        value={formData.impugnacaoEdital}
                        onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                        placeholder="Descreva a impugnação do edital..."
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="manifestacaoRecorrerAJ">Razões para Recurso</Label>
                      <Textarea
                        id="manifestacaoRecorrerAJ"
                        value={formData.manifestacaoRecorrer}
                        onChange={(e) => handleInputChange('manifestacaoRecorrer', e.target.value)}
                        placeholder="Descreva as razões para recurso..."
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="recursoConcorrente">Recurso do Concorrente</Label>
                      <p className="text-xs text-muted-foreground mb-1">Réplica enviada pela equipe de licitação</p>
                      <Textarea
                        id="recursoConcorrente"
                        value={formData.recursoConcorrente}
                        onChange={(e) => handleInputChange('recursoConcorrente', e.target.value)}
                        placeholder="Reproduza o recurso do concorrente..."
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contrarrazoes">Contrarrazões</Label>
                      <Textarea
                        id="contrarrazoes"
                        value={formData.contrarrazoes}
                        onChange={(e) => handleInputChange('contrarrazoes', e.target.value)}
                        placeholder="Descreva as contrarrazões..."
                        rows={4}
                        disabled={isReadOnlyMode()}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analise-gerencial" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Análise Gerencial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Empresa Participante 1 */}
                    <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-transparent">
                      <CardContent className="pt-4 space-y-4">
                        <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                          Empresa Participante 1
                        </h4>
                        <EmpresaParticipanteSelect
                          empresaParticipanteId={empresaParticipante.empresaParticipanteId}
                          empresaParticipanteNome={empresaParticipante.empresaParticipanteNome}
                          empresaParticipanteCNPJ={empresaParticipante.empresaParticipanteCNPJ}
                          aprovacaoEmpresa={aprovacaoEmpresa}
                          onChange={handleEmpresaParticipanteChange}
                          onSolicitarAprovacao={handleSolicitarAprovacao}
                          onAprovar={handleAprovacaoEmpresa}
                          onRejeitar={handleAprovacaoEmpresa}
                          licitacaoData={{
                            id: oportunidade?.id || 0,
                            numeroPregao: oportunidade?.codigo || formData.numeroPregao || '',
                            nomeInstituicao: oportunidade?.cliente || formData.cliente || '',
                            objetoLicitacao: oportunidade?.descricao || formData.descricao || ''
                          }}
                          disabled={isReadOnlyMode()}
                          required={true}
                        />
                        <div>
                          <Label htmlFor="valorMinimoFinalAG">Valor mínimo Final - Empresa 1 (R$)</Label>
                          <Input
                            id="valorMinimoFinalAG"
                            type="number"
                            step="0.01"
                            value={formData.valorMinimoFinal}
                            onChange={(e) => handleInputChange('valorMinimoFinal', parseFloat(e.target.value) || 0)}
                            placeholder="0,00"
                            disabled={isReadOnlyMode()}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Empresa Participante 2 */}
                    <Card className="border-2 border-secondary/20 bg-gradient-to-r from-green-50 to-transparent">
                      <CardContent className="pt-4 space-y-4">
                        <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                          Empresa Participante 2 (Opcional)
                        </h4>
                        <EmpresaParticipanteSelect
                          empresaParticipanteId={empresaParticipante2.empresaParticipanteId}
                          empresaParticipanteNome={empresaParticipante2.empresaParticipanteNome}
                          empresaParticipanteCNPJ={empresaParticipante2.empresaParticipanteCNPJ}
                          aprovacaoEmpresa={aprovacaoEmpresa2}
                          onChange={handleEmpresaParticipante2Change}
                          onSolicitarAprovacao={handleSolicitarAprovacao2}
                          onAprovar={handleAprovacaoEmpresa2}
                          onRejeitar={handleAprovacaoEmpresa2}
                          licitacaoData={{
                            id: oportunidade?.id || 0,
                            numeroPregao: oportunidade?.codigo || formData.numeroPregao || '',
                            nomeInstituicao: oportunidade?.cliente || formData.cliente || '',
                            objetoLicitacao: oportunidade?.descricao || formData.descricao || ''
                          }}
                          disabled={isReadOnlyMode()}
                          required={false}
                        />
                        <div>
                          <Label htmlFor="valorMinimoFinal2AG">Valor mínimo Final - Empresa 2 (R$)</Label>
                          <Input
                            id="valorMinimoFinal2AG"
                            type="number"
                            step="0.01"
                            value={formData.valorMinimoFinal2}
                            onChange={(e) => handleInputChange('valorMinimoFinal2', parseFloat(e.target.value) || 0)}
                            placeholder="0,00"
                            disabled={isReadOnlyMode()}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Estratégia Comercial */}
                    <div>
                      <Label htmlFor="estrategiaComercialAG">Estratégia Comercial</Label>
                      <Textarea
                        id="estrategiaComercialAG"
                        value={formData.estrategiaComercialAG}
                        onChange={(e) => handleInputChange('estrategiaComercialAG', e.target.value)}
                        placeholder="Descreva a estratégia comercial..."
                        rows={5}
                        disabled={isReadOnlyMode()}
                      />
                    </div>

                    {/* Valor de Entrada e Valor Limite */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="valorEntradaAG">Valor de Entrada (R$)</Label>
                        <Input
                          id="valorEntradaAG"
                          type="number"
                          step="0.01"
                          value={formData.valorEntradaAG}
                          onChange={(e) => handleInputChange('valorEntradaAG', parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorLimiteAG">Valor Limite (R$)</Label>
                        <Input
                          id="valorLimiteAG"
                          type="number"
                          step="0.01"
                          value={formData.valorLimiteAG}
                          onChange={(e) => handleInputChange('valorLimiteAG', parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                          disabled={isReadOnlyMode()}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="mt-6">
              {renderHistorico()}
            </TabsContent>

            <TabsContent value="documentos" className="mt-6">
              {renderDocumentos()}
            </TabsContent>

            <div className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Oportunidade
              </Button>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Modais */}
      {showLicitacaoModal && (
        <LicitacaoValidationModal 
          chave={formData.cpfCnpj}
          onClose={() => setShowLicitacaoModal(false)} 
        />
      )}

      {showConcorrenteModal && (
        <ConcorrenteModal
          onClose={() => setShowConcorrenteModal(false)}
          onSave={(concorrente) => {
            setConcorrentes([...concorrentes, { ...concorrente, id: Date.now() }]);
          }}
        />
      )}

      {showPedidoForm && (
        <PedidoForm
          onClose={() => setShowPedidoForm(false)}
          onSave={(pedidoData) => {
            const novoPedido = {
              id: Date.now(),
              codigo: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
              cliente: formData.cliente || 'Cliente',
              dataGeracao: new Date().toISOString().split('T')[0],
              situacao: 'Em Aberto',
              valor: pedidoData.produtos?.reduce((sum: number, prod: any) => sum + (prod.valorTotal || 0), 0) || 0
            };
            setPedidos([...pedidos, novoPedido]);
            setShowPedidoForm(false);
          }}
          oportunidade={formData}
        />
      )}

      <CustomAlertModal
        isOpen={showEmprestimoAlert}
        title="Operação EMPRÉSTIMO Selecionada"
        message="A natureza da operação foi alterada para EMPRÉSTIMO. Esta operação pode requerer aprovação especial dependendo das políticas da empresa."
        onConfirm={() => setShowEmprestimoAlert(false)}
      />

      {/* Modal para adicionar licitante */}
      <Dialog open={showLicitanteModal} onOpenChange={setShowLicitanteModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Licitante</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="licit-empresa">Licitante *</Label>
              <Input
                id="licit-empresa"
                value={novoLicitante.empresa}
                onChange={(e) => setNovoLicitante({ ...novoLicitante, empresa: e.target.value })}
                placeholder="Nome do licitante"
              />
            </div>
            
            <div>
              <Label htmlFor="licit-objeto">Objeto</Label>
              <Input
                id="licit-objeto"
                value={novoLicitante.objeto}
                onChange={(e) => setNovoLicitante({ ...novoLicitante, objeto: e.target.value })}
                placeholder="Descrição do objeto"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licit-marca">Marca *</Label>
                <Input
                  id="licit-marca"
                  value={novoLicitante.marca}
                  onChange={(e) => setNovoLicitante({ ...novoLicitante, marca: e.target.value })}
                  placeholder="Marca do produto"
                />
              </div>
              <div>
                <Label htmlFor="licit-modelo">Modelo *</Label>
                <Input
                  id="licit-modelo"
                  value={novoLicitante.modelo}
                  onChange={(e) => setNovoLicitante({ ...novoLicitante, modelo: e.target.value })}
                  placeholder="Modelo do produto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licit-valorUnitario">Valor Unitário (R$)</Label>
                <Input
                  id="licit-valorUnitario"
                  type="number"
                  step="0.01"
                  value={novoLicitante.valorUnitario}
                  onChange={(e) => setNovoLicitante({ ...novoLicitante, valorUnitario: parseFloat(e.target.value) || 0 })}
                  placeholder="0,00"
                />
              </div>
              <div>
                <Label htmlFor="licit-quantidade">Quantidade</Label>
                <Input
                  id="licit-quantidade"
                  type="number"
                  min="1"
                  value={novoLicitante.quantidade}
                  onChange={(e) => setNovoLicitante({ ...novoLicitante, quantidade: parseInt(e.target.value) || 1 })}
                  placeholder="1"
                />
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <Label className="text-sm text-muted-foreground">Valor Final (calculado)</Label>
              <p className="text-lg font-semibold">
                {formatCurrency(novoLicitante.valorUnitario * novoLicitante.quantidade)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licit-atendeEdital">Atende ao Edital?</Label>
                <Select
                  value={novoLicitante.atendeEdital ? 'sim' : 'nao'}
                  onValueChange={(value) => setNovoLicitante({ ...novoLicitante, atendeEdital: value === 'sim' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="licit-ranking">Ranking</Label>
                <Input
                  id="licit-ranking"
                  type="number"
                  min="1"
                  value={novoLicitante.ranking}
                  onChange={(e) => setNovoLicitante({ ...novoLicitante, ranking: parseInt(e.target.value) || 1 })}
                  placeholder="1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="licit-status">Status</Label>
              <Select
                value={novoLicitante.status}
                onValueChange={(value) => setNovoLicitante({ ...novoLicitante, status: value as LicitanteItem['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="habilitado">Habilitado</SelectItem>
                  <SelectItem value="inabilitado">Inabilitado</SelectItem>
                  <SelectItem value="desclassificado">Desclassificado</SelectItem>
                  <SelectItem value="vencedor">Vencedor</SelectItem>
                  <SelectItem value="adjudicada">Adjudicada</SelectItem>
                  <SelectItem value="aceita_habilitada">Aceita e Habilitada</SelectItem>
                  <SelectItem value="homologada">Homologada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowLicitanteModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAdicionarLicitante}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modal de Aprovação de Empresa */}
      <AprovacaoEmpresaModal
        isOpen={showAprovacaoEmpresaModal}
        onClose={() => setShowAprovacaoEmpresaModal(false)}
        licitacaoData={{
          id: oportunidade?.id || 0,
          numeroPregao: formData.numeroPregao || '',
          nomeInstituicao: formData.cliente || '',
          objetoLicitacao: formData.descricao || '',
          empresaParticipanteNome: empresaParticipante.empresaParticipanteNome,
          empresaParticipanteCNPJ: empresaParticipante.empresaParticipanteCNPJ
        }}
        onAprovar={handleAprovacaoEmpresa}
        onRejeitar={handleAprovacaoEmpresa}
      />
    </div>
  );
};

export default OportunidadeAvancadaForm;
