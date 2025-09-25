import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, Award, Clock, Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockConsorcios } from '@/data/tesouraria';
import { StatusConsorcio } from '@/types/tesouraria';
import { formatCurrency, formatDate } from '@/data/tesouraria';
import NovoConsorcioModal from './NovoConsorcioModal';
import DetalhesConsorcioModal from './DetalhesConsorcioModal';

const GestaoConsorciosView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
  const [selectedConsorcio, setSelectedConsorcio] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const consorcios = mockConsorcios.filter(consorcio => {
    const matchesStatus = filtroStatus === 'todos' || consorcio.status === filtroStatus;
    const matchesSearch = consorcio.administradora.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consorcio.numeroCota.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consorcio.bemReferenciado.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Estatísticas
  const cotasAtivas = consorcios.filter(c => c.status === StatusConsorcio.ATIVO);
  const cotasContempladas = consorcios.filter(c => c.status === StatusConsorcio.CONTEMPLADO);
  const valorTotalBens = consorcios.reduce((acc, c) => acc + c.valorBem, 0);
  const valorTotalPago = consorcios.reduce((acc, c) => acc + (c.valorParcela * c.parcelasPagas), 0);

  // Dados para gráficos - evolução de pagamentos
  const dadosEvolucao = consorcios.map(c => ({
    consorcio: c.numeroCota,
    pago: (c.parcelasPagas / c.numeroParcelas) * 100,
    valorPago: c.valorParcela * c.parcelasPagas,
    valorTotal: c.valorBem
  }));

  // Próximas oportunidades de contemplação (simulado)
  const proximasOportunidades = consorcios.filter(c => c.status === StatusConsorcio.ATIVO);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-blue-500';
      case 'Contemplado': return 'bg-green-500';
      case 'Quitado': return 'bg-gray-500';
      case 'Cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleViewDetails = (consorcioId: string) => {
    setSelectedConsorcio(consorcioId);
    setIsDetalhesOpen(true);
  };

  const calcularPercentualPago = (consorcio: any) => {
    return (consorcio.parcelasPagas / consorcio.numeroParcelas) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cotas Ativas</p>
                <p className="text-2xl font-bold">{cotasAtivas.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contempladas</p>
                <p className="text-2xl font-bold text-green-600">{cotasContempladas.length}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total Bens</p>
                <p className="text-2xl font-bold">{formatCurrency(valorTotalBens)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pago</p>
                <p className="text-2xl font-bold">{formatCurrency(valorTotalPago)}</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Pagamentos (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEvolucao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="consorcio" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, 'Pago']} />
                <Bar dataKey="pago" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor Pago vs Total</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosEvolucao}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="consorcio" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value: any) => [formatCurrency(value), '']} />
                <Line 
                  type="monotone" 
                  dataKey="valorPago" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Valor Pago"
                />
                <Line 
                  type="monotone" 
                  dataKey="valorTotal" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Valor Total"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Oportunidades */}
      {proximasOportunidades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-orange-600" />
              Próximas Oportunidades de Contemplação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proximasOportunidades.slice(0, 4).map((consorcio) => (
                <div key={consorcio.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{consorcio.administradora}</h4>
                      <p className="text-sm text-muted-foreground">Cota: {consorcio.numeroCota}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {calcularPercentualPago(consorcio).toFixed(1)}% pago
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{consorcio.bemReferenciado}</p>
                  <div className="flex justify-between text-sm">
                    <span>Parcelas: {consorcio.parcelasPagas}/{consorcio.numeroParcelas}</span>
                    <span className="font-medium">{formatCurrency(consorcio.valorBem)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Consórcios */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestão de Consórcios</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Cota
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Buscar por administradora, cota ou bem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos Status</SelectItem>
                {Object.values(StatusConsorcio).map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Administradora</TableHead>
                <TableHead>Cota</TableHead>
                <TableHead>Bem Referenciado</TableHead>
                <TableHead>Valor do Bem</TableHead>
                <TableHead>Parcelas</TableHead>
                <TableHead>% Pago</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consorcios.map((consorcio) => (
                <TableRow key={consorcio.id}>
                  <TableCell className="font-medium">{consorcio.administradora}</TableCell>
                  <TableCell>{consorcio.numeroCota}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={consorcio.bemReferenciado}>
                      {consorcio.bemReferenciado}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(consorcio.valorBem)}</TableCell>
                  <TableCell>
                    {consorcio.parcelasPagas}/{consorcio.numeroParcelas}
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(consorcio.valorParcela)}/mês
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{
                            width: `${calcularPercentualPago(consorcio)}%`
                          }}
                        />
                      </div>
                      <span className="text-sm">
                        {calcularPercentualPago(consorcio).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(consorcio.status)} text-white`}>
                      {consorcio.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(consorcio.id)}
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
      <NovoConsorcioModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <DetalhesConsorcioModal
        isOpen={isDetalhesOpen}
        onClose={() => setIsDetalhesOpen(false)}
        consorcioId={selectedConsorcio}
      />
    </div>
  );
};

export default GestaoConsorciosView;