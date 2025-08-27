import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Save, Plus, Edit, Upload, Download, Eye, Calendar, AlertTriangle, UserPlus, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";
import PedidoForm from "./PedidoForm";
import CustomAlertModal from "./components/CustomAlertModal";
import SolicitacaoCadastroModal from "./SolicitacaoCadastroModal";
import GerenciarSegmentosModal from "./GerenciarSegmentosModal";
import { concorrentes as mockConcorrentes, licitantes, pedidos as mockPedidos } from "@/data/licitacaoMockData";
import { formatCurrency, getTermometroColor, getTermometroStage, getRankingColor, getUnidadeColor, getAtendeEditalBadge } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSegmentoLeadManager } from "@/hooks/useSegmentoLeadManager";
import { PedidoCompleto } from "@/types/comercial";

interface OportunidadeAvancadaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

// Mock data para clientes
const mockClientes = [
  { id: 1, nome: "Associação das Pioneiras Sociais", cpfCnpj: "12.345.678/0001-90" },
  { id: 2, nome: "Hospital São Francisco", cpfCnpj: "98.765.432/0001-10" },
  { id: 3, nome: "Laboratório Central LTDA", cpfCnpj: "11.222.333/0001-44" },
  { id: 4, nome: "Clínica Med Center", cpfCnpj: "55.666.777/0001-88" },
  { id: 5, nome: "Instituto de Pesquisas Médicas", cpfCnpj: "33.444.555/0001-22" },
];

const OportunidadeAvancadaForm = ({ isOpen, onClose, onSave, oportunidade }: OportunidadeAvancadaFormProps) => {
  const { toast } = useToast();
  const { segmentos } = useSegmentoLeadManager();
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [showEmprestimoAlert, setShowEmprestimoAlert] = useState(false);
  const [showSolicitacaoCadastro, setShowSolicitacaoCadastro] = useState(false);
  const [showGerenciarSegmentos, setShowGerenciarSegmentos] = useState(false);
  const [clienteDropdownOpen, setClienteDropdownOpen] = useState(false);
  
  // Estados para modais
  const [showLicitacaoModal, setShowLicitacaoModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  
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
    // Novos campos para cliente
    cliente: oportunidade?.cliente || '',
    clienteId: oportunidade?.clienteId || '',
    cpfCnpj: oportunidade?.cpfCnpj || '',
    ativo: oportunidade?.ativo || true,
    fonteLead: oportunidade?.fonteLead || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    colaboradoresResponsaveis: oportunidade?.colaboradoresResponsaveis || [],
    valorNegocio: oportunidade?.valorNegocio || 0,
    tags: oportunidade?.tags || '',
    caracteristicas: oportunidade?.caracteristicas || '',
    dataInicio: oportunidade?.dataInicio || '',
    dataLimite: oportunidade?.dataLimite || '',
    fluxoTrabalho: oportunidade?.fluxoTrabalho || '',
    descricao: oportunidade?.descricao || '',
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
    participantes: oportunidade?.participantes || [],
    
    // Campos adicionais da licitação
    naturezaOperacao: oportunidade?.naturezaOperacao || '',
    numeroPregao: oportunidade?.numeroPregao || '',
    numeroProcesso: oportunidade?.numeroProcesso || '',
    numeroUasg: oportunidade?.numeroUasg || '',
    qualSite: oportunidade?.qualSite || '',
    permiteAdesao: oportunidade?.permiteAdesao || '',
    observacoesAdesao: oportunidade?.observacoesAdesao || '',
    produto: oportunidade?.produto || '',
    valorEstimado: oportunidade?.valorEstimado || 0,
    quantidadeEquipamentos: oportunidade?.quantidadeEquipamentos || 0,
    quantidadeExames: oportunidade?.quantidadeExames || 0,
    haviaContratoAnterior: oportunidade?.haviaContratoAnterior || '',
    marcaModeloAnterior: oportunidade?.marcaModeloAnterior || '',
    situacaoPregao: oportunidade?.situacaoPregao || '',
    dataAssinaturaAta: oportunidade?.dataAssinaturaAta || '',
    analiseEstrategia: oportunidade?.analiseEstrategia || '',
    manifestacaoRecorrer: oportunidade?.manifestacaoRecorrer || '',
    motivosFracasso: oportunidade?.motivosFracasso || '',
    observacaoGeral: oportunidade?.observacaoGeral || '',
    
    // Novos campos da participação
    estrategiaParticipacao: oportunidade?.estrategiaParticipacao || '',
    planejamentoComercial: oportunidade?.planejamentoComercial || '',
    
    // Campo para solicitação de análise técnica
    solicitarAnaliseTecnica: oportunidade?.solicitarAnaliseTecnica || false,
  });

  const handleClienteSelect = (cliente: any) => {
    setFormData({
      ...formData,
      cliente: cliente.nome,
      clienteId: cliente.id,
      cpfCnpj: cliente.cpfCnpj
    });
    setClienteDropdownOpen(false);
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
    onSave(formData);
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
      {/* Dados do Cliente */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cliente">Cliente *</Label>
            <Popover open={clienteDropdownOpen} onOpenChange={setClienteDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={clienteDropdownOpen}
                  className="w-full justify-between"
                  disabled={isReadOnlyMode()}
                >
                  {formData.cliente || "Selecione um cliente..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar cliente..." />
                  <CommandList>
                    <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                    <CommandGroup>
                      {mockClientes.map((cliente) => (
                        <CommandItem
                          key={cliente.id}
                          value={cliente.nome}
                          onSelect={() => handleClienteSelect(cliente)}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{cliente.nome}</span>
                            <span className="text-sm text-gray-500">{cliente.cpfCnpj}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {!isReadOnlyMode() && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={() => setShowSolicitacaoCadastro(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Solicitação de cadastro
              </Button>
            )}
          </div>
          
          <div>
            <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
            <Input
              id="cpfCnpj"
              value={formData.cpfCnpj}
              placeholder="Selecione um cliente"
              disabled={true}
              className="bg-gray-50"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="ativo" 
            checked={formData.ativo}
            onCheckedChange={(checked) => setFormData({...formData, ativo: checked as boolean})}
            disabled={isReadOnlyMode()}
          />
          <Label htmlFor="ativo">Ativo</Label>
        </div>
      </div>

      {/* Dados do Lead/Negócio */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Dados do Lead/Negócio</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fonteLead">Fonte do Lead</Label>
            <Select 
              value={formData.fonteLead} 
              onValueChange={(value) => setFormData({...formData, fonteLead: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site">Site</SelectItem>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="cold_call">Cold Call</SelectItem>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="referencia">Referência</SelectItem>
                <SelectItem value="telefone">Telefone</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="video_chamada">Videochamada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="segmentoLead">Segmento do Lead</Label>
            <div className="flex gap-2">
              <Select 
                value={formData.segmentoLead} 
                onValueChange={(value) => setFormData({...formData, segmentoLead: value})}
                disabled={isReadOnlyMode()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {segmentos.map((segmento) => (
                    <SelectItem key={segmento.id} value={segmento.value}>
                      {segmento.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!isReadOnlyMode() && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGerenciarSegmentos(true)}
                  className="shrink-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
            <Input
              id="valorNegocio"
              type="number"
              step="0.01"
              value={formData.valorNegocio}
              onChange={(e) => setFormData({...formData, valorNegocio: Number(e.target.value)})}
              placeholder="0,00"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="dataInicio">Data de Início</Label>
            <Input
              id="dataInicio"
              type="date"
              value={formData.dataInicio}
              onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="dataLimite">Data Limite</Label>
            <Input
              id="dataLimite"
              type="date"
              value={formData.dataLimite}
              onChange={(e) => setFormData({...formData, dataLimite: e.target.value})}
              disabled={isReadOnlyMode()}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="Separadas por vírgula"
            disabled={isReadOnlyMode()}
          />
        </div>
        
        <div>
          <Label htmlFor="caracteristicas">Características</Label>
          <Textarea
            id="caracteristicas"
            value={formData.caracteristicas}
            onChange={(e) => setFormData({...formData, caracteristicas: e.target.value})}
            placeholder="Descreva as características da oportunidade"
            rows={3}
            disabled={isReadOnlyMode()}
          />
        </div>
        
        <div>
          <Label htmlFor="fluxoTrabalho">Fluxo de Trabalho (Status controlado pelo RH/Gestor)</Label>
          <Select 
            value={formData.fluxoTrabalho} 
            onValueChange={(value) => setFormData({...formData, fluxoTrabalho: value})}
            disabled={isReadOnlyMode()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status do trabalho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aguardando_inicio">Aguardando Início</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="em_revisao">Em Revisão</SelectItem>
              <SelectItem value="aguardando_aprovacao">Aguardando Aprovação</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="suspenso">Suspenso</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            Este campo será incluído no Kanban para acompanhamento do funcionário
          </p>
        </div>
        
        <div>
          <Label htmlFor="descricao">Descrição da Oportunidade</Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            placeholder="Descrição detalhada da oportunidade"
            rows={4}
            disabled={isReadOnlyMode()}
          />
        </div>
      </div>

      {/* Dados Específicos da Licitação */}
      <div className="border rounded-lg p-4 space-y-4 bg-yellow-50">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          Dados Específicos da Licitação
        </h3>
        
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="produto">Produto</Label>
            <Select 
              value={formData.produto} 
              onValueChange={(value) => setFormData({...formData, produto: value})}
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
          <div>
            <Label htmlFor="valorEstimado">Valor Estimado</Label>
            <Input
              id="valorEstimado"
              type="number"
              step="0.01"
              value={formData.valorEstimado}
              onChange={(e) => setFormData({...formData, valorEstimado: Number(e.target.value)})}
              placeholder="0,00"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="quantidadeEquipamentos">Quantidade Equipamentos / Total Estimado</Label>
            <Input
              id="quantidadeEquipamentos"
              type="number"
              value={formData.quantidadeEquipamentos}
              onChange={(e) => setFormData({...formData, quantidadeEquipamentos: Number(e.target.value)})}
              placeholder="0"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="quantidadeExames">Quantidade Exames / Total Estimado</Label>
            <Input
              id="quantidadeExames"
              type="number"
              value={formData.quantidadeExames}
              onChange={(e) => setFormData({...formData, quantidadeExames: Number(e.target.value)})}
              placeholder="0"
              disabled={isReadOnlyMode()}
            />
          </div>
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
          <Label htmlFor="situacaoPregao">Situação/Status do Pregão *</Label>
          <Select 
            value={formData.situacaoPregao} 
            onValueChange={(value) => setFormData({...formData, situacaoPregao: value})}
            disabled={isReadOnlyMode()}
          >
            <SelectTrigger>
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
              <SelectItem value="suspenso">Suspenso</SelectItem>
              <SelectItem value="adjudicacao">Adjudicação</SelectItem>
              <SelectItem value="homologacao">Homologação</SelectItem>
              <SelectItem value="ata_contrato">Ata/Contrato</SelectItem>
              <SelectItem value="empenho">Empenho</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
          <Textarea
            id="resumoEdital"
            value={formData.resumoEdital}
            onChange={(e) => setFormData({ ...formData, resumoEdital: e.target.value })}
            placeholder="Descreva o resumo do edital..."
            className="min-h-[120px] resize-y"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="solicitarAnaliseTecnica"
            checked={formData.solicitarAnaliseTecnica}
            onCheckedChange={handleSolicitarAnaliseTecnica}
            disabled={isReadOnlyMode()}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="solicitarAnaliseTecnica" className="text-sm font-medium">
              Solicitar análise técnica
            </Label>
            <p className="text-xs text-muted-foreground">
              Enviar notificação para responsáveis pela análise técnica preencherem os campos necessários
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="analiseTecnicaLicitacao">Análise Técnica</Label>
          <Textarea
            id="analiseTecnicaLicitacao"
            value={formData.analiseTecnica}
            readOnly={true}
            placeholder="Este campo reflete automaticamente o conteúdo da Análise Técnica-Científica"
            rows={3}
            className="bg-gray-50 cursor-not-allowed"
            disabled={isReadOnlyMode()}
          />
          <p className="text-sm text-gray-500 mt-1">
            Campo somente leitura - Para editar, use o campo "Análise Técnica-Científica" na aba "Análise Técnica"
          </p>
        </div>

        <div>
          <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
          <Textarea
            id="impugnacaoEdital"
            value={formData.impugnacaoEdital}
            onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
            placeholder="Detalhes sobre impugnação do edital"
            rows={3}
            disabled={isReadOnlyMode()}
          />
        </div>

        <div>
          <Label htmlFor="valorMinimoFinal">Valor mínimo Final (R$)</Label>
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

        <div>
          <Label htmlFor="analiseEstrategia">Análise de Estratégia</Label>
          <Textarea
            id="analiseEstrategia"
            value={formData.analiseEstrategia}
            onChange={(e) => setFormData({...formData, analiseEstrategia: e.target.value})}
            placeholder="Análise estratégica para a licitação"
            rows={4}
            disabled={isReadOnlyMode()}
          />
        </div>

        <div>
          <Label htmlFor="manifestacaoRecorrer">Razões para Recurso</Label>
          <Textarea
            id="manifestacaoRecorrer"
            value={formData.manifestacaoRecorrer}
            onChange={(e) => setFormData({...formData, manifestacaoRecorrer: e.target.value})}
            placeholder="Descreva as razões para recurso, se aplicável"
            rows={3}
            disabled={isReadOnlyMode()}
          />
        </div>

        {/* Tabela de Licitantes */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tabela de Licitantes</Label>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Valor Final</TableHead>
                  <TableHead>Qnt Unidade</TableHead>
                  <TableHead>Atende ao Edital?</TableHead>
                  <TableHead>Ranking</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licitantes.map((licitante, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{licitante.empresa}</TableCell>
                    <TableCell>{licitante.marca}</TableCell>
                    <TableCell>{licitante.modelo}</TableCell>
                    <TableCell>{formatCurrency(licitante.valorFinal)}</TableCell>
                    <TableCell>
                      <Badge className={getUnidadeColor(licitante.unidade)}>
                        {licitante.unidade}
                      </Badge>
                    </TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Estratégia e Planejamento */}
      <div className="border rounded-lg p-4 space-y-4 bg-green-50">
        <h3 className="text-lg font-semibold text-gray-800">Estratégia e Planejamento</h3>
        
        <div>
          <Label htmlFor="estrategiaParticipacao">Estratégia de Participação</Label>
          <Textarea
            id="estrategiaParticipacao"
            value={formData.estrategiaParticipacao}
            onChange={(e) => setFormData({...formData, estrategiaParticipacao: e.target.value})}
            placeholder="Descreva a estratégia para participação nesta oportunidade..."
            rows={4}
            disabled={isReadOnlyMode()}
          />
        </div>
        
        <div>
          <Label htmlFor="planejamentoComercial">Planejamento Comercial</Label>
          <Textarea
            id="planejamentoComercial"
            value={formData.planejamentoComercial}
            onChange={(e) => setFormData({...formData, planejamentoComercial: e.target.value})}
            placeholder="Detalhe o planejamento comercial para esta oportunidade..."
            rows={4}
            disabled={isReadOnlyMode()}
          />
        </div>
      </div>

      {/* Dados Técnicos */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Dados Técnicos</h3>
        
        <div>
          <Label>Termômetro ({formData.termometro}°)</Label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.termometro]}
                onValueChange={(value) => setFormData({...formData, termometro: value[0]})}
                max={100}
                min={0}
                step={5}
                className="flex-1"
                disabled={isReadOnlyMode()}
              />
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: getTermometroColor(formData.termometro) }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0°</span>
              <span>25°</span>
              <span>50°</span>
              <span>75°</span>
              <span>100°</span>
            </div>
            <p className="text-sm font-medium" style={{ color: getTermometroColor(formData.termometro) }}>
              {getTermometroStage(formData.termometro)}
            </p>
          </div>
        </div>

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

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="propostaNegociacao" 
            checked={formData.propostaNegociacao}
            onCheckedChange={(checked) => setFormData({...formData, propostaNegociacao: checked as boolean})}
            disabled={isReadOnlyMode()}
          />
          <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
        </div>
      </div>
    </div>
  );

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="analiseTecnicaCientifica">Análise Técnica-Científica</Label>
        <Textarea
          id="analiseTecnicaCientifica"
          value={formData.analiseTecnica}
          onChange={(e) => setFormData({...formData, analiseTecnica: e.target.value})}
          placeholder="Análise técnica detalhada"
          rows={6}
          disabled={isReadOnlyMode()}
        />
        {!formData.analiseTecnica && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Campo obrigatório - Alarme diário até preenchimento
          </p>
        )}
      </div>

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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
              <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="mt-6">
              {renderDadosGerais()}
            </TabsContent>

            <TabsContent value="analise-tecnica" className="mt-6">
              {renderAnaliseTecnica()}
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

      {showGerenciarSegmentos && (
        <GerenciarSegmentosModal
          isOpen={showGerenciarSegmentos}
          onClose={() => setShowGerenciarSegmentos(false)}
        />
      )}

      <CustomAlertModal
        isOpen={showEmprestimoAlert}
        title="Operação EMPRÉSTIMO Selecionada"
        message="A natureza da operação foi alterada para EMPRÉSTIMO. Esta operação pode requerer aprovação especial dependendo das políticas da empresa."
        onConfirm={() => setShowEmprestimoAlert(false)}
      />

      <SolicitacaoCadastroModal
        isOpen={showSolicitacaoCadastro}
        onClose={() => setShowSolicitacaoCadastro(false)}
      />
    </div>
  );
};

export default OportunidadeAvancadaForm;
