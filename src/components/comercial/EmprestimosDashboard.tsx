
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { mockEmprestimos, getTotalSaldoDevedor } from "@/data/emprestimosModules";
import { StatusEmprestimo } from "@/types/emprestimos";
import NovoEmprestimoModal from "./NovoEmprestimoModal";
import DevolucaoEmprestimoModal from "./DevolucaoEmprestimoModal";

const EmprestimosDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showDevolucaoModal, setShowDevolucaoModal] = useState(false);
  const [emprestimoSelecionado, setEmprestimoSelecionado] = useState<number | null>(null);

  const getStatusBadge = (status: StatusEmprestimo) => {
    const statusConfig = {
      [StatusEmprestimo.ATIVO]: { label: "Ativo", className: "bg-blue-100 text-blue-800" },
      [StatusEmprestimo.PARCIALMENTE_DEVOLVIDO]: { label: "Parcial", className: "bg-orange-100 text-orange-800" },
      [StatusEmprestimo.QUITADO]: { label: "Quitado", className: "bg-green-100 text-green-800" },
      [StatusEmprestimo.VENCIDO]: { label: "Vencido", className: "bg-red-100 text-red-800" }
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredEmprestimos = mockEmprestimos.filter(emprestimo => {
    const matchesSearch = searchTerm === "" || 
      emprestimo.numero_processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emprestimo.cnpj_cliente.includes(searchTerm);
    
    const matchesStatus = statusFilter === "todos" || emprestimo.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDevolucao = (emprestimoId: number) => {
    setEmprestimoSelecionado(emprestimoId);
    setShowDevolucaoModal(true);
  };

  const totalEmprestimos = mockEmprestimos.length;
  const emprestimosAtivos = mockEmprestimos.filter(e => e.status === StatusEmprestimo.ATIVO).length;
  const totalSaldoDevedor = getTotalSaldoDevedor();

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-biodina-blue" />
              <div>
                <p className="text-2xl font-bold">{totalEmprestimos}</p>
                <p className="text-sm text-gray-600">Total de Empréstimos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{emprestimosAtivos}</p>
                <p className="text-sm text-gray-600">Empréstimos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">US$ {totalSaldoDevedor.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Saldo Devedor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {mockEmprestimos.filter(e => e.status === StatusEmprestimo.QUITADO).length}
                </p>
                <p className="text-sm text-gray-600">Quitados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestão de Empréstimos</CardTitle>
            <Button onClick={() => setShowNovoModal(true)} className="bg-biodina-blue hover:bg-biodina-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Empréstimo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por processo, cliente ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value={StatusEmprestimo.ATIVO}>Ativo</SelectItem>
                <SelectItem value={StatusEmprestimo.PARCIALMENTE_DEVOLVIDO}>Parcialmente Devolvido</SelectItem>
                <SelectItem value={StatusEmprestimo.QUITADO}>Quitado</SelectItem>
                <SelectItem value={StatusEmprestimo.VENCIDO}>Vencido</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          {/* Tabela de Empréstimos */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº Processo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produto Emprestado</TableHead>
                  <TableHead>Valor (USD)</TableHead>
                  <TableHead>Data Empréstimo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Saldo Devedor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmprestimos.map((emprestimo) => (
                  <TableRow key={emprestimo.id}>
                    <TableCell className="font-medium">{emprestimo.numero_processo}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{emprestimo.nome_cliente}</p>
                        <p className="text-sm text-gray-500">{emprestimo.cnpj_cliente}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{emprestimo.referencia_produto_emprestado}</p>
                        <p className="text-sm text-gray-500">{emprestimo.descricao_produto_emprestado}</p>
                      </div>
                    </TableCell>
                    <TableCell>US$ {emprestimo.valor_emprestimo_dolar.toLocaleString()}</TableCell>
                    <TableCell>{new Date(emprestimo.data_emprestimo).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{getStatusBadge(emprestimo.status)}</TableCell>
                    <TableCell>
                      <span className={emprestimo.saldo_devedor && emprestimo.saldo_devedor > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                        US$ {(emprestimo.saldo_devedor || 0).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {emprestimo.status !== StatusEmprestimo.QUITADO && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDevolucao(emprestimo.id)}
                          >
                            Devolução
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          Detalhes
                        </Button>
                      </div>
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
        isOpen={showNovoModal}
        onOpenChange={setShowNovoModal}
      />

      {emprestimoSelecionado && (
        <DevolucaoEmprestimoModal
          emprestimoId={emprestimoSelecionado}
          isOpen={showDevolucaoModal}
          onOpenChange={setShowDevolucaoModal}
        />
      )}
    </div>
  );
};

export default EmprestimosDashboard;
