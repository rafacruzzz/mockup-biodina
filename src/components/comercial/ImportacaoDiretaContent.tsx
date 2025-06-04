import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, Trash2, Upload, Download, MessageSquare, 
  Users, FileText, Clock, Target, Calculator,
  User, Building, Phone, Mail, MapPin, Calendar,
  Package, DollarSign, Truck, FileCheck
} from "lucide-react";
import jsPDF from 'jspdf';

interface ImportacaoDiretaContentProps {
  onClose: () => void;
  onSave: (data: any) => void;
  oportunidade?: any;
}

const ImportacaoDiretaContent = ({ onClose, onSave, oportunidade }: ImportacaoDiretaContentProps) => {
  const [activeTab, setActiveTab] = useState('comercial');
  const [activeComercialTab, setActiveComercialTab] = useState('informacoes');
  const [activeOvcTab, setActiveOvcTab] = useState('dados');
  const [activeSoTab, setActiveSoTab] = useState('pedido');

  // Estados para dados do formulário
  const [formData, setFormData] = useState({
    // Dados comerciais
    codigo: oportunidade?.codigo || '',
    cliente: oportunidade?.cliente || '',
    contato: oportunidade?.contato || '',
    telefone: '',
    email: '',
    endereco: '',
    responsavel: oportunidade?.responsavel || '',
    vendedor: '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    situacao: oportunidade?.situacao || 'em_triagem',
    tipoAplicacao: oportunidade?.tipoAplicacao || 'venda',
    tipoOportunidade: oportunidade?.tipoOportunidade || 'pontual',
    valor: oportunidade?.valor || 0,
    dataAbertura: oportunidade?.dataAbertura || new Date().toISOString().split('T')[0],
    dataContato: oportunidade?.dataContato || '',
    termometro: oportunidade?.termometro || 50,
    fonteLead: oportunidade?.fonteLead || '',
    segmento: oportunidade?.segmento || '',
    descricao: oportunidade?.descricao || '',
    observacoes: '',
    
    // Dados SPI
    numeroSPI: '',
    dataEmissao: new Date().toISOString().split('T')[0],
    fornecedor: '',
    moeda: 'USD',
    condicoesPagamento: '',
    prazoEntrega: '',
    localEntrega: '',
    incoterms: 'FOB',
    packing: 0,
    
    // Dados OVC
    numeroOVC: '',
    dataOVC: '',
    transportadora: '',
    tipoTransporte: 'aereo',
    seguro: false,
    valorSeguro: 0,
    
    // Dados NOD/SO
    numeroPedido: '',
    dataPedido: '',
    statusPedido: 'pendente',
    
    // Dados DDR
    numeroDDR: '',
    dataDDR: '',
    statusDDR: 'pendente'
  });

  // Estados para produtos
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      codigo: '',
      descricao: '',
      modelo: '',
      fabricante: '',
      quantidade: 0,
      quantidadePendente: 0,
      totalQuantidades: 0,
      precoUnitUSD: 0,
      precoTotalUSD: 0,
      customerDiscount: 0,
      subTotal: 0,
      handlingCharge: 0,
      total: 0,
      comission: 0,
      netRadiometer: 0,
      peso: 0,
      dimensoes: '',
      observacoes: ''
    }
  ]);

  // Estados para concorrentes
  const [concorrentes, setConcorrentes] = useState([
    { nome: '', produto: '', preco: 0, observacoes: '' }
  ]);

  // Estados para anexos
  const [anexos, setAnexos] = useState([]);

  // Estados para negociações
  const [negociacoes, setNegociacoes] = useState([]);

  // Estado para upload PI
  const [arquivoPI, setArquivoPI] = useState(null);
  const [mostrarModeloOVC, setMostrarModeloOVC] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const formatCurrencyInput = (value: string) => {
    // Remove tudo que não é número, ponto ou vírgula
    const cleaned = value.replace(/[^\d.,]/g, '');
    return cleaned;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProdutoChange = (index: number, field: string, value: any) => {
    setProdutos(prev => {
      const newProdutos = [...prev];
      newProdutos[index] = {
        ...newProdutos[index],
        [field]: value
      };
      
      // Calcular total das quantidades automaticamente
      if (field === 'quantidade' || field === 'quantidadePendente') {
        newProdutos[index].totalQuantidades = 
          (newProdutos[index].quantidade || 0) + (newProdutos[index].quantidadePendente || 0);
      }
      
      // CORREÇÃO CRÍTICA: Preço Total USD = Total das Qtdes × Preço Unit USD
      if (field === 'totalQuantidades' || field === 'precoUnitUSD' || field === 'quantidade' || field === 'quantidadePendente') {
        const totalQtdes = field === 'quantidade' || field === 'quantidadePendente' 
          ? newProdutos[index].totalQuantidades 
          : newProdutos[index].totalQuantidades;
        newProdutos[index].precoTotalUSD = 
          totalQtdes * (newProdutos[index].precoUnitUSD || 0);
      }

      // Calcular campos do modelo OVC
      if (field === 'precoTotalUSD' || field === 'customerDiscount') {
        const precoTotal = newProdutos[index].precoTotalUSD || 0;
        const discount = newProdutos[index].customerDiscount || 0;
        newProdutos[index].subTotal = precoTotal * (1 - discount / 100);
        newProdutos[index].handlingCharge = newProdutos[index].subTotal * 0.03; // 3%
        newProdutos[index].total = newProdutos[index].subTotal + newProdutos[index].handlingCharge;
        newProdutos[index].comission = newProdutos[index].total * 0.25; // 25%
        newProdutos[index].netRadiometer = newProdutos[index].total - newProdutos[index].comission;
      }
      
      return newProdutos;
    });
  };

  const adicionarProduto = () => {
    setProdutos(prev => [...prev, {
      id: Date.now(),
      codigo: '',
      descricao: '',
      modelo: '',
      fabricante: '',
      quantidade: 0,
      quantidadePendente: 0,
      totalQuantidades: 0,
      precoUnitUSD: 0,
      precoTotalUSD: 0,
      customerDiscount: 0,
      subTotal: 0,
      handlingCharge: 0,
      total: 0,
      comission: 0,
      netRadiometer: 0,
      peso: 0,
      dimensoes: '',
      observacoes: ''
    }]);
  };

  const removerProduto = (index: number) => {
    if (produtos.length > 1) {
      setProdutos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const calcularSubtotal = () => {
    return produtos.reduce((sum, produto) => sum + (produto.precoTotalUSD || 0), 0);
  };

  const calcularTotal = () => {
    return calcularSubtotal() + (formData.packing || 0);
  };

  const handleUploadPI = (event) => {
    const file = event.target.files[0];
    if (file) {
      setArquivoPI(file);
      setMostrarModeloOVC(true);
    }
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFontSize(20);
    doc.text('SOLICITAÇÃO DE PREÇO DE IMPORTAÇÃO (SPI)', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Número SPI: ${formData.numeroSPI}`, 20, 50);
    doc.text(`Data de Emissão: ${formData.dataEmissao}`, 20, 60);
    doc.text(`Cliente: ${formData.cliente}`, 20, 70);
    doc.text(`Fornecedor: ${formData.fornecedor}`, 20, 80);
    
    // Tabela de produtos
    let yPosition = 100;
    doc.text('PRODUTOS/MERCADORIAS:', 20, yPosition);
    yPosition += 10;
    
    // Cabeçalho da tabela
    doc.setFontSize(10);
    const headers = ['Código', 'Descrição', 'Qtde', 'Qtde Pend.', 'Total Qtdes', 'Preço Unit USD', 'Preço Total USD'];
    let xPosition = 20;
    headers.forEach((header, index) => {
      doc.text(header, xPosition, yPosition);
      xPosition += 25;
    });
    
    yPosition += 10;
    
    // Dados dos produtos
    produtos.forEach((produto) => {
      xPosition = 20;
      const values = [
        produto.codigo,
        produto.descricao,
        produto.quantidade.toString(),
        produto.quantidadePendente.toString(),
        produto.totalQuantidades.toString(),
        formatCurrency(produto.precoUnitUSD),
        formatCurrency(produto.precoTotalUSD)
      ];
      
      values.forEach((value) => {
        doc.text(value, xPosition, yPosition);
        xPosition += 25;
      });
      yPosition += 10;
    });
    
    // Totais
    yPosition += 20;
    doc.setFontSize(12);
    const subtotal = calcularSubtotal();
    const total = calcularTotal();
    doc.text(`Subtotal (USD): ${formatCurrency(subtotal)}`, 20, yPosition);
    doc.text(`Packing (USD): ${formatCurrency(formData.packing)}`, 20, yPosition + 10);
    doc.text(`TOTAL (USD): ${formatCurrency(total)}`, 20, yPosition + 20);
    
    // Informações adicionais
    yPosition += 40;
    doc.text(`Condições de Pagamento: ${formData.condicoesPagamento}`, 20, yPosition);
    doc.text(`Prazo de Entrega: ${formData.prazoEntrega}`, 20, yPosition + 10);
    doc.text(`Local de Entrega: ${formData.localEntrega}`, 20, yPosition + 20);
    doc.text(`Incoterms: ${formData.incoterms}`, 20, yPosition + 30);
    
    // Assinaturas
    yPosition += 60;
    doc.text('_________________________', 20, yPosition);
    doc.text('Assinatura do Solicitante', 20, yPosition + 10);
    
    doc.text('_________________________', 120, yPosition);
    doc.text('Assinatura do Aprovador', 120, yPosition + 10);
    
    doc.save(`SPI_${formData.numeroSPI || 'nova'}.pdf`);
  };

  const handleSave = () => {
    const dadosCompletos = {
      ...formData,
      produtos,
      concorrentes,
      anexos,
      negociacoes,
      arquivoPI
    };
    onSave(dadosCompletos);
  };

  return (
    <div className="w-full max-w-none mx-auto px-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="comercial" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            COMERCIAL
          </TabsTrigger>
          <TabsTrigger value="spi" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SPI
          </TabsTrigger>
          <TabsTrigger value="ovc" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            OVC
          </TabsTrigger>
          <TabsTrigger value="nod-so" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            NOD/SO
          </TabsTrigger>
          <TabsTrigger value="ddr" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            DDR
          </TabsTrigger>
        </TabsList>

        {/* Aba COMERCIAL */}
        <TabsContent value="comercial" className="space-y-4">
          <Tabs value={activeComercialTab} onValueChange={setActiveComercialTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="concorrentes">Concorrentes</TabsTrigger>
              <TabsTrigger value="anexos">Anexos</TabsTrigger>
              <TabsTrigger value="negociacoes">Negociações</TabsTrigger>
              <TabsTrigger value="aprovacao">Aprovação</TabsTrigger>
              <TabsTrigger value="chat">Chat Interno</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informações da Oportunidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="codigo">Código</Label>
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => handleInputChange('codigo', e.target.value)}
                      placeholder="Código da oportunidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cliente">Cliente *</Label>
                    <Input
                      id="cliente"
                      value={formData.cliente}
                      onChange={(e) => handleInputChange('cliente', e.target.value)}
                      placeholder="Nome do cliente"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contato">Contato</Label>
                    <Input
                      id="contato"
                      value={formData.contato}
                      onChange={(e) => handleInputChange('contato', e.target.value)}
                      placeholder="Nome do contato"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="Telefone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-1">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      placeholder="Endereço completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="responsavel">Responsável *</Label>
                    <Select value={formData.responsavel} onValueChange={(value) => handleInputChange('responsavel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Faber Oliveira">Faber Oliveira</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                        <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendedor">Vendedor</Label>
                    <Select value={formData.vendedor} onValueChange={(value) => handleInputChange('vendedor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o vendedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Faber Oliveira">Faber Oliveira</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                        <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="origem">Origem</Label>
                    <Select value={formData.origem} onValueChange={(value) => handleInputChange('origem', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vendas RJ">Vendas RJ</SelectItem>
                        <SelectItem value="Vendas SP">Vendas SP</SelectItem>
                        <SelectItem value="Vendas RN">Vendas RN</SelectItem>
                        <SelectItem value="Vendas CE">Vendas CE</SelectItem>
                        <SelectItem value="Vendas RS">Vendas RS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="familiaComercial">Família Comercial</Label>
                    <Select value={formData.familiaComercial} onValueChange={(value) => handleInputChange('familiaComercial', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a família comercial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Radiometer ABL">Radiometer ABL</SelectItem>
                        <SelectItem value="Nova Biomedical">Nova Biomedical</SelectItem>
                        <SelectItem value="WEBMED">WEBMED</SelectItem>
                        <SelectItem value="Stat Profile">Stat Profile</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="situacao">Situação</Label>
                    <Select value={formData.situacao} onValueChange={(value) => handleInputChange('situacao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação" />
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
                  <div>
                    <Label htmlFor="tipoAplicacao">Tipo de Aplicação</Label>
                    <Select value={formData.tipoAplicacao} onValueChange={(value) => handleInputChange('tipoAplicacao', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venda">Venda</SelectItem>
                        <SelectItem value="locacao">Locação</SelectItem>
                        <SelectItem value="servico">Serviço</SelectItem>
                        <SelectItem value="comodato">Comodato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor Estimado (R$)</Label>
                    <Input
                      id="valor"
                      type="number"
                      value={formData.valor}
                      onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataAbertura">Data de Abertura</Label>
                    <Input
                      id="dataAbertura"
                      type="date"
                      value={formData.dataAbertura}
                      onChange={(e) => handleInputChange('dataAbertura', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataContato">Data do Último Contato</Label>
                    <Input
                      id="dataContato"
                      type="date"
                      value={formData.dataContato}
                      onChange={(e) => handleInputChange('dataContato', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="termometro">Termômetro (%)</Label>
                    <Input
                      id="termometro"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.termometro}
                      onChange={(e) => handleInputChange('termometro', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fonteLead">Fonte do Lead</Label>
                    <Select value={formData.fonteLead} onValueChange={(value) => handleInputChange('fonteLead', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Site">Site</SelectItem>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Cold Call">Cold Call</SelectItem>
                        <SelectItem value="Licitação">Licitação</SelectItem>
                        <SelectItem value="Referência">Referência</SelectItem>
                        <SelectItem value="Evento">Evento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="segmento">Segmento</Label>
                    <Select value={formData.segmento} onValueChange={(value) => handleInputChange('segmento', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hospitalar">Hospitalar</SelectItem>
                        <SelectItem value="Universitário">Universitário</SelectItem>
                        <SelectItem value="Público">Público</SelectItem>
                        <SelectItem value="Municipal">Municipal</SelectItem>
                        <SelectItem value="Privado">Privado</SelectItem>
                        <SelectItem value="Laboratório">Laboratório</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <Label htmlFor="descricao">Descrição da Oportunidade</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => handleInputChange('descricao', e.target.value)}
                      placeholder="Descreva os detalhes da oportunidade..."
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      placeholder="Observações adicionais..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Concorrentes */}
            <TabsContent value="concorrentes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Concorrentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Produto</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Observações</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {concorrentes.map((concorrente, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input
                                value={concorrente.nome}
                                onChange={(e) => {
                                  const newConcorrentes = [...concorrentes];
                                  newConcorrentes[index].nome = e.target.value;
                                  setConcorrentes(newConcorrentes);
                                }}
                                placeholder="Nome do concorrente"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={concorrente.produto}
                                onChange={(e) => {
                                  const newConcorrentes = [...concorrentes];
                                  newConcorrentes[index].produto = e.target.value;
                                  setConcorrentes(newConcorrentes);
                                }}
                                placeholder="Produto"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={concorrente.preco}
                                onChange={(e) => {
                                  const newConcorrentes = [...concorrentes];
                                  newConcorrentes[index].preco = parseFloat(e.target.value) || 0;
                                  setConcorrentes(newConcorrentes);
                                }}
                                placeholder="Preço"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                value={concorrente.observacoes}
                                onChange={(e) => {
                                  const newConcorrentes = [...concorrentes];
                                  newConcorrentes[index].observacoes = e.target.value;
                                  setConcorrentes(newConcorrentes);
                                }}
                                placeholder="Observações"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (concorrentes.length > 1) {
                                    setConcorrentes(prev => prev.filter((_, i) => i !== index));
                                  }
                                }}
                                disabled={concorrentes.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button onClick={() => setConcorrentes(prev => [...prev, { nome: '', produto: '', preco: 0, observacoes: '' }])} className="mt-2" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Concorrente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Anexos */}
            <TabsContent value="anexos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Anexos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          const filesArray = Array.from(e.target.files);
                          setAnexos(prev => [...prev, ...filesArray]);
                        }
                      }}
                    />
                    <ul className="mt-2">
                      {anexos.map((file, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{file.name}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAnexos(prev => prev.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Negociações */}
            <TabsContent value="negociacoes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Negociações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Textarea
                      value={negociacoes.map(n => n.text).join('\n\n')}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n\n').map(text => ({ text }));
                        setNegociacoes(lines);
                      }}
                      placeholder="Registre as negociações aqui..."
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Aprovação */}
            <TabsContent value="aprovacao" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Aprovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Área para controle de aprovação (a implementar)</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Chat Interno */}
            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Interno</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Área para chat interno (a implementar)</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Aba SPI - MELHORADA COM LAYOUT EXPANDIDO */}
        <TabsContent value="spi" className="space-y-4">
          <div className="w-full">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Solicitação de Preço de Importação (SPI)
                  </CardTitle>
                  <Button onClick={gerarPDF} className="bg-biodina-gold hover:bg-biodina-gold/90">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar SPI
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dados básicos da SPI - Layout compacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="numeroSPI" className="text-sm">Número SPI</Label>
                    <Input
                      id="numeroSPI"
                      value={formData.numeroSPI}
                      onChange={(e) => handleInputChange('numeroSPI', e.target.value)}
                      placeholder="SPI-2025-001"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dataEmissao" className="text-sm">Data de Emissão</Label>
                    <Input
                      id="dataEmissao"
                      type="date"
                      value={formData.dataEmissao}
                      onChange={(e) => handleInputChange('dataEmissao', e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fornecedor" className="text-sm">Fornecedor</Label>
                    <Input
                      id="fornecedor"
                      value={formData.fornecedor}
                      onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                      placeholder="Nome do fornecedor"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moeda" className="text-sm">Moeda</Label>
                    <Select value={formData.moeda} onValueChange={(value) => handleInputChange('moeda', value)}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - Dólar Americano</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="BRL">BRL - Real Brasileiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tabela de produtos - LAYOUT EXPANDIDO E MELHORADO */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold">Produtos/Mercadorias</h3>
                    <Button onClick={adicionarProduto} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Produto
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2">Código</TableHead>
                          <TableHead className="min-w-[180px] text-center font-medium text-xs p-2">Descrição</TableHead>
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2">Modelo</TableHead>
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2">Fabricante</TableHead>
                          <TableHead className="min-w-[80px] text-center font-medium text-xs p-2">Qtde</TableHead>
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2">Qtde Pend.</TableHead>
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2 bg-blue-50">Total Qtdes</TableHead>
                          <TableHead className="min-w-[120px] text-center font-medium text-xs p-2">Preço Unit USD</TableHead>
                          <TableHead className="min-w-[120px] text-center font-medium text-xs p-2 bg-green-50">Preço Total USD</TableHead>
                          <TableHead className="min-w-[80px] text-center font-medium text-xs p-2">Peso (kg)</TableHead>
                          <TableHead className="min-w-[100px] text-center font-medium text-xs p-2">Dimensões</TableHead>
                          <TableHead className="min-w-[120px] text-center font-medium text-xs p-2">Observações</TableHead>
                          <TableHead className="w-[50px] text-center font-medium text-xs p-2">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {produtos.map((produto, index) => (
                          <TableRow key={produto.id}>
                            <TableCell className="p-1 text-center text-xs">{produto.codigo}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.descricao}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.modelo}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.fabricante}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.quantidade}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.quantidadePendente}</TableCell>
                            <TableCell className="p-1 text-center text-xs bg-blue-50">{produto.totalQuantidades}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{formatCurrencyInput(produto.precoUnitUSD.toString())}</TableCell>
                            <TableCell className="p-1 text-center text-xs bg-green-50 font-medium">{formatCurrency(produto.precoTotalUSD)}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.peso}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.dimensoes}</TableCell>
                            <TableCell className="p-1 text-center text-xs">{produto.observacoes}</TableCell>
                            <TableCell className="p-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removerProduto(index)}
                                disabled={produtos.length === 1}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Totais - MELHORADOS */}
                <div className="flex justify-end">
                  <div className="w-80 space-y-2 bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal (USD):</span>
                      <span className="font-mono text-base font-medium">{formatCurrency(calcularSubtotal())}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Packing (USD):</span>
                      <Input
                        type="text"
                        value={formatCurrencyInput(formData.packing.toString())}
                        onChange={(e) => handleInputChange('packing', parseFloat(e.target.value.replace(/[^0-9.-]/g, '')) || 0)}
                        onBlur={(e) => {
                          const value = parseFloat(e.target.value.replace(/[^0-9.-]/g, '')) || 0;
                          handleInputChange('packing', value);
                        }}
                        placeholder="0.00"
                        className="w-24 h-8 text-right text-sm"
                      />
                    </div>
                    <div className="flex justify-between border-t pt-2 text-base font-bold">
                      <span>TOTAL (USD):</span>
                      <span className="font-mono text-lg text-green-600">{formatCurrency(calcularTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Condições comerciais - LAYOUT COMPACTO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="condicoesPagamento" className="text-sm">Condições de Pagamento</Label>
                    <Input
                      id="condicoesPagamento"
                      value={formData.condicoesPagamento}
                      onChange={(e) => handleInputChange('condicoesPagamento', e.target.value)}
                      placeholder="Ex: 30% antecipado, 70% contra entrega"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prazoEntrega" className="text-sm">Prazo de Entrega</Label>
                    <Input
                      id="prazoEntrega"
                      value={formData.prazoEntrega}
                      onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
                      placeholder="Ex: 30 dias úteis"
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="localEntrega" className="text-sm">Local de Entrega</Label>
                    <Input
                      id="localEntrega"
                      value={formData.localEntrega}
                      onChange={(e) => handleInputChange('localEntrega', e.target.value)}
                      placeholder="Endereço completo de entrega"
                      className="h-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="incoterms" className="text-sm">Incoterms</Label>
                      <Select value={formData.incoterms} onValueChange={(value) => handleInputChange('incoterms', value)}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FOB">FOB - Free On Board</SelectItem>
                          <SelectItem value="CIF">CIF - Cost, Insurance and Freight</SelectItem>
                          <SelectItem value="EXW">EXW - Ex Works</SelectItem>
                          <SelectItem value="DDP">DDP - Delivered Duty Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col justify-end">
                      <Button 
                        onClick={() => document.getElementById('upload-pi').click()}
                        className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload PI
                      </Button>
                      <input
                        id="upload-pi"
                        type="file"
                        accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={handleUploadPI}
                      />
                    </div>
                  </div>
                </div>

                {/* Exibir nome do arquivo PI */}
                {arquivoPI && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">Arquivo PI: {arquivoPI.name}</span>
                    </div>
                  </div>
                )}

                {/* Modelo OVC - SUBSTITUINDO O MODELO PI */}
                {mostrarModeloOVC && (
                  <Card className="mt-4 border-2 border-orange-200">
                    <CardHeader className="bg-orange-50 py-3">
                      <CardTitle className="text-lg text-orange-800">OVC - HSVP-R1 (2ºB - OVC Importação)</CardTitle>
                      <div className="text-sm text-orange-600">ESTIMATED DELIVERY: 45-60 days ARO</div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      {/* Tabela OVC */}
                      <div className="overflow-x-auto border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-orange-50">
                              <TableHead className="text-center font-medium text-xs p-2">CODE</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2">Qty</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2 bg-blue-50">Price List Unit</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2 bg-blue-50">Price List Total</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2">Customer Discount (%)</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2 bg-green-50">Sub total</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2">Handling charge (3%)</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2 bg-yellow-50">Total</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2">Comission (25%)</TableHead>
                              <TableHead className="text-center font-medium text-xs p-2 bg-gray-100">Net Radiometer</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {produtos.map((produto, index) => (
                              <TableRow key={produto.id}>
                                <TableCell className="p-1 text-center text-xs">{produto.codigo}</TableCell>
                                <TableCell className="p-1 text-center text-xs">{produto.totalQuantidades}</TableCell>
                                <TableCell className="p-1 text-right text-xs bg-blue-50">{formatCurrency(produto.precoUnitUSD)}</TableCell>
                                <TableCell className="p-1 text-right text-xs bg-blue-50 font-medium">{formatCurrency(produto.precoTotalUSD)}</TableCell>
                                <TableCell className="p-1">
                                  <Input
                                    type="number"
                                    value={produto.customerDiscount}
                                    onChange={(e) => handleProdutoChange(index, 'customerDiscount', parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    className="h-8 text-xs text-center"
                                  />
                                </TableCell>
                                <TableCell className="p-1 text-right text-xs bg-green-50 font-medium">{formatCurrency(produto.subTotal)}</TableCell>
                                <TableCell className="p-1 text-right text-xs">{formatCurrency(produto.handlingCharge)}</TableCell>
                                <TableCell className="p-1 text-right text-xs bg-yellow-50 font-medium">{formatCurrency(produto.total)}</TableCell>
                                <TableCell className="p-1 text-right text-xs">{formatCurrency(produto.comission)}</TableCell>
                                <TableCell className="p-1 text-right text-xs bg-gray-100 font-medium">{formatCurrency(produto.netRadiometer)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Totais OVC */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">Price List Total</div>
                          <div className="text-lg font-bold text-blue-900">{formatCurrency(produtos.reduce((sum, p) => sum + p.precoTotalUSD, 0))}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-green-800">Sub Total (after discount)</div>
                          <div className="text-lg font-bold text-green-900">{formatCurrency(produtos.reduce((sum, p) => sum + p.subTotal, 0))}</div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-yellow-800">Total (with handling)</div>
                          <div className="text-lg font-bold text-yellow-900">{formatCurrency(produtos.reduce((sum, p) => sum + p.total, 0))}</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-red-800">Total Comission</div>
                          <div className="text-lg font-bold text-red-900">{formatCurrency(produtos.reduce((sum, p) => sum + p.comission, 0))}</div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="text-sm font-medium text-gray-800">Net Radiometer</div>
                          <div className="text-lg font-bold text-gray-900">{formatCurrency(produtos.reduce((sum, p) => sum + p.netRadiometer, 0))}</div>
                        </div>
                      </div>

                      {/* Observações OVC */}
                      <div>
                        <Label htmlFor="observacoesOVC" className="text-sm">Observações OVC</Label>
                        <Textarea
                          id="observacoesOVC"
                          placeholder="Observações específicas para a OVC..."
                          rows={3}
                          className="text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Outras abas */}
        <TabsContent value="ovc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OVC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroOVC">Número OVC</Label>
                  <Input
                    id="numeroOVC"
                    value={formData.numeroOVC}
                    onChange={(e) => handleInputChange('numeroOVC', e.target.value)}
                    placeholder="Número da OVC"
                  />
                </div>
                <div>
                  <Label htmlFor="dataOVC">Data OVC</Label>
                  <Input
                    id="dataOVC"
                    type="date"
                    value={formData.dataOVC}
                    onChange={(e) => handleInputChange('dataOVC', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="transportadora">Transportadora</Label>
                  <Input
                    id="transportadora"
                    value={formData.transportadora}
                    onChange={(e) => handleInputChange('transportadora', e.target.value)}
                    placeholder="Nome da transportadora"
                  />
                </div>
                <div>
                  <Label htmlFor="tipoTransporte">Tipo de Transporte</Label>
                  <Select value={formData.tipoTransporte} onValueChange={(value) => handleInputChange('tipoTransporte', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aereo">Aéreo</SelectItem>
                      <SelectItem value="maritimo">Marítimo</SelectItem>
                      <SelectItem value="rodoviario">Rodoviário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="seguro">Seguro</Label>
                  <Select value={formData.seguro ? 'sim' : 'nao'} onValueChange={(value) => handleInputChange('seguro', value === 'sim')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valorSeguro">Valor do Seguro</Label>
                  <Input
                    id="valorSeguro"
                    type="number"
                    value={formData.valorSeguro}
                    onChange={(e) => handleInputChange('valorSeguro', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nod-so" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NOD/SO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroPedido">Número do Pedido</Label>
                  <Input
                    id="numeroPedido"
                    value={formData.numeroPedido}
                    onChange={(e) => handleInputChange('numeroPedido', e.target.value)}
                    placeholder="Número do pedido"
                  />
                </div>
                <div>
                  <Label htmlFor="dataPedido">Data do Pedido</Label>
                  <Input
                    id="dataPedido"
                    type="date"
                    value={formData.dataPedido}
                    onChange={(e) => handleInputChange('dataPedido', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="statusPedido">Status do Pedido</Label>
                  <Select value={formData.statusPedido} onValueChange={(value) => handleInputChange('statusPedido', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ddr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DDR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroDDR">Número DDR</Label>
                  <Input
                    id="numeroDDR"
                    value={formData.numeroDDR}
                    onChange={(e) => handleInputChange('numeroDDR', e.target.value)}
                    placeholder="Número DDR"
                  />
                </div>
                <div>
                  <Label htmlFor="dataDDR">Data DDR</Label>
                  <Input
                    id="dataDDR"
                    type="date"
                    value={formData.dataDDR}
                    onChange={(e) => handleInputChange('dataDDR', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="statusDDR">Status DDR</Label>
                  <Select value={formData.statusDDR} onValueChange={(value) => handleInputChange('statusDDR', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="aprovado">Aprovado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportacaoDiretaContent;
