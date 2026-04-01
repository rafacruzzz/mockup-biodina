import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
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
import { X, Plus, FileText, MessageSquare, Upload, Package, Thermometer, ShoppingCart, Eye, Headphones, Link2, Download, Clock, Calendar as CalendarIcon, Network, Send, Wallet, TrendingDown, DollarSign, Wrench, Phone, Building2, RefreshCw, ChevronDown, ChevronUp, ExternalLink, Copy, XCircle, Briefcase, AlertTriangle } from 'lucide-react';
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
  const [pedidosServico, setPedidosServico] = useState<Array<{
    id: string;
    numeroPedido: string;
    dataFaturamento: string;
    periodoCompetencia: string;
    nfs: string;
    empenho: string;
    processo: string;
    valorNfs: number;
  }>>([
    { id: 'srv-001', numeroPedido: 'PED-SRV-2025-001', dataFaturamento: '13/03/2025', periodoCompetencia: 'Março/2025', nfs: 'NFS-00123', empenho: 'EMP-2025-001', processo: 'PROC-2025-001', valorNfs: 4500 },
    { id: 'srv-002', numeroPedido: 'PED-SRV-2026-002', dataFaturamento: '13/02/2026', periodoCompetencia: 'Fevereiro/2026', nfs: 'NFS-00456', empenho: 'EMP-2026-002', processo: 'PROC-2026-002', valorNfs: 7800 },
  ]);
  const [chamados, setChamados] = useState<Chamado[]>(oportunidade?.chamados || []);
  const [isPedidoModalOpen, setIsPedidoModalOpen] = useState(false);
  const [tipoContratacao, setTipoContratacao] = useState<'publico' | 'privado' | 'filantropico' | ''>('');
  const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
  const [licitacaoVinculada, setLicitacaoVinculada] = useState<string>('');
  const [documentosLicitacao, setDocumentosLicitacao] = useState<any[]>([]);
  const [historicoLicitacao, setHistoricoLicitacao] = useState<any[]>([]);
   const [historicoVisitas, setHistoricoVisitas] = useState<HistoricoVisita[]>(oportunidade?.historicoVisitas || []);
   const [interfaceamentos, setInterfaceamentos] = useState<any[]>(oportunidade?.interfaceamentos || []);
  const [linkExternoRepresentacao, setLinkExternoRepresentacao] = useState('');

  // Dynamic lists for Dados do Projeto
  const [contatosComerciais, setContatosComerciais] = useState<Array<{id: string; nome: string; cargo: string; telefone: string; email: string}>>(
    oportunidade?.contatosComerciais || []
  );
  const [representantesVinculados, setRepresentantesVinculados] = useState<Array<{id: string; nome: string; percentualComissao: number}>>(
    oportunidade?.representantesVinculados || []
  );
  const [colaboradoresGestao, setColaboradoresGestao] = useState<string[]>(oportunidade?.colaboradoresGestao || []);
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
  const [concorrentesBiodinaRep, setConcorrentesBiodinaRep] = useState<Array<{ id: string; nome: string; marca: string; modelo: string; quantidade: string; examesMes: string }>>([
    { id: crypto.randomUUID(), nome: '', marca: '', modelo: '', quantidade: '', examesMes: '' },
    { id: crypto.randomUUID(), nome: '', marca: '', modelo: '', quantidade: '', examesMes: '' },
  ]);
  const [solicitacoesJuridicas, setSolicitacoesJuridicas] = useState<Array<{ id: string; questao: string; dataEnvio: string; resposta: string; dataResposta: string }>>([]);
  const [questaoJuridicaAtual, setQuestaoJuridicaAtual] = useState('');
  const [solicitacoesGerenciais, setSolicitacoesGerenciais] = useState<Array<{ id: string; questao: string; dataEnvio: string; resposta: string; dataResposta: string }>>([]);
  const [questaoGerencialAtual, setQuestaoGerencialAtual] = useState('');

  // Estados para aba Empenho - visão consolidada por valor
  const [empenhos, setEmpenhos] = useState<Array<{
    id: string;
    numeroEmpenho: string;
    valorEmpenho: number;
    pedidosVinculados: string[];
    valorFaturado: number;
    documentoEmpenho: File | null;
    nomeDocumento: string;
  }>>([
    {
      id: 'emp_mock_1',
      numeroEmpenho: '2024NE000123',
      valorEmpenho: 45000,
      pedidosVinculados: ['PED-001'],
      valorFaturado: 15000,
      documentoEmpenho: null,
      nomeDocumento: '',
    },
    {
      id: 'emp_mock_2',
      numeroEmpenho: '2024NE000456',
      valorEmpenho: 30000,
      pedidosVinculados: [],
      valorFaturado: 0,
      documentoEmpenho: null,
      nomeDocumento: '',
    },
  ]);
  const [pedidoExpandido, setPedidoExpandido] = useState<string | null>(null);

  // Mock de itens por pedido vinculado
  const itensPorPedido: Record<string, Array<{ codigo: string; descricao: string; quantidade: number; valor: number }>> = {
    'PED-001': [
      { codigo: 'COL-001', descricao: 'Coletor de sangue a vácuo', quantidade: 500, valor: 25000 },
      { codigo: 'SRV-001', descricao: 'Manutenção preventiva', quantidade: 2, valor: 20000 },
    ],
  };
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
    
    // Dados do Projeto
    segmentoProjeto: oportunidade?.segmentoProjeto || '',
    numeroContrato: oportunidade?.numeroContrato || '',
    fonteLead: oportunidade?.fonteLead || '',
    valorNegocio: oportunidade?.valorNegocio || 0,
    previsaoConsumoMensal: oportunidade?.previsaoConsumoMensal || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || '',
    dataInicioContrato: '',
    dataFimContrato: '',
    renovacaoAutomatica: false,
    dataRenovacao: '',
    quantidadeRenovacoes: 0,
    historicoRenovacoes: [] as Array<{ data: string; registradoEm: string }>,
    projetoEncerrado: false,
    encerramentoPendente: false,
    dataEncerramento: '',
    encerramentoValidado: false,
    
    // Análise Técnica
    analiseTecnica: oportunidade?.analiseTecnica || '',
    
    // Representação Comercial
    representanteResponsavel: oportunidade?.representanteResponsavel || '',
    percentualComissao: oportunidade?.percentualComissao || 0,
    
    // Modalidade
    modalidade: 'contratacao_simples',
    
    // Análise Jurídica
    parecerJuridico: oportunidade?.parecerJuridico || '',
    statusJuridico: oportunidade?.statusJuridico || '',
    responsavelJuridico: oportunidade?.responsavelJuridico || '',
    dataAnaliseJuridica: oportunidade?.dataAnaliseJuridica || '',
    
    // Análise Gerencial
    parecerGerencial: oportunidade?.parecerGerencial || '',
    aprovacaoGerencial: oportunidade?.aprovacaoGerencial || '',
    responsavelGerencial: oportunidade?.responsavelGerencial || '',
    dataAnaliseGerencial: oportunidade?.dataAnaliseGerencial || '',
  });

  const temDuasEmpresas = !!empresaContrato2.empresaParticipanteId;
  const valorOriginal = formData.valorNegocio || 0;
  const somaAditivos = aditivos.reduce((sum, a) => sum + a.valor, 0);
  const valorAtualizado = valorOriginal + somaAditivos;

  // Mock de clientes cadastrados
  const clientesCadastrados = [
    { id: 'cli-001', cpfCnpj: '12.345.678/0001-90', nomeFantasia: 'Hospital São Lucas', razaoSocial: 'Hospital São Lucas Ltda', endereco: 'Rua das Flores, 123', uf: 'SP', email: 'contato@saolucas.com.br', telefone: '(11) 3456-7890', segmento: 'hospitalar' },
    { id: 'cli-002', cpfCnpj: '98.765.432/0001-10', nomeFantasia: 'Clínica Vida Nova', razaoSocial: 'Clínica Vida Nova S/A', endereco: 'Av. Brasil, 456', uf: 'RJ', email: 'contato@vidanova.com.br', telefone: '(21) 2345-6789', segmento: 'clinica' },
    { id: 'cli-003', cpfCnpj: '45.678.901/0001-23', nomeFantasia: 'Lab Diagnóstico Plus', razaoSocial: 'Diagnóstico Plus Análises Clínicas Ltda', endereco: 'Rua Central, 789', uf: 'MG', email: 'lab@diagnosticoplus.com.br', telefone: '(31) 3456-1234', segmento: 'laboratorial' },
    { id: 'cli-004', cpfCnpj: '11.222.333/0001-44', nomeFantasia: 'Centro Médico Esperança', razaoSocial: 'Centro Médico Esperança Ltda', endereco: 'Av. Paulista, 1000', uf: 'SP', email: 'admin@esperanca.com.br', telefone: '(11) 4567-8901', segmento: 'hospitalar' },
    { id: 'cli-005', cpfCnpj: '55.666.777/0001-88', nomeFantasia: 'Farmácia Popular Saúde', razaoSocial: 'Farmácia Popular Saúde ME', endereco: 'Rua do Comércio, 50', uf: 'BA', email: 'farmacia@popularsaude.com.br', telefone: '(71) 3210-5678', segmento: 'farmacia' },
    { id: 'cli-006', cpfCnpj: '99.888.777/0001-55', nomeFantasia: 'Hospital Municipal São José', razaoSocial: 'Prefeitura Municipal - Hospital São José', endereco: 'Av. Central, 500', uf: 'GO', email: 'hospital@saojose.gov.br', telefone: '(62) 3333-4444', segmento: 'PÚBLICO - HOSPITAL - MUNICIPAL' },
  ];

  const isSegmentoPublico = formData.segmentoProjeto?.toLowerCase().includes('público') || formData.segmentoProjeto?.toLowerCase().includes('publico');

  const handleSelecionarCliente = (clienteId: string) => {
    setClienteSelecionado(clienteId);
    const cliente = clientesCadastrados.find(c => c.id === clienteId);
    if (cliente) {
      setFormData(prev => ({
        ...prev,
        cpfCnpj: cliente.cpfCnpj,
        nomeFantasia: cliente.nomeFantasia,
        razaoSocial: cliente.razaoSocial,
        endereco: `${cliente.endereco} - ${cliente.uf}`,
        uf: cliente.uf,
        email: cliente.email,
        telefone: cliente.telefone,
        segmentoProjeto: cliente.segmento,
      }));
    }
  };

  const handleTipoContratacaoChange = (tipo: 'publico' | 'privado' | 'filantropico') => {
    setTipoContratacao(tipo);
    // Limpar dados ao trocar tipo
    setLicitacaoVinculada('');
    setClienteSelecionado('');
    setDocumentosLicitacao([]);
    setHistoricoLicitacao([]);
    setEmpresaContrato({ empresaParticipanteId: '', empresaParticipanteNome: '', empresaParticipanteCNPJ: '' });
    setEmpresaContrato2({ empresaParticipanteId: '', empresaParticipanteNome: '', empresaParticipanteCNPJ: '' });
    setFormData(prev => ({
      ...prev,
      cpfCnpj: '', nomeFantasia: '', razaoSocial: '', endereco: '', uf: '', email: '', telefone: '', segmentoProjeto: '',
    }));
  };

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
      contatosComerciais,
      representantesVinculados,
      colaboradoresGestao,
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
        <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
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
            <TabsList className={`flex w-full overflow-x-auto ${oportunidade ? '' : ''}`}>
              <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Dados Gerais
              </TabsTrigger>
              <TabsTrigger value="documentos" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                AC
              </TabsTrigger>
              <TabsTrigger value="dt" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                DT
              </TabsTrigger>
              <TabsTrigger value="analise-juridica" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                AJ
              </TabsTrigger>
              <TabsTrigger value="analise-gerencial" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                AG
              </TabsTrigger>
              <TabsTrigger value="historico-chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Histórico/Chat
              </TabsTrigger>
              {isSegmentoPublico && (
                <TabsTrigger value="empenho" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Empenho
                  {empenhos.filter(e => e.pedidosVinculados.length === 0).length > 0 && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {empenhos.filter(e => e.pedidosVinculados.length === 0).length}
                    </Badge>
                  )}
                </TabsTrigger>
              )}
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
              {/* Origem da Contratação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    Origem da Contratação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Contratação</Label>
                      <Select value={tipoContratacao} onValueChange={(v: 'publico' | 'privado' | 'filantropico') => handleTipoContratacaoChange(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de contratação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="privado">Privado</SelectItem>
                          <SelectItem value="filantropico">Filantrópico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(tipoContratacao === 'publico' || tipoContratacao === 'filantropico') && (
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
                        )}
                      </div>
                    )}

                    {tipoContratacao === 'privado' && (
                      <div>
                        <Label>Selecionar Cliente</Label>
                        <Select value={clienteSelecionado} onValueChange={handleSelecionarCliente}>
                          <SelectTrigger>
                            <SelectValue placeholder="Busque e selecione um cliente cadastrado" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientesCadastrados.map((cliente) => (
                              <SelectItem key={cliente.id} value={cliente.id}>
                                {cliente.nomeFantasia} — {cliente.cpfCnpj}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Cliente - Read-only Summary */}
              <div className="p-4 rounded-lg border bg-muted/30 space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Dados do Cliente</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">CNPJ</span>
                    <p className="text-sm font-medium">{formData.cpfCnpj || '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Nome Fantasia</span>
                    <p className="text-sm font-medium">{formData.nomeFantasia || '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Razão Social</span>
                    <p className="text-sm font-medium">{formData.razaoSocial || '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Endereço / UF</span>
                    <p className="text-sm font-medium">{formData.endereco ? `${formData.endereco} - ${formData.uf}` : '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">E-mail</span>
                    <p className="text-sm font-medium">{formData.email || '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Telefone</span>
                    <p className="text-sm font-medium">{formData.telefone || '—'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Segmento do Cliente</span>
                    <p className="text-sm font-medium">
                      <Badge variant="outline">{formData.segmentoProjeto || 'Não definido'}</Badge>
                    </p>
                  </div>
                </div>
              </div>

              {/* Dados do Projeto */}
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Segmento e Contrato */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="segmentoProjeto">Segmento</Label>
                      <Input
                        id="segmentoProjeto"
                        value={formData.segmentoProjeto || 'Não definido'}
                        disabled
                        className="bg-muted"
                      />
                      <span className="text-xs text-muted-foreground">Preenchido automaticamente pelo cadastro do cliente</span>
                    </div>
                    <div>
                      <Label htmlFor="numeroContrato">Contrato</Label>
                      <Input
                        id="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={(e) => handleInputChange('numeroContrato', e.target.value)}
                        placeholder="Nº do contrato"
                      />
                    </div>
                  </div>

                  {/* Datas do Contrato */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Data de Início do Contrato <span className="text-destructive">*</span></Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dataInicioContrato ? format(new Date(formData.dataInicioContrato), 'dd/MM/yyyy') : 'Selecione a data'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dataInicioContrato ? new Date(formData.dataInicioContrato) : undefined}
                            onSelect={(date) => handleInputChange('dataInicioContrato', date ? date.toISOString() : '')}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Data de Fim do Contrato {!formData.renovacaoAutomatica && <span className="text-destructive">*</span>}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dataFimContrato ? format(new Date(formData.dataFimContrato), 'dd/MM/yyyy') : 'Selecione a data'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dataFimContrato ? new Date(formData.dataFimContrato) : undefined}
                            onSelect={(date) => handleInputChange('dataFimContrato', date ? date.toISOString() : '')}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      {formData.renovacaoAutomatica && (
                        <span className="text-xs text-muted-foreground">Opcional quando renovação automática está ativa</span>
                      )}
                    </div>
                  </div>

                  {/* Renovação Automática */}
                  <div className="space-y-4 p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Renovação Automática</Label>
                        <p className="text-xs text-muted-foreground">Ativar se o contrato possui renovação automática</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{formData.renovacaoAutomatica ? 'Sim' : 'Não'}</span>
                        <Switch
                          checked={formData.renovacaoAutomatica}
                          onCheckedChange={(checked) => handleInputChange('renovacaoAutomatica', checked)}
                        />
                      </div>
                    </div>

                    {formData.renovacaoAutomatica && (
                      <div className="space-y-4 pt-3 border-t border-border">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Data da Renovação</Label>
                            <Input
                              value={formData.dataRenovacao}
                              onChange={(e) => handleInputChange('dataRenovacao', e.target.value)}
                              placeholder="Ex: A cada 12 meses"
                            />
                          </div>
                          <div>
                            <Label>Qtd. de Renovações Automáticas</Label>
                            <Input
                              value={formData.quantidadeRenovacoes.toString()}
                              disabled
                              className="bg-muted"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                const novaRenovacao = {
                                  data: formData.dataRenovacao || 'Sem data informada',
                                  registradoEm: new Date().toISOString(),
                                };
                                setFormData(prev => ({
                                  ...prev,
                                  quantidadeRenovacoes: prev.quantidadeRenovacoes + 1,
                                  historicoRenovacoes: [...(prev.historicoRenovacoes || []), novaRenovacao],
                                }));
                                toast.success('Renovação registrada com sucesso!');
                              }}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" /> Registrar Renovação
                            </Button>
                          </div>
                        </div>

                        {formData.historicoRenovacoes && formData.historicoRenovacoes.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Histórico de Renovações</Label>
                            {formData.historicoRenovacoes.map((r, i) => (
                              <div key={i} className="flex items-center gap-3 text-xs p-2 bg-muted/50 rounded">
                                <Badge variant="outline" className="text-xs">Renovação {i + 1}</Badge>
                                <span>{r.data}</span>
                                <span className="text-muted-foreground">— {format(new Date(r.registradoEm), 'dd/MM/yyyy HH:mm')}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Encerrar Projeto */}
                  <div className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Encerramento do Projeto</h4>
                        <p className="text-xs text-muted-foreground">O encerramento requer validação do gerente da área Comercial</p>
                      </div>
                      {formData.encerramentoPendente && !formData.encerramentoValidado && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-300">Encerramento Pendente de Validação</Badge>
                      )}
                      {formData.encerramentoValidado && (
                        <Badge className="bg-red-100 text-red-800 border-red-300">Projeto Encerrado em {formData.dataEncerramento ? format(new Date(formData.dataEncerramento), 'dd/MM/yyyy') : ''}</Badge>
                      )}
                    </div>
                    {!formData.encerramentoPendente && !formData.encerramentoValidado && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            encerramentoPendente: true,
                            dataEncerramento: new Date().toISOString(),
                          }));
                          toast.info('Solicitação de encerramento enviada. Aguardando validação do gerente comercial.');
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Encerrar Projeto
                      </Button>
                    )}
                  </div>

                  {/* Aditivos Contratuais */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium">Aditivos Contratuais</h4>
                      <Button type="button" size="sm" onClick={() => setModalNovoAditivoOpen(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Novo Aditivo
                      </Button>
                    </div>
                    {aditivos.length > 0 ? (
                      <>
                        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border mb-3">
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
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">Nenhum aditivo registrado.</p>
                    )}
                  </div>

                  {/* Valor Original e Previsão */}
                  <div className="grid grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="previsaoConsumoMensal">Previsão de Consumo Mensal</Label>
                      <Input
                        id="previsaoConsumoMensal"
                        type="text"
                        value={formData.previsaoConsumoMensal}
                        onChange={(e) => handleInputChange('previsaoConsumoMensal', e.target.value)}
                        placeholder="Quantidade de testes/mês"
                      />
                    </div>
                  </div>

                  {/* Contatos Comerciais do Cliente */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium">Contato Comercial do Cliente</h4>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                        setContatosComerciais(prev => [...prev, { id: `cc_${Date.now()}`, nome: '', cargo: '', telefone: '', email: '' }]);
                      }}>
                        <Plus className="h-4 w-4 mr-1" /> Adicionar Contato
                      </Button>
                    </div>
                    {contatosComerciais.length > 0 ? (
                      <div className="space-y-3">
                        {contatosComerciais.map((contato) => (
                          <div key={contato.id} className="p-3 border rounded-lg relative">
                            <Button type="button" variant="ghost" size="sm" className="absolute top-1 right-1" onClick={() => {
                              setContatosComerciais(prev => prev.filter(c => c.id !== contato.id));
                            }}>
                              <X className="h-3 w-3" />
                            </Button>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              <div>
                                <Label className="text-xs">Nome</Label>
                                <Input placeholder="Nome" value={contato.nome} onChange={(e) => {
                                  setContatosComerciais(prev => prev.map(c => c.id === contato.id ? {...c, nome: e.target.value} : c));
                                }} />
                              </div>
                              <div>
                                <Label className="text-xs">Cargo/Função</Label>
                                <Input placeholder="Cargo" value={contato.cargo} onChange={(e) => {
                                  setContatosComerciais(prev => prev.map(c => c.id === contato.id ? {...c, cargo: e.target.value} : c));
                                }} />
                              </div>
                              <div>
                                <Label className="text-xs">Telefone</Label>
                                <Input placeholder="Telefone" value={contato.telefone} onChange={(e) => {
                                  setContatosComerciais(prev => prev.map(c => c.id === contato.id ? {...c, telefone: e.target.value} : c));
                                }} />
                              </div>
                              <div>
                                <Label className="text-xs">E-mail</Label>
                                <Input type="email" placeholder="E-mail" value={contato.email} onChange={(e) => {
                                  setContatosComerciais(prev => prev.map(c => c.id === contato.id ? {...c, email: e.target.value} : c));
                                }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-3">Nenhum contato adicionado.</p>
                    )}
                  </div>

                  {/* Representantes Vinculados */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium">Representantes Vinculados</h4>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                        setRepresentantesVinculados(prev => [...prev, { id: `rep_${Date.now()}`, nome: '', percentualComissao: 0 }]);
                      }}>
                        <Plus className="h-4 w-4 mr-1" /> Adicionar Representante
                      </Button>
                    </div>
                    {representantesVinculados.length > 0 ? (
                      <div className="space-y-2">
                        {representantesVinculados.map((rep) => (
                          <div key={rep.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="flex-1">
                              <Select value={rep.nome} onValueChange={(value) => {
                                setRepresentantesVinculados(prev => prev.map(r => r.id === rep.id ? {...r, nome: value} : r));
                              }}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o representante" />
                                </SelectTrigger>
                                <SelectContent>
                                  {colaboradores.map((colab) => (
                                    <SelectItem key={colab.id} value={colab.nome}>{colab.nome}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="w-32">
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                placeholder="Comissão %"
                                value={rep.percentualComissao || ''}
                                onChange={(e) => {
                                  setRepresentantesVinculados(prev => prev.map(r => r.id === rep.id ? {...r, percentualComissao: parseFloat(e.target.value) || 0} : r));
                                }}
                              />
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => {
                              setRepresentantesVinculados(prev => prev.filter(r => r.id !== rep.id));
                            }}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-3">Nenhum representante vinculado.</p>
                    )}
                  </div>

                  {/* Colaboradores Responsáveis pela Gestão */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium">Colaboradores Responsáveis pela Gestão</h4>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                        setColaboradoresGestao(prev => [...prev, '']);
                      }}>
                        <Plus className="h-4 w-4 mr-1" /> Adicionar Colaborador
                      </Button>
                    </div>
                    {colaboradoresGestao.length > 0 ? (
                      <div className="space-y-2">
                        {colaboradoresGestao.map((colabId, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex-1">
                              <Select value={colabId} onValueChange={(value) => {
                                setColaboradoresGestao(prev => prev.map((c, i) => i === idx ? value : c));
                              }}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um colaborador" />
                                </SelectTrigger>
                                <SelectContent>
                                  {colaboradores.filter(c => c.status === 'Ativo').map((colab) => (
                                    <SelectItem key={colab.id} value={colab.id}>{colab.nome} - {colab.cargo}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => {
                              setColaboradoresGestao(prev => prev.filter((_, i) => i !== idx));
                            }}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-3">Nenhum colaborador adicionado.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resumo Biodina Rep */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Resumo Biodina Rep
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20">
                    <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">Integração Pendente</Badge>
                    <p className="text-sm text-muted-foreground">Dados disponíveis após aval da Gerência Comercial para inclusão dos dados do representante.</p>
                  </div>

                  {/* Análise da Concorrência pelo Comercial Local */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">1 - Análise da Concorrência pelo Comercial Local</h4>
                    
                    {concorrentesBiodinaRep.map((concorrente, index) => (
                      <div key={concorrente.id} className="rounded-lg border border-border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground">Concorrente {index + 1}</p>
                          {concorrentesBiodinaRep.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setConcorrentesBiodinaRep(prev => prev.filter(c => c.id !== concorrente.id))}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Nome do Concorrente</Label>
                          <Input readOnly className="bg-muted/50 cursor-not-allowed" placeholder="—" value={concorrente.nome} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Marca do Concorrente</Label>
                            <Input readOnly className="bg-muted/50 cursor-not-allowed" placeholder="—" value={concorrente.marca} />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Modelo do Concorrente</Label>
                            <Input readOnly className="bg-muted/50 cursor-not-allowed" placeholder="—" value={concorrente.modelo} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Quantidade</Label>
                            <Input readOnly type="number" className="bg-muted/50 cursor-not-allowed" placeholder="—" value={concorrente.quantidade} />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Quantidade de exames/mês</Label>
                            <Input readOnly type="number" className="bg-muted/50 cursor-not-allowed" placeholder="—" value={concorrente.examesMes} />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConcorrentesBiodinaRep(prev => [...prev, { id: crypto.randomUUID(), nome: '', marca: '', modelo: '', quantidade: '', examesMes: '' }])}
                      className="w-full border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>

                    <p className="text-xs text-muted-foreground italic">Resumo da análise completa disponível no BiodinaRep</p>
                  </div>

                  {/* 2 - Agenda Comercial */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">2 - Agenda Comercial</h4>
                    
                    <div className="rounded-lg border border-border p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium text-foreground">Histórico de Visitas</p>
                      </div>

                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/50 border-b">
                              <th className="text-left px-3 py-2 font-medium text-muted-foreground">Data da Visita</th>
                              <th className="text-left px-3 py-2 font-medium text-muted-foreground">Representante</th>
                              <th className="text-left px-3 py-2 font-medium text-muted-foreground">Observações</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={3} className="text-center py-6 text-muted-foreground text-sm">
                                Nenhuma visita registrada
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="text-xs text-muted-foreground italic">Detalhamento completo disponível no BiodinaRep</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>


            {/* Aba Empenho */}
            {isSegmentoPublico && (
              <TabsContent value="empenho" className="space-y-4">
                {/* Painel de Alertas */}
                {empenhos.filter(e => e.pedidosVinculados.length === 0).length > 0 && (
                  <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        Alertas de Vinculação
                      </div>
                      {empenhos.filter(e => e.pedidosVinculados.length === 0).map(emp => (
                        <div key={emp.id} className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                          Empenho Nº {emp.numeroEmpenho} sem pedido vinculado — <strong>Cobrar pedido do cliente</strong>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Tabela principal */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      CC Empenhos — Por Valor
                    </CardTitle>
                    <Button
                      onClick={() => {
                        const novoId = `emp_${Date.now()}`;
                        setEmpenhos(prev => [...prev, {
                          id: novoId,
                          numeroEmpenho: '',
                          valorEmpenho: 0,
                          pedidosVinculados: [],
                          valorFaturado: 0,
                          documentoEmpenho: null,
                          nomeDocumento: '',
                        }]);
                      }}
                      className="bg-biodina-gold hover:bg-biodina-gold/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Empenho
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {empenhos.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-40" />
                        <p>Nenhum empenho cadastrado</p>
                        <p className="text-sm">Clique em "Adicionar Empenho" para começar</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {empenhos.map((emp, index) => {
                          const saldo = emp.valorEmpenho - emp.valorFaturado;
                          return (
                            <Card key={emp.id} className="border">
                              <CardContent className="p-4 space-y-4">
                                {/* Linha principal com dados do empenho */}
                                <div className="grid grid-cols-5 gap-4 items-end">
                                  <div>
                                    <Label className="text-xs font-medium">Nº Empenho</Label>
                                    <Input
                                      value={emp.numeroEmpenho}
                                      onChange={(e) => {
                                        const updated = [...empenhos];
                                        updated[index].numeroEmpenho = e.target.value;
                                        setEmpenhos(updated);
                                      }}
                                      placeholder="Ex: 2024NE000123"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium">Valor do Empenho (R$)</Label>
                                    <Input
                                      type="number"
                                      value={emp.valorEmpenho || ''}
                                      onChange={(e) => {
                                        const updated = [...empenhos];
                                        updated[index].valorEmpenho = parseFloat(e.target.value) || 0;
                                        setEmpenhos(updated);
                                      }}
                                      placeholder="0,00"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium">Nº Pedidos Vinculados</Label>
                                    {emp.pedidosVinculados.length > 0 ? (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {emp.pedidosVinculados.map(ped => (
                                          <Button
                                            key={ped}
                                            variant="outline"
                                            size="sm"
                                            className={`text-xs h-7 ${pedidoExpandido === `${emp.id}_${ped}` ? 'bg-primary text-primary-foreground' : ''}`}
                                            onClick={() => setPedidoExpandido(prev => prev === `${emp.id}_${ped}` ? null : `${emp.id}_${ped}`)}
                                          >
                                            {ped}
                                          </Button>
                                        ))}
                                      </div>
                                    ) : (
                                      <Badge variant="destructive" className="text-xs mt-1">Sem pedido — Cobrar cliente</Badge>
                                    )}
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium">Valor Faturado (R$)</Label>
                                    <Input
                                      type="number"
                                      value={emp.valorFaturado || ''}
                                      onChange={(e) => {
                                        const updated = [...empenhos];
                                        updated[index].valorFaturado = parseFloat(e.target.value) || 0;
                                        setEmpenhos(updated);
                                      }}
                                      placeholder="0,00"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-xs font-medium">Saldo do Empenho (R$)</Label>
                                    <div className={`h-10 flex items-center px-3 rounded-md border text-sm font-semibold ${saldo > 0 ? 'text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-950/30' : saldo < 0 ? 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30' : 'text-muted-foreground bg-muted'}`}>
                                      {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                  </div>
                                </div>

                                {/* Upload documento do empenho */}
                                <div className="flex items-center gap-4">
                                  <div className="flex-1">
                                    <Label className="text-xs font-medium">Documento do Empenho</Label>
                                    {emp.documentoEmpenho ? (
                                      <div className="flex items-center gap-2 mt-1 p-2 border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 rounded-md">
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-green-800 dark:text-green-300 flex-1 truncate">{emp.nomeDocumento}</span>
                                        <Button variant="ghost" size="sm" onClick={() => {
                                          const updated = [...empenhos];
                                          updated[index].documentoEmpenho = null;
                                          updated[index].nomeDocumento = '';
                                          setEmpenhos(updated);
                                        }}>
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="mt-1">
                                        <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-dashed border-muted-foreground/30 rounded-md hover:bg-muted/50 transition-colors">
                                          <Upload className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-sm text-muted-foreground">Anexar documento (PDF, DOC)</span>
                                          <input
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
                                                const updated = [...empenhos];
                                                updated[index].documentoEmpenho = file;
                                                updated[index].nomeDocumento = file.name;
                                                setEmpenhos(updated);
                                                toast.success('Documento do empenho anexado!');
                                              }
                                            }}
                                          />
                                        </label>
                                      </div>
                                    )}
                                  </div>

                                  {/* Botão remover */}
                                  <div className="flex gap-2 pt-5">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => setEmpenhos(prev => prev.filter(e => e.id !== emp.id))}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Seção expansível — itens do pedido vinculado (clicado) */}
                                {emp.pedidosVinculados.map(ped => {
                                  const key = `${emp.id}_${ped}`;
                                  if (pedidoExpandido !== key) return null;
                                  const itens = itensPorPedido[ped] || [];
                                  return (
                                    <div key={key} className="border-t pt-4 space-y-3">
                                      <Label className="text-sm font-semibold">Itens do Pedido {ped}</Label>
                                      {itens.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-3">Nenhum item registrado para este pedido</p>
                                      ) : (
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Código</TableHead>
                                              <TableHead>Descrição</TableHead>
                                              <TableHead>Qtd.</TableHead>
                                              <TableHead>Valor (R$)</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {itens.map((item, idx) => (
                                              <TableRow key={idx}>
                                                <TableCell className="font-medium">{item.codigo}</TableCell>
                                                <TableCell>{item.descricao}</TableCell>
                                                <TableCell>{item.quantidade}</TableCell>
                                                <TableCell>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      )}
                                    </div>
                                  );
                                })}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}

                    {/* Painel de Resumo */}
                    {empenhos.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                          <CardContent className="p-4 text-center">
                            <p className="text-xs text-muted-foreground">Total Empenhado</p>
                            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                              {empenhos.reduce((sum, e) => sum + e.valorEmpenho, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
                          <CardContent className="p-4 text-center">
                            <p className="text-xs text-muted-foreground">Total Faturado</p>
                            <p className="text-lg font-bold text-green-700 dark:text-green-400">
                              {empenhos.reduce((sum, e) => sum + e.valorFaturado, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200">
                          <CardContent className="p-4 text-center">
                            <p className="text-xs text-muted-foreground">Saldo Pendente</p>
                            <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                              {empenhos.reduce((sum, e) => sum + (e.valorEmpenho - e.valorFaturado), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {empenhos.filter(e => e.pedidosVinculados.length === 0).length} empenho(s) sem pedido
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}


            {/* Aba Análise Jurídica */}
            <TabsContent value="analise-juridica" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitação de Análise Jurídica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="questaoJuridica">Descreva sua questão para o Jurídico</Label>
                    <Textarea
                      id="questaoJuridica"
                      value={questaoJuridicaAtual}
                      onChange={(e) => setQuestaoJuridicaAtual(e.target.value)}
                      placeholder="Escreva aqui a questão que deseja enviar para análise jurídica..."
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (!questaoJuridicaAtual.trim()) {
                        toast.error('Digite uma questão antes de enviar.');
                        return;
                      }
                      setSolicitacoesJuridicas(prev => [{
                        id: crypto.randomUUID(),
                        questao: questaoJuridicaAtual.trim(),
                        dataEnvio: new Date().toLocaleString('pt-BR'),
                        resposta: '',
                        dataResposta: ''
                      }, ...prev]);
                      setQuestaoJuridicaAtual('');
                      toast.success('Questão enviada para Análise Jurídica!');
                    }}
                    disabled={!questaoJuridicaAtual.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Enviar para Análise Jurídica
                  </Button>
                </CardContent>
              </Card>

              {solicitacoesJuridicas.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Solicitações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {solicitacoesJuridicas.map((solicitacao, index) => (
                      <div key={solicitacao.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            Solicitação {solicitacoesJuridicas.length - index}
                          </span>
                          <span className="text-xs text-muted-foreground">{solicitacao.dataEnvio}</span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <p className="text-xs font-medium text-blue-700 mb-1">Questão do Colaborador</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap">{solicitacao.questao}</p>
                        </div>
                        {solicitacao.resposta ? (
                          <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium text-green-700">Resposta do Jurídico</p>
                              <span className="text-xs text-muted-foreground">{solicitacao.dataResposta}</span>
                            </div>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{solicitacao.resposta}</p>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-yellow-700 border-yellow-300 bg-yellow-50">
                            <Clock className="h-3 w-3 mr-1" />
                            Aguardando Resposta do Jurídico
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Aba Análise Gerencial */}
            <TabsContent value="analise-gerencial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Solicitação de Análise Gerencial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="questaoGerencial">Descreva sua questão para a Diretoria</Label>
                    <Textarea
                      id="questaoGerencial"
                      value={questaoGerencialAtual}
                      onChange={(e) => setQuestaoGerencialAtual(e.target.value)}
                      placeholder="Escreva aqui sua questão ou assunto relacionado à diretoria..."
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (!questaoGerencialAtual.trim()) {
                        toast.error('Digite uma questão antes de enviar.');
                        return;
                      }
                      setSolicitacoesGerenciais(prev => [{
                        id: crypto.randomUUID(),
                        questao: questaoGerencialAtual.trim(),
                        dataEnvio: new Date().toLocaleString('pt-BR'),
                        resposta: '',
                        dataResposta: ''
                      }, ...prev]);
                      setQuestaoGerencialAtual('');
                      toast.success('Questão enviada para a Diretoria!');
                    }}
                    disabled={!questaoGerencialAtual.trim()}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar para Análise Gerencial
                  </Button>
                </CardContent>
              </Card>

              {solicitacoesGerenciais.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Histórico de Solicitações Gerenciais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {solicitacoesGerenciais.map((solicitacao, index) => (
                      <div key={solicitacao.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            Solicitação {solicitacoesGerenciais.length - index}
                          </span>
                          <span className="text-xs text-muted-foreground">{solicitacao.dataEnvio}</span>
                        </div>
                        <div className="bg-muted/50 rounded-md p-3">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Questão do Colaborador:</p>
                          <p className="text-sm text-foreground">{solicitacao.questao}</p>
                        </div>
                        {solicitacao.resposta ? (
                          <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-green-700">Resposta da Diretoria:</p>
                              <span className="text-xs text-green-600">{solicitacao.dataResposta}</span>
                            </div>
                            <p className="text-sm text-green-800">{solicitacao.resposta}</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                              <Clock className="h-3 w-3 mr-1" />
                              Aguardando Resposta da Diretoria
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Saldo do Cliente removido */}
            {false && oportunidade && (
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
                    Ordens de Serviço - Assessoria Científica
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
                // Categorias de documentos
                type CategoriaDoc = 'licitacao' | 'ata' | 'contrato' | 'aditivo' | 'outros';
                
                const categoriasConfig: { id: CategoriaDoc; label: string; icon: React.ReactNode }[] = [
                  { id: 'licitacao', label: 'Documentos Importados da Licitação', icon: <Link2 className="h-5 w-5" /> },
                  { id: 'ata', label: 'Ata', icon: <FileText className="h-5 w-5" /> },
                  { id: 'contrato', label: 'Contrato', icon: <FileText className="h-5 w-5" /> },
                  { id: 'aditivo', label: 'Aditivos Contratuais', icon: <FileText className="h-5 w-5" /> },
                  { id: 'outros', label: 'Outros Documentos', icon: <FileText className="h-5 w-5" /> },
                ];

                const getDocsByCategoria = (cat: CategoriaDoc) => {
                  if (cat === 'licitacao') {
                    return documentosLicitacao.filter(doc => !doc.categoria || doc.categoria === 'licitacao');
                  }
                  return documentosLicitacao.filter(doc => doc.categoria === cat);
                };

                const renderDocList = (docs: any[]) => (
                  <div className="space-y-2">
                    {docs.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Nenhum documento nesta seção</p>
                    ) : (
                      docs.map((doc: any, index: number) => (
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
                    {categoriasConfig.map((cat) => (
                      <Card key={cat.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            {cat.icon}
                            {cat.label}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>{renderDocList(getDocsByCategoria(cat.id))}</CardContent>
                      </Card>
                    ))}

                    {/* Upload com seletor de seção */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Adicionar Novos Documentos</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Seção do documento:</Label>
                          <Select value={empresaUploadSelecionada} onValueChange={setEmpresaUploadSelecionada}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione a seção" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ata">Ata</SelectItem>
                              <SelectItem value="contrato">Contrato</SelectItem>
                              <SelectItem value="aditivo">Aditivos Contratuais</SelectItem>
                              <SelectItem value="outros">Outros Documentos</SelectItem>
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

             <TabsContent value="pedidos" className="space-y-6">
              {/* Seção Produtos */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-biodina-gold" />
                    <CardTitle className="text-lg">Produtos</CardTitle>
                  </div>
                  <Button 
                    onClick={() => setIsPedidoModalOpen(true)}
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </CardHeader>
                <CardContent>
                  {pedidos.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg border-dashed">
                      <Package className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Nenhum pedido de produto cadastrado</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nº Pedido</TableHead>
                            <TableHead>Data Faturamento</TableHead>
                            <TableHead>Período Competência</TableHead>
                            <TableHead>NFE</TableHead>
                            <TableHead>Empenho</TableHead>
                            <TableHead>Processo</TableHead>
                            <TableHead>Valor da NFE</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidos.map((pedido) => (
                            <TableRow key={pedido.id}>
                              <TableCell className="font-mono text-sm">
                                #{pedido.id.toString().slice(-6)}
                              </TableCell>
                              <TableCell>
                                {pedido.dataVenda ? new Date(pedido.dataVenda).toLocaleDateString('pt-BR') : '-'}
                              </TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {pedido.status === 'faturado' ? 'Emitida' : 'Pendente'}
                                </Badge>
                              </TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell className="font-medium text-green-600">
                                {formatCurrency(pedido.valorTotal)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Seção Serviços */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-biodina-gold" />
                    <CardTitle className="text-lg">Serviços</CardTitle>
                  </div>
                  <Button 
                    className="bg-biodina-gold hover:bg-biodina-gold/90"
                    onClick={() => toast.info('Funcionalidade de pedido de serviço em desenvolvimento')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Serviço
                  </Button>
                </CardHeader>
                <CardContent>
                  {pedidosServico.length === 0 ? (
                    <div className="text-center py-6 border rounded-lg border-dashed">
                      <Wrench className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Nenhum pedido de serviço cadastrado</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nº Pedido</TableHead>
                            <TableHead>Data Faturamento</TableHead>
                            <TableHead>Período Competência</TableHead>
                            <TableHead>NFS</TableHead>
                            <TableHead>Empenho</TableHead>
                            <TableHead>Processo</TableHead>
                            <TableHead>Valor da NFS</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedidosServico.map((servico) => (
                            <TableRow key={servico.id}>
                              <TableCell className="font-mono text-sm">{servico.numeroPedido}</TableCell>
                              <TableCell>{servico.dataFaturamento || '-'}</TableCell>
                              <TableCell>{servico.periodoCompetencia || '-'}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {servico.nfs || 'Pendente'}
                                </Badge>
                              </TableCell>
                              <TableCell>{servico.empenho || '-'}</TableCell>
                              <TableCell>{servico.processo || '-'}</TableCell>
                              <TableCell className="font-medium text-green-600">
                                {formatCurrency(servico.valorNfs)}
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
                  status: 'em_andamento',
                  segmento: formData.segmentoProjeto
                }}
              />
            </TabsContent>

            <TabsContent value="interfaceamento">
              <InterfaceamentoTab
                oportunidade={oportunidade}
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
