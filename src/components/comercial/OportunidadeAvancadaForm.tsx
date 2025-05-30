
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
import { Checkbox } from "@/components/ui/checkbox";
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
  Briefcase,
  Upload,
  Plus
} from "lucide-react";
import ApprovalModal from "./ApprovalModal";
import ConcorrenteTable from "./ConcorrenteTable";
import ProdutoServicoTable from "./ProdutoServicoTable";

interface OportunidadeAvancadaFormProps {
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const OportunidadeAvancadaForm = ({ oportunidade, onClose, onSave }: OportunidadeAvancadaFormProps) => {
  const [activePhase, setActivePhase] = useState<'triagem' | 'participacao'>('triagem');
  const [activeTab, setActiveTab] = useState('dados-gerais');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [phaseApproved, setPhaseApproved] = useState(false);

  const [formData, setFormData] = useState({
    // Campos básicos
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
    
    // Campos específicos para Licitação - TRIAGEM
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
    vigenciaAta: '',
    valorTeste: '',
    permiteAdesaoAta: '',
    qtdTestesAdesao: '',
    
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
      {/* Seção: Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              <Select 
                value={formData.uf} 
                onValueChange={(value) => handleInputChange('uf', value)}
                disabled={phaseApproved}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">AC - Acre</SelectItem>
                  <SelectItem value="AL">AL - Alagoas</SelectItem>
                  <SelectItem value="AP">AP - Amapá</SelectItem>
                  <SelectItem value="AM">AM - Amazonas</SelectItem>
                  <SelectItem value="BA">BA - Bahia</SelectItem>
                  <SelectItem value="CE">CE - Ceará</SelectItem>
                  <SelectItem value="DF">DF - Distrito Federal</SelectItem>
                  <SelectItem value="ES">ES - Espírito Santo</SelectItem>
                  <SelectItem value="GO">GO - Goiás</SelectItem>
                  <SelectItem value="MA">MA - Maranhão</SelectItem>
                  <SelectItem value="MT">MT - Mato Grosso</SelectItem>
                  <SelectItem value="MS">MS - Mato Grosso do Sul</SelectItem>
                  <SelectItem value="MG">MG - Minas Gerais</SelectItem>
                  <SelectItem value="PA">PA - Pará</SelectItem>
                  <SelectItem value="PB">PB - Paraíba</SelectItem>
                  <SelectItem value="PR">PR - Paraná</SelectItem>
                  <SelectItem value="PE">PE - Pernambuco</SelectItem>
                  <SelectItem value="PI">PI - Piauí</SelectItem>
                  <SelectItem value="RJ">RJ - Rio de Janeiro</SelectItem>
                  <SelectItem value="RN">RN - Rio Grande do Norte</SelectItem>
                  <SelectItem value="RS">RS - Rio Grande do Sul</SelectItem>
                  <SelectItem value="RO">RO - Rondônia</SelectItem>
                  <SelectItem value="RR">RR - Roraima</SelectItem>
                  <SelectItem value="SC">SC - Santa Catarina</SelectItem>
                  <SelectItem value="SP">SP - São Paulo</SelectItem>
                  <SelectItem value="SE">SE - Sergipe</SelectItem>
                  <SelectItem value="TO">TO - Tocantins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.exemplo.com.br"
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metodo-contato">Método de Contato Preferido</Label>
              <Select 
                value={formData.metodoContato} 
                onValueChange={(value) => handleInputChange('metodoContato', value)}
                disabled={phaseApproved}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="videoconferencia">Videoconferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Detalhes Comerciais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Detalhes Comerciais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="feira">Feira/Evento</SelectItem>
                  <SelectItem value="parceiro">Parceiro</SelectItem>
                  <SelectItem value="midia-social">Mídia Social</SelectItem>
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
                  <SelectItem value="laboratorio">Laboratório</SelectItem>
                  <SelectItem value="clinica">Clínica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="colaborador-responsavel">Colaborador Responsável</Label>
              <Select 
                value={formData.colaboradorResponsavel} 
                onValueChange={(value) => handleInputChange('colaboradorResponsavel', value)}
                disabled={phaseApproved}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faber-oliveira">Faber Oliveira</SelectItem>
                  <SelectItem value="maria-santos">Maria Santos</SelectItem>
                  <SelectItem value="joao-silva">João Silva</SelectItem>
                  <SelectItem value="carlos-oliveira">Carlos Oliveira</SelectItem>
                  <SelectItem value="ana-costa">Ana Costa</SelectItem>
                </SelectContent>
              </Select>
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
        </CardContent>
      </Card>

      {/* Seção: Descrição */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                rows={3}
                placeholder="Descreva detalhadamente a oportunidade..."
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="procurando-por">O que o cliente está procurando?</Label>
              <Textarea
                id="procurando-por"
                value={formData.procurandoPor}
                onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
                rows={2}
                placeholder="Descreva as necessidades específicas do cliente..."
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="caracteristicas">Características Especiais</Label>
              <Input
                id="caracteristicas"
                value={formData.caracteristicas}
                onChange={(e) => handleInputChange('caracteristicas', e.target.value)}
                placeholder="Ex: Urgente, Alto valor, Cliente estratégico..."
                disabled={phaseApproved}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Ex: licitação, urgente, alta-prioridade (separadas por vírgula)"
                disabled={phaseApproved}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos específicos para Licitação */}
      {formData.tipoOportunidade === 'licitacao' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dados Específicos - Licitação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Identificadores */}
              <div>
                <h4 className="font-semibold mb-3">Identificadores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="qual-site">Site da Licitação</Label>
                    <Select 
                      value={formData.qualSite} 
                      onValueChange={(value) => handleInputChange('qualSite', value)}
                      disabled={phaseApproved}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o site" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprasnet">ComprasNet</SelectItem>
                        <SelectItem value="bec">BEC - Bolsa Eletrônica</SelectItem>
                        <SelectItem value="portal-nacional">Portal Nacional de Contratações Públicas</SelectItem>
                        <SelectItem value="licitacoes-e">Licitações-e</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Datas e Valores */}
              <div>
                <h4 className="font-semibold mb-3">Datas e Valores</h4>
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
                    <Label htmlFor="vigencia-ata">Vigência da Ata</Label>
                    <Input
                      id="vigencia-ata"
                      type="date"
                      value={formData.vigenciaAta}
                      onChange={(e) => handleInputChange('vigenciaAta', e.target.value)}
                      disabled={phaseApproved}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor-teste">Valor do Teste</Label>
                    <InputMask
                      id="valor-teste"
                      mask="currency"
                      value={formData.valorTeste}
                      onChange={(e) => handleInputChange('valorTeste', e.target.value)}
                      placeholder="R$ 0,00"
                      disabled={phaseApproved}
                    />
                  </div>
                </div>
              </div>

              {/* Quantidades */}
              <div>
                <h4 className="font-semibold mb-3">Quantidades</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="qtd-exames">Qtd Exames</Label>
                    <Input
                      id="qtd-exames"
                      type="number"
                      value={formData.qtdExames}
                      onChange={(e) => handleInputChange('qtdExames', e.target.value)}
                      disabled={phaseApproved}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qtd-testes-adesao">Qtd Testes Adesão</Label>
                    <Input
                      id="qtd-testes-adesao"
                      type="number"
                      value={formData.qtdTestesAdesao}
                      onChange={(e) => handleInputChange('qtdTestesAdesao', e.target.value)}
                      placeholder="Ex: 1000"
                      disabled={phaseApproved}
                    />
                  </div>
                </div>
              </div>

              {/* Natureza e Adesão */}
              <div>
                <h4 className="font-semibold mb-3">Natureza da Operação e Adesão</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="natureza-operacao">Natureza da Operação</Label>
                    <Select 
                      value={formData.naturezaOperacao} 
                      onValueChange={(value) => handleInputChange('naturezaOperacao', value)}
                      disabled={phaseApproved}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a natureza" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venda">Venda</SelectItem>
                        <SelectItem value="locacao">Locação</SelectItem>
                        <SelectItem value="comodato">Comodato</SelectItem>
                        <SelectItem value="servico">Serviço</SelectItem>
                        <SelectItem value="consultoria">Consultoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="permite-adesao">Permite Adesão?</Label>
                    <Select 
                      value={formData.permiteAdesao} 
                      onValueChange={(value) => handleInputChange('permiteAdesao', value)}
                      disabled={phaseApproved}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="permite-adesao-ata">Permite Adesão na Ata?</Label>
                    <Select 
                      value={formData.permiteAdesaoAta} 
                      onValueChange={(value) => handleInputChange('permiteAdesaoAta', value)}
                      disabled={phaseApproved}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contrato-anterior">Contrato Anterior?</Label>
                    <Select 
                      value={formData.contratoAnterior} 
                      onValueChange={(value) => handleInputChange('contratoAnterior', value)}
                      disabled={phaseApproved}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Campos condicionais */}
              {formData.permiteAdesao === 'sim' && (
                <div className="space-y-2">
                  <Label htmlFor="obs-adesao">Observações sobre Adesão</Label>
                  <Textarea
                    id="obs-adesao"
                    value={formData.obsAdesao}
                    onChange={(e) => handleInputChange('obsAdesao', e.target.value)}
                    rows={2}
                    placeholder="Detalhe as condições para adesão..."
                    disabled={phaseApproved}
                  />
                </div>
              )}

              {formData.contratoAnterior === 'sim' && (
                <div className="space-y-2">
                  <Label htmlFor="marca-modelo">Marca/Modelo Anterior</Label>
                  <Input
                    id="marca-modelo"
                    value={formData.marcaModelo}
                    onChange={(e) => handleInputChange('marcaModelo', e.target.value)}
                    placeholder="Ex: Radiometer ABL800"
                    disabled={phaseApproved}
                  />
                </div>
              )}

              {/* Textos longos */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resumo-edital">Resumo do Edital</Label>
                  <Textarea
                    id="resumo-edital"
                    value={formData.resumoEdital}
                    onChange={(e) => handleInputChange('resumoEdital', e.target.value)}
                    rows={3}
                    placeholder="Resuma os principais pontos do edital..."
                    disabled={phaseApproved}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="produto">Produto/Serviço Solicitado</Label>
                  <Textarea
                    id="produto"
                    value={formData.produto}
                    onChange={(e) => handleInputChange('produto', e.target.value)}
                    rows={2}
                    placeholder="Descreva o produto ou serviço solicitado..."
                    disabled={phaseApproved}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impugnacao-edital">Impugnação do Edital</Label>
                  <Textarea
                    id="impugnacao-edital"
                    value={formData.impugnacaoEdital}
                    onChange={(e) => handleInputChange('impugnacaoEdital', e.target.value)}
                    rows={3}
                    placeholder="Pontos para impugnação ou esclarecimentos..."
                    disabled={phaseApproved}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analise-estrategia">Análise de Estratégia</Label>
                  <Textarea
                    id="analise-estrategia"
                    value={formData.analiseEstrategia}
                    onChange={(e) => handleInputChange('analiseEstrategia', e.target.value)}
                    rows={3}
                    placeholder="Estratégia para participação da licitação..."
                    disabled={phaseApproved}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Seção: Status e Termômetro */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Status da Participação
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Seção: Identificadores */}
      <Card>
        <CardHeader>
          <CardTitle>Identificadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numero-contrato">Número do Contrato</Label>
              <Input
                id="numero-contrato"
                value={formData.numeroContrato}
                onChange={(e) => handleInputChange('numeroContrato', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publico-privado">Público/Privado</Label>
              <Select 
                value={formData.publicoPrivado} 
                onValueChange={(value) => handleInputChange('publicoPrivado', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="publico">Público</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="natureza-operacao-participacao">Natureza da Operação</Label>
              <Select 
                value={formData.naturezaOperacaoParticipacao} 
                onValueChange={(value) => handleInputChange('naturezaOperacaoParticipacao', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="locacao">Locação</SelectItem>
                  <SelectItem value="comodato">Comodato</SelectItem>
                  <SelectItem value="servico">Serviço</SelectItem>
                  <SelectItem value="consultoria">Consultoria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo-contrato">Tipo de Contrato</Label>
              <Select 
                value={formData.tipoContrato} 
                onValueChange={(value) => handleInputChange('tipoContrato', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ata-registro-precos">Ata de Registro de Preços</SelectItem>
                  <SelectItem value="contrato-direto">Contrato Direto</SelectItem>
                  <SelectItem value="pregao">Pregão</SelectItem>
                  <SelectItem value="concorrencia">Concorrência</SelectItem>
                  <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Detalhes */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Participação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="situacao-venda">Situação da Venda</Label>
              <Select 
                value={formData.situacaoVenda} 
                onValueChange={(value) => handleInputChange('situacaoVenda', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospeccao">Prospecção</SelectItem>
                  <SelectItem value="apresentacao">Apresentação</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                  <SelectItem value="proposta-enviada">Proposta Enviada</SelectItem>
                  <SelectItem value="aguardando-decisao">Aguardando Decisão</SelectItem>
                  <SelectItem value="fechamento">Fechamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previsao-fechamento">Previsão de Fechamento</Label>
              <Input
                id="previsao-fechamento"
                type="date"
                value={formData.previsaoFechamento}
                onChange={(e) => handleInputChange('previsaoFechamento', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="local-estoque">Local de Estoque</Label>
              <Input
                id="local-estoque"
                value={formData.localEstoque}
                onChange={(e) => handleInputChange('localEstoque', e.target.value)}
                placeholder="Ex: CD São Paulo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-nf">E-mail para NF</Label>
              <Input
                id="email-nf"
                type="email"
                value={formData.emailNF}
                onChange={(e) => handleInputChange('emailNF', e.target.value)}
                placeholder="contato@cliente.com.br"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Dados Financeiros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Dados Financeiros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="forma-pgto">Forma de Pagamento</Label>
                <Select 
                  value={formData.formaPgto} 
                  onValueChange={(value) => handleInputChange('formaPgto', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-vista">À Vista</SelectItem>
                    <SelectItem value="parcelado">Parcelado</SelectItem>
                    <SelectItem value="30-dias">30 dias</SelectItem>
                    <SelectItem value="60-dias">60 dias</SelectItem>
                    <SelectItem value="90-dias">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parcelas">Parcelas</Label>
                <Input
                  id="parcelas"
                  type="number"
                  value={formData.parcelas}
                  onChange={(e) => handleInputChange('parcelas', e.target.value)}
                  placeholder="Ex: 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazo-pgto">Prazo de Pagamento</Label>
                <Input
                  id="prazo-pgto"
                  value={formData.prazoPgto}
                  onChange={(e) => handleInputChange('prazoPgto', e.target.value)}
                  placeholder="Ex: 30 dias após entrega"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saldo-empenho">Saldo do Empenho</Label>
                <InputMask
                  id="saldo-empenho"
                  mask="currency"
                  value={formData.saldoEmpenho}
                  onChange={(e) => handleInputChange('saldoEmpenho', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saldo-ata">Saldo da Ata</Label>
                <InputMask
                  id="saldo-ata"
                  mask="currency"
                  value={formData.saldoAta}
                  onChange={(e) => handleInputChange('saldoAta', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="destacar-ir"
                checked={formData.destacarIR}
                onCheckedChange={(checked) => handleInputChange('destacarIR', checked)}
              />
              <Label htmlFor="destacar-ir">Destacar IR na Nota Fiscal</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dados-bancarios">Dados Bancários</Label>
              <Textarea
                id="dados-bancarios"
                value={formData.dadosBancarios}
                onChange={(e) => handleInputChange('dadosBancarios', e.target.value)}
                rows={3}
                placeholder="Banco, Agência, Conta..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programacao-faturamento">Programação de Faturamento</Label>
              <Textarea
                id="programacao-faturamento"
                value={formData.programacaoFaturamento}
                onChange={(e) => handleInputChange('programacaoFaturamento', e.target.value)}
                rows={2}
                placeholder="Cronograma de faturamento..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="docs-nf">Documentos para NF</Label>
              <Input
                id="docs-nf"
                value={formData.docsNF}
                onChange={(e) => handleInputChange('docsNF', e.target.value)}
                placeholder="Ex: Empenho, Autorização de Fornecimento..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas de Produtos e Serviços */}
      <ProdutoServicoTable 
        tipo="produto"
        items={formData.produtos}
        onItemsChange={(items) => handleInputChange('produtos', items)}
      />

      <ProdutoServicoTable 
        tipo="servico"
        items={formData.servicos}
        onItemsChange={(items) => handleInputChange('servicos', items)}
      />

      {/* Seção: Informações Complementares */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Complementares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itens-nao-cadastrados">Itens Não Cadastrados</Label>
              <Textarea
                id="itens-nao-cadastrados"
                value={formData.itensNaoCadastrados}
                onChange={(e) => handleInputChange('itensNaoCadastrados', e.target.value)}
                rows={2}
                placeholder="Liste itens que precisam ser cadastrados..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kits">Kits/Conjuntos</Label>
              <Textarea
                id="kits"
                value={formData.kits}
                onChange={(e) => handleInputChange('kits', e.target.value)}
                rows={2}
                placeholder="Descreva kits ou conjuntos especiais..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="info-complementares-nf">Informações Complementares para NF</Label>
              <Textarea
                id="info-complementares-nf"
                value={formData.infoComplementaresNF}
                onChange={(e) => handleInputChange('infoComplementaresNF', e.target.value)}
                rows={2}
                placeholder="Informações adicionais para a nota fiscal..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Informações de Frete */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Frete e Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frete-pago-por">Frete Pago por</Label>
                <Select 
                  value={formData.fretePagoPor} 
                  onValueChange={(value) => handleInputChange('fretePagoPor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remetente">Remetente (CIF)</SelectItem>
                    <SelectItem value="destinatario">Destinatário (FOB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freteado-retirado-por">Frete Retirado por</Label>
                <Select 
                  value={formData.freteRetiradoPor} 
                  onValueChange={(value) => handleInputChange('freteRetiradoPor', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transportadora">Transportadora</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="biodina">Biodina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazo-entrega">Prazo de Entrega</Label>
                <Input
                  id="prazo-entrega"
                  value={formData.prazoEntrega}
                  onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
                  placeholder="Ex: 15 dias úteis"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuidados-quem">Cuidados com Quem?</Label>
                <Input
                  id="cuidados-quem"
                  value={formData.cuidadosQuem}
                  onChange={(e) => handleInputChange('cuidadosQuem', e.target.value)}
                  placeholder="Ex: Recebedor, Almoxarifado..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dados-recebedor">Dados do Recebedor</Label>
              <Textarea
                id="dados-recebedor"
                value={formData.dadosRecebedor}
                onChange={(e) => handleInputChange('dadosRecebedor', e.target.value)}
                rows={2}
                placeholder="Nome, telefone, e-mail do responsável pelo recebimento..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horarios-entrega">Horários de Entrega</Label>
              <Input
                id="horarios-entrega"
                value={formData.horariosEntrega}
                onChange={(e) => handleInputChange('horariosEntrega', e.target.value)}
                placeholder="Ex: 8h às 17h, de segunda a sexta"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locais-entrega">Locais de Entrega</Label>
              <Textarea
                id="locais-entrega"
                value={formData.locaisEntrega}
                onChange={(e) => handleInputChange('locaisEntrega', e.target.value)}
                rows={2}
                placeholder="Endereços específicos para entrega..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="info-adicional-entrega">Informações Adicionais de Entrega</Label>
              <Textarea
                id="info-adicional-entrega"
                value={formData.infoAdicionalEntrega}
                onChange={(e) => handleInputChange('infoAdicionalEntrega', e.target.value)}
                rows={2}
                placeholder="Cuidados especiais, restrições, etc..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Outros */}
      <Card>
        <CardHeader>
          <CardTitle>Outros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgente"
                checked={formData.urgente}
                onCheckedChange={(checked) => handleInputChange('urgente', checked)}
              />
              <Label htmlFor="urgente">Urgente</Label>
            </div>

            {formData.urgente && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="justificativa-urgencia">Justificativa da Urgência</Label>
                  <Textarea
                    id="justificativa-urgencia"
                    value={formData.justificativaUrgencia}
                    onChange={(e) => handleInputChange('justificativaUrgencia', e.target.value)}
                    rows={2}
                    placeholder="Explique o motivo da urgência..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="autorizado-por">Autorizado por</Label>
                    <Input
                      id="autorizado-por"
                      value={formData.autorizadoPor}
                      onChange={(e) => handleInputChange('autorizadoPor', e.target.value)}
                      placeholder="Nome do autorizador"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-autorizacao">Data da Autorização</Label>
                    <Input
                      id="data-autorizacao"
                      type="date"
                      value={formData.dataAutorizacao}
                      onChange={(e) => handleInputChange('dataAutorizacao', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Seção: Estratégias */}
      <Card>
        <CardHeader>
          <CardTitle>Estratégias de Participação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );

  const renderAnaliseTecnica = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise Técnica da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Digite a análise técnica detalhada da oportunidade..."
            rows={8}
            className="mb-4"
          />
        </CardContent>
      </Card>

      <ConcorrenteTable />
    </div>
  );

  const renderHistoricoChat = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Histórico de Interações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-medium">Oportunidade criada</p>
              <p className="text-sm text-gray-600">Sistema automatizado</p>
              <p className="text-xs text-gray-400">Hoje às 14:30</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm font-medium">Primeira análise técnica realizada</p>
              <p className="text-sm text-gray-600">João Silva</p>
              <p className="text-xs text-gray-400">Ontem às 16:45</p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-sm font-medium">Contato com cliente realizado</p>
              <p className="text-sm text-gray-600">Maria Santos</p>
              <p className="text-xs text-gray-400">Ontem às 10:20</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm font-medium">Proposta comercial enviada</p>
              <p className="text-sm text-gray-600">Carlos Oliveira</p>
              <p className="text-xs text-gray-400">2 dias atrás às 14:15</p>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Digite sua mensagem..." 
                className="flex-1"
              />
              <Button>Enviar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPedidos = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Pedidos Relacionados
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formData.statusParticipacao === 'Ganha' ? (
          <div className="space-y-4">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Gerar Novo Pedido
            </Button>
            <p className="text-gray-500 text-center">Nenhum pedido encontrado para esta oportunidade.</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Pedidos só podem ser gerados após a oportunidade ser marcada como "Ganha".
          </p>
        )}
      </CardContent>
    </Card>
  );

  const renderDocumentos = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Arquivos
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Tipos aceitos: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (máx. 10MB)</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Documentos anexados:</p>
            <p className="text-gray-500">Nenhum documento anexado.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {oportunidade ? 'Editar Oportunidade Comercial' : 'Nova Oportunidade Comercial'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Abas Masters */}
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
                {renderAnaliseTecnica()}
              </TabsContent>

              <TabsContent value="historico" className="space-y-4">
                {renderHistoricoChat()}
              </TabsContent>

              <TabsContent value="pedidos" className="space-y-4">
                {renderPedidos()}
              </TabsContent>

              <TabsContent value="documentos" className="space-y-4">
                {renderDocumentos()}
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
