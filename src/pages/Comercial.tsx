
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SidebarLayout from "@/components/SidebarLayout";
import OportunidadeForm from "@/components/comercial/OportunidadeForm";
import PedidoModal from "@/components/comercial/PedidoModal";
import { 
  TrendingUp, Target, FileText, BarChart3, Plus, Search, Edit,
  DollarSign, Calendar, Phone, MapPin, Briefcase, Eye
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

const Comercial = () => {
  const [activeTab, setActiveTab] = useState('funil');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOportunidadeForm, setShowOportunidadeForm] = useState(false);
  const [editingOportunidade, setEditingOportunidade] = useState<any>();
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [selectedOportunidade, setSelectedOportunidade] = useState<any>();

  // Dados do funil reformulado baseado na imagem
  const funnelData = [
    { fase: 'Temperatura < 60', cor: '#ff8c00', valor: 120, percentual: 100 },
    { fase: 'Em Processo (60-80)', cor: '#ff6600', valor: 85, percentual: 70 },
    { fase: 'Boas Chances (80-90)', cor: '#ff4400', valor: 45, percentual: 37 },
    { fase: 'Comprometido (90)', cor: '#cc0000', valor: 28, percentual: 23 },
    { fase: 'Conquistado (100)', cor: '#990000', valor: 15, percentual: 12 }
  ];

  // Dados das oportunidades
  const oportunidades = [
    { 
      id: 1,
      codigo: '10678',
      cliente: 'Associação das Pioneiras Sociais',
      contato: 'Ramal - 3319-1111',
      responsavel: 'Faber Oliveira',
      origem: 'Vendas RJ',
      familiaComercial: 'Radiometer ABL',
      situacao: 'ganha',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 782530,
      dataAbertura: '20/03/2024',
      dataContato: '20/03/2024',
      descricao: 'DOS 3 EQUIPAMENTOS ADQUIRIDOS POR (ID) O DE Nº SERIE 754R2826N025 IRA SER INSTALADO NO SARAH-DF.'
    },
    { 
      id: 2,
      codigo: '10679',
      cliente: 'Hospital Universitário Onofre Lopes',
      contato: 'contato@huol.ufrn.br',
      responsavel: 'Maria Santos',
      origem: 'Vendas RN',
      familiaComercial: 'Nova Biomedical',
      situacao: 'em_analise',
      tipoAplicacao: 'locacao',
      tipoOportunidade: 'periodica',
      valor: 450000,
      dataAbertura: '15/03/2024',
      dataContato: '16/03/2024',
      descricao: 'Equipamentos para laboratório de análises clínicas'
    },
    { 
      id: 3,
      codigo: '10680',
      cliente: 'CEMA - Central de Medicamentos',
      contato: '(85) 3101-1234',
      responsavel: 'João Silva',
      origem: 'Vendas CE',
      familiaComercial: 'WEBMED',
      situacao: 'perdida',
      tipoAplicacao: 'servico',
      tipoOportunidade: 'pontual',
      valor: 280000,
      dataAbertura: '10/03/2024',
      dataContato: '12/03/2024',
      descricao: 'Sistema de gestão hospitalar integrado'
    },
    { 
      id: 4,
      codigo: '10681',
      cliente: 'Prefeitura de São Paulo',
      contato: 'licitacoes@saude.sp.gov.br',
      responsavel: 'Carlos Oliveira',
      origem: 'Vendas SP',
      familiaComercial: 'Stat Profile',
      situacao: 'cancelada',
      tipoAplicacao: 'venda',
      tipoOportunidade: 'pontual',
      valor: 1250000,
      dataAbertura: '05/03/2024',
      dataContato: '08/03/2024',
      descricao: 'Gasômetros para rede municipal de saúde'
    }
  ];

  // Dados das metas comerciais
  const metasData = [
    { vendedor: 'João Silva', meta: 200000, realizado: 165000, percentual: 82.5 },
    { vendedor: 'Maria Santos', meta: 180000, realizado: 195000, percentual: 108.3 },
    { vendedor: 'Carlos Oliveira', meta: 250000, realizado: 187000, percentual: 74.8 },
    { vendedor: 'Faber Oliveira', meta: 300000, realizado: 282000, percentual: 94.0 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'bg-green-500';
      case 'em_analise': return 'bg-yellow-500';
      case 'perdida': return 'bg-red-500';
      case 'cancelada': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getSituacaoLabel = (situacao: string) => {
    switch (situacao) {
      case 'ganha': return 'Ganha';
      case 'em_analise': return 'Em Análise';
      case 'perdida': return 'Perdida';
      case 'cancelada': return 'Cancelada';
      default: return situacao;
    }
  };

  const handleEditOportunidade = (oportunidade: any) => {
    setEditingOportunidade(oportunidade);
    setShowOportunidadeForm(true);
  };

  const handleSaveOportunidade = (formData: any) => {
    console.log('Salvando oportunidade:', formData);
    setShowOportunidadeForm(false);
    setEditingOportunidade(undefined);
  };

  const handleGerarPedido = (oportunidade: any) => {
    setSelectedOportunidade(oportunidade);
    setShowPedidoModal(true);
  };

  const filteredOportunidades = oportunidades.filter(oportunidade =>
    oportunidade.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    oportunidade.codigo.includes(searchTerm) ||
    oportunidade.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Temperatura</h3>
              <div className="relative">
                {/* Funil visual baseado na imagem */}
                <div className="space-y-1">
                  {funnelData.map((item, index) => (
                    <div key={index} className="relative">
                      <div 
                        className="mx-auto flex items-center justify-center text-white font-bold py-3 text-sm"
                        style={{
                          backgroundColor: item.cor,
                          width: `${Math.max(item.percentual, 20)}%`,
                          clipPath: index === funnelData.length - 1 
                            ? 'polygon(0 0, 100% 0, 50% 100%)' 
                            : 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
                        }}
                      >
                        {item.fase}
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-sm text-gray-600">{item.valor} oportunidades</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Saúde do Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-blue-600">782,53</div>
                <div className="text-sm text-gray-600">Conquistado</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-green-600">x3</div>
                <div className="text-sm text-gray-600">Meta</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Pipeline Necessário</span>
                <span className="text-sm font-medium">2.347,59</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pipeline Existente</span>
                <span className="text-sm font-medium">1.962,53</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span className="text-sm">A Realizar</span>
                <span className="text-sm font-medium">385,06</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOportunidades = () => (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Oportunidades Comerciais
          </CardTitle>
          <Button 
            className="bg-biodina-gold hover:bg-biodina-gold/90"
            onClick={() => {
              setEditingOportunidade(undefined);
              setShowOportunidadeForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Oportunidade
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Pesquisar oportunidades..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Abertura</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOportunidades.map((oportunidade) => (
                <TableRow key={oportunidade.id}>
                  <TableCell className="font-medium">{oportunidade.codigo}</TableCell>
                  <TableCell>{oportunidade.cliente}</TableCell>
                  <TableCell>{oportunidade.responsavel}</TableCell>
                  <TableCell>
                    <Badge className={`${getSituacaoColor(oportunidade.situacao)} text-white`}>
                      {getSituacaoLabel(oportunidade.situacao)}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{oportunidade.tipoAplicacao}</TableCell>
                  <TableCell>{formatCurrency(oportunidade.valor)}</TableCell>
                  <TableCell>{oportunidade.dataAbertura}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditOportunidade(oportunidade)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleGerarPedido(oportunidade)}>
                        <FileText className="h-4 w-4" />
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
          <CardTitle>Distribuição por Situação</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Ganha', value: 1, fill: '#22c55e' },
                  { name: 'Em Análise', value: 1, fill: '#eab308' },
                  { name: 'Perdida', value: 1, fill: '#ef4444' },
                  { name: 'Cancelada', value: 1, fill: '#6b7280' }
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
    { id: 'oportunidades', label: 'Oportunidades', icon: Briefcase },
    { id: 'metas', label: 'Metas Comerciais', icon: Target },
    { id: 'analise', label: 'Análise de Conversão', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'funil': return renderFunil();
      case 'oportunidades': return renderOportunidades();
      case 'metas': return renderMetas();
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

      {showOportunidadeForm && (
        <OportunidadeForm
          oportunidade={editingOportunidade}
          onClose={() => {
            setShowOportunidadeForm(false);
            setEditingOportunidade(undefined);
          }}
          onSave={handleSaveOportunidade}
        />
      )}

      {showPedidoModal && selectedOportunidade && (
        <PedidoModal
          oportunidade={selectedOportunidade}
          onClose={() => {
            setShowPedidoModal(false);
            setSelectedOportunidade(undefined);
          }}
          onSave={(pedido) => {
            console.log('Salvando pedido:', pedido);
            setShowPedidoModal(false);
            setSelectedOportunidade(undefined);
          }}
        />
      )}
    </SidebarLayout>
  );
};

export default Comercial;
