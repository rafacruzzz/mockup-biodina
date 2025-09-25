import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockSeguros } from '@/data/tesouraria';
import { StatusSeguro, TipoSeguro } from '@/types/tesouraria';
import { formatCurrency, formatDate } from '@/data/tesouraria';
import NovoSeguroModal from './NovoSeguroModal';
import DetalhesSeguroModal from './DetalhesSeguroModal';

const GestaoSegurosView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
  const [selectedSeguro, setSelectedSeguro] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const seguros = mockSeguros.filter(seguro => {
    const matchesTipo = filtroTipo === 'todos' || seguro.tipoSeguro === filtroTipo;
    const matchesStatus = filtroStatus === 'todos' || seguro.status === filtroStatus;
    const matchesSearch = seguro.seguradora.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seguro.numeroApolice.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTipo && matchesStatus && matchesSearch;
  });

  // Estatísticas
  const segurosAtivos = seguros.filter(s => s.status === StatusSeguro.VIGENTE);
  const valorTotalSegurado = seguros.reduce((acc, s) => acc + s.valorSegurado, 0);
  const premiosAnuais = seguros.reduce((acc, s) => {
    const fator = s.periodicidadePagamento === 'Mensal' ? 12 : 
                  s.periodicidadePagamento === 'Trimestral' ? 4 :
                  s.periodicidadePagamento === 'Semestral' ? 2 : 1;
    return acc + (s.premio * fator);
  }, 0);

  // Vencimentos próximos (próximos 30 dias)
  const hoje = new Date();
  const em30Dias = new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000);
  const vencimentosProximos = seguros.filter(s => 
    s.proximoVencimento >= hoje && s.proximoVencimento <= em30Dias
  );

  // Dados para gráficos
  const dadosPorTipo = Object.values(TipoSeguro).map(tipo => ({
    tipo,
    quantidade: seguros.filter(s => s.tipoSeguro === tipo).length,
    valor: seguros.filter(s => s.tipoSeguro === tipo).reduce((acc, s) => acc + s.valorSegurado, 0)
  })).filter(item => item.quantidade > 0);

  const dadosPremios = seguros.map(s => ({
    seguradora: s.seguradora,
    premio: s.periodicidadePagamento === 'Mensal' ? s.premio * 12 : 
            s.periodicidadePagamento === 'Trimestral' ? s.premio * 4 :
            s.periodicidadePagamento === 'Semestral' ? s.premio * 2 : s.premio
  }));

  const COLORS = ['#8B5CF6', '#06B6D4', '#F59E0B', '#EF4444', '#10B981', '#6366F1'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Vigente': return 'bg-green-500';
      case 'Vencido': return 'bg-red-500';
      case 'Cancelado': return 'bg-gray-500';
      case 'Sinistro': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const handleViewDetails = (seguroId: string) => {
    setSelectedSeguro(seguroId);
    setIsDetalhesOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Apólices Ativas</p>
                <p className="text-2xl font-bold">{segurosAtivos.length}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Segurado</p>
                <p className="text-2xl font-bold">{formatCurrency(valorTotalSegurado)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prêmios Anuais</p>
                <p className="text-2xl font-bold">{formatCurrency(premiosAnuais)}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencimentos (30d)</p>
                <p className="text-2xl font-bold text-orange-600">{vencimentosProximos.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosPorTipo}
                  dataKey="quantidade"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ tipo, quantidade }) => `${tipo}: ${quantidade}`}
                >
                  {dadosPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [value, 'Apólices']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prêmios por Seguradora</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosPremios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="seguradora" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value: any) => [formatCurrency(value), 'Prêmio Anual']} />
                <Bar dataKey="premio" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Vencimentos próximos */}
      {vencimentosProximos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Apólices com Vencimento Próximo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {vencimentosProximos.map((seguro) => (
                <div key={seguro.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{seguro.seguradora} - {seguro.numeroApolice}</p>
                    <p className="text-sm text-muted-foreground">{seguro.tipoSeguro}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-600">
                      Vence em {formatDate(seguro.proximoVencimento)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Prêmio: {formatCurrency(seguro.premio)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controles e Tabela */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestão de Seguros</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Apólice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Buscar por seguradora ou apólice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                {Object.values(TipoSeguro).map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                {Object.values(StatusSeguro).map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seguradora</TableHead>
                <TableHead>Apólice</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor Segurado</TableHead>
                <TableHead>Prêmio</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seguros.map((seguro) => (
                <TableRow key={seguro.id}>
                  <TableCell className="font-medium">{seguro.seguradora}</TableCell>
                  <TableCell>{seguro.numeroApolice}</TableCell>
                  <TableCell>{seguro.tipoSeguro}</TableCell>
                  <TableCell>{formatCurrency(seguro.valorSegurado)}</TableCell>
                  <TableCell>
                    {formatCurrency(seguro.premio)} 
                    <span className="text-xs text-muted-foreground block">
                      {seguro.periodicidadePagamento}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(seguro.proximoVencimento)}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(seguro.status)} text-white`}>
                      {seguro.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(seguro.id)}
                      >
                        Ver
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoSeguroModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <DetalhesSeguroModal
        isOpen={isDetalhesOpen}
        onClose={() => setIsDetalhesOpen(false)}
        seguroId={selectedSeguro}
      />
    </div>
  );
};

export default GestaoSegurosView;