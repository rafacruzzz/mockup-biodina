import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, Trash2 } from 'lucide-react';

interface Produto {
  id: string;
  codigo: string;
  descricao: string;
  qtde: number;
  qtdePendente: number;
  totalQtdes: number;
  precoUnitUSD: number;
  precoTotalUSD: number;
}

interface ProdutoOVC {
  id: string;
  code: string;
  qty: number;
  priceListUnit: number;
  priceListTotal: number;
  customerDiscountPercent: number;
  customerDiscountUnit: number;
  customerDiscountTotal: number;
  subTotalUnit: number;
  subTotalTotal: number;
  handlingCharge: number;
  total: number;
  comissionPercent: number;
  comissionValue: number;
  netRadiometer: number;
}

interface ImportacaoDiretaContentProps {
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaContent = ({ onClose, onSave, oportunidade }: ImportacaoDiretaContentProps) => {
  const [activeTab, setActiveTab] = useState('geral');
  
  // Estados SPI
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      codigo: '',
      descricao: '',
      qtde: 0,
      qtdePendente: 0,
      totalQtdes: 0,
      precoUnitUSD: 0,
      precoTotalUSD: 0,
    }
  ]);

  // Estados OVC
  const [produtosOVC, setProdutosOVC] = useState<ProdutoOVC[]>([
    {
      id: '1',
      code: '',
      qty: 0,
      priceListUnit: 0,
      priceListTotal: 0,
      customerDiscountPercent: 0,
      customerDiscountUnit: 0,
      customerDiscountTotal: 0,
      subTotalUnit: 0,
      subTotalTotal: 0,
      handlingCharge: 0,
      total: 0,
      comissionPercent: 25,
      comissionValue: 0,
      netRadiometer: 0,
    }
  ]);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showOVCModel, setShowOVCModel] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const parseInputValue = (value: string): number => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const handleProdutoChange = (index: number, field: keyof Produto, value: string | number) => {
    const newProdutos = [...produtos];
    newProdutos[index] = { ...newProdutos[index], [field]: value };
    
    // Recalcular totais
    if (field === 'qtde' || field === 'qtdePendente') {
      newProdutos[index].totalQtdes = newProdutos[index].qtde + newProdutos[index].qtdePendente;
      newProdutos[index].precoTotalUSD = newProdutos[index].totalQtdes * newProdutos[index].precoUnitUSD;
    }
    
    if (field === 'precoUnitUSD') {
      newProdutos[index].precoTotalUSD = newProdutos[index].totalQtdes * parseFloat(value.toString());
    }
    
    setProdutos(newProdutos);
  };

  const adicionarProduto = () => {
    const novoProduto: Produto = {
      id: Date.now().toString(),
      codigo: '',
      descricao: '',
      qtde: 0,
      qtdePendente: 0,
      totalQtdes: 0,
      precoUnitUSD: 0,
      precoTotalUSD: 0,
    };
    setProdutos([...produtos, novoProduto]);
  };

  const removerProduto = (index: number) => {
    if (produtos.length > 1) {
      setProdutos(produtos.filter((_, i) => i !== index));
    }
  };

  const calcularSubtotal = (): number => {
    return produtos.reduce((total, produto) => total + produto.precoTotalUSD, 0);
  };

  const calcularTotal = (): number => {
    const subtotal = calcularSubtotal();
    const packing = subtotal * 0.02;
    return subtotal + packing;
  };

  // OVC Functions
  const handleProdutoOVCChange = (index: number, field: keyof ProdutoOVC, value: string | number) => {
    const newProdutos = [...produtosOVC];
    newProdutos[index] = { ...newProdutos[index], [field]: value };
    
    // Cálculos automáticos
    const produto = newProdutos[index];
    
    // Price List Total = Qty × Price List Unit
    if (field === 'qty' || field === 'priceListUnit') {
      produto.priceListTotal = produto.qty * produto.priceListUnit;
    }
    
    // Customer Discount calculations
    if (field === 'customerDiscountPercent' || field === 'priceListUnit' || field === 'priceListTotal') {
      produto.customerDiscountUnit = produto.priceListUnit * (produto.customerDiscountPercent / 100);
      produto.customerDiscountTotal = produto.priceListTotal * (produto.customerDiscountPercent / 100);
    }
    
    // Sub total calculations
    produto.subTotalUnit = produto.priceListUnit - produto.customerDiscountUnit;
    produto.subTotalTotal = produto.priceListTotal - produto.customerDiscountTotal;
    
    // Handling charge (3%)
    produto.handlingCharge = produto.subTotalTotal * 0.03;
    
    // Total
    produto.total = produto.subTotalTotal + produto.handlingCharge;
    
    // Comission calculations
    if (field === 'comissionPercent' || produto.total !== newProdutos[index].total) {
      produto.comissionValue = produto.total * (produto.comissionPercent / 100);
    }
    
    // Net Radiometer
    produto.netRadiometer = produto.total - produto.comissionValue;
    
    setProdutosOVC(newProdutos);
  };

  const adicionarProdutoOVC = () => {
    const novoProduto: ProdutoOVC = {
      id: Date.now().toString(),
      code: '',
      qty: 0,
      priceListUnit: 0,
      priceListTotal: 0,
      customerDiscountPercent: 0,
      customerDiscountUnit: 0,
      customerDiscountTotal: 0,
      subTotalUnit: 0,
      subTotalTotal: 0,
      handlingCharge: 0,
      total: 0,
      comissionPercent: 25,
      comissionValue: 0,
      netRadiometer: 0,
    };
    setProdutosOVC([...produtosOVC, novoProduto]);
  };

  const removerProdutoOVC = (index: number) => {
    if (produtosOVC.length > 1) {
      setProdutosOVC(produtosOVC.filter((_, i) => i !== index));
    }
  };

  const calcularTotaisOVC = () => {
    return produtosOVC.reduce((totais, produto) => ({
      priceListTotal: totais.priceListTotal + produto.priceListTotal,
      subTotalTotal: totais.subTotalTotal + produto.subTotalTotal,
      totalWithHandling: totais.totalWithHandling + produto.total,
      totalComission: totais.totalComission + produto.comissionValue,
      netRadiometer: totais.netRadiometer + produto.netRadiometer,
    }), {
      priceListTotal: 0,
      subTotalTotal: 0,
      totalWithHandling: 0,
      totalComission: 0,
      netRadiometer: 0,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowOVCModel(true);
    }
  };

  const handleSave = () => {
    const dadosCompletos = {
      produtos,
      produtosOVC,
      uploadedFile: uploadedFile?.name,
      showOVCModel,
    };
    onSave(dadosCompletos);
  };

  const [formData, setFormData] = useState({
    nomeCliente: oportunidade?.nomeCliente || '',
    emailCliente: oportunidade?.emailCliente || '',
    nomeVendedor: oportunidade?.nomeVendedor || '',
    emailVendedor: oportunidade?.emailVendedor || '',
    observacoes: '',
    status: 'Em Aberto',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-none mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="spi">SPI</TabsTrigger>
        </TabsList>

        {/* Tab Geral */}
        <TabsContent value="geral" className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeCliente">Nome do Cliente</Label>
                  <Input
                    type="text"
                    id="nomeCliente"
                    name="nomeCliente"
                    value={formData.nomeCliente}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="emailCliente">Email do Cliente</Label>
                  <Input
                    type="email"
                    id="emailCliente"
                    name="emailCliente"
                    value={formData.emailCliente}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="nomeVendedor">Nome do Vendedor</Label>
                  <Input
                    type="text"
                    id="nomeVendedor"
                    name="nomeVendedor"
                    value={formData.nomeVendedor}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="emailVendedor">Email do Vendedor</Label>
                  <Input
                    type="email"
                    id="emailVendedor"
                    name="emailVendedor"
                    value={formData.emailVendedor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Digite suas observações aqui"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Em Aberto">Em Aberto</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Reprovado">Reprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab SPI */}
        <TabsContent value="spi" className="space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Produtos SPI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left min-w-[120px]">Código</th>
                      <th className="border border-gray-300 p-2 text-left min-w-[200px]">Descrição</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[80px]">Qtde</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[100px]">Qtde Pendente</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[100px]">Total das Qtdes</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[120px]">Preço Unit USD</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[120px]">Preço Total USD</th>
                      <th className="border border-gray-300 p-2 text-center min-w-[80px]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto, index) => (
                      <tr key={produto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 p-1">
                          <Input
                            value={produto.codigo}
                            onChange={(e) => handleProdutoChange(index, 'codigo', e.target.value)}
                            className="w-full border-0 focus:ring-0"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            value={produto.descricao}
                            onChange={(e) => handleProdutoChange(index, 'descricao', e.target.value)}
                            className="w-full border-0 focus:ring-0"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            type="number"
                            value={produto.qtde}
                            onChange={(e) => handleProdutoChange(index, 'qtde', parseInt(e.target.value) || 0)}
                            className="w-full border-0 focus:ring-0 text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            type="number"
                            value={produto.qtdePendente}
                            onChange={(e) => handleProdutoChange(index, 'qtdePendente', parseInt(e.target.value) || 0)}
                            className="w-full border-0 focus:ring-0 text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            value={produto.totalQtdes}
                            readOnly
                            className="w-full border-0 focus:ring-0 text-center bg-gray-100"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            value={produto.precoUnitUSD === 0 ? '' : produto.precoUnitUSD.toFixed(2)}
                            onChange={(e) => handleProdutoChange(index, 'precoUnitUSD', parseFloat(e.target.value) || 0)}
                            className="w-full border-0 focus:ring-0 text-center"
                            placeholder="0.00"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <Input
                            value={produto.precoTotalUSD.toFixed(2)}
                            readOnly
                            className="w-full border-0 focus:ring-0 text-center bg-gray-100"
                          />
                        </td>
                        <td className="border border-gray-300 p-1 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerProduto(index)}
                            disabled={produtos.length === 1}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button type="button" onClick={adicionarProduto} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Totais:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Subtotal:</Label>
                    <Input
                      value={formatCurrency(calcularSubtotal())}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label>Packing (2%):</Label>
                    <Input
                      value={formatCurrency(calcularSubtotal() * 0.02)}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                  <div>
                    <Label>Total:</Label>
                    <Input
                      value={formatCurrency(calcularTotal())}
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Label htmlFor="localEntrega">Local de Entrega:</Label>
                <Input
                  id="localEntrega"
                  placeholder="Digite o local de entrega"
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="uploadPI"
                    accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('uploadPI')?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PI
                  </Button>
                  {uploadedFile && (
                    <span className="text-sm text-green-600">
                      {uploadedFile.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Tabela OVC - Aparece após upload do PI */}
              {showOVCModel && (
                <Card className="w-full mt-6">
                  <CardHeader>
                    <div className="text-center space-y-2">
                      <CardTitle className="text-lg font-bold text-green-700">OVC - HSVP-R1 (2ºB - OVC Importação)</CardTitle>
                      <p className="text-sm text-gray-600">ESTIMATED DELIVERY: 45-60 days ARO</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-400 text-xs">
                        <thead>
                          <tr>
                            <th rowSpan={2} className="border border-gray-400 p-1 bg-gray-200 text-center min-w-[80px] text-xs">CODE</th>
                            <th rowSpan={2} className="border border-gray-400 p-1 bg-gray-200 text-center min-w-[50px] text-xs">Qty</th>
                            <th colSpan={2} className="border border-gray-400 p-1 text-center text-xs" style={{backgroundColor: '#D4F8D4'}}>Price List</th>
                            <th colSpan={3} className="border border-gray-400 p-1 text-center text-xs" style={{backgroundColor: '#D4F8D4'}}>Customer Discount</th>
                            <th colSpan={2} className="border border-gray-400 p-1 text-center text-xs" style={{backgroundColor: '#D4F8D4'}}>Sub total</th>
                            <th rowSpan={2} className="border border-gray-400 p-1 text-center min-w-[80px] text-xs" style={{backgroundColor: '#FFF2CC'}}>Handling charge* (3%)</th>
                            <th rowSpan={2} className="border border-gray-400 p-1 text-center min-w-[70px] text-xs" style={{backgroundColor: '#A8D8A8'}}>Total</th>
                            <th colSpan={2} className="border border-gray-400 p-1 text-center text-xs" style={{backgroundColor: '#F8D7DA'}}>Comission</th>
                            <th rowSpan={2} className="border border-gray-400 p-1 text-center min-w-[80px] text-xs" style={{backgroundColor: '#FFF9C4'}}>Net Radiometer</th>
                          </tr>
                          <tr>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Unit</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Total</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[40px] text-xs" style={{backgroundColor: '#E8F5E8'}}>%</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Unit</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Total</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Unit</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#E8F5E8'}}>Total</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[40px] text-xs" style={{backgroundColor: '#F4E4E6'}}>%</th>
                            <th className="border border-gray-400 p-1 text-center min-w-[60px] text-xs" style={{backgroundColor: '#F4E4E6'}}>value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {produtosOVC.map((produto, index) => (
                            <tr key={produto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.code}
                                  onChange={(e) => handleProdutoOVCChange(index, 'code', e.target.value)}
                                  className="w-full border-0 focus:ring-0 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  type="number"
                                  value={produto.qty || ''}
                                  onChange={(e) => handleProdutoOVCChange(index, 'qty', parseInt(e.target.value) || 0)}
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.priceListUnit === 0 ? '' : produto.priceListUnit.toFixed(2)}
                                  onChange={(e) => handleProdutoOVCChange(index, 'priceListUnit', parseFloat(e.target.value) || 0)}
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  placeholder="0.00"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.priceListTotal.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center bg-gray-100 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.customerDiscountPercent || ''}
                                  onChange={(e) => handleProdutoOVCChange(index, 'customerDiscountPercent', parseFloat(e.target.value) || 0)}
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  placeholder="0"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.customerDiscountUnit.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center bg-gray-100 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.customerDiscountTotal.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center bg-gray-100 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.subTotalUnit.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center bg-gray-100 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.subTotalTotal.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center bg-gray-100 text-xs h-6"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.handlingCharge.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  style={{backgroundColor: '#FFF8E1'}}
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.total.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  style={{backgroundColor: '#C8E6C9'}}
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.comissionPercent || ''}
                                  onChange={(e) => handleProdutoOVCChange(index, 'comissionPercent', parseFloat(e.target.value) || 25)}
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  placeholder="25"
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.comissionValue.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  style={{backgroundColor: '#FCE4EC'}}
                                />
                              </td>
                              <td className="border border-gray-400 p-1">
                                <Input
                                  value={produto.netRadiometer.toFixed(2)}
                                  readOnly
                                  className="w-full border-0 focus:ring-0 text-center text-xs h-6"
                                  style={{backgroundColor: '#FFFDE7'}}
                                />
                              </td>
                              <td className="border border-gray-400 p-1 text-center">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removerProdutoOVC(index)}
                                  disabled={produtosOVC.length === 1}
                                  className="text-red-600 hover:text-red-800 h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          
                          {/* Linha de Totais */}
                          <tr className="font-bold" style={{backgroundColor: '#E8F5E8'}}>
                            <td colSpan={3} className="border border-gray-400 p-1 text-center text-xs">TOTALS</td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${calcularTotaisOVC().priceListTotal.toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1"></td>
                            <td className="border border-gray-400 p-1"></td>
                            <td className="border border-gray-400 p-1"></td>
                            <td className="border border-gray-400 p-1"></td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${calcularTotaisOVC().subTotalTotal.toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${(calcularTotaisOVC().totalWithHandling - calcularTotaisOVC().subTotalTotal).toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${calcularTotaisOVC().totalWithHandling.toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1"></td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${calcularTotaisOVC().totalComission.toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1 text-center text-xs">
                              ${calcularTotaisOVC().netRadiometer.toFixed(2)}
                            </td>
                            <td className="border border-gray-400 p-1"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <Button type="button" onClick={adicionarProdutoOVC} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Produto OVC
                    </Button>

                    {/* Resumo de Totais */}
                    <div className="mt-6 p-4 rounded-lg" style={{backgroundColor: '#E8F5E8'}}>
                      <h4 className="font-bold text-sm mb-3 text-green-700">SUMMARY TOTALS</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold">Price List Total</p>
                          <p className="font-bold text-green-600">${calcularTotaisOVC().priceListTotal.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">Sub Total (after discount)</p>
                          <p className="font-bold text-green-600">${calcularTotaisOVC().subTotalTotal.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">Total (with handling)</p>
                          <p className="font-bold text-green-600">${calcularTotaisOVC().totalWithHandling.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">Total Comission</p>
                          <p className="font-bold text-pink-600">${calcularTotaisOVC().totalComission.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">Net Radiometer</p>
                          <p className="font-bold text-yellow-600">${calcularTotaisOVC().netRadiometer.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportacaoDiretaContent;
