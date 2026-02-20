import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, ShoppingCart, Eye, Headphones, Link2, Download, Clock, Calendar, Network, Send, Wallet, TrendingDown, DollarSign, Wrench, Phone, Building2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { mockChecklistVendas } from '@/data/faturamentoModules';
import { PedidoCompleto } from '@/types/comercial';
import { Chamado, StatusChamado } from '@/types/chamado';
import { useColaboradores } from '@/hooks/useColaboradores';
import { useLicitacoesGanhas, EmpresaParticipanteData } from '@/contexts/LicitacoesGanhasContext';
import { useEmpresa } from '@/contexts/EmpresaContext';
import ChatInterno from './ChatInterno';
import PedidoModal from './PedidoModal';
import ChamadosTab from './ChamadosTab';
import InterfaceamentoTab from './InterfaceamentoTab';

interface ContratacaoSimplesFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

interface HistoricoVisita {
  id: string;
  colaborador: string;
  data: string;
  observacao: string;
}

interface AditivoContrato {
  id: string;
  tipo: string;
  valor: number;
  justificativa: string;
  empresaId: string;
  empresaNome: string;
  empresaCNPJ: string;
  documentoNome: string;
  documentoUrl: string;
  criadoPor: string;
  criadoEm: string;
}

const ContratacaoSimplesForm = ({ isOpen, onClose, onSave, oportunidade }: ContratacaoSimplesFormProps) => {
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [chamados, setChamados] = useState<Chamado[]>(oportunidade?.chamados || []);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const [licitacaoVinculada, setLicitacaoVinculada] = useState<string>('');
  const [documentosLicitacao, setDocumentosLicitacao] = useState<any[]>([]);
  const [historicoLicitacao, setHistoricoLicitacao] = useState<any[]>([]);
  const [historicoVisitas, setHistoricoVisitas] = useState<HistoricoVisita[]>(oportunidade?.historicoVisitas || []);
  const [interfaceamentos, setInterfaceamentos] = useState<any[]>(oportunidade?.interfaceamentos || []);
  const [modalHistoricoOpen, setModalHistoricoOpen] = useState(false);
  const [novaVisita, setNovaVisita] = useState({
    colaborador: '',
    data: '',
    observacao: ''
  });

  // Estados para empresa participante
  const [empresaContrato, setEmpresaContrato] = useState<EmpresaParticipanteData>({
    empresaParticipanteId: '',
    empresaParticipanteNome: '',
    empresaParticipanteCNPJ: ''
  });
  const [empresaContrato2, setEmpresaContrato2] = useState<EmpresaParticipanteData>({
    empresaParticipanteId: '',
    empresaParticipanteNome: '',
    empresaParticipanteCNPJ: ''
  });

  // Estados para modal de aditivo obrigatório
  const [modalAditivoOpen, setModalAditivoOpen] = useState(false);
  const [aditivoFile, setAditivoFile] = useState<File | null>(null);
  const [empresaPendente, setEmpresaPendente] = useState<{id: string, numero: 1|2} | null>(null);
  const aditivoFileInputRef = useRef<HTMLInputElement>(null);
  const [osExpandida, setOsExpandida] = useState<string | null>(null);
  const [osDtExpandida, setOsDtExpandida] = useState<string | null>(null);
  const [empresaUploadSelecionada, setEmpresaUploadSelecionada] = useState<string>('geral');

  // Estados para aditivos contratuais
  const [aditivos, setAditivos] = useState<AditivoContrato[]>([]);
  const [modalNovoAditivoOpen, setModalNovoAditivoOpen] = useState(false);
  const [novoAditivo, setNovoAditivo] = useState({
    tipo: '',
    valor: '',
    justificativa: '',
    empresaId: '',
  });
  const [aditivoDocFile, setAditivoDocFile] = useState<File | null>(null);
  const aditivoDocFileInputRef = useRef<HTMLInputElement>(null);


  const handleAdicionarAditivo = () => {
    if (!novoAditivo.tipo) { toast.error('Selecione o tipo do aditivo.'); return; }
    if (!novoAditivo.valor) { toast.error('Informe o valor do aditivo.'); return; }
    if (novoAditivo.justificativa.length < 50) { toast.error('A justificativa deve ter no mínimo 50 caracteres.'); return; }
    if (temDuasEmpresas && !novoAditivo.empresaId) { toast.error('Selecione a empresa vinculada.'); return; }
    if (!aditivoDocFile) { toast.error('Anexe o documento do aditivo.'); return; }

    const empresaId = temDuasEmpresas ? novoAditivo.empresaId : empresaContrato.empresaParticipanteId;
    const empresaInfo = empresaId === empresaContrato.empresaParticipanteId
      ? empresaContrato
      : empresaContrato2;

    const novo: AditivoContrato = {
      id: `aditivo_${Date.now()}`,
      tipo: novoAditivo.tipo,
      valor: parseFloat(novoAditivo.valor),
      justificativa: novoAditivo.justificativa,
      empresaId: empresaId,
      empresaNome: empresaInfo.empresaParticipanteNome,
      empresaCNPJ: empresaInfo.empresaParticipanteCNPJ,
      documentoNome: aditivoDocFile.name,
      documentoUrl: URL.createObjectURL(aditivoDocFile),
      criadoPor: formData.colaboradoresResponsaveis || 'Usuário',
      criadoEm: new Date().toISOString(),
    };

    setAditivos(prev => [...prev, novo]);

    // Adicionar documento à aba Documentos
    setDocumentosLicitacao(prev => [...prev, {
      nome: aditivoDocFile.name,
      tipo: `Aditivo - ${novoAditivo.tipo}`,
      data: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(aditivoDocFile),
      empresaId: empresaId
    }]);

    toast.success('Aditivo registrado com sucesso!');
    setModalNovoAditivoOpen(false);
    setNovoAditivo({ tipo: '', valor: '', justificativa: '', empresaId: '' });
    setAditivoDocFile(null);
  };

  // Dados mock de OSs vinculadas à contratação
  const osVinculadas: Array<{id: string; numero: string; tipo: string; status: string; assessor: string; dataAgendada: string; descricao: string}> = [
    {
      id: 'os-cont-001',
      numero: 'OS-2025-010',
      tipo: 'Treinamento Inicial',
      status: 'CONCLUÍDA',
      assessor: 'Dr. Carlos Mendes',
      dataAgendada: '2025-04-10',
      descricao: 'Treinamento inicial da equipe do laboratório para operação do analisador bioquímico. Foram treinados 6 profissionais em 2 turnos, cobrindo operação básica, manutenção preventiva e interpretação de resultados.'
    },
    {
      id: 'os-cont-002',
      numero: 'OS-2025-015',
      tipo: 'Acompanhamento de Rotina',
      status: 'EM_ANDAMENTO',
      assessor: 'Dra. Maria Santos',
      dataAgendada: '2025-05-20',
      descricao: 'Visita de acompanhamento para verificação de performance do equipamento após 30 dias de uso. Avaliação de controle de qualidade interno e externo, revisão de procedimentos operacionais.'
    }
  ];

  // Dados mock de OSs do Departamento Técnico
  const osDepartamentoTecnico: Array<{id: string; numero: string; tipo: string; status: string; tecnico: string; dataAgendada: string; descricao: string}> = [
    {
      id: 'os-dt-001',
      numero: 'OS-DT-2025-001',
      tipo: 'Manutenção Corretiva',
      status: 'CONCLUÍDA',
      tecnico: 'Eng. Rafael Lima',
      dataAgendada: '2025-03-15',
      descricao: 'Manutenção corretiva no módulo de detecção do analisador. Substituição do sensor óptico principal e recalibração completa do sistema. Equipamento retornou à operação normal após testes de validação.'
    },
    {
      id: 'os-dt-002',
      numero: 'OS-DT-2025-002',
      tipo: 'Instalação de Equipamento',
      status: 'EM_ANDAMENTO',
      tecnico: 'Téc. André Souza',
      dataAgendada: '2025-06-01',
      descricao: 'Instalação do novo analisador hematológico no setor de urgência. Inclui montagem, configuração de parâmetros, integração com sistema LIS e validação de resultados com amostras controle.'
    }
  ];

  const { colaboradores } = useColaboradores();
  const { licitacoesGanhas, atualizarEmpresaLicitacao, getLicitacaoById } = useLicitacoesGanhas();
  const { empresas, filiais, empresaAtual } = useEmpresa();
  
  const [formData, setFormData] = useState({
    // Dados do Cliente
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    
    // Dados da Oportunidade
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    procurandoPor: oportunidade?.procurandoPor || '',
    previsaoConsumoMensal: oportunidade?.previsaoConsumoMensal || '',
    
    // Contato Comercial
    contatoComercialNome: oportunidade?.contatoComercialNome || '',
    contatoComercialSetor: oportunidade?.contatoComercialSetor || '',
    contatoComercialTelefone: oportunidade?.contatoComercialTelefone || '',
    contatoComercialEmail: oportunidade?.contatoComercialEmail || '',
    
    // Organização
    tags: oportunidade?.tags || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    status: oportunidade?.status || 'em_triagem',
    descricao: oportunidade?.descricao || '',
    
    // Outros
    propostaNegociacao: oportunidade?.propostaNegociacao || false,
    termometro: oportunidade?.termometro || 50,
    
    // Campos condicionais
    motivoGanho: oportunidade?.motivoGanho || '',
    motivoPerda: oportunidade?.motivoPerda || '',
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Representação Comercial
    representanteResponsavel: oportunidade?.representanteResponsavel || '',
    percentualComissao: oportunidade?.percentualComissao || 0,
    
    // Modalidade
    modalidade: 'contratacao_simples'
  });

  const temDuasEmpresas = !!empresaContrato2.empresaParticipanteId;
  const valorOriginal = formData.valorNegocio || 0;
  const somaAditivos = aditivos.reduce((sum, a) => sum + a.valor, 0);
  const valorAtualizado = valorOriginal + somaAditivos;

  const [concorrentes, setConcorrentes] = useState(oportunidade?.concorrentes || []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVincularLicitacao = (licitacaoId: string) => {
    if (!licitacaoId) {
      setLicitacaoVinculada('');
      setDocumentosLicitacao([]);
      setHistoricoLicitacao([]);
      setEmpresaContrato({ empresaParticipanteId: '', empresaParticipanteNome: '', empresaParticipanteCNPJ: '' });
      setEmpresaContrato2({ empresaParticipanteId: '', empresaParticipanteNome: '', empresaParticipanteCNPJ: '' });
      return;
    }

    const licitacao = getLicitacaoById(licitacaoId);
    if (!licitacao) return;

    setLicitacaoVinculada(licitacaoId);
    setDocumentosLicitacao(licitacao.documentos.map((doc: any) => ({
      ...doc,
      empresaId: doc.tipo === 'Edital' || doc.tipo === 'Catálogo' ? null : null
    })));
    setHistoricoLicitacao(licitacao.historico);

    // Carregar empresas participantes da licitação
    setEmpresaContrato({
      empresaParticipanteId: licitacao.empresaParticipanteId || '',
      empresaParticipanteNome: licitacao.empresaParticipanteNome || '',
      empresaParticipanteCNPJ: licitacao.empresaParticipanteCNPJ || ''
    });
    setEmpresaContrato2({
      empresaParticipanteId: licitacao.empresaParticipanteId2 || '',
      empresaParticipanteNome: licitacao.empresaParticipanteNome2 || '',
      empresaParticipanteCNPJ: licitacao.empresaParticipanteCNPJ2 || ''
    });

    // Preencher automaticamente os campos da contratação
    setFormData(prev => ({
      ...prev,
      cpfCnpj: licitacao.cnpj,
      nomeFantasia: licitacao.nomeInstituicao,
      razaoSocial: licitacao.nomeInstituicao,
      endereco: `${licitacao.municipio} - ${licitacao.uf}`,
      uf: licitacao.uf,
      website: licitacao.linkEdital || '',
      fonteLead: 'licitacao',
      valorNegocio: licitacao.estrategiaValorFinal,
      tags: licitacao.palavraChave,
      fluxoTrabalho: `Contrato derivado da licitação ${licitacao.numeroPregao}`,
      status: 'ganha',
      descricao: licitacao.resumoEdital,
      analiseTecnica: licitacao.analiseTecnica
    }));
  };

  // Função para alterar empresa - agora abre modal de aditivo
  const handleAlterarEmpresaContrato = (empresaId: string, empresaNumero: 1 | 2) => {
    // Verificar se realmente mudou
    const empresaAtualSel = empresaNumero === 1 ? empresaContrato : empresaContrato2;
    if (empresaId === empresaAtualSel.empresaParticipanteId) return;

    // Salvar pendente e abrir modal
    setEmpresaPendente({ id: empresaId, numero: empresaNumero });
    setAditivoFile(null);
    setModalAditivoOpen(true);
  };

  // Resolver empresa por ID
  const resolverEmpresaPorId = (empresaId: string): EmpresaParticipanteData => {
    if (empresaAtual && empresaId === empresaAtual.id) {
      return { empresaParticipanteId: empresaAtual.id, empresaParticipanteNome: empresaAtual.nome, empresaParticipanteCNPJ: empresaAtual.cnpj };
    }
    const filial = filiais.find(f => f.id === empresaId);
    if (filial) {
      return { empresaParticipanteId: filial.id, empresaParticipanteNome: filial.nome, empresaParticipanteCNPJ: filial.cnpj };
    }
    const empresa = empresas.find(e => e.id === empresaId);
    if (empresa) {
      return { empresaParticipanteId: empresa.id, empresaParticipanteNome: empresa.nome, empresaParticipanteCNPJ: empresa.cnpj };
    }
    return { empresaParticipanteId: '', empresaParticipanteNome: '', empresaParticipanteCNPJ: '' };
  };

  // Confirmar alteração de empresa com aditivo
  const handleConfirmarAlteracaoEmpresa = () => {
    if (!empresaPendente || !aditivoFile) return;

    const empresaSelecionada = resolverEmpresaPorId(empresaPendente.id);

    // Atualizar estado local
    if (empresaPendente.numero === 1) {
      setEmpresaContrato(empresaSelecionada);
    } else {
      setEmpresaContrato2(empresaSelecionada);
    }

    // Sincronizar com a licitação original
    if (licitacaoVinculada) {
      atualizarEmpresaLicitacao(licitacaoVinculada, empresaSelecionada, empresaPendente.numero);
    }

    // Adicionar documento do aditivo à aba Documentos com empresaId
    setDocumentosLicitacao(prev => [...prev, {
      nome: aditivoFile.name,
      tipo: 'Aditivo de Mudança de Empresa',
      data: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(aditivoFile),
      empresaId: empresaPendente.numero === 1 ? empresaContrato.empresaParticipanteId : empresaContrato2.empresaParticipanteId
    }]);

    toast.success(`Empresa ${empresaPendente.numero} atualizada! Aditivo anexado aos documentos.`);
    setModalAditivoOpen(false);
    setAditivoFile(null);
    setEmpresaPendente(null);
  };

  const handleCancelarAlteracaoEmpresa = () => {
    setModalAditivoOpen(false);
    setAditivoFile(null);
    setEmpresaPendente(null);
  };

  // Lista de empresas disponíveis para seleção
  const empresasDisponiveis = [
    ...(empresaAtual ? [{ id: empresaAtual.id, nome: empresaAtual.nome, cnpj: empresaAtual.cnpj }] : []),
    ...filiais.map(f => ({ id: f.id, nome: f.nome, cnpj: f.cnpj }))
  ];

  const handleAdicionarChamado = (novoChamado: Omit<Chamado, 'id' | 'dataAbertura' | 'status'>) => {
    const chamado: Chamado = {
      ...novoChamado,
      id: `chamado_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dataAbertura: new Date().toISOString(),
      status: StatusChamado.ABERTO
    };

    setChamados(prev => [...prev, chamado]);
  };

  const handleAdicionarVisita = () => {
    if (!novaVisita.colaborador || !novaVisita.data || !novaVisita.observacao) {
      return;
    }

    const visita: HistoricoVisita = {
      id: `visita_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      colaborador: novaVisita.colaborador,
      data: novaVisita.data,
      observacao: novaVisita.observacao
    };

    setHistoricoVisitas(prev => [...prev, visita]);
    setNovaVisita({ colaborador: '', data: '', observacao: '' });
    setModalHistoricoOpen(false);
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      concorrentes,
      pedidos,
      chamados,
      interfaceamentos,
      historicoVisitas,
      licitacaoVinculada,
      documentosLicitacao,
      historicoLicitacao,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
  };

  const handleSalvarPedido = (pedido: PedidoCompleto) => {
    setPedidos(prev => [...prev, pedido]);
    setIsPedidoModalOpen(false);
  };

  const adicionarConcorrente = () => {
    setConcorrentes([...concorrentes, { 
      nome: '', 
      marca: '', 
      modelo: '', 
      quantidade: 0,
      quantidadeExamesMes: 0
    }]);
  };

  const removerConcorrente = (index: number) => {
    setConcorrentes(concorrentes.filter((_, i) => i !== index));
  };

  const atualizarConcorrente = (index: number, campo: string, valor: any) => {
    const novosConcorrentes = [...concorrentes];
    novosConcorrentes[index] = { ...novosConcorrentes[index], [campo]: valor };
    setConcorrentes(novosConcorrentes);
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 30) return 'bg-red-500';
    if (valor < 60) return 'bg-yellow-500';
    if (valor < 80) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-500';
      case 'enviado': return 'bg-blue-500';
      case 'aprovado': return 'bg-green-500';
      case 'cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleEnviarExpedicao = (pedido: PedidoCompleto) => {
    const novoChecklist = {
      id: `CHK-${pedido.id}`,
      numeroPedido: `#${pedido.id.toString().slice(-6)}`,
      cliente: formData.nomeFantasia || formData.razaoSocial || 'Cliente não definido',
      cnpjCliente: formData.cpfCnpj || '',
      vendedor: formData.colaboradoresResponsaveis || 'Não definido',
      dataEmissaoPedido: pedido.dataVenda,
      valorTotal: pedido.valorTotal,
      status: 'Aguardando',
      estoqueValidado: false,
      servicosConcluidos: false,
      documentacaoCompleta: false,
      creditoAprovado: false,
      produtos: pedido.produtos,
      observacoes: `Pedido enviado do Comercial - Contratação`
    };
    
    mockChecklistVendas.push(novoChecklist as any);
    
    setPedidos(prev => prev.map(p => 
      p.id === pedido.id 
        ? { ...p, status: 'enviado' } 
        : p
    ));
    
    toast.success(`Pedido #${pedido.id.toString().slice(-6)} enviado para Expedição!`);
  };

  const licitacaoVinculadaData = getLicitacaoById(licitacaoVinculada);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>
                  {oportunidade ? 'Editar' : 'Novo'} Projeto - Contratação
                </span>
                {licitacaoVinculadaData && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Link2 className="h-3 w-3 mr-1" />
                    Vinculada à {licitacaoVinculadaData.numeroPregao}
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${oportunidade ? 'grid-cols-9' : 'grid-cols-8'}`}>
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              {oportunidade && (
                <TabsTrigger value="saldo-cliente" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Saldo do Cliente
                </TabsTrigger>
              )}
              <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Análise Técnica
              </TabsTrigger>
              <TabsTrigger value="dt" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                DT
              </TabsTrigger>
              <TabsTrigger value="historico-chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Histórico/Chat
              </TabsTrigger>
              <TabsTrigger value="documentos" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="chamados" className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                Chamados
              </TabsTrigger>
              <TabsTrigger value="interfaceamento" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Interfaceamento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-6">
              {/* Vincular Licitação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Vincular Licitação Ganha
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="licitacao">Selecionar Licitação</Label>
                      <Select value={licitacaoVinculada} onValueChange={handleVincularLicitacao}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma licitação ganha para vincular" />
                        </SelectTrigger>
                        <SelectContent>
                          {licitacoesGanhas.map((licitacao) => (
                            <SelectItem key={licitacao.id} value={licitacao.id.toString()}>
                              {licitacao.numeroPregao} - {licitacao.nomeInstituicao} ({formatCurrency(licitacao.estrategiaValorFinal)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {licitacaoVinculadaData && (
                      <div className="space-y-4">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Licitação Vinculada:</strong> {licitacaoVinculadaData.numeroPregao}
                          </p>
                          <p className="text-sm text-green-600">
                            {licitacaoVinculadaData.objetoLicitacao}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Os dados do cliente, documentos, histórico e pedidos foram importados automaticamente.
                          </p>
                        </div>

                        {/* Empresa Participante 1 */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Building2 className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Empresa Participante 1</span>
                          </div>
                          {empresaContrato.empresaParticipanteId ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-blue-900">{empresaContrato.empresaParticipanteNome}</p>
                                  <p className="text-xs text-blue-600">CNPJ: {empresaContrato.empresaParticipanteCNPJ}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-blue-600" />
                                <Select value={empresaContrato.empresaParticipanteId} onValueChange={(val) => handleAlterarEmpresaContrato(val, 1)}>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Alterar empresa" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {empresasDisponiveis.map((empresa) => (
                                      <SelectItem key={empresa.id} value={empresa.id}>
                                        {empresa.nome} - {empresa.cnpj}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-xs text-blue-600">Nenhuma empresa definida</p>
                              <Select value="" onValueChange={(val) => handleAlterarEmpresaContrato(val, 1)}>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Selecionar empresa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {empresasDisponiveis.map((empresa) => (
                                    <SelectItem key={empresa.id} value={empresa.id}>
                                      {empresa.nome} - {empresa.cnpj}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>

                        {/* Empresa Participante 2 - só aparece se a licitação tiver empresa 2 */}
                        {licitacaoVinculadaData?.empresaParticipanteId2 && (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-3">
                            <Building2 className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-purple-800">Empresa Participante 2</span>
                          </div>
                          {empresaContrato2.empresaParticipanteId ? (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-purple-900">{empresaContrato2.empresaParticipanteNome}</p>
                                  <p className="text-xs text-purple-600">CNPJ: {empresaContrato2.empresaParticipanteCNPJ}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <RefreshCw className="h-4 w-4 text-purple-600" />
                                <Select value={empresaContrato2.empresaParticipanteId} onValueChange={(val) => handleAlterarEmpresaContrato(val, 2)}>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Alterar empresa" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {empresasDisponiveis.map((empresa) => (
                                      <SelectItem key={empresa.id} value={empresa.id}>
                                        {empresa.nome} - {empresa.cnpj}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-xs text-purple-600">Nenhuma empresa definida</p>
                              <Select value="" onValueChange={(val) => handleAlterarEmpresaContrato(val, 2)}>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Selecionar empresa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {empresasDisponiveis.map((empresa) => (
                                    <SelectItem key={empresa.id} value={empresa.id}>
                                      {empresa.nome} - {empresa.cnpj}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados do Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Cliente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                        <Input
                          id="cpfCnpj"
                          value={formData.cpfCnpj}
                          onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                          placeholder="Digite o CPF ou CNPJ"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nomeFantasia">Nome/Nome Fantasia *</Label>
                        <Input
                          id="nomeFantasia"
                          value={formData.nomeFantasia}
                          onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                          placeholder="Digite o nome"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                        placeholder="Digite a razão social"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="endereco">Endereço do Cliente</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          placeholder="Digite o endereço"
                        />
                      </div>
                      <div>
                        <Label htmlFor="uf">UF</Label>
                        <Select value={formData.uf} onValueChange={(value) => handleInputChange('uf', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">SP</SelectItem>
                            <SelectItem value="RJ">RJ</SelectItem>
                            <SelectItem value="MG">MG</SelectItem>
                            <SelectItem value="RS">RS</SelectItem>
                            <SelectItem value="PR">PR</SelectItem>
                            <SelectItem value="SC">SC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Digite o e-mail"
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={formData.telefone}
                          onChange={(e) => handleInputChange('telefone', e.target.value)}
                          placeholder="Digite o telefone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Digite o website"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ativo"
                        checked={formData.ativo}
                        onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                      />
                      <Label htmlFor="ativo">Cliente Ativo</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados da Oportunidade */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dados do Projeto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fonteLead">Fonte do Lead</Label>
                        <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="site">Site</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="cold_call">Cold Call</SelectItem>
                            <SelectItem value="licitacao">Licitação</SelectItem>
                            <SelectItem value="referencia">Referência</SelectItem>
                            <SelectItem value="evento">Evento</SelectItem>
                            <SelectItem value="telefone">Telefone</SelectItem>
                            <SelectItem value="email">E-mail</SelectItem>
                            <SelectItem value="presencial">Presencial</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="video_chamada">Vídeo Chamada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="valorNegocio">Valor Original do Contrato</Label>
                        <Input
                          id="valorNegocio"
                          type="number"
                          value={formData.valorNegocio}
                          disabled
                          className="bg-muted cursor-not-allowed"
                          placeholder="Valor definido pela licitação"
                        />
                      </div>
                    </div>

                    {/* Valor Atualizado e Aditivos */}
                    {aditivos.length > 0 && (
                      <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border">
                        <div>
                          <span className="text-xs text-muted-foreground">Valor Original</span>
                          <p className="font-semibold">{formatCurrency(valorOriginal)}</p>
                        </div>
                        <span className="text-muted-foreground">→</span>
                        <div>
                          <span className="text-xs text-muted-foreground">Valor Atualizado</span>
                          <p className="font-bold text-primary">{formatCurrency(valorAtualizado)}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">{aditivos.length} aditivo(s)</Badge>
                      </div>
                    )}

                    {/* Seção Aditivos Contratuais */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-md font-medium">Aditivos Contratuais</h4>
                        <Button type="button" size="sm" onClick={() => setModalNovoAditivoOpen(true)}>
                          <Plus className="h-4 w-4 mr-1" /> Novo Aditivo
                        </Button>
                      </div>

                      {aditivos.length > 0 ? (
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead>Registrado por</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {aditivos.map(aditivo => (
                                <TableRow key={aditivo.id}>
                                  <TableCell className="text-xs">{new Date(aditivo.criadoEm).toLocaleDateString('pt-BR')}</TableCell>
                                  <TableCell><Badge variant="outline" className="text-xs">{aditivo.tipo}</Badge></TableCell>
                                  <TableCell className={aditivo.valor >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{formatCurrency(aditivo.valor)}</TableCell>
                                  <TableCell className="text-xs">{aditivo.empresaNome}<br/><span className="text-muted-foreground">{aditivo.empresaCNPJ}</span></TableCell>
                                  <TableCell>
                                    <a href={aditivo.documentoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                                      <FileText className="h-3 w-3" />{aditivo.documentoNome}
                                    </a>
                                  </TableCell>
                                  <TableCell className="text-xs">{aditivo.criadoPor}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">Nenhum aditivo registrado.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="segmentoLead">Segmento do Lead</Label>
                        <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospitalar">Hospitalar</SelectItem>
                            <SelectItem value="universitario">Universitário</SelectItem>
                            <SelectItem value="publico">Público</SelectItem>
                            <SelectItem value="privado">Privado</SelectItem>
                            <SelectItem value="municipal">Municipal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="colaboradoresResponsaveis">Colaboradores Responsáveis</Label>
                      <Input
                        id="colaboradoresResponsaveis"
                        value={formData.colaboradoresResponsaveis}
                        onChange={(e) => handleInputChange('colaboradoresResponsaveis', e.target.value)}
                        placeholder="Digite os responsáveis"
                      />
                    </div>

                    <div>
                      <Label htmlFor="procurandoPor">Procurando Por (Contatos vinculados)</Label>
                      <Input
                        id="procurandoPor"
                        value={formData.procurandoPor}
                        onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                        placeholder="Digite os contatos"
                      />
                    </div>

                    <div>
                      <Label htmlFor="previsaoConsumoMensal">Previsão de consumo mensal?</Label>
                      <Input
                        id="previsaoConsumoMensal"
                        type="text"
                        value={formData.previsaoConsumoMensal}
                        onChange={(e) => handleInputChange('previsaoConsumoMensal', e.target.value)}
                        placeholder="Digite a quantidade de testes"
                      />
                    </div>

                    {/* Seção Contato Comercial */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Contato Comercial</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contatoComercialNome">Nome do Contato Comercial</Label>
                          <Input
                            id="contatoComercialNome"
                            value={formData.contatoComercialNome}
                            onChange={(e) => handleInputChange('contatoComercialNome', e.target.value)}
                            placeholder="Digite o nome do contato"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialSetor">Setor do Contato Comercial</Label>
                          <Input
                            id="contatoComercialSetor"
                            value={formData.contatoComercialSetor}
                            onChange={(e) => handleInputChange('contatoComercialSetor', e.target.value)}
                            placeholder="Digite o setor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialTelefone">Telefone do Contato Comercial</Label>
                          <Input
                            id="contatoComercialTelefone"
                            type="tel"
                            value={formData.contatoComercialTelefone}
                            onChange={(e) => handleInputChange('contatoComercialTelefone', e.target.value)}
                            placeholder="Digite o telefone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contatoComercialEmail">E-mail do Contato Comercial</Label>
                          <Input
                            id="contatoComercialEmail"
                            type="email"
                            value={formData.contatoComercialEmail}
                            onChange={(e) => handleInputChange('contatoComercialEmail', e.target.value)}
                            placeholder="Digite o e-mail"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Organização */}
                <Card>
                  <CardHeader>
                    <CardTitle>Organização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="Digite as tags separadas por vírgula"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho</Label>
                      <Textarea
                        id="fluxoTrabalho"
                        value={formData.fluxoTrabalho}
                        onChange={(e) => handleInputChange('fluxoTrabalho', e.target.value)}
                        placeholder="Descreva o fluxo de trabalho"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_triagem">Em Triagem</SelectItem>
                          <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                          <SelectItem value="ganha">Ganha</SelectItem>
                          <SelectItem value="perdida">Perdida</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.status === 'ganha' && (
                      <div>
                        <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
                        <Textarea
                          id="motivoGanho"
                          value={formData.motivoGanho}
                          onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
                          placeholder="Descreva o motivo do ganho"
                          rows={3}
                        />
                      </div>
                    )}

                    {formData.status === 'perdida' && (
                      <div>
                        <Label htmlFor="motivoPerda">Motivo de Perda</Label>
                        <Textarea
                          id="motivoPerda"
                          value={formData.motivoPerda}
                          onChange={(e) => handleInputChange('motivoPerda', e.target.value)}
                          placeholder="Descreva o motivo da perda"
                          rows={3}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        placeholder="Descrição geral da oportunidade"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Análise da Concorrência */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análise da Concorrência</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {concorrentes.map((concorrente, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">Concorrente {index + 1}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removerConcorrente(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              placeholder="Nome do concorrente"
                              value={concorrente.nome}
                              onChange={(e) => atualizarConcorrente(index, 'nome', e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Marca do concorrente"
                                value={concorrente.marca}
                                onChange={(e) => atualizarConcorrente(index, 'marca', e.target.value)}
                              />
                              <Input
                                placeholder="Modelo do concorrente"
                                value={concorrente.modelo}
                                onChange={(e) => atualizarConcorrente(index, 'modelo', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label>Quantidade</Label>
                                <Input
                                  type="number"
                                  placeholder="Quantidade"
                                  value={concorrente.quantidade}
                                  onChange={(e) => atualizarConcorrente(index, 'quantidade', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                              <div>
                                <Label>Quantidade de exames/mês</Label>
                                <Input
                                  type="number"
                                  placeholder="Quantidade de exames/mês"
                                  value={concorrente.quantidadeExamesMes}
                                  onChange={(e) => atualizarConcorrente(index, 'quantidadeExamesMes', parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={adicionarConcorrente}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Concorrente
                      </Button>
                    </div>

                    <div className="space-y-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="propostaNegociacao"
                          checked={formData.propostaNegociacao}
                          onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
                        />
                        <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
                      </div>

                      <div>
                        <Label htmlFor="termometro" className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          Termômetro: {formData.termometro}°
                        </Label>
                        <div className="mt-2">
                          <input
                            type="range"
                            id="termometro"
                            min="0"
                            max="100"
                            value={formData.termometro}
                            onChange={(e) => handleInputChange('termometro', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0°</span>
                            <span>50°</span>
                            <span>100°</span>
                          </div>
                        </div>
                      <div className="mt-2 flex items-center gap-2">
                          <div 
                            className={`w-4 h-4 rounded-full ${getTermometroColor(formData.termometro)}`}
                            title={`Termômetro: ${formData.termometro}°`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {formData.termometro < 30 ? 'Frio' : 
                             formData.termometro < 60 ? 'Morno' : 
                             formData.termometro < 80 ? 'Quente' : 'Muito Quente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Representação Comercial */}
                <Card>
                  <CardHeader>
                    <CardTitle>Representação Comercial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="representanteResponsavel">Representante Responsável</Label>
                        <Select
                          value={formData.representanteResponsavel}
                          onValueChange={(value) => handleInputChange('representanteResponsavel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o representante" />
                          </SelectTrigger>
                          <SelectContent>
                            {colaboradores.map((colab) => (
                              <SelectItem key={colab.id} value={colab.nome}>
                                {colab.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="percentualComissao">Percentual de Comissão (%)</Label>
                        <Input
                          id="percentualComissao"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={formData.percentualComissao}
                          onChange={(e) => handleInputChange('percentualComissao', parseFloat(e.target.value) || 0)}
                          placeholder="Ex: 5.5"
                        />
                      </div>
                    </div>

                    {/* Histórico de Visitas */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-medium flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Histórico de Visitas
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setModalHistoricoOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Histórico
                        </Button>
                      </div>
                      
                      {historicoVisitas.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Nenhuma visita registrada</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Colaborador</TableHead>
                                <TableHead>Observação</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {historicoVisitas
                                .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                                .map((visita) => (
                                <TableRow key={visita.id}>
                                  <TableCell className="font-medium">
                                    {new Date(visita.data).toLocaleDateString('pt-BR')}
                                  </TableCell>
                                  <TableCell>{visita.colaborador}</TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {visita.observacao}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba Saldo do Cliente - Apenas em modo edição */}
            {oportunidade && (
              <TabsContent value="saldo-cliente" className="space-y-6">
                {(() => {
                  // Cálculos do saldo
                  const valorNegocio = valorAtualizado;
                  const totalPedidos = pedidos.reduce((sum, pedido) => sum + (pedido.valorTotal || 0), 0);
                  const totalServicos = 0; // Preparado para futuro
                  const totalChamados = 0; // Preparado para futuro - chamados não têm valor ainda
                  const totalGasto = totalPedidos + totalServicos + totalChamados;
                  const saldoRestante = valorNegocio - totalGasto;
                  const percentualConsumido = valorNegocio > 0 ? (totalGasto / valorNegocio) * 100 : 0;

                  return (
                    <>
                      {/* Cards de Resumo */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Valor do Negócio</p>
                                <p className="text-2xl font-bold text-blue-600">{formatCurrency(valorNegocio)}</p>
                              </div>
                              <DollarSign className="h-8 w-8 text-blue-500 opacity-50" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-orange-500">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Gasto</p>
                                <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalGasto)}</p>
                              </div>
                              <TrendingDown className="h-8 w-8 text-orange-500 opacity-50" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className={`border-l-4 ${saldoRestante >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Saldo Restante</p>
                                <p className={`text-2xl font-bold ${saldoRestante >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {formatCurrency(saldoRestante)}
                                </p>
                              </div>
                              <Wallet className={`h-8 w-8 ${saldoRestante >= 0 ? 'text-green-500' : 'text-red-500'} opacity-50`} />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Barra de Progresso */}
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Consumo do Orçamento</span>
                              <span className={`font-medium ${percentualConsumido > 100 ? 'text-red-600' : percentualConsumido > 80 ? 'text-orange-600' : 'text-green-600'}`}>
                                {percentualConsumido.toFixed(1)}%
                              </span>
                            </div>
                            <Progress 
                              value={Math.min(percentualConsumido, 100)} 
                              className={`h-3 ${percentualConsumido > 100 ? '[&>div]:bg-red-500' : percentualConsumido > 80 ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                            />
                            {percentualConsumido > 100 && (
                              <p className="text-sm text-red-600 font-medium">
                                ⚠️ Orçamento excedido em {formatCurrency(Math.abs(saldoRestante))}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Detalhamento - Pedidos */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Package className="h-5 w-5 text-blue-500" />
                            Pedidos
                            <Badge variant="secondary" className="ml-auto">
                              {formatCurrency(totalPedidos)}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {pedidos.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Nenhum pedido registrado</p>
                            </div>
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Data</TableHead>
                                  <TableHead>Nº Pedido</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Valor</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {pedidos.map((pedido) => (
                                  <TableRow key={pedido.id}>
                                    <TableCell>{new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell className="font-mono">#{pedido.id.toString().slice(-6)}</TableCell>
                                    <TableCell>
                                      <Badge className={`${getStatusColor(pedido.status)} text-white`}>
                                        {pedido.status.toUpperCase()}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(pedido.valorTotal)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </CardContent>
                      </Card>

                      {/* Detalhamento - Serviços */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Wrench className="h-5 w-5 text-purple-500" />
                            Serviços
                            <Badge variant="secondary" className="ml-auto">
                              {formatCurrency(totalServicos)}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-6 text-muted-foreground">
                            <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Nenhum serviço registrado</p>
                            <p className="text-xs mt-1">Integração com serviços em breve</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Detalhamento - Chamados */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Phone className="h-5 w-5 text-amber-500" />
                            Chamados
                            <Badge variant="secondary" className="ml-auto">
                              {formatCurrency(totalChamados)}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {chamados.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                              <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Nenhum chamado com valor registrado</p>
                            </div>
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Data</TableHead>
                                  <TableHead>Tipo</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Valor</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {chamados.map((chamado) => (
                                  <TableRow key={chamado.id}>
                                    <TableCell>{new Date(chamado.dataAbertura).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>{chamado.tipo}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{chamado.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">-</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </CardContent>
                      </Card>
                    </>
                  );
                })()}
              </TabsContent>
            )}

            <TabsContent value="analise-tecnica" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Ordens de Serviço - Análise Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {osVinculadas.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nenhuma ordem de serviço vinculada a esta contratação.
                    </p>
                  ) : (
                    <>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>N. OS</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Assessor</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-center">Ação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {osVinculadas.map((os) => (
                            <React.Fragment key={os.id}>
                              <TableRow key={os.id}>
                                <TableCell className="font-medium">{os.numero}</TableCell>
                                <TableCell>{os.tipo}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    os.status === 'CONCLUÍDA'
                                      ? 'bg-green-100 text-green-800 border-green-200'
                                      : os.status === 'EM_ANDAMENTO'
                                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                      : 'bg-blue-100 text-blue-800 border-blue-200'
                                  }>
                                    {os.status === 'CONCLUÍDA' ? 'Concluída' : os.status === 'EM_ANDAMENTO' ? 'Em Andamento' : os.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{os.assessor}</TableCell>
                                <TableCell>{new Date(os.dataAgendada).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setOsExpandida(osExpandida === os.id ? null : os.id)}
                                  >
                                    {osExpandida === os.id ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                    <span className="ml-1 text-xs">Ver {osExpandida === os.id ? 'Menos' : 'Mais'}</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                              {osExpandida === os.id && (
                                <TableRow key={`${os.id}-desc`}>
                                  <TableCell colSpan={6} className="bg-muted/30 border-l-4 border-primary">
                                    <div className="py-2 px-4">
                                      <p className="text-sm font-medium mb-1">Descrição do Serviço:</p>
                                      <p className="text-sm text-muted-foreground">{os.descricao}</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 text-sm text-muted-foreground text-right">
                        Total: {osVinculadas.length} {osVinculadas.length === 1 ? 'ordem de serviço vinculada' : 'ordens de serviço vinculadas'}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Ordens de Serviço - Departamento Técnico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {osDepartamentoTecnico.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nenhuma ordem de serviço do Departamento Técnico vinculada a esta contratação.
                    </p>
                  ) : (
                    <>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>N. OS</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Técnico</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead className="text-center">Ação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {osDepartamentoTecnico.map((os) => (
                            <React.Fragment key={os.id}>
                              <TableRow>
                                <TableCell className="font-medium">{os.numero}</TableCell>
                                <TableCell>{os.tipo}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    os.status === 'CONCLUÍDA'
                                      ? 'bg-green-100 text-green-800 border-green-200'
                                      : os.status === 'EM_ANDAMENTO'
                                      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                      : 'bg-blue-100 text-blue-800 border-blue-200'
                                  }>
                                    {os.status === 'CONCLUÍDA' ? 'Concluída' : os.status === 'EM_ANDAMENTO' ? 'Em Andamento' : os.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{os.tecnico}</TableCell>
                                <TableCell>{new Date(os.dataAgendada).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell className="text-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setOsDtExpandida(osDtExpandida === os.id ? null : os.id)}
                                  >
                                    {osDtExpandida === os.id ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                    <span className="ml-1 text-xs">Ver {osDtExpandida === os.id ? 'Menos' : 'Mais'}</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                              {osDtExpandida === os.id && (
                                <TableRow>
                                  <TableCell colSpan={6} className="bg-muted/30 border-l-4 border-primary">
                                    <div className="py-2 px-4">
                                      <p className="text-sm font-medium mb-1">Descrição do Serviço:</p>
                                      <p className="text-sm text-muted-foreground">{os.descricao}</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 text-sm text-muted-foreground text-right">
                        Total: {osDepartamentoTecnico.length} {osDepartamentoTecnico.length === 1 ? 'ordem de serviço vinculada' : 'ordens de serviço vinculadas'}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico-chat" className="space-y-4">
              {/* Histórico importado da licitação */}
              {historicoLicitacao.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Histórico Importado da Licitação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {historicoLicitacao.map((entry, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{entry.usuario}</span>
                              <Badge variant="outline" className="text-xs">
                                {entry.departamento}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{entry.texto}</p>
                          {entry.anexos && entry.anexos.length > 0 && (
                            <div className="mt-2">
                              {entry.anexos.map((anexo, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs mr-1">
                                  {anexo}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Chat Interno</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4">
              {(() => {
                const temDuasEmpresas = !!empresaContrato2.empresaParticipanteId;

                if (!temDuasEmpresas) {
                  // Layout original: empresa única
                  return (
                    <>
                      {documentosLicitacao.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Documentos Importados da Licitação
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {documentosLicitacao.map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    <div>
                                      <p className="font-medium text-sm">{doc.nome}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {doc.tipo} • {new Date(doc.data).toLocaleDateString('pt-BR')}
                                      </p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Card>
                        <CardHeader>
                          <CardTitle>Adicionar Novos Documentos</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                            <Upload className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                            <p className="text-muted-foreground mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                            <Button variant="outline">Selecionar Arquivos</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                }

                // Layout separado por empresa
                const docsGerais = documentosLicitacao.filter(doc => !doc.empresaId);
                const docsEmpresa1 = documentosLicitacao.filter(doc => doc.empresaId === empresaContrato.empresaParticipanteId);
                const docsEmpresa2 = documentosLicitacao.filter(doc => doc.empresaId === empresaContrato2.empresaParticipanteId);

                const renderDocList = (docs: any[]) => (
                  <div className="space-y-2">
                    {docs.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Nenhum documento nesta seção</p>
                    ) : (
                      docs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-sm">{doc.nome}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.tipo} • {new Date(doc.data).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                );

                return (
                  <>
                    {/* Documentos Gerais */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <FileText className="h-5 w-5" />
                          Documentos Gerais da Licitação
                        </CardTitle>
                      </CardHeader>
                      <CardContent>{renderDocList(docsGerais)}</CardContent>
                    </Card>

                    {/* Empresa 1 */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Building2 className="h-5 w-5 text-blue-500" />
                          <span>Empresa 1: {empresaContrato.empresaParticipanteNome || 'Não definida'}</span>
                          {empresaContrato.empresaParticipanteCNPJ && (
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              {empresaContrato.empresaParticipanteCNPJ}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>{renderDocList(docsEmpresa1)}</CardContent>
                    </Card>

                    {/* Empresa 2 */}
                    <Card className="border-l-4 border-l-emerald-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Building2 className="h-5 w-5 text-emerald-500" />
                          <span>Empresa 2: {empresaContrato2.empresaParticipanteNome || 'Não definida'}</span>
                          {empresaContrato2.empresaParticipanteCNPJ && (
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              {empresaContrato2.empresaParticipanteCNPJ}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>{renderDocList(docsEmpresa2)}</CardContent>
                    </Card>

                    {/* Upload com seletor de empresa */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Adicionar Novos Documentos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Vincular documento a:</Label>
                          <Select value={empresaUploadSelecionada} onValueChange={setEmpresaUploadSelecionada}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione a empresa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="geral">Documentos Gerais da Licitação</SelectItem>
                              <SelectItem value={empresaContrato.empresaParticipanteId || 'emp1'}>
                                Empresa 1: {empresaContrato.empresaParticipanteNome || 'Não definida'}
                              </SelectItem>
                              <SelectItem value={empresaContrato2.empresaParticipanteId || 'emp2'}>
                                Empresa 2: {empresaContrato2.empresaParticipanteNome || 'Não definida'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                          <Button variant="outline">Selecionar Arquivos</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </TabsContent>

            <TabsContent value="pedidos" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gerenciamento de Pedidos</CardTitle>
                  <Button 
                    onClick={() => setIsPedidoModalOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Novo Pedido
                  </Button>
                </CardHeader>
                <CardContent>
                  {pedidos.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Nenhum pedido associado a esta oportunidade</p>
                      <p className="text-sm text-gray-500">
                        Clique em "Criar Novo Pedido" para começar a adicionar produtos
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nº Pedido</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Produtos</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.map((pedido) => (
                            <TableRow key={pedido.id}>
                              <TableCell className="font-mono text-sm">
                                #{pedido.id.toString().slice(-6)}
                              </TableCell>
                              <TableCell>
                                {new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell>
                                <Badge className={`${getStatusColor(pedido.status)} text-white`}>
                                  {pedido.status.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {pedido.produtos.length} {pedido.produtos.length === 1 ? 'produto' : 'produtos'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {pedido.produtos.slice(0, 2).map(p => p.codigo).join(', ')}
                                    {pedido.produtos.length > 2 && ` +${pedido.produtos.length - 2}`}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-green-600">
                                {formatCurrency(pedido.valorTotal)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" title="Visualizar">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {pedido.status === 'rascunho' && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => handleEnviarExpedicao(pedido)}
                                      title="Enviar para Expedição"
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                      <Send className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chamados" className="space-y-4">
              <ChamadosTab 
                chamados={chamados}
                onAdicionarChamado={handleAdicionarChamado}
                oportunidade={{
                  id: oportunidade?.id,
                  codigo: oportunidade?.codigo || oportunidade?.id || `OPP-${Date.now()}`,
                  cliente: formData.nomeFantasia || formData.razaoSocial,
                  responsavel: formData.colaboradoresResponsaveis,
                  valor: formData.valorNegocio,
                  status: formData.status,
                  segmento: formData.segmentoLead
                }}
              />
            </TabsContent>

            <TabsContent value="interfaceamento" className="space-y-4">
              <InterfaceamentoTab 
                oportunidade={{
                  id: oportunidade?.id,
                  codigo: oportunidade?.codigo || oportunidade?.id || `OPP-${Date.now()}`,
                  cliente: formData.nomeFantasia || formData.razaoSocial,
                  responsavel: formData.colaboradoresResponsaveis,
                  valor: formData.valorNegocio,
                  status: formData.status,
                  segmento: formData.segmentoLead
                }}
                formData={formData}
                onInputChange={handleInputChange}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Atualizar' : 'Salvar'} Oportunidade
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Adicionar Histórico de Visitas */}
      <Dialog open={modalHistoricoOpen} onOpenChange={setModalHistoricoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Histórico de Visita</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="colaboradorVisita">Colaborador</Label>
              <Select 
                value={novaVisita.colaborador} 
                onValueChange={(value) => setNovaVisita(prev => ({ ...prev, colaborador: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradores.map((colaborador) => (
                    <SelectItem key={colaborador.id} value={colaborador.nome}>
                      {colaborador.nome} - {colaborador.cargo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dataVisita">Data da Visita</Label>
              <Input
                id="dataVisita"
                type="date"
                value={novaVisita.data}
                onChange={(e) => setNovaVisita(prev => ({ ...prev, data: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="observacaoVisita">Observações</Label>
              <Textarea
                id="observacaoVisita"
                value={novaVisita.observacao}
                onChange={(e) => setNovaVisita(prev => ({ ...prev, observacao: e.target.value }))}
                placeholder="Descreva os detalhes da visita..."
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setModalHistoricoOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAdicionarVisita}
              disabled={!novaVisita.colaborador || !novaVisita.data || !novaVisita.observacao}
            >
              Adicionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PedidoModal
        isOpen={isPedidoModalOpen}
        onClose={() => setIsPedidoModalOpen(false)}
        onSave={handleSalvarPedido}
        oportunidade={oportunidade || { nomeFantasia: 'Cliente Novo', id: 'novo' }}
      />

      {/* Modal de Aditivo Obrigatório */}
      <Dialog open={modalAditivoOpen} onOpenChange={(open) => { if (!open) handleCancelarAlteracaoEmpresa(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-orange-500" />
              Aditivo de Mudança de Empresa
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                Você está alterando a empresa participante {empresaPendente?.numero}.
              </p>
              <p className="text-sm text-orange-700 mt-1">
                É <strong>obrigatório</strong> anexar o aditivo contratual de mudança de empresa.
              </p>
            </div>

            {aditivoFile ? (
              <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{aditivoFile.name}</p>
                    <p className="text-xs text-green-600">
                      {(aditivoFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setAditivoFile(null)} className="text-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => aditivoFileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Clique para selecionar ou arraste o arquivo</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (máx. 10MB)</p>
              </div>
            )}

            <input
              ref={aditivoFileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    toast.error('Arquivo muito grande. Máximo 10MB.');
                    return;
                  }
                  setAditivoFile(file);
                }
                if (aditivoFileInputRef.current) aditivoFileInputRef.current.value = '';
              }}
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={handleCancelarAlteracaoEmpresa}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmarAlteracaoEmpresa}
              disabled={!aditivoFile}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Confirmar Alteração
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Novo Aditivo Contratual */}
      <Dialog open={modalNovoAditivoOpen} onOpenChange={(open) => { if (!open) { setModalNovoAditivoOpen(false); setNovoAditivo({ tipo: '', valor: '', justificativa: '', empresaId: '' }); setAditivoDocFile(null); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Novo Aditivo Contratual
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Tipo do Aditivo *</Label>
              <Select value={novoAditivo.tipo} onValueChange={(v) => setNovoAditivo(prev => ({ ...prev, tipo: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Acréscimo de Valor">Acréscimo de Valor</SelectItem>
                  <SelectItem value="Supressão de Valor">Supressão de Valor</SelectItem>
                  <SelectItem value="Prorrogação de Prazo">Prorrogação de Prazo</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Valor do Aditivo (R$) *</Label>
              <Input
                type="number"
                value={novoAditivo.valor}
                onChange={(e) => setNovoAditivo(prev => ({ ...prev, valor: e.target.value }))}
                placeholder="Ex: 15000 para acréscimo, -5000 para supressão"
              />
            </div>

            <div>
              <Label>Justificativa * <span className="text-xs text-muted-foreground">(mín. 50 caracteres - {novoAditivo.justificativa.length}/50)</span></Label>
              <Textarea
                value={novoAditivo.justificativa}
                onChange={(e) => setNovoAditivo(prev => ({ ...prev, justificativa: e.target.value }))}
                placeholder="Descreva a justificativa do aditivo (mínimo 50 caracteres)"
                rows={3}
              />
            </div>

            {temDuasEmpresas && (
              <div>
                <Label>Empresa Vinculada *</Label>
                <Select value={novoAditivo.empresaId} onValueChange={(v) => setNovoAditivo(prev => ({ ...prev, empresaId: v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione a empresa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={empresaContrato.empresaParticipanteId}>
                      {empresaContrato.empresaParticipanteNome} ({empresaContrato.empresaParticipanteCNPJ})
                    </SelectItem>
                    <SelectItem value={empresaContrato2.empresaParticipanteId}>
                      {empresaContrato2.empresaParticipanteNome} ({empresaContrato2.empresaParticipanteCNPJ})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Documento do Aditivo *</Label>
              {aditivoDocFile ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50 mt-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{aditivoDocFile.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setAditivoDocFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors mt-1"
                  onClick={() => aditivoDocFileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Clique para selecionar o arquivo</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX</p>
                </div>
              )}
              <input
                ref={aditivoDocFileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setAditivoDocFile(file);
                  if (aditivoDocFileInputRef.current) aditivoDocFileInputRef.current.value = '';
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setModalNovoAditivoOpen(false)}>Cancelar</Button>
            <Button onClick={handleAdicionarAditivo}>Registrar Aditivo</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContratacaoSimplesForm;
