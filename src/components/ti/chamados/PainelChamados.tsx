import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, User, CheckCircle, Clock, AlertTriangle, Settings, UserPlus } from "lucide-react";
import { tiModules } from "@/data/tiModules";
import DetalhesChamadoModal from "./DetalhesChamadoModal";

const PainelChamados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPrioridade, setFilterPrioridade] = useState('todos');
  const [filterCategoria, setFilterCategoria] = useState('todos');
  const [selectedChamado, setSelectedChamado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Dados dos chamados do módulo
  const [chamadosData, setChamadosData] = useState(tiModules.chamados.subModules.painel.data || []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-red-100 text-red-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'aguardando': return 'bg-blue-100 text-blue-800';
      case 'resolvido': return 'bg-green-100 text-green-800';
      case 'fechado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'critica': return 'bg-red-500 text-white';
      case 'alta': return 'bg-orange-500 text-white';
      case 'media': return 'bg-yellow-500 text-white';
      case 'baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: { [key: string]: string } = {
      'impressoras': 'Impressoras',
      'perifericos': 'Periféricos',
      'telefonia': 'Telefonia',
      'softwares': 'Softwares',
      'sistema_operacional': 'Sistema Operacional',
      'rede': 'Rede',
      'acessos': 'Acessos',
      'seguranca': 'Segurança',
      'geral': 'Geral'
    };
    return labels[categoria] || categoria;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filtrar chamados
  const filteredChamados = chamadosData.filter((chamado: any) => {
    const matchesSearch = chamado.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chamado.solicitante.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || chamado.status === filterStatus;
    const matchesPrioridade = filterPrioridade === 'todos' || chamado.prioridade === filterPrioridade;
    const matchesCategoria = filterCategoria === 'todos' || chamado.categoria === filterCategoria;

    return matchesSearch && matchesStatus && matchesPrioridade && matchesCategoria;
  });

  // Funções para ações dos chamados
  const handleViewChamado = (chamado: any) => {
    setSelectedChamado(chamado);
    setModalOpen(true);
  };

  const handleUpdateChamado = (chamadoId: number, updates: any) => {
    setChamadosData(prev => 
      prev.map(chamado => 
        chamado.id === chamadoId ? { ...chamado, ...updates } : chamado
      )
    );
  };

  const handleAssignTechnician = (chamadoId: number) => {
    const technicians = ['João Silva - Nível 1', 'Maria Santos - Nível 2', 'Pedro Costa - Nível 3'];
    const randomTech = technicians[Math.floor(Math.random() * technicians.length)];
    
    handleUpdateChamado(chamadoId, { 
      tecnicoResponsavel: randomTech,
      status: 'em_andamento'
    });
  };

  const handleResolve = (chamadoId: number) => {
    handleUpdateChamado(chamadoId, { 
      status: 'resolvido'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('todos');
    setFilterPrioridade('todos');
    setFilterCategoria('todos');
  };

  // Estatísticas rápidas
  const stats = {
    total: chamadosData.length,
    abertos: chamadosData.filter((c: any) => c.status === 'aberto').length,
    emAndamento: chamadosData.filter((c: any) => c.status === 'em_andamento').length,
    resolvidos: chamadosData.filter((c: any) => c.status === 'resolvido').length
  };

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Abertos</p>
                <p className="text-2xl font-bold text-red-600">{stats.abertos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Resolvidos</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolvidos}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar chamados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aberto">Aberto</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="resolvido">Resolvido</SelectItem>
                <SelectItem value="fechado">Fechado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterPrioridade} onValueChange={setFilterPrioridade}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Prioridades</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterCategoria} onValueChange={setFilterCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Categorias</SelectItem>
                <SelectItem value="impressoras">Impressoras</SelectItem>
                <SelectItem value="perifericos">Periféricos</SelectItem>
                <SelectItem value="softwares">Softwares</SelectItem>
                <SelectItem value="rede">Rede</SelectItem>
                <SelectItem value="seguranca">Segurança</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Chamados */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Chamados ({filteredChamados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChamados.map((chamado: any) => (
                <TableRow key={chamado.id}>
                  <TableCell className="font-medium">#{chamado.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{chamado.titulo}</TableCell>
                  <TableCell>{chamado.solicitante}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoriaLabel(chamado.categoria)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPrioridadeColor(chamado.prioridade)}>
                      {chamado.prioridade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(chamado.status)}>
                      {chamado.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {chamado.tecnicoResponsavel ? (
                      <span className="text-sm">{chamado.tecnicoResponsavel}</span>
                    ) : (
                      <Badge variant="secondary">Não atribuído</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(chamado.dataAbertura)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewChamado(chamado)}
                        title="Ver detalhes"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      {!chamado.tecnicoResponsavel && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAssignTechnician(chamado.id)}
                          title="Atribuir técnico"
                        >
                          <UserPlus className="h-3 w-3" />
                        </Button>
                      )}
                      {chamado.status !== 'resolvido' && chamado.status !== 'fechado' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleResolve(chamado.id)}
                          title="Marcar como resolvido"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredChamados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum chamado encontrado com os filtros aplicados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      <DetalhesChamadoModal
        chamado={selectedChamado}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={handleUpdateChamado}
      />
    </div>
  );
};

export default PainelChamados;