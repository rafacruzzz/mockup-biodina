import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, Plus, Edit, Upload, Download, Eye, Lock, CheckCircle, ChevronRight, Calendar, AlertTriangle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LicitacaoValidationModal from "./LicitacaoValidationModal";
import ConcorrenteModal from "./ConcorrenteModal";
import ChatInterno from "./ChatInterno";
import PedidoForm from "./PedidoForm";
import ApprovalModal from "./ApprovalModal";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (oportunidade: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  // Estados para controle das fases
  const [activeMasterTab, setActiveMasterTab] = useState('triagem');
  const [activeToolTab, setActiveToolTab] = useState('dados-gerais');
  const [isParticipacaoApproved, setIsParticipacaoApproved] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  // Estados para modais
  const [showLicitacaoModal, setShowLicitacaoModal] = useState(false);
  const [showConcorrenteModal, setShowConcorrenteModal] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  
  // Estados para dados
  const [concorrentes, setConcorrentes] = useState([
    { id: 1, nome: 'MedTech SA', produto: 'Kit diagnóstico rápido', preco: 4200 },
    { id: 2, nome: 'Global Diagnóstico', produto: 'Serviço de instalação', preco: 1200 }
  ]);

  const [licitantes, setLicitantes] = useState([
    { id: 1, nome: 'Empresa A', marca: 'Marca X', quantidade: 10, preco: 50000 },
    { id: 2, nome: 'Empresa B', marca: 'Marca Y', quantidade: 8, preco: 48000 }
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
    // Campos básicos - removido tipoOportunidade e procurandoPor
    cpfCnpj: oportunidade?.cpfCnpj || '',
    nome: oportunidade?.nome || '',
    nomeFantasia: oportunidade?.nomeFantasia || '',
    razaoSocial: oportunidade?.razaoSocial || '',
    endereco: oportunidade?.endereco || '',
    uf: oportunidade?.uf || '',
    email: oportunidade?.email || '',
    telefone: oportunidade?.telefone || '',
    website: oportunidade?.website || '',
    ativo: oportunidade?.ativo || true,
    fonteLead: oportunidade?.fonteLead || '',
    segmentoLead: oportunidade?.segmentoLead || '',
    metodoContato: oportunidade?.metodoContato || '',
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
    analiseEstrategia: oportunidade?.analiseEstrategia || '',
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
    manifestacaoRecorrer: oportunidade?.manifestacaoRecorrer || '',
    statusLicitacao: oportunidade?.statusLicitacao || '',
    motivosFracasso: oportunidade?.motivosFracasso || '',
    dataAssinaturaAta: oportunidade?.dataAssinaturaAta || '',
    observacaoGeral: oportunidade?.observacaoGeral || ''
  });

  // Funções auxiliares
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTermometroColor = (valor: number) => {
    if (valor < 60) return '#ff8c00';
    if (valor < 80) return '#ff6600';
    if (valor < 90) return '#ff4400';
    if (valor >= 90) return '#cc0000';
    return '#990000';
  };

  const getTermometroStage = (valor: number) => {
    if (valor < 60) return 'Temperatura < 60';
    if (valor < 80) return 'Em Processo (60-80)';
    if (valor < 90) return 'Boas Chances (80-90)';
    if (valor >= 90) return 'Comprometido (90+)';
    return 'Conquistado (100)';
  };

  // Validação ajustada - removeu a dependência de tipoOportunidade
  const isTriagemComplete = () => {
    return formData.nome && formData.cpfCnpj && formData.valorNegocio > 0;
  };

  const isStatusGanha = () => {
    return formData.resultadoOportunidade === 'ganho';
  };

  const isStatusPerdida = () => {
    return formData.resultadoOportunidade === 'perda';
  };

  const canShowPedidos = () => {
    return isStatusGanha();
  };

  const isReadOnlyMode = () => {
    return (activeMasterTab === 'triagem' && isParticipacaoApproved) || isStatusPerdida();
  };

  const handleMasterTabChange = (tabValue: string) => {
    if (tabValue === 'participacao' && !isParticipacaoApproved) {
      return;
    }
    setActiveMasterTab(tabValue);
  };

  const handleRequestApproval = () => {
    if (!isTriagemComplete()) {
      alert('Complete todos os campos obrigatórios da triagem antes de solicitar aprovação.');
      return;
    }
    setShowApprovalModal(true);
  };

  const handleApprovalSuccess = () => {
    setIsParticipacaoApproved(true);
    setActiveMasterTab('participacao');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Renderização dos conteúdos das ferramentas
  const renderDadosGerais = () => (
    <div className="space-y-6">
      {/* Dados do Cliente */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Dados do Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
            <Input
              id="cpfCnpj"
              value={formData.cpfCnpj}
              onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
              placeholder="000.000.000-00"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="nome">Nome / Nome Fantasia *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Nome do cliente"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="razaoSocial">Razão Social</Label>
            <Input
              id="razaoSocial"
              value={formData.razaoSocial}
              onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
              placeholder="Razão social"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="endereco">Endereço do Cliente</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              placeholder="Endereço completo"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="uf">UF</Label>
            <Select 
              value={formData.uf} 
              onValueChange={(value) => setFormData({...formData, uf: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SP">São Paulo</SelectItem>
                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                <SelectItem value="MG">Minas Gerais</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="email@exemplo.com"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              placeholder="(11) 99999-9999"
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              placeholder="https://website.com"
              disabled={isReadOnlyMode()}
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

      {/* Dados do Lead/Negócio - removidos campos: procurandoPor e status */}
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
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="segmentoLead">Segmento do Lead</Label>
            <Select 
              value={formData.segmentoLead} 
              onValueChange={(value) => setFormData({...formData, segmentoLead: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filantropico">FILANTRÓPICO</SelectItem>
                <SelectItem value="privado_estetica">PRIVADO - ESTÉTICA</SelectItem>
                <SelectItem value="privado_hospital">PRIVADO - HOSPITAL</SelectItem>
                <SelectItem value="privado_laboratorio">PRIVADO - LABORATÓRIO</SelectItem>
                <SelectItem value="privado_universidade">PRIVADO - UNIVERSIDADE</SelectItem>
                <SelectItem value="privado_veterinario">PRIVADO - VETERINÁRIO</SelectItem>
                <SelectItem value="publico_hospital_aeronautica">PÚBLICO - HOSPITAL - AERONÁUTICA</SelectItem>
                <SelectItem value="publico_hospital_estadual">PÚBLICO - HOSPITAL - ESTADUAL</SelectItem>
                <SelectItem value="publico_hospital_exercito">PÚBLICO - HOSPITAL - EXÉRCITO</SelectItem>
                <SelectItem value="publico_hospital_federal">PÚBLICO - HOSPITAL - FEDERAL</SelectItem>
                <SelectItem value="publico_hospital_marinha">PÚBLICO - HOSPITAL - MARINHA</SelectItem>
                <SelectItem value="publico_hospital_municipal">PÚBLICO - HOSPITAL - MUNICIPAL</SelectItem>
                <SelectItem value="publico_hospital_os">PÚBLICO - HOSPITAL - OS</SelectItem>
                <SelectItem value="publico_hospital_secretaria_saude">PÚBLICO - HOSPITAL - SECRETARIA DA SAÚDE</SelectItem>
                <SelectItem value="publico_hospital_universidade">PÚBLICO - HOSPITAL - UNIVERSIDADE</SelectItem>
                <SelectItem value="publico_hospital_upa">PÚBLICO - HOSPITAL - UPA</SelectItem>
                <SelectItem value="publico_hospital_veterinario">PÚBLICO - HOSPITAL - VETERINÁRIO</SelectItem>
                <SelectItem value="publico_laboratorio_aeronautica">PÚBLICO - LABORATÓRIO - AERONÁUTICA</SelectItem>
                <SelectItem value="publico_laboratorio_estadual">PÚBLICO - LABORATÓRIO - ESTADUAL</SelectItem>
                <SelectItem value="publico_laboratorio_exercito">PÚBLICO - LABORATÓRIO - EXÉRCITO</SelectItem>
                <SelectItem value="publico_laboratorio_federal">PÚBLICO - LABORATÓRIO - FEDERAL</SelectItem>
                <SelectItem value="publico_laboratorio_marinha">PÚBLICO - LABORATÓRIO - MARINHA</SelectItem>
                <SelectItem value="publico_laboratorio_municipal">PÚBLICO - LABORATÓRIO - MUNICIPAL</SelectItem>
                <SelectItem value="publico_laboratorio_os">PÚBLICO - LABORATÓRIO - OS</SelectItem>
                <SelectItem value="publico_laboratorio_secretaria_saude">PÚBLICO - LABORATÓRIO - SECRETARIA DA SAÚDE</SelectItem>
                <SelectItem value="publico_laboratorio_universidade">PÚBLICO - LABORATÓRIO - UNIVERSIDADE</SelectItem>
                <SelectItem value="publico_laboratorio_upa">PÚBLICO - LABORATÓRIO - UPA</SelectItem>
                <SelectItem value="publico_laboratorio_veterinario">PÚBLICO - LABORATÓRIO - VETERINÁRIO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="metodoContato">Método de Contato</Label>
            <Select 
              value={formData.metodoContato} 
              onValueChange={(value) => setFormData({...formData, metodoContato: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telefone">Telefone</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="video_chamada">Videochamada</SelectItem>
              </SelectContent>
            </Select>
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
              onChange={(e) => setFormData({...formData, dataLicitacao: e.target.value})}
              disabled={isReadOnlyMode()}
            />
          </div>
          <div>
            <Label htmlFor="naturezaOperacao">Qual Natureza da Operação</Label>
            <Select 
              value={formData.naturezaOperacao} 
              onValueChange={(value) => setFormData({...formData, naturezaOperacao: value})}
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
          <Label>Havia Contrato Anterior?</Label>
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
            <Label htmlFor="marcaModeloAnterior">Qual Marca/Modelo do Contrato Anterior?</Label>
            <Input
              id="marcaModeloAnterior"
              value={formData.marcaModeloAnterior}
              onChange={(e) => setFormData({...formData, marcaModeloAnterior: e.target.value})}
              placeholder="Ex: Siemens RAPIDPoint 500"
              disabled={isReadOnlyMode()}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="situacaoPregao">Situação do Pregão</Label>
            <Select 
              value={formData.situacaoPregao} 
              onValueChange={(value) => setFormData({...formData, situacaoPregao: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operacao">Em Operação</SelectItem>
                <SelectItem value="etapa_lances">Etapa de Lances</SelectItem>
                <SelectItem value="habilitacao">Habilitação</SelectItem>
                <SelectItem value="recurso">Recurso</SelectItem>
                <SelectItem value="homologado">Homologado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="statusLicitacao">Status da Licitação</Label>
            <Select 
              value={formData.statusLicitacao} 
              onValueChange={(value) => setFormData({...formData, statusLicitacao: value})}
              disabled={isReadOnlyMode()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="recursos">Recursos</SelectItem>
                <SelectItem value="fracassado">Fracassado</SelectItem>
                <SelectItem value="suspenso">Suspenso</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        <div>
          <Label htmlFor="resumoEdital">Resumo do Edital</Label>
          <Textarea
            id="resumoEdital"
            value={formData.resumoEdital}
            onChange={(e) => setFormData({...formData, resumoEdital: e.target.value})}
            placeholder="Resumo do edital da licitação"
            rows={3}
            disabled={isReadOnlyMode()}
          />
        </div>

        <div>
          <Label htmlFor="impugnacaoEdital">Impugnação do Edital</Label>
          <Textarea
            id="impugnacaoEdital"
            value={formData.impugnacaoEdital}
            onChange={(e) => setFormData({...formData, impugnacaoEdital: e.target.value})}
            placeholder="Detalhes sobre impugnação do edital"
            rows={3}
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
          <Label htmlFor="manifestacaoRecorrer">Manifestação de Interesse em Recorrer</Label>
          <Textarea
            id="manifestacaoRecorrer"
            value={formData.manifestacaoRecorrer}
            onChange={(e) => setFormData({...formData, manifestacaoRecorrer: e.target.value})}
            placeholder="Manifestação sobre interesse em recorrer"
            rows={3}
            disabled={isReadOnlyMode()}
          />
        </div>

        {formData.statusLicitacao === 'fracassado' && (
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

        {/* Tabela de Licitantes */}
        <div>
          <h4 className="text-md font-semibold mb-3">Tabela de Licitantes</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Licitante</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licitantes.map((licitante) => (
                <TableRow key={licitante.id}>
                  <TableCell>{licitante.nome}</TableCell>
                  <TableCell>{licitante.marca}</TableCell>
                  <TableCell>{licitante.quantidade}</TableCell>
                  <TableCell>{formatCurrency(licitante.preco)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" disabled={isReadOnlyMode()}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {licitantes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                    Nenhum licitante cadastrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!isReadOnlyMode() && (
            <Button type="button" className="mt-2" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Licitante
            </Button>
          )}
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
          <Label htmlFor="resultadoOportunidade">Resultado da Oportunidade</Label>
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

      {/* Botão de Solicitação de Aprovação - apenas na fase TRIAGEM */}
      {activeMasterTab === 'triagem' && !isParticipacaoApproved && (
        <div className="flex justify-center pt-4">
          <Button 
            type="button"
            onClick={handleRequestApproval}
            disabled={!isTriagemComplete()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Solicitar Aprovação para Participação
          </Button>
        </div>
      )}
    </div>
  );

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="analiseTecnica">Análise Técnica-Científica</Label>
        <Textarea
          id="analiseTecnica"
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concorrente</TableHead>
                  <TableHead>Produto/Serviço</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Comparação</TableHead>
                  {!isReadOnlyMode() && <TableHead>Ações</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {concorrentes.map((concorrente) => (
                  <TableRow key={concorrente.id}>
                    <TableCell className="font-medium">{concorrente.nome}</TableCell>
                    <TableCell>{concorrente.produto}</TableCell>
                    <TableCell>{formatCurrency(concorrente.preco)}</TableCell>
                    <TableCell>
                      <Badge className={concorrente.preco > formData.valorNegocio ? "bg-red-500" : "bg-green-500"}>
                        {concorrente.preco > formData.valorNegocio ? "Acima do nosso valor" : "Abaixo do nosso valor"}
                      </Badge>
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

  const renderPedidos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pedidos da Oportunidade</h3>
        {canShowPedidos() && (
          <Button 
            type="button"
            className="bg-biodina-gold hover:bg-biodina-gold/90"
            onClick={() => setShowPedidoForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar novos pedidos
          </Button>
        )}
      </div>

      {!canShowPedidos() && (
        <div className="text-center text-gray-500 py-8">
          <Lock className="h-8 w-8 mx-auto mb-2" />
          <p>Pedidos disponíveis apenas para oportunidades ganhas</p>
        </div>
      )}

      {canShowPedidos() && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Dt. Gerado</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">{pedido.codigo}</TableCell>
                    <TableCell>{pedido.dataGeracao}</TableCell>
                    <TableCell>{pedido.cliente}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500 text-white">
                        {pedido.situacao}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(pedido.valor)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pedidos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                      Nenhum pedido cadastrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
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

  const renderTriagemContent = () => (
    <div className="space-y-6">
      <Tabs value={activeToolTab} onValueChange={setActiveToolTab} className="w-full">
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
      </Tabs>
    </div>
  );

  const renderParticipacaoContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Fase de Participação - Aprovada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Triagem Aprovada</h3>
              <p className="text-green-700">
                A fase de triagem foi concluída e aprovada com sucesso. Agora você pode trabalhar na participação da oportunidade.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="statusParticipacao">Status da Participação</Label>
                <Select value={formData.resultadoOportunidade} onValueChange={(value) => setFormData({...formData, resultadoOportunidade: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="ganho">Ganho</SelectItem>
                    <SelectItem value="perda">Perda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Termômetro de Chances ({formData.termometro}°)</Label>
                <div className="mt-2 space-y-2">
                  <Slider
                    value={[formData.termometro]}
                    onValueChange={(value) => setFormData({...formData, termometro: value[0]})}
                    max={100}
                    min={0}
                    step={5}
                    className="flex-1"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0°</span>
                    <span>50°</span>
                    <span>100°</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="estrategiaParticipacao">Estratégia de Participação</Label>
                <Textarea
                  id="estrategiaParticipacao"
                  placeholder="Descreva a estratégia para participação nesta oportunidade..."
                  rows={4}
                />
              </div>
              
              <div>
                <Label htmlFor="planejamentoComercial">Planejamento Comercial</Label>
                <Textarea
                  id="planejamentoComercial"
                  placeholder="Detalhe o planejamento comercial para esta oportunidade..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas de ferramentas também na fase PARTICIPAÇÃO */}
      <Tabs value={activeToolTab} onValueChange={setActiveToolTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
          <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
          <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
          <TabsTrigger value="pedidos" disabled={!canShowPedidos()}>Pedidos</TabsTrigger>
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

        <TabsContent value="pedidos" className="mt-6">
          {renderPedidos()}
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          {renderDocumentos()}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-2xl">
            {oportunidade ? 'Editar Oportunidade' : 'Nova Oportunidade Comercial'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            {/* ABAS MASTERS - Nível Superior */}
            <Tabs value={activeMasterTab} onValueChange={handleMasterTabChange} className="w-full">
              <div className="flex items-center justify-center mb-6">
                <TabsList className="grid w-auto grid-cols-2 h-14 bg-gray-100">
                  <TabsTrigger 
                    value="triagem" 
                    className={`px-8 py-4 text-base font-bold ${
                      isParticipacaoApproved ? 'bg-gray-200 text-gray-500' : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white'
                    }`}
                    disabled={isParticipacaoApproved}
                  >
                    {isParticipacaoApproved && <Lock className="h-4 w-4 mr-2" />}
                    TRIAGEM
                  </TabsTrigger>
                  
                  {/* Indicador de progressão */}
                  {isParticipacaoApproved && (
                    <div className="flex items-center px-2">
                      <ChevronRight className="h-6 w-6 text-green-600" />
                    </div>
                  )}
                  
                  <TabsTrigger 
                    value="participacao" 
                    className="px-8 py-4 text-base font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    disabled={!isParticipacaoApproved}
                  >
                    {isParticipacaoApproved && <CheckCircle className="h-4 w-4 mr-2 text-green-600" />}
                    PARTICIPAÇÃO
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Conteúdo das abas masters */}
              <TabsContent value="triagem" className="mt-6">
                {renderTriagemContent()}
              </TabsContent>

              <TabsContent value="participacao" className="mt-6">
                {renderParticipacaoContent()}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Oportunidade
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

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
          valorReferencia={formData.valorNegocio}
        />
      )}

      {showPedidoForm && (
        <PedidoForm
          onClose={() => setShowPedidoForm(false)}
          onSave={(pedidoData) => {
            const novoPedido = {
              id: Date.now(),
              codigo: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
              cliente: formData.nome,
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

      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onApprove={handleApprovalSuccess}
        oportunidadeId={oportunidade?.id || formData.cpfCnpj || 'nova'}
      />
    </div>
  );
};

export default OportunidadeAvancadaForm;
