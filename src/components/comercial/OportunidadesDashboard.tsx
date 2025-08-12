
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import OportunidadeForm from "./OportunidadeForm";
import { ExportTable } from "@/components/shared/ExportTable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Oportunidade {
  id: number;
  numero: string;
  cliente: string;
  vendedor: string;
  valor: number;
  status: 'aberta' | 'em_andamento' | 'fechada' | 'perdida';
  dataAbertura: string;
  dataFechamento?: string;
  observacoes?: string;
}

const oportunidadesMock: Oportunidade[] = [
  {
    id: 1,
    numero: "OPO-2024-001",
    cliente: "Empresa ABC Ltda",
    vendedor: "João Silva",
    valor: 15000,
    status: "em_andamento",
    dataAbertura: "2024-01-15",
    observacoes: "Cliente interessado em produtos para laboratório"
  },
  {
    id: 2,
    numero: "OPO-2024-002", 
    cliente: "Indústria XYZ S.A.",
    vendedor: "Maria Santos",
    valor: 28500,
    status: "fechada",
    dataAbertura: "2024-01-10",
    dataFechamento: "2024-01-25"
  },
  {
    id: 3,
    numero: "OPO-2024-003",
    cliente: "Hospital Central",
    vendedor: "Pedro Costa",
    valor: 42000,
    status: "aberta",
    dataAbertura: "2024-01-20"
  },
  {
    id: 4,
    numero: "OPO-2024-004",
    cliente: "Farmácia Popular",
    vendedor: "Ana Oliveira",
    valor: 8750,
    status: "perdida",
    dataAbertura: "2024-01-08",
    dataFechamento: "2024-01-22"
  }
];

export const OportunidadesDashboard = () => {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>(oportunidadesMock);
  const [busca, setBusca] = useState("");
  const [novaOportunidadeOpen, setNovaOportunidadeOpen] = useState(false);

  const oportunidadesFiltradas = useMemo(() => {
    return oportunidades.filter(oportunidade => {
      const matchBusca = !busca || 
        oportunidade.numero.toLowerCase().includes(busca.toLowerCase()) ||
        oportunidade.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        oportunidade.vendedor.toLowerCase().includes(busca.toLowerCase());

      return matchBusca;
    });
  }, [oportunidades, busca]);

  const estatisticas = useMemo(() => {
    const total = oportunidadesFiltradas.length;
    const abertas = oportunidadesFiltradas.filter(o => o.status === 'aberta').length;
    const emAndamento = oportunidadesFiltradas.filter(o => o.status === 'em_andamento').length;
    const fechadas = oportunidadesFiltradas.filter(o => o.status === 'fechada').length;
    const valorTotal = oportunidadesFiltradas.reduce((acc, o) => acc + o.valor, 0);

    return { total, abertas, emAndamento, fechadas, valorTotal };
  }, [oportunidadesFiltradas]);

  const getStatusBadge = (status: string) => {
    const variants = {
      aberta: { variant: "outline" as const, label: "Aberta" },
      em_andamento: { variant: "default" as const, label: "Em Andamento" },
      fechada: { variant: "secondary" as const, label: "Fechada" },
      perdida: { variant: "destructive" as const, label: "Perdida" }
    };
    
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleNovaOportunidade = (data: any) => {
    const novaOportunidade: Oportunidade = {
      id: Math.max(...oportunidades.map(o => o.id)) + 1,
      numero: `OPO-2024-${String(oportunidades.length + 1).padStart(3, '0')}`,
      cliente: data.cliente || "Cliente não informado",
      vendedor: data.vendedor || "Vendedor não informado",
      valor: data.valor || 0,
      status: "aberta",
      dataAbertura: new Date().toISOString().split('T')[0],
      observacoes: data.observacoes
    };
    setOportunidades([...oportunidades, novaOportunidade]);
    setNovaOportunidadeOpen(false);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return "-";
    }
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-biodina-blue" />
          <h2 className="text-2xl font-bold text-biodina-blue">Oportunidades</h2>
        </div>
        <Button onClick={() => setNovaOportunidadeOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Oportunidade
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Oportunidades</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {estatisticas.abertas}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {estatisticas.emAndamento}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fechadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {estatisticas.fechadas}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(estatisticas.valorTotal)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por número, cliente ou vendedor..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <ExportTable 
          data={oportunidadesFiltradas} 
          filename={`oportunidades-${format(new Date(), "yyyy-MM-dd")}.csv`}
        />
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Data Fechamento</TableHead>
                  <TableHead>Observações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oportunidadesFiltradas.map((oportunidade) => (
                  <TableRow key={oportunidade.id}>
                    <TableCell className="font-medium">
                      {oportunidade.numero}
                    </TableCell>
                    <TableCell>{oportunidade.cliente}</TableCell>
                    <TableCell>{oportunidade.vendedor}</TableCell>
                    <TableCell>{formatCurrency(oportunidade.valor)}</TableCell>
                    <TableCell>{getStatusBadge(oportunidade.status)}</TableCell>
                    <TableCell>{formatDate(oportunidade.dataAbertura)}</TableCell>
                    <TableCell>{formatDate(oportunidade.dataFechamento)}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {oportunidade.observacoes || "-"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Nova Oportunidade */}
      {novaOportunidadeOpen && (
        <OportunidadeForm
          onClose={() => setNovaOportunidadeOpen(false)}
          onSave={handleNovaOportunidade}
        />
      )}
    </div>
  );
};
