import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, UserPlus, CheckCircle, Search, Filter } from 'lucide-react';
import { ChamadoTI, StatusChamadoTI, PrioridadeChamado, PRIORIDADE_CHAMADO_LABELS, STATUS_CHAMADO_TI_LABELS, CATEGORIA_CHAMADO_TI_LABELS } from '@/types/ti';

// Mock data
const mockChamados: ChamadoTI[] = [
  {
    id: 'TI-2024-001',
    solicitante: 'Maria Santos',
    departamento: 'Comercial',
    categoria: 'impressoras_scanners',
    prioridade: PrioridadeChamado.ALTA,
    titulo: 'Impressora não está imprimindo',
    descricao: 'A impressora do setor comercial não está respondendo aos comandos de impressão',
    status: StatusChamadoTI.ABERTO,
    dataAbertura: '2024-01-15T10:30:00',
    tecnicoResponsavel: undefined
  },
  {
    id: 'TI-2024-002',
    solicitante: 'João Silva',
    departamento: 'Financeiro',
    categoria: 'softwares',
    prioridade: PrioridadeChamado.CRITICA,
    titulo: 'Sistema ERP fora do ar',
    descricao: 'O sistema ERP não está carregando, impedindo o trabalho de todo o departamento financeiro',
    status: StatusChamadoTI.EM_ATENDIMENTO,
    dataAbertura: '2024-01-15T14:20:00',
    tecnicoResponsavel: 'Carlos Tech'
  },
  {
    id: 'TI-2024-003',
    solicitante: 'Ana Costa',
    departamento: 'RH',
    categoria: 'acessos',
    prioridade: PrioridadeChamado.MEDIA,
    titulo: 'Problemas de acesso ao sistema',
    descricao: 'Não consigo acessar o sistema de gestão de funcionários',
    status: StatusChamadoTI.ENCERRADO,
    dataAbertura: '2024-01-14T09:15:00',
    tecnicoResponsavel: 'Maria Tech',
    dataEncerramento: '2024-01-14T16:30:00'
  }
];

const tecnicos = ['Carlos Tech', 'Maria Tech', 'João Tech', 'Ana Tech'];

const PainelChamados: React.FC = () => {
  const [chamados, setChamados] = useState(mockChamados);
  const [filtros, setFiltros] = useState({
    status: '',
    prioridade: '',
    categoria: '',
    busca: ''
  });

  const getPrioridadeBadgeVariant = (prioridade: PrioridadeChamado) => {
    switch (prioridade) {
      case PrioridadeChamado.CRITICA: return 'destructive';
      case PrioridadeChamado.ALTA: return 'default';
      case PrioridadeChamado.MEDIA: return 'secondary';
      case PrioridadeChamado.BAIXA: return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: StatusChamadoTI) => {
    switch (status) {
      case StatusChamadoTI.ABERTO: return 'destructive';
      case StatusChamadoTI.EM_ATENDIMENTO: return 'default';
      case StatusChamadoTI.ENCERRADO: return 'secondary';
      default: return 'outline';
    }
  };

  const atribuirTecnico = (chamadoId: string, tecnico: string) => {
    setChamados(prev => 
      prev.map(chamado => 
        chamado.id === chamadoId 
          ? { ...chamado, tecnicoResponsavel: tecnico, status: StatusChamadoTI.EM_ATENDIMENTO }
          : chamado
      )
    );
  };

  const encerrarChamado = (chamadoId: string) => {
    setChamados(prev => 
      prev.map(chamado => 
        chamado.id === chamadoId 
          ? { ...chamado, status: StatusChamadoTI.ENCERRADO, dataEncerramento: new Date().toISOString() }
          : chamado
      )
    );
  };

  const chamadosFiltrados = chamados.filter(chamado => {
    const matchStatus = !filtros.status || chamado.status === filtros.status;
    const matchPrioridade = !filtros.prioridade || chamado.prioridade === filtros.prioridade;
    const matchCategoria = !filtros.categoria || chamado.categoria === filtros.categoria;
    const matchBusca = !filtros.busca || 
      chamado.solicitante.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      chamado.id.toLowerCase().includes(filtros.busca.toLowerCase());
    
    return matchStatus && matchPrioridade && matchCategoria && matchBusca;
  });

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Gestão de Chamados</CardTitle>
          <CardDescription>
            Gerencie todos os chamados de TI da empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Select value={filtros.status} onValueChange={(value) => setFiltros(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os Status</SelectItem>
                  {Object.entries(STATUS_CHAMADO_TI_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Select value={filtros.prioridade} onValueChange={(value) => setFiltros(prev => ({ ...prev, prioridade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as Prioridades</SelectItem>
                  {Object.entries(PRIORIDADE_CHAMADO_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Select value={filtros.categoria} onValueChange={(value) => setFiltros(prev => ({ ...prev, categoria: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as Categorias</SelectItem>
                  {Object.entries(CATEGORIA_CHAMADO_TI_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por solicitante ou ID"
                value={filtros.busca}
                onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabela de Chamados */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chamadosFiltrados.map((chamado) => (
                  <TableRow key={chamado.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">#{chamado.id}</TableCell>
                    <TableCell className="font-medium">{chamado.titulo}</TableCell>
                    <TableCell>{chamado.solicitante}</TableCell>
                    <TableCell>{chamado.departamento}</TableCell>
                    <TableCell>
                      <Badge variant={getPrioridadeBadgeVariant(chamado.prioridade)}>
                        {PRIORIDADE_CHAMADO_LABELS[chamado.prioridade]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(chamado.status)}>
                        {STATUS_CHAMADO_TI_LABELS[chamado.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {chamado.tecnicoResponsavel ? (
                        <span className="text-sm">{chamado.tecnicoResponsavel}</span>
                      ) : (
                        <Select onValueChange={(value) => atribuirTecnico(chamado.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Atribuir" />
                          </SelectTrigger>
                          <SelectContent>
                            {tecnicos.map((tecnico) => (
                              <SelectItem key={tecnico} value={tecnico}>{tecnico}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(chamado.dataAbertura).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {chamado.status !== StatusChamadoTI.ENCERRADO && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => encerrarChamado(chamado.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {chamadosFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum chamado encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelChamados;