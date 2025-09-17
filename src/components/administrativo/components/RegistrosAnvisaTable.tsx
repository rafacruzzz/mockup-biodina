import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  Building,
  AlertCircle,
  Clock
} from 'lucide-react';
import { RegistroAnvisaCompleto } from '@/types/anvisaRegistro';
import { toast } from 'sonner';

interface RegistrosAnvisaTableProps {
  registros: any[];
  onEdit: (registro: any) => void;
  onDelete: (registroId: number) => void;
  onViewHistory?: (registro: any) => void;
}

export const RegistrosAnvisaTable = ({ 
  registros, 
  onEdit, 
  onDelete, 
  onViewHistory 
}: RegistrosAnvisaTableProps) => {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('all');
  const [filtroArea, setFiltroArea] = useState('all');
  const [filtroFabricante, setFiltroFabricante] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em_preparacao': return 'bg-gray-100 text-gray-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'publicado': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'em_preparacao': return 'Em Preparação';
      case 'enviado': return 'Enviado';
      case 'publicado': return 'Publicado';
      case 'aprovado': return 'Aprovado';
      case 'rejeitado': return 'Rejeitado';
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

  const registrosFiltrados = registros.filter(registro => {
    // Filtro de busca
    const matchBusca = !busca || 
      registro.produtoSelecionado?.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      registro.produtoSelecionado?.codigo?.toLowerCase().includes(busca.toLowerCase()) ||
      registro.numeroProcessoAnvisa?.toLowerCase().includes(busca.toLowerCase()) ||
      registro.nomeArquivoPrincipal?.toLowerCase().includes(busca.toLowerCase());

    if (!matchBusca) return false;

    // Filtro de status
    if (filtroStatus !== 'all' && registro.status !== filtroStatus) {
      return false;
    }

    // Filtro de área
    if (filtroArea !== 'all' && registro.areaAnvisa !== filtroArea) {
      return false;
    }

    // Filtro de fabricante
    if (filtroFabricante !== 'all' && registro.fabricante !== filtroFabricante) {
      return false;
    }

    return true;
  });

  const handleGerarPDF = (registro: RegistroAnvisaCompleto) => {
    // Implementar geração de PDF específica para o registro
    toast.success(`PDF gerado para ${registro.produtoSelecionado?.nome}`);
  };

  const handleVisualizar = (registro: RegistroAnvisaCompleto) => {
    // Implementar modal de visualização
    toast.info(`Visualizando registro de ${registro.produtoSelecionado?.nome}`);
  };

  const fabricantes = [...new Set(registros.map(r => r.fabricante).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{registros.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-2xl font-bold">
                  {registros.filter(r => r.status === 'em_preparacao').length}
                </p>
                <p className="text-sm text-muted-foreground">Em Preparação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {registros.filter(r => r.status === 'enviado').length}
                </p>
                <p className="text-sm text-muted-foreground">Enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {registros.filter(r => r.status === 'publicado').length}
                </p>
                <p className="text-sm text-muted-foreground">Publicados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {registros.filter(r => r.status === 'aprovado').length}
                </p>
                <p className="text-sm text-muted-foreground">Aprovados</p>
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
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Busca Geral</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nome, código, processo..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="em_preparacao">Em Preparação</SelectItem>
                  <SelectItem value="enviado">Enviado</SelectItem>
                  <SelectItem value="publicado">Publicado</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Área ANVISA</label>
              <Select value={filtroArea} onValueChange={setFiltroArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as áreas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="produtos_saude">Produtos para Saúde</SelectItem>
                  <SelectItem value="diagnostico_in_vitro">Diagnóstico In Vitro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fabricante</label>
              <Select value={filtroFabricante} onValueChange={setFiltroFabricante}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os fabricantes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os fabricantes</SelectItem>
                  {fabricantes.map(fabricante => (
                    <SelectItem key={fabricante} value={fabricante}>
                      {fabricante}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setBusca('');
                setFiltroStatus('all');
                setFiltroArea('all');
                setFiltroFabricante('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {registrosFiltrados.length} registro{registrosFiltrados.length !== 1 ? 's' : ''} encontrado{registrosFiltrados.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Área ANVISA</TableHead>
                <TableHead>Nº Processo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Envio</TableHead>
                <TableHead>Data Publicação DOU</TableHead>
                <TableHead>Fabricante</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="h-12 w-12 text-gray-300" />
                      <div>
                        <p className="font-medium text-gray-900">Nenhum registro encontrado</p>
                        <p className="text-sm text-gray-600">
                          Tente ajustar os filtros ou criar um novo registro
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                registrosFiltrados.map((registro) => (
                  <TableRow key={registro.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{registro.produtoSelecionado?.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {registro.nomeArquivoPrincipal}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {registro.produtoSelecionado?.codigo}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getAreaLabel(registro.areaAnvisa)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {registro.numeroProcessoAnvisa || '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(registro.status)}>
                        {getStatusLabel(registro.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {registro.dataEnvio ? new Date(registro.dataEnvio).toLocaleDateString() : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {registro.dataPublicacaoDOU ? new Date(registro.dataPublicacaoDOU).toLocaleDateString() : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{registro.fabricante || '-'}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVisualizar(registro)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(registro)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {onViewHistory && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewHistory(registro)}
                            className="h-8 w-8 p-0"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(registro.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};