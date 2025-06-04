import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Save, Download, Upload, Plus, Trash2 } from "lucide-react";

interface ImportacaoDiretaFormProps {
  isOpen: boolean;
  oportunidade?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ImportacaoDiretaForm = ({ isOpen, oportunidade, onClose, onSave }: ImportacaoDiretaFormProps) => {
  const [activeTab, setActiveTab] = useState('comercial');
  const [showOvcFields, setShowOvcFields] = useState(false);

  // Dados Gerais
  const [formData, setFormData] = useState({
    codigo: oportunidade?.codigo || '',
    cliente: oportunidade?.cliente || '',
    cnpj: '',
    contato: oportunidade?.contato || '',
    responsavel: oportunidade?.responsavel || '',
    origem: oportunidade?.origem || '',
    familiaComercial: oportunidade?.familiaComercial || '',
    situacao: oportunidade?.situacao || 'em_triagem',
    valor: oportunidade?.valor || 0,
    termometro: oportunidade?.termometro || 50,
    fonteLead: oportunidade?.fonteLead || '',
    segmento: oportunidade?.segmento || '',
    descricao: oportunidade?.descricao || '',
    
    // SPI Data
    clienteSPI: '',
    enderecoCliente: '',
    cnpjSPI: '',
    telefoneCliente: '',
    emailCliente: '',
    contatoCliente: '',
    numeroProforma: '',
    dataValidade: '',
    condicoesPagamento: '',
    prazoEntrega: '',
    localEntrega: '',
    frete: '',
    seguro: '',
    observacoes: ''
  });

  // Mercadorias
  const [mercadorias, setMercadorias] = useState([
    {
      id: 1,
      codigo: '',
      descricao: '',
      quantidade: 1,
      unidade: 'UN',
      precoUnitario: 0,
      precoTotal: 0
    }
  ]);

  // OVC Itens
  const [ovcItens, setOvcItens] = useState([
    {
      id: 1,
      code: 'ABL800-001',
      qty: 1,
      priceListUnit: 25000.00,
      priceListTotal: 25000.00,
      customerDiscountPercent: 10,
      customerDiscountUnit: 2500.00,
      customerDiscountTotal: 2500.00,
      subTotalUnit: 22500.00,
      subTotalTotal: 22500.00,
      handlingCharge: 675.00,
      total: 23175.00,
      commissionPercent: 5,
      commissionValue: 1158.75,
      netRadiometer: 22016.25
    }
  ]);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMercadoriaChange = (id: number, field: string, value: any) => {
    setMercadorias(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantidade' || field === 'precoUnitario') {
          updated.precoTotal = updated.quantidade * updated.precoUnitario;
        }
        return updated;
      }
      return item;
    }));
  };

  const handleOvcChange = (id: number, field: string, value: any) => {
    setOvcItens(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        // Recalcular todos os valores automaticamente
        updated.priceListTotal = updated.qty * updated.priceListUnit;
        updated.customerDiscountUnit = updated.priceListUnit * (updated.customerDiscountPercent / 100);
        updated.customerDiscountTotal = updated.priceListTotal * (updated.customerDiscountPercent / 100);
        updated.subTotalUnit = updated.priceListUnit - updated.customerDiscountUnit;
        updated.subTotalTotal = updated.priceListTotal - updated.customerDiscountTotal;
        updated.handlingCharge = updated.subTotalTotal * 0.03;
        updated.total = updated.subTotalTotal + updated.handlingCharge;
        updated.commissionValue = updated.total * (updated.commissionPercent / 100);
        updated.netRadiometer = updated.total - updated.commissionValue;
        
        return updated;
      }
      return item;
    }));
  };

  const adicionarMercadoria = () => {
    const newId = Math.max(...mercadorias.map(m => m.id)) + 1;
    setMercadorias(prev => [...prev, {
      id: newId,
      codigo: '',
      descricao: '',
      quantidade: 1,
      unidade: 'UN',
      precoUnitario: 0,
      precoTotal: 0
    }]);
  };

  const removerMercadoria = (id: number) => {
    setMercadorias(prev => prev.filter(item => item.id !== id));
  };

  const adicionarOvcItem = () => {
    const newId = Math.max(...ovcItens.map(item => item.id)) + 1;
    setOvcItens(prev => [...prev, {
      id: newId,
      code: '',
      qty: 1,
      priceListUnit: 0,
      priceListTotal: 0,
      customerDiscountPercent: 0,
      customerDiscountUnit: 0,
      customerDiscountTotal: 0,
      subTotalUnit: 0,
      subTotalTotal: 0,
      handlingCharge: 0,
      total: 0,
      commissionPercent: 0,
      commissionValue: 0,
      netRadiometer: 0
    }]);
  };

  const removerOvcItem = (id: number) => {
    setOvcItens(prev => prev.filter(item => item.id !== id));
  };

  const handleUploadPI = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        console.log('Arquivo PI carregado:', file.name);
        setShowOvcFields(true);
      }
    };
    input.click();
  };

  const handleBaixarSPI = () => {
    console.log('Baixando SPI com dados:', formData);
    // Implementar download do SPI
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      mercadorias,
      ovcItens: showOvcFields ? ovcItens : undefined,
      modalidade: 'importacao_direta'
    };
    onSave(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotalOvc = (field: string) => {
    return ovcItens.reduce((total, item) => total + (item[field as keyof typeof item] as number || 0), 0);
  };

  const masterTabs = [
    { id: 'comercial', label: 'COMERCIAL' },
    { id: 'spi', label: 'SPI' }
  ];

  const renderComercialForm = () => (
    <div className="space-y-6">
      <Tabs defaultValue="dados-gerais" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
          <TabsTrigger value="analise-tecnica">Análise Técnica</TabsTrigger>
          <TabsTrigger value="concorrencia">Concorrência</TabsTrigger>
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          <TabsTrigger value="anexos">Anexos</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-gerais" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="codigo">Código da Oportunidade</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => handleInputChange('codigo', e.target.value)}
                placeholder="Ex: 10683"
              />
            </div>
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => handleInputChange('cliente', e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                placeholder="XX.XXX.XXX/XXXX-XX"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contato">Contato</Label>
              <Input
                id="contato"
                value={formData.contato}
                onChange={(e) => handleInputChange('contato', e.target.value)}
                placeholder="Telefone ou email"
              />
            </div>
            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => handleInputChange('responsavel', e.target.value)}
                placeholder="Nome do responsável"
              />
            </div>
            <div>
              <Label htmlFor="origem">Origem</Label>
              <Input
                id="origem"
                value={formData.origem}
                onChange={(e) => handleInputChange('origem', e.target.value)}
                placeholder="Ex: Vendas SP"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="familiaComercial">Família Comercial</Label>
              <Select value={formData.familiaComercial} onValueChange={(value) => handleInputChange('familiaComercial', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar família" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Radiometer ABL">Radiometer ABL</SelectItem>
                  <SelectItem value="Nova Biomedical">Nova Biomedical</SelectItem>
                  <SelectItem value="WEBMED">WEBMED</SelectItem>
                  <SelectItem value="Stat Profile">Stat Profile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="situacao">Situação</Label>
              <Select value={formData.situacao} onValueChange={(value) => handleInputChange('situacao', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="em_triagem">Em Triagem</SelectItem>
                  <SelectItem value="em_acompanhamento">Em Acompanhamento</SelectItem>
                  <SelectItem value="ganha">Ganha</SelectItem>
                  <SelectItem value="perdida">Perdida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                value={formData.valor}
                onChange={(e) => handleInputChange('valor', Number(e.target.value))}
                placeholder="0,00"
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
                onChange={(e) => handleInputChange('termometro', Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descrição detalhada da oportunidade"
              rows={3}
            />
          </div>
        </TabsContent>

        <TabsContent value="analise-tecnica">
          <div className="p-4 text-center text-gray-500">
            Análise Técnica - Em desenvolvimento
          </div>
        </TabsContent>

        <TabsContent value="concorrencia">
          <div className="p-4 text-center text-gray-500">
            Concorrência - Em desenvolvimento
          </div>
        </TabsContent>

        <TabsContent value="cronograma">
          <div className="p-4 text-center text-gray-500">
            Cronograma - Em desenvolvimento
          </div>
        </TabsContent>

        <TabsContent value="anexos">
          <div className="p-4 text-center text-gray-500">
            Anexos - Em desenvolvimento
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderSPIForm = () => (
    <div className="space-y-6">
      <CardTitle className="text-center text-lg font-semibold mb-6">
        SPI – SOLICITAÇÃO DE PROFORMA INVOICE
      </CardTitle>

      {/* Dados do Cliente */}
      <div className="space-y-4">
        <h3 className="text-md font-semibold border-b pb-2">Dados do Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clienteSPI">Cliente</Label>
            <Input
              id="clienteSPI"
              value={formData.clienteSPI}
              onChange={(e) => handleInputChange('clienteSPI', e.target.value)}
              placeholder="Nome do cliente"
            />
          </div>
          <div>
            <Label htmlFor="cnpjSPI">CNPJ</Label>
            <Input
              id="cnpjSPI"
              value={formData.cnpjSPI}
              onChange={(e) => handleInputChange('cnpjSPI', e.target.value)}
              placeholder="XX.XXX.XXX/XXXX-XX"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="enderecoCliente">Endereço</Label>
          <Textarea
            id="enderecoCliente"
            value={formData.enderecoCliente}
            onChange={(e) => handleInputChange('enderecoCliente', e.target.value)}
            placeholder="Endereço completo do cliente"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="telefoneCliente">Telefone</Label>
            <Input
              id="telefoneCliente"
              value={formData.telefoneCliente}
              onChange={(e) => handleInputChange('telefoneCliente', e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label htmlFor="emailCliente">Email</Label>
            <Input
              id="emailCliente"
              type="email"
              value={formData.emailCliente}
              onChange={(e) => handleInputChange('emailCliente', e.target.value)}
              placeholder="cliente@email.com"
            />
          </div>
          <div>
            <Label htmlFor="contatoCliente">Contato</Label>
            <Input
              id="contatoCliente"
              value={formData.contatoCliente}
              onChange={(e) => handleInputChange('contatoCliente', e.target.value)}
              placeholder="Nome do contato"
            />
          </div>
        </div>
      </div>

      {/* Informações da Proforma */}
      <div className="space-y-4">
        <h3 className="text-md font-semibold border-b pb-2">Informações da Proforma Invoice</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numeroProforma">Número da Proforma</Label>
            <Input
              id="numeroProforma"
              value={formData.numeroProforma}
              onChange={(e) => handleInputChange('numeroProforma', e.target.value)}
              placeholder="PI-2024-001"
            />
          </div>
          <div>
            <Label htmlFor="dataValidade">Data de Validade</Label>
            <Input
              id="dataValidade"
              type="date"
              value={formData.dataValidade}
              onChange={(e) => handleInputChange('dataValidade', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="condicoesPagamento">Condições de Pagamento</Label>
            <Input
              id="condicoesPagamento"
              value={formData.condicoesPagamento}
              onChange={(e) => handleInputChange('condicoesPagamento', e.target.value)}
              placeholder="Ex: 30% antecipado, 70% na entrega"
            />
          </div>
          <div>
            <Label htmlFor="prazoEntrega">Prazo de Entrega</Label>
            <Input
              id="prazoEntrega"
              value={formData.prazoEntrega}
              onChange={(e) => handleInputChange('prazoEntrega', e.target.value)}
              placeholder="Ex: 60 dias"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="localEntrega">Local de Entrega</Label>
          <Textarea
            id="localEntrega"
            value={formData.localEntrega}
            onChange={(e) => handleInputChange('localEntrega', e.target.value)}
            placeholder="Endereço de entrega"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="frete">Frete</Label>
            <Select value={formData.frete} onValueChange={(value) => handleInputChange('frete', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cif">CIF (por conta do vendedor)</SelectItem>
                <SelectItem value="fob">FOB (por conta do comprador)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="seguro">Seguro</Label>
            <Select value={formData.seguro} onValueChange={(value) => handleInputChange('seguro', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incluso">Incluso</SelectItem>
                <SelectItem value="nao_incluso">Não Incluso</SelectItem>
                <SelectItem value="por_conta_cliente">Por conta do cliente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mercadorias */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold border-b pb-2">Mercadorias</h3>
          <Button type="button" onClick={adicionarMercadoria} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Preço Unitário</TableHead>
                <TableHead>Preço Total</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mercadorias.map((mercadoria) => (
                <TableRow key={mercadoria.id}>
                  <TableCell>
                    <Input
                      value={mercadoria.codigo}
                      onChange={(e) => handleMercadoriaChange(mercadoria.id, 'codigo', e.target.value)}
                      placeholder="Código"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={mercadoria.descricao}
                      onChange={(e) => handleMercadoriaChange(mercadoria.id, 'descricao', e.target.value)}
                      placeholder="Descrição"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={mercadoria.quantidade}
                      onChange={(e) => handleMercadoriaChange(mercadoria.id, 'quantidade', Number(e.target.value))}
                      min="1"
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={mercadoria.unidade} 
                      onValueChange={(value) => handleMercadoriaChange(mercadoria.id, 'unidade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UN">Unidade</SelectItem>
                        <SelectItem value="PC">Peça</SelectItem>
                        <SelectItem value="KG">Kg</SelectItem>
                        <SelectItem value="M">Metro</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={mercadoria.precoUnitario}
                      onChange={(e) => handleMercadoriaChange(mercadoria.id, 'precoUnitario', Number(e.target.value))}
                      placeholder="0,00"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {formatCurrency(mercadoria.precoTotal)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {mercadorias.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removerMercadoria(mercadoria.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <div className="text-lg font-semibold">
            Total Geral: {formatCurrency(mercadorias.reduce((total, item) => total + item.precoTotal, 0))}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => handleInputChange('observacoes', e.target.value)}
          placeholder="Observações adicionais"
          rows={3}
        />
      </div>

      {/* Botões SPI */}
      <div className="flex gap-2">
        <Button type="button" onClick={handleBaixarSPI} className="bg-biodina-gold hover:bg-biodina-gold/90">
          <Download className="h-4 w-4 mr-2" />
          Baixar SPI
        </Button>
        <Button type="button" onClick={handleUploadPI} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload PI
        </Button>
      </div>

      {/* Campos OVC após upload */}
      {showOvcFields && (
        <div className="space-y-4 mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">OVC - Oferta de Venda de Conjunto</h3>
            <Button type="button" onClick={adicionarOvcItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-[1400px]">
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="bg-white border text-center font-bold">CODE</TableHead>
                  <TableHead rowSpan={2} className="bg-white border text-center font-bold">Qty</TableHead>
                  <TableHead colSpan={3} className="bg-green-100 border text-center font-bold">Price List</TableHead>
                  <TableHead colSpan={3} className="bg-green-100 border text-center font-bold">Customer Discount</TableHead>
                  <TableHead colSpan={2} className="bg-green-100 border text-center font-bold">Sub total</TableHead>
                  <TableHead rowSpan={2} className="bg-yellow-100 border text-center font-bold">Handling charge* (3%)</TableHead>
                  <TableHead rowSpan={2} className="bg-green-200 border text-center font-bold">Total</TableHead>
                  <TableHead colSpan={2} className="bg-pink-100 border text-center font-bold">Comission</TableHead>
                  <TableHead rowSpan={2} className="bg-yellow-50 border text-center font-bold">Net Radiometer</TableHead>
                  <TableHead rowSpan={2} className="bg-white border text-center font-bold">Ações</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="bg-green-100 border text-center text-xs">Unit</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">Total</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">%</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">Unit</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">Total</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">Unit</TableHead>
                  <TableHead className="bg-green-100 border text-center text-xs">Total</TableHead>
                  <TableHead className="bg-pink-100 border text-center text-xs">%</TableHead>
                  <TableHead className="bg-pink-100 border text-center text-xs">value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ovcItens.map((item, index) => (
                  <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="border">
                      <Input
                        value={item.code}
                        onChange={(e) => handleOvcChange(item.id, 'code', e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="border">
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleOvcChange(item.id, 'qty', Number(e.target.value))}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell className="border">
                      <Input
                        type="number"
                        step="0.01"
                        value={item.priceListUnit}
                        onChange={(e) => handleOvcChange(item.id, 'priceListUnit', Number(e.target.value))}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="border text-right font-medium">
                      {formatCurrency(item.priceListTotal)}
                    </TableCell>
                    <TableCell className="border">
                      <Input
                        type="number"
                        value={item.customerDiscountPercent}
                        onChange={(e) => handleOvcChange(item.id, 'customerDiscountPercent', Number(e.target.value))}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell className="border text-right font-medium">
                      {formatCurrency(item.customerDiscountUnit)}
                    </TableCell>
                    <TableCell className="border text-right font-medium">
                      {formatCurrency(item.customerDiscountTotal)}
                    </TableCell>
                    <TableCell className="border text-right font-medium">
                      {formatCurrency(item.subTotalUnit)}
                    </TableCell>
                    <TableCell className="border text-right font-medium">
                      {formatCurrency(item.subTotalTotal)}
                    </TableCell>
                    <TableCell className="border text-right bg-yellow-100">
                      {formatCurrency(item.handlingCharge)}
                    </TableCell>
                    <TableCell className="border text-right bg-green-200">
                      {formatCurrency(item.total)}
                    </TableCell>
                    <TableCell className="border">
                      <Input
                        type="number"
                        value={item.commissionPercent}
                        onChange={(e) => handleOvcChange(item.id, 'commissionPercent', Number(e.target.value))}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell className="border text-right bg-pink-100">
                      {formatCurrency(item.commissionValue)}
                    </TableCell>
                    <TableCell className="border text-right bg-yellow-50">
                      {formatCurrency(item.netRadiometer)}
                    </TableCell>
                    <TableCell className="border">
                      {ovcItens.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removerOvcItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Linha de Totais */}
                <TableRow className="bg-green-100 font-bold">
                  <TableCell className="border text-center">TOTAL</TableCell>
                  <TableCell className="border text-center">{ovcItens.reduce((sum, item) => sum + item.qty, 0)}</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border text-right">{formatCurrency(calcularTotalOvc('priceListTotal'))}</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border text-right">{formatCurrency(calcularTotalOvc('customerDiscountTotal'))}</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border text-right">{formatCurrency(calcularTotalOvc('subTotalTotal'))}</TableCell>
                  <TableCell className="border text-right bg-yellow-100">{formatCurrency(calcularTotalOvc('handlingCharge'))}</TableCell>
                  <TableCell className="border text-right bg-green-200">{formatCurrency(calcularTotalOvc('total'))}</TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border text-right bg-pink-100">{formatCurrency(calcularTotalOvc('commissionValue'))}</TableCell>
                  <TableCell className="border text-right bg-yellow-50">{formatCurrency(calcularTotalOvc('netRadiometer'))}</TableCell>
                  <TableCell className="border"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[95vw] max-h-[95vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Nova Importação Direta
            {oportunidade && ` - ${oportunidade.cliente}`}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Navegação Principal */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {masterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-biodina-blue text-biodina-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Conteúdo das Abas */}
            <div className="space-y-6">
              {activeTab === 'comercial' && renderComercialForm()}
              {activeTab === 'spi' && renderSPIForm()}
            </div>

            {/* Rodapé com botões */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-biodina-gold hover:bg-biodina-gold/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Importação Direta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportacaoDiretaForm;
