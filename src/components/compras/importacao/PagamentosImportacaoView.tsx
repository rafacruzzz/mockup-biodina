import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Upload, 
  FileText, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter
} from "lucide-react";

const PagamentosImportacaoView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Dados mock para pagamentos de importação
  const pagamentos = [
    {
      id: 1,
      numero_pi: "PI-2024-001",
      processo: "PROC-IMP-001",
      fornecedor: "Radiometer Medical ApS",
      valor_usd: 125000.00,
      valor_brl: 625000.00,
      data_vencimento: "2024-02-15",
      status: "programado",
      forma_pagamento: "prazo",
      prazo_dias: 60,
      comprovantes: 2
    },
    {
      id: 2,
      numero_pi: "PI-2024-002",
      processo: "PROC-IMP-002",
      fornecedor: "Nova Biomedical Corp",
      valor_usd: 85000.00,
      valor_brl: 425000.00,
      data_vencimento: "2024-01-25",
      status: "atrasado",
      forma_pagamento: "antecipado",
      prazo_dias: 0,
      comprovantes: 0
    },
    {
      id: 3,
      numero_pi: "PI-2024-003",
      processo: "PROC-IMP-003",
      fornecedor: "Medical Equipment Ltd",
      valor_usd: 45000.00,
      valor_brl: 225000.00,
      data_vencimento: "2024-02-28",
      status: "pago",
      forma_pagamento: "parcelado",
      prazo_dias: 90,
      comprovantes: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-500';
      case 'programado': return 'bg-blue-500';
      case 'pendente': return 'bg-yellow-500';
      case 'atrasado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pago': return 'Pago';
      case 'programado': return 'Programado';
      case 'pendente': return 'Pendente';
      case 'atrasado': return 'Em Atraso';
      default: return status;
    }
  };

  const formatCurrency = (value: number, currency: 'USD' | 'BRL') => {
    const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'pt-BR', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(value);
  };

  const totalUSD = pagamentos.reduce((sum, p) => sum + p.valor_usd, 0);
  const totalBRL = pagamentos.reduce((sum, p) => sum + p.valor_brl, 0);
  const pagamentosPendentes = pagamentos.filter(p => p.status !== 'pago').length;
  const pagamentosAtrasados = pagamentos.filter(p => p.status === 'atrasado').length;

  const filteredPagamentos = pagamentos.filter(pagamento => {
    const matchesSearch = pagamento.numero_pi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pagamento.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pagamento.processo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || pagamento.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-biodina-blue mb-2">Pagamentos de Importação</h1>
        <p className="text-gray-600">Gerencie pagamentos internacionais e documentos relacionados</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total USD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(totalUSD, 'USD')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
              Total BRL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(totalBRL, 'BRL')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">
              {pagamentosPendentes}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Em Atraso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">
              {pagamentosAtrasados}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList>
          <TabsTrigger value="lista">Lista de Pagamentos</TabsTrigger>
          <TabsTrigger value="programacao">Programação</TabsTrigger>
          <TabsTrigger value="comprovantes">Comprovantes</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-1 min-w-64">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por PI, fornecedor ou processo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="programado">Programado</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="atrasado">Em Atraso</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Pagamento
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Pagamentos */}
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Programados</CardTitle>
              <CardDescription>
                Lista de todos os pagamentos de importação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PI / Processo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-right">Valor USD</TableHead>
                    <TableHead className="text-right">Valor BRL</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Forma</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comprovantes</TableHead>
                    <TableHead className="w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPagamentos.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{pagamento.numero_pi}</div>
                          <div className="text-sm text-gray-500">{pagamento.processo}</div>
                        </div>
                      </TableCell>
                      <TableCell>{pagamento.fornecedor}</TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(pagamento.valor_usd, 'USD')}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(pagamento.valor_brl, 'BRL')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(pagamento.data_vencimento).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {pagamento.forma_pagamento}
                          {pagamento.prazo_dias > 0 && ` (${pagamento.prazo_dias}d)`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pagamento.status)}>
                          {getStatusLabel(pagamento.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          {pagamento.comprovantes}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programacao">
          <Card>
            <CardHeader>
              <CardTitle>Programação de Pagamentos</CardTitle>
              <CardDescription>
                Configure e gerencie a programação de pagamentos internacionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Sistema de programação automática de pagamentos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comprovantes">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Comprovantes</CardTitle>
              <CardDescription>
                Upload e gestão de comprovantes SWIFT e bancários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Sistema de upload e validação de documentos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PagamentosImportacaoView;