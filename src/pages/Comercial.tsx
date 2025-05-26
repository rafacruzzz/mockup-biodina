
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SidebarLayout from "@/components/SidebarLayout";
import { 
  TrendingUp, Users, Target, FileText, BarChart3, Plus, Search, Edit,
  DollarSign, Calendar, Phone, Mail, MapPin, Star 
} from "lucide-react";
import { 
  FunnelChart, Funnel, LabelList, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

const Comercial = () => {
  const [activeTab, setActiveTab] = useState('funil');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados do funil de oportunidades
  const funnelData = [
    { name: 'Leads', value: 1000, fill: '#0A2342' },
    { name: 'Qualificados', value: 600, fill: '#1E4D8C' },
    { name: 'Propostas', value: 300, fill: '#D5A021' },
    { name: 'Negociação', value: 150, fill: '#B8941C' },
    { name: 'Fechamento', value: 75, fill: '#A0821A' },
  ];

  // Dados das propostas
  const propostas = [
    { 
      id: 'PROP001', 
      cliente: 'Empresa ABC', 
      valor: 150000, 
      status: 'Em Análise', 
      vendedor: 'João Silva',
      dataVencimento: '2025-02-15',
      probabilidade: 70
    },
    { 
      id: 'PROP002', 
      cliente: 'Tech Solutions', 
      valor: 85000, 
      status: 'Enviada', 
      vendedor: 'Maria Santos',
      dataVencimento: '2025-02-10',
      probabilidade: 45
    },
    { 
      id: 'PROP003', 
      cliente: 'Indústria XYZ', 
      valor: 320000, 
      status: 'Aprovada', 
      vendedor: 'Carlos Oliveira',
      dataVencimento: '2025-01-30',
      probabilidade: 95
    },
  ];

  // Dados das metas comerciais
  const metasData = [
    { vendedor: 'João Silva', meta: 200000, realizado: 165000, percentual: 82.5 },
    { vendedor: 'Maria Santos', meta: 180000, realizado: 195000, percentual: 108.3 },
    { vendedor: 'Carlos Oliveira', meta: 250000, realizado: 187000, percentual: 74.8 },
    { vendedor: 'Ana Costa', meta: 150000, realizado: 142000, percentual: 94.7 },
  ];

  // Dados dos clientes
  const clientes = [
    { 
      id: 1, 
      nome: 'Empresa ABC', 
      segmento: 'Tecnologia', 
      valorTotal: 450000, 
      ultimaCompra: '2024-12-15',
      status: 'Ativo',
      vendedor: 'João Silva',
      telefone: '(11) 9999-9999',
      email: 'contato@empresaabc.com'
    },
    { 
      id: 2, 
      nome: 'Tech Solutions', 
      segmento: 'Software', 
      valorTotal: 280000, 
      ultimaCompra: '2024-11-20',
      status: 'Ativo',
      vendedor: 'Maria Santos',
      telefone: '(11) 8888-8888',
      email: 'vendas@techsolutions.com'
    },
    { 
      id: 3, 
      nome: 'Indústria XYZ', 
      segmento: 'Industrial', 
      valorTotal: 720000, 
      ultimaCompra: '2024-12-28',
      status: 'Premium',
      vendedor: 'Carlos Oliveira',
      telefone: '(11) 7777-7777',
      email: 'compras@industriaxyz.com'
    },
  ];

  // Dados de conversão por fase
  const conversaoData = [
    { fase: 'Lead → Qualificado', taxa: 60, cor: '#0A2342' },
    { fase: 'Qualificado → Proposta', taxa: 50, cor: '#1E4D8C' },
    { fase: 'Proposta → Negociação', taxa: 50, cor: '#D5A021' },
    { fase: 'Negociação → Fechamento', taxa: 50, cor: '#B8941C' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-500';
      case 'Premium': return 'bg-purple-500';
      case 'Enviada': return 'bg-blue-500';
      case 'Em Análise': return 'bg-yellow-500';
      case 'Aprovada': return 'bg-green-500';
      case 'Rejeitada': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderFunil = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Funil de Oportunidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Taxa de Conversão por Fase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversaoData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.fase}</span>
                  <span className="text-sm text-gray-600">{item.taxa}%</span>
                </div>
                <Progress value={item.taxa} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPropostas = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Propostas Comerciais
          </CardTitle>
          <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Nova Proposta
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Pesquisar propostas..." className="pl-10" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Probabilidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {propostas.map((proposta) => (
              <TableRow key={proposta.id}>
                <TableCell className="font-medium">{proposta.id}</TableCell>
                <TableCell>{proposta.cliente}</TableCell>
                <TableCell>{formatCurrency(proposta.valor)}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(proposta.status)} text-white`}>
                    {proposta.status}
                  </Badge>
                </TableCell>
                <TableCell>{proposta.vendedor}</TableCell>
                <TableCell>{proposta.dataVencimento}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={proposta.probabilidade} className="w-16 h-2" />
                    <span className="text-sm">{proposta.probabilidade}%</span>
                  </div>
                </TableCell>
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

  const renderMetas = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Metas Comerciais - Janeiro 2025
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metasData.map((meta, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold">{meta.vendedor}</h4>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(meta.realizado)} de {formatCurrency(meta.meta)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${meta.percentual >= 100 ? 'text-green-600' : meta.percentual >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {meta.percentual.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Progress value={Math.min(meta.percentual, 100)} className="h-3" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderClientes = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Clientes
          </CardTitle>
          <Button className="bg-biodina-gold hover:bg-biodina-gold/90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className="border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{cliente.nome}</h4>
                  <Badge className={`${getStatusColor(cliente.status)} text-white`}>
                    {cliente.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{cliente.segmento}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>{formatCurrency(cliente.valorTotal)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Última: {cliente.ultimaCompra}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{cliente.vendedor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{cliente.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{cliente.email}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <Button size="sm" variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderAnaliseConversao = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Conversão por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendedor" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
              <Bar dataKey="percentual" fill="#0A2342" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Distribuição por Segmento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Tecnologia', value: 45, fill: '#0A2342' },
                  { name: 'Industrial', value: 30, fill: '#D5A021' },
                  { name: 'Software', value: 25, fill: '#1E4D8C' }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'funil', label: 'Funil de Oportunidades', icon: TrendingUp },
    { id: 'propostas', label: 'Propostas', icon: FileText },
    { id: 'metas', label: 'Metas Comerciais', icon: Target },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'analise', label: 'Análise de Conversão', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'funil': return renderFunil();
      case 'propostas': return renderPropostas();
      case 'metas': return renderMetas();
      case 'clientes': return renderClientes();
      case 'analise': return renderAnaliseConversao();
      default: return renderFunil();
    }
  };

  return (
    <SidebarLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-biodina-blue mb-2">Comercial</h1>
          <p className="text-gray-600">Gestão completa do processo comercial</p>
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

export default Comercial;
