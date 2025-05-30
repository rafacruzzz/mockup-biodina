import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ImportacaoDiretaFormProps {
  onClose: () => void;
}

const ImportacaoDiretaForm = ({ onClose }: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState('comercial');
  const [activeSubTab, setActiveSubTab] = useState('dados-gerais');
  const [formData, setFormData] = useState({
    cliente: '',
    produto: '',
    quantidade: 0,
    precoUnitario: 0,
    validade: '',
    observacoes: '',
    condicaoPagamento: '',
    incoterms: '',
    numeroProforma: '',
    dataProforma: '',
    valorProforma: 0,
    numeroContrato: '',
    dataContrato: '',
    valorContrato: 0,
    numeroPedidoCliente: '',
    dataPedidoCliente: '',
    numeroInvoice: '',
    dataInvoice: '',
    valorInvoice: 0,
    numeroAWB: '',
    dataAWB: '',
    valorAWB: 0,
    numeroDI: '',
    dataDI: '',
    valorDI: 0,
    numeroLicencaImportacao: '',
    dataLicencaImportacao: '',
    valorLicencaImportacao: 0,
    numeroDeclaracaoImportacao: '',
    dataDeclaracaoImportacao: '',
    valorDeclaracaoImportacao: 0,
    numeroComprovanteImportacao: '',
    dataComprovanteImportacao: '',
    valorComprovanteImportacao: 0,
    numeroRegistroImportacao: '',
    dataRegistroImportacao: '',
    valorRegistroImportacao: 0,
    numeroAdicao: '',
    dataAdicao: '',
    valorAdicao: 0,
    numeroExtratoBancario: '',
    dataExtratoBancario: '',
    valorExtratoBancario: 0,
    numeroComprovantePagamento: '',
    dataComprovantePagamento: '',
    valorComprovantePagamento: 0,
    numeroSolicitacaoEmprestimo: '',
    dataSolicitacaoEmprestimo: '',
    valorSolicitacaoEmprestimo: 0,
    numeroContratoCambio: '',
    dataContratoCambio: '',
    valorContratoCambio: 0,
    numeroRegistroOperacaoCambio: '',
    dataRegistroOperacaoCambio: '',
    valorRegistroOperacaoCambio: 0,
    numeroLiquidacaoCambio: '',
    dataLiquidacaoCambio: '',
    valorLiquidacaoCambio: 0,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'comercial') {
      setActiveSubTab('dados-gerais');
    }
  };

  const handleSubTabChange = (subTab: string) => {
    setActiveSubTab(subTab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Dados do formulário:', formData);
    onClose();
  };

  const handleDownloadPDF = () => {
    alert('Baixando PDF...');
  };
  
  // New state for OVC results table
  const [ovcResults, setOvcResults] = useState([
    {
      id: 1,
      code: 'PRD001',
      qty: 10,
      priceListUnit: 100.00,
      customerDiscountRmed: 5.0,
      customerDiscountBiodina: 3.0,
      commission: 25.0
    },
    {
      id: 2,
      code: 'PRD002',
      qty: 5,
      priceListUnit: 200.00,
      customerDiscountRmed: 7.0,
      customerDiscountBiodina: 4.0,
      commission: 25.0
    }
  ]);

  // Function to calculate OVC results
  const calculateOvcRow = (row: any) => {
    const priceListTotal = row.priceListUnit * row.qty;
    const customerDiscountTotal = (row.customerDiscountRmed + row.customerDiscountBiodina) / 2;
    const discountUnit = row.priceListUnit * (customerDiscountTotal / 100);
    const discountTotal = priceListTotal * (customerDiscountTotal / 100);
    const subTotalUnit = row.priceListUnit - discountUnit;
    const subTotalTotal = priceListTotal - discountTotal;
    const handlingCharge = subTotalTotal * 0.03;
    const total = subTotalTotal + handlingCharge;
    const commissionValue = total * (row.commission / 100);
    const netRadiometer = total - commissionValue;

    return {
      ...row,
      priceListTotal,
      customerDiscountTotal,
      discountUnit,
      discountTotal,
      subTotalUnit,
      subTotalTotal,
      handlingCharge,
      total,
      commissionValue,
      netRadiometer
    };
  };

  // Function to update OVC results
  const updateOvcResult = (id: number, field: string, value: number) => {
    setOvcResults(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // Calculate totals for OVC results
  const calculateOvcTotals = () => {
    const calculatedRows = ovcResults.map(calculateOvcRow);
    return calculatedRows.reduce((totals, row) => ({
      qty: totals.qty + row.qty,
      priceListTotal: totals.priceListTotal + row.priceListTotal,
      discountTotal: totals.discountTotal + row.discountTotal,
      subTotalTotal: totals.subTotalTotal + row.subTotalTotal,
      handlingCharge: totals.handlingCharge + row.handlingCharge,
      total: totals.total + row.total,
      commissionValue: totals.commissionValue + row.commissionValue,
      netRadiometer: totals.netRadiometer + row.netRadiometer
    }), {
      qty: 0,
      priceListTotal: 0,
      discountTotal: 0,
      subTotalTotal: 0,
      handlingCharge: 0,
      total: 0,
      commissionValue: 0,
      netRadiometer: 0
    });
  };

  const renderTabContent = () => {
    if (activeTab === 'comercial') {
      switch (activeSubTab) {
        case 'dados-gerais':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" placeholder="Nome do cliente" value={formData.cliente} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="produto">Produto</Label>
                  <Input id="produto" placeholder="Código/Nome do produto" value={formData.produto} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input id="quantidade" type="number" placeholder="Quantidade" value={formData.quantidade} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="precoUnitario">Preço Unitário</Label>
                  <Input id="precoUnitario" type="number" step="0.01" placeholder="0.00" value={formData.precoUnitario} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="validade">Validade da Oferta</Label>
                  <Input id="validade" type="date" value={formData.validade} onChange={handleInputChange} />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações adicionais" value={formData.observacoes} onChange={handleInputChange} />
              </div>
            </div>
          );

        case 'analise-tecnica':
          return (
            <div className="space-y-6">
              <div>
                <Label htmlFor="condicaoPagamento">Condição de Pagamento</Label>
                <Input id="condicaoPagamento" placeholder="Condição de pagamento" value={formData.condicaoPagamento} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="incoterms">Incoterms</Label>
                <Input id="incoterms" placeholder="Incoterms" value={formData.incoterms} onChange={handleInputChange} />
              </div>
            </div>
          );

        case 'historico':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroProforma">Número Proforma</Label>
                  <Input id="numeroProforma" placeholder="Número da Proforma" value={formData.numeroProforma} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataProforma">Data Proforma</Label>
                  <Input id="dataProforma" type="date" value={formData.dataProforma} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorProforma">Valor Proforma</Label>
                  <Input id="valorProforma" type="number" step="0.01" placeholder="0.00" value={formData.valorProforma} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroContrato">Número Contrato</Label>
                  <Input id="numeroContrato" placeholder="Número do Contrato" value={formData.numeroContrato} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataContrato">Data Contrato</Label>
                  <Input id="dataContrato" type="date" value={formData.dataContrato} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorContrato">Valor Contrato</Label>
                  <Input id="valorContrato" type="number" step="0.01" placeholder="0.00" value={formData.valorContrato} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          );

        case 'documentos':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroPedidoCliente">Número Pedido Cliente</Label>
                  <Input id="numeroPedidoCliente" placeholder="Número do Pedido do Cliente" value={formData.numeroPedidoCliente} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataPedidoCliente">Data Pedido Cliente</Label>
                  <Input id="dataPedidoCliente" type="date" value={formData.dataPedidoCliente} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroInvoice">Número Invoice</Label>
                  <Input id="numeroInvoice" placeholder="Número da Invoice" value={formData.numeroInvoice} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataInvoice">Data Invoice</Label>
                  <Input id="dataInvoice" type="date" value={formData.dataInvoice} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorInvoice">Valor Invoice</Label>
                  <Input id="valorInvoice" type="number" step="0.01" placeholder="0.00" value={formData.valorInvoice} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroAWB">Número AWB</Label>
                  <Input id="numeroAWB" placeholder="Número do AWB" value={formData.numeroAWB} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataAWB">Data AWB</Label>
                  <Input id="dataAWB" type="date" value={formData.dataAWB} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorAWB">Valor AWB</Label>
                  <Input id="valorAWB" type="number" step="0.01" placeholder="0.00" value={formData.valorAWB} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          );

        case 'emprestimos':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroSolicitacaoEmprestimo">Número Solicitação Empréstimo</Label>
                  <Input id="numeroSolicitacaoEmprestimo" placeholder="Número da Solicitação de Empréstimo" value={formData.numeroSolicitacaoEmprestimo} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataSolicitacaoEmprestimo">Data Solicitação Empréstimo</Label>
                  <Input id="dataSolicitacaoEmprestimo" type="date" value={formData.dataSolicitacaoEmprestimo} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorSolicitacaoEmprestimo">Valor Solicitação Empréstimo</Label>
                  <Input id="valorSolicitacaoEmprestimo" type="number" step="0.01" placeholder="0.00" value={formData.valorSolicitacaoEmprestimo} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroContratoCambio">Número Contrato Câmbio</Label>
                  <Input id="numeroContratoCambio" placeholder="Número do Contrato de Câmbio" value={formData.numeroContratoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataContratoCambio">Data Contrato Câmbio</Label>
                  <Input id="dataContratoCambio" type="date" value={formData.dataContratoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorContratoCambio">Valor Contrato Câmbio</Label>
                  <Input id="valorContratoCambio" type="number" step="0.01" placeholder="0.00" value={formData.valorContratoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroRegistroOperacaoCambio">Número Registro Operação Câmbio</Label>
                  <Input id="numeroRegistroOperacaoCambio" placeholder="Número do Registro da Operação de Câmbio" value={formData.numeroRegistroOperacaoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataRegistroOperacaoCambio">Data Registro Operação Câmbio</Label>
                  <Input id="dataRegistroOperacaoCambio" type="date" value={formData.dataRegistroOperacaoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorRegistroOperacaoCambio">Valor Registro Operação Câmbio</Label>
                  <Input id="valorRegistroOperacaoCambio" type="number" step="0.01" placeholder="0.00" value={formData.valorRegistroOperacaoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="numeroLiquidacaoCambio">Número Liquidação Câmbio</Label>
                  <Input id="numeroLiquidacaoCambio" placeholder="Número da Liquidação de Câmbio" value={formData.numeroLiquidacaoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="dataLiquidacaoCambio">Data Liquidação Câmbio</Label>
                  <Input id="dataLiquidacaoCambio" type="date" value={formData.dataLiquidacaoCambio} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="valorLiquidacaoCambio">Valor Liquidação Câmbio</Label>
                  <Input id="valorLiquidacaoCambio" type="number" step="0.01" placeholder="0.00" value={formData.valorLiquidacaoCambio} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          );

        default:
          return <div>Conteúdo da aba {activeSubTab}</div>;
      }
    }

    if (activeTab === 'spi') {
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">SPI - Solicitação de Preços de Importação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="spi-cliente">Cliente</Label>
                <Input id="spi-cliente" placeholder="Nome do cliente" />
              </div>
              <div>
                <Label htmlFor="spi-data">Data</Label>
                <Input id="spi-data" type="date" />
              </div>
              <div>
                <Label htmlFor="spi-produto">Produto</Label>
                <Input id="spi-produto" placeholder="Código/Nome do produto" />
              </div>
              <div>
                <Label htmlFor="spi-quantidade">Quantidade</Label>
                <Input id="spi-quantidade" type="number" placeholder="Quantidade" />
              </div>
              <div>
                <Label htmlFor="spi-preco-unitario">Preço Unitário</Label>
                <Input id="spi-preco-unitario" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="spi-validade">Validade da Oferta</Label>
                <Input id="spi-validade" type="date" />
              </div>
            </div>
          </div>
          <Button onClick={handleDownloadPDF} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      );
    }

    if (activeTab === 'ovc') {
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">OVC - Oferta de Venda Comercial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ovc-cliente">Cliente</Label>
                <Input id="ovc-cliente" placeholder="Nome do cliente" />
              </div>
              <div>
                <Label htmlFor="ovc-data">Data</Label>
                <Input id="ovc-data" type="date" />
              </div>
              <div>
                <Label htmlFor="ovc-produto">Produto</Label>
                <Input id="ovc-produto" placeholder="Código/Nome do produto" />
              </div>
              <div>
                <Label htmlFor="ovc-quantidade">Quantidade</Label>
                <Input id="ovc-quantidade" type="number" placeholder="Quantidade" />
              </div>
              <div>
                <Label htmlFor="ovc-preco-unitario">Preço Unitário</Label>
                <Input id="ovc-preco-unitario" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="ovc-validade">Validade da Oferta</Label>
                <Input id="ovc-validade" type="date" />
              </div>
            </div>
          </div>

          {/* OVC Results Table */}
          <div className="bg-white p-6 rounded-lg border">
            <h4 className="text-lg font-semibold mb-4">Tabela de Resultados/Cálculos</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-blue-100">CODE</TableHead>
                    <TableHead className="bg-blue-100">Qty</TableHead>
                    <TableHead className="bg-green-100" colSpan={2}>Price List</TableHead>
                    <TableHead className="bg-yellow-100" colSpan={3}>Customer Discount %</TableHead>
                    <TableHead className="bg-orange-100" colSpan={2}>Discount</TableHead>
                    <TableHead className="bg-purple-100" colSpan={2}>Sub total</TableHead>
                    <TableHead className="bg-red-100">Handling charge (3%)</TableHead>
                    <TableHead className="bg-gray-100">Total</TableHead>
                    <TableHead className="bg-pink-100">% Commission</TableHead>
                    <TableHead className="bg-indigo-100">Commission value</TableHead>
                    <TableHead className="bg-teal-100">Net Radiometer</TableHead>
                  </TableRow>
                  <TableRow className="text-sm">
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="bg-green-50">Unit</TableHead>
                    <TableHead className="bg-green-50">Total</TableHead>
                    <TableHead className="bg-yellow-50">Rmed</TableHead>
                    <TableHead className="bg-yellow-50">Biodina</TableHead>
                    <TableHead className="bg-yellow-50">Total</TableHead>
                    <TableHead className="bg-orange-50">Unit</TableHead>
                    <TableHead className="bg-orange-50">Total</TableHead>
                    <TableHead className="bg-purple-50">Unit</TableHead>
                    <TableHead className="bg-purple-50">Total</TableHead>
                    <TableHead className="bg-red-50"></TableHead>
                    <TableHead className="bg-gray-50"></TableHead>
                    <TableHead className="bg-pink-50"></TableHead>
                    <TableHead className="bg-indigo-50"></TableHead>
                    <TableHead className="bg-teal-50"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ovcResults.map((row) => {
                    const calculated = calculateOvcRow(row);
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{calculated.code}</TableCell>
                        <TableCell className="text-right">{calculated.qty}</TableCell>
                        <TableCell className="text-right">${calculated.priceListUnit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${calculated.priceListTotal.toFixed(2)}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            step="0.1"
                            value={calculated.customerDiscountRmed}
                            onChange={(e) => updateOvcResult(row.id, 'customerDiscountRmed', parseFloat(e.target.value) || 0)}
                            className="w-16 text-right"
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            step="0.1"
                            value={calculated.customerDiscountBiodina}
                            onChange={(e) => updateOvcResult(row.id, 'customerDiscountBiodina', parseFloat(e.target.value) || 0)}
                            className="w-16 text-right"
                          />
                        </TableCell>
                        <TableCell className="text-right">{calculated.customerDiscountTotal.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">${calculated.discountUnit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${calculated.discountTotal.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${calculated.subTotalUnit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${calculated.subTotalTotal.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${calculated.handlingCharge.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold">${calculated.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            step="0.1"
                            value={calculated.commission}
                            onChange={(e) => updateOvcResult(row.id, 'commission', parseFloat(e.target.value) || 0)}
                            className="w-16 text-right"
                          />
                        </TableCell>
                        <TableCell className="text-right">${calculated.commissionValue.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold">${calculated.netRadiometer.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Totals Row */}
                  <TableRow className="bg-gray-50 font-semibold">
                    <TableCell>TOTALS</TableCell>
                    <TableCell className="text-right">{calculateOvcTotals().qty}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().priceListTotal.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().discountTotal.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().subTotalTotal.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().handlingCharge.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().total.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().commissionValue.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${calculateOvcTotals().netRadiometer.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      );
    }

    return <div>Conteúdo da aba {activeTab}</div>;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Nova Importação Direta</DialogTitle>
        </DialogHeader>

        {/* Master Tabs */}
        <div className="flex border-b mb-4">
          <Button
            variant="ghost"
            className={activeTab === 'comercial' ? 'border-b-2 border-blue-500 rounded-none' : ''}
            onClick={() => handleTabChange('comercial')}
          >
            Comercial
          </Button>
          <Button
            variant="ghost"
            className={activeTab === 'spi' ? 'border-b-2 border-blue-500 rounded-none' : ''}
            onClick={() => handleTabChange('spi')}
          >
            SPI
          </Button>
          <Button
            variant="ghost"
            className={activeTab === 'ovc' ? 'border-b-2 border-blue-500 rounded-none' : ''}
            onClick={() => handleTabChange('ovc')}
          >
            OVC
          </Button>
        </div>

        {/* Sub Tabs - only show when comercial tab is active */}
        {activeTab === 'comercial' && (
          <div className="flex border-b mb-4 space-x-1">
            <Button
              variant="ghost"
              className={activeSubTab === 'dados-gerais' ? 'border-b-2 border-blue-500 rounded-none' : ''}
              onClick={() => handleSubTabChange('dados-gerais')}
            >
              Dados Gerais
            </Button>
            <Button
              variant="ghost"
              className={activeSubTab === 'analise-tecnica' ? 'border-b-2 border-blue-500 rounded-none' : ''}
              onClick={() => handleSubTabChange('analise-tecnica')}
            >
              Análise Técnica
            </Button>
            <Button
              variant="ghost"
              className={activeSubTab === 'historico' ? 'border-b-2 border-blue-500 rounded-none' : ''}
              onClick={() => handleSubTabChange('historico')}
            >
              Histórico
            </Button>
            <Button
              variant="ghost"
              className={activeSubTab === 'documentos' ? 'border-b-2 border-blue-500 rounded-none' : ''}
              onClick={() => handleSubTabChange('documentos')}
            >
              Documentos
            </Button>
            <Button
              variant="ghost"
              className={activeSubTab === 'emprestimos' ? 'border-b-2 border-blue-500 rounded-none' : ''}
              onClick={() => handleSubTabChange('emprestimos')}
            >
              Empréstimos
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {renderTabContent()}
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar Importação Direta
          </Button>
          {activeTab === 'spi' && (
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportacaoDiretaForm;
