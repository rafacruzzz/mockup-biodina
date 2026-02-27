import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoneyInput } from "@/components/ui/money-input";
import { 
  Plus, Search, DollarSign, TrendingUp, User, FileText,
  CheckCircle, Clock, Calculator, Target, ArrowDownCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ComissaoPagar } from "@/types/comissoesPagar";

interface ComissoesPagarViewProps {
  comissoesPendentes?: ComissaoPagar[];
  onComissaoSalva?: (comissao: ComissaoPagar) => void;
}

const ComissoesPagarView = ({ comissoesPendentes = [], onComissaoSalva }: ComissoesPagarViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showNovaComissaoModal, setShowNovaComissaoModal] = useState(false);
  const [comissoesInternas, setComissoesInternas] = useState<ComissaoPagar[]>([]);
  const { toast } = useToast();

  // Form state for new commission
  const [formVendedor, setFormVendedor] = useState("");
  const [formVenda, setFormVenda] = useState("");
  const [formCliente, setFormCliente] = useState("");
  const [formValorVenda, setFormValorVenda] = useState("");
  const [formObservacoes, setFormObservacoes] = useState("");
  const [formPercentual, setFormPercentual] = useState("");
  const [formDataPagamento, setFormDataPagamento] = useState("");
  const [formBanco, setFormBanco] = useState("");
  const [formAgencia, setFormAgencia] = useState("");
  const [formConta, setFormConta] = useState("");
  const [formMulta, setFormMulta] = useState("");
  const [formJuros, setFormJuros] = useState("");
  const [formDesconto, setFormDesconto] = useState("");
  const [editingComissao, setEditingComissao] = useState<ComissaoPagar | null>(null);

  // Mock data para comissões
  const comissoesMock: ComissaoPagar[] = [
    {
      id: "COM001",
      vendedor: "João Silva",
      vendaId: "VENDA-2024-120",
      cliente: "Empresa ABC Ltda",
      valorVenda: 50000.00,
      percentualComissao: 3.5,
      valorComissao: 1750.00,
      dataVenda: "2024-12-15",
      status: "Calculado",
      periodoCalculo: "Dezembro/2024",
      observacoes: "",
      origemContasReceber: false
    },
    {
      id: "COM002",
      vendedor: "Maria Santos",
      vendaId: "VENDA-2024-121",
      cliente: "Indústria XYZ S.A.",
      valorVenda: 85000.00,
      percentualComissao: 4.0,
      valorComissao: 3400.00,
      dataVenda: "2024-12-20",
      status: "Pago",
      periodoCalculo: "Dezembro/2024",
      observacoes: "Comissão paga via PIX",
      origemContasReceber: false
    },
    {
      id: "COM003",
      vendedor: "Carlos Oliveira",
      vendaId: "VENDA-2025-001",
      cliente: "Comércio 123",
      valorVenda: 25000.00,
      percentualComissao: 2.5,
      valorComissao: 625.00,
      dataVenda: "2025-01-05",
      status: "Pendente Aprovação",
      periodoCalculo: "Janeiro/2025",
      observacoes: "Aguardando confirmação do recebimento",
      origemContasReceber: false
    }
  ];

  // Merge all commissions
  const todasComissoes = [...comissoesMock, ...comissoesInternas, ...comissoesPendentes];

  // Mock data para vendedores
  const vendedores = [
    {
      nome: "João Silva",
      totalVendas: 185000.00,
      totalComissoes: 6250.00,
      percentualMedio: 3.4,
      vendasPendentes: 2
    },
    {
      nome: "Maria Santos",
      totalVendas: 245000.00,
      totalComissoes: 9450.00,
      percentualMedio: 3.9,
      vendasPendentes: 1
    },
    {
      nome: "Carlos Oliveira",
      totalVendas: 125000.00,
      totalComissoes: 3125.00,
      percentualMedio: 2.5,
      vendasPendentes: 3
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
        return 'bg-green-500';
      case 'Calculado':
        return 'bg-blue-500';
      case 'Pendente Aprovação':
        return 'bg-yellow-500';
      case 'Pendente Pagamento':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
        return <CheckCircle className="h-4 w-4" />;
      case 'Calculado':
        return <Calculator className="h-4 w-4" />;
      case 'Pendente Aprovação':
      case 'Pendente Pagamento':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const resetForm = () => {
    setFormVendedor("");
    setFormVenda("");
    setFormCliente("");
    setFormValorVenda("");
    setFormObservacoes("");
    setFormPercentual("");
    setFormDataPagamento("");
    setFormBanco("");
    setFormAgencia("");
    setFormConta("");
    setFormMulta("");
    setFormJuros("");
    setFormDesconto("");
    setEditingComissao(null);
  };

  const openEditComissao = (comissao: ComissaoPagar) => {
    setEditingComissao(comissao);
    setFormVendedor(comissao.vendedor);
    setFormVenda(comissao.vendaId);
    setFormCliente(comissao.cliente);
    setFormValorVenda(String(Math.round(comissao.valorVenda * 100)));
    setFormObservacoes(comissao.observacoes);
    setFormPercentual(String(comissao.percentualComissao));
    setFormDataPagamento(comissao.dataPagamento || "");
    setFormBanco(comissao.bancoPagamento || "");
    setFormAgencia(comissao.agenciaPagamento || "");
    setFormConta(comissao.contaPagamento || "");
    setFormMulta(comissao.multa ? String(Math.round(comissao.multa * 100)) : "");
    setFormJuros(comissao.juros ? String(Math.round(comissao.juros * 100)) : "");
    setFormDesconto(comissao.desconto ? String(Math.round(comissao.desconto * 100)) : "");
    setShowNovaComissaoModal(true);
  };

  const handleNovaComissao = () => {
    const valorVenda = parseFloat(formValorVenda) / 100 || 0;
    const percentual = parseFloat(formPercentual) || 0;
    const novaComissao: ComissaoPagar = {
      id: editingComissao?.id || `COM-${Date.now()}`,
      vendedor: formVendedor || editingComissao?.vendedor || "",
      vendaId: formVenda || editingComissao?.vendaId || "",
      cliente: formCliente || editingComissao?.cliente || "",
      valorVenda,
      percentualComissao: percentual,
      valorComissao: (valorVenda * percentual) / 100,
      dataVenda: new Date().toISOString().split('T')[0],
      status: "Pendente Pagamento",
      periodoCalculo: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      observacoes: formObservacoes,
      origemContasReceber: editingComissao?.origemContasReceber || false,
      dataPagamento: formDataPagamento || undefined,
      bancoPagamento: formBanco || undefined,
      agenciaPagamento: formAgencia || undefined,
      contaPagamento: formConta || undefined,
      multa: formMulta ? parseFloat(formMulta) / 100 : undefined,
      juros: formJuros ? parseFloat(formJuros) / 100 : undefined,
      desconto: formDesconto ? parseFloat(formDesconto) / 100 : undefined,
    };

    setComissoesInternas(prev => [...prev, novaComissao]);
    onComissaoSalva?.(novaComissao);

    toast({
      title: "Sucesso",
      description: editingComissao 
        ? "Comissão atualizada com sucesso!" 
        : "Nova comissão cadastrada com sucesso!"
    });
    resetForm();
    setShowNovaComissaoModal(false);
  };

  const NovaComissaoModal = () => {
    const isFromReceber = editingComissao?.origemContasReceber === true;

    return (
      <Dialog open={showNovaComissaoModal} onOpenChange={(open) => {
        if (!open) resetForm();
        setShowNovaComissaoModal(open);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {editingComissao ? "Editar Comissão" : "Nova Comissão"}
              {isFromReceber && (
                <Badge className="bg-purple-500 text-white ml-2">
                  <ArrowDownCircle className="h-3 w-3 mr-1" />
                  Recebido do Contas a Receber
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="dados-gerais" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
              <TabsTrigger value="calculo">Cálculo</TabsTrigger>
              <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="dados-gerais" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendedor">Vendedor *</Label>
                  {isFromReceber ? (
                    <Input value={formVendedor} disabled />
                  ) : (
                    <Select value={formVendedor} onValueChange={setFormVendedor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o vendedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="João Silva">João Silva</SelectItem>
                        <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                        <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venda">Venda Relacionada *</Label>
                  {isFromReceber ? (
                    <Input value={formVenda} disabled />
                  ) : (
                    <Select value={formVenda} onValueChange={setFormVenda}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a venda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VENDA-2025-001">VENDA-2025-001</SelectItem>
                        <SelectItem value="VENDA-2025-002">VENDA-2025-002</SelectItem>
                        <SelectItem value="VENDA-2025-003">VENDA-2025-003</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input 
                    id="cliente"
                    placeholder="Nome do cliente"
                    value={formCliente}
                    onChange={(e) => setFormCliente(e.target.value)}
                    disabled={isFromReceber}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor-venda">Valor da Venda</Label>
                  <MoneyInput
                    value={formValorVenda}
                    onChange={setFormValorVenda}
                    disabled={isFromReceber}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes"
                  placeholder="Observações adicionais sobre a comissão"
                  value={formObservacoes}
                  onChange={(e) => setFormObservacoes(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="calculo" className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Cálculo Automático</h4>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  As comissões são calculadas automaticamente baseadas no percentual definido para cada vendedor e o valor da venda confirmada.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentual">Percentual de Comissão (%)</Label>
                  <Input 
                    id="percentual"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={formPercentual}
                    onChange={(e) => setFormPercentual(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor-comissao">Valor da Comissão</Label>
                  <Input 
                    id="valor-comissao"
                    placeholder="R$ 0,00"
                    disabled
                    value={
                      formValorVenda && formPercentual
                        ? formatCurrency((parseFloat(formValorVenda) / 100) * (parseFloat(formPercentual) / 100))
                        : ""
                    }
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Histórico de Comissões do Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">R$ 6.250</p>
                      <p className="text-sm text-muted-foreground">Total de Comissões</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">3.4%</p>
                      <p className="text-sm text-muted-foreground">Percentual Médio</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">15</p>
                      <p className="text-sm text-muted-foreground">Vendas no Período</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pagamento" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Dados de Pagamento</h4>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Defina os dados bancários e a data para efetuar o pagamento da comissão. Esses dados serão refletidos no Calendário de Vencimentos.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-pagamento">Data de Pagamento</Label>
                  <Input 
                    id="data-pagamento"
                    type="date"
                    value={formDataPagamento}
                    onChange={(e) => setFormDataPagamento(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banco">Banco</Label>
                  <Select value={formBanco} onValueChange={setFormBanco}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o banco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Banco do Brasil">Banco do Brasil</SelectItem>
                      <SelectItem value="Caixa Econômica">Caixa Econômica</SelectItem>
                      <SelectItem value="Itaú">Itaú</SelectItem>
                      <SelectItem value="Bradesco">Bradesco</SelectItem>
                      <SelectItem value="Santander">Santander</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agencia">Agência</Label>
                  <Input 
                    id="agencia"
                    placeholder="0000-0"
                    value={formAgencia}
                    onChange={(e) => setFormAgencia(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conta">Conta</Label>
                  <Input 
                    id="conta"
                    placeholder="00000-0"
                    value={formConta}
                    onChange={(e) => setFormConta(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Ajustes Financeiros</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="multa">Multa</Label>
                    <MoneyInput
                      value={formMulta}
                      onChange={setFormMulta}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="juros">Juros</Label>
                    <MoneyInput
                      value={formJuros}
                      onChange={setFormJuros}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desconto">Desconto</Label>
                    <MoneyInput
                      value={formDesconto}
                      onChange={setFormDesconto}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentos Necessários</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Comprovante de Venda",
                      "Relatório de Performance",
                      "Autorização de Pagamento",
                      "Recibo de Comissão"
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{doc}</span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Anexar
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => { resetForm(); setShowNovaComissaoModal(false); }}>
              Cancelar
            </Button>
            <Button onClick={handleNovaComissao}>
              {editingComissao ? "Salvar Alterações" : "Criar Comissão"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comissões a Pagar</h1>
          <p className="text-muted-foreground">Gestão de comissões de vendas e performance</p>
        </div>
        <Button onClick={() => { resetForm(); setShowNovaComissaoModal(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Comissão
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                <p className="text-2xl font-bold text-red-600">R$ 5.775</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pago no Mês</p>
                <p className="text-2xl font-bold text-green-600">R$ 3.400</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendedores Ativos</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <User className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Percentual Médio</p>
                <p className="text-2xl font-bold text-primary">3.3%</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="comissoes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="comissoes">Comissões</TabsTrigger>
          <TabsTrigger value="vendedores">Performance por Vendedor</TabsTrigger>
        </TabsList>

        <TabsContent value="comissoes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Comissões
                </CardTitle>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Pesquisar comissões..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="calculado">Calculado</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente Aprovação</SelectItem>
                    <SelectItem value="pendente_pagamento">Pendente Pagamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Venda</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor da Venda</TableHead>
                    <TableHead>%</TableHead>
                    <TableHead>Comissão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todasComissoes.map((comissao) => (
                    <TableRow key={comissao.id}>
                      <TableCell className="font-medium">{comissao.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {comissao.vendedor}
                        </div>
                      </TableCell>
                      <TableCell>{comissao.vendaId}</TableCell>
                      <TableCell>{comissao.cliente}</TableCell>
                      <TableCell>{formatCurrency(comissao.valorVenda)}</TableCell>
                      <TableCell>{formatPercent(comissao.percentualComissao)}</TableCell>
                      <TableCell className="font-bold text-primary">
                        {formatCurrency(comissao.valorComissao)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(comissao.status)} text-white flex items-center gap-1 w-fit`}>
                          {getStatusIcon(comissao.status)}
                          {comissao.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {comissao.origemContasReceber && (
                          <Badge className="bg-purple-500 text-white text-xs">
                            <ArrowDownCircle className="h-3 w-3 mr-1" />
                            Contas a Receber
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => openEditComissao(comissao)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendedores" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendedores.map((vendedor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {vendedor.nome}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total em Vendas:</span>
                    <span className="font-bold">{formatCurrency(vendedor.totalVendas)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Comissões:</span>
                    <span className="font-bold text-primary">{formatCurrency(vendedor.totalComissoes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">% Médio:</span>
                    <span className="font-bold">{formatPercent(vendedor.percentualMedio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pendentes:</span>
                    <Badge variant="secondary">{vendedor.vendasPendentes}</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <NovaComissaoModal />
    </div>
  );
};

export default ComissoesPagarView;
