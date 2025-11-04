import React, { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SidebarLayout from "@/components/SidebarLayout";
import ContasPagarDashboard from "@/components/financeiro/ContasPagarDashboard";
import APagarPagosView from "@/components/financeiro/APagarPagosView";
import SuprimentosView from "@/components/financeiro/SuprimentosView";
import DespesasViagemServicosView from "@/components/financeiro/DespesasViagemServicosView";

import DocumentosFiscaisView from "@/components/financeiro/DocumentosFiscaisView";
import ComissoesPagarView from "@/components/financeiro/ComissoesPagarView";
import FaturamentoDashboard from "@/components/faturamento/FaturamentoDashboard";
import EntradaFaturamento from "@/components/faturamento/EntradaFaturamento";
import SaidaFaturamento from "@/components/faturamento/SaidaFaturamento";
import DevolucaoFaturamento from "@/components/faturamento/DevolucaoFaturamento";
import CancelamentoFaturamento from "@/components/faturamento/CancelamentoFaturamento";
import ServicosFaturamento from "@/components/faturamento/ServicosFaturamento";
import RelatoriosFaturamento from "@/components/faturamento/RelatoriosFaturamento";
import IndicadoresFaturamento from "@/components/faturamento/IndicadoresFaturamento";
import AssistenteFiscalIA from "@/components/faturamento/AssistenteFiscalIA";
import RodapeFaturamento from "@/components/faturamento/RodapeFaturamento";
import { 
  CreditCard, Banknote, Wallet, Building, CheckCircle, FileText,
  Plus, Search, Edit, Calendar, TrendingUp, TrendingDown, DollarSign,
  AlertTriangle, Clock, Vault, ArrowLeft, Receipt, Download, Upload,
  RefreshCw, X, Briefcase, BarChart3
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const Financeiro = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
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
    { 
      id: 'CP004', 
      fornecedor: 'Telecomunicações XYZ', 
      descricao: 'Internet e telefonia', 
      valor: 1200.00, 
      vencimento: '2025-01-30',
      status: 'Pendente',
      categoria: 'Utilidades'
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

  const renderContasPagar = () => <ContasPagarDashboard />;

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

  const mainModules = [
    {
      id: 'faturamento',
      title: 'Faturamento',
      description: 'Entrada, Saída, Devolução, Cancelamento, Serviços, Relatórios',
      icon: Receipt,
      subModules: [
        { id: 'dashboard_faturamento', title: 'Dashboard' },
        { id: 'entrada', title: 'Entrada' },
        { id: 'saida', title: 'Saída' },
        { id: 'devolucao', title: 'Devolução' },
        { id: 'cancelamento', title: 'Cancelamento' },
        { id: 'servicos', title: 'Serviços' },
        { id: 'relatorios', title: 'Relatórios' }
      ]
    },
    {
      id: 'contas_receber',
      title: 'Contas a Receber',
      description: 'Conciliação Entradas, A Receber, Canhotos, Pedidos, Cadastros, Relatórios',
      icon: Banknote,
      subModules: [
        { id: 'conciliacao_entradas', title: 'Conciliação Entradas' },
        { id: 'a_receber', title: 'A Receber' },
        { id: 'canhotos', title: 'Canhotos' },
        { id: 'pedidos', title: 'Pedidos' },
        { id: 'cadastros_receber', title: 'Cadastros' },
        { id: 'relatorios_receber', title: 'Relatórios' }
      ]
    },
    {
      id: 'contas_pagar',
      title: 'Contas a Pagar',
      description: 'A Pagar x Pagos, Uso e Consumo, Despesas de Viagem, Documentos Fiscais, Comissões',
      icon: CreditCard,
      subModules: [
        { id: 'a_pagar_pagos', title: 'A Pagar x Pagos' },
        { id: 'suprimentos', title: 'Uso e Consumo' },
        { id: 'despesas_viagem_servicos', title: 'Despesas de Viagem e Serviços' },
        { id: 'documentos_fiscais', title: 'Documentos Fiscais' },
        { id: 'comissoes_pagar', title: 'Comissões a Pagar' }
      ]
    },
    {
      id: 'tesouraria',
      title: 'Tesouraria',
      description: 'Caixa, Empréstimos, Investimentos, Seguros, Consórcios, Cadastros, Extratos, Doc. Fin, Saldos, Despesas a Serviço, Relatórios',
      icon: Vault,
      subModules: [
        { id: 'caixa', title: 'Caixa' },
        { id: 'emprestimos', title: 'Empréstimos' },
        { id: 'investimentos', title: 'Investimentos' },
        { id: 'seguros', title: 'Seguros' },
        { id: 'consorcios', title: 'Consórcios' },
        { id: 'cadastros_tesouraria', title: 'Cadastros' },
        { id: 'extratos', title: 'Extratos' },
        { id: 'doc_fin', title: 'Doc. Fin' },
        { id: 'saldos', title: 'Saldos' },
        { id: 'despesas_servico', title: 'Despesas a Serviço (Cartão de Crédito)' },
        { id: 'relatorios_tesouraria', title: 'Relatórios' }
      ]
    },
  ];

  const renderMainModules = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mainModules.map((module) => (
        <Card 
          key={module.id} 
          className="shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-biodina-gold group"
          onClick={() => setActiveModule(module.id)}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-biodina-gold/10 rounded-lg group-hover:bg-biodina-gold/20 transition-colors">
                <module.icon className="h-6 w-6 text-biodina-gold" />
              </div>
              <div>
                <CardTitle className="text-biodina-blue group-hover:text-biodina-gold transition-colors">
                  {module.title}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {module.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSubModules = () => {
    const currentModule = mainModules.find(m => m.id === activeModule);
    if (!currentModule) return null;

    // Renderização especial para Faturamento com seções organizadas
    if (activeModule === 'faturamento') {
      const faturamentoProdutos = [
        { id: 'entrada', title: 'Entrada', description: 'Lançar NF-e de compra ou importação', icon: Download },
        { id: 'saida', title: 'Saída', description: 'Emitir NF-e de venda ou remessa', icon: Upload },
        { id: 'devolucao', title: 'Devolução', description: 'Registrar devolução (cliente/fornecedor)', icon: RefreshCw },
        { id: 'cancelamento', title: 'Cancelamento', description: 'Cancelar nota ou inutilizar numeração', icon: X },
      ];

      const faturamentoServicos = [
        { id: 'servicos', title: 'Serviços (NFS-e)', description: 'Emitir notas de serviço', icon: Briefcase },
        { id: 'relatorios', title: 'Relatórios', description: 'Listar notas emitidas, impostos, rejeições', icon: BarChart3 },
      ];

      return (
        <div className="flex gap-6">
          {/* Conteúdo Principal */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-biodina-blue">{currentModule.title}</h2>
                <p className="text-muted-foreground">{currentModule.description}</p>
              </div>
            </div>

            <IndicadoresFaturamento />

            {/* Faturamento de Produtos */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-biodina-blue">Faturamento de Produtos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {faturamentoProdutos.map((modulo) => {
                  const IconComponent = modulo.icon;
                  return (
                    <Card 
                      key={modulo.id}
                      className="shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border hover:border-biodina-gold/50"
                      onClick={() => setActiveSubModule(modulo.id)}
                    >
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-biodina-blue">
                            {modulo.title}
                          </h3>
                          <IconComponent className="h-5 w-5 text-biodina-gold" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {modulo.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Faturamento de Serviços */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-biodina-blue">Faturamento de Serviços</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faturamentoServicos.map((modulo) => {
                  const IconComponent = modulo.icon;
                  return (
                    <Card 
                      key={modulo.id}
                      className="shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border hover:border-biodina-gold/50"
                      onClick={() => setActiveSubModule(modulo.id)}
                    >
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-biodina-blue">
                            {modulo.title}
                          </h3>
                          <IconComponent className="h-5 w-5 text-biodina-gold" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {modulo.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Rodapé com atalhos */}
            <RodapeFaturamento />
          </div>

          {/* Assistente Fiscal IA - Lateral Direita */}
          <div className="w-80 flex-shrink-0 sticky top-6 self-start">
            <AssistenteFiscalIA />
          </div>
        </div>
      );
    }

    // Renderização padrão para outros módulos
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveModule(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-biodina-blue">{currentModule.title}</h2>
            <p className="text-muted-foreground">{currentModule.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentModule.subModules.map((subModule) => (
            <Card 
              key={subModule.id}
              className="shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border hover:border-biodina-gold/50"
              onClick={() => setActiveSubModule(subModule.id)}
            >
              <CardContent className="p-6">
                <h3 className="font-semibold text-biodina-blue hover:text-biodina-gold transition-colors">
                  {subModule.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderSubModuleContent = () => {
    if (!activeSubModule) return null;

    // Map existing render functions to submodules
    switch (activeSubModule) {
      case 'a_receber':
      case 'canhotos':
      case 'conciliacao_entradas':
      case 'pedidos':
      case 'cadastros_receber':
      case 'relatorios_receber':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <h2 className="text-2xl font-bold text-biodina-blue">
                {mainModules.find(m => m.id === activeModule)?.subModules.find(s => s.id === activeSubModule)?.title}
              </h2>
            </div>
            {renderContasReceber()}
          </div>
        );
      case 'a_pagar_pagos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <APagarPagosView />
          </div>
        );
      case 'suprimentos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <SuprimentosView />
          </div>
        );
      case 'despesas_viagem_servicos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <DespesasViagemServicosView />
          </div>
        );
      case 'documentos_fiscais':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <DocumentosFiscaisView />
          </div>
        );
      case 'comissoes_pagar':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <ComissoesPagarView />
          </div>
        );
      case 'caixa':
        const GestaoCaixaView = lazy(() => import('@/components/tesouraria/GestaoCaixaView'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <GestaoCaixaView />
            </Suspense>
          </div>
        );
      case 'emprestimos':
        const GestaoEmprestimosView = lazy(() => import('@/components/tesouraria/GestaoEmprestimosView'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <GestaoEmprestimosView />
            </Suspense>
          </div>
        );
      case 'investimentos':
        const GestaoInvestimentosView = lazy(() => import('@/components/tesouraria/GestaoInvestimentosView'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <GestaoInvestimentosView />
            </Suspense>
          </div>
        );
      case 'seguros':
        const GestaoSegurosView = lazy(() => import('@/components/tesouraria/GestaoSegurosView'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <GestaoSegurosView />
            </Suspense>
          </div>
        );
        case 'consorcios':
        const GestaoConsorciosView = lazy(() => import('@/components/tesouraria/GestaoConsorciosView'));
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <Suspense fallback={<div>Carregando...</div>}>
              <GestaoConsorciosView />
            </Suspense>
          </div>
        );
      case 'cadastros_tesouraria':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Cadastros - Tesouraria</h2>
              <p className="text-muted-foreground">Módulo de cadastros da tesouraria em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'extratos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Extratos</h2>
              <p className="text-muted-foreground">Módulo de extratos em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'doc_fin':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Doc. Fin</h2>
              <p className="text-muted-foreground">Módulo de documentos financeiros em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'saldos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Saldos</h2>
              <p className="text-muted-foreground">Módulo de saldos em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'despesas_servico':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Despesas a Serviço (Cartão de Crédito)</h2>
              <p className="text-muted-foreground">Módulo de despesas a serviço em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'relatorios_tesouraria':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Relatórios - Tesouraria</h2>
              <p className="text-muted-foreground">Módulo de relatórios da tesouraria em desenvolvimento.</p>
            </div>
          </div>
        );
      case 'dashboard_faturamento':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <FaturamentoDashboard />
          </div>
        );
      case 'entrada':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <EntradaFaturamento />
          </div>
        );
      case 'saida':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <SaidaFaturamento />
          </div>
        );
      case 'devolucao':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <DevolucaoFaturamento />
          </div>
        );
      case 'cancelamento':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <CancelamentoFaturamento />
          </div>
        );
      case 'servicos':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <ServicosFaturamento />
          </div>
        );
      case 'relatorios':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
            <RelatoriosFaturamento />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setActiveSubModule(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <h2 className="text-2xl font-bold text-biodina-blue">
                {mainModules.find(m => m.id === activeModule)?.subModules.find(s => s.id === activeSubModule)?.title}
              </h2>
            </div>
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Este módulo está em desenvolvimento. Em breve estará disponível.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const renderContent = () => {
    if (activeSubModule) {
      return renderSubModuleContent();
    }
    
    if (activeModule) {
      return renderSubModules();
    }
    
    return renderMainModules();
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Financeiro</h1>
          <p className="text-gray-600">Controle financeiro completo da empresa</p>
        </header>

        {/* Conteúdo principal */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Financeiro;
