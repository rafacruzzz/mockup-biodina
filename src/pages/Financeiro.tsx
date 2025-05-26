
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  CreditCard, Banknote, Wallet, Building, CheckCircle, FileText,
  Plus, Search, Edit, Calendar, TrendingUp, TrendingDown, DollarSign,
  AlertTriangle, Clock
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState('pagar');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPeriodo, setFilterPeriodo] = useState('mes');

  // Dados das contas a pagar
  const contasPagar = [
    { 
      id: 'CP001', 
      fornecedor: 'Fornecedor A', 
      descricao: 'Material de escritório', 
      valor: 2500.00, 
      vencimento: '2025-01-25',
      status: 'Pendente',
      categoria: 'Despesa Operacional'
    },
    { 
      id: 'CP002', 
      fornecedor: 'Energia Elétrica', 
      descricao: 'Conta de luz - Janeiro', 
      valor: 4800.00, 
      vencimento: '2025-01-15',
      status: 'Vencido',
      categoria: 'Utilidades'
    },
    { 
      id: 'CP003', 
      fornecedor: 'Fornecedor B', 
      descricao: 'Matéria prima', 
      valor: 15000.00, 
      vencimento: '2025-02-10',
      status: 'Pago',
      categoria: 'Produção'
    },
  ];

  // Dados das contas a receber
  const contasReceber = [
    { 
      id: 'CR001', 
      cliente: 'Cliente A', 
      descricao: 'Venda de produtos', 
      valor: 8500.00, 
      vencimento: '2025-01-20',
      status: 'Pendente',
      vendedor: 'João Silva'
    },
    { 
      id: 'CR002', 
      cliente: 'Cliente B', 
      descricao: 'Prestação de serviços', 
      valor: 12000.00, 
      vencimento: '2025-01-30',
      status: 'Recebido',
      vendedor: 'Maria Santos'
    },
    { 
      id: 'CR003', 
      cliente: 'Cliente C', 
      descricao: 'Venda de equipamentos', 
      valor: 25000.00, 
      vencimento: '2025-01-10',
      status: 'Vencido',
      vendedor: 'Carlos Oliveira'
    },
  ];

  // Dados do fluxo de caixa
  const fluxoCaixa = [
    { data: '01/01', entradas: 45000, saidas: 32000, saldo: 13000 },
    { data: '02/01', entradas: 52000, saidas: 28000, saldo: 37000 },
    { data: '03/01', entradas: 48000, saidas: 35000, saldo: 50000 },
    { data: '04/01', entradas: 65000, saidas: 42000, saldo: 73000 },
    { data: '05/01', entradas: 38000, saidas: 29000, saldo: 82000 },
    { data: '06/01', entradas: 71000, saidas: 51000, saldo: 102000 },
    { data: '07/01', entradas: 58000, saidas: 33000, saldo: 127000 },
  ];

  // Dados dos bancos
  const contas = [
    { 
      banco: 'Banco do Brasil', 
      agencia: '1234-5', 
      conta: '67890-1', 
      tipo: 'Corrente',
      saldo: 285000.00,
      status: 'Ativa'
    },
    { 
      banco: 'Caixa Econômica', 
      agencia: '9876-5', 
      conta: '54321-0', 
      tipo: 'Poupança',
      saldo: 125000.00,
      status: 'Ativa'
    },
    { 
      banco: 'Itaú', 
      agencia: '5555-5', 
      conta: '11111-1', 
      tipo: 'Corrente',
      saldo: 95000.00,
      status: 'Ativa'
    },
  ];

  // Dados da DRE
  const dreData = [
    { mes: 'Jul', receita: 450000, despesa: 320000, lucro: 130000 },
    { mes: 'Ago', receita: 520000, despesa: 365000, lucro: 155000 },
    { mes: 'Set', receita: 480000, despesa: 340000, lucro: 140000 },
    { mes: 'Out', receita: 620000, despesa: 425000, lucro: 195000 },
    { mes: 'Nov', receita: 580000, despesa: 390000, lucro: 190000 },
    { mes: 'Dez', receita: 750000, despesa: 485000, lucro: 265000 },
  ];

  // Dados de conciliação
  const conciliacaoData = [
    { conta: 'Banco do Brasil', extrato: 285000, sistema: 285000, diferenca: 0, status: 'Conciliado' },
    { conta: 'Caixa Econômica', extrato: 125500, sistema: 125000, diferenca: 500, status: 'Divergente' },
    { conta: 'Itaú', extrato: 95000, sistema: 95000, diferenca: 0, status: 'Conciliado' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
      case 'Recebido':
      case 'Conciliado':
      case 'Ativa': 
        return 'bg-green-500';
      case 'Pendente': 
        return 'bg-yellow-500';
      case 'Vencido':
      case 'Divergente': 
        return 'bg-red-500';
      default: 
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
      case 'Recebido':
      case 'Conciliado':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pendente':
        return <Clock className="h-4 w-4" />;
      case 'Vencido':
      case 'Divergente':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderContasPagar = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Contas a Pagar
          </CardTitle>
          <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Pesquisar contas..." className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="vencido">Vencido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contasPagar.map((conta) => (
              <TableRow key={conta.id}>
                <TableCell className="font-medium">{conta.id}</TableCell>
                <TableCell>{conta.fornecedor}</TableCell>
                <TableCell>{conta.descricao}</TableCell>
                <TableCell>{formatCurrency(conta.valor)}</TableCell>
                <TableCell>{conta.vencimento}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(conta.status)} text-white flex items-center gap-1 w-fit`}>
                    {getStatusIcon(conta.status)}
                    {conta.status}
                  </Badge>
                </TableCell>
                <TableCell>{conta.categoria}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderContasReceber = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            Contas a Receber
          </CardTitle>
          <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Pesquisar contas..." className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="recebido">Recebido</SelectItem>
              <SelectItem value="vencido">Vencido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contasReceber.map((conta) => (
              <TableRow key={conta.id}>
                <TableCell className="font-medium">{conta.id}</TableCell>
                <TableCell>{conta.cliente}</TableCell>
                <TableCell>{conta.descricao}</TableCell>
                <TableCell>{formatCurrency(conta.valor)}</TableCell>
                <TableCell>{conta.vencimento}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(conta.status)} text-white flex items-center gap-1 w-fit`}>
                    {getStatusIcon(conta.status)}
                    {conta.status}
                  </Badge>
                </TableCell>
                <TableCell>{conta.vendedor}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderCaixa = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entradas do Mês</p>
                <p className="text-2xl font-bold text-green-600">R$ 427.000</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saídas do Mês</p>
                <p className="text-2xl font-bold text-red-600">R$ 270.000</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
                <p className="text-2xl font-bold text-biodina-blue">R$ 505.000</p>
              </div>
              <Wallet className="h-8 w-8 text-biodina-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Fluxo de Caixa - Últimos 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={fluxoCaixa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis tickFormatter={(value) => `R$ ${(value / 1000)}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Area type="monotone" dataKey="entradas" stackId="1" stroke="#22c55e" fill="#22c55e" name="Entradas" />
              <Area type="monotone" dataKey="saidas" stackId="2" stroke="#ef4444" fill="#ef4444" name="Saídas" />
              <Line type="monotone" dataKey="saldo" stroke="#0A2342" strokeWidth={3} name="Saldo" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderBancos = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Contas Bancárias
          </CardTitle>
          <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Conta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contas.map((conta, index) => (
            <Card key={index} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{conta.banco}</h4>
                    <p className="text-sm text-gray-600">{conta.tipo}</p>
                  </div>
                  <Badge className={`${getStatusColor(conta.status)} text-white`}>
                    {conta.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Agência:</span>
                    <span className="text-sm font-medium">{conta.agencia}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conta:</span>
                    <span className="text-sm font-medium">{conta.conta}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm text-gray-600">Saldo:</span>
                    <span className="text-lg font-bold text-biodina-blue">
                      {formatCurrency(conta.saldo)}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderConciliacao = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Conciliação Bancária
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conta</TableHead>
              <TableHead>Saldo Extrato</TableHead>
              <TableHead>Saldo Sistema</TableHead>
              <TableHead>Diferença</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conciliacaoData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.conta}</TableCell>
                <TableCell>{formatCurrency(item.extrato)}</TableCell>
                <TableCell>{formatCurrency(item.sistema)}</TableCell>
                <TableCell className={item.diferenca !== 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                  {formatCurrency(item.diferenca)}
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(item.status)} text-white flex items-center gap-1 w-fit`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Conciliar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderDRE = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Demonstrativo de Resultado (DRE)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000)}k`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="receita" fill="#22c55e" name="Receita" />
            <Bar dataKey="despesa" fill="#ef4444" name="Despesa" />
            <Bar dataKey="lucro" fill="#0A2342" name="Lucro Líquido" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const tabs = [
    { id: 'pagar', label: 'Contas a Pagar', icon: CreditCard },
    { id: 'receber', label: 'Contas a Receber', icon: Banknote },
    { id: 'caixa', label: 'Caixa', icon: Wallet },
    { id: 'bancos', label: 'Bancos', icon: Building },
    { id: 'conciliacao', label: 'Conciliação', icon: CheckCircle },
    { id: 'dre', label: 'DRE', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pagar': return renderContasPagar();
      case 'receber': return renderContasReceber();
      case 'caixa': return renderCaixa();
      case 'bancos': return renderBancos();
      case 'conciliacao': return renderConciliacao();
      case 'dre': return renderDRE();
      default: return renderContasPagar();
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Financeiro</h1>
          <p className="text-gray-600">Controle financeiro completo da empresa</p>
        </header>

        {/* Navegação por abas */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-biodina-blue text-biodina-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo da aba ativa */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Financeiro;
