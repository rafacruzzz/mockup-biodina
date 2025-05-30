import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, FileText, MessageSquare, Upload, Package, Thermometer, Plus, Trash2 } from 'lucide-react';
import ChatInterno from './ChatInterno';
import jsPDF from 'jspdf';

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaForm = ({ isOpen, onClose, onSave, oportunidade }: ImportacaoDiretaFormProps) => {
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
    termometro: 85, // Fixado como "CONQUISTADO/QUENTE"
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
    informacoesComplementares: '',
    
    // Campos específicos do SPI
    spiCliente: '',
    spiDadosProforma: '',
    spiEmNomeDe: '',
    spiCnpj: '',
    spiEndereco: '',
    spiInscricaoEstadual: '',
    spiNumero: '',
    spiData: '',
    spiProposta: '',
    spiEquipamento: '',
    spiModelo: '',
    spiPacking: '',
    spiFabricante: '',
    spiFormaPagamento: 'CAD',
    spiTemComissao: false,
    spiPercentualComissao: '',
    spiRepresentante: '',
    spiMercadorias: [],
    spiObservacoes: '',
    spiFaturamentoConfirmado: false,
    spiPagamentoForma: '',
    spiPagamentoPrazo: '',
    spiEntregaPrazo: '',
    spiFormaVenda: 'licitacao',
    spiFormaVendaOutros: '',
    spiValor: '',
    spiPrazo: '',
    spiDataConfirmacao: ''
  });

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' },
    { id: 'ovc', label: 'OVC' },
    { id: 'nod-so', label: 'NOD/SO' },
    { id: 'ddr', label: 'DDR' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...formData,
      id: oportunidade?.id || Date.now(),
    };
    onSave(dataToSave);
    onClose();
  };

  const addMercadoria = () => {
    const novaMercadoria = {
      id: Date.now(),
      mercadoria: '',
      equip: '',
      codigo: '',
      unidade: '',
      qtde: '',
      qtdePendente: '',
      totalOrdens: '',
      plU: '',
      plT: '',
      precoUnitUsd: '',
      precoTotalUsd: ''
    };
    handleInputChange('spiMercadorias', [...formData.spiMercadorias, novaMercadoria]);
  };

  const removeMercadoria = (id: number) => {
    const mercadoriasFiltradas = formData.spiMercadorias.filter((item: any) => item.id !== id);
    handleInputChange('spiMercadorias', mercadoriasFiltradas);
  };

  const updateMercadoria = (id: number, field: string, value: any) => {
    const mercadoriasAtualizadas = formData.spiMercadorias.map((item: any) => {
      if (item.id === id) {
        const itemAtualizado = { ...item, [field]: value };
        
        // Calcular preço total automaticamente
        if (field === 'qtde' || field === 'precoUnitUsd') {
          const qtde = parseFloat(itemAtualizado.qtde) || 0;
          const precoUnit = parseFloat(itemAtualizado.precoUnitUsd) || 0;
          itemAtualizado.precoTotalUsd = (qtde * precoUnit).toFixed(2);
        }
        
        return itemAtualizado;
      }
      return item;
    });
    handleInputChange('spiMercadorias', mercadoriasAtualizadas);
  };

  const calcularSubtotal = () => {
    return formData.spiMercadorias.reduce((total: number, item: any) => {
      return total + (parseFloat(item.precoTotalUsd) || 0);
    }, 0);
  };

  const calcularPacking = () => {
    const subtotal = calcularSubtotal();
    const percentualPacking = parseFloat(formData.spiPacking) || 0;
    return (subtotal * percentualPacking / 100);
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularPacking();
  };

  const generateSPIPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 20;

    // Cabeçalho
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.text('SPI – SOLICITAÇÃO DE PROFORMA INVOICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Dados do Cliente
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('DADOS DO CLIENTE', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Cliente: ${formData.spiCliente}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Dados da Proforma: ${formData.spiDadosProforma}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Em nome de: ${formData.spiEmNomeDe}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`CNPJ: ${formData.spiCnpj}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Endereço: ${formData.spiEndereco}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Inscrição Estadual: ${formData.spiInscricaoEstadual}`, 20, yPosition);
    yPosition += 15;

    // Informações da Proforma
    pdf.setFont(undefined, 'bold');
    pdf.text('INFORMAÇÕES DA PROFORMA', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`No SPI: ${formData.spiNumero}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Data: ${formData.spiData}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Proposta: ${formData.spiProposta}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Equipamento: ${formData.spiEquipamento}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Modelo: ${formData.spiModelo}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Packing (%): ${formData.spiPacking}`, 20, yPosition);
    yPosition += 15;

    // Informações Adicionais
    pdf.setFont(undefined, 'bold');
    pdf.text('INFORMAÇÕES ADICIONAIS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Fabricante: ${formData.spiFabricante}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Forma de pagamento: ${formData.spiFormaPagamento}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Tem comissão: ${formData.spiTemComissao ? 'Sim' : 'Não'}`, 20, yPosition);
    yPosition += 7;
    if (formData.spiTemComissao) {
      pdf.text(`Percentual comissão: ${formData.spiPercentualComissao}%`, 20, yPosition);
      yPosition += 7;
      pdf.text(`Representante: ${formData.spiRepresentante}`, 20, yPosition);
      yPosition += 7;
    }
    yPosition += 10;

    // Produtos/Mercadorias
    if (formData.spiMercadorias.length > 0) {
      pdf.setFont(undefined, 'bold');
      pdf.text('PRODUTOS/MERCADORIAS', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont(undefined, 'normal');
      formData.spiMercadorias.forEach((item: any, index: number) => {
        pdf.text(`${index + 1}. ${item.mercadoria} - Qtde: ${item.qtde} - Preço Unit.: USD ${item.precoUnitUsd} - Total: USD ${item.precoTotalUsd}`, 20, yPosition);
        yPosition += 7;
      });
      yPosition += 10;
    }

    // Totais
    pdf.setFont(undefined, 'bold');
    pdf.text('TOTAIS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Subtotal: USD ${calcularSubtotal().toFixed(2)}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Packing: USD ${calcularPacking().toFixed(2)}`, 20, yPosition);
    yPosition += 7;
    pdf.setFont(undefined, 'bold');
    pdf.text(`TOTAL: USD ${calcularTotal().toFixed(2)}`, 20, yPosition);
    yPosition += 15;

    // Observações
    if (formData.spiObservacoes) {
      pdf.setFont(undefined, 'bold');
      pdf.text('OBSERVAÇÕES', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont(undefined, 'normal');
      const lines = pdf.splitTextToSize(formData.spiObservacoes, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 7 + 10;
    }

    // Detalhes de Venda
    pdf.setFont(undefined, 'bold');
    pdf.text('DETALHES DE VENDA', 20, yPosition);
    yPosition += 10;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Faturamento confirmado: ${formData.spiFaturamentoConfirmado ? 'Sim' : 'Não'}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Forma de pagamento: ${formData.spiPagamentoForma}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Prazo de pagamento: ${formData.spiPagamentoPrazo}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Prazo de entrega: ${formData.spiEntregaPrazo}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Forma de venda: ${formData.spiFormaVenda}`, 20, yPosition);
    if (formData.spiFormaVenda === 'outros' && formData.spiFormaVendaOutros) {
      yPosition += 7;
      pdf.text(`Especificação: ${formData.spiFormaVendaOutros}`, 20, yPosition);
    }
    yPosition += 7;
    pdf.text(`Valor: ${formData.spiValor}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Prazo: ${formData.spiPrazo}`, 20, yPosition);
    yPosition += 7;
    pdf.text(`Data de confirmação: ${formData.spiDataConfirmacao}`, 20, yPosition);

    // Nome do arquivo
    const fileName = `SPI_${formData.spiNumero || 'novo'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Download do PDF
    pdf.save(fileName);
  };

  const renderSPIForm = () => {
    return (
      <div className="space-y-6">
        {/* Cabeçalho */}
        <Card>
          <CardHeader className="text-center border-b">
            <CardTitle className="text-xl font-bold text-purple-600">
              SPI – SOLICITAÇÃO DE PROFORMA INVOICE
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Dados do Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border p-4 rounded">
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-4 border-b pb-2">DADOS DO CLIENTE</h3>
              </div>
              
              <div>
                <Label htmlFor="spiCliente">Cliente</Label>
                <Input
                  id="spiCliente"
                  value={formData.spiCliente}
                  onChange={(e) => handleInputChange('spiCliente', e.target.value)}
                  placeholder="Nome do cliente"
                />
              </div>
              
              <div>
                <Label htmlFor="spiDadosProforma">Dados para preenchimento da Proforma Invoice</Label>
                <Input
                  id="spiDadosProforma"
                  value={formData.spiDadosProforma}
                  onChange={(e) => handleInputChange('spiDadosProforma', e.target.value)}
                  placeholder="Dados da proforma"
                />
              </div>
              
              <div>
                <Label htmlFor="spiEmNomeDe">Em nome de</Label>
                <Input
                  id="spiEmNomeDe"
                  value={formData.spiEmNomeDe}
                  onChange={(e) => handleInputChange('spiEmNomeDe', e.target.value)}
                  placeholder="Em nome de"
                />
              </div>
              
              <div>
                <Label htmlFor="spiCnpj">CNPJ</Label>
                <Input
                  id="spiCnpj"
                  value={formData.spiCnpj}
                  onChange={(e) => handleInputChange('spiCnpj', e.target.value)}
                  placeholder="XX.XXX.XXX/XXXX-XX"
                />
              </div>
              
              <div>
                <Label htmlFor="spiEndereco">Endereço</Label>
                <Input
                  id="spiEndereco"
                  value={formData.spiEndereco}
                  onChange={(e) => handleInputChange('spiEndereco', e.target.value)}
                  placeholder="Endereço completo"
                />
              </div>
              
              <div>
                <Label htmlFor="spiInscricaoEstadual">Inscrição Estadual</Label>
                <Input
                  id="spiInscricaoEstadual"
                  value={formData.spiInscricaoEstadual}
                  onChange={(e) => handleInputChange('spiInscricaoEstadual', e.target.value)}
                  placeholder="Inscrição estadual"
                />
              </div>
            </div>

            {/* Informações da Proforma */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border p-4 rounded">
              <div className="md:col-span-3">
                <h3 className="font-semibold mb-4 border-b pb-2">INFORMAÇÕES DA PROFORMA</h3>
              </div>
              
              <div>
                <Label htmlFor="spiNumero">No SPI</Label>
                <Input
                  id="spiNumero"
                  value={formData.spiNumero}
                  onChange={(e) => handleInputChange('spiNumero', e.target.value)}
                  placeholder="Gerado automaticamente"
                />
              </div>
              
              <div>
                <Label htmlFor="spiData">DATA</Label>
                <Input
                  id="spiData"
                  type="date"
                  value={formData.spiData}
                  onChange={(e) => handleInputChange('spiData', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="spiProposta">Proposta</Label>
                <Input
                  id="spiProposta"
                  value={formData.spiProposta}
                  onChange={(e) => handleInputChange('spiProposta', e.target.value)}
                  placeholder="Número da proposta"
                />
              </div>
              
              <div>
                <Label htmlFor="spiEquipamento">Equipamento</Label>
                <Input
                  id="spiEquipamento"
                  value={formData.spiEquipamento}
                  onChange={(e) => handleInputChange('spiEquipamento', e.target.value)}
                  placeholder="Nome do equipamento"
                />
              </div>
              
              <div>
                <Label htmlFor="spiModelo">Modelo</Label>
                <Input
                  id="spiModelo"
                  value={formData.spiModelo}
                  onChange={(e) => handleInputChange('spiModelo', e.target.value)}
                  placeholder="Modelo do equipamento"
                />
              </div>
              
              <div>
                <Label htmlFor="spiPacking">Packing (%)</Label>
                <Input
                  id="spiPacking"
                  type="number"
                  value={formData.spiPacking}
                  onChange={(e) => handleInputChange('spiPacking', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border p-4 rounded">
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-4 border-b pb-2">INFORMAÇÕES ADICIONAIS</h3>
              </div>
              
              <div>
                <Label htmlFor="spiFabricante">Fabricante</Label>
                <Input
                  id="spiFabricante"
                  value={formData.spiFabricante}
                  onChange={(e) => handleInputChange('spiFabricante', e.target.value)}
                  placeholder="Nome do fabricante"
                />
              </div>
              
              <div>
                <Label htmlFor="spiFormaPagamento">Forma de pagamento</Label>
                <Input
                  id="spiFormaPagamento"
                  value={formData.spiFormaPagamento}
                  onChange={(e) => handleInputChange('spiFormaPagamento', e.target.value)}
                  placeholder="CAD"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="spiTemComissao" 
                    checked={formData.spiTemComissao}
                    onCheckedChange={(checked) => handleInputChange('spiTemComissao', checked)}
                  />
                  <Label htmlFor="spiTemComissao">Há comissão para o Representante?</Label>
                </div>
                
                {formData.spiTemComissao && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="spiPercentualComissao">Especifique o percentual (%)</Label>
                      <Input
                        id="spiPercentualComissao"
                        type="number"
                        value={formData.spiPercentualComissao}
                        onChange={(e) => handleInputChange('spiPercentualComissao', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="spiRepresentante">Informe o representante</Label>
                      <Input
                        id="spiRepresentante"
                        value={formData.spiRepresentante}
                        onChange={(e) => handleInputChange('spiRepresentante', e.target.value)}
                        placeholder="Nome do representante"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabela de Produtos/Mercadorias */}
            <div className="mb-6 border p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold border-b pb-2">PRODUTOS/MERCADORIAS</h3>
                <Button onClick={addMercadoria} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Mercadoria</TableHead>
                      <TableHead>Equip</TableHead>
                      <TableHead>Código</TableHead>
                      <TableHead>Unidade/QX</TableHead>
                      <TableHead>Qtde</TableHead>
                      <TableHead>Qtde Pendente</TableHead>
                      <TableHead>Total das Ordens</TableHead>
                      <TableHead>PL U</TableHead>
                      <TableHead>PL T</TableHead>
                      <TableHead>Preço Unit USD</TableHead>
                      <TableHead>Preço Total USD</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.spiMercadorias.map((item: any, index: number) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Input
                            value={item.mercadoria}
                            onChange={(e) => updateMercadoria(item.id, 'mercadoria', e.target.value)}
                            placeholder="Buscar produto..."
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.equip}
                            onChange={(e) => updateMercadoria(item.id, 'equip', e.target.value)}
                            placeholder="Equip"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.codigo}
                            onChange={(e) => updateMercadoria(item.id, 'codigo', e.target.value)}
                            placeholder="Código"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.unidade}
                            onChange={(e) => updateMercadoria(item.id, 'unidade', e.target.value)}
                            placeholder="UN"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.qtde}
                            onChange={(e) => updateMercadoria(item.id, 'qtde', e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.qtdePendente}
                            onChange={(e) => updateMercadoria(item.id, 'qtdePendente', e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.totalOrdens}
                            onChange={(e) => updateMercadoria(item.id, 'totalOrdens', e.target.value)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.plU}
                            onChange={(e) => updateMercadoria(item.id, 'plU', e.target.value)}
                            placeholder="PL U"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.plT}
                            onChange={(e) => updateMercadoria(item.id, 'plT', e.target.value)}
                            placeholder="PL T"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.precoUnitUsd}
                            onChange={(e) => updateMercadoria(item.id, 'precoUnitUsd', e.target.value)}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.precoTotalUsd}
                            readOnly
                            className="bg-gray-100"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeMercadoria(item.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Seção de Totais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 border p-4 rounded">
              <div className="md:col-span-3">
                <h3 className="font-semibold mb-4 border-b pb-2">TOTAIS</h3>
              </div>
              
              <div>
                <Label>Subtotal (USD)</Label>
                <Input
                  value={calcularSubtotal().toFixed(2)}
                  readOnly
                  className="bg-gray-100 font-semibold"
                />
              </div>
              
              <div>
                <Label>Packing (USD)</Label>
                <Input
                  value={calcularPacking().toFixed(2)}
                  readOnly
                  className="bg-gray-100 font-semibold"
                />
              </div>
              
              <div>
                <Label>TOTAL (USD)</Label>
                <Input
                  value={calcularTotal().toFixed(2)}
                  readOnly
                  className="bg-gray-100 font-bold text-green-600"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="mb-6 border p-4 rounded">
              <h3 className="font-semibold mb-4 border-b pb-2">OBSERVAÇÕES</h3>
              <Textarea
                value={formData.spiObservacoes}
                onChange={(e) => handleInputChange('spiObservacoes', e.target.value)}
                placeholder="Proforma solicitada pelo cliente dia [data] as [hora], verificar o desconto de [%] na proforma geral e conforme e-mail [data] as [hora]."
                rows={4}
              />
            </div>

            {/* Detalhes de Venda */}
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-4 border-b pb-2">DETALHES DE VENDA - Atenção</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="spiFaturamentoConfirmado" 
                    checked={formData.spiFaturamentoConfirmado}
                    onCheckedChange={(checked) => handleInputChange('spiFaturamentoConfirmado', checked)}
                  />
                  <Label htmlFor="spiFaturamentoConfirmado">FATURAMENTO: Está confirmado?</Label>
                </div>
                
                <div>
                  <Label htmlFor="spiPagamentoForma">PAGAMENTO - Forma</Label>
                  <Input
                    id="spiPagamentoForma"
                    value={formData.spiPagamentoForma}
                    onChange={(e) => handleInputChange('spiPagamentoForma', e.target.value)}
                    placeholder="Forma de pagamento"
                  />
                </div>
                
                <div>
                  <Label htmlFor="spiPagamentoPrazo">PAGAMENTO - Prazo</Label>
                  <Input
                    id="spiPagamentoPrazo"
                    value={formData.spiPagamentoPrazo}
                    onChange={(e) => handleInputChange('spiPagamentoPrazo', e.target.value)}
                    placeholder="Prazo de pagamento"
                  />
                </div>
                
                <div>
                  <Label htmlFor="spiEntregaPrazo">ENTREGA - Prazo</Label>
                  <Input
                    id="spiEntregaPrazo"
                    value={formData.spiEntregaPrazo}
                    onChange={(e) => handleInputChange('spiEntregaPrazo', e.target.value)}
                    placeholder="Prazo de entrega"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <Label className="font-semibold">Forma de venda:</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="licitacao"
                      name="formaVenda"
                      value="licitacao"
                      checked={formData.spiFormaVenda === 'licitacao'}
                      onChange={(e) => handleInputChange('spiFormaVenda', e.target.value)}
                    />
                    <Label htmlFor="licitacao">Licitação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="vendaDireta"
                      name="formaVenda"
                      value="venda_direta"
                      checked={formData.spiFormaVenda === 'venda_direta'}
                      onChange={(e) => handleInputChange('spiFormaVenda', e.target.value)}
                    />
                    <Label htmlFor="vendaDireta">Venda Direta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="outros"
                      name="formaVenda"
                      value="outros"
                      checked={formData.spiFormaVenda === 'outros'}
                      onChange={(e) => handleInputChange('spiFormaVenda', e.target.value)}
                    />
                    <Label htmlFor="outros">Outros</Label>
                  </div>
                </div>
                
                {formData.spiFormaVenda === 'outros' && (
                  <div className="mt-2">
                    <Input
                      value={formData.spiFormaVendaOutros}
                      onChange={(e) => handleInputChange('spiFormaVendaOutros', e.target.value)}
                      placeholder="Especifique outros"
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="spiValor">Valor</Label>
                  <Input
                    id="spiValor"
                    value={formData.spiValor}
                    onChange={(e) => handleInputChange('spiValor', e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="spiPrazo">Prazo</Label>
                  <Input
                    id="spiPrazo"
                    type="date"
                    value={formData.spiPrazo}
                    onChange={(e) => handleInputChange('spiPrazo', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="spiDataConfirmacao">Data que o pedido foi confirmado</Label>
                  <Input
                    id="spiDataConfirmacao"
                    type="date"
                    value={formData.spiDataConfirmacao}
                    onChange={(e) => handleInputChange('spiDataConfirmacao', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderMasterTabContent = () => {
    if (activeMasterTab === 'spi') {
      return renderSPIForm();
    }
    
    // Para a aba COMERCIAL, mostrar as abas de ferramentas
    if (activeMasterTab === 'comercial') {
      return (
        <Tabs value={activeToolTab} onValueChange={setActiveToolTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dados-gerais" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dados Gerais
            </TabsTrigger>
            <TabsTrigger value="analise-tecnica" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Análise Técnica
            </TabsTrigger>
            <TabsTrigger value="historico-chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Histórico/Chat
            </TabsTrigger>
            <TabsTrigger value="documentos" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados-gerais" className="space-y-6 mt-4">
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
                  <Label htmlFor="tipoContrato">Detalhar Natureza da Operação {'->'} Tipo de Contrato</Label>
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
          </TabsContent>

          <TabsContent value="analise-tecnica" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise Técnica-Científica</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.analiseTecnica}
                  onChange={(e) => handleInputChange('analiseTecnica', e.target.value)}
                  placeholder="Digite a análise técnica-científica da oportunidade..."
                  rows={15}
                  className="w-full"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico-chat" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico e Chat Interno</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterno oportunidadeId={oportunidade?.id || 'nova'} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Arraste e solte arquivos aqui ou clique para selecionar</p>
                  <Button variant="outline">
                    Selecionar Arquivos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      );
    }
    
    // Para outras abas masters (OVC, NOD/SO, DDR), retornar conteúdo placeholder
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Conteúdo da aba {activeMasterTab.toUpperCase()} em desenvolvimento...</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-purple-600">
            Nova Importação Direta
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full min-h-0">
          {/* Abas Masters */}
          <div className="mb-6 flex-shrink-0">
            <div className="flex space-x-4 bg-gray-50 p-2 rounded-lg">
              {masterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMasterTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
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

          {/* Conteúdo da aba master ativa com scroll */}
          <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2">
            {renderMasterTabContent()}
          </div>

          {/* Rodapé com botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t flex-shrink-0 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {activeMasterTab === 'spi' && (
              <Button 
                onClick={generateSPIPDF} 
                variant="outline"
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
            )}
            <Button onClick={handleSave} className="bg-biodina-gold hover:bg-biodina-gold/90">
              {oportunidade ? 'Atualizar' : 'Salvar'} Importação Direta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
