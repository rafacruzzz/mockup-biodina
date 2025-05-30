
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, X, Upload, FileText, Users, Settings, MessageSquare, Package, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ImportacaoDiretaForm = ({ isOpen, oportunidade, onClose, onSave }: ImportacaoDiretaFormProps) => {
  const [activeMasterTab, setActiveMasterTab] = useState('comercial');
  const [activeToolTab, setActiveToolTab] = useState('dados-gerais');
  
  const [formData, setFormData] = useState({
    // Informações Básicas do Cliente
    cpfCnpj: '',
    nome: '',
    nomeFantasia: '',
    razaoSocial: '',
    endereco: '',
    uf: '',
    fonteLead: '',
    ativo: true,
    email: '',
    telefone: '',
    website: '',
    
    // Informações do Negócio
    valorNegocio: '',
    metodoContato: '',
    segmentoLead: '',
    colaboradoresResponsaveis: [],
    dataInicio: '',
    dataLimite: '',
    procurandoPor: '',
    tags: [],
    caracteristicas: '',
    fluxoTrabalho: '',
    status: '',
    descricao: '',
    dataVisita: '',
    
    // Campos Específicos de Importação
    spi: '',
    di: '',
    invoice: '',
    comissao: '',
    numeroProjeto: '',
    numeroPedido: '',
    numeroContrato: '',
    publicoPrivado: '',
    naturezaOperacao: '',
    tipoContrato: '',
    situacao: '',
    previsaoFechamento: '',
    gerarExpedicao: false,
    nfConsumoFinal: false,
    localEstoque: '',
    
    // Dados Financeiros
    emailNotasFiscais: '',
    formaPagamento: '',
    dadosBancarios: '',
    parcelas: '',
    prazoPagamento: '',
    documentacaoNF: '',
    destacarIR: false,
    saldoEmpenho: '',
    saldoAta: '',
    programacaoFaturamento: '',
    
    // Informações de Frete
    fretePagar: '',
    freteRetirar: '',
    prazoEntrega: '',
    entregarRetirar: '',
    dadosRecebedor: '',
    horariosPermitidos: '',
    locaisEntrega: '',
    informacoesEntrega: '',
    
    // Campos Adicionais
    urgente: false,
    justificativaUrgencia: '',
    autorizadoPor: '',
    dataAutorizacao: '',
    termometro: 'CONQUISTADO/QUENTE', // Fixado conforme especificação
    motivoGanho: '',
    
    // Análise Técnica
    analiseTecnica: '',
    
    // Análise da Concorrência
    analiseComcorrencia: '',
    propostaNegociacao: false,
    
    // Produtos e Serviços
    produtos: [],
    servicos: [],
    itensNaoCadastrados: '',
    kits: [],
    informacoesComplementares: ''
  });

  useEffect(() => {
    if (oportunidade) {
      setFormData(prev => ({ ...prev, ...oportunidade }));
    }
  }, [oportunidade]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.cpfCnpj || !formData.valorNegocio) {
      toast.error("Preencha os campos obrigatórios: Nome, CPF/CNPJ e Valor do Negócio");
      return;
    }

    onSave({
      ...formData,
      tipo: 'importacao_direta',
      modalidade: 'importacao_direta'
    });
    toast.success("Importação Direta salva com sucesso!");
    onClose();
  };

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' },
    { id: 'ovc', label: 'OVC' },
    { id: 'nod-so', label: 'NOD/SO' },
    { id: 'ddr', label: 'DDR' }
  ];

  const toolTabs = [
    { id: 'dados-gerais', label: 'Dados Gerais', icon: FileText },
    { id: 'analise-tecnica', label: 'Análise Técnica', icon: Settings },
    { id: 'analise-concorrencia', label: 'Análise da Concorrência', icon: Users },
    { id: 'historico-chat', label: 'Histórico/Chat', icon: MessageSquare },
    { id: 'documentos', label: 'Documentos', icon: Upload },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart }
  ];

  const renderDadosGerais = () => (
    <div className="space-y-6">
      {/* Informações Básicas do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Label htmlFor="nome">Nome / Nome Fantasia *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Digite o nome"
            />
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
          <div>
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
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="AL">AL</SelectItem>
                <SelectItem value="AP">AP</SelectItem>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="BA">BA</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="DF">DF</SelectItem>
                <SelectItem value="ES">ES</SelectItem>
                <SelectItem value="GO">GO</SelectItem>
                <SelectItem value="MA">MA</SelectItem>
                <SelectItem value="MT">MT</SelectItem>
                <SelectItem value="MS">MS</SelectItem>
                <SelectItem value="MG">MG</SelectItem>
                <SelectItem value="PA">PA</SelectItem>
                <SelectItem value="PB">PB</SelectItem>
                <SelectItem value="PR">PR</SelectItem>
                <SelectItem value="PE">PE</SelectItem>
                <SelectItem value="PI">PI</SelectItem>
                <SelectItem value="RJ">RJ</SelectItem>
                <SelectItem value="RN">RN</SelectItem>
                <SelectItem value="RS">RS</SelectItem>
                <SelectItem value="RO">RO</SelectItem>
                <SelectItem value="RR">RR</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="SP">SP</SelectItem>
                <SelectItem value="SE">SE</SelectItem>
                <SelectItem value="TO">TO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fonteLead">Fonte do Lead</Label>
            <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site">Site</SelectItem>
                <SelectItem value="indicacao">Indicação</SelectItem>
                <SelectItem value="cold-call">Cold Call</SelectItem>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="referencia">Referência</SelectItem>
                <SelectItem value="evento">Evento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ativo" 
              checked={formData.ativo}
              onCheckedChange={(checked) => handleInputChange('ativo', checked)}
            />
            <Label htmlFor="ativo">Ativo</Label>
          </div>
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
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="Digite o website"
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações do Negócio */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Negócio</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="valorNegocio">Valor do Negócio *</Label>
            <Input
              id="valorNegocio"
              value={formData.valorNegocio}
              onChange={(e) => handleInputChange('valorNegocio', e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>
          <div>
            <Label htmlFor="metodoContato">Método de Contato</Label>
            <Select value={formData.metodoContato} onValueChange={(value) => handleInputChange('metodoContato', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telefone">Telefone</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="video-chamada">Vídeo Chamada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="segmentoLead">Segmento do Lead</Label>
            <Select value={formData.segmentoLead} onValueChange={(value) => handleInputChange('segmentoLead', value)}>
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
          <div>
            <Label htmlFor="dataInicio">Data de Início</Label>
            <Input
              id="dataInicio"
              type="date"
              value={formData.dataInicio}
              onChange={(e) => handleInputChange('dataInicio', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dataLimite">Data Limite</Label>
            <Input
              id="dataLimite"
              type="date"
              value={formData.dataLimite}
              onChange={(e) => handleInputChange('dataLimite', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dataVisita">Data da Visita</Label>
            <Input
              id="dataVisita"
              type="date"
              value={formData.dataVisita}
              onChange={(e) => handleInputChange('dataVisita', e.target.value)}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="procurandoPor">Procurando Por (Contatos Vinculados ao Cliente)</Label>
            <Input
              id="procurandoPor"
              value={formData.procurandoPor}
              onChange={(e) => handleInputChange('procurandoPor', e.target.value)}
              placeholder="Digite os contatos"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Digite a descrição"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Campos Específicos de Importação */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Específicos da Importação Direta</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="spi">SPI</Label>
            <Input
              id="spi"
              value={formData.spi}
              onChange={(e) => handleInputChange('spi', e.target.value)}
              placeholder="Digite o SPI"
            />
          </div>
          <div>
            <Label htmlFor="di">DI</Label>
            <Input
              id="di"
              value={formData.di}
              onChange={(e) => handleInputChange('di', e.target.value)}
              placeholder="Digite a DI"
            />
          </div>
          <div>
            <Label htmlFor="invoice">Invoice</Label>
            <Input
              id="invoice"
              value={formData.invoice}
              onChange={(e) => handleInputChange('invoice', e.target.value)}
              placeholder="Digite o invoice"
            />
          </div>
          <div>
            <Label htmlFor="comissao">Comissão</Label>
            <Input
              id="comissao"
              value={formData.comissao}
              onChange={(e) => handleInputChange('comissao', e.target.value)}
              placeholder="Digite a comissão"
            />
          </div>
          <div>
            <Label htmlFor="numeroProjeto">Número do Projeto (Automático)</Label>
            <Input
              id="numeroProjeto"
              value={formData.numeroProjeto}
              onChange={(e) => handleInputChange('numeroProjeto', e.target.value)}
              placeholder="Gerado automaticamente"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="numeroPedido">Número do Pedido (Automático)</Label>
            <Input
              id="numeroPedido"
              value={formData.numeroPedido}
              onChange={(e) => handleInputChange('numeroPedido', e.target.value)}
              placeholder="Gerado automaticamente"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="numeroContrato">Número do Contrato (Automático)</Label>
            <Input
              id="numeroContrato"
              value={formData.numeroContrato}
              onChange={(e) => handleInputChange('numeroContrato', e.target.value)}
              placeholder="Gerado automaticamente"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="publicoPrivado">Público ou Privado</Label>
            <Select value={formData.publicoPrivado} onValueChange={(value) => handleInputChange('publicoPrivado', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publico">Público</SelectItem>
                <SelectItem value="privado">Privado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="naturezaOperacao">Qual Natureza da Operação (CFOP vinculado ao OMIE)</Label>
            <Input
              id="naturezaOperacao"
              value={formData.naturezaOperacao}
              onChange={(e) => handleInputChange('naturezaOperacao', e.target.value)}
              placeholder="Digite a natureza da operação"
            />
          </div>
          <div>
            <Label htmlFor="tipoContrato">Detalhar Natureza da Operação > Tipo de Contrato</Label>
            <Input
              id="tipoContrato"
              value={formData.tipoContrato}
              onChange={(e) => handleInputChange('tipoContrato', e.target.value)}
              placeholder="Digite o tipo de contrato"
            />
          </div>
          <div>
            <Label htmlFor="situacao">Situação (qual momento da Venda)</Label>
            <Select value={formData.situacao} onValueChange={(value) => handleInputChange('situacao', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="previsaoFechamento">Previsão de Fechamento (Vigência da ATA)</Label>
            <Input
              id="previsaoFechamento"
              type="date"
              value={formData.previsaoFechamento}
              onChange={(e) => handleInputChange('previsaoFechamento', e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="gerarExpedicao" 
              checked={formData.gerarExpedicao}
              onCheckedChange={(checked) => handleInputChange('gerarExpedicao', checked)}
            />
            <Label htmlFor="gerarExpedicao">Gerar Expedição</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="nfConsumoFinal" 
              checked={formData.nfConsumoFinal}
              onCheckedChange={(checked) => handleInputChange('nfConsumoFinal', checked)}
            />
            <Label htmlFor="nfConsumoFinal">NF para Consumo Final</Label>
          </div>
          <div>
            <Label htmlFor="localEstoque">Local de Estoque</Label>
            <Input
              id="localEstoque"
              value={formData.localEstoque}
              onChange={(e) => handleInputChange('localEstoque', e.target.value)}
              placeholder="Digite o local de estoque"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dados Financeiros */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Financeiros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="emailNotasFiscais">E-mail para Envio das Notas Fiscais</Label>
            <Input
              id="emailNotasFiscais"
              type="email"
              value={formData.emailNotasFiscais}
              onChange={(e) => handleInputChange('emailNotasFiscais', e.target.value)}
              placeholder="Digite o e-mail"
            />
          </div>
          <div>
            <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
            <Select value={formData.formaPagamento} onValueChange={(value) => handleInputChange('formaPagamento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="deposito_bancario">Depósito Bancário</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dadosBancarios">Dados Bancários + PIX</Label>
            <Input
              id="dadosBancarios"
              value={formData.dadosBancarios}
              onChange={(e) => handleInputChange('dadosBancarios', e.target.value)}
              placeholder="Digite os dados bancários"
            />
          </div>
          <div>
            <Label htmlFor="parcelas">Parcelas</Label>
            <Input
              id="parcelas"
              value={formData.parcelas}
              onChange={(e) => handleInputChange('parcelas', e.target.value)}
              placeholder="Digite o número de parcelas"
            />
          </div>
          <div>
            <Label htmlFor="prazoPagamento">Prazo para Pagamento</Label>
            <Input
              id="prazoPagamento"
              value={formData.prazoPagamento}
              onChange={(e) => handleInputChange('prazoPagamento', e.target.value)}
              placeholder="Digite o prazo"
            />
          </div>
          <div>
            <Label htmlFor="documentacaoNF">Documentação para Envio junto à NF</Label>
            <Input
              id="documentacaoNF"
              value={formData.documentacaoNF}
              onChange={(e) => handleInputChange('documentacaoNF', e.target.value)}
              placeholder="Digite a documentação"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="destacarIR" 
              checked={formData.destacarIR}
              onCheckedChange={(checked) => handleInputChange('destacarIR', checked)}
            />
            <Label htmlFor="destacarIR">Deve Destacar IR?</Label>
          </div>
          <div>
            <Label htmlFor="saldoEmpenho">Saldo do Empenho (Faturado x Enviado)</Label>
            <Input
              id="saldoEmpenho"
              value={formData.saldoEmpenho}
              onChange={(e) => handleInputChange('saldoEmpenho', e.target.value)}
              placeholder="Digite o saldo"
            />
          </div>
          <div>
            <Label htmlFor="saldoAta">Saldo da ATA/Contrato (ATA x Empenho Recebido)</Label>
            <Input
              id="saldoAta"
              value={formData.saldoAta}
              onChange={(e) => handleInputChange('saldoAta', e.target.value)}
              placeholder="Digite o saldo"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="programacaoFaturamento">Programação de Faturamento (Locação + Remessa + Faturamento Mensal)</Label>
            <Textarea
              id="programacaoFaturamento"
              value={formData.programacaoFaturamento}
              onChange={(e) => handleInputChange('programacaoFaturamento', e.target.value)}
              placeholder="Digite a programação de faturamento"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações de Frete */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Frete</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="fretePagar">Frete a Pagar Por</Label>
            <Select value={formData.fretePagar} onValueChange={(value) => handleInputChange('fretePagar', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="representante">Representante</SelectItem>
                <SelectItem value="empresa">Empresa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="freteRetirar">Frete a Retirar Por</Label>
            <Select value={formData.freteRetirar} onValueChange={(value) => handleInputChange('freteRetirar', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="representante">Representante</SelectItem>
                <SelectItem value="portador_interno">Portador Interno</SelectItem>
                <SelectItem value="destino_final">Destino Final</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
            <Input
              id="prazoEntrega"
              value={formData.prazoEntrega}
              onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
              placeholder="Digite o prazo"
            />
          </div>
          <div>
            <Label htmlFor="entregarRetirar">Entregar ou Retirar aos Cuidados de Quem?</Label>
            <Input
              id="entregarRetirar"
              value={formData.entregarRetirar}
              onChange={(e) => handleInputChange('entregarRetirar', e.target.value)}
              placeholder="Digite o responsável"
            />
          </div>
          <div>
            <Label htmlFor="dadosRecebedor">Dados do Recebedor (Nome, CPF, Telefone, Email)</Label>
            <Textarea
              id="dadosRecebedor"
              value={formData.dadosRecebedor}
              onChange={(e) => handleInputChange('dadosRecebedor', e.target.value)}
              placeholder="Digite os dados do recebedor"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="horariosPermitidos">Quais Horários Permitidos para Entrega</Label>
            <Input
              id="horariosPermitidos"
              value={formData.horariosPermitidos}
              onChange={(e) => handleInputChange('horariosPermitidos', e.target.value)}
              placeholder="Digite os horários"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="locaisEntrega">Locais de Entrega</Label>
            <Textarea
              id="locaisEntrega"
              value={formData.locaisEntrega}
              onChange={(e) => handleInputChange('locaisEntrega', e.target.value)}
              placeholder="Digite os locais de entrega"
              rows={3}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="informacoesEntrega">Mais Informações sobre a Entrega (Há alguma dificuldade?)</Label>
            <Textarea
              id="informacoesEntrega"
              value={formData.informacoesEntrega}
              onChange={(e) => handleInputChange('informacoesEntrega', e.target.value)}
              placeholder="Digite informações adicionais sobre a entrega"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Campos Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="urgente" 
              checked={formData.urgente}
              onCheckedChange={(checked) => handleInputChange('urgente', checked)}
            />
            <Label htmlFor="urgente">É Urgente?</Label>
          </div>
          {formData.urgente && (
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="justificativaUrgencia">Justificar Urgência</Label>
              <Textarea
                id="justificativaUrgencia"
                value={formData.justificativaUrgencia}
                onChange={(e) => handleInputChange('justificativaUrgencia', e.target.value)}
                placeholder="Digite a justificativa da urgência"
                rows={3}
              />
            </div>
          )}
          <div>
            <Label htmlFor="autorizadoPor">Autorizado Por</Label>
            <Input
              id="autorizadoPor"
              value={formData.autorizadoPor}
              onChange={(e) => handleInputChange('autorizadoPor', e.target.value)}
              placeholder="Digite quem autorizou"
            />
          </div>
          <div>
            <Label htmlFor="dataAutorizacao">Data da Autorização</Label>
            <Input
              id="dataAutorizacao"
              type="date"
              value={formData.dataAutorizacao}
              onChange={(e) => handleInputChange('dataAutorizacao', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="termometro">Termômetro</Label>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">
                {formData.termometro}
              </Badge>
              <span className="text-sm text-gray-600">(Fixado para Importação Direta)</span>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label htmlFor="motivoGanho">Motivo do Ganho</Label>
            <Textarea
              id="motivoGanho"
              value={formData.motivoGanho}
              onChange={(e) => handleInputChange('motivoGanho', e.target.value)}
              placeholder="Digite o motivo do ganho"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnaliseTecnica = () => (
    <Card>
      <CardHeader>
        <CardTitle>Análise Técnica-Científica</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={formData.analiseTecnica}
          onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
          placeholder="Digite a análise técnica-científica"
          rows={10}
          className="w-full"
        />
      </CardContent>
    </Card>
  );

  const renderAnaliseConcorrencia = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Análise da Concorrência</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.analiseComcorrencia}
            onChange={(e) => handleInputChange('analiseComcorrencia', e.target.value)}
            placeholder="Digite a análise da concorrência"
            rows={6}
            className="w-full mb-4"
          />
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="propostaNegociacao" 
              checked={formData.propostaNegociacao}
              onCheckedChange={(checked) => handleInputChange('propostaNegociacao', checked)}
            />
            <Label htmlFor="propostaNegociacao">Proposta em Negociação</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistoricoChat = () => (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Comunicações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-gray-500 py-8">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Funcionalidade de chat em desenvolvimento</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderDocumentos = () => (
    <Card>
      <CardHeader>
        <CardTitle>Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Selecionar Arquivos
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPedidos = () => (
    <Card>
      <CardHeader>
        <CardTitle>Produtos e Serviços</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Produtos */}
        <div>
          <h4 className="font-semibold mb-3">Produtos</h4>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Nome do Produto + Previsão de Consumo Mensal + QND daquela Venda + Valor Total Prevista + 
              Valor Total daquela Venda + Validade Mínima Permitida + Descrição dos Produtos de como deve constar na NF
            </p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
        </div>

        {/* Serviços */}
        <div>
          <h4 className="font-semibold mb-3">Serviços</h4>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Selecionar o Serviço + Solicitação de Manutenção Preventiva + Manutenção Corretiva + 
              Treinamento Técnico + Treinamento Científico + Descrição dos Serviços
            </p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>
        </div>

        {/* Itens Não Cadastrados */}
        <div>
          <Label htmlFor="itensNaoCadastrados">Itens Não Cadastrados (Materiais Complementares)</Label>
          <Textarea
            id="itensNaoCadastrados"
            value={formData.itensNaoCadastrados}
            onChange={(e) => handleInputChange('itensNaoCadastrados', e.target.value)}
            placeholder="Digite os itens não cadastrados"
            rows={3}
          />
        </div>

        {/* Kits */}
        <div>
          <h4 className="font-semibold mb-3">Kits</h4>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Kit
          </Button>
        </div>

        {/* Informações Complementares */}
        <div>
          <Label htmlFor="informacoesComplementares">Informações Complementares que devem constar em NF</Label>
          <Textarea
            id="informacoesComplementares"
            value={formData.informacoesComplementares}
            onChange={(e) => handleInputChange('informacoesComplementares', e.target.value)}
            placeholder="Digite as informações complementares"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderToolTabContent = () => {
    switch (activeToolTab) {
      case 'dados-gerais': return renderDadosGerais();
      case 'analise-tecnica': return renderAnaliseTecnica();
      case 'analise-concorrencia': return renderAnaliseConcorrencia();
      case 'historico-chat': return renderHistoricoChat();
      case 'documentos': return renderDocumentos();
      case 'pedidos': return renderPedidos();
      default: return renderDadosGerais();
    }
  };

  const renderMasterTabContent = () => {
    // Para esta implementação inicial, todas as abas master mostram o mesmo conteúdo
    // Em uma implementação futura, cada aba master pode ter conteúdo específico
    return (
      <div className="space-y-6">
        {/* Abas de Ferramentas */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {toolTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveToolTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeToolTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo da aba de ferramenta ativa */}
        {renderToolTabContent()}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Nova Importação Direta
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Abas Masters */}
          <div className="mb-6">
            <div className="flex space-x-4 bg-gray-50 p-2 rounded-lg">
              {masterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMasterTab(tab.id)}
                  className={`px-6 py-3 text-sm font-bold rounded-md transition-colors ${
                    activeMasterTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conteúdo da aba master ativa */}
          <div className="flex-1 overflow-y-auto">
            {renderMasterTabContent()}
          </div>

          {/* Rodapé com botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Salvar Importação Direta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
