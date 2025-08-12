
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { HandCoins, Plus, RotateCcw, Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { emprestimosData, getEstatisticasEmprestimos } from "@/data/emprestimosData";
import { Emprestimo, EmprestimoStatus, FiltrosEmprestimo } from "@/types/emprestimos";
import { NovoEmprestimoModal } from "./NovoEmprestimoModal";
import { DevolucaoEmprestimoModal } from "./DevolucaoEmprestimoModal";
import { FiltrosEmprestimos } from "./FiltrosEmprestimos";
import { ExportTable } from "@/components/shared/ExportTable";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const EmprestimosDashboard = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>(emprestimosData);
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState<FiltrosEmprestimo>({});
  const [novoEmprestimoOpen, setNovoEmprestimoOpen] = useState(false);
  const [devolucaoOpen, setDevolucaoOpen] = useState(false);
  const [emprestimoSelecionado, setEmprestimoSelecionado] = useState<Emprestimo | null>(null);

  const emprestimosFiltrados = useMemo(() => {
    return emprestimos.filter(emprestimo => {
      const matchBusca = !busca || 
        emprestimo.nomeCliente.toLowerCase().includes(busca.toLowerCase()) ||
        emprestimo.cnpjCliente.includes(busca) ||
        emprestimo.numeroProcesso.toLowerCase().includes(busca.toLowerCase()) ||
        emprestimo.descricaoProdutoEmprestado.toLowerCase().includes(busca.toLowerCase());

      const matchStatus = !filtros.status?.length || filtros.status.includes(emprestimo.status);
      
      const matchCliente = !filtros.cliente || 
        emprestimo.nomeCliente.toLowerCase().includes(filtros.cliente.toLowerCase()) ||
        emprestimo.cnpjCliente.includes(filtros.cliente);
      
      const matchProduto = !filtros.produto ||
        emprestimo.referenciaProdutoEmprestado.toLowerCase().includes(filtros.produto.toLowerCase()) ||
        emprestimo.descricaoProdutoEmprestado.toLowerCase().includes(filtros.produto.toLowerCase());

      const matchDataInicio = !filtros.dataInicio || emprestimo.dataEmprestimo >= filtros.dataInicio;
      const matchDataFim = !filtros.dataFim || emprestimo.dataEmprestimo <= filtros.dataFim;
      
      const matchValorMin = !filtros.valorMinimo || emprestimo.valorEmprestimoDolar >= filtros.valorMinimo;
      const matchValorMax = !filtros.valorMaximo || emprestimo.valorEmprestimoDolar <= filtros.valorMaximo;

      return matchBusca && matchStatus && matchCliente && matchProduto && 
             matchDataInicio && matchDataFim && matchValorMin && matchValorMax;
    });
  }, [emprestimos, busca, filtros]);

  const estatisticas = getEstatisticasEmprestimos(emprestimosFiltrados);

  const getStatusBadge = (status: EmprestimoStatus) => {
    const variants = {
      [EmprestimoStatus.ATIVO]: { variant: "default" as const, label: "Ativo" },
      [EmprestimoStatus.DEVOLVIDO]: { variant: "secondary" as const, label: "Devolvido" },
      [EmprestimoStatus.PARCIAL]: { variant: "outline" as const, label: "Parcial" },
      [EmprestimoStatus.VENCIDO]: { variant: "destructive" as const, label: "Vencido" }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleNovoEmprestimo = (novoEmprestimo: Omit<Emprestimo, 'id'>) => {
    const emprestimo: Emprestimo = {
      ...novoEmprestimo,
      id: Math.max(...emprestimos.map(e => e.id)) + 1
    };
    setEmprestimos([...emprestimos, emprestimo]);
  };

  const handleDevolucao = (emprestimoAtualizado: Emprestimo) => {
    setEmprestimos(emprestimos.map(emp => 
      emp.id === emprestimoAtualizado.id ? emprestimoAtualizado : emp
    ));
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return "-";
    }
  };

  const formatCurrency = (value: number | undefined) => {
    if (!value) return "-";
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const abrirDevolucao = (emprestimo: Emprestimo) => {
    setEmprestimoSelecionado(emprestimo);
    setDevolucaoOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HandCoins className="h-6 w-6 text-biodina-blue" />
          <h2 className="text-2xl font-bold text-biodina-blue">Empréstimos</h2>
        </div>
        <Button onClick={() => setNovoEmprestimoOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Empréstimos</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalEmprestimos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Emprestado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(estatisticas.valorTotalEmprestado)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Devolvido</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(estatisticas.valorTotalDevolvido)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {estatisticas.emprestimosAtivos}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {estatisticas.emprestimosVencidos}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <FiltrosEmprestimos
        filtros={filtros}
        onFiltrosChange={setFiltros}
        onLimparFiltros={() => setFiltros({})}
      />

      {/* Busca e Ações */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por cliente, CNPJ, processo ou produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>
        <ExportTable 
          data={emprestimosFiltrados} 
          filename={`emprestimos-${format(new Date(), "yyyy-MM-dd")}.csv`}
        />
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Processo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Produto Emprestado</TableHead>
                  <TableHead>Valor (USD)</TableHead>
                  <TableHead>Data Empréstimo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Retorno</TableHead>
                  <TableHead>Valor Retornado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emprestimosFiltrados.map((emprestimo) => (
                  <TableRow key={emprestimo.id}>
                    <TableCell className="font-medium">
                      {emprestimo.numeroProcesso}
                    </TableCell>
                    <TableCell>{emprestimo.nomeCliente}</TableCell>
                    <TableCell>{emprestimo.cnpjCliente}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{emprestimo.referenciaProdutoEmprestado}</div>
                        <div className="text-sm text-muted-foreground">
                          {emprestimo.descricaoProdutoEmprestado}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(emprestimo.valorEmprestimoDolar)}</TableCell>
                    <TableCell>{formatDate(emprestimo.dataEmprestimo)}</TableCell>
                    <TableCell>{getStatusBadge(emprestimo.status)}</TableCell>
                    <TableCell>{formatDate(emprestimo.dataRetorno)}</TableCell>
                    <TableCell>{formatCurrency(emprestimo.valorRetornadoDolar)}</TableCell>
                    <TableCell>
                      {emprestimo.status === EmprestimoStatus.ATIVO && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => abrirDevolucao(emprestimo)}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Devolução
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoEmprestimoModal
        isOpen={novoEmprestimoOpen}
        onClose={() => setNovoEmprestimoOpen(false)}
        onSubmit={handleNovoEmprestimo}
      />

      <DevolucaoEmprestimoModal
        isOpen={devolucaoOpen}
        onClose={() => setDevolucaoOpen(false)}
        emprestimo={emprestimoSelecionado}
        onSubmit={handleDevolucao}
      />
    </div>
  );
};
