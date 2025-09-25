import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  FileText, 
  Calendar, 
  DollarSign, 
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Upload,
  Download
} from "lucide-react";

const FechamentoCambioView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [mesaFilter, setMesaFilter] = useState("todas");

  // Dados mock para fechamentos de câmbio
  const fechamentosCambio = [
    {
      id: 1,
      numero_operacao: "CAM-2024-001",
      processo: "PROC-IMP-001",
      mesa_cambio: "BTG Pactual",
      data_fechamento: "2024-01-15",
      valor_usd: 125000.00,
      taxa_dia: 5.05,
      taxa_fechamento: 5.02,
      valor_brl: 627500.00,
      variacao: -0.59,
      status: "fechado",
      documentos: 2
    },
    {
      id: 2,
      numero_operacao: "CAM-2024-002",
      processo: "PROC-IMP-002",
      mesa_cambio: "Itaú BBA",
      data_fechamento: "2024-01-18",
      valor_usd: 85000.00,
      taxa_dia: 5.08,
      taxa_fechamento: 5.10,
      valor_brl: 433500.00,
      variacao: 0.39,
      status: "liquidado",
      documentos: 3
    },
    {
      id: 3,
      numero_operacao: "CAM-2024-003",
      processo: "PROC-IMP-003",
      mesa_cambio: "XP Investimentos",
      data_fechamento: "2024-01-20",
      valor_usd: 45000.00,
      taxa_dia: 5.12,
      taxa_fechamento: 5.11,
      valor_brl: 229950.00,
      variacao: -0.20,
      status: "pendente",
      documentos: 1
    }
  ];

  const disPendentes = [
    {
      id: 1,
      numero_di: "DI-2024-004",
      processo: "PROC-IMP-004",
      exportador: "Medical Corp USA",
      valor_usd: 75000.00,
      data_chegada: "2024-02-01",
      urgencia: "alta"
    },
    {
      id: 2,
      numero_di: "DI-2024-005",
      processo: "PROC-IMP-005",
      exportador: "European Medical Ltd",
      valor_usd: 120000.00,
      data_chegada: "2024-02-05",
      urgencia: "media"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'liquidado': return 'bg-green-500';
      case 'fechado': return 'bg-blue-500';
      case 'pendente': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'liquidado': return 'Liquidado';
      case 'fechado': return 'Fechado';
      case 'pendente': return 'Pendente';
      default: return status;
    }
  };

  const getVariacaoIcon = (variacao: number) => {
    return variacao >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getVariacaoColor = (variacao: number) => {
    return variacao >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'alta': return 'border-l-red-500 bg-red-50';
      case 'media': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-green-500 bg-green-50';
    }
  };

  const formatCurrency = (value: number, currency: 'USD' | 'BRL') => {
    const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'pt-BR', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(value);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const totalUSD = fechamentosCambio.reduce((sum, f) => sum + f.valor_usd, 0);
  const totalBRL = fechamentosCambio.reduce((sum, f) => sum + f.valor_brl, 0);
  const operacoesPendentes = fechamentosCambio.filter(f => f.status === 'pendente').length;
  const operacoesLiquidadas = fechamentosCambio.filter(f => f.status === 'liquidado').length;

  const filteredFechamentos = fechamentosCambio.filter(fechamento => {
    const matchesSearch = fechamento.numero_operacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fechamento.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fechamento.mesa_cambio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || fechamento.status === statusFilter;
    const matchesMesa = mesaFilter === 'todas' || fechamento.mesa_cambio === mesaFilter;
    return matchesSearch && matchesStatus && matchesMesa;
  });

  const mesasCambio = [...new Set(fechamentosCambio.map(f => f.mesa_cambio))];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-biodina-blue mb-2">Fechamento de Câmbio</h1>
        <p className="text-gray-600">Gerencie operações de câmbio e contratos</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Fechado USD
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
              Total Fechado BRL
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
              Operações Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">
              {operacoesPendentes}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Operações Liquidadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">
              {operacoesLiquidadas}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="operacoes" className="w-full">
        <TabsList>
          <TabsTrigger value="operacoes">Operações de Câmbio</TabsTrigger>
          <TabsTrigger value="pendentes">DIs Pendentes</TabsTrigger>
          <TabsTrigger value="contratos">Contratos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="operacoes" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-1 min-w-64">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar por operação, processo ou mesa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                    <SelectItem value="liquidado">Liquidado</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={mesaFilter} onValueChange={setMesaFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Mesa de Câmbio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as Mesas</SelectItem>
                    {mesasCambio.map(mesa => (
                      <SelectItem key={mesa} value={mesa}>{mesa}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Operação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Operações */}
          <Card>
            <CardHeader>
              <CardTitle>Operações de Câmbio</CardTitle>
              <CardDescription>
                Histórico de fechamentos e operações de câmbio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operação / Processo</TableHead>
                    <TableHead>Mesa de Câmbio</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor USD</TableHead>
                    <TableHead>Taxa Dia</TableHead>
                    <TableHead>Taxa Fechamento</TableHead>
                    <TableHead>Variação</TableHead>
                    <TableHead className="text-right">Valor BRL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Docs</TableHead>
                    <TableHead className="w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFechamentos.map((fechamento) => (
                    <TableRow key={fechamento.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{fechamento.numero_operacao}</div>
                          <div className="text-sm text-gray-500">{fechamento.processo}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          {fechamento.mesa_cambio}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(fechamento.data_fechamento).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(fechamento.valor_usd, 'USD')}
                      </TableCell>
                      <TableCell className="font-mono">
                        R$ {fechamento.taxa_dia.toFixed(4)}
                      </TableCell>
                      <TableCell className="font-mono font-medium">
                        R$ {fechamento.taxa_fechamento.toFixed(4)}
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${getVariacaoColor(fechamento.variacao)}`}>
                          {getVariacaoIcon(fechamento.variacao)}
                          <span className="font-medium">{formatPercent(fechamento.variacao)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {formatCurrency(fechamento.valor_brl, 'BRL')}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(fechamento.status)}>
                          {getStatusLabel(fechamento.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          {fechamento.documentos}
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

        <TabsContent value="pendentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DIs Pendentes de Fechamento de Câmbio</CardTitle>
              <CardDescription>
                Declarações de importação que necessitam fechamento de câmbio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {disPendentes.map((di) => (
                  <Card key={di.id} className={`border-l-4 ${getUrgenciaColor(di.urgencia)}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-biodina-blue">{di.numero_di}</h4>
                          <p className="text-sm text-gray-600">{di.exportador}</p>
                          <p className="text-xs text-gray-500">Processo: {di.processo}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-lg">{formatCurrency(di.valor_usd, 'USD')}</div>
                          <div className="text-sm text-gray-500">
                            Chegada: {new Date(di.data_chegada).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="mt-2">
                            <Button size="sm">
                              Fechar Câmbio
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contratos">
          <Card>
            <CardHeader>
              <CardTitle>Contratos de Câmbio</CardTitle>
              <CardDescription>
                Gestão de contratos e documentos de câmbio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Upload e gestão de contratos de câmbio</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Câmbio</CardTitle>
              <CardDescription>
                Análises e relatórios de fechamento de câmbio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Funcionalidade em desenvolvimento</p>
                <p className="text-sm">Relatórios de performance e análise de câmbio</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FechamentoCambioView;