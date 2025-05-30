import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/ui/input-mask";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  CheckCircle, 
  Lock, 
  ChevronRight, 
  Thermometer,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Target,
  MessageSquare,
  Briefcase
} from "lucide-react";
import ApprovalModal from "./ApprovalModal";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activePhase, setActivePhase] = useState<'triagem' | 'participacao'>('triagem');
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [isApprovalRequired, setIsApprovalRequired] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [phaseApproved, setPhaseApproved] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    razaoSocial: '',
    endereco: '',
    uf: '',
    fonteLead: '',
    ativo: true,
    email: '',
    telefone: '',
    website: '',
    valorNegocio: '',
    metodoContato: '',
    segmentoLead: '',
    colaboradorResponsavel: '',
    dataInicio: '',
    dataLimite: '',
    procurandoPor: '',
    tags: '',
    caracteristicas: '',
    fluxoTrabalho: '',
    status: 'Em Triagem',
    descricao: '',
    tipoOportunidade: '',
    
    // Campos específicos para Licitação
    dataLicitacao: '',
    resumoEdital: '',
    impugnacaoEdital: '',
    analiseEstrategia: '',
    naturezaOperacao: '',
    numeroPregao: '',
    numeroProcesso: '',
    numeroUasg: '',
    qualSite: '',
    permiteAdesao: '',
    obsAdesao: '',
    produto: '',
    valorEstimado: '',
    qtdEquipamentos: '',
    qtdExames: '',
    contratoAnterior: '',
    marcaModelo: '',
    
    // Campos da fase PARTICIPAÇÃO
    statusParticipacao: 'Em Acompanhamento',
    termometroChances: 50,
    estrategiaParticipacao: '',
    planejamentoComercial: '',
    numeroContrato: '',
    publicoPrivado: '',
    naturezaOperacaoParticipacao: '',
    tipoContrato: '',
    situacaoVenda: '',
    previsaoFechamento: '',
    localEstoque: '',
    emailNF: '',
    formaPgto: '',
    dadosBancarios: '',
    parcelas: '',
    prazoPgto: '',
    docsNF: '',
    destacarIR: false,
    saldoEmpenho: '',
    saldoAta: '',
    programacaoFaturamento: '',
    produtos: [],
    servicos: [],
    itensNaoCadastrados: '',
    kits: '',
    infoComplementaresNF: '',
    fretePagoPor: '',
    freteRetiradoPor: '',
    prazoEntrega: '',
    cuidadosQuem: '',
    dadosRecebedor: '',
    horariosEntrega: '',
    locaisEntrega: '',
    infoAdicionalEntrega: '',
    urgente: false,
    justificativaUrgencia: '',
    autorizadoPor: '',
    dataAutorizacao: ''
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData({ ...formData, ...oportunidade });
      if (oportunidade.phaseApproved) {
        setPhaseApproved(true);
        setActivePhase('participacao');
      }
    }
  }, [oportunidade]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.nome.trim() !== '' && 
           formData.cpfCnpj.trim() !== '' && 
           parseFloat(formData.valorNegocio || '0') > 0 &&
           formData.tipoOportunidade !== '';
  };

  const handleSolicitarAprovacao = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios antes de solicitar aprovação.');
      return;
    }
    setShowApprovalModal(true);
  };

  const handleApprovalSuccess = () => {
    setPhaseApproved(true);
    setActivePhase('participacao');
    setFormData(prev => ({ ...prev, status: 'Em Acompanhamento' }));
    setShowApprovalModal(false);
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      phaseApproved,
      activePhase
    };
    onSave(dataToSave);
  };

  const renderDadosGeraisTriagem = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo-oportunidade">Tipo de Oportunidade *</Label>
          <Select 
            value={formData.tipoOportunidade} 
            onValueChange={(value) => handleInputChange('tipoOportunidade', value)}
            disabled={phaseApproved}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="licitacao">Licitação</SelectItem>
              <SelectItem value="importacao-direta">Importação Direta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf-cnpj">CPF/CNPJ *</Label>
          <InputMask
            id="cpf-cnpj"
            mask="cpf-cnpj"
            value={formData.cpfCnpj}
            onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nome">Nome/Nome Fantasia *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="razao-social">Razão Social</Label>
          <Input
            id="razao-social"
            value={formData.razaoSocial}
            onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            value={formData.endereco}
            onChange={(e) => handleInputChange('endereco', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uf">UF</Label>
          <Input
            id="uf"
            value={formData.uf}
            onChange={(e) => handleInputChange('uf', e.target.value)}
            maxLength={2}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <InputMask
            id="telefone"
            mask="phone"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            placeholder="(00) 00000-0000"
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor-negocio">Valor do Negócio *</Label>
          <InputMask
            id="valor-negocio"
            mask="currency"
            value={formData.valorNegocio}
            onChange={(e) => handleInputChange('valorNegocio', e.target.value)}
            placeholder="R$ 0,00"
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fonte-lead">Fonte do Lead</Label>
          <Select 
            value={formData.fonteLead} 
            onValueChange={(value) => handleInputChange('fonteLead', value)}
            disabled={phaseApproved}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="site">Site</SelectItem>
              <SelectItem value="indicacao">Indicação</SelectItem>
              <SelectItem value="cold-call">Cold Call</SelectItem>
              <SelectItem value="licitacao">Licitação</SelectItem>
              <SelectItem value="referencia">Referência</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="segmento-lead">Segmento do Lead</Label>
          <Select 
            value={formData.segmentoLead} 
            onValueChange={(value) => handleInputChange('segmentoLead', value)}
            disabled={phaseApproved}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hospitalar">Hospitalar</SelectItem>
              <SelectItem value="universitario">Universitário</SelectItem>
              <SelectItem value="publico">Público</SelectItem>
              <SelectItem value="municipal">Municipal</SelectItem>
              <SelectItem value="privado">Privado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="colaborador-responsavel">Colaborador Responsável</Label>
          <Input
            id="colaborador-responsavel"
            value={formData.colaboradorResponsavel}
            onChange={(e) => handleInputChange('colaboradorResponsavel', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data-inicio">Data de Início</Label>
          <Input
            id="data-inicio"
            type="date"
            value={formData.dataInicio}
            onChange={(e) => handleInputChange('dataInicio', e.target.value)}
            disabled={phaseApproved}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="data-limite">Data Limite</Label>
          <Input
            id="data-limite"
            type="date"
            value={formData.dataLimite}
            onChange={(e) => handleInputChange('dataLimite', e.target.value)}
            disabled={phaseApproved}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleInputChange('descricao', e.target.value)}
          rows={3}
          disabled={phaseApproved}
        />
      </div>

      {formData.tipoOportunidade === 'licitacao' && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-semibold text-lg">Dados Específicos - Licitação</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-licitacao">Data da Licitação</Label>
              <Input
                id="data-licitacao"
                type="date"
                value={formData.dataLicitacao}
                onChange={(e) => handleInputChange('dataLicitacao', e.target.value)}
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero-pregao">Nº Pregão/INEX/ATA/SRP</Label>
              <Input
                id="numero-pregao"
                value={formData.numeroPregao}
                onChange={(e) => handleInputChange('numeroPregao', e.target.value)}
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero-processo">Nº Processo</Label>
              <Input
                id="numero-processo"
                value={formData.numeroProcesso}
                onChange={(e) => handleInputChange('numeroProcesso', e.target.value)}
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero-uasg">Nº UASG</Label>
              <Input
                id="numero-uasg"
                value={formData.numeroUasg}
                onChange={(e) => handleInputChange('numeroUasg', e.target.value)}
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor-estimado">Valor Estimado</Label>
              <InputMask
                id="valor-estimado"
                mask="currency"
                value={formData.valorEstimado}
                onChange={(e) => handleInputChange('valorEstimado', e.target.value)}
                placeholder="R$ 0,00"
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qtd-equipamentos">Qtd Equipamentos</Label>
              <Input
                id="qtd-equipamentos"
                type="number"
                value={formData.qtdEquipamentos}
                onChange={(e) => handleInputChange('qtdEquipamentos', e.target.value)}
                disabled={phaseApproved}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumo-edital">Resumo do Edital</Label>
            <Textarea
              id="resumo-edital"
              value={formData.resumoEdital}
              onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
              rows={3}
              disabled={phaseApproved}
            />
          </div>
        </div>
      )}

      {!phaseApproved && (
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={handleSolicitarAprovacao}
            disabled={!isFormValid()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Lock className="h-4 w-4 mr-2" />
            Solicitar Aprovação para Participação
          </Button>
        </div>
      )}
    </div>
  );

  const renderDadosGeraisParticipacao = () => (
    <div className="space-y-6">
      {phaseApproved && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            <strong>Triagem Aprovada</strong><br />
            A fase de triagem foi concluída e aprovada com sucesso. Agora você pode trabalhar na participação da oportunidade.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status-participacao">Status da Participação</Label>
          <Select 
            value={formData.statusParticipacao} 
            onValueChange={(value) => handleInputChange('statusParticipacao', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Em Acompanhamento">Em Acompanhamento</SelectItem>
              <SelectItem value="Ganha">Ganha</SelectItem>
              <SelectItem value="Perdida">Perdida</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Termômetro de Chances ({formData.termometroChances}°)</Label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">0°</span>
            <Slider
              value={[formData.termometroChances]}
              onValueChange={(value) => handleInputChange('termometroChances', value[0])}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="text-sm text-gray-500">100°</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Thermometer className="h-4 w-4" />
            <span className="text-sm font-medium">{formData.termometroChances}°</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estrategia-participacao">Estratégia de Participação</Label>
        <Textarea
          id="estrategia-participacao"
          value={formData.estrategiaParticipacao}
          onChange={(e) => handleInputChange('estrategiaParticipacao', e.target.value)}
          placeholder="Descreva a estratégia para participação nesta oportunidade..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="planejamento-comercial">Planejamento Comercial</Label>
        <Textarea
          id="planejamento-comercial"
          value={formData.planejamentoComercial}
          onChange={(e) => handleInputChange('planejamentoComercial', e.target.value)}
          placeholder="Detalhe o planejamento comercial para esta oportunidade..."
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {oportunidade ? 'Editar Oportunidade Comercial' : 'Nova Oportunidade Comercial'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Abas Masters com layout centralizado fixo */}
          <div className="flex items-center justify-center mb-4 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <button
                className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all ${
                  activePhase === 'triagem'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                } ${phaseApproved ? 'opacity-60' : ''}`}
                onClick={() => !phaseApproved && setActivePhase('triagem')}
                disabled={phaseApproved}
              >
                {phaseApproved && <CheckCircle className="h-4 w-4" />}
                TRIAGEM
              </button>

              {phaseApproved && (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}

              <button
                className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition-all ${
                  activePhase === 'participacao' && phaseApproved
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => phaseApproved && setActivePhase('participacao')}
                disabled={!phaseApproved}
              >
                PARTICIPAÇÃO
              </button>
            </div>
          </div>

          {phaseApproved && activePhase === 'participacao' && (
            <div className="mb-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Fase de Participação - Aprovada
              </Badge>
            </div>
          )}

          {/* Abas de Ferramentas */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
              <TabsTrigger value="historico">Histórico/Chat</TabsTrigger>
              <TabsTrigger value="pedidos" disabled={formData.statusParticipacao !== 'Ganha'}>
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto mt-4">
              <TabsContent value="dados-gerais" className="space-y-4">
                {activePhase === 'triagem' ? renderDadosGeraisTriagem() : renderDadosGeraisParticipacao()}
              </TabsContent>

              <TabsContent value="analise-tecnica" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Técnica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Digite a análise técnica da oportunidade..."
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Interações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="text-sm text-gray-600">Oportunidade criada</p>
                        <p className="text-xs text-gray-400">Hoje às 14:30</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pedidos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pedidos Relacionados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Nenhum pedido encontrado para esta oportunidade.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">Nenhum documento anexado.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
            Salvar
          </Button>
        </div>

        {showApprovalModal && (
          <ApprovalModal
            isOpen={showApprovalModal}
            onClose={() => setShowApprovalModal(false)}
            onApprove={handleApprovalSuccess}
            oportunidadeId={oportunidade?.id || 'new'}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OportunidadeAvancadaForm;
