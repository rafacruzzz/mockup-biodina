import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  Building,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface AtualizacoesAnvisaTableProps {
  atualizacoes: any[];
  onEdit: (atualizacao: any) => void;
  onDelete: (atualizacaoId: number) => void;
  onViewHistory?: (atualizacao: any) => void;
}

export const AtualizacoesAnvisaTable = ({ 
  atualizacoes, 
  onEdit, 
  onDelete, 
  onViewHistory 
}: AtualizacoesAnvisaTableProps) => {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [filtroArea, setFiltroArea] = useState('all');
  const [filtroTipo, setFiltroTipo] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'em_preparacao': return 'bg-yellow-100 text-yellow-800';
      case 'pendente_anvisa': return 'bg-orange-100 text-orange-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'em_andamento': return 'Em Andamento';
      case 'em_preparacao': return 'Em Preparação';
      case 'pendente_anvisa': return 'Pendente ANVISA';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const getAreaLabel = (area: string) => {
    switch (area) {
      case 'produtos_saude': return 'Produtos para Saúde';
      case 'diagnostico_in_vitro': return 'Diagnóstico In Vitro';
      default: return area;
    }
  };

  const getTipoAtualizacaoColor = (tipo: string) => {
    switch (tipo) {
      case 'Alteração de Instrução de Uso': return 'bg-blue-100 text-blue-800';
      case 'Alteração de Especificações Técnicas': return 'bg-purple-100 text-purple-800';
      case 'Alteração de Fabricante': return 'bg-orange-100 text-orange-800';
      case 'Alteração de Validade': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const atualizacoesFiltradas = atualizacoes.filter(atualizacao => {
    // Filtro de busca
    const matchBusca = !busca || 
      atualizacao.nomeProduto?.toLowerCase().includes(busca.toLowerCase()) ||
      atualizacao.numeroRegistroAnvisa?.toLowerCase().includes(busca.toLowerCase()) ||
      atualizacao.processo?.toLowerCase().includes(busca.toLowerCase()) ||
      atualizacao.tipoAtualizacao?.toLowerCase().includes(busca.toLowerCase()) ||
      atualizacao.fabricante?.toLowerCase().includes(busca.toLowerCase());

    if (!matchBusca) return false;

    // Filtro de status
    if (filtroStatus !== 'all' && atualizacao.status !== filtroStatus) {
      return false;
    }

    // Filtro de área ANVISA
    if (filtroArea !== 'all' && atualizacao.areaAnvisa !== filtroArea) {
      return false;
    }

    // Filtro de tipo de atualização
    if (filtroTipo !== 'all' && atualizacao.tipoAtualizacao !== filtroTipo) {
      return false;
    }

    return true;
  });

  // Estatísticas para dashboard
  const estatisticas = {
    total: atualizacoes.length,
    concluidos: atualizacoes.filter(a => a.status === 'concluido').length,
    emAndamento: atualizacoes.filter(a => a.status === 'em_andamento').length,
    emPreparacao: atualizacoes.filter(a => a.status === 'em_preparacao').length,
    pendentes: atualizacoes.filter(a => a.status === 'pendente_anvisa').length
  };

  const handleGerarPDF = (atualizacao: any) => {
    // Placeholder para geração de PDF
    console.log('Gerando PDF para atualização:', atualizacao);
  };

  const handleVisualizar = (atualizacao: any) => {
    // Placeholder para visualização
    console.log('Visualizando atualização:', atualizacao);
  };

  // Extrair tipos únicos de atualização
  const tiposAtualizacao = [...new Set(atualizacoes.map(a => a.tipoAtualizacao).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Dashboard com Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{estatisticas.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">{estatisticas.concluidos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">{estatisticas.emAndamento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Em Preparação</p>
                <p className="text-2xl font-bold">{estatisticas.emPreparacao}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pendente ANVISA</p>
                <p className="text-2xl font-bold">{estatisticas.pendentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Busca Geral */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por produto, registro, processo..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="concluido">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Concluído
                    </div>
                  </SelectItem>
                  <SelectItem value="em_andamento">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      Em Andamento
                    </div>
                  </SelectItem>
                  <SelectItem value="em_preparacao">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      Em Preparação
                    </div>
                  </SelectItem>
                  <SelectItem value="pendente_anvisa">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      Pendente ANVISA
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Área ANVISA */}
            <div>
              <Select value={filtroArea} onValueChange={setFiltroArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Área ANVISA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="produtos_saude">Produtos para Saúde</SelectItem>
                  <SelectItem value="diagnostico_in_vitro">Diagnóstico In Vitro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Atualização */}
            <div>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Atualização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {tiposAtualizacao.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-muted-foreground">
              {atualizacoesFiltradas.length} atualização(ões) encontrada(s)
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBusca('');
                setFiltroStatus('all');
                setFiltroArea('all');
                setFiltroTipo('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizações de Produtos ANVISA</CardTitle>
        </CardHeader>
        <CardContent>
          {atualizacoesFiltradas.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Registro ANVISA</TableHead>
                  <TableHead>Tipo de Atualização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processo</TableHead>
                  <TableHead>Área ANVISA</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Fabricante</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atualizacoesFiltradas.map((atualizacao) => (
                  <TableRow key={atualizacao.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{atualizacao.nomeProduto}</p>
                        <p className="text-sm text-muted-foreground">ID: {atualizacao.produtoId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm bg-blue-50 px-2 py-1 rounded">
                        {atualizacao.numeroRegistroAnvisa}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTipoAtualizacaoColor(atualizacao.tipoAtualizacao)}>
                        {atualizacao.tipoAtualizacao}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(atualizacao.status)}>
                        {getStatusLabel(atualizacao.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{atualizacao.processo}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getAreaLabel(atualizacao.areaAnvisa)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(atualizacao.dataInicioProcesso).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {atualizacao.fabricante}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVisualizar(atualizacao)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(atualizacao)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {onViewHistory && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewHistory(atualizacao)}
                            className="h-8 w-8 p-0"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(atualizacao.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma atualização encontrada</h3>
              <p className="text-muted-foreground">
                Não há atualizações de produtos que correspondam aos filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};